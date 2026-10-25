// 《魏延》专属笔法库：深青战袍＋红束腰＋兜鍪红缨＋长柄大刀（不是淡墨袍、不是银甲、不是弓）。
// 依赖 h_common.js —— 宣纸、远山、云气、奔马、旌旗、榜题、钤印全部复用同一套水墨笔法，
// 这里只加魏延的辨识元素：深青袍（区别于赵云淡墨/马超银甲）、大刀（偃月式长柄，区别于枪/弓）、汉中城垣。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 大刀：长柄＋弯月刀身＋红缨（魏延的招牌兵器，区别于枪/弓） ----------
Z.saber = (c, x, y, ang, len = 360, t = 0, o = {}) => {
  c.save(); c.translate(x, y); c.rotate(ang);
  // 杆
  brush(c, [[-len * 0.42, 0], [0, 0], [len * 0.5, 0]], { w: 11, tone: 0.92, dry: 0.32, seed: 505, head: 0.05, tail: 0.18, bristles: 6 });
  brush(c, [[len * 0.45, 0], [len * 0.5, 0]], { w: 4, tone: 0.5, dry: 0.4, seed: 506 });
  // 红缨
  const fl = Math.sin(t * 6 + 1) * 0.25;
  brush(c, [[len * 0.46, 2], [len * 0.4, 12 + fl * 10], [len * 0.36, 24 + fl * 16]], { w: 11, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 511, bristles: 6, tail: 0.7 });
  brush(c, [[len * 0.46, -2], [len * 0.42, -13 - fl * 8], [len * 0.38, -22 - fl * 14]], { w: 9, col: [178, 40, 34], tone: 0.85, dry: 0.7, seed: 512, bristles: 5, tail: 0.7 });
  // 刀身（弯月）
  c.save(); c.translate(len * 0.5, 0);
  c.fillStyle = 'rgba(212,220,230,.96)';
  c.beginPath();
  c.moveTo(-12, -7);
  c.quadraticCurveTo(len * 0.30, -46, len * 0.50, -10);    // 外缘弧
  c.quadraticCurveTo(len * 0.38, 7, -2, 11);                 // 内缘回杆
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,30,38,.92)'; c.lineWidth = 2.6; c.stroke();
  brush(c, [[0, -3], [len * 0.30, -28]], { w: 3, tone: 0.3, dry: 0.4, seed: 520 });   // 刀脊高光
  c.restore();
  c.restore();
};

