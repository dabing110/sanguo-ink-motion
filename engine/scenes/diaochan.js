// 《貂蝉》笔法与八幕：王允府中歌伎 —— 素白广袖长裙＋高髻簪花＋团扇。
// 视觉辨识：纤细长裙拖地、双广袖飘带、高髻珠花、执团扇（全系列唯一女性主角，与武将造型彻底区隔）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 团扇（纨扇：圆面＋竹柄＋流苏）
Z.tuanshan = (c, x, y, ang, t, o = {}) => {
  const { r = 52 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, 86]], { w: 5, col: [126, 92, 56], tone: 0.88, dry: 0.35, seed: 3101 });
  c.fillStyle = 'rgba(246,240,228,.94)';
  c.beginPath(); c.arc(0, -r * 0.2, r, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(72,58,44,.8)'; c.lineWidth = 2.2; c.stroke();
  // 扇面淡墨枝
  c.strokeStyle = 'rgba(96,84,68,.45)'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-r * 0.5, -r * 0.2); c.quadraticCurveTo(0, -r * 0.7, r * 0.5, -r * 0.1); c.stroke();
  brush(c, [[0, 86], [-6, 108]], { w: 3.5, col: [168, 62, 52], tone: 0.85, dry: 0.3, seed: 3102 });
  c.restore();
};

