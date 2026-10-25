// 《太史慈》专属笔法库：猿臂长须的壮士、戟、兜鍪、神亭、北海城楼、箭雨。
// 依赖 h_common.js（宣纸/远山/云气/榜题/钤印/尘/马/弓复用）。太史慈的辨识要素：
// ① 美须髯 + 猿臂（臂比常人长，这是史书原话「猿臂善射」）② 戟（神亭单挑的兵器，不是枪不是双戟）
// ③ 兜鍪（与孙策互易的那一顶）④ 北海孤城与箭雨（求援母题）
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 单戟（太史慈的戟：比典韦的双戟修长，红缨小而收，神亭单挑用） ----------
// 不复用 w_common 的 Z.ji（那是典韦的双戟），避免笔法库互相依赖，也顺带做出视觉区分。
Z.jiTan = (c, x, y, ang, len = 320, t = 0, o = {}) => {
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[-len * 0.38, 0], [0, 0], [len * 0.56, 0]], { w: 9, tone: 0.95, dry: 0.3, seed: 755, head: 0.06, tail: 0.16, bristles: 6 });
  c.fillStyle = 'rgba(20,20,22,.94)'; c.beginPath();                                   // 直刃
  c.moveTo(len * 0.66, 0); c.lineTo(len * 0.54, -10); c.lineTo(len * 0.50, 0); c.lineTo(len * 0.54, 10); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,20,22,.92)'; c.lineWidth = 6; c.lineCap = 'round';
  c.beginPath(); c.moveTo(len * 0.54, -4); c.lineTo(len * 0.50, -34); c.stroke();       // 横枝（长而斜）
  c.beginPath(); c.moveTo(len * 0.50, -34); c.lineTo(len * 0.42, -50); c.stroke();
  c.strokeStyle = 'rgba(28,28,30,.85)'; c.lineWidth = 4.5;
  c.beginPath(); c.arc(len * 0.54, 0, 22, -1.0, 1.0); c.stroke();                       // 月牙小枝
  const fl = Math.sin(t * 6 + 1) * 0.3;
  brush(c, [[len * 0.50, 4], [len * 0.44, 12 + fl * 8], [len * 0.40, 22 + fl * 11]], { w: 9, col: [176, 44, 36], tone: 0.9, dry: 0.65, seed: 756, tail: 0.8, bristles: 4 });
  c.restore();
};

