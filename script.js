const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");
const worldWrap = document.querySelector(".world-wrap");
const chapterName = document.querySelector("#chapter-name");
const objectiveText = document.querySelector("#objective-text");
const sceneCounter = document.querySelector("#scene-counter");
const interactionPrompt = document.querySelector("#interaction-prompt");
const interactionLabel = document.querySelector("#interaction-label");
const visualNovelStage = document.querySelector("#visual-novel-stage");
const vnCharacter = document.querySelector("#vn-character");
vnCharacter.dataset.character = "friend";
vnCharacter.dataset.mood = "neutral";
vnCharacter.dataset.outfit = "school";
function cloneVnCharacter(identity, positionClass, label) {
  const character = vnCharacter.cloneNode(true);
  character.removeAttribute("id");
  character.classList.add(positionClass);
  character.dataset.character = identity;
  character.dataset.mood = "neutral";
  character.dataset.outfit = "school";
  character.dataset.speaking = "false";
  character.querySelector("svg").removeAttribute("id");
  character.querySelector("svg").classList.add("character-portrait");
  character.querySelector("svg").setAttribute("aria-label", label);
  visualNovelStage.append(character);
  return character;
}
const secondaryVnCharacter = cloneVnCharacter("you", "vn-character-secondary", "You");
const familyVnCharacter = cloneVnCharacter("family", "vn-character-family", "Mom");
const vnCharacters = [vnCharacter, secondaryVnCharacter, familyVnCharacter];
const dialogue = document.querySelector("#dialogue");
const dialogueContent = document.querySelector("#dialogue-content");
const speakerName = document.querySelector("#speaker-name");
const startScreen = document.querySelector("#start-screen");
const endingScreen = document.querySelector("#ending-screen");
const quizScreen = document.querySelector("#quiz-screen");
const touchControls = document.querySelector(".touch-controls");
const toast = document.querySelector("#toast");
const healthCutscene = document.querySelector("#health-cutscene");
const healthCutsceneStepLabel = document.querySelector("#health-cutscene-step");
const healthCutsceneCopy = document.querySelector("#health-cutscene-copy");
const healthCutsceneNext = document.querySelector("#health-cutscene-next");

const scenes = [
  {
    chapter: "THE BEGINNING",
    setting: "school",
    dialogue: [
      { speaker: "Your friend", text: "Last bell, finally. Are you heading straight home?", mood: "happy" },
      { speaker: "You", text: "In a minute. What’s everyone looking at?", mood: "curious" },
      { speaker: "Your friend", text: "They’re passing around a vape. Want to try? It helps me chill.", mood: "curious" },
      { speaker: "You", text: "I’m curious, but they’re all watching. I don’t want to look awkward.", mood: "worried" },
      { speaker: "Your friend", text: "You don’t have to do it just because they’re looking. A lot of vapes contain nicotine, and that can be addictive.", mood: "concerned" },
      { speaker: "Your friend", text: "It can become hard to stop once it’s part of a routine. What feels right to you?", mood: "hopeful" }
    ],
    choices: [
      { text: "Say “no thanks” and change the subject." },
      { text: "Try it, telling yourself it’s only once." }
    ]
  },
  {
    chapter: "THE ROUTINE",
    setting: "bedroom",
    dialogue: [
      { speaker: "You", text: "It’s been a few weeks. I thought I’d only do it once, but now I keep reaching for it.", mood: "concerned" },
      { speaker: "You", text: "When I’m stressed, I tell myself it’ll help me relax. Then I start thinking about it even when I hadn’t planned to.", mood: "worried" },
      { speaker: "You", text: "I tried leaving it behind today. I felt restless and distracted. Why can’t I just stop?", mood: "sad" },
      { speaker: "You", text: "Nicotine dependence can make stopping difficult. This isn’t a lack of willpower, and I deserve support without judgment.", mood: "hopeful" },
      { speaker: "You", text: "I can take one small step right now. What might help me through this moment?", mood: "determined" }
    ],
    choices: [
      { text: "Take a walk, breathe, or talk to someone you trust." },
      { text: "Reach for the vape because it feels like quick relief." }
    ]
  },
  {
    chapter: "THE PEOPLE AROUND YOU",
    setting: "home",
    dialogue: [
      { speaker: "You", text: "Mom noticed I’d been quieter lately and asked if something was wrong.", mood: "worried" },
      { speaker: "Mom", text: "You seem more tired than usual. I’m not angry. I just want to understand how you’re feeling.", mood: "concerned" },
      { speaker: "Your friend", text: "That sounds like a lot to carry. You don't have to handle it alone.", mood: "concerned" },
      { speaker: "You", text: "I’m scared she’ll be disappointed if I tell her what’s been going on.", mood: "sad" },
      { speaker: "Mom", text: "I care about you. We can talk with a health professional together and work out what support would help.", mood: "hopeful" },
      { speaker: "Your friend", text: "People who care about you want to help, not blame you. You can start with just one honest sentence.", mood: "hopeful" },
      { speaker: "You", text: "Maybe I can ask Mom to sit with me while I talk to someone who knows about health.", mood: "determined" },
      { speaker: "Your friend", text: "You can take this one step at a time. Asking for help is a strong first step.", mood: "happy" }
    ],
    choices: [
      { text: "Tell someone you trust what’s been going on." },
      { text: "Brush it off and keep the habit to yourself." }
    ]
  },
  {
    chapter: "A WAY FORWARD",
    setting: "park",
    dialogue: [
      { speaker: "You", text: "I want things to change, but quitting feels bigger than I expected.", mood: "concerned" },
      { speaker: "Your friend", text: "You don’t have to solve it all today. We can start with one person you trust.", mood: "hopeful" },
      { speaker: "You", text: "What if I try and it doesn’t work the first time?", mood: "worried" },
      { speaker: "Your friend", text: "A difficult day doesn’t erase your effort. A trusted adult or health professional can help you make a plan that fits you.", mood: "hopeful" },
      { speaker: "Your friend", text: "You deserve support, not blame. What feels like one possible next step?", mood: "determined" }
    ],
    choices: [
      { text: "Ask a trusted adult or health professional to help make a plan." },
      { text: "Try to manage it on your own, one day at a time." },
      { text: "Decide not to think about it for now." }
    ]
  }
];

