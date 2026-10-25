// 《于禁》专属笔法库：毅重老将、大水漫营、陵屋壁画。
// 依赖 h_common.js（宣纸/远山/云气/榜题/钤印/尘/马/弓/连营/云海复用）。于禁的辨识要素：
// ① 持军严整 —— 立姿永远端方（对比姜维的儒、典韦的横、马超的锐）
// ② old 开关：壮年黑发按剑（前四幕）→ 老年须发皓白（归魏之后）
// ③ 大水漫营（汉水泛溢，七军俱没）④ 陵屋壁画（曹丕把他的投降画在墙上，一幅画要了他的命）
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 于禁：毅重（o: { t, jiAng, raise, stance, flip, old, sword(按剑) }） ----------
Z.yuJin = (c, x, y, s, o = {}) => {
  const { t = 0, jiAng = -0.6, raise = 0, stance = 0, flip = 0, old = 0, sword = 0 } = o;
  const br = Math.sin(t * 1.6) * 0.012;                 // 比别人更稳（毅重：摆动幅度减半）
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const step = Math.sin(stance * 2) * 3.5;
  c.translate(0, step * 0.5);
  // 腿（立如松，两腿分得很开）
  brush(c, [[-18, -76], [-28 + step, -34], [-34 + step, 4]], { w: 23, tone: 0.86, dry: 0.5, seed: 701, head: 0.06, tail: 0.2 });
  brush(c, [[18, -76], [28 - step, -34], [34 - step, 4]], { w: 23, tone: 0.86, dry: 0.5, seed: 702, head: 0.06, tail: 0.2 });
  // 躯干（甲，厚重方正）
  c.fillStyle = 'rgba(96,92,100,.38)';
  c.beginPath(); c.moveTo(-46, -158); c.lineTo(46, -162); c.lineTo(52, -84); c.lineTo(-50, -78); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.92)'; c.lineWidth = 3.6; c.stroke();
  [[-30, -144, 62], [-24, -120, 68], [-18, -96, 70]].forEach(([ax, ay, w]) => {
    const g = c.createLinearGradient(ax, ay - 6, ax + w, ay + 10);
    g.addColorStop(0, 'rgba(90,92,104,.9)'); g.addColorStop(0.5, 'rgba(134,134,146,.92)'); g.addColorStop(1, 'rgba(78,80,92,.9)');
    c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 3); c.lineTo(ax + w, ay + 11); c.lineTo(ax, ay + 13); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(40,38,44,.6)'; c.lineWidth = 1.4; c.stroke();
  });
  brush(c, [[-46, -84], [0, -78], [48, -84]], { w: 17, col: [100, 74, 42], tone: 0.92, dry: 0.35, seed: 703 });
  // 头：兜鍪 + 老年须发皓白
  c.save(); c.translate(4, -188);
  c.fillStyle = old ? 'rgba(240,232,214,.96)' : 'rgba(248,240,222,.96)';
  c.beginPath(); c.ellipse(0, 0, 18, 20, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.9)'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = 'rgba(74,78,88,.94)'; c.beginPath();
  c.moveTo(-20, -9); c.quadraticCurveTo(0, -34, 20, -9); c.lineTo(17, -2); c.lineTo(-17, -2); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(34,36,42,.85)'; c.lineWidth = 1.8; c.stroke();
  brush(c, [[0, -28], [11, -46], [4, -60]], { w: 6, col: [176, 44, 36], tone: 0.92, dry: 0.55, seed: 704, tail: 0.75, bristles: 4 });
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -2, 5.6, 4.2, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(8, -2, 2.5, 0, Math.PI * 2); c.fill();
  // 须（old 时皓白且更长垂到胸前）
  const wf = Math.sin(t * 1.7) * 5;
  const beardCol = old ? 'rgba(244,240,232,.95)' : 'rgba(34,30,26,.88)';
  c.save(); c.globalAlpha = 0.92; c.strokeStyle = beardCol; c.lineWidth = old ? 4 : 3.2; c.lineCap = 'round';
  const drop = old ? 52 : 28;
  [[-9, 7, -18, drop], [0, 10, -2, drop + 12], [9, 9, 13, drop]].forEach(([x1, y1, x2, y2], k) => {
    c.beginPath(); c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2 + wf * 0.4, (y1 + y2) / 2, x2 + wf * (0.5 + k * 0.2), y2 + wf * 0.3);
    c.stroke();
  });
  if (old) {                                                                    // 鬓发皓白
    brush(c, [[-16, -6], [-26, 8], [-30, 20]], { w: 5, col: [246, 242, 234], tone: 0.92, dry: 0.55, seed: 705, tail: 0.8, bristles: 3 });
    brush(c, [[16, -6], [26, 8], [30, 20]], { w: 5, col: [246, 242, 234], tone: 0.92, dry: 0.55, seed: 706, tail: 0.8, bristles: 3 });
  }
  c.restore();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  if (sword) {
    brush(c, [[-32, -148], [-64, -142], [-92, -150 - 18 * rl]], { w: 17, tone: 0.55, dry: 0.4, seed: 707, head: 0.1, tail: 0.2 });
    brush(c, [[34, -148], [66, -142], [94, -150 - 18 * rl]], { w: 17, tone: 0.55, dry: 0.4, seed: 708, head: 0.1, tail: 0.2 });
  } else {
    brush(c, [[-32, -148], [-64, -140 - 16 * rl], [-92, -150 - 34 * rl]], { w: 17, tone: 0.55, dry: 0.4, seed: 707, head: 0.1, tail: 0.2 });
    brush(c, [[34, -148], [66, -140 - 16 * rl], [94, -150 - 34 * rl]], { w: 17, tone: 0.55, dry: 0.4, seed: 708, head: 0.1, tail: 0.2 });
  }
  c.restore();
  const sx = flip ? -1 : 1;
  if (sword) {                                                                  // 按剑：短兵拄地
    c.save(); c.translate(x - 92 * s * sx, y - (150 + 18 * rl) * s); c.rotate(0.28 * sx);
    brush(c, [[0, 0], [0, 210]], { w: 9, tone: 0.92, dry: 0.32, seed: 709, head: 0.05, tail: 0.16 });
    c.fillStyle = 'rgba(24,24,26,.94)'; c.beginPath();
    c.moveTo(0, 224); c.lineTo(-9, 186); c.lineTo(9, 186); c.closePath(); c.fill();
    c.restore();
  } else {                                                                      // 长刀（禁好持刀）
    c.save(); c.translate(x + 94 * s * sx, y - (150 + 34 * rl) * s); c.rotate((flip ? Math.PI : 0) - (jiAng - rl * 0.5));
    brush(c, [[-120, 0], [0, 0], [150, 0]], { w: 10, tone: 0.94, dry: 0.3, seed: 710, head: 0.05, tail: 0.16 });
    c.fillStyle = 'rgba(24,24,26,.94)'; c.beginPath();
    c.moveTo(186, 0); c.lineTo(142, -12); c.lineTo(136, 0); c.lineTo(142, 12); c.closePath(); c.fill();
    c.restore();
  }
};