// ---------- 太史慈：猿臂长须，持戟（o.bow=1 时改持弓） ----------
// o: { t, jiAng, raise, stance, flip, bow(0戟/1弓), draw(拉弓), helm(戴兜鍪) }
Z.taiShiCi = (c, x, y, s, o = {}) => {
  const { t = 0, jiAng = -0.55, raise = 0, stance = 0, flip = 0, bow = 0, draw = 0, helm = 1 } = o;
  const br = Math.sin(t * 2.0) * 0.016;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.5);
  const step = Math.sin(stance * 2) * 5;
  c.translate(0, step * 0.5);
  // 腿（猿臂对应长腿，比常人高一档）
  brush(c, [[-13, -78], [-22 + step, -36], [-28 + step, 4]], { w: 21, tone: 0.86, dry: 0.5, seed: 641, head: 0.06, tail: 0.2 });
  brush(c, [[15, -78], [24 - step, -36], [30 - step, 4]], { w: 21, tone: 0.86, dry: 0.5, seed: 642, head: 0.06, tail: 0.2 });
  // 躯干（甲）
  c.fillStyle = 'rgba(100,96,104,.36)';
  c.beginPath(); c.moveTo(-42, -160); c.lineTo(42, -164); c.lineTo(50, -86); c.lineTo(-46, -80); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 3.4; c.stroke();
  [[-28, -146, 58], [-22, -123, 62], [-18, -100, 64]].forEach(([ax, ay, w]) => {
    const g = c.createLinearGradient(ax, ay - 6, ax + w, ay + 10);
    g.addColorStop(0, 'rgba(100,102,112,.9)'); g.addColorStop(0.5, 'rgba(146,146,156,.92)'); g.addColorStop(1, 'rgba(86,88,98,.9)');
    c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 3); c.lineTo(ax + w, ay + 11); c.lineTo(ax, ay + 13); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(40,38,44,.6)'; c.lineWidth = 1.4; c.stroke();
  });
  brush(c, [[-42, -86], [0, -81], [44, -86]], { w: 15, col: [110, 84, 46], tone: 0.9, dry: 0.35, seed: 651 });
  // 头：兜鍪 + 美须髯（太史慈的招牌：长须随风）
  c.save(); c.translate(5, -192);
  c.fillStyle = 'rgba(248,240,222,.96)'; c.beginPath(); c.ellipse(0, 0, 18, 20, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.9)'; c.lineWidth = 2.2; c.stroke();
  if (helm) {
    c.fillStyle = 'rgba(74,78,88,.94)'; c.beginPath();
    c.moveTo(-20, -9); c.quadraticCurveTo(0, -34, 20, -9); c.lineTo(17, -2); c.lineTo(-17, -2); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,36,42,.85)'; c.lineWidth = 1.8; c.stroke();
    brush(c, [[0, -28], [11, -46], [4, -60]], { w: 6, col: [176, 44, 36], tone: 0.92, dry: 0.55, seed: 652, tail: 0.75, bristles: 4 });
  }
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -2, 5.6, 4.2, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(8, -2, 2.5, 0, Math.PI * 2); c.fill();
  // 美须髯：三长缕，随风吹（t 驱动，保证任何定格都有微动）
  const wf = Math.sin(t * 1.9) * 7;
  c.save(); c.globalAlpha = 0.9; c.strokeStyle = 'rgba(30,26,22,.88)'; c.lineWidth = 3.4; c.lineCap = 'round';
  [[-9, 7, -19, 30], [0, 10, -4, 44], [9, 9, 12, 36]].forEach(([x1, y1, x2, y2], k) => {
    c.beginPath(); c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2 + wf * 0.4, (y1 + y2) / 2, x2 + wf * (0.5 + k * 0.2), y2 + wf * 0.3);
    c.stroke();
  });
  c.restore();
  c.restore();
  // 双臂：猿臂 —— 比常人长一截（这是「猿臂善射」的视觉落点）
  const rl = ease.out(clamp(raise));
  const dl = ease.out(clamp(draw));
  if (bow) {
    brush(c, [[-28, -150], [-72, -156 + dl * 10], [-118 - dl * 34, -150 + dl * 16]], { w: 15, tone: 0.55, dry: 0.4, seed: 661, head: 0.1, tail: 0.2 });  // 持弓臂（长）
    brush(c, [[30, -152], [50, -160], [46 + dl * 14, -176 - dl * 12]], { w: 15, tone: 0.55, dry: 0.4, seed: 662, head: 0.1, tail: 0.2 });                  // 拉弦臂
  } else {
    brush(c, [[-30, -150], [-66, -142 - 14 * rl], [-94, -152 - 32 * rl]], { w: 16, tone: 0.55, dry: 0.4, seed: 661, head: 0.1, tail: 0.2 });
    brush(c, [[32, -150], [64, -142 - 16 * rl], [92, -152 - 34 * rl]], { w: 16, tone: 0.55, dry: 0.4, seed: 662, head: 0.1, tail: 0.2 });
  }
  c.restore();
  // 兵器（画在体外）
  const sx = flip ? -1 : 1;
  if (bow) {
    c.save(); c.translate(x - 118 * s * sx, y - 150 * s); c.scale(sx * s, s);
    Z.bow(c, 0, 0, 1, t, { draw: dl, flip: flip ? 1 : 0 });
    c.restore();
  } else {
    const ha = flip ? Math.PI - (jiAng - rl * 0.5) : jiAng - rl * 0.5;
    // 单手一支长戟（与典韦的双戟、赵云的长枪区分）
    Z.jiTan(c, x + 92 * s * sx, y + (-152 - 34 * rl) * s, ha, 320 * s, t);
  }
};

// ---------- 兜鍪（孙策的头盔，神亭互易之物；可单独摆在地上/手上） ----------
Z.douMou = (c, x, y, s, t, o = {}) => {
  const { alpha = 1, flip = 0 } = o;
  c.save(); c.translate(x, y); c.scale((flip ? -s : s), s); c.globalAlpha = alpha;
  c.fillStyle = 'rgba(76,80,90,.94)';
  c.beginPath(); c.moveTo(-34, 8); c.quadraticCurveTo(0, -46, 34, 8); c.lineTo(28, 16); c.lineTo(-28, 16); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,32,40,.88)'; c.lineWidth = 2.6; c.stroke();
  c.fillStyle = 'rgba(58,62,72,.9)'; c.fillRect(-34, 14, 68, 8);
  c.strokeStyle = 'rgba(30,32,40,.8)'; c.lineWidth = 2; c.strokeRect(-34, 14, 68, 8);
  const fl = Math.sin(t * 2.1) * 5;
  brush(c, [[0, -40], [12, -62 + fl * 0.3], [2, -80 + fl * 0.5]], { w: 7, col: [176, 44, 36], tone: 0.92, dry: 0.58, seed: 690, tail: 0.8, bristles: 4 });
  c.restore();
};

