// 《荀彧》专属笔法库：王佐文臣、荀令留香、空食盒。
// 依赖 h_common.js。荀彧的辨识要素（与六部武人片全部区分）：
// ① 全片唯一文臣主角——进贤冠 + 宽袍广袖 + 手持简册，不佩一刀一剑
// ② 荀令留香——香炉与香烟是贯穿母题（「坐处三日香」）
// ③ 空食盒——他一生的高光与终点都藏在这只盒子里
(() => {
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 荀彧：王佐（o: { t, raise, stance, flip, box(捧食盒), dark(忧色), bow(躬身) }） ----------
Z.xunYu = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, stance = 0, flip = 0, box = 0, dark = 0, bow = 0 } = o;
  const br = Math.sin(t * 1.5) * 0.01;                    // 文臣更静
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4 + bow * 0.16);
  c.translate(0, Math.sin(stance * 2) * 3);
  const hem = Math.sin(t * 1.6) * 4;
  // 袍身（宽袍下摆及地，遮腿）
  c.fillStyle = dark ? 'rgba(118,120,132,.52)' : 'rgba(218,210,192,.74)';
  c.beginPath();
  c.moveTo(-34, -172);
  c.quadraticCurveTo(-60, -84, -64 + hem, -6);
  c.quadraticCurveTo(0, 4 + hem * 0.4, 64 + hem * 0.6, -6);
  c.quadraticCurveTo(58, -86, 34, -172);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(34,30,26,.9)'; c.lineWidth = 3.2; c.stroke();
  // 束腰大带
  c.fillStyle = dark ? 'rgba(66,64,72,.9)' : 'rgba(96,78,54,.88)';
  c.fillRect(-41, -124, 82, 13);
  c.strokeStyle = 'rgba(40,32,24,.7)'; c.lineWidth = 1.6; c.strokeRect(-41, -124, 82, 13);
  // 领缘
  c.strokeStyle = 'rgba(30,26,22,.85)'; c.lineWidth = 2.4;
  c.beginPath(); c.moveTo(-16, -172); c.quadraticCurveTo(0, -150, 16, -172); c.stroke();
  // 广袖双臂（raise: 举袖/拱手）
  const rl = ease.out(clamp(raise));
  c.save(); c.rotate(bow * 0.1);
  // 左袖（垂）
  c.fillStyle = dark ? 'rgba(112,114,126,.6)' : 'rgba(208,200,182,.8)';
  c.beginPath();
  c.moveTo(-34, -160);
  c.quadraticCurveTo(-74 - 20 * rl, -140 - 20 * rl, -80 - 24 * rl, -96 - 30 * rl);
  c.quadraticCurveTo(-66 - 16 * rl, -84 - 22 * rl, -52 - 8 * rl, -104);
  c.quadraticCurveTo(-46, -134, -34, -146);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(32,28,24,.85)'; c.lineWidth = 2.6; c.stroke();
  // 右袖
  c.beginPath();
  c.moveTo(34, -160);
  c.quadraticCurveTo(74 + 20 * rl, -140 - 20 * rl, 80 + 24 * rl, -96 - 30 * rl);
  c.quadraticCurveTo(66 + 16 * rl, -84 - 22 * rl, 52 + 8 * rl, -104);
  c.quadraticCurveTo(46, -134, 34, -146);
  c.closePath(); c.fill(); c.stroke();
  c.restore();
  // 头 + 进贤冠（前有展筩）
  c.save(); c.translate(0, -196 - bow * 6);
  c.fillStyle = 'rgba(246,238,220,.96)';
  c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  // 冠：前高后低的梁冠
  c.fillStyle = 'rgba(28,28,32,.94)';
  c.beginPath();
  c.moveTo(-19, -8); c.quadraticCurveTo(-14, -30, 2, -32); c.quadraticCurveTo(20, -30, 22, -12);
  c.lineTo(16, -6); c.quadraticCurveTo(0, -12, -14, -5); c.closePath(); c.fill();
  // 展筩（横筒）
  c.fillStyle = 'rgba(24,24,28,.95)';
  c.fillRect(-2, -44, 34, 10);
  c.strokeStyle = 'rgba(10,10,12,.9)'; c.lineWidth = 1.6; c.strokeRect(-2, -44, 34, 10);
  // 目
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -1, 5.4, 4, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(8, -1, 2.3, 0, Math.PI * 2); c.fill();
  // 须（清雅短须）
  const wf = Math.sin(t * 1.7) * 3;
  c.strokeStyle = 'rgba(40,36,32,.86)'; c.lineWidth = 2.6; c.lineCap = 'round';
  [[-7, 8, -9, 22], [0, 10, 1, 25], [7, 8, 10, 21]].forEach(([x1, y1, x2, y2], k) => {
    c.beginPath(); c.moveTo(x1, y1);
    c.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + 3, x2 + wf * (0.3 + k * 0.2), y2 + wf * 0.2);
    c.stroke();
  });
  c.restore();
  c.restore();
  const sx = flip ? -1 : 1;
  if (box) {                                              // 捧食盒（双手捧于胸前）
    c.save(); c.translate(x + 2 * s * sx, y - (118 - 26 * ease.out(clamp(raise))) * s); c.scale(s, s);
    c.fillStyle = 'rgba(196,168,120,.92)';
    c.fillRect(-52, -18, 104, 34);
    c.strokeStyle = 'rgba(52,42,30,.92)'; c.lineWidth = 3; c.strokeRect(-52, -18, 104, 34);
    c.fillStyle = 'rgba(214,190,142,.92)'; c.fillRect(-52, -30, 104, 12);
    c.strokeRect(-52, -30, 104, 12);
    c.strokeStyle = 'rgba(52,42,30,.7)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-52, -24); c.lineTo(52, -24); c.stroke();
    c.restore();
  } else {                                                // 手持简册（默认）
    c.save(); c.translate(x + 66 * s * sx, y - (104 + 30 * ease.out(clamp(raise))) * s);
    c.rotate((flip ? Math.PI : 0) - 0.24 - 0.3 * ease.out(clamp(raise)));
    c.fillStyle = 'rgba(226,210,172,.94)';
    c.beginPath(); c.moveTo(-46, -10); c.lineTo(46, -14); c.lineTo(46, 8); c.lineTo(-46, 12); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(56,46,32,.88)'; c.lineWidth = 2.2; c.stroke();
    c.strokeStyle = 'rgba(90,74,50,.6)'; c.lineWidth = 1.4;
    for (let k = 0; k < 4; k++) { const yy = -6 + k * 5; c.beginPath(); c.moveTo(-38, yy); c.lineTo(38, yy - 2); c.stroke(); }
    c.strokeStyle = 'rgba(120,44,32,.85)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(-46, 0); c.lineTo(46, -3); c.stroke();      // 编绳
    c.restore();
  }
};

