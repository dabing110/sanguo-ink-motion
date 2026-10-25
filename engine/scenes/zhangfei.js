// 《张飞》笔法与八幕：万人之敌 —— 黑铁甲＋豹头环眼＋虎须＋丈八蛇矛。
// 视觉辨识：墨黑重甲、环眼圆睁、倒竖虎须、丈八蛇矛（波纹矛刃，非青龙刀、非画戟）。
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

// 丈八蛇矛（长杆＋波浪蛇形刃）
Z.shemao = (c, x, y, ang, len = 460, t = 0, o = {}) => {
  len = Math.max(fitLen(x, y, ang, len + 160, 130) - 160, 150);
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, -len]], { w: 9, tone: 0.88, dry: 0.4, seed: 5101 });
  // 蛇形刃
  c.fillStyle = 'rgba(200,206,212,.92)'; c.strokeStyle = 'rgba(24,26,28,.9)'; c.lineWidth = 2.2;
  c.beginPath();
  c.moveTo(0, -len);
  c.quadraticCurveTo(16, -len - 26, 4, -len - 52);
  c.quadraticCurveTo(-14, -len - 78, 2, -len - 104);
  c.quadraticCurveTo(14, -len - 122, 0, -len - 142);
  c.quadraticCurveTo(-14, -len - 122, -2, -len - 104);
  c.quadraticCurveTo(14, -len - 78, -4, -len - 52);
  c.quadraticCurveTo(-16, -len - 26, 0, -len);
  c.closePath(); c.fill(); c.stroke();
  // 红缨
  brush(c, [[0, -len + 26], [-7, -len + 66]], { w: 6, col: [182, 44, 38], tone: 0.9, dry: 0.3, seed: 5102 });
  c.restore();
};

// 张飞：翼德（o: { t, raise, flip, spear })
Z.zhangfei = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, spear = 1 } = o;
  const br = Math.sin(t * 1.2) * 0.012;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.4);
  const hem = Math.sin(t * 1.6) * 5;
  // 粗腿
  brush(c, [[-22, -72], [-34, -34], [-40, 4]], { w: 22, tone: 0.8, dry: 0.5, seed: 5201, head: 0.06, tail: 0.2 });
  brush(c, [[22, -72], [34, -34], [40, 4]], { w: 22, tone: 0.8, dry: 0.5, seed: 5202, head: 0.06, tail: 0.2 });
  // 墨黑重甲（宽厚）
  c.fillStyle = 'rgba(38,36,36,.82)';
  c.beginPath();
  c.moveTo(-38, -168); c.quadraticCurveTo(-62, -84, -66 + hem, -4);
  c.quadraticCurveTo(0, 6 + hem * 0.3, 66 + hem * 0.7, -4); c.quadraticCurveTo(62, -86, 38, -168);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(12,12,12,.92)'; c.lineWidth = 3.2; c.stroke();
  // 甲片（横向重纹）
  c.strokeStyle = 'rgba(96,92,88,.42)'; c.lineWidth = 2;
  for (let k = 1; k < 5; k++) { c.beginPath(); c.moveTo(-56, -28 - k * 28); c.quadraticCurveTo(0, -16 - k * 28, 56, -28 - k * 28); c.stroke(); }
  // 肩兽吞口
  c.fillStyle = 'rgba(150,124,64,.8)';
  c.beginPath(); c.arc(-44, -160, 15, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(44, -160, 15, 0, Math.PI * 2); c.fill();
  // 束腰
  brush(c, [[-36, -120], [0, -116], [36, -120]], { w: 13, col: [156, 48, 40], tone: 0.88, dry: 0.3, seed: 5231 });
  // 头（方阔）
  c.save(); c.translate(2, -190);
  c.fillStyle = 'rgba(232,214,190,.95)';
  c.beginPath(); c.ellipse(0, 0, 19, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(24,20,18,.9)'; c.lineWidth = 2.4; c.stroke();
  // 黑巾
  c.fillStyle = 'rgba(26,24,24,.95)';
  c.beginPath(); c.moveTo(-22, 0); c.quadraticCurveTo(-20, -28, 2, -30); c.quadraticCurveTo(24, -26, 24, 0);
  c.lineTo(18, 3); c.quadraticCurveTo(0, -9, -16, 3); c.closePath(); c.fill();
  // 环眼（圆睁）
  c.fillStyle = 'rgba(255,252,246,.98)';
  c.beginPath(); c.arc(-6, -1, 6.2, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(11, -1, 6.2, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(18,14,12,.96)';
  c.beginPath(); c.arc(-6, -1, 3.2, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.arc(11, -1, 3.2, 0, Math.PI * 2); c.fill();
  // 倒竖虎须（扇形）
  const wf = Math.sin(t * 2.0) * 4;
  c.strokeStyle = 'rgba(20,18,18,.95)'; c.lineWidth = 3.2; c.lineCap = 'round';
  for (let k = -2; k <= 2; k++) {
    c.beginPath(); c.moveTo(k * 6, 8);
    c.quadraticCurveTo(k * 15, 24 + wf * 0.3, k * 24, 40 + wf); c.stroke();
  }
  c.restore();
  // 双臂（粗壮）
  const rl = ease.out(clamp(raise));
  brush(c, [[-36, -150], [-58 - 8 * rl, -140 - 12 * rl], [-74 - 12 * rl, -124 - 28 * rl]], { w: 17, tone: 0.54, dry: 0.45, seed: 5203, head: 0.1, tail: 0.2 });
  brush(c, [[36, -150], [52, -130], [60, -108]], { w: 16, tone: 0.54, dry: 0.45, seed: 5204, head: 0.1, tail: 0.2 });
  c.restore();
  if (spear) {
    const hx = flip ? -78 : 70, hy = -128;
    Z.shemao(c, x + hx * s, y + hy * s, flip ? 2.7 : 0.44, 470 * s, t);
  }
};

// ① 涿郡屠户：肉案横刀，市井之豪
SCENES['zf1_tuhu'] = (() => {
  const p = () => Z.paper('zf1', '#e9e1cb');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zf1_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(86,74,58,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 480, amp: 96, tone: 0.16, seed: 161.2 }]);
    }, { blur: 3.6, halo: 15, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 901 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 903, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 肉案
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.2, lt) * 0.9);
    c.fillStyle = 'rgba(122,88,52,.92)'; c.fillRect(1080, 860, 320, 16);
    c.fillRect(1104, 876, 14, 74); c.fillRect(1360, 876, 14, 74);
    c.fillStyle = 'rgba(168,86,72,.6)'; c.fillRect(1130, 832, 100, 28);
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhangfei(c, lerp(400, 780, ap), 950, lerp(1.3, 2.1, ap), t, { raise: 0.2, spear: 0 });
    c.restore();
    // 屠刀
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.9, lt) * 0.9);
    brush(c, [[1180, 836], [1240, 812], [1290, 800]], { w: 9, tone: 0.8, dry: 0.3, seed: 904 });
    c.restore();
    Z.seal(c, 1762, 952, '翼德', ss(1.0, 1.28, lt), { size: 88, seed: 29 });
  } };
})();

