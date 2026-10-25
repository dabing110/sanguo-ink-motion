// 《祢衡》专属笔法库：正平狂士、渔阳掺挝（声波）、鹦鹉洲。
// 依赖 h_common.js。祢衡的辨识要素（与田丰/陈宫区分）：
// ① 全片唯一青年主角（卒年二十六）——瘦挺无须、气盛眉扬
// ② 鼓（渔阳掺挝）与声波涟漪——他最响的死亡不在刀下，在鼓上
// ③ 鹦鹉（《鹦鹉赋》一笔而成；身后洲名鹦鹉洲）
(() => {
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 祢衡：正平（o: { t, raise, stance, flip, drum(击鼓姿态), bared(裸/单绞), pen(执笔) }） ----------
Z.miHeng = (c, x, y, s, o = {}) => {
  const { t = 0, raise = 0, stance = 0, flip = 0, drum = 0, bared = 0, pen = 0 } = o;
  const br = Math.sin(t * 2.4) * 0.02;                      // 少年气盛：动得多
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.5);
  c.translate(0, Math.sin(stance * 2.4) * 4);
  const hem = Math.sin(t * 2) * 6;
  // 腿
  const step = Math.sin(stance * 2.4) * 4.5;
  brush(c, [[-13, -70], [-22 + step, -32], [-27 + step, 4]], { w: 16, tone: 0.84, dry: 0.5, seed: 1001, head: 0.06, tail: 0.2 });
  brush(c, [[13, -70], [22 - step, -32], [27 - step, 4]], { w: 16, tone: 0.84, dry: 0.5, seed: 1002, head: 0.06, tail: 0.2 });
  // 瘦挺身形（青年：肩窄腰高）—— 襕衫色 → 单绞色 连续渐变（避免 bared 二值跳变）
  const bv = clamp(bared);
  const rcA = lerp(206, 238, bv), rcB = lerp(196, 222, bv), rcC = lerp(174, 200, bv);
  c.fillStyle = `rgba(${rcA | 0},${rcB | 0},${rcC | 0},${lerp(0.72, 0.8, bv)})`;
  c.beginPath();
  c.moveTo(-24, -158); c.quadraticCurveTo(-40, -80, -40 + hem, -6);
  c.quadraticCurveTo(0, 2 + hem * 0.3, 40 + hem * 0.6, -6); c.quadraticCurveTo(40, -82, 24, -158);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,24,20,.9)'; c.lineWidth = 2.8; c.stroke();
  if (bv < 0.985) {                                         // 襕衫腰带（随 bared 渐隐）
    c.save(); c.globalAlpha = 1 - bv;
    c.fillStyle = 'rgba(72,60,44,.88)'; c.fillRect(-30, -108, 60, 10);
    c.restore();
  }
  // 双臂（drum: 举槌对鼓面）
  const rl = ease.out(clamp(raise));
  if (drum) {
    const beat = Math.sin(t * 7.5) * 0.5 + 0.5;             // 击鼓节拍
    brush(c, [[-22, -142], [-52, -150 - 26 * beat], [-66, -120 - 40 * beat]], { w: 13, tone: 0.6, dry: 0.45, seed: 1003, head: 0.1, tail: 0.25 });
    brush(c, [[22, -142], [52, -150 - 26 * (1 - beat)], [66, -120 - 40 * (1 - beat)]], { w: 13, tone: 0.6, dry: 0.45, seed: 1004, head: 0.1, tail: 0.25 });
  } else {
    brush(c, [[-22, -142], [-46 - 6 * rl, -130 - 16 * rl], [-66 - 10 * rl, -112 - 34 * rl]], { w: 13, tone: 0.6, dry: 0.45, seed: 1003, head: 0.1, tail: 0.2 });
    brush(c, [[22, -142], [46 + 6 * rl, -130 - 16 * rl], [66 + 10 * rl, -112 - 34 * rl]], { w: 13, tone: 0.6, dry: 0.45, seed: 1004, head: 0.1, tail: 0.2 });
  }
  // 头 + 幅巾（青年，无须，眉扬）
  c.save(); c.translate(2, -182);
  c.fillStyle = 'rgba(246,238,220,.96)';
  c.beginPath(); c.ellipse(0, 0, 15.5, 17.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = 'rgba(34,32,32,.94)';
  c.beginPath();
  c.moveTo(-17, -8); c.quadraticCurveTo(-10, -26, 2, -27); c.quadraticCurveTo(16, -24, 18, -8);
  c.quadraticCurveTo(6, -13, -11, -5); c.closePath(); c.fill();
  // 巾脚（常驻小飘）
  const sw = Math.sin(t * 2.6) * 4;
  c.beginPath(); c.moveTo(-6, -22); c.quadraticCurveTo(-16 + sw, -40, -26 + sw, -32); c.quadraticCurveTo(-14 + sw * 0.5, -24, -8, -18); c.closePath(); c.fill();
  // 眉扬 + 目（气盛）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(6, -2, 5, 3.6, 0.06, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(7, -2, 2.2, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,20,16,.8)'; c.lineWidth = 1.8;
  c.beginPath(); c.moveTo(0, -10); c.lineTo(12, -13); c.stroke();     // 扬眉
  c.strokeStyle = 'rgba(30,26,24,.8)'; c.lineWidth = 2; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-5, 9); c.quadraticCurveTo(2, 13, 9, 10); c.stroke();   // 抿嘴（不服）
  c.restore();
  c.restore();
  const sx = flip ? -1 : 1;
  if (drum) {                                               // 双鼓槌（跟双臂同拍）
    const beat = Math.sin(t * 7.5) * 0.5 + 0.5;
    [[-66, -120 - 40 * beat, -0.9], [66, -120 - 40 * (1 - beat), 0.9]].forEach(([hx, hy, rot], k) => {
      c.save(); c.translate(x + hx * s * sx, y + hy * s); c.rotate(rot * sx);
      brush(c, [[0, 0], [0, 62]], { w: 7, col: [110, 76, 42], tone: 0.92, dry: 0.4, seed: 1005 + k });
      c.restore();
    });
  } else if (pen) {                                         // 执笔（写赋）
    c.save(); c.translate(x + 70 * s * sx, y - (128 + 30 * ease.out(clamp(raise))) * s);
    c.rotate((flip ? Math.PI : 0) - 0.5);
    brush(c, [[0, 0], [0, -46]], { w: 4.5, tone: 0.2, dry: 0.4, seed: 1007, tail: 0.85 });
    c.restore();
  }
};

