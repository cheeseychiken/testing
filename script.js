const canvas = document.querySelector("#world");
const ctx = canvas.getContext("2d");
const worldWrap = document.querySelector(".world-wrap");
const chapterName = document.querySelector("#chapter-name");
const objectiveText = document.querySelector("#objective-text");
const sceneCounter = document.querySelector("#scene-counter");
const chapterProgress = document.querySelector("#chapter-progress");
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
const dadVnCharacter = cloneVnCharacter("dad", "vn-character-dad", "Dad");
const vnCharacters = [vnCharacter, secondaryVnCharacter, familyVnCharacter, dadVnCharacter];
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
const audioToggle = document.querySelector("#audio-toggle");
const textSizeToggle = document.querySelector("#text-size-toggle");

const scenes = [
  {
    chapter: "THE BEGINNING",
    setting: "school",
    dialogue: [
      { speaker: "Your friend", text: "I made a joke in class and then spent the whole lesson replaying it in my head. My brain is talented like that.", mood: "worried" },
      { speaker: "You", text: "You seem fine now. Is something going on?", mood: "concerned" },
      { speaker: "Your friend", text: "I started vaping because it gave me something to do when I felt awkward around people. It seemed like a shortcut to calm, but now I reach for it when I’m stressed too.", mood: "sad" },
      { speaker: "Your friend", text: "Some people here are offering one. I’m not trying to pressure you. I’m still figuring out why I say yes myself.", mood: "concerned" },
      { speaker: "You", text: "Part of me wants to fit in. Part of me is just bored waiting around, and I don’t know what to say.", mood: "worried" },
      { speaker: "Your friend", text: "That makes sense. You can say no, ask me to leave with you, or decide what feels right. No lecture from me.", mood: "hopeful" }
    ],
    choices: [
      { text: "Say “no thanks” and ask your friend to walk with you." },
      { text: "Try it once, hoping it will make the awkward moment easier." }
    ]
  },
  {
    chapter: "THE ROUTINE",
    setting: "bedroom",
    dialogue: [
      { speaker: "You", text: "A few weeks have passed. I tried it at school once, and now I notice the thought comes back when I’m tense—or when I’m bored and scrolling alone.", mood: "concerned" },
      { speaker: "You", text: "I keep telling myself it’s a quick reset. It doesn’t fix the assignment, the awkward conversations, or the restless feeling.", mood: "worried" },
      { speaker: "You", text: "I don’t want this to become my automatic answer. Changing a habit can be hard, and that doesn’t mean I’m weak.", mood: "sad" },
      { speaker: "Your friend", text: "I get it. I use it when I’m anxious, but that doesn’t mean it actually solves what made me anxious. We could try a different reset together.", mood: "hopeful" },
      { speaker: "You", text: "I can put it away and message someone—or reach for it again because I want the restless feeling to stop now.", mood: "determined" }
    ],
    choices: [
      { text: "Put it away and try a short walk or message your friend." },
      { text: "Use it again for quick relief, even though the stress is still there." }
    ]
  },
  {
    chapter: "THE PEOPLE AROUND YOU",
    setting: "home",
    dialogue: [
      { speaker: "You", text: "Mom and Dad are at the dining table. I could tell them what’s been going on, but I’m not sure how they’ll react.", mood: "worried" },
      { speaker: "Mom", text: "You don’t have to have the perfect words. I’ll listen first, then we can figure out what would actually help.", mood: "concerned" },
      { speaker: "Dad", text: "I’m better at fixing a wobbly chair than talking about feelings. I’ll try not to jump straight to solutions.", mood: "hopeful" },
      { speaker: "Your friend", text: "I joke when I’m nervous too. It’s okay if this comes out messy.", mood: "hopeful" },
      { speaker: "You", text: "I tried vaping because of the pressure at school. Sometimes I still think about it when I’m stressed or alone.", mood: "sad" },
      { speaker: "Mom", text: "Thank you for telling us. We’re not going to punish you for being honest. Would you like us to listen, help you find support, or give you a little time?", mood: "hopeful" },
      { speaker: "Dad", text: "We can take it one step at a time. You get a say in what that step is.", mood: "determined" }
    ],
    choices: [
      { text: "Tell Mom and Dad honestly, and ask them to listen first." },
      { text: "Say “I’m fine” for now and keep thinking it over alone." }
    ]
  },
  {
    chapter: "A WAY FORWARD",
    setting: "park",
    dialogue: [
      { speaker: "Your friend", text: "I still get anxious in a crowd. I’m trying to notice the feeling before I reach for anything, which is… a work in progress.", mood: "worried" },
      { speaker: "You", text: "I want a plan that fits my life, not a promise that everything will be easy tomorrow.", mood: "concerned" },
      { speaker: "Mom", text: "We can ask a health professional what support makes sense. You can change the plan if it isn’t working.", mood: "hopeful" },
      { speaker: "Dad", text: "And if you have a difficult day, we start again without a speech or a scoreboard.", mood: "determined" },
      { speaker: "Your friend", text: "I can come with you, or just text while you make the call. Your choice.", mood: "hopeful" }
    ],
    choices: [
      { text: "Ask your parents or a health professional for a small, realistic plan." },
      { text: "Wait for now; you’re not ready to ask for help yet." }
    ]
  }
];

const palette = {
  you: { skin: "#b77556", skinShade: "#965d48", hair: "#342a2b", hairLight: "#59413a", iris: "#547d9a", top: "#e89572", topShade: "#cc7458", pants: "#466572", shoes: "#f4e3bf" },
  friend: { skin: "#edbd91", skinShade: "#cf9874", hair: "#503830", hairLight: "#76503b", iris: "#649176", top: "#71957b", topShade: "#567761", pants: "#705e80", shoes: "#f6e5c7" },
  helper: { skin: "#d69b72", skinShade: "#b77b5d", hair: "#45352d", hairLight: "#695043", iris: "#9b7751", top: "#e2b15f", topShade: "#c89245", pants: "#657d71", shoes: "#f3e5c8" },
  clinician: { skin: "#d69b72", skinShade: "#b77b5d", hair: "#45352d", hairLight: "#695043", iris: "#9b7751", top: "#d7e8e4", topShade: "#9ebbb4", pants: "#627e83", shoes: "#f3e5c8" },
  mom: { skin: "#c58f70", skinShade: "#a16d56", hair: "#49352f", hairLight: "#725447", iris: "#547d9a", top: "#82718d", topShade: "#5e526a", pants: "#766b75", shoes: "#f3e5c8" },
  dad: { skin: "#d6a17e", skinShade: "#a9775f", hair: "#49352f", hairLight: "#725447", iris: "#547d9a", top: "#638b8a", topShade: "#456b6c", pants: "#65716f", shoes: "#f3e5c8" }
};

