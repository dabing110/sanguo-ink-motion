// 《许靖》专属笔法库：名士——清癯浅袍、高冠、白须、麈尾（不是武将、不是深甲、不是弓）。
// 依赖 h_common.js ＋ _motif.js。许靖的辨识要素（与田丰/荀彧/法正区分）：
// ① 浅米青名士袍（清癯）② 高冠（进贤式，前梁高耸）③ 白须飘然 ④ 麈尾（清谈名士的招牌）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 麈尾（名士清谈的招牌：柄＋垂须）
Z.whisk = (c, x, y, ang, t, o = {}) => {
  const { len = 150 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, -len * 0.6]], { w: 7, col: [120, 86, 50], tone: 0.9, dry: 0.4, seed: 950 });
  // 垂须（随挥动轻摆）
  const fl = Math.sin(t * 4) * 0.12;
  for (let k = -3; k <= 3; k++) {
    c.save(); c.translate(0, -len * 0.6);
    brush(c, [[k * 10, 0], [k * 16 + fl * 30, -len * 0.4 * (1 - Math.abs(k) * 0.1)], [k * 20 + fl * 50, -len * 0.5]], { w: 4, col: [236, 230, 220], tone: 0.85, dry: 0.5, seed: 951 + k, tail: 0.8, bristles: 3 });
    c.restore();
  }
  c.restore();
};

// 许靖：文休（o: { t, raise, flip, whisk }）——清癯名士，浅袍高冠白须，持麈尾。
Z.xujing = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, flip = 0, whisk = 1 } = o;
  const br = Math.sin(t * 1.4) * 0.013;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const hem = Math.sin(t * 1.6) * 4;
  // 腿
  brush(c, [[-16, -74], [-26, -34], [-32, 4]], { w: 18, tone: 0.84, dry: 0.5, seed: 901, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [26, -34], [32, 4]], { w: 18, tone: 0.84, dry: 0.5, seed: 902, head: 0.06, tail: 0.2 });
  // 浅米青名士袍（清癯）
  c.fillStyle = 'rgba(150,158,150,.58)';
  c.beginPath();
  c.moveTo(-28, -160); c.quadraticCurveTo(-50, -82, -52 + hem, -6);
  c.quadraticCurveTo(0, 2 + hem * 0.3, 52 + hem * 0.6, -6); c.quadraticCurveTo(50, -84, 28, -160);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,28,26,.9)'; c.lineWidth = 3; c.stroke();
  // 衣纹（几笔淡墨）
  brush(c, [[-16, -70], [-10, -34], [-6, -6]], { w: 3, tone: 0.3, dry: 0.65, seed: 735, tail: 0.6, bristles: 3 });
  brush(c, [[8, -72], [12, -36], [14, -8]], { w: 3, tone: 0.28, dry: 0.65, seed: 736, tail: 0.6, bristles: 3 });
  // 束腰（青）
  brush(c, [[-30, -118], [0, -114], [30, -118]], { w: 11, col: [70, 96, 92], tone: 0.85, dry: 0.3, seed: 731 });
  // 头 + 高冠 + 白须
  c.save(); c.translate(2, -184);
  c.fillStyle = 'rgba(246,238,220,.96)';
  c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  // 高冠（进贤式，前梁高耸）
  c.fillStyle = 'rgba(40,42,44,.95)';
  c.beginPath();
  c.moveTo(-20, -8); c.quadraticCurveTo(-14, -34, 4, -36); c.quadraticCurveTo(22, -32, 24, -10);
  c.lineTo(16, -4); c.quadraticCurveTo(0, -12, -14, -4); c.closePath(); c.fill();
  // 目（清朗）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -1, 5, 3.6, -0.1, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.92)'; c.beginPath(); c.arc(8, -1, 2.2, 0, Math.PI * 2); c.fill();
  // 皓白长须（拂动）
  const wf = Math.sin(t * 1.7) * 5;
  c.save(); c.globalAlpha = 0.95; c.strokeStyle = 'rgba(244,240,232,.95)'; c.lineWidth = 3.4; c.lineCap = 'round';
  [[-9, 7, -19, 50], [0, 10, -2, 62], [9, 9, 14, 50]].forEach(([x1, y1, x2, y2], k) => {
    c.beginPath(); c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2 + wf * 0.4, (y1 + y2) / 2, x2 + wf * (0.5 + k * 0.2), y2 + wf * 0.3);
    c.stroke();
  });
  // 皓白鬓发
  brush(c, [[-16, -6], [-27, 8], [-31, 20]], { w: 4, col: [246, 242, 234], tone: 0.92, dry: 0.55, seed: 905, tail: 0.8, bristles: 3 });
  brush(c, [[16, -6], [27, 8], [31, 20]], { w: 4, col: [246, 242, 234], tone: 0.92, dry: 0.55, seed: 906, tail: 0.8, bristles: 3 });
  c.restore();
  c.restore();
  // 双臂：前臂举麈尾，后臂垂
  const rl = ease.out(clamp(raise));
  brush(c, [[-26, -146], [-44 - 6 * rl, -134 - 14 * rl], [-58 - 10 * rl, -120 - 30 * rl]], { w: 13, tone: 0.6, dry: 0.45, seed: 903, head: 0.1, tail: 0.2 });
  brush(c, [[26, -146], [40, -130], [50, -110]], { w: 12, tone: 0.6, dry: 0.45, seed: 904, head: 0.1, tail: 0.2 });
  c.restore();
  if (whisk) {
    const hx = flip ? -58 : 58, hy = -120;
    Z.whisk(c, x + hx * s, y + hy * s, flip ? 2.4 : 0.8, t, { len: 150 });
  }
};
})();
