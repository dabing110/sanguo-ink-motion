// 《管辂》专属笔法库：平原术士（字公明）——八卦爻符、蓍草、北斗星野、青蝇、大风扬尘、桑下对弈。
// 依赖 z_common.js（宣纸/远山/云气/榜题/钤印/大字）+ w_common.js（垂帷/墨云/浓墨烟带）。
// ⚠ 关键：z_common.js 里是 `const Z = window.Z = {}`（重置），本库必须写 `const Z = window.Z`（追加），
//    否则会把根库清空；且 eras 的 SCENE_LIBS 顺序必须是 z_common → w_common → g_common。
// 与左慈（白藤冠青懒衣眇目跛足拂尘）、于吉（鹤氅黄冠藜杖符箓）三分：
//   管辂 = 粗褐袍 + 乱发束巾 + 腰悬酒葫芦 + 手持蓍草，容貌粗丑、不修边幅、嗜酒。
// 史实：《三国志·魏书·方技传》（与华佗同传）；桑下献脯延寿出自《三国演义》第六十九回。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 星辰：北斗七星（连线＋呼吸明灭）＋散点星野 ----------
Z.stars = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 3, dipper = 1 } = o;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(a);
  // 星野
  c.save();
  for (let k = 0; k < 60; k++) {
    const px = x - 900 + rr() * 1800, py = y - 300 + rr() * 460;
    const tw = .3 + .7 * Math.abs(Math.sin(t * (1 + rr() * 2) + k));
    c.globalAlpha = clamp(a) * tw * .7;
    c.fillStyle = 'rgba(250,246,226,.95)';
    c.beginPath(); c.arc(px, py, 1 + rr() * 1.8, 0, Math.PI * 2); c.fill();
  }
  c.restore();
  if (dipper) {
    const P7 = [[-260, -60], [-170, -30], [-90, -10], [0, 10], [80, 26], [150, 44], [210, 76]];
    c.save(); c.translate(x, y); c.scale(s, s);
    c.globalAlpha = clamp(a) * .5;
    c.strokeStyle = 'rgba(250,246,226,.9)'; c.lineWidth = 1.6;
    c.beginPath(); P7.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
    P7.forEach((p, k) => {
      const tw = .5 + .5 * Math.abs(Math.sin(t * 1.6 + k));
      c.globalAlpha = clamp(a) * (.5 + tw * .5);
      c.fillStyle = 'rgba(252,248,228,.98)';
      c.beginPath(); c.arc(p[0], p[1], 4.5, 0, Math.PI * 2); c.fill();
      c.save(); c.globalAlpha = clamp(a) * tw * .35;
      c.fillStyle = 'rgba(240,230,180,.9)';
      c.beginPath(); c.arc(p[0], p[1], 12, 0, Math.PI * 2); c.fill();
      c.restore();
    });
    c.restore();
  }
  c.restore();
};

// ---------- 爻符 / 八卦（三爻：阳爻实线、阴爻断线）----------
// o.yang: [1,1,1]=乾（三阳）；如 [0,1,0]=坎
Z.trigram = (c, x, y, s, o = {}) => {
  const { yang = [1, 1, 1], a = 1, w = 60, seed = 5 } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  for (let i = 0; i < 3; i++) {
    const yy = (i - 1) * 22;
    if (yang[i]) {
      brush(c, [[-w / 2, yy], [w / 2, yy]], { w: 7, tone: .8, dry: .3, seed: 981 + i + seed });
    } else {
      brush(c, [[-w / 2, yy], [-w / 6, yy]], { w: 7, tone: .8, dry: .3, seed: 981 + i + seed });
      brush(c, [[w / 6, yy], [w / 2, yy]], { w: 7, tone: .8, dry: .3, seed: 991 + i + seed });
    }
  }
  c.restore();
};

