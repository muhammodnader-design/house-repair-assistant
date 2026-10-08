// data.js - ALL repair knowledge lives here. No logic, no DOM.
// To add a new problem: copy one object, paste it in the repairs array, change the fields.

// Arrays = lists. Objects = one repair problem with named fields.
// Same shape for every problem = easy to add more later.

var categories = [
  { id: "plumbing",  name: "🚿 Plumbing and Water" },
  { id: "electricity", name: "⚡ Electricity" },
  { id: "walls",     name: "🧱 Walls" },
  { id: "doors",     name: "🚪 Doors and Windows" },
  { id: "hvac",      name: "🌡️ Heating and Ventilation" },
  { id: "floors",    name: "🪵 Floors" },
  { id: "ceilings",  name: "☁️ Ceilings" },
  { id: "roof",      name: "🏠 Roof and Waterproofing" },
  { id: "painting",  name: "🎨 Painting and Finishing" },
  { id: "furniture", name: "🛋️ Furniture and Fixtures" },
  { id: "general",   name: "🔧 General Maintenance" }
];

var repairs = [
  {
    id: "plumbing-faucet-drip",
    category: "plumbing",
    problem: "Dripping kitchen faucet",
    symptoms: ["Steady drip even when handle is closed", "Water spots in the sink"],
    causes: ["Worn washer or cartridge", "Loose faucet parts"],
    solutionSteps: [
      "1. Turn off the water valves under the sink.",
      "2. Remove the handle and swap the old washer/cartridge for the same type.",
      "3. Reassemble, turn water back on, check for drips."
    ],
    tools: ["Adjustable wrench", "Screwdriver", "Bucket"],
    materials: ["Replacement washer/cartridge matching your faucet model", "Plumber's tape"],
    difficulty: "Easy",
    time: "30-60 min",
    cost: "Low",
    safety: "Never close the main valve without knowing where it is. Catch water with a bucket.",
    callProWhen: ["Shut-off valve is broken", "Leak appears inside the wall", "You are not comfortable working with plumbing"],
    prevention: "Do not overtighten handles. Clean the aerator once a year."
  },
  {
    id: "electricity-dead-outlet",
    category: "electricity",
    problem: "Dead power outlet",
    symptoms: ["Plugged-in device does not work", "No burning smell or sparks"],
    causes: ["Tripped breaker", "Tripped GFCI outlet", "Loose faceplate"],
    solutionSteps: [
      "1. Look at your breaker panel: flip the tripped breaker OFF, then ON.",
      "2. Find GFCI outlets (test/reset buttons) on the same circuit and press RESET.",
      "3. Try another device in the outlet to confirm."
    ],
    tools: ["None needed for checking"],
    materials: [],
    difficulty: "Pro-only",
    time: "5 min check",
    cost: "Free-Low",
    safety: "Do NOT open the outlet or touch wiring. Electric shock and fire risk. Any wiring work must follow local electrical regulations.",
    callProWhen: ["Burning smell, heat, or sparks", "Breaker trips again after reset", "Several outlets are dead", "Any work inside the outlet box is needed"],
    prevention: "Do not overload one outlet. Keep outlets dry."
  },
  {
    id: "walls-nail-hole",
    category: "walls",
    problem: "Small nail hole in wall",
    symptoms: ["Hole about 1-5 mm where a nail or screw was removed"],
    causes: ["Nail or screw removed from the wall"],
    solutionSteps: [
      "1. Clean loose dust from the hole.",
      "2. Fill with interior spackle using a putty knife.",
      "3. Let dry, sand lightly with fine sandpaper, wipe clean.",
      "4. Touch up with matching interior paint."
    ],
    tools: ["Putty knife", "Sandpaper 120-grit", "Damp cloth"],
    materials: ["Interior spackle/filler", "Touch-up paint matching your wall"],
    difficulty: "Easy",
    time: "20 min + drying",
    cost: "Low",
    safety: "Before drilling bigger holes, check there are no wires or pipes behind the wall.",
    callProWhen: ["Large crack or bulging wall", "Damp patch", "Crumbling plaster"],
    prevention: "Use wall anchors so heavy items do not rip out of the wall."
  },
  {
    id: "doors-squeaky-hinge",
    category: "doors",
    problem: "Squeaking door hinge",
    symptoms: ["Squeak sound when the door opens or closes"],
    causes: ["Dust or dry hinge pin"],
    solutionSteps: [
      "1. Wipe the hinge clean with a cloth.",
      "2. Add 1-2 drops of hinge-safe household lubricant.",
      "3. Open and close the door a few times. Wipe off extra."
    ],
    tools: ["Screwdriver (if pin needs removing)", "Cloth"],
    materials: ["Silicone-based household lubricant suitable for hinges (not cooking oil)"],
    difficulty: "Easy",
    time: "10 min",
    cost: "Low",
    safety: "Support heavy doors so they do not swing on your hand.",
    callProWhen: ["Stripped hinge screws", "Cracked door or frame", "Door no longer latches"],
    prevention: "Clean and lubricate hinges once a year."
  },
  {
    id: "hvac-weak-airflow",
    category: "hvac",
    problem: "Weak airflow from vent / dirty filter",
    symptoms: ["Weak air from vent", "More dust than usual", "Higher bills"],
    causes: ["Clogged filter or dusty vent grille"],
    solutionSteps: [
      "1. Turn the heating/cooling system OFF.",
      "2. Remove the filter and vacuum the vent grille.",
      "3. Replace the filter — match the size/type in your unit manual, airflow arrow pointing toward the unit."
    ],
    tools: ["Vacuum with hose", "Cloth"],
    materials: ["Correct replacement filter size and type per your manual"],
    difficulty: "Easy",
    time: "15 min",
    cost: "Low",
    safety: "Turn the system off first. Do not open gas or electrical panels.",
    callProWhen: ["You smell gas", "Ice on pipes", "No heating/cooling after filter change", "System has not been serviced in over a year"],
    prevention: "Check and replace the filter every 1-3 months."
  },

  // --- STAGE 2: more problems per category. Same structure, no logic changes. ---

  {
    id: "plumbing-sink-leak",
    category: "plumbing",
    problem: "Leak under the kitchen sink",
    symptoms: ["Water drip under the sink", "Wet cabinet floor"],
    causes: ["Loose drain pipe connection", "Worn rubber washer inside the joint"],
    solutionSteps: [
      "1. Put a bucket under the leak and dry everything.",
      "2. Run water and watch where the drip starts.",
      "3. Tighten the loose connection by hand, then a quarter turn with pliers.",
      "4. If still leaking, the inner washer is worn — take the joint apart and replace the washer."
    ],
    tools: ["Pliers", "Bucket", "Towel"],
    materials: ["Replacement rubber washers for the same pipe diameter", "Plumber's tape"],
    difficulty: "Medium",
    time: "30-90 min",
    cost: "Low",
    safety: "Turn off water before disassembling. Never use too much force on plastic pipes.",
    callProWhen: ["Leak is inside the wall", "Pipe is cracked", "Moldy smell in the cabinet"],
    prevention: "Check under sinks twice a year. Tighten connections gently."
  },
  {
    id: "plumbing-clogged-drain",
    category: "plumbing",
    problem: "Clogged bathroom sink drain",
    symptoms: ["Water drains very slowly", "Standing water in the sink"],
    causes: ["Hair and soap buildup", "Stuff stuck in the trap"],
    solutionSteps: [
      "1. Remove the stopper and pull out visible hair.",
      "2. Pour hot (not boiling) water down the drain.",
      "3. Use a simple plastic drain snake if still slow.",
      "4. Clean the U-shaped trap under the sink if you can."
    ],
    tools: ["Drain snake (plastic)", "Bucket", "Gloves"],
    materials: ["Drain cover to catch hair"],
    difficulty: "Easy",
    time: "20-40 min",
    cost: "Low",
    safety: "Avoid mixing chemical drain cleaners. Hot water, not boiling — boiling can damage plastic pipes.",
    callProWhen: ["Completely blocked drain", "Bad smell from pipes", "Several drains blocked at once"],
    prevention: "Use a drain cover. Flush with hot water weekly."
  },
  {
    id: "electricity-tripping-breaker",
    category: "electricity",
    problem: "Circuit breaker keeps tripping",
    symptoms: ["A breaker flips off and the room goes dark", "It trips again after resetting"],
    causes: ["Too many devices on one circuit", "Faulty appliance", "Damaged wiring"],
    solutionSteps: [
      "1. Unplug all devices on that circuit.",
      "2. Reset the breaker: push fully OFF, then ON.",
      "3. Plug devices back in one at a time to find the problem appliance."
    ],
    tools: [],
    materials: [],
    difficulty: "Pro-only",
    time: "10 min to check",
    cost: "Unknown until diagnosed",
    safety: "Do not force a breaker back on. Repeated tripping can mean a real fire risk.",
    callProWhen: ["Breaker trips again with nothing plugged in", "Burning smell from the panel", "Warm breaker", "Old or damaged panel"],
    prevention: "Spread big appliances across different circuits."
  },
  {
    id: "electricity-flickering-lights",
    category: "electricity",
    problem: "Flickering or dimming lights",
    symptoms: ["Lights blink occasionally", "Lights dim when a big appliance starts"],
    causes: ["Loose light bulb", "Old wiring", "Problem with the house supply (ask neighbors)"],
    solutionSteps: [
      "1. Tighten the bulb gently.",
      "2. Try a new bulb of the correct type.",
      "3. If whole house flickers, check if neighbors have the same issue — if yes, call the power company."
    ],
    tools: ["None usually"],
    materials: ["Correct replacement bulb"],
    difficulty: "Easy",
    time: "5 min",
    cost: "Low",
    safety: "Never touch a bulb that feels hot. Any work inside the wall or ceiling needs a professional.",
    callProWhen: ["Flickering in many rooms", "Buzzing sound from switches", "Warm switches or outlets"],
    prevention: "Replace bulbs with the correct wattage for the fixture."
  },
  {
    id: "walls-small-crack",
    category: "walls",
    problem: "Small crack in the wall",
    symptoms: ["Thin hairline crack, not growing", "No dampness around it"],
    causes: ["Normal house settling", "Paint shrinking over time"],
    solutionSteps: [
      "1. Check it is not growing: mark the ends with a pencil and the date.",
      "2. Clean dust from the crack.",
      "3. Fill with flexible wall filler, smooth with a putty knife.",
      "4. Sand, then repaint the area."
    ],
    tools: ["Putty knife", "Sandpaper", "Pencil"],
    materials: ["Flexible interior wall filler", "Touch-up interior paint"],
    difficulty: "Easy",
    time: "30 min + drying",
    cost: "Low",
    safety: "Stop if the crack widens quickly — that can signal structural movement.",
    callProWhen: ["Crack is growing", "Crack is wide (over a coin thick)", "Wall is bulging or damp"],
    prevention: "Keep indoor humidity stable. Fix roof leaks quickly."
  },
  {
    id: "walls-peeling-paint",
    category: "walls",
    problem: "Peeling paint on the wall",
    symptoms: ["Paint flakes or bubbles off the wall"],
    causes: ["Damp wall behind the paint", "Poor paint adhesion", "Humidity"],
    solutionSteps: [
      "1. Find the cause of dampness (leak? condensation?) and fix it first.",
      "2. Scrape off loose paint.",
      "3. Sand the edges, apply primer to the bare wall.",
      "4. Repaint with moisture-resistant interior paint if the room is damp (kitchen/bathroom)."
    ],
    tools: ["Scraper", "Sandpaper", "Brush or roller"],
    materials: ["Interior primer", "Interior paint suitable for the room"],
    difficulty: "Medium",
    time: "1-2 hours + drying",
    cost: "Low-Medium",
    safety: "In very old houses, peeling paint can contain lead — if unsure, get advice before scraping.",
    callProWhen: ["Damp patch keeps growing", "Mold spreading", "Suspected structural problem"],
    prevention: "Ventilate damp rooms. Use bathroom/kitchen rated paint."
  },
  {
    id: "doors-sticking-door",
    category: "doors",
    problem: "Door sticks or drags on the floor",
    symptoms: ["Door rubs the floor or frame", "Hard to close fully"],
    causes: ["Loose hinge screws", "Humidity swelling the wood", "House settling"],
    solutionSteps: [
      "1. Tighten all hinge screws — longest screw into the frame works best.",
      "2. If still sticking, lightly sand the spot that rubs.",
      "3. Re-check: door should swing freely without touching the frame."
    ],
    tools: ["Screwdriver", "Sandpaper (fine)"],
    materials: ["Longer replacement screws for hinges if needed"],
    difficulty: "Easy",
    time: "20-30 min",
    cost: "Low",
    safety: "Work slowly when sanding — remove a little at a time.",
    callProWhen: ["Door frame is cracked", "Door is badly warped", "Sticking appeared suddenly after flooding"],
    prevention: "Check hinge screws yearly. Keep indoor humidity moderate."
  },
  {
    id: "doors-drafty-window",
    category: "doors",
    problem: "Window is hard to open or drafty",
    symptoms: ["Cold air around the frame", "Window sticks or does not seal"],
    causes: ["Old or missing weather seal", "Paint sealing the window shut", "Swollen wood"],
    solutionSteps: [
      "1. Cut paint seal around the window with a utility knife.",
      "2. Replace worn weather seal tape along the frame.",
      "3. Check the lock closes the window tightly."
    ],
    tools: ["Utility knife", "Scissors"],
    materials: ["Weather seal tape or draft excluder strip"],
    difficulty: "Easy",
    time: "30 min",
    cost: "Low",
    safety: "Cut away from your hand. Do not tamper with window locks meant for security.",
    callProWhen: ["Broken glass", "Rotten window frame", "Foggy double-glazing (seal failed)"],
    prevention: "Inspect seals before winter. Lubricate window tracks yearly."
  },
  {
    id: "hvac-warm-ac",
    category: "hvac",
    problem: "Air conditioner blowing warm air",
    symptoms: ["AC runs but air is not cold", "Cooling is weaker than before"],
    causes: ["Dirty filter", "Blocked outdoor unit", "Low refrigerant (professional issue)"],
    solutionSteps: [
      "1. Replace the filter.",
      "2. Clear leaves and dirt around the outdoor unit; check the vents are not blocked.",
      "3. Wait 15-30 minutes and check if air gets colder."
    ],
    tools: ["None usually", "Cloth"],
    materials: ["Correct filter", "Soft brush"],
    difficulty: "Easy",
    time: "20 min",
    cost: "Low",
    safety: "Do not open the AC electrical or refrigerant lines — refrigerant handling is regulated and requires a certified technician.",
    callProWhen: ["Still warm after filter and cleaning", "Ice on the pipes", "Loud or strange noises"],
    prevention: "Clean/replace filters monthly in summer. Keep outdoor unit clear."
  },
  {
    id: "hvac-cold-radiator",
    category: "hvac",
    problem: "Radiator cold at the top",
    symptoms: ["Bottom is hot, top is cold", "Room heats slowly"],
    causes: ["Air trapped inside the radiator"],
    solutionSteps: [
      "1. Turn the heating off and let it cool.",
      "2. Place a cloth under the bleed valve at the top corner.",
      "3. Open the valve slowly with a radiator key until water comes out, then close it.",
      "4. Check the boiler pressure; it may need topping up (see your manual)."
    ],
    tools: ["Radiator key (or correct screwdriver)", "Cloth", "Small container"],
    materials: [],
    difficulty: "Medium",
    time: "15 min",
    cost: "Free",
    safety: "Hot radiators can burn — do this when the system is cool. Do not touch the boiler itself.",
    callProWhen: ["Pressure keeps dropping", "Radiator leaking", "Boiler error code you do not understand"],
    prevention: "Bleed radiators at the start of each heating season if needed."
  },

  // --- Added: remaining categories ---

  {
    id: "floors-squeaky-board",
    category: "floors",
    problem: "Squeaky floorboard",
    symptoms: ["Loud squeak when you step on one spot"],
    causes: ["Loose board rubbing against a nail or joist"],
    solutionSteps: [
      "1. Find the exact squeaky spot by walking over it.",
      "2. Sprinkle a little talcum powder in the cracks around the board.",
      "3. If that fails: drive a short screw through the board into the joist (screw head below the surface, cover with filler)."
    ],
    tools: ["Screwdriver", "Drill if needed"],
    materials: ["Wood screws slightly shorter than the board thickness", "Talcum powder", "Wood filler"],
    difficulty: "Medium",
    time: "30-60 min",
    cost: "Low",
    safety: "Check for wires/pipes below floors before driving screws.",
    callProWhen: ["Whole floor section is soft or sagging", "Squeak caused by water damage"],
    prevention: "Keep humidity stable to avoid boards shrinking and moving."
  },
  {
    id: "ceilings-water-stain",
    category: "ceilings",
    problem: "Small brown water stain on the ceiling",
    symptoms: ["Yellowish-brown patch on the ceiling", "Maybe damp or flaking paint"],
    causes: ["Leak from roof, bathroom above, or a pipe"],
    solutionSteps: [
      "1. Find and fix the leak source first — staining returns if you do not.",
      "2. Let the area dry completely (days).",
      "3. Prime with a stain-blocking primer, then repaint the patch."
    ],
    tools: ["Brush or roller"],
    materials: ["Stain-blocking ceiling primer", "Ceiling paint"],
    difficulty: "Medium",
    time: "1-2 hours + drying days",
    cost: "Low-Medium",
    safety: "The leak must be fixed by a qualified person if it involves the roof, plumbing, or structure.",
    callProWhen: ["Stain grows quickly", "Ceiling sags or bulges", "Leak cause is unknown"],
    prevention: "Inspect roof and upstairs bathroom regularly for leaks."
  },
  {
    id: "roof-missing-shingle",
    category: "roof",
    problem: "Missing or slipped roof shingle",
    symptoms: ["One shingle missing after wind or storm", "Visible bare patch on the roof"],
    causes: ["Wind damage", "Old, brittle shingles"],
    solutionSteps: [
      "1. From the ground, note where shingles are missing.",
      "2. Contact a roofing professional to replace them — working on a roof is dangerous.",
      "3. Do NOT climb onto the roof yourself unless you are trained and have fall protection."
    ],
    tools: [],
    materials: [],
    difficulty: "Pro-only",
    time: "—",
    cost: "Medium",
    safety: "Serious fall risk. This is not a DIY task. A small missing area photographed from the ground is enough for a quote.",
    callProWhen: ["Any missing shingle — call a roofer", "Large damaged area after a storm", "Signs of leaks inside"],
    prevention: "Have the roof inspected after major storms."
  },
  {
    id: "painting-streaky-finish",
    category: "painting",
    problem: "Streaky or patchy paint finish",
    symptoms: ["Brush marks visible", "Color looks uneven after drying"],
    causes: ["Paint applied too thin", "Two different batches of paint", "Not stirred well"],
    solutionSteps: [
      "1. Sand the rough areas lightly with fine sandpaper.",
      "2. Stir the paint thoroughly before and during use.",
      "3. Apply two even thin coats, respecting the drying time on the label."
    ],
    tools: ["Roller or brush", "Sandpaper (fine)"],
    materials: ["Interior paint (single batch)", "Paint tray"],
    difficulty: "Easy",
    time: "2-3 hours",
    cost: "Medium",
    safety: "Open windows for ventilation. Keep paint away from children.",
    callProWhen: ["Large areas or high ceilings", "Specialist finishes (varnish, epoxy)"],
    prevention: "Buy one batch for the whole job. Stir well. Two thin coats beat one thick coat."
  },
  {
    id: "furniture-wobbly-chair",
    category: "furniture",
    problem: "Wobbly chair legs",
    symptoms: ["Chair rocks or a leg moves"],
    causes: ["Loose screws or bolts", "Loose joints"],
    solutionSteps: [
      "1. Turn the chair over, tighten the screws or bolts.",
      "2. For wooden joints: add wood glue to the joint, clamp, let dry fully.",
      "3. Test stability before normal use."
    ],
    tools: ["Screwdriver or Allen key", "Clamp"],
    materials: ["Wood glue (suitable for furniture joints)"],
    difficulty: "Easy",
    time: "20 min + glue drying",
    cost: "Low",
    safety: "Let wood glue cure fully — a repaired chair that fails under weight can cause falls.",
    callProWhen: ["Cracked wood or broken joint", "Antique furniture (could lose value)"],
    prevention: "Periodically check and tighten furniture screws."
  },
  {
    id: "general-mold-spots",
    category: "general",
    problem: "Mold spots in a bathroom corner",
    symptoms: ["Black or green spots on grout or silicone", "Musty smell"],
    causes: ["Humidity and poor ventilation", "Moisture left on surfaces"],
    solutionSteps: [
      "1. Wear gloves and a mask. Spray the spots with a suitable household mold cleaner (follow label instructions).",
      "2. Leave for the stated time, then scrub with a brush and rinse.",
      "3. Dry the area fully and air out the room. Fix silicone seals that are cracked."
    ],
    tools: ["Brush", "Sponge", "Gloves and mask"],
    materials: ["Household mold remover suitable for bathrooms (read the label)", "Fresh grout/silicone sealant if needed"],
    difficulty: "Medium",
    time: "30-60 min",
    cost: "Low",
    safety: "Never mix bleach with ammonia or other cleaners. Ventilate. Do not spread mold — clean small areas first.",
    callProWhen: ["Mold covers a large area (e.g. whole wall)", "Mold comes back quickly", "Structural wood looks rotten"],
    prevention: "Ventilate after showers. Wipe surfaces dry. Use an exhaust fan."
  }
];


// Allow the Node server (server.js) to reuse this same data file:
// In the browser this line does nothing. In Node it exports the data.
try {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { categories, repairs };
  }
} catch (e) { /* not in Node */ }
