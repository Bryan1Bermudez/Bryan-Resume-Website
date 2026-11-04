// Project cards, in display order.
//
// Each entry:
//   id        short slug (used for the anchor link)
//   title     card heading
//   period    when (shown under the title)
//   tags      tech list shown as chips
//   summary   one or two sentences
//   bullets   what was actually done (resume-style)
//   media     { type: "image" | "video" | "gif", src, poster, alt }  (optional)
//   links     [{ label, href }]
//   category  one of: "embedded" | "graphics" | "systems" | "web" | "data" | "games" | "ai" (drives the filter buttons)
//   featured  true = big card in the first row
//   hidden    true = NOT rendered on the public page. Kept here ready to go.
//             Open the site with ?preview=1 to see hidden cards while editing.
//
// To publish a hidden project: fill in the fields, drop a screenshot into
// assets/projects/, set hidden: false, commit, push.

window.PROJECTS = [
  // ---------------------------------------------------------------- hidden, ready
  {
    id: "oppia",
    category: "web",
    hidden: true,
    title: "Oppia (open source)",
    period: "Spring 2025",
    tags: ["Python", "TypeScript", "Angular", "Open source"],
    summary: "[Contribution to the Oppia learning platform — details to be added.]",
    bullets: [],
    media: null,
    links: [{ label: "Fork on GitHub", href: "https://github.com/Bryan1Bermudez/oppia_CSE-project" }]
  },

  // ---------------------------------------------------------------- visible
  {
    id: "armament",
    category: "games",
    featured: true,
    title: "Armament RPG",
    period: "Solo indie project · Godot 4.7, GDScript · alpha, in development",
    tags: ["Godot", "GDScript", "Procedural generation", "Custom lighting", "Pixel art"],
    summary: "An original sandbox RPG in the spirit of Terraria and Starbound. It looks 2D, but the world is five lanes of cubes under a perspective camera, so you build, dig and fight in depth. Pick a race and a class, build a ship, and travel a procedurally generated galaxy of ~10,000 systems.",
    bullets: [
      "Chunk-streamed block world with flowing liquids, falling powder, connected textures and a custom lighting engine that runs on its own thread, plus an occlusion manager to keep rendering cost down.",
      "Galaxies, systems, planets, weather, towns and NPC schedules are all generated from seeds, archetypes and reusable blueprints; Venus, the first story location, is hand-built on the same generator.",
      "Modular, data-driven spell system: new spells are composed from reusable components without touching core code.",
      "Ships built cell by cell from part kits; all pixel-art tiles, blocks, sprites and UI are original. Planning a commercial release.",
      "Note: the game site credits \"Aurora\" — that is my developer name, used for privacy; the project is mine."
    ],
    media: { type: "image", src: "assets/projects/armament-title.webp", alt: "Armament RPG title screen: the game logo over a nebula, with Play, Options, Mods, Credits and Exit" },
    links: [
      { label: "Game site", href: "https://aurora-projects.github.io/armament-site/" },
      { label: "Dev log", href: "https://aurora-projects.github.io/armament-site/#transmissions" }
    ]
  },
  {
    id: "smart-watch",
    category: "embedded",
    featured: true,
    title: "Bluetooth Smart Watch",
    period: "Jun 2025 – Sep 2025",
    tags: ["ESP32", "C/C++", "Bluetooth", "Touchscreen", "Power management"],
    summary: "A wrist-sized wearable built from scratch: component selection, board layout, and custom firmware driving a touchscreen, Bluetooth radio and battery on an ESP32.",
    bullets: [
      "Diagnosed three failures in the first prototype (fast battery drain, dropped Bluetooth link, unreliable touch input) by measuring power draw and logging connection events.",
      "Rewrote the connection-handling and power-management code for prototype two.",
      "Validated prototype two through multi-day wear testing; it holds up in daily use with up to 4 days of battery per charge."
    ],
    // TODO: photo of the watch -> assets/projects/smart-watch.jpg, then set media: { type: "image", src: "...", alt: "..." }
    media: null,
    links: []
  },
  {
    id: "local-ai",
    category: "ai",
    title: "Offline AI Assistant (local LLM)",
    period: "Personal project · Aug 2026 · AI-assisted build",
    tags: ["Python", "Ollama", "Llama 3.2", "LLM tool calling", "REST API"],
    summary: "A command-line AI assistant that runs entirely on my own PC against a Llama 3.2 model served locally by Ollama, so no cloud API is called. I used an AI assistant to generate a six-lesson build-along course and its code, then installed and ran every lesson on my Windows PC.",
    bullets: [
      "Conversation memory (the full message history is resent to Ollama's /api/chat each turn), streamed replies, and configurable context window and temperature.",
      "Tool calling: the model can ask to read a local file, and the script runs the function and sends the result back for the model's final answer.",
      "Error handling for a stopped model server at startup, a lost connection mid-chat, a missing file and empty input; transcripts from my runs are in the repo.",
      "Python standard library only (urllib, json), with each lesson's script building on the previous one."
    ],
    media: null,
    links: [{ label: "Source", href: "https://github.com/Bryan1Bermudez/local-ai-assistant" }]
  },
  {
    id: "hns",
    category: "systems",
    featured: true,
    title: "Home Network Solutions",
    period: "CSE 4101 senior design · team of 4 · Fall 2026, in progress",
    tags: ["Bash", "Ubuntu Server", "Docker", "Git"],
    summary: "A self-hosted home server platform. I own the Bash installers that download, install and configure the platform's tools on Ubuntu, and built the password hashing system for user credentials.",
    bullets: [
      "Installers download, install and configure every service on a clean Ubuntu Server install.",
      "Password hashing system for user credentials.",
      "Teammates own the Jellyfin and Pi-hole services; everything runs in Docker containers and is coordinated through Git."
    ],
    media: { type: "image", src: "assets/projects/hns.png", alt: "The Home Network Solutions project portal, listing the team and the milestone documents" },
    links: [
      { label: "Project portal", href: "https://fit-cse-4101-home-network-solutions.github.io/" },
      { label: "Source", href: "https://github.com/FIT-CSE-4101-Home-Network-Solutions/fit-cse-4101-home-network-solutions.github.io" }
    ]
  },
  {
    id: "camera-trajectory",
    category: "graphics",
    featured: true,
    title: "Camera Trajectory Animation with Lie-Group Interpolation",
    period: "CSE 5280 Computer Graphics · Apr 2026",
    tags: ["Python", "NumPy", "SE(3)", "Linear algebra"],
    summary: "Smooth camera paths through 3D keyframes by interpolating on the SE(3) Lie group instead of naively blending matrices, so every in-between frame is still a valid rigid transform.",
    bullets: [
      "Geodesic interpolation between keyframe poses with the SE(3) exponential and logarithm maps.",
      "Side-by-side comparison with naive Euclidean interpolation: the Lie-group path keeps the rotation orthogonal (det = 1) where the naive one drifts.",
      "8-keyframe closed-loop orbit at constant height, rendered frame by frame into an animation."
    ],
    media: { type: "video", contain: true, src: "assets/projects/camera-trajectory.mp4", poster: "assets/projects/camera-trajectory-poster.png", alt: "Camera orbiting a scene along an SE(3) geodesic" },
    links: [{ label: "Source", href: "https://github.com/Bryan1Bermudez/cse5280-Camera-Trajectory-Animation-Using-Lie-Group-Interpolation-bbermudez2023" }]
  },
  {
    id: "ray-tracer",
    category: "graphics",
    title: "Ray Tracer",
    period: "CSE 5280 Computer Graphics · Apr 2026",
    tags: ["Python", "NumPy"],
    summary: "A ray tracer written from scratch that renders a scene of three spheres (matte, reflective and glass) on a reflective floor from front, side and top views.",
    bullets: [
      "Ray–sphere and ray–plane intersection, shading, shadows, reflection and refraction.",
      "Camera model with configurable position and view direction."
    ],
    media: { type: "image", contain: true, src: "assets/projects/raytracer.png", alt: "Ray-traced render of a red reflective sphere, a green matte sphere and a glass sphere on a reflective floor" },
    links: [{ label: "Source", href: "https://github.com/Bryan1Bermudez/cse5280-ray-tracing-bbermudez2023" }]
  },
  {
    id: "space-carving",
    category: "graphics",
    title: "Space Carving 3D Reconstruction",
    period: "CSE 5280 Computer Graphics · Apr 2026",
    tags: ["Python", "Open3D", "Computer vision"],
    summary: "Reconstructs a 3D object from 20 calibrated camera views by carving away voxels that fall outside the silhouettes, then turns the point cloud into a mesh.",
    bullets: [
      "Multi-view silhouette extraction and voxel carving.",
      "Poisson surface reconstruction of the carved point cloud (227k points) with Open3D."
    ],
    media: { type: "image", src: "assets/projects/space-carving.png", alt: "Point cloud, Poisson mesh reconstruction and the overlay of both for a carved sphere" },
    links: [{ label: "Source", href: "https://github.com/Bryan1Bermudez/cse5280-space-carving-bbermudez2023" }]
  },
  {
    id: "evacuation",
    category: "graphics",
    title: "Building Evacuation & Robot-Arm Kinematics",
    period: "CSE 5280 Computer Graphics · Feb – Mar 2026",
    tags: ["Python", "Inverse kinematics", "Simulation"],
    summary: "A three-storey building evacuation simulation (25 agents, floors connected by stairs), extended with a robot arm that uses inverse kinematics to reach and move agents.",
    bullets: [
      "Agents navigate floors and staircases to the exits; evacuated count tracked per step.",
      "Robot arm solved with inverse kinematics, with end-effector prediction and cluster targeting."
    ],
    media: { type: "video", src: "assets/projects/robot-evacuation.mp4", poster: "assets/projects/robot-evacuation-poster.png", alt: "Robot arm reaching into a multi-floor building while agents evacuate" },
    links: [
      { label: "Robot arm", href: "https://github.com/Bryan1Bermudez/cse5280-robot-arm-bbermudez2023" },
      { label: "Evacuation", href: "https://github.com/Bryan1Bermudez/se5280-building-evacuation--bbermudez2023-" }
    ]
  },
  {
    id: "particles",
    category: "graphics",
    title: "Multi-Particle Social Forces & Floor-Plan Penalties",
    period: "CSE 5280 Computer Graphics · Feb 2026",
    tags: ["Python", "Matplotlib", "Simulation"],
    summary: "Particles steered to a goal through a floor plan by gradient descent on a cost field, with wall penalties (quadratic, exponential, logarithmic) and isotropic vs. anisotropic social forces between particles.",
    bullets: [
      "Compared how influence radius and penalty shape change the path, and where each gets stuck (narrow corridors, symmetric 'buckets').",
      "Analysed oscillation and deadlock behaviour of the isotropic and anisotropic models at bottlenecks."
    ],
    media: { type: "image", src: "assets/projects/floor-plan.png", alt: "Cost field, gradient arrows and the resulting particle trajectory through a floor plan" },
    links: [
      { label: "Particles", href: "https://github.com/Bryan1Bermudez/cse5280-multiple-particles-bbermudez2023" },
      { label: "Floor plan", href: "https://github.com/Bryan1Bermudez/cse5280-floor-plan-penalty-bbermudez2023" }
    ]
  },
  {
    id: "os",
    category: "systems",
    title: "Operating Systems: Semaphores, Process API, OS/161",
    period: "CSE 4001 Operating Systems · Fall 2025",
    tags: ["C/C++", "Linux", "pthreads", "OS/161"],
    summary: "Classic concurrency problems solved with semaphores, plus hands-on work with the Unix process API and new system calls in the OS/161 teaching kernel.",
    bullets: [
      "Producer/consumer, reader/writer (with writer priority) and dining philosophers (including the asymmetric solution) with a custom semaphore class.",
      "Programs exercising fork / exec / wait and inter-process communication on Linux.",
      "Implemented new system calls in the OS/161 kernel."
    ],
    media: { type: "image", src: "assets/projects/semaphores.png", alt: "Terminal output of the dining philosophers simulation" },
    links: [
      { label: "Semaphores", href: "https://github.com/Bryan1Bermudez/Multi-thread-synchronization-using-semaphores-Bryan" },
      { label: "Process API", href: "https://github.com/Bryan1Bermudez/cse4001_fall2025-using-the-process-api-Practicing-with-fork-exec-and-waitBryanBermudez" }
    ]
  },
  {
    id: "ecpla",
    category: "web",
    title: "ECPLA Local Artisan Marketplace",
    period: "CSE 4410 Intro to Project Management · team · in progress",
    tags: ["Python", "Flask", "SQLite", "Scrum", "Jira"],
    summary: "A marketplace web app where local artisans list products and buyers search, purchase, review and return them. Developed in Scrum sprints tracked in Jira, with sprint status reporting.",
    bullets: [],
    media: null,
    links: [{ label: "Source", href: "https://github.com/bmarshallFIT04/ECPLA_Marketplace" }]
  },
  {
    id: "signaldesk",
    category: "data",
    title: "SignalDesk Workflow Health Check",
    period: "Data science intern challenge · Aug 2026",
    tags: ["Python", "pandas", "Data analysis"],
    summary: "A ~45-minute take-home: a script that scans product usage events, computes per-workflow success rates and flags 'blind spots' where the model is highly confident but humans reject the output.",
    bullets: [
      "Basic data-quality scan with generalised exception handling for missing or mistyped fields.",
      "Short written report of findings, assumptions and next steps."
    ],
    media: null,
    links: [{ label: "Source", href: "https://github.com/Bryan1Bermudez/ds-Intern-Challenge-submission-Bryan-Bermudez" }]
  }
];
