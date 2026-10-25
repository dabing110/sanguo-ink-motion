// 《辛宪英》专属笔法库：三国最被低估的女谋士（字宪英，陇西人，魏侍中辛毗之女，羊耽之妻，羊祜之叔母）。
// 依赖 z_common.js（宣纸/远山/云气/榜题/钤印/大字）+ w_common.js（垂帷/墨云/浓墨烟带/城门/首领）。
// ⚠ 关键：z_common.js 里是 `const Z = window.Z = {}`（重置），本库必须写 `const Z = window.Z`（追加），
//    否则会把根库清空；且 eras 的 SCENE_LIBS 顺序必须是 z_common → w_common → xn_common。
// 形象（与已做全部人物区分）：**素青深衣 + 峨髻金簪 + 袖手或持竹简**，无甲胄、无兵器、无拂尘。
//   她不是战场人物也不是方士——「聪朗有才鉴」四个字是她的全部辨识度：静、端方、有判断。
//   与管辂（粗褐袍乱发蓍草）、华佗（淡青麻布方巾银针）、左慈（青懒衣眇目跛足）三分布衫各自独立。
// 史实：全片八幕均出《晋书·卷九十六·列女传·羊耽妻辛氏》，无一处虚构（「泰始五年卒，年七十九」亦为传文）。
//   ① 曹丕得立为太子，抱辛毗项问「知我喜不」→ 宪英叹「宜戚而喜，何以能久！魏其不昌乎」
//   ② 高平陵之变（249）：弟辛敞为曹爽参军，太傅闭城门，敞惧问姊 → 答「太傅殆不得不尔…此举不过以诛爽耳」
//   ③ 敞问「然则敞无出乎」→ 「安可以不出！职守，人之大义也」→ 敞遂出；事后叹「吾不谋于姊，几不获于义」
//   ④ 钟会为镇西将军（263）→ 「会在事纵恣…吾畏其有他志也」；请子羊琇为参军 → 诫「军旅之间可以济者，其惟仁恕乎」
//   ⑤ 会至蜀果反，琇竟以全归；羊祜送锦被，宪英嫌其华，反而覆之 → 「明鉴俭约如此」
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 竹简（编绳＋墨字竖行；宪英的「才鉴」之象）----------
Z.jiandu = (c, x, y, s, o = {}) => {
  const { a = 1, n = 6, seed = 41, ang = 0 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.rotate(ang); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const px = -((n - 1) * 15) / 2 + k * 15;
    c.fillStyle = 'rgba(206,182,138,.95)';
    c.fillRect(px - 6, -52, 12, 104);
    c.strokeStyle = 'rgba(72,54,34,.85)'; c.lineWidth = 1.6; c.strokeRect(px - 6, -52, 12, 104);
  }
  // 编绳（两道）
  c.strokeStyle = 'rgba(96,70,44,.8)'; c.lineWidth = 2.2;
  [-30, 26].forEach((yy) => { c.beginPath(); c.moveTo(-((n - 1) * 15) / 2 - 8, yy); c.lineTo(((n - 1) * 15) / 2 + 8, yy); c.stroke(); });
  // 墨字（写意竖点，不写真字）
  c.fillStyle = 'rgba(32,26,20,.72)';
  for (let k = 0; k < n; k++) for (let i = 0; i < 5; i++) {
    const px = -((n - 1) * 15) / 2 + k * 15;
    c.fillRect(px - 2, -40 + i * 17 + (k % 2) * 3, 4, 4);
  }
  c.restore();
};

