// 《张昭》笔法与八幕：江东老仲父 —— 深青宽袍＋纶巾＋手板（朝板）。
// 视觉辨识：全片唯一「以手板与言语为兵器」的主角 —— 深青袍（比其他文臣更沉）、白须、执朝板；
//           辨识母题：① 扶上马（托孤）② 射虎车 ③ 摔刀之地 ④ 封门之土 ⑤ 幅巾素棺。
// 依《三国志·吴书·张昭传》：彭城人，少好学善隶书，弱冠察孝廉不就 → 汉末南渡江 →
// 孙策创业，命为长史、抚军中郎将，升堂拜母，如比肩之旧 → 策临亡以弟权托昭，昭率群僚立而辅之 →
// 权悲感未视事，昭谓「为人后者，贵能负荷先轨」，身自扶权上马 → 权每田猎，昭变色谏 →
// 魏使邢贞拜权为吴王，入门不下车，昭谓「君敢自尊大，岂以江南寡弱」，贞遽下车 →
// 武昌钓台，权酗酒洒群臣，昭正色不言而出，昭对曰「昔纣为糟丘酒池」，权默然有惭色 →
// 公孙渊称藩，昭谏，权按刀怒，昭涕泣，顾命之语故在耳，权掷刀对泣 → 渊果杀弥、晏；
// 昭称疾不朝，权土塞其门，昭又于内以土封之；权烧其门，昭更闭门户 → 昭容貌矜严有威风，
// 权曰「孤与张公言，不敢妄也」→ 年八十一，嘉禾五年卒，遗令幅巾素棺，谥文侯。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 手板（朝板）：文臣的兵器。象牙色扁平板，持于胸前。
Z.shouban = (c, x, y, s, t, o = {}) => {
  const { ang = 0, raise = 0 } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  const w = 26 * s, h = 96 * s;
  c.fillStyle = 'rgba(232,224,202,.95)'; c.strokeStyle = 'rgba(78,66,46,.85)'; c.lineWidth = 1.8;
  c.beginPath();
  c.moveTo(-w, -h * 0.5); c.lineTo(w, -h * 0.5);
  c.lineTo(w * 0.86, h * 0.5); c.lineTo(-w * 0.86, h * 0.5);
  c.closePath(); c.fill(); c.stroke();
  // 板面两道横纹
  c.strokeStyle = 'rgba(120,100,68,.42)'; c.lineWidth = 1.2;
  for (let k = 1; k <= 2; k++) {
    const yy = -h * 0.5 + (h * k) / 3;
    c.beginPath(); c.moveTo(-w * 0.8, yy); c.lineTo(w * 0.8, yy); c.stroke();
  }
  // 握处
  c.fillStyle = 'rgba(92,72,46,.9)';
  c.fillRect(-w * 0.5, h * 0.28, w, h * 0.12);
  c.restore();
};

