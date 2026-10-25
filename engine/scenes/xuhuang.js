// 《徐晃》笔法与八幕：魏之名将 —— 玄甲＋白袍＋环首长刀。
// 视觉辨识：深玄甲＋内衬白袍（与曹操玄黑王袍区分为「甲」）、环首长刀（刀环明显，非剑）、
//           束发戴帻（不戴冠）、腰系白带；每幕背景有「破阵长驱」的箭与栅意象。
// 依《三国志·徐晃传》：河东杨人，为郡吏从杨奉 → 说奉与天子还洛阳 → 归太祖，击破原武贼 →
// 从破颜良，拔白马，延津破文丑 → 官渡烧袁绍粮车于故市 → 潼关假道蒲阪，渡津破马超 →
// 樊城「长驱径入」破关羽十重围堑 → 太祖曰「有周亚夫之风」→ 破上庸，进封阳平侯 →
// 镇襄阳，与周亚夫同例，太和元年薨，谥壮侯。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 环首长刀：直刃单面、刀环（圆圈）＋刀镡。区别于 Z.sword / Z.longsword 的「剑」。
Z.huandao = (c, x, y, ang, len = 300, t = 0, o = {}) => {
  const { col = 'rgba(198,204,210,.94)' } = o;
  // 刀尖不出画：连刀身+刀环一起钳制
  len = Math.min(len, (y - 84) / Math.max(Math.cos(ang), 0.45) - 46);
  c.save(); c.translate(x, y); c.rotate(ang);
  // 柄
  brush(c, [[0, 6], [0, 62]], { w: 11, col: [88, 64, 40], tone: 0.9, dry: 0.32, seed: 9401 });
  // 缠绳
  c.strokeStyle = 'rgba(46,36,26,.7)'; c.lineWidth = 1.5;
  for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(-5, 12 + i * 12); c.lineTo(5, 16 + i * 12); c.stroke(); }
  // 刀镡（护手）
  c.fillStyle = 'rgba(160,126,62,.95)';
  c.beginPath(); c.ellipse(0, 4, 17, 6, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(50,38,20,.85)'; c.lineWidth = 1.6; c.stroke();
  // 刀身（微弧、直刃）
  c.fillStyle = col; c.strokeStyle = 'rgba(26,28,30,.9)'; c.lineWidth = 2;
  c.beginPath();
  c.moveTo(-8, 2);
  c.quadraticCurveTo(-11, -len * 0.55, -5, -len);
  c.quadraticCurveTo(0, -len - 20, 6, -len);
  c.quadraticCurveTo(8, -len * 0.5, 8, 2);
  c.closePath(); c.fill(); c.stroke();
  // 刀脊（亮线）
  c.strokeStyle = 'rgba(236,242,248,.6)'; c.lineWidth = 1.4;
  c.beginPath(); c.moveTo(-2, -10); c.quadraticCurveTo(-4, -len * 0.5, -1, -len + 6); c.stroke();
  // 刀环（环首，这是「刀」与「剑」最要紧的分别）
  c.strokeStyle = 'rgba(176,142,72,.95)'; c.lineWidth = 5;
  c.beginPath(); c.arc(0, -len - 30, 12, 0, Math.PI * 2); c.stroke();
  c.strokeStyle = 'rgba(52,40,22,.8)'; c.lineWidth = 1.4; c.stroke();
  c.restore();
};

