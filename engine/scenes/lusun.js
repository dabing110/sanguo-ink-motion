// 《陆逊》笔法与八幕：书生名将 —— 素白儒袍＋纶巾＋佩剑（区别于周瑜的月白轻甲）。
// 视觉辨识：全片唯一「以书生之身行大将之事」的主角 —— 素白袍（比周瑜的银蓝甲更素、更软）、
//           纶巾、无甲、佩剑；母题：① 简册与仓廪（海昌开仓赈民）② 书信（谦书骄关羽）③ 茅（各持一把茅）
//           ④ 长久相持（七八个月的旗与营）⑤ 火（连营四十余寨）。
// 依《三国志·吴书·陆逊传》：吴郡吴人，本名议，世江东大族，少孤随祖庐江太守康在官 →
// 出为海昌屯田都尉，县连年亢旱，开仓谷以振贫民，劝督农桑 → 讨山越，所向皆服，部曲二千余人 →
// 权以兄策女配逊 → 权尝问世务，逊献「腹心未平，曷能图远」之策，以为帐下右部督 →
// 讨费栈，益施牙幢，分布鼓角，夜潜山谷，整编东三郡，得精卒数万人 → 淳于式劾之，逊反荐之，权善之 →
// 建安二十四年权问谁可代卿，蒙荐逊「意思深长，才堪负重，终可大任」→ 逊代蒙驻陆口，书与羽谦下，
// 羽意大安，无复所嫌 → 备伐吴，权命逊为大都督，假节，督五万人 → 逊固疑之，先攻一营不利，诸将曰「空杀兵耳」，
// 逊曰「吾已晓破之之术」，敕各持一把茅，以火攻拔之 → 一尔势成，破其四十馀营，斩张南、冯习 →
// 备升马鞍山，逊督促诸军四面蹙之，死者数万 → 备因夜遁，仅得入白帝城，舟船器械一时略尽，尸骸漂流塞江而下 →
// 备大惭恚曰「吾乃为逊所折辱」→ 权加拜辅国将军、领荆州牧，改封江陵侯。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 陆逊佩剑：素鞘长剑（文人剑，比周瑜剑更素更窄）
Z.lusunjian = (c, x, y, ang, len = 280, t = 0) => {
  len = Math.min(len, (y - 84) / Math.max(Math.cos(ang), 0.45) - 40);
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, 54]], { w: 9, col: [110, 86, 52], tone: 0.9, dry: 0.3, seed: 9901 });
  c.fillStyle = 'rgba(206,212,220,.94)'; c.strokeStyle = 'rgba(30,32,36,.88)'; c.lineWidth = 1.8;
  c.beginPath(); c.moveTo(-6, 0); c.lineTo(6, 0); c.lineTo(4, -len); c.lineTo(0, -len - 20); c.lineTo(-4, -len); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(90,96,104,.5)'; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(0, -8); c.lineTo(0, -len + 6); c.stroke();
  c.fillStyle = 'rgba(182,176,158,.95)'; c.fillRect(-12, -4, 24, 6);
  brush(c, [[0, 54], [-4, 84]], { w: 3.6, col: [122, 108, 80], tone: 0.88, dry: 0.3, seed: 9902 });
  c.restore();
};

