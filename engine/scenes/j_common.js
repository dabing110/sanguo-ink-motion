// 《姜维》专属笔法库：麒麟儿、儒将冠服、栈道、祁山、剑阁、连营、屯田、胆大如斗。
// 依赖 h_common.js（宣纸/远山/云气/榜题/钤印/尘/马复用）。姜维的辨识要素：
// ① 纶巾儒服 + 长枪（他是武将里唯一带书卷气的，赵云/马超/典韦都是纯武人）
// ② 栈道与祁山（北伐的地理母题，不是平原不是江面）
// ③ 麒麟（「天水麒麟儿」）④ 一计害三贤 + 胆大如斗（收尾的奇崛）
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 麒麟（「天水麒麟儿」，独角、鹿身、鬃尾） ----------
Z.qilin = (c, x, y, s, o = {}) => {
  const { tone = 0.9, flip = 0, t = 0, alpha = 1 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = alpha;
  const bob = Math.sin(t * 1.8) * 5;
  c.translate(0, bob);
  // 身（鹿形）
  brush(c, [[-92, -56], [-34, -78], [26, -74], [82, -54]], { w: 44, tone, dry: 0.38, seed: 910, head: 0.12, tail: 0.3, bristles: 8 });
  // 鳞纹
  c.save(); c.globalAlpha = 0.4; c.strokeStyle = 'rgba(20,18,16,.9)'; c.lineWidth = 3;
  for (let i = 0; i < 6; i++) { const px = -80 + i * 26, py = -66 + Math.sin(i) * 6; c.beginPath(); c.arc(px, py, 9, 0.2, 2.4); c.stroke(); }
  c.restore();
  // 四腿
  [[-64, -22], [-38, -20], [38, -22], [66, -20]].forEach(([lx, ly], k) => {
    const L = Math.sin(t * 2.2 + k * 1.6) * 16;
    brush(c, [[lx, ly], [lx + L * 0.3, ly + 18], [lx + L * 0.7, ly + 32], [lx + L, ly + 46]], { w: 13, tone, dry: 0.5, seed: 920 + k, tail: 0.3 });
  });
  // 尾（狮尾，带火焰形）
  const tw = Math.sin(t * 1.5) * 0.4;
  brush(c, [[-92, -60], [-132 + tw * 20, -78], [-166 + tw * 36, -46]], { w: 15, tone, dry: 0.66, seed: 930, head: 0.1, tail: 0.85, bristles: 7 });
  // 颈 + 头
  brush(c, [[76, -68], [96, -104], [112, -132]], { w: 26, tone, dry: 0.4, seed: 931, tail: 0.3 });
  c.save(); c.translate(126, -142); c.rotate(-0.15);
  c.fillStyle = `rgba(30,26,22,${tone})`;
  c.beginPath(); c.ellipse(0, 0, 26, 20, -0.2, 0, Math.PI * 2); c.fill();          // 头
  brush(c, [[0, -6], [24, 4], [32, 16]], { w: 12, tone: tone * 0.9, dry: 0.45, seed: 932, tail: 0.5 });   // 吻
  // 独角（麒麟的招牌）
  brush(c, [[-6, -16], [2, -46], [14, -62]], { w: 8, tone: 0.95, dry: 0.35, seed: 933, tail: 0.4 });
  c.fillStyle = 'rgba(250,246,236,.92)'; c.beginPath(); c.arc(8, -4, 4, 0, Math.PI * 2); c.fill();        // 目
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(9, -4, 2, 0, Math.PI * 2); c.fill();
  // 鬃
  [[-14, -14], [-8, -26], [0, -36]].forEach(([mx, my], k) => {
    brush(c, [[mx, my], [mx - 14, my - 14], [mx - 26, my - 8]], { w: 7, tone, dry: 0.65, seed: 934 + k, tail: 0.8, bristles: 4 });
  });
  c.restore();
  c.restore();
};

// ---------- 姜维：纶巾儒服 + 长枪（儒将，不是纯武人） ----------
// o: { t, jiAng, raise, stance, flip, robe(0=甲 1=儒服), scroll(手持卷册) }
Z.jiangWei = (c, x, y, s, o = {}) => {
  const { t = 0, jiAng = -0.6, raise = 0, stance = 0, flip = 0, robe = 0, scroll = 0 } = o;
  const br = Math.sin(t * 2.0) * 0.016;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.5);
  const step = Math.sin(stance * 2) * 5;
  c.translate(0, step * 0.5);
  // 腿
  brush(c, [[-12, -74], [-20 + step, -34], [-26 + step, 4]], { w: 20, tone: 0.86, dry: 0.5, seed: 951, head: 0.06, tail: 0.2 });
  brush(c, [[14, -74], [22 - step, -34], [28 - step, 4]], { w: 20, tone: 0.86, dry: 0.5, seed: 952, head: 0.06, tail: 0.2 });
  // 袍/甲：儒服下摆比武将长，飘
  if (robe) {
    const f = Math.sin(t * 1.3) * 10;
    c.fillStyle = 'rgba(238,230,210,.8)';
    c.beginPath(); c.moveTo(-42, -152); c.lineTo(42, -156); c.lineTo(50, -60);
    c.quadraticCurveTo(0, -46 + f * 0.3, -50, -58); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,30,26,.85)'; c.lineWidth = 3; c.stroke();
    brush(c, [[-38, -110], [0, -104], [40, -110]], { w: 12, col: [120, 96, 56], tone: 0.9, dry: 0.3, seed: 953 });
  } else {
    c.fillStyle = 'rgba(104,100,108,.36)';
    c.beginPath(); c.moveTo(-40, -154); c.lineTo(40, -158); c.lineTo(48, -84); c.lineTo(-44, -78); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 3.2; c.stroke();
    [[-26, -140, 54], [-20, -118, 58], [-16, -96, 60]].forEach(([ax, ay, w]) => {
      const g = c.createLinearGradient(ax, ay - 6, ax + w, ay + 10);
      g.addColorStop(0, 'rgba(104,106,116,.9)'); g.addColorStop(0.5, 'rgba(150,150,158,.92)'); g.addColorStop(1, 'rgba(88,90,100,.9)');
      c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 3); c.lineTo(ax + w, ay + 10); c.lineTo(ax, ay + 12); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(40,38,44,.6)'; c.lineWidth = 1.4; c.stroke();
    });
    brush(c, [[-40, -84], [0, -79], [42, -84]], { w: 15, col: [104, 78, 44], tone: 0.9, dry: 0.35, seed: 954 });
  }
  // 头：纶巾（诸葛亮一系的儒冠）+ 三绺须
  c.save(); c.translate(4, -182);
  c.fillStyle = 'rgba(246,236,216,.96)'; c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(232,226,208,.94)';                                  // 纶巾（方巾带角）
  c.beginPath(); c.moveTo(-19, -8); c.lineTo(19, -8); c.lineTo(19, -16); c.lineTo(-19, -16); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-19, -16); c.quadraticCurveTo(0, -40, 19, -16); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,38,34,.8)'; c.lineWidth = 1.8; c.stroke();
  brush(c, [[-15, -16], [-22, -26], [-30, -22]], { w: 5, tone: 0.5, dry: 0.5, seed: 955, tail: 0.7 });   // 巾角
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.ellipse(6, -1, 3.4, 2.6, 0, 0, Math.PI * 2); c.fill();
  c.save(); c.globalAlpha = 0.85; c.strokeStyle = 'rgba(32,28,24,.85)'; c.lineWidth = 2.6; c.lineCap = 'round';
  [[-6, 7, -10, 20], [2, 9, 0, 24], [10, 7, 14, 19]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); });
  c.restore();
  c.restore();
  // 双臂：右手持枪，左手持卷册（儒将）
  const rl = ease.out(clamp(raise));
  brush(c, [[-26, -142], [-52, -136 - 14 * rl], [-74, -146 - 30 * rl]], { w: 15, tone: 0.55, dry: 0.4, seed: 961, head: 0.1, tail: 0.2 });
  brush(c, [[30, -144], [56, -138 - 16 * rl], [78, -148 - 32 * rl]], { w: 15, tone: 0.55, dry: 0.4, seed: 962, head: 0.1, tail: 0.2 });
  // 卷册（左手，儒将的招牌）
  if (scroll > 0) {
    c.save(); c.globalAlpha = scroll;
    c.fillStyle = 'rgba(244,236,214,.95)';
    c.fillRect(-74 - 22, -160 - 30 * rl, 40, 22);
    c.strokeStyle = 'rgba(48,42,34,.85)'; c.lineWidth = 2; c.strokeRect(-74 - 22, -160 - 30 * rl, 40, 22);
    brush(c, [[-74 - 18, -154 - 30 * rl], [-74 + 10, -154 - 30 * rl]], { w: 3, tone: 0.5, dry: 0.5, seed: 963 });
    c.restore();
  }
  c.restore();
  // 长枪（画在身体之外，跟 Z.hero 同一套思路）
  const sx = flip ? -1 : 1;
  const ha = flip ? Math.PI - (jiAng - rl * 0.5) : jiAng - rl * 0.5;
  Z.spear(c, x + 78 * s * sx, y + (-148 - 32 * rl) * s, ha, 330 * s, t);
};