// ---------- 大水漫营（汉水泛溢：横贯全画的水面，浪头一层压一层） ----------
Z.shuiYan = (c, t, o = {}) => {
  const { y0 = 620, y1 = 1080, level = 1, seed = 3 } = o;
  const top = lerp(y1, y0, clamp(level));
  c.save();
  // 水体（淡青墨）
  c.fillStyle = 'rgba(96,120,128,.34)';
  c.beginPath(); c.moveTo(0, 1080);
  for (let x = 0; x <= 1920; x += 40) c.lineTo(x, top + Math.sin(x * 0.008 + t * 1.1) * 12);
  c.lineTo(1920, 1080); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,70,80,.55)'; c.lineWidth = 3;
  c.beginPath();
  for (let x = 0; x <= 1920; x += 40) { const y = top + Math.sin(x * 0.008 + t * 1.1) * 12; x === 0 ? c.moveTo(x, y) : c.lineTo(x, y); }
  c.stroke();
  // 浪头（三道，匀速左移，保证全段都有运动）
  for (let k = 0; k < 3; k++) {
    const wy = top + 90 + k * 110;
    const wx = ((k / 3) * 2200 + t * (60 + k * 18)) % 2200 - 140;
    brush(c, [[wx - 190, wy], [wx - 60, wy - 26], [wx + 90, wy - 8], [wx + 210, wy + 6]], { w: 9, tone: 0.4, dry: 0.6, seed: seed + k, head: 0.1, tail: 0.4, bristles: 5 });
  }
  c.restore();
};