const palette = {
  you: { skin: "#b77556", skinShade: "#965d48", hair: "#342a2b", hairLight: "#59413a", iris: "#547d9a", top: "#e89572", topShade: "#cc7458", pants: "#466572", shoes: "#f4e3bf" },
  friend: { skin: "#edbd91", skinShade: "#cf9874", hair: "#503830", hairLight: "#76503b", iris: "#649176", top: "#71957b", topShade: "#567761", pants: "#705e80", shoes: "#f6e5c7" },
  helper: { skin: "#d69b72", skinShade: "#b77b5d", hair: "#45352d", hairLight: "#695043", iris: "#9b7751", top: "#e2b15f", topShade: "#c89245", pants: "#657d71", shoes: "#f3e5c8" },
  clinician: { skin: "#d69b72", skinShade: "#b77b5d", hair: "#45352d", hairLight: "#695043", iris: "#9b7751", top: "#d7e8e4", topShade: "#9ebbb4", pants: "#627e83", shoes: "#f3e5c8" }
};

const keys = new Set();
const player = { x: 480, y: 380, direction: "down", step: 0 };
let sceneIndex = -1;
let dialoguePageIndex = 0;
let choiceAftermath = null;
let currentDialogue = [];
let vapingContinues = false;
let playing = false;
let talking = false;
let nearby = false;
let healthCutsceneStep = -1;
let healthCutsceneComplete = false;
let sceneCharacter = { x: 660, y: 300, type: "friend" };
let canvasScale = 1;
let worldHeight = 540;
let lastFrame = 0;
let toastTimer;
const quizUrl = "";

function getCharacterScale() {
  return Math.min(960 / (worldWrap.clientWidth || 960), 3.3);
}

function resizeCanvas() {
  const bounds = worldWrap.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(bounds.width * dpr);
  canvas.height = Math.round(bounds.height * dpr);
  canvasScale = canvas.width / 960;
  worldHeight = canvas.height / canvasScale;
}

