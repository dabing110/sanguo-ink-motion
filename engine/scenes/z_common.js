// 《常山赵子龙》共用笔法库：宣纸、远山、云气、奔马、马上将军、长枪、旌旗、江水、榜题、钤印。
// 规矩同 skill：一切随机用种子（同帧两次一样）；每段一主动作＋至少两个母题循环。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z = {};

// ---------- 宣纸 ----------
Z.paper = (key = 'zl_paper', base = '#efe6d0') => P.cached(key, W, H, (g) => {
  g.drawImage(P.texture('xuan_' + key, base, { scale: 0.0025, amt: 9, grain: 7, seed: 5 }), 0, 0);
  const r = rng(41);
  g.lineCap = 'round';
  for (let i = 0; i < 2200; i++) {                       // 纸纤维
    const x = r() * W, y = r() * H, a = r() * Math.PI * 2, l = 6 + r() * 26;
    g.strokeStyle = r() < 0.5 ? `rgba(150,125,90,${0.05 + r() * 0.08})` : `rgba(255,252,240,${0.12 + r() * 0.15})`;
    g.lineWidth = 0.6 + r() * 0.8; g.beginPath(); g.moveTo(x, y);
    g.quadraticCurveTo(x + Math.cos(a + 0.6) * l * 0.5, y + Math.sin(a + 0.6) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  const vg = g.createRadialGradient(W / 2, H / 2, 420, W / 2, H / 2, 1300);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(120,90,50,.20)');
  g.fillStyle = vg; g.fillRect(0, 0, W, H);
});

// 墨晕层：把一段绘制当成湿墨，随时间缓缓外扩（grow 越大洇得越开）
Z.wash = (c, key, grow, fn, o) => P.inkWash(c, key, grow, fn, o);

// ---------- 远山（淡墨，一层或多层） ----------
// layers: [{ y0, amp, tone, seed }]
Z.mountains = (c, g, x0, x1, layers) => {
  layers.forEach((L, li) => {
    const pts = [];
    for (let x = x0 - 40; x <= x1 + 40; x += 12) {
      const n = P.fbm(x * 0.0042 + L.seed * 7, L.seed * 3.1, 4);
      pts.push([x, L.y0 - L.amp * (0.55 + 0.45 * n)]);
    }
    const gr = g.createLinearGradient(0, L.y0 - L.amp * 1.1, 0, L.y0 + 120);
    gr.addColorStop(0, `rgba(44,44,48,${L.tone})`); gr.addColorStop(1, 'rgba(44,44,48,0)');
    g.fillStyle = gr; g.beginPath(); pts.forEach((p, i) => i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]));
    g.lineTo(x1 + 40, L.y0 + 160); g.lineTo(x0 - 40, L.y0 + 160); g.closePath(); g.fill();
    // 山脊一勾浓墨（皴）
    c.save(); c.globalAlpha = 0.35 + 0.12 * li;
    brush(c, pts.filter((_, i) => i % 3 === 0), { w: 5, tone: 0.8, dry: 0.7, seed: 200 + li, head: 0.02, tail: 0.5, bristles: 4 });
    c.restore();
  });
};

// ---------- 云气：横向缓移的纸色晕带 ----------
Z.mist = (c, t, { y0 = 200, y1 = 700, n = 4, alpha = 0.7, speed = 60, seed = 1 } = {}) => {
  const r = rng(seed);
  c.save(); c.filter = 'blur(16px)';
  for (let k = 0; k < n; k++) {
    const y = lerp(y0, y1, (k + 0.5) / n) + (r() - .5) * 40;
    const h = 22 + r() * 46, sp = speed * (0.7 + r() * 0.8);
    const x = ((t * sp + r() * 2400) % (W + 1200)) - 500;
    c.fillStyle = `rgba(243,236,218,${alpha})`;
    c.beginPath(); c.ellipse(x, y, 240 + r() * 180, h, 0, 0, Math.PI * 2); c.fill();
  }
  c.filter = 'none'; c.restore();
};