// ② 桃园结义：与兄同誓
SCENES['zf2_taoyuan'] = (() => {
  const p = () => Z.paper('zf2', '#eae0c6');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zf2_bg', 0.5 + 0.5 * grow, (g) => {
      g.fillStyle = 'rgba(92,78,58,.08)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 480, amp: 90, tone: 0.14, seed: 171.6 }]);
    }, { blur: 3.4, halo: 14, haloA: 0.2 });
    for (let i = 0; i < 3; i++) {
      const bx = 360 + i * 380, sway = Math.sin(t * 0.9 + i) * 6;
      c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.65);
      brush(c, [[bx, 944], [bx + 8, 780], [bx + 26 + sway, 640]], { w: 16, tone: 0.72, dry: 0.5, seed: 911 + i });
      c.fillStyle = 'rgba(206,132,140,.4)';
      for (let k = 0; k < 12; k++) {
        const rx = bx + 26 + sway + (rng(i * 31 + k) - 0.5) * 210;
        const ry = 600 + (rng(i * 53 + k) - 0.5) * 150;
        c.beginPath(); c.arc(rx, ry, 5 + rng(k) * 5, 0, Math.PI * 2); c.fill();
      }
      c.restore();
    }
    Z.mist(c, t, { y0: 500, y1: 720, n: 3, alpha: 0.26, speed: 26, seed: 921 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 923, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.zhangfei(c, lerp(1200, 1060, ap), 950, lerp(1.2, 1.85, ap), t, { raise: 0.3, spear: 1, flip: 1 });
    c.restore();
    c.save(); c.globalAlpha = clamp(ap * 0.85);
    for (let i = 0; i < 2; i++) {
      const px = 760 + i * 120;
      brush(c, [[px, 948], [px + 2, 790]], { w: 32, tone: 0.46 + i * 0.05, dry: 0.5, seed: 931 + i });
      c.fillStyle = 'rgba(244,232,212,.88)';
      c.beginPath(); c.ellipse(px + 2, 776, 13, 15, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(50,42,34,.8)'; c.lineWidth = 1.8; c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '桃园', ss(1.0, 1.28, lt), { size: 88, seed: 30 });
  } };
})();

