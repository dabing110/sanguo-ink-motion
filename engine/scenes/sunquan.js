// 《孙权》笔法与八幕：吴大帝 —— 紫髯＋碧眼＋吴王冠＋长剑。
// 视觉辨识：紫髯（暗紫须）、碧眼（青绿瞳）、绛紫吴袍、吴王冠（非魏之高冠、非蜀之软巾）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 长剑（吴钩式）
Z.wujian = (c, x, y, ang, len = 270, t = 0, o = {}) => {
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, 54]], { w: 10, col: [86, 62, 44], tone: 0.9, dry: 0.3, seed: 11101 });
  c.fillStyle = 'rgba(208,214,220,.94)'; c.strokeStyle = 'rgba(26,28,32,.9)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-8, 0); c.lineTo(8, 0); c.lineTo(6, -len * 0.7);
  c.quadraticCurveTo(16, -len * 0.88, 2, -len); c.quadraticCurveTo(-6, -len * 0.86, -6, -len * 0.7);
  c.closePath(); c.fill(); c.stroke();
  c.fillStyle = 'rgba(154,118,58,.95)'; c.fillRect(-15, -4, 30, 7);
  brush(c, [[0, 54], [-5, 88]], { w: 4, col: [96, 74, 118], tone: 0.88, dry: 0.3, seed: 11102 });
  c.restore();
};

// 孙权：仲谋（o: { t, raise, flip, sword })
Z.sunquan = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, sword = 1 } = o;
  const br = Math.sin(t * 1.1) * 0.009;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.35);
  const hem = Math.sin(t * 1.35) * 5;
  // 腿
  brush(c, [[-18, -74], [-27, -34], [-33, 4]], { w: 19, tone: 0.82, dry: 0.5, seed: 11201, head: 0.06, tail: 0.2 });
  brush(c, [[18, -74], [27, -34], [33, 4]], { w: 19, tone: 0.82, dry: 0.5, seed: 11202, head: 0.06, tail: 0.2 });
  // 绛紫吴袍
  c.fillStyle = 'rgba(78,52,82,.78)';
  c.beginPath();
  c.moveTo(-32, -166); c.quadraticCurveTo(-58, -86, -64 + hem, -2);
  c.quadraticCurveTo(0, 6 + hem * 0.3, 64 + hem * 0.7, -2); c.quadraticCurveTo(58, -88, 32, -166);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(24,14,26,.9)'; c.lineWidth = 3; c.stroke();
  // 云纹（吴）
  c.strokeStyle = 'rgba(166,140,176,.4)'; c.lineWidth = 1.8;
  for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(-50, -34 - k * 30); c.quadraticCurveTo(0, -24 - k * 30, 50, -34 - k * 30); c.stroke(); }
  // 金带
  brush(c, [[-33, -120], [0, -116], [33, -120]], { w: 11, col: [182, 146, 68], tone: 0.9, dry: 0.3, seed: 11231 });
  // 头（紫髯碧眼）
  c.save(); c.translate(2, -186);
  c.fillStyle = 'rgba(240,226,206,.96)';
  c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(52,44,36,.88)'; c.lineWidth = 2.1; c.stroke();
  // 吴王冠
  c.fillStyle = 'rgba(44,32,48,.95)';
  c.beginPath(); c.moveTo(-19, 1); c.lineTo(-14, -20); c.lineTo(0, -28); c.lineTo(14, -20); c.lineTo(19, 1);
  c.quadraticCurveTo(0, -7, -19, 1); c.closePath(); c.fill();
  c.fillStyle = 'rgba(186,150,70,.9)'; c.fillRect(-19, -3, 38, 4);
  c.fillStyle = 'rgba(96,140,124,.9)'; c.beginPath(); c.arc(0, -22, 3.6, 0, Math.PI * 2); c.fill();
  // 碧眼
  c.fillStyle = 'rgba(248,246,238,.96)'; c.beginPath(); c.ellipse(6.4, -2, 4.8, 2.9, -0.06, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(38,82,70,.95)'; c.beginPath(); c.arc(7.6, -2, 2.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(8,10,10,.95)'; c.beginPath(); c.arc(7.6, -2, 1.1, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,18,14,.86)'; c.lineWidth = 1.8;
  c.beginPath(); c.moveTo(1, -5.8); c.quadraticCurveTo(7, -8, 12, -5.6); c.stroke();
  // 紫髯
  const wf = Math.sin(t * 1.45) * 2.6;
  c.strokeStyle = 'rgba(84,62,100,.94)'; c.lineWidth = 3.4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-7, 10); c.quadraticCurveTo(-3, 28 + wf * 0.3, 5, 17 + wf); c.stroke();
  c.beginPath(); c.moveTo(-11, 6); c.quadraticCurveTo(-13, 20, -9, 27); c.stroke();
  c.beginPath(); c.moveTo(10, 6); c.quadraticCurveTo(12, 20, 8, 27); c.stroke();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -150], [-48 - 6 * rl, -138 - 12 * rl], [-62 - 10 * rl, -124 - 26 * rl]], { w: 13, tone: 0.58, dry: 0.45, seed: 11203, head: 0.1, tail: 0.2 });
  brush(c, [[30, -150], [44, -132], [52, -112]], { w: 12, tone: 0.58, dry: 0.45, seed: 11204, head: 0.1, tail: 0.2 });
  c.restore();
  if (sword) Z.wujian(c, x + (flip ? -56 : 52) * s, y - 110 * s, flip ? 2.5 : 0.72, 270 * s, t);
};

