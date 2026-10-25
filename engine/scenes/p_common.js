// 《庞德》专属笔法库：白马将军、重甲、堤上拒水、国家鬼。
// 依赖 h_common.js。庞德的辨识要素（与马超/于禁区分）：
// ① 全片唯一以「马」为主母题的主角——常乘白马，羽军谓之白马将军
// ② 重甲黑将（被甲持弓，箭不虚发）③ 汉水堤战（与于禁片互为镜像：同样的水，两种死法）
// ④ 「宁为国家鬼，不为贼将」
(() => {
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 庞德：令明（o: { t, raise, stance, flip, bow(持弓), draw(拉弓 0→1), captive(被缚) }） ----------
Z.pangDe = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, stance = 0, flip = 0, bow = 0, draw = 0, captive = 0 } = o;
  const br = Math.sin(t * 1.7) * 0.015;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  c.translate(0, Math.sin(stance * 2) * 3.5);
  const step = Math.sin(stance * 2) * 3.5;
  // 腿
  brush(c, [[-16, -74], [-27 + step, -34], [-33 + step, 4]], { w: 21, tone: 0.84, dry: 0.5, seed: 1101, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [27 - step, -34], [33 - step, 4]], { w: 21, tone: 0.84, dry: 0.5, seed: 1102, head: 0.06, tail: 0.2 });
  // 重甲（黑铁：与于禁的青灰甲区分，更深更重）
  c.fillStyle = 'rgba(52,54,64,.72)';
  c.beginPath(); c.moveTo(-46, -160); c.lineTo(46, -164); c.lineTo(52, -84); c.lineTo(-50, -78); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(14,14,18,.94)'; c.lineWidth = 3.8; c.stroke();
  [[-30, -146, 62], [-24, -120, 68], [-18, -96, 70]].forEach(([ax, ay, w], k) => {
    const g = c.createLinearGradient(ax, ay - 6, ax + w, ay + 10);
    g.addColorStop(0, 'rgba(64,66,78,.95)'); g.addColorStop(0.5, 'rgba(96,98,112,.95)'); g.addColorStop(1, 'rgba(54,56,66,.95)');
    c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 3); c.lineTo(ax + w, ay + 11); c.lineTo(ax, ay + 13); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(20,20,26,.7)'; c.lineWidth = 1.4; c.stroke();
  });
  brush(c, [[-46, -84], [0, -78], [48, -84]], { w: 17, col: [84, 62, 36], tone: 0.92, dry: 0.35, seed: 1103 });
  // 头 + 兜鍪（黑鍪红缨）
  c.save(); c.translate(4, -190);
  c.fillStyle = 'rgba(244,236,218,.96)';
  c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(18,18,22,.92)'; c.lineWidth = 2.4; c.stroke();
  c.fillStyle = 'rgba(30,32,40,.96)';
  c.beginPath(); c.moveTo(-21, -9); c.quadraticCurveTo(0, -36, 21, -9); c.lineTo(17, -1); c.lineTo(-17, -1); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(14,14,20,.9)'; c.lineWidth = 1.8; c.stroke();
  brush(c, [[0, -30], [12, -50], [5, -66]], { w: 6.5, col: [176, 44, 36], tone: 0.94, dry: 0.55, seed: 1104, tail: 0.8, bristles: 4 });
  // 目（刚毅）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -2, 5.4, 4, -0.06, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(18,18,20,.96)'; c.beginPath(); c.arc(8, -2, 2.4, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,18,.8)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(1, -10); c.lineTo(13, -9); c.stroke();
  // 浓须（黑，短硬）
  const wf = Math.sin(t * 1.7) * 4;
  c.strokeStyle = 'rgba(30,28,26,.9)'; c.lineWidth = 3.4; c.lineCap = 'round';
  [[-8, 8, -12, 30], [0, 10, -1, 36], [8, 8, 12, 29]].forEach(([x1, y1, x2, y2], k) => {
    c.beginPath(); c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2 + wf * 0.3, (y1 + y2) / 2, x2 + wf * (0.3 + k * 0.15), y2 + wf * 0.2);
    c.stroke();
  });
  c.restore();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  if (bow) {
    // 持弓：左臂前伸持弓，右臂拉弦
    brush(c, [[-30, -146], [-72, -146 - 10 * draw], [-104, -146 - 16 * draw]], { w: 16, tone: 0.5, dry: 0.4, seed: 1105, head: 0.1, tail: 0.2 });
    brush(c, [[30, -146], [58 - 22 * draw, -140 - 6 * draw], [76 - 30 * draw, -146 - 14 * draw]], { w: 15, tone: 0.5, dry: 0.4, seed: 1106, head: 0.1, tail: 0.2 });
  } else if (captive) {
    brush(c, [[-26, -150], [-46, -112], [-34, -88]], { w: 15, tone: 0.6, dry: 0.45, seed: 1105 });
    brush(c, [[26, -150], [46, -112], [34, -88]], { w: 15, tone: 0.6, dry: 0.45, seed: 1106 });
  } else {
    brush(c, [[-28, -148], [-56 - 6 * rl, -136 - 16 * rl], [-80 - 10 * rl, -118 - 34 * rl]], { w: 16, tone: 0.5, dry: 0.45, seed: 1105, head: 0.1, tail: 0.2 });
    brush(c, [[28, -148], [56 + 6 * rl, -136 - 16 * rl], [80 + 10 * rl, -118 - 34 * rl]], { w: 16, tone: 0.5, dry: 0.45, seed: 1106, head: 0.1, tail: 0.2 });
  }
  c.restore();
  const sx = flip ? -1 : 1;
  if (bow) {                                       // 长弓（左手上，弦随 draw）
    c.save(); c.translate(x - 106 * s * sx, y - (152 + 16 * draw) * s);
    c.rotate((flip ? Math.PI : 0) - 0.12);
    c.strokeStyle = 'rgba(70,50,30,.94)'; c.lineWidth = 7; c.lineCap = 'round';
    const b = 30 + draw * 26;
    c.beginPath(); c.moveTo(0, -120); c.quadraticCurveTo(-b, 0, 0, 120); c.stroke();
    // 弦（拉开后 V 形）
    c.strokeStyle = 'rgba(232,226,210,.92)'; c.lineWidth = 2.2;
    c.beginPath(); c.moveTo(0, -120); c.lineTo(b - 30 - draw * 20, 0); c.lineTo(0, 120); c.stroke();
    if (draw > 0.35) {                              // 搭箭
      c.strokeStyle = 'rgba(56,44,32,.92)'; c.lineWidth = 3.4;
      c.beginPath(); c.moveTo(-b - 6, 0); c.lineTo(66, 0); c.stroke();
      c.fillStyle = 'rgba(176,44,36,.9)';
      c.beginPath(); c.moveTo(84, 0); c.lineTo(62, -7); c.lineTo(62, 7); c.closePath(); c.fill();
    }
    c.restore();
  }
  if (captive) {                                    // 缚绳
    c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
    c.strokeStyle = 'rgba(140,108,64,.9)'; c.lineWidth = 4.5;
    c.beginPath(); c.moveTo(-30, -88); c.quadraticCurveTo(0, -74, 30, -86); c.stroke();
    c.beginPath(); c.moveTo(-30, -120); c.quadraticCurveTo(0, -106, 30, -118); c.stroke();
    c.restore();
  }
};

