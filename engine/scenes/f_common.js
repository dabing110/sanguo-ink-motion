// 《田丰》专属笔法库：刚直谋主、杖击地、狱窗、抚掌之谮。
// 依赖 h_common.js。田丰的辨识要素（与荀彧/陈宫都区分）：
// ① 白须高冠的谋主——「天姿瑰杰，权略多奇」，威重而直
// ② 手杖（举杖击地是《三国志》原文里最重的一拍）③ 械（枷）与狱窗 ④ 帐中沙盘
(() => {
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 田丰：元皓（o: { t, raise, stance, flip, stick(持杖), cuffed(被枷), strike(击杖 0→1) }） ----------
Z.tianFeng = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, stance = 0, flip = 0, stick = 0, cuffed = 0, strike = 0 } = o;
  const br = Math.sin(t * 1.4) * 0.013;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  c.translate(0, Math.sin(stance * 2) * 3.5);
  const hem = Math.sin(t * 1.6) * 4;
  // 腿
  const step = Math.sin(stance * 2) * 3.5;
  brush(c, [[-16, -74], [-26 + step, -34], [-32 + step, 4]], { w: 20, tone: 0.86, dry: 0.5, seed: 901, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [26 - step, -34], [32 - step, 4]], { w: 20, tone: 0.86, dry: 0.5, seed: 902, head: 0.06, tail: 0.2 });
  // 深色袍（威重）
  c.fillStyle = 'rgba(96,90,80,.68)';
  c.beginPath();
  c.moveTo(-30, -166); c.quadraticCurveTo(-52, -84, -54 + hem, -6);
  c.quadraticCurveTo(0, 2 + hem * 0.3, 54 + hem * 0.6, -6); c.quadraticCurveTo(52, -86, 30, -166);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,24,20,.92)'; c.lineWidth = 3.2; c.stroke();
  // 束腰
  c.fillStyle = 'rgba(48,42,34,.9)'; c.fillRect(-36, -122, 72, 12);
  // 双臂（cuffed 时收拢胸前；strike 时右臂高举落杖）
  const rl = ease.out(clamp(raise));
  const strk = ease.out(clamp(strike));
  if (cuffed) {
    brush(c, [[-26, -148], [-40, -110], [-18, -100]], { w: 14, tone: 0.62, dry: 0.45, seed: 903 });
    brush(c, [[26, -148], [40, -110], [18, -100]], { w: 14, tone: 0.62, dry: 0.45, seed: 904 });
  } else {
    brush(c, [[-26, -148], [-54 - 6 * rl, -136 - 16 * rl], [-78 - 10 * rl, -118 - 34 * rl]], { w: 15, tone: 0.62, dry: 0.45, seed: 903, head: 0.1, tail: 0.2 });
    brush(c, [[26, -148], [54 + 6 * rl - 30 * strk, -136 - 16 * rl - 60 * strk], [78 + 10 * rl - 66 * strk, -118 - 34 * rl - 130 * strk]], { w: 15, tone: 0.62, dry: 0.45, seed: 904, head: 0.1, tail: 0.2 });
  }
  // 头 + 高冠 + 白须
  c.save(); c.translate(2, -190);
  c.fillStyle = 'rgba(244,236,218,.96)';
  c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  // 高冠（进贤式，前梁高耸）
  c.fillStyle = 'rgba(30,28,30,.95)';
  c.beginPath();
  c.moveTo(-20, -8); c.quadraticCurveTo(-14, -34, 4, -36); c.quadraticCurveTo(22, -32, 24, -10);
  c.lineTo(16, -4); c.quadraticCurveTo(0, -12, -14, -4); c.closePath(); c.fill();
  // 目（刚直，眉压得低）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -1, 5.2, 3.8, -0.1, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(8, -1, 2.3, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,20,16,.75)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(1, -10); c.lineTo(13, -9); c.stroke();
  // 皓白长须（拂动）
  const wf = Math.sin(t * 1.7) * 5;
  c.save(); c.globalAlpha = 0.95; c.strokeStyle = 'rgba(244,240,232,.95)'; c.lineWidth = 4; c.lineCap = 'round';
  const drop = 54;
  [[-9, 7, -19, drop], [0, 10, -2, drop + 12], [9, 9, 14, drop]].forEach(([x1, y1, x2, y2], k) => {
    c.beginPath(); c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2 + wf * 0.4, (y1 + y2) / 2, x2 + wf * (0.5 + k * 0.2), y2 + wf * 0.3);
    c.stroke();
  });
  // 皓白鬓发
  brush(c, [[-16, -6], [-27, 8], [-31, 20]], { w: 5, col: [246, 242, 234], tone: 0.92, dry: 0.55, seed: 905, tail: 0.8, bristles: 3 });
  brush(c, [[16, -6], [27, 8], [31, 20]], { w: 5, col: [246, 242, 234], tone: 0.92, dry: 0.55, seed: 906, tail: 0.8, bristles: 3 });
  c.restore();
  c.restore();
  c.restore();
  const sx = flip ? -1 : 1;
  if (stick && !cuffed) {                                    // 手杖（strike 时是击地的杖）
    c.save();
    const hx = x + (82 - 66 * strk) * s * sx;
    const hy = y - (128 + 34 * rl + 4 * strk) * s;
    c.translate(hx, hy);
    c.rotate((flip ? Math.PI : 0) - (0.5 - 1.05 * strk));    // 击杖：从拄地角抡向地面
    brush(c, [[0, 0], [0, 216]], { w: 11, col: [96, 70, 44], tone: 0.9, dry: 0.4, seed: 907, head: 0.06, tail: 0.2 });
    c.restore();
    // 击地时的震尘
    if (strk > 0.75) {
      c.save(); c.globalAlpha = (strk - 0.75) * 4;
      for (let k = 0; k < 4; k++) {
        const dx = hx + (k - 1.5) * 26 * sx, dy = y - 4;
        c.fillStyle = 'rgba(140,122,92,.5)';
        c.beginPath(); c.arc(dx, dy, 5 + k, 0, Math.PI * 2); c.fill();
      }
      c.restore();
    }
  }
  if (cuffed) {                                              // 木枷（颈手枷板）
    c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
    c.fillStyle = 'rgba(128,98,60,.85)';
    c.fillRect(-62, -168, 124, 26);
    c.strokeStyle = 'rgba(48,36,24,.92)'; c.lineWidth = 3.4; c.strokeRect(-62, -168, 124, 26);
    c.fillStyle = 'rgba(96,72,44,.9)';
    c.beginPath(); c.arc(0, -186, 20, Math.PI, 0); c.fill();     // 枷孔（头）
    c.strokeStyle = 'rgba(48,36,24,.9)'; c.lineWidth = 2.6; c.stroke();
    c.restore();
  }
};