const keys = new Set();
const player = { x: 480, y: 380, direction: "down", step: 0 };
let sceneIndex = -1;
let dialoguePageIndex = 0;
let choiceAftermath = null;
let currentDialogue = [];
let vapingContinues = false;
let storyChoices = createStoryChoices();
let playing = false;
let talking = false;
let nearby = false;
let healthCutsceneStep = -1;
let healthCutsceneComplete = false;
let reaperRevealStartedAt = 0;
let sceneCharacter = { x: 660, y: 300, type: "friend" };
let dialogueTypingTimer = null;
let sceneTransitionTimer = null;
let audioMuted = false;
let textSizeLarge = false;
let canvasScale = 1;
let worldHeight = 540;
let lastFrame = 0;
let toastTimer;
const quizUrl = "";
let audioContext = null;
let musicTimer = null;
let musicNoteIndex = 0;
let musicGain = null;
let effectsGain = null;
let masterCompressor = null;

function createStoryChoices() {
  return {
    triedVape: false,
    repeatedUse: false,
    choseCoping: false,
    openedUp: false,
    askedForHelp: false
  };
}

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
  for (let y = h * .55; y < h; y += 34) {
    line([[0, y], [960, y]], "rgba(110,79,57,.16)", 2);
    for (let x = ((Math.floor(y / 34) % 2) * 112); x < 960; x += 224) {
      line([[x, y], [x, Math.min(y + 34, h)]], "rgba(110,79,57,.12)", 1.5);
    }
  }
  roundedRect(92, h * .07, 281, h * .32, 13, "#b69778");
  ctx.fillStyle = "#a8c0b9";
  roundedRect(105, h * .09, 257, Math.min(178, h * .27), 8, "#f2e4c9");
  roundedRect(118, h * .105, 231, Math.min(151, h * .235), 4, "#93b8b4");
  roundedRect(228, h * .105, 8, Math.min(151, h * .235), 3, "#f2e4c9");
  roundedRect(118, h * .21, 231, 7, 3, "#f2e4c9");
  ellipse(293, h * .15, 20, 20, "#f7dda0");
  line([[118, h * .32], [185, h * .22], [246, h * .32], [300, h * .25], [349, h * .31]], "#819d89", 8);
  roundedRect(87, h * .085, 29, h * .32, 9, "#ad826e");
  roundedRect(351, h * .085, 29, h * .32, 9, "#ad826e");
  line([[104, h * .09], [104, h * .4]], "rgba(255,235,208,.42)", 3);
  line([[365, h * .09], [365, h * .4]], "rgba(255,235,208,.35)", 3);
  roundedRect(414, h * .12, 88, 65, 5, "#f0e2c9");
  roundedRect(420, h * .13, 76, 53, 2, "#7f9e8e");
  line([[458, h * .13], [458, h * .183]], "#f0e2c9", 3);
  line([[420, h * .156], [496, h * .156]], "#f0e2c9", 3);
  ellipse(433, h * .15, 4, 4, "#f2d89b");
  ellipse(478, h * .165, 5, 5, "#d29a78");
  roundedRect(402, h * .7, 128, 12, 4, "#85694e");
  roundedRect(410, h * .72, 8, h * .12, 3, "#725a46");
  roundedRect(515, h * .72, 8, h * .12, 3, "#725a46");
  roundedRect(425, h * .66, 36, 7, 2, "#758c75");
  roundedRect(430, h * .64, 33, 6, 2, "#d7b87f");
  roundedRect(436, h * .62, 28, 6, 2, "#b8755e");
  roundedRect(477, h * .65, 28, 8, 3, "#f2eadc");
  roundedRect(487, h * .57, 8, 19, 3, "#d2a47b");
  ellipse(491, h * .56, 14, 7, "#f3d996");
  roundedRect(632, h * .27, 260, 145, 12, "#957b63");
  roundedRect(614, h * .35, 295, 114, 18, "#668b86");
  roundedRect(632, h * .36, 261, 20, 10, "#e1d3bb");
  roundedRect(648, h * .3, 91, 63, 12, "#f5e8d2");
  roundedRect(752, h * .31, 102, 57, 12, "#eadbbf");
  line([[635, h * .41], [887, h * .41]], "rgba(242,230,207,.5)", 2);
  roundedRect(626, h * .44, 271, 17, 7, "#a77a61");
  roundedRect(879, h * .42, 16, 29, 6, "#d5b997");
  roundedRect(470, h * .32, 22, 116, 5, "#886d51");
  roundedRect(449, h * .315, 64, 13, 5, "#886d51");
  ellipse(478, h * .3, 25, 25, "#85a077");
  ellipse(500, h * .29, 19, 19, "#9aaf7d");
  roundedRect(580, h * .39, 43, 74, 6, "#8d7256");
  roundedRect(575, h * .385, 53, 10, 4, "#ae8a67");
  roundedRect(585, h * .47, 33, 4, 2, "#694f3e");
  roundedRect(589, h * .48, 25, 4, 2, "#694f3e");
  ellipse(603, h * .375, 4, 4, "#d8bd8b");
  drawTree(78, h * .56, .8);
  roundedRect(64, h * .57, 28, 17, 4, "#b8755e");
  ellipse(78, h * .57, 15, 3.5, "#d29a6f");
  line([[67, h * .585], [89, h * .585]], "rgba(255,235,208,.42)", 1.5);
  roundedRect(91, h * .52, 48, 10, 4, "#d29a6f");
  for (let i = 0; i < 7; i += 1) drawFlower(185 + i * 95, h * .77 + (i % 2) * 13, "#f0d7a4", 3);
}

function drawHome(height = worldHeight) {
  const h = height;
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
  roundedRect(482, h * .08, 190, 62, 7, "#b18d68");
  roundedRect(492, h * .095, 170, 45, 4, "#efe4d2");
  roundedRect(514, h * .11, 42, 30, 2, "#c98e71");
  roundedRect(562, h * .11, 34, 30, 2, "#829b88");
  roundedRect(604, h * .11, 44, 30, 2, "#d5b875");
  roundedRect(704, h * .33, 180, 95, 8, "#8d725a");
  roundedRect(721, h * .35, 145, 8, 4, "#b48f68");
  roundedRect(729, h * .4, 130, 7, 3, "#a9805f");
  roundedRect(740, h * .45, 111, 7, 3, "#a9805f");
  drawTree(881, h * .54, 1.1);
}

function drawDiningTable() {
  const h = worldHeight;
  roundedRect(427, h * .68, 370, 18, 6, "#8a684d");
  roundedRect(419, h * .665, 386, 15, 6, "#b78b62");
  roundedRect(449, h * .705, 17, h * .17, 4, "#76583f");
  roundedRect(760, h * .705, 17, h * .17, 4, "#76583f");
  roundedRect(462, h * .638, 67, 25, 9, "#f3eee1");
  roundedRect(676, h * .638, 67, 25, 9, "#f3eee1");
  ellipse(494, h * .648, 11, 7, "#d6c7ae");
  ellipse(710, h * .648, 11, 7, "#d6c7ae");
  roundedRect(563, h * .642, 86, 13, 5, "#d9c6a9");
  ellipse(605, h * .635, 11, 7, "#78927c");
  line([[596, h * .634], [590, h * .62]], "#617a67", 2);
}

