// 《诸葛亮》笔法与八幕：卧龙 —— 鹤氅（浅灰白）＋纶巾＋长须＋羽扇。
// 视觉辨识：素白鹤氅、青纶巾、三缕长须、白羽扇（非深墨谋臣袍、非武将甲）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 羽扇（白羽＋木柄）
Z.yushan = (c, x, y, ang, t, o = {}) => {
  const { r = 54 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, 92]], { w: 5, col: [118, 88, 54], tone: 0.9, dry: 0.35, seed: 8101 });
  // 羽片
  for (let i = 0; i < 9; i++) {
    const a = -Math.PI * 0.86 + i * (Math.PI * 0.72 / 8);
    c.strokeStyle = 'rgba(246,242,232,.92)'; c.lineWidth = 9; c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * r, Math.sin(a) * r - 6); c.stroke();
  }
  for (let i = 0; i < 9; i++) {
    const a = -Math.PI * 0.86 + i * (Math.PI * 0.72 / 8);
    c.strokeStyle = 'rgba(176,168,150,.5)'; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * r * 0.96, Math.sin(a) * r * 0.96 - 6); c.stroke();
  }
  c.fillStyle = 'rgba(120,90,56,.9)'; c.beginPath(); c.arc(0, 0, 7, 0, Math.PI * 2); c.fill();
  c.restore();
};

// 诸葛亮：孔明（o: { t, raise, flip, fan })
Z.zhugeliang = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, fan = 1 } = o;
  const br = Math.sin(t * 1.0) * 0.008;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.3);
  const hem = Math.sin(t * 1.2) * 5;
  // 腿
  brush(c, [[-16, -74], [-24, -34], [-30, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 8201, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [24, -34], [30, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 8202, head: 0.06, tail: 0.2 });
  // 鹤氅（浅灰白，宽大）
  c.fillStyle = 'rgba(232,228,218,.86)';
  c.beginPath();
  c.moveTo(-34, -168); c.quadraticCurveTo(-62, -84, -68 + hem, -2);
  c.quadraticCurveTo(0, 6 + hem * 0.3, 68 + hem * 0.7, -2); c.quadraticCurveTo(62, -86, 34, -168);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(92,88,78,.75)'; c.lineWidth = 2.6; c.stroke();
  // 鹤氅羽纹
  c.strokeStyle = 'rgba(150,146,134,.4)'; c.lineWidth = 1.5;
  for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(-50 + k * 6, -110 + k * 30); c.quadraticCurveTo(0, -96 + k * 30, 50 - k * 6, -110 + k * 30); c.stroke(); }
  // 腰绦
  brush(c, [[-34, -120], [0, -116], [34, -120]], { w: 10, col: [86, 96, 92], tone: 0.85, dry: 0.3, seed: 8231 });
  // 头
  c.save(); c.translate(2, -186);
  c.fillStyle = 'rgba(244,232,214,.97)';
  c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(50,44,36,.88)'; c.lineWidth = 2.1; c.stroke();
  // 纶巾（青巾）
  c.fillStyle = 'rgba(54,72,72,.92)';
  c.beginPath(); c.moveTo(-20, 1); c.quadraticCurveTo(-18, -24, 2, -28); c.quadraticCurveTo(22, -23, 21, 1);
  c.lineTo(15, 3); c.quadraticCurveTo(0, -9, -14, 3); c.closePath(); c.fill();
  brush(c, [[0, -28], [2, -46]], { w: 5, col: [54, 72, 72], tone: 0.9, dry: 0.3, seed: 8232 });
  // 目（清亮）
  c.fillStyle = 'rgba(252,250,244,.96)'; c.beginPath(); c.ellipse(6, -2, 4.6, 2.8, -0.06, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(20,20,18,.92)'; c.beginPath(); c.arc(7.2, -2, 2.05, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(26,22,18,.82)'; c.lineWidth = 1.7;
  c.beginPath(); c.moveTo(1, -5.8); c.quadraticCurveTo(7, -8, 12, -5.6); c.stroke();
  // 三缕长须
  const wf = Math.sin(t * 1.35) * 3.4;
  c.strokeStyle = 'rgba(46,42,38,.92)'; c.lineWidth = 3.4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-7, 10); c.quadraticCurveTo(-11 + wf * 0.3, 44, -6 + wf, 76); c.stroke();
  c.beginPath(); c.moveTo(5, 10); c.quadraticCurveTo(4, 46, 6 + wf * 0.6, 80); c.stroke();
  c.beginPath(); c.moveTo(-1, 11); c.quadraticCurveTo(-3, 40, 0 + wf * 0.4, 68); c.stroke();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  // 左臂自然下垂、右臂执扇：两臂不再同高，避免在胸前连成一条横杠
  brush(c, [[-30, -152], [-44 - 4 * rl, -126 - 8 * rl], [-50 - 6 * rl, -98 - 16 * rl]], { w: 12.5, col: [204, 198, 184], tone: 0.6, dry: 0.45, seed: 8203, head: 0.1, tail: 0.2 });
  brush(c, [[29, -152], [42, -134 - 4 * rl], [52, -116 - 10 * rl]], { w: 12, col: [204, 198, 184], tone: 0.6, dry: 0.45, seed: 8204, head: 0.1, tail: 0.2 });
  c.restore();
  if (fan) {
    Z.yushan(c, x + (flip ? -58 : 54) * s, y - 118 * s, flip ? 2.5 : 0.55, t, { r: 50 });
  }
};