// 张昭：子布（o: { t, raise, flip, ban(手板), bow(躬身/拱手), fierce(义形于色), back(背影) })
Z.zhangzhao = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, ban = 1, bow = 0, fierce = 0, back = 0 } = o;
  const br = Math.sin(t * 1.2) * 0.009;                    // 文臣更静
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4 + bow * 0.14);
  const hem = Math.sin(t * 1.5) * 4;
  // 袍身（深青，宽袍大袖）
  const robeCol = fierce ? 'rgba(44,66,74,.86)' : 'rgba(58,84,92,.82)';
  c.fillStyle = robeCol;
  c.beginPath();
  c.moveTo(-34, -170);
  c.quadraticCurveTo(-62, -84, -66 + hem, -4);
  c.quadraticCurveTo(0, 6 + hem * 0.4, 66 + hem * 0.6, -4);
  c.quadraticCurveTo(60, -86, 34, -170);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,32,38,.9)'; c.lineWidth = 3.2; c.stroke();
  // 袍内衬（浅色边，勾出层次）
  c.strokeStyle = 'rgba(200,208,204,.34)'; c.lineWidth = 2.4;
  c.beginPath(); c.moveTo(-16, -170); c.quadraticCurveTo(0, -148, 16, -170); c.stroke();
  c.beginPath(); c.moveTo(-32, -166); c.quadraticCurveTo(-56, -86, -60, -12); c.stroke();
  // 素带（深色）
  c.fillStyle = 'rgba(38,58,64,.92)';
  c.fillRect(-40, -122, 80, 13);
  c.strokeStyle = 'rgba(20,34,38,.75)'; c.lineWidth = 1.6; c.strokeRect(-40, -122, 80, 13);
  // 广袖双臂（raise: 举板/拱手；fierce: 双臂前伸）
  const rl = ease.out(clamp(raise)), fr = ease.out(clamp(fierce));
  c.save(); c.rotate(bow * 0.1);
  // 左袖
  c.fillStyle = 'rgba(64,90,98,.8)';
  c.beginPath();
  c.moveTo(-34, -158);
  c.quadraticCurveTo(-76 - 18 * rl, -140 - 18 * rl, -82 - 20 * rl - 18 * fr, -96 - 26 * rl);
  c.quadraticCurveTo(-68 - 14 * rl, -84 - 20 * rl, -52 - 8 * rl, -102);
  c.quadraticCurveTo(-46, -132, -34, -144);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,32,38,.85)'; c.lineWidth = 2.6; c.stroke();
  // 右袖
  c.beginPath();
  c.moveTo(34, -158);
  c.quadraticCurveTo(76 + 18 * rl, -140 - 18 * rl, 82 + 20 * rl + 18 * fr, -96 - 26 * rl);
  c.quadraticCurveTo(68 + 14 * rl, -84 - 20 * rl, 52 + 8 * rl, -102);
  c.quadraticCurveTo(46, -132, 34, -144);
  c.closePath(); c.fill(); c.stroke();
  c.restore();
  // 头
  c.save(); c.translate(0, -194 - bow * 5);
  if (back) {
    c.fillStyle = 'rgba(226,218,200,.96)';
    c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,62,52,.85)'; c.lineWidth = 2.1; c.stroke();
  } else {
    c.fillStyle = 'rgba(238,228,206,.96)';
    c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(58,50,42,.9)'; c.lineWidth = 2.1; c.stroke();
  }
  // 纶巾（软帽，儒臣）
  c.fillStyle = 'rgba(46,66,72,.95)';
  c.beginPath();
  c.moveTo(-18, 0); c.quadraticCurveTo(-16, -20, -2, -25);
  c.quadraticCurveTo(16, -24, 19, -6);
  c.quadraticCurveTo(0, -14, -18, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,34,38,.7)'; c.lineWidth = 1.4; c.stroke();
  // 巾脚（后垂两条）
  brush(c, [[-13, -6], [-19, 16], [-15, 32]], { w: 4.5, col: [46, 66, 72], tone: 0.9, dry: 0.4, seed: 9631 });
  brush(c, [[12, -8], [18, 12], [14, 28]], { w: 4, col: [46, 66, 72], tone: 0.9, dry: 0.4, seed: 9632 });
  if (!back) {
    // 目（义形于色：fierce 时眉压）
    c.fillStyle = 'rgba(254,251,244,.96)';
    c.beginPath(); c.ellipse(6, -1 + fierce * 1.5, 5, 3.4 - fierce * 0.6, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(20,18,16,.95)'; c.beginPath(); c.arc(7.4, -1 + fierce * 1.5, 2.2, 0, Math.PI * 2); c.fill();
    // 眉（威风）
    c.strokeStyle = 'rgba(64,56,46,.9)'; c.lineWidth = 2.2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(0, -7 - fierce * 1.5); c.quadraticCurveTo(7, -10 - fierce * 2, 13, -7 - fierce * 1); c.stroke();
    // 白须（老臣长髯）
    const wf = Math.sin(t * 1.3) * 2;
    c.strokeStyle = 'rgba(226,222,210,.95)'; c.lineWidth = 3.2; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-7, 9); c.quadraticCurveTo(-5, 26 + wf * 0.3, 1, 34 + wf); c.stroke();
    c.beginPath(); c.moveTo(5, 10); c.quadraticCurveTo(7, 24 + wf * 0.3, 2, 32 + wf * 0.8); c.stroke();
    // 髯髭
    c.strokeStyle = 'rgba(232,228,216,.9)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(-12, 3); c.quadraticCurveTo(-8, 6, -3, 5); c.stroke();
    c.beginPath(); c.moveTo(4, 5); c.quadraticCurveTo(9, 6, 13, 2); c.stroke();
  }
  c.restore();
  c.restore();
  if (ban) {
    // 持板：右上臂末端
    const bx = (flip ? -1 : 1) * (62 + 14 * rl);
    const by = -104 - 12 * rl;
    Z.shouban(c, x + bx * s, y + by * s, s, t, { ang: (flip ? -1 : 1) * (0.16 + 0.1 * rl) });
  }
};