// 陆逊：伯言（o: { t, raise, flip, jian, book(简册), firm(神色坚定), back(背影) })
Z.lusun = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, jian = 1, book = 0, firm = 0, back = 0 } = o;
  const br = Math.sin(t * 1.15) * 0.008;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.35);
  const hem = Math.sin(t * 1.45) * 4.5;
  // 腿
  brush(c, [[-16, -74], [-24, -34], [-30, 4]], { w: 17, tone: 0.82, dry: 0.5, seed: 9911, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [24, -34], [30, 4]], { w: 17, tone: 0.82, dry: 0.5, seed: 9912, head: 0.06, tail: 0.2 });
  // 素白儒袍（无甲）
  c.fillStyle = 'rgba(234,232,224,.9)';
  c.beginPath();
  c.moveTo(-32, -168);
  c.quadraticCurveTo(-58, -84, -62 + hem, -4);
  c.quadraticCurveTo(0, 6 + hem * 0.4, 62 + hem * 0.6, -4);
  c.quadraticCurveTo(56, -86, 32, -168);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(120,116,108,.72)'; c.lineWidth = 2.8; c.stroke();
  // 交领深缘（儒生领式）
  c.strokeStyle = 'rgba(96,102,110,.6)'; c.lineWidth = 2.6;
  c.beginPath(); c.moveTo(-15, -168); c.quadraticCurveTo(0, -144, 15, -168); c.stroke();
  // 素腰带
  c.fillStyle = 'rgba(154,148,136,.85)';
  c.fillRect(-40, -118, 80, 12);
  c.strokeStyle = 'rgba(108,104,96,.7)'; c.lineWidth = 1.4; c.strokeRect(-40, -118, 80, 12);
  // 广袖双臂
  const rl = ease.out(clamp(raise));
  c.fillStyle = 'rgba(230,228,220,.86)';
  c.beginPath();
  c.moveTo(-32, -158);
  c.quadraticCurveTo(-64 - 16 * rl, -136 - 16 * rl, -68 - 18 * rl, -94 - 20 * rl);
  c.quadraticCurveTo(-58 - 12 * rl, -84 - 16 * rl, -48 - 6 * rl, -98);
  c.quadraticCurveTo(-42, -128, -32, -144);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(116,112,104,.72)'; c.lineWidth = 2.2; c.stroke();
  c.beginPath();
  c.moveTo(32, -158);
  c.quadraticCurveTo(64 + 16 * rl, -136 - 16 * rl, 68 + 18 * rl, -94 - 20 * rl);
  c.quadraticCurveTo(58 + 12 * rl, -84 - 16 * rl, 48 + 6 * rl, -98);
  c.quadraticCurveTo(42, -128, 32, -144);
  c.closePath(); c.fill(); c.stroke();
  // 头
  c.save(); c.translate(2, -188);
  if (back) {
    c.fillStyle = 'rgba(40,34,30,.94)';
    c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
  } else {
    c.fillStyle = 'rgba(242,232,212,.96)';
    c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(48,40,32,.9)'; c.lineWidth = 2.1; c.stroke();
  }
  // 纶巾（儒将，束发软帽）
  c.fillStyle = 'rgba(52,58,66,.95)';
  c.beginPath();
  c.moveTo(-17, 0); c.quadraticCurveTo(-15, -19, 0, -23);
  c.quadraticCurveTo(16, -19, 18, -2);
  c.quadraticCurveTo(0, -10, -17, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(24,28,34,.7)'; c.lineWidth = 1.4; c.stroke();
  brush(c, [[-12, -6], [-18, 14], [-13, 28]], { w: 4.2, col: [52, 58, 66], tone: 0.9, dry: 0.4, seed: 9921 });
  if (!back) {
    // 目（firm 时更沉）
    c.fillStyle = 'rgba(252,250,244,.96)';
    c.beginPath(); c.ellipse(6, -2 + firm * 1, 4.6, 2.7 - firm * 0.4, -0.05, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(22,20,18,.95)'; c.beginPath(); c.arc(7.4, -2 + firm * 1, 2.1, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(30,26,22,.85)'; c.lineWidth = 1.7;
    c.beginPath(); c.moveTo(1, -5.8); c.quadraticCurveTo(7, -8, 12, -5.6); c.stroke();
    // 短须（文气，薄于周瑜）
    const wf = Math.sin(t * 1.4) * 1.8;
    c.strokeStyle = 'rgba(48,42,36,.88)'; c.lineWidth = 2.2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-5, 10); c.quadraticCurveTo(-2, 19 + wf * 0.3, 4, 13 + wf); c.stroke();
  }
  c.restore();
  c.restore();
  if (book) {
    // 手中简册（他先是一书生）
    c.save();
    c.translate(x + (flip ? -58 : 58) * s, y - 108 * s);
    c.rotate((flip ? -1 : 1) * 0.2);
    c.fillStyle = 'rgba(224,212,182,.94)'; c.strokeStyle = 'rgba(96,78,50,.8)'; c.lineWidth = 1.4;
    c.beginPath(); c.moveTo(-26 * s, -12 * s); c.lineTo(26 * s, -16 * s);
    c.lineTo(26 * s, 12 * s); c.lineTo(-26 * s, 16 * s); c.closePath(); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(130,106,66,.55)'; c.lineWidth = 1;
    for (let k = 0; k < 4; k++) {
      c.beginPath(); c.moveTo(-20 * s + k * 12 * s, -8 * s + k * 1.4 * s);
      c.lineTo(-20 * s + k * 12 * s, 10 * s + k * 1.4 * s); c.stroke();
    }
    c.restore();
  }
  if (jian) {
    const dx = flip ? -70 : 70;
    Z.lusunjian(c, x + dx * s, y - 104 * s, flip ? -0.24 : 0.24, 286 * s, t);
  }
};