function roundedRect(x, y, width, height, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function ellipse(x, y, rx, ry, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function line(points, color, width = 4) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function drawFlower(x, y, color, size = 4) {
  for (let petal = 0; petal < 5; petal += 1) {
    const angle = (petal / 5) * Math.PI * 2;
    ellipse(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size * 0.62, size * 0.62, color);
  }
  ellipse(x, y, size * 0.48, size * 0.48, "#eebd69");
}

function drawTree(x, y, scale = 1, autumn = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ellipse(0, 22, 38, 13, "rgba(54,73,46,.13)");
  roundedRect(-7, -40, 14, 62, 6, "#88684c");
  line([[-1, -8], [-21, -32]], "#88684c", 7);
  line([[3, -13], [22, -39]], "#88684c", 7);
  const leaves = autumn
    ? ["#d29d67", "#e0b576", "#c48460", "#e7c181"]
    : ["#73966a", "#86a873", "#668b65", "#9ab47c"];
  ellipse(-19, -46, 28, 29, leaves[0]);
  ellipse(14, -53, 31, 32, leaves[1]);
  ellipse(-1, -72, 25, 27, leaves[2]);
  ellipse(29, -39, 21, 22, leaves[3]);
  ellipse(-31, -31, 17, 18, leaves[2]);
  ctx.restore();
}

function drawBush(x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ellipse(0, 10, 31, 8, "rgba(48,70,44,.12)");
  ellipse(-17, 0, 18, 19, "#829f6f");
  ellipse(3, -9, 23, 24, "#91aa78");
  ellipse(23, 0, 19, 18, "#78966a");
  ellipse(-7, -5, 3, 3, "#b2c391");
  ellipse(13, -13, 3, 3, "#b2c391");
  ctx.restore();
}

function drawSchool() {
  const h = worldHeight;
  ctx.fillStyle = "#a9c58f";
  ctx.fillRect(0, 0, 960, h);
  ctx.fillStyle = "#c8d49d";
  ctx.fillRect(0, h * 0.47, 960, h * 0.53);
  roundedRect(48, h * 0.08, 330, Math.min(196, h * 0.34), 10, "#e8c99e");
  ctx.fillStyle = "#ad785e";
  ctx.beginPath();
  ctx.moveTo(28, h * 0.09 + 18);
  ctx.lineTo(213, h * 0.035);
  ctx.lineTo(398, h * 0.09 + 18);
  ctx.closePath();
  ctx.fill();
  roundedRect(76, h * 0.22, 272, 13, 5, "#bb8869");
  [88, 147, 206, 265, 324].forEach((x) => {
    roundedRect(x, h * 0.14, 42, 48, 5, "#88b4ad");
    roundedRect(x + 17, h * 0.14, 3, 48, 2, "#f3e3c5");
    roundedRect(x, h * 0.14 + 23, 42, 3, 2, "#f3e3c5");
  });
  roundedRect(185, h * 0.27, 55, 59, 5, "#926b53");
  ellipse(213, h * 0.31, 4, 4, "#f5d894");
  line([[0, h * 0.64], [250, h * 0.59], [496, h * 0.63], [740, h * 0.58], [960, h * 0.62]], "#d6c69d", 76);
  line([[0, h * 0.64], [250, h * 0.59], [496, h * 0.63], [740, h * 0.58], [960, h * 0.62]], "#e5d7b4", 63);
  drawTree(540, h * 0.49, 1.12);
  drawTree(855, h * 0.48, 1.35);
  drawBush(449, h * 0.48, .85);
  drawBush(725, h * 0.5, 1);
  drawBush(105, h * 0.49, .85);
  roundedRect(78, h * 0.77, 95, 10, 4, "#a17a54");
  roundedRect(89, h * 0.79, 7, 27, 3, "#80664e");
  roundedRect(155, h * 0.79, 7, 27, 3, "#80664e");
}

function drawBedroom() {
  const h = worldHeight;
  ctx.fillStyle = "#d8c8ac";
  ctx.fillRect(0, 0, 960, h);
  ctx.fillStyle = "#b79b7d";
  ctx.fillRect(0, h * .49, 960, h * .51);
  ctx.fillStyle = "#a8c0b9";
  roundedRect(105, h * .09, 257, Math.min(178, h * .27), 8, "#f2e4c9");
  roundedRect(118, h * .105, 231, Math.min(151, h * .235), 4, "#93b8b4");
  ellipse(293, h * .15, 20, 20, "#f7dda0");
  line([[118, h * .32], [185, h * .22], [246, h * .32], [300, h * .25], [349, h * .31]], "#819d89", 8);
  roundedRect(632, h * .27, 260, 145, 12, "#957b63");
  roundedRect(614, h * .35, 295, 114, 18, "#668b86");
  roundedRect(648, h * .3, 91, 63, 12, "#f5e8d2");
  roundedRect(752, h * .31, 102, 57, 12, "#eadbbf");
  roundedRect(470, h * .32, 22, 116, 5, "#886d51");
  roundedRect(449, h * .315, 64, 13, 5, "#886d51");
  ellipse(478, h * .3, 25, 25, "#85a077");
  ellipse(500, h * .29, 19, 19, "#9aaf7d");
  drawTree(78, h * .56, .8);
  roundedRect(91, h * .52, 48, 10, 4, "#d29a6f");
  for (let i = 0; i < 7; i += 1) drawFlower(185 + i * 95, h * .77 + (i % 2) * 13, "#f0d7a4", 3);
}

function drawHome() {
  const h = worldHeight;
  ctx.fillStyle = "#d5c6ac";
  ctx.fillRect(0, 0, 960, h);
  ctx.fillStyle = "#b49a7e";
  ctx.fillRect(0, h * .5, 960, h * .5);
  roundedRect(640, h * .09, 225, Math.min(171, h * .25), 6, "#f2e2c5");
  roundedRect(654, h * .105, 197, Math.min(143, h * .21), 3, "#a4bfba");
  roundedRect(746, h * .105, 10, Math.min(143, h * .21), 2, "#f4e6cc");
  roundedRect(654, h * .2, 197, 8, 2, "#f4e6cc");
  ellipse(814, h * .145, 21, 21, "#f4d893");
  line([[654, h * .29], [705, h * .22], [759, h * .29], [804, h * .235], [851, h * .29]], "#81a18a", 9);
  roundedRect(90, h * .33, 330, 84, 11, "#79927a");
  roundedRect(63, h * .4, 382, 108, 13, "#5f7c70");
  roundedRect(101, h * .35, 116, 61, 13, "#efe2ca");
  roundedRect(229, h * .35, 116, 61, 13, "#e7d8bd");
  roundedRect(501, h * .3, 16, 136, 4, "#937251");
  roundedRect(483, h * .29, 53, 12, 4, "#937251");
  ellipse(508, h * .27, 25, 26, "#88a276");
  ellipse(533, h * .265, 18, 20, "#75966e");
  drawTree(881, h * .54, 1.1);
  for (let i = 0; i < 8; i += 1) drawFlower(106 + i * 103, h * .76 + (i % 2) * 10, "#f0d7a4", 3);
}

function drawHospital() {
  const h = worldHeight;
  ctx.fillStyle = "#d9e8e8";
  ctx.fillRect(0, 0, 960, h);
  ctx.fillStyle = "#c8d6d3";
  ctx.fillRect(0, h * .56, 960, h * .44);
  roundedRect(80, h * .09, 282, h * .3, 10, "#f6f5ed");
  roundedRect(96, h * .12, 250, h * .24, 5, "#a9c8c8");
  roundedRect(215, h * .12, 9, h * .24, 3, "#f6f5ed");
  roundedRect(96, h * .235, 250, 8, 3, "#f6f5ed");
  roundedRect(697, h * .1, 150, 100, 8, "#f7f8f1");
  roundedRect(708, h * .112, 128, 77, 5, "#e1ece6");
  line([[723, h * .16], [747, h * .16], [759, h * .135], [772, h * .176], [785, h * .15], [818, h * .15]], "#6c9e8e", 4);
  roundedRect(692, h * .22, 160, 9, 4, "#9aa9a2");
  roundedRect(367, h * .58, 363, 24, 8, "#718d8a");
  roundedRect(385, h * .59, 328, 72, 12, "#f7f4e9");
  roundedRect(388, h * .7, 17, 74, 5, "#718d8a");
  roundedRect(693, h * .7, 17, 74, 5, "#718d8a");
  roundedRect(337, h * .6, 27, 105, 7, "#8da39c");
  roundedRect(273, h * .36, 82, 105, 8, "#f8f6ec");
  roundedRect(283, h * .375, 62, 62, 5, "#dce9e3");
  const pulse = performance.now() / 120;
  const pulseX = ((pulse % 4) / 4) * 48;
  const pulseY = h * .41;
  ctx.save();
  ctx.beginPath();
  ctx.rect(287, h * .39, 54, 25);
  ctx.clip();
  line([[287, pulseY], [298, pulseY], [304, pulseY - 5], [309, pulseY + 9], [315, pulseY - 13], [321, pulseY + 4], [327, pulseY], [341, pulseY]], "#438f7e", 3);
  ctx.restore();
  ellipse(287 + pulseX, pulseY, 3.5, 3.5, "#53b99a");
  ctx.fillStyle = "#526e68";
  ctx.font = "bold 8px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MONITORING", 314, h * .465);
  const alarmGlow = .55 + Math.sin(performance.now() / 180) * .35;
  ellipse(343, h * .387, 4, 4, `rgba(211, 105, 89, ${alarmGlow})`);
  roundedRect(294, h * .45, 38, 6, 3, "#e8b2a1");
  roundedRect(297, h * .48, 32, 7, 3, "#e1e9e1");
  roundedRect(113, h * .44, 58, 58, 10, "#f6f5ed");
  roundedRect(132, h * .425, 20, 87, 5, "#d77f70");
  roundedRect(98, h * .458, 88, 20, 5, "#d77f70");
  roundedRect(0, h * .52, 960, 8, 0, "#b8c9c4");
}

function drawPark() {
  const h = worldHeight;
  ctx.fillStyle = "#f0cb98";
  ctx.fillRect(0, 0, 960, h);
  ellipse(756, h * .16, 60, 60, "#f8dfa7");
  ctx.fillStyle = "#b9c394";
  ctx.fillRect(0, h * .35, 960, h * .65);
  ctx.fillStyle = "#92ad7c";
  ctx.beginPath();
  ctx.moveTo(0, h * .46);
  ctx.bezierCurveTo(180, h * .36, 370, h * .5, 560, h * .42);
  ctx.bezierCurveTo(720, h * .35, 830, h * .47, 960, h * .4);
  ctx.lineTo(960, h);
  ctx.lineTo(0, h);
  ctx.fill();
  ctx.fillStyle = "#779b73";
  ctx.beginPath();
  ctx.moveTo(0, h * .7);
  ctx.bezierCurveTo(250, h * .58, 400, h * .78, 650, h * .68);
  ctx.bezierCurveTo(780, h * .62, 874, h * .72, 960, h * .66);
  ctx.lineTo(960, h);
  ctx.lineTo(0, h);
  ctx.fill();
  line([[430, h], [490, h * .83], [535, h * .73], [602, h * .66]], "#ddc99e", 60);
  line([[430, h], [490, h * .83], [535, h * .73], [602, h * .66]], "#ebd9b2", 48);
  drawTree(149, h * .53, 1.4, true);
  drawTree(856, h * .54, 1.12);
  drawBush(694, h * .53, 1.1);
  drawBush(384, h * .57, .85);
  roundedRect(612, h * .73, 100, 9, 4, "#a57b55");
  roundedRect(621, h * .75, 7, 26, 3, "#83654d");
  roundedRect(694, h * .75, 7, 26, 3, "#83654d");
  for (let i = 0; i < 9; i += 1) drawFlower(76 + i * 104, h * .87 + (i % 3) * 9, ["#f3d9a2", "#e8b3a0", "#fff0ce"][i % 3], 3);
}

function drawGroundDetails() {
  const colors = scenes[sceneIndex]?.setting === "park"
    ? ["#a6b887", "#d9c99e", "#c5a28a"]
    : ["#b8c995", "#d3d5a5", "#c6c696"];
  for (let i = 0; i < 92; i += 1) {
    const x = (i * 173 + 61) % 960;
    const y = worldHeight * (.39 + ((i * 67) % 590) / 1000);
    if (Math.abs(x - player.x) < 38 && Math.abs(y - player.y) < 30) continue;
    const color = colors[i % colors.length];
    if (i % 4 === 0) {
      drawFlower(x, y, i % 8 === 0 ? "#f0d7a4" : color, 2.2);
    } else {
      line([[x, y + 3], [x - 2, y - 2]], color, 1.6);
      line([[x, y + 3], [x + 2, y - 1]], color, 1.6);
    }
  }
}

function drawWorld() {
  if (healthCutsceneStep >= 0) {
    if (healthCutsceneStep === 0) {
      drawHome();
      drawCharacter({ x: 420, y: worldHeight * .82, type: "you", player: false, coughing: true });
      drawCharacter({ x: 640, y: worldHeight * .82, type: "helper", player: false, concerned: true });
      drawCharacter({ x: 785, y: worldHeight * .82, type: "friend", player: false, concerned: true });
    } else {
      drawHospital();
      drawCharacter({ x: 570, y: worldHeight * .66, type: "you", player: false, rotation: -Math.PI / 2, eyesClosed: false, xEyes: true, dead: true, sad: true });
      drawCharacter({ x: 770, y: worldHeight * .82, type: "helper", player: false, concerned: true });
      drawCharacter({ x: 855, y: worldHeight * .82, type: "friend", player: false, concerned: true });
      drawCharacter({ x: 665, y: worldHeight * .82, type: "clinician", player: false, concerned: true });
    }
    return;
  }
  const background = {
    school: drawSchool,
    bedroom: drawBedroom,
    home: drawHome,
    park: drawPark
  };
  const ending = !playing && sceneIndex >= scenes.length;
  (ending ? drawPark : background[scenes[sceneIndex]?.setting] || drawSchool)();
  drawGroundDetails();
  if (ending || talking || (!playing && sceneIndex < 0)) return;

  if (sceneIndex === 0) {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "friend" };
  } else if (sceneIndex === 1) {
    sceneCharacter = { x: 760, y: worldHeight * .56, type: "bed" };
  } else if (sceneIndex === 2) {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "friend" };
  } else {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "helper" };
  }

  const ground = [
    ...(sceneCharacter.type === "bed" ? [] : [{ ...sceneCharacter, player: false }]),
    { x: player.x, y: player.y, type: "you", player: true }
  ].sort((a, b) => a.y - b.y);
  ground.forEach(drawCharacter);
  drawGoalMarker();
}

