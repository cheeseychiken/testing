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
  if (identity === "student-one" || identity === "student-two") {
    const svg = character.querySelector("svg");
    const badge = document.createElementNS("http://www.w3.org/2000/svg", "g");
    badge.classList.add("council-badge");
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = identity === "student-one"
      ? '<circle cx="202" cy="389" r="13" fill="#f3d37a" stroke="#71888a" stroke-width="3"/><path d="m202 380 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.5-4.4 6.2-.9z" fill="#71888a"/>'
      : '<path d="M188 376h27l-13.5 17z" fill="#e9c66e" stroke="#627a86" stroke-width="2"/><circle cx="201.5" cy="385" r="4" fill="#627a86"/>';
    svg.querySelector(".friend-shirt").after(badge);
  }
  visualNovelStage.append(character);
  return character;
}
const secondaryVnCharacter = cloneVnCharacter("you", "vn-character-secondary", "You");
const familyVnCharacter = cloneVnCharacter("family", "vn-character-family", "Mom");
const dadVnCharacter = cloneVnCharacter("dad", "vn-character-dad", "Dad");
const studentOneVnCharacter = cloneVnCharacter("student-one", "vn-character-student-one", "Student 1");
const studentTwoVnCharacter = cloneVnCharacter("student-two", "vn-character-student-two", "Student 2");
const vnCharacters = [
  vnCharacter,
  secondaryVnCharacter,
  familyVnCharacter,
  dadVnCharacter,
  studentOneVnCharacter,
  studentTwoVnCharacter
];
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
const homeTransition = document.querySelector("#home-transition");
const homeTransitionCopy = document.querySelector("#home-transition-copy");
const homeTransitionNext = document.querySelector("#home-transition-next");
const audioToggle = document.querySelector("#audio-toggle");
const textSizeToggle = document.querySelector("#text-size-toggle");

