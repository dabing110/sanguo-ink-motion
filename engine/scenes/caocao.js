// 《曹操》笔法与八幕：魏武 —— 玄黑王袍＋高冠＋短须＋佩剑（倚天）。
// 视觉辨识：深玄墨袍、高冠、短髯、腰悬长剑、常伴案与印（权臣之征，非武将重甲）。
(() => {
const W = 1920, H = 1080;
const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
const Z = window.Z;

// 长剑（倚天：直刃＋剑格＋剑穗）
Z.longsword = (c, x, y, ang, len = 300, t = 0, o = {}) => {
  // 剑尖不出画：len 由可用高度反算，人物放大后剑不再顶穿画框
  len = Math.min(len, (y - 84) / Math.max(Math.cos(ang), 0.45) - 40);
  c.save(); c.translate(x, y); c.rotate(ang);
  brush(c, [[0, 0], [0, 60]], { w: 11, col: [96, 68, 40], tone: 0.9, dry: 0.3, seed: 6101 });
  c.fillStyle = 'rgba(204,210,216,.92)'; c.strokeStyle = 'rgba(26,28,30,.9)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-9, 0); c.lineTo(9, 0); c.lineTo(6, -len); c.lineTo(0, -len - 26); c.lineTo(-6, -len); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(70,74,80,.55)'; c.lineWidth = 1.4;
  c.beginPath(); c.moveTo(0, -8); c.lineTo(0, -len + 8); c.stroke();
  c.fillStyle = 'rgba(168,132,60,.95)'; c.fillRect(-18, -4, 36, 8);
  brush(c, [[0, 60], [-6, 96]], { w: 4, col: [166, 52, 44], tone: 0.88, dry: 0.3, seed: 6102 });
  c.restore();
};

// 曹操：孟德（o: { t, raise, flip, sword, cloak })
Z.caocao = (c, x, y, s, t, o = {}) => {
  const { raise = 0, flip = 0, sword = 1 } = o;
  const br = Math.sin(t * 1.05) * 0.008;
  c.save(); c.translate(x, y); c.scale(flip ? -s : s, s); c.rotate(br * 0.35);
  const hem = Math.sin(t * 1.3) * 5;
  // 腿
  brush(c, [[-16, -74], [-24, -34], [-30, 4]], { w: 18, tone: 0.84, dry: 0.5, seed: 6201, head: 0.06, tail: 0.2 });
  brush(c, [[16, -74], [24, -34], [30, 4]], { w: 18, tone: 0.84, dry: 0.5, seed: 6202, head: 0.06, tail: 0.2 });
  // 玄黑王袍
  c.fillStyle = 'rgba(34,32,40,.8)';
  c.beginPath();
  c.moveTo(-32, -168); c.quadraticCurveTo(-58, -86, -64 + hem, -2);
  c.quadraticCurveTo(0, 6 + hem * 0.3, 64 + hem * 0.7, -2); c.quadraticCurveTo(58, -88, 32, -168);
  c.closePath(); c.fill();
  c.strokeStyle = 'rgba(8,8,10,.92)'; c.lineWidth = 3; c.stroke();
  // 衣缘暗纹
  c.strokeStyle = 'rgba(146,118,64,.42)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(-30, -166); c.quadraticCurveTo(-52, -88, -58, -10); c.stroke();
  c.beginPath(); c.moveTo(30, -166); c.quadraticCurveTo(52, -88, 58, -10); c.stroke();
  // 玉带
  brush(c, [[-34, -120], [0, -116], [34, -120]], { w: 12, col: [64, 92, 88], tone: 0.85, dry: 0.3, seed: 6231 });
  // 头（短髯，锐目）
  c.save(); c.translate(2, -188);
  c.fillStyle = 'rgba(238,224,204,.96)';
  c.beginPath(); c.ellipse(0, 0, 16.5, 19, 0, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(22,18,16,.9)'; c.lineWidth = 2.2; c.stroke();
  // 高冠（进贤冠）
  c.fillStyle = 'rgba(24,22,26,.96)';
  c.beginPath(); c.moveTo(-19, 1); c.lineTo(-13, -22); c.lineTo(3, -30); c.lineTo(17, -18); c.lineTo(19, 1);
  c.quadraticCurveTo(0, -8, -19, 1); c.closePath(); c.fill();
  c.fillStyle = 'rgba(150,120,64,.9)'; c.fillRect(-19, -2, 38, 5);
  // 目（细锐）
  c.fillStyle = 'rgba(252,248,240,.95)'; c.beginPath(); c.ellipse(6, -2, 4.6, 2.6, -0.1, 0, Math.PI * 2); c.fill();
  c.fillStyle = 'rgba(16,14,12,.95)'; c.beginPath(); c.arc(7.4, -2, 2.1, 0, Math.PI * 2); c.fill();
  c.strokeStyle = 'rgba(20,16,14,.85)'; c.lineWidth = 1.8;
  c.beginPath(); c.moveTo(1, -6); c.quadraticCurveTo(7, -8.5, 13, -6); c.stroke();
  // 短髯
  const wf = Math.sin(t * 1.5) * 2;
  c.strokeStyle = 'rgba(42,36,32,.92)'; c.lineWidth = 3; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-7, 9); c.quadraticCurveTo(-2, 22 + wf * 0.3, 6, 14 + wf); c.stroke();
  c.beginPath(); c.moveTo(-11, 5); c.quadraticCurveTo(-13, 16, -9, 22); c.stroke();
  c.beginPath(); c.moveTo(10, 5); c.quadraticCurveTo(12, 16, 8, 22); c.stroke();
  c.restore();
  // 双臂：左臂自然下垂（原来与右臂同高，在深袍上连成一根横杠），右臂外伸执剑
  const rl = ease.out(clamp(raise));
  brush(c, [[-30, -148], [-50 - 4 * rl, -124 - 10 * rl], [-56 - 8 * rl, -92 - 22 * rl]], { w: 13, tone: 0.5, dry: 0.45, seed: 6203, head: 0.1, tail: 0.2 });
  brush(c, [[30, -148], [56, -134], [78, -110]], { w: 12, tone: 0.5, dry: 0.45, seed: 6204, head: 0.1, tail: 0.2 });
  c.restore();
  if (sword) {
    // 剑挂在手侧、近乎竖直：原来 0.7rad 斜角从腰侧穿出，读作"剑把身体扎穿了"
    Z.longsword(c, x + (flip ? -78 : 78) * s, y - 106 * s, flip ? -0.26 : 0.26, 300 * s, t);
  }
};

// ① 洛阳北部尉：五色棒立，不避豪强
SCENES['cc1_xiaowei'] = (() => {
  const p = () => Z.paper('cc1', '#e7dfc9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'cc1_bg', 0.45 + 0.55 * grow, (g) => {
      g.fillStyle = 'rgba(78,68,54,.1)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 470, amp: 96, tone: 0.16, seed: 231.2 }]);
    }, { blur: 3.6, halo: 15, haloA: 0.22 });
    Z.mist(c, t, { y0: 460, y1: 700, n: 3, alpha: 0.3, speed: 26, seed: 1001 });
    brush(c, [[0, 950], [660, 942], [1320, 954], [1920, 940]], { w: 13, tone: 0.76, dry: 0.74, seed: 1003, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 五色棒架：立柱＋上下横枨＋挂钩＋收尖棒身＋缠绳。原来只是五根彩色竖条悬空，读不出"棒"
    c.save(); c.globalAlpha = clamp(ss(0.4, 1.4, lt) * 0.92);
    const rx0 = 1216, rx1 = 1500, ryT = 668, ryB = 944;
    c.fillStyle = 'rgba(70,58,42,.15)';
    c.beginPath(); c.ellipse((rx0 + rx1) / 2 + 6, ryB + 10, (rx1 - rx0) / 2 + 26, 13, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(112,80,46,.95)'; c.strokeStyle = 'rgba(44,28,14,.8)'; c.lineWidth = 2;
    c.fillRect(rx0, ryT, 15, ryB - ryT); c.strokeRect(rx0, ryT, 15, ryB - ryT);
    c.fillRect(rx1, ryT, 15, ryB - ryT); c.strokeRect(rx1, ryT, 15, ryB - ryT);
    c.fillStyle = 'rgba(126,92,54,.96)';
    c.fillRect(rx0 - 13, ryT - 15, (rx1 - rx0) + 41, 15); c.strokeRect(rx0 - 13, ryT - 15, (rx1 - rx0) + 41, 15);
    c.fillRect(rx0 - 13, ryB - 7, (rx1 - rx0) + 41, 13); c.strokeRect(rx0 - 13, ryB - 7, (rx1 - rx0) + 41, 13);
    const cols = ['rgba(152,44,36,.95)', 'rgba(52,82,58,.95)', 'rgba(38,44,62,.95)', 'rgba(168,132,54,.95)', 'rgba(96,58,42,.95)'];
    for (let i = 0; i < 5; i++) {
      const bx = rx0 + 30 + i * 54, bTop = ryT + 14, bBot = ryB - 30, bw = 20;
      c.strokeStyle = 'rgba(44,30,18,.85)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(bx + bw / 2, ryT - 2); c.lineTo(bx + bw / 2, bTop + 3); c.stroke();
      c.fillStyle = cols[i]; c.strokeStyle = 'rgba(22,16,10,.85)'; c.lineWidth = 2;
      c.beginPath();
      c.moveTo(bx, bTop); c.lineTo(bx + bw, bTop);
      c.lineTo(bx + bw - 3, bBot - 10); c.quadraticCurveTo(bx + bw / 2, bBot + 5, bx + 3, bBot - 10);
      c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(242,232,208,.5)'; c.lineWidth = 2.2;
      c.beginPath(); c.moveTo(bx + 1, bTop + 26); c.lineTo(bx + bw - 1, bTop + 26); c.stroke();
      c.beginPath(); c.moveTo(bx + 2, bBot - 42); c.lineTo(bx + bw - 2, bBot - 42); c.stroke();
    }
    c.restore();
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.caocao(c, lerp(420, 800, ap), 950, lerp(1.3, 2.05, ap), t, { raise: 0.4, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '孟德', ss(1.0, 1.28, lt), { size: 88, seed: 37 });
  } };
})();

// ② 陈留起兵：散家财，合义兵
SCENES['cc2_chenliu'] = (() => {
  const p = () => Z.paper('cc2', '#e5dcc4');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'cc2_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(66,56,46,.14)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 130, tone: 0.22, seed: 241.5 }]);
    }, { blur: 4.2, halo: 20, haloA: 0.26 });
    Z.mist(c, t, { y0: 500, y1: 760, n: 3, alpha: 0.28, speed: 30, seed: 1011 });
    brush(c, [[0, 954], [640, 946], [1320, 958], [1920, 944]], { w: 14, tone: 0.78, dry: 0.72, seed: 1013, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 义兵旗列
    for (let i = 0; i < 3; i++) {
      c.save(); c.globalAlpha = clamp(ss(0.3 + i * 0.1, 1.3 + i * 0.1, lt) * 0.7);
      Z.flag(c, 1160 + i * 130, 900 - i * 20, 260 - i * 20, t, { col: 'rgba(52,56,68,.75)', seed: 11 + i });
      c.restore();
    }
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.caocao(c, lerp(400, 760, ap), 952, lerp(1.3, 2.05, ap), t, { raise: 0.85, sword: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '义兵', ss(1.0, 1.28, lt), { size: 88, seed: 38 });
  } };
})();

// ③ 官渡焚粮：乌巢一炬，胜负立分
SCENES['cc3_guandu'] = (() => {
  const p = () => Z.paper('cc3', '#ded4bb');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'cc3_bg', 0.26 + 0.74 * grow, (g) => {
      g.fillStyle = 'rgba(50,36,30,.24)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2020, [{ y0: 430, amp: 150, tone: 0.3, seed: 251.9 }]);
    }, { blur: 4.8, halo: 26, haloA: 0.32 });
    // 粮囤与火
    c.save(); c.globalAlpha = clamp(ss(0.2, 1.6, lt) * 0.7);
    for (let i = 0; i < 4; i++) {
      const bx = 1120 + i * 130;
      c.fillStyle = 'rgba(150,124,82,.6)';
      c.beginPath(); c.moveTo(bx - 46, 900); c.lineTo(bx - 34, 800); c.lineTo(bx + 34, 800); c.lineTo(bx + 46, 900); c.closePath(); c.fill();
    }
    for (let i = 0; i < 6; i++) {
      const fx = 1140 + i * 90, fh = 160 + Math.sin(t * 2.4 + i) * 50;
      c.fillStyle = 'rgba(190,80,40,.32)';
      c.beginPath(); c.moveTo(fx - 34, 880); c.quadraticCurveTo(fx - 8, 880 - fh, fx, 880 - fh * 1.2);
      c.quadraticCurveTo(fx + 10, 880 - fh, fx + 34, 880); c.closePath(); c.fill();
    }
    c.restore();
    Z.mist(c, t, { y0: 560, y1: 840, n: 4, alpha: 0.26, speed: 24, seed: 1021 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1023, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.1);
    Z.caocao(c, lerp(420, 800, ap), 952, lerp(1.25, 2.0, ap), t, { raise: 0.7, sword: 0, flip: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '官渡', ss(1.0, 1.28, lt), { size: 88, seed: 39 });
  } };
})();

// ④ 赤壁折戟：连舟遇火，北还
SCENES['cc4_chibi'] = (() => {
  const p = () => Z.paper('cc4', '#dad0b8');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'cc4_bg', 0.22 + 0.78 * grow, (g) => {
      g.fillStyle = 'rgba(46,38,36,.26)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 420, amp: 160, tone: 0.32, seed: 261.3 }]);
    }, { blur: 5, halo: 28, haloA: 0.34 });
    Z.water(c, t, { y0: 720, y1: 1060, tone: 0.44, seed: 41, rows: 7 });
    // 火船
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.8, lt) * 0.6);
    for (let i = 0; i < 4; i++) {
      const fx = 1180 + i * 140, fh = 150 + Math.sin(t * 2.1 + i) * 44;
      c.fillStyle = 'rgba(192,76,38,.3)';
      c.beginPath(); c.moveTo(fx - 30, 820); c.quadraticCurveTo(fx - 6, 820 - fh, fx, 820 - fh * 1.2);
      c.quadraticCurveTo(fx + 8, 820 - fh, fx + 30, 820); c.closePath(); c.fill();
      c.fillStyle = 'rgba(40,34,30,.7)'; c.fillRect(fx - 40, 830, 80, 14);
    }
    c.restore();
    brush(c, [[0, 900], [500, 884], [980, 906], [1300, 890]], { w: 16, tone: 0.7, dry: 0.6, seed: 1033 });
    const ap = ease.out(ss(0.2, 1.3, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.caocao(c, lerp(400, 720, ap), 700, lerp(1.15, 1.7, ap), t, { raise: 0.3, sword: 1, flip: 1 });
    c.restore();
    Z.seal(c, 1762, 952, '赤壁', ss(1.0, 1.28, lt), { size: 88, seed: 40 });
  } };
})();