// ---------- 白马（通体素白，鬃尾轻扬；phase 控制步态） ----------
Z.baiMa = (c, x, y, s, phase, o = {}) => {
  const { gallop = 1, blanket = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  const g1 = Math.sin(phase) * 0.5 + 0.5, g2 = Math.sin(phase + Math.PI * 0.7) * 0.5 + 0.5;
  // 四腿
  const lp = [-18 + g1 * 22, 14 - g2 * 20, -12 - g2 * 20, 18 + g1 * 22];
  lp.forEach((lx, k) => {
    brush(c, [[lx * 0.4, -92], [lx, -46], [lx + (k % 2 ? 6 : -6), 0]], { w: 13, tone: 0.94, dry: 0.5, seed: 1120 + k, head: 0.05, tail: 0.2 });
  });
  // 躯干（素白）
  c.fillStyle = 'rgba(240,236,226,.94)';
  c.beginPath(); c.ellipse(0, -120, 118, 52, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(90,86,80,.5)'; c.lineWidth = 2; c.stroke();
  // 颈 + 头
  c.fillStyle = 'rgba(240,236,226,.94)';
  c.beginPath(); c.moveTo(92, -150); c.quadraticCurveTo(136, -180, 148, -216); c.lineTo(120, -222); c.quadraticCurveTo(96, -186, 66, -166); c.closePath(); c.fill();
  c.beginPath(); c.ellipse(150, -224, 34, 18, 0.3, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(90,86,80,.5)'; c.lineWidth = 2; c.stroke();
  // 耳
  c.fillStyle = 'rgba(240,236,226,.95)';
  c.beginPath(); c.moveTo(140, -238); c.lineTo(146, -256); c.lineTo(154, -240); c.closePath(); c.fill();
  // 鬃（白，扬）
  c.strokeStyle = 'rgba(246,242,232,.96)'; c.lineWidth = 9; c.lineCap = 'round';
  for (let k = 0; k < 4; k++) {
    const sway = Math.sin(phase * 0.8 + k) * 6;
    c.beginPath(); c.moveTo(96 - k * 22, -160 - k * 6);
    c.quadraticCurveTo(84 - k * 20 + sway, -186 - k * 4, 88 - k * 24 + sway, -204);
    c.stroke();
  }
  // 尾
  c.strokeStyle = 'rgba(244,240,230,.94)'; c.lineWidth = 8;
  c.beginPath(); c.moveTo(-112, -138);
  c.quadraticCurveTo(-148, -120 + Math.sin(phase) * 10, -166, -86 + Math.sin(phase + 1) * 12);
  c.stroke();
  // 鞍鞯（红）
  if (blanket) {
    c.fillStyle = 'rgba(168,52,40,.85)';
    c.beginPath(); c.ellipse(-6, -158, 44, 20, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(96,28,20,.8)'; c.lineWidth = 2.4; c.stroke();
  }
  c.restore();
};

// ---------- 水淹长堤（暴雨 + 汉水 + 孤堤：p6/p7 用的主景） ----------
Z.diShang = (c, t, level = 0.6, o = {}) => {
  const { y = 760 } = o;
  // 水面
  c.fillStyle = 'rgba(92,116,124,.4)';
  c.beginPath(); c.moveTo(0, 1080);
  for (let x = 0; x <= 1920; x += 40) c.lineTo(x, y + Math.sin(x * 0.008 + t * 1.2) * 12);
  c.lineTo(1920, 1080); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,70,80,.55)'; c.lineWidth = 3;
  c.beginPath();
  for (let x = 0; x <= 1920; x += 40) { const yy = y + Math.sin(x * 0.008 + t * 1.2) * 12; x === 0 ? c.moveTo(x, yy) : c.lineTo(x, yy); }
  c.stroke();
  // 浪头三道
  for (let k = 0; k < 3; k++) {
    const wy = y + 80 + k * 90;
    const wx = ((k / 3) * 2200 + t * (58 + k * 16)) % 2200 - 140;
    brush(c, [[wx - 180, wy], [wx - 50, wy - 24], [wx + 90, wy - 6], [wx + 200, wy + 6]], { w: 9, tone: 0.4, dry: 0.6, seed: 1130 + k, head: 0.1, tail: 0.4, bristles: 5 });
  }
};

// ---------- 暴雨（斜雨丝；p5/p6 主景，也是「霖雨十余日」的题眼） ----------
Z.pRain = (c, t, o = {}) => {
  const { n = 110, speed = 1500, alpha = 0.32, seed = 1201, y0 = 60, y1 = 980 } = o;
  const R = rng(seed), span = y1 - y0 + 260;
  c.save(); c.lineCap = 'round';
  for (let k = 0; k < n; k++) {
    const bx = -160 + R() * 2240, by = R() * span, ln = 34 + R() * 52;
    const yy = y0 + (by + t * speed * (0.72 + R() * 0.62)) % span;
    c.strokeStyle = `rgba(74,88,96,${(alpha * (0.45 + R() * 0.65)).toFixed(3)})`;
    c.lineWidth = 1.6 + R() * 1.9;
    c.beginPath(); c.moveTo(bx, yy); c.lineTo(bx - ln * 0.36, yy + ln); c.stroke();
  }
  c.restore();
};

// ---------- 关羽楼船（羽乘大船，四面射堤） ----------
Z.guanChuan = (c, x, y, s, t) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.translate(0, Math.sin(t * 1.6) * 7);
  // 船身
  c.fillStyle = 'rgba(96,76,52,.9)';
  c.beginPath(); c.moveTo(-224, -40); c.lineTo(224, -42); c.lineTo(182, 36); c.lineTo(-184, 34); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(42,32,22,.9)'; c.lineWidth = 4; c.stroke();
  // 楼（两层）
  c.fillStyle = 'rgba(152,124,88,.92)';
  c.beginPath(); c.rect(-122, -152, 244, 114); c.fill();
  c.strokeStyle = 'rgba(48,38,26,.9)'; c.lineWidth = 3.6; c.stroke();
  c.fillStyle = 'rgba(62,46,32,.9)';
  c.beginPath(); c.moveTo(-140, -152); c.lineTo(0, -200); c.lineTo(140, -152); c.closePath(); c.fill();
  // 箭孔（五个，射堤之「四面」）
  c.fillStyle = 'rgba(28,24,18,.88)';
  for (let k = -2; k <= 2; k++) { c.beginPath(); c.rect(k * 46 - 12, -130, 24, 36); c.fill(); }
  // 桅
  c.strokeStyle = 'rgba(62,46,32,.92)'; c.lineWidth = 7; c.lineCap = 'round';
  c.beginPath(); c.moveTo(0, -200); c.lineTo(0, -336); c.stroke();
  c.restore();
  Z.flag(c, x + 4 * s, y - 336 * s, 118 * s, t, { seed: 1081, col: 'rgba(140,44,36,.8)', text: '关' });
};

// ---------- 关羽（长髯 + 长柄大刀；Z.leader 之上加辨识要素） ----------
Z.guanYu = (c, x, y, s, t, o = {}) => {
  const { flip = 1, bow = 0 } = o;
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
  c.strokeStyle = 'rgba(76,58,36,.94)'; c.lineWidth = 6;   // 刀杆
  c.beginPath(); c.moveTo(54, -126); c.lineTo(76, 14); c.stroke();
  c.strokeStyle = 'rgba(124,128,140,.95)'; c.lineWidth = 10; c.lineCap = 'round';
  c.beginPath(); c.moveTo(50, -132); c.quadraticCurveTo(98, -152, 126, -116); c.stroke();
  c.restore();
};

// ---------- 小船（p6 覆舟：capsize 0→1 翻转） ----------
Z.xiaoChuan = (c, x, y, s, t, o = {}) => {
  const { capsize = 0 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.rotate(capsize * 2.5);
  c.translate(0, Math.sin(t * 2.3) * 7 + capsize * 26);
  c.fillStyle = 'rgba(106,86,60,.92)';
  c.beginPath(); c.moveTo(-124, -26); c.lineTo(124, -30); c.lineTo(94, 26); c.lineTo(-94, 22); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(44,34,24,.9)'; c.lineWidth = 3.8; c.stroke();
  c.strokeStyle = 'rgba(62,48,34,.55)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-110, -6); c.lineTo(106, -10); c.stroke();
  c.restore();
};
})();
