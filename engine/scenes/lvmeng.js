// 《吕蒙》笔法与八幕：白衣渡江 —— 少年武夫与白衣儒将两副面孔。
// 视觉辨识：全片主角有「双形态」——① 少年武夫（粗布短打、露臂、散发，锐目）② 白衣渡江（素白长袍、
//           束发无冠、执刀不出鞘）。母题贯穿：白（白衣／白衣行縢／白衣渡江）、刀（斩陈就／取荆州）、
//           简册（孙权劝学）、士别三日（鲁肃拊背）。
// 依《三国志·吴书·吕蒙传》：汝南富陂人，少南渡依姊夫邓当 → 年十五六窃随当击贼，母怒将罚，
// 蒙曰「贫贱难可居，卒误有功，富贵可致。且不探虎穴，安得虎子」→ 军吏轻之曰「此欲以肉喂虎耳」，
// 蒙大怒引刀杀吏出走 → 校尉袁雄为言于策，策召见奇之 → 数岁邓当死，张昭荐蒙代当，拜别部司马 →
// 权统事，欲并合诸小将，蒙阴赊赀为兵作绛衣行縢，权见之大悦 → 从征黄祖，蒙勒前锋亲枭就首 →
// 权劝读书，蒙辞以军务，悟而折节读书 → 鲁肃过蒙驻所，肃曰「非复吴下阿蒙」，蒙曰「士别三日，
// 即更刮目相待」→ 建安二十四年蒙称病笃，权露檄召之，遂说权取荆州；蒙伏精兵舳舻中，使白衣摇橹
// 作商贾人服，昼夜兼行，至羽所置江边屯候，尽收缚之，羽不闻知 → 南郡士仁、糜芳皆降 → 蒙麾下士取民家一笠
// 以覆官铠，蒙以为犯军令，垂涕斩之，于是军中震栗，道不拾遗 → 权嘉其功 → 建安二十四年病发，
// 权迎置内殿，四十二岁卒。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 吕蒙刀（环首环刀 + 红缨），与徐晃的环首刀同一族但更短、带红缨
Z.lvmengdao = (c, x, y, ang, len = 220, t = 0, o = {}) => {
  const { tassel = 1 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 4], [0, 46]], { w: 10, col: [86, 62, 38], tone: 0.9, dry: 0.32, seed: 9701 });
  c.fillStyle = 'rgba(154,122,60,.95)';
  c.beginPath(); c.ellipse(0, 3, 14, 5, 0, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(198,204,210,.94)'; c.strokeStyle = 'rgba(26,28,30,.9)'; c.lineWidth = 1.8;
  c.beginPath();
  c.moveTo(-7, 0); c.quadraticCurveTo(-10, -len * 0.55, -4, -len);
  c.quadraticCurveTo(0, -len - 16, 5, -len);
  c.quadraticCurveTo(7, -len * 0.5, 7, 0);
  c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(234,240,246,.55)'; c.lineWidth = 1.2;
  c.beginPath(); c.moveTo(-1, -8); c.quadraticCurveTo(-3, -len * 0.5, 0, -len + 5); c.stroke();
  c.strokeStyle = 'rgba(168,136,70,.95)'; c.lineWidth = 4.4;
  c.beginPath(); c.arc(0, -len - 24, 10, 0, Math.PI * 2); c.stroke();
  if (tassel) {
    brush(c, [[0, 4], [-3, 26], [2, 44]], { w: 5, col: [166, 52, 44], tone: 0.9, dry: 0.34, seed: 9702 });
  }
  c.restore();
};

