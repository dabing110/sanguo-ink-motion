// 《法正》专属笔法库：蜀汉谋主孝直——清癯深袍谋臣，持羽扇，沉毅善断（不是名士麈尾、不是武将举刀）。
// 依赖 h_common.js ＋ _motif.js。法正的辨识要素（与许靖/田丰/荀彧区分）：
// ① 深墨青谋臣袍（沉色，非浅名士袍）② 小冠（平巾帻式）③ 清癯 ④ 羽扇（谋臣招牌，非麈尾）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 羽扇（谋臣招牌：柄＋圆扇面）
Z.fan = (c, x, y, ang, t, o = {}) => {
  const { len = 130 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, -len * 0.55]], { w: 6, col: [110, 80, 48], tone: 0.9, dry: 0.4, seed: 850 });
  c.save(); c.translate(0, -len * 0.55);
  const fl = Math.sin(t * 3) * 0.06;
  c.rotate(fl);
  c.fillStyle = 'rgba(242,238,226,.92)';
  c.beginPath(); c.ellipse(0, -28, 54, 40, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(40,36,30,.85)'; c.lineWidth = 2.4; c.stroke();
  // 扇骨
  for (let k = -3; k <= 3; k++) {
    c.beginPath(); c.moveTo(0, 0); c.lineTo(k * 13, -58); c.strokeStyle = 'rgba(90,70,44,.6)'; c.lineWidth = 1.4; c.stroke();
  }
  c.restore(); c.restore();
};

// 法正：孝直（o: { t, raise, flip, fan }）——清癯深袍谋臣，小冠，持羽扇。
Z.fazheng = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, flip = 0, fan = 1 } = o;
  const br = Math.sin(t * 1.3) * 0.012;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const hem = Math.sin(t * 1.5) * 3;
  // 腿
  brush(c, [[-14, -72], [-24, -34], [-30, 4]], { w: 16, tone: 0.84, dry: 0.5, seed: 1101, head: 0.06, tail: 0.2 });
  brush(c, [[14, -72], [24, -34], [30, 4]], { w: 16, tone: 0.84, dry: 0.5, seed: 1102, head: 0.06, tail: 0.2 });
  // 深墨青谋臣袍（沉色，清癯）
  c.fillStyle = 'rgba(40,66,72,.62)';
  c.beginPath();
  c.moveTo(-26, -158); c.quadraticCurveTo(-46, -82, -48 + hem, -6);
  c.quadraticCurveTo(0, 2 + hem * 0.3, 48 + hem * 0.6, -6); c.quadraticCurveTo(46, -84, 26, -158);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(22,28,30,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-14, -68], [-8, -34], [-4, -6]], { w: 3, tone: 0.3, dry: 0.65, seed: 1135, tail: 0.6, bristles: 3 });
  brush(c, [[8, -70], [12, -36], [14, -8]], { w: 3, tone: 0.28, dry: 0.65, seed: 1136, tail: 0.6, bristles: 3 });
  // 束腰（朱）
  brush(c, [[-28, -116], [0, -112], [28, -116]], { w: 10, col: [150, 48, 40], tone: 0.85, dry: 0.3, seed: 1131 });
  // 头 + 小冠 + 清癯面
  c.save(); c.translate(2, -182);
  c.fillStyle = 'rgba(244,234,214,.96)';
  c.beginPath(); c.ellipse(0, 0, 15, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  // 小冠（平巾帻）
  c.fillStyle = 'rgba(38,40,42,.95)';
  c.beginPath();
  c.moveTo(-17, -6); c.quadraticCurveTo(-12, -26, 2, -28); c.quadraticCurveTo(16, -24, 18, -8);
  c.lineTo(12, -4); c.quadraticCurveTo(0, -10, -12, -4); c.closePath(); c.fill();
  // 目（沉毅）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(6, -1, 4.4, 3.2, -0.1, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.92)'; c.beginPath(); c.arc(7, -1, 2, 0, Math.PI * 2); c.fill();
  // 短须
  const wf = Math.sin(t * 1.5) * 3;
  c.strokeStyle = 'rgba(120,110,96,.9)'; c.lineWidth = 2.6; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-7, 9); c.quadraticCurveTo(-1, 24 + wf * 0.3, 6, 14 + wf); c.stroke();
  c.restore();
  // 双臂：前臂举羽扇，后臂垂
  const rl = ease.out(clamp(raise));
  brush(c, [[-24, -144], [-42 - 6 * rl, -132 - 14 * rl], [-56 - 10 * rl, -118 - 30 * rl]], { w: 12, tone: 0.6, dry: 0.45, seed: 1103, head: 0.1, tail: 0.2 });
  brush(c, [[24, -144], [38, -128], [48, -108]], { w: 11, tone: 0.6, dry: 0.45, seed: 1104, head: 0.1, tail: 0.2 });
  c.restore();
  if (fan) {
    const hx = flip ? -56 : 56, hy = -118;
    Z.fan(c, x + hx * s, y + hy * s, flip ? 2.3 : 0.9, t, { len: 130 });
  }
};
})();
