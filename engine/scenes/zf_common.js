// 《甄后》专属笔法库：文昭甄皇后（中山无极人，明帝母；本传无名，「甄宓」为后世附会）。
// 依赖 z_common.js（宣纸/远山/云气/榜题/钤印/大字/尘/骑者/马）+ w_common.js（垂帷/墨云/浓墨烟带/炬火/营火/首领）。
// ⚠ 关键：z_common.js 里是 `const Z = window.Z = {}`（重置），本库必须写 `const Z = window.Z`（追加），
//    否则会把根库清空；且 eras 的 SCENE_LIBS 顺序必须是 z_common → w_common → zf_common。
// 形象（女性线第四人，与前三人的意象刻意区分）：
//   辛宪英＝素青深衣＋峨髻金簪＋竹简（判断）；王异＝灰褐战裙＋布韝＋短刀（行动）；
//   蔡文姬＝曲裾深衣＋倭堕髻＋琴／笔（才与痛）；甄后＝月白深衣＋垂髾高髻＋组绶玉佩（识）。
//   她全片都不拿兵器、不拿书——她手里只有一次东西：进言时抬起的手。
// 史实：全出《三国志·魏书·卷五·后妃传》及裴注引《魏书》《魏略》。不取洛神之说。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 玉衣（「每寝寐，家中彷彿见如有人持玉衣覆其上者」：一袭悬浮的淡青玉影）----------
Z.yuYi = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 11 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.translate(0, Math.sin(t * 0.9) * 8);                       // 悬浮呼吸
  // 玉片（缕：一片片缀成的光）
  for (let r = 0; r < 9; r++) {
    for (let col = 0; col < 7; col++) {
      const px = -108 + col * 36 + (r % 2) * 4;
      const py = -300 + r * 36;
      if (Math.abs(col - 3) > 3 - Math.floor(r / 4)) continue;   // 上衣窄、下摆宽：成衣形
      c.globalAlpha = clamp(a) * (0.3 + 0.34 * Math.sin(t * 1.6 + r * .7 + col * .5));
      c.fillStyle = 'rgba(206,222,214,.9)';
      c.beginPath(); c.rect(px, py, 30, 30); c.fill();
      c.strokeStyle = 'rgba(96,120,110,.7)'; c.lineWidth = 1.4; c.stroke();
    }
  }
  c.globalAlpha = clamp(a) * .5;
  c.strokeStyle = 'rgba(150,180,168,.8)'; c.lineWidth = 2.4;
  c.beginPath(); c.moveTo(-118, -304); c.quadraticCurveTo(-150, -160, -132, -6);
  c.lineTo(132, -6); c.quadraticCurveTo(150, -160, 118, -304); c.closePath(); c.stroke();
  c.restore();
};

