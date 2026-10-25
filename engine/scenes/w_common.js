// 《典韦》专属笔法库：双铁戟、猛虎、步战壮士、火把营火、夜色、辕门、坟冢。
// 依赖 h_common.js（宣纸/远山/云气/榜题/钤印/尘复用），这里只加典韦的辨识元素：
// ① 双铁戟（八十斤，一手一支，不是单枪）② 步战——全片不骑马（赵云、马超都是马上将）
// ③ 虎（逐虎过涧）④ 夜火（宛城夜袭，全片唯一有夜色的一段）
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 铁戟：直刃 + 横枝 + 月牙小枝 + 红缨（典韦的招牌，一手一支） ----------
Z.ji = (c, x, y, ang, len = 300, t = 0, o = {}) => {
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[-len * 0.40, 0], [0, 0], [len * 0.54, 0]], { w: 10, tone: 0.96, dry: 0.3, seed: 550, head: 0.06, tail: 0.18, bristles: 6 });
  // 直刃（尖端）
  c.fillStyle = 'rgba(20,20,22,.94)'; c.beginPath();
  c.moveTo(len * 0.62, 0); c.lineTo(len * 0.50, -11); c.lineTo(len * 0.46, 0); c.lineTo(len * 0.50, 11); c.closePath(); c.fill();
  // 横枝（戟的那一"支"）
  c.strokeStyle = 'rgba(20,20,22,.92)'; c.lineWidth = 7; c.lineCap = 'round';
  c.beginPath(); c.moveTo(len * 0.50, -4); c.lineTo(len * 0.46, -30); c.stroke();
  c.beginPath(); c.moveTo(len * 0.46, -30); c.lineTo(len * 0.40, -44); c.stroke();
  // 月牙小枝
  c.strokeStyle = 'rgba(24,24,26,.85)'; c.lineWidth = 5;
  c.beginPath(); c.arc(len * 0.50, 0, 26, -1.15, 1.15); c.stroke();
  // 红缨
  const fl = Math.sin(t * 6 + 1) * 0.3;
  brush(c, [[len * 0.46, 4], [len * 0.40, 14 + fl * 10], [len * 0.36, 26 + fl * 14]], { w: 11, col: [176, 38, 32], tone: 0.92, dry: 0.62, seed: 560, tail: 0.75, bristles: 5 });
  c.restore();
};

// 短戟（手中十余支，掷敌用）：比长戟短一半，无红缨
Z.jiShort = (c, x, y, ang, len = 130, alpha = 1) => {
  c.save(); c.translate(x, y); c.rotate(ang); c.globalAlpha = alpha;
  brush(c, [[-len * 0.34, 0], [len * 0.5, 0]], { w: 7, tone: 0.9, dry: 0.35, seed: 570, tail: 0.2 });
  c.fillStyle = 'rgba(20,20,22,.92)'; c.beginPath();
  c.moveTo(len * 0.62, 0); c.lineTo(len * 0.48, -9); c.lineTo(len * 0.44, 0); c.lineTo(len * 0.48, 9); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,20,22,.88)'; c.lineWidth = 5; c.lineCap = 'round';
  c.beginPath(); c.moveTo(len * 0.48, -3); c.lineTo(len * 0.44, -22); c.stroke();
  c.restore();
};

