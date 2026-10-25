// 《华佗》专属笔法库：沛国神医（字元化）——布衣方巾、背药囊、银针、药罐、五禽戏、青囊书。
// 依赖 z_common.js（宣纸/远山/云气/榜题/钤印/大字）+ w_common.js（垂帷/墨云/浓墨烟带）。
// ⚠ 关键：z_common.js 里是 `const Z = window.Z = {}`（重置），本库必须写 `const Z = window.Z`（追加），
//    否则会把根库清空；且 eras 的 SCENE_LIBS 顺序必须是 z_common → w_common → ht_common。
// 与前三奇人三分（同属「方技传」，但形象必须一眼可分）：
//   左慈 = 白藤冠 + 青懒衣 + 眇一目跛一足 + 拂尘
//   于吉 = 白鹤氅 + 黄冠 + 藜杖葫芦 + 符箓
//   管辂 = 粗褐袍 + 乱发束巾 + 腰悬酒葫芦 + 蓍草（容貌粗丑）
//   华佗 = 淡青麻布袍 + 方巾（幅巾）+ 背药囊 + 持银针 + 长白须（温润医者，不施幻术）
// 史实：《三国志·魏书·方技传·华佗传》——游学徐土、晓养性之术、精方药、麻沸散刳腹、五禽戏；
//   「刮骨疗毒」出自《三国演义》第七十五回（正史无），「治风疾神医身死」为第七十八回。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 药气（罐口上升的卷曲气带；主运动之一）----------
Z.steam = (c, x, y, t, o = {}) => {
  const { n = 3, a = .5, seed = 21, h = 220, col = '120,124,132' } = o;
  const rr = rng(seed);
  c.save();
  for (let k = 0; k < n; k++) {
    const ph = (t * .45 + k / n + rr() * .2) % 1;
    const sx = x + (rr() - .5) * 34 + Math.sin(t * 1.6 + k * 2) * 12;
    const y0 = y - ph * h;
    const fade = Math.sin(Math.PI * clamp(ph)) * a;
    c.globalAlpha = clamp(fade);
    brush(c, [
      [sx, y0],
      [sx + Math.sin(t * 2.2 + k) * 20, y0 - 40],
      [sx - Math.sin(t * 1.8 + k * 1.3) * 26, y0 - 82],
      [sx + Math.sin(t * 2.6 + k) * 14, y0 - 124],
    ], { w: 20 + k * 5, tone: .13, dry: .9, seed: 1101 + k * 7 + seed, tail: .7, col: col.split(',').map(Number) });
  }
  c.restore();
};

// ---------- 药囊（青布袋，束口，插两枝草药）----------
Z.herbBag = (c, x, y, s, o = {}) => {
  const { a = 1, t = 0, seed = 31 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  const sw = Math.sin(t * 1.4 + seed) * 4;
  c.fillStyle = 'rgba(104,116,110,.86)';
  c.beginPath();
  c.moveTo(-24, -54);
  c.quadraticCurveTo(-40, -16, -32 + sw, 26);
  c.quadraticCurveTo(0, 38, 32 - sw * .6, 26);
  c.quadraticCurveTo(40, -16, 24, -54);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,38,36,.9)'; c.lineWidth = 2.6; c.stroke();
  // 束口绳
  brush(c, [[-22, -52], [0, -46], [22, -52]], { w: 5, tone: .55, dry: .5, seed: 1111 + seed, col: [150, 124, 74] });
  // 插着的草药枝
  for (let k = 0; k < 2; k++) {
    const a0 = -.5 + k * .5;
    brush(c, [[-6 + k * 12, -50], [-10 + k * 20 + sw, -84], [-6 + k * 16 + sw, -112]],
      { w: 2.6, tone: .4, dry: .6, seed: 1121 + k + seed, tail: .7, col: [122, 138, 108] });
    leaf(c, -6 + k * 16 + sw, -112, a0, 26, 10, .58, [96, 124, 92]);
  }
  c.restore();
};