function drawHospital(height = worldHeight) {
  const h = height;
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
  const pulseY = h * .41;
  ctx.save();
  ctx.beginPath();
  ctx.rect(287, h * .39, 54, 25);
  ctx.clip();
  if (healthCutsceneStep >= 2) {
    line([[287, pulseY], [341, pulseY]], "#438f7e", 3);
  } else {
    line([[287, pulseY], [298, pulseY], [304, pulseY - 5], [309, pulseY + 9], [315, pulseY - 13], [321, pulseY + 4], [327, pulseY], [341, pulseY]], "#438f7e", 3);
  }
  ctx.restore();
  ctx.fillStyle = "#526e68";
  ctx.font = "bold 8px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(healthCutsceneStep >= 2 ? "ASYSTOLE" : "MONITORING", 314, h * .465);
  const alarmGlow = .55 + Math.sin(performance.now() / 180) * .35;
  ellipse(343, h * .387, 4, 4, `rgba(211, 105, 89, ${alarmGlow})`);
  roundedRect(294, h * .45, 38, 6, 3, "#e8b2a1");
  roundedRect(297, h * .48, 32, 7, 3, "#e1e9e1");
  roundedRect(113, h * .44, 58, 58, 10, "#f6f5ed");
  roundedRect(132, h * .425, 20, 87, 5, "#d77f70");
  roundedRect(98, h * .458, 88, 20, 5, "#d77f70");
  roundedRect(0, h * .52, 960, 8, 0, "#b8c9c4");
}

function drawGrimReaper(height = worldHeight) {
  const h = height;
  const elapsed = Math.max(0, performance.now() - reaperRevealStartedAt);
  const progress = Math.min(elapsed / 1400, 1);
  const fade = progress * progress * (3 - 2 * progress);
  ctx.save();
  ctx.globalAlpha *= fade;
  ctx.translate(0, (1 - fade) * 12);
  ctx.translate(355, h * .82);
  ctx.scale(1.05, 1.05);
  ellipse(0, 3, 54, 9, "rgba(42,49,49,.16)");

  line([[-35, 2], [-10, -184]], "#594d45", 5);
  ctx.fillStyle = "#c8cfca";
  ctx.beginPath();
  ctx.moveTo(-10, -184);
  ctx.bezierCurveTo(8, -222, 44, -228, 57, -210);
  ctx.bezierCurveTo(33, -219, 21, -202, 12, -177);
  ctx.closePath();
  ctx.fill();
  line([[11, -181], [26, -193], [40, -197]], "rgba(255,255,255,.62)", 2);

  const robe = ctx.createLinearGradient(-38, -157, 36, -20);
  robe.addColorStop(0, "#30363a");
  robe.addColorStop(.55, "#20272c");
  robe.addColorStop(1, "#141b20");
  ctx.fillStyle = robe;
  ctx.beginPath();
  ctx.moveTo(-20, -155);
  ctx.quadraticCurveTo(-43, -146, -48, -118);
  ctx.lineTo(-40, -43);
  ctx.quadraticCurveTo(-52, -15, -47, -5);
  ctx.quadraticCurveTo(-22, -13, -7, -4);
  ctx.quadraticCurveTo(10, -14, 28, -5);
  ctx.quadraticCurveTo(47, -16, 49, -7);
  ctx.lineTo(42, -113);
  ctx.quadraticCurveTo(40, -145, 17, -155);
  ctx.closePath();
  ctx.fill();
  line([[-22, -137], [-14, -77], [-26, -22]], "rgba(157,169,167,.18)", 3);
  line([[15, -140], [8, -81], [20, -18]], "rgba(157,169,167,.14)", 3);

  ctx.fillStyle = "#11171b";
  ctx.beginPath();
  ctx.moveTo(-28, -151);
  ctx.quadraticCurveTo(-29, -184, 0, -194);
  ctx.quadraticCurveTo(31, -183, 28, -151);
  ctx.quadraticCurveTo(18, -165, 0, -164);
  ctx.quadraticCurveTo(-16, -162, -28, -151);
  ctx.fill();
  ctx.fillStyle = "#b8b5a8";
  ctx.beginPath();
  ctx.ellipse(0, -149, 15, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ellipse(-6, -152, 3.2, 4, "#25292a");
  ellipse(6, -152, 3.2, 4, "#25292a");
  ctx.fillStyle = "#686d69";
  ctx.beginPath();
  ctx.moveTo(0, -147);
  ctx.lineTo(-3, -140);
  ctx.lineTo(3, -140);
  ctx.closePath();
  ctx.fill();
  line([[-6, -134], [-3, -132], [0, -134], [3, -132], [6, -134]], "#777b75", 1.5);

  line([[-38, -118], [-52, -87], [-43, -69]], "#252c30", 10);
  line([[-43, -69], [-46, -56], [-43, -48]], "#b8b5a8", 3);
  line([[-43, -48], [-48, -55]], "#b8b5a8", 2);
  line([[-43, -48], [-39, -56]], "#b8b5a8", 2);
  ctx.restore();
}

function drawPark() {
  const h = worldHeight;
  ctx.fillStyle = "#f0cb98";
  ctx.fillRect(0, 0, 960, h);
  ellipse(756, h * .16, 60, 60, "rgba(248,223,167,.18)");
  ellipse(756, h * .16, 60, 60, "#f8dfa7");
  ctx.fillStyle = "rgba(255,246,220,.48)";
  ctx.beginPath();
  ctx.moveTo(0, h * .35);
  ctx.bezierCurveTo(180, h * .25, 310, h * .34, 468, h * .3);
  ctx.lineTo(468, h * .37);
  ctx.bezierCurveTo(290, h * .4, 162, h * .34, 0, h * .42);
  ctx.fill();
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
  line([[430, h], [490, h * .83], [535, h * .73], [602, h * .66]], "rgba(255,255,255,.3)", 2);
  line([[0, h * .48], [960, h * .48]], "#b99a73", 3);
  line([[0, h * .52], [960, h * .52]], "#b99a73", 3);
  for (let x = 25; x < 960; x += 58) {
    roundedRect(x, h * .46, 5, h * .08, 2, "#a68a67");
  }
  drawTree(149, h * .53, 1.4, true);
  drawTree(856, h * .54, 1.12);
  drawBush(694, h * .53, 1.1);
  drawBush(384, h * .57, .85);
  drawBush(554, h * .53, .7);
  drawBush(85, h * .55, .72);
  roundedRect(257, h * .49, 7, h * .14, 3, "#665d50");
  roundedRect(247, h * .48, 27, 8, 3, "#e4d7b9");
  roundedRect(251, h * .47, 19, 8, 3, "#f4e7c9");
  ellipse(260, h * .47, 12, 4, "rgba(255,236,190,.45)");
  roundedRect(612, h * .73, 100, 9, 4, "#a57b55");
  roundedRect(608, h * .71, 108, 8, 4, "#c29668");
  roundedRect(621, h * .75, 7, 26, 3, "#83654d");
  roundedRect(694, h * .75, 7, 26, 3, "#83654d");
  line([[619, h * .78], [704, h * .78]], "#83654d", 3);
  for (let i = 0; i < 5; i += 1) {
    ellipse(84 + i * 19, h * .69 + (i % 2) * 5, 9, 4, "#9d8a70");
    ellipse(815 + i * 18, h * .66 + (i % 2) * 6, 8, 4, "#a28d72");
  }
  for (let i = 0; i < 9; i += 1) drawFlower(76 + i * 104, h * .87 + (i % 3) * 9, ["#f3d9a2", "#e8b3a0", "#fff0ce"][i % 3], 3);
  for (let i = 0; i < 5; i += 1) {
    const x = 650 + i * 34;
    const y = h * .59 + (i % 2) * 8;
    drawFlower(x, y, ["#e8b3a0", "#f4d18c", "#e7d8ed"][i % 3], 5);
    line([[x, y + 5], [x - 2, y + 16]], "#65845f", 2);
  }
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
    const cutsceneHeight = Math.min(worldHeight, 540);
    const cutsceneOffset = (worldHeight - cutsceneHeight) / 2;
    ctx.fillStyle = healthCutsceneStep === 0 ? "#b49a7e" : "#c8d6d3";
    ctx.fillRect(0, 0, 960, worldHeight);
    ctx.save();
    ctx.translate(0, cutsceneOffset);
    if (healthCutsceneStep === 0) {
      drawHome(cutsceneHeight);
      drawCharacter({ x: 420, y: cutsceneHeight * .82, type: "you", player: false, coughing: true });
      drawCharacter({ x: 640, y: cutsceneHeight * .82, type: "helper", player: false, concerned: true });
      drawCharacter({ x: 785, y: cutsceneHeight * .82, type: "friend", player: false, concerned: true });
    } else {
      drawHospital(cutsceneHeight);
      if (healthCutsceneStep >= 2) drawGrimReaper(cutsceneHeight);
      drawCharacter({ x: 570, y: cutsceneHeight * .66, type: "you", player: false, rotation: -Math.PI / 2, eyesClosed: healthCutsceneStep < 2, xEyes: healthCutsceneStep >= 2, dead: healthCutsceneStep >= 2, sad: true });
      drawCharacter({ x: 770, y: cutsceneHeight * .82, type: "helper", player: false, concerned: true });
      drawCharacter({ x: 855, y: cutsceneHeight * .82, type: "friend", player: false, concerned: true });
      drawCharacter({ x: 665, y: cutsceneHeight * .82, type: "clinician", player: false, concerned: true });
    }
    ctx.restore();
    return;
  }
  const background = {
    school: drawSchool,
    bedroom: drawBedroom,
    home: drawHome,
    park: drawPark
  };
  const ending = !playing && sceneIndex >= scenes.length;
  const setting = ending ? "park" : scenes[sceneIndex]?.setting;
  (ending ? drawPark : background[setting] || drawSchool)();
  if (setting === "school" || setting === "park") drawGroundDetails();
  if (ending || talking || (!playing && sceneIndex < 0)) return;

  if (sceneIndex === 0) {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "friend" };
  } else if (sceneIndex === 1) {
    sceneCharacter = { x: 760, y: worldHeight * .56, type: "bed" };
  } else if (sceneIndex === 2) {
    sceneCharacter = { x: 610, y: worldHeight * .72, type: "parents" };
  } else {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "helper" };
  }
  drawGoalMarker();

  const ground = [
    ...(sceneCharacter.type === "bed" || sceneCharacter.type === "parents"
      ? []
      : [{ ...sceneCharacter, player: false, offeringVape: sceneIndex === 0 }]),
    {
      x: player.x,
      y: player.y,
      type: "you",
      player: true,
      vaping: vapingContinues && sceneIndex === 1 && keys.size === 0
    }
  ].sort((a, b) => a.y - b.y);
  if (sceneIndex === 2) {
    drawCharacter({ x: 510, y: worldHeight * .78, type: "mom", player: false, concerned: true, sitting: true });
    drawCharacter({ x: 710, y: worldHeight * .78, type: "dad", player: false, concerned: true, sitting: true });
    drawDiningTable();
  }
  ground.forEach(drawCharacter);
}