// ⑤ 割须弃袍：潼关败走，几不免
SCENES['cc5_geshu'] = (() => {
  const p = () => Z.paper('cc5', '#dcd2b9');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.3, lt);
    Z.wash(c, 'cc5_bg', 0.28 + 0.72 * grow, (g) => {
      g.fillStyle = 'rgba(56,44,38,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -50, 2040, [{ y0: 440, amp: 165, tone: 0.28, seed: 271.7 }]);
    }, { blur: 4.6, halo: 24, haloA: 0.3 });
    Z.mist(c, t, { y0: 540, y1: 820, n: 4, alpha: 0.3, speed: 26, seed: 1041 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1043, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    Z.dust(c, t, { x: 700, y: 930, n: 7, seed: 13, scale: 1.6, alpha: 0.34 });
    const ap = ease.out(ss(0.1, 1.2, lt));
    c.save(); c.globalAlpha = clamp(ap);
    Z.caocao(c, lerp(420, 700, ap), 952, lerp(1.25, 1.95, ap), t, { raise: 0.1, sword: 0, flip: 0 });
    c.restore();
    // 追骑之影
    c.save(); c.globalAlpha = clamp(ss(0.9, 2.0, lt) * 0.55);
    brush(c, [[1400, 936], [1490, 906], [1560, 890]], { w: 30, tone: 0.5, dry: 0.6, seed: 1044 });
    c.restore();
    Z.seal(c, 1762, 952, '割须', ss(1.0, 1.28, lt), { size: 88, seed: 41 });
  } };
})();