// ---------- 药罐（陶罐 + 罐口药气；o.fire:1 则底下加炭火）----------
Z.medPot = (c, x, y, s, t, o = {}) => {
  const { a = 1, fire = 1, seed = 41 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 炭火
  if (fire) {
    c.save(); c.globalAlpha = clamp(a) * .8;
    for (let k = 0; k < 7; k++) {
      const fx = -46 + k * 15, fl = 26 + Math.sin(t * 7 + k * 1.7) * 12;
      c.fillStyle = `rgba(${200 + Math.sin(t * 9 + k) * 30 | 0},110,60,.7)`;
      c.beginPath(); c.moveTo(fx, 34); c.lineTo(fx + 7, 34 - fl); c.lineTo(fx + 14, 34); c.closePath(); c.fill();
    }
    c.fillStyle = 'rgba(64,52,44,.85)';
    c.beginPath(); c.ellipse(0, 36, 62, 9, 0, 0, Math.PI * 2); c.fill();
    c.restore();
  }
  // 罐身
  c.fillStyle = 'rgba(96,80,66,.9)';
  c.beginPath();
  c.moveTo(-34, -46);
  c.quadraticCurveTo(-62, -8, -52, 30);
  c.quadraticCurveTo(0, 46, 52, 30);
  c.quadraticCurveTo(62, -8, 34, -46);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.9)'; c.lineWidth = 3; c.stroke();
  // 罐口
  c.fillStyle = 'rgba(70,58,48,.95)';
  c.beginPath(); c.ellipse(0, -48, 36, 9, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,20,18,.9)'; c.lineWidth = 2.4; c.stroke();
  // 罐耳
  c.strokeStyle = 'rgba(40,34,28,.85)'; c.lineWidth = 3.4;
  c.beginPath(); c.arc(-40, -30, 12, 1.6, -1.6); c.stroke();
  c.beginPath(); c.arc(40, -30, 12, -1.6, 1.6); c.stroke();
  c.restore();
  if (a > 0) Z.steam(c, x, y - 52 * s, t, { n: 3, a: a * .6, seed, h: 200 * s });
};

// ---------- 银针（细长，可带捻转的微光）----------
Z.needle = (c, x, y, s, o = {}) => {
  const { a = 1, len = 56, ang = 0, seed = 51 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(ang); c.globalAlpha = clamp(a);
  c.strokeStyle = 'rgba(226,232,238,.95)'; c.lineWidth = 2.2; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -len); c.lineTo(0, 0); c.stroke();
  c.strokeStyle = 'rgba(40,44,48,.6)'; c.lineWidth = .9;
  c.beginPath(); c.moveTo(0, -len); c.lineTo(0, 0); c.stroke();
  // 针柄缠丝
  c.strokeStyle = 'rgba(150,124,74,.9)'; c.lineWidth = 2.6;
  c.beginPath(); c.moveTo(0, -8); c.lineTo(0, -2); c.stroke();
  c.restore();
};