// ---------- 灯烛（几上烛台，火苗跳动；主运动之一）----------
Z.candle = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 51 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 几
  c.fillStyle = 'rgba(112,88,58,.9)';
  c.beginPath(); c.moveTo(-56, 0); c.lineTo(56, 0); c.lineTo(48, 14); c.lineTo(-48, 14); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,30,20,.9)'; c.lineWidth = 2.4; c.stroke();
  c.fillRect(-40, 14, 8, 46); c.fillRect(32, 14, 8, 46);
  // 烛台 + 蜡
  c.fillStyle = 'rgba(126,102,62,.95)';
  c.beginPath(); c.moveTo(-14, 0); c.lineTo(14, 0); c.lineTo(8, -14); c.lineTo(-8, -14); c.closePath(); c.fill();
  c.fillStyle = 'rgba(244,238,222,.96)'; c.fillRect(-7, -54, 14, 40);
  c.strokeStyle = 'rgba(70,58,44,.7)'; c.lineWidth = 1.4; c.strokeRect(-7, -54, 14, 40);
  // 火苗
  const fl = 26 + Math.sin(t * 8.5 + seed) * 11;
  c.fillStyle = `rgba(${232 + Math.sin(t * 12 + seed) * 20 | 0},${150 + Math.sin(t * 9 + seed) * 40 | 0},70,.9)`;
  c.beginPath(); c.moveTo(-7, -54); c.quadraticCurveTo(-4, -54 - fl * .6, 0, -54 - fl); c.quadraticCurveTo(4, -54 - fl * .6, 7, -54); c.closePath(); c.fill();
  c.fillStyle = 'rgba(250,244,214,.9)';
  c.beginPath(); c.ellipse(0, -54 - fl * .35, 3, 7, 0, 0, Math.PI * 2); c.fill();
  // 光晕
  const gg = c.createRadialGradient(0, -54 - fl * .4, 2, 0, -54 - fl * .4, 90);
  gg.addColorStop(0, 'rgba(255,226,150,.34)'); gg.addColorStop(1, 'rgba(255,226,150,0)');
  c.fillStyle = gg; c.beginPath(); c.arc(0, -54 - fl * .4, 90, 0, Math.PI * 2); c.fill();
  c.restore();
};

// ---------- 都城大门（o.open: 0 紧闭 / 1 洞开；高平陵「太傅闭城门」）----------
Z.gateBig = (c, x, y, s, o = {}) => {
  const { open = 0, a = 1 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 台基
  c.fillStyle = 'rgba(120,104,84,.9)';
  c.beginPath(); c.moveTo(-330, 10); c.lineTo(330, 10); c.lineTo(300, 40); c.lineTo(-300, 40); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(44,36,28,.9)'; c.lineWidth = 3; c.stroke();
  // 墙体
  c.fillStyle = 'rgba(148,128,102,.9)';
  c.beginPath(); c.moveTo(-300, 10); c.lineTo(-290, -300); c.lineTo(290, -300); c.lineTo(300, 10); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(48,38,28,.9)'; c.lineWidth = 3.4; c.stroke();
  // 门洞
  c.fillStyle = open > 0.02 ? 'rgba(60,50,40,.9)' : 'rgba(38,32,26,.95)';
  c.beginPath(); c.moveTo(-118, 10); c.lineTo(-118, -110); c.quadraticCurveTo(0, -190, 118, -110); c.lineTo(118, 10); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(32,26,20,.95)'; c.lineWidth = 3; c.stroke();
  // 门扇（闭合时两扇并拢，开启时分向两侧）
  const sw = ease.out(clamp(open)) * 104;
  [-1, 1].forEach((sg) => {
    c.save(); c.translate(sg * sw, 0);
    c.fillStyle = 'rgba(96,72,48,.94)';
    c.beginPath(); c.moveTo(sg > 0 ? 0 : -118, 10); c.lineTo(sg > 0 ? 0 : -118, -108);
    c.quadraticCurveTo(sg > 0 ? 59 : -59, -188, sg > 0 ? 118 : 0, -108);
    c.lineTo(sg > 0 ? 118 : 0, 10); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,26,18,.92)'; c.lineWidth = 2.8; c.stroke();
    // 门钉
    c.fillStyle = 'rgba(150,124,70,.9)';
    for (let r = 0; r < 3; r++) for (let k2 = 0; k2 < 3; k2++) {
      const px = sg > 0 ? 26 + k2 * 34 : -26 - k2 * 34;
      c.beginPath(); c.arc(px, -18 - r * 34, 4, 0, Math.PI * 2); c.fill();
    }
    c.restore();
  });
  // 城楼（檐）
  c.fillStyle = 'rgba(104,80,52,.95)';
  c.beginPath(); c.moveTo(-330, -300); c.lineTo(0, -380); c.lineTo(330, -300); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(40,30,20,.92)'; c.lineWidth = 3; c.stroke();
  c.fillStyle = 'rgba(142,116,80,.92)'; c.fillRect(-290, -300, 580, 42);
  c.strokeStyle = 'rgba(48,36,26,.9)'; c.lineWidth = 3; c.strokeRect(-290, -300, 580, 42);
  c.restore();
};