// ⑥ 魏王加冕：冕旒之下，权倾天下
SCENES['cc6_weiwang'] = (() => {
  const p = () => Z.paper('cc6', '#e6dcc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.2, lt);
    Z.wash(c, 'cc6_bg', 0.4 + 0.6 * grow, (g) => {
      g.fillStyle = 'rgba(70,58,46,.12)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -40, 2000, [{ y0: 460, amp: 110, tone: 0.2, seed: 281.1 }]);
    }, { blur: 4, halo: 18, haloA: 0.24 });
    // 殿柱
    c.save(); c.globalAlpha = clamp(ss(0, 0.8, lt) * 0.85);
    for (let i = 0; i < 2; i++) {
      const cx = 300 + i * 1300;
      c.fillStyle = 'rgba(128,44,38,.65)'; c.fillRect(cx, 240, 46, 710);
      c.fillStyle = 'rgba(168,132,60,.7)'; c.fillRect(cx - 6, 236, 58, 16);
    }
    c.restore();
    Z.mist(c, t, { y0: 520, y1: 780, n: 3, alpha: 0.24, speed: 22, seed: 1051 });
    brush(c, [[0, 952], [660, 944], [1320, 956], [1920, 942]], { w: 13, tone: 0.76, dry: 0.74, seed: 1053, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.2, 1.4, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.15);
    Z.caocao(c, lerp(480, 840, ap), 952, lerp(1.35, 2.15, ap), t, { raise: 0.75, sword: 1 });
    c.restore();
    // 冕旒（十二旒）
    c.save(); c.globalAlpha = clamp(ss(1.0, 1.8, lt) * 0.8);
    c.fillStyle = 'rgba(24,22,26,.9)'; c.fillRect(816, 700, 60, 12);
    for (let i = 0; i < 7; i++) {
      c.strokeStyle = 'rgba(186,158,88,.8)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(820 + i * 8, 712); c.lineTo(820 + i * 8, 712 + 30 + (i % 3) * 8); c.stroke();
    }
    c.restore();
    Z.seal(c, 1762, 952, '魏王', ss(1.0, 1.28, lt), { size: 88, seed: 42 });
  } };
})();