function drawGoalMarker() {
  if (!playing || talking || sceneIndex < 0) return;
  const dx = sceneCharacter.x - player.x;
  const dy = sceneCharacter.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 75) return;
  const pulse = 1 + Math.sin(performance.now() / 190) * .1;
  const markerY = sceneCharacter.type === "bed"
    ? worldHeight * .35
    : sceneCharacter.y - 145 * 1.3 * getCharacterScale();
  ellipse(sceneCharacter.x, markerY, 15 * pulse, 15 * pulse, "rgba(255,251,222,.94)");
  ctx.fillStyle = "#66865c";
  ctx.font = "bold 17px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("!", sceneCharacter.x, markerY);
}

function drawCharacter(person) {
  const isPlayer = person.player;
  const colors = palette[person.type];
  const x = person.x;
  const y = person.y;
  const walking = isPlayer && keys.size > 0 && !talking && playing;
  const phase = isPlayer ? player.step : performance.now() / 360 + (person.type === "helper" ? 1.4 : 0);
  const bob = walking ? Math.abs(Math.sin(phase)) * 1.5 : Math.sin(performance.now() / 850 + x) * .45;
  const legSwing = walking ? Math.sin(phase) * .38 : 0;
  const armSwing = walking ? Math.sin(phase + Math.PI) * .28 : Math.sin(performance.now() / 1100 + x) * .025;
  const headY = -119 + bob * .35;
  const characterScale = getCharacterScale();

  ctx.save();
  const coughShake = person.coughing ? Math.sin(performance.now() / 65) * 2.5 : 0;
  ctx.translate(x + coughShake, y);
  if (person.coughing) ctx.rotate(-.1);
  if (person.rotation) ctx.rotate(person.rotation);
  ctx.scale(1.18 * characterScale, 1.3 * characterScale);
  ellipse(0, 0, 18, 5, "rgba(47,64,43,.16)");
  const drawLimb = (x1, y1, length, thickness, color, angle, endColor) => {
    ctx.save();
    ctx.translate(x1, y1);
    ctx.rotate(angle);
    roundedRect(-thickness / 2, 0, thickness, length, thickness / 2, color);
    if (endColor) ellipse(0, length - 1, thickness * .43, thickness * .48, endColor);
    ctx.restore();
  };

  const hipsY = -48 + bob;
  drawLimb(-7, hipsY, 46, 9, colors.pants, legSwing, null);
  drawLimb(7, hipsY, 46, 9, colors.pants, -legSwing, null);
  const leftFootX = -7 - Math.sin(legSwing) * 46;
  const rightFootX = 7 + Math.sin(legSwing) * 46;
  const footY = hipsY + Math.cos(legSwing) * 46;
  ellipse(leftFootX, footY + 1, 8, 3.4, colors.shoes);
  ellipse(rightFootX, footY + 1, 8, 3.4, colors.shoes);

  roundedRect(-15, -99 + bob, 30, 53, 9, colors.topShade);
  roundedRect(-13, -99 + bob, 26, 50, 8, colors.top);
  if (!person.coughing) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
    drawLimb(13, -91 + bob, 35, 9, colors.topShade, armSwing, colors.skin);
  }
  roundedRect(-2, -95 + bob, 4, 33, 2, "rgba(255,255,255,.15)");
  line([[-7, -96 + bob], [0, -88 + bob], [7, -96 + bob]], "rgba(255,244,218,.7)", 1.5);
  roundedRect(-5, -111 + bob * .35, 10, 14, 3, colors.skin);
  ellipse(0, headY, 17, 21, colors.skin);
  ellipse(-16.5, headY + 1, 2.5, 4, colors.skin);
  ellipse(16.5, headY + 1, 2.5, 4, colors.skin);

  const look = isPlayer ? player.direction : player.x < x ? "left" : "right";
  const eyeShift = look === "left" ? -1 : look === "right" ? 1 : 0;
  const worried = person.coughing || person.concerned || person.sad || (!isPlayer && sceneIndex === 2) || (isPlayer && sceneIndex === 1);
  const blink = Math.sin(performance.now() / 1700 + x) > .994;
  ctx.fillStyle = colors.hair;
  ctx.beginPath();
  ctx.moveTo(-17, headY - 2);
  ctx.bezierCurveTo(-20, headY - 21, -11, headY - 26, 1, headY - 24);
  ctx.bezierCurveTo(13, headY - 25, 20, headY - 16, 17, headY - 2);
  if (person.type === "you") {
    ctx.lineTo(7, headY - 9);
    ctx.quadraticCurveTo(-3, headY - 3, -15, headY - 4);
  } else {
    ctx.quadraticCurveTo(2, headY - 9, -8, headY - 7);
    ctx.quadraticCurveTo(-13, headY - 4, -17, headY - 2);
  }
  ctx.closePath();
  ctx.fill();
  if (person.type !== "you") {
    line([[-15, headY - 4], [-15, headY + 10]], colors.hair, 4);
    line([[15, headY - 4], [15, headY + 10]], colors.hair, 4);
  }
  line([[-7, headY - 18], [1, headY - 21], [8, headY - 19]], colors.hairLight, 1.8);
  const eyeY = headY + 1;
  const eyeHeight = blink ? 1 : 2;
  const showXEyes = person.xEyes || (person.dead && person.type === "you");
  if (showXEyes) {
    ctx.strokeStyle = "#393332";
    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    [-6, 6].forEach((eyeX) => {
      ctx.beginPath();
      ctx.moveTo(eyeX - 3, eyeY - 3);
      ctx.lineTo(eyeX + 3, eyeY + 3);
      ctx.moveTo(eyeX + 3, eyeY - 3);
      ctx.lineTo(eyeX - 3, eyeY + 3);
      ctx.stroke();
    });
  } else if (person.eyesClosed) {
    line([[-9, eyeY], [-5, eyeY - 1]], colors.hair, 1.6);
    line([[5, eyeY - 1], [9, eyeY]], colors.hair, 1.6);
  } else if (person.coughing) {
    line([[-9, eyeY], [-5, eyeY - 1]], colors.hair, 1.6);
    line([[5, eyeY - 1], [9, eyeY]], colors.hair, 1.6);
  } else {
    [-6, 6].forEach((eyeX) => {
      const cx = eyeX + eyeShift;
      if (blink) line([[cx - 2.2, eyeY], [cx + 2.2, eyeY]], colors.hair, 1.5);
      else ellipse(cx, eyeY, 1.7, eyeHeight, "#393332");
    });
  }
  line([[-9, headY - 4], [-6, headY - (worried ? 5 : 4)]], colors.hair, 1.4);
  line([[6, headY - (worried ? 5 : 4)], [9, headY - 4]], colors.hair, 1.4);
  line([[0, headY + 3], [-1, headY + 6], [1, headY + 6]], colors.skinShade, 1);
  if (worried) {
    ctx.strokeStyle = "#965e50";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, headY + 12, 4, Math.PI + .25, Math.PI * 2 - .25);
    ctx.stroke();
  } else {
    ctx.strokeStyle = "#965e50";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, headY + 10, 4, .15, Math.PI - .15);
    ctx.stroke();
  }
  if (person.coughing) {
    line([[-13, -91 + bob], [-19, -80 + bob], [-7, -72 + bob]], colors.topShade, 9);
    line([[-7, -72 + bob], [-3, -69 + bob]], colors.skin, 6);
    line([[13, -91 + bob], [12, -103 + bob], [-2, -111 + bob]], colors.topShade, 9);
    line([[-2, -111 + bob], [-9, -109 + bob]], colors.skin, 6);
    const coughPulse = Math.sin(performance.now() / 95) > 0 ? 1 : .45;
    ellipse(-17, headY + 9, 2.7 * coughPulse, 3.8 * coughPulse, "#d8edf0");
    ellipse(-22, headY + 3, 2 * coughPulse, 2.8 * coughPulse, "#d8edf0");
    line([[-27, headY + 16], [-33, headY + 14]], "#d8edf0", 2);
  }
  ctx.restore();
}