// ① 彭城少年：少好学善隶书，弱冠察孝廉不就
SCENES['zz1_pengcheng'] = (() => {
  const p = () => Z.paper('zz1', '#e7dfc7');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zz1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(78,72,58,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 470, amp: 112, tone: 0.17, seed: 641.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1501 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1503, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 书简（他少好学）
    c.save(); c.globalAlpha = clamp(ss(0.5, 1.6, lt) * 0.85);
    c.fillStyle = 'rgba(224,212,182,.9)';
    c.beginPath(); c.moveTo(1080, 900); c.lineTo(1300, 892); c.lineTo(1306, 926); c.lineTo(1086, 934); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(120,98,62,.7)'; c.lineWidth = 1.6; c.stroke();
    for (let k = 0; k < 4; k++) {
      c.beginPath(); c.moveTo(1100 + k * 48, 906); c.lineTo(1100 + k * 48, 926); c.stroke();
    }
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhangzhao(c, lerp(420, 760, ap), 950, lerp(1.3, 2.0, ap), t, { raise: 0.1, ban: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '子布', ss(1.0, 1.28, lt), { size: 88, seed: 81 });
  } };
})();

// ② 南渡江：徐州士民避难扬土
SCENES['zz2_nandu'] = (() => {
  const p = () => Z.paper('zz2', '#e3dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zz2_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(64,64,58,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 128, tone: 0.2, seed: 651.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.25 });
    Z.water(c, t, { y0: 760, y1: 1060, tone: 0.4, seed: 92, rows: 7 });
    // 渡江的人群（远影）
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.6, lt) * 0.42);
    for (let i = 0; i < 5; i++) {
      const px = 1080 + i * 92, py = 880 - i * 12;
      brush(c, [[px, py], [px + 3, py - 52]], { w: 16, tone: 0.4, dry: 0.5, seed: 1511 + i });
      c.fillStyle = 'rgba(226,214,190,.7)'; c.beginPath(); c.ellipse(px + 3, py - 60, 8, 9, 0, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1513, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.zhangzhao(c, lerp(400, 740, ap), 950, lerp(1.3, 2.0, ap), t, { raise: 0.2, ban: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '南渡', ss(1.0, 1.28, lt), { size: 88, seed: 82 });
  } };
})();

