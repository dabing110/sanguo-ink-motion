// 《司马懿》笔法与八幕：晋宣帝 —— 深墨绿袍＋高冠＋鹰视狼顾（回首）＋棋盘。
// 视觉辨识：墨绿／深灰权臣袍、高冠、常作侧首回望（鹰视狼顾）、伴棋局（隐忍之征）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 棋盘（十九道，简化为九道）
Z.qipan = (c, x, y, s = 1, o = {}) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(206,184,140,.92)';
  c.beginPath(); c.moveTo(-70, 0); c.lineTo(70, 0); c.lineTo(84, -26); c.lineTo(-56, -26); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(92,70,42,.8)'; c.lineWidth = 2; c.stroke();
  c.strokeStyle = 'rgba(110,86,54,.5)'; c.lineWidth = 1;
  for (let i = 0; i < 6; i++) {
    c.beginPath(); c.moveTo(-66 + i * 26, -2); c.lineTo(-54 + i * 26, -24); c.stroke();
    c.beginPath(); c.moveTo(-58, -6 - i * 4); c.lineTo(76, -6 - i * 4); c.stroke();
  }
  // 黑白子
  for (const [px, py, dark] of [[-20, -12, 1], [4, -8, 0], [28, -16, 1], [-6, -20, 0]]) {
    c.fillStyle = dark ? 'rgba(34,32,30,.92)' : 'rgba(244,240,230,.95)';
    c.beginPath(); c.arc(px, py, 6, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(60,50,40,.7)'; c.lineWidth = 1; c.stroke();
  }
  c.restore();
};