// 徐晃：公明（o: { t, raise, flip, dao, robe(白袍外披), march(行军步), back(背影) })
Z.xuhuang = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, dao = 1, robe = 1, march = 0, back = 0 } = o;
  const br = Math.sin(t * 1.1) * 0.008;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.35);
  const hem = Math.sin(t * 1.4) * 5;
  // 腿（march: 迈步）
  const m = march * 16;
  brush(c, [[-17, -74], [-24 - m * 0.4, -34], [-30 - m, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 9501, head: 0.06, tail: 0.2 });
  brush(c, [[17, -74], [24 + m * 0.4, -34], [30 + m, 4]], { w: 18, tone: 0.82, dry: 0.5, seed: 9502, head: 0.06, tail: 0.2 });
  // 白袍（内衬，从甲下摆翻出，是徐晃的标志）
  if (robe) {
    c.fillStyle = 'rgba(236,232,220,.9)';
    c.beginPath();
    c.moveTo(-30, -150);
    c.quadraticCurveTo(-58, -84, -62 + hem, -2);
    c.quadraticCurveTo(-32, 8 + hem * 0.3, -6, 2);
    c.quadraticCurveTo(-38, -6, -46, -20); c.quadraticCurveTo(-40, -92, -28, -150);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(120,114,100,.7)'; c.lineWidth = 2; c.stroke();
  }
  // 玄甲（深玄墨，压在纸底上靠描边立住）
  const ARMOR = 'rgba(46,50,58,.94)';
  const armourPath = (g) => {
    g.beginPath();
    g.moveTo(-30, -166); g.quadraticCurveTo(-54, -86, -60 + hem, -2);
    g.quadraticCurveTo(0, 6 + hem * 0.3, 60 + hem * 0.7, -2); g.quadraticCurveTo(54, -88, 30, -166);
    g.closePath();
  };
  c.fillStyle = ARMOR; armourPath(c); c.fill();
  c.strokeStyle = 'rgba(12,14,18,.94)'; c.lineWidth = 3.4; c.stroke();
  // 明暗：右侧受光（留一点冷灰），左下压深
  c.save(); armourPath(c); c.clip();
  c.fillStyle = 'rgba(20,24,30,.55)'; c.fillRect(-70, -60, 80, 70);
  c.fillStyle = 'rgba(96,104,116,.5)'; c.fillRect(-70, -170, 44, 180);
  c.fillStyle = 'rgba(132,140,152,.42)';
  c.beginPath(); c.ellipse(16, -124, 18, 30, 0.2, 0, Math.PI * 2); c.fill();
  c.restore();
  // 甲片横排
  c.strokeStyle = 'rgba(14,18,24,.7)'; c.lineWidth = 2;
  for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-50, -26 - k * 24); c.quadraticCurveTo(0, -16 - k * 24, 50, -26 - k * 24); c.stroke(); }
  // 白带（素色，区别于曹操的玉带与姜维的青绦）
  brush(c, [[-32, -112], [0, -108], [32, -112]], { w: 12, col: [222, 216, 200], tone: 0.95, dry: 0.24, seed: 9531 });
  c.strokeStyle = 'rgba(140,134,120,.6)'; c.lineWidth = 1.4;
  c.beginPath(); c.moveTo(-32, -112); c.quadraticCurveTo(0, -108, 32, -112); c.stroke();
  // 护肩
  c.fillStyle = 'rgba(52,56,64,.96)'; c.strokeStyle = 'rgba(12,14,18,.9)'; c.lineWidth = 2.2;
  c.beginPath(); c.ellipse(-40, -156, 18, 12, 0.2, 0, Math.PI * 2); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(40, -156, 18, 12, -0.2, 0, Math.PI * 2); c.fill(); c.stroke();
  // 头
  c.save(); c.translate(2, -186);
  if (back) {
    // 背影：整颗头涂成发色，不画五官
    c.fillStyle = 'rgba(38,32,28,.95)';
    c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
  } else {
    c.fillStyle = 'rgba(240,228,208,.96)';
    c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(40,32,26,.9)'; c.lineWidth = 2.1; c.stroke();
  }
  // 帻（束发巾帽，军人本色，不戴冠）
  c.fillStyle = 'rgba(40,38,42,.95)';
  c.beginPath();
  c.moveTo(-18, 0); c.lineTo(-13, -18); c.lineTo(2, -25); c.lineTo(16, -16); c.lineTo(18, 0);
  c.quadraticCurveTo(0, -8, -18, 0); c.closePath(); c.fill();
  c.fillStyle = 'rgba(226,220,206,.92)';
  c.beginPath(); c.moveTo(-19, -6); c.lineTo(19, -6); c.lineTo(19, 0); c.lineTo(-19, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(60,56,48,.8)'; c.lineWidth = 1.4; c.stroke();
  // 帻尾（后垂）
  brush(c, [[-15, -4], [-24, 18], [-20, 36]], { w: 5, col: [40, 38, 42], tone: 0.9, dry: 0.4, seed: 9532 });
  if (!back) {
    // 目（沉稳）
    c.fillStyle = 'rgba(252,250,244,.96)'; c.beginPath(); c.ellipse(6, -2, 4.6, 2.7, -0.05, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(22,20,18,.94)'; c.beginPath(); c.arc(7.4, -2, 2.1, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(28,24,20,.85)'; c.lineWidth = 1.7;
    c.beginPath(); c.moveTo(1, -5.8); c.quadraticCurveTo(7, -8, 12, -5.6); c.stroke();
    // 短须（不似周瑜美髯，是老将的短硬须）
    const wf = Math.sin(t * 1.5) * 2;
    c.strokeStyle = 'rgba(44,38,32,.9)'; c.lineWidth = 2.6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-6, 10); c.quadraticCurveTo(-2, 22 + wf * 0.3, 5, 14 + wf); c.stroke();
  }
  c.restore();
  // 双臂：右臂外伸执刀（raise 高时举刀），左臂垂按刀背
  const rl = ease.out(clamp(raise));
  brush(c, [[-28, -146], [-46 - 2 * rl, -110 - 8 * rl], [-48 - 4 * rl, -66 - 14 * rl]], { w: 13, tone: 0.5, dry: 0.45, seed: 9503, head: 0.1, tail: 0.2 });
  brush(c, [[30, -146], [54, -132], [72, -108 - 6 * rl]], { w: 12, tone: 0.5, dry: 0.45, seed: 9504, head: 0.1, tail: 0.2 });
  c.restore();
  if (dao) {
    const dx = flip ? -72 : 72;
    Z.huandao(c, x + dx * s, y - 104 * s, flip ? -0.26 : 0.26, 300 * s, t);
  }
};