// 貂蝉：素白广袖长裙、高髻、执扇（o: { t, raise, flip, fan })
Z.diaochan = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, fan = 1 } = o;
  const sway = Math.sin(t * 1.05) * 0.012;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(sway * 0.5);
  const hem = Math.sin(t * 1.35) * 5;
  // 长裙（拖地，下摆展开）
  c.fillStyle = 'rgba(238,230,216,.9)';
  c.beginPath();
  c.moveTo(-20, -150); c.quadraticCurveTo(-46, -80, -74 + hem, 2);
  c.quadraticCurveTo(0, 10 + hem * 0.3, 74 + hem * 0.7, 2); c.quadraticCurveTo(46, -80, 20, -150);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(90,78,62,.72)'; c.lineWidth = 2.6; c.stroke();
  // 裙褶
  c.strokeStyle = 'rgba(120,106,88,.35)'; c.lineWidth = 1.5;
  for (let k = 1; k < 4; k++) { c.beginPath(); c.moveTo(-34 + k * 18, -132); c.quadraticCurveTo(-42 + k * 20, -60, -50 + k * 24 + hem * 0.4, -4); c.stroke(); }
  // 淡紫披帛
  c.fillStyle = 'rgba(158,146,176,.42)';
  c.beginPath(); c.moveTo(-22, -166); c.quadraticCurveTo(-56 - hem, -120, -64 - hem, -44);
  c.quadraticCurveTo(-34, -70, -20, -120); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(22, -166); c.quadraticCurveTo(56 + hem, -120, 64 + hem, -44);
  c.quadraticCurveTo(34, -70, 20, -120); c.closePath(); c.fill();
  // 窄腰
  brush(c, [[-22, -142], [0, -138], [22, -142]], { w: 9, col: [170, 74, 62], tone: 0.85, dry: 0.3, seed: 3111 });
  // 颈
  brush(c, [[0, -168], [0, -152]], { w: 9, col: [244, 232, 214], tone: 0.95, dry: 0.1, seed: 3112 });
  // 头（鹅蛋脸）
  c.save(); c.translate(0, -184);
  c.fillStyle = 'rgba(248,236,220,.97)';
  c.beginPath(); c.ellipse(0, 0, 15, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(60,48,40,.85)'; c.lineWidth = 1.8; c.stroke();
  // 高髻＋珠花
  c.fillStyle = 'rgba(36,30,28,.95)';
  c.beginPath(); c.ellipse(-1, -16, 14, 11, 0, Math.PI, 0); c.fill();
  c.beginPath(); c.ellipse(-8, -26, 8, 7, -0.3, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(8, -27, 7, 6, 0.3, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(214,178,86,.95)';
  for (const [bx, by] of [[-13, -30], [0, -34], [13, -30]]) { c.beginPath(); c.arc(bx, by, 2.6, 0, Math.PI * 2); c.fill(); }
  // 眉目（柔）
  c.strokeStyle = 'rgba(48,38,32,.85)'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(-9, -3); c.quadraticCurveTo(-5, -6, -2, -3); c.stroke();
  c.beginPath(); c.moveTo(9, -3); c.quadraticCurveTo(5, -6, 2, -3); c.stroke();
  c.fillStyle = 'rgba(24,20,18,.9)';
  c.beginPath(); c.ellipse(-5.4, 1, 2.2, 1.5, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.4, 1, 2.2, 1.5, 0, 0, Math.PI * 2); c.fill();
  // 唇
  c.fillStyle = 'rgba(184,58,54,.9)';
  c.beginPath(); c.ellipse(0, 9, 3.2, 1.8, 0, 0, Math.PI * 2); c.fill();
  c.restore();
  // 广袖双臂
  const rl = ease.out(clamp(raise));
  brush(c, [[-18, -150], [-36 - 6 * rl, -134 - 12 * rl], [-50 - 10 * rl, -116 - 26 * rl]], { w: 11, col: [232, 224, 210], tone: 0.7, dry: 0.4, seed: 3113, head: 0.1, tail: 0.2 });
  brush(c, [[18, -150], [34, -130], [42, -108]], { w: 10, col: [232, 224, 210], tone: 0.7, dry: 0.4, seed: 3114, head: 0.1, tail: 0.2 });
  c.restore();
  if (fan) {
    const hx = flip ? -50 : 46, hy = -112;
    Z.tuanshan(c, x + hx * s, y + hy * s, flip ? 2.6 : 0.42, t, { r: 46 });
  }
};

// ① 王府歌伎：帷幕灯影，色艺双绝
SCENES['dc1_geji'] = (() => {
  const p = () => Z.paper('dc1', '#eae2cc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'dc1_bg', 0.45 + 0.55 * grow, (g) => {
      g.fillStyle = 'rgba(74,62,50,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2000, [{ y0: 440, amp: 96, tone: 0.16, seed: 11.3 }]);
    }, { blur: 3.8, halo: 16, haloA: 0.22 });
    // 帷幕
    c.save(); c.globalAlpha = clamp(ss(0, 0.7, lt) * 0.75);
    c.fillStyle = 'rgba(112,44,40,.42)';
    for (let i = 0; i < 3; i++) {
      c.beginPath(); c.moveTo(180 + i * 90, 120); c.lineTo(250 + i * 90, 120);
      c.quadraticCurveTo(236 + i * 90, 400, 246 + i * 90, 700); c.lineTo(176 + i * 90, 700);
      c.quadraticCurveTo(196 + i * 90, 400, 180 + i * 90, 120); c.closePath(); c.fill();
    }
    c.restore();
    Z.mist(c, t, { y0: 480, y1: 760, n: 3, alpha: 0.3, speed: 26, seed: 701 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 703, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 灯
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.2, lt) * 0.6);
    c.fillStyle = 'rgba(206,142,64,.55)'; c.beginPath(); c.arc(1420, 420, 46, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.diaochan(c, lerp(500, 840, ap), 950, lerp(1.3, 2.1, ap), t, { raise: ss(0.6, 2.2, lt), fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '貂蝉', ss(1.0, 1.28, lt), { size: 88, seed: 13 });
  } };
})();

// ② 义父密计：夜堂对坐，跪告汉室之危
SCENES['dc2_miji'] = (() => {
  const p = () => Z.paper('dc2', '#ddd4bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'dc2_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(40,36,32,.22)'; g.fillRect(0, 0, 1920, 1080);
    }, { blur: 5, halo: 26, haloA: 0.3 });
    Z.mist(c, t, { y0: 560, y1: 820, n: 4, alpha: 0.28, speed: 18, seed: 711 });
    brush(c, [[0, 952], [640, 944], [1320, 956], [1920, 942]], { w: 14, tone: 0.8, dry: 0.7, seed: 713, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 案与灯
    c.save(); c.globalAlpha = clamp(ss(0.2, 0.9, lt) * 0.85);
    c.fillStyle = 'rgba(116,84,50,.9)'; c.fillRect(880, 846, 240, 12); c.fillRect(896, 858, 10, 54); c.fillRect(1094, 858, 10, 54);
    c.fillStyle = 'rgba(206,142,64,.6)'; c.beginPath(); c.arc(1000, 812, 34, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    // 王允（左，老者剪影）
    Z.oldRider ? null : null;
    brush(c, [[600, 950], [604, 800]], { w: 46, tone: 0.5, dry: 0.5, seed: 714 });
    c.fillStyle = 'rgba(246,234,214,.9)'; c.beginPath(); c.ellipse(604, 786, 16, 18, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(50,42,34,.85)'; c.lineWidth = 2; c.stroke();
    c.restore();
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.diaochan(c, lerp(1260, 1180, ap), 950, lerp(1.3, 1.95, ap), t, { raise: 0.35, flip: 1, fan: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '连环', ss(1.0, 1.28, lt), { size: 88, seed: 14 });
  } };
})();

// ③ 许婚吕布：温侯与佳人相对
SCENES['dc3_xuhun'] = (() => {
  const p = () => Z.paper('dc3', '#e9e1cb');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'dc3_bg', 0.45 + 0.55 * grow, (g) => {
      g.fillStyle = 'rgba(80,68,54,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 470, amp: 104, tone: 0.16, seed: 21.9 }]);
    }, { blur: 3.8, halo: 16, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 720, n: 3, alpha: 0.3, speed: 30, seed: 721 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 723, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap);
    Z.lvbu(c, lerp(1300, 1180, ap), 950, lerp(1.3, 1.95, ap), t, { raise: 0.25, halberd: 1, flip: 1 });
    c.restore();
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.diaochan(c, lerp(560, 700, ap), 950, lerp(1.3, 1.95, ap), t, { raise: 0.5, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '红妆', ss(1.0, 1.28, lt), { size: 88, seed: 15 });
  } };
})();

// ④ 献入郿坞：朱门车驾，一入深坞
SCENES['dc4_xianzhuo'] = (() => {
  const p = () => Z.paper('dc4', '#e3dac2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'dc4_bg', 0.35 + 0.65 * grow, (g) => {
      g.fillStyle = 'rgba(64,50,42,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 1980, [{ y0: 430, amp: 120, tone: 0.22, seed: 31.6 }]);
    }, { blur: 4.2, halo: 20, haloA: 0.26 });
    // 郿坞朱门
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.9);
    c.fillStyle = 'rgba(124,44,38,.68)';
    c.beginPath(); c.moveTo(1240, 950); c.lineTo(1240, 620); c.quadraticCurveTo(1420, 540, 1600, 620); c.lineTo(1600, 950); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,22,18,.9)'; c.lineWidth = 3.4; c.stroke();
    c.fillStyle = 'rgba(28,20,16,.8)';
    c.beginPath(); c.moveTo(1330, 950); c.lineTo(1330, 760); c.quadraticCurveTo(1420, 700, 1510, 760); c.lineTo(1510, 950); c.closePath(); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 540, y1: 800, n: 3, alpha: 0.28, speed: 24, seed: 731 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 733, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.diaochan(c, lerp(420, 900, ap), 952, lerp(1.25, 1.95, ap), t, { raise: 0.2, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '郿坞', ss(1.0, 1.28, lt), { size: 88, seed: 16 });
  } };
})();