// ---------- 猛虎：水墨剪影（奔跃，出自"逐虎过涧"） ----------
// o: { phase(奔跃相位), flip, tone, crouch }
Z.tiger = (c, x, y, s, phase, o = {}) => {
  const { tone = 0.88, flip = 0, crouch = 0 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const bob = Math.sin(phase * 2) * 7, stretch = Math.sin(phase) * 12;
  c.translate(0, bob);
  // 躯干：一笔浓墨横扫（虎背弓起）
  brush(c, [[-96, -60], [-30, -84], [40, -80], [92, -56]], { w: 50, tone, dry: 0.38, seed: 810, head: 0.12, tail: 0.3, bristles: 8 });
  // 斑纹：几道短横（虎的招牌）
  c.save(); c.globalAlpha = 0.55; c.strokeStyle = 'rgba(18,16,14,.9)'; c.lineWidth = 5; c.lineCap = 'round';
  [[-70, -66], [-40, -74], [-8, -76], [24, -74], [56, -66]].forEach(([tx, ty], i) => {
    c.beginPath(); c.moveTo(tx, ty + 8); c.lineTo(tx + 6, ty - 14 - (i % 2) * 6); c.stroke();
  });
  c.restore();
  // 四腿（奔跃/伏）
  [[-70, -24, 1.2], [-40, -22, 2.4], [42, -24, 0.6], [72, -22, 1.9]].forEach(([lx, ly, ph], k) => {
    const L = crouch ? -6 : Math.sin(phase + ph) * 26 + stretch * 0.5;
    brush(c, [[lx, ly], [lx - 4 + L * 0.3, ly + 16], [lx + 2 + L * 0.7, ly + 28], [lx + 6 + L, ly + 42]], { w: 15, tone, dry: 0.5, seed: 820 + k, head: 0.06, tail: 0.3 });
  });
  // 尾（长而有力）
  const tw = Math.sin(phase * 1.4) * 0.5;
  brush(c, [[-96, -62], [-140 + tw * 24, -74], [-178 + tw * 44, -40]], { w: 13, tone, dry: 0.62, seed: 830, head: 0.1, tail: 0.8, bristles: 6 });
  // 头（虎头：圆耳、短吻）
  c.save(); c.translate(112, -76);
  c.fillStyle = `rgba(26,24,22,${tone})`;
  c.beginPath(); c.ellipse(0, 0, 32, 26, -0.15, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(-14, -22, 10, 9, 0.3, 0, Math.PI * 2); c.fill();      // 耳
  c.beginPath(); c.ellipse(10, -24, 10, 9, -0.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(250,246,236,.9)';                                          // 目（吊睛）
  c.beginPath(); c.ellipse(14, -6, 7, 4.5, -0.35, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(15, -6, 2.4, 0, Math.PI * 2); c.fill();
  c.fillStyle = `rgba(30,28,26,${tone})`;                                        // 吻
  c.beginPath(); c.ellipse(30, 8, 15, 11, 0.15, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(250,246,236,.7)'; c.lineWidth = 2;                       // 须
  [[26, 6, 46, 0], [26, 12, 44, 12]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); });
  c.restore();
  c.restore();
};

// ---------- 典韦步战：魁梧壮士（虎背熊腰、短甲、双铁戟）——全片不骑马 ----------
// o: { t, jiAng(双戟角), raise(举戟), stance(步态相位), flip, bare(赤膊上阵：宛城夜战无甲) }
Z.dianWei = (c, x, y, s, o = {}) => {
  // ji: 2=双铁戟（宛城前）／1=右手单戟（双戟既失后）／0=徒手（宛城夜变那一刻）
  const { t = 0, jiAng = -0.55, raise = 0, stance = 0, flip = 0, bare = 0, cape = 0, ji = 2 } = o;
  const br = Math.sin(t * 2.0) * 0.018;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.5);
  const step = Math.sin(stance * 2) * 6;                 // 步战：重心左右换
  c.translate(0, step * 0.5);
  if (cape) {
    const f = Math.sin(t * 1.5) * 12;
    c.fillStyle = 'rgba(250,246,236,.9)';
    c.beginPath(); c.moveTo(-16, -150); c.quadraticCurveTo(-78 - f, -112, -104 - f * 1.4, -20);
    c.quadraticCurveTo(-48, -18, -18, 2); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,30,26,.68)'; c.lineWidth = 2.4; c.stroke();
  }
  // 腿（步战：两条粗腿，前后开立）
  brush(c, [[-14, -74], [-24 + step, -34], [-30 + step, 4]], { w: 22, tone: 0.86, dry: 0.5, seed: 641, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [26 - step, -34], [32 - step, 4]], { w: 22, tone: 0.86, dry: 0.5, seed: 642, head: 0.06, tail: 0.2 });
  // 躯干：虎背熊腰（比赵云/马超宽一圈）
  c.fillStyle = bare ? 'rgba(238,214,178,.72)' : 'rgba(96,88,78,.34)';
  c.beginPath(); c.moveTo(-46, -156); c.lineTo(46, -160); c.lineTo(56, -84); c.lineTo(-50, -78); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 3.4; c.stroke();
  // 胸腹肌块（赤膊时更强壮）
  if (bare) {
    c.strokeStyle = 'rgba(60,48,36,.55)'; c.lineWidth = 2.2;
    [[-24, -132, 44], [-18, -112, 50], [-14, -92, 52]].forEach(([ax, ay, w]) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 3); c.stroke(); });
    c.beginPath(); c.moveTo(0, -150); c.lineTo(-2, -84); c.stroke();               // 腹线
  } else {
    // 短甲（校尉甲：三片，比马超的银甲厚重）
    [[-30, -142, 60], [-24, -120, 66], [-18, -98, 68]].forEach(([ax, ay, w], i) => {
      const g = c.createLinearGradient(ax, ay - 6, ax + w, ay + 10);
      g.addColorStop(0, 'rgba(112,110,116,.9)'); g.addColorStop(0.5, 'rgba(158,156,162,.92)'); g.addColorStop(1, 'rgba(92,90,96,.9)');
      c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 3); c.lineTo(ax + w, ay + 11); c.lineTo(ax, ay + 13); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(40,38,44,.6)'; c.lineWidth = 1.5; c.stroke();
    });
  }
  // 束腰（狮甲绊，宽）
  brush(c, [[-44, -84], [0, -78], [48, -84]], { w: 18, col: [96, 62, 40], tone: 0.9, dry: 0.35, seed: 651 });
  // 头：络腮虬髯、环眼（典韦的凶悍）
  c.save(); c.translate(6, -186);
  c.fillStyle = bare ? 'rgba(242,206,166,.96)' : 'rgba(248,238,220,.96)';
  c.beginPath(); c.ellipse(0, 0, 19, 21, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.9)'; c.lineWidth = 2.2; c.stroke();
  // 兜鍪（铁盔）+ 缨
  c.fillStyle = 'rgba(70,74,84,.94)'; c.beginPath();
  c.moveTo(-21, -10); c.quadraticCurveTo(0, -36, 21, -10); c.lineTo(18, -3); c.lineTo(-18, -3); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(34,36,42,.85)'; c.lineWidth = 1.8; c.stroke();
  brush(c, [[0, -30], [10, -50], [3, -64]], { w: 6, col: [176, 38, 32], tone: 0.92, dry: 0.55, seed: 652, tail: 0.75, bristles: 4 });
  // 环眼 + 虬髯
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -2, 6, 4.5, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(8, -2, 2.6, 0, Math.PI * 2); c.fill();
  c.save(); c.globalAlpha = 0.9; c.strokeStyle = 'rgba(30,26,22,.85)'; c.lineWidth = 3; c.lineCap = 'round';
  [[-10, 6, -18, 20], [-2, 9, -6, 26], [8, 9, 10, 24], [16, 5, 24, 18]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); });
  c.restore();
  c.restore();
  // 双臂（比常人粗）：各握一支铁戟
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -146], [-58, -140 - 16 * rl], [-80, -150 - 34 * rl]], { w: 17, tone: 0.55, dry: 0.4, seed: 661, head: 0.1, tail: 0.2 });
  brush(c, [[34, -146], [62, -140 - 16 * rl], [84, -150 - 34 * rl]], { w: 17, tone: 0.55, dry: 0.4, seed: 662, head: 0.1, tail: 0.2 });
  c.restore();
  // 双铁戟（身体之外取点，跟 Z.hero/Z.mChao 同一套思路）
  const ha = flip ? Math.PI - (jiAng - rl * 0.5) : jiAng - rl * 0.5;
  const hb = flip ? Math.PI - (jiAng + 0.9 - rl * 0.4) : jiAng + 0.9 - rl * 0.4;
  const sx = flip ? -1 : 1;
  if (ji >= 1) Z.ji(c, x + 84 * s * sx, y + (-150 - 34 * rl) * s, ha, 300 * s, t);
  if (ji >= 2) Z.ji(c, x + (-80) * s * sx, y + (-150 - 34 * rl) * s, hb, 290 * s, t + 1.3);
};