// ③ 长坂断喝：独据桥头，一喝退敌
SCENES['zf3_changban'] = (() => {
  const p = () => Z.paper('zf3', '#e0d7c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zf3_bg', 0.32 + 0.68 * grow, (g) => {
      g.fillStyle = 'rgba(56,50,44,.16)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 440, amp: 160, tone: 0.26, seed: 181.3 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    Z.water(c, t, { y0: 800, y1: 1050, tone: 0.34, seed: 31, rows: 6 });
    // 断桥
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.9);
    c.fillStyle = 'rgba(116,84,50,.92)';
    c.fillRect(600, 800, 720, 18);
    for (let i = 0; i < 6; i++) { c.fillRect(626 + i * 118, 818, 14, 56); }
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 800, n: 4, alpha: 0.3, speed: 28, seed: 941 });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.2);
    Z.zhangfei(c, lerp(700, 940, ap), 800, lerp(1.35, 2.15, ap), t, { raise: 0.95, spear: 1 });
    c.restore();
    // 喝声波
    c.save(); c.globalAlpha = clamp(ss(0.9, 2.0, lt) * 0.4);
    for (let k = 0; k < 3; k++) {
      c.strokeStyle = 'rgba(40,36,32,.5)'; c.lineWidth = 3;
      c.beginPath(); c.arc(990, 640, 70 + k * 54, -0.9, 0.9); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '断喝', ss(1.0, 1.28, lt), { size: 88, seed: 31 });
  } };
})();

// ④ 义释严颜：解缚相对，得其心
SCENES['zf4_yishi'] = (() => {
  const p = () => Z.paper('zf4', '#e7dfc9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zf4_bg', 0.42 + 0.58 * grow, (g) => {
      g.fillStyle = 'rgba(76,66,52,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2020, [{ y0: 470, amp: 104, tone: 0.18, seed: 191.7 }]);
    }, { blur: 3.8, halo: 16, haloA: 0.22 });
    Z.mist(c, t, { y0: 470, y1: 720, n: 3, alpha: 0.3, speed: 28, seed: 951 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 953, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhangfei(c, lerp(430, 760, ap), 950, lerp(1.3, 2.05, ap), t, { raise: 0.45, spear: 0 });
    c.restore();
    // 严颜（白发老者，剪影）
    c.save(); c.globalAlpha = clamp(ss(0.8, 1.8, lt) * 0.85);
    brush(c, [[1200, 948], [1206, 806]], { w: 40, tone: 0.48, dry: 0.5, seed: 954 });
    c.fillStyle = 'rgba(242,232,214,.9)'; c.beginPath(); c.ellipse(1206, 792, 15, 17, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(50,42,34,.85)'; c.lineWidth = 2; c.stroke();
    c.strokeStyle = 'rgba(232,228,220,.9)'; c.lineWidth = 3; c.lineCap = 'round';
    c.beginPath(); c.moveTo(1196, 800); c.quadraticCurveTo(1206, 822, 1218, 802); c.stroke();
    c.restore();
    Z.seal(c, 1762, 952, '义释', ss(1.0, 1.28, lt), { size: 88, seed: 32 });
  } };
})();

// ⑤ 宕渠破郃：山隘狭路，以少破多
SCENES['zf5_dangqu'] = (() => {
  const p = () => Z.paper('zf5', '#e2d8c0');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zf5_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(54,46,42,.18)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 420, amp: 180, tone: 0.28, seed: 201.4 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    // 山隘夹壁
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.55);
    c.fillStyle = 'rgba(52,44,38,.42)';
    c.beginPath(); c.moveTo(0, 0); c.lineTo(380, 0); c.lineTo(500, 900); c.lineTo(0, 960); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(1920, 0); c.lineTo(1540, 0); c.lineTo(1420, 900); c.lineTo(1920, 960); c.closePath(); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 520, y1: 800, n: 3, alpha: 0.28, speed: 30, seed: 961 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.8, dry: 0.7, seed: 963, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    Z.fallenFlag(c, 1420, 940, 0.9, t, { seed: 9, col: 'rgba(64,68,78,.7)' });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhangfei(c, lerp(520, 860, ap), 952, lerp(1.35, 2.1, ap), t, { raise: 0.85, spear: 1 });
    c.restore();
    Z.dust(c, t, { x: 720, y: 940, n: 6, seed: 10, scale: 1.4, alpha: 0.32 });
    Z.seal(c, 1762, 952, '破郃', ss(1.0, 1.28, lt), { size: 88, seed: 33 });
  } };
})();