// ---------- 魏延步战立姿（大刀）：深青袍＋白披风＋红束腰＋兜鍪红缨 ----------
// o: { raise(举刀 0→1), cape, flip }
Z.weiyan = (c, x, y, s, t, o = {}) => {
  const { raise = 0, cape = 1, flip = 0 } = o;
  const br = Math.sin(t * 2.2) * 0.02;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(br * 0.4);
  if (cape) {
    const f = Math.sin(t * 1.6) * 12;
    c.fillStyle = 'rgba(253,251,246,.94)';
    c.beginPath(); c.moveTo(-14, -146); c.quadraticCurveTo(-74 - f, -112, -100 - f * 1.4, -22);
    c.quadraticCurveTo(-48, -20, -20, 0); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 2.4; c.stroke();
  }
  // 袍：深青没骨（和赵云淡墨、马超银甲区分）
  c.fillStyle = 'rgba(46,66,84,.52)';
  c.beginPath(); c.moveTo(-22, -148); c.lineTo(24, -152); c.lineTo(34, 0); c.lineTo(-32, 4); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,28,38,.92)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-24, -146], [-10, -138], [2, -140]], { w: 10, tone: 0.7, dry: 0.45, seed: 738, head: 0.1, tail: 0.2 });
  brush(c, [[26, -150], [36, -142], [44, -128]], { w: 9, tone: 0.7, dry: 0.45, seed: 739, head: 0.1, tail: 0.2 });
  brush(c, [[-14, -70], [-8, -34], [-3, -6]], { w: 3.5, tone: 0.32, dry: 0.65, seed: 735, tail: 0.6, bristles: 3 });
  brush(c, [[5, -66], [9, -30], [11, -4]], { w: 3, tone: 0.28, dry: 0.65, seed: 736, tail: 0.6, bristles: 3 });
  brush(c, [[20, -72], [24, -36], [26, -8]], { w: 3, tone: 0.26, dry: 0.65, seed: 737, tail: 0.6, bristles: 3 });
  // 腰束（红）
  brush(c, [[-20, -100], [0, -96], [22, -100]], { w: 12, col: [172, 38, 32], tone: 0.85, dry: 0.3, seed: 731 });
  // 甲
  c.strokeStyle = 'rgba(20,30,40,.6)'; c.lineWidth = 2;
  [[-12, -132, 36], [-8, -116, 40], [-4, -100, 42]].forEach(([ax, ay, w]) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 2); c.stroke(); });
  // 头：兜鍪红缨（猛将标配，区别于文臣高冠）
  c.save(); c.translate(26, -178);
  c.fillStyle = 'rgba(250,242,228,.96)'; c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(34,32,38,.92)'; c.beginPath();
  c.moveTo(-18, -9); c.quadraticCurveTo(0, -32, 18, -9); c.lineTo(16, -3); c.lineTo(-16, -3); c.closePath(); c.fill();
  c.fillStyle = '#c0392b'; c.beginPath(); c.arc(0, -22, 5, 0, Math.PI * 2); c.fill();
  brush(c, [[0, -26], [9, -44], [3, -56]], { w: 5, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 732, tail: 0.7, bristles: 4 });
  c.fillStyle = 'rgba(20,18,16,.9)'; c.beginPath(); c.arc(7, 1, 2.3, 0, Math.PI * 2); c.fill();
  c.restore();
  // 双臂：举刀
  const rl = ease.out(clamp(raise));
  const ang = lerp(-0.72, -0.98, rl);
  brush(c, [[18, -140], [46, -136 - 24 * rl], [74, -152 - 50 * rl]], { w: 12, tone: 0.5, dry: 0.4, seed: 733, head: 0.1, tail: 0.2 });
  brush(c, [[18, -136], [42, -120 - 22 * rl], [64, -106 - 44 * rl]], { w: 11, tone: 0.5, dry: 0.4, seed: 734, head: 0.1, tail: 0.2 });
  c.restore();
  Z.saber(c, x + 74 * s, y + (-152 - 50 * rl) * s, ang, 360 * s, t, { ring: 1 });
};