// ① 海昌屯田：开仓谷以振贫民，劝督农桑
SCENES['ls1_haichang'] = (() => {
  const p = () => Z.paper('ls1', '#e7dfc6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'ls1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(96,88,64,.11)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 460, amp: 120, tone: 0.18, seed: 801.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1801 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1803, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 仓廪（开仓）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.85);
    c.fillStyle = 'rgba(120,94,58,.88)';
    c.beginPath(); c.moveTo(1080, 820); c.lineTo(1230, 748); c.lineTo(1380, 820); c.closePath(); c.fill();
    c.fillStyle = 'rgba(186,168,136,.88)';
    c.fillRect(1110, 820, 240, 130);
    c.strokeStyle = 'rgba(72,56,36,.72)'; c.lineWidth = 2; c.strokeRect(1110, 820, 240, 130);
    // 撒出的谷
    c.fillStyle = 'rgba(214,190,132,.7)';
    for (let k = 0; k < 10; k++) {
      c.beginPath(); c.ellipse(1020 - k * 12, 950 - (k % 3) * 16, 5, 3, 0, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    // 农桑（田垄）
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.35);
    c.strokeStyle = 'rgba(110,96,68,.7)'; c.lineWidth = 2;
    for (let k = 0; k < 4; k++) {
      c.beginPath(); c.moveTo(200, 900 + k * 14); c.lineTo(760, 892 + k * 14); c.stroke();
    }
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.lusun(c, lerp(420, 780, ap), 950, lerp(1.3, 2.0, ap), t, { raise: 0.2, jian: 0, book: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '伯言', ss(1.0, 1.28, lt), { size: 88, seed: 101 });
  } };
})();

// ② 讨山越：夜潜山谷，益施牙幢，整编得精卒数万
SCENES['ls2_shanyue'] = (() => {
  const p = () => Z.paper('ls2', '#e1d8be');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'ls2_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(52,50,46,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 158, tone: 0.27, seed: 811.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    Z.mist(c, t, { y0: 540, y1: 800, n: 4, alpha: 0.32, speed: 22, seed: 1811 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 1813, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 牙幢（羽葆帅旗，一排）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.78);
    for (let i = 0; i < 4; i++) {
      const px = 1080 + i * 96, py = 880 - i * 10;
      brush(c, [[px, py], [px + 2, py - 190]], { w: 6, tone: 0.7, dry: 0.4, seed: 1814 + i });
      // 幢顶羽
      c.fillStyle = 'rgba(150,58,46,.8)';
      c.beginPath(); c.ellipse(px + 2, py - 196, 9, 18, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(80,40,32,.6)'; c.lineWidth = 1.2; c.stroke();
    }
    c.restore();
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lusun(c, lerp(400, 720, ap), 952, lerp(1.3, 1.95, ap), t, { raise: 0.4, jian: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '牙幢', ss(1.0, 1.28, lt), { size: 88, seed: 102 });
  } };
})();