// ---------- 火把（宛城夜袭）：一支火 + 光晕 ----------
Z.torch = (c, x, y, s, t, seed = 1) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  brush(c, [[0, 40], [0, 0]], { w: 8, tone: 0.85, dry: 0.4, seed: 700 + seed });
  const g = c.createRadialGradient(0, -8, 4, 0, -8, 130);
  g.addColorStop(0, 'rgba(255,206,120,.55)'); g.addColorStop(0.4, 'rgba(255,170,80,.22)'); g.addColorStop(1, 'rgba(255,160,70,0)');
  c.fillStyle = g; c.beginPath(); c.arc(0, -8, 130, 0, Math.PI * 2); c.fill();
  const fl = Math.sin(t * 8 + seed) * 3.4, fl2 = Math.cos(t * 11 + seed) * 2.4;
  c.fillStyle = 'rgba(255,150,60,.95)';
  c.beginPath(); c.moveTo(-11, -2); c.quadraticCurveTo(fl, -34, 11, -2); c.closePath(); c.fill();
  c.fillStyle = 'rgba(255,226,140,.95)';
  c.beginPath(); c.moveTo(-6, -2); c.quadraticCurveTo(fl2, -22, 6, -2); c.closePath(); c.fill();
  c.restore();
};

// ---------- 营火（大面积，夜袭背景） ----------
Z.campFire = (c, x, y, s, t, { alpha = 1, seed = 2 } = {}) => {
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = alpha;
  const g = c.createRadialGradient(0, 0, 8, 0, 0, 300);
  g.addColorStop(0, 'rgba(255,196,110,.5)'); g.addColorStop(0.35, 'rgba(240,130,50,.24)'); g.addColorStop(1, 'rgba(220,110,40,0)');
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, 300, 0, Math.PI * 2); c.fill();
  for (let k = 0; k < 3; k++) {
    const sw = Math.sin(t * 6 + k * 2 + seed) * 6;
    c.fillStyle = k ? 'rgba(255,214,130,.9)' : 'rgba(255,150,60,.92)';
    c.beginPath(); c.moveTo(-16 + k * 14, 0); c.quadraticCurveTo(sw, -60 - k * 14, 16 + k * 14, 0); c.closePath(); c.fill();
  }
  brush(c, [[-40, 10], [0, 4], [44, 12]], { w: 12, tone: 0.8, dry: 0.5, seed: 710 + seed });
  c.restore();
};