// ---------- 军旅西行（旗＋骑剪影；钟会伐蜀之象，主运动）----------
Z.armyWest = (c, x, y, s, t, o = {}) => {
  const { a = 1, n = 5, seed = 61 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const ph = (t * .34 + k / n) % 1;
    const px = -620 + ph * 1180 + rr() * 40;
    const py = -ph * 46 + rr() * 14;
    const sc = 0.62 + (k % 3) * 0.12;
    c.save(); c.translate(px, py); c.scale(sc, sc); c.globalAlpha = clamp(a) * (.35 + .55 * Math.sin(Math.PI * ph));
    // 骑者剪影
    c.fillStyle = 'rgba(72,66,58,.82)';
    c.beginPath(); c.moveTo(-36, 0); c.quadraticCurveTo(-30, -46, -6, -60); c.quadraticCurveTo(24, -62, 34, -30);
    c.quadraticCurveTo(40, -8, 30, 2); c.lineTo(-24, 6); c.closePath(); c.fill();
    brush(c, [[-20, 6], [-24, 30]], { w: 7, tone: .6, dry: .6, seed: 1401 + k });
    brush(c, [[18, 6], [22, 30]], { w: 7, tone: .6, dry: .6, seed: 1411 + k });
    c.fillStyle = 'rgba(238,232,220,.9)';
    c.beginPath(); c.arc(-4, -78, 11, 0, Math.PI * 2); c.fill();
    // 矛
    c.strokeStyle = 'rgba(88,76,58,.85)'; c.lineWidth = 3; c.lineCap = 'round';
    c.beginPath(); c.moveTo(30, -60); c.lineTo(46, -168); c.stroke();
    c.restore();
  }
  c.restore();
};

