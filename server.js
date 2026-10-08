// server.js — zero-install backend:
//   static files + JSON API + SQLite database (built into Node 26)
// Run: node server.js   (or double-click start.bat)

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");
const { categories, repairs } = require("./js/data.js");

const PORT = 3000;
const db = new DatabaseSync(path.join(__dirname, "repairs.db"));

// --- 1. Create tables and seed them from js/data.js on first run ---
db.exec(`
  CREATE TABLE IF NOT EXISTS problems (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    favorites TEXT NOT NULL DEFAULT '[]'
  );
`);

const problemCount = db.prepare("SELECT COUNT(*) AS n FROM problems").get().n;
if (problemCount === 0) {
  const insert = db.prepare("INSERT INTO problems (id, data) VALUES (?, ?)");
  for (const r of repairs) insert.run(r.id, JSON.stringify(r));
  console.log("Seeded database with", repairs.length, "problems.");
}

// --- 2. Helpers ---
function loadAllProblems() {
  return db.prepare("SELECT data FROM problems").all().map(row => JSON.parse(row.data));
}

function hashPassword(pw) {
  // Demo-grade hash. A real production app would use bcrypt/argon2 + HTTPS.
  return crypto.createHash("sha256").update("hrt-salt:" + pw).digest("hex");
}

// Sessions live in memory: logging out = forgetting the token. Restarting
// the server logs everyone out. That is acceptable for a class project.
const sessions = new Map(); // token -> username

// sessions token check
function getUser(token) {
  return sessions.get(token) || null;
}

// Read + parse a JSON request body
function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); } catch (e) { reject(e); }
    });
  });
}

function sendJson(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
}

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

// --- 3. The router ---
const server = http.createServer(async (req, res) => {
  const url = req.url.split("?")[0];
  const method = req.method;

  // GET all repair data (categories + problems) — from the database
  if (method === "GET" && url === "/api/repairs") {
    sendJson(res, 200, { categories, repairs: loadAllProblems() });
    return;
  }

  // POST a new repair problem (added from the web form)
  if (method === "POST" && url === "/api/repairs") {
    try {
      const body = await readBody(req);
      if (!body.category || !body.problem || !body.difficulty) {
        sendJson(res, 400, { error: "category, problem and difficulty are required" });
        return;
      }
      if (!categories.some(c => c.id === body.category)) {
        sendJson(res, 400, { error: "Unknown category: " + body.category });
        return;
      }
      const id = body.category + "-" + body.problem.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
      const steps = (body.solutionSteps || []).filter(s => s.trim() !== "");
      const newRepair = {
        id,
        category: body.category,
        problem: body.problem,
        symptoms: [],
        causes: [],
        solutionSteps: steps.length ? steps : ["Steps were not provided."],
        tools: [],
        materials: [],
        difficulty: body.difficulty,
        time: "Not specified",
        cost: "Not specified",
        safety: "Review this guide carefully. For dangerous work, call a professional.",
        callProWhen: ["You are unsure about any step"],
        prevention: "Not specified yet."
      };
      db.prepare("INSERT INTO problems (id, data) VALUES (?, ?)").run(id, JSON.stringify(newRepair));
      sendJson(res, 201, newRepair);
    } catch (e) {
      sendJson(res, 400, { error: "Invalid JSON body" });
    }
    return;
  }

  // POST signup
  if (method === "POST" && url === "/api/signup") {
    const body = await readBody(req).catch(() => ({}));
    if (!body.username || !body.password) {
      sendJson(res, 400, { error: "username and password are required" });
      return;
    }
    try {
      db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
        .run(body.username, hashPassword(body.password));
      sendJson(res, 201, { ok: true, message: "Account created. You can log in now." });
    } catch {
      sendJson(res, 409, { error: "That username is already taken." });
    }
    return;
  }

  // POST login
  if (method === "POST" && url === "/api/login") {
    const body = await readBody(req).catch(() => ({}));
    const row = db.prepare("SELECT password FROM users WHERE username = ?").get(body.username || "");
    if (!row || row.password !== hashPassword(body.password || "")) {
      sendJson(res, 401, { error: "Wrong username or password." });
      return;
    }
    const token = crypto.randomBytes(16).toString("hex");
    sessions.set(token, body.username);
    sendJson(res, 200, { ok: true, token });
    return;
  }

  // GET favorites for the logged-in user
  if (method === "GET" && url === "/api/favorites") {
    const user = getUser(new URL(req.url, "http://x").searchParams.get("token"));
    if (!user) { sendJson(res, 401, { error: "Not logged in" }); return; }
    const row = db.prepare("SELECT favorites FROM users WHERE username = ?").get(user);
    sendJson(res, 200, { favorites: JSON.parse(row.favorites) });
    return;
  }

  // POST toggle a favorite for the logged-in user
  if (method === "POST" && url === "/api/favorites") {
    const body = await readBody(req).catch(() => ({}));
    const user = getUser(body.token);
    if (!user) { sendJson(res, 401, { error: "Not logged in" }); return; }
    const row = db.prepare("SELECT favorites FROM users WHERE username = ?").get(user);
    const favs = JSON.parse(row.favorites);
    const i = favs.indexOf(body.problemId);
    if (i >= 0) favs.splice(i, 1); else favs.push(body.problemId);
    db.prepare("UPDATE users SET favorites = ? WHERE username = ?").run(JSON.stringify(favs), user);
    sendJson(res, 200, { favorites: favs });
    return;
  }

  // Static files for everything else
  const filePath = url === "/" ? "/index.html" : url;
  const fullPath = path.join(__dirname, filePath);
  if (!fullPath.startsWith(__dirname)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }
  fs.readFile(fullPath, (err, data) => {
    if (err) { res.writeHead(404); res.end("File not found"); return; }
    res.writeHead(200, { "Content-Type": CONTENT_TYPES[path.extname(fullPath)] || "text/plain" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log("House Repair Assistant is running!");
  console.log("Open: http://localhost:" + PORT);
  console.log("Press Ctrl+C to stop.");
});