// ① 兄终弟及：灵前受印，继领江东
SCENES['sq1_xiongzhong'] = (() => {
  const p = () => Z.paper('sq1', '#e6dcc4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sq1_bg', 0.36 + 0.64 * grow, (g) => {
      g.fillStyle = 'rgba(72,60,54,.13)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2010, [{ y0: 460, amp: 108, tone: 0.2, seed: 591.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    Z.mist(c, t, { y0: 520, y1: 760, n: 3, alpha: 0.28, speed: 22, seed: 1461 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 1463, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 灵案与印
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.3, lt) * 0.88);
    c.fillStyle = 'rgba(118,86,50,.9)'; c.fillRect(1040, 848, 280, 14);
    c.fillRect(1060, 862, 12, 62); c.fillRect(1290, 862, 12, 62);
    c.fillStyle = 'rgba(188,152,76,.95)'; c.fillRect(1150, 812, 46, 40);
    c.strokeStyle = 'rgba(96,72,34,.9)'; c.lineWidth = 2.4; c.strokeRect(1150, 812, 46, 40);
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.sunquan(c, lerp(420, 780, ap), 952, lerp(1.3, 2.0, ap), t, { raise: 0.35, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '仲谋', ss(1.0, 1.28, lt), { size: 88, seed: 77 });
  } };
})();

// ② 赤壁决断：拔刀断案，定计抗曹
SCENES['sq2_chibi'] = (() => {
  const p = () => Z.paper('sq2', '#e4dac2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sq2_bg', 0.32 + 0.68 * grow, (g) => {
      g.fillStyle = 'rgba(62,54,48,.15)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 140, tone: 0.24, seed: 601.6 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.28 });
    Z.water(c, t, { y0: 800, y1: 1060, tone: 0.34, seed: 111, rows: 5 });
    Z.mist(c, t, { y0: 540, y1: 800, n: 3, alpha: 0.26, speed: 26, seed: 1471 });
    // 断案
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.6, lt) * 0.85);
    c.fillStyle = 'rgba(118,86,50,.92)'; c.fillRect(1000, 840, 300, 16);
    c.fillRect(1024, 856, 13, 60); c.fillRect(1264, 856, 13, 60);
    c.strokeStyle = 'rgba(40,28,20,.9)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(1150, 838); c.lineTo(1150, 772); c.stroke();
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.sunquan(c, lerp(420, 760, ap), 890, lerp(1.3, 2.0, ap), t, { raise: 0.95, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '断案', ss(1.0, 1.28, lt), { size: 88, seed: 78 });
  } };
})();