// ③ 代蒙驻陆口：书与羽谦下，羽意大安
SCENES['ls3_lu Kou'] = (() => {
  const p = () => Z.paper('ls3', '#e5dcc3');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'ls3_bg', 0.44 + 0.56 * grow, (g) => {
      g.fillStyle = 'rgba(70,64,54,.11)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 460, amp: 116, tone: 0.19, seed: 821.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    Z.mist(c, t, { y0: 500, y1: 740, n: 3, alpha: 0.28, speed: 26, seed: 1821 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1823, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 案与书信
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.4, lt) * 0.9);
    c.fillStyle = 'rgba(120,86,50,.9)'; c.fillRect(1040, 850, 300, 14);
    c.fillRect(1060, 864, 12, 60); c.fillRect(1310, 864, 12, 60);
    c.fillStyle = 'rgba(228,216,188,.94)';
    c.beginPath(); c.moveTo(1090, 828); c.lineTo(1230, 820); c.lineTo(1236, 850); c.lineTo(1096, 858); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(90,70,44,.7)'; c.lineWidth = 1.6; c.stroke();
    // 墨迹行
    c.strokeStyle = 'rgba(60,52,44,.55)'; c.lineWidth = 1.2;
    for (let k = 0; k < 3; k++) {
      c.beginPath(); c.moveTo(1104, 836 + k * 6); c.lineTo(1206, 832 + k * 6); c.stroke();
    }
    c.restore();
    // 关羽（远影，傲慢不看信）
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.62);
    c.fillStyle = 'rgba(44,66,78,.82)';
    c.beginPath(); c.moveTo(1470, 950); c.quadraticCurveTo(1444, 856, 1476, 852);
    c.quadraticCurveTo(1508, 852, 1504, 950); c.closePath(); c.fill();
    c.fillStyle = 'rgba(232,222,200,.9)'; c.beginPath(); c.ellipse(1476, 834, 13, 14, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lusun(c, lerp(400, 730, ap), 952, lerp(1.3, 1.95, ap), t, { raise: 0.3, jian: 0, book: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '谦书', ss(1.0, 1.28, lt), { size: 88, seed: 103 });
  } };
})();

// ④ 夷陵相持：先攻一营不利，诸将曰「空杀兵耳」
SCENES['ls4_yiling'] = (() => {
  const p = () => Z.paper('ls4', '#dcd2b7');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'ls4_bg', 0.26 + 0.74 * grow, (g) => {
      g.fillStyle = 'rgba(50,46,44,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 164, tone: 0.29, seed: 831.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.33 });
    Z.mist(c, t, { y0: 560, y1: 860, n: 4, alpha: 0.3, speed: 20, seed: 1831 });
    // 蜀军连营（数十屯，绵延百里）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.5, lt) * 0.62);
    for (let i = 0; i < 7; i++) {
      const px = 980 + i * 118, py = 900 - Math.floor(i / 3) * 40;
      c.fillStyle = 'rgba(120,102,72,.7)';
      c.fillRect(px, py - 54, 92, 54);
      c.strokeStyle = 'rgba(72,60,42,.65)'; c.lineWidth = 1.8; c.strokeRect(px, py - 54, 92, 54);
      // 蜀旗
      brush(c, [[px + 46, py - 54], [px + 48, py - 116]], { w: 4.5, tone: 0.6, dry: 0.4, seed: 1832 + i });
      c.fillStyle = 'rgba(150,58,46,.72)';
      c.fillRect(px + 48, py - 114, 30, 22);
    }
    c.restore();
    // 拒马（吴军防线）
    c.save(); c.globalAlpha = clamp(ss(0.7, 1.8, lt) * 0.6);
    for (let i = 0; i < 5; i++) {
      const px = 900 + i * 74;
      brush(c, [[px, 950], [px + 5, 862]], { w: 8, col: [92, 74, 50], tone: 0.85, dry: 0.5, seed: 1841 + i });
      brush(c, [[px - 22, 934], [px + 26, 918]], { w: 5, col: [92, 74, 50], tone: 0.8, dry: 0.5, seed: 1846 + i });
    }
    c.restore();
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1853, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 陆逊：面色不改（他不动）
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.lusun(c, lerp(400, 700, ap), 954, lerp(1.3, 1.9, ap), t, { raise: 0.25, jian: 1, firm: 0.8 });
    c.restore();
    Z.seal(c, 1762, 952, '相持', ss(1.0, 1.28, lt), { size: 88, seed: 104 });
  } };
})();