// 吕蒙：子明（o: { t, raise, flip, dao, white(白衣态), young(少年武夫), back(背影) })
Z.lvmeng = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, dao = 0, white = 0, young = 0, back = 0 } = o;
  const br = Math.sin(t * (young ? 1.4 : 1.1)) * (young ? 0.012 : 0.008);
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const hem = Math.sin(t * 1.4) * 5;
  // 腿
  brush(c, [[-16, -74], [-24, -34], [-30, 4]], { w: 17, tone: 0.8, dry: 0.5, seed: 9801, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [24, -34], [30, 4]], { w: 17, tone: 0.8, dry: 0.5, seed: 9802, head: 0.06, tail: 0.2 });
  if (young) {
    // 少年武夫：粗布短打，露臂，衣短
    c.fillStyle = 'rgba(122,104,74,.86)';
    c.beginPath();
    c.moveTo(-26, -140); c.quadraticCurveTo(-44, -84, -46 + hem, -30);
    c.quadraticCurveTo(0, -20, 46 + hem * 0.6, -30);
    c.quadraticCurveTo(44, -84, 26, -140);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(54,42,26,.85)'; c.lineWidth = 2.6; c.stroke();
    // 腰带
    brush(c, [[-28, -104], [0, -100], [28, -104]], { w: 9, col: [92, 60, 40], tone: 0.9, dry: 0.34, seed: 9811 });
    // 裸露的臂（少年）
    c.strokeStyle = 'rgba(214,186,152,.92)'; c.lineWidth = 12; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-24, -134); c.lineTo(-44, -96); c.lineTo(-46, -66); c.stroke();
    c.beginPath(); c.moveTo(24, -134); c.lineTo(44, -96); c.lineTo(46, -66); c.stroke();
  } else {
    // 白衣态：素白长袍（他白衣渡江、绛衣行縢，白是全片母题）
    const robeCol = white ? 'rgba(238,236,228,.9)' : 'rgba(196,196,196,.82)';
    c.fillStyle = robeCol;
    c.beginPath();
    c.moveTo(-30, -164);
    c.quadraticCurveTo(-56, -84, -60 + hem, -4);
    c.quadraticCurveTo(0, 6 + hem * 0.4, 60 + hem * 0.6, -4);
    c.quadraticCurveTo(54, -86, 30, -164);
    c.closePath(); c.fill();
    c.strokeStyle = white ? 'rgba(126,124,118,.7)' : 'rgba(96,96,96,.72)'; c.lineWidth = 2.8; c.stroke();
    // 交领（内衬浅色）
    c.strokeStyle = 'rgba(160,156,148,.55)'; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(-15, -164); c.quadraticCurveTo(0, -142, 15, -164); c.stroke();
    // 素带
    c.fillStyle = 'rgba(158,152,140,.85)';
    c.fillRect(-38, -116, 76, 12);
    c.strokeStyle = 'rgba(110,106,98,.7)'; c.lineWidth = 1.4; c.strokeRect(-38, -116, 76, 12);
    // 双臂（白衣大袖）
    const rl = ease.out(clamp(raise));
    c.fillStyle = white ? 'rgba(234,232,224,.85)' : 'rgba(190,190,190,.8)';
    c.beginPath();
    c.moveTo(-30, -156);
    c.quadraticCurveTo(-62 - 16 * rl, -134 - 16 * rl, -66 - 18 * rl, -92 - 20 * rl);
    c.quadraticCurveTo(-56 - 12 * rl, -82 - 16 * rl, -46 - 6 * rl, -96);
    c.quadraticCurveTo(-40, -126, -30, -142);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(120,116,108,.7)'; c.lineWidth = 2.2; c.stroke();
    c.beginPath();
    c.moveTo(30, -156);
    c.quadraticCurveTo(62 + 16 * rl, -134 - 16 * rl, 66 + 18 * rl, -92 - 20 * rl);
    c.quadraticCurveTo(56 + 12 * rl, -82 - 16 * rl, 46 + 6 * rl, -96);
    c.quadraticCurveTo(40, -126, 30, -142);
    c.closePath(); c.fill(); c.stroke();
  }
  // 头
  c.save(); c.translate(2, -186);
  if (back) {
    c.fillStyle = 'rgba(36,30,26,.94)';
    c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
  } else {
    c.fillStyle = 'rgba(238,226,206,.96)';
    c.beginPath(); c.ellipse(0, 0, 16, 18.5, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(46,38,30,.9)'; c.lineWidth = 2.1; c.stroke();
  }
  if (young) {
    // 少年：散发
    c.fillStyle = 'rgba(38,30,26,.95)';
    c.beginPath(); c.moveTo(-18, 2); c.quadraticCurveTo(-16, -20, 0, -22);
    c.quadraticCurveTo(16, -20, 18, 2); c.quadraticCurveTo(0, -10, -18, 2); c.closePath(); c.fill();
    brush(c, [[-15, -4], [-22, 18], [-16, 34]], { w: 5, col: [38, 30, 26], tone: 0.9, dry: 0.4, seed: 9821 });
    brush(c, [[15, -4], [22, 18], [16, 34]], { w: 5, col: [38, 30, 26], tone: 0.9, dry: 0.4, seed: 9822 });
  } else {
    // 束发无冠（白衣渡江不戴盔）
    c.fillStyle = 'rgba(40,32,28,.95)';
    c.beginPath();
    c.moveTo(-17, 0); c.quadraticCurveTo(-14, -19, 0, -23);
    c.quadraticCurveTo(15, -19, 17, 0);
    c.quadraticCurveTo(0, -8, -17, 0); c.closePath(); c.fill();
    c.fillStyle = 'rgba(238,236,228,.92)';
    c.fillRect(-16, -8, 32, 6);
    c.strokeStyle = 'rgba(120,116,110,.6)'; c.lineWidth = 1.2; c.stroke();
    brush(c, [[-13, -8], [-18, 12], [-13, 26]], { w: 4.2, col: [40, 32, 28], tone: 0.9, dry: 0.4, seed: 9823 });
  }
  if (!back) {
    // 目（锐利——他少年时能一刀杀吏，后为一代统帅）
    c.fillStyle = 'rgba(252,249,242,.96)'; c.beginPath(); c.ellipse(6, -2, 4.6, 2.7, -0.04, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(7.4, -2, 2.1, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(30,24,20,.85)'; c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(1, -5.8); c.quadraticCurveTo(7, -8.2, 12, -5.6); c.stroke();
    // 短须
    if (!young) {
      const wf = Math.sin(t * 1.4) * 2;
      c.strokeStyle = 'rgba(42,36,30,.9)'; c.lineWidth = 2.6; c.lineCap = 'round';
      c.beginPath(); c.moveTo(-6, 10); c.quadraticCurveTo(-2, 22 + wf * 0.3, 5, 15 + wf); c.stroke();
    }
  }
  c.restore();
  c.restore();
  if (dao) {
    const dx = flip ? -66 : 66;
    Z.lvmengdao(c, x + dx * s, y - 100 * s, flip ? -0.28 : 0.28, 230 * s, t, { tassel: 1 });
  }
};

// ① 少年从军：年十五六窃随姐夫邓当击贼
SCENES['lm1_shaojun'] = (() => {
  const p = () => Z.paper('lm1', '#e6ddc4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lm1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(80,72,58,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 460, amp: 122, tone: 0.18, seed: 701.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1701 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1703, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 山越（敌影）
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.7, lt) * 0.5);
    for (let i = 0; i < 4; i++) {
      const px = 1220 + i * 78, py = 900 - i * 8;
      brush(c, [[px, py], [px + 4, py - 46]], { w: 15, tone: 0.4, dry: 0.5, seed: 1704 + i });
    }
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.lvmeng(c, lerp(420, 760, ap), 950, lerp(1.3, 2.0, ap), t, { raise: 0.2, dao: 0, young: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '子明', ss(1.0, 1.28, lt), { size: 88, seed: 91 });
  } };
})();