function drawGoalMarker() {
  if (!playing || talking || sceneIndex < 0) return;
  const dx = sceneCharacter.x - player.x;
  const dy = sceneCharacter.y - player.y;
  const distance = Math.hypot(dx, dy);
  const pulse = 1 + Math.sin(performance.now() / 190) * .1;
  const markerY = sceneCharacter.type === "bed"
    ? worldHeight * .35
    : sceneCharacter.y - 145 * 1.3 * getCharacterScale();
  ctx.save();
  ctx.strokeStyle = distance < 75 ? "rgba(255,244,183,.95)" : "rgba(255,251,222,.78)";
  ctx.lineWidth = distance < 75 ? 3 : 2;
  ctx.shadowColor = "#fff0a8";
  ctx.shadowBlur = distance < 75 ? 22 : 12;
  ctx.beginPath();
  ctx.ellipse(sceneCharacter.x, markerY + 9, 22 * pulse, 10 * pulse, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  if (distance < 75) return;
  ellipse(sceneCharacter.x, markerY, 15 * pulse, 15 * pulse, "rgba(255,251,222,.94)");
  ctx.fillStyle = "#66865c";
  ctx.font = "bold 17px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("E", sceneCharacter.x, markerY);
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
  if (person.sitting) {
    drawLimb(-7, hipsY, 25, 9, colors.pants, -.85, null);
    drawLimb(7, hipsY, 25, 9, colors.pants, .85, null);
    line([[-24, -23 + bob], [-5, -23 + bob]], colors.shoes, 6);
    line([[5, -23 + bob], [24, -23 + bob]], colors.shoes, 6);
  } else {
    drawLimb(-7, hipsY, 46, 9, colors.pants, legSwing, null);
    drawLimb(7, hipsY, 46, 9, colors.pants, -legSwing, null);
    const leftFootX = -7 - Math.sin(legSwing) * 46;
    const rightFootX = 7 + Math.sin(legSwing) * 46;
    const footY = hipsY + Math.cos(legSwing) * 46;
    ellipse(leftFootX, footY + 1, 8, 3.4, colors.shoes);
    ellipse(rightFootX, footY + 1, 8, 3.4, colors.shoes);
  }

  roundedRect(-15, -99 + bob, 30, 53, 9, colors.topShade);
  roundedRect(-13, -99 + bob, 26, 50, 8, colors.top);
  if (!person.coughing && !person.vaping && !person.offeringVape) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
    drawLimb(13, -91 + bob, 35, 9, colors.topShade, armSwing, colors.skin);
  } else if (person.vaping) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
  } else if (person.offeringVape) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
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
  if (person.type === "mom") ellipse(-15, headY - 15, 8, 8, colors.hair);
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
  if (person.type === "dad") {
    ctx.strokeStyle = "#4d5551";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(-6, eyeY, 4, 4.5, 0, 0, Math.PI * 2);
    ctx.ellipse(6, eyeY, 4, 4.5, 0, 0, Math.PI * 2);
    ctx.moveTo(-2, eyeY);
    ctx.lineTo(2, eyeY);
    ctx.stroke();
  }
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
  if (person.vaping) {
    line([[13, -91 + bob], [19, -82 + bob], [14, -74 + bob], [12, -101 + bob]], colors.topShade, 10);
    line([[13, -91 + bob], [19, -82 + bob], [14, -74 + bob], [12, -101 + bob]], colors.top, 7);
    ellipse(12, -101 + bob, 4, 3.5, colors.skin);
    ctx.save();
    ctx.translate(12, -107 + bob);
    ctx.rotate(-.08);
    roundedRect(-2.5, -10, 5, 20, 1.8, "#3d494a");
    roundedRect(-1.5, -8, 3, 5, 1, "#8ca4a0");
    roundedRect(-1.5, 6, 3, 2, 1, "#d5a96f");
    ctx.restore();
    const vapor = .16 + (Math.sin(performance.now() / 360) + 1) * .08;
    ctx.save();
    ctx.globalAlpha = vapor;
    ctx.strokeStyle = "#f8f6ee";
    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(13, -112 + bob);
    ctx.bezierCurveTo(20, -117 + bob, 10, -122, 17, -128);
    ctx.moveTo(18, -113 + bob);
    ctx.bezierCurveTo(25, -118 + bob, 15, -122, 22, -127);
    ctx.stroke();
    ctx.restore();
  } else if (person.offeringVape) {
    line([[13, -91 + bob], [20, -81 + bob], [23, -68 + bob]], colors.topShade, 10);
    line([[13, -91 + bob], [20, -81 + bob], [23, -68 + bob]], colors.top, 7);
    ellipse(23, -68 + bob, 4, 3.5, colors.skin);
    ctx.save();
    ctx.translate(25, -78 + bob);
    ctx.rotate(.12);
    roundedRect(-2.5, -10, 5, 20, 1.8, "#3d494a");
    roundedRect(-1.5, -8, 3, 5, 1, "#8ca4a0");
    roundedRect(-1.5, 6, 3, 2, 1, "#d5a96f");
    ctx.restore();
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
  interactionLabel.textContent = sceneCharacter.type === "bed"
    ? "Inspect bed"
    : sceneCharacter.type === "parents"
      ? "Talk with Mom and Dad"
      : sceneCharacter.type === "family"
        ? "Talk with family"
        : "Talk";
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

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) {
    audioContext = new AudioContextClass();
    masterCompressor = audioContext.createDynamicsCompressor();
    masterCompressor.threshold.value = -12;
    masterCompressor.knee.value = 18;
    masterCompressor.ratio.value = 5;
    masterCompressor.attack.value = 0.006;
    masterCompressor.release.value = 0.22;
    masterCompressor.connect(audioContext.destination);
    musicGain = audioContext.createGain();
    musicGain.gain.value = audioMuted ? 0 : .34;
    musicGain.connect(masterCompressor);
    effectsGain = audioContext.createGain();
    effectsGain.gain.value = audioMuted ? 0 : 1;
    effectsGain.connect(masterCompressor);
  }
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function playTone(frequency, startTime, duration, volume, waveform = "sine") {
  if (!audioContext || !effectsGain) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = waveform;
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(effectsGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function startBackgroundMusic() {
  if (audioMuted || !getAudioContext() || musicTimer) return;
  const melody = [
    220, 261.63, 293.66, 329.63,
    246.94, 293.66, 329.63, 293.66,
    196, 246.94, 293.66, 329.63,
    220, 261.63, 293.66, 261.63
  ];
  const bassLine = [110, 123.47, 98, 87.31];
  musicTimer = window.setInterval(() => {
    const now = audioContext.currentTime + 0.03;
    const noteIndex = musicNoteIndex % melody.length;
    playMusicTone(melody[noteIndex], now, 2.4, .045);
    if (noteIndex % 4 === 0) {
      playMusicTone(bassLine[Math.floor(noteIndex / 4) % bassLine.length], now, 4.8, .025);
    }
    musicNoteIndex += 1;
  }, 1850);
}

function playMusicTone(frequency, startTime, duration, volume) {
  if (!audioContext || !musicGain) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.07);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  oscillator.connect(gain);
  gain.connect(musicGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + 0.03);
}

function playEndingSound(isHopeful) {
  if (!getAudioContext()) return;
  const now = audioContext.currentTime + 0.04;
  if (musicGain) {
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(musicGain.gain.value, now);
    musicGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    musicGain.gain.linearRampToValueAtTime(audioMuted ? 0 : .34, now + 1.8);
  }
  const notes = isHopeful
    ? [
      { frequency: 523.25, delay: 0 },
      { frequency: 659.25, delay: 0.14 },
      { frequency: 783.99, delay: 0.28 }
    ]
    : [
      { frequency: 392, delay: 0, duration: 0.26, waveform: "square" },
      { frequency: 311.13, delay: 0.22, duration: 0.28, waveform: "square" },
      { frequency: 233.08, delay: 0.48, duration: 0.55, waveform: "triangle" }
    ];
  notes.forEach(({ frequency, delay, duration = 0.4, waveform = "triangle" }) =>
    playTone(frequency, now + delay, duration, isHopeful ? 0.1 : 0.14, waveform)
  );
}

function updateAudioControl() {
  audioToggle.textContent = audioMuted ? "Sound off" : "Sound on";
  audioToggle.setAttribute("aria-pressed", String(audioMuted));
  audioToggle.setAttribute("aria-label", audioMuted ? "Turn sound on" : "Mute sound");
  if (audioContext) {
    const now = audioContext.currentTime;
    musicGain.gain.cancelScheduledValues(now);
    effectsGain.gain.cancelScheduledValues(now);
    musicGain.gain.setTargetAtTime(audioMuted ? 0 : .34, now, .08);
    effectsGain.gain.setTargetAtTime(audioMuted ? 0 : 1, now, .04);
  }
  if (audioMuted && musicTimer) {
    window.clearInterval(musicTimer);
    musicTimer = null;
  } else if (!audioMuted && playing) {
    startBackgroundMusic();
  }
}

function updateChapterProgress(completedChapters, isComplete = false) {
  const progress = Math.max(0, Math.min(4, completedChapters));
  const names = ["Introduction", "The routine", "Family conversation", "A way forward"];
  chapterProgress.setAttribute("aria-valuenow", String(progress));
  chapterProgress.setAttribute(
    "aria-valuetext",
    isComplete ? "All four chapters complete" : `${progress} of 4 chapters, ${names[progress - 1] || "Introduction"}`
  );
  chapterProgress.querySelectorAll(".progress-segment").forEach((segment, index) => {
    segment.classList.toggle("is-complete", index < progress - (isComplete ? 0 : 1));
    segment.classList.toggle("is-current", !isComplete && index === progress - 1);
  });
}

function playHospitalGroan() {
  if (!getAudioContext() || !effectsGain) return;
  const now = audioContext.currentTime + 0.12;
  const voice = audioContext.createOscillator();
  const voiceGain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  voice.type = "sawtooth";
  voice.frequency.setValueAtTime(158, now);
  voice.frequency.linearRampToValueAtTime(126, now + 0.85);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(360, now);
  filter.Q.setValueAtTime(1.2, now);
  voiceGain.gain.setValueAtTime(0.0001, now);
  voiceGain.gain.linearRampToValueAtTime(0.035, now + 0.16);
  voiceGain.gain.setValueAtTime(0.028, now + 0.5);
  voiceGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
  voice.connect(filter);
  filter.connect(voiceGain);
  voiceGain.connect(effectsGain);
  voice.start(now);
  voice.stop(now + 1.08);

  const undertone = audioContext.createOscillator();
  const undertoneGain = audioContext.createGain();
  undertone.type = "sine";
  undertone.frequency.setValueAtTime(79, now);
  undertone.frequency.linearRampToValueAtTime(63, now + 0.9);
  undertoneGain.gain.setValueAtTime(0.0001, now);
  undertoneGain.gain.linearRampToValueAtTime(0.018, now + 0.2);
  undertoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.02);
  undertone.connect(undertoneGain);
  undertoneGain.connect(effectsGain);
  undertone.start(now);
  undertone.stop(now + 1.05);
}