// ---------- 武侯（纶巾羽扇，用于「祁山归亮」一幕：执姜维手的人） ----------
Z.woLong = (c, x, y, s, t, o = {}) => {
  const { flip = 0, fan = 1 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const br = Math.sin(t * 1.7) * 0.012;
  c.rotate(br);
  // 鹤氅长袍
  const f = Math.sin(t * 1.1) * 8;
  c.fillStyle = 'rgba(236,230,214,.86)';
  c.beginPath(); c.moveTo(-38, -156); c.lineTo(34, -160); c.lineTo(46, -10);
  c.quadraticCurveTo(0, 4 + f * 0.3, -46, -8); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,36,30,.85)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-34, -108], [0, -102], [36, -108]], { w: 11, col: [110, 92, 58], tone: 0.9, dry: 0.3, seed: 971 });
  // 头：纶巾 + 长须
  c.save(); c.translate(2, -186);
  c.fillStyle = 'rgba(248,240,222,.96)'; c.beginPath(); c.ellipse(0, 0, 17, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(230,224,206,.95)';
  c.beginPath(); c.moveTo(-19, -8); c.lineTo(19, -8); c.lineTo(19, -17); c.lineTo(-19, -17); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(-19, -17); c.quadraticCurveTo(0, -42, 19, -17); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,38,34,.8)'; c.lineWidth = 1.8; c.stroke();
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.ellipse(6, -1, 3.2, 2.4, 0, 0, Math.PI * 2); c.fill();
  c.save(); c.globalAlpha = 0.8; c.strokeStyle = 'rgba(240,238,230,.9)'; c.lineWidth = 3; c.lineCap = 'round';
  [[-8, 8, -14, 26], [0, 10, -2, 32], [8, 8, 12, 26]].forEach(([x1, y1, x2, y2]) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); });
  c.restore();
  c.restore();
  // 双臂：一手执扇，一手前伸（执维手）
  brush(c, [[-24, -142], [-50, -134], [-72, -126]], { w: 14, tone: 0.5, dry: 0.4, seed: 972, head: 0.1, tail: 0.2 });
  brush(c, [[26, -144], [56, -140], [82, -132]], { w: 14, tone: 0.5, dry: 0.4, seed: 973, head: 0.1, tail: 0.2 });
  c.restore();
  // 羽扇（画在体外）
  if (fan) {
    const sw = Math.sin(t * 1.1) * 0.14;
    c.save(); c.translate(x + (flip ? -1 : 1) * 72 * s, y - 132 * s);
    c.rotate((flip ? -1 : 1) * (0.4 + sw)); c.scale(s, s);
    brush(c, [[0, 26], [0, -20]], { w: 5, tone: 0.7, dry: 0.4, seed: 974 });
    c.fillStyle = 'rgba(250,246,236,.92)';
    c.beginPath(); c.ellipse(0, -46, 30, 40, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(60,56,48,.8)'; c.lineWidth = 2; c.stroke();
    for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(0, -20); c.lineTo(i * 12, -78); c.stroke(); }
    c.restore();
  }
};