function updateInteraction() {
  if (!playing || talking || sceneIndex < 0) {
    nearby = false;
    interactionPrompt.hidden = true;
    return;
  }
  const horizontalDistance = (sceneCharacter.x - player.x) * worldWrap.clientWidth / 960;
  const verticalDistance = (sceneCharacter.y - player.y) * worldWrap.clientHeight / worldHeight;
  nearby = Math.hypot(horizontalDistance, verticalDistance) < 140;
  interactionPrompt.hidden = !nearby;
  interactionLabel.textContent = sceneCharacter.type === "bed" ? "Inspect bed" : "Talk";
  if (nearby) {
    const x = sceneCharacter.x / 960 * worldWrap.clientWidth;
    const y = sceneCharacter.y / worldHeight * worldWrap.clientHeight;
    interactionPrompt.style.left = `${x}px`;
    const promptOffset = sceneCharacter.type === "bed"
      ? worldHeight * .35 * (worldWrap.clientHeight / worldHeight)
      : 145 * 1.3 * getCharacterScale() * (worldWrap.clientWidth / 960);
    interactionPrompt.style.top = `${y - promptOffset}px`;
  }
  touchControls.classList.toggle("in-dialogue", talking);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 1800);
}

function openDialogue() {
  if (!playing) return;
  if (!nearby) {
    showToast(sceneCharacter.type === "bed" ? "Move closer to the bed" : "Walk closer to your friend");
    return;
  }
  talking = true;
  keys.clear();
  const scene = scenes[sceneIndex];
  worldWrap.classList.add("visual-novel");
  dialoguePageIndex = 0;
  choiceAftermath = null;
  currentDialogue = [...scene.dialogue];
  if (vapingContinues && sceneIndex === 2) {
    currentDialogue = currentDialogue.filter((page) => page.speaker !== "Mom" || !page.text.startsWith("You seem more tired"));
    currentDialogue.splice(1, 0,
      { speaker: "You", text: "I’ve been coughing and getting out of breath more easily. I can’t be sure what’s causing it, but it worries me.", mood: "worried", action: "coughing" },
      { speaker: "Mom", text: "I can see you’re struggling. Let’s get medical advice today. We’ll find out what’s going on together.", mood: "concerned" },
      { speaker: "Your friend", text: "Breathing changes deserve attention. A health professional can check what’s going on. You don’t have to face it alone.", mood: "concerned" }
    );
  } else if (sceneIndex === 2) {
    currentDialogue.splice(1, 0,
      { speaker: "You", text: "I told Mom people at school offered me a vape. She listened and helped me think of what I could say if it happens again.", mood: "hopeful" }
    );
  }
  if (vapingContinues && sceneIndex === 3) {
    currentDialogue.splice(2, 0,
      { speaker: "You", text: "At practice I start coughing and struggle to catch my breath. My friend finds an adult, and Mom comes to help me get medical care.", mood: "worried", action: "coughing" },
      { speaker: "Mom", text: "We’re getting you checked now. I’m right here with you.", mood: "concerned" }
    );
  }
  visualNovelStage.dataset.setting = scene.setting;
  vnCharacters.forEach((character) => {
    character.dataset.outfit = ["school", "home", "home", "school"][sceneIndex];
  });
  visualNovelStage.setAttribute("aria-hidden", "false");
  dialogue.hidden = false;
  touchControls.classList.add("in-dialogue");
  renderDialoguePage();
  updateInteraction();
}