// ---------- 卧榻（汉末：矮榻＋帷；o.curtain 帷幔）----------
Z.couch = (c, x, y, s, t, o = {}) => {
  const { a = 1, curtain = 1, seed = 21 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  brush(c, [[-190, 0], [190, -6]], { w: 16, tone: .62, dry: .5, seed: 2211, col: [98, 72, 46] });
  brush(c, [[-166, 6], [-160, 62]], { w: 11, tone: .6, dry: .55, seed: 2212, col: [94, 68, 44] });
  brush(c, [[166, 4], [160, 60]], { w: 11, tone: .6, dry: .55, seed: 2213, col: [94, 68, 44] });
  // 席
  c.fillStyle = 'rgba(226,214,186,.9)';
  c.beginPath(); c.moveTo(-176, -8); c.lineTo(176, -14); c.lineTo(172, -40); c.lineTo(-172, -34); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(58,46,34,.8)'; c.lineWidth = 2; c.stroke();
  // 帷（垂挂，随呼吸缓摆）
  if (curtain) {
    const sw = Math.sin(t * 1.1) * 8 + Math.sin(t * 0.53) * 5;
    c.save(); c.globalAlpha = clamp(a) * .8;
    c.fillStyle = 'rgba(150,132,110,.7)';
    c.beginPath(); c.moveTo(-210 + sw * .4, -40); c.lineTo(-190, -320); c.lineTo(-120, -318); c.lineTo(-110 + sw * .4, -40); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(210 - sw * .4, -40); c.lineTo(190, -320); c.lineTo(120, -318); c.lineTo(110 - sw * .4, -40); c.closePath(); c.fill();
    c.restore();
  }
  c.restore();
};

// ---------- 简册与笔砚（九岁喜书，视字辄识：她手里唯一拿过的东西）----------
Z.slate = (c, x, y, s, t, o = {}) => {
  const { a = 1, open = 1, seed = 31 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.rotate(Math.sin(t * 1.2) * .04);
  // 简册（三片竹简）
  for (let k = 0; k < 3; k++) {
    const px = -30 + k * 30;
    c.fillStyle = 'rgba(198,178,124,.94)';
    c.beginPath(); c.moveTo(px, 0); c.lineTo(px + 24, -4); c.lineTo(px + 22, -92); c.lineTo(px - 2, -88); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(58,44,24,.85)'; c.lineWidth = 2; c.stroke();
    c.strokeStyle = 'rgba(40,32,24,.6)'; c.lineWidth = 1.4;
    for (let i = 0; i < 5; i++) {
      c.beginPath(); c.moveTo(px + 5, -14 - i * 15); c.lineTo(px + 18, -14 - i * 15); c.stroke();
    }
  }
  if (open > 0) {
    // 翻页的一角（写一页翻一页：持续位移）
    c.save(); c.globalAlpha = clamp(a) * open;
    c.translate(66, -88); c.rotate(-0.5 + Math.sin(t * 2.6) * .3);
    c.fillStyle = 'rgba(214,196,142,.95)';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(26, -6); c.lineTo(22, -80); c.lineTo(-4, -74); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(58,44,24,.8)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
  }
  c.restore();
};

// ---------- 储谷（麻袋堆：她家大有储谷）----------
Z.grainSacks = (c, x, y, s, t, o = {}) => {
  const { a = 1, n = 6, open = 0, seed = 41 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const row = Math.floor(k / 3), col = k % 3;
    const px = -150 + col * 150 + rr() * 10;
    const py = -row * 96;
    const bulge = open > 0 && row === 0 ? open * 10 : 0;
    c.fillStyle = `rgba(${166 - row * 8},${150 - row * 8},${108 - row * 6},.92)`;
    c.beginPath();
    c.moveTo(px - 62, py);
    c.quadraticCurveTo(px - 74 - bulge, py - 48, px - 40, py - 92);
    c.quadraticCurveTo(px, py - 104, px + 40, py - 92);
    c.quadraticCurveTo(px + 74 + bulge, py - 48, px + 62, py);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(58,46,30,.88)'; c.lineWidth = 2.6; c.stroke();
    // 袋口束绳
    c.strokeStyle = 'rgba(88,66,38,.9)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(px - 34, py - 88); c.lineTo(px + 34, py - 88); c.stroke();
    // 敞口的谷粒（开仓）
    if (open > 0 && row === 0) {
      c.fillStyle = 'rgba(206,182,116,.9)';
      for (let i = 0; i < 8; i++) {
        const q = (t * .5 + i / 8) % 1;
        c.beginPath(); c.arc(px - 30 + i * 9, py - 90 + q * 26, 3, 0, Math.PI * 2); c.fill();
      }
    }
  }
  c.restore();
};

// ---------- 珠玉宝物（百姓所卖、她家所买：与谷堆形成对照）----------
Z.jadePile = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 51 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  const items = [[-60, -16, 16], [-14, -26, 20], [36, -14, 15], [-38, -52, 12], [12, -58, 14], [62, -46, 11]];
  items.forEach(([px, py, r0], k) => {
    c.save(); c.translate(px, py);
    // 珠（微光闪动）
    c.fillStyle = `rgba(212,224,220,${.9 + Math.sin(t * 2.2 + k) * .08})`;
    c.beginPath(); c.arc(0, 0, r0 * .5, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(78,92,88,.7)'; c.lineWidth = 1.6; c.stroke();
    // 璧（环）
    c.strokeStyle = `rgba(196,214,204,${.8 + Math.sin(t * 1.8 + k) * .1})`; c.lineWidth = 6;
    c.beginPath(); c.arc(0, 0, r0, 0, Math.PI * 2); c.stroke();
    c.restore();
  });
  // 金饼
  [[-24, -8, 15], [26, -4, 13]].forEach(([px, py, r0], k) => {
    c.fillStyle = `rgba(206,168,72,${.9 + Math.sin(t * 2.6 + k) * .1})`;
    c.beginPath(); c.ellipse(px, py, r0, r0 * .5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(96,72,26,.8)'; c.lineWidth = 2; c.stroke();
  });
  c.restore();
};

// ---------- 受振的邻里（领谷的队列；⚠ 逐人异频，避免集体翻状态被判跳变）----------
Z.almsgivers = (c, x0, y, s, t, o = {}) => {
  const { n = 5, a = 1, gap = 190, seed = 61, come = 1 } = o;
  if (a <= 0) return;
  c.save(); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const px = x0 + k * gap + ease.out(clamp(come)) * 60 + Math.sin(t * (0.95 + k * 0.14) + k * 1.6 + seed) * 5;
    const py = y + Math.sin(t * (1.3 + k * 0.1) + k) * 3;
    c.save(); c.translate(px, py); c.scale(s, s);
    c.fillStyle = 'rgba(116,106,98,.82)';
    c.beginPath(); c.moveTo(-15, 0); c.quadraticCurveTo(-13, -36, 0, -48); c.quadraticCurveTo(14, -36, 16, 0); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(38,32,28,.8)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = 'rgba(228,218,200,.93)';
    c.beginPath(); c.arc(0, -58, 7.5, 0, Math.PI * 2); c.fill();
    // 捧着的袋（领到谷）
    c.fillStyle = 'rgba(168,152,110,.9)';
    c.beginPath(); c.ellipse(2, -26, 13, 10, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(60,48,32,.8)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
  }
  c.restore();
};

// ---------- 邺城（城墙＋城楼；袁熙出幽州、文帝入绍舍都在这里）----------
Z.yeWall = (c, x, y, s, o = {}) => {
  const { a = 1, tower = 1, seed = 71 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 墙体
  c.fillStyle = 'rgba(146,128,102,.9)';
  c.beginPath(); c.moveTo(-460, 0); c.lineTo(-450, -320); c.lineTo(450, -320); c.lineTo(460, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(46,36,26,.9)'; c.lineWidth = 3.6; c.stroke();
  c.strokeStyle = 'rgba(60,48,34,.4)'; c.lineWidth = 1.4;
  for (let r = 1; r < 6; r++) {
    c.beginPath(); c.moveTo(-456 + r * 2, -r * 54); c.lineTo(456 - r * 2, -r * 54); c.stroke();
  }
  // 垛口
  c.fillStyle = 'rgba(158,138,110,.94)';
  for (let k = 0; k <= 11; k++) {
    const px = -440 + k * 80;
    c.fillRect(px - 26, -368, 52, 48);
    c.strokeStyle = 'rgba(48,38,26,.9)'; c.lineWidth = 2.4; c.strokeRect(px - 26, -368, 52, 48);
  }
  // 城楼（皇堂所在）
  if (tower) {
    c.fillStyle = 'rgba(132,110,84,.94)';
    c.beginPath(); c.moveTo(-160, -320); c.lineTo(-160, -470); c.lineTo(160, -470); c.lineTo(160, -320); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(44,34,24,.92)'; c.lineWidth = 3.2; c.stroke();
    // 檐（歇山顶：两笔飞檐）
    c.fillStyle = 'rgba(76,58,40,.95)';
    c.beginPath(); c.moveTo(-210, -470); c.quadraticCurveTo(-120, -538, 0, -548);
    c.quadraticCurveTo(120, -538, 210, -470); c.lineTo(180, -470); c.lineTo(-180, -470); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,24,18,.9)'; c.lineWidth = 2.6; c.stroke();
    // 窗（三格）
    c.fillStyle = 'rgba(224,206,168,.9)';
    [-90, 0, 90].forEach((wx) => {
      c.beginPath(); c.rect(wx - 26, -446, 52, 62); c.fill();
      c.strokeStyle = 'rgba(52,40,28,.85)'; c.lineWidth = 2; c.strokeRect(wx - 26, -446, 52, 62);
    });
  }
  c.restore();
};

// ---------- 皇堂（内景：阶＋柱＋座；邺城破的那一场在这里）----------
Z.huangTang = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 81 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 阶（三级）
  c.fillStyle = 'rgba(150,132,104,.9)';
  [[-380, 0, 760, 26], [-330, -28, 660, 26], [-280, -56, 560, 26]].forEach(([px, py, ww, hh]) => {
    c.fillRect(px, py, ww, hh);
    c.strokeStyle = 'rgba(48,38,26,.85)'; c.lineWidth = 2; c.strokeRect(px, py, ww, hh);
  });
  // 柱（两根，微晃）
  [[-300, 0], [300, 1]].forEach(([px2, k]) => {
    c.save(); c.translate(px2, -80);
    brush(c, [[0, 0], [-5 + Math.sin(t * .6 + k) * 3, -300], [-9, -600]],
      { w: 32, tone: .6, dry: .55, seed: 2821 + k, col: [104, 76, 52] });
    c.restore();
  });
  // 座（刘夫人所坐；甄后伏于其膝）
  c.fillStyle = 'rgba(112,86,56,.92)';
  c.beginPath(); c.moveTo(-120, -84); c.lineTo(120, -90); c.lineTo(124, -170); c.lineTo(-116, -164); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(44,32,22,.9)'; c.lineWidth = 3; c.stroke();
  c.fillStyle = 'rgba(178,64,52,.85)';
  c.beginPath(); c.moveTo(-126, -164); c.lineTo(126, -170); c.lineTo(120, -196); c.lineTo(-120, -190); c.closePath(); c.fill();
  c.restore();
};

// ---------- 玉玺（「天子羡思慈亲」，方一寸九分）----------
Z.jadeSeal = (c, x, y, s, t, o = {}) => {
  const { a = 1, glow = 1, seed = 91 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.translate(0, Math.sin(t * 1.1) * 4);
  // 纽（螭虎：写意一笔）
  c.fillStyle = 'rgba(196,214,206,.94)';
  c.beginPath(); c.moveTo(-22, 0); c.quadraticCurveTo(-30, -34, 0, -46); c.quadraticCurveTo(30, -34, 22, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(72,88,84,.85)'; c.lineWidth = 2.4; c.stroke();
  // 印身（方）
  c.fillStyle = 'rgba(206,222,214,.95)';
  c.beginPath(); c.moveTo(-46, 0); c.lineTo(46, 0); c.lineTo(42, 54); c.lineTo(-42, 54); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(72,88,84,.9)'; c.lineWidth = 3; c.stroke();
  // 印面（朱文：四字示意）
  c.strokeStyle = 'rgba(196,40,34,.85)'; c.lineWidth = 3;
  c.beginPath(); c.moveTo(-30, 22); c.lineTo(30, 22); c.stroke();
  c.beginPath(); c.moveTo(-30, 40); c.lineTo(30, 40); c.stroke();
  if (glow) {
    const g = c.createRadialGradient(0, 20, 8, 0, 20, 150);
    g.addColorStop(0, `rgba(226,240,232,${.5 + .2 * Math.sin(t * 2)})`);
    g.addColorStop(1, 'rgba(226,240,232,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, 20, 150, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 寝庙（明帝所立，特祀；香烟上升）----------
Z.shrine = (c, x, y, s, t, o = {}) => {
  const { a = 1, incense = 1, seed = 101 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 台基
  c.fillStyle = 'rgba(150,134,106,.92)';
  c.beginPath(); c.moveTo(-300, 0); c.lineTo(-280, -60); c.lineTo(280, -60); c.lineTo(300, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(46,36,26,.9)'; c.lineWidth = 3.2; c.stroke();
  // 殿身
  c.fillStyle = 'rgba(128,106,80,.94)';
  c.beginPath(); c.moveTo(-240, -60); c.lineTo(-240, -340); c.lineTo(240, -340); c.lineTo(240, -60); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(44,34,24,.92)'; c.lineWidth = 3.4; c.stroke();
  // 重檐（两重）
  [[-300, -340, 600, 90], [-260, -430, 520, 80]].forEach(([px, py, ww, hh], k) => {
    c.fillStyle = `rgba(${78 - k * 6},${58 - k * 4},${40 - k * 4},.95)`;
    c.beginPath(); c.moveTo(px, py); c.quadraticCurveTo(px + ww / 2, py - hh, px + ww, py);
    c.lineTo(px + ww - 30, py + 22); c.lineTo(px + 30, py + 22); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(28,22,16,.9)'; c.lineWidth = 2.6; c.stroke();
  });
  // 门（中开）
  c.fillStyle = 'rgba(52,40,28,.9)';
  c.beginPath(); c.moveTo(-70, -60); c.lineTo(-70, -300); c.lineTo(70, -300); c.lineTo(70, -60); c.closePath(); c.fill();
  // 匾
  c.fillStyle = 'rgba(196,180,142,.95)';
  c.beginPath(); c.rect(-90, -336, 180, 40); c.fill();
  c.strokeStyle = 'rgba(46,34,22,.9)'; c.lineWidth = 2.4; c.strokeRect(-90, -336, 180, 40);
  // 香烟（上升：本幕主运动之一）
  if (incense) {
    for (let k = 0; k < 3; k++) {
      const ph = (t * .3 + k / 3) % 1;
      c.globalAlpha = clamp(a) * Math.sin(Math.PI * ph) * .4;
      brush(c, [[-20 + k * 20, -70], [-20 + k * 20 + Math.sin(t * 1.7 + k) * 30, -70 - ph * 240],
                [-20 + k * 20 - Math.sin(t * 1.3 + k) * 34, -70 - ph * 420]],
        { w: 20, tone: .14, dry: .9, seed: 2901 + k, tail: .7, col: [126, 120, 112] });
    }
  }
  c.restore();
};

// ---------- 甄后：月白深衣（单位坐标，原点＝脚底，头顶 ≈ -198）----------
// o: { t, flip, bow(俯身), fade, young(少女), queen(后妃：步摇冠＋组绶), kneel(伏姑膝), hairDown(以发覆面), raise(进言抬手), seed }
Z.zhenhou = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, bow = 0, fade = 1, young = 0, queen = 0, kneel = 0, hairDown = 0, raise = 0, seed = 61 } = o;
  const br = Math.sin(t * 1.5 + seed * .1) * .013;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  const kn = ease.out(clamp(kneel));
  c.translate(0, Math.sin(t * 1.5) * 3 + kn * 46);              // kneel：屈身下伏
  c.rotate(br * .5 + bow * .28 + kn * .22);

  // 双足（舄）
  c.fillStyle = 'rgba(52,48,58,.88)';
  c.beginPath(); c.ellipse(-16, 26, 13, 6.5, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(16, 26, 13, 6.5, 0, 0, Math.PI * 2); c.fill();

  // 深衣（月白；下摆宽，曳地）
  const hem = Math.sin(t * 1.4) * 6;
  c.fillStyle = 'rgba(232,230,224,.84)';
  c.beginPath();
  c.moveTo(-22, -140);
  c.quadraticCurveTo(-64, -74, -72 + hem, -6);
  c.quadraticCurveTo(0, 10 + hem * .4, 72 + hem * .6, -6);
  c.quadraticCurveTo(62, -76, 22, -140);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(58,56,60,.85)'; c.lineWidth = 3; c.stroke();
  // 衣缘（深青缘边：汉魏深衣定制）
  c.strokeStyle = 'rgba(58,72,86,.8)'; c.lineWidth = 5;
  c.beginPath(); c.moveTo(-22, -140); c.quadraticCurveTo(-64, -74, -72 + hem, -6); c.stroke();
  // 衣褶
  brush(c, [[-12, -128], [-7, -70], [-13, -18]], { w: 2.8, tone: .26, dry: .78, seed: 2961, tail: .6, bristles: 3 });
  brush(c, [[6, -126], [11, -66], [5, -14]], { w: 2.4, tone: .22, dry: .78, seed: 2962, tail: .6, bristles: 3 });

  // 上襦（交领右衽）
  c.fillStyle = 'rgba(240,238,234,.88)';
  c.beginPath();
  c.moveTo(-24, -146);
  c.quadraticCurveTo(-32, -112, -28, -94);
  c.lineTo(28, -94);
  c.quadraticCurveTo(32, -112, 24, -146);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(58,56,60,.85)'; c.lineWidth = 2.8; c.stroke();
  brush(c, [[-16, -146], [2, -120], [16, -144]], { w: 4, tone: .6, dry: .45, seed: 2963, col: [58, 72, 86] });
  // 腰带
  brush(c, [[-28, -100], [0, -93], [28, -100]], { w: 9, tone: .5, dry: .5, seed: 2964, col: [86, 96, 108] });

  // 组绶（后妃：腰下垂挂的丝组与玉佩）
  if (queen) {
    for (let k = 0; k < 3; k++) {
      const sw = Math.sin(t * 1.3 + k) * 7;
      brush(c, [[-14 + k * 14, -96], [-16 + k * 14 + sw * .5, -50], [-14 + k * 14 + sw, -12]],
        { w: 4, tone: .4, dry: .7, seed: 2965 + k, tail: .7, col: [96, 108, 122] });
    }
    c.strokeStyle = `rgba(200,216,210,${.85 + Math.sin(t * 2.1) * .1})`; c.lineWidth = 4.6;
    c.beginPath(); c.arc(0, -8, 11, 0, Math.PI * 2); c.stroke();
  }

  // 双臂（raise：进言抬手；kneel：前伸扶膝）
  const rl = ease.out(clamp(raise));
  const ey = kneel > 0 ? -96 : (-118 - 30 * rl);
  const ex = kneel > 0 ? 52 : (44 + 8 * rl);
  brush(c, [[-24, -142], [-40, -112], [-44, -104 + 8 * (1 - kn)]],
    { w: 14, tone: .42, dry: .5, seed: 2971, head: .1, tail: .2 });
  brush(c, [[24, -142], [40, -124], [ex, ey]], { w: 14, tone: .42, dry: .5, seed: 2972, head: .1, tail: .2 });
  c.fillStyle = 'rgba(242,230,212,.96)';
  c.beginPath(); c.ellipse(ex + 3, ey, 9, 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();
  c.beginPath(); c.ellipse(-44 + 3, -104 + 8 * (1 - kn), 9, 10, 0, 0, Math.PI * 2); c.fill();

  // 头
  c.save(); c.translate(0, -172 - bow * 6 - kn * 10); c.rotate(bow * .14 + kn * .1);
  c.fillStyle = 'rgba(242,230,212,.97)';
  c.beginPath(); c.ellipse(0, 0, young ? 14 : 15, young ? 15.5 : 16.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(36,30,28,.86)'; c.lineWidth = 2.2; c.stroke();
  const dl = bow * 2.2 + kn * 2.4;
  // 眉眼（清平和：不画王异那种上扬的坚毅，也不画蔡文姬的清辩）
  c.strokeStyle = 'rgba(52,46,42,.82)'; c.lineWidth = 2.4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-11, -7 - dl); c.lineTo(-2.5, -8.5 - dl); c.stroke();
  c.beginPath(); c.moveTo(2.5, -8.5 - dl); c.lineTo(11, -7 - dl); c.stroke();
  c.fillStyle = 'rgba(32,28,26,.92)';
  c.beginPath(); c.ellipse(-5.5, 1 + dl * .5, 2.5, 2.6 - bow * .9, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.5, 1 + dl * .5, 2.5, 2.6 - bow * .9, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(126,82,78,.85)'; c.lineWidth = 1.9;
  c.beginPath(); c.moveTo(-3.5, 8); c.lineTo(3.5, 8); c.stroke();

  // 发式：少女＝双鬟；后妃＝垂髾高髻＋步摇冠；赐死＝以发覆面
  c.fillStyle = 'rgba(40,36,34,.95)';
  if (hairDown) {
    // 以发覆面（写意：一片垂下的墨，绝不画惨状）
    c.beginPath(); c.ellipse(0, -8, 15, 12, 0, 0, Math.PI * 2); c.fill();
    for (let k = 0; k < 7; k++) {
      const wf = Math.sin(t * 1.3 + k * 1.2) * 6;
      brush(c, [[-13 + k * 4.5, -4], [-18 + k * 6 + wf, 22], [-16 + k * 7 + wf * 1.4, 52]],
        { w: 6, tone: .68, dry: .8, seed: 2981 + k, tail: .75, col: [40, 36, 34] });
    }
  } else if (young) {
    // 双鬟（少女）
    c.beginPath(); c.ellipse(0, -10, 14.5, 9, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(-12, -22, 8, 8, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(12, -22, 8, 8, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(24,20,18,.9)'; c.lineWidth = 2; c.stroke();
  } else {
    // 垂髾高髻（汉魏贵女／后妃）
    c.beginPath(); c.ellipse(0, -10, 15.5, 10, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(0, -30, 13, 15, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(-6, -42, 9, 9, -.3, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,18,16,.9)'; c.lineWidth = 2.2; c.stroke();
    // 垂髾（两缕垂发，随风）
    const wf = Math.sin(t * 1.6) * 8;
    brush(c, [[-14, -22], [-26 + wf * .5, -6], [-32 + wf, 16]],
      { w: 5.5, tone: .6, dry: .7, seed: 2983, tail: .7, col: [40, 36, 34] });
    brush(c, [[14, -22], [26 - wf * .4, -6], [32 - wf * .8, 16]],
      { w: 5.5, tone: .6, dry: .7, seed: 2984, tail: .7, col: [40, 36, 34] });
    // 步摇冠（后妃：金枝摇曳——本片的辨识要素）
    if (queen) {
      c.strokeStyle = 'rgba(206,168,72,.95)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(-13, -30); c.lineTo(13, -30); c.stroke();
      for (let k = 0; k < 5; k++) {
        const ang = -1.9 + k * 0.95 + Math.sin(t * 2.4 + k * 1.1) * .22;
        const bx = -12 + k * 6, by = -34;
        c.save(); c.translate(bx, by); c.rotate(ang);
        c.strokeStyle = 'rgba(214,178,80,.95)'; c.lineWidth = 2.2;
        c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -22); c.stroke();
        c.fillStyle = `rgba(226,196,104,${.9 + Math.sin(t * 3 + k) * .1})`;
        c.beginPath(); c.arc(0, -26, 3.2, 0, Math.PI * 2); c.fill();
        c.restore();
      }
    } else {
      // 未为后时：只一支素簪
      c.strokeStyle = `rgba(216,222,228,${.8 + Math.sin(t * 2.2) * .12})`; c.lineWidth = 2.4;
      c.beginPath(); c.moveTo(-13, -32); c.lineTo(11, -20); c.stroke();
    }
  }
  c.restore();

  c.restore();
};
})();