// ---------- 陵屋（祭殿：殿身 + 匾 + 台阶，于禁见画而死之地） ----------
Z.lingWu = (c, x, y, s, t, o = {}) => {
  const { tone = 0.76 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(186,170,142,.6)'; c.fillRect(-260, -260, 520, 260);
  c.strokeStyle = 'rgba(52,42,32,.9)'; c.lineWidth = 3.6; c.strokeRect(-260, -260, 520, 260);
  // 四柱
  [[-210, 0], [-70, 0], [70, 0], [210, 0]].forEach(([px], k) => {
    brush(c, [[px, 0], [px + 1, -256]], { w: 12, tone: tone * 0.9, dry: 0.4, seed: 750 + k });
  });
  // 匾
  c.fillStyle = 'rgba(160,124,76,.86)'; c.fillRect(-90, -236, 180, 44);
  c.strokeStyle = 'rgba(52,40,28,.88)'; c.lineWidth = 2.6; c.strokeRect(-90, -236, 180, 44);
  c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(40,32,24,.9)'; c.textAlign = 'center';
  c.fillText('武庙', 0, -206);
  // 檐
  c.fillStyle = 'rgba(150,116,74,.8)';
  c.beginPath(); c.moveTo(-310, -260); c.quadraticCurveTo(0, -330, 310, -260); c.lineTo(250, -252); c.lineTo(-250, -252); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(46,38,28,.88)'; c.lineWidth = 3; c.stroke();
  // 台阶
  for (let k = 0; k < 3; k++) brush(c, [[-240 + k * 20, -k * 12], [240 - k * 20, -k * 12]], { w: 9, tone: tone * 0.72, dry: 0.6, seed: 760 + k });
  c.restore();
};

// ---------- 壁画（三幅：关羽战克 / 庞德愤怒 / 禁降服之状） ----------
// prog: 0→1 依次显影
Z.beiHua = (c, x, y, s, prog, t, o = {}) => {
  const { seed = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  const names = ['羽战克', '德愤怒', '禁降服'];
  const cols = ['rgba(150,60,48,.5)', 'rgba(96,90,72,.5)', 'rgba(80,92,86,.5)'];
  [-1, 0, 1].forEach((k, idx) => {
    const on = clamp(prog * 3 - idx);
    if (on <= 0) return;
    const px = k * 150;
    c.save(); c.globalAlpha = on;
    c.fillStyle = 'rgba(238,230,208,.9)'; c.fillRect(px - 62, -120, 124, 150);
    c.strokeStyle = 'rgba(52,44,34,.85)'; c.lineWidth = 2.6; c.strokeRect(px - 62, -120, 124, 150);
    c.fillStyle = cols[idx];
    // 三个人形剪影（姿态各异：胜/怒/伏）
    c.save(); c.translate(px, -30);
    if (idx === 0) { c.rotate(-0.15); } else if (idx === 1) { c.rotate(0.1); } else { c.rotate(0.42); }   // 降服：伏低
    c.beginPath(); c.moveTo(-26, 0); c.lineTo(-18, -70); c.lineTo(-24, -96);
    c.quadraticCurveTo(0, -104, 24, -96); c.lineTo(18, -70); c.lineTo(26, 0); c.closePath(); c.fill();
    c.beginPath(); c.arc(0, -112, 12, 0, Math.PI * 2); c.fill();
    c.restore();
    c.font = '22px "LXGWWenKai-500"'; c.fillStyle = 'rgba(60,50,40,.8)'; c.textAlign = 'center';
    c.fillText(names[idx], px, 46);
    c.restore();
  });
  c.restore();
};
})();