// ③ 托孤：策临亡托权，昭身自扶权上马
SCENES['zz3_tuogu'] = (() => {
  const p = () => Z.paper('zz3', '#ded5ba');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zz3_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(56,48,44,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 430, amp: 150, tone: 0.25, seed: 661.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    Z.mist(c, t, { y0: 520, y1: 800, n: 4, alpha: 0.3, speed: 24, seed: 1521 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 1523, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 榻（孙策卧处）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.85);
    brush(c, [[1150, 940], [1420, 930], [1620, 942]], { w: 20, col: [108, 82, 52], tone: 0.86, dry: 0.42, seed: 1524 });
    c.fillStyle = 'rgba(224,216,196,.88)';
    c.beginPath(); c.ellipse(1230, 910, 52, 20, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    // 孙权（少年，伏于马上）
    c.save(); c.globalAlpha = clamp(ss(0.9, 2.0, lt) * 0.9);
    // 马
    brush(c, [[880, 930], [1120, 918]], { w: 34, col: [96, 78, 58], tone: 0.8, dry: 0.4, seed: 1525 });
    brush(c, [[1104, 906], [1136, 856]], { w: 20, col: [96, 78, 58], tone: 0.78, dry: 0.4, seed: 1526 });
    // 少年（深袍）
    c.fillStyle = 'rgba(56,52,64,.9)';
    c.beginPath(); c.moveTo(980, 906); c.quadraticCurveTo(966, 856, 992, 850);
    c.quadraticCurveTo(1022, 848, 1024, 900); c.closePath(); c.fill();
    c.fillStyle = 'rgba(232,222,200,.95)'; c.beginPath(); c.ellipse(1002, 838, 12, 13, 0, 0, Math.PI * 2); c.fill();
    c.restore();
    // 张昭：俯身扶马镫
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.14);
    Z.zhangzhao(c, lerp(400, 720, ap), 950, lerp(1.35, 2.0, ap), t, { raise: 0.3, ban: 0, bow: 0.6 });
    c.restore();
    Z.seal(c, 1762, 952, '托孤', ss(1.0, 1.28, lt), { size: 88, seed: 83 });
  } };
})();

// ④ 谏猎：射虎车（昭变色而前谏）
SCENES['zz4_jianlie'] = (() => {
  const p = () => Z.paper('zz4', '#dcd2b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zz4_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(62,58,48,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 450, amp: 128, tone: 0.22, seed: 671.5 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.3 });
    // 射虎车（方目、不置盖）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.85);
    c.fillStyle = 'rgba(108,84,52,.9)';
    c.fillRect(1080, 790, 380, 130);
    c.strokeStyle = 'rgba(56,42,26,.85)'; c.lineWidth = 3; c.strokeRect(1080, 790, 380, 130);
    // 方目（孔洞）
    c.fillStyle = 'rgba(232,224,200,.95)';
    c.fillRect(1200, 800, 130, 110);
    c.strokeStyle = 'rgba(56,42,26,.8)'; c.lineWidth = 2.4; c.strokeRect(1200, 800, 130, 110);
    // 轮
    c.strokeStyle = 'rgba(64,48,30,.8)'; c.lineWidth = 5;
    c.beginPath(); c.arc(1140, 930, 46, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.arc(1400, 930, 46, 0, Math.PI * 2); c.stroke();
    c.restore();
    // 虎（扑车）
    c.save(); c.globalAlpha = clamp(ss(0.9, 2.0, lt) * 0.78);
    brush(c, [[900, 906], [1010, 880], [1080, 890]], { w: 30, col: [176, 118, 58], tone: 0.75, dry: 0.5, seed: 1531 });
    brush(c, [[1060, 878], [1092, 846]], { w: 17, col: [176, 118, 58], tone: 0.72, dry: 0.5, seed: 1532 });
    c.restore();
    brush(c, [[0, 946], [560, 938], [1100, 950], [1920, 936]], { w: 13, tone: 0.74, dry: 0.74, seed: 1533, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 张昭：变色而前（上前一步，拱手）
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.16);
    Z.zhangzhao(c, lerp(400, 700, ap), 944, lerp(1.35, 2.0, ap), t, { raise: 0.45, ban: 1, fierce: 0.4 });
    c.restore();
    Z.seal(c, 1762, 952, '谏猎', ss(1.0, 1.28, lt), { size: 88, seed: 84 });
  } };
})();

// ⑤ 钓台酗酒：昭正色不言而出，权默然有惭色
SCENES['zz5_diaotai'] = (() => {
  const p = () => Z.paper('zz5', '#e0d7bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zz5_bg', 0.32 + 0.68 * grow, (g) => {
      g.fillStyle = 'rgba(58,54,52,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 450, amp: 140, tone: 0.23, seed: 681.9 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.28 });
    Z.water(c, t, { y0: 800, y1: 1060, tone: 0.38, seed: 93, rows: 6 });
    // 钓台
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.85);
    c.fillStyle = 'rgba(104,80,50,.9)';
    c.fillRect(1140, 830, 420, 22);
    c.fillRect(1160, 852, 18, 110); c.fillRect(1520, 852, 18, 110);
    // 酒樽
    c.fillStyle = 'rgba(140,112,72,.9)';
    c.beginPath(); c.ellipse(1300, 812, 34, 20, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(70,54,32,.75)'; c.lineWidth = 2; c.stroke();
    c.restore();
    // 孙权（醉，坐台上）
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.5, lt) * 0.85);
    c.fillStyle = 'rgba(96,60,72,.85)';
    c.beginPath(); c.moveTo(1300, 812); c.quadraticCurveTo(1270, 726, 1306, 722);
    c.quadraticCurveTo(1344, 722, 1340, 810); c.closePath(); c.fill();
    c.fillStyle = 'rgba(232,222,200,.92)'; c.beginPath(); c.ellipse(1320, 706, 14, 15, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(50,44,38,.85)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
    // 张昭：背身出宫（背对，扔下车）
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhangzhao(c, lerp(760, 420, ap), 950, lerp(1.3, 1.85, ap), t, { raise: 0.15, ban: 0, back: 1, bow: 0.3 });
    c.restore();
    // 洒水（群臣被浇）
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.4);
    c.strokeStyle = 'rgba(180,206,222,.6)'; c.lineWidth = 2;
    for (let k = 0; k < 5; k++) {
      const px = 1080 + k * 84;
      c.beginPath(); c.moveTo(px, 700); c.lineTo(px + 8, 830); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '钓台', ss(1.0, 1.28, lt), { size: 88, seed: 85 });
  } };
})();

