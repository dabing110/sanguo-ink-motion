// 《锦马超》专属笔法库：西凉风沙、穹庐、铁骑阵列、枪林、银甲白袍将军、关城。
// 依赖 h_common.js —— 宣纸、远山、奔马、长枪、旌旗、榜题、钤印全部复用同一套水墨笔法，
// 这里只加马超的辨识元素：银甲（不是淡墨袍）、白袍（锦）、狮盔缨、成阵列的铁骑（不是单骑）、黄沙（不是云气）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// ---------- 西凉风沙：横向推移的黄褐浊带（比云气更粗更快，带沙粒感） ----------
Z.sand = (c, t, { y0 = 380, y1 = 820, n = 5, alpha = 0.34, speed = 170, seed = 5, grain = 1 } = {}) => {
  const r = rng(seed);
  c.save(); c.filter = 'blur(22px)';
  for (let k = 0; k < n; k++) {
    const y = lerp(y0, y1, (k + 0.5) / n) + (r() - .5) * 60;
    const h = 34 + r() * 60, sp = speed * (0.6 + r() * 0.9);
    const x = ((t * sp + r() * 2600) % (W + 1400)) - 600;
    c.fillStyle = `rgba(196,168,116,${alpha * (0.6 + r() * 0.6)})`;
    c.beginPath(); c.ellipse(x, y, 300 + r() * 260, h, 0, 0, Math.PI * 2); c.fill();
  }
  c.filter = 'none';
  // 沙粒：被风抽走的碎点
  if (grain) {
    for (let i = 0; i < 46; i++) {
      const sp = 260 + r() * 420, y = lerp(y0, y1, r());
      const x = W - ((t * sp + r() * 2400) % (W + 300));
      c.fillStyle = `rgba(150,120,74,${0.10 + r() * 0.22})`;
      c.fillRect(x, y + Math.sin(t * 3 + i) * 10, 2 + r() * 5, 1.6 + r() * 2);
    }
  }
  c.restore();
};

// ---------- 穹庐（羌胡帐）：半圆帐身＋顶杆＋一门洞 ----------
Z.yurt = (c, x, y, s, { tone = 0.5, seed = 1 } = {}) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = `rgba(232,222,200,${0.5 + tone * 0.3})`;
  c.beginPath(); c.moveTo(-46, 0); c.quadraticCurveTo(0, -74, 46, 0); c.closePath(); c.fill();
  c.strokeStyle = `rgba(58,48,38,${0.35 + tone * 0.4})`; c.lineWidth = 2.4; c.stroke();
  brush(c, [[0, -66], [2, -88]], { w: 3, tone: 0.6, dry: 0.5, seed: 300 + seed });
  brush(c, [[0, -84], [22, -78], [40, -70]], { w: 3, tone: 0.5, dry: 0.6, seed: 310 + seed });
  c.fillStyle = 'rgba(48,40,32,.62)';                                  // 门洞
  c.beginPath(); c.moveTo(-11, 0); c.lineTo(-11, -26); c.quadraticCurveTo(0, -34, 11, -26); c.lineTo(11, 0); c.closePath(); c.fill();
  c.strokeStyle = `rgba(70,58,44,${0.3 + tone * 0.3})`; c.lineWidth = 1.6;                 // 帐箍
  c.beginPath(); c.moveTo(-42, -14); c.quadraticCurveTo(0, -46, 42, -14); c.stroke();
  c.restore();
};