// ⑤ 各持一把茅：敕各持一把茅，以火攻拔之
SCENES['ls5_mao'] = (() => {
  const p = () => Z.paper('ls5', '#d8ceb4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'ls5_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(44,38,36,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 168, tone: 0.3, seed: 841.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.35 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 4, alpha: 0.32, speed: 18, seed: 1861 });
    // 蜀军营寨（被烧）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.8);
    for (let i = 0; i < 5; i++) {
      const px = 1120 + i * 130, py = 910 - i * 12;
      c.fillStyle = 'rgba(112,96,68,.75)';
      c.fillRect(px, py - 60, 100, 60);
      c.strokeStyle = 'rgba(70,58,40,.65)'; c.lineWidth = 1.8; c.strokeRect(px, py - 60, 100, 60);
    }
    c.restore();
    // 火（连营起）
    c.save(); c.globalAlpha = clamp(ss(0.8, 2.0, lt) * 0.72);
    for (let i = 0; i < 5; i++) {
      const fx = 1160 + i * 130, fh = 150 + Math.sin(t * 2.6 + i * 0.8) * 52;
      c.fillStyle = 'rgba(198,80,36,.3)';
      c.beginPath(); c.moveTo(fx - 38, 916); c.quadraticCurveTo(fx - 8, 916 - fh, fx, 916 - fh * 1.2);
      c.quadraticCurveTo(fx + 10, 916 - fh, fx + 38, 916); c.closePath(); c.fill();
    }
    c.restore();
    brush(c, [[0, 944], [560, 934], [1060, 948], [1500, 932]], { w: 14, tone: 0.76, dry: 0.68, seed: 1863 });
    // 持茅的士卒（每人一把茅）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.6, lt) * 0.7);
    for (let i = 0; i < 4; i++) {
      const px = 880 + i * 62, py = 940 - i * 4;
      c.fillStyle = 'rgba(210,202,184,.8)';
      c.fillRect(px - 9, py - 62, 18, 36);
      c.fillStyle = 'rgba(224,214,192,.85)'; c.beginPath(); c.ellipse(px, py - 70, 9, 10, 0, 0, Math.PI * 2); c.fill();
      // 茅束
      brush(c, [[px + 10, py - 50], [px + 30, py - 66], [px + 40, py - 60]], { w: 5, col: [176, 148, 88], tone: 0.88, dry: 0.4, seed: 1864 + i });
    }
    c.restore();
    // 陆逊：举剑令火攻
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lusun(c, lerp(400, 660, ap), 946, lerp(1.3, 1.9, ap), t, { raise: 0.95, jian: 1, firm: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '一把茅', ss(1.0, 1.28, lt), { size: 88, seed: 105 });
  } };
})();

// ⑥ 破四十馀营：一尔势成，通率诸军俱攻
SCENES['ls6_sipashi'] = (() => {
  const p = () => Z.paper('ls6', '#d4c9ae');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'ls6_bg', 0.18 + 0.82 * grow, (g) => {
      g.fillStyle = 'rgba(40,34,32,.28)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 172, tone: 0.31, seed: 851.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.36 });
    // 火海（连营）
    c.save(); c.globalAlpha = clamp(ss(0.1, 1.5, lt) * 0.66);
    for (let i = 0; i < 7; i++) {
      const fx = 1000 + (i % 4) * 160, fy = 900 - Math.floor(i / 4) * 130;
      const fh = 170 + Math.sin(t * 3 + i) * 60;
      c.fillStyle = 'rgba(200,82,34,.28)';
      c.beginPath(); c.moveTo(fx - 44, fy); c.quadraticCurveTo(fx - 10, fy - fh, fx, fy - fh * 1.24);
      c.quadraticCurveTo(fx + 12, fy - fh, fx + 44, fy); c.closePath(); c.fill();
    }
    c.restore();
    // 尸骸漂流（塞江而下）
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.0, lt) * 0.45);
    for (let i = 0; i < 6; i++) {
      const px = 1160 + i * 92, py = 1010 + (i % 2) * 20;
      c.fillStyle = 'rgba(70,60,52,.7)';
      c.beginPath(); c.ellipse(px, py, 18, 6, 0.1, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    Z.water(c, t, { y0: 920, y1: 1060, tone: 0.4, seed: 96, rows: 5 });
    // 冲杀箭头
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.7, lt) * 0.6);
    c.strokeStyle = 'rgba(226,232,238,.75)'; c.lineWidth = 3.4;
    for (let k = 0; k < 3; k++) {
      const yy = 800 + k * 62;
      c.beginPath(); c.moveTo(360, yy); c.lineTo(940 - k * 70, yy); c.stroke();
      c.beginPath(); c.moveTo(940 - k * 70, yy); c.lineTo(908 - k * 70, yy - 14); c.stroke();
      c.beginPath(); c.moveTo(940 - k * 70, yy); c.lineTo(908 - k * 70, yy + 14); c.stroke();
    }
    c.restore();
    // 陆逊：督促诸军
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lusun(c, lerp(400, 620, ap), 950, lerp(1.3, 1.88, ap), t, { raise: 0.9, jian: 1, firm: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '四十营', ss(1.0, 1.28, lt), { size: 88, seed: 106 });
  } };
})();

