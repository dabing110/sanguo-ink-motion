// 《刘备》笔法与八幕：昭烈帝 —— 米黄仁君袍＋垂肩大耳＋短须＋拱手（无兵刃）。
// 视觉辨识：浅褐米黄布袍、双耳垂肩、常作拱手礼、全系列唯一"不持兵器"的主君造型。
// v2 重排：加 kneel（坐/跪）· back（背影）· walk（行走）三种姿态，八幕拉开景别与机位，
//          桃园/托孤两幕直接复用关羽·张飞·诸葛亮真身，不再用灰影代替。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 刘备：玄德（o: { raise, flip, hands, kneel, back, walk, tone }）
Z.liubei = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, hands = 1, kneel = 0, back = 0, walk = 0, tone = 1 } = o;
  const br = Math.sin(t * 1.0) * 0.009;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.35);
  if (tone !== 1) c.globalAlpha *= tone;
  const hem = Math.sin(t * 1.25) * 5;

  // ── 腿 ──────────────────────────────────────────────
  if (kneel) {
    // 盘膝：两折腿贴地
    brush(c, [[-26, -54], [-52, -22], [-30, -2]], { w: 22, tone: 0.82, dry: 0.5, seed: 7201, head: 0.06, tail: 0.2 });
    brush(c, [[26, -54], [52, -22], [30, -2]], { w: 22, tone: 0.82, dry: 0.5, seed: 7202, head: 0.06, tail: 0.2 });
    c.save(); c.scale(1, 0.84);      // 坐姿：躯干整体压低
  } else if (walk) {
    brush(c, [[-18, -74], [-44, -40], [-56, -2]], { w: 18, tone: 0.82, dry: 0.5, seed: 7201, head: 0.06, tail: 0.2 });
    brush(c, [[18, -74], [34, -34], [24, -2]], { w: 18, tone: 0.82, dry: 0.5, seed: 7202, head: 0.06, tail: 0.2 });
  } else {
    brush(c, [[-17, -74], [-26, -34], [-32, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 7201, head: 0.06, tail: 0.2 });
    brush(c, [[17, -74], [26, -34], [32, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 7202, head: 0.06, tail: 0.2 });
  }

  // ── 米黄布袍 ────────────────────────────────────────
  const sp = kneel ? 14 : 0;         // 坐姿下摆摊开
  c.fillStyle = 'rgba(212,196,164,.78)';
  c.beginPath();
  c.moveTo(-30, -166); c.quadraticCurveTo(-54 - sp, -86, -60 - sp + hem, -2);
  c.quadraticCurveTo(0, 6 + hem * 0.3, 60 + sp + hem * 0.7, -2);
  c.quadraticCurveTo(54 + sp, -88, 30, -166);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(74,58,40,.85)'; c.lineWidth = 2.8; c.stroke();
  // 袍缘
  c.strokeStyle = 'rgba(122,96,60,.5)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-28, -164); c.quadraticCurveTo(-48 - sp, -88, -54 - sp, -8); c.stroke();
  c.beginPath(); c.moveTo(28, -164); c.quadraticCurveTo(48 + sp, -88, 54 + sp, -8); c.stroke();
  // 布带
  brush(c, [[-32, -120], [0, -116], [32, -120]], { w: 11, col: [138, 106, 66], tone: 0.85, dry: 0.3, seed: 7231 });

  // ── 头 ──────────────────────────────────────────────
  c.save(); c.translate(2, -186);
  if (back) {
    // 背影：不画五官，只见软巾与发髻
    c.fillStyle = 'rgba(232,214,190,.95)';
    c.beginPath(); c.ellipse(-16, 5, 6, 12, 0.18, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(16, 5, 6, 12, -0.18, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(60,50,40,.95)';
    c.beginPath(); c.ellipse(0, 0, 17, 19.5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(26,20,14,.9)'; c.lineWidth = 2.1; c.stroke();
    c.fillStyle = 'rgba(150,120,72,.9)';
    c.beginPath(); c.ellipse(0, -14, 9, 7, 0, 0, Math.PI * 2); c.fill();   // 髻
    c.fillStyle = 'rgba(72,60,46,.9)'; c.fillRect(-18, -4, 36, 5);          // 巾带
  } else {
    // 大耳（垂肩）
    c.fillStyle = 'rgba(232,214,190,.95)';
    c.beginPath(); c.ellipse(-17, 4, 6, 13, 0.18, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(17, 4, 6, 13, -0.18, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,56,42,.8)'; c.lineWidth = 1.6; c.stroke();
    c.fillStyle = 'rgba(240,226,204,.97)';
    c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(58,46,36,.88)'; c.lineWidth = 2.1; c.stroke();
    // 软巾
    c.fillStyle = 'rgba(72,60,46,.9)';
    c.beginPath(); c.moveTo(-19, 0); c.quadraticCurveTo(-17, -24, 2, -27); c.quadraticCurveTo(21, -23, 21, 0);
    c.lineTo(16, 2); c.quadraticCurveTo(0, -9, -14, 2); c.closePath(); c.fill();
    c.fillStyle = 'rgba(150,120,72,.85)'; c.fillRect(-17, -3, 34, 4);
    // 目（温厚）
    c.fillStyle = 'rgba(252,248,240,.95)'; c.beginPath(); c.ellipse(6, -2, 4.4, 2.8, -0.08, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(26,20,16,.9)'; c.beginPath(); c.arc(7.2, -2, 2, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(30,22,16,.8)'; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(1, -5.6); c.quadraticCurveTo(7, -7.6, 12, -5.4); c.stroke();
    // 短须
    const wf = Math.sin(t * 1.4) * 2;
    c.strokeStyle = 'rgba(56,44,34,.9)'; c.lineWidth = 2.8; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-7, 9); c.quadraticCurveTo(-2, 24 + wf * 0.3, 6, 15 + wf); c.stroke();
    c.beginPath(); c.moveTo(-11, 6); c.quadraticCurveTo(-13, 17, -9, 23); c.stroke();
  }
  c.restore();

  // ── 双臂 ────────────────────────────────────────────
  const rl = ease.out(clamp(raise));
  if (back) {
    brush(c, [[-28, -150], [-42, -122], [-44, -96]], { w: 13, tone: 0.6, dry: 0.45, seed: 7205, head: 0.1, tail: 0.2 });
    brush(c, [[28, -150], [42, -122], [44, -96]], { w: 12, tone: 0.6, dry: 0.45, seed: 7206, head: 0.1, tail: 0.2 });
  } else if (hands) {
    brush(c, [[-28, -148], [-10, -132 - 8 * rl], [8, -126 - 12 * rl]], { w: 13, tone: 0.6, dry: 0.45, seed: 7203, head: 0.1, tail: 0.2 });
    brush(c, [[28, -148], [10, -134 - 6 * rl], [-6, -128 - 10 * rl]], { w: 13, tone: 0.6, dry: 0.45, seed: 7204, head: 0.1, tail: 0.2 });
    c.fillStyle = 'rgba(236,220,198,.95)';
    c.beginPath(); c.ellipse(0, -128 - 11 * rl, 11, 8, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,56,42,.8)'; c.lineWidth = 1.6; c.stroke();
  } else {
    brush(c, [[-30, -150], [-48, -132], [-58, -110]], { w: 13, tone: 0.6, dry: 0.45, seed: 7205, head: 0.1, tail: 0.2 });
    brush(c, [[30, -150], [46, -132], [54, -110]], { w: 12, tone: 0.6, dry: 0.45, seed: 7206, head: 0.1, tail: 0.2 });
  }

  if (kneel) c.restore();            // 解除躯干压低
  c.restore();
};

// 通用：地线与压地薄雾
const ground = (c, lt, seed, y = 950, toneV = 0.78) =>
  brush(c, [[0, y], [660, y - 8], [1320, y + 4], [1920, y - 10]],
    { w: 13, tone: toneV, dry: 0.74, seed, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

// ① 织席贩履：近景。人靠右，席与草鞋摊在左前，孤贫可见
SCENES['lb1_zhixi'] = (() => {
  const p = () => Z.paper('lb1', '#eae2cc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(86,74,58,.09)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 480, amp: 92, tone: 0.15, seed: 311.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1101 });
    ground(c, lt, 1103);

    // 席（左前，压地）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.2, lt) * 0.9);
    c.fillStyle = 'rgba(202,180,132,.92)';
    c.beginPath(); c.moveTo(360, 906); c.lineTo(880, 888); c.lineTo(946, 946); c.lineTo(404, 970); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(104,80,48,.85)'; c.lineWidth = 2.6; c.stroke();
    c.strokeStyle = 'rgba(120,96,60,.55)'; c.lineWidth = 1.6;
    for (let i = 1; i < 10; i++) { c.beginPath(); c.moveTo(370 + i * 52, 902); c.lineTo(414 + i * 53, 966); c.stroke(); }
    for (let i = 1; i < 4; i++) { c.beginPath(); c.moveTo(360 + i * 4, 906 + i * 16); c.lineTo(880 + i * 5, 888 + i * 14); c.stroke(); }
    c.restore();
    // 编好的草鞋三只
    c.save(); c.globalAlpha = clamp(ss(0.9, 1.7, lt) * 0.8);
    for (let i = 0; i < 3; i++) {
      const sx = 1020 + i * 74;
      c.fillStyle = 'rgba(150,120,70,.75)';
      c.beginPath(); c.ellipse(sx, 962 - i * 3, 26, 9, -0.16, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(90,70,42,.75)'; c.lineWidth = 1.4; c.stroke();
    }
    c.restore();

    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.liubei(c, lerp(1120, 1330, ap), 966, lerp(1.9, 2.5, ap), t, { raise: 0.18 });
    c.restore();
    Z.seal(c, 1762, 952, '玄德', ss(1.0, 1.28, lt), { size: 88, seed: 45 });
  } };
})();

// ② 桃园结义：三人并列真身，桃枝花落
SCENES['lb2_taoyuan'] = (() => {
  const p = () => Z.paper('lb2', '#eae0c6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb2_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(92,78,58,.08)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 480, amp: 90, tone: 0.14, seed: 321.6 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.2 });
    // 桃树两株
    for (let i = 0; i < 2; i++) {
      const bx = 210 + i * 1450, sway = Math.sin(t * 0.9 + i) * 6;
      c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.6);
      brush(c, [[bx, 944], [bx + 8, 760], [bx + 30 + sway, 592]], { w: 17, tone: 0.72, dry: 0.5, seed: 1111 + i });
      c.fillStyle = 'rgba(206,132,140,.4)';
      for (let k = 0; k < 16; k++) {
        const rx = bx + 30 + sway + (rng(i * 31 + k) - 0.5) * 260;
        const ry = 570 + (rng(i * 53 + k) - 0.5) * 170;
        c.beginPath(); c.arc(rx, ry, 5 + rng(k) * 5, 0, Math.PI * 2); c.fill();
      }
      c.restore();
    }
    Z.mist(c, t, { y0: 500, y1: 720, n: 3, alpha: 0.26, speed: 26, seed: 1121 });
    ground(c, lt, 1123);

    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    // 关（左）· 刘（中，略前）· 张（右）
    Z.guanyu(c, lerp(420, 520, ap), 952, lerp(1.32, 1.5, ap), t, { raise: 0.35 });
    Z.zhangfei(c, lerp(1460, 1420, ap), 954, lerp(1.24, 1.42, ap), t, { raise: 0.3 });
    Z.liubei(c, lerp(880, 940, ap), 976, lerp(1.6, 1.95, ap), t, { raise: 0.85 });
    c.restore();
    Z.seal(c, 1762, 952, '桃园', ss(1.0, 1.28, lt), { size: 88, seed: 46 });
  } };
})();

// ③ 三顾茅庐：刘备盘坐雪中，草庐在右，门未开
SCENES['lb3_sangu'] = (() => {
  const p = () => Z.paper('lb3', '#e3dbc4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lb3_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(66,64,62,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 450, amp: 150, tone: 0.24, seed: 331.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.28 });
    // 草庐（右）
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.85);
    c.fillStyle = 'rgba(176,158,124,.55)'; c.strokeStyle = 'rgba(58,48,36,.85)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(1230, 940); c.lineTo(1230, 736); c.lineTo(1420, 650); c.lineTo(1610, 736); c.lineTo(1610, 940); c.closePath(); c.fill(); c.stroke();
    // 柴门
    c.strokeStyle = 'rgba(50,40,30,.75)'; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(1360, 940); c.lineTo(1360, 806); c.lineTo(1450, 806); c.lineTo(1450, 940); c.stroke();
    c.restore();
    // 雪
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.6, lt) * 0.55);
    c.fillStyle = 'rgba(250,248,242,.8)';
    for (let k = 0; k < 60; k++) {
      const sx = (k * 149 + t * 22) % 1920, sy = (k * 91 + t * (36 + (k % 5) * 10)) % 1000;
      c.beginPath(); c.arc(sx, sy, 2 + (k % 3) * 1.1, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    Z.mist(c, t, { y0: 540, y1: 800, n: 4, alpha: 0.3, speed: 24, seed: 1133 });
    ground(c, lt, 1135, 956, 0.8);

    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.liubei(c, lerp(500, 660, ap), 950, lerp(1.2, 1.5, ap), t, { raise: 0.9, kneel: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '三顾', ss(1.0, 1.28, lt), { size: 88, seed: 47 });
  } };
})();

// ④ 携民渡江：大远景。刘备小，身后是望不到头的人群
SCENES['lb4_xiemin'] = (() => {
  const p = () => Z.paper('lb4', '#e2d9c2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lb4_bg', 0.34 + 0.66 * grow, (g) => {
      g.fillStyle = 'rgba(56,54,52,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 140, tone: 0.24, seed: 341.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.28 });
    Z.water(c, t, { y0: 840, y1: 1060, tone: 0.34, seed: 51, rows: 6 });
    brush(c, [[0, 902], [420, 884], [900, 906], [1500, 888], [1920, 900]], { w: 20, tone: 0.66, dry: 0.66, seed: 1141 });
    // 民众（由近及远三排，退晕）
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.8, lt) * 0.62);
    for (let row = 0; row < 3; row++) {
      const by = 898 + row * 6, sc = 1 - row * 0.16, n = 8 + row * 3, x0 = 700 + row * 36;
      for (let i = 0; i < n; i++) {
        const px = x0 + i * (86 * sc + 22), ph = (74 + (i % 4) * 13) * sc;
        brush(c, [[px, by], [px + 2, by - ph]], { w: 15 * sc, tone: 0.5 + row * 0.05, dry: 0.6, seed: 1142 + i + row * 17 });
        c.fillStyle = 'rgba(238,226,206,' + (0.78 - row * 0.16) + ')';
        c.beginPath(); c.arc(px + 2, by - ph - 9 * sc, 9 * sc, 0, Math.PI * 2); c.fill();
      }
    }
    c.restore();
    Z.mist(c, t, { y0: 620, y1: 860, n: 4, alpha: 0.3, speed: 22, seed: 1143 });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.liubei(c, lerp(380, 560, ap), 900, lerp(1.0, 1.28, ap), t, { raise: 0.45, walk: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '携民', ss(1.0, 1.28, lt), { size: 88, seed: 48 });
  } };
})();

// ⑤ 入蜀取益州：仰视城关，人小城大
SCENES['lb5_yizhou'] = (() => {
  const p = () => Z.paper('lb5', '#e6ddc7');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb5_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(74,66,54,.11)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2030, [{ y0: 460, amp: 126, tone: 0.2, seed: 351.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.85);
    Z.wall(c, 1120, 930, 0.95, t, { flag: 1, flagCol: 'rgba(198,168,96,.85)', seed: 12 });
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 820, n: 3, alpha: 0.28, speed: 28, seed: 1151 });
    ground(c, lt, 1153, 958, 0.78);
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.liubei(c, lerp(430, 590, ap), 954, lerp(1.1, 1.42, ap), t, { raise: 0.55 });
    c.restore();
    Z.seal(c, 1762, 952, '益州', ss(1.0, 1.28, lt), { size: 88, seed: 49 });
  } };
})();