// ---------- 松/枯枝（一段一笔，随风摇） ----------
Z.pine = (c, t, { x, y, s = 1, seed = 3, tone = 0.85 } = {}) => {
  const sw = Math.sin(t * 1.7 + seed) * 0.05;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(sw);
  brush(c, [[0, 0], [-14, -70], [6, -140], [-4, -210]], { w: 12, tone, dry: 0.6, seed: 400 + seed, head: 0.1, tail: 0.4, bristles: 6 });
  [[-150, 1], [-96, -1], [-52, 1]].forEach(([yy, sg], k) => {
    brush(c, [[0, yy], [sg * 60, yy - 16], [sg * 104, yy - 34]], { w: 5, tone: tone * 0.9, dry: 0.55, seed: 410 + seed + k, head: 0.05, tail: 0.5, bristles: 4 });
    for (let i = 0; i < 5; i++) {                        // 松针：放射短线
      const a = -0.9 + i * 0.42 + Math.sin(t * 2 + i) * 0.05;
      const bx = sg * (56 + i * 12), by = yy - 18 - i * 5;
      brush(c, [[bx, by], [bx + Math.cos(a) * 26, by + Math.sin(a) * 26]], { w: 3, tone: 0.8, dry: 0.4, seed: 430 + seed + i, bristles: 3 });
    }
  });
  c.restore();
};

// ---------- 长枪：杆一笔、枪尖三角、红缨飞白 ----------
Z.spear = (c, x, y, ang, len = 300, t = 0, o = {}) => {
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[-len * 0.42, 0], [0, 0], [len * 0.58, 0]], { w: 9, tone: 0.95, dry: 0.3, seed: 500, head: 0.06, tail: 0.16, bristles: 6 });
  // 枪尖
  c.fillStyle = 'rgba(20,20,22,.92)'; c.beginPath();
  c.moveTo(len * 0.58, 0); c.lineTo(len * 0.5, -9); c.lineTo(len * 0.46, 0); c.lineTo(len * 0.5, 9); c.closePath(); c.fill();
  // 红缨：随挥动甩
  const fl = Math.sin(t * 6 + 1) * 0.25;
  brush(c, [[len * 0.46, 2], [len * 0.4, 12 + fl * 10], [len * 0.36, 24 + fl * 16]], { w: 10, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 510, bristles: 6, tail: 0.7 });
  brush(c, [[len * 0.46, -2], [len * 0.42, -13 - fl * 8], [len * 0.38, -22 - fl * 14]], { w: 8, col: [178, 40, 34], tone: 0.85, dry: 0.7, seed: 511, bristles: 5, tail: 0.7 });
  if (o.ring) { c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 3; c.beginPath(); c.ellipse(len * 0.44, 0, 6, 9, 0, 0, Math.PI * 2); c.stroke(); }
  c.restore();
};

