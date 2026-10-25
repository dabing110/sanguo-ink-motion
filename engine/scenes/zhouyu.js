// 《周瑜》笔法与八幕：美周郎 —— 月白儒将甲＋束发银冠＋长剑。
// 视觉辨识：月白／银灰甲胄（轻甲儒将，非重甲）、银冠束发、常伴长剑与琴（非羽扇、非画戟）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 长剑（佩剑）
Z.sword = (c, x, y, ang, len = 280, t = 0, o = {}) => {
  len = Math.min(len, (y - 84) / Math.max(Math.cos(ang), 0.45) - 40);
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, 56]], { w: 10, col: [92, 70, 44], tone: 0.9, dry: 0.3, seed: 9101 });
  c.fillStyle = 'rgba(212,218,224,.94)'; c.strokeStyle = 'rgba(28,30,34,.9)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-8, 0); c.lineTo(8, 0); c.lineTo(5, -len); c.lineTo(0, -len - 24); c.lineTo(-5, -len); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(80,86,94,.5)'; c.lineWidth = 1.3;
  c.beginPath(); c.moveTo(0, -8); c.lineTo(0, -len + 6); c.stroke();
  c.fillStyle = 'rgba(196,204,214,.95)'; c.fillRect(-15, -4, 30, 7);
  brush(c, [[0, 56], [-5, 90]], { w: 4, col: [92, 116, 140], tone: 0.88, dry: 0.3, seed: 9102 });
  c.restore();
};

