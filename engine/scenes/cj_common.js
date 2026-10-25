// 《蔡文姬》专属笔法库：归汉的才女（蔡琰，字文姬，陈留圉人，蔡邕之女）。
// 依赖 z_common.js（宣纸/远山/云气/榜题/钤印/大字/尘/骑者）+ w_common.js（垂帷/墨云/浓墨烟带/炬火/营火/首领）。
// ⚠ 关键：z_common.js 里是 `const Z = window.Z = {}`（重置），本库必须写 `const Z = window.Z`（追加），
//    否则会把根库清空；且 eras 的 SCENE_LIBS 顺序必须是 z_common → w_common → cj_common。
// 形象（女性线第三人，与辛宪英、王异三方对立）：
//   辛宪英＝素青深衣＋峨髻金簪＋竹简（堂上·判断）；王异＝灰褐战裙＋布韝＋短刀（城上·行动）；
//   蔡文姬＝曲裾深衣＋倭堕髻＋琴／笔（路上·才与痛）。她后期换胡装（窄袖短袍＋风帽）。
// 史实：全出《后汉书·卷八十四·列女传·董祀妻蔡琰》，不取《胡笳十八拍》（唐人拟作）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
const Z = window.Z;

// ---------- 古琴（七弦；o.break: 断第几弦 1..7；o.vib: 余振）----------
Z.guqin = (c, x, y, s, t, o = {}) => {
  const { a = 1, brk = 0, vib = 0, seed = 11 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.rotate(-0.12);
  // 琴身（仲尼式：狭长，微弧）
  c.fillStyle = 'rgba(96,66,40,.92)';
  c.beginPath();
  c.moveTo(-190, -6);
  c.quadraticCurveTo(-100, -22, 0, -20);
  c.quadraticCurveTo(110, -22, 190, -10);
  c.quadraticCurveTo(196, 8, 182, 16);
  c.lineTo(-186, 14);
  c.quadraticCurveTo(-196, 8, -190, -6);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(38,26,16,.92)'; c.lineWidth = 3; c.stroke();
  // 琴徽（十三点：取整七点示意）
  c.fillStyle = 'rgba(226,214,186,.85)';
  for (let k = 0; k < 7; k++) {
    c.beginPath(); c.arc(-160 + k * 54, 4, 2.6, 0, Math.PI * 2); c.fill();
  }
  // 七弦（断弦则那一根崩起）
  for (let k = 0; k < 7; k++) {
    const yy = -12 + k * 4.2;
    const isBrk = (brk === k + 1);
    const amp = isBrk ? 16 + Math.sin(t * 22) * 10 : vib * Math.sin(t * 8 + k) * 2.2;
    c.strokeStyle = isBrk ? 'rgba(52,44,36,.5)' : `rgba(232,222,200,${.72 + Math.sin(t * 3 + k) * .12})`;
    c.lineWidth = isBrk ? 1.4 : 1.8;
    c.beginPath();
    c.moveTo(-180, yy);
    if (isBrk) {
      c.quadraticCurveTo(-40, yy - amp, 4, yy - amp * .4);          // 断口：崩起后垂落
      c.moveTo(10, yy + amp * .3);
      c.quadraticCurveTo(90, yy + amp * .7, 178, yy + 2);
    } else {
      c.quadraticCurveTo(0, yy + amp, 178, yy);
    }
    c.stroke();
  }
  // 雁足 / 岳山
  c.fillStyle = 'rgba(48,34,20,.9)';
  c.fillRect(-184, -16, 8, 30); c.fillRect(172, -14, 8, 28);
  c.restore();
};

// ---------- 穹庐（匈奴帐幕：o.smoke 顶孔出烟）----------
Z.huTent = (c, x, y, s, t, o = {}) => {
  const { a = 1, smoke = 1, seed = 21 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  // 帐体
  c.fillStyle = 'rgba(148,132,102,.92)';
  c.beginPath();
  c.moveTo(-330, 0);
  c.quadraticCurveTo(-300, -230, 0, -300);
  c.quadraticCurveTo(300, -230, 330, 0);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(58,46,32,.92)'; c.lineWidth = 4; c.stroke();
  // 毛毡缝（竖褶）
  c.strokeStyle = 'rgba(66,52,36,.5)'; c.lineWidth = 2.2;
  for (let k = -4; k <= 4; k++) {
    const px = k * 66;
    c.beginPath(); c.moveTo(px * .94, -6); c.quadraticCurveTo(px, -160, px * .5, -270 + Math.abs(k) * 26); c.stroke();
  }
  // 门（帘掀起，露出里面的火光）
  c.fillStyle = 'rgba(40,32,24,.88)';
  c.beginPath(); c.moveTo(-62, 0); c.lineTo(-56, -150); c.lineTo(56, -150); c.lineTo(62, 0); c.closePath(); c.fill();
  c.save();
  const glow = .5 + .3 * Math.sin(t * 2.4);
  c.globalAlpha = clamp(a) * glow;
  c.fillStyle = 'rgba(214,128,52,.9)';
  c.beginPath(); c.moveTo(-48, -2); c.lineTo(-44, -138); c.lineTo(44, -138); c.lineTo(48, -2); c.closePath(); c.fill();
  c.restore();
  // 顶孔 + 出烟
  c.fillStyle = 'rgba(50,40,28,.9)';
  c.beginPath(); c.ellipse(0, -298, 34, 12, 0, 0, Math.PI * 2); c.fill();
  if (smoke) {
    for (let k = 0; k < 3; k++) {
      const ph = (t * .3 + k / 3) % 1;
      c.globalAlpha = clamp(a) * Math.sin(Math.PI * ph) * .45;
      brush(c, [[-8 + k * 8, -300], [-8 + k * 8 + Math.sin(t * 1.6 + k) * 26, -300 - ph * 190],
                [-8 + k * 8 - Math.sin(t * 1.2 + k) * 30, -300 - ph * 340]],
        { w: 26, tone: .16, dry: .9, seed: 1711 + k, tail: .7, col: [78, 72, 66] });
    }
  }
  // 拴马桩与骨饰（写意）
  const rr2 = rng(seed + 3);
  for (let k = 0; k < 5; k++) {
    const px = -300 + k * 150 + rr2() * 20;
    brush(c, [[px, -8], [px + 6, -46]], { w: 5, tone: .5, dry: .7, seed: 1721 + k, col: [120, 104, 78] });
  }
  c.restore();
};

// ---------- 霜雪（「处所多霜雪，胡风春夏起」；主运动）----------
Z.snow = (c, t, o = {}) => {
  const { n = 34, speed = 130, seed = 31, alpha = 0.62, x0 = -60, x1 = 1980, yTop = -40, yBot = 1000, drift = 1 } = o;
  const rr = rng(seed);
  c.save();
  for (let k = 0; k < n; k++) {
    const px0 = x0 + rr() * (x1 - x0);
    const ph = rr();
    const sp = 0.6 + rr() * 0.8;
    const q = (t * sp * speed / (yBot - yTop) + ph) % 1;
    const px = px0 + Math.sin(t * 1.3 + k * 1.1) * 26 * drift + (px0 + t * 22 * drift > x1 ? -(x1 - x0) : 0);
    const py = yTop + q * (yBot - yTop);
    const r0 = 2 + rr() * 3.4;
    c.globalAlpha = alpha * (.5 + .5 * Math.sin(Math.PI * q));
    c.fillStyle = 'rgba(248,250,252,.95)';
    c.beginPath(); c.arc(((px - x0) % (x1 - x0) + (x1 - x0)) % (x1 - x0) + x0, py, r0, 0, Math.PI * 2); c.fill();
  }
  c.restore();
};

// ---------- 胡地风（横向掠过的风纹：补足帧差）----------
Z.huWind = (c, t, o = {}) => {
  const { n = 5, y0 = 300, y1 = 900, speed = 220, seed = 41, a = 0.3 } = o;
  const rr = rng(seed);
  c.save();
  for (let k = 0; k < n; k++) {
    const ph = rr();
    const y = y0 + rr() * (y1 - y0);
    const span = 1400;
    const cx = ((t * speed + ph * span + k * 260) % (span + 700)) - 350;
    c.globalAlpha = a * (0.6 + 0.4 * Math.sin(t * 1.7 + k));
    brush(c, [[cx, y], [cx + 300, y - 18 - rr() * 14], [cx + 620, y + 6]],
      { w: 16, tone: .12, dry: .9, seed: 1741 + k, tail: .8, col: [150, 146, 140] });
  }
  c.restore();
};

// ---------- 胡装幼童（在胡中所生二子；抱颈之姿用 cling）----------
Z.huChild = (c, x, y, s, t, o = {}) => {
  const { fade = 1, flip = 0, cling = 0, seed = 51 } = o;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.globalAlpha = clamp(fade);
  const sway = Math.sin(t * 1.9 + seed) * 3 + cling * Math.sin(t * 3.4) * 4;
  c.translate(0, sway);
  // 窄袖短袍（皮）
  c.fillStyle = 'rgba(140,116,80,.9)';
  c.beginPath(); c.moveTo(-16, 0); c.quadraticCurveTo(-20, -34, -12, -48);
  c.lineTo(12, -48); c.quadraticCurveTo(20, -34, 16, 0); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(52,40,26,.9)'; c.lineWidth = 2.2; c.stroke();
  brush(c, [[-14, -20], [0, -16], [14, -20]], { w: 7, tone: .6, dry: .5, seed: 1751 + seed, col: [96, 74, 48] });
  // 双臂（cling 则上举抱颈）
  const up = ease.out(clamp(cling));
  brush(c, [[-14, -44], [-26, -30 - 26 * up], [-14, -52 - 34 * up]], { w: 8, tone: .4, dry: .5, seed: 1752 + seed, head: .1, tail: .2 });
  brush(c, [[14, -44], [26, -30 - 24 * up], [12, -50 - 32 * up]], { w: 8, tone: .4, dry: .5, seed: 1753 + seed, head: .1, tail: .2 });
  // 头（风帽 / 髡发小辫）
  c.save(); c.translate(0, -62 - 8 * up);
  c.fillStyle = 'rgba(240,228,206,.97)';
  c.beginPath(); c.ellipse(0, 0, 10.5, 11.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(34,28,24,.84)'; c.lineWidth = 1.8; c.stroke();
  c.fillStyle = 'rgba(28,24,20,.9)';
  c.beginPath(); c.arc(-4, 1, 1.7, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(4, 1, 1.7, 0, Math.PI * 2); c.fill();
  // 风帽（皮，两侧下垂）
  c.fillStyle = 'rgba(118,96,66,.94)';
  c.beginPath(); c.moveTo(-12, -6); c.quadraticCurveTo(0, -18, 12, -6); c.lineTo(13, 2); c.lineTo(-13, 2); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(48,38,26,.88)'; c.lineWidth = 2; c.stroke();
  brush(c, [[-12, -4], [-18, 8], [-16, 20]], { w: 6, tone: .5, dry: .7, seed: 1754 + seed, col: [118, 96, 66] });
  c.restore();
  c.restore();
};

// ---------- 金璧（曹操遣使以金璧赎之：璧＋金饼）----------
Z.goldBi = (c, x, y, s, t, o = {}) => {
  const { a = 1, seed = 61 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  c.translate(0, Math.sin(t * 1.4) * 3);
  // 托盘
  c.fillStyle = 'rgba(112,88,54,.9)';
  c.beginPath(); c.ellipse(0, 26, 74, 16, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(48,36,22,.9)'; c.lineWidth = 2.4; c.stroke();
  // 玉璧（环形，微光）
  const gl = .82 + .14 * Math.sin(t * 2.1);
  c.strokeStyle = `rgba(198,216,204,${gl})`; c.lineWidth = 15;
  c.beginPath(); c.arc(0, 0, 34, 0, Math.PI * 2); c.stroke();
  c.strokeStyle = 'rgba(72,86,80,.75)'; c.lineWidth = 2;
  c.beginPath(); c.arc(0, 0, 34, 0, Math.PI * 2); c.stroke();
  c.beginPath(); c.arc(0, 0, 22, 0, Math.PI * 2); c.stroke();
  // 金饼（三枚）
  [[-52, 12, 15], [52, 14, 14], [4, 30, 13]].forEach(([px, py, r0], k) => {
    c.fillStyle = `rgba(206,168,72,${.92 + Math.sin(t * 2.4 + k) * .08})`;
    c.beginPath(); c.ellipse(px, py, r0, r0 * .52, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(96,72,26,.8)'; c.lineWidth = 2; c.stroke();
  });
  c.restore();
};

// ---------- 满堂宾客（坐列剪影；⚠ 每人相位错开，避免同一帧集体翻状态被判跳变）----------
Z.guests = (c, x0, y, s, t, o = {}) => {
  const { n = 6, a = 1, gap = 210, seed = 71 } = o;
  if (a <= 0) return;
  c.save(); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const px = x0 + k * gap;
    const ph = Math.sin(t * (0.9 + k * 0.13) + k * 1.7 + seed) * 3;   // 逐人异频
    c.save(); c.translate(px, y + ph); c.scale(s, s);
    c.fillStyle = 'rgba(96,88,84,.78)';
    c.beginPath();
    c.moveTo(-26, 0);
    c.quadraticCurveTo(-34, -54, -22, -76);
    c.lineTo(22, -76);
    c.quadraticCurveTo(34, -54, 26, 0);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(36,30,28,.82)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(226,216,198,.92)';
    c.beginPath(); c.ellipse(0, -92, 12, 13, 0, 0, Math.PI * 2); c.fill();
    // 冠
    c.fillStyle = 'rgba(48,44,56,.94)';
    c.beginPath(); c.moveTo(-13, -100); c.lineTo(-11, -120); c.lineTo(11, -120); c.lineTo(13, -100); c.closePath(); c.fill();
    c.restore();
  }
  c.restore();
};

// ---------- 案几与纸笔（默写坟籍：笔尖随笔迹游走）----------
Z.desk = (c, x, y, s, o = {}) => {
  const { a = 1, seed = 81 } = o;
  if (a <= 0) return;
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  brush(c, [[-190, 0], [190, -8]], { w: 20, tone: .6, dry: .5, seed: 1811, col: [96, 70, 46] });
  brush(c, [[-166, 6], [-160, 78]], { w: 13, tone: .58, dry: .55, seed: 1812, col: [92, 68, 44] });
  brush(c, [[166, 4], [160, 76]], { w: 13, tone: .58, dry: .55, seed: 1813, col: [92, 68, 44] });
  c.restore();
};

// ---------- 写成的书卷（可堆叠；o.n 卷数）----------
Z.scrolls = (c, x, y, s, t, o = {}) => {
  const { a = 1, n = 4, seed = 91 } = o;
  if (a <= 0) return;
  const rr = rng(seed);
  c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = clamp(a);
  for (let k = 0; k < n; k++) {
    const px = -120 + (k % 2) * 240 + rr() * 12;
    const py = -k * 26;
    c.save(); c.translate(px, py + Math.sin(t * 1.1 + k) * 1.5);
    c.fillStyle = 'rgba(238,230,212,.95)';
    c.beginPath(); c.moveTo(-56, 0); c.lineTo(56, -4); c.lineTo(52, -30); c.lineTo(-54, -26); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(58,48,38,.85)'; c.lineWidth = 2; c.stroke();
    c.strokeStyle = 'rgba(52,44,36,.5)'; c.lineWidth = 1.3;
    for (let i = 0; i < 3; i++) {
      c.beginPath(); c.moveTo(-44, -8 - i * 7); c.lineTo(-44 + 56 + rr() * 18, -8 - i * 7); c.stroke();
    }
    // 轴（两端）
    c.fillStyle = 'rgba(112,84,52,.9)';
    c.beginPath(); c.ellipse(-58, -14, 5, 14, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(58, -18, 5, 14, 0, 0, Math.PI * 2); c.fill();
    c.restore();
  }
  c.restore();
};

// ---------- 蔡文姬：才女（单位坐标，原点＝脚底，头顶 ≈ -196）----------
// o: { t, flip, bow(俯身/叩头), fade, hu(胡装), young(少女), hairDown(蓬首徒行), play(抚琴), write(伏案书写), carry(抱物) }
Z.wenji = (c, x, y, s, o = {}) => {
  const { t = 0, flip = 0, bow = 0, fade = 1, hu = 0, young = 0, hairDown = 0, play = 0, write = 0, carry = 0, seed = 61 } = o;
  const br = Math.sin(t * 1.5 + seed * .1) * .014;
  c.save();
  c.translate(x, y);
  c.scale(flip ? -s : s, s);
  c.globalAlpha = clamp(fade);
  c.translate(0, Math.sin(t * 1.5) * 3);
  c.rotate(br * .5 + bow * .30);                       // bow: 叩头/俯身（最大 ~17°）

  const bodyTone = hu ? 'rgba(150,122,84,.88)' : 'rgba(104,100,116,.84)';   // 汉：青灰深衣 / 胡：褐皮短袍
  const line = hu ? 'rgba(52,40,26,.9)' : 'rgba(34,32,42,.9)';

  // 双足（汉：舄；胡：靴）
  const foot = hu ? 'rgba(70,52,34,.92)' : 'rgba(48,44,52,.88)';
  c.fillStyle = foot;
  c.beginPath(); c.ellipse(-17, 26, 13, 6.5, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(17, 26, 13, 6.5, 0, 0, Math.PI * 2); c.fill();

  // 下裳（汉：曲裾长裙及地；胡：窄袍）
  const hem = Math.sin(t * 1.35) * 6;
  c.fillStyle = bodyTone;
  if (hu) {
    c.beginPath();
    c.moveTo(-20, -140);
    c.quadraticCurveTo(-42, -70, -46 + hem, -4);
    c.lineTo(46 + hem * .6, -4);
    c.quadraticCurveTo(40, -72, 20, -140);
    c.closePath(); c.fill();
  } else {
    c.beginPath();
    c.moveTo(-22, -140);
    c.quadraticCurveTo(-62, -74, -70 + hem, -6);       // 曲裾：下摆宽而曳地
    c.quadraticCurveTo(0, 8 + hem * .4, 70 + hem * .6, -6);
    c.quadraticCurveTo(60, -76, 22, -140);
    c.closePath(); c.fill();
  }
  c.strokeStyle = line; c.lineWidth = 3; c.stroke();
  // 衣褶
  brush(c, [[-12, -128], [-7, -70], [-13, -18]], { w: 3, tone: .3, dry: .75, seed: 1861, tail: .6, bristles: 3 });
  brush(c, [[6, -126], [11, -66], [5, -14]], { w: 2.6, tone: .26, dry: .75, seed: 1862, tail: .6, bristles: 3 });

  // 上襦 / 交领右衽
  c.fillStyle = hu ? 'rgba(168,138,96,.9)' : 'rgba(126,122,138,.88)';
  c.beginPath();
  c.moveTo(-24, -146);
  c.quadraticCurveTo(-32, -112, -28, -94);
  c.lineTo(28, -94);
  c.quadraticCurveTo(32, -112, 24, -146);
  c.closePath(); c.fill();
  c.strokeStyle = line; c.lineWidth = 2.8; c.stroke();
  // 交领（右衽：一笔斜过）
  brush(c, [[-16, -146], [2, -120], [16, -144]], { w: 4, tone: .7, dry: .4, seed: 1863, col: [226, 220, 206] });
  // 腰带
  brush(c, [[-28, -100], [0, -93], [28, -100]], { w: 9, tone: .58, dry: .45, seed: 1864, col: hu ? [104, 78, 44] : [86, 82, 100] });

  // 双臂：抚琴 / 书写 / 抱物 / 垂袖
  const wr = ease.out(clamp(write)), pl = ease.out(clamp(play)), cb = ease.out(clamp(carry));
  let ax = 44, ay = -118;
  if (pl) { ax = -46; ay = -104; }                       // 抚琴：双手前伸偏低
  if (wr) { ax = 52; ay = -108; }                        // 书写：右手执笔落案
  if (cb) { ax = 26; ay = -96; }                         // 抱物：双手收于胸前
  brush(c, [[-24, -142], [-38, -110], [-44, -104 + 6 * (1 - pl)]],
    { w: 14, tone: .45, dry: .5, seed: 1871, head: .1, tail: .2 });
  brush(c, [[24, -142], [40, -124], [ax, ay]], { w: 14, tone: .45, dry: .5, seed: 1872, head: .1, tail: .2 });
  c.fillStyle = 'rgba(240,228,208,.96)';
  c.beginPath(); c.ellipse(ax + 3, ay, 9, 10, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(28,24,20,.82)'; c.lineWidth = 2; c.stroke();
  // 左手（抚琴/抱物时也要画出来）
  c.beginPath(); c.ellipse(-44 + 3, -104 + 6 * (1 - pl), 9, 10, 0, 0, Math.PI * 2); c.fill();

  // 笔（书写时）
  if (write) {
    c.save(); c.translate(ax + 8, ay + 14); c.rotate(-0.55 + Math.sin(t * 4.2) * .18);
    brush(c, [[0, 0], [6, -26]], { w: 4.5, tone: .55, dry: .4, seed: 1881, col: [92, 74, 48] });
    c.strokeStyle = 'rgba(30,26,22,.95)'; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(6, -26); c.lineTo(10, -44); c.stroke();
    c.restore();
  }

  // 头
  c.save(); c.translate(0, -170 - bow * 6); c.rotate(bow * .16);
  c.fillStyle = 'rgba(240,226,206,.97)';
  c.beginPath(); c.ellipse(0, 0, young ? 14 : 15, young ? 15.5 : 16.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(34,28,26,.86)'; c.lineWidth = 2.2; c.stroke();
  // 眉眼（清辩：眉清目明；叩头时低垂）
  const dl = bow * 2.2;
  c.strokeStyle = 'rgba(48,42,38,.84)'; c.lineWidth = 2.4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-11, -7 - dl); c.lineTo(-2.5, -9 - dl); c.stroke();
  c.beginPath(); c.moveTo(2.5, -9 - dl); c.lineTo(11, -7 - dl); c.stroke();
  c.fillStyle = 'rgba(30,26,24,.92)';
  c.beginPath(); c.ellipse(-5.5, 1 + dl * .5, 2.5, 2.6 - bow * .8, 0, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(5.5, 1 + dl * .5, 2.5, 2.6 - bow * .8, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(124,80,76,.85)'; c.lineWidth = 1.9;
  c.beginPath(); c.moveTo(-3.5, 8); c.lineTo(3.5, 8); c.stroke();

  // 发式：汉＝倭堕髻（高髻偏堕）；胡＝风帽；蓬首＝散发
  c.fillStyle = 'rgba(42,38,36,.95)';
  if (hu) {
    c.beginPath(); c.moveTo(-16, -10); c.quadraticCurveTo(0, -34, 16, -10); c.lineTo(15, -2); c.lineTo(-15, -2); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(26,22,20,.9)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(130,106,72,.94)';
    c.beginPath(); c.ellipse(0, -14, 16.5, 12, 0, 0, Math.PI * 2); c.fill();     // 皮风帽
    c.strokeStyle = 'rgba(56,42,28,.9)'; c.lineWidth = 2.2; c.stroke();
    brush(c, [[-16, -12], [-30, -6], [-38, 8]], { w: 7, tone: .5, dry: .7, seed: 1891, col: [130, 106, 72] });
  } else if (hairDown) {
    // 蓬首徒行：发散乱垂下（写意，不画凌乱细节）
    c.beginPath(); c.ellipse(0, -8, 15, 10, 0, 0, Math.PI * 2); c.fill();
    for (let k = 0; k < 6; k++) {
      const wf = Math.sin(t * 1.6 + k * 1.3) * 7;
      brush(c, [[-12 + k * 5, -6], [-16 + k * 7 + wf * .5, 14], [-14 + k * 9 + wf, 40]],
        { w: 5, tone: .62, dry: .8, seed: 1892 + k, tail: .7, col: [44, 40, 38] });
    }
  } else {
    // 倭堕髻（偏堕一侧的高髻，汉魏女子典型）
    c.beginPath(); c.ellipse(0, -10, 15, 9.5, 0, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(-4, -25, 10, 11, -.22, 0, Math.PI * 2); c.fill();
    c.beginPath(); c.ellipse(6, -21, 7, 7, .18, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(24,20,18,.9)'; c.lineWidth = 2; c.stroke();
    // 簪（素银，一点微光）
    c.strokeStyle = `rgba(214,220,226,${.8 + Math.sin(t * 2.2) * .12})`; c.lineWidth = 2.4;
    c.beginPath(); c.moveTo(-13, -26); c.lineTo(9, -14); c.stroke();
    // 鬓发（随风）
    const wf = Math.sin(t * 1.7) * 7;
    brush(c, [[-14, -14], [-26 + wf * .4, -4], [-34 + wf, 12]],
      { w: 5.5, tone: .55, dry: .7, seed: 1893, tail: .7, col: [44, 40, 38] });
  }
  c.restore();

  c.restore();
};
})();