// ---------- 狱窗（高窗 + 竖栏：光从栏间进来，常驻尘光） ----------
Z.yuChuang = (c, x, y, s, t, o = {}) => {
  const { seed = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(236,228,204,.85)';
  c.fillRect(-90, -120, 180, 240);
  c.strokeStyle = 'rgba(52,44,34,.9)'; c.lineWidth = 4; c.strokeRect(-90, -120, 180, 240);
  c.strokeStyle = 'rgba(46,38,30,.92)'; c.lineWidth = 8;
  for (let k = -1; k <= 1; k++) { c.beginPath(); c.moveTo(k * 45, -120); c.lineTo(k * 45, 120); c.stroke(); }
  c.beginPath(); c.moveTo(-90, 0); c.lineTo(90, 0); c.stroke();
  // 栏间浮尘（缓升光点）
  for (let k = 0; k < 4; k++) {
    const ph = ((t * 0.08 + k / 4 + seed * 0.2) % 1);
    c.fillStyle = `rgba(238,230,206,${0.5 * (1 - ph)})`;
    c.beginPath(); c.arc(-34 + k * 24 + Math.sin(t * 0.8 + k) * 8, 90 - ph * 190, 3.5, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 谗影（两个交头接耳的暗影：抚掌之谮） ----------
Z.chanYing = (c, x, y, s, t, o = {}) => {
  const { lean = 0 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(56,50,44,.6)';
  // 左影（俯身耳语）
  c.save(); c.rotate(-0.08 - lean * 0.12);
  c.beginPath(); c.moveTo(-34, 0); c.quadraticCurveTo(-40, -70, -28, -104);
  c.quadraticCurveTo(-34, -122, -18, -128); c.quadraticCurveTo(0, -134, 16, -124);
  c.quadraticCurveTo(30, -116, 26, -96); c.quadraticCurveTo(36, -60, 32, 0); c.closePath(); c.fill();
  c.beginPath(); c.arc(0, -140, 12, 0, Math.PI * 2); c.fill();
  // 耳语的手（拢在嘴边，常驻微动）
  const hw = Math.sin(t * 2.2) * 3;
  c.beginPath(); c.ellipse(20, -128 + hw * 0.4, 10, 6, 0.5, 0, Math.PI * 2); c.fill();
  c.restore();
  // 右影（听者，点头）
  c.save(); c.translate(64, 0); c.rotate(0.06 + lean * 0.1 + Math.sin(t * 1.8) * 0.02);
  c.beginPath(); c.moveTo(-30, 0); c.quadraticCurveTo(-36, -68, -26, -100);
  c.quadraticCurveTo(-30, -118, -14, -124); c.quadraticCurveTo(4, -130, 18, -120);
  c.quadraticCurveTo(28, -112, 26, -92); c.quadraticCurveTo(34, -56, 30, 0); c.closePath(); c.fill();
  c.beginPath(); c.arc(0, -136, 12, 0, Math.PI * 2); c.fill();
  c.restore();
  c.restore();
};
})();