// 司马懿：仲达（o: { t, raise, flip, board, look, kneel, back, tone })
Z.simayi = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, board = 1, look = 1, kneel = 0, back = 0, tone = 1 } = o;
  const br = Math.sin(t * 1.0) * 0.008;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.3);
  if (tone !== 1) c.globalAlpha *= tone;
  const hem = Math.sin(t * 1.2) * 5;
  // 腿
  if (kneel) {
    brush(c, [[-26, -54], [-54, -22], [-30, -2]], { w: 22, tone: 0.84, dry: 0.5, seed: 10201, head: 0.06, tail: 0.2 });
    brush(c, [[26, -54], [54, -22], [30, -2]], { w: 22, tone: 0.84, dry: 0.5, seed: 10202, head: 0.06, tail: 0.2 });
    c.save(); c.scale(1, 0.84);
  } else {
    brush(c, [[-17, -74], [-26, -34], [-32, 4]], { w: 18, tone: 0.84, dry: 0.5, seed: 10201, head: 0.06, tail: 0.2 });
    brush(c, [[17, -74], [26, -34], [32, 4]], { w: 18, tone: 0.84, dry: 0.5, seed: 10202, head: 0.06, tail: 0.2 });
  }
  // 墨绿权臣袍
  const sp = kneel ? 14 : 0;
  c.fillStyle = 'rgba(46,58,52,.8)';
  c.beginPath();
  c.moveTo(-31, -166); c.quadraticCurveTo(-56 - sp, -86, -62 - sp + hem, -2);
  c.quadraticCurveTo(0, 6 + hem * 0.3, 62 + sp + hem * 0.7, -2); c.quadraticCurveTo(56 + sp, -88, 31, -166);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(14,20,16,.9)'; c.lineWidth = 3; c.stroke();
  // 暗纹
  c.strokeStyle = 'rgba(120,132,118,.35)'; c.lineWidth = 1.8;
  for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(-50, -30 - k * 30); c.quadraticCurveTo(0, -20 - k * 30, 50, -30 - k * 30); c.stroke(); }
  // 玄带
  brush(c, [[-33, -120], [0, -116], [33, -120]], { w: 11, col: [58, 56, 48], tone: 0.88, dry: 0.3, seed: 10231 });
  // 头（侧首回望 = 鹰视狼顾）
  c.save(); c.translate(look && !back ? 6 : 2, -186); c.rotate(look && !back ? 0.22 : 0);
  if (back) {
    // 背影：整颗头是发，不露脸
    c.fillStyle = 'rgba(44,40,34,.96)';
    c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(20,16,12,.9)'; c.lineWidth = 2.1; c.stroke();
    c.fillStyle = 'rgba(64,58,48,.9)';
    c.beginPath(); c.ellipse(0, 6, 11, 9, 0, 0, Math.PI * 2); c.fill();   // 后颈/发髻
    c.fillStyle = 'rgba(26,26,28,.95)';
    c.beginPath(); c.moveTo(-18, 1); c.lineTo(-13, -20); c.lineTo(2, -30); c.lineTo(17, -19); c.lineTo(18, 1);
    c.quadraticCurveTo(0, -6, -18, 1); c.closePath(); c.fill();
    c.fillStyle = 'rgba(128,116,88,.85)'; c.fillRect(-18, -2, 36, 4);
    c.restore();
    const rl0 = ease.out(clamp(raise));
    brush(c, [[-30, -150], [-46 - 6 * rl0, -136 - 12 * rl0], [-58 - 10 * rl0, -120 - 24 * rl0]], { w: 13, tone: 0.5, dry: 0.45, seed: 10203, head: 0.1, tail: 0.2 });
    brush(c, [[30, -150], [46, -134], [56, -114]], { w: 12, tone: 0.5, dry: 0.45, seed: 10204, head: 0.1, tail: 0.2 });
    if (kneel) c.restore();
    c.restore();
    if (board) Z.qipan(c, x + (flip ? -120 : 120) * s, y - 20 * s, 0.9 * s);
    return;
  }
  c.fillStyle = 'rgba(236,222,202,.96)';
  c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(50,42,36,.88)'; c.lineWidth = 2.1; c.stroke();
  // 高冠
  c.fillStyle = 'rgba(26,26,28,.95)';
  c.beginPath(); c.moveTo(-18, 1); c.lineTo(-12, -22); c.lineTo(3, -29); c.lineTo(16, -18); c.lineTo(18, 1);
  c.quadraticCurveTo(0, -7, -18, 1); c.closePath(); c.fill();
  c.fillStyle = 'rgba(128,116,88,.85)'; c.fillRect(-18, -2, 36, 4);
  // 鹰目（锐利上挑）
  c.fillStyle = 'rgba(250,246,238,.95)'; c.beginPath(); c.ellipse(7, -2, 4.8, 2.4, -0.16, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(14,12,10,.96)'; c.beginPath(); c.arc(8.4, -2, 1.9, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,16,14,.9)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(1, -6); c.quadraticCurveTo(8, -9, 14, -6.6); c.stroke();
  // 短须（稀疏，阴鸷）
  const wf = Math.sin(t * 1.3) * 2;
  c.strokeStyle = 'rgba(40,36,32,.9)'; c.lineWidth = 2.6; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-6, 10); c.quadraticCurveTo(-2, 24 + wf * 0.3, 5, 15 + wf); c.stroke();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -150], [-48 - 6 * rl, -138 - 12 * rl], [-62 - 10 * rl, -124 - 26 * rl]], { w: 13, tone: 0.58, dry: 0.45, seed: 10203, head: 0.1, tail: 0.2 });
  brush(c, [[30, -150], [44, -132], [52, -112]], { w: 12, tone: 0.58, dry: 0.45, seed: 10204, head: 0.1, tail: 0.2 });
  if (kneel) c.restore();
  c.restore();
  if (board) Z.qipan(c, x + (flip ? -110 : 110) * s, y - 20 * s, 0.9 * s);
};