// ---------- 香炉（荀令留香母题：三足炉 + 一缕常动香烟） ----------
Z.xiangLu = (c, x, y, s, t, o = {}) => {
  const { smoke = 1, seed = 1, tone = 0.6 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  // 炉体
  c.fillStyle = 'rgba(96,88,76,.82)';
  c.beginPath(); c.moveTo(-34, -34); c.quadraticCurveTo(0, -18, 34, -34); c.quadraticCurveTo(28, 0, 0, 2); c.quadraticCurveTo(-28, 0, -34, -34); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,34,26,.9)'; c.lineWidth = 2.6; c.stroke();
  // 双耳
  c.strokeStyle = 'rgba(48,40,30,.9)'; c.lineWidth = 4;
  c.beginPath(); c.arc(-26, -38, 8, Math.PI * 0.9, Math.PI * 2.1); c.stroke();
  c.beginPath(); c.arc(26, -38, 8, Math.PI * 0.9, Math.PI * 2.1); c.stroke();
  // 三足
  brush(c, [[-20, 0], [-26, 14]], { w: 6, tone, dry: 0.5, seed: seed * 7 + 1 });
  brush(c, [[0, 2], [0, 16]], { w: 6, tone, dry: 0.5, seed: seed * 7 + 2 });
  brush(c, [[20, 0], [26, 14]], { w: 6, tone, dry: 0.5, seed: seed * 7 + 3 });
  // 香烟（三缕，常驻运动；smoke=0 是「香断了」）
  if (smoke > 0) {
    c.save(); c.filter = 'blur(5px)'; c.globalAlpha = smoke;
    for (let k = 0; k < 3; k++) {
      const ph = ((t * 0.24 + k * 0.3 + seed * 0.17) % 1);
      const cx0 = (k - 1) * 10;
      c.strokeStyle = `rgba(226,218,200,${0.5 * (1 - ph) * smoke})`;
      c.lineWidth = 7 - ph * 4; c.lineCap = 'round';
      c.beginPath();
      c.moveTo(cx0, -46);
      c.quadraticCurveTo(cx0 + Math.sin(t * 1.2 + k * 2.1) * 16, -46 - ph * 90,
                         cx0 + Math.sin(t * 1.2 + k * 2.1 + 1.2) * 30 * (0.4 + ph), -46 - ph * 190);
      c.stroke();
    }
    c.filter = 'none'; c.restore();
  }
  c.restore();
};