// ---------- 枪林：一排竖枪，风里齐摆 ----------
Z.spearWall = (c, x0, y, n, gap, s, t, { tone = 0.85, seed = 8, sway = 0.05 } = {}) => {
  const r = rng(seed);
  for (let i = 0; i < n; i++) {
    const x = x0 + i * gap, h = (250 + r() * 90) * s;
    const a = Math.sin(t * 1.8 + i * 0.7) * sway;
    c.save(); c.translate(x, y); c.rotate(a);
    brush(c, [[0, 0], [0, -h * 0.7], [0, -h]], { w: 5 * s, tone, dry: 0.4, seed: 330 + i, head: 0.04, tail: 0.2 });
    c.fillStyle = `rgba(22,20,18,${tone})`; c.beginPath();                       // 枪尖
    c.moveTo(0, -h - 16 * s); c.lineTo(-5 * s, -h + 2 * s); c.lineTo(5 * s, -h + 2 * s); c.closePath(); c.fill();
    brush(c, [[0, -h + 6 * s], [-7 * s, -h + 18 * s], [-3 * s, -h + 30 * s]], { w: 7 * s, col: [178, 40, 34], tone: 0.85, dry: 0.7, seed: 340 + i, tail: 0.8 });
    c.restore();
  }
};

// ---------- 铁骑阵列：n 骑错相位，越远越小越淡（西凉铁骑的招牌） ----------
// o: { lead: 首骑用锦马超；charge: 冲锋姿（枪放平）}
Z.cavalry = (c, t, { x = 200, y = 880, n = 5, s = 1.1, gap = 178, speed = 1, seed = 1, flip = 0, lead = 1, charge = 0 } = {}) => {
  for (let i = 0; i < n; i++) {
    const px = x + i * gap * (flip ? -1 : 1);
    const py = y - i * 10;
    const sc = s * (1 - i * 0.13);
    const ph = t * 8 * speed + i * 0.9 + seed;
    c.save(); c.globalAlpha = clamp(1 - i * 0.15);
    Z.horse(c, px, py, sc, ph, { gallop: 1, flip, tone: 0.88 - i * 0.07 });
    if (i === 0 && lead) Z.mChao(c, px, py, sc, ph, { flip, spearAng: charge ? -0.06 : -0.42, cape: 1 });
    else Z.rider(c, px, py, sc, ph, { flip, cape: i < 2, backFlag: i < 2 ? 1 : 0, spearAng: charge ? -0.05 : -0.34, spearLen: 300 });
    c.restore();
  }
};