// ⑤ 凤仪亭：池畔亭中，泣诉温侯
SCENES['dc5_fengyi'] = (() => {
  const p = () => Z.paper('dc5', '#e7dfc9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'dc5_bg', 0.45 + 0.55 * grow, (g) => {
      g.fillStyle = 'rgba(70,66,58,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2040, [{ y0: 470, amp: 90, tone: 0.16, seed: 41.2 }]);
    }, { blur: 3.6, halo: 16, haloA: 0.22 });
    // 亭
    c.save(); c.globalAlpha = clamp(ss(0, 0.8, lt) * 0.85);
    c.fillStyle = 'rgba(126,94,58,.85)';
    c.fillRect(1360, 700, 12, 240); c.fillRect(1560, 700, 12, 240);
    c.beginPath(); c.moveTo(1330, 700); c.quadraticCurveTo(1460, 620, 1600, 700); c.lineTo(1570, 712); c.quadraticCurveTo(1460, 654, 1360, 712); c.closePath(); c.fill();
    c.restore();
    Z.water(c, t, { y0: 852, y1: 1040, tone: 0.32, seed: 17, rows: 6 });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap);
    Z.lvbu(c, lerp(1280, 1160, ap), 858, lerp(1.25, 1.85, ap), t, { raise: 0.3, halberd: 1, flip: 1 });
    c.restore();
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.diaochan(c, lerp(600, 760, ap), 858, lerp(1.25, 1.9, ap), t, { raise: 0.8, fan: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '凤仪', ss(1.0, 1.28, lt), { size: 88, seed: 17 });
  } };
})();