// ⑥ 按刀对泣：谏公孙渊，权按刀怒，昭涕泣，权掷刀
SCENES['zz6_andao'] = (() => {
  const p = () => Z.paper('zz6', '#d8ceb4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zz6_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(44,38,38,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 162, tone: 0.29, seed: 691.3 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 860, n: 4, alpha: 0.3, speed: 20, seed: 1541 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1543, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 落刀（地上的刀）
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.9, lt) * 0.8);
    brush(c, [[1180, 946], [1300, 936]], { w: 9, col: [176, 142, 72], tone: 0.92, dry: 0.3, seed: 1544 });
    c.restore();
    // 孙权（对面，冠）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.4, lt) * 0.85);
    c.fillStyle = 'rgba(88,58,68,.82)';
    c.beginPath(); c.moveTo(1500, 948); c.quadraticCurveTo(1478, 860, 1506, 856);
    c.quadraticCurveTo(1536, 856, 1534, 948); c.closePath(); c.fill();
    c.fillStyle = 'rgba(232,222,200,.92)'; c.beginPath(); c.ellipse(1516, 840, 14, 15, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(50,44,38,.85)'; c.lineWidth = 1.8; c.stroke();
    c.restore();
    // 张昭：义形于色，举板（手上是板，胸口是气）
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.12);
    Z.zhangzhao(c, lerp(420, 700, ap), 950, lerp(1.35, 2.05, ap), t, { raise: 0.7, ban: 1, fierce: 0.85 });
    c.restore();
    // 涕泣（泪痕）
    c.save(); c.globalAlpha = clamp(ss(1.1, 2.0, lt) * 0.5);
    c.strokeStyle = 'rgba(186,206,216,.7)'; c.lineWidth = 2;
    for (let k = 0; k < 3; k++) {
      c.beginPath(); c.moveTo(700 + k * 22, 790); c.lineTo(700 + k * 22, 830); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '掷刀', ss(1.0, 1.28, lt), { size: 88, seed: 86 });
  } };
})();