function renderDialoguePage() {
  const scene = scenes[sceneIndex];
  const dialoguePages = choiceAftermath || currentDialogue;
  const page = dialoguePages[dialoguePageIndex];
  const isLastPage = !choiceAftermath && dialoguePageIndex === dialoguePages.length - 1;
  const isPlayerSpeaking = page.speaker === "You";
  const isFamilySpeaking = page.speaker === "Mom";
  const characterMood = page.mood;
  const participants = new Set(dialoguePages.map((dialoguePage) => dialoguePage.speaker));
  const speakerByIdentity = { you: "You", family: "Mom", friend: "Your friend" };
  const castCount = vnCharacters.filter((character) =>
    participants.has(speakerByIdentity[character.dataset.character])
  ).length;
  visualNovelStage.dataset.castCount = String(castCount);
  speakerName.textContent = page.speaker;
  vnCharacters.forEach((character) => {
    const identity = isPlayerSpeaking ? "you" : isFamilySpeaking ? "family" : "friend";
    const isSpeaking = character.dataset.character === identity;
    character.hidden = !participants.has(speakerByIdentity[character.dataset.character]);
    character.dataset.mood = isSpeaking ? characterMood : "neutral";
    character.dataset.speaking = String(isSpeaking);
    character.dataset.action = isSpeaking ? (page.action || "") : "";
    character.dataset.health = character.dataset.character === "you" && vapingContinues && sceneIndex >= 1
      ? "strained"
      : "well";
    character.classList.toggle("is-speaking", isSpeaking);
    character.querySelector("svg").setAttribute(
      "aria-label",
      `${isSpeaking ? page.speaker : character.dataset.character === "you" ? "You" : character.dataset.character === "family" ? "Mom" : "Your friend"}${isSpeaking ? `, ${characterMood}` : ""}`
    );
  });

  const choices = isLastPage
    ? `<p class="dialogue-prompt">What do you do?</p><div class="choices">${scene.choices.map((choice, index) => `
        <button class="choice" type="button" data-choice="${index}">
          <span>${choice.text}</span><span aria-hidden="true">→</span>
        </button>
      `).join("")}</div>`
    : `<div class="dialogue-actions"><button class="continue-button" type="button" aria-label="Continue dialogue" data-dialogue-next><span aria-hidden="true">→</span></button></div>`;

  dialogueContent.innerHTML = `
    <p class="dialogue-copy" id="dialogue-copy">${page.text}</p>
    ${choices}
  `;
  dialogue.classList.toggle("has-choices", isLastPage);
  dialogue.scrollTop = 0;
  window.requestAnimationFrame(alignPortraitWithDialogue);
  const nextButton = dialogueContent.querySelector("[data-dialogue-next]");
  nextButton?.addEventListener("click", () => {
    if (choiceAftermath && dialoguePageIndex === choiceAftermath.length - 1) {
      choiceAftermath = null;
      advanceAfterChoice();
      return;
    }
    dialoguePageIndex += 1;
    renderDialoguePage();
    dialogueContent.querySelector("[data-dialogue-next], [data-choice]")?.focus({ preventScroll: true });
  });
  dialogueContent.querySelectorAll("[data-choice]").forEach((button) => {
    button.addEventListener("click", () => selectChoice(Number(button.dataset.choice)));
  });
  dialogueContent.querySelector("[data-dialogue-next], [data-choice]")?.focus({ preventScroll: true });
}