// ---------- 夜色罩（宛城两幕用：把宣纸压成夜蓝） ----------
Z.night = (c, alpha = 0.42) => {
  c.save(); c.globalCompositeOperation = 'multiply';
  c.fillStyle = `rgba(58,74,110,${alpha})`; c.fillRect(0, 0, W, H);
  c.globalCompositeOperation = 'source-over';
  const g = c.createRadialGradient(W / 2, H * 0.62, 120, W / 2, H * 0.62, 1250);
  g.addColorStop(0, 'rgba(255,180,90,.10)'); g.addColorStop(1, 'rgba(20,26,44,.34)');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.restore();
};

// ---------- 辕门（两扇门 + 门框，典韦死守之地） ----------
Z.gate = (c, x, y, s, o = {}) => {
  const { open = 0, t = 0, tone = 0.8 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  // 门框（两根立柱 + 横楣）
  c.fillStyle = `rgba(96,74,50,${0.55 + tone * 0.2})`;
  c.fillRect(-150, -300, 26, 300); c.fillRect(124, -300, 26, 300);
  c.fillRect(-170, -330, 340, 34);
  c.strokeStyle = 'rgba(48,36,26,.85)'; c.lineWidth = 3;
  c.strokeRect(-150, -300, 26, 300); c.strokeRect(124, -300, 26, 300); c.strokeRect(-170, -330, 340, 34);
  // 两扇门（可开）
  const op = ease.inOut(clamp(open));
  [-1, 1].forEach((sg) => {
    c.save(); c.translate(sg * 74, 0); c.rotate(sg * op * 0.75);
    c.fillStyle = 'rgba(120,92,60,.72)';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -262); c.lineTo(-sg * 74, -262); c.lineTo(-sg * 74, 0); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(48,36,26,.9)'; c.lineWidth = 3; c.stroke();
    c.strokeStyle = 'rgba(48,36,26,.6)'; c.lineWidth = 2;                      // 门钉
    for (let i = 0; i < 4; i++) { c.beginPath(); c.arc(-sg * (20 + (i % 2) * 34), -60 - i * 60, 5, 0, Math.PI * 2); c.stroke(); }
    c.fillStyle = 'rgba(190,150,90,.8)'; c.beginPath(); c.arc(-sg * 14, -130, 9, 0, Math.PI * 2); c.fill();   // 铺首衔环
    c.restore();
  });
  c.restore();
};