// ---------- 奔马：浓墨剪影（一笔躯干＋四腿按相位摆＋尾与鬃飘） ----------
// phase: 奔跑相位（周期 2π 一循环）；o.gallop: 0=立 1=奔；o.flip=1 头朝左
Z.horse = (c, x, y, s, phase, o = {}) => {
  const { tone = 0.9, gallop = 1, flip = 0 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const g = gallop;
  const bob = Math.sin(phase * 2) * 6 * g;                 // 起伏
  const lift = (k) => Math.sin(phase + k) * 22 * g;        // 四腿相位差
  c.save(); c.translate(0, bob * 0.4);
  // 四腿（在躯干后面，淡一档）
  const legs = [[-54, -38, 2.0], [-38, -36, 0.9], [38, -38, 2.6], [54, -36, 3.5]];
  legs.forEach(([lx, ly, ph], k) => {
    const L = lift(ph);
    brush(c, [[lx, ly], [lx - 5 + L * 0.35, ly + 20], [lx - 1 + L * 0.7, ly + 38], [lx + 5 + L, ly + 56]], { w: 14, tone, dry: 0.5, seed: 620 + k, head: 0.06, tail: 0.3 });
  });
  // 躯干：一笔浓墨横扫（胸厚臀收）＋淡墨腹底
  brush(c, [[-78, -74], [-30, -92], [36, -88], [84, -70]], { w: 54, tone, dry: 0.42, seed: 605, head: 0.14, tail: 0.34, bristles: 8 });
  brush(c, [[-60, -42], [0, -36], [56, -44]], { w: 24, tone: tone * 0.62, dry: 0.55, seed: 606, head: 0.1, tail: 0.4 });
  // 尾
  const tw = Math.sin(phase * 1.3) * 0.12;
  brush(c, [[-88, -76], [-122 + tw * 20, -58], [-146 + tw * 40, -16]], { w: 15, tone, dry: 0.6, seed: 600, head: 0.1, tail: 0.8, bristles: 7 });
  // 颈与头（奋起前冲）
  brush(c, [[40, -92], [74, -122], [96, -136]], { w: 34, tone, dry: 0.4, seed: 601, head: 0.12, tail: 0.3 });
  brush(c, [[96, -136], [124, -128], [140, -112]], { w: 18, tone, dry: 0.45, seed: 602, head: 0.1, tail: 0.26 });
  c.fillStyle = `rgba(20,19,17,${tone})`; c.beginPath(); c.ellipse(136, -108, 9, 6, 0.5, 0, Math.PI * 2); c.fill();   // 鼻
  brush(c, [[128, -132], [132, -122], [130, -112]], { w: 5, tone: tone * 0.5, dry: 0.4, seed: 609 });                 // 颚须
  // 鬃（逆风扬起）
  for (let i = 0; i < 5; i++) {
    const q = i / 4, px = lerp(52, 100, q), py = lerp(-108, -134, q);
    brush(c, [[px, py], [px - 8 + Math.sin(phase * 3 + i) * 4 * g, py - 22], [px - 18, py - 38]], { w: 8, tone: 0.96, dry: 0.6, seed: 610 + i, tail: 0.7, bristles: 4 });
  }
  // 缰
  brush(c, [[60, -110], [92, -122]], { w: 3, tone: 0.6, dry: 0.6, seed: 630, tail: 0.5 });
  c.restore();
  c.restore();
};

// ---------- 马上将军：淡墨袍＋白披风＋银枪（浓墨马背上的亮部） ----------
// o: { spearAng, spearLen, hold(抱婴), cape(披风), backFlag, flip }
Z.rider = (c, x, y, s, phase, o = {}) => {
  const { spearAng = -0.35, spearLen = 320, hold = 0, pouch = 0, cape = 1, backFlag = 1, t = 0, flip = 0 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const bob = Math.sin(phase * 2) * 5;
  const sway = Math.sin(phase * 1.1) * 0.03;
  c.translate(0, bob * 0.6); c.rotate(sway);
  // 背旗（三角旗，随奔袭后掠）
  if (backFlag) {
    const a = -0.5 + Math.sin(phase * 2.2) * 0.12;
    c.save(); c.translate(-40, -132); c.rotate(a);
    brush(c, [[0, 0], [-4, -78]], { w: 5, tone: 0.9, dry: 0.4, seed: 700 });
    c.fillStyle = 'rgba(186,52,42,.85)'; c.beginPath();
    c.moveTo(-4, -76); c.lineTo(-60 - Math.sin(phase * 3) * 8, -62); c.lineTo(-8, -30); c.closePath(); c.fill();
    c.restore();
  }
  // 披风（纸白留白，风里兜着）
  if (cape) {
    const f = Math.sin(phase * 2.4) * 14;
    c.save();
    c.fillStyle = 'rgba(253,251,246,.94)';
    c.beginPath(); c.moveTo(-22, -132); c.quadraticCurveTo(-76 - f, -112, -102 - f * 1.6, -62);
    c.quadraticCurveTo(-58, -56, -28, -40); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.72)'; c.lineWidth = 2.6; c.stroke();
    c.restore();
  }
  // 袍身：淡墨没骨＋浓墨衣纹（人在马背，淡墨让马把人托出来）
  c.save();
  c.fillStyle = 'rgba(88,82,72,.26)';
  c.beginPath(); c.moveTo(-26, -128); c.lineTo(26, -132); c.lineTo(34, -78); c.lineTo(-30, -74); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.88)'; c.lineWidth = 3; c.stroke();
  // 甲片：胸前三笔
  c.strokeStyle = 'rgba(22,20,18,.62)'; c.lineWidth = 2;
  [[-14, -108, 38], [-10, -90, 42], [-6, -72, 44]].forEach(([ax, ay, w], i) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 2); c.stroke(); });
  // 束腰
  brush(c, [[-24, -60], [2, -56], [30, -60]], { w: 12, col: [172, 38, 32], tone: 0.85, dry: 0.3, seed: 711 });
  c.restore();
  // 头与兜鍪
  c.save(); c.translate(26, -156);
  c.fillStyle = 'rgba(250,242,228,.96)'; c.beginPath(); c.ellipse(0, 0, 15, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(34,32,38,.92)'; c.beginPath();                     // 兜鍪
  c.moveTo(-17, -8); c.quadraticCurveTo(0, -30, 17, -8); c.lineTo(15, -2); c.lineTo(-15, -2); c.closePath(); c.fill();
  c.fillStyle = '#c0392b'; c.beginPath(); c.arc(0, -22, 4.5, 0, Math.PI * 2); c.fill();   // 盔缨
  brush(c, [[0, -24], [8, -40], [2, -52]], { w: 5, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 710, tail: 0.7, bristles: 4 });
  c.fillStyle = 'rgba(20,18,16,.9)'; c.beginPath(); c.arc(6, 2, 2.2, 0, Math.PI * 2); c.fill();   // 目
  c.restore();
  // 双臂：前臂持枪 / 抱婴
  if (hold > 0) {
    brush(c, [[26, -122], [4, -108], [-14, -116]], { w: 13, tone: 0.5, dry: 0.4, seed: 720, head: 0.1, tail: 0.2 });
    c.save(); c.translate(-18, -122); c.scale(0.9, 0.9);
    c.fillStyle = 'rgba(252,248,240,.96)'; c.beginPath(); c.ellipse(0, 0, 15, 19, -0.2, 0, Math.PI * 2); c.fill();  // 襁褓
    c.strokeStyle = 'rgba(30,28,26,.75)'; c.lineWidth = 2; c.stroke();
    c.strokeStyle = 'rgba(178,40,34,.75)'; c.lineWidth = 4; c.beginPath(); c.moveTo(-12, -6); c.lineTo(12, 4); c.stroke();
    c.restore();
  } else {
    brush(c, [[24, -120], [52, -108], [76, -102]], { w: 12, tone: 0.5, dry: 0.4, seed: 721, head: 0.1, tail: 0.2 });
    brush(c, [[26, -116], [46, -96], [58, -78]], { w: 11, tone: 0.5, dry: 0.4, seed: 722, head: 0.1, tail: 0.2 });
  }
  if (pouch) {                                            // 胸前襁褓：一大团白裹住幼主，小头露在裹沿外
    const jig = Math.sin(phase * 2.6) * 2;
    c.save(); c.translate(2, -96 + jig);
    c.fillStyle = 'rgba(252,248,240,.97)'; c.beginPath(); c.ellipse(0, 0, 19, 21, -0.18, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.72)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = 'rgba(252,248,240,.99)'; c.beginPath(); c.arc(2, -21, 9, 0, Math.PI * 2); c.fill();      // 幼主小头
    c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 1.6; c.stroke();
    c.fillStyle = 'rgba(28,24,20,.9)'; c.beginPath(); c.arc(2, -23.5, 3.2, 0, Math.PI * 2); c.fill();      // 胎发
    c.fillStyle = 'rgba(20,18,16,.55)'; c.beginPath(); c.arc(5, -20, 1.3, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(178,40,34,.8)'; c.lineWidth = 3.5; c.beginPath(); c.moveTo(-13, -4); c.lineTo(12, 6); c.stroke();
    c.restore();
  }
  c.restore();
  const hx = flip ? -76 : 76, ha = flip ? Math.PI - spearAng : spearAng;
  if (!hold) Z.spear(c, x + hx * s, y + (-102 + bob * 0.6) * s, ha, spearLen * s, t);
  else Z.spear(c, x + (flip ? -62 : 62) * s, y + (-126 + bob * 0.6) * s, flip ? Math.PI - (spearAng - 0.5) : spearAng - 0.5, spearLen * s, t);
};

// ---------- 步战将军（立姿，淡墨袍＋浓墨衣纹＋白披风） ----------
Z.hero = (c, x, y, s, t, o = {}) => {
  const { spearAng = -0.9, spearLen = 340, cape = 1, raise = 0 } = o;   // raise: 0→1 举枪
  const br = Math.sin(t * 2.2) * 0.02;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(br * 0.4);
  if (cape) {
    const f = Math.sin(t * 1.6) * 12;
    c.fillStyle = 'rgba(253,251,246,.94)';
    c.beginPath(); c.moveTo(-14, -146); c.quadraticCurveTo(-74 - f, -112, -100 - f * 1.4, -22);
    c.quadraticCurveTo(-48, -20, -20, 0); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 2.4; c.stroke();
  }
  // 袍：淡墨没骨＋浓墨边
  c.fillStyle = 'rgba(88,82,72,.26)';
  c.beginPath(); c.moveTo(-22, -148); c.lineTo(24, -152); c.lineTo(34, 0); c.lineTo(-32, 4); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-24, -146], [-10, -138], [2, -140]], { w: 10, tone: 0.72, dry: 0.45, seed: 738, head: 0.1, tail: 0.2 });
  brush(c, [[26, -150], [36, -142], [44, -128]], { w: 9, tone: 0.72, dry: 0.45, seed: 739, head: 0.1, tail: 0.2 });
  // 下摆衣纹（三笔）
  brush(c, [[-14, -70], [-8, -34], [-3, -6]], { w: 3.5, tone: 0.34, dry: 0.65, seed: 735, tail: 0.6, bristles: 3 });
  brush(c, [[5, -66], [9, -30], [11, -4]], { w: 3, tone: 0.3, dry: 0.65, seed: 736, tail: 0.6, bristles: 3 });
  brush(c, [[20, -72], [24, -36], [26, -8]], { w: 3, tone: 0.28, dry: 0.65, seed: 737, tail: 0.6, bristles: 3 });
  // 腰束
  brush(c, [[-20, -100], [0, -96], [22, -100]], { w: 12, col: [172, 38, 32], tone: 0.85, dry: 0.3, seed: 731 });
  // 甲
  c.strokeStyle = 'rgba(22,20,18,.6)'; c.lineWidth = 2;
  [[-12, -132, 36], [-8, -116, 40], [-4, -100, 42]].forEach(([ax, ay, w]) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 2); c.stroke(); });
  // 头
  c.save(); c.translate(26, -178);
  c.fillStyle = 'rgba(250,242,228,.96)'; c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(34,32,38,.92)'; c.beginPath(); c.moveTo(-18, -9); c.quadraticCurveTo(0, -32, 18, -9); c.lineTo(16, -3); c.lineTo(-16, -3); c.closePath(); c.fill();
  c.fillStyle = '#c0392b'; c.beginPath(); c.arc(0, -24, 5, 0, Math.PI * 2); c.fill();
  brush(c, [[0, -26], [9, -44], [3, -56]], { w: 5, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 732, tail: 0.7, bristles: 4 });
  c.fillStyle = 'rgba(20,18,16,.9)'; c.beginPath(); c.arc(7, 1, 2.3, 0, Math.PI * 2); c.fill();
  c.restore();
  // 双臂：举枪
  const rl = ease.out(clamp(raise));
  const ang = lerp(-0.72, -0.96, rl);            // 起手即斜举，避免枪杆水平横穿躯干
  brush(c, [[18, -140], [46, -136 - 24 * rl], [74, -152 - 50 * rl]], { w: 12, tone: 0.5, dry: 0.4, seed: 733, head: 0.1, tail: 0.2 });
  brush(c, [[18, -136], [42, -120 - 22 * rl], [64, -106 - 44 * rl]], { w: 11, tone: 0.5, dry: 0.4, seed: 734, head: 0.1, tail: 0.2 });
  c.restore();
  Z.spear(c, x + (74) * s, y + (-152 - 50 * rl) * s, ang, spearLen * s, t, { ring: 1 });
};

