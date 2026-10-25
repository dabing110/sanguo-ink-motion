// 《关羽》笔法与八幕：汉寿亭侯 —— 绿袍＋长髯及腹＋赤面＋青龙偃月刀。
// 视觉辨识：墨绿战袍、过腹长髯（三缕以上）、赤红面、青龙刀（宽月牙大刃，非方天画戟）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 刃部必须留在画面内：否则长杆只剩一根光杆，兵器身份彻底读不出来。
const fitLen = (x, y, ang, len, pad = 96) => {
  const px = Math.sin(ang), py = -Math.cos(ang);
  const ok = (L) => {
    const tx = x + px * L, ty = y + py * L;
    return tx > pad && tx < W - pad && ty > pad * 0.7 && ty < H - 24;
  };
  if (ok(len)) return len;
  for (let k = 0.97; k > 0.28; k -= 0.02) if (ok(len * k)) return len * k;
  return len * 0.28;
};

// 青龙偃月刀（长杆＋宽月牙大刃＋红缨）
Z.qinglongdao = (c, x, y, ang, len = 420, t = 0, o = {}) => {
  len = Math.max(fitLen(x, y, ang, len + 135, 130) - 135, 150);
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, -len]], { w: 10, tone: 0.86, dry: 0.4, seed: 4101 });
  // 宽月牙刃
  c.fillStyle = 'rgba(206,212,216,.92)'; c.strokeStyle = 'rgba(26,28,30,.9)'; c.lineWidth = 2.2;
  c.beginPath();
  c.moveTo(2, -len + 24);
  c.quadraticCurveTo(78, -len - 36, 92, -len - 120);
  c.quadraticCurveTo(45, -len - 66, 12, -len + 2);
  c.closePath(); c.fill(); c.stroke();
  // 刀背血槽
  c.strokeStyle = 'rgba(70,74,80,.6)'; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(14, -len + 6); c.quadraticCurveTo(58, -len - 40, 76, -len - 96); c.stroke();
  // 红缨
  brush(c, [[0, -len + 30], [-8, -len + 74], [-4, -len + 104]], { w: 6, col: [184, 42, 36], tone: 0.9, dry: 0.3, seed: 4102 });
  c.restore();
};

// 关羽：云长（o: { t, raise, flip, blade, beard })
Z.guanyu = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, blade = 1 } = o;
  const br = Math.sin(t * 1.1) * 0.01;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const hem = Math.sin(t * 1.5) * 5;
  // 腿
  brush(c, [[-18, -74], [-28, -34], [-34, 4]], { w: 19, tone: 0.82, dry: 0.5, seed: 4201, head: 0.06, tail: 0.2 });
  brush(c, [[18, -74], [28, -34], [34, 4]], { w: 19, tone: 0.82, dry: 0.5, seed: 4202, head: 0.06, tail: 0.2 });
  // 墨绿战袍
  c.fillStyle = 'rgba(44,84,62,.74)';
  c.beginPath();
  c.moveTo(-32, -166); c.quadraticCurveTo(-54, -86, -58 + hem, -4);
  c.quadraticCurveTo(0, 4 + hem * 0.3, 58 + hem * 0.7, -4); c.quadraticCurveTo(54, -88, 32, -166);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(18,28,22,.9)'; c.lineWidth = 3; c.stroke();
  // 甲片
  c.strokeStyle = 'rgba(28,52,40,.5)'; c.lineWidth = 1.6;
  for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-48, -30 - k * 26); c.quadraticCurveTo(0, -20 - k * 26, 48, -30 - k * 26); c.stroke(); }
  // 束腰
  brush(c, [[-32, -120], [0, -116], [32, -120]], { w: 12, col: [168, 56, 44], tone: 0.88, dry: 0.3, seed: 4231 });
  // 头（赤面）
  c.save(); c.translate(2, -188);
  c.fillStyle = 'rgba(218,148,116,.95)';
  c.beginPath(); c.ellipse(0, 0, 17, 19.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(48,26,20,.9)'; c.lineWidth = 2.2; c.stroke();
  // 青巾（幞头）
  c.fillStyle = 'rgba(36,54,44,.95)';
  c.beginPath(); c.moveTo(-20, 2); c.quadraticCurveTo(-18, -26, 2, -28); c.quadraticCurveTo(22, -24, 22, 2);
  c.lineTo(16, 4); c.quadraticCurveTo(0, -8, -14, 4); c.closePath(); c.fill();
  // 丹凤眼（细长上挑）
  c.strokeStyle = 'rgba(30,16,12,.9)'; c.lineWidth = 2.2;
  c.beginPath(); c.moveTo(-9, -2); c.quadraticCurveTo(-4, -6, 2, -2); c.stroke();
  c.beginPath(); c.moveTo(9, -2); c.quadraticCurveTo(14, -6, 21, -4); c.stroke();
  c.fillStyle = 'rgba(26,14,10,.9)';
  c.beginPath(); c.ellipse(-4, 0, 2.2, 1.6, 0.2, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.ellipse(13, -1, 2.2, 1.6, -0.2, 0, Math.PI * 2); c.fill();
  // 长髯（及腹，三缕，随风）
  const wf = Math.sin(t * 1.3) * 4;
  c.strokeStyle = 'rgba(28,26,26,.94)'; c.lineWidth = 4; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-6, 12); c.quadraticCurveTo(-10 + wf * 0.4, 56, -4 + wf, 96); c.stroke();
  c.beginPath(); c.moveTo(4, 12); c.quadraticCurveTo(2, 58, 6 + wf * 0.7, 100); c.stroke();
  c.beginPath(); c.moveTo(-1, 13); c.quadraticCurveTo(-4, 50, 0 + wf * 0.5, 90); c.stroke();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -150], [-50 - 6 * rl, -138 - 14 * rl], [-66 - 10 * rl, -122 - 30 * rl]], { w: 14, tone: 0.56, dry: 0.45, seed: 4203, head: 0.1, tail: 0.2 });
  brush(c, [[30, -150], [44, -130], [52, -108]], { w: 13, tone: 0.56, dry: 0.45, seed: 4204, head: 0.1, tail: 0.2 });
  c.restore();
  if (blade) {
    const hx = flip ? -70 : 64, hy = -126;
    Z.qinglongdao(c, x + hx * s, y + hy * s, flip ? 2.66 : 0.46, 440 * s, t);
  }
};