// ⑥ 镇守巴西：城头立矛，魏人不敢犯
SCENES['zf6_brazil'] = (() => {
  const p = () => Z.paper('zf6', '#e8e0ca');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'zf6_bg', 0.42 + 0.58 * grow, (g) => {
      g.fillStyle = 'rgba(80,70,56,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2020, [{ y0: 460, amp: 120, tone: 0.18, seed: 211.8 }]);
    }, { blur: 3.8, halo: 16, haloA: 0.22 });
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.8);
    Z.wall(c, 1320, 910, 0.74, t, { flag: 1, flagCol: 'rgba(44,44,46,.8)', seed: 10 });
    c.restore();
    Z.mist(c, t, { y0: 520, y1: 780, n: 3, alpha: 0.28, speed: 28, seed: 971 });
    brush(c, [[0, 958], [640, 950], [1320, 962], [1920, 948]], { w: 14, tone: 0.78, dry: 0.72, seed: 973, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.zhangfei(c, lerp(460, 800, ap), 952, lerp(1.3, 2.05, ap), t, { raise: 0.5, spear: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '巴西', ss(1.0, 1.28, lt), { size: 88, seed: 34 });
  } };
})();

// ⑦ 阆中暴卒：帐中鞭卒，反遭其害
SCENES['zf7_zhong'] = (() => {
  const p = () => Z.paper('zf7', '#dcd3bc');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'zf7_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(40,36,34,.24)'; g.fillRect(0, 0, 1920, 1080);
    }, { blur: 5, halo: 28, haloA: 0.34 });
    // 军帐
    c.save(); c.globalAlpha = clamp(ss(0, 0.9, lt) * 0.85);
    c.fillStyle = 'rgba(146,132,110,.5)'; c.strokeStyle = 'rgba(50,44,36,.85)'; c.lineWidth = 3;
    c.beginPath(); c.moveTo(300, 940); c.lineTo(300, 620); c.lineTo(620, 520); c.lineTo(940, 620); c.lineTo(940, 940); c.closePath(); c.fill(); c.stroke();
    c.restore();
    // 灯（摇曳）
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.2, lt) * 0.7);
    c.fillStyle = 'rgba(206,142,64,.6)'; c.beginPath(); c.arc(1080, 700, 40 + Math.sin(t * 3) * 4, 0, Math.PI * 2); c.fill();
    c.restore();
    Z.mist(c, t, { y0: 600, y1: 860, n: 3, alpha: 0.26, speed: 20, seed: 981 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.82, dry: 0.68, seed: 983, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.3, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.zhangfei(c, lerp(1180, 1020, ap), 954, lerp(1.3, 1.95, ap), t, { raise: 0, spear: 0, flip: 1 });
    c.restore();
    // 短刃之影
    c.save(); c.globalAlpha = clamp(ss(1.2, 2.4, lt) * 0.6);
    brush(c, [[920, 860], [960, 780]], { w: 5, col: [180, 176, 168], tone: 0.9, dry: 0.2, seed: 984 });
    c.restore();
    Z.seal(c, 1762, 952, '阆中', ss(1.0, 1.28, lt), { size: 88, seed: 35 });
  } };
})();

// ⑧ 万人之敌：余威在山川之间
SCENES['zf8_wangren'] = (() => {
  const p = () => Z.paper('zf8', '#ddd4bd');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'zf8_bg', 0.2 + 0.8 * grow, (g) => {
      g.fillStyle = 'rgba(36,34,34,.22)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 175, tone: 0.3, seed: 221.3 }]);
    }, { blur: 5, halo: 28, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 991 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 993, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 立矛于地（无人，余威）
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.6, lt) * 0.8);
    Z.shemao(c, 1220, 946, 0.06, 470, t);
    c.restore();
    const ap = ease.out(ss(0.6, 1.8, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.7);
    Z.zhangfei(c, lerp(700, 860, ap), 956, lerp(1.3, 1.8, ap), t, { raise: 0, spear: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '万人敌', ss(1.2, 1.48, lt), { size: 88, seed: 36 });
  } };
})();
})();
