// 《满宠》专属笔法库：魏奋威/征东将军，以执法峻刻、合肥拒吴、新城屯守著称。
// 依赖 h_common.js ＋ _motif.js。满宠的辨识要素（与许褚/魏延/法正区分）：
// ① 深褐硬甲（执法武将，非虎皮、非深青袍）② 兜鍪（头盔）③ 刚毅短须 ④ 持律简（执法之征，非刀、非羽扇）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 律简（竹简一卷，执法之征）
Z.scroll = (c, x, y, ang, t, o = {}) => {
  const { len = 150 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  // 卷轴木轴
  brush(c, [[0, 0], [0, -len]], { w: 8, col: [120, 84, 48], tone: 0.9, dry: 0.4, seed: 740 });
  // 简片
  c.fillStyle = 'rgba(216,196,150,.92)';
  c.fillRect(-22, -len, 44, len);
  c.strokeStyle = 'rgba(90,66,40,.8)'; c.lineWidth = 1.6;
  for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(-22, -len + k * len / 6); c.lineTo(22, -len + k * len / 6); c.stroke(); }
  c.strokeRect(-22, -len, 44, len);
  // 绳
  brush(c, [[-22, -len * 0.5], [22, -len * 0.5]], { w: 3, col: [150, 40, 36], tone: 0.8, dry: 0.4, seed: 741 });
  c.restore();
};

// 满宠：伯宁（o: { t, raise, flip, scroll }）——深褐硬甲、兜鍪、刚毅，持律简。
Z.mancong = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, scroll = 1 } = o;
  const br = Math.sin(t * 1.2) * 0.01;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const hem = Math.sin(t * 1.4) * 4;
  // 腿
  brush(c, [[-18, -74], [-28, -34], [-34, 4]], { w: 19, tone: 0.84, dry: 0.5, seed: 1301, head: 0.06, tail: 0.2 });
  brush(c, [[18, -74], [28, -34], [34, 4]], { w: 19, tone: 0.84, dry: 0.5, seed: 1302, head: 0.06, tail: 0.2 });
  // 深褐硬甲
  c.fillStyle = 'rgba(74,60,46,.72)';
  c.beginPath();
  c.moveTo(-30, -162); c.quadraticCurveTo(-52, -84, -54 + hem, -6);
  c.quadraticCurveTo(0, 2 + hem * 0.3, 54 + hem * 0.6, -6); c.quadraticCurveTo(52, -86, 30, -162);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,18,14,.9)'; c.lineWidth = 3; c.stroke();
  // 甲片纹
  c.strokeStyle = 'rgba(40,32,22,.55)'; c.lineWidth = 1.6;
  for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-46, -30 - k * 24); c.quadraticCurveTo(0, -22 - k * 24, 46, -30 - k * 24); c.stroke(); }
  // 朱束腰
  brush(c, [[-32, -118], [0, -114], [32, -118]], { w: 12, col: [158, 52, 44], tone: 0.85, dry: 0.3, seed: 1331 });
  // 头 + 兜鍪 + 刚毅面
  c.save(); c.translate(2, -186);
  c.fillStyle = 'rgba(244,232,212,.96)';
  c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  // 兜鍪（头盔）
  c.fillStyle = 'rgba(58,60,66,.95)';
  c.beginPath();
  c.moveTo(-22, 2); c.quadraticCurveTo(-20, -28, 2, -30); c.quadraticCurveTo(24, -26, 24, 2);
  c.lineTo(18, 6); c.quadraticCurveTo(0, -8, -16, 6); c.closePath(); c.fill();
  // 盔顶红缨
  brush(c, [[2, -30], [2, -50]], { w: 6, col: [180, 50, 42], tone: 0.85, dry: 0.3, seed: 1332 });
  // 目（刚毅）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -1, 4.6, 3, -0.1, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.92)'; c.beginPath(); c.arc(8, -1, 2.2, 0, Math.PI * 2); c.fill();
  // 短须
  const wf = Math.sin(t * 1.4) * 3;
  c.strokeStyle = 'rgba(70,62,52,.92)'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-8, 10); c.quadraticCurveTo(-1, 26 + wf * 0.3, 7, 16 + wf); c.stroke();
  c.restore();
  // 双臂：前臂举律简，后臂垂/按剑
  const rl = ease.out(clamp(raise));
  brush(c, [[-28, -148], [-46 - 6 * rl, -136 - 14 * rl], [-60 - 10 * rl, -120 - 30 * rl]], { w: 14, tone: 0.6, dry: 0.45, seed: 1303, head: 0.1, tail: 0.2 });
  brush(c, [[28, -148], [42, -132], [50, -112]], { w: 13, tone: 0.6, dry: 0.45, seed: 1304, head: 0.1, tail: 0.2 });
  c.restore();
  if (scroll) {
    const hx = flip ? -60 : 60, hy = -120;
    Z.scroll(c, x + hx * s, y + hy * s, flip ? 2.4 : 0.85, t, { len: 150 });
  }
};
})();