// ---------- 旌旗（杆＋飘旗） ----------
Z.flag = (c, x, y, h, t, { col = 'rgba(178,40,34,.85)', text, seed = 1, droop = 0 } = {}) => {
  const wv = Math.sin(t * 3 + seed) * 0.06;
  c.save(); c.translate(x, y);
  brush(c, [[0, 0], [2, -h]], { w: 6, tone: 0.9, dry: 0.4, seed: 800 + seed });
  c.save(); c.translate(2, -h + 10); c.rotate(wv);
  const fw = 96, fh = 62;
  c.fillStyle = col;
  c.beginPath(); c.moveTo(0, 0);
  c.quadraticCurveTo(fw * 0.5, -8 + Math.sin(t * 4 + seed) * 6, fw, 2 + Math.sin(t * 4 + seed) * 10);
  c.lineTo(fw, fh + Math.sin(t * 4 + seed) * 8); c.quadraticCurveTo(fw * 0.5, fh + 6, 0, fh); c.closePath(); c.fill();
  c.fillStyle = 'rgba(250,244,232,.92)';
  c.beginPath(); c.arc(fw * 0.42, fh * 0.5, 12, 0, Math.PI * 2); c.fill();
  if (text) { c.fillStyle = 'rgba(20,18,16,.9)'; c.font = '22px "LXGWWenKai-500"'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, fw * 0.42, fh * 0.5 + 1); }
  c.restore(); c.restore();
};