// ---------- 锦被（羊祜所赠，宪英嫌华反而覆之——「明鉴俭约」）----------
Z.brocade = (c, x, y, s, o = {}) => {
  const { a = 1, fold = 0, t = 0 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  const fy = -fold * 26;
  c.fillStyle = 'rgba(150,60,58,.88)';
  c.beginPath();
  c.moveTo(-96, 10);
  c.quadraticCurveTo(-60, -34 + fy, 0, -40 + fy);
  c.quadraticCurveTo(60, -34 + fy, 96, 10);
  c.quadraticCurveTo(0, 26, -96, 10);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(58,24,26,.9)'; c.lineWidth = 2.6; c.stroke();
  // 织纹（回纹）
  c.strokeStyle = 'rgba(226,196,120,.7)'; c.lineWidth = 1.8;
  for (let k = -2; k <= 2; k++) {
    const px = k * 32;
    c.beginPath(); c.moveTo(px - 12, 2); c.lineTo(px + 12, 2); c.lineTo(px + 12, -14 + fy * .6); c.lineTo(px - 4, -14 + fy * .6); c.stroke();
  }
  c.restore();
};

// ---------- 朝士 / 参军（辛敞、羊琇：男子立姿，袍＋冠；可作弟/子）----------
Z.weiOfficial = (c, x, y, s, t, o = {}) => {
  const { flip = 0, bow = 0, fade = 1, fear = 0, seed = 71 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  const tremble = fear ? Math.sin(t * 11) * 2.6 : 0;
  c.translate(tremble, Math.sin(t * 1.4) * 3);
  c.rotate(bow * .12);
  // 袍
  const hem = Math.sin(t * 1.3) * 6;
  c.fillStyle = 'rgba(104,108,124,.86)';
  c.beginPath();
  c.moveTo(-26, -148);
  c.quadraticCurveTo(-58, -74, -62 + hem, -4);
  c.quadraticCurveTo(0, 8 + hem * .4, 62 + hem * .6, -4);
  c.quadraticCurveTo(56, -76, 26, -148);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,32,42,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-14, -134], [-9, -78], [-14, -22]], { w: 3, tone: .28, dry: .75, seed: 1421 + seed, tail: .6, bristles: 3 });
  brush(c, [[8, -132], [13, -74], [8, -20]], { w: 2.6, tone: .24, dry: .75, seed: 1422 + seed, tail: .6, bristles: 3 });
  brush(c, [[-14, -150], [-2, -128], [16, -148]], { w: 3.6, tone: .78, dry: .35, seed: 1423 + seed, col: [214, 210, 198] });
  brush(c, [[-32, -100], [0, -94], [32, -100]], { w: 9, tone: .6, dry: .45, seed: 1424 + seed, col: [120, 98, 60] });
  // 双臂
  brush(c, [[-26, -144], [-42, -106], [-38, -64]], { w: 15, tone: .4, dry: .5, seed: 1431 + seed, head: .1, tail: .2 });
  brush(c, [[26, -144], [44, -112], [52, -76]], { w: 14, tone: .4, dry: .5, seed: 1432 + seed, head: .1, tail: .2 });
  c.fillStyle = 'rgba(240,228,206,.96)';
  c.beginPath(); c.ellipse(54, -78, 9, 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();
  // 头
  c.save(); c.translate(0, -176 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(240,228,206,.97)';
  c.beginPath(); c.ellipse(0, 0, 15.5, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 2.2; c.stroke();
  brush(c, [[-10, -5], [-3, -7]], { w: 3.4, tone: .8, dry: .4, seed: 1441 + seed, col: [34, 30, 26] });
  brush(c, [[3, -7], [10, -5]], { w: 3.4, tone: .8, dry: .4, seed: 1442 + seed, col: [34, 30, 26] });
  c.fillStyle = 'rgba(26,22,20,.92)';
  c.beginPath(); c.ellipse(-5.5, 1, 2.4, 2.8, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.5, 1, 2.4, 2.8, 0, 0, Math.PI * 2); c.fill();
  brush(c, [[-2, 8], [0, 16]], { w: 3.6, tone: .62, dry: .6, seed: 1443 + seed, tail: .7, bristles: 4 });
  // 进贤冠
  c.fillStyle = 'rgba(48,50,62,.96)';
  c.beginPath(); c.moveTo(-17, -11); c.lineTo(-14, -36); c.lineTo(14, -36); c.lineTo(17, -11); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,18,26,.9)'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = 'rgba(140,116,62,.95)'; c.fillRect(-15, -27, 30, 5);
  c.restore();
  c.restore();
};

// ---------- 辛宪英：陇西辛氏女（单位坐标，原点＝脚底，头顶 ≈ -196）----------
// o: { t, flip, bow, fade, scroll(持竹简), point(抬手示/指), young(少女：髻略低) }
Z.xinshi = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, bow = 0, fade = 1, scroll = 0, point = 0, young = 0 } = o;
  const br = Math.sin(t * 1.35) * .012;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.35) * 2.6);      // 比旁人更稳（她不慌）
  c.rotate(br * .4 + bow * .12);

  // 深衣下摆（曳地，仅露履尖）
  const hem = Math.sin(t * 1.2) * 5;
  c.save();
  c.fillStyle = 'rgba(126,132,146,.8)';
  c.beginPath();
  c.moveTo(-24, -146);
  c.quadraticCurveTo(-62, -70, -74 + hem, 4);
  c.quadraticCurveTo(0, 14 + hem * .4, 74 + hem * .6, 4);
  c.quadraticCurveTo(62, -72, 24, -146);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(34,38,48,.88)'; c.lineWidth = 3; c.stroke();
  c.restore();
  // 履尖
  c.fillStyle = 'rgba(52,50,56,.8)';
  c.beginPath(); c.ellipse(-20, 10, 11, 5, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(20, 10, 11, 5, 0, 0, Math.PI * 2); c.fill();
  // 衣褶（三笔虚）
  brush(c, [[-14, -134], [-8, -76], [-13, -18]], { w: 3.2, tone: .3, dry: .75, seed: 1451, tail: .6, bristles: 3 });
  brush(c, [[4, -132], [10, -72], [4, -14]], { w: 2.8, tone: .26, dry: .75, seed: 1452, tail: .6, bristles: 3 });
  brush(c, [[24, -136], [30, -74], [25, -20]], { w: 2.4, tone: .24, dry: .75, seed: 1453, tail: .6, bristles: 3 });
  // 交领（素白缘）——她的「素」是辨识点之一
  brush(c, [[-13, -146], [-1, -124], [15, -144]], { w: 4.2, tone: .78, dry: .4, seed: 1454, col: [236, 232, 222] });
  // 束带
  brush(c, [[-30, -100], [0, -94], [30, -100]], { w: 8, tone: .5, dry: .5, seed: 1455, col: [104, 100, 110] });

  // 双臂：point 抬手示；否则袖手（双手交于腹前）
  const rl = ease.out(clamp(point));
  brush(c, [[-24, -142], [-40, -104 - 6 * rl], [-36, -62 - 10 * rl]], { w: 14, tone: .4, dry: .5, seed: 1461, head: .1, tail: .2 });
  brush(c, [[24, -142], [42, -118 - 24 * rl], [52, -148 - 46 * rl]],
    { w: 13, tone: .4, dry: .5, seed: 1462, head: .1, tail: .2 });
  const hx = 52, hy = -148 - 46 * rl;
  c.fillStyle = 'rgba(240,228,206,.96)';
  c.beginPath(); c.ellipse(hx + 3, hy, 9, 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();
  if (rl < .05) {                                  // 袖手：左手搭于右腕
    c.fillStyle = 'rgba(240,228,206,.96)';
    c.beginPath(); c.ellipse(-34, -60, 9, 9, 0, 0, Math.PI * 2); c.fill();
  }

  // 头（端方：鹅蛋脸、蛾眉、细目、抿唇——不笑，是「有判断」的表情）
  c.save(); c.translate(0, -172 - bow * 5); c.rotate(bow * .1);
  c.fillStyle = 'rgba(242,230,214,.97)';
  c.beginPath(); c.ellipse(0, 0, 15, 16.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(32,28,26,.84)'; c.lineWidth = 2.1; c.stroke();
  // 蛾眉（细长弯）
  c.strokeStyle = 'rgba(48,42,38,.8)'; c.lineWidth = 2; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-11, -6); c.quadraticCurveTo(-6, -9.5, -1, -6); c.stroke();
  c.beginPath(); c.moveTo(1, -6); c.quadraticCurveTo(6, -9.5, 11, -6); c.stroke();
  c.fillStyle = 'rgba(28,24,22,.9)';
  c.beginPath(); c.ellipse(-5.5, 1, 2.4, 2.6, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.5, 1, 2.4, 2.6, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(148,88,84,.8)'; c.lineWidth = 1.8;
  c.beginPath(); c.moveTo(-3, 8); c.lineTo(3, 8); c.stroke();
  // 峨髻（高髻 + 金簪；young 时略低）
  const hh = young ? -16 : -22;
  c.fillStyle = 'rgba(38,34,32,.96)';
  c.beginPath(); c.ellipse(0, -13, 16, 10, 0, 0, Math.PI * 2); c.fill();
  c.beginPath();
  c.moveTo(-14, -12);
  c.quadraticCurveTo(-22, hh - 10, -8, hh - 26);
  c.quadraticCurveTo(0, hh - 36, 10, hh - 24);
  c.quadraticCurveTo(20, hh - 10, 14, -12);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,18,16,.9)'; c.lineWidth = 2; c.stroke();
  // 鬓发
  brush(c, [[-15, -10], [-19, 2]], { w: 4, tone: .7, dry: .6, seed: 1471, tail: .7, col: [38, 34, 32] });
  brush(c, [[15, -10], [19, 2]], { w: 4, tone: .7, dry: .6, seed: 1472, tail: .7, col: [38, 34, 32] });
  // 金簪（斜插）
  c.strokeStyle = 'rgba(186,156,86,.97)'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-13, hh - 6); c.lineTo(15, hh - 22); c.stroke();
  c.fillStyle = 'rgba(214,186,110,.98)';
  c.beginPath(); c.arc(16, hh - 23, 3.4, 0, Math.PI * 2); c.fill();
  c.restore();

  // 竹简（持于左手前；她的「才鉴」道具）
  if (scroll) Z.jiandu(c, -42, -66, 0.9, { a: clamp(fade) * .95, n: 6, seed: 41, ang: -.2 });

  c.restore();
};
})();