function alignPortraitWithDialogue() {
  if (!talking || dialogue.hidden) return;
  const stageBounds = visualNovelStage.getBoundingClientRect();
  const dialogueBounds = dialogue.getBoundingClientRect();
  const portraitBottom = Math.max(0, stageBounds.bottom - dialogueBounds.top);
  vnCharacters.forEach((character) => {
    character.style.setProperty("--portrait-bottom", `${portraitBottom}px`);
  });
}

function closeDialogue() {
  if (!talking) return;
  talking = false;
  vnCharacters.forEach((character) => {
    character.classList.remove("is-speaking");
    character.dataset.speaking = "false";
    character.dataset.action = "";
  });
  choiceAftermath = null;
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  dialogue.hidden = true;
  touchControls.classList.remove("in-dialogue");
  updateInteraction();
}

function selectChoice(index) {
  if (sceneIndex <= 2) {
    vapingContinues = index === 1;
  }
  if (sceneIndex === 3 && index < 2) vapingContinues = false;
  if (sceneIndex === 0 && index === 1) {
    choiceAftermath = [
      {
        speaker: "You",
        text: "I take a puff, telling myself it’s only once. As soon as it’s over, I start wondering if I’ll want another.",
        mood: "worried",
        action: "vaping"
      },
      {
        speaker: "Your friend",
        text: "You don’t have to do that to fit in. If you’re unsure, we can walk away together.",
        mood: "concerned"
      }
    ];
    dialoguePageIndex = 0;
    renderDialoguePage();
    return;
  }
  advanceAfterChoice();
}

function advanceAfterChoice() {
  talking = false;
  vnCharacters.forEach((character) => {
    character.classList.remove("is-speaking");
    character.dataset.speaking = "false";
    character.dataset.action = "";
  });
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  dialogue.hidden = true;
  touchControls.classList.remove("in-dialogue");
  sceneIndex += 1;
  if (sceneIndex >= scenes.length) {
    showEnding();
    return;
  }
  startScene();
}

function startScene() {
  const scene = scenes[sceneIndex];
  chapterName.textContent = scene.chapter;
  objectiveText.textContent = sceneIndex === 1
    ? "Check in with yourself"
    : "Find " + (sceneIndex === 3 ? "your support" : "your friend");
  sceneCounter.textContent = `DAY ${sceneIndex + 1}  /  04`;
  player.x = 480;
  player.y = worldHeight * .78;
  player.direction = "up";
  sceneCharacter = sceneIndex === 1
    ? { x: 760, y: worldHeight * .56, type: "bed" }
    : { x: 650, y: worldHeight * .67, type: sceneIndex === 3 ? "helper" : "friend" };
  updateInteraction();
  const messages = [
    "Your friend is waiting nearby. Walk over and say hello.",
    "It’s been a few weeks. You’re alone in your room. Go over to the bed to reflect.",
    "Your friend wants to talk. Go over when you’re ready.",
    "A new day. Someone you trust is nearby."
  ];
  showToast(messages[sceneIndex]);
}