function playReaperRevealSound() {
  if (!getAudioContext() || !effectsGain) return;
  const now = audioContext.currentTime + 0.02;
  const wind = audioContext.createBufferSource();
  const noise = audioContext.createBuffer(1, Math.floor(audioContext.sampleRate * 1.1), audioContext.sampleRate);
  const samples = noise.getChannelData(0);
  for (let i = 0; i < samples.length; i += 1) {
    samples[i] = (Math.random() * 2 - 1) * (1 - i / samples.length);
  }
  wind.buffer = noise;
  const lowPass = audioContext.createBiquadFilter();
  lowPass.type = "lowpass";
  lowPass.frequency.setValueAtTime(520, now);
  lowPass.frequency.linearRampToValueAtTime(180, now + 0.85);
  const windGain = audioContext.createGain();
  windGain.gain.setValueAtTime(0.0001, now);
  windGain.gain.linearRampToValueAtTime(0.055, now + 0.16);
  windGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
  wind.connect(lowPass);
  lowPass.connect(windGain);
  windGain.connect(effectsGain);
  wind.start(now);
  wind.stop(now + 1.08);

  const ghostNote = audioContext.createOscillator();
  const ghostGain = audioContext.createGain();
  ghostNote.type = "sine";
  ghostNote.frequency.setValueAtTime(190, now);
  ghostNote.frequency.exponentialRampToValueAtTime(72, now + 0.9);
  ghostGain.gain.setValueAtTime(0.0001, now);
  ghostGain.gain.linearRampToValueAtTime(0.04, now + 0.18);
  ghostGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.02);
  ghostNote.connect(ghostGain);
  ghostGain.connect(effectsGain);
  ghostNote.start(now);
  ghostNote.stop(now + 1.05);

  playTone(680, now + 0.78, 0.16, 0.025, "sine");
}