// ① 隆中高卧：躬耕陇亩，抱膝长吟
SCENES['zg1_longzhong'] = (() => {
  const p = () => Z.paper('zg1', '#e9e3ce');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zg1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(84,78,64,.09)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 470, amp: 110, tone: 0.16, seed: 381.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    // 竹
    for (let i = 0; i < 3; i++) {
      const bx = 1280 + i * 90, sway = Math.sin(t * 0.8 + i) * 5;
      c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.6);
      brush(c, [[bx, 940], [bx + 6 + sway, 700], [bx + 10 + sway, 520]], { w: 8, tone: 0.62, dry: 0.5, seed: 8401 + i });
      c.restore();
    }
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1201 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1203, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhugeliang(c, lerp(420, 780, ap), 950, lerp(1.3, 2.05, ap), t, { raise: 0.15, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '卧龙', ss(1.0, 1.28, lt), { size: 88, seed: 53 });
  } };
})();

// ② 三顾出山：隆中对，三分天下
SCENES['zg2_sangu'] = (() => {
  const p = () => Z.paper('zg2', '#e7dfc9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zg2_bg', 0.45 + 0.55 * grow, (g) => {
      g.fillStyle = 'rgba(76,70,58,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2030, [{ y0: 460, amp: 126, tone: 0.18, seed: 391.6 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.78);
    c.fillStyle = 'rgba(176,158,124,.5)'; c.strokeStyle = 'rgba(58,48,36,.8)'; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(1180, 940); c.lineTo(1180, 780); c.lineTo(1300, 716); c.lineTo(1420, 780); c.lineTo(1420, 940); c.closePath(); c.fill(); c.stroke();
    c.restore();
    Z.mist(c, t, { y0: 500, y1: 740, n: 3, alpha: 0.28, speed: 26, seed: 1211 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1213, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhugeliang(c, lerp(400, 740, ap), 950, lerp(1.3, 2.0, ap), t, { raise: 0.65, fan: 1 });
    c.restore();
    // 玄德之影
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.0, lt) * 0.55);
    brush(c, [[1480, 950], [1486, 802]], { w: 38, tone: 0.46, dry: 0.5, seed: 1214 });
    c.fillStyle = 'rgba(240,226,204,.85)'; c.beginPath(); c.ellipse(1486, 790, 14, 16, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(52,44,34,.8)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
    Z.seal(c, 1762, 952, '隆中', ss(1.0, 1.28, lt), { size: 88, seed: 54 });
  } };
})();

// ③ 赤壁借风：筑坛祈风，一炬破曹
SCENES['zg3_chibi'] = (() => {
  const p = () => Z.paper('zg3', '#ded5bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zg3_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(44,44,50,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 150, tone: 0.28, seed: 401.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.32 });
    Z.water(c, t, { y0: 780, y1: 1060, tone: 0.38, seed: 61, rows: 6 });
    // 七星坛
    c.save(); c.globalAlpha = clamp(ss(0, 1.0, lt) * 0.85);
    c.fillStyle = 'rgba(150,132,102,.6)';
    c.fillRect(660, 720, 300, 24); c.fillRect(700, 744, 220, 22);
    c.strokeStyle = 'rgba(56,46,34,.8)'; c.lineWidth = 2.2;
    c.strokeRect(660, 720, 300, 24); c.strokeRect(700, 744, 220, 22);
    // 七旗
    for (let i = 0; i < 5; i++) { c.fillStyle = 'rgba(56,84,96,.8)'; c.fillRect(680 + i * 62, 640, 10, 82); }
    c.restore();
    // 风纹
    c.save(); c.globalAlpha = clamp(ss(0.8, 2.2, lt) * 0.4);
    for (let k = 0; k < 4; k++) {
      c.strokeStyle = 'rgba(60,72,84,.5)'; c.lineWidth = 2.4;
      c.beginPath(); c.moveTo(1050 + k * 20, 460 + k * 60);
      c.bezierCurveTo(1250 + k * 20, 420 + k * 60, 1420, 500 + k * 60, 1620, 460 + k * 60); c.stroke();
    }
    c.restore();
    Z.mist(c, t, { y0: 600, y1: 840, n: 4, alpha: 0.28, speed: 34, seed: 1221 });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhugeliang(c, lerp(620, 810, ap), 720, lerp(1.1, 1.62, ap), t, { raise: 0.9, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '借风', ss(1.0, 1.28, lt), { size: 88, seed: 55 });
  } };
})();

// ④ 白帝托孤：受遗诏，鞠躬尽瘁
SCENES['zg4_tuogu'] = (() => {
  const p = () => Z.paper('zg4', '#ddd4bc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zg4_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(40,34,32,.22)'; g.fillRect(0, 0, 1920, 1080);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.0, lt) * 0.85);
    c.fillStyle = 'rgba(126,94,58,.88)'; c.fillRect(900, 820, 400, 20);
    c.fillRect(920, 840, 14, 90); c.fillRect(1266, 840, 14, 90);
    c.restore();
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.4, lt) * 0.7);
    c.fillStyle = 'rgba(206,142,64,.6)'; c.beginPath(); c.arc(700, 700, 32 + Math.sin(t * 3.1) * 4, 0, Math.PI * 2); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 620, y1: 860, n: 3, alpha: 0.26, speed: 18, seed: 1231 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1233, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.zhugeliang(c, lerp(1000, 1120, ap), 950, lerp(1.2, 1.85, ap), t, { raise: 0.9, fan: 0, flip: 1 });
    c.restore();
    // 榻上玄德之影
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.55);
    c.fillStyle = 'rgba(212,196,164,.6)';
    c.beginPath(); c.ellipse(900, 790, 62, 28, -0.12, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(240,226,204,.8)'; c.beginPath(); c.arc(828, 776, 15, 0, Math.PI * 2); c.fill();
    c.restore();
    Z.seal(c, 1762, 952, '托孤', ss(1.2, 1.48, lt), { size: 88, seed: 56 });
  } };
})();

