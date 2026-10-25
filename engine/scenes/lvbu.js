// 《吕布》笔法与八幕：飞将吕布 —— 赤红战袍＋金冠双翎＋方天画戟。
// 视觉辨识（与全系列区隔）：赤红披风、束发金冠、两根雉翎、方天画戟（双月牙刃，非青龙刀）。
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

// 方天画戟（双月牙刃 + 枪尖 + 红缨）
Z.halberd = (c, x, y, ang, len = 420, t = 0, o = {}) => {
  len = Math.max(fitLen(x, y, ang, len + 75, 125) - 75, 150);
  const { col = [196, 202, 208] } = o;
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, -len]], { w: 9, tone: 0.86, dry: 0.42, seed: 911 });
  c.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},.92)`;
  c.strokeStyle = 'rgba(28,28,32,.9)'; c.lineWidth = 2;
  for (const sgn of [1, -1]) {
    c.beginPath();
    c.moveTo(0, -len + 46);
    c.quadraticCurveTo(38 * sgn, -len - 4, 46 * sgn, -len - 46);
    c.quadraticCurveTo(18 * sgn, -len - 18, 0, -len + 8);
    c.closePath(); c.fill(); c.stroke();
  }
  c.beginPath(); c.moveTo(-6, -len + 8); c.lineTo(0, -len - 54); c.lineTo(6, -len + 8); c.closePath(); c.fill(); c.stroke();
  brush(c, [[0, -len + 54], [-7, -len + 96]], { w: 6, col: [186, 44, 36], tone: 0.9, dry: 0.3, seed: 912 });
  c.restore();
};

// 吕布：奉先（o: { t, raise, flip, halberd })
Z.lvbu = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, halberd = 1 } = o;
  const br = Math.sin(t * 1.15) * 0.01;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const fl = Math.sin(t * 1.7) * 6;
  // 腿
  brush(c, [[-18, -72], [-30, -34], [-36, 4]], { w: 19, tone: 0.82, dry: 0.5, seed: 2101, head: 0.06, tail: 0.2 });
  brush(c, [[18, -72], [30, -34], [36, 4]], { w: 19, tone: 0.82, dry: 0.5, seed: 2102, head: 0.06, tail: 0.2 });
  // 赤红战袍（披风下摆飘）
  c.fillStyle = 'rgba(150,38,34,.74)';
  c.beginPath();
  c.moveTo(-32, -166); c.quadraticCurveTo(-58 - fl, -86, -62 - fl * 1.3, -2);
  c.quadraticCurveTo(0, 8 + fl * 0.4, 62 + fl * 1.1, -2); c.quadraticCurveTo(56, -88, 32, -166);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(30,16,14,.9)'; c.lineWidth = 3; c.stroke();
  // 甲片
  c.strokeStyle = 'rgba(88,26,22,.5)'; c.lineWidth = 1.6;
  for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-50, -28 - k * 26); c.quadraticCurveTo(0, -18 - k * 26, 50, -28 - k * 26); c.stroke(); }
  // 金束腰
  brush(c, [[-34, -122], [0, -118], [34, -122]], { w: 12, col: [186, 148, 66], tone: 0.9, dry: 0.3, seed: 2131 });
  // 头
  c.save(); c.translate(2, -190);
  c.fillStyle = 'rgba(246,234,214,.96)';
  c.beginPath(); c.ellipse(0, 0, 17.5, 19.5, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2.2; c.stroke();
  // 金冠
  c.fillStyle = 'rgba(196,158,72,.95)';
  c.beginPath(); c.moveTo(-20, 2); c.lineTo(-14, -18); c.lineTo(0, -24); c.lineTo(14, -18); c.lineTo(20, 2);
  c.quadraticCurveTo(0, -6, -20, 2); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(84,62,26,.9)'; c.lineWidth = 1.6; c.stroke();
  // 双雉翎
  const wl = Math.sin(t * 2.1) * 0.12;
  brush(c, [[-8, -22], [-26 - 6 * wl, -58], [-44 - 10 * wl, -92]], { w: 4.5, col: [88, 72, 54], tone: 0.9, dry: 0.35, seed: 2132 });
  brush(c, [[8, -22], [26 + 6 * wl, -58], [44 + 10 * wl, -92]], { w: 4.5, col: [88, 72, 54], tone: 0.9, dry: 0.35, seed: 2133 });
  // 目（英锐）
  c.fillStyle = 'rgba(255,252,246,.96)'; c.beginPath(); c.ellipse(7, -1, 4.8, 3.1, -0.12, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(18,16,14,.94)'; c.beginPath(); c.arc(8.4, -1, 2.3, 0, Math.PI * 2); c.fill();
  // 短须
  c.strokeStyle = 'rgba(46,38,30,.92)'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-8, 10); c.quadraticCurveTo(-1, 25, 7, 15); c.stroke();
  c.restore();
  // 双臂
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -150], [-52 - 8 * rl, -140 - 12 * rl], [-68 - 12 * rl, -126 - 28 * rl]], { w: 14, tone: 0.58, dry: 0.45, seed: 2103, head: 0.1, tail: 0.2 });
  brush(c, [[30, -150], [46, -130], [54, -108]], { w: 13, tone: 0.58, dry: 0.45, seed: 2104, head: 0.1, tail: 0.2 });
  c.restore();
  if (halberd) {
    const hx = flip ? -72 : 66, hy = -128;
    Z.halberd(c, x + hx * s, y + hy * s, flip ? 2.62 : 0.5, 430 * s, t);
  }
};

// ① 并州骁将：草原孤骑，弓马骁勇
SCENES['lvb1_bingzhou'] = (() => {
  const paper1 = () => Z.paper('lb1', '#e9e2cc');
  return { draw(c, lt, t) {
    c.drawImage(paper1(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'lb1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(92,80,62,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 500, amp: 150, tone: 0.16, seed: 21.4 }]);
    }, { blur: 3.6, halo: 16, haloA: 0.22 });
    Z.mist(c, t, { y0: 460, y1: 720, n: 3, alpha: 0.32, speed: 34, seed: 611 });
    brush(c, [[0, 944], [660, 934], [1300, 946], [1920, 932]], { w: 13, tone: 0.76, dry: 0.75, seed: 613, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0, 1.1, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.lvbu(c, lerp(420, 820, ap), 948, lerp(1.35, 2.15, ap), t, { raise: ss(0.5, 2.2, lt), halberd: 1 });
    c.restore();
    Z.flag(c, 1420, 770, 300, t, { col: 'rgba(150,38,34,.85)', seed: 9 });
    Z.seal(c, 1762, 952, '奉先', ss(1.0, 1.28, lt), { size: 88, seed: 5 });
  } };
})();

// ② 弑丁原：营帐倒旗，背主之始
SCENES['lvb2_dingyuan'] = (() => {
  const p = () => Z.paper('lb2', '#e7dfc8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb2_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(70,58,46,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 430, amp: 110, tone: 0.2, seed: 31.2 }]);
    }, { blur: 4, halo: 18, haloA: 0.24 });
    Z.mist(c, t, { y0: 400, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 621 });
    brush(c, [[0, 952], [700, 942], [1360, 954], [1920, 940]], { w: 14, tone: 0.78, dry: 0.72, seed: 623, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 营帐
    c.save(); c.globalAlpha = clamp(ss(0, 0.8, lt) * 0.9);
    c.fillStyle = 'rgba(196,182,152,.55)'; c.strokeStyle = 'rgba(52,44,34,.8)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(1250, 940); c.lineTo(1250, 760); c.lineTo(1420, 690); c.lineTo(1590, 760); c.lineTo(1590, 940); c.closePath(); c.fill(); c.stroke();
    c.restore();
    Z.fallenFlag(c, 1180, 940, ss(0, 1.4, lt), t, { seed: 4, col: 'rgba(60,64,72,.8)' });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.lvbu(c, lerp(380, 700, ap), 950, lerp(1.3, 2.1, ap), t, { raise: ss(0.8, 2.4, lt), halberd: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '奉先', ss(1.0, 1.28, lt), { size: 88, seed: 6 });
  } };
})();

// ③ 虎牢关前：关城之下，独战诸侯
SCENES['lvb3_hulao'] = (() => {
  const p = () => Z.paper('lb3', '#e6ddc5');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb3_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(64,54,44,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2050, [{ y0: 400, amp: 170, tone: 0.22, seed: 41.7 }]);
    }, { blur: 4.2, halo: 20, haloA: 0.26 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.7, lt) * 0.6);
    Z.wall(c, 1450, 900, 0.62, t, { flag: 0, seed: 3 });
    c.restore();
    Z.mist(c, t, { y0: 520, y1: 780, n: 3, alpha: 0.26, speed: 40, seed: 631 });
    brush(c, [[0, 956], [660, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.76, dry: 0.75, seed: 633, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 对面诸侯旗影
    Z.fallenFlag(c, 300, 940, 0.55, t, { seed: 8, col: 'rgba(70,74,84,.6)' });
    Z.flag(c, 560, 900, 220, t, { col: 'rgba(70,74,84,.62)', seed: 11 });
    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.lvbu(c, lerp(500, 880, ap), 952, lerp(1.4, 2.2, ap), t, { raise: ss(1.0, 2.6, lt), halberd: 1 });
    c.restore();
    Z.dust(c, t, { x: 760, y: 930, n: 5, seed: 5, scale: 1.4, alpha: 0.3 });
    Z.seal(c, 1762, 952, '飞将', ss(1.1, 1.38, lt), { size: 88, seed: 7 });
  } };
})();

// ④ 诛董卓：郿坞宫门，董卓伏诛
SCENES['lvb4_dongzhuo'] = (() => {
  const p = () => Z.paper('lb4', '#e5dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb4_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(58,44,36,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 1980, [{ y0: 420, amp: 120, tone: 0.24, seed: 51.3 }]);
    }, { blur: 4.4, halo: 22, haloA: 0.28 });
    // 宫门
    c.save(); c.globalAlpha = clamp(ss(0, 0.8, lt) * 0.85);
    c.fillStyle = 'rgba(72,48,40,.72)';
    c.beginPath(); c.moveTo(1150, 950); c.lineTo(1150, 640); c.quadraticCurveTo(1330, 560, 1510, 640); c.lineTo(1510, 950); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,20,16,.9)'; c.lineWidth = 3.4; c.stroke();
    c.fillStyle = 'rgba(150,40,34,.6)';
    for (let i = 0; i < 4; i++) c.fillRect(1170 + i * 92, 660, 34, 290);
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 820, n: 3, alpha: 0.3, speed: 30, seed: 641 });
    brush(c, [[0, 952], [640, 944], [1300, 956], [1920, 942]], { w: 14, tone: 0.8, dry: 0.7, seed: 643, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 倒地之影
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.6, lt) * 0.7);
    brush(c, [[1180, 936], [1280, 926], [1380, 940], [1460, 932]], { w: 34, tone: 0.55, dry: 0.5, seed: 644 });
    c.restore();
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.lvbu(c, lerp(420, 800, ap), 952, lerp(1.3, 2.1, ap), t, { raise: 1, halberd: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '温侯', ss(1.0, 1.28, lt), { size: 88, seed: 8 });
  } };
})();

// ⑤ 袭取徐州：城头换旗，反复无常
SCENES['lvb5_xuzhou'] = (() => {
  const p = () => Z.paper('lb5', '#e8e0ca');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb5_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(80,70,56,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2040, [{ y0: 460, amp: 130, tone: 0.2, seed: 61.1 }]);
    }, { blur: 3.8, halo: 16, haloA: 0.24 });
    Z.wall(c, 1280, 930, 0.72, t, { flag: 1, flagCol: 'rgba(150,38,34,.85)', seed: 4 });
    Z.mist(c, t, { y0: 500, y1: 760, n: 3, alpha: 0.3, speed: 32, seed: 651 });
    brush(c, [[0, 960], [620, 950], [1280, 962], [1920, 948]], { w: 14, tone: 0.78, dry: 0.72, seed: 653, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.lvbu(c, lerp(380, 760, ap), 956, lerp(1.3, 2.05, ap), t, { raise: ss(0.9, 2.3, lt), halberd: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '奉先', ss(1.0, 1.28, lt), { size: 88, seed: 9 });
  } };
})();

// ⑥ 辕门射戟：一箭解两家之兵
SCENES['lvb6_yuanmen'] = (() => {
  const p = () => Z.paper('lb6', '#eae3ce');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb6_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(86,78,62,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 480, amp: 110, tone: 0.18, seed: 71.5 }]);
    }, { blur: 3.6, halo: 16, haloA: 0.22 });
    Z.mist(c, t, { y0: 440, y1: 700, n: 3, alpha: 0.32, speed: 28, seed: 661 });
    brush(c, [[0, 946], [700, 938], [1360, 950], [1920, 936]], { w: 13, tone: 0.76, dry: 0.74, seed: 663, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 远处立戟（靶）
    const far = ss(0.2, 1.0, lt);
    c.save(); c.globalAlpha = clamp(far * 0.9);
    Z.halberd(c, 1640, 930, 0.06, 320, t);
    c.restore();
    // 箭线
    c.save(); c.globalAlpha = clamp(ss(1.2, 2.2, lt) * 0.85);
    brush(c, [[900, 700], [1200, 640], [1560, 700]], { w: 4, col: [40,36,30], tone: 0.9, dry: 0.2, seed: 664 });
    c.restore();
    const ap = ease.out(ss(0, 1.1, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.lvbu(c, lerp(400, 760, ap), 950, lerp(1.35, 2.1, ap), t, { raise: ss(0.4, 1.6, lt), halberd: 0 });
    c.restore();
    Z.bow(c, 860, 740, 1.15, t, { draw: ss(0.6, 1.8, lt), flip: 1 });
    Z.seal(c, 1762, 952, '射戟', ss(1.0, 1.28, lt), { size: 88, seed: 10 });
  } };
})();

// ⑦ 白门楼：城楼被缚，乞哀求生
SCENES['lvb7_baimen'] = (() => {
  const p = () => Z.paper('lb7', '#e3d9c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'lb7_bg', 0.35 + 0.65 * grow, (g) => {
      g.fillStyle = 'rgba(48,42,38,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2000, [{ y0: 420, amp: 140, tone: 0.26, seed: 81.2 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.9);
    Z.wall(c, 1360, 900, 0.8, t, { flag: 0, seed: 5 });
    c.restore();
    Z.mist(c, t, { y0: 540, y1: 800, n: 3, alpha: 0.28, speed: 24, seed: 671 });
    brush(c, [[0, 958], [640, 948], [1310, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 673, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    // 被缚：无兵器、垂首（raise 负值不可用，用 halberd:0 + 双臂缚后）
    Z.lvbu(c, lerp(460, 820, ap), 952, lerp(1.35, 2.1, ap), t, { raise: 0, halberd: 0 });
    c.restore();
    // 缚绳
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.8, lt) * 0.85);
    brush(c, [[730, 806], [790, 800], [850, 812]], { w: 5, col: [186, 158, 96], tone: 0.85, dry: 0.3, seed: 674 });
    c.restore();
    Z.seal(c, 1762, 952, '温侯', ss(1.0, 1.28, lt), { size: 88, seed: 11 });
  } };
})();

// ⑧ 缢死枭首：白绫落日，飞将之终
SCENES['lvb8_yisi'] = (() => {
  const p = () => Z.paper('lb8', '#ded3b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'lb8_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(40,34,32,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 160, tone: 0.3, seed: 91.7 }]);
    }, { blur: 4.8, halo: 26, haloA: 0.32 });
    // 落日
    c.save(); c.globalAlpha = clamp(ss(0.4, 2.0, lt) * 0.55);
    c.fillStyle = 'rgba(176,58,44,.5)';
    c.beginPath(); c.arc(1420, 560, 120, 0, Math.PI * 2); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 840, n: 4, alpha: 0.3, speed: 20, seed: 681 });
    brush(c, [[0, 960], [620, 950], [1300, 962], [1920, 948]], { w: 15, tone: 0.82, dry: 0.68, seed: 683, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 垂绫
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.4, lt) * 0.8);
    brush(c, [[700, 380], [706, 560], [700, 720]], { w: 6, col: [232,226,210], tone: 0.9, dry: 0.4, seed: 684 });
    c.restore();
    const ap = ease.out(ss(0.4, 1.6, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.lvbu(c, lerp(560, 740, ap), 952, lerp(1.4, 2.0, ap), t, { raise: 0, halberd: 0 });
    c.restore();
    // 戟落地
    c.save(); c.globalAlpha = clamp(ss(1.4, 2.6, lt) * 0.85);
    Z.halberd(c, 1180, 946, 1.42, 400, t);
    c.restore();
    Z.seal(c, 1762, 952, '飞将', ss(1.2, 1.48, lt), { size: 88, seed: 12 });
  } };
})();
})();