// ---------- 青蝇群（数十只绕一点盘旋；何晏「梦青蝇数十头，来在鼻上」）----------
Z.bluefly = (c, x, y, t, a, o = {}) => {
  if (a <= 0) return;
  const { n = 24, r = 90, seed = 11, col = '70,120,90' } = o;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const sp = .8 + rr() * 1.6;
    const ang = t * sp * (rr() < .5 ? 1 : -1) + rr() * Math.PI * 2;
    const rad = r * (.25 + rr() * .85) + Math.sin(t * 3 + k) * 6;
    const px = x + Math.cos(ang) * rad, py = y + Math.sin(ang) * rad * .8;
    const wg = Math.sin(t * 22 + k) * .5;                       // 振翅
    c.fillStyle = `rgba(${col},${.55 + rr() * .35})`;
    c.beginPath(); c.ellipse(px, py, 4, 2.6, ang, 0, Math.PI * 2); c.fill();
    c.save(); c.globalAlpha = clamp(a) * .5;
    c.strokeStyle = `rgba(${col},.5)`; c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(px, py); c.lineTo(px + Math.cos(ang + wg) * 7, py + Math.sin(ang + wg) * 7); c.stroke();
    c.beginPath(); c.moveTo(px, py); c.lineTo(px - Math.cos(ang - wg) * 7, py - Math.sin(ang - wg) * 7); c.stroke();
    c.restore();
  }
  c.restore();
};