// ---------- 神亭（一亭：四柱一顶，神亭酣战之地） ----------
Z.shenTing = (c, x, y, s, t, o = {}) => {
  const { tone = 0.72 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  [[-96, 0], [96, 0]].forEach(([px], k) => {
    brush(c, [[px, 0], [px + 1, -170]], { w: 10, tone: tone * 0.95, dry: 0.4, seed: 700 + k });
  });
  brush(c, [[-104, -170], [104, -172]], { w: 8, tone: tone * 0.9, dry: 0.45, seed: 710 });
  c.fillStyle = 'rgba(158,126,80,.8)';
  c.beginPath(); c.moveTo(-150, -172); c.quadraticCurveTo(0, -250, 150, -172); c.lineTo(96, -166); c.lineTo(-96, -166); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(52,40,28,.85)'; c.lineWidth = 3; c.stroke();
  c.fillStyle = 'rgba(150,118,74,.75)'; c.fillRect(-118, -172, 236, 10);
  c.strokeStyle = 'rgba(52,40,28,.8)'; c.lineWidth = 2; c.strokeRect(-118, -172, 236, 10);
  // 亭下石凳
  brush(c, [[-70, -6], [70, -8]], { w: 12, tone: tone * 0.7, dry: 0.6, seed: 720 });
  c.restore();
};

// ---------- 孤城（北海：被围的城楼，墙外敌营火） ----------
Z.guCheng = (c, x, y, s, t, o = {}) => {
  const { tone = 0.78 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(190,174,146,.6)'; c.fillRect(-160, -230, 320, 230);
  c.strokeStyle = 'rgba(52,42,32,.88)'; c.lineWidth = 3.4; c.strokeRect(-160, -230, 320, 230);
  c.fillStyle = 'rgba(46,36,28,.72)'; c.fillRect(-34, -96, 68, 96);                     // 城门（闭）
  c.fillStyle = 'rgba(158,124,78,.82)';
  c.beginPath(); c.moveTo(-190, -230); c.lineTo(0, -278); c.lineTo(190, -230); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(46,38,28,.88)'; c.lineWidth = 2.8; c.stroke();
  // 墙外敌营火（围城：三簇）
  [0, 1, 2].forEach((k) => {
    const fx = -330 + k * 330, fy = 20;
    const fl = Math.sin(t * 7 + k * 2) * 4;
    c.fillStyle = 'rgba(255,150,60,.9)';
    c.beginPath(); c.moveTo(fx - 11, fy); c.quadraticCurveTo(fx + fl, fy - 34, fx + 11, fy); c.closePath(); c.fill();
    const g = c.createRadialGradient(fx, fy - 6, 4, fx, fy - 6, 90);
    g.addColorStop(0, 'rgba(255,196,110,.42)'); g.addColorStop(1, 'rgba(255,160,70,0)');
    c.fillStyle = g; c.beginPath(); c.arc(fx, fy - 6, 90, 0, Math.PI * 2); c.fill();
  });
  c.restore();
};

// ---------- 箭雨（连射：太史慈弦不虚发，箭矢成排） ----------
// o: { n, t0(0..1 的发射进度), x0, y0, ang, spread }
Z.jianYu = (c, x0, y0, prog, o = {}) => {
  const { n = 5, ang = -0.5, len = 170, spread = 60, seed = 1 } = o;
  for (let k = 0; k < n; k++) {
    const p = clamp(prog * n - k);
    if (p <= 0) continue;
    const px = x0 + Math.cos(ang) * (120 + p * 620) + (k % 2 ? 1 : -1) * spread * (k / n);
    const py = y0 + Math.sin(ang) * (120 + p * 620) + (k - n / 2) * 26;
    c.save(); c.globalAlpha = clamp(p * 3) * 0.92;
    Z.arrow(c, px, py, ang, len, 1);
    c.restore();
  }
};
})();