// ---------- 建鼓（朝会大鼓：鼓架 + 鼓面） ----------
Z.jianGu = (c, x, y, s, t, o = {}) => {
  const { seed = 2 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  // 鼓架（十字底座 + 立柱）
  brush(c, [[-70, 0], [70, 0]], { w: 9, tone: 0.82, dry: 0.5, seed: seed * 3 + 1 });
  brush(c, [[0, 0], [0, -190]], { w: 11, tone: 0.85, dry: 0.4, seed: seed * 3 + 2 });
  // 鼓身（横置圆鼓）
  c.fillStyle = 'rgba(168,108,58,.85)';
  c.beginPath(); c.ellipse(0, -196, 96, 44, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(52,34,20,.92)'; c.lineWidth = 3.4; c.stroke();
  c.fillStyle = 'rgba(222,206,178,.9)';
  c.beginPath(); c.ellipse(0, -196, 30, 15, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(70,48,28,.9)'; c.lineWidth = 2.4; c.stroke();
  // 鼓身鼓钉
  c.fillStyle = 'rgba(96,62,32,.9)';
  for (let k = -2; k <= 2; k++) { c.beginPath(); c.arc(k * 30, -196 - 34, 3, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(k * 30, -196 + 34, 3, 0, Math.PI * 2); c.fill(); }
  c.restore();
};

// ---------- 声波涟漪（渔阳掺挝：鼓声化纹，圈圈扩散） ----------
Z.shengBo = (c, x, y, t, o = {}) => {
  const { n = 4, speed = 260, alpha = 0.5, seed = 1 } = o;
  c.save();
  for (let k = 0; k < n; k++) {
    const ph = ((t * speed / 900 + k / n + seed * 0.13) % 1);
    const rr = 40 + ph * 620;
    c.strokeStyle = `rgba(96,84,66,${alpha * (1 - ph)})`;
    c.lineWidth = 4.5 * (1 - ph) + 1;
    c.beginPath();
    c.ellipse(x, y, rr, rr * 0.42, 0, Math.PI * 0.98, Math.PI * 2.02);
    c.stroke();
    c.beginPath();
    c.ellipse(x, y, rr, rr * 0.42, 0, Math.PI * 0.98, Math.PI * 2.02);
    c.stroke();
  }
  c.restore();
};

// ---------- 鹦鹉（《鹦鹉赋》母题：绿身红喙，栖或飞） ----------
Z.yingWu = (c, x, y, s, t, o = {}) => {
  const { fly = 0, seed = 1 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  if (fly) {
    // 飞：位置由调用者给轨迹
    c.rotate(Math.sin(t * 3 + seed) * 0.12);
  }
  const flap = fly ? Math.sin(t * 9 + seed) * 0.9 : Math.sin(t * 2.2 + seed) * 0.12;
  // 身（绿）
  c.fillStyle = 'rgba(84,128,72,.88)';
  c.beginPath(); c.ellipse(0, 0, 26, 17, -0.15, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(40,62,34,.85)'; c.lineWidth = 2.2; c.stroke();
  // 翅
  c.save(); c.rotate(-0.3 - flap);
  c.fillStyle = 'rgba(104,146,88,.9)';
  c.beginPath(); c.moveTo(-4, -6); c.quadraticCurveTo(-34, -26, -52, -8); c.quadraticCurveTo(-30, -2, -4, 4); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,62,34,.8)'; c.lineWidth = 1.8; c.stroke();
  c.restore();
  // 头
  c.fillStyle = 'rgba(96,140,80,.92)';
  c.beginPath(); c.arc(24, -8, 12, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(40,62,34,.85)'; c.lineWidth = 2; c.stroke();
  // 喙（红弯钩）
  c.fillStyle = 'rgba(188,72,52,.92)';
  c.beginPath(); c.moveTo(34, -10); c.quadraticCurveTo(46, -8, 44, 2); c.quadraticCurveTo(38, -2, 32, -4); c.closePath(); c.fill();
  // 目
  c.fillStyle = 'rgba(24,22,18,.95)'; c.beginPath(); c.arc(27, -10, 2.2, 0, Math.PI * 2); c.fill();
  // 长尾
  c.strokeStyle = 'rgba(84,128,72,.9)'; c.lineWidth = 4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-22, 6); c.quadraticCurveTo(-52, 16 + flap * 8, -70, 10); c.stroke();
  // 爪
  if (!fly) { c.strokeStyle = 'rgba(120,80,50,.9)'; c.lineWidth = 2.4; c.beginPath(); c.moveTo(4, 15); c.lineTo(4, 24); c.stroke(); }
  c.restore();
};
})();