// ---------- 魏延骑战：深青袍将军立马持大刀（复用奔马，上覆魏延上身） ----------
// o: { spearAng, backFlag, cape, flip, gallop, phase via t }
Z.weiyanRider = (c, x, y, s, phase, o = {}) => {
  const { spearAng = -0.4, backFlag = 1, cape = 1, flip = 0, tone = 0.9 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const bob = Math.sin(phase * 2) * 5, sway = Math.sin(phase * 1.1) * 0.03;
  // 马
  Z.horse(c, 0, 0, s, phase, { gallop: 1, flip: 0, tone });
  c.translate(0, bob * 0.6); c.rotate(sway);
  // 背旗（红）
  if (backFlag) {
    const a = -0.5 + Math.sin(phase * 2.2) * 0.12;
    c.save(); c.translate(-40, -132); c.rotate(a);
    brush(c, [[0, 0], [-4, -78]], { w: 5, tone: 0.9, dry: 0.4, seed: 700 });
    c.fillStyle = 'rgba(186,52,42,.85)'; c.beginPath();
    c.moveTo(-4, -76); c.lineTo(-60 - Math.sin(phase * 3) * 8, -62); c.lineTo(-8, -30); c.closePath(); c.fill();
    c.restore();
  }
  if (cape) {
    const f = Math.sin(phase * 2.4) * 14;
    c.fillStyle = 'rgba(253,251,246,.94)';
    c.beginPath(); c.moveTo(-22, -132); c.quadraticCurveTo(-76 - f, -112, -102 - f * 1.6, -62);
    c.quadraticCurveTo(-58, -56, -28, -40); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,28,26,.72)'; c.lineWidth = 2.6; c.stroke();
  }
  // 袍：深青
  c.save();
  c.fillStyle = 'rgba(46,66,84,.52)';
  c.beginPath(); c.moveTo(-26, -128); c.lineTo(26, -132); c.lineTo(34, -78); c.lineTo(-30, -74); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,28,38,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-24, -60], [2, -56], [30, -60]], { w: 12, col: [172, 38, 32], tone: 0.85, dry: 0.3, seed: 711 });
  c.restore();
  // 头
  c.save(); c.translate(26, -156);
  c.fillStyle = 'rgba(250,242,228,.96)'; c.beginPath(); c.ellipse(0, 0, 15, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(34,32,38,.92)'; c.beginPath();
  c.moveTo(-17, -8); c.quadraticCurveTo(0, -30, 17, -8); c.lineTo(15, -2); c.lineTo(-15, -2); c.closePath(); c.fill();
  c.fillStyle = '#c0392b'; c.beginPath(); c.arc(0, -22, 4.5, 0, Math.PI * 2); c.fill();
  brush(c, [[0, -24], [8, -40], [2, -52]], { w: 5, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 710, tail: 0.7, bristles: 4 });
  c.fillStyle = 'rgba(20,18,16,.9)'; c.beginPath(); c.arc(6, 2, 2.2, 0, Math.PI * 2); c.fill();
  c.restore();
  // 双臂持刀
  brush(c, [[24, -120], [52, -108], [76, -102]], { w: 12, tone: 0.5, dry: 0.4, seed: 721, head: 0.1, tail: 0.2 });
  brush(c, [[26, -116], [46, -96], [58, -78]], { w: 11, tone: 0.5, dry: 0.4, seed: 722, head: 0.1, tail: 0.2 });
  c.restore();
  const hx = flip ? -76 : 76, ha = flip ? Math.PI - spearAng : spearAng;
  Z.saber(c, x + hx * s, y + (-102 + bob * 0.6) * s, ha, 330 * s, phase);
};

// ---------- 汉中城垣（魏延镇守之地）：夯土城墙＋门洞＋檐＋旗 ----------
Z.hanWall = (c, x, y, s, t, o = {}) => {
  const { flag = 1, flagCol = 'rgba(186,52,42,.85)', seed = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(208,194,166,.6)';
  c.beginPath(); c.moveTo(-300, 0); c.lineTo(-300, -260); c.lineTo(300, -260); c.lineTo(300, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(54,46,36,.85)'; c.lineWidth = 3.4; c.stroke();
  c.strokeStyle = 'rgba(70,58,44,.4)'; c.lineWidth = 1.8;
  for (let i = 1; i < 6; i++) { const yy = -i * 44; c.beginPath(); c.moveTo(-300, yy); c.lineTo(300, yy); c.stroke(); }
  // 门洞
  c.fillStyle = 'rgba(44,36,28,.82)';
  c.beginPath(); c.moveTo(-58, 0); c.lineTo(-58, -88); c.quadraticCurveTo(0, -140, 58, -88); c.lineTo(58, 0); c.closePath(); c.fill();
  // 女墙
  c.fillStyle = 'rgba(204,190,162,.7)'; c.strokeStyle = 'rgba(54,46,36,.85)'; c.lineWidth = 2.6;
  for (let i = -6; i <= 6; i++) { const bx = i * 46 - 20; c.beginPath(); c.rect(bx, -288, 40, 28); c.fill(); c.stroke(); }
  // 檐
  c.fillStyle = 'rgba(58,50,42,.9)';
  c.beginPath(); c.moveTo(-200, -288); c.quadraticCurveTo(0, -350, 200, -288); c.lineTo(160, -288); c.quadraticCurveTo(0, -330, -160, -288); c.closePath(); c.fill();
  if (flag) Z.flag(c, 150, -288, 300, t, { col: flagCol, seed: seed + 3 });
  c.restore();
};
})();