// ⑦ 铜雀遗令：台成而人老，分香卖履
SCENES['cc7_tongque'] = (() => {
  const p = () => Z.paper('cc7', '#ddd3ba');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.4, lt);
    Z.wash(c, 'cc7_bg', 0.3 + 0.7 * grow, (g) => {
      g.fillStyle = 'rgba(48,42,40,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2060, [{ y0: 450, amp: 160, tone: 0.28, seed: 291.5 }]);
    }, { blur: 4.8, halo: 26, haloA: 0.32 });
    // 铜雀台（层台）
    c.save(); c.globalAlpha = clamp(ss(0, 1.0, lt) * 0.7);
    c.fillStyle = 'rgba(110,86,58,.55)';
    c.fillRect(1180, 780, 480, 170); c.fillRect(1240, 660, 360, 120); c.fillRect(1300, 560, 240, 100);
    c.strokeStyle = 'rgba(52,42,32,.8)'; c.lineWidth = 2.6;
    c.strokeRect(1180, 780, 480, 170); c.strokeRect(1240, 660, 360, 120); c.strokeRect(1300, 560, 240, 100);
    c.restore();
    // 灯
    c.save(); c.globalAlpha = clamp(ss(0.6, 1.6, lt) * 0.55);
    for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(206,144,66,.45)'; c.beginPath(); c.arc(1220 + i * 140, 760, 18, 0, Math.PI * 2); c.fill(); }
    c.restore();
    Z.mist(c, t, { y0: 580, y1: 840, n: 4, alpha: 0.3, speed: 20, seed: 1061 });
    brush(c, [[0, 956], [640, 948], [1320, 960], [1920, 946]], { w: 14, tone: 0.8, dry: 0.7, seed: 1063, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    const ap = ease.out(ss(0.4, 1.6, lt));
    c.save(); c.globalAlpha = clamp(ap * 1.05);
    Z.caocao(c, lerp(400, 680, ap), 954, lerp(1.3, 1.95, ap), t, { raise: 0, sword: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '铜雀', ss(1.2, 1.48, lt), { size: 88, seed: 43 });
  } };
})();