const scenes = [
  {
    chapter: "THE CLASSROOM",
    setting: "classroom",
    dialogue: [
      { speaker: "Narration", text: "The final bell rings, and your desk is piled high with exam revision papers and CCA schedules. Exhausted, you slump into your chair. Your classmate, Pickles, walks over and mentions vaping to unwind after school—a word you’ve heard around, though you honestly have no idea what it is or what happens if someone does it at school." },
      { speaker: "Pickles", text: "You look totally drained from exams and CCAs. You should try vaping after school—it’s supposed to help you relax.", mood: "concerned" },
      { speaker: "You", text: "Wait... what even is vaping? Like smoking? Isn't that against school rules?", mood: "curious" },
      { speaker: "Pickles", text: "It’s an electronic device that heats flavored liquid into an aerosol. Ministry of Education reports show that about 7 in 1,000 students on average were caught for smoking and vaping offences over a three-year period.", mood: "thinking" },
      { speaker: "You", text: "Wait, so what happens to the ones who do get caught?", mood: "concerned" },
      { speaker: "Pickles", text: "Schools confiscate the device and may take disciplinary action, such as detention or suspension, and contact your parents. What do you think?", mood: "worried" }
    ],
    choices: [
      { text: "Ask Pickles more questions out of curiosity as you pack your bag and walk out together. (Leads into Scene 2) -Good ending option" },
      { text: "Say yes and try vaping. (Bad-ending route)" }
    ]
  },
  {
    chapter: "THE SCHOOL TOILET",
    setting: "bathroom",
    dialogue: [
      { speaker: "Narration", text: "After school, you walk to the washroom with Pickles. He seems restless, like he has the urge to vape. Suddenly, the washroom door swings open and two older students walk in, talking panickily about a major anti-vaping assembly the school is organizing." },
      { speaker: "Student 1", text: "Bro, I am very stressed because I heard the school is taking action against vaping. I know it’s bad and stuff, but is it actually that harmful?", mood: "worried" },
      { speaker: "Student 2", text: "It’s completely harmful, and I also heard it’s illegal in Singapore—using, buying, or even owning one is banned. Around 800 students were referred to the Health Sciences Authority (HSA) for vaping offences in 2022 alone.", mood: "concerned" },
      { speaker: "Student 2", text: "And the penalties for anyone supplying them are huge. Anyone caught selling, importing, or distributing e-vaporisers for the first time faces a fine of up to S$10,000, up to six months in jail, or both.", mood: "worried" },
      { speaker: "Student 1", text: "What?! No wonder the World Health Organization urged governments in December 2023 to take urgent action to control e-cigarettes and ban flavored vapes to protect young people around the world. I thought they were joking. We should be careful not to get caught!", mood: "worried" },
      { speaker: "Narration", text: "After that, the two students leave the bathroom." },
      { speaker: "You", text: "Your eyes widen—you had no idea it carried actual jail time and massive fines. Pickles looks rattled too.", mood: "concerned" }
    ],
    choices: [
      { text: "Choose not to vape—you don't want to risk it. (Good route)" },
      { text: "Vape even after knowing the consequences. (Continues to Scene 3; bad-ending route)" }
    ]
  },
  {
    chapter: "HOME — DINNER TABLE",
    setting: "home",
    dialogue: [
      { speaker: "Narration", text: "It is dinner time, you are at home helping set the dinner table. Curious after what the student councillors said, you pick up a health brochure on the counter that your older sibling brought back from a polytechnic health fair. It explains what happens inside the body when someone vapes." },
      { speaker: "Mom", text: "What are you reading so seriously before dinner?", mood: "curious" },
      { speaker: "You", text: "It's a health guide on vaping. I didn't realize it could harm your lungs—I thought it was just flavored air. People who vape can have chronic coughing, red irritated eyes, and mood changes.", mood: "concerned" },
      { speaker: "Dad", text: "It's far from harmless. Look at what's inside those liquids.", mood: "concerned" },
      { speaker: "Narration", text: "You read that some sweet vapes contain diacetyl, a buttery flavoring chemical linked to bronchiolitis obliterans, sometimes called “popcorn lung.”" },
      { speaker: "Narration", text: "You discover that the US Centers for Disease Control and Prevention identified vitamin E acetate in lung-fluid samples from patients examined with EVALI, a vaping-related lung injury." },
      { speaker: "Narration", text: "You also read about a rare, life-threatening case where a vaper developed pulmonary alveolar proteinosis, a condition where proteins and fats clogged the lungs’ air sacs so severely that the person needed their lungs mechanically washed to survive." }
    ],
    choices: [
      { text: "Tell your parents you were offered a vape and ask them for support. (Good route)" },
      { text: "Keep your experience private and continue vaping. (Bad-ending route)" }
    ]
  },
  {
    chapter: "THE TURNING POINT",
    setting: "school",
    dialogue: [
      { speaker: "Narration", text: "The next morning at school, you spot Pickles leaning against the notice board looking exhausted, anxious, and irritable—clearly struggling after picking up the habit behind everyone’s back. Beside Pickles is a Student Health Advisor poster." },
      { speaker: "You", text: "Hey, Pickles. You look really stressed and worn out. What’s going on?", mood: "concerned" },
      { speaker: "Pickles", text: "(Sighs) Remember how I started vaping thinking it would help with exam stress a few months ago? I think I’ve become heavily dependent on vaping—because vapes don’t come in standard sticks like cigarettes, it’s tough to measure how much nicotine is in them.", mood: "sad" },
      { speaker: "You", text: "Wait—so if it's hard to measure, does that mean people are stuck with it forever?", mood: "worried" },
      { speaker: "Pickles", text: "I don't know. I came across an online counsellor who said about 30% of smokers can successfully wean off with professional help and support, which is way higher than trying to quit alone. I guess not, but vaping helps me, so I'm gonna continue.", mood: "sad" },
      { speaker: "Pickles", text: "You seem to be in the same condition as me. How is it going so far? Enjoying vaping?", mood: "concerned" }
    ],
    choices: [
      { text: "Say, “No, I think I should seek help from the professionals.”" },
      { text: "Say, “So far so good. It feels nice, I think I will continue vaping.” (Ending scene)" }
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
let hallwayWalk = false;
let bedroomWalk = false;
let bathroomPhase = null;
let homeTransitionActive = false;
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
const quizUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdQpCcPQRq-X0taFgfIOn3G5HLF-hTMRLaX0CDvXJepvMBxuQ/viewform?usp=dialog";
let audioContext = null;
let musicTimer = null;
let musicNoteIndex = 0;
let musicGain = null;
let effectsGain = null;
let masterCompressor = null;
const musicLevel = 0.8;

function createStoryChoices() {
  return {
    triedVape: false,
    goodEndingRoute: false,
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

function drawClassroom() {
  const h = worldHeight;
  ctx.fillStyle = "#eee7db";
  ctx.fillRect(0, 0, 960, h);
  ctx.fillStyle = "#f6f1e7";
  ctx.fillRect(0, 0, 960, h * .59);
  ctx.fillStyle = "#c8b59c";
  ctx.fillRect(0, h * .59, 960, h * .41);
  line([[0, h * .59], [960, h * .59]], "#a18a70", 7);
  for (let y = h * .65; y < h; y += 38) {
    line([[0, y], [960, y]], "rgba(102,80,61,.13)", 2);
    for (let x = (Math.floor(y / 38) % 2) * 70; x < 960; x += 140) {
      line([[x, y], [x, Math.min(y + 38, h)]], "rgba(102,80,61,.1)", 1.5);
    }
  }

  roundedRect(52, h * .1, 200, h * .34, 8, "#76918a");
  roundedRect(60, h * .12, 184, h * .3, 4, "#a9c1b6");
  roundedRect(74, h * .16, 156, h * .22, 3, "#dce6d8");
  line([[152, h * .17], [152, h * .37]], "#f6f1e7", 4);
  roundedRect(329, h * .11, 350, h * .29, 8, "#718783");
  roundedRect(341, h * .13, 326, h * .25, 4, "#8da9a0");
  ctx.fillStyle = "#f2eadc";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("OUR CLASSROOM", 504, h * .18);
  line([[376, h * .26], [633, h * .26]], "rgba(255,255,255,.55)", 3);
  line([[410, h * .32], [596, h * .32]], "rgba(255,255,255,.4)", 3);

  roundedRect(816, h * .13, 105, h * .46, 7, "#967657");
  roundedRect(824, h * .15, 89, h * .42, 4, "#d3b99a");
  roundedRect(840, h * .2, 57, h * .19, 3, "#a7c3bb");
  line([[868, h * .21], [868, h * .38]], "#f2eadc", 3);
  ellipse(897, h * .48, 3, 3, "#e8d5a5");

  const drawDesk = (x, y, width, color = "#aa8059") => {
    roundedRect(x + 13, y + 13, 10, h * .18, 3, "#795d45");
    roundedRect(x + width - 23, y + 13, 10, h * .18, 3, "#795d45");
    roundedRect(x, y, width, 16, 5, "#76573e");
    roundedRect(x - 5, y - 7, width + 10, 13, 5, color);
    line([[x + 10, y - 3], [x + width - 10, y - 3]], "rgba(255,239,210,.35)", 2);
  };
  drawDesk(96, h * .53, 185, "#b18a63");
  drawDesk(365, h * .53, 205, "#b18a63");
  drawDesk(680, h * .53, 185, "#b18a63");
  drawDesk(399, h * .72, 270, "#c09669");
}

function drawSchoolHallway(showHealthNotice = false) {
  const h = worldHeight;
  ctx.fillStyle = "#e9e2d6";
  ctx.fillRect(0, 0, 960, h);
  ctx.fillStyle = "#f5f0e7";
  ctx.fillRect(0, 0, 960, h * .57);
  ctx.fillStyle = "#c8b9a5";
  ctx.fillRect(0, h * .57, 960, h * .43);
  line([[0, h * .57], [960, h * .57]], "#9f8c76", 8);
  line([[0, h * .62], [960, h * .62]], "#eee4d3", 5);
  line([[0, h * .98], [960, h * .98]], "rgba(91,74,57,.16)", 2);

  roundedRect(38, h * .16, 236, h * .37, 8, "#667f80");
  roundedRect(45, h * .18, 222, h * .33, 5, "#91a6a1");
  for (let index = 0; index < 6; index += 1) {
    const x = 49 + index * 36;
    roundedRect(x, h * .19, 32, h * .31, 3, index % 2 ? "#839b97" : "#9aada5");
    line([[x + 5, h * .23], [x + 27, h * .23]], "rgba(239,235,222,.55)", 2);
    line([[x + 5, h * .26], [x + 27, h * .26]], "rgba(239,235,222,.55)", 2);
    line([[x + 5, h * .29], [x + 27, h * .29]], "rgba(239,235,222,.55)", 2);
    roundedRect(x + 25, h * .34, 3, 10, 1, "#e1d4bb");
  }

  const drawClassroomDoor = (x, label) => {
    roundedRect(x, h * .13, 144, h * .43, 6, "#a17d60");
    roundedRect(x + 7, h * .15, 130, h * .39, 3, "#d4b99a");
    roundedRect(x + 21, h * .18, 102, h * .2, 3, "#8ea9a5");
    roundedRect(x + 26, h * .19, 92, h * .17, 2, "#c8d8d0");
    line([[x + 72, h * .19], [x + 72, h * .36]], "#f0e6d5", 3);
    roundedRect(x + 28, h * .4, 88, h * .075, 3, "#f5f0e7");
    ctx.fillStyle = "#5b5147";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 72, h * .437);
    ellipse(x + 124, h * .48, 3, 3, "#e8d5a5");
  };
  drawClassroomDoor(315, "CLASSROOM");
  drawClassroomDoor(505, "CLASSROOM");

  if (showHealthNotice) {
    roundedRect(776, h * .1, 152, h * .48, 7, "#80664e");
    roundedRect(784, h * .12, 136, h * .44, 4, "#b58e69");
    roundedRect(792, h * .15, 120, h * .38, 3, "#d8c3a6");
    roundedRect(791, h * .17, 29, h * .1, 2, "#f7eee0");
    roundedRect(884, h * .17, 27, h * .1, 2, "#f5e8d2");
    roundedRect(829, h * .18, 49, h * .31, 2, "#f7f3e8");
    roundedRect(829, h * .18, 49, h * .075, 2, "#668783");
    ctx.fillStyle = "#fffaf0";
    ctx.font = "bold 5px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HELP", 853, h * .218);
    ctx.fillStyle = "#4d655d";
    ctx.font = "bold 7px sans-serif";
    ctx.fillText("STUDENT", 853, h * .28);
    ctx.fillText("HEALTH", 853, h * .302);
    ctx.fillText("ADVISOR", 853, h * .324);
    line([[839, h * .35], [867, h * .35]], "#92a79a", 1.5);
    ctx.fillStyle = "#6b6b5d";
    ctx.font = "5px sans-serif";
    ctx.fillText("Here to listen", 853, h * .38);
    ctx.fillText("Ask for support", 853, h * .405);
    line([[796, h * .195], [815, h * .195]], "#b98b65", 2);
    line([[796, h * .22], [815, h * .22]], "#9aaf9f", 2);
    line([[796, h * .245], [815, h * .245]], "#b98b65", 2);
    line([[888, h * .195], [905, h * .195]], "#9aaf9f", 2);
    line([[888, h * .22], [905, h * .22]], "#b98b65", 2);
    line([[888, h * .245], [905, h * .245]], "#9aaf9f", 2);
    ellipse(798, h * .18, 2, 2, "#d56f58");
    ellipse(813, h * .18, 2, 2, "#d5b45f");
    ellipse(890, h * .18, 2, 2, "#78988c");
    ellipse(903, h * .18, 2, 2, "#d56f58");
  } else {
    roundedRect(786, h * .1, 142, h * .48, 7, "#977355");
    roundedRect(795, h * .12, 124, h * .44, 4, "#d8c3a6");
    roundedRect(811, h * .16, 92, h * .13, 5, "#668783");
    ctx.fillStyle = "#fff8e9";
    ctx.font = "bold 17px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TOILETS", 857, h * .225);
    roundedRect(813, h * .33, 88, h * .19, 4, "#b4c3b9");
    roundedRect(821, h * .34, 72, h * .17, 3, "#dce3da");
    line([[857, h * .35], [857, h * .5]], "#f5f0e7", 3);
    ellipse(884, h * .44, 3, 3, "#e8d5a5");
  }

  for (let index = 0; index < 7; index += 1) {
    const x = 105 + index * 126;
    line([[x, h * .65], [x - 34, h]], "rgba(105,83,63,.12)", 2);
  }
  line([[0, h * .76], [960, h * .76]], "rgba(255,248,232,.23)", 2);
}

function drawBathroom() {
  const h = worldHeight;
  ctx.fillStyle = "#dce5df";
  ctx.fillRect(0, 0, 960, h);
  for (let y = 0; y < h * .72; y += 42) {
    line([[0, y], [960, y]], "rgba(94,125,119,.18)", 2);
    for (let x = (Math.floor(y / 42) % 2) * 40; x < 960; x += 80) {
      line([[x, y], [x, Math.min(y + 42, h * .72)]], "rgba(94,125,119,.16)", 2);
    }
  }
  ctx.fillStyle = "#b9c9bf";
  ctx.fillRect(0, h * .72, 960, h * .28);
  line([[0, h * .72], [960, h * .72]], "#8da69a", 7);
  for (let x = 35; x < 960; x += 120) {
    line([[x, h * .76], [x - 30, h]], "rgba(82,104,94,.12)", 2);
  }
  roundedRect(80, h * .19, 232, h * .42, 8, "#79928c");
  roundedRect(88, h * .22, 216, h * .37, 5, "#a9bcb2");
  line([[196, h * .23], [196, h * .58]], "#e5ece5", 5);
  roundedRect(398, h * .15, 244, h * .33, 7, "#f3f0e7");
  roundedRect(410, h * .17, 220, h * .29, 4, "#a8c6c3");
  roundedRect(700, h * .5, 170, 20, 7, "#78938c");
  roundedRect(727, h * .54, 118, 24, 10, "#e9eeea");
  line([[786, h * .57], [786, h * .64]], "#80978e", 4);
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
  if (hallwayWalk) {
    drawSchoolHallway();
    sceneCharacter = { x: 857, y: worldHeight * .8, type: "bathroom" };
    drawGoalMarker();
    drawCharacter({
      x: Math.max(36, player.x - 52),
      y: player.y + 1,
      type: "friend",
      walking: keys.size > 0,
      offeringVape: true
    });
    drawCharacter({
      x: player.x,
      y: player.y,
      type: "you",
      player: true
    });
    return;
  }
  const background = {
    classroom: drawClassroom,
    school: drawSchool,
    bathroom: drawBathroom,
    bedroom: drawBedroom,
    home: drawHome,
    park: drawPark
  };
  const ending = !playing && sceneIndex >= scenes.length;
  const setting = ending ? "park" : bedroomWalk ? "bedroom" : scenes[sceneIndex]?.setting || "classroom";
  if (ending) drawPark();
  else if (sceneIndex === 3) drawSchoolHallway(true);
  else (background[setting] || drawSchool)();
  if (setting === "park" || (setting === "school" && sceneIndex !== 3)) drawGroundDetails();
  if (homeTransitionActive && sceneIndex === 1) {
    if (storyChoices.goodEndingRoute) {
      [
        { x: 620, y: worldHeight * .82, type: "you", player: true, walking: true },
        { x: 720, y: worldHeight * .82, type: "friend", walking: true }
      ].forEach(drawCharacter);
    } else {
      [
        {
          x: 620,
          y: worldHeight * .82,
          type: "you",
          player: true,
          vaping: storyChoices.repeatedUse,
          walking: !storyChoices.repeatedUse
        },
        { x: 720, y: worldHeight * .82, type: "friend", vaping: true }
      ].forEach(drawCharacter);
    }
    return;
  }
  if (ending || talking || (!playing && sceneIndex < 0)) return;

  if (bedroomWalk) {
    sceneCharacter = { x: 760, y: worldHeight * .76, type: "bed" };
  } else if (sceneIndex === 0) {
    sceneCharacter = { x: 468, y: worldHeight * .82, type: "seat" };
  } else if (sceneIndex === 1 && bathroomPhase === "walk-to-pickles") {
    sceneCharacter = { x: 735, y: worldHeight * .72, type: "friend" };
  } else if (sceneIndex === 0 || sceneIndex === 1) {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "friend" };
  } else if (sceneIndex === 2) {
    sceneCharacter = { x: 610, y: worldHeight * .72, type: "parents" };
  } else if (sceneIndex === 3) {
    sceneCharacter = { x: 724, y: worldHeight * .79, type: "friend" };
  } else {
    sceneCharacter = { x: 650, y: worldHeight * .67, type: "friend" };
  }
  drawGoalMarker();

  const ground = sceneIndex === 0
    ? [
      { x: 620, y: worldHeight * .82, type: "friend", player: false },
      { x: player.x, y: player.y, type: "you", player: true }
    ].sort((a, b) => a.y - b.y)
    : [
      ...(sceneCharacter.type === "bed" || sceneCharacter.type === "parents"
        ? []
        : [{
          ...sceneCharacter,
          player: false,
          sad: sceneIndex === 3,
          offeringVape: sceneIndex === 1 && bathroomPhase === "walk-to-pickles"
        }]),
      { x: player.x, y: player.y, type: "you", player: true, holdingBrochure: sceneIndex === 2 && !bedroomWalk }
    ].sort((a, b) => a.y - b.y);
  if (sceneIndex === 2 && !bedroomWalk) {
    drawCharacter({ x: 510, y: worldHeight * .78, type: "mom", player: false, sitting: true });
    drawCharacter({ x: 710, y: worldHeight * .78, type: "dad", player: false, sitting: true });
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
    : sceneCharacter.type === "seat"
      ? worldHeight * .61
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
  const walking = (isPlayer && keys.size > 0 && !talking && playing) || person.walking;
  const phase = isPlayer || person.walking
    ? player.step + (person.walking ? 1.1 : 0)
    : performance.now() / 360 + (person.type === "helper" ? 1.4 : 0);
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
  if (person.holdingBrochure) {
    line([[-13, -91 + bob], [-8, -79 + bob], [-3, -75 + bob]], colors.topShade, 9);
    line([[13, -91 + bob], [8, -79 + bob], [3, -75 + bob]], colors.topShade, 9);
    line([[-13, -91 + bob], [-8, -79 + bob], [-3, -75 + bob]], colors.top, 7);
    line([[13, -91 + bob], [8, -79 + bob], [3, -75 + bob]], colors.top, 7);
    ellipse(-3, -75 + bob, 3.2, 3, colors.skin);
    ellipse(3, -75 + bob, 3.2, 3, colors.skin);
  } else if (!person.coughing && !person.vaping && !person.offeringVape) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
    drawLimb(13, -91 + bob, 35, 9, colors.topShade, armSwing, colors.skin);
  } else if (person.vaping) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
  } else if (person.offeringVape) {
    drawLimb(-13, -91 + bob, 35, 9, colors.topShade, -armSwing, colors.skin);
  }
  roundedRect(-2, -95 + bob, 4, 33, 2, "rgba(255,255,255,.15)");
  line([[-7, -96 + bob], [0, -88 + bob], [7, -96 + bob]], "rgba(255,244,218,.7)", 1.5);
  if (person.holdingBrochure) {
    roundedRect(-8, -85 + bob, 16, 19, 2, "#f3eee1");
    line([[-5, -81 + bob], [5, -81 + bob]], "#829b88", 1.2);
    line([[-5, -77 + bob], [4, -77 + bob]], "#b18d68", 1.2);
    line([[-5, -73 + bob], [3, -73 + bob]], "#b18d68", 1.2);
  }
  roundedRect(-5, -111 + bob * .35, 10, 14, 3, colors.skin);
  ellipse(0, headY, 17, 21, colors.skin);
  ellipse(-16.5, headY + 1, 2.5, 4, colors.skin);
  ellipse(16.5, headY + 1, 2.5, 4, colors.skin);

  const look = isPlayer ? player.direction : player.x < x ? "left" : "right";
  const eyeShift = look === "left" ? -1 : look === "right" ? 1 : 0;
  const worried = person.coughing || person.concerned || person.sad || (isPlayer && sceneIndex === 1);
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
  interactionLabel.textContent = sceneIndex === 1 && bathroomPhase === "walk-to-pickles"
    ? "Talk to Pickles"
    : sceneCharacter.type === "seat"
      ? "Go to your seat beside Pickles"
    : sceneCharacter.type === "bed"
    ? "Go to bed"
    : sceneCharacter.type === "bathroom"
      ? "Enter bathroom"
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
    musicGain.gain.value = audioMuted ? 0 : musicLevel;
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
    261.63, 329.63, 392, 329.63,
    293.66, 349.23, 392, 349.23,
    261.63, 329.63, 440, 392,
    293.66, 349.23, 392, 329.63
  ];
  const chords = [
    [261.63, 329.63, 392],
    [246.94, 293.66, 392],
    [220, 261.63, 329.63],
    [220, 261.63, 349.23]
  ];
  const bassLine = [130.81, 123.47, 110, 110];
  const playNextNote = () => {
    const now = audioContext.currentTime + 0.03;
    const noteIndex = musicNoteIndex % melody.length;
    playMusicTone(melody[noteIndex], now, 0.95, .09, 0.12, 0.28);
    if (noteIndex % 4 === 0) {
      const chordIndex = Math.floor(noteIndex / 4) % chords.length;
      chords[chordIndex].forEach((frequency) => playMusicTone(frequency, now, 5.1, .018, 0.7, 0.7));
      playMusicTone(bassLine[chordIndex], now, 4.8, .02, 0.6, 0.65);
    }
    musicNoteIndex += 1;
  };
  playNextNote();
  musicTimer = window.setInterval(playNextNote, 1450);
}

