// 《许褚》专属笔法库：虎痴——巨汉、深铁甲、虎皮披风、大砍刀（不是瘦长将军、不是弓、不是银甲）。
// 依赖 h_common.js ＋ _motif.js。许褚的辨识要素：
// ① 躯干宽厚（腰大十围的猛汉，区别于魏延/赵云的匀称）② 虎皮披风（橙底黑纹＝虎痴）③ 深铁甲＋大砍刀。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 大砍刀：长柄＋弯月刀身＋红缨（许褚的招牌兵器，本地实现，避免依赖 weiyan_common）
const saber = (c, x, y, ang, len = 360, t = 0, o = {}) => {
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[-len * 0.42, 0], [0, 0], [len * 0.5, 0]], { w: 12, tone: 0.92, dry: 0.32, seed: 505, head: 0.05, tail: 0.18, bristles: 6 });
  brush(c, [[len * 0.45, 0], [len * 0.5, 0]], { w: 4, tone: 0.5, dry: 0.4, seed: 506 });
  const fl = Math.sin(t * 6 + 1) * 0.25;
  brush(c, [[len * 0.46, 2], [len * 0.4, 12 + fl * 10], [len * 0.36, 24 + fl * 16]], { w: 11, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 511, bristles: 6, tail: 0.7 });
  brush(c, [[len * 0.46, -2], [len * 0.42, -13 - fl * 8], [len * 0.38, -22 - fl * 14]], { w: 9, col: [178, 40, 34], tone: 0.85, dry: 0.7, seed: 512, bristles: 5, tail: 0.7 });
  c.save(); c.translate(len * 0.5, 0);
  c.fillStyle = 'rgba(212,220,230,.96)';
  c.beginPath();
  c.moveTo(-12, -7);
  c.quadraticCurveTo(len * 0.30, -46, len * 0.50, -10);
  c.quadraticCurveTo(len * 0.38, 7, -2, 11);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,30,38,.92)'; c.lineWidth = 2.6; c.stroke();
  brush(c, [[0, -3], [len * 0.30, -28]], { w: 3, tone: 0.3, dry: 0.4, seed: 520 });
  c.restore();
  c.restore();
};

// 许褚步战立姿（巨汉）：深铁甲＋虎皮披风＋大砍刀。
// o: { raise(举刀 0→1), cape, flip }
Z.xuchu = (c, x, y, s, t, o = {}) => {
  const { raise = 0, cape = 1, flip = 0 } = o;
  const br = Math.sin(t * 2.0) * 0.02;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  // 虎皮披风（橙底黑纹）
  if (cape) {
    const f = Math.sin(t * 1.4) * 10;
    c.save();
    c.fillStyle = 'rgba(206,140,72,.92)';
    c.beginPath(); c.moveTo(-26, -150); c.quadraticCurveTo(-92 - f, -110, -124 - f * 1.4, -18); c.quadraticCurveTo(-64, -16, -30, 2); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 2.4; c.stroke();
    for (let k = 0; k < 5; k++) {
      brush(c, [[-40 - k * 16, -130 + Math.sin(k) * 6], [-60 - k * 16, -60]], { w: 6, tone: 0.9, dry: 0.5, seed: 600 + k, tail: 0.5 });
    }
    c.restore();
  }
  // 躯干：巨汉宽厚（深铁甲）
  c.fillStyle = 'rgba(58,62,70,.72)';
  c.beginPath();
  c.moveTo(-40, -150); c.quadraticCurveTo(-62, -80, -60, 0);
  c.quadraticCurveTo(0, 12, 60, 0); c.quadraticCurveTo(62, -80, 40, -150);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,20,26,.92)'; c.lineWidth = 3.4; c.stroke();
  // 鳞甲横纹
  for (let k = -3; k <= 3; k++) {
    c.strokeStyle = 'rgba(20,22,28,.55)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(k * 14 - 6, -130); c.quadraticCurveTo(k * 14, -120, k * 14 + 6, -110); c.stroke();
  }
  // 腰束（红）
  brush(c, [[-44, -78], [0, -72], [44, -78]], { w: 16, col: [150, 40, 34], tone: 0.9, dry: 0.3, seed: 711 });
  // 头：兜鍪＋阔脸＋红缨（凶悍）
  c.save(); c.translate(30, -176);
  c.fillStyle = 'rgba(248,238,214,.96)'; c.beginPath(); c.ellipse(0, 0, 20, 21, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2.4; c.stroke();
  c.strokeStyle = 'rgba(24,20,16,.8)'; c.lineWidth = 2.6;
  c.beginPath(); c.moveTo(-11, -7); c.lineTo(2, -3); c.lineTo(13, -8); c.stroke();
  c.fillStyle = 'rgba(20,18,16,.92)'; c.beginPath(); c.arc(9, 2, 2.8, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(40,42,50,.95)';
  c.beginPath(); c.moveTo(-22, -10); c.quadraticCurveTo(0, -36, 22, -10); c.lineTo(19, -3); c.lineTo(-19, -3); c.closePath(); c.fill();
  c.fillStyle = '#c0392b'; c.beginPath(); c.arc(0, -24, 6, 0, Math.PI * 2); c.fill();
  brush(c, [[0, -28], [10, -46], [3, -60]], { w: 6, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 732, tail: 0.7, bristles: 4 });
  c.restore();
  // 双臂：粗壮，持大砍刀
  const rl = ease.out(clamp(raise));
  const ang = lerp(-0.7, -0.98, rl);
  brush(c, [[24, -150], [56, -138 - 22 * rl], [86, -156 - 46 * rl]], { w: 18, tone: 0.55, dry: 0.4, seed: 733, head: 0.1, tail: 0.2 });
  brush(c, [[24, -144], [52, -122 - 20 * rl], [78, -104 - 40 * rl]], { w: 16, tone: 0.55, dry: 0.4, seed: 734, head: 0.1, tail: 0.2 });
  c.restore();
  saber(c, x + 86 * s, y + (-156 - 46 * rl) * s, ang, 420 * s, t, { ring: 1 });
};
})();