// ---------- 栈道（秦岭木栈：崖壁 + 悬空木桩） ----------
// o: { len, reveal, tone }
Z.zhanDao = (c, x, y, s, o = {}) => {
  const { len = 900, reveal = 1, tone = 0.82, seed = 70 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  const n = Math.floor(len / 60);
  for (let i = 0; i < n; i++) {
    const px = i * 60;
    if (px > len * reveal) break;
    brush(c, [[px, 0], [px + 4, 34 + (i % 3) * 10]], { w: 6, tone: tone * 0.8, dry: 0.45, seed: seed + i });           // 立柱
    brush(c, [[px - 26, 0], [px + 30, -2]], { w: 11, tone, dry: 0.5, seed: seed + 40 + i, head: 0.05, tail: 0.2 });    // 木板
    if (i % 3 === 0) brush(c, [[px - 22, -6], [px + 26, -8]], { w: 3, tone: tone * 0.6, dry: 0.7, seed: seed + 80 + i });
  }
  // 扶手
  brush(c, [[0, -34], [len * reveal, -38]], { w: 4, tone: tone * 0.7, dry: 0.6, seed: seed + 120, tail: 0.3 });
  c.restore();
};

// ---------- 祁山（层叠高山，北伐的地理母题） ----------
Z.qiShan = (c, g, o = {}) => {
  const { x0 = -100, x1 = 2020, tone = 0.28, seed = 40, peak = 300 } = o;
  g.save();
  for (let k = 0; k < 3; k++) {
    const base = 560 + k * 30, amp = peak - k * 60;
    g.beginPath(); g.moveTo(x0, base + 260);
    for (let x = x0; x <= x1; x += 40) {
      const h = Math.sin((x + seed * 30 + k * 180) * 0.0042) * amp
              + Math.sin((x + seed * 12 + k * 90) * 0.011) * amp * 0.35;
      g.lineTo(x, base - Math.abs(h));
    }
    g.lineTo(x1, base + 260); g.closePath();
    g.fillStyle = `rgba(46,44,42,${tone - k * 0.06})`; g.fill();
    g.strokeStyle = `rgba(24,22,20,${0.5 - k * 0.1})`; g.lineWidth = 2.5; g.stroke();
  }
  g.restore();
};

// ---------- 剑阁（两峰夹一关，姜维拒钟会之地） ----------
Z.jianGe = (c, x, y, s, o = {}) => {
  const { t = 0, tone = 0.8 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  // 左右两峰（剑门：石壁如剑）
  [[-1, 0.9], [1, 1.05]].forEach(([sg, hs], k) => {
    c.save(); c.scale(sg, 1);
    c.fillStyle = `rgba(70,64,58,${0.4 + tone * 0.22})`;
    c.beginPath(); c.moveTo(150, 60); c.lineTo(210, -180 * hs); c.lineTo(330, -320 * hs);
    c.lineTo(430, -140 * hs); c.lineTo(470, 60); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(28,26,24,.85)'; c.lineWidth = 3.5; c.stroke();
    brush(c, [[230, -140 * hs], [300, -230 * hs], [340, -170 * hs]], { w: 6, tone: 0.35, dry: 0.7, seed: 980 + k, tail: 0.6 });
    c.restore();
  });
  // 关楼（夹在两峰之间）
  c.fillStyle = 'rgba(150,116,74,.7)'; c.fillRect(-140, -190, 280, 250);
  c.strokeStyle = 'rgba(40,32,24,.9)'; c.lineWidth = 3; c.strokeRect(-140, -190, 280, 250);
  c.fillStyle = 'rgba(60,48,34,.85)'; c.fillRect(-40, -110, 80, 170);                       // 关门
  c.fillStyle = 'rgba(170,132,84,.8)'; c.beginPath();                                        // 檐
  c.moveTo(-170, -190); c.lineTo(0, -240); c.lineTo(170, -190); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,32,24,.9)'; c.lineWidth = 2.5; c.stroke();
  brush(c, [[-110, -160], [110, -162]], { w: 5, tone: 0.5, dry: 0.5, seed: 984 });
  c.restore();
};

// （连营 Z.yingLei、云海 Z.yunHai 已提到 h_common.js —— 通用母题，八部片都要用。）

// ---------- 屯田（沓中：田垄 + 锄卒） ----------
Z.tunTian = (c, x, y, s, t, o = {}) => {
  const { rows = 6, reveal = 1, seed = 90 } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  for (let k = 0; k < rows; k++) {
    const ry = k * 22, w = 420 + k * 26;
    brush(c, [[-w / 2, ry], [0, ry - 4], [w / 2, ry]], { w: 7, tone: 0.62, dry: 0.78, seed: seed + k, head: 0.05, tail: 0.35, reveal });
  }
  // 三个屯田卒
  [0, 1, 2].forEach((k) => {
    const px = -150 + k * 150, ph = t * 2.4 + k * 2;
    const sw = Math.sin(ph) * 16;
    c.save(); c.translate(px, 40 + k * 14); c.globalAlpha = 0.85;
    brush(c, [[0, 0], [-4, -40], [-2, -66]], { w: 12, tone: 0.7, dry: 0.5, seed: seed + 30 + k, head: 0.08, tail: 0.24 });
    c.fillStyle = 'rgba(50,44,38,.85)'; c.beginPath(); c.arc(-2, -74, 9, 0, Math.PI * 2); c.fill();
    brush(c, [[0, -56], [sw * 0.4, -30], [sw, -6]], { w: 5, tone: 0.8, dry: 0.4, seed: seed + 40 + k });     // 锄
    c.restore();
  });
  c.restore();
};

// ---------- 胆大如斗（片尾：一颗墨胆，斗大） ----------
Z.danDou = (c, x, y, s, t, o = {}) => {
  const { alpha = 1, glow = 0 } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = alpha;
  const pu = 1 + Math.sin(t * 1.9) * 0.035;
  if (glow > 0) {
    const g = c.createRadialGradient(0, 0, 10, 0, 0, 200);
    g.addColorStop(0, `rgba(255,236,180,${0.34 * glow})`); g.addColorStop(1, 'rgba(255,220,150,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 0, 200, 0, Math.PI * 2); c.fill();
  }
  c.save(); c.scale(pu, pu);
  c.fillStyle = 'rgba(38,72,58,.9)';                                   // 胆：青墨一团
  c.beginPath(); c.ellipse(0, 0, 74, 58, -0.22, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(18,34,28,.92)'; c.lineWidth = 4; c.stroke();
  brush(c, [[-52, -18], [-10, -34], [34, -22]], { w: 8, tone: 0.3, dry: 0.6, seed: 990, tail: 0.5 });   // 高光
  brush(c, [[-30, 34], [20, 40]], { w: 5, tone: 0.28, dry: 0.7, seed: 991, tail: 0.6 });
  c.restore();
  c.restore();
};
})();