// ⑥ 父子反目：戟影撕裂，仇隙已成
SCENES['dc6_fanmu'] = (() => {
  const p = () => Z.paper('dc6', '#ded4bc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'dc6_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(44,36,34,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 440, amp: 150, tone: 0.26, seed: 51.9 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    Z.mist(c, t, { y0: 540, y1: 820, n: 4, alpha: 0.28, speed: 22, seed: 741 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.82, dry: 0.68, seed: 743, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 飞掷的手戟（旁白"戟掷司徒"）：原来是一根斜的光杆，既读不出"戟"也读不出"在飞"
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.9);
    const hx = 760, hy = 648 + Math.sin(t * 1.6) * 7;
    // 风迹：三道短划拖在戟尾之后，才读得出"在飞"
    c.strokeStyle = 'rgba(28,22,18,.3)'; c.lineWidth = 4; c.lineCap = 'round';
    for (let i = 0; i < 3; i++) {
      const ly = hy - 46 - i * 28, lx = hx - 4 - i * 12;
      c.beginPath(); c.moveTo(lx, ly); c.quadraticCurveTo(lx - 34, ly + 2, lx - 68 - i * 16, ly - 2); c.stroke();
    }
    c.save(); c.translate(hx, hy); c.rotate(1.56);
    // 短杆
    c.strokeStyle = 'rgba(40,30,20,.95)'; c.lineWidth = 10;
    c.beginPath(); c.moveTo(0, 96); c.lineTo(0, -92); c.stroke();
    c.strokeStyle = 'rgba(150,116,70,.5)'; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(-2, 88); c.lineTo(-2, -86); c.stroke();
    // 双月牙刃
    c.fillStyle = 'rgba(58,48,38,.95)'; c.strokeStyle = 'rgba(18,12,8,.92)'; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(3, -90); c.quadraticCurveTo(70, -104, 62, -156);
    c.quadraticCurveTo(34, -128, -2, -112); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-3, -90); c.quadraticCurveTo(-64, -108, -56, -158);
    c.quadraticCurveTo(-30, -128, 2, -112); c.closePath(); c.fill(); c.stroke();
    // 枪尖
    c.beginPath(); c.moveTo(-8, -96); c.lineTo(0, -142); c.lineTo(8, -96); c.closePath(); c.fill(); c.stroke();
    // 红缨
    c.strokeStyle = 'rgba(158,44,36,.9)'; c.lineWidth = 4;
    c.beginPath(); c.moveTo(0, -94); c.lineTo(-2, -74); c.stroke();
    c.restore();
    c.restore();
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap);
    Z.lvbu(c, lerp(1360, 1240, ap), 954, lerp(1.3, 1.95, ap), t, { raise: 0.9, halberd: 1, flip: 1 });
    c.restore();
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    c.save(); c.translate(616, 952); c.scale(1.2, 1.2); c.translate(-616, -952);
    // 董卓：背身胖影（宽肩圆背＋腰带分割＋低冠＋背手）。原先一个椭圆加一个小圆，语义读不出来
    const dq = { x: 616, y: 952 };
    c.fillStyle = 'rgba(62,50,42,.78)'; c.strokeStyle = 'rgba(24,18,14,.82)'; c.lineWidth = 3;
    c.beginPath();
    c.moveTo(dq.x - 58, dq.y - 190);
    c.quadraticCurveTo(dq.x - 82, dq.y - 146, dq.x - 80, dq.y - 96);
    c.quadraticCurveTo(dq.x - 97, dq.y - 40, dq.x - 66, dq.y - 6);
    c.quadraticCurveTo(dq.x, dq.y + 10, dq.x + 66, dq.y - 6);
    c.quadraticCurveTo(dq.x + 97, dq.y - 40, dq.x + 80, dq.y - 96);
    c.quadraticCurveTo(dq.x + 82, dq.y - 146, dq.x + 58, dq.y - 190);
    c.quadraticCurveTo(dq.x, dq.y - 208, dq.x - 58, dq.y - 190);
    c.closePath(); c.fill(); c.stroke();
    // 腰带：给背影一道横向分割，不再是"一团圆"
    c.strokeStyle = 'rgba(28,20,14,.6)'; c.lineWidth = 11;
    c.beginPath(); c.moveTo(dq.x - 86, dq.y - 90); c.quadraticCurveTo(dq.x, dq.y - 76, dq.x + 86, dq.y - 90); c.stroke();
    c.strokeStyle = 'rgba(152,122,74,.5)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(dq.x - 84, dq.y - 99); c.quadraticCurveTo(dq.x, dq.y - 85, dq.x + 84, dq.y - 99); c.stroke();
    // 后颈与发（背影不露脸）
    c.fillStyle = 'rgba(48,38,32,.96)';
    c.beginPath(); c.ellipse(dq.x, dq.y - 212, 25, 26, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(18,12,8,.82)'; c.lineWidth = 2; c.stroke();
    // 低冠
    c.fillStyle = 'rgba(26,22,20,.96)';
    c.beginPath(); c.moveTo(dq.x - 27, dq.y - 220); c.lineTo(dq.x - 19, dq.y - 248);
    c.lineTo(dq.x + 4, dq.y - 256); c.lineTo(dq.x + 25, dq.y - 244); c.lineTo(dq.x + 27, dq.y - 220);
    c.quadraticCurveTo(dq.x, dq.y - 230, dq.x - 27, dq.y - 220); c.closePath(); c.fill();
    c.fillStyle = 'rgba(150,120,64,.82)'; c.fillRect(dq.x - 27, dq.y - 224, 54, 5);
    // 背手
    brush(c, [[dq.x - 50, dq.y - 154], [dq.x - 78, dq.y - 130], [dq.x - 62, dq.y - 104]], { w: 13, tone: 0.4, dry: 0.45, seed: 7412 });
    c.restore();
    c.restore();
    Z.seal(c, 1762, 952, '反目', ss(1.0, 1.28, lt), { size: 88, seed: 18 });
  } };
})();