// ① 亡命奔涿：夜山道，亡命投军
SCENES['gy1_wangming'] = (() => {
  const p = () => Z.paper('gy1', '#dfd6bf');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'gy1_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(44,42,40,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 470, amp: 170, tone: 0.28, seed: 81.1 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    Z.mist(c, t, { y0: 500, y1: 800, n: 4, alpha: 0.34, speed: 24, seed: 801 });
    brush(c, [[0, 952], [650, 944], [1320, 956], [1920, 942]], { w: 14, tone: 0.8, dry: 0.7, seed: 803, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 山道
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.6);
    brush(c, [[180, 952], [560, 900], [980, 880]], { w: 26, tone: 0.5, dry: 0.7, seed: 804 });
    c.restore();
    const ap = ease.out(ss(0.1, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.guanyu(c, lerp(400, 760, ap), 950, lerp(1.3, 2.1, ap), t, { raise: 0.2, blade: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '云长', ss(1.0, 1.28, lt), { size: 88, seed: 21 });
  } };
})();

// ② 桃园结义：三人一誓，生死相随
SCENES['gy2_taoyuan'] = (() => {
  const p = () => Z.paper('gy2', '#eae0c6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'gy2_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(92,78,58,.08)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 480, amp: 90, tone: 0.14, seed: 91.6 }]);
    }, { blur: 3.4, halo: 14, haloA: 0.2 });
    // 桃树三株
    for (let i = 0; i < 3; i++) {
      const bx = 240 + i * 300, sway = Math.sin(t * 0.9 + i) * 6;
      c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.7);
      brush(c, [[bx, 944], [bx + 8, 780], [bx + 26 + sway, 640]], { w: 16, tone: 0.72, dry: 0.5, seed: 811 + i });
      c.fillStyle = 'rgba(206,132,140,.42)';
      for (let k = 0; k < 14; k++) {
        const rx = bx + 26 + sway + (rng(i * 31 + k) - 0.5) * 210;
        const ry = 600 + (rng(i * 53 + k) - 0.5) * 150;
        c.beginPath(); c.arc(rx, ry, 5 + rng(k) * 5, 0, Math.PI * 2); c.fill();
      }
      c.restore();
    }
    Z.mist(c, t, { y0: 500, y1: 720, n: 3, alpha: 0.26, speed: 26, seed: 821 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 823, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 三影立誓
    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap);
    for (let i = 0; i < 3; i++) {
      const px = 900 + i * 130 - 60;
      brush(c, [[px, 948], [px + 2, 790]], { w: 34, tone: 0.42 + i * 0.04, dry: 0.5, seed: 831 + i });
      c.fillStyle = 'rgba(244,232,212,.88)';
      c.beginPath(); c.ellipse(px + 2, 776, 13, 15, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(50,42,34,.8)'; c.lineWidth = 1.8; c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '桃园', ss(1.0, 1.28, lt), { size: 88, seed: 22 });
  } };
})();