// ---------- 坟冢（片尾归葬）：土丘 + 碑 + 一炷香 ----------
Z.tomb = (c, x, y, s, t, o = {}) => {
  const { incense = 0 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  // 土丘
  c.fillStyle = 'rgba(150,132,104,.6)';
  c.beginPath(); c.moveTo(-130, 0); c.quadraticCurveTo(0, -110, 130, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(58,46,34,.8)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-100, -14], [-40, -40], [30, -44], [96, -16]], { w: 6, tone: 0.4, dry: 0.7, seed: 880, tail: 0.5 });
  // 碑
  c.fillStyle = 'rgba(206,198,182,.9)';
  c.beginPath(); c.moveTo(-26, -30); c.lineTo(-26, -124); c.quadraticCurveTo(0, -138, 26, -124); c.lineTo(26, -30); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(48,40,32,.88)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-8, -104], [8, -102]], { w: 4, tone: 0.7, dry: 0.4, seed: 881 });
  brush(c, [[-10, -78], [10, -76]], { w: 4, tone: 0.7, dry: 0.4, seed: 882 });
  brush(c, [[-6, -54], [6, -52]], { w: 4, tone: 0.7, dry: 0.4, seed: 883 });
  // 香（三缕青烟）
  if (incense > 0) {
    c.save(); c.globalAlpha = incense;
    U.steam(c, t, { x: 0, y: -30, h: 150, n: 2, w: 3, color: 'rgba(150,140,120,.55)', spread: 14, speed: 0.8, seed: 5, wobble: 8 });
    c.restore();
  }
  c.restore();
};

// ---------- 曹公立姿（片尾哭祭：背影，不画脸） ----------
Z.leader = (c, x, y, s, t, o = {}) => {
  const { flip = 1, bow = 0, cape = 1 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const b = ease.out(clamp(bow));
  c.rotate(b * 0.22);                                    // 躬身
  if (cape) {
    const f = Math.sin(t * 1.2) * 10;
    c.fillStyle = 'rgba(58,62,76,.9)';
    c.beginPath(); c.moveTo(-12, -142); c.quadraticCurveTo(-70 - f, -104, -92 - f * 1.3, -16);
    c.quadraticCurveTo(-44, -14, -16, 2); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,32,40,.8)'; c.lineWidth = 2.4; c.stroke();
  }
  c.fillStyle = 'rgba(52,56,70,.86)';
  c.beginPath(); c.moveTo(-20, -144); c.lineTo(20, -148); c.lineTo(30, 0); c.lineTo(-28, 4); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,24,32,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-18, -96], [0, -92], [20, -96]], { w: 12, col: [150, 122, 62], tone: 0.9, dry: 0.3, seed: 891 });
  c.save(); c.translate(4, -174);
  c.fillStyle = 'rgba(246,238,222,.96)'; c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(40,42,52,.92)'; c.beginPath();                          // 王冠/弁
  c.moveTo(-20, -12); c.lineTo(20, -12); c.lineTo(16, -30); c.lineTo(-16, -30); c.closePath(); c.fill();
  c.restore();
  brush(c, [[10, -130], [30, -118 - 20 * b], [40, -100 - 40 * b]], { w: 13, tone: 0.5, dry: 0.4, seed: 892, head: 0.1, tail: 0.2 });
  c.restore();
};