// 周瑜：公瑾（o: { t, raise, flip, sword })
Z.zhouyu = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, sword = 1 } = o;
  const br = Math.sin(t * 1.15) * 0.009;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.35);
  const hem = Math.sin(t * 1.45) * 5;
  // 腿
  brush(c, [[-17, -74], [-26, -34], [-32, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 9201, head: 0.06, tail: 0.2 });
  brush(c, [[17, -74], [26, -34], [32, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 9202, head: 0.06, tail: 0.2 });
  // 月白甲（冷银蓝，比纸底压一档；月白＝淡青白，不等于浅灰）
  const ARMOR = 'rgba(168,180,196,.95)';
  const armourPath = (g) => {
    g.beginPath();
    g.moveTo(-31, -166); g.quadraticCurveTo(-56, -86, -62 + hem, -2);
    g.quadraticCurveTo(0, 6 + hem * 0.3, 62 + hem * 0.7, -2); g.quadraticCurveTo(56, -88, 31, -166);
    g.closePath();
  };
  c.fillStyle = ARMOR; armourPath(c); c.fill();
  c.strokeStyle = 'rgba(32,42,54,.92)'; c.lineWidth = 3.4; c.stroke();
  // 明暗：右侧受光留月白，左侧与下摆压深（原来全身一个平值，和纸底糊在一起）
  c.save(); armourPath(c); c.clip();
  c.fillStyle = 'rgba(126,140,160,.62)'; c.fillRect(-72, -60, 84, 74);
  c.fillStyle = 'rgba(140,154,172,.5)'; c.fillRect(-72, -170, 46, 180);
  c.fillStyle = 'rgba(230,236,244,.8)';
  c.beginPath(); c.ellipse(14, -126, 19, 32, 0.18, 0, Math.PI * 2); c.fill();
  c.restore();
  // 甲片（鱼鳞横排＋竖向缀线）
  c.strokeStyle = 'rgba(62,78,96,.68)'; c.lineWidth = 2;
  for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-52, -26 - k * 24); c.quadraticCurveTo(0, -16 - k * 24, 52, -26 - k * 24); c.stroke(); }
  c.strokeStyle = 'rgba(62,78,96,.34)'; c.lineWidth = 1.3;
  for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 17, -168); c.quadraticCurveTo(k * 21, -86, k * 25, -8); c.stroke(); }
  // 护心镜
  c.fillStyle = 'rgba(188,200,216,.97)'; c.strokeStyle = 'rgba(32,42,54,.92)'; c.lineWidth = 2.4;
  c.beginPath(); c.arc(0, -132, 14, 0, Math.PI * 2); c.fill(); c.stroke();
  c.fillStyle = 'rgba(104,120,142,.75)'; c.beginPath(); c.arc(0, -132, 6.2, 0, Math.PI * 2); c.fill();
  // 青绦
  brush(c, [[-33, -110], [0, -106], [33, -110]], { w: 11, col: [54, 88, 114], tone: 0.94, dry: 0.3, seed: 9231 });
  // 肩甲（兽吞）
  c.fillStyle = 'rgba(174,186,202,.97)'; c.strokeStyle = 'rgba(32,42,54,.9)'; c.lineWidth = 2.2;
  c.beginPath(); c.ellipse(-42, -156, 18, 13, 0.2, 0, Math.PI * 2); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(42, -156, 18, 13, -0.2, 0, Math.PI * 2); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(52,66,84,.6)'; c.lineWidth = 1.6;
  c.beginPath(); c.arc(-42, -156, 8, 0.3, Math.PI * 1.4); c.stroke();
  c.beginPath(); c.arc(42, -156, 8, 0.2, Math.PI * 1.3); c.stroke();
  // 头（俊朗）
  c.save(); c.translate(2, -186);
  c.fillStyle = 'rgba(246,234,216,.97)';
  c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(56,48,40,.88)'; c.lineWidth = 2.1; c.stroke();
  // 银冠
  c.fillStyle = 'rgba(206,210,216,.96)';
  c.beginPath(); c.moveTo(-18, 0); c.lineTo(-12, -20); c.lineTo(2, -26); c.lineTo(16, -18); c.lineTo(18, 0);
  c.quadraticCurveTo(0, -8, -18, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(96,102,112,.85)'; c.lineWidth = 1.6; c.stroke();
  brush(c, [[0, -26], [1, -44]], { w: 4.5, col: [206,210,216], tone: 0.9, dry: 0.3, seed: 9232 });
  // 目（英朗）
  c.fillStyle = 'rgba(252,250,244,.96)'; c.beginPath(); c.ellipse(6.4, -2, 4.6, 2.8, -0.06, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(22,20,18,.92)'; c.beginPath(); c.arc(7.6, -2, 2.05, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,22,18,.84)'; c.lineWidth = 1.7;
  c.beginPath(); c.moveTo(1, -5.6); c.quadraticCurveTo(7, -7.8, 12, -5.4); c.stroke();
  // 短须（美髯）
  const wf = Math.sin(t * 1.4) * 2.4;
  c.strokeStyle = 'rgba(40,34,30,.9)'; c.lineWidth = 2.8; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-6, 10); c.quadraticCurveTo(-3, 26 + wf * 0.3, 4, 16 + wf); c.stroke();
  c.restore();
  // 双臂：左臂下垂（原两臂同高，在浅甲上成一根黑横杠），右臂外伸执剑
  const rl = ease.out(clamp(raise));
  brush(c, [[-28, -146], [-46 - 2 * rl, -110 - 8 * rl], [-46 - 4 * rl, -64 - 16 * rl]], { w: 13, tone: 0.52, dry: 0.45, seed: 9203, head: 0.1, tail: 0.2 });
  brush(c, [[30, -146], [54, -132], [74, -110]], { w: 12, tone: 0.52, dry: 0.45, seed: 9204, head: 0.1, tail: 0.2 });
  c.restore();
  if (sword) {
    Z.sword(c, x + (flip ? -74 : 74) * s, y - 106 * s, flip ? -0.24 : 0.24, 296 * s, t);
  }
};

// ① 庐江少年：与伯符同岁，相友善
SCENES['zy1_lujiang'] = (() => {
  const p = () => Z.paper('zy1', '#e9e3ce');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zy1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(84,78,64,.09)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 470, amp: 104, tone: 0.16, seed: 451.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1301 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1303, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhouyu(c, lerp(420, 780, ap), 950, lerp(1.3, 2.05, ap), t, { raise: 0.3, sword: 1 });
    c.restore();
    // 孙策之影
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.9, lt) * 0.55);
    brush(c, [[1240, 948], [1246, 800]], { w: 38, tone: 0.46, dry: 0.5, seed: 1304 });
    c.fillStyle = 'rgba(240,226,204,.85)'; c.beginPath(); c.ellipse(1246, 788, 14, 16, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(52,44,34,.8)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
    Z.seal(c, 1762, 952, '公瑾', ss(1.0, 1.28, lt), { size: 88, seed: 61 });
  } };
})();