// ⑥ 夷陵之火：背身而立，面对连营火光
SCENES['lb6_yiling'] = (() => {
  const p = () => Z.paper('lb6', '#d9cfb6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lb6_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(52,36,30,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 170, tone: 0.3, seed: 361.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    // 连营火起（右半，退向纵深）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.7, lt) * 0.7);
    for (let i = 0; i < 8; i++) {
      const fx = 940 + i * 118, sc = 1 - i * 0.055, fh = (140 + Math.sin(t * 2.3 + i * 0.7) * 48) * sc;
      const by = 884 - i * 5;
      c.fillStyle = 'rgba(190,78,38,.3)';
      c.beginPath(); c.moveTo(fx - 28, by); c.quadraticCurveTo(fx - 6, by - fh, fx, by - fh * 1.15);
      c.quadraticCurveTo(fx + 8, by - fh, fx + 28, by); c.closePath(); c.fill();
      c.fillStyle = 'rgba(44,34,28,.7)'; c.fillRect(fx - 34, by + 8, 68, 12);
    }
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 840, n: 4, alpha: 0.26, speed: 24, seed: 1161 });
    brush(c, [[0, 906], [520, 888], [1040, 910], [1400, 892]], { w: 16, tone: 0.72, dry: 0.6, seed: 1163 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.02);
    Z.liubei(c, lerp(760, 700, ap), 902, lerp(1.7, 2.1, ap), t, { back: 1, tone: 0.92 });
    c.restore();
    Z.seal(c, 1762, 952, '夷陵', ss(1.0, 1.28, lt), { size: 88, seed: 50 });
  } };
})();