// ⑦ 马鞍山：四面蹙之，土崩瓦解，死者数万
SCENES['ls7_maanshan'] = (() => {
  const p = () => Z.paper('ls7', '#d8cdb2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'ls7_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(46,40,38,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 440, amp: 176, tone: 0.3, seed: 861.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.35 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.32, speed: 18, seed: 1871 });
    // 马鞍山（刘备登此陈兵自绕）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.85);
    c.fillStyle = 'rgba(140,126,100,.7)';
    c.beginPath();
    c.moveTo(1200, 950); c.lineTo(1300, 800); c.lineTo(1400, 760); c.lineTo(1520, 810); c.lineTo(1600, 950);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(84,74,58,.65)'; c.lineWidth = 2.2; c.stroke();
    c.restore();
    // 四面蹙之（四个方向的箭头）
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.8, lt) * 0.62);
    c.strokeStyle = 'rgba(230,236,242,.78)'; c.lineWidth = 3.2;
    const cx = 1400, cy = 860;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (const [dx, dy] of dirs) {
      const ex = cx + dx * 220, ey = cy + dy * 120;
      c.beginPath(); c.moveTo(cx + dx * 420, cy + dy * 230); c.lineTo(ex, ey); c.stroke();
      c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex - dx * 34 + dy * 13, ey - dy * 34 - dx * 13); c.stroke();
      c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex - dx * 34 - dy * 13, ey - dy * 34 + dx * 13); c.stroke();
    }
    c.restore();
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1873, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 陆逊：立阵前
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lusun(c, lerp(400, 660, ap), 954, lerp(1.3, 1.9, ap), t, { raise: 0.7, jian: 1, firm: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '马鞍山', ss(1.0, 1.28, lt), { size: 88, seed: 107 });
  } };
})();

// ⑧ 白帝城：备夜遁入白帝，惭恚曰「吾乃为逊所折辱」
SCENES['ls8_baidi'] = (() => {
  const p = () => Z.paper('ls8', '#dbd2b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'ls8_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(50,48,50,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 460, amp: 158, tone: 0.27, seed: 871.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.33 });
    Z.water(c, t, { y0: 820, y1: 1060, tone: 0.42, seed: 97, rows: 6 });
    // 白帝城（远）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.5, lt) * 0.7);
    c.fillStyle = 'rgba(168,158,138,.68)';
    c.fillRect(1250, 640, 420, 200);
    c.strokeStyle = 'rgba(88,80,66,.6)'; c.lineWidth = 2;
    for (let k = 0; k < 5; k++) { c.fillRect(1270 + k * 82, 614, 50, 28); }
    c.restore();
    // 漂流的尸骸与器械
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.8, lt) * 0.5);
    for (let i = 0; i < 7; i++) {
      const px = 1120 + i * 96, py = 990 + (i % 2) * 26;
      c.fillStyle = 'rgba(66,58,50,.75)';
      c.beginPath(); c.ellipse(px, py, 20, 6, 0.08, 0, Math.PI * 2); c.fill();
      if (i % 3 === 0) {
        c.strokeStyle = 'rgba(80,70,58,.6)'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(px - 18, py - 4); c.lineTo(px + 18, py + 4); c.stroke();
      }
    }
    c.restore();
    Z.mist(c, t, { y0: 620, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1881 });
    // 陆逊：背影立于江边（不追之策）
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.92);
    Z.lusun(c, lerp(560, 640, ap), 940, lerp(1.15, 1.5, ap), t, { raise: 0.1, jian: 0, back: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '白帝', ss(1.2, 1.48, lt), { size: 88, seed: 108 });
  } };
})();
})();
