// 《王异》专属笔法库：守冀城的女将（赵昂妻，天水王氏女，裴松之注引皇甫谧《列女传》）。
// 依赖 z_common.js（宣纸/远山/云气/榜题/钤印/大字/尘）+ w_common.js（垂帷/墨云/浓墨烟带/首领/炬火）。
// ⚠ 关键：z_common.js 里是 `const Z = window.Z = {}`（重置），本库必须写 `const Z = window.Z`（追加），
//    否则会把根库清空；且 eras 的 SCENE_LIBS 顺序必须是 z_common → w_common → wy_common。
// 形象（与辛宪英刻意对立）：**短襦战裙 + 布韝（臂鞲）+ 束发巾 + 短刀**——她上城墙，辛宪英只上堂。
//   辛宪英＝素青深衣＋峨髻金簪＋竹简（静、判断）；王异＝灰褐战裙＋皮臂鞲＋束发＋刀（动、行动）。
//   两人都不画甲胄明光铠，都用布帛写意——水墨不画铁片。
// 史实：全出《三国志·魏书·卷二十五·杨阜传》裴松之注引皇甫谧《列女传》，无一处虚构——
//   ① 梁双反，攻破西城，害异两男；女英年六岁 ② 引刀欲自刎，顾英而叹「身死尔弃，当谁恃哉」
//   ③ 以溷粪涅麻而被之，尠食瘠形，自春至冬 → 竟以是免难 ④ 将归，饮毒药而绝，灌之良久乃苏
//   ⑤ 建安中马超攻冀，「异躬著布韝，佐昂守备，又悉脱所佩环、黼黻以赏战士」
//   ⑥ 韦康欲与超和，昂谏不听 → 异曰「当共勉卒高勋，全节致死，不可从也」
//   ⑦ 超背约害康、劫昂、质其子月于南郑 ⑧ 昂与杨阜结谋讨超，问「当奈月何」→ 异厉声「丧元不足为重，况一子哉」
//   ⑨ 闭门逐超 → 保祁山，为超所围三十日，救兵到乃解；超卒杀异子月 ⑩「凡自冀城之难，至于祁山，昂出九奇，异辄参焉」
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 城墙（墙体＋垛口；o.breach: 残破豁口）----------
Z.cityWall = (c, x, y, s, o = {}) => {
  const { a = 1, breach = 0, seed = 11 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 墙体
  c.fillStyle = 'rgba(150,132,106,.9)';
  c.beginPath(); c.moveTo(-420, 0); c.lineTo(-410, -300); c.lineTo(410, -300); c.lineTo(420, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(46,36,26,.9)'; c.lineWidth = 3.4; c.stroke();
  // 砖缝
  c.strokeStyle = 'rgba(60,48,34,.4)'; c.lineWidth = 1.4;
  for (let r = 1; r < 6; r++) {
    const yy = -r * 50;
    c.beginPath(); c.moveTo(-415 + r * 2, yy); c.lineTo(415 - r * 2, yy); c.stroke();
  }
  // 垛口
  c.fillStyle = 'rgba(162,142,114,.94)';
  for (let k = 0; k <= 10; k++) {
    const px = -400 + k * 80;
    if (breach > 0 && Math.abs(px) < 150 * breach) continue;      // 豁口处不画垛口
    c.fillRect(px - 26, -348, 52, 48);
    c.strokeStyle = 'rgba(48,38,26,.9)'; c.lineWidth = 2.4; c.strokeRect(px - 26, -348, 52, 48);
  }
  // 残破豁口
  if (breach > 0) {
    c.fillStyle = 'rgba(232,224,204,.96)';
    c.beginPath();
    c.moveTo(-150 * breach, -300);
    c.lineTo(-100 * breach, -226 + rr() * 20);
    c.lineTo(-40 * breach, -262 + rr() * 24);
    c.lineTo(30 * breach, -196 + rr() * 18);
    c.lineTo(110 * breach, -252 + rr() * 20);
    c.lineTo(150 * breach, -300);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(52,42,30,.82)'; c.lineWidth = 2.6; c.stroke();
  }
  c.restore();
};

// ---------- 攻城（云梯＋攻城卒＋旌旗；主运动）----------
Z.siege = (c, x, y, s, t, o = {}) => {
  const { a = 1, n = 5, seed = 21, climb = 0.5 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.globalAlpha = clamp(a);
  // 云梯（两架，随攻势微晃）
  [[-260, 1.0], [180, 0.9]].forEach(([px2, sc], k) => {
    c.save(); c.translate(x + px2 * s, y); c.scale(s * sc, s * sc);
    c.rotate(-0.62 + Math.sin(t * 1.6 + k) * 0.02);
    brush(c, [[0, 0], [130, 300]], { w: 12, tone: .62, dry: .5, seed: 1501 + k, col: [112, 88, 58] });
    brush(c, [[-24, 6], [106, 306]], { w: 12, tone: .62, dry: .5, seed: 1511 + k, col: [112, 88, 58] });
    c.strokeStyle = 'rgba(78,60,40,.9)'; c.lineWidth = 5;
    for (let i = 1; i < 7; i++) {
      const q = i / 7;
      c.beginPath(); c.moveTo(-24 + q * 130, 6 + q * 300); c.lineTo(q * 130, q * 300); c.stroke();
    }
    c.restore();
  });
  // 攻城卒（沿梯而上；climb 决定爬升进度）
  for (let k = 0; k < n; k++) {
    const ph = (t * .28 + k / n + rr() * .12) % 1;
    const q = clamp(ph * (0.5 + climb));
    const bx = x + (-260 + (k % 2 ? 440 : 0) + 130 * q) * s;
    const by = y + (300 * q - 40) * s;
    c.save(); c.translate(bx, by); c.scale(s * .8, s * .8);
    c.globalAlpha = clamp(a) * (.4 + .6 * Math.sin(Math.PI * ph));
    c.fillStyle = 'rgba(96,86,78,.86)';
    c.beginPath(); c.moveTo(-14, 0); c.quadraticCurveTo(-12, -30, 0, -40); c.quadraticCurveTo(13, -30, 15, 0); c.closePath(); c.fill();
    c.fillStyle = 'rgba(236,226,208,.95)';
    c.beginPath(); c.arc(0, -48, 7, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(84,72,58,.9)'; c.lineWidth = 2.6;
    c.beginPath(); c.moveTo(14, -34); c.lineTo(28, -78); c.stroke();
    c.restore();
  }
  // 旌旗（攻方）
  Z.flag(c, x + 380 * s, y - 20 * s, 340 * s, t, { seed: 1083, col: 'rgba(150,44,38,.82)', text: '馬' });
  c.restore();
};

// ---------- 环佩黼黻（悉脱所佩以赏战士：玉环、佩、绣衣一堆）----------
Z.jewels = (c, x, y, s, o = {}) => {
  const { a = 1, t = 0, seed = 31 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 绣衣（黼黻：黑青相间的礼服纹）
  c.save(); c.rotate(-.2);
  c.fillStyle = 'rgba(58,54,70,.85)';
  c.beginPath(); c.moveTo(-58, 22); c.quadraticCurveTo(-44, -22, 0, -30); c.quadraticCurveTo(44, -22, 58, 22);
  c.quadraticCurveTo(0, 36, -58, 22); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,28,40,.9)'; c.lineWidth = 2.4; c.stroke();
  c.strokeStyle = 'rgba(226,214,180,.6)'; c.lineWidth = 2;
  for (let k = -2; k <= 2; k++) {
    c.beginPath(); c.moveTo(k * 18 - 8, -18); c.lineTo(k * 18 + 6, 14); c.stroke();
  }
  c.restore();
  // 玉环 + 佩（散落，微光）
  [[-40, 34, 13], [-8, 40, 10], [28, 34, 12], [54, 42, 9]].forEach(([px, py, r0], k) => {
    c.strokeStyle = `rgba(196,214,206,${.85 + Math.sin(t * 2 + k) * .1})`; c.lineWidth = 4.6;
    c.beginPath(); c.arc(px, py, r0, 0, Math.PI * 2); c.stroke();
    c.strokeStyle = 'rgba(70,84,80,.7)'; c.lineWidth = 1.4;
    c.beginPath(); c.arc(px, py, r0, 0, Math.PI * 2); c.stroke();
  });
  c.restore();
};

// ---------- 粪麻敝衣（以溷粪涅麻而被之：破麻片披身）----------
Z.hempRobe = (c, x, y, s, o = {}) => {
  const { a = 1, t = 0 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = 'rgba(148,132,96,.88)';
  c.beginPath();
  c.moveTo(-34, -120);
  c.lineTo(-56, -40); c.lineTo(-48, 30); c.lineTo(-16, 40);
  c.lineTo(10, 34); c.lineTo(46, 42); c.lineTo(56, -30); c.lineTo(34, -120);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(72,58,38,.9)'; c.lineWidth = 2.6; c.stroke();
  // 破口 / 污渍（写意：几笔浓墨点）
  c.fillStyle = 'rgba(66,54,34,.6)';
  [[-30, -40, 14], [12, -10, 18], [-8, 14, 12], [34, -60, 10]].forEach(([px, py, r0]) => {
    c.beginPath(); c.ellipse(px, py, r0, r0 * .7, .3, 0, Math.PI * 2); c.fill();
  });
  // 麻缕（随风飘）
  for (let k = 0; k < 5; k++) {
    const a0 = 1.4 + k * .32 + Math.sin(t * 1.8 + k) * .12;
    brush(c, [[-48 + k * 6, 30], [-48 + k * 6 + Math.cos(a0) * 26, 30 + Math.sin(a0) * 26]],
      { w: 3, tone: .5, dry: .8, seed: 1521 + k, tail: .8, col: [142, 126, 90] });
  }
  c.restore();
};

// ---------- 药碗（毒 / 解药两碗；o.poison:1 毒，0 解药）----------
Z.poisonCup = (c, x, y, s, t, o = {}) => {
  const { a = 1, poison = 1, drink = 0 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.fillStyle = 'rgba(212,204,182,.96)';
  c.beginPath(); c.moveTo(-30, -18); c.lineTo(30, -18); c.lineTo(24, 22); c.lineTo(-24, 22); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(62,52,40,.9)'; c.lineWidth = 2.4; c.stroke();
  const lv = poison ? (1 - drink) : 1;                                  // 饮下则液面下降
  c.fillStyle = poison ? `rgba(70,58,44,${.8 * lv})` : `rgba(150,168,120,${.85 * lv})`;
  c.beginPath(); c.ellipse(0, -16 + (1 - lv) * 22, 27, 7, 0, 0, Math.PI * 2); c.fill();
  // 气（毒则黑气，解药则清气）
  const col = poison ? [60, 52, 44] : [140, 170, 150];
  for (let k = 0; k < 3; k++) {
    const ph = (t * .4 + k / 3) % 1;
    c.globalAlpha = clamp(a) * Math.sin(Math.PI * ph) * .55;
    brush(c, [[-12 + k * 12, -20], [-12 + k * 12 + Math.sin(t * 2 + k) * 8, -20 - ph * 60],
              [-12 + k * 12 - Math.sin(t * 1.6 + k) * 8, -18 - ph * 110]],
      { w: 12, tone: .2, dry: .9, seed: 1531 + k, tail: .7, col });
  }
  c.restore();
};

// ---------- 幼女赵英（六岁；她的「当谁恃哉」是王异不死的原因）----------
Z.child = (c, x, y, s, t, o = {}) => {
  const { fade = 1, flip = 0, seed = 41 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.6 + seed) * 2);
  c.fillStyle = 'rgba(132,126,138,.8)';
  c.beginPath(); c.moveTo(-18, 0); c.quadraticCurveTo(-16, -40, 0, -50); c.quadraticCurveTo(17, -40, 19, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(38,34,42,.86)'; c.lineWidth = 2.2; c.stroke();
  brush(c, [[16, -36], [26, -18], [22, -2]], { w: 8, tone: .45, dry: .5, seed: 1541, head: .1, tail: .2 });
  c.save(); c.translate(0, -62);
  c.fillStyle = 'rgba(242,230,214,.97)';
  c.beginPath(); c.ellipse(0, 0, 11, 12, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(30,26,24,.84)'; c.lineWidth = 1.8; c.stroke();
  c.fillStyle = 'rgba(30,26,24,.9)';
  c.beginPath(); c.arc(-4, 1, 1.8, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(4, 1, 1.8, 0, Math.PI * 2); c.fill();
  // 双丫髻
  c.fillStyle = 'rgba(44,40,38,.94)';
  c.beginPath(); c.arc(-9, -10, 6, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(9, -10, 6, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(0, -8, 11, 7, 0, 0, Math.PI * 2); c.fill();
  c.restore();
  c.restore();
};

// ---------- 祁山（远山剪影，王异最后守的地方）----------
Z.qishan = (c, x, y, s, o = {}) => {
  const { a = 1, seed = 51 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  for (let k = 0; k < 3; k++) {
    const tone = .18 + k * .1;
    c.fillStyle = `rgba(${96 - k * 12},${92 - k * 10},${86 - k * 8},${.5 + k * .18})`;
    c.beginPath();
    c.moveTo(-460, 40);
    for (let i = 0; i <= 12; i++) {
      const px = -460 + i * 76;
      const py = 40 - Math.abs(Math.sin(i * .9 + k * 2 + rr() * .6)) * (150 - k * 32) - rr() * 16;
      c.lineTo(px, py);
    }
    c.lineTo(460, 40); c.closePath(); c.fill();
    c.strokeStyle = `rgba(52,46,40,${.5 + k * .1})`; c.lineWidth = 2.2; c.stroke();
  }
  c.restore();
};

// ---------- 赵昂（王异之夫，字伟璋：长袍＋进贤冠，无披风——区别于 w_common 的 Z.leader）----------
// o: { t, flip, bow, fade, argue(争辩/抬手), downcast(垂头) }
Z.zhaoAng = (c, x, y, s, t, o = {}) => {
  const { flip = 0, bow = 0, fade = 1, argue = 0, downcast = 0, seed = 71 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.3) * 3);
  c.rotate(bow * .12 - downcast * .1);
  // 长袍
  const hem = Math.sin(t * 1.2) * 6;
  c.fillStyle = 'rgba(112,106,116,.84)';
  c.beginPath();
  c.moveTo(-26, -150);
  c.quadraticCurveTo(-58, -74, -62 + hem, -4);
  c.quadraticCurveTo(0, 8 + hem * .4, 62 + hem * .6, -4);
  c.quadraticCurveTo(56, -76, 26, -150);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(32,30,38,.9)'; c.lineWidth = 3; c.stroke();
  brush(c, [[-14, -136], [-9, -78], [-14, -22]], { w: 3, tone: .28, dry: .75, seed: 1601 + seed, tail: .6, bristles: 3 });
  brush(c, [[8, -134], [13, -74], [8, -20]], { w: 2.6, tone: .24, dry: .75, seed: 1602 + seed, tail: .6, bristles: 3 });
  brush(c, [[-14, -152], [-2, -128], [16, -150]], { w: 3.6, tone: .76, dry: .4, seed: 1603 + seed, col: [222, 216, 204] });
  brush(c, [[-32, -102], [0, -96], [32, -102]], { w: 9, tone: .58, dry: .5, seed: 1604 + seed, col: [116, 94, 58] });
  // 双臂（argue 时抬手）
  const rl = ease.out(clamp(argue));
  brush(c, [[-26, -146], [-42, -108], [-38, -64]], { w: 15, tone: .4, dry: .5, seed: 1611 + seed, head: .1, tail: .2 });
  brush(c, [[26, -146], [44, -118 - 22 * rl], [52, -146 - 44 * rl]],
    { w: 14, tone: .4, dry: .5, seed: 1612 + seed, head: .1, tail: .2 });
  const hx = 52, hy = -146 - 44 * rl;
  c.fillStyle = 'rgba(238,226,206,.96)';
  c.beginPath(); c.ellipse(hx + 3, hy, 9, 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();
  // 头（进贤冠；downcast 则眉眼下垂）
  c.save(); c.translate(0, -178 - bow * 5); c.rotate(bow * .1 + downcast * .12);
  c.fillStyle = 'rgba(238,226,206,.97)';
  c.beginPath(); c.ellipse(0, 0, 15.5, 17, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 2.2; c.stroke();
  brush(c, [[-11, -5 - downcast * 1], [-4, -7 - downcast * 2]], { w: 3.4, tone: .8, dry: .4, seed: 1621 + seed, col: [36, 32, 28] });
  brush(c, [[4, -7 - downcast * 2], [11, -5 - downcast * 1]], { w: 3.4, tone: .8, dry: .4, seed: 1622 + seed, col: [36, 32, 28] });
  c.fillStyle = 'rgba(26,22,20,.92)';
  c.beginPath(); c.ellipse(-5.5, 1 + downcast * 1.5, 2.4, 2.8, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.5, 1 + downcast * 1.5, 2.4, 2.8, 0, 0, Math.PI * 2); c.fill();
  brush(c, [[-2, 9], [0, 20]], { w: 4, tone: .66, dry: .6, seed: 1623 + seed, tail: .7, bristles: 4 });
  // 进贤冠
  c.fillStyle = 'rgba(50,52,66,.96)';
  c.beginPath(); c.moveTo(-17, -11); c.lineTo(-14, -38); c.lineTo(14, -38); c.lineTo(17, -11); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,18,26,.9)'; c.lineWidth = 2.2; c.stroke();
  c.fillStyle = 'rgba(142,118,64,.96)'; c.fillRect(-15, -28, 30, 5);
  c.restore();
  c.restore();
};

// ---------- 王异：守城女将（单位坐标，原点＝脚底，头顶 ≈ -198）----------
// o: { t, flip, bow, fade, gou(布韝臂鞲), knife(持短刀), raise(抬手/举刀), thin(尠食瘠形：消瘦), seed }
Z.wangyi = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, bow = 0, fade = 1, gou = 1, knife = 0, raise = 0, thin = 0, seed = 61 } = o;
  const br = Math.sin(t * 1.5) * .014;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.5) * 3);
  c.rotate(br * .5 + bow * .12);

  const skin = 1 - thin * .28;                       // 消瘦时整体收窄

  // 双足（战靴）
  brush(c, [[-15, -8], [-19, 24]], { w: 13, tone: .55, dry: .55, seed: 1551 });
  brush(c, [[15, -8], [19, 24]], { w: 13, tone: .55, dry: .55, seed: 1552 });
  c.fillStyle = 'rgba(58,50,44,.88)';
  c.beginPath(); c.ellipse(-19, 28, 14, 7, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(19, 28, 14, 7, 0, 0, Math.PI * 2); c.fill();

  // 战裙（及地，比深衣窄，便于行动）
  const hem = Math.sin(t * 1.4) * 6;
  c.save(); c.scale(skin, 1);
  c.fillStyle = 'rgba(96,92,100,.82)';
  c.beginPath();
  c.moveTo(-22, -140);
  c.quadraticCurveTo(-50, -70, -58 + hem, -6);
  c.quadraticCurveTo(0, 6 + hem * .4, 58 + hem * .6, -6);
  c.quadraticCurveTo(48, -72, 22, -140);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(32,30,36,.9)'; c.lineWidth = 3; c.stroke();
  c.restore();
  // 裙褶
  brush(c, [[-12, -128], [-7, -70], [-12, -16]], { w: 3, tone: .3, dry: .75, seed: 1561, tail: .6, bristles: 3 });
  brush(c, [[6, -126], [11, -66], [6, -12]], { w: 2.6, tone: .26, dry: .75, seed: 1562, tail: .6, bristles: 3 });
  // 上襦（短衣，束袖，束于裙内）
  c.save(); c.scale(skin, 1);
  c.fillStyle = 'rgba(118,112,104,.86)';
  c.beginPath();
  c.moveTo(-24, -146);
  c.quadraticCurveTo(-32, -112, -28, -96);
  c.lineTo(28, -96);
  c.quadraticCurveTo(32, -112, 24, -146);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(36,34,38,.9)'; c.lineWidth = 2.8; c.stroke();
  c.restore();
  brush(c, [[-12, -146], [-1, -124], [14, -144]], { w: 3.4, tone: .7, dry: .4, seed: 1563, col: [196, 190, 176] });
  // 腰带
  brush(c, [[-28, -100], [0, -94], [28, -100]], { w: 9, tone: .6, dry: .45, seed: 1564, col: [92, 76, 54] });

  // 双臂 + 布韝（臂鞲：皮套，从腕到肘——她的辨识要素）
  const rl = ease.out(clamp(raise));
  const arm = (sx, ex, ey, w2, sd) => {
    brush(c, [[sx, -142], [ex * .6, (ey + -142) / 2], [ex, ey]], { w: 14, tone: .45, dry: .5, seed: sd, head: .1, tail: .2 });
    if (gou) {                                        // 布韝：前臂皮套
      c.save();
      c.strokeStyle = 'rgba(154,118,70,.92)'; c.lineWidth = 15; c.lineCap = 'round';
      c.beginPath(); c.moveTo(ex * .72, (ey + -142) / 2 + 12); c.lineTo(ex, ey + 10); c.stroke();
      c.strokeStyle = 'rgba(84,62,36,.8)'; c.lineWidth = 2.2;
      [-0.3, 0.1, 0.5].forEach((q) => {
        const qx = lerp(ex * .72, ex, q + .3), qy = lerp((ey + -142) / 2 + 12, ey + 10, q + .3);
        c.beginPath(); c.moveTo(qx - 9, qy - 5); c.lineTo(qx + 9, qy + 5); c.stroke();
      });
      c.restore();
    }
  };
  arm(-24, -40, -66 - 12 * rl, 13, 1571);
  arm(24, 44, -118 - 26 * rl, 13, 1572);
  const hx = 44, hy = -118 - 26 * rl;
  c.fillStyle = 'rgba(238,226,206,.96)';
  c.beginPath(); c.ellipse(hx + 3, hy, 9, 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();

  // 头（坚毅：眉上扬、抿唇；thin 时面颊凹陷）
  c.save(); c.translate(0, -170 - bow * 5); c.rotate(bow * .1); c.scale(skin, 1);
  c.fillStyle = 'rgba(238,224,204,.97)';
  c.beginPath(); c.ellipse(0, 0, 15 - thin * 3, 16.5 - thin * 2, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(32,28,26,.86)'; c.lineWidth = 2.2; c.stroke();
  // 眉（上扬，坚毅）
  c.strokeStyle = 'rgba(44,38,34,.86)'; c.lineWidth = 2.6; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-11, -7); c.lineTo(-2, -9.5); c.stroke();
  c.beginPath(); c.moveTo(2, -9.5); c.lineTo(11, -7); c.stroke();
  c.fillStyle = 'rgba(28,24,22,.92)';
  c.beginPath(); c.ellipse(-5.5, 1, 2.5, 2.7, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.5, 1, 2.5, 2.7, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(120,78,74,.85)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-3.5, 8); c.lineTo(3.5, 8); c.stroke();
  // 束发（低髻 + 巾：便于行动，与辛宪英的峨髻判然有别）
  c.fillStyle = 'rgba(44,40,38,.95)';
  c.beginPath(); c.ellipse(0, -12, 15, 9, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(-2, -24, 9, 8, -.2, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(74,68,62,.94)';
  c.beginPath(); c.moveTo(-16, -14); c.quadraticCurveTo(-6, -34, 16, -16); c.lineTo(15, -8); c.lineTo(-15, -8); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(26,24,22,.88)'; c.lineWidth = 2.2; c.stroke();
  // 巾带（脑后，随风）
  const wf = Math.sin(t * 1.7) * 8;
  brush(c, [[-15, -20], [-30 + wf * .5, -14], [-42 + wf, 0]],
    { w: 6, tone: .45, dry: .7, seed: 1581, tail: .7, col: [74, 68, 62] });
  c.restore();

  // 短刀（引刀欲自刎 / 守城之用）
  if (knife) {
    c.save(); c.translate(hx + 6, hy + 12); c.rotate(-.9 + Math.sin(t * 2.2) * .08);
    brush(c, [[0, 0], [4, -22]], { w: 6, tone: .6, dry: .4, seed: 1591, col: [92, 76, 56] });
    c.strokeStyle = 'rgba(244,248,250,.96)'; c.lineWidth = 3.6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(4, -22); c.lineTo(12, -62); c.stroke();
    c.strokeStyle = 'rgba(70,78,92,.5)'; c.lineWidth = 1.1;
    c.beginPath(); c.moveTo(4, -22); c.lineTo(12, -62); c.stroke();
    c.restore();
  }

  c.restore();
};
})();