// ⑦ 封门：权土塞其门，昭又于内以土封之
SCENES['zz7_fengmen'] = (() => {
  const p = () => Z.paper('zz7', '#e4dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'zz7_bg', 0.34 + 0.66 * grow, (g) => {
      g.fillStyle = 'rgba(70,64,54,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2030, [{ y0: 460, amp: 116, tone: 0.19, seed: 701.7 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.26 });
    brush(c, [[0, 952], [640, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1553, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 门（两扇 + 封土）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt) * 0.9);
    c.fillStyle = 'rgba(96,74,48,.88)';
    c.fillRect(1240, 620, 300, 330);
    c.strokeStyle = 'rgba(52,38,24,.85)'; c.lineWidth = 3.4; c.strokeRect(1240, 620, 300, 330);
    c.beginPath(); c.moveTo(1390, 620); c.lineTo(1390, 950); c.stroke();
    c.restore();
    // 外封之土（权塞）
    c.save(); c.globalAlpha = clamp(ss(0.7, 1.8, lt) * 0.85);
    c.fillStyle = 'rgba(126,108,80,.85)';
    for (let i = 0; i < 5; i++) {
      c.beginPath();
      c.ellipse(1250 + i * 68, 930 - (i % 2) * 22, 44, 26, 0.1, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    // 内封之土（昭又封内）
    c.save(); c.globalAlpha = clamp(ss(1.1, 2.2, lt) * 0.85);
    c.fillStyle = 'rgba(140,122,92,.8)';
    for (let i = 0; i < 4; i++) {
      c.beginPath();
      c.ellipse(1180 + i * 62, 900 - (i % 2) * 26, 40, 24, -0.1, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    // 张昭：坐于门内，闭门不出（背影）
    const ap = ease.out(ss(0.3, 1.6, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.92);
    Z.zhangzhao(c, lerp(900, 960, ap), 944, lerp(1.2, 1.6, ap), t, { raise: 0, ban: 0, back: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '封门', ss(1.0, 1.28, lt), { size: 88, seed: 87 });
  } };
})();

// ⑧ 幅巾素棺：八十一岁卒，谥文侯
SCENES['zz8_suguan'] = (() => {
  const p = () => Z.paper('zz8', '#dcd3ba');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'zz8_bg', 0.26 + 0.74 * grow, (g) => {
      g.fillStyle = 'rgba(46,44,46,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 460, amp: 158, tone: 0.27, seed: 711.1 }]);
    }, { blur: 2.4, halo: 9, haloA: 0.33 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 4, alpha: 0.32, speed: 18, seed: 1561 });
    // 素棺（不上漆）
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.5, lt) * 0.88);
    brush(c, [[620, 940], [1180, 926], [1420, 944]], { w: 46, col: [196, 182, 154], tone: 0.72, dry: 0.4, seed: 1562 });
    c.strokeStyle = 'rgba(120,110,90,.6)'; c.lineWidth = 2;
    c.beginPath(); c.moveTo(700, 916); c.lineTo(1340, 906); c.stroke();
    c.restore();
    // 幅巾素棺的幅巾（一方素巾）
    c.save(); c.globalAlpha = clamp(ss(0.9, 1.8, lt) * 0.8);
    c.fillStyle = 'rgba(226,220,204,.9)';
    c.beginPath(); c.ellipse(900, 900, 44, 18, 0.06, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(140,130,110,.7)'; c.lineWidth = 1.6; c.stroke();
    c.restore();
    // 张昭：坐（老态，拄杖）
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.88);
    Z.zhangzhao(c, lerp(600, 700, ap), 930, lerp(1.1, 1.42, ap), t, { raise: 0.05, ban: 0, back: 1, bow: 0.35 });
    c.restore();
    // 杖
    c.save(); c.globalAlpha = clamp(ap * 0.8);
    brush(c, [[760, 930], [800, 760]], { w: 7, col: [96, 74, 48], tone: 0.9, dry: 0.4, seed: 1563 });
    c.restore();
    Z.seal(c, 1762, 952, '文侯', ss(1.2, 1.48, lt), { size: 88, seed: 88 });
  } };
})();
})();