// ---------- 锦马超立马：银甲白袍＋狮盔白缨＋长枪（浓墨马背上的亮部） ----------
// 与赵云的区别在甲：赵云淡墨袍，马超是白袍＋成片银甲，人更亮
Z.mChao = (c, x, y, s, phase, o = {}) => {
  const { spearAng = -0.4, spearLen = 330, cape = 1, backFlag = 1, flip = 0 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  const bob = Math.sin(phase * 2) * 5, sway = Math.sin(phase * 1.1) * 0.03;
  c.translate(0, bob * 0.6); c.rotate(sway);
  // 背旗：素白锦旗（不是红旗——锦马超的"锦"）
  if (backFlag) {
    const a = -0.5 + Math.sin(phase * 2.2) * 0.12;
    c.save(); c.translate(-40, -132); c.rotate(a);
    brush(c, [[0, 0], [-4, -78]], { w: 5, tone: 0.9, dry: 0.4, seed: 700 });
    c.fillStyle = 'rgba(250,247,238,.95)'; c.beginPath();
    c.moveTo(-4, -76); c.lineTo(-62 - Math.sin(phase * 3) * 8, -60); c.lineTo(-8, -30); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(40,36,30,.6)'; c.lineWidth = 2; c.stroke();
    c.restore();
  }
  // 白披风
  if (cape) {
    const f = Math.sin(phase * 2.4) * 14;
    c.save();
    c.fillStyle = 'rgba(255,253,248,.97)';
    c.beginPath(); c.moveTo(-22, -132); c.quadraticCurveTo(-76 - f, -112, -104 - f * 1.6, -62);
    c.quadraticCurveTo(-58, -56, -28, -40); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,30,26,.7)'; c.lineWidth = 2.6; c.stroke();
    c.restore();
  }
  // 白袍＋银甲（亮：这是和赵云的分界）
  c.save();
  c.fillStyle = 'rgba(250,247,240,.72)';
  c.beginPath(); c.moveTo(-26, -128); c.lineTo(26, -132); c.lineTo(34, -78); c.lineTo(-30, -74); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,24,20,.9)'; c.lineWidth = 3; c.stroke();
  // 银甲：三层鱼鳞，冷灰反光
  [[-14, -108, 38], [-10, -90, 42], [-6, -72, 44]].forEach(([ax, ay, w], i) => {
    const g = c.createLinearGradient(ax, ay - 6, ax + w, ay);
    g.addColorStop(0, 'rgba(168,178,192,.95)'); g.addColorStop(0.5, 'rgba(214,222,232,.95)'); g.addColorStop(1, 'rgba(136,146,160,.9)');
    c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 2); c.lineTo(ax + w, ay + 8); c.lineTo(ax, ay + 10); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(40,44,52,.6)'; c.lineWidth = 1.4; c.stroke();
  });
  // 束腰（狮甲绊）
  brush(c, [[-24, -60], [2, -56], [30, -60]], { w: 12, col: [58, 74, 96], tone: 0.9, dry: 0.3, seed: 711 });
  c.restore();
  // 头：狮盔（兽面＋白缨，不是普通兜鍪）
  c.save(); c.translate(26, -156);
  c.fillStyle = 'rgba(250,242,228,.97)'; c.beginPath(); c.ellipse(0, 0, 15, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(120,128,142,.95)'; c.beginPath();                       // 狮盔
  c.moveTo(-18, -8); c.quadraticCurveTo(0, -32, 18, -8); c.lineTo(15, -2); c.lineTo(-15, -2); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(36,40,48,.8)'; c.lineWidth = 1.8; c.stroke();
  c.fillStyle = 'rgba(220,226,236,.95)'; c.beginPath();                       // 狮面额当
  c.moveTo(-7, -14); c.quadraticCurveTo(0, -24, 7, -14); c.closePath(); c.fill();
  c.fillStyle = 'rgba(46,42,38,.9)'; c.beginPath(); c.arc(-4, -8, 1.8, 0, Math.PI * 2); c.fill();     // 兽目
  brush(c, [[0, -26], [9, -44], [3, -58]], { w: 6, col: [252, 250, 244], tone: 0.95, dry: 0.55, seed: 713, tail: 0.75, bristles: 4 });  // 白缨
  c.fillStyle = 'rgba(20,18,16,.9)'; c.beginPath(); c.arc(6, 2, 2.2, 0, Math.PI * 2); c.fill();
  c.restore();
  // 双臂持枪
  brush(c, [[24, -120], [52, -108], [76, -102]], { w: 12, tone: 0.5, dry: 0.4, seed: 721, head: 0.1, tail: 0.2 });
  brush(c, [[26, -116], [46, -96], [58, -78]], { w: 11, tone: 0.5, dry: 0.4, seed: 722, head: 0.1, tail: 0.2 });
  c.restore();
  const hx = flip ? -76 : 76, ha = flip ? Math.PI - spearAng : spearAng;
  Z.spear(c, x + hx * s, y + (-102 + bob * 0.6) * s, ha, spearLen * s, phase, { ring: 1 });
};