// ③ 濡须坞：夹江筑坞，拒曹于水上
SCENES['sq3_ruxu'] = (() => {
  const p = () => Z.paper('sq3', '#e1d8c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sq3_bg', 0.34 + 0.66 * grow, (g) => {
      g.fillStyle = 'rgba(54,54,52,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 150, tone: 0.26, seed: 611.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    Z.water(c, t, { y0: 760, y1: 1060, tone: 0.4, seed: 121, rows: 7 });
    // 夹江坞堡
    c.save(); c.globalAlpha = clamp(ss(0, 1.0, lt) * 0.72);
    c.fillStyle = 'rgba(190,176,148,.6)'; c.strokeStyle = 'rgba(56,48,38,.85)'; c.lineWidth = 2.8;
    c.beginPath(); c.moveTo(1120, 780); c.lineTo(1120, 690); c.lineTo(1300, 664); c.lineTo(1480, 690); c.lineTo(1480, 780); c.closePath(); c.fill(); c.stroke();
    for (let i = 0; i < 5; i++) { c.fillStyle = 'rgba(200,186,158,.7)'; c.fillRect(1140 + i * 68, 648, 34, 20); }
    c.restore();
    Z.flag(c, 1600, 700, 240, t, { col: 'rgba(78,52,82,.85)', seed: 16 });
    Z.mist(c, t, { y0: 600, y1: 840, n: 4, alpha: 0.3, speed: 26, seed: 1481 });
    brush(c, [[0, 900], [520, 884], [980, 906], [1320, 890]], { w: 18, tone: 0.7, dry: 0.62, seed: 1483 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.sunquan(c, lerp(420, 780, ap), 782, lerp(1.15, 1.72, ap), t, { raise: 0.6, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '濡须', ss(1.0, 1.28, lt), { size: 88, seed: 79 });
  } };
})();

// ④ 合肥十万：为张辽所破，几乎不免
SCENES['sq4_hefei'] = (() => {
  const p = () => Z.paper('sq4', '#ddd3bb');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'sq4_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(52,46,42,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 160, tone: 0.28, seed: 621.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.72);
    Z.wall(c, 1420, 910, 0.68, t, { flag: 0, seed: 17 });
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 820, n: 4, alpha: 0.3, speed: 26, seed: 1491 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1493, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    Z.dust(c, t, { x: 700, y: 936, n: 6, seed: 14, scale: 1.5, alpha: 0.32 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.sunquan(c, lerp(460, 720, ap), 952, lerp(1.28, 1.98, ap), t, { raise: 0.15, sword: 0, flip: 1 });
    c.restore();
    // 追骑之影
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.0, lt) * 0.5);
    brush(c, [[1120, 942], [1200, 910], [1264, 894]], { w: 28, tone: 0.48, dry: 0.6, seed: 1494 });
    c.restore();
    Z.seal(c, 1762, 952, '合肥', ss(1.0, 1.28, lt), { size: 88, seed: 80 });
  } };
})();

// ⑤ 武昌称帝：建号黄龙
SCENES['sq5_chengdi'] = (() => {
  const p = () => Z.paper('sq5', '#e5dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'sq5_bg', 0.38 + 0.62 * grow, (g) => {
      g.fillStyle = 'rgba(68,56,52,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 460, amp: 112, tone: 0.2, seed: 631.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.85, lt) * 0.8);
    for (let i = 0; i < 2; i++) {
      const cx = 340 + i * 1240;
      c.fillStyle = 'rgba(96,44,40,.6)'; c.fillRect(cx, 250, 44, 700);
      c.fillStyle = 'rgba(178,142,66,.7)'; c.fillRect(cx - 6, 246, 56, 16);
    }
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 800, n: 3, alpha: 0.24, speed: 22, seed: 1501 });
    brush(c, [[0, 954], [660, 946], [1320, 958], [1920, 944]], { w: 13, tone: 0.76, dry: 0.74, seed: 1503, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.sunquan(c, lerp(480, 840, ap), 952, lerp(1.35, 2.15, ap), t, { raise: 0.8, sword: 1 });
    c.restore();
    // 冕旒
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.8, lt) * 0.8);
    c.fillStyle = 'rgba(44,32,48,.9)'; c.fillRect(816, 700, 56, 11);
    for (let i = 0; i < 6; i++) {
      c.strokeStyle = 'rgba(190,158,84,.8)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(820 + i * 9, 711); c.lineTo(820 + i * 9, 741 + (i % 3) * 7); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '黄龙', ss(1.0, 1.28, lt), { size: 88, seed: 81 });
  } };
})();