// ⑦ 白帝托孤：榻上盘坐，孔明真身立于榻前
SCENES['lb7_baidi'] = (() => {
  const p = () => Z.paper('lb7', '#ddd4bc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lb7_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(40,34,32,.22)'; g.fillRect(0, 0, 1920, 1080);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    // 榻
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.0, lt) * 0.92);
    c.fillStyle = 'rgba(126,94,58,.9)'; c.fillRect(700, 838, 470, 20);
    c.fillRect(720, 858, 14, 92); c.fillRect(1140, 858, 14, 92);
    c.fillStyle = 'rgba(196,182,152,.7)'; c.fillRect(720, 796, 430, 44);
    c.restore();
    // 烛
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.4, lt) * 0.8);
    c.fillStyle = 'rgba(206,142,64,.58)'; c.beginPath(); c.arc(1570, 712, 36 + Math.sin(t * 3.2) * 4, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(150,110,60,.8)'; c.fillRect(1564, 748, 12, 120);
    c.restore();
    Z.mist(c, t, { y0: 640, y1: 880, n: 3, alpha: 0.26, speed: 18, seed: 1171 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1173, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.0);
    Z.liubei(c, lerp(760, 830, ap), 800, lerp(1.35, 1.62, ap), t, { raise: 0.75, kneel: 1 });
    c.restore();
    c.save(); c.globalAlpha = clamp(ss(0.7, 1.8, lt) * 0.95);
    Z.zhugeliang(c, 1310, 948, 1.55, t, { raise: 0.15 });
    c.restore();
    Z.seal(c, 1762, 952, '托孤', ss(1.2, 1.48, lt), { size: 88, seed: 51 });
  } };
})();

// ⑧ 仁德之君：背影远去，山川与雁
SCENES['lb8_rende'] = (() => {
  const p = () => Z.paper('lb8', '#ddd4bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'lb8_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(36,36,36,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 175, tone: 0.3, seed: 371.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1181 });
    Z.geese(c, t, { n: 5, x0: 1760, y: 250, speed: 150, seed: 7 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 1183, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.82);
    Z.liubei(c, lerp(760, 1120, ap), 958, lerp(1.35, 1.62, ap), t, { back: 1, walk: 1, tone: 0.95 });
    c.restore();
    Z.seal(c, 1762, 952, '仁德', ss(1.2, 1.48, lt), { size: 88, seed: 52 });
  } };
})();
})();