// ---------- 垂帷（两侧垂挂帷幕，双频呼吸缓摆；静态文戏帧差主力） ----------
// 大面积深色矩形持续平移 → 边缘每帧改约数百~千像素，稳过 12 灰阶阈值。
Z.curtain = (c, x, w, t, o = {}) => {
  const { seed = 1, a = 0.26, h = 1080 } = o;
  const sw = Math.sin(t * 1.1 + seed) * 9 + Math.sin(t * 0.53 + seed * 1.7) * 6;  // 双频 → 永不全静止
  c.save(); c.globalAlpha = a;
  c.translate(x + sw, 0);
  c.fillStyle = 'rgba(64,48,38,.95)';
  c.fillRect(-w / 2, -40, w, h + 80);
  c.strokeStyle = 'rgba(36,26,20,.55)'; c.lineWidth = 3.5;
  for (let k = -2; k <= 2; k++) {
    const fx = k * w / 6 + Math.sin(t * 1.3 + seed + k) * 4;
    c.beginPath(); c.moveTo(fx, -40); c.lineTo(fx + Math.sin(t * 0.9 + seed + k) * 6, h + 40); c.stroke();
  }
  c.restore();
};

// ---------- 浓墨烟带（横向浓墨卷动，大面积高对比持续运动） ----------
Z.inkSmoke = (c, x, ybase, t, o = {}) => {
  const { seed = 1, a = 0.32, n = 3 } = o;
  c.save();
  for (let k = 0; k < n; k++) {
    const off = Math.sin(t * 0.7 + seed + k) * 46 + Math.sin(t * 0.43 + seed * 1.3 + k) * 28;
    const y = ybase + k * 22 + Math.sin(t * 0.8 + seed + k) * 12;
    c.globalAlpha = a * (0.85 - k * 0.12);
    brush(c, [[x - 440 + off, y], [x - 150, y - 12], [x + 150, y + 10], [x + 440 - off, y]], { w: 30, tone: 0.12, dry: 0.82, seed: 900 + k * 7 + (seed | 0), tail: 0.55 });
  }
  c.restore();
};

// ---------- 墨色云影（横扫暗云，持续平移，过阈靠位置移动） ----------
Z.inkCloud = (c, t, o = {}) => {
  const { y = 500, h = 40, n = 3, speed = 70, span = 1500, seed = 1 } = o;
  c.save();
  for (let k = 0; k < n; k++) {
    const cx = ((t * speed + k * span / n + seed * 50) % (span + 500)) - 250;
    c.globalAlpha = 0.30 - k * 0.05;
    c.fillStyle = 'rgba(38,36,46,1)';
    c.beginPath(); c.ellipse(cx, y + k * 26, 220, h, 0, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 俯身 / 倒伏者（被缚、败亡、伏地；复用为倒伏的尸身） ----------
Z.fuZhe = (c, x, y, s, t, o = {}) => {
  const { tone = 'rgba(96,88,76,.68)', seed = 90 } = o;
  const sway = Math.sin(t * 1.3 + seed) * 0.02;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(sway);
  brush(c, [[-40, -4], [-8, -26], [36, -10]], { w: 18, tone: 0.8, dry: 0.5, seed: seed + 1, head: 0.1, tail: 0.3 });
  brush(c, [[-40, -4], [38, -6]], { w: 14, tone: 0.8, dry: 0.6, seed: seed + 2, tail: 0.4 });
  c.fillStyle = tone;
  c.beginPath(); c.moveTo(-28, -22); c.lineTo(-22, -100); c.quadraticCurveTo(0, -112, 24, -98); c.lineTo(30, -22); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.85)'; c.lineWidth = 3; c.stroke();
  brush(c, [[24, -88], [44, -56], [36, -28]], { w: 12, tone: 0.66, dry: 0.5, seed: seed + 3 });
  brush(c, [[-24, -88], [-44, -56], [-36, -28]], { w: 12, tone: 0.66, dry: 0.5, seed: seed + 4 });
  c.fillStyle = 'rgba(240,232,214,.94)'; c.beginPath(); c.ellipse(10, -122, 15, 17, 0.5, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.86)'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = 'rgba(60,52,44,.9)'; c.beginPath(); c.ellipse(8, -130, 16, 8, 0.4, Math.PI, 0); c.fill();
  c.strokeStyle = 'rgba(140,108,64,.9)'; c.lineWidth = 4;
  c.beginPath(); c.moveTo(-26, -78); c.quadraticCurveTo(0, -66, 28, -76); c.stroke();
  c.restore();
};
})();