function playMusicTone(frequency, startTime, duration, volume, attack = 0.07, release = 0.3) {
  if (!audioContext || !musicGain) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, startTime);
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(volume, startTime + attack);
  gain.gain.setValueAtTime(volume, startTime + duration);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + release);
  oscillator.connect(gain);
  gain.connect(musicGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + duration + release + 0.03);
}

function playEndingSound(isHopeful) {
  if (!getAudioContext()) return;
  const now = audioContext.currentTime + 0.04;
  if (musicGain) {
    musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setValueAtTime(musicGain.gain.value, now);
    musicGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
    musicGain.gain.linearRampToValueAtTime(audioMuted ? 0 : musicLevel, now + 1.8);
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
    musicGain.gain.setTargetAtTime(audioMuted ? 0 : musicLevel, now, .08);
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
    showToast(sceneCharacter.type === "seat" ? "Walk to your seat beside Pickles" : sceneCharacter.type === "bathroom" ? "Walk closer to the bathroom door" : sceneCharacter.type === "bed" ? "Move closer to the bed" : "Walk closer to your friend");
    return;
  }
  if (hallwayWalk) {
    finishHallwayWalk();
    return;
  }
  if (bedroomWalk && sceneCharacter.type === "bed") {
    beginHomeTransition("The day passes.");
    return;
  }
  if (sceneIndex === 1 && bathroomPhase === "walk-to-pickles") {
    bathroomPhase = "pickles";
  }
  talking = true;
  keys.clear();
  const scene = scenes[sceneIndex];
  worldWrap.classList.add("visual-novel");
  dialoguePageIndex = 0;
  choiceAftermath = null;
  currentDialogue = sceneIndex === 1 && bathroomPhase === "pickles"
    ? [
      { speaker: "Pickles", text: "Pickles gives you the vape. “Well, wanna try? It will be worth your while.”", mood: "concerned" }
    ]
    : sceneIndex === 1 && bathroomPhase === "councillors" && storyChoices.goodEndingRoute
    ? [
      { speaker: "Narration", text: "After school, you walk to the washroom with Pickles, still trying to understand why people treat vapes like a big deal if they're just flavored devices. Suddenly, the washroom door swings open and two older student councillors walk in, talking about a major anti-vaping assembly they are organizing." },
      { speaker: "You", text: "Excuse me—we were just talking about vapes. Are they actually illegal outside of school too?", mood: "curious" },
      { speaker: "Student Councillor 1", text: "Completely illegal in Singapore—using, buying, or even owning one is banned. Around 800 students were referred to the Health Sciences Authority (HSA) for vaping offences in 2022 alone.", mood: "concerned" },
      { speaker: "Student Councillor 2", text: "And the penalties for anyone supplying them are huge. Anyone caught selling, importing, or distributing e-vaporisers for the first time faces a fine of up to S$10,000, up to six months in jail, or both.", mood: "worried" },
      { speaker: "Student Councillor 1", text: "It’s not just here, either. In December 2023, the World Health Organisation urged governments to take urgent action to control e-cigarettes and ban flavored vapes to protect young people.", mood: "concerned" },
      { speaker: "Narration", text: "Your eyes widen—you had no idea it carried actual jail time and massive fines. Pickles looks rattled too and quickly drops the subject as the councillors walk away." }
    ]
    : sceneIndex === 2 && storyChoices.goodEndingRoute
    ? [
      { speaker: "Narration", text: "It is dinner time, and you are at home helping set the dinner table. Curious after what the student councillors said, you pick up a health brochure on the counter that your older sibling brought back from a polytechnic health fair, explaining what happens inside the body when someone vapes." },
      { speaker: "Mom", text: "What are you reading so seriously before dinner?", mood: "curious" },
      { speaker: "You", text: "It's a health guide on vaping. I didn't realize it actually harms your lungs—I thought it was just flavored air, since people who vape always seem to end up with chronic coughing, red irritated eyes, and bad mood swings.", mood: "concerned" },
      { speaker: "Dad", text: "It's far from harmless. Look at what's inside those liquids.", mood: "concerned" },
      { speaker: "Narration", text: "You read that many sweet vapes contain diacetyl, a buttery flavoring chemical linked to a permanent, irreversible lung disease called “popcorn lung” (bronchiolitis obliterans)." },
      { speaker: "Narration", text: "You discover that the US CDC identified Vitamin E acetate in the lung-fluid samples of every patient examined with EVALI (vaping-related lung injury)." },
      { speaker: "Narration", text: "You also read about a rare, life-threatening case where a vaper developed pulmonary alveolar proteinosis (PAP)—a condition where proteins and fats clogged their lungs' air sacs so severely they needed their lungs mechanically washed just to survive." }
    ]
    : sceneIndex === 3 && storyChoices.goodEndingRoute
      ? [
        { speaker: "You", text: "Hey, Pickles. You look really stressed and worn out. What’s going on?", mood: "concerned" },
        { speaker: "Pickles", text: "(Sighs) Since I started vaping a few weeks ago thinking it would help with exam stress, now I can't stop without feeling awful. I talked to a counsellor yesterday, and they told me it's actually hard for them to even assess how addicted someone is to vaping—because vapes don't come in standard sticks like cigarettes, so it's tough to measure how much nicotine you're really taking in.", mood: "sad" },
        { speaker: "You", text: "Wait—so if it's hard to measure, does that mean people are stuck with it forever?", mood: "worried" },
        { speaker: "Pickles", text: "No, thankfully. The counsellor said about 30% of smokers can successfully wean off with professional help and support, which is way higher than trying to quit alone. I'm going to sign up for the school's cessation programme today.", mood: "hopeful" },
        { speaker: "You", text: "I'm glad you told me. Come on, I'll walk with you to the counselling room.", mood: "hopeful" }
      ]
    : [...scene.dialogue];
  visualNovelStage.dataset.setting = scene.setting;
  vnCharacters.forEach((character) => {
    character.dataset.outfit = ["school", "school", "home", "school"][sceneIndex];
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
  const showChoices = isLastPage
    && (sceneIndex !== 1 || bathroomPhase === "pickles")
    && !(sceneIndex === 2 && storyChoices.goodEndingRoute)
    && !(sceneIndex === 3 && storyChoices.goodEndingRoute);
  const participants = new Set(dialoguePages.map((dialoguePage) => dialoguePage.speaker));
  const speakersByIdentity = {
    you: ["You"],
    family: ["Mom", "Parent"],
    dad: ["Dad"],
    friend: ["Your friend", "Pickles"],
    "student-one": ["Student 1", "Student Councillor 1"],
    "student-two": ["Student 2", "Student Councillor 2"]
  };
  const speakingIdentity = Object.entries(speakersByIdentity).find(([, speakers]) =>
    speakers.includes(page.speaker)
  )?.[0];
  const characterMood = page.mood || "neutral";
  const castCount = vnCharacters.filter((character) =>
    speakersByIdentity[character.dataset.character].some((speaker) => participants.has(speaker))
  ).length;
  visualNovelStage.dataset.castCount = String(castCount);
  speakerName.textContent = page.speaker;
  vnCharacters.forEach((character) => {
    const identity = character.dataset.character;
    const isSpeaking = identity === speakingIdentity;
    character.hidden = !speakersByIdentity[identity].some((speaker) => participants.has(speaker));
    character.dataset.mood = isSpeaking ? characterMood : "neutral";
    character.dataset.speaking = String(isSpeaking);
    character.dataset.action = identity === "you" && sceneIndex === 2
      ? "reading-brochure"
      : isSpeaking
        ? (page.action || "")
        : "";
    character.dataset.health = character.dataset.character === "you" && vapingContinues && sceneIndex >= 1
      ? "strained"
      : "well";
    character.classList.toggle("is-speaking", isSpeaking);
    const characterName = identity === "you"
      ? "You"
      : identity === "family"
        ? "Parent"
        : identity === "dad"
          ? "Dad"
          : identity === "student-one"
            ? (page.speaker === "Student Councillor 1" ? "Student Councillor 1" : "Student 1")
            : identity === "student-two"
              ? (page.speaker === "Student Councillor 2" ? "Student Councillor 2" : "Student 2")
              : "Pickles";
    character.querySelector("svg").setAttribute(
      "aria-label",
      `${isSpeaking ? page.speaker : characterName}${isSpeaking ? `, ${characterMood}` : ""}`
    );
  });

  const choices = showChoices
    ? `<p class="dialogue-prompt">What do you do?</p><div class="choices">${scene.choices.map((choice, index) => `
        <button class="choice" type="button" data-choice="${index}">
          <span>${choice.text}</span><span aria-hidden="true">→</span>
        </button>
      `).join("")}</div>`
    : "";

  dialogueContent.innerHTML = `
    <p class="dialogue-copy" id="dialogue-copy" aria-label="${page.text.replaceAll('"', "&quot;")}"></p>
    <div class="dialogue-actions">
      <button class="continue-button previous-dialogue-button" type="button" aria-label="Previous dialogue" data-dialogue-previous${dialoguePageIndex === 0 ? " disabled" : ""}><span aria-hidden="true">←</span></button>
      ${showChoices ? "" : '<button class="continue-button" type="button" aria-label="Continue dialogue" data-dialogue-next><span aria-hidden="true">→</span></button>'}
    </div>
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
  dialogueContent.querySelector("[data-dialogue-previous]")?.addEventListener("click", () => {
    if (dialoguePageIndex === 0) return;
    dialoguePageIndex -= 1;
    renderDialoguePage();
    dialogueContent.querySelector("[data-dialogue-previous]")?.focus({ preventScroll: true });
  });
  nextButton?.addEventListener("click", () => {
    if (dialogueTypingTimer) {
      finishTyping();
      nextButton.setAttribute("aria-label", "Continue dialogue");
      return;
    }
    if (choiceAftermath && dialoguePageIndex === choiceAftermath.length - 1) {
      if (sceneIndex === 2 && storyChoices.openedUp) {
        choiceAftermath = null;
        beginBedroomWalk();
        return;
      }
      choiceAftermath = null;
      advanceAfterChoice();
      return;
    }
    if (sceneIndex === 1 && bathroomPhase === "councillors" && dialoguePageIndex === dialoguePages.length - 1) {
      if (storyChoices.goodEndingRoute) {
        beginHomeTransition();
        return;
      }
      beginPicklesWalk();
      return;
    }
    if (sceneIndex === 2 && storyChoices.goodEndingRoute && dialoguePageIndex === dialoguePages.length - 1) {
      beginBedroomWalk();
      return;
    }
    if (sceneIndex === 3 && storyChoices.goodEndingRoute && dialoguePageIndex === dialoguePages.length - 1) {
      storyChoices.askedForHelp = true;
      vapingContinues = false;
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
  dialogueContent.querySelector("[data-dialogue-next], [data-choice], [data-dialogue-previous]")?.focus({ preventScroll: true });
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
    storyChoices.goodEndingRoute = index === 0;
    vapingContinues = index === 1;
    beginHallwayWalk();
    return;
  }
  if (sceneIndex === 1) {
    storyChoices.choseCoping = index === 0;
    storyChoices.goodEndingRoute = index === 0;
    storyChoices.repeatedUse = index === 1;
    if (index === 1) storyChoices.triedVape = true;
    vapingContinues = index === 1;
  } else if (sceneIndex === 2) {
    storyChoices.openedUp = index === 0;
    if (index === 0) storyChoices.goodEndingRoute = true;
    storyChoices.repeatedUse = storyChoices.repeatedUse || index === 1;
    if (index === 1) storyChoices.triedVape = true;
    vapingContinues = index === 1;
    if (index === 0) {
      choiceAftermath = [
        { speaker: "Narration", text: "You tell your parents that Pickles offered you a vape and explain what happened at school." },
        { speaker: "Mom", text: "I'm glad you told us. You don't have to handle this on your own.", mood: "hopeful" },
        { speaker: "Dad", text: "We can help you speak with the school counsellor. They can offer professional support and help you decide what to do next.", mood: "hopeful" },
        { speaker: "You", text: "I'd like that. Thank you.", mood: "hopeful" }
      ];
      dialoguePageIndex = 0;
      renderDialoguePage();
      return;
    }
    beginBedroomWalk();
    return;
  } else if (sceneIndex === 3) {
    storyChoices.askedForHelp = index === 0;
    if (index === 1) {
      storyChoices.repeatedUse = true;
      storyChoices.triedVape = true;
    }
    vapingContinues = index === 1;
  }
  if (sceneIndex === 1) {
    beginHomeTransition();
    return;
  }
  advanceAfterChoice();
}

function beginHomeTransition(message = "After school ends, we head back home.") {
  talking = true;
  homeTransitionActive = true;
  keys.clear();
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  dialogue.hidden = true;
  vnCharacters.forEach((character) => {
    character.classList.remove("is-speaking");
    character.dataset.speaking = "false";
    character.dataset.action = "";
  });
  touchControls.classList.add("in-dialogue");
  interactionPrompt.hidden = true;
  toast.classList.remove("visible");
  homeTransitionCopy.textContent = message;
  homeTransition.hidden = false;
  homeTransitionNext.focus({ preventScroll: true });
}

function continueHomeTransition() {
  if (!homeTransitionActive) return;
  homeTransitionActive = false;
  homeTransition.hidden = true;
  talking = false;
  touchControls.classList.remove("in-dialogue");
  canvas.focus({ preventScroll: true });
  advanceAfterChoice();
}

function beginBedroomWalk() {
  talking = false;
  choiceAftermath = null;
  keys.clear();
  bedroomWalk = true;
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  dialogue.hidden = true;
  touchControls.classList.remove("in-dialogue");
  player.x = 170;
  player.y = worldHeight * .8;
  player.direction = "right";
  sceneCharacter = { x: 760, y: worldHeight * .76, type: "bed" };
  chapterName.textContent = "YOUR BEDROOM";
  objectiveText.textContent = "Go to bed";
  sceneCounter.textContent = "END OF DAY";
  document.querySelector("#touch-talk").textContent = "SLEEP";
  document.querySelector("#touch-talk").setAttribute("aria-label", "Go to bed");
  canvas.focus({ preventScroll: true });
  updateInteraction();
  showToast("Head to your bed. Press E to go to bed.");
}

function beginHallwayWalk() {
  window.clearInterval(dialogueTypingTimer);
  dialogueTypingTimer = null;
  choiceAftermath = null;
  talking = false;
  keys.clear();
  vnCharacters.forEach((character) => {
    character.classList.remove("is-speaking");
    character.dataset.speaking = "false";
    character.dataset.action = "";
  });
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  dialogue.hidden = true;
  touchControls.classList.remove("in-dialogue");
  hallwayWalk = true;
  player.x = 135;
  player.y = worldHeight * .8;
  player.direction = "right";
  player.step = 0;
  sceneCharacter = { x: 857, y: worldHeight * .8, type: "bathroom" };
  chapterName.textContent = "THE SCHOOL HALLWAY";
  objectiveText.textContent = "Walk with Pickles to the bathroom";
  sceneCounter.textContent = "AFTER SCHOOL";
  document.querySelector("#touch-talk").textContent = "ENTER";
  document.querySelector("#touch-talk").setAttribute("aria-label", "Enter the bathroom");
  canvas.focus({ preventScroll: true });
  updateInteraction();
  showToast("Walk down the hallway with Pickles. Press E at the bathroom door.");
}

function finishHallwayWalk() {
  hallwayWalk = false;
  sceneIndex = 1;
  bathroomPhase = "councillors";
  startScene();
  nearby = true;
  openDialogue();
}

function beginPicklesWalk() {
  window.clearInterval(dialogueTypingTimer);
  dialogueTypingTimer = null;
  talking = false;
  keys.clear();
  vnCharacters.forEach((character) => {
    character.classList.remove("is-speaking");
    character.dataset.speaking = "false";
    character.dataset.action = "";
  });
  worldWrap.classList.remove("visual-novel");
  visualNovelStage.setAttribute("aria-hidden", "true");
  dialogue.hidden = true;
  touchControls.classList.remove("in-dialogue");
  bathroomPhase = "walk-to-pickles";
  player.x = 340;
  player.y = worldHeight * .8;
  player.direction = "right";
  sceneCharacter = { x: 735, y: worldHeight * .72, type: "friend" };
  chapterName.textContent = "THE SCHOOL TOILET";
  objectiveText.textContent = "Walk up to Pickles";
  sceneCounter.textContent = "AFTER SCHOOL";
  canvas.focus({ preventScroll: true });
  updateInteraction();
  showToast("Walk up to Pickles and talk to him.");
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
  bedroomWalk = false;
  if (sceneIndex >= scenes.length) {
    showEnding();
    return;
  }
  startScene();
}

function startScene() {
  hallwayWalk = false;
  if (sceneIndex !== 1) bathroomPhase = null;
  document.querySelector("#touch-talk").textContent = "TALK ✦";
  document.querySelector("#touch-talk").setAttribute("aria-label", "Interact with the nearby person or object");
  const scene = scenes[sceneIndex];
  updateChapterProgress(sceneIndex + 1);
  worldWrap.classList.add("scene-transition");
  window.clearTimeout(sceneTransitionTimer);
  sceneTransitionTimer = window.setTimeout(() => worldWrap.classList.remove("scene-transition"), 460);
  chapterName.textContent = scene.chapter;
  objectiveText.textContent = sceneIndex === 1
    ? bathroomPhase === "walk-to-pickles" ? "Walk up to Pickles" : "The students are talking"
    : sceneIndex === 2
      ? "Read the health brochure"
      : sceneIndex === 0
        ? "Walk to your seat beside Pickles"
        : "Find Pickles by the notice board";
  sceneCounter.textContent = `DAY ${sceneIndex + 1}  /  04`;
  player.x = sceneIndex === 0 ? 190 : 480;
  player.y = worldHeight * .78;
  player.direction = "up";
  sceneCharacter = sceneIndex === 0
    ? { x: 468, y: worldHeight * .82, type: "seat" }
    : sceneIndex === 1
      ? { x: 735, y: worldHeight * .72, type: "friend" }
    : sceneIndex === 2
      ? { x: 610, y: worldHeight * .72, type: "parents" }
      : { x: 650, y: worldHeight * .67, type: "friend" };
  updateInteraction();
  const messages = [
    "You’re inside the classroom. Walk to your seat beside Pickles.",
    "The washroom door opens and two students walk in.",
    "At home, your parent is at the dinner table with the brochure.",
    "The next morning, you’re back at school. Find Pickles by the notice board."
  ];
  showToast(bedroomWalk ? "After dinner, you head to your bedroom." : messages[sceneIndex]);
}

function showEnding() {
  const tragicRoute = vapingContinues && !storyChoices.askedForHelp;
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
  const endingType = healthCutsceneComplete ? "tragic" : "hopeful";
  chapterName.textContent = endingType === "hopeful" ? "A HOPEFUL NEXT STEP" : "A DIFFICULT CHAPTER";
  objectiveText.textContent = "Your next step is yours to choose";
  updateChapterProgress(4, true);
  playEndingSound(endingType === "hopeful");
  const endingCopy = endingType === "tragic"
    ? {
      tag: "A difficult ending",
      heading: "You got the bad ending!",
      text: "This is a fictional worst-case outcome, not a typical result of vaping. If vaping is affecting you or someone you care about, professional support is available."
    }
    : endingType === "ongoing"
      ? {
        tag: "An unfinished chapter",
        heading: "Your story is still unfolding.",
        text: "Change can take time. If you or someone you care about needs help with vaping, professional support is available."
      }
      : {
        tag: "A hopeful ending",
        heading: "You got the good ending!",
        text: "Choosing not to vape and reaching out for support are positive steps. Professional help is available whenever you need it."
      };
  endingScreen.innerHTML = `
    ${endingType === "hopeful" ? createConfetti() : ""}
    <div class="ending-content">
      <span class="ending-tag">${endingCopy.tag}</span>
      <h2>${endingCopy.heading}</h2>
      <p>${endingCopy.text}</p>
      <section class="what-now" aria-labelledby="professional-support-title">
        <h3 id="professional-support-title">Professional support</h3>
        <ul class="resource-list">
          <li><a href="https://www.healthhub.sg/programmes/iquit" target="_blank" rel="noopener noreferrer">Singapore HealthHub I Quit</a></li>
          <li><a href="tel:18004382000">Call QuitLine: 1800 438 2000</a></li>
        </ul>
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
  healthCutsceneCopy.textContent = "He suddenly struggles to breathe. His parents become frightened and call for emergency medical help while a friend gets an adult. Clinicians need to assess what is happening.";
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
    healthCutsceneCopy.textContent = "At the hospital, his breathing is closely monitored. The care team responds while his parents and friend stay beside him. Doctors assess his symptoms and begin care.";
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
  hallwayWalk = false;
  bedroomWalk = false;
  bathroomPhase = null;
  homeTransitionActive = false;
  homeTransition.hidden = true;
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
  objectiveText.textContent = "Walk to your seat beside Pickles";
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
  hallwayWalk = false;
  bedroomWalk = false;
  bathroomPhase = null;
  homeTransitionActive = false;
  homeTransition.hidden = true;
  touchControls.hidden = false;
  sceneIndex = 0;
  vapingContinues = false;
  storyChoices = createStoryChoices();
  startScene();
  startBackgroundMusic();
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
  if (key === "e" && !event.repeat && (!interactiveTarget || homeTransitionActive)) {
    if (homeTransitionActive) homeTransitionNext.click();
    else if (talking) dialogueContent.querySelector("[data-dialogue-next]")?.click();
    else openDialogue();
  }
  if (key === "escape" && talking && !homeTransitionActive) closeDialogue();
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
homeTransitionNext.addEventListener("click", continueHomeTransition);

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