// ① 河东杨人：从杨奉，说奉与天子还洛阳
SCENES['xh1_yangfeng'] = (() => {
  const p = () => Z.paper('xh1', '#e8e0c8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'xh1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(84,76,62,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 460, amp: 118, tone: 0.18, seed: 561.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1401 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1403, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 帝驾（车驾远影）
    c.save(); c.globalAlpha = clamp(ss(0.9, 1.9, lt) * 0.5);
    brush(c, [[1240, 950], [1250, 790]], { w: 42, tone: 0.42, dry: 0.5, seed: 1404 });
    c.fillStyle = 'rgba(238,226,200,.8)'; c.beginPath(); c.ellipse(1252, 776, 15, 17, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.xuhuang(c, lerp(420, 780, ap), 950, lerp(1.3, 2.05, ap), t, { raise: 0.25, dao: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '公明', ss(1.0, 1.28, lt), { size: 88, seed: 71 });
  } };
})();

// ② 归曹：击破原武贼，累迁骑都尉
SCENES['xh2_guicaocao'] = (() => {
  const p = () => Z.paper('xh2', '#e4dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'xh2_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(70,62,50,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 132, tone: 0.21, seed: 571.4 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.25 });
    Z.mist(c, t, { y0: 500, y1: 760, n: 3, alpha: 0.28, speed: 30, seed: 1411 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 1413, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 曹字旗
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.4, lt) * 0.8);
    Z.flag(c, 1200, 900, 250, t, { col: 'rgba(72,74,88,.78)', text: '曹', seed: 14 });
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.xuhuang(c, lerp(400, 760, ap), 952, lerp(1.3, 2.05, ap), t, { raise: 0.5, dao: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '归曹', ss(1.0, 1.28, lt), { size: 88, seed: 72 });
  } };
})();

// ③ 白马斩颜良：延津破文丑
SCENES['xh3_baima'] = (() => {
  const p = () => Z.paper('xh3', '#ddd3b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'xh3_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(56,46,42,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 152, tone: 0.26, seed: 581.6 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    brush(c, [[0, 900], [520, 884], [1000, 906], [1320, 890]], { w: 18, tone: 0.7, dry: 0.62, seed: 1423 });
    // 白马（被斩者，倾倒）
    c.save(); c.globalAlpha = clamp(ss(0.5, 1.6, lt) * 0.72);
    brush(c, [[1080, 890], [1220, 858], [1350, 872]], { w: 24, col: [228, 224, 212], tone: 0.62, dry: 0.3, seed: 1424 });
    brush(c, [[1340, 862], [1372, 820]], { w: 15, col: [228, 224, 212], tone: 0.6, dry: 0.3, seed: 1425 });
    c.restore();
    // 刀光（挥斩）
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.9, lt) * 0.5);
    c.strokeStyle = 'rgba(240,244,248,.8)'; c.lineWidth = 3;
    c.beginPath(); c.arc(820, 640, 130, -1.1, 0.4); c.stroke();
    c.restore();
    const ap = ease.out(ss(0.15, 1.25, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.xuhuang(c, lerp(420, 740, ap), 900, lerp(1.2, 1.75, ap), t, { raise: 0.9, dao: 1, march: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '白马', ss(1.0, 1.28, lt), { size: 88, seed: 73 });
  } };
})();

// ④ 官渡断粮：火焚袁绍运车于故市
SCENES['xh4_guandu'] = (() => {
  const p = () => Z.paper('xh4', '#d9cfb4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'xh4_bg', 0.26 + 0.74 * grow, (g) => {
      g.fillStyle = 'rgba(48,40,36,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 160, tone: 0.29, seed: 591.8 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.33 });
    // 粮车
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.3, lt) * 0.85);
    for (let i = 0; i < 3; i++) {
      const bx = 1000 + i * 190, by = 900 - i * 14;
      brush(c, [[bx, by], [bx + 130, by - 8]], { w: 22, col: [104, 78, 48], tone: 0.85, dry: 0.4, seed: 1431 + i });
      c.fillStyle = 'rgba(196,168,110,.85)';
      c.beginPath(); c.ellipse(bx + 66, by - 16, 42, 18, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(70,52,28,.7)'; c.lineWidth = 1.6; c.stroke();
    }
    c.restore();
    // 火
    c.save(); c.globalAlpha = clamp(ss(0.9, 2.1, lt) * 0.7);
    for (let i = 0; i < 4; i++) {
      const fx = 1030 + i * 190, fh = 130 + Math.sin(t * 2.4 + i * 0.9) * 44;
      c.fillStyle = 'rgba(196,78,36,.3)';
      c.beginPath(); c.moveTo(fx - 34, 906); c.quadraticCurveTo(fx - 6, 906 - fh, fx, 906 - fh * 1.2);
      c.quadraticCurveTo(fx + 8, 906 - fh, fx + 34, 906); c.closePath(); c.fill();
    }
    c.restore();
    brush(c, [[0, 930], [520, 916], [1000, 934], [1420, 918]], { w: 15, tone: 0.74, dry: 0.64, seed: 1435 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.xuhuang(c, lerp(400, 700, ap), 930, lerp(1.15, 1.65, ap), t, { raise: 0.55, dao: 1, march: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '断粮', ss(1.0, 1.28, lt), { size: 88, seed: 74 });
  } };
})();

// ⑤ 潼关渡津：假道蒲阪，夜渡破马超
SCENES['xh5_tongguan'] = (() => {
  const p = () => Z.paper('xh5', '#e2d9c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'xh5_bg', 0.38 + 0.62 * grow, (g) => {
      g.fillStyle = 'rgba(58,60,64,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 430, amp: 146, tone: 0.24, seed: 601.2 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.28 });
    Z.water(c, t, { y0: 780, y1: 1060, tone: 0.42, seed: 87, rows: 7 });
    // 壕堑未成（画栅）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.4, lt) * 0.7);
    for (let i = 0; i < 7; i++) {
      const px = 1060 + i * 92;
      brush(c, [[px, 930], [px + 6, 800]], { w: 9, col: [92, 74, 50], tone: 0.85, dry: 0.5, seed: 1451 + i });
    }
    c.strokeStyle = 'rgba(70,56,36,.55)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(1058, 828); c.lineTo(1620, 812); c.stroke();
    c.restore();
    // 渡河（水中行军）
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.xuhuang(c, lerp(420, 720, ap), 940, lerp(1.2, 1.7, ap), t, { raise: 0.4, dao: 1, march: 1 });
    c.restore();
    // 水纹被踏开
    c.save(); c.globalAlpha = clamp(ap * 0.4);
    c.strokeStyle = 'rgba(230,236,242,.6)'; c.lineWidth = 2;
    for (let k = 0; k < 3; k++) {
      c.beginPath(); c.arc(720, 960, 40 + k * 26, Math.PI * 1.1, Math.PI * 1.9); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '渡津', ss(1.0, 1.28, lt), { size: 88, seed: 75 });
  } };
})();

// ⑥ 樊城长驱：破关羽十重围堑（徐晃的顶点）
SCENES['xh6_fancheng'] = (() => {
  const p = () => Z.paper('xh6', '#dcd2b6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'xh6_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(40,34,34,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 450, amp: 168, tone: 0.3, seed: 611.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.35 });
    Z.mist(c, t, { y0: 560, y1: 860, n: 4, alpha: 0.3, speed: 22, seed: 1461 });
    // 十重围堑（十道栅环，向内收缩）
    for (let ring = 0; ring < 10; ring++) {
      c.save();
      const prog = clamp(ss(0.2 + ring * 0.06, 1.6 + ring * 0.06, lt));
      if (prog <= 0.01) { c.restore(); continue; }
      c.globalAlpha = 0.24 + 0.05 * (10 - ring);
      const rw = 720 - ring * 62;
      c.strokeStyle = ring < 4 ? 'rgba(52,44,40,.85)' : 'rgba(92,74,58,.7)';
      c.lineWidth = 6 - ring * 0.3;
      c.beginPath(); c.moveTo(1420 - rw, 940); c.lineTo(1420 + rw, 940); c.stroke();
      for (let k = 0; k < 7; k++) {
        const px = 1420 - rw + (rw * 2 / 6) * k;
        c.beginPath(); c.moveTo(px, 940); c.lineTo(px + 4, 940 - 60 - ring * 4); c.stroke();
      }
      c.restore();
    }
    // 破阵箭头（长驱直入）
    c.save(); c.globalAlpha = clamp(ss(0.7, 1.9, lt) * 0.6);
    c.strokeStyle = 'rgba(226,232,238,.75)'; c.lineWidth = 3.4;
    for (let k = 0; k < 3; k++) {
      const yy = 820 + k * 56;
      c.beginPath(); c.moveTo(380, yy); c.lineTo(1000 - k * 90, yy); c.stroke();
      c.beginPath(); c.moveTo(1000 - k * 90, yy); c.lineTo(968 - k * 90, yy - 14); c.stroke();
      c.beginPath(); c.moveTo(1000 - k * 90, yy); c.lineTo(968 - k * 90, yy + 14); c.stroke();
    }
    c.restore();
    brush(c, [[0, 952], [640, 944], [1320, 956], [1920, 942]], { w: 14, tone: 0.8, dry: 0.7, seed: 1463, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.xuhuang(c, lerp(400, 640, ap), 950, lerp(1.3, 1.85, ap), t, { raise: 0.85, dao: 1, march: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '长驱', ss(1.0, 1.28, lt), { size: 88, seed: 76 });
  } };
})();

// ⑦ 周亚夫之风：军营整齐，令行禁止
SCENES['xh7_mopai'] = (() => {
  const p = () => Z.paper('xh7', '#e7dfc6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'xh7_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(66,60,50,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2030, [{ y0: 460, amp: 118, tone: 0.2, seed: 621.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    Z.mist(c, t, { y0: 500, y1: 740, n: 3, alpha: 0.28, speed: 26, seed: 1471 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1473, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 整齐的营列（只有徐晃的营不动）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.72);
    for (let i = 0; i < 6; i++) {
      const px = 1040 + (i % 3) * 130, py = 880 - Math.floor(i / 3) * 78;
      brush(c, [[px, py], [px, py - 56]], { w: 8, tone: 0.4, dry: 0.4, seed: 1474 + i });
      c.fillStyle = 'rgba(236,232,222,.85)'; c.beginPath(); c.ellipse(px, py - 64, 8, 9, 0, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    // 曹操（远影，坐于辇）
    c.save(); c.globalAlpha = clamp(ss(0.9, 1.9, lt) * 0.5);
    brush(c, [[1520, 950], [1530, 800]], { w: 40, tone: 0.4, dry: 0.5, seed: 1475 });
    c.fillStyle = 'rgba(240,228,202,.8)'; c.beginPath(); c.ellipse(1532, 786, 15, 17, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.xuhuang(c, lerp(420, 740, ap), 952, lerp(1.3, 1.95, ap), t, { raise: 0.2, dao: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '周风', ss(1.0, 1.28, lt), { size: 88, seed: 77 });
  } };
})();

// ⑧ 病逝：镇襄阳，太和元年薨，谥壮侯
SCENES['xh8_bingshi'] = (() => {
  const p = () => Z.paper('xh8', '#d9d0b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'xh8_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(44,42,44,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 450, amp: 160, tone: 0.28, seed: 631.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 4, alpha: 0.32, speed: 18, seed: 1481 });
    // 襄阳城（远景）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.6);
    c.fillStyle = 'rgba(176,168,150,.6)';
    c.fillRect(1200, 760, 480, 190);
    c.strokeStyle = 'rgba(96,88,74,.6)'; c.lineWidth = 2;
    for (let k = 0; k < 5; k++) { c.fillRect(1220 + k * 92, 736, 56, 26); }
    c.restore();
    // 榻上病中（背影朝上）
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.6, lt) * 0.9);
    brush(c, [[520, 950], [900, 938], [1180, 952]], { w: 22, col: [110, 84, 54], tone: 0.86, dry: 0.42, seed: 1482 });
    c.fillStyle = 'rgba(228,222,206,.9)';
    c.beginPath(); c.ellipse(640, 918, 56, 22, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    // 药碗
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.9, lt) * 0.8);
    c.fillStyle = 'rgba(212,204,186,.9)';
    c.beginPath(); c.ellipse(1060, 920, 26, 12, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(110,100,82,.7)'; c.lineWidth = 1.6; c.stroke();
    c.restore();
    // 人物：坐榻边，白袍罩身（病容）
    c.save(); c.globalAlpha = clamp(ss(0.5, 1.6, lt) * 0.9);
    Z.xuhuang(c, 700, 900, 1.12, t, { raise: 0.05, dao: 0, back: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '壮侯', ss(1.2, 1.48, lt), { size: 88, seed: 78 });
  } };
})();
})();