// ① 河内装病：卧榻称疾，暗中窥时
SCENES['sm1_zhuangbing'] = (() => {
  const p = () => Z.paper('sm1', '#e3dbc4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sm1_bg', 0.34 + 0.66 * grow, (g) => {
      g.fillStyle = 'rgba(56,54,50,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2010, [{ y0: 460, amp: 110, tone: 0.2, seed: 531.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    // 榻
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.1, lt) * 0.9);
    c.fillStyle = 'rgba(122,90,54,.9)'; c.fillRect(980, 840, 420, 18);
    c.fillRect(1000, 858, 13, 88); c.fillRect(1370, 858, 13, 88);
    c.fillStyle = 'rgba(198,182,150,.7)'; c.fillRect(1000, 806, 380, 36);
    c.restore();
    Z.mist(c, t, { y0: 540, y1: 800, n: 3, alpha: 0.3, speed: 20, seed: 1381 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1383, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.simayi(c, lerp(1060, 1180, ap), 806, lerp(1.2, 1.4, ap), t, { raise: 0, board: 0, look: 1, kneel: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '仲达', ss(1.0, 1.28, lt), { size: 88, seed: 69 });
  } };
})();

// ② 西拒诸葛：据险筑垒，坚守不出
SCENES['sm2_xiju'] = (() => {
  const p = () => Z.paper('sm2', '#e0d7c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sm2_bg', 0.32 + 0.68 * grow, (g) => {
      g.fillStyle = 'rgba(56,52,48,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 165, tone: 0.28, seed: 541.6 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    Z.water(c, t, { y0: 800, y1: 1060, tone: 0.36, seed: 101, rows: 6 });
    // 营垒
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.82);
    // 夯土营垒：墙体 + 沿墙顶的垛口 + 旗
    c.fillStyle = 'rgba(158,140,108,.62)'; c.strokeStyle = 'rgba(48,40,30,.9)'; c.lineWidth = 3.2;
    c.beginPath(); c.moveTo(1080, 902); c.lineTo(1080, 762); c.lineTo(1620, 738); c.lineTo(1620, 902); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = 'rgba(178,160,124,.75)';
    for (let i = 0; i < 7; i++) {
      const px = 1094 + i * 76, py = 762 - i * 3.6;
      c.fillRect(px, py - 22, 46, 24);
      c.strokeStyle = 'rgba(48,40,30,.75)'; c.lineWidth = 2; c.strokeRect(px, py - 22, 46, 24);
    }
    c.strokeStyle = 'rgba(60,50,38,.55)'; c.lineWidth = 1.6;
    for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(1084, 762 + i * 34); c.lineTo(1616, 738 + i * 34); c.stroke(); }
    c.restore();
    Z.mist(c, t, { y0: 580, y1: 820, n: 4, alpha: 0.28, speed: 28, seed: 1391 });
    brush(c, [[0, 906], [520, 890], [980, 910], [1320, 894]], { w: 18, tone: 0.7, dry: 0.62, seed: 1393 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.simayi(c, lerp(740, 850, ap), 890, lerp(1.75, 2.12, ap), t, { raise: 0.6, board: 0, look: 1, back: 1, tone: 0.95 });
    c.restore();
    Z.seal(c, 1762, 952, '拒亮', ss(1.0, 1.28, lt), { size: 88, seed: 70 });
  } };
})();

// ③ 巾帼之辱：受女衣而不怒
SCENES['sm3_jinguo'] = (() => {
  const p = () => Z.paper('sm3', '#ded5bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'sm3_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(50,46,44,.18)'; g.fillRect(0, 0, 1920, 1080);
    }, { blur: 2.4, halo: 9, haloA: 0.32 });
    Z.mist(c, t, { y0: 560, y1: 820, n: 4, alpha: 0.3, speed: 22, seed: 1401 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1403, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 女衣（悬挂）
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.8, lt) * 0.8);
    c.fillStyle = 'rgba(212,144,152,.6)';
    c.beginPath(); c.moveTo(1240, 620); c.quadraticCurveTo(1200, 720, 1216, 840);
    c.quadraticCurveTo(1290, 860, 1360, 838); c.quadraticCurveTo(1376, 716, 1336, 620); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(120,70,74,.6)'; c.lineWidth = 2; c.stroke();
    c.restore();
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.simayi(c, lerp(440, 540, ap), 952, lerp(1.45, 1.72, ap), t, { raise: 0.35, board: 0, look: 1, kneel: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '忍辱', ss(1.0, 1.28, lt), { size: 88, seed: 71 });
  } };
})();

// ④ 五丈原不战：对峙百日，终不出垒
SCENES['sm4_wuzhang'] = (() => {
  const p = () => Z.paper('sm4', '#dcd3bb');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'sm4_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(40,38,38,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 175, tone: 0.3, seed: 551.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 580, y1: 880, n: 5, alpha: 0.32, speed: 18, seed: 1411 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 1413, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 对峙的两座营垒（远）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.5);
    c.fillStyle = 'rgba(120,112,98,.5)'; c.fillRect(320, 800, 240, 60); c.fillRect(380, 740, 140, 62);
    c.fillRect(1400, 800, 240, 60); c.fillRect(1460, 740, 140, 62);
    c.restore();
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.simayi(c, lerp(1020, 1160, ap), 954, lerp(0.95, 1.14, ap), t, { raise: 0.1, board: 1, look: 1, kneel: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '不战', ss(1.2, 1.48, lt), { size: 88, seed: 72 });
  } };
})();