// ---------- 锦马超立姿（受印用）：银甲白袍＋狮盔，双手捧印举过头顶 ----------
// o: { lift: 0→1 举印；spear: 是否仍持枪 }
Z.mChaoStand = (c, x, y, s, t, o = {}) => {
  const { lift = 0, cape = 1, spear = 0 } = o;
  const br = Math.sin(t * 2.2) * 0.02;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(br * 0.4);
  if (cape) {
    const f = Math.sin(t * 1.6) * 12;
    c.fillStyle = 'rgba(255,253,248,.97)';
    c.beginPath(); c.moveTo(-14, -146); c.quadraticCurveTo(-74 - f, -112, -100 - f * 1.4, -22);
    c.quadraticCurveTo(-48, -20, -20, 0); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,30,26,.72)'; c.lineWidth = 2.4; c.stroke();
  }
  // 白袍
  c.fillStyle = 'rgba(250,247,240,.72)';
  c.beginPath(); c.moveTo(-22, -148); c.lineTo(24, -152); c.lineTo(34, 0); c.lineTo(-32, 4); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(24,22,20,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-14, -70], [-8, -34], [-3, -6]], { w: 3.5, tone: 0.34, dry: 0.65, seed: 735, tail: 0.6, bristles: 3 });
  brush(c, [[20, -72], [24, -36], [26, -8]], { w: 3, tone: 0.3, dry: 0.65, seed: 737, tail: 0.6, bristles: 3 });
  brush(c, [[-20, -100], [0, -96], [22, -100]], { w: 12, col: [58, 74, 96], tone: 0.9, dry: 0.3, seed: 731 });
  // 银甲
  [[-12, -132, 36], [-8, -116, 40], [-4, -100, 42]].forEach(([ax, ay, w], i) => {
    const g = c.createLinearGradient(ax, ay - 6, ax + w, ay);
    g.addColorStop(0, 'rgba(168,178,192,.95)'); g.addColorStop(0.5, 'rgba(214,222,232,.95)'); g.addColorStop(1, 'rgba(136,146,160,.9)');
    c.fillStyle = g; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + w, ay - 2); c.lineTo(ax + w, ay + 9); c.lineTo(ax, ay + 11); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(40,44,52,.55)'; c.lineWidth = 1.4; c.stroke();
  });
  // 头：狮盔
  c.save(); c.translate(24, -178);
  c.fillStyle = 'rgba(250,242,228,.97)'; c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.88)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(120,128,142,.95)'; c.beginPath();
  c.moveTo(-18, -9); c.quadraticCurveTo(0, -32, 18, -9); c.lineTo(16, -3); c.lineTo(-16, -3); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(36,40,48,.8)'; c.lineWidth = 1.8; c.stroke();
  c.fillStyle = 'rgba(220,226,236,.95)'; c.beginPath(); c.moveTo(-7, -15); c.quadraticCurveTo(0, -26, 7, -15); c.closePath(); c.fill();
  brush(c, [[0, -28], [10, -46], [4, -60]], { w: 6, col: [252, 250, 244], tone: 0.95, dry: 0.55, seed: 732, tail: 0.75, bristles: 4 });
  c.fillStyle = 'rgba(20,18,16,.9)'; c.beginPath(); c.arc(7, 1, 2.3, 0, Math.PI * 2); c.fill();
  c.restore();
  // 双臂：举印（lift 0→1 由胸前抬过头顶）
  const rl = ease.out(clamp(lift));
  const hy = lerp(-118, -206, rl);
  brush(c, [[18, -140], [30, lerp(-132, -178, rl)], [22, hy]], { w: 12, tone: 0.5, dry: 0.4, seed: 733, head: 0.1, tail: 0.2 });
  brush(c, [[18, -136], [46, lerp(-128, -172, rl)], [40, hy]], { w: 11, tone: 0.5, dry: 0.4, seed: 734, head: 0.1, tail: 0.2 });
  c.restore();
  if (spear) Z.spear(c, x + 74 * s, y + (-152) * s, -0.9, 330 * s, t, { ring: 1 });
  return { hx: x + 31 * s, hy: y + hy * s };            // 印的位置（给场景画印用）
};

