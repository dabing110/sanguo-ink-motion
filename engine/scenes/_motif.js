// 跨片共享母题：倒下的旗、城垣（魏延/法正/满宠等通用，避免每个 common 重复定义）。
// 依赖 h_common.js（Z.flag 等已注册）。只往 window.Z 上挂新函数，不改动既有。
(() => {
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 倒下的旗：杆斜、旗面垂（战场景象）
Z.fallenFlag = (c, x, y, fall, t, { seed = 2, col = 'rgba(176,48,38,.8)' } = {}) => {
  const f = ease.inOut(clamp(fall));
  c.save(); c.translate(x, y); c.rotate(f * 1.15);
  brush(c, [[0, 0], [0, -170]], { w: 6, tone: 0.85, dry: 0.5, seed: 860 + seed });
  c.save(); c.translate(2, -168 + 4); c.rotate(-0.2 - f * 0.5);
  const fw = 92, fh = 58;
  c.fillStyle = col;
  c.beginPath(); c.moveTo(0, 0);
  c.quadraticCurveTo(fw * 0.5, -6 + Math.sin(t * 3 + seed) * 5, fw, 4);
  c.lineTo(fw, fh); c.quadraticCurveTo(fw * 0.5, fh + 8, 0, fh); c.closePath(); c.fill();
  c.restore(); c.restore();
};

// 城垣（夯土城墙＋门洞＋女墙＋檐，旗可选）：魏延镇汉中／法正定军／满宠合肥等通用
Z.wall = (c, x, y, s, t, o = {}) => {
  const { flag = 0, flagCol = 'rgba(186,52,42,.85)', seed = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(208,194,166,.6)';
  c.beginPath(); c.moveTo(-300, 0); c.lineTo(-300, -260); c.lineTo(300, -260); c.lineTo(300, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(54,46,36,.85)'; c.lineWidth = 3.4; c.stroke();
  c.strokeStyle = 'rgba(70,58,44,.4)'; c.lineWidth = 1.8;
  for (let i = 1; i < 6; i++) { const yy = -i * 44; c.beginPath(); c.moveTo(-300, yy); c.lineTo(300, yy); c.stroke(); }
  c.fillStyle = 'rgba(44,36,28,.82)';
  c.beginPath(); c.moveTo(-58, 0); c.lineTo(-58, -88); c.quadraticCurveTo(0, -140, 58, -88); c.lineTo(58, 0); c.closePath(); c.fill();
  c.fillStyle = 'rgba(204,190,162,.7)'; c.strokeStyle = 'rgba(54,46,36,.85)'; c.lineWidth = 2.6;
  for (let i = -6; i <= 6; i++) { const bx = i * 46 - 20; c.beginPath(); c.rect(bx, -288, 40, 28); c.fill(); c.stroke(); }
  c.fillStyle = 'rgba(58,50,42,.9)';
  c.beginPath(); c.moveTo(-200, -288); c.quadraticCurveTo(0, -350, 200, -288); c.lineTo(160, -288); c.quadraticCurveTo(0, -330, -160, -288); c.closePath(); c.fill();
  if (flag) Z.flag(c, 150, -288, 300, t, { col: flagCol, seed: seed + 3 });
  c.restore();
};
})();