// ② 辅佐孙策：二十四岁，定江东
SCENES['zy2_sunce'] = (() => {
  const p = () => Z.paper('zy2', '#e5dcc4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zy2_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(66,58,48,.13)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 136, tone: 0.22, seed: 461.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.26 });
    Z.mist(c, t, { y0: 500, y1: 760, n: 3, alpha: 0.28, speed: 30, seed: 1311 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 1313, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    for (let i = 0; i < 2; i++) {
      c.save(); c.globalAlpha = clamp(ss(0.3 + i * 0.1, 1.3, lt) * 0.7);
      Z.flag(c, 1140 + i * 140, 900 - i * 16, 250 - i * 20, t, { col: 'rgba(72,106,128,.72)', seed: 14 + i });
      c.restore();
    }
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhouyu(c, lerp(400, 760, ap), 952, lerp(1.3, 2.05, ap), t, { raise: 0.7, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '江东', ss(1.0, 1.28, lt), { size: 88, seed: 62 });
  } };
})();

// ③ 赤壁火攻：东风起，火船冲阵
SCENES['zy3_chibi'] = (() => {
  const p = () => Z.paper('zy3', '#d9d0b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zy3_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(46,38,36,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 165, tone: 0.32, seed: 471.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.water(c, t, { y0: 740, y1: 1060, tone: 0.44, seed: 81, rows: 7 });
    // 火船冲阵
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.8, lt) * 0.66);
    for (let i = 0; i < 5; i++) {
      const fx = 980 + i * 132, fh = 150 + Math.sin(t * 2.2 + i * 0.8) * 48;
      c.fillStyle = 'rgba(192,76,38,.32)';
      c.beginPath(); c.moveTo(fx - 32, 830); c.quadraticCurveTo(fx - 6, 830 - fh, fx, 830 - fh * 1.18);
      c.quadraticCurveTo(fx + 8, 830 - fh, fx + 32, 830); c.closePath(); c.fill();
      c.fillStyle = 'rgba(40,34,30,.72)'; c.fillRect(fx - 38, 840, 76, 14);
    }
    c.restore();
    // 风纹
    c.save(); c.globalAlpha = clamp(ss(0.6, 2.0, lt) * 0.35);
    for (let k = 0; k < 3; k++) {
      c.strokeStyle = 'rgba(60,70,82,.5)'; c.lineWidth = 2.2;
      c.beginPath(); c.moveTo(1080, 440 + k * 70);
      c.bezierCurveTo(1280, 410 + k * 70, 1460, 480 + k * 70, 1660, 440 + k * 70); c.stroke();
    }
    c.restore();
    brush(c, [[0, 900], [520, 884], [1000, 906], [1320, 890]], { w: 18, tone: 0.7, dry: 0.62, seed: 1323 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhouyu(c, lerp(420, 740, ap), 760, lerp(1.1, 1.65, ap), t, { raise: 0.9, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '赤壁', ss(1.0, 1.28, lt), { size: 88, seed: 63 });
  } };
})();

// ④ 南郡中箭：流矢及身，仍督战
SCENES['zy4_nanjun'] = (() => {
  const p = () => Z.paper('zy4', '#ded4bc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zy4_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(54,46,42,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 150, tone: 0.26, seed: 481.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.75);
    Z.wall(c, 1420, 910, 0.66, t, { flag: 0, seed: 13 });
    c.restore();
    Z.mist(c, t, { y0: 540, y1: 800, n: 3, alpha: 0.28, speed: 26, seed: 1331 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1333, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhouyu(c, lerp(420, 780, ap), 952, lerp(1.3, 2.05, ap), t, { raise: 0.55, sword: 1 });
    c.restore();
    // 箭
    c.save(); c.globalAlpha = clamp(ss(1.2, 2.2, lt) * 0.8);
    Z.arrow(c, 880, 700, 0.8, 150, 0.9);
    c.restore();
    Z.seal(c, 1762, 952, '中矢', ss(1.0, 1.28, lt), { size: 88, seed: 64 });
  } };
})();

// ⑤ 借荆州：久争不决，心不能平
SCENES['zy5_jingzhou'] = (() => {
  const p = () => Z.paper('zy5', '#e6ddc7');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zy5_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(74,66,54,.11)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2030, [{ y0: 460, amp: 120, tone: 0.2, seed: 491.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    Z.mist(c, t, { y0: 500, y1: 740, n: 3, alpha: 0.28, speed: 26, seed: 1341 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1343, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 案与文书
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.3, lt) * 0.88);
    c.fillStyle = 'rgba(120,86,50,.9)'; c.fillRect(1040, 850, 300, 14);
    c.fillRect(1060, 864, 12, 60); c.fillRect(1310, 864, 12, 60);
    c.fillStyle = 'rgba(226,214,186,.9)'; c.fillRect(1080, 826, 120, 24);
    c.strokeStyle = 'rgba(90,70,44,.7)'; c.lineWidth = 1.8; c.strokeRect(1080, 826, 120, 24);
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.zhouyu(c, lerp(420, 760, ap), 952, lerp(1.3, 2.0, ap), t, { raise: 0.45, sword: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '荆州', ss(1.0, 1.28, lt), { size: 88, seed: 65 });
  } };
})();

// ⑥ 既生瑜何生亮：仰天长叹
SCENES['zy6_jisheng'] = (() => {
  const p = () => Z.paper('zy6', '#dcd2b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zy6_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(42,36,34,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 170, tone: 0.3, seed: 501.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 540, y1: 840, n: 4, alpha: 0.32, speed: 20, seed: 1351 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 1353, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.zhouyu(c, lerp(460, 780, ap), 954, lerp(1.3, 2.0, ap), t, { raise: 0.95, sword: 0 });
    c.restore();
    // 长叹之气
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.2, lt) * 0.4);
    for (let k = 0; k < 3; k++) {
      c.strokeStyle = 'rgba(220,216,206,.5)'; c.lineWidth = 2.4;
      c.beginPath(); c.arc(900, 690, 40 + k * 34, -1.5, -0.2); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '长叹', ss(1.0, 1.28, lt), { size: 88, seed: 66 });
  } };
})();

// ⑦ 巴丘病卒：舟中灯尽，年三十六
SCENES['zy7_baqiu'] = (() => {
  const p = () => Z.paper('zy7', '#d8ceb6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'zy7_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(36,34,36,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 170, tone: 0.32, seed: 511.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.36 });
    Z.water(c, t, { y0: 820, y1: 1060, tone: 0.38, seed: 91, rows: 6 });
    // 孤舟
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.85);
    brush(c, [[760, 856], [1000, 844], [1220, 860]], { w: 18, col: [112, 84, 52], tone: 0.85, dry: 0.45, seed: 1361 });
    brush(c, [[980, 844], [986, 700]], { w: 7, tone: 0.7, dry: 0.4, seed: 1362 });
    // 灯
    c.fillStyle = 'rgba(204,140,62,.55)'; c.beginPath(); c.arc(1100, 790, 26 + Math.sin(t * 2.6) * 4, 0, Math.PI * 2); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 620, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1363 });
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.6, lt) * 0.9);
    Z.zhouyu(c, lerp(880, 940, 1.0), 846, 1.18, t, { raise: 0, sword: 0, flip: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '巴丘', ss(1.2, 1.48, lt), { size: 88, seed: 67 });
  } };
})();

// ⑧ 儒将风流：曲有误，周郎顾
SCENES['zy8_fengliu'] = (() => {
  const p = () => Z.paper('zy8', '#e3dac2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'zy8_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(36,36,38,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 170, tone: 0.3, seed: 521.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1371 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 1373, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 琴
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.8);
    c.fillStyle = 'rgba(118,86,52,.9)';
    c.beginPath(); c.moveTo(1020, 860); c.quadraticCurveTo(1180, 840, 1340, 862); c.lineTo(1336, 884); c.quadraticCurveTo(1180, 862, 1024, 882); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(60,46,30,.8)'; c.lineWidth = 2; c.stroke();
    for (let i = 0; i < 7; i++) {
      c.strokeStyle = 'rgba(226,216,190,.6)'; c.lineWidth = 1;
      c.beginPath(); c.moveTo(1024 + i * 2, 862 + i * 2.6); c.lineTo(1336 + i * 2, 864 + i * 2.6); c.stroke();
    }
    c.restore();
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    Z.zhouyu(c, lerp(600, 760, ap), 956, lerp(1.3, 1.9, ap), t, { raise: 0.3, sword: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '周郎', ss(1.2, 1.48, lt), { size: 88, seed: 68 });
  } };
})();
})();