// ③ 白马斩良：万军之中，单骑取首
SCENES['gy3_baima'] = (() => {
  const p = () => Z.paper('gy3', '#e2d8c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'gy3_bg', 0.35 + 0.65 * grow, (g) => {
      g.fillStyle = 'rgba(66,56,46,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 430, amp: 140, tone: 0.24, seed: 101.3 }]);
    }, { blur: 4.4, halo: 22, haloA: 0.28 });
    Z.mist(c, t, { y0: 520, y1: 780, n: 3, alpha: 0.26, speed: 34, seed: 841 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.78, dry: 0.72, seed: 843, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 敌阵旗影
    Z.fallenFlag(c, 330, 942, 0.7, t, { seed: 5, col: 'rgba(66,70,80,.62)' });
    Z.flag(c, 620, 900, 210, t, { col: 'rgba(66,70,80,.6)', seed: 12 });
    // 赤兔冲阵
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.rider(c, lerp(480, 980, ap), 950, lerp(1.05, 1.5, ap), t * 2.2, { flip: 0 });
    c.restore();
    Z.dust(c, t, { x: 800, y: 936, n: 6, seed: 7, scale: 1.5, alpha: 0.34 });
    Z.seal(c, 1762, 952, '斩良', ss(1.0, 1.28, lt), { size: 88, seed: 23 });
  } };
})();

// ④ 封金挂印：悬印于梁，义不苟留
SCENES['gy4_fengjin'] = (() => {
  const p = () => Z.paper('gy4', '#e8e0ca');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'gy4_bg', 0.45 + 0.55 * grow, (g) => {
      g.fillStyle = 'rgba(78,68,54,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 470, amp: 100, tone: 0.16, seed: 111.8 }]);
    }, { blur: 3.6, halo: 16, haloA: 0.22 });
    Z.mist(c, t, { y0: 460, y1: 700, n: 3, alpha: 0.3, speed: 28, seed: 851 });
    // 梁
    c.save(); c.globalAlpha = clamp(ss(0, 0.8, lt) * 0.85);
    c.fillStyle = 'rgba(118,86,52,.9)'; c.fillRect(1080, 250, 560, 26);
    c.fillRect(1120, 276, 18, 40); c.fillRect(1580, 276, 18, 40);
    c.restore();
    // 悬印
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.6, lt) * 0.95);
    brush(c, [[1360, 276], [1360, 420]], { w: 4, col: [170, 140, 88], tone: 0.9, dry: 0.3, seed: 852 });
    c.fillStyle = 'rgba(190,156,80,.95)';
    c.fillRect(1340, 420, 42, 46); c.strokeStyle = 'rgba(96,72,34,.9)'; c.lineWidth = 2.4; c.strokeRect(1340, 420, 42, 46);
    c.restore();
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 853, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.guanyu(c, lerp(420, 800, ap), 952, lerp(1.3, 2.05, ap), t, { raise: 0.15, blade: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '挂印', ss(1.0, 1.28, lt), { size: 88, seed: 24 });
  } };
})();

// ⑤ 千里独行：过关斩将，单骑寻兄
SCENES['gy5_qianli'] = (() => {
  const p = () => Z.paper('gy5', '#e6ddc7');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'gy5_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(72,64,52,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 450, amp: 150, tone: 0.22, seed: 121.5 }]);
    }, { blur: 4.2, halo: 20, haloA: 0.26 });
    // 关隘
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.78);
    Z.wall(c, 1440, 920, 0.66, t, { flag: 1, flagCol: 'rgba(72,76,86,.7)', seed: 6 });
    c.restore();
    Z.mist(c, t, { y0: 520, y1: 780, n: 3, alpha: 0.28, speed: 30, seed: 861 });
    brush(c, [[0, 956], [650, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.78, dry: 0.72, seed: 863, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.rider(c, lerp(360, 860, ap), 950, lerp(1.05, 1.5, ap), t * 2.0, { flip: 0 });
    c.restore();
    Z.dust(c, t, { x: 760, y: 938, n: 5, seed: 8, scale: 1.3, alpha: 0.3 });
    Z.seal(c, 1762, 952, '千里', ss(1.0, 1.28, lt), { size: 88, seed: 25 });
  } };
})();