// ② 不探虎穴：母怒将罚，蒙曰「安得虎子」
SCENES['lm2_tihu'] = (() => {
  const p = () => Z.paper('lm2', '#e2d9bf');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lm2_bg', 0.42 + 0.58 * grow, (g) => {
      g.fillStyle = 'rgba(66,60,50,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 130, tone: 0.2, seed: 711.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.25 });
    // 屋（家）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.3, lt) * 0.8);
    c.fillStyle = 'rgba(112,90,58,.85)';
    c.beginPath(); c.moveTo(1060, 830); c.lineTo(1250, 740); c.lineTo(1440, 830); c.closePath(); c.fill();
    c.fillStyle = 'rgba(178,162,132,.85)';
    c.fillRect(1090, 830, 320, 120);
    c.strokeStyle = 'rgba(70,54,34,.7)'; c.lineWidth = 2; c.strokeRect(1090, 830, 320, 120);
    c.restore();
    // 母亲（远影，怒）
    c.save(); c.globalAlpha = clamp(ss(0.5, 1.6, lt) * 0.6);
    c.fillStyle = 'rgba(96,72,70,.8)';
    c.beginPath(); c.moveTo(1250, 950); c.quadraticCurveTo(1226, 860, 1256, 856);
    c.quadraticCurveTo(1286, 856, 1282, 950); c.closePath(); c.fill();
    c.fillStyle = 'rgba(230,220,198,.9)'; c.beginPath(); c.ellipse(1256, 840, 13, 14, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.lvmeng(c, lerp(400, 720, ap), 950, lerp(1.3, 1.95, ap), t, { raise: 0.5, dao: 0, young: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '虎穴', ss(1.0, 1.28, lt), { size: 88, seed: 92 });
  } };
})();