// ⑥ 二宫之争：骨肉相残，朝局分裂
SCENES['sq6_ergong'] = (() => {
  const p = () => Z.paper('sq6', '#dcd2b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'sq6_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(42,36,36,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 170, tone: 0.3, seed: 641.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    // 裂开的殿柱
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.7);
    // 断柱移到右侧：原来 x=880 正压人物头顶，读起来像一根木棍穿头。
    c.fillStyle = 'rgba(96,44,40,.55)'; c.fillRect(1268, 190, 46, 762);
    c.strokeStyle = 'rgba(20,12,10,.9)'; c.lineWidth = 5;
    c.beginPath(); c.moveTo(1286, 232); c.lineTo(1300, 372); c.lineTo(1278, 512); c.lineTo(1294, 692); c.stroke();
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 860, n: 4, alpha: 0.3, speed: 20, seed: 1511 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 1513, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 二子对峙之影
    c.save(); c.globalAlpha = clamp(ss(0.7, 1.8, lt) * 0.55);
    for (let i = 0; i < 2; i++) {
      const px = 560 + i * 700;
      brush(c, [[px, 948], [px + 2, 800]], { w: 36, tone: 0.44 + i * 0.08, dry: 0.5, seed: 1514 + i });
      c.fillStyle = 'rgba(236,222,202,.82)'; c.beginPath(); c.ellipse(px + 2, 786, 13, 15, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(50,42,34,.8)'; c.lineWidth = 1.8; c.stroke();
    }
    c.restore();
    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.95);
    Z.sunquan(c, lerp(760, 880, ap), 954, lerp(1.25, 1.8, ap), t, { raise: 0.2, sword: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '二宫', ss(1.2, 1.48, lt), { size: 88, seed: 82 });
  } };
})();

// ⑦ 晚年昏聩：猜忌杀戮，孤影独坐
SCENES['sq7_wannian'] = (() => {
  const p = () => Z.paper('sq7', '#d8ceb6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'sq7_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(34,32,34,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 175, tone: 0.32, seed: 651.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.36 });
    Z.mist(c, t, { y0: 580, y1: 900, n: 5, alpha: 0.34, speed: 14, seed: 1521 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 1523, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 独坐之榻
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.2, lt) * 0.85);
    c.fillStyle = 'rgba(110,84,54,.85)'; c.fillRect(560, 850, 300, 16);
    c.fillRect(580, 866, 12, 70); c.fillRect(830, 866, 12, 70);
    c.restore();
    const ap = ease.out(ss(0.3, 1.5, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    Z.sunquan(c, lerp(680, 720, ap), 848, lerp(1.2, 1.72, ap), t, { raise: 0, sword: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '晚年', ss(1.2, 1.48, lt), { size: 88, seed: 83 });
  } };
})();

// ⑧ 江东之主：五十二年，坐断东南
SCENES['sq8_jiangdong'] = (() => {
  const p = () => Z.paper('sq8', '#dbd2b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'sq8_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(34,36,38,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 175, tone: 0.3, seed: 661.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.water(c, t, { y0: 860, y1: 1060, tone: 0.3, seed: 131, rows: 5 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1531 });
    brush(c, [[0, 900], [520, 884], [1000, 906], [1320, 890]], { w: 18, tone: 0.72, dry: 0.62, seed: 1533 });
    // 吴旗
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.5, lt) * 0.65);
    Z.flag(c, 1420, 880, 300, t, { col: 'rgba(78,52,82,.8)', seed: 18 });
    c.restore();
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    Z.sunquan(c, lerp(560, 760, ap), 880, lerp(1.3, 1.9, ap), t, { raise: 0.35, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '江东', ss(1.2, 1.48, lt), { size: 88, seed: 84 });
  } };
})();
})();