// ⑧ 治世能臣：书简长卷，任人评说
SCENES['cc8_nengchen'] = (() => {
  const p = () => Z.paper('cc8', '#e4dbc2');
  return { draw(c, lt, t) {
    c.drawImage(p(), 0, 0);
    const grow = ss(0, 1.5, lt);
    Z.wash(c, 'cc8_bg', 0.24 + 0.76 * grow, (g) => {
      g.fillStyle = 'rgba(38,36,38,.2)'; g.fillRect(0, 0, 1920, 1080);
      Z.mountains(c, g, -60, 2080, [{ y0: 460, amp: 170, tone: 0.3, seed: 301.7 }]);
    }, { blur: 5, halo: 28, haloA: 0.34 });
    Z.mist(c, t, { y0: 560, y1: 880, n: 5, alpha: 0.34, speed: 16, seed: 1071 });
    brush(c, [[0, 960], [620, 952], [1300, 964], [1920, 950]], { w: 15, tone: 0.8, dry: 0.7, seed: 1073, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
    // 展卷
    c.save(); c.globalAlpha = clamp(ss(0.3, 1.5, lt) * 0.75);
    c.fillStyle = 'rgba(226,214,186,.9)'; c.fillRect(1020, 830, 520, 60);
    c.strokeStyle = 'rgba(90,70,44,.7)'; c.lineWidth = 2; c.strokeRect(1020, 830, 520, 60);
    c.strokeStyle = 'rgba(70,56,40,.5)'; c.lineWidth = 1.4;
    for (let i = 1; i < 3; i++) { c.beginPath(); c.moveTo(1060, 830 + i * 15); c.lineTo(1500, 830 + i * 15); c.stroke(); }
    c.restore();
    const ap = ease.out(ss(0.4, 1.7, lt));
    c.save(); c.globalAlpha = clamp(ap * 0.95);
    Z.caocao(c, lerp(560, 760, ap), 956, lerp(1.3, 1.9, ap), t, { raise: 0.2, sword: 0 });
    c.restore();
    Z.seal(c, 1762, 952, '评说', ss(1.2, 1.48, lt), { size: 88, seed: 44 });
  } };
})();
})();