// ---------- 药臼 + 杵（捣药；o.pound:1 则上下捣动）----------
Z.mortar = (c, x, y, s, t, o = {}) => {
  const { a = 1, pound = 1 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = 'rgba(110,104,96,.9)';
  c.beginPath();
  c.moveTo(-46, -34);
  c.quadraticCurveTo(-40, 22, 0, 30);
  c.quadraticCurveTo(40, 22, 46, -34);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(28,26,24,.9)'; c.lineWidth = 3; c.stroke();
  c.fillStyle = 'rgba(72,66,60,.95)';
  c.beginPath(); c.ellipse(0, -34, 48, 11, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,22,20,.9)'; c.lineWidth = 2.4; c.stroke();
  // 杵
  const dy = pound ? Math.abs(Math.sin(t * 2.6)) * 46 : 0;
  c.save(); c.translate(16, -70 + dy);
  brush(c, [[0, 62], [2, 10], [-2, -40]], { w: 11, tone: .6, dry: .5, seed: 1141, col: [124, 104, 78] });
  c.fillStyle = 'rgba(138,118,88,.95)';
  c.beginPath(); c.ellipse(0, 64, 11, 7, 0, 0, Math.PI * 2); c.fill();
  c.restore();
  c.restore();
};

// ---------- 曼陀罗 / 麻沸散原料（洋金花：喇叭状白花）----------
Z.herb = (c, x, y, s, a) => {
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  brush(c, [[0, 40], [-4, 8], [0, -18]], { w: 5, tone: .45, dry: .6, seed: 1151, col: [104, 124, 96] });
  leaf(c, -2, 6, Math.PI + .5, 30, 13, .5, [92, 118, 90]);
  leaf(c, 4, 20, -.4, 30, 13, .5, [92, 118, 90]);
  // 喇叭花冠
  c.fillStyle = 'rgba(250,250,246,.95)';
  c.beginPath();
  c.moveTo(-16, -22); c.quadraticCurveTo(-26, -52, 0, -58);
  c.quadraticCurveTo(26, -52, 16, -22);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(70,76,84,.8)'; c.lineWidth = 2; c.stroke();
  c.restore();
};

// ---------- 五禽戏（i: 0虎 1鹿 2熊 3猿 4鸟）----------
Z.fiveBeasts = (c, x, y, s, t, o = {}) => {
  const { i = 0, a = 1, seed = 61 } = o;
  if (a <= 0) return;
  const br = Math.sin(t * 1.6 + seed) * 5;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.translate(0, Math.sin(t * 2.2 + seed) * 3);

  if (i === 0) {                                   // 虎：低身前扑，肩背隆起
    c.fillStyle = 'rgba(196,146,84,.9)';
    c.beginPath(); c.ellipse(0, -20, 62, 30, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,44,24,.9)'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(58,36,20,.85)'; c.lineWidth = 4;
    for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 18 - 6, -34); c.lineTo(k * 18 + 2, -6); c.stroke(); }
    c.save(); c.translate(58, -40 + br * .4);
    c.fillStyle = 'rgba(206,156,94,.95)';
    c.beginPath(); c.ellipse(0, 0, 26, 21, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,44,24,.9)'; c.lineWidth = 2.6; c.stroke();
    c.fillStyle = 'rgba(244,240,232,.96)';
    c.beginPath(); c.moveTo(-12, 2); c.lineTo(-26, 8); c.lineTo(-12, 12); c.closePath(); c.fill();
    c.fillStyle = 'rgba(30,26,22,.92)';
    c.beginPath(); c.arc(-8, -6, 3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(6, -6, 3, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(86,54,28,.92)';
    c.beginPath(); c.moveTo(-13, -17); c.lineTo(-9, -31); c.lineTo(-3, -17); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(3, -17); c.lineTo(9, -31); c.lineTo(14, -16); c.closePath(); c.fill();
    c.restore();
    brush(c, [[-56, -14], [-78, 8], [-92, 44]], { w: 12, tone: .6, dry: .7, seed: 1161 + seed, tail: .7 });

  } else if (i === 1) {                            // 鹿：昂首，枝角
    c.fillStyle = 'rgba(178,142,96,.9)';
    c.beginPath(); c.ellipse(-4, -34, 50, 26, -.08, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(78,52,30,.9)'; c.lineWidth = 2.8; c.stroke();
    brush(c, [[-44, -18], [-52, 24], [-48, 56]], { w: 7, tone: .6, dry: .6, seed: 1171 + seed });
    brush(c, [[30, -20], [38, 22], [34, 56]], { w: 7, tone: .6, dry: .6, seed: 1172 + seed });
    c.save(); c.translate(44, -62 + br * .3); c.rotate(-.22);
    c.fillStyle = 'rgba(186,150,102,.95)';
    c.beginPath(); c.ellipse(0, 0, 15, 22, .2, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(78,52,30,.9)'; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = 'rgba(30,26,22,.92)';
    c.beginPath(); c.arc(6, -6, 2.8, 0, Math.PI * 2); c.fill();
    // 枝角
    c.strokeStyle = 'rgba(96,72,44,.92)'; c.lineWidth = 3.2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-2, -18); c.lineTo(-12, -44); c.stroke();
    c.beginPath(); c.moveTo(-8, -34); c.lineTo(-24, -44); c.stroke();
    c.beginPath(); c.moveTo(-11, -40); c.lineTo(2, -52); c.stroke();
    c.beginPath(); c.moveTo(4, -18); c.lineTo(14, -44); c.stroke();
    c.beginPath(); c.moveTo(10, -34); c.lineTo(26, -42); c.stroke();
    c.restore();

  } else if (i === 2) {                            // 熊：厚重，晃肩
    c.fillStyle = 'rgba(108,88,70,.9)';
    c.beginPath(); c.ellipse(0, -46, 52, 48, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(40,32,24,.9)'; c.lineWidth = 3; c.stroke();
    brush(c, [[-30, -6], [-34, 26]], { w: 14, tone: .62, dry: .6, seed: 1181 + seed });
    brush(c, [[30, -6], [34, 26]], { w: 14, tone: .62, dry: .6, seed: 1182 + seed });
    c.save(); c.translate(br * .3, -104);
    c.fillStyle = 'rgba(120,98,78,.95)';
    c.beginPath(); c.ellipse(0, 0, 30, 26, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(40,32,24,.9)'; c.lineWidth = 2.8; c.stroke();
    c.fillStyle = 'rgba(238,232,222,.96)';
    c.beginPath(); c.ellipse(14, 4, 11, 8, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(28,24,20,.92)';
    c.beginPath(); c.arc(16, 2, 3, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(4, -6, 2.8, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(22, -8, 2.8, 0, Math.PI * 2); c.fill();
    c.restore();

  } else if (i === 3) {                            // 猿：长臂攀引
    c.fillStyle = 'rgba(146,124,98,.9)';
    c.beginPath(); c.ellipse(0, -40, 34, 40, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(48,38,28,.9)'; c.lineWidth = 2.8; c.stroke();
    const reach = Math.sin(t * 2.0 + seed) * 16;
    brush(c, [[-24, -66], [-62, -50 - reach], [-84, -12 - reach]], { w: 12, tone: .58, dry: .55, seed: 1191 + seed, head: .1, tail: .2 });
    brush(c, [[24, -66], [62, -46 + reach], [82, -6 + reach]], { w: 12, tone: .58, dry: .55, seed: 1192 + seed, head: .1, tail: .2 });
    brush(c, [[-14, -6], [-20, 30]], { w: 11, tone: .6, dry: .6, seed: 1193 + seed });
    brush(c, [[14, -6], [20, 30]], { w: 11, tone: .6, dry: .6, seed: 1194 + seed });
    c.save(); c.translate(0, -92 + br * .3);
    c.fillStyle = 'rgba(206,176,148,.96)';
    c.beginPath(); c.ellipse(0, 0, 17, 15, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(48,38,28,.88)'; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = 'rgba(188,158,130,.97)';
    c.beginPath(); c.ellipse(0, 4, 11, 9, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(26,22,20,.92)';
    c.beginPath(); c.arc(-5, 0, 2.6, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.arc(5, 0, 2.6, 0, Math.PI * 2); c.fill();
    c.restore();

  } else {                                         // 鸟：展翅鹤立（鸟戏）
    const flap = Math.sin(t * 3.0 + seed) * 0.36;
    c.fillStyle = 'rgba(238,234,224,.94)';
    c.beginPath(); c.ellipse(0, -32, 34, 26, -.1, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(52,50,46,.85)'; c.lineWidth = 2.6; c.stroke();
    c.save(); c.translate(-10, -46); c.rotate(-.5 - flap);
    leaf(c, -34, -6, 3.3, 74, 22, .8, [246, 244, 238]); c.restore();
    c.save(); c.translate(10, -46); c.rotate(-2.6 + flap);
    leaf(c, 34, -6, 3.3, 74, 22, .8, [246, 244, 238]); c.restore();
    brush(c, [[24, -22], [56, -6], [80, -14]], { w: 7, tone: .7, dry: .5, seed: 1201 + seed });
    brush(c, [[-6, -8], [-8, 34]], { w: 6, tone: .6, dry: .6, seed: 1202 + seed });
    brush(c, [[8, -8], [10, 34]], { w: 6, tone: .6, dry: .6, seed: 1203 + seed });
    c.save(); c.translate(30, -66 + br * .3); c.rotate(.1);
    c.fillStyle = 'rgba(240,236,226,.96)';
    c.beginPath(); c.ellipse(0, 0, 13, 12, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(40,38,34,.85)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(190,60,44,.95)';
    c.beginPath(); c.moveTo(11, -2); c.lineTo(30, 2); c.lineTo(11, 5); c.closePath(); c.fill();
    c.fillStyle = 'rgba(26,22,20,.92)';
    c.beginPath(); c.arc(4, -2, 2.6, 0, Math.PI * 2); c.fill();
    c.restore();
  }
  c.restore();
};

// ---------- 青囊书卷（o.burn:1 则右端燃起火焰）----------
Z.scroll = (c, x, y, s, o = {}) => {
  const { a = 1, burn = 0, t = 0, open = 1 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  const w = open ? 168 : 40;
  c.fillStyle = 'rgba(238,228,204,.96)';
  c.beginPath(); c.moveTo(-w / 2, -17); c.lineTo(w / 2, -17); c.lineTo(w / 2, 17); c.lineTo(-w / 2, 17); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(70,58,42,.9)'; c.lineWidth = 2.4; c.stroke();
  // 卷轴两端
  c.fillStyle = 'rgba(126,96,58,.95)';
  c.beginPath(); c.roundRect(-w / 2 - 11, -23, 15, 46, 6); c.fill();
  c.beginPath(); c.roundRect(w / 2 - 4, -23, 15, 46, 6); c.fill();
  if (open) {
    c.strokeStyle = 'rgba(70,62,52,.42)'; c.lineWidth = 1.3;
    for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(-w / 2 + 14, k * 8); c.lineTo(w / 2 - 14, k * 8); c.stroke(); }
  }
  if (burn) {
    for (let k = 0; k < 8; k++) {
      const fx = w / 2 - 6 + k * 9, fl = 30 + Math.sin(t * 8 + k * 2.1) * 16;
      c.fillStyle = `rgba(${212 + Math.sin(t * 10 + k) * 30 | 0},${110 + Math.sin(t * 7 + k) * 40 | 0},52,.75)`;
      c.beginPath(); c.moveTo(fx, 20); c.lineTo(fx + 6, 20 - fl); c.lineTo(fx + 13, 20); c.closePath(); c.fill();
    }
  }
  c.restore();
};

// ---------- 接血铜盘（刮骨疗毒：盘中所盛以淡墨示意，不写实血）----------
Z.bloodBowl = (c, x, y, s, o = {}) => {
  const { a = 1, t = 0, level = .7 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = 'rgba(120,110,84,.28)';
  c.beginPath(); c.ellipse(0, 6, 96, 20, 0, 0, Math.PI * 2); c.fill();
  // 盘中
  const lv = clamp(level) * Math.abs(Math.sin(t * .8)) * .2 + clamp(level) * .8;
  c.fillStyle = `rgba(96,72,58,${.5 * lv})`;
  c.beginPath(); c.ellipse(0, 0, 88 * (0.75 + 0.25 * lv), 15, 0, 0, Math.PI * 2); c.fill();
  // 盘沿
  c.strokeStyle = 'rgba(146,120,72,.95)'; c.lineWidth = 5;
  c.beginPath(); c.ellipse(0, 0, 92, 18, 0, 0, Math.PI * 2); c.stroke();
  c.strokeStyle = 'rgba(70,56,34,.7)'; c.lineWidth = 1.6;
  c.beginPath(); c.ellipse(0, 2, 84, 14, 0, 0, Math.PI * 2); c.stroke();
  c.restore();
};

// ---------- 华佗：沛国神医（单位坐标，原点＝脚底，头顶 ≈ -202）----------
// o: { t, flip, raise(抬手持针), needle(手持银针), bag(背药囊), fade, bow, pot(身侧药罐) }
Z.huatuo = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, raise = 0, needle = 1, bag = 1, fade = 1, bow = 0 } = o;
  const br = Math.sin(t * 1.5) * .014;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.5) * 3);
  c.rotate(br * .5 + bow * .12);

  // 双足（布履）
  brush(c, [[-15, -8], [-19, 24]], { w: 13, tone: .5, dry: .55, seed: 1201 });
  brush(c, [[15, -8], [19, 24]], { w: 13, tone: .5, dry: .55, seed: 1202 });
  c.save(); c.globalAlpha = clamp(fade) * .9;
  c.fillStyle = 'rgba(58,54,50,.85)';
  c.beginPath(); c.ellipse(-19, 28, 14, 7, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(19, 28, 14, 7, 0, 0, Math.PI * 2); c.fill();
  c.restore();

  // 淡青麻布袍（宽博、下摆微摆）
  const hem = Math.sin(t * 1.4) * 6;
  c.save();
  c.fillStyle = 'rgba(150,158,150,.72)';
  c.beginPath();
  c.moveTo(-28, -150);
  c.quadraticCurveTo(-56, -76, -60 + hem, -6);
  c.quadraticCurveTo(0, 6 + hem * .4, 60 + hem * .6, -6);
  c.quadraticCurveTo(54, -78, 28, -150);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(34,38,36,.88)'; c.lineWidth = 3; c.stroke();
  c.restore();
  // 衣褶（淡，走笔虚）
  brush(c, [[-16, -136], [-11, -80], [-16, -24]], { w: 3.2, tone: .3, dry: .75, seed: 1211, tail: .6, bristles: 3 });
  brush(c, [[6, -134], [12, -76], [6, -22]], { w: 2.8, tone: .26, dry: .75, seed: 1212, tail: .6, bristles: 3 });
  brush(c, [[26, -138], [32, -80], [28, -26]], { w: 2.4, tone: .24, dry: .75, seed: 1213, tail: .6, bristles: 3 });
  // 交领
  brush(c, [[-14, -150], [-2, -128], [16, -148]], { w: 3.6, tone: .7, dry: .4, seed: 1214, col: [64, 68, 64] });
  // 束带
  brush(c, [[-32, -104], [0, -98], [32, -104]], { w: 9, tone: .55, dry: .5, seed: 1215, col: [104, 92, 68] });

  // 背药囊（身后偏左，先画，压在袍下）
  if (bag) {
    c.save(); c.globalAlpha = clamp(fade) * .95;
    Z.herbBag(c, -50, -96, 0.62, { t, seed: 31 });
    c.restore();
  }

  // 双臂（右手抬持针）
  const rl = ease.out(clamp(raise));
  brush(c, [[-27, -146], [-43, -108 - 8 * rl], [-38, -66 - 14 * rl]], { w: 16, tone: .42, dry: .5, seed: 1221, head: .1, tail: .2 });
  brush(c, [[27, -146], [45, -124 - 26 * rl], [56, -154 - 48 * rl]], { w: 15, tone: .42, dry: .5, seed: 1222, head: .1, tail: .2 });
  const hx = 56, hy = -154 - 48 * rl;
  c.fillStyle = 'rgba(240,228,206,.96)';
  c.beginPath(); c.ellipse(hx + 4, hy, 10, 11, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();

  // 头（温润医者：长眉、细目、长白须）
  c.save(); c.translate(0, -180 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(240,228,206,.97)';
  c.beginPath(); c.ellipse(0, 0, 16.5, 17.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 2.2; c.stroke();
  // 长眉（寿眉，下垂）
  brush(c, [[-12, -6], [-4, -8], [2, -4]], { w: 3.4, tone: .6, dry: .7, seed: 1231, col: [238, 236, 228], tail: .8 });
  brush(c, [[4, -8], [11, -6], [14, -1]], { w: 3.2, tone: .6, dry: .7, seed: 1232, col: [238, 236, 228], tail: .8 });
  c.fillStyle = 'rgba(26,22,20,.92)';
  c.beginPath(); c.ellipse(-6, 1, 2.5, 2.8, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(6, 1, 2.5, 2.8, 0, 0, Math.PI * 2); c.fill();
  // 长白须
  brush(c, [[-9, 11], [-13, 32], [-8, 52]], { w: 5, tone: .5, dry: .8, seed: 1233, tail: .8, bristles: 5, col: [244, 242, 234] });
  brush(c, [[-2, 12], [-1, 36], [1, 58]], { w: 5.4, tone: .52, dry: .8, seed: 1234, tail: .8, bristles: 6, col: [246, 244, 236] });
  brush(c, [[7, 11], [11, 32], [7, 52]], { w: 4.6, tone: .48, dry: .8, seed: 1235, tail: .8, bristles: 5, col: [242, 240, 232] });
  // 发髻 + 方巾（幅巾，汉代医者/处士装束）
  c.fillStyle = 'rgba(46,50,58,.9)';
  c.beginPath(); c.ellipse(0, -14, 17, 11, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(78,84,92,.94)';
  c.beginPath();
  c.moveTo(-19, -8); c.lineTo(-17, -34); c.quadraticCurveTo(0, -40, 17, -34); c.lineTo(19, -8);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(24,26,32,.9)'; c.lineWidth = 2.4; c.stroke();
  // 巾带（脑后飘）
  c.save(); c.globalAlpha = clamp(fade) * .85;
  brush(c, [[-17, -26], [-34 + Math.sin(t * 1.6) * 7, -18], [-46 + Math.sin(t * 1.6 + 1) * 9, -4]],
    { w: 7, tone: .42, dry: .7, seed: 1241, tail: .7, col: [78, 84, 92] });
  c.restore();
  c.restore();

  // 银针（右手持，捻转）
  if (needle) Z.needle(c, hx + 7, hy + 14, 1.0, { a: clamp(fade) * (.5 + .5 * rl), len: 54, ang: -.35 + Math.sin(t * 2.4) * .12 });

  c.restore();
};

// ---------- 关羽（长髯 + 青龙偃月刀；Z.leader 之上加辨识要素）----------
// ⚠ 与 p_common.js 的 Z.guanYu 同名但独立：本库 SCENE_LIBS 只加载 z/w/ht，不加载 p_common。
// o: { flip, bow, arm(伸臂受疗 0→1) }
Z.guanYu = (c, x, y, s, t, o = {}) => {
  const { flip = 0, bow = 0, arm = 0 } = o;
  Z.leader(c, x, y, s, t, { flip, bow, cape: 1 });
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const wf = Math.sin(t * 1.1) * 5;
  c.strokeStyle = 'rgba(28,26,24,.92)'; c.lineWidth = 5; c.lineCap = 'round';
  for (let k = 0; k < 5; k++) {                       // 长髯
    const bx = -13 + k * 6;
    c.beginPath(); c.moveTo(bx, -158);
    c.quadraticCurveTo(bx + wf * 0.4, -126, bx + wf * 0.85, -90 - (k % 2) * 12);
    c.stroke();
  }
  if (arm) {                                          // 伸臂受疗：左臂平伸置于案上
    brush(c, [[-26, -140], [-72, -118 - 12 * arm], [-116, -104 - 22 * arm]],
      { w: 15, tone: .5, dry: .45, seed: 1261, head: .1, tail: .2 });
    c.fillStyle = 'rgba(240,228,206,.96)';
    c.beginPath(); c.ellipse(-120, -106 - 22 * arm, 10, 9, 0, 0, Math.PI * 2); c.fill();
  }
  c.strokeStyle = 'rgba(76,58,36,.94)'; c.lineWidth = 6;   // 刀杆（斜倚身侧）
  c.beginPath(); c.moveTo(54, -126); c.lineTo(76, 14); c.stroke();
  c.strokeStyle = 'rgba(124,128,140,.95)'; c.lineWidth = 10; c.lineCap = 'round';
  c.beginPath(); c.moveTo(50, -132); c.quadraticCurveTo(98, -152, 126, -116); c.stroke();
  c.restore();
};

// ---------- 权臣（曹操：玄色大袍 + 高冠 + 短髭；clutch:1 则手扶额，示头风）----------
Z.warlord = (c, x, y, s, t, o = {}) => {
  const { flip = 0, bow = 0, clutch = 0, fade = 1, rage = 0 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.3) * 3 + rage * Math.sin(t * 9) * 2.5);
  c.rotate(bow * .12);
  // 玄色大袍
  const hem = Math.sin(t * 1.2) * 7;
  c.fillStyle = 'rgba(46,44,52,.88)';
  c.beginPath();
  c.moveTo(-30, -152);
  c.quadraticCurveTo(-64, -74, -70 + hem, -4);
  c.quadraticCurveTo(0, 8 + hem * .4, 70 + hem * .6, -4);
  c.quadraticCurveTo(62, -76, 30, -152);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,16,20,.92)'; c.lineWidth = 3.2; c.stroke();
  brush(c, [[-18, -136], [-13, -78], [-18, -22]], { w: 3.4, tone: .28, dry: .75, seed: 1271, tail: .6, bristles: 3 });
  brush(c, [[8, -134], [14, -74], [8, -20]], { w: 3, tone: .25, dry: .75, seed: 1272, tail: .6, bristles: 3 });
  brush(c, [[-16, -152], [-2, -130], [18, -150]], { w: 3.8, tone: .8, dry: .35, seed: 1273, col: [30, 28, 34] });
  brush(c, [[-36, -102], [0, -96], [36, -102]], { w: 11, tone: .7, dry: .4, seed: 1274, col: [126, 102, 56] });
  // 双臂：clutch 时右手扶额
  const cl = ease.out(clamp(clutch));
  brush(c, [[-28, -146], [-46, -106], [-42, -62]], { w: 16, tone: .4, dry: .5, seed: 1281, head: .1, tail: .2 });
  brush(c, [[28, -146], [46, lerp(-112, -150, cl)], [58, lerp(-84, -186, cl)]],
    { w: 15, tone: .4, dry: .5, seed: 1282, head: .1, tail: .2 });
  const hxx = 58, hyy = lerp(-84, -186, cl);
  c.fillStyle = 'rgba(240,228,206,.96)';
  c.beginPath(); c.ellipse(hxx + 4, hyy, 10, 11, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();
  // 头（高冠 + 短髭）
  c.save(); c.translate(0, -182 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(240,228,206,.97)';
  c.beginPath(); c.ellipse(0, 0, 16, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 2.2; c.stroke();
  brush(c, [[-11, -5], [-4, -7]], { w: 3.6, tone: .82, dry: .4, seed: 1291, col: [30, 26, 22] });
  brush(c, [[4, -7], [11, -5]], { w: 3.6, tone: .82, dry: .4, seed: 1292, col: [30, 26, 22] });
  c.fillStyle = 'rgba(24,20,18,.92)';
  c.beginPath(); c.ellipse(-6, 1, 2.5, 2.8, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(6, 1, 2.5, 2.8, 0, 0, Math.PI * 2); c.fill();
  brush(c, [[-2, 8], [0, 16]], { w: 4, tone: .7, dry: .6, seed: 1293, tail: .7, bristles: 4 });
  // 高冠（进贤冠/冕）
  c.fillStyle = 'rgba(34,32,40,.96)';
  c.beginPath(); c.moveTo(-19, -12); c.lineTo(-16, -40); c.lineTo(16, -40); c.lineTo(19, -12); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(14,12,18,.9)'; c.lineWidth = 2.4; c.stroke();
  c.fillStyle = 'rgba(146,120,62,.96)'; c.fillRect(-17, -30, 34, 6);
  c.restore();
  if (rage) {                                          // 怒纹朱环（写意）
    c.save(); c.translate(0, -180); c.rotate(t * -.5);
    for (let k = 0; k < 3; k++) {
      c.strokeStyle = `rgba(150,50,40,${.9 - k * .25})`; c.lineWidth = 2.4;
      c.beginPath();
      for (let a = 0; a < 6.3; a += .3) {
        const rr2 = 66 + k * 16 + Math.sin(a * 3 + t * 2 + k) * 6;
        const px = Math.cos(a) * rr2, py = Math.sin(a) * rr2 * .9;
        a ? c.lineTo(px, py) : c.moveTo(px, py);
      }
      c.closePath(); c.stroke();
    }
    c.restore();
  }
  c.restore();
};
})();