// ⑤ 远征辽东：百日破公孙渊
SCENES['sm5_liaodong'] = (() => {
  const p = () => Z.paper('sm5', '#dfd6be');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sm5_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(52,50,50,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 440, amp: 170, tone: 0.28, seed: 561.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.32 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.75);
    Z.wall(c, 1440, 900, 0.64, t, { flag: 0, seed: 15 });
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 820, n: 4, alpha: 0.28, speed: 26, seed: 1421 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1423, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.simayi(c, lerp(420, 540, ap), 952, lerp(1.1, 1.38, ap), t, { raise: 0.7, board: 0, look: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '辽东', ss(1.0, 1.28, lt), { size: 88, seed: 73 });
  } };
})();

// ⑥ 高平陵之变：一举夺权
SCENES['sm6_gaopingling'] = (() => {
  const p = () => Z.paper('sm6', '#d9d0b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'sm6_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(42,36,34,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 170, tone: 0.32, seed: 571.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    // 陵阙
    c.save(); c.globalAlpha = clamp(ss(0, 1.0, lt) * 0.7);
    c.fillStyle = 'rgba(126,110,88,.55)';
    c.fillRect(1180, 700, 40, 240); c.fillRect(1500, 700, 40, 240);
    c.fillRect(1160, 676, 400, 30);
    c.restore();
    Z.mist(c, t, { y0: 580, y1: 860, n: 4, alpha: 0.3, speed: 22, seed: 1431 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 1433, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 兵甲之影
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.8, lt) * 0.5);
    for (let i = 0; i < 6; i++) { brush(c, [[1080 + i * 60, 944], [1084 + i * 60, 850]], { w: 14, tone: 0.5, dry: 0.6, seed: 1434 + i }); }
    c.restore();
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.08);
    Z.simayi(c, lerp(520, 650, ap), 954, lerp(1.25, 1.5, ap), t, { raise: 0.8, board: 0, look: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '夺权', ss(1.2, 1.48, lt), { size: 88, seed: 74 });
  } };
})();

// ⑦ 父子专权：魏祚将移
SCENES['sm7_zhuanquan'] = (() => {
  const p = () => Z.paper('sm7', '#dcd3ba');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'sm7_bg', 0.26 + 0.74 * grow, (g) => {
      g.fillStyle = 'rgba(44,40,38,.22)'; g.fillRect(0, 0, 1920, 1080);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    // 殿柱与阶
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.78);
    c.fillStyle = 'rgba(96,44,40,.6)';
    c.fillRect(420, 260, 42, 690); c.fillRect(1460, 260, 42, 690);
    c.fillStyle = 'rgba(184,170,140,.5)';
    c.fillRect(300, 900, 1320, 26); c.fillRect(360, 926, 1200, 22);
    c.restore();
    Z.mist(c, t, { y0: 600, y1: 860, n: 3, alpha: 0.26, speed: 20, seed: 1441 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1443, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.simayi(c, lerp(660, 760, ap), 952, lerp(1.7, 1.95, ap), t, { raise: 0.85, board: 0, look: 1 });
    c.restore();
    // 二子之影（师、昭）
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.0, lt) * 0.55);
    for (let i = 0; i < 2; i++) {
      const px = 1140 + i * 120;
      brush(c, [[px, 948], [px + 2, 806]], { w: 34, tone: 0.44 + i * 0.06, dry: 0.5, seed: 1444 + i });
      c.fillStyle = 'rgba(236,222,202,.82)'; c.beginPath(); c.ellipse(px + 2, 792, 13, 15, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(50,42,34,.8)'; c.lineWidth = 1.8; c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '专权', ss(1.2, 1.48, lt), { size: 88, seed: 75 });
  } };
})();

// ⑧ 晋室之基：棋局未终，天下已易
SCENES['sm8_jinshi'] = (() => {
  const p = () => Z.paper('sm8', '#dbd2b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'sm8_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(34,34,36,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 175, tone: 0.3, seed: 581.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1451 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 1453, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    Z.simayi(c, lerp(1080, 1180, ap), 956, lerp(1.6, 1.86, ap), t, { raise: 0.2, board: 1, look: 1, back: 1, tone: 0.95 });
    c.restore();
    Z.seal(c, 1762, 952, '晋基', ss(1.2, 1.48, lt), { size: 88, seed: 76 });
  } };
})();
})();