// ③ 引刀杀吏：军吏轻之曰「以肉喂虎耳」
SCENES['lm3_shaci'] = (() => {
  const p = () => Z.paper('lm3', '#dcd1b5');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lm3_bg', 0.26 + 0.74 * grow, (g) => {
      g.fillStyle = 'rgba(52,44,40,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 150, tone: 0.26, seed: 721.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.32 });
    brush(c, [[0, 930], [520, 918], [1000, 936], [1420, 920]], { w: 15, tone: 0.72, dry: 0.64, seed: 1713 });
    // 军吏（对面，轻蔑）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.4, lt) * 0.85);
    c.fillStyle = 'rgba(78,78,82,.85)';
    c.beginPath(); c.moveTo(1240, 950); c.quadraticCurveTo(1216, 866, 1246, 862);
    c.quadraticCurveTo(1276, 862, 1272, 950); c.closePath(); c.fill();
    c.fillStyle = 'rgba(228,218,196,.92)'; c.beginPath(); c.ellipse(1246, 846, 13, 14, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(48,42,36,.85)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
    // 刀光（引刀）
    c.save(); c.globalAlpha = clamp(ss(0.9, 1.8, lt) * 0.5);
    c.strokeStyle = 'rgba(238,242,248,.78)'; c.lineWidth = 3.2;
    c.beginPath(); c.arc(900, 660, 116, -0.9, 0.5); c.stroke();
    c.restore();
    const ap = ease.out(ss(0.15, 1.25, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.14);
    Z.lvmeng(c, lerp(420, 760, ap), 930, lerp(1.25, 1.85, ap), t, { raise: 0.95, dao: 1, young: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '杀吏', ss(1.0, 1.28, lt), { size: 88, seed: 93 });
  } };
})();

// ④ 绛衣行縢：阴赊赀为兵作绛衣，权见之大悦
SCENES['lm4_jiangyi'] = (() => {
  const p = () => Z.paper('lm4', '#e8dfc6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lm4_bg', 0.42 + 0.58 * grow, (g) => {
      g.fillStyle = 'rgba(72,66,54,.11)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2030, [{ y0: 460, amp: 116, tone: 0.19, seed: 731.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    Z.mist(c, t, { y0: 500, y1: 740, n: 3, alpha: 0.28, speed: 26, seed: 1721 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1723, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 绛衣行縢的兵列（红衣红裤，一色）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.5, lt) * 0.82);
    for (let i = 0; i < 5; i++) {
      const px = 1080 + i * 96, py = 900 - Math.floor(i / 3) * 46;
      c.fillStyle = 'rgba(158,52,44,.85)';
      c.fillRect(px - 13, py - 84, 26, 56);
      c.fillStyle = 'rgba(150,48,40,.85)';
      c.fillRect(px - 12, py - 32, 24, 32);
      c.fillStyle = 'rgba(232,222,200,.88)'; c.beginPath(); c.ellipse(px, py - 94, 10, 11, 0, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.lvmeng(c, lerp(400, 700, ap), 952, lerp(1.3, 1.9, ap), t, { raise: 0.3, dao: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '绛衣', ss(1.0, 1.28, lt), { size: 88, seed: 94 });
  } };
})();

// ⑤ 斩陈就：勒前锋，亲枭就首
SCENES['lm5_chenjiu'] = (() => {
  const p = () => Z.paper('lm5', '#dbd0b4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lm5_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(48,42,40,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 158, tone: 0.28, seed: 741.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.33 });
    Z.water(c, t, { y0: 800, y1: 1060, tone: 0.36, seed: 94, rows: 6 });
    // 城（黄祖城）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.68);
    c.fillStyle = 'rgba(170,160,140,.65)';
    c.fillRect(1240, 700, 440, 250);
    c.strokeStyle = 'rgba(92,84,70,.6)'; c.lineWidth = 2;
    for (let k = 0; k < 5; k++) { c.fillRect(1260 + k * 86, 674, 52, 28); }
    c.restore();
    // 刀光（亲枭）
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.6);
    c.strokeStyle = 'rgba(240,244,248,.8)'; c.lineWidth = 3.4;
    c.beginPath(); c.arc(860, 620, 140, -1.0, 0.5); c.stroke();
    c.restore();
    const ap = ease.out(ss(0.15, 1.25, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lvmeng(c, lerp(420, 740, ap), 920, lerp(1.25, 1.85, ap), t, { raise: 0.95, dao: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '枭就', ss(1.0, 1.28, lt), { size: 88, seed: 95 });
  } };
})();

// ⑥ 士别三日：肃拊蒙背曰「非复吴下阿蒙」
SCENES['lm6_sanri'] = (() => {
  const p = () => Z.paper('lm6', '#e4dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lm6_bg', 0.44 + 0.56 * grow, (g) => {
      g.fillStyle = 'rgba(68,62,52,.11)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 450, amp: 124, tone: 0.19, seed: 751.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.24 });
    Z.mist(c, t, { y0: 500, y1: 740, n: 3, alpha: 0.28, speed: 26, seed: 1731 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1733, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 案与简册（他开始读书）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.4, lt) * 0.88);
    c.fillStyle = 'rgba(120,86,50,.9)'; c.fillRect(1040, 850, 300, 14);
    c.fillRect(1060, 864, 12, 60); c.fillRect(1310, 864, 12, 60);
    c.fillStyle = 'rgba(226,214,186,.92)';
    c.beginPath(); c.moveTo(1100, 826); c.lineTo(1230, 820); c.lineTo(1234, 848); c.lineTo(1104, 854); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(90,70,44,.7)'; c.lineWidth = 1.6; c.stroke();
    // 竹简纹
    c.strokeStyle = 'rgba(130,106,66,.5)'; c.lineWidth = 1;
    for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(1120 + k * 28, 824); c.lineTo(1120 + k * 28, 850); c.stroke(); }
    c.restore();
    // 鲁肃（对坐，拱手拊背）
    c.save(); c.globalAlpha = clamp(ss(0.5, 1.6, lt) * 0.85);
    c.fillStyle = 'rgba(72,84,72,.85)';
    c.beginPath(); c.moveTo(1440, 950); c.quadraticCurveTo(1416, 862, 1446, 858);
    c.quadraticCurveTo(1476, 858, 1472, 950); c.closePath(); c.fill();
    c.fillStyle = 'rgba(230,220,198,.92)'; c.beginPath(); c.ellipse(1446, 842, 13, 14, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lvmeng(c, lerp(400, 720, ap), 952, lerp(1.3, 1.95, ap), t, { raise: 0.35, dao: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '刮目', ss(1.0, 1.28, lt), { size: 88, seed: 96 });
  } };
})();

// ⑦ 白衣渡江：伏精兵舳舻中，使白衣摇橹作商贾人服
SCENES['lm7_baiyi'] = (() => {
  const p = () => Z.paper('lm7', '#dcd3b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lm7_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(52,52,58,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 150, tone: 0.24, seed: 761.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    Z.water(c, t, { y0: 700, y1: 1060, tone: 0.46, seed: 95, rows: 8 });
    // 舳舻（船队）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.85);
    for (let i = 0; i < 4; i++) {
      const bx = 1020 + i * 200, by = 860 - i * 16;
      brush(c, [[bx, by], [bx + 150, by - 6]], { w: 16, col: [92, 68, 44], tone: 0.85, dry: 0.42, seed: 1741 + i });
      // 篷（盖住精兵）
      c.fillStyle = 'rgba(206,196,172,.85)';
      c.beginPath(); c.ellipse(bx + 70, by - 20, 62, 26, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(96,82,58,.6)'; c.lineWidth = 1.6; c.stroke();
    }
    c.restore();
    // 白衣摇橹者（白衣人）
    c.save(); c.globalAlpha = clamp(ss(0.5, 1.6, lt) * 0.78);
    for (let i = 0; i < 4; i++) {
      const px = 1080 + i * 200, py = 838 - i * 16;
      c.fillStyle = 'rgba(238,236,228,.92)';
      c.fillRect(px - 10, py - 58, 20, 40);
      c.fillStyle = 'rgba(226,220,204,.9)'; c.beginPath(); c.ellipse(px, py - 66, 9, 10, 0, 0, Math.PI * 2); c.fill();
      // 橹
      c.strokeStyle = 'rgba(96,74,48,.8)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(px + 12, py - 40); c.lineTo(px + 42, py + 16); c.stroke();
    }
    c.restore();
    // 吕蒙：白衣立船头
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.lvmeng(c, lerp(420, 660, ap), 900, lerp(1.2, 1.7, ap), t, { raise: 0.3, dao: 0, white: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '渡江', ss(1.0, 1.28, lt), { size: 88, seed: 97 });
  } };
})();

// ⑧ 军中震栗：取民家一笠覆官铠，垂涕斩之，道不拾遗
SCENES['lm8_zhenli'] = (() => {
  const p = () => Z.paper('lm8', '#d7cdb3');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'lm8_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(46,42,42,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 152, tone: 0.26, seed: 771.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.32 });
    Z.mist(c, t, { y0: 560, y1: 860, n: 4, alpha: 0.3, speed: 20, seed: 1751 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.7, seed: 1753, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 城（江陵，所得之城）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.62);
    c.fillStyle = 'rgba(170,160,140,.6)';
    c.fillRect(1220, 700, 460, 250);
    c.strokeStyle = 'rgba(92,84,70,.55)'; c.lineWidth = 2;
    for (let k = 0; k < 5; k++) { c.fillRect(1240 + k * 88, 674, 54, 28); }
    c.restore();
    // 斗笠（被取的那一顶）落在地上
    c.save(); c.globalAlpha = clamp(ss(0.9, 1.8, lt) * 0.85);
    c.fillStyle = 'rgba(198,176,128,.92)';
    c.beginPath(); c.ellipse(1080, 930, 34, 15, 0.1, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(120,100,64,.75)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
    // 吕蒙：白衣，落泪（垂涕）
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.08);
    Z.lvmeng(c, lerp(400, 700, ap), 950, lerp(1.25, 1.72, ap), t, { raise: 0.1, dao: 0, white: 1 });
    c.restore();
    // 泪
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.0, lt) * 0.5);
    c.strokeStyle = 'rgba(180,200,214,.75)'; c.lineWidth = 2;
    for (let k = 0; k < 3; k++) {
      c.beginPath(); c.moveTo(676 + k * 16, 786); c.lineTo(676 + k * 16, 816); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '震栗', ss(1.0, 1.28, lt), { size: 88, seed: 98 });
  } };
})();
})();
