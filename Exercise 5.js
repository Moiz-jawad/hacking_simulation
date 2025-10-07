// const steps = [
//   "Initializing network interface...",
//   "Scanning ports...",
//   "Establishing remote connection...",
//   "Bypassing firewall...",
//   "Access granted!",
//   "Enumerating services...",
//   "Uploading payload...",
//   "Decrypting files...",
//   "Operation complete.",
// ];

// const sleep = async (seconds) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(true);
//     }, seconds * 1000);
//   });
// };

// const hackerman = async (message) => {
//   await sleep(2);
//   document.body.querySelector("#hacked").innerHTML = message;
// };

// (async () => {
//   for (let i = 0; i < steps.length; i++) {
//     await hackerman(steps[i]);
//   }
// })();

const steps = [
  "Initializing network interface...",
  "Scanning ports...",
  "Establishing remote connection...",
  "Bypassing firewall...",
  "Access granted!",
  "Enumerating services...",
  "Uploading payload...",
  "Decrypting files...",
  "Operation complete.",
];

// DOM refs
const output = document.getElementById("output");
const cursor = document.getElementById("cursor");
const fill = document.getElementById("fill");
const percentLabel = document.getElementById("percent");
const status = document.getElementById("status");

// sleep util
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// typewriter for one line (appends to output)
async function typeLine(line, charDelay = 30) {
  for (let i = 0; i < line.length; i++) {
    output.textContent += line[i];
    // keep scroll pinned to bottom
    const consoleEl = document.getElementById("console");
    consoleEl.scrollTop = consoleEl.scrollHeight;
    await sleep(charDelay);
  }
  output.textContent += "\n";
}

// update progress fill to targetPercent (0-100)
function updateProgress(targetPercent) {
  const p = Math.max(0, Math.min(100, Math.round(targetPercent)));
  fill.style.width = p + "%";
  percentLabel.textContent = p + "%";
}

// simulate many script outputs (fast, terminal-like)
async function simulateManyScripts(count = 320, batchSize = 25) {
  const consoleEl = document.getElementById("console");

  const makeScriptName = (i) => {
    const id = String(i + 1).padStart(4, "0");
    const names = [
      "sync",
      "update",
      "worker",
      "task",
      "deploy",
      "agent",
      "probe",
      "svc",
      "job",
      "handler",
    ];
    const noun = names[i % names.length];
    return `${noun}-${id}.sh`;
  };

  function flushBuffer(buf) {
    if (!buf) return;
    output.textContent += buf;
    consoleEl.scrollTop = consoleEl.scrollHeight;
  }

  let buffer = "";
  for (let i = 0; i < count; i++) {
    const script = makeScriptName(i);
    const dur = Math.round(Math.random() * 1200) + 80;
    const passes = Math.random();

    buffer += `[${script}] -> Initializing environment...\n`;
    buffer += `[${script}] -> Checking dependencies...\n`;

    if (passes < 0.25) {
      buffer += `[${script}] -> Fetching remote artifact...\n`;
    } else if (passes < 0.5) {
      buffer += `[${script}] -> Validating signature...\n`;
    } else if (passes < 0.75) {
      buffer += `[${script}] -> Spawning child processes...\n`;
    }

    buffer += `[${script}] -> Running (${dur} ms)\n`;

    if (Math.random() < 0.96) {
      buffer += `[${script}] -> Completed successfully (code 0)\n\n`;
    } else {
      buffer += `[${script}] -> Warning: non-fatal error, continuing (code 1)\n\n`;
    }

    if ((i + 1) % batchSize === 0) {
      flushBuffer(buffer);
      buffer = "";
      await sleep(60);
    }
  }

  flushBuffer(buffer);

  for (let i = 0; i < 6; i++) {
    output.textContent += `system-monitor -> ${
      [
        "cleaning",
        "archiving",
        "optimizing",
        "re-indexing",
        "finalizing",
        "idle",
      ][i]
    }...\n`;
    consoleEl.scrollTop = consoleEl.scrollHeight;
    await sleep(120);
  }
}

// single clean runner
(async function run() {
  status.textContent = "Running simulation...";

  for (let i = 0; i < steps.length; i++) {
    const line = steps[i];
    await typeLine(line, 30);
    const pct = ((i + 1) / steps.length) * 100;
    updateProgress(pct);
    await sleep(700);
  }

  output.textContent += "\n>> Hack simulation complete.\n";
  updateProgress(100);
  status.textContent = "Spawning background scripts...";

  // run 320 scripts (change this const to whatever you want)
  const SCRIPT_COUNT = 320;
  await simulateManyScripts(SCRIPT_COUNT, 5);

  output.textContent += "\n>> All background scripts finished.\n";
  status.textContent = "Simulation finished.";

  await sleep(600);
  cursor.style.display = "none";
})();