function createConfetti() {
  const colors = ["#f3d37a", "#e88e73", "#a9c88d", "#8dbfc0", "#f7eee0"];
  return `<div class="confetti" aria-hidden="true">${Array.from({ length: 42 }, (_, index) => {
    const left = (index * 47 + 13) % 100;
    const delay = ((index * 17) % 30) / 10;
    const duration = 3.2 + ((index * 13) % 20) / 10;
    const color = colors[index % colors.length];
    return `<i style="--left:${left}%;--delay:${delay}s;--duration:${duration}s;--color:${color}"></i>`;
  }).join("")}</div>`;
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
  if (sceneIndex === 1 && !storyChoices.triedVape) {
    currentDialogue[0] = {
      speaker: "You",
      text: "I said no at school, but I still think about how awkward that felt. I want to understand the feeling instead of making it bigger.",
      mood: "concerned"
    };
  }
  if (sceneIndex === 2) {
    currentDialogue[4] = storyChoices.triedVape
      ? {
        speaker: "You",
        text: vapingContinues
          ? "I tried it because I felt pressure to fit in. I still reach for it when I’m stressed or alone, and I want help figuring out what to do."
          : "I tried it once when I felt pressure to fit in. I don’t want to continue, but I’m nervous about what people will think.",
        mood: "sad"
      }
      : {
        speaker: "You",
        text: "People offered me a vape at school. I said no, but the pressure and awkwardness stuck with me longer than I expected.",
        mood: "worried"
      };
    if (vapingContinues) {
      currentDialogue.splice(5, 0, {
        speaker: "Mom",
        text: "I’m glad you told us. Let’s check in with a health professional together instead of guessing what’s behind how you feel.",
        mood: "concerned"
      });
    }
  }
  if (sceneIndex === 3) {
    currentDialogue[1] = storyChoices.askedForHelp
      ? {
        speaker: "You",
        text: "I talked with Mom and Dad. We haven’t solved everything, but I have a next step and people I can check in with.",
        mood: "hopeful"
      }
      : {
        speaker: "You",
        text: vapingContinues
          ? "I’m still using it sometimes. I’m not ready to promise I’ll stop today, but I could ask someone what support is available."
          : "I’m still working out what I want to do. I don’t have to decide everything today.",
        mood: "concerned"
      };
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
  const isDadSpeaking = page.speaker === "Dad";
  const characterMood = page.mood;
  const participants = new Set(dialoguePages.map((dialoguePage) => dialoguePage.speaker));
  const speakerByIdentity = { you: "You", family: "Mom", dad: "Dad", friend: "Your friend" };
  const castCount = vnCharacters.filter((character) =>
    participants.has(speakerByIdentity[character.dataset.character])
  ).length;
  visualNovelStage.dataset.castCount = String(castCount);
  speakerName.textContent = page.speaker;
  vnCharacters.forEach((character) => {
    const identity = isPlayerSpeaking ? "you" : isFamilySpeaking ? "family" : isDadSpeaking ? "dad" : "friend";
    const isSpeaking = character.dataset.character === identity;
    character.hidden = !participants.has(speakerByIdentity[character.dataset.character]);
    character.dataset.mood = isSpeaking ? characterMood : "neutral";
    character.dataset.speaking = String(isSpeaking);
    character.dataset.action = isSpeaking
      ? (page.action || (vapingContinues && sceneIndex === 1 && dialoguePageIndex === 1 ? "vaping" : ""))
      : "";
    character.dataset.health = character.dataset.character === "you" && vapingContinues && sceneIndex >= 1
      ? "strained"
      : "well";
    character.classList.toggle("is-speaking", isSpeaking);
    character.querySelector("svg").setAttribute(
      "aria-label",
      `${isSpeaking ? page.speaker : character.dataset.character === "you" ? "You" : character.dataset.character === "family" ? "Mom" : character.dataset.character === "dad" ? "Dad" : "Your friend"}${isSpeaking ? `, ${characterMood}` : ""}`
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
    <p class="dialogue-copy" id="dialogue-copy" aria-label="${page.text.replaceAll('"', "&quot;")}"></p>
    ${choices}
  `;
  const copyElement = dialogueContent.querySelector("#dialogue-copy");
  const characters = Array.from(page.text);
  let visibleCharacters = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.clearInterval(dialogueTypingTimer);
  dialogueTypingTimer = null;
  const finishTyping = () => {
    window.clearInterval(dialogueTypingTimer);
    dialogueTypingTimer = null;
    copyElement.textContent = page.text;
    copyElement.classList.remove("is-typing");
  };
  if (reducedMotion) {
    finishTyping();
  } else {
    copyElement.classList.add("is-typing");
    dialogueTypingTimer = window.setInterval(() => {
      visibleCharacters = Math.min(visibleCharacters + 2, characters.length);
      copyElement.textContent = characters.slice(0, visibleCharacters).join("");
      if (visibleCharacters >= characters.length) {
        window.clearInterval(dialogueTypingTimer);
        dialogueTypingTimer = null;
        copyElement.classList.remove("is-typing");
      }
    }, 18);
  }
  dialogue.classList.toggle("has-choices", isLastPage);
  dialogue.scrollTop = 0;
  window.requestAnimationFrame(alignPortraitWithDialogue);
  const nextButton = dialogueContent.querySelector("[data-dialogue-next]");
  if (nextButton && dialogueTypingTimer) nextButton.setAttribute("aria-label", "Show full dialogue text");
  nextButton?.addEventListener("click", () => {
    if (dialogueTypingTimer) {
      finishTyping();
      nextButton.setAttribute("aria-label", "Continue dialogue");
      return;
    }
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
  window.clearInterval(dialogueTypingTimer);
  dialogueTypingTimer = null;
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
  canvas.focus({ preventScroll: true });
  updateInteraction();
}

function selectChoice(index) {
  if (sceneIndex === 0) {
    storyChoices.triedVape = index === 1;
    vapingContinues = index === 1;
    if (index === 1) {
      choiceAftermath = [
        {
          speaker: "You",
          text: "I try it because I feel watched. It doesn’t make the awkward moment disappear, and I’m not sure how I feel about having tried it.",
          mood: "worried",
          action: "vaping"
        },
        {
          speaker: "Your friend",
          text: "You don’t owe anyone a repeat performance. I’m not proud of how I started either, but I’m not here to judge you.",
          mood: "concerned"
        }
      ];
      dialoguePageIndex = 0;
      renderDialoguePage();
      return;
    }
    choiceAftermath = [
      {
        speaker: "Your friend",
        text: "Thanks for being honest. I’ll walk with you. For what it’s worth, I started because I felt anxious and wanted something to do with my hands.",
        mood: "hopeful"
      },
      {
        speaker: "You",
        text: "That’s a lot more complicated than I assumed. Maybe we can talk about it without either of us pretending it’s simple.",
        mood: "determined"
      }
    ];
    dialoguePageIndex = 0;
    renderDialoguePage();
    return;
  }
  if (sceneIndex === 1) {
    storyChoices.choseCoping = index === 0;
    storyChoices.repeatedUse = index === 1;
    if (index === 1) storyChoices.triedVape = true;
    vapingContinues = index === 1;
  } else if (sceneIndex === 2) {
    storyChoices.openedUp = index === 0;
  } else if (sceneIndex === 3) {
    storyChoices.askedForHelp = index === 0;
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
  canvas.focus({ preventScroll: true });
  sceneIndex += 1;
  if (sceneIndex >= scenes.length) {
    showEnding();
    return;
  }
  startScene();
}

function startScene() {
  const scene = scenes[sceneIndex];
  updateChapterProgress(sceneIndex + 1);
  worldWrap.classList.add("scene-transition");
  window.clearTimeout(sceneTransitionTimer);
  sceneTransitionTimer = window.setTimeout(() => worldWrap.classList.remove("scene-transition"), 460);
  chapterName.textContent = scene.chapter;
  objectiveText.textContent = sceneIndex === 1
    ? "Check in with yourself"
    : sceneIndex === 2
      ? "Talk with your parents"
      : "Find " + (sceneIndex === 3 ? "your support" : "your friend");
  sceneCounter.textContent = `DAY ${sceneIndex + 1}  /  04`;
  player.x = 480;
  player.y = worldHeight * .78;
  player.direction = "up";
  sceneCharacter = sceneIndex === 1
    ? { x: 760, y: worldHeight * .56, type: "bed" }
    : sceneIndex === 2
      ? { x: 610, y: worldHeight * .72, type: "parents" }
      : { x: 650, y: worldHeight * .67, type: sceneIndex === 3 ? "helper" : "friend" };
  updateInteraction();
  const messages = [
    "Your friend is waiting nearby. Walk over and say hello.",
    "A few weeks have passed. Go to the bed to reflect.",
    "Mom and Dad are at the dining table. Go over when you’re ready to talk.",
    "A new day. Someone you trust is nearby."
  ];
  showToast(messages[sceneIndex]);
}

function showEnding() {
  const tragicRoute = storyChoices.repeatedUse && !storyChoices.openedUp && !storyChoices.askedForHelp;
  if (tragicRoute && !healthCutsceneComplete) {
    beginHealthCutscene();
    return;
  }
  playing = false;
  healthCutsceneStep = vapingContinues ? 2 : -1;
  healthCutscene.hidden = true;
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  interactionPrompt.hidden = true;
  touchControls.hidden = true;
  touchControls.classList.remove("in-dialogue");
  sceneCounter.textContent = "YOUR NEXT CHAPTER";
  const endingType = healthCutsceneComplete
    ? "tragic"
    : storyChoices.triedVape || vapingContinues
      ? "ongoing"
      : "hopeful";
  chapterName.textContent = endingType === "hopeful" ? "A HOPEFUL NEXT STEP" : "A DIFFICULT CHAPTER";
  objectiveText.textContent = "Your next step is yours to choose";
  updateChapterProgress(4, true);
  playEndingSound(endingType === "hopeful");
  const endingCopy = endingType === "tragic"
    ? {
      tag: "A tragic fictional outcome",
      heading: "A story’s worst-case ending",
      text: "His condition worsens and he dies in hospital despite the care team’s efforts. His family stays close. This is a fictional dramatic outcome—not a typical result of vaping or a prediction of what will happen to someone."
    }
    : endingType === "ongoing"
      ? {
        tag: "An unfinished chapter",
        heading: "There isn’t a tidy answer yet.",
        text: "The habit, the pressure, or the worry hasn’t vanished overnight. There may be cravings, mixed feelings, or a difficult day ahead. What changed is that the next step can be smaller—and you don’t have to take it alone."
      }
      : {
        tag: "A hopeful next step",
        heading: "You made room for a different choice.",
        text: "You noticed the pressure and chose a response that felt more like your own. That doesn’t make every hard moment easy; it gives you something to build on, with people who can listen without judgment."
      };
  endingScreen.innerHTML = `
    ${endingType === "hopeful" ? createConfetti() : ""}
    <div class="ending-content">
      <span class="ending-tag">${endingCopy.tag}</span>
      <h2>${endingCopy.heading}</h2>
      <p>${endingCopy.text}</p>
      <section class="what-now" aria-labelledby="what-now-title">
        <h3 id="what-now-title">What now?</h3>
        <ul class="resource-list">
          <li><a href="https://www.healthhub.sg/programmes/iquit" target="_blank" rel="noopener noreferrer">Singapore HealthHub I Quit</a><span>Check eligibility and sign up for a personalised quit journey, including a 28-day SMS option and QuitLine support.</span></li>
          <li><a href="tel:18004382000">QuitLine: 1800 438 2000</a><span>Speak with a trained advisor. Airtime charges may apply to mobile calls to 1800 numbers.</span></li>
        </ul>
        <h3>Talking with a friend</h3>
        <p>Pick a private, unhurried moment. Try: “I care about you, and I’m not here to judge. Want to tell me what vaping does for you?” Listen before offering advice, ask what support they want, and offer to go with them to a trusted adult or health professional. If they aren’t ready, keep the door open.</p>
        <p class="resource-note">If you’re under 18, consider asking a trusted adult or health professional to help you find support. HealthHub can explain current programme eligibility.</p>
      </section>
      <div class="ending-actions">
        <button class="again-button" id="replay-story" type="button">Replay and try a different choice</button>
        <button class="quiz-link" id="ending-quiz" type="button">Take the quiz</button>
      </div>
    </div>`;
  endingScreen.hidden = false;
  document.querySelector("#replay-story").addEventListener("click", () => {
    resetGame();
    document.querySelector("#start-button").focus({ preventScroll: true });
  });
  document.querySelector("#ending-quiz").addEventListener("click", showQuizPage);
  document.querySelector("#replay-story").focus({ preventScroll: true });
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
  healthCutsceneCopy.textContent = "He suddenly struggles to breathe. His friend gets an adult, and his family calls for emergency medical help. The cause needs to be assessed by clinicians.";
  healthCutsceneNext.setAttribute("aria-label", "Continue to the hospital scene");
  healthCutsceneNext.focus({ preventScroll: true });
  sceneCounter.textContent = "A DIFFICULT CHAPTER";
  chapterName.textContent = "GETTING HELP";
  objectiveText.textContent = "His family gets medical care";
}

function advanceHealthCutscene() {
  if (healthCutsceneStep === 0) {
    healthCutsceneStep = 1;
    playHospitalGroan();
    healthCutsceneStepLabel.textContent = "At the hospital";
    healthCutsceneCopy.textContent = "His breathing is being closely monitored. The care team responds while Mom and his friend stay beside him. Doctors assess his symptoms and begin care.";
    healthCutsceneNext.setAttribute("aria-label", "Continue to the final hospital scene");
    return;
  }
  if (healthCutsceneStep === 1) {
    healthCutsceneStep = 2;
    reaperRevealStartedAt = performance.now();
    playReaperRevealSound();
    chapterName.textContent = "A QUIET GOODBYE";
    objectiveText.textContent = "His family stays by his side";
    healthCutsceneStepLabel.textContent = "A quiet goodbye";
    healthCutsceneCopy.textContent = "His condition worsens, and he dies despite the care team’s efforts. Mom and his friend stay close. A quiet figure appears at the bedside—grim cloak, terrible timing. This is a fictional worst-case ending, not a prediction or a typical outcome of vaping.";
    healthCutsceneNext.setAttribute("aria-label", "Continue to the ending");
    return;
  }
  healthCutsceneComplete = true;
  healthCutsceneStep = -1;
  healthCutscene.hidden = true;
  showEnding();
}

function resetGame() {
  window.clearInterval(dialogueTypingTimer);
  dialogueTypingTimer = null;
  window.clearTimeout(sceneTransitionTimer);
  worldWrap.classList.remove("scene-transition");
  sceneIndex = -1;
  vapingContinues = false;
  storyChoices = createStoryChoices();
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
  updateChapterProgress(0);
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
  storyChoices = createStoryChoices();
  startScene();
  canvas.focus({ preventScroll: true });
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
  const interactiveTarget = event.target instanceof Element
    && Boolean(event.target.closest("button, a, input, select, textarea"));
  if (!interactiveTarget && playing && ["arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) {
    event.preventDefault();
  }
  if (!interactiveTarget && ["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d"].includes(key)) {
    keys.add(key);
  }
  if (key === "e" && !event.repeat && !interactiveTarget) {
    if (talking) dialogueContent.querySelector("[data-dialogue-next]")?.click();
    else openDialogue();
  }
  if (key === "escape" && talking) closeDialogue();
});

window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
window.addEventListener("blur", () => keys.clear());
window.addEventListener("resize", () => {
  resizeCanvas();
  alignPortraitWithDialogue();
});
document.querySelector("#start-button").addEventListener("click", beginGame);
document.querySelector("#start-button").addEventListener("click", startBackgroundMusic);
audioToggle.addEventListener("click", () => {
  audioMuted = !audioMuted;
  updateAudioControl();
});
textSizeToggle.addEventListener("click", () => {
  textSizeLarge = !textSizeLarge;
  document.body.dataset.textSize = textSizeLarge ? "large" : "standard";
  textSizeToggle.setAttribute("aria-pressed", String(textSizeLarge));
  textSizeToggle.textContent = textSizeLarge ? "Standard text" : "Larger text";
});
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