// ---------- 空食盒（open: 0 合 → 1 全开；开盖后内部空空如也） ----------
Z.kongHe = (c, x, y, s, open, t, o = {}) => {
  const { seed = 3 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.rotate(Math.sin(t * 1.2 + seed) * 0.015);
  // 盒身
  c.fillStyle = 'rgba(198,170,120,.94)';
  c.fillRect(-64, -22, 128, 40);
  c.strokeStyle = 'rgba(52,42,30,.94)'; c.lineWidth = 3.2; c.strokeRect(-64, -22, 128, 40);
  // 盒内（空）：随 open 显出
  if (open > 0.02) {
    c.save(); c.globalAlpha = clamp(open * 2.5);
    c.fillStyle = 'rgba(96,84,66,.5)';
    c.fillRect(-58, -20, 116, 30);
    c.strokeStyle = 'rgba(60,48,34,.6)'; c.lineWidth = 1.8; c.strokeRect(-58, -20, 116, 30);
    c.restore();
  }
  // 盒盖（绕后缘翻开）
  c.save();
  c.translate(-64, -22);
  c.rotate(-open * 1.9);
  c.fillStyle = 'rgba(216,192,144,.95)';
  c.fillRect(0, -14, 128, 14);
  c.strokeStyle = 'rgba(52,42,30,.94)'; c.lineWidth = 3; c.strokeRect(0, -14, 128, 14);
  c.restore();
  c.restore();
};

// ---------- 群贤（荀彧所举：郭嘉 / 荀攸 / 钟繇 / 陈群 / 司马懿——袍影而非碑影） ----------
Z.xianYing = (c, x, y, s, prog, t, o = {}) => {
  const { n = 5, seed = 5 } = o;
  const tones = ['rgba(58,64,72,.62)', 'rgba(70,62,54,.6)', 'rgba(52,70,62,.58)', 'rgba(74,58,50,.58)', 'rgba(60,58,76,.6)'];
  c.save(); c.translate(x, y); c.scale(s, s);
  for (let k = 0; k < n; k++) {
    const on = clamp(prog * 1.6 - k * 0.22);
    if (on <= 0) continue;
    const px = (k - (n - 1) / 2) * 118;
    const sway = Math.sin(t * 1.4 + k * 1.3) * 3;
    c.save(); c.globalAlpha = on; c.translate(px + sway * 0.4, 0);
    c.fillStyle = tones[k % tones.length];
    c.beginPath();                                        // 袍形：肩起腰收下摆微扬
    c.moveTo(-30, 0);
    c.quadraticCurveTo(-34, -56, -26, -98);
    c.quadraticCurveTo(-32, -120, -20, -126);
    c.quadraticCurveTo(0, -133, 20, -126);
    c.quadraticCurveTo(32, -120, 26, -98);
    c.quadraticCurveTo(34, -56, 30, 0);
    c.quadraticCurveTo(0, 7 + sway * 0.2, -30, 0);
    c.closePath(); c.fill();
    c.beginPath(); c.arc(2, -138, 11, 0, Math.PI * 2); c.fill();   // 头
    c.restore();
  }
  c.restore();
};
})();