// ---------- 江水：横向水波线，随时间推移 ----------
Z.water = (c, t, { y0 = 700, y1 = 1040, tone = 0.35, seed = 9, rows = 7 } = {}) => {
  const r = rng(seed);
  c.save();
  for (let k = 0; k < rows; k++) {
    const y = lerp(y0, y1, (k + 0.5) / rows);
    const sp = 40 + k * 26, amp = 5 + k * 2.4;
    const x0 = -((t * sp) % 260);
    const pts = [];
    for (let x = x0 - 200; x < W + 300; x += 26) pts.push([x, y + Math.sin((x + t * sp) * 0.014 + k) * amp]);
    brush(c, pts, { w: 3 + k * 0.5, tone: tone + k * 0.03, dry: 0.75, seed: 900 + k + Math.floor(t * 4), head: 0.02, tail: 0.6, bristles: 3, per: 2 });
  }
  c.restore();
};

// ---------- 烟尘／尘土（战场上滚） ----------
Z.dust = (c, t, { x, y, n = 5, seed = 4, scale = 1, alpha = 0.4 } = {}) => {
  const r = rng(seed);
  c.save();
  for (let k = 0; k < n; k++) {
    const ph = (t * 0.5 + r()) % 1;
    const px = x + (r() - 0.5) * 220 - ph * 160 * scale;
    const py = y - ph * 90 + Math.sin(t * 1.4 + k) * 12;
    const rr = (26 + r() * 40) * (0.5 + ph) * scale;
    c.fillStyle = `rgba(120,104,80,${alpha * (1 - ph)})`;
    c.beginPath(); c.ellipse(px, py, rr, rr * 0.55, 0, 0, Math.PI * 2); c.fill();
  }
  c.filter = 'none'; c.restore();
};