// ⑥ 华容释曹：念旧放行，义释曹公
SCENES['gy6_huarong'] = (() => {
  const p = () => Z.paper('gy6', '#dfd7c2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'gy6_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(46,46,48,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2020, [{ y0: 440, amp: 160, tone: 0.28, seed: 131.2 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    Z.mist(c, t, { y0: 500, y1: 820, n: 4, alpha: 0.34, speed: 22, seed: 871 });
    brush(c, [[0, 954], [650, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.8, dry: 0.7, seed: 873, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 泥泞道
    brush(c, [[300, 950], [760, 928], [1180, 946]], { w: 30, tone: 0.46, dry: 0.75, seed: 874 });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.guanyu(c, lerp(380, 780, ap), 950, lerp(1.3, 2.05, ap), t, { raise: 0.3, blade: 1 });
    c.restore();
    // 败走之影（低身）
    c.save(); c.globalAlpha = clamp(ss(1.0, 2.0, lt) * 0.6);
    brush(c, [[1200, 940], [1260, 900], [1310, 888]], { w: 30, tone: 0.5, dry: 0.6, seed: 875 });
    c.restore();
    Z.seal(c, 1762, 952, '释曹', ss(1.0, 1.28, lt), { size: 88, seed: 26 });
  } };
})();

// ⑦ 水淹七军：汉水暴涨，威震华夏
SCENES['gy7_shuiyan'] = (() => {
  const p = () => Z.paper('gy7', '#ded6c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'gy7_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(38,46,50,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 170, tone: 0.3, seed: 141.7 }]);
    }, { blur: 4.8, halo: 26, haloA: 0.32 });
    // 高处的旗（关羽立高处）
    c.save(); c.globalAlpha = clamp(ss(0, 0.8, lt) * 0.7);
    brush(c, [[1400, 900], [1560, 700], [1780, 660]], { w: 40, tone: 0.62, dry: 0.6, seed: 881 });
    c.restore();
    Z.water(c, t, { y0: 780, y1: 1060, tone: 0.42, seed: 27, rows: 7 });
    brush(c, [[0, 900], [500, 884], [900, 906], [1300, 888]], { w: 16, tone: 0.7, dry: 0.6, seed: 883 });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.guanyu(c, lerp(1500, 1560, ap), 690, lerp(1.05, 1.5, ap), t, { raise: 0.85, blade: 1, flip: 1 });
    c.restore();
    Z.flag(c, 1720, 660, 280, t, { col: 'rgba(44,84,62,.85)', seed: 13 });
    Z.seal(c, 1762, 952, '水淹', ss(1.0, 1.28, lt), { size: 88, seed: 27 });
  } };
})();

// ⑧ 败走麦城：孤城雪落，父子俱殁
SCENES['gy8_maicheng'] = (() => {
  const p = () => Z.paper('gy8', '#dcd4be');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'gy8_bg', 0.25 + 0.75 * grow, (g) => {
      g.fillStyle = 'rgba(44,42,42,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 170, tone: 0.3, seed: 151.1 }]);
    }, { blur: 5, halo: 28, haloA: 0.34 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.8);
    Z.wall(c, 1380, 890, 0.72, t, { flag: 0, seed: 7 });
    c.restore();
    // 雪
    c.save(); c.globalAlpha = clamp(ss(0.4, 2.0, lt) * 0.55);
    c.fillStyle = 'rgba(250,248,242,.8)';
    for (let k = 0; k < 60; k++) {
      const sx = (k * 137 + t * 26) % 1920, sy = (k * 89 + t * (40 + (k % 5) * 12)) % 1000;
      c.beginPath(); c.arc(sx, sy, 2.2 + (k % 3) * 1.2, 0, Math.PI * 2); c.fill();
    }
    c.restore();
    brush(c, [[0, 958], [640, 950], [1300, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 893, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.4, 1.6, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.guanyu(c, lerp(500, 760, ap), 954, lerp(1.3, 1.95, ap), t, { raise: 0, blade: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '麦城', ss(1.2, 1.48, lt), { size: 88, seed: 28 });
  } };
})();
})();
