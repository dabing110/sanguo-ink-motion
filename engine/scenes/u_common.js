// 《左慈》专属笔法库：乌角先生（白藤冠＋青懒衣＋眇一目＋跛一足＋拂尘）、
//   十种幻术元素（柑橘／墨龙／牡丹／鲈鱼／紫芽姜／分杯玉簪／白鸠／羊群／分身青气／白鹤）、
//   峨嵋雷电与遁甲天书、幻术墨圈与墨尘。
// 依赖：z_common.js（宣纸/远山/云气/榜题/钤印/大字）+ w_common.js（垂帷/墨云/曹公立姿）。
// 调性：写意不写实——龙取肝只画一团朱色，斩首只画青气，绝不画血腥。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 幻术墨圈：三重旋转墨环（幻术的通用语言）----------
Z.magicRing = (c, x, y, r, t, o = {}) => {
  const { a = .5, seed = 1, col = '58,78,118', spin = .6 } = o;
  c.save(); c.translate(x, y); c.rotate(t * spin + seed);
  for (let k = 0; k < 3; k++) {
    c.globalAlpha = a * (1 - k * .26);
    c.strokeStyle = `rgba(${col},.9)`; c.lineWidth = 3 - k * .7;
    c.beginPath();
    for (let i = 0; i <= 64; i++) {
      const q = i / 64, ang = q * Math.PI * 2 + k * 1.1;
      const rr = r * (1 - k * .16) + Math.sin(q * Math.PI * 6 + t * 3 + k) * 6;
      const px = Math.cos(ang) * rr, py = Math.sin(ang) * rr * .78;
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.stroke();
  }
  c.restore();
};

// ---------- 墨尘：绕心旋转的墨点（幻术起手／持续运动的帧差底）----------
Z.inkMotes = (c, x, y, r, t, o = {}) => {
  const { n = 20, seed = 3, a = .5, col = '44,48,62', speed = 1, ry = .72 } = o;
  const rr = rng(seed);
  c.save();
  for (let k = 0; k < n; k++) {
    const ang = t * speed * (.6 + rr() * .9) + rr() * Math.PI * 2;
    const rad = r * (.35 + rr() * .8) + Math.sin(t * 2 + k) * 9;
    c.fillStyle = `rgba(${col},${a * (.3 + rr() * .7)})`;
    c.beginPath(); c.arc(x + Math.cos(ang) * rad, y + Math.sin(ang) * rad * ry, 1.6 + rr() * 3.4, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 青气：上升的青色气柱（分身被斩／遁术）----------
Z.qingQi = (c, x, y, h, t, a, o = {}) => {
  if (a <= 0) return;
  const { w = 26, seed = 5 } = o;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(a);
  for (let k = 0; k < 6; k++) {
    const ph = ((t * .55 + k / 6 + rr() * .2) % 1);
    const py = y - ph * h;
    const px = x + Math.sin(ph * 6 + k + t * .8) * 18 * (0.3 + ph);
    c.globalAlpha = clamp(a) * .5 * (1 - ph);
    c.fillStyle = 'rgba(96,168,168,.9)';
    c.beginPath(); c.ellipse(px, py, w * (.4 + ph * .9), w * (.28 + ph * .5), 0, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 左慈：乌角先生（单位坐标，原点＝脚底，头顶 ≈ -212）----------
// o: { t, flip, raise(抬手施术), staff(拄杖), fade(淡入), bow, whisk(拂尘) }
Z.zuoci = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, raise = 0, staff = 1, fade = 1, bow = 0, whisk = 1 } = o;
  const br = Math.sin(t * 1.4) * .012;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.4) * 2.5);
  c.rotate(br * .5 + bow * .12);

  // ---- 跛足：一腿实一腿虚（拖后）----
  brush(c, [[-14, -6], [-18, 22]], { w: 13, tone: .5, dry: .55, seed: 601 });            // 实腿
  brush(c, [[16, -6], [22, 16], [26, 26]], { w: 11, tone: .32, dry: .7, seed: 602 });     // 跛腿（虚淡）
  c.save(); c.globalAlpha = clamp(fade) * .9;
  c.fillStyle = 'rgba(52,48,44,.85)';
  c.beginPath(); c.ellipse(-18, 28, 15, 7, 0, 0, Math.PI * 2); c.fill();                  // 鞋
  c.beginPath(); c.ellipse(28, 32, 12, 6, .2, 0, Math.PI * 2); c.fill();
  c.restore();

  // ---- 青懒衣（宽袍，青灰没骨＋浓墨衣纹）----
  const hem = Math.sin(t * 1.5) * 5;
  c.save();
  c.fillStyle = 'rgba(112,132,140,.62)';
  c.beginPath();
  c.moveTo(-30, -152);
  c.quadraticCurveTo(-52, -80, -56 + hem, -6);
  c.quadraticCurveTo(0, 4 + hem * .4, 56 + hem * .6, -6);
  c.quadraticCurveTo(50, -82, 30, -152);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,34,38,.88)'; c.lineWidth = 3; c.stroke();
  c.restore();
  // 衣纹三笔
  brush(c, [[-20, -140], [-14, -84], [-20, -26]], { w: 3.2, tone: .34, dry: .68, seed: 611, tail: .6, bristles: 3 });
  brush(c, [[8, -138], [14, -80], [8, -22]], { w: 2.8, tone: .3, dry: .68, seed: 612, tail: .6, bristles: 3 });
  brush(c, [[32, -142], [38, -86], [34, -30]], { w: 2.4, tone: .26, dry: .68, seed: 613, tail: .6, bristles: 3 });
  // 交领（青衣右衽）
  brush(c, [[-16, -152], [-2, -132], [18, -150]], { w: 3.4, tone: .7, dry: .4, seed: 614 });
  // 腰带（麻绳）
  brush(c, [[-34, -110], [0, -105], [34, -110]], { w: 8, tone: .55, dry: .55, seed: 615, col: [140, 122, 88] });

  // ---- 双臂 ----
  const rl = ease.out(clamp(raise));
  // 左臂（垂，拄杖）
  brush(c, [[-28, -148], [-44, -110 - 10 * rl], [-40, -70 - 16 * rl]], { w: 15, tone: .4, dry: .5, seed: 621, head: .1, tail: .2 });
  // 右臂（抬，施术）
  brush(c, [[28, -148], [46, -126 - 26 * rl], [58, -156 - 52 * rl]], { w: 14, tone: .4, dry: .5, seed: 622, head: .1, tail: .2 });
  // 右手（施术时张开）
  const hy = -156 - 52 * rl, hx = 58;
  c.fillStyle = 'rgba(246,238,222,.96)';
  c.beginPath(); c.ellipse(hx + 4, hy, 10, 11, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,26,24,.82)'; c.lineWidth = 2; c.stroke();

  // ---- 头（眇一目：右眼闭合）----
  c.save(); c.translate(0, -180 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(248,241,228,.97)';
  c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(26,24,22,.86)'; c.lineWidth = 2.2; c.stroke();
  // 左眼（睁）
  c.fillStyle = 'rgba(24,22,20,.9)';
  c.beginPath(); c.ellipse(-6, 1, 3.4, 4.2, 0, 0, Math.PI * 2); c.fill();
  // 右眼（眇：一道闭痕）
  c.strokeStyle = 'rgba(26,24,22,.85)'; c.lineWidth = 2.2; c.lineCap = 'round';
  c.beginPath(); c.moveTo(2, 2); c.lineTo(10, 0); c.stroke();
  // 长须（三笔垂下，随风）
  brush(c, [[-6, 14], [-8, 34], [-6, 52]], { w: 5, tone: .78, dry: .6, seed: 631, tail: .7, bristles: 4 });
  brush(c, [[4, 14], [6, 36], [3, 54]], { w: 4.5, tone: .74, dry: .6, seed: 632, tail: .7, bristles: 4 });
  brush(c, [[-1, 12], [0, 30]], { w: 6, tone: .7, dry: .65, seed: 633, tail: .7, bristles: 5 });
  // 白藤冠（白藤编织：一圈白＋交叉纹）
  c.save();
  c.fillStyle = 'rgba(252,250,244,.96)';
  c.beginPath();
  c.moveTo(-19, -12); c.quadraticCurveTo(0, -34, 19, -12);
  c.lineTo(16, -6); c.lineTo(-16, -6); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,28,26,.8)'; c.lineWidth = 2; c.stroke();
  c.strokeStyle = 'rgba(90,84,70,.55)'; c.lineWidth = 1.4;
  for (let k = -2; k <= 2; k++) { c.beginPath(); c.moveTo(k * 7, -30 + Math.abs(k) * 3); c.lineTo(k * 7 + 3, -7); c.stroke(); }
  c.restore();
  c.restore();

  // ---- 拂尘（右手持，白丝随术飘）----
  if (whisk) {
    c.save(); c.translate(hx + 6, hy + 6); c.rotate(-.5 + Math.sin(t * 1.3) * .12);
    brush(c, [[0, 0], [4, -34]], { w: 6, tone: .7, dry: .4, seed: 641, col: [86, 70, 52] });
    for (let k = 0; k < 7; k++) {
      const a0 = -.9 + k * .22 + Math.sin(t * 1.9 + k) * .12;
      brush(c, [[4, -32], [4 + Math.cos(a0) * 26, -32 + Math.sin(a0) * 26], [4 + Math.cos(a0) * 48, -30 + Math.sin(a0) * 48]],
        { w: 2.6, tone: .3, dry: .7, seed: 650 + k, tail: .8, bristles: 3 });
    }
    c.restore();
  }
  // ---- 拄杖 ----
  if (staff) brush(c, [[-42, -66], [-52, -20], [-56, 26]], { w: 7, tone: .74, dry: .5, seed: 661, col: [96, 78, 56] });

  c.restore();
};

// ---------- 柑橘（o.open: 0 整颗 / 1 剖开；o.empty: 剖开后空壳 / 0 有肉）----------
Z.orange = (c, x, y, s, o = {}) => {
  const { open = 0, empty = 0, t = 0, seed = 1, col = [226, 148, 62] } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  if (open <= 0) {
    c.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},.95)`;
    c.beginPath(); c.arc(0, 0, 26, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,48,20,.7)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(120,140,80,.9)'; c.beginPath(); c.ellipse(-8, -24, 7, 4, -.4, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(255,250,230,.35)'; c.beginPath(); c.ellipse(-9, -9, 8, 6, -.5, 0, Math.PI * 2); c.fill();
  } else {
    // 果皮（两半）
    c.fillStyle = 'rgba(212,132,52,.95)';
    c.beginPath(); c.arc(0, 0, 27, Math.PI, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,48,20,.75)'; c.lineWidth = 2.4; c.stroke();
    c.fillStyle = 'rgba(250,240,214,.95)';
    c.beginPath(); c.arc(0, 0, 22, Math.PI, Math.PI * 2); c.fill();       // 内瓤白络
    c.strokeStyle = 'rgba(150,130,90,.5)'; c.lineWidth = 1.4; c.stroke();
    if (empty) {
      // 空壳：内里是空（纸色）＋一丝青气
      c.fillStyle = 'rgba(240,232,212,.98)';
      c.beginPath(); c.arc(0, 0, 19, Math.PI, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(120,100,70,.55)'; c.lineWidth = 1.6; c.stroke();
      c.strokeStyle = 'rgba(96,168,168,.5)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(-8, -6); c.quadraticCurveTo(0 + Math.sin(t * 2) * 4, -16, 8, -6); c.stroke();
    } else {
      // 有肉：橘瓣扇形
      c.fillStyle = 'rgba(238,168,74,.95)';
      for (let k = 0; k < 6; k++) {
        const a0 = Math.PI + k * (Math.PI / 6) + .05, a1 = a0 + Math.PI / 6 - .1;
        c.beginPath(); c.moveTo(0, -2); c.arc(0, -2, 18, a0, a1); c.closePath(); c.fill();
      }
      c.strokeStyle = 'rgba(190,120,40,.6)'; c.lineWidth = 1.2;
      c.beginPath(); c.arc(0, -2, 18, Math.PI, Math.PI * 2); c.stroke();
    }
  }
  c.restore();
};

// ---------- 墨龙：一笔蜿蜒的龙身＋龙爪＋龙首；o.glow: 腹开露朱（龙肝）----------
Z.dragon = (c, x, y, s, t, o = {}) => {
  const { prog = 1, glow = 0, seed = 7 } = o;
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const q = i / 10;
    pts.push([x + (q - .5) * 620 * s, y + Math.sin(q * Math.PI * 2.2 + t * 1.1 + seed) * 70 * s - q * 40 * s]);
  }
  brush(c, pts, { w: 34, tone: .82, dry: .45, seed: 701, head: .12, tail: .35, bristles: 9, reveal: clamp(prog) });
  // 背鳍
  for (let i = 1; i < 10; i++) {
    const q = i / 10, p = pts[i];
    leaf(c, p[0], p[1] - 20 * s, -1.2 + Math.sin(t * 2 + i) * .15, 26 * s, 9 * s, .7);
  }
  // 龙首（末端）
  const hd = pts[10];
  c.save(); c.translate(hd[0], hd[1]); c.scale(s, s); c.rotate(-.25 + Math.sin(t * 1.2) * .08);
  c.fillStyle = 'rgba(34,32,36,.92)';
  c.beginPath(); c.moveTo(-26, -14); c.quadraticCurveTo(10, -34, 44, -12);
  c.quadraticCurveTo(20, 6, -26, 8); c.closePath(); c.fill();
  brush(c, [[10, -30], [22, -56], [8, -70]], { w: 6, tone: .8, dry: .5, seed: 711, tail: .5, bristles: 4 });  // 角
  c.fillStyle = 'rgba(250,244,230,.95)';
  c.beginPath(); c.arc(24, -16, 4, 0, Math.PI * 2); c.fill();                                                  // 目
  c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(25, -16, 2, 0, Math.PI * 2); c.fill();
  brush(c, [[42, -6], [56, 4], [44, 12]], { w: 5, tone: .7, dry: .5, seed: 712, tail: .6, bristles: 3 });       // 须
  c.restore();
  // 龙爪
  brush(c, [[x - 40 * s, y + 30 * s], [x - 70 * s, y + 62 * s], [x - 40 * s, y + 74 * s]], { w: 7, tone: .8, dry: .5, seed: 721 });
  brush(c, [[x + 130 * s, y + 40 * s], [x + 160 * s, y + 70 * s], [x + 126 * s, y + 82 * s]], { w: 7, tone: .8, dry: .5, seed: 722 });
  // 腹开露朱（龙肝，写意一团朱色）
  if (glow > 0) {
    c.save(); c.globalAlpha = clamp(glow);
    c.globalCompositeOperation = 'lighter';
    const g = c.createRadialGradient(x + 20 * s, y + 6 * s, 2, x + 20 * s, y + 6 * s, 74 * s);
    g.addColorStop(0, 'rgba(220,72,60,.85)'); g.addColorStop(1, 'rgba(200,60,50,0)');
    c.fillStyle = g; c.beginPath(); c.arc(x + 20 * s, y + 6 * s, 74 * s, 0, Math.PI * 2); c.fill();
    c.restore();
    c.save(); c.globalAlpha = clamp(glow) * .9;
    c.fillStyle = 'rgba(168,40,36,.92)';
    c.beginPath(); c.ellipse(x + 20 * s, y + 4 * s, 22 * s, 13 * s, .2, 0, Math.PI * 2); c.fill();
    c.restore();
  }
};

// ---------- 牡丹（没骨：花瓣层层＋墨叶）----------
Z.peony = (c, x, y, s, t, o = {}) => {
  const { bloom = 1, seed = 11, col = [222, 96, 116] } = o;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(t * 1.1) * .06);
  // 叶
  leaf(c, -30, 16, 2.5, 46, 22, .5, [74, 104, 72]);
  leaf(c, 28, 20, .7, 42, 20, .46, [74, 104, 72]);
  brush(c, [[-6, 30], [-2, 62]], { w: 7, tone: .7, dry: .5, seed: 731, col: [80, 96, 68] });
  // 花瓣（三层）
  const bl = clamp(bloom);
  for (let layer = 0; layer < 3; layer++) {
    const n = 6 - layer, rr = (34 - layer * 8) * bl, cc = col;
    for (let k = 0; k < n; k++) {
      const a = k * (Math.PI * 2 / n) + layer * .5 + t * .15;
      c.save(); c.globalAlpha = .78 - layer * .1;
      c.fillStyle = `rgba(${cc[0] + layer * 14},${cc[1] + layer * 22},${cc[2] + layer * 20},.9)`;
      c.beginPath();
      c.ellipse(Math.cos(a) * layer * 5, Math.sin(a) * layer * 5 - layer * 3, rr * .52, rr * .38, a, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = 'rgba(120,52,66,.5)'; c.lineWidth = 1.6; c.stroke();
      c.restore();
    }
  }
  // 花心
  c.fillStyle = 'rgba(198,164,64,.95)'; c.beginPath(); c.arc(0, 0, 5 * bl, 0, Math.PI * 2); c.fill();
  c.restore();
};

// ---------- 鲈鱼（水墨：一笔身＋尾＋鳍）----------
Z.fish = (c, x, y, s, t, o = {}) => {
  const { flip = 0, seed = 13, wig = 1 } = o;
  const w = Math.sin(t * 5 + seed) * .12 * wig;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(w + Math.sin(t * 2 + seed) * .1);
  brush(c, [[-46, 0], [-16, -12], [20, -8], [46, 0]], { w: 22, tone: .8, dry: .45, seed: 741 + seed, head: .12, tail: .3, bristles: 6 });
  leaf(c, -46, 0, Math.PI + .5 + w, 30, 16, .8);                     // 尾
  leaf(c, -2, -13, -1.5, 22, 10, .7);                                // 背鳍
  leaf(c, 6, 10, 1.3, 18, 9, .6);                                    // 腹鳍
  c.fillStyle = 'rgba(20,18,16,.92)'; c.beginPath(); c.arc(34, -3, 3.2, 0, Math.PI * 2); c.fill();   // 目
  brush(c, [[-30, 4], [10, 8], [44, 2]], { w: 2.4, tone: .3, dry: .7, seed: 751 + seed, tail: .6, bristles: 3 });  // 侧线
  c.restore();
};

// ---------- 紫芽姜（盆中姜块）----------
Z.ginger = (c, x, y, s, o = {}) => {
  const { grow = 1, seed = 17 } = o;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s);
  for (let k = 0; k < 7; k++) {
    const a = rr() * Math.PI * 2, d = rr() * 42 * clamp(grow);
    const px = Math.cos(a) * d, py = Math.sin(a) * d * .5;
    c.fillStyle = `rgba(198,152,96,.92)`;
    c.beginPath(); c.ellipse(px, py, 15 + rr() * 10, 9 + rr() * 6, rr() * 3, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(110,72,36,.75)'; c.lineWidth = 2; c.stroke();
    if (rr() < .5) { c.fillStyle = 'rgba(150,190,120,.9)'; c.beginPath(); c.ellipse(px, py - 12, 3, 9, .1, 0, Math.PI * 2); c.fill(); } // 紫芽
  }
  c.restore();
};

// ---------- 酒杯（o.split: 0→1 被玉簪一分为二）----------
Z.wineCup = (c, x, y, s, t, o = {}) => {
  const { split = 0, seed = 19, col = [206, 196, 176] } = o;
  c.save(); c.translate(x, y); c.scale(s, s);
  const half = (sg) => {
    c.save(); c.translate(sg * split * 26, sg * split * 8);
    c.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},.95)`;
    c.beginPath();
    if (sg < 0) { c.moveTo(-24, -4); c.lineTo(0, -4); c.lineTo(-6, 26); c.lineTo(-16, 26); c.closePath(); }
    else { c.moveTo(0, -4); c.lineTo(24, -4); c.lineTo(16, 26); c.lineTo(6, 26); c.closePath(); }
    c.fill();
    c.strokeStyle = 'rgba(60,52,44,.8)'; c.lineWidth = 2.2; c.stroke();
    // 酒面
    c.fillStyle = 'rgba(196,168,96,.75)';
    c.beginPath(); c.ellipse(sg < 0 ? -12 : 12, -2, sg < 0 ? 12 : 12, 3.4, 0, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  half(-1); half(1);
  // 底座
  if (split < .3) {
    c.fillStyle = 'rgba(150,132,110,.9)';
    c.beginPath(); c.ellipse(0, 28, 16, 5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(60,52,44,.7)'; c.lineWidth = 1.8; c.stroke();
  }
  c.restore();
};

// ---------- 玉簪 ----------
Z.hairpin = (c, x, y, s, ang, o = {}) => {
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(ang);
  brush(c, [[-40, 0], [40, 0]], { w: 5, tone: .5, dry: .3, seed: 771, col: [180, 210, 200], head: .06, tail: .1 });
  c.fillStyle = 'rgba(214,238,230,.98)'; c.beginPath(); c.arc(44, 0, 6, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(70,90,86,.8)'; c.lineWidth = 1.6; c.stroke();
  c.restore();
};

// ---------- 白鸠（杯化的白鸽，振翅绕飞）----------
Z.dove = (c, x, y, s, t, o = {}) => {
  const { flap = 1, seed = 23 } = o;
  const f = Math.sin(t * 9) * .8 * flap;
  c.save(); c.translate(x, y); c.scale(s, s);
  c.fillStyle = 'rgba(253,251,246,.98)';
  c.beginPath(); c.ellipse(0, 0, 22, 13, -.15, 0, Math.PI * 2); c.fill();          // 身
  c.strokeStyle = 'rgba(40,38,40,.6)'; c.lineWidth = 1.8; c.stroke();
  c.beginPath(); c.arc(20, -8, 9, 0, Math.PI * 2); c.fill();                        // 头
  c.stroke();
  c.fillStyle = 'rgba(226,150,60,.95)'; c.beginPath(); c.moveTo(28, -8); c.lineTo(38, -5); c.lineTo(28, -3); c.closePath(); c.fill(); // 喙
  c.fillStyle = 'rgba(30,28,26,.9)'; c.beginPath(); c.arc(22, -10, 2.2, 0, Math.PI * 2); c.fill();
  // 双翅
  [[-1, f], [1, -f]].forEach(([sg, ff]) => {
    c.save(); c.translate(-2, -4); c.rotate(sg * .3 + ff * .55);
    leaf(c, 0, 0, sg > 0 ? -.5 : Math.PI + .5, 40, 17, .9, [250, 248, 242]);
    c.strokeStyle = 'rgba(70,66,60,.5)'; c.lineWidth = 1.4; c.stroke();
    c.restore();
  });
  leaf(c, -22, 2, Math.PI + .15, 26, 12, .85, [250, 248, 242]);                     // 尾
  c.restore();
};

// ---------- 羊（墨块群化；alive: 1 立 / 0 倒）----------
Z.sheep = (c, x, y, s, t, o = {}) => {
  const { alive = 1, seed = 29, flip = 0 } = o;
  const sw = Math.sin(t * 1.6 + seed) * 3;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s);
  if (!alive) c.rotate(1.35);
  // 身（一团墨）
  c.fillStyle = 'rgba(58,54,52,.86)';
  c.beginPath(); c.ellipse(0, -18, 34, 22, 0, 0, Math.PI * 2); c.fill();
  // 卷毛（几个圈）
  c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 2;
  [[-18, -22], [0, -26], [18, -20], [-8, -10], [12, -10]].forEach(([mx, my], k) => {
    c.beginPath(); c.arc(mx, my, 6 + (k % 3), 0, Math.PI * 2); c.stroke();
  });
  // 腿
  brush(c, [[-20, -4], [-22, 18]], { w: 6, tone: .8, dry: .5, seed: 781 + seed });
  brush(c, [[18, -4], [20, 18]], { w: 6, tone: .8, dry: .5, seed: 782 + seed });
  // 头
  c.save(); c.translate(alive ? 32 : 30, alive ? -34 : -12); c.rotate(alive ? sw * .02 : .6);
  c.fillStyle = 'rgba(44,42,40,.9)'; c.beginPath(); c.ellipse(0, 0, 12, 8, .3, 0, Math.PI * 2); c.fill();
  brush(c, [[6, 4], [16, 10]], { w: 5, tone: .8, dry: .5, seed: 783 + seed, tail: .5 });   // 嘴
  brush(c, [[-6, -6], [-14, -14]], { w: 4, tone: .85, dry: .5, seed: 784 + seed });        // 角
  c.restore();
  c.restore();
};

// ---------- 分身：淡墨重叠的人形（数百个的写意）----------
Z.clones = (c, x, y, s, n, t, a, o = {}) => {
  if (a <= 0) return;
  const { seed = 31, spread = 520, col = '44,52,70' } = o;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const px = x + (rr() - .5) * spread, py = y + (rr() - .5) * 190 + Math.sin(t * 1.4 + k) * 5;
    const al = .18 + rr() * .3;
    c.fillStyle = `rgba(${col},${al})`;
    c.beginPath(); c.ellipse(px, py - 30, 22, 34, 0, 0, Math.PI * 2); c.fill();   // 袍
    c.beginPath(); c.arc(px, py - 68, 11, 0, Math.PI * 2); c.fill();              // 头
  }
  c.restore();
};

// ---------- 白鹤（骑坐／振翅）----------
Z.crane = (c, x, y, s, t, o = {}) => {
  const { flap = 1, seed = 37 } = o;
  const f = Math.sin(t * 3.2) * .5 * flap;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(t * .9) * .05);
  // 身
  c.fillStyle = 'rgba(253,251,246,.98)';
  c.beginPath(); c.ellipse(0, 0, 42, 22, -.1, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(46,44,44,.6)'; c.lineWidth = 2; c.stroke();
  // 颈与头
  brush(c, [[34, -8], [62, -30], [76, -46]], { w: 9, tone: .2, dry: .3, seed: 791, col: [250, 248, 244] });
  c.beginPath(); c.arc(78, -48, 10, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(190,50,40,.95)'; c.beginPath(); c.arc(78, -56, 5, 0, Math.PI * 2); c.fill();    // 丹顶
  c.fillStyle = 'rgba(30,28,26,.9)'; c.beginPath(); c.moveTo(86, -50); c.lineTo(108, -46); c.lineTo(86, -42); c.closePath(); c.fill(); // 喙
  // 双翅
  [[-1, f], [1, -f]].forEach(([sg, ff]) => {
    c.save(); c.translate(-4, -8); c.rotate(sg * .35 + ff * .5);
    leaf(c, 0, 0, sg > 0 ? -.35 : Math.PI + .35, 84, 30, .92, [252, 250, 246]);
    c.strokeStyle = 'rgba(80,76,70,.45)'; c.lineWidth = 1.6; c.stroke();
    c.restore();
  });
  // 尾（墨色）
  leaf(c, -40, 4, Math.PI + .1, 40, 20, .8, [48, 46, 52]);
  // 腿
  brush(c, [[-10, 18], [-16, 52]], { w: 4, tone: .7, dry: .5, seed: 792 });
  brush(c, [[10, 18], [4, 52]], { w: 4, tone: .7, dry: .5, seed: 793 });
  c.restore();
};

// ---------- 雷电（劈开石壁）----------
Z.lightning = (c, x, y, t, a, o = {}) => {
  if (a <= 0) return;
  const { seed = 41, len = 320 } = o;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(a);
  c.strokeStyle = 'rgba(250,246,214,.95)'; c.lineWidth = 5; c.lineCap = 'round'; c.lineJoin = 'round';
  c.shadowColor = 'rgba(240,230,170,.9)'; c.shadowBlur = 22;
  for (let k = 0; k < 2; k++) {
    const pts = [[x + (rr() - .5) * 40, y]];
    let px = pts[0][0], py = y;
    for (let i = 1; i <= 6; i++) {
      px += (rr() - .5) * 90; py += len / 6;
      pts.push([px, py]);
    }
    c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
  }
  c.restore();
};

// ---------- 遁甲天书（三卷竹简／帛书，飞出）----------
Z.tianShu = (c, x, y, s, t, o = {}) => {
  const { fly = 0, seed = 43 } = o;
  for (let k = 0; k < 3; k++) {
    const a = -Math.PI / 2 + (k - 1) * .5 + Math.sin(t * 1.2 + k) * .06;
    const d = 30 + fly * (120 + k * 40);
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d * .6 - fly * 40;
    c.save(); c.translate(px, py); c.scale(s, s); c.rotate(a + Math.PI / 2 + .3);
    c.fillStyle = 'rgba(236,222,186,.96)';
    c.beginPath(); c.roundRect ? c.roundRect(-30, -50, 60, 100, 4) : c.rect(-30, -50, 60, 100);
    c.fill(); c.strokeStyle = 'rgba(70,56,36,.8)'; c.lineWidth = 2.2; c.stroke();
    c.strokeStyle = 'rgba(90,74,50,.5)'; c.lineWidth = 1.4;
    for (let i = -1; i <= 1; i++) { c.beginPath(); c.moveTo(i * 14, -44); c.lineTo(i * 14, 44); c.stroke(); }
    c.fillStyle = 'rgba(150,40,36,.9)';
    c.font = '20px "LXGWWenKai-500"'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(['天', '地', '人'][k], 0, 0);
    c.restore();
  }
};

// ---------- 于吉：鹤氅道人（单位坐标，原点＝脚底，头顶 ≈ -212）----------
// 与 Z.zuoci 同源但去「眇目／跛足」，改穿白羽鹤氅、戴黄冠、持藜杖挂葫芦、右手持符箓。
// o: { t, flip, raise(抬手施符), staff(藜杖), fade(淡入), bow, talisman(符箓) }
Z.yuji = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, raise = 0, staff = 1, fade = 1, bow = 0, talisman = 1 } = o;
  const br = Math.sin(t * 1.4) * .012;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.4) * 2.5);
  c.rotate(br * .5 + bow * .12);

  // ---- 双足（正常，无跛）----
  brush(c, [[-16, -6], [-20, 26]], { w: 13, tone: .5, dry: .55, seed: 901 });
  brush(c, [[16, -6], [20, 26]], { w: 13, tone: .5, dry: .55, seed: 902 });
  c.save(); c.globalAlpha = clamp(fade) * .9;
  c.fillStyle = 'rgba(52,48,44,.85)';
  c.beginPath(); c.ellipse(-20, 30, 14, 7, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(20, 30, 14, 7, 0, 0, Math.PI * 2); c.fill();
  c.restore();

  // ---- 鹤氅（白羽大氅：留白＋羽纹）----
  const hem = Math.sin(t * 1.5) * 5;
  c.save();
  c.fillStyle = 'rgba(248,246,240,.92)';
  c.beginPath();
  c.moveTo(-32, -152);
  c.quadraticCurveTo(-56, -80, -60 + hem, -6);
  c.quadraticCurveTo(0, 6 + hem * .4, 60 + hem * .6, -6);
  c.quadraticCurveTo(54, -82, 32, -152);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,44,52,.85)'; c.lineWidth = 3; c.stroke();
  c.restore();
  // 羽纹（鹤氅的羽片，淡墨短弧）
  for (let k = 0; k < 5; k++) {
    const yy = -140 + k * 24;
    c.save(); c.globalAlpha = clamp(fade) * (.42 - k * .05);
    c.strokeStyle = 'rgba(70,76,86,.8)'; c.lineWidth = 1.6;
    for (let j = -2; j <= 2; j++) {
      c.beginPath(); c.arc(j * 18, yy, 9, 0, Math.PI); c.stroke();
    }
    c.restore();
  }
  // 交领（右衽，青灰）
  brush(c, [[-18, -152], [-2, -130], [20, -150]], { w: 3.6, tone: .7, dry: .4, seed: 914, col: [86, 104, 118] });
  // 腰带（麻绳）
  brush(c, [[-36, -108], [0, -103], [36, -108]], { w: 8, tone: .55, dry: .55, seed: 915, col: [140, 122, 88] });

  // ---- 双臂 ----
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -148], [-46, -110 - 10 * rl], [-42, -70 - 16 * rl]], { w: 15, tone: .4, dry: .5, seed: 921, head: .1, tail: .2 });
  brush(c, [[30, -148], [48, -126 - 26 * rl], [60, -158 - 52 * rl]], { w: 14, tone: .4, dry: .5, seed: 922, head: .1, tail: .2 });
  const hy = -158 - 52 * rl, hx = 60;
  c.fillStyle = 'rgba(246,238,222,.96)';
  c.beginPath(); c.ellipse(hx + 4, hy, 10, 11, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,26,24,.82)'; c.lineWidth = 2; c.stroke();

  // ---- 头 ----
  c.save(); c.translate(0, -180 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(248,241,228,.97)';
  c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(26,24,22,.86)'; c.lineWidth = 2.2; c.stroke();
  // 双目（皆睁）
  c.fillStyle = 'rgba(24,22,20,.9)';
  c.beginPath(); c.ellipse(-6, 1, 3.2, 4.0, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(6, 1, 3.2, 4.0, 0, 0, Math.PI * 2); c.fill();
  // 长须
  brush(c, [[-6, 14], [-8, 34], [-6, 52]], { w: 5, tone: .78, dry: .6, seed: 931, tail: .7, bristles: 4 });
  brush(c, [[4, 14], [6, 36], [3, 54]], { w: 4.5, tone: .74, dry: .6, seed: 932, tail: .7, bristles: 4 });
  brush(c, [[-1, 12], [0, 30]], { w: 6, tone: .7, dry: .65, seed: 933, tail: .7, bristles: 5 });
  // 道冠（黄冠：较高竖起）
  c.save();
  c.fillStyle = 'rgba(60,64,84,.95)';
  c.beginPath();
  c.moveTo(-18, -10); c.quadraticCurveTo(0, -44, 18, -10);
  c.lineTo(15, -6); c.lineTo(-15, -6); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,22,30,.85)'; c.lineWidth = 2; c.stroke();
  c.fillStyle = 'rgba(150,122,62,.95)'; c.fillRect(-16, -30, 32, 6);
  c.restore();
  c.restore();

  // ---- 符箓（右手持，黄纸朱符，随术飘）----
  if (talisman) {
    c.save(); c.translate(hx + 6, hy + 4); c.rotate(-.3 + Math.sin(t * 1.3) * .1);
    c.fillStyle = 'rgba(240,224,150,.96)';
    c.fillRect(-9, -30, 18, 40);
    c.strokeStyle = 'rgba(40,30,20,.8)'; c.lineWidth = 1.6; c.strokeRect(-9, -30, 18, 40);
    c.strokeStyle = 'rgba(180,50,40,.92)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(0, -26); c.lineTo(0, 8); c.stroke();
    c.beginPath(); c.moveTo(-5, -18); c.lineTo(5, -18); c.stroke();
    c.beginPath(); c.moveTo(-4, -6); c.lineTo(4, -6); c.stroke();
    c.restore();
  }
  // ---- 藜杖（左手持，木杖挂葫芦）----
  if (staff) {
    brush(c, [[-46, -66], [-56, -20], [-60, 28]], { w: 7, tone: .74, dry: .5, seed: 961, col: [96, 78, 56] });
    c.save(); c.globalAlpha = clamp(fade);
    c.fillStyle = 'rgba(176,140,72,.92)';
    c.beginPath(); c.ellipse(-58, -34, 9, 7, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(-58, -24, 6, 5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(60,44,28,.8)'; c.lineWidth = 1.4; c.stroke();
    c.restore();
  }
  c.restore();
};

// ---------- 伏拜人群（百姓焚香伏道而拜；写意群像）----------
// o: { n, fade, seed, scale } —— 一排前倾团身、双掌伏地的小人，间以青烟。
Z.crowdBow = (c, x, y, s, t, o = {}) => {
  const { n = 7, fade = 1, seed = 17, scale = 1 } = o;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(fade);
  for (let k = 0; k < n; k++) {
    const px = x + (k - (n - 1) / 2) * 150 * s;
    const lean = 0.5 + 0.5 * Math.sin(t * 1.6 + k * 1.3);   // 0..1 起伏伏拜
    c.save(); c.translate(px, y); c.scale(s * scale, s * scale);
    c.translate(0, -lean * 6); c.rotate(lean * 0.5);
    c.fillStyle = 'rgba(70,74,86,.82)';
    c.beginPath(); c.ellipse(0, -40, 30, 44, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(30,32,40,.8)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = 'rgba(240,232,216,.95)';
    c.beginPath(); c.arc(-18, -72, 13, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(24,22,20,.8)'; c.lineWidth = 1.8; c.stroke();
    brush(c, [[-10, -36], [-40, -20], [-58, -14]], { w: 10, tone: .5, dry: .5, seed: 971 + k * 3, tail: .3 });
    brush(c, [[10, -36], [38, -22], [56, -14]], { w: 10, tone: .5, dry: .5, seed: 972 + k * 3, tail: .3 });
    if (k % 2 === 0) {
      c.save(); c.globalAlpha = .4 * clamp(fade);
      const sx = -58;
      for (let i = 0; i < 3; i++) {
        const ph = ((t * .5 + i / 3 + k * .1) % 1);
        const yy = -14 - ph * 90;
        const xx = sx + Math.sin(ph * 6 + k) * 8;
        c.fillStyle = 'rgba(150,140,120,.5)';
        c.beginPath(); c.ellipse(xx, yy, 3 + ph * 4, 5 + ph * 6, 0, 0, Math.PI * 2); c.fill();
      }
      c.restore();
    }
    c.restore();
  }
  c.restore();
};
})();