// ⑤ 五月渡泸：深入不毛，平定南中
SCENES['zg5_lu'] = (() => {
  const p = () => Z.paper('zg5', '#dfd7c1');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zg5_bg', 0.32 + 0.68 * grow, (g) => {
      g.fillStyle = 'rgba(56,58,52,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 160, tone: 0.26, seed: 411.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    // 泸水
    Z.water(c, t, { y0: 760, y1: 1060, tone: 0.4, seed: 71, rows: 7 });
    // 瘴气
    Z.mist(c, t, { y0: 560, y1: 800, n: 5, alpha: 0.34, speed: 28, seed: 1241 });
    brush(c, [[0, 900], [520, 884], [980, 906], [1300, 890]], { w: 18, tone: 0.7, dry: 0.62, seed: 1243 });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhugeliang(c, lerp(420, 780, ap), 760, lerp(1.15, 1.72, ap), t, { raise: 0.4, fan: 1 });
    c.restore();
    // 竹筏
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.75);
    brush(c, [[600, 850], [860, 840], [1080, 852]], { w: 12, col: [126, 96, 58], tone: 0.85, dry: 0.5, seed: 1244 });
    c.restore();
    Z.seal(c, 1762, 952, '渡泸', ss(1.0, 1.28, lt), { size: 88, seed: 57 });
  } };
})();