// ---------- 大风扬尘（西北风：斜向尘带 + 飞砂；「尘埃蔽天」）----------
Z.windDust = (c, t, o = {}) => {
  const { y = 500, n = 5, speed = 260, a = .34, seed = 13 } = o;
  const rr = rng(seed);
  c.save();
  for (let k = 0; k < n; k++) {
    const cx = ((t * speed + k * 420 + rr() * 300) % 2900) - 700;
    c.globalAlpha = a * (.5 + rr() * .5);
    brush(c, [[cx, y + k * 44], [cx + 320, y - 18 + k * 44], [cx + 700, y + 8 + k * 44], [cx + 1040, y - 12 + k * 44]],
      { w: 26 + k * 4, tone: .16, dry: .85, seed: 1001 + k * 9, tail: .6 });
  }
  // 飞砂（斜向粒子，加深对比以抬升帧差——tone 太淡会低于 12 灰阶阈值，量不出运动）
  c.globalAlpha = a * .9;
  for (let k = 0; k < 64; k++) {
    const ph = ((t * 1.4 + k / 64 + rr() * .3) % 1);
    const px = ((t * 620 + k * 130 + rr() * 400) % 2500) - 450;
    const py = y - 210 + rr() * 440 + Math.sin(t * 4 + k) * 14;
    c.fillStyle = `rgba(88,74,54,${.66 * (1 - ph * .35)})`;
    c.beginPath(); c.ellipse(px, py, 2.4 + rr() * 3.4, 1.8 + rr() * 2.2, 0, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 狐（简笔蹲踞；「当在故城中见三貍」）----------
Z.fox = (c, x, y, s, t, o = {}) => {
  const { seed = 17, flip = 0 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const br2 = Math.sin(t * 1.3 + seed) * 3;
  c.fillStyle = 'rgba(176,124,72,.88)';
  c.beginPath(); c.ellipse(0, -22, 30, 20, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(90,58,32,.85)'; c.lineWidth = 2; c.stroke();
  leaf(c, -30, -18, Math.PI + .35 + br2 * .02, 40, 18, .85, [198, 148, 92]);
  brush(c, [[-16, -8], [-18, 16]], { w: 7, tone: .7, dry: .5, seed: 1041 + seed });
  brush(c, [[16, -8], [18, 16]], { w: 7, tone: .7, dry: .5, seed: 1042 + seed });
  c.save(); c.translate(28, -44); c.rotate(br2 * .012);
  c.fillStyle = 'rgba(186,134,80,.92)';
  c.beginPath(); c.ellipse(0, 0, 13, 10, .3, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(90,58,32,.85)'; c.lineWidth = 1.8; c.stroke();
  c.fillStyle = 'rgba(120,74,40,.9)';
  c.beginPath(); c.moveTo(-6, -8); c.lineTo(-2, -22); c.lineTo(4, -8); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(4, -8); c.lineTo(10, -20); c.lineTo(12, -6); c.closePath(); c.fill();
  c.fillStyle = 'rgba(24,20,18,.92)';
  c.beginPath(); c.arc(6, -2, 2, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(240,236,226,.95)';
  c.beginPath(); c.moveTo(13, 0); c.lineTo(21, 3); c.lineTo(13, 5); c.closePath(); c.fill();
  c.restore();
  c.restore();
};

// ---------- 桑下对弈（南斗北斗：棋盘 + 二仙对坐 + 桑树遮荫；演义第六十九回）----------
Z.goBoard = (c, x, y, s, t, o = {}) => {
  const { a = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = 'rgba(150,142,124,.7)';
  c.beginPath(); c.ellipse(0, 40, 150, 40, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(52,44,36,.8)'; c.lineWidth = 2.4; c.stroke();
  c.save(); c.translate(0, 10); c.rotate(-.12);
  c.fillStyle = 'rgba(226,206,164,.95)'; c.fillRect(-92, -66, 184, 132);
  c.strokeStyle = 'rgba(60,48,34,.9)'; c.lineWidth = 2.6; c.strokeRect(-92, -66, 184, 132);
  c.strokeStyle = 'rgba(70,56,40,.7)'; c.lineWidth = 1.2;
  for (let i = 1; i < 7; i++) {
    c.beginPath(); c.moveTo(-92 + i * (184 / 7), -66); c.lineTo(-92 + i * (184 / 7), 66); c.stroke();
  }
  for (let i = 1; i < 6; i++) {
    c.beginPath(); c.moveTo(-92, -66 + i * (132 / 6)); c.lineTo(92, -66 + i * (132 / 6)); c.stroke();
  }
  [[-46, -30, 0], [-14, -8, 1], [22, -38, 0], [46, 10, 1], [-30, 26, 1], [6, 34, 0]].forEach(([px, py, bw], k) => {
    c.fillStyle = bw ? 'rgba(248,246,240,.98)' : 'rgba(28,26,24,.96)';
    c.beginPath(); c.arc(px, py + Math.sin(t * 1.4 + k) * 1.2, 8, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(40,34,28,.7)'; c.lineWidth = 1.2; c.stroke();
  });
  c.restore();
  [[-1, 1], [1, 0]].forEach(([sg, bw]) => {
    c.save(); c.translate(sg * 190, -30); c.scale(sg, 1);
    c.fillStyle = bw ? 'rgba(240,236,226,.9)' : 'rgba(74,80,96,.88)';
    c.beginPath(); c.moveTo(-34, 34); c.quadraticCurveTo(-30, -50, 0, -66); c.quadraticCurveTo(30, -50, 34, 34); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.8)'; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = 'rgba(244,238,224,.97)';
    c.beginPath(); c.arc(0, -82, 15, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(24,22,20,.84)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = 'rgba(60,56,52,.9)';
    c.beginPath(); c.arc(0, -100, 7, 0, Math.PI * 2); c.fill();
    c.restore();
  });
  c.save(); c.translate(-40, -170);
  const sw2 = Math.sin(t * 1.2) * 10;
  brush(c, [[0, 130], [-8, 60], [4, 0], [-4, -50]], { w: 16, tone: .72, dry: .5, seed: 1031, col: [96, 78, 56] });
  for (let i = 0; i < 7; i++) {
    const a0 = -2.4 + i * .55 + sw2 * .02;
    leaf(c, Math.cos(a0) * 60, Math.sin(a0) * 40 - 30, a0, 58, 26, .62, [82, 108, 74]);
  }
  c.restore();
  c.restore();
};

// ---------- 文士立姿（何晏 / 邓飏：宽袍高冠执麈尾；alive:0 则倒地）----------
Z.scholar = (c, x, y, s, t, o = {}) => {
  const { flip = 0, alive = 1, bow = 0, fade = 1, seed = 7 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  if (!alive) { c.rotate(1.4); c.translate(0, -20); }
  const b = ease.out(clamp(bow));
  c.rotate(b * .2);
  const f = Math.sin(t * 1.1 + seed) * 8;
  c.fillStyle = 'rgba(96,104,126,.82)';
  c.beginPath();
  c.moveTo(-22, -146);
  c.quadraticCurveTo(-56 - f, -100, -64 - f, -6);
  c.quadraticCurveTo(0, 4, 64 + f * .5, -6);
  c.quadraticCurveTo(56, -100, 22, -146);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(28,30,40,.86)'; c.lineWidth = 2.8; c.stroke();
  brush(c, [[-14, -134], [-8, -80], [-14, -26]], { w: 3, tone: .3, dry: .7, seed: 961 + seed, tail: .6, bristles: 3 });
  brush(c, [[10, -132], [16, -78], [10, -24]], { w: 2.6, tone: .26, dry: .7, seed: 962 + seed, tail: .6, bristles: 3 });
  brush(c, [[-14, -146], [-2, -126], [16, -144]], { w: 3.2, tone: .7, dry: .4, seed: 963 + seed, col: [240, 236, 224] });
  brush(c, [[-30, -104], [0, -99], [30, -104]], { w: 7, tone: .5, dry: .5, seed: 964 + seed, col: [150, 126, 70] });
  brush(c, [[22, -142], [40, -120 - 18 * b], [50, -100 - 34 * b]], { w: 13, tone: .45, dry: .45, seed: 965 + seed, head: .1, tail: .2 });
  // 麈尾（名士清谈所执）
  c.save(); c.translate(52, -98 - 34 * b); c.rotate(-.4 + Math.sin(t * 1.1) * .1);
  brush(c, [[0, 0], [4, -26]], { w: 5, tone: .6, dry: .4, seed: 966 + seed, col: [92, 76, 56] });
  for (let k = 0; k < 6; k++) {
    const a0 = -.9 + k * .24 + Math.sin(t * 1.6 + k) * .12;
    brush(c, [[4, -24], [4 + Math.cos(a0) * 22, -24 + Math.sin(a0) * 22], [4 + Math.cos(a0) * 40, -22 + Math.sin(a0) * 40]],
      { w: 2.2, tone: .28, dry: .7, seed: 970 + k + seed, tail: .8, bristles: 3 });
  }
  c.restore();
  c.save(); c.translate(2, -172 - bow * 4); c.rotate(bow * .08);
  c.fillStyle = 'rgba(244,238,224,.97)';
  c.beginPath(); c.ellipse(0, 0, 15, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,22,20,.84)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(20,18,16,.9)';
  c.beginPath(); c.ellipse(-5, 1, 2.6, 3.2, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5, 1, 2.6, 3.2, 0, 0, Math.PI * 2); c.fill();
  // 进贤冠
  c.fillStyle = 'rgba(52,54,72,.95)';
  c.beginPath(); c.moveTo(-16, -10); c.lineTo(-13, -34); c.lineTo(13, -34); c.lineTo(16, -10); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,22,30,.85)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(150,126,66,.95)'; c.fillRect(-14, -26, 28, 5);
  c.restore();
  c.restore();
};

// ---------- 管辂：平原术士（单位坐标，原点＝脚底，头顶 ≈ -205）----------
// o: { t, flip, raise(抬手占卜), yarrow(手持蓍草), fade, bow, gourd(腰间酒葫芦) }
Z.guanlu = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, raise = 0, yarrow = 1, fade = 1, bow = 0, gourd = 1 } = o;
  const br = Math.sin(t * 1.5) * .014;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.5) * 3);
  c.rotate(br * .5 + bow * .12);

  // 双足（粗鞋）
  brush(c, [[-16, -6], [-20, 26]], { w: 14, tone: .55, dry: .55, seed: 901 });
  brush(c, [[16, -6], [20, 26]], { w: 14, tone: .55, dry: .55, seed: 902 });
  c.save(); c.globalAlpha = clamp(fade) * .9;
  c.fillStyle = 'rgba(52,48,44,.85)';
  c.beginPath(); c.ellipse(-20, 30, 15, 7, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(20, 30, 15, 7, 0, 0, Math.PI * 2); c.fill();
  c.restore();

  // 粗褐袍
  const hem = Math.sin(t * 1.4) * 6;
  c.save();
  c.fillStyle = 'rgba(126,110,88,.7)';
  c.beginPath();
  c.moveTo(-30, -150);
  c.quadraticCurveTo(-54, -78, -58 + hem, -6);
  c.quadraticCurveTo(0, 6 + hem * .4, 58 + hem * .6, -6);
  c.quadraticCurveTo(52, -80, 30, -150);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(34,28,22,.88)'; c.lineWidth = 3; c.stroke();
  c.restore();
  brush(c, [[-18, -138], [-12, -82], [-18, -26]], { w: 3.6, tone: .36, dry: .7, seed: 911, tail: .6, bristles: 3 });
  brush(c, [[8, -136], [14, -78], [8, -22]], { w: 3.2, tone: .32, dry: .7, seed: 912, tail: .6, bristles: 3 });
  brush(c, [[30, -140], [36, -84], [32, -28]], { w: 2.8, tone: .28, dry: .7, seed: 913, tail: .6, bristles: 3 });
  brush(c, [[-16, -150], [-2, -128], [18, -148]], { w: 3.6, tone: .72, dry: .4, seed: 914, col: [70, 58, 44] });
  brush(c, [[-34, -106], [0, -100], [34, -106]], { w: 9, tone: .6, dry: .5, seed: 915, col: [96, 76, 52] });

  // 双臂
  const rl = ease.out(clamp(raise));
  brush(c, [[-28, -146], [-44, -108 - 10 * rl], [-40, -68 - 16 * rl]], { w: 16, tone: .45, dry: .5, seed: 921, head: .1, tail: .2 });
  brush(c, [[28, -146], [46, -124 - 26 * rl], [58, -156 - 50 * rl]], { w: 15, tone: .45, dry: .5, seed: 922, head: .1, tail: .2 });
  const hy = -156 - 50 * rl, hx = 58;
  c.fillStyle = 'rgba(240,228,206,.96)';
  c.beginPath(); c.ellipse(hx + 4, hy, 10, 11, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();

  // 头（粗丑：宽脸、浓眉、小眼、乱须）
  c.save(); c.translate(0, -178 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(238,226,206,.97)';
  c.beginPath(); c.ellipse(0, 0, 17, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(26,22,20,.86)'; c.lineWidth = 2.2; c.stroke();
  brush(c, [[-11, -5], [-4, -7]], { w: 4, tone: .8, dry: .4, seed: 931, col: [40, 34, 28] });
  brush(c, [[4, -7], [11, -5]], { w: 4, tone: .8, dry: .4, seed: 932, col: [40, 34, 28] });
  c.fillStyle = 'rgba(24,20,18,.92)';
  c.beginPath(); c.ellipse(-6, 1, 2.6, 3.0, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(6, 1, 2.6, 3.0, 0, 0, Math.PI * 2); c.fill();
  brush(c, [[-8, 12], [-10, 28], [-6, 40]], { w: 5, tone: .76, dry: .65, seed: 933, tail: .7, bristles: 4 });
  brush(c, [[4, 12], [7, 30], [3, 42]], { w: 4.5, tone: .72, dry: .65, seed: 934, tail: .7, bristles: 4 });
  brush(c, [[-2, 10], [0, 26]], { w: 5, tone: .7, dry: .7, seed: 935, tail: .7, bristles: 5 });
  // 乱发 + 束巾（不修边幅）
  c.save();
  c.strokeStyle = 'rgba(40,34,28,.85)'; c.lineWidth = 2.4;
  for (let k = -3; k <= 3; k++) {
    const sx = k * 5, sw2 = Math.sin(t * 1.6 + k) * 3;
    c.beginPath(); c.moveTo(sx, -14); c.lineTo(sx + sw2 * .6, -24); c.stroke();
  }
  c.fillStyle = 'rgba(96,86,68,.95)';
  c.beginPath(); c.moveTo(-19, -12); c.quadraticCurveTo(0, -30, 19, -12);
  c.lineTo(16, -6); c.lineTo(-16, -6); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.85)'; c.lineWidth = 2; c.stroke();
  c.restore();
  c.restore();

  // 蓍草（右手持，一把细茎）
  if (yarrow) {
    c.save(); c.translate(hx + 6, hy + 8); c.rotate(-.2 + Math.sin(t * 1.2) * .08);
    for (let k = 0; k < 9; k++) {
      const a0 = -.5 + k * .12 + Math.sin(t * 1.4 + k) * .06;
      brush(c, [[0, 0], [Math.cos(a0) * 26, Math.sin(a0) * 26 - 6], [Math.cos(a0) * 46, Math.sin(a0) * 46 - 14]],
        { w: 2.2, tone: .42, dry: .6, seed: 950 + k, tail: .7, bristles: 3, col: [150, 138, 96] });
    }
    c.restore();
  }
  // 酒葫芦（腰间左侧）
  if (gourd) {
    c.save(); c.globalAlpha = clamp(fade);
    c.fillStyle = 'rgba(178,142,74,.92)';
    c.beginPath(); c.ellipse(-46, -84, 11, 9, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(-46, -72, 7, 6, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(62,44,26,.8)'; c.lineWidth = 1.4; c.stroke();
    c.fillStyle = 'rgba(60,44,28,.9)';
    c.beginPath(); c.ellipse(-46, -94, 4, 3, 0, 0, Math.PI * 2); c.fill();
    c.restore();
  }
  c.restore();
};
})();