// ---------- 雁阵（远空掠过） ----------
Z.geese = (c, t, { y = 260, x0 = 1900, speed = 190, n = 5, seed = 2, scale = 1 } = {}) => {
  const r = rng(seed);
  c.save(); c.fillStyle = 'rgba(24,22,20,.85)';
  for (let k = 0; k < n; k++) {
    const lag = k * 0.16;
    const x = x0 - ((t + lag * 3 + r() * 2) * speed) % (W + 500) + 250;
    const yy = y + k * 22 * scale + Math.sin(t * 1.2 + k) * 6;
    const fl = Math.sin(t * 12 + k * 1.4) * 0.5;
    c.save(); c.translate(x, yy); c.scale(scale, scale); c.rotate(-0.12);
    c.beginPath(); c.ellipse(0, 0, 9, 5, 0, 0, Math.PI * 2); c.fill();
    leaf(c, -2, -2, -1.25 - fl, 26 * (0.8 + r() * 0.4), 8, 0.9);
    leaf(c, 4, -1, -0.55 + fl * 0.8, 22 * (0.8 + r() * 0.4), 7, 0.85);
    c.restore();
  }
  c.restore();
};

// ---------- 榜题：右上角竖排（中文题跋） ----------
// o: { title, sub, x, y, size, gap, subSize, alpha, col }
Z.colophon = (c, { title, sub, x = 1810, y = 110, size = 54, gap = 62, subSize = 26, alpha = 1, col = 'rgba(24,20,16,.92)', subCol = 'rgba(60,50,40,.8)' }) => {
  c.save(); c.globalAlpha = alpha; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = `${size}px "LXGWWenKai-500"`; c.fillStyle = col;
  [...title].forEach((ch, i) => c.fillText(ch, x, y + i * gap));
  if (sub) {
    c.font = `${subSize}px "LXGWWenKai-500"`; c.fillStyle = subCol;
    [...sub].forEach((ch, i) => c.fillText(ch, x + 34, y + 6 + i * (subSize + 6)));
  }
  c.restore();
};