// ⑥ 六出祁山：屡以弱攻强，粮尽而还
SCENES['zg6_qishan'] = (() => {
  const p = () => Z.paper('zg6', '#e0d7c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zg6_bg', 0.32 + 0.68 * grow, (g) => {
      g.fillStyle = 'rgba(54,50,46,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 175, tone: 0.28, seed: 421.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    // 山道
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.6);
    brush(c, [[180, 950], [620, 900], [1060, 870], [1400, 830]], { w: 28, tone: 0.5, dry: 0.72, seed: 1251 });
    c.restore();
    Z.mist(c, t, { y0: 540, y1: 820, n: 4, alpha: 0.3, speed: 26, seed: 1253 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1255, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhugeliang(c, lerp(420, 780, ap), 930, lerp(1.25, 1.95, ap), t, { raise: 0.55, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '祁山', ss(1.0, 1.28, lt), { size: 88, seed: 58 });
  } };
})();

// ⑦ 五丈原：秋风瑟瑟，将星欲坠
SCENES['zg7_wuzhang'] = (() => {
  const p = () => Z.paper('zg7', '#d8cfb8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'zg7_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(38,34,34,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 170, tone: 0.3, seed: 431.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    // 军帐
    c.save(); c.globalAlpha = clamp(ss(0, 1.0, lt) * 0.82);
    c.fillStyle = 'rgba(150,136,112,.5)'; c.strokeStyle = 'rgba(50,44,36,.85)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(1080, 940); c.lineTo(1080, 700); c.lineTo(1280, 620); c.lineTo(1480, 700); c.lineTo(1480, 940); c.closePath(); c.fill(); c.stroke();
    c.restore();
    // 帐中灯
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.5, lt) * 0.62);
    c.fillStyle = 'rgba(204,140,62,.55)'; c.beginPath(); c.arc(1280, 820, 30 + Math.sin(t * 2.8) * 5, 0, Math.PI * 2); c.fill();
    c.restore();
    // 将星
    c.save(); c.globalAlpha = clamp(ss(0.6, 2.0, lt) * 0.7);
    c.fillStyle = 'rgba(240,236,220,.8)';
    c.beginPath(); c.arc(1520, 240, 7 + Math.sin(t * 2.2) * 2, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(240,236,220,.4)'; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(1520, 208); c.lineTo(1520, 272); c.moveTo(1488, 240); c.lineTo(1552, 240); c.stroke();
    c.restore();
    Z.mist(c, t, { y0: 580, y1: 880, n: 5, alpha: 0.34, speed: 18, seed: 1261 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 1263, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.3, 1.5, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.0);
    Z.zhugeliang(c, lerp(460, 700, ap), 954, lerp(1.3, 1.9, ap), t, { raise: 0.2, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '五丈原', ss(1.2, 1.48, lt), { size: 88, seed: 59 });
  } };
})();

// ⑧ 星落秋风：出师未捷，长使英雄泪满襟
SCENES['zg8_xingluo'] = (() => {
  const p = () => Z.paper('zg8', '#d6cdb6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.6, lt);
    Z.wash(c, 'zg8_bg', 0.18 + 0.82 * grow, (g) => {
      g.fillStyle = 'rgba(32,32,34,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 180, tone: 0.32, seed: 441.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.36 });
    // 流星
    c.save(); c.globalAlpha = clamp(ss(0.5, 2.2, lt) * 0.8);
    c.strokeStyle = 'rgba(246,242,230,.7)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(1180, 180); c.lineTo(1420, 430); c.stroke();
    c.strokeStyle = 'rgba(246,242,230,.28)'; c.lineWidth = 6;
    c.beginPath(); c.moveTo(1120, 140); c.lineTo(1400, 420); c.stroke();
    c.restore();
    Z.mist(c, t, { y0: 580, y1: 900, n: 5, alpha: 0.34, speed: 14, seed: 1271 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 1273, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.4, 1.8, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.85);
    Z.zhugeliang(c, lerp(640, 800, ap), 956, lerp(1.3, 1.82, ap), t, { raise: 0.1, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '星落', ss(1.2, 1.48, lt), { size: 88, seed: 60 });
  } };
})();
})();