// ---------- 关城 / 城楼：夯土城墙＋门洞＋檐＋旗 ----------
Z.gateTower = (c, x, y, s, o = {}) => {
  const { flagDrop = 0, t = 0, seed = 1 } = o;          // flagDrop: 0→1 旗降
  c.save(); c.translate(x, y); c.scale(s, s);
  // 墙身
  c.fillStyle = 'rgba(214,200,172,.62)';
  c.beginPath(); c.moveTo(-260, 0); c.lineTo(-260, -300); c.lineTo(260, -300); c.lineTo(260, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(54,46,36,.85)'; c.lineWidth = 3.4; c.stroke();
  // 夯土层线
  c.strokeStyle = 'rgba(70,58,44,.4)'; c.lineWidth = 1.8;
  for (let i = 1; i < 6; i++) { const yy = -i * 50; c.beginPath(); c.moveTo(-260, yy); c.lineTo(260, yy); c.stroke(); }
  // 门洞（拱）
  c.fillStyle = 'rgba(44,36,28,.82)';
  c.beginPath(); c.moveTo(-64, 0); c.lineTo(-64, -96); c.quadraticCurveTo(0, -152, 64, -96); c.lineTo(64, 0); c.closePath(); c.fill();
  // 女墙
  c.fillStyle = 'rgba(210,196,168,.7)'; c.strokeStyle = 'rgba(54,46,36,.85)'; c.lineWidth = 2.6;
  for (let i = -5; i <= 5; i++) { const bx = i * 48 - 22; c.beginPath(); c.rect(bx, -330, 44, 30); c.fill(); c.stroke(); }
  // 檐（城楼顶）
  c.fillStyle = 'rgba(58,50,42,.9)';
  c.beginPath(); c.moveTo(-190, -330); c.quadraticCurveTo(0, -392, 190, -330); c.lineTo(150, -330); c.quadraticCurveTo(0, -372, -150, -330); c.closePath(); c.fill();
  // 旗：可降
  if (flagDrop < 1) {
    const fy = lerp(-300, -120, ease.inOut(clamp(flagDrop)));
    Z.flag(c, 150, -330, 330 - (-330) + fy + 330, t, { col: 'rgba(176,48,38,.88)', seed: seed + 3 });
  }
  c.restore();
};

// ---------- 残旗（倒下的旗）：杆斜、旗面垂 ----------
Z.fallenFlag = (c, x, y, fall, t, { seed = 2, col = 'rgba(176,48,38,.8)' } = {}) => {
  const f = ease.inOut(clamp(fall));
  c.save(); c.translate(x, y); c.rotate(f * 1.15);
  brush(c, [[0, 0], [0, -170]], { w: 6, tone: 0.85, dry: 0.5, seed: 860 + seed });
  c.save(); c.translate(2, -168 + 4); c.rotate(-0.2 - f * 0.5);
  const fw = 92, fh = 58;
  c.fillStyle = col;
  c.beginPath(); c.moveTo(0, 0);
  c.quadraticCurveTo(fw * 0.5, -6 + Math.sin(t * 3 + seed) * 5, fw, 4);
  c.lineTo(fw, fh); c.quadraticCurveTo(fw * 0.5, fh + 8, 0, fh); c.closePath(); c.fill();
  c.restore(); c.restore();
};

// ---------- 孤灯（片尾病榻）：一小团暖光＋灯焰摇 ----------
Z.lamp = (c, x, y, s, t) => {
  c.save(); c.translate(x, y); c.scale(s, s);
  const g = c.createRadialGradient(0, 0, 2, 0, 0, 130);
  g.addColorStop(0, 'rgba(255,214,140,.55)'); g.addColorStop(0.35, 'rgba(255,196,110,.20)'); g.addColorStop(1, 'rgba(255,190,100,0)');
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, 130, 0, Math.PI * 2); c.fill();
  brush(c, [[0, 26], [-2, 4]], { w: 9, tone: 0.7, dry: 0.4, seed: 940 });
  const fl = Math.sin(t * 7) * 2.2;
  c.fillStyle = 'rgba(255,206,120,.95)';
  c.beginPath(); c.moveTo(-7, 2); c.quadraticCurveTo(fl, -22, 7, 2); c.closePath(); c.fill();
  c.restore();
};
})();