// ---------- 钤印：朱文方印，盖下时先大后压实，印泥略洇 ----------
Z.seal = (c, x, y, text, q, { size = 86, seed = 7, col = '#c4281e' } = {}) => {
  if (q <= 0) return;
  const img = P.cached('zl_seal_' + text, size, size, (g) => {
    g.translate(size / 2, size / 2);
    g.fillStyle = col; g.fillRect(-size * 0.42, -size * 0.42, size * 0.84, size * 0.84);
    g.globalCompositeOperation = 'destination-out';
    g.font = `${Math.round(size * 0.36)}px "LXGWWenKai-500"`; g.textAlign = 'center'; g.textBaseline = 'middle';
    const ch = [...text];
    if (ch.length <= 2) ch.forEach((t, i) => g.fillText(t, 0, (i - (ch.length - 1) / 2) * size * 0.38));
    else { g.fillText(ch[0], -size * 0.19, -size * 0.19); g.fillText(ch[1], size * 0.19, -size * 0.19); g.fillText(ch[2], -size * 0.19, size * 0.19); g.fillText(ch[3], size * 0.19, size * 0.19); }
    const r = rng(seed);
    for (let i = 0; i < 60; i++) g.fillRect(-size * 0.42 + r() * size * 0.84, -size * 0.42 + r() * size * 0.84, 1 + r() * 3, 1 + r() * 2);
  });
  const s = 1.6 - 0.6 * ease.out(clamp(q));
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = Math.min(1, q * 1.7); c.globalCompositeOperation = 'multiply';
  c.filter = `blur(${(1 - clamp(q)) * 2.5}px)`;
  c.drawImage(img, -size / 2, -size / 2); c.filter = 'none'; c.restore();
};

// ---------- 大字（逐字落墨，用于片尾/高潮榜题） ----------
Z.bigText = (c, text, { x, y, size = 120, font = 'LXGWWenKai-500', col = 'rgba(20,18,16,.92)', gap = 0, appear = 1, vertical = false, shadow } = {}) => {
  const ch = [...text];
  c.save(); c.textAlign = 'center'; c.textBaseline = 'middle';
  c.font = `${size}px "${font}"`;
  if (shadow) { c.shadowColor = shadow.color; c.shadowBlur = shadow.blur || 0; c.shadowOffsetX = shadow.x || 0; c.shadowOffsetY = shadow.y || 0; }
  ch.forEach((t, i) => {
    const p = clamp((appear - i * 0.12) / 0.5);
    if (p <= 0) return;
    const e = ease.out(p);
    c.save();
    const px = vertical ? x : x + (i - (ch.length - 1) / 2) * (size + gap);
    const py = vertical ? y + (i - (ch.length - 1) / 2) * (size + gap) : y;
    c.globalAlpha = e; c.translate(px, py); c.scale(1.25 - 0.25 * e, 1.25 - 0.25 * e);
    c.fillStyle = col; c.fillText(t, 0, 0);
    c.restore();
  });
  c.restore();
};
})();