// ⑦ 郿坞伏诛：火起坞中，卓死阙下
SCENES['dc7_zhuxhuo'] = (() => {
  const p = () => Z.paper('dc7', '#d8ccb0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'dc7_bg', 0.25 + 0.75 * grow, (g) => {
      g.fillStyle = 'rgba(52,34,28,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2020, [{ y0: 440, amp: 140, tone: 0.3, seed: 61.4 }]);
    }, { blur: 4.8, halo: 28, haloA: 0.34 });
    // 火光
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.8, lt) * 0.5);
    for (let i = 0; i < 5; i++) {
      const fx = 1180 + i * 96, fh = 180 + Math.sin(t * 2.2 + i) * 46;
      c.fillStyle = 'rgba(186,74,40,.32)';
      c.beginPath(); c.moveTo(fx - 40, 860); c.quadraticCurveTo(fx - 10, 860 - fh, fx, 860 - fh * 1.2);
      c.quadraticCurveTo(fx + 12, 860 - fh, fx + 40, 860); c.closePath(); c.fill();
    }
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 840, n: 4, alpha: 0.24, speed: 26, seed: 751 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 15, tone: 0.84, dry: 0.66, seed: 753, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.diaochan(c, lerp(420, 700, ap), 954, lerp(1.3, 1.95, ap), t, { raise: 0.4, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '伏诛', ss(1.0, 1.28, lt), { size: 88, seed: 19 });
  } };
})();

// ⑧ 身世成谜：月下孤影，芳踪杳然
SCENES['dc8_shenshi'] = (() => {
  const p = () => Z.paper('dc8', '#ded5bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'dc8_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(34,32,34,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 460, amp: 160, tone: 0.3, seed: 71.8 }]);
    }, { blur: 5, halo: 28, haloA: 0.34 });
    // 月
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.8, lt) * 0.6);
    c.fillStyle = 'rgba(240,238,226,.7)'; c.beginPath(); c.arc(1460, 320, 86, 0, Math.PI * 2); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 761 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 763, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.9);
    Z.diaochan(c, lerp(700, 900, ap), 956, lerp(1.3, 1.85, ap), t, { raise: 0.25, fan: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '杳然', ss(1.2, 1.48, lt), { size: 88, seed: 20 });
  } };
})();
})();