function showEnding() {
  if (vapingContinues && !healthCutsceneComplete) {
    beginHealthCutscene();
    return;
  }
  playing = false;
  healthCutsceneStep = vapingContinues ? 1 : -1;
  healthCutscene.hidden = true;
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  interactionPrompt.hidden = true;
  touchControls.hidden = true;
  touchControls.classList.remove("in-dialogue");
  sceneCounter.textContent = "YOUR NEXT CHAPTER";
  chapterName.textContent = vapingContinues ? "A DIFFICULT CHAPTER" : "A HOPEFUL NEXT STEP";
  objectiveText.textContent = "The story continues";
  const hopeful = !vapingContinues;
  endingScreen.innerHTML = hopeful
    ? `<span class="ending-tag">A hopeful next step</span><h2>You don’t have to do it alone.</h2><p>You chose steps that make room for change. Reaching out for support can help you make a plan that works for you. Recovery isn’t always a straight line, and a difficult day doesn’t erase your progress.</p><p>Consider talking with a trusted adult, school counselor, doctor, or local quit-support service. You deserve support without judgment.</p><button class="again-button" id="continue-to-quiz" type="button">Continue</button>`
    : `<span class="ending-tag">Bad ending: Died in the hospital</span><h2>You died.</h2><p>The strain became too much, and the hospital could not save you. Your story ends here, after a long and painful struggle with nicotine.</p><button class="again-button" id="continue-to-quiz" type="button">Continue</button>`;
  endingScreen.hidden = false;
  document.querySelector("#continue-to-quiz").addEventListener("click", showQuizPage);
}

function showQuizPage() {
  endingScreen.hidden = true;
  quizScreen.hidden = false;
  document.querySelector("#take-quiz-button").focus({ preventScroll: true });
}

function beginHealthCutscene() {
  playing = false;
  talking = false;
  interactionPrompt.hidden = true;
  toast.classList.remove("visible");
  touchControls.hidden = true;
  healthCutsceneStep = 0;
  healthCutscene.hidden = false;
  healthCutsceneStepLabel.textContent = "A frightening moment";
  healthCutsceneCopy.textContent = "After weeks of feeling worse, he starts coughing hard and struggles to catch his breath. His friend calls for help while Mom stays beside him.";
  healthCutsceneNext.setAttribute("aria-label", "Continue to the hospital scene");
  healthCutsceneNext.focus({ preventScroll: true });
  sceneCounter.textContent = "A DIFFICULT CHAPTER";
  chapterName.textContent = "GETTING HELP";
  objectiveText.textContent = "His family gets medical care";
}

function advanceHealthCutscene() {
  if (healthCutsceneStep === 0) {
    healthCutsceneStep = 1;
    healthCutsceneStepLabel.textContent = "At the hospital";
    healthCutsceneCopy.textContent = "His breathing is being closely monitored. The care team responds while Mom and his friend stay beside him, but the damage is already severe. His eyes are fixed, and the room falls silent as he slips away.";
    healthCutsceneNext.setAttribute("aria-label", "Continue to the ending");
    return;
  }
  healthCutsceneComplete = true;
  healthCutsceneStep = -1;
  healthCutscene.hidden = true;
  showEnding();
}

function resetGame() {
  sceneIndex = -1;
  vapingContinues = false;
  healthCutsceneStep = -1;
  healthCutsceneComplete = false;
  healthCutscene.hidden = true;
  currentDialogue = [];
  playing = false;
  talking = false;
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  keys.clear();
  endingScreen.hidden = true;
  quizScreen.hidden = true;
  dialogue.hidden = true;
  touchControls.hidden = true;
  startScreen.hidden = false;
  chapterName.textContent = "THE BEGINNING";
  objectiveText.textContent = "Find your friend";
  sceneCounter.textContent = "PROLOGUE";
}

function beginGame() {
  startScreen.hidden = true;
  endingScreen.hidden = true;
  quizScreen.hidden = true;
  healthCutsceneStep = -1;
  healthCutsceneComplete = false;
  healthCutscene.hidden = true;
  playing = true;
  touchControls.hidden = false;
  sceneIndex = 0;
  vapingContinues = false;
  startScene();
}

function gameLoop(time) {
  const delta = Math.min((time - lastFrame) / 16.67 || 1, 2);
  lastFrame = time;
  if (playing && !talking) {
    let dx = 0;
    let dy = 0;
    if (keys.has("arrowleft") || keys.has("a")) dx -= 1;
    if (keys.has("arrowright") || keys.has("d")) dx += 1;
    if (keys.has("arrowup") || keys.has("w")) dy -= 1;
    if (keys.has("arrowdown") || keys.has("s")) dy += 1;
    if (dx || dy) {
      const length = Math.hypot(dx, dy);
      dx /= length;
      dy /= length;
      const horizontalSpeed = 3.2 * getCharacterScale();
      player.x = Math.max(34, Math.min(926, player.x + dx * horizontalSpeed * delta));
      player.y = Math.max(worldHeight * .37, Math.min(worldHeight - 38, player.y + dy * 3.2 * delta));
      if (Math.abs(dx) > Math.abs(dy)) player.direction = dx < 0 ? "left" : "right";
      else player.direction = dy < 0 ? "up" : "down";
      player.step += .17 * delta;
    }
  }
  ctx.setTransform(canvasScale, 0, 0, canvasScale, 0, 0);
  ctx.clearRect(0, 0, 960, worldHeight);
  drawWorld();
  updateInteraction();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(key)) event.preventDefault();
  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) keys.add(key);
  if ((key === "e" || key === " ") && !event.repeat) openDialogue();
  if (key === "escape" && talking) closeDialogue();
});

window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
window.addEventListener("blur", () => keys.clear());
window.addEventListener("resize", () => {
  resizeCanvas();
  alignPortraitWithDialogue();
});
document.querySelector("#start-button").addEventListener("click", beginGame);
document.querySelector("#take-quiz-button").addEventListener("click", () => {
  if (!quizUrl) {
    showToast("Add your Kahoot or Google Forms link to enable the quiz.");
    toast.style.zIndex = "9";
    return;
  }
  window.open(quizUrl, "_blank", "noopener,noreferrer");
});
document.querySelector("#touch-talk").addEventListener("click", openDialogue);
healthCutsceneNext.addEventListener("click", advanceHealthCutscene);

document.querySelectorAll(".touch-key").forEach((button) => {
  const direction = button.dataset.dir;
  const directionKeys = { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" };
  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    keys.add(directionKeys[direction]);
  });
  const release = () => keys.delete(directionKeys[direction]);
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("lostpointercapture", release);
});

resizeCanvas();
requestAnimationFrame(gameLoop);
