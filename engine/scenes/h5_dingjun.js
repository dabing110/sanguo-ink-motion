// ⑤ 定军山（全片高潮）：法正献计，黄忠「自高鼓噪而下」，一战斩夏侯渊。
// 主动作：老将纵马自山头俯冲而下（1.0→2.9s 一陡降弧线），末了刀光一闪、夏侯渊倒（2.4→3.4s）；
// 母题循环：山雾横流、金光铺坡、鼓声三叠（三圈鼓面波纹自山顶推下）。
SCENES['h5_dingjun'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz5');

  // 曹军将（夏侯渊）：被挑落的一团浓墨
  function enemy(c, x, y, s, fall) {
    c.save(); c.translate(x, y); c.rotate(fall); c.scale(s, s);
    brush(c, [[0, 0], [3, -44], [-2, -86]], { w: 11, tone: 0.62, dry: 0.5, seed: 940 });
    c.fillStyle = 'rgba(34,32,30,.78)'; c.beginPath(); c.arc(1, -94, 9, 0, Math.PI * 2); c.fill();
    brush(c, [[0, -78], [16, -62], [24, -36]], { w: 7, tone: 0.56, dry: 0.5, seed: 941 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      // 金光：定军山这一下是从高处下来的，先给满坡暖光
      c.save();
      const gsun = c.createRadialGradient(1180, 300, 60, 1180, 300, 1500);
      gsun.addColorStop(0, 'rgba(232,178,92,.34)'); gsun.addColorStop(0.5, 'rgba(214,158,80,.14)'); gsun.addColorStop(1, 'rgba(200,150,70,0)');
      c.fillStyle = gsun; c.fillRect(0, 0, W, H); c.restore();
      // 山：一整条斜脊（左高右低，山头在右上，谷底在左下）
      Z.wash(c, 'hz5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -80, 2000, [{ y0: 300, amp: 240, tone: 0.24, seed: 51.7 }]);
        brush(g, [[-80, 620], [420, 500], [980, 452], [1500, 560]], { w: 54, tone: 0.32, dry: 0.5, seed: 57.1, tail: 0.86 });
        brush(g, [[-80, 760], [380, 680], [900, 640], [1420, 720]], { w: 30, tone: 0.42, dry: 0.55, seed: 59.3, tail: 0.9 });
      }, { blur: 4, halo: 22, haloA: 0.3 });
      // 山雾（循环一）：横着往上推
      Z.mist(c, t, { y0: 420, y1: 720, n: 5, alpha: 0.6, speed: 74, seed: 8 });
      // 鼓声三叠（循环二）：三圈鼓面波纹自山顶推下
      for (let k = 0; k < 3; k++) {
        const q = ss(0.3 + k * 0.5, 1.3 + k * 0.5, lt);
        if (q > 0) {
          c.save(); c.globalAlpha = clamp(q) * 0.5 * (1 - q);
          c.strokeStyle = 'rgba(150,60,40,.8)'; c.lineWidth = 3;
          c.beginPath(); c.ellipse(1120, 420, 120 + q * 700, 46 + q * 240, -0.42, 0, Math.PI * 2); c.stroke();
          c.restore();
        }
      }
      // 山头上的法正（献计者）：一点侧影＋一支指向谷底的箭形
      const fa = ss(0.25, 1.0, lt) * (1 - ss(2.4, 2.9, lt));             // 计已献、人先退场，别把引导虚线留在画上
      if (fa > 0.02) {
        c.save(); c.globalAlpha = fa * 0.95;
        // 法正：立于山脊（不是浮在空中的一点），一手指向谷底献计
        brush(c, [[1158, 452], [1168, 396], [1158, 336]], { w: 11, tone: 0.6, dry: 0.5, seed: 930, tail: 0.7 });
        c.fillStyle = 'rgba(36,34,30,.85)'; c.beginPath(); c.arc(1164, 320, 9.5, 0, Math.PI * 2); c.fill();
        brush(c, [[1166, 402], [1116, 476], [1058, 548]], { w: 6, tone: 0.55, dry: 0.5, seed: 931, tail: 0.9, bristles: 3 });
        // 指向谷底的一线（计）：细墨实弧，绝不用 setLineDash（虚线在成片里就是没清干净的动画引导线）
        c.strokeStyle = 'rgba(58,48,38,.42)'; c.lineWidth = 2.4;
        c.beginPath(); c.moveTo(1104, 540); c.quadraticCurveTo(980, 660, 860, 800); c.stroke();
        c.restore();
      }
      // 谷底曹军：几杆黑旗＋一列兵（母题三的靶），夏侯渊在其后
      [[430, 946, 34], [1180, 918, 37], [1500, 962, 39]].forEach(([fx, fy, sd]) => Z.flag(c, fx, fy, 168, t, { seed: sd, col: 'rgba(40,36,44,.62)' }));
      {
        const rr = rng(84);
        for (let i = 0; i < 5; i++) {
          const bx = 430 + i * 260 + rr() * 40, by = 968 + (i % 2) * 18;
          enemy(c, bx, by, 0.95 + (i % 2) * 0.1, 0.12 * Math.sin(t * 2 + i));
        }
      }
      // 夏侯渊：立在谷底偏左（＝老将俯冲后的正前方），这一幕的主靶，后为刀光一闪所斩
      const eFall = ss(2.45, 3.3, lt);
      enemy(c, 520, 900, 1.75 + eFall * 0.14, eFall * 1.35);
      // 老将纵马俯冲：从山头（1120,430）沿陡弧冲到谷中（760,880）
      const dive = ss(0.95, 2.85, lt), d = ease.inOut(dive);
      // 落点(900,838) 在夏侯渊(520,900) 的右后方：老将朝左俯冲，刀光顺势朝左下砍过去，不会砍到自己的马腿
      const dx = lerp(1150, 900, d), dy = lerp(430, 838, Math.pow(d, 1.35));
      const ds = lerp(1.3, 1.78, d);
      // 落定后勒马收势：马头轻抬、尘未散（幕尾不空）
      const settle = ss(2.9, 3.8, lt);
      const dyr = dy - Math.sin(settle * Math.PI) * 30;
      Z.dust(c, t, { x: dx + 120, y: dyr + 30, n: 5, seed: 6, alpha: 0.3 + 0.18 * (1 - settle), scale: 1.3 });
      Z.horse(c, dx, dyr, ds, t * 10, { gallop: settle < 0.8 ? 1 : 0, flip: 1 });
      Z.oldRider(c, dx, dyr, ds, t * 10, { draw: 0, beard: 1, cape: 1, backFlag: 1, flip: 1 });
      // 刀光：从老将手中向左下劈向夏侯渊，落点在敌将身上而不是自己马前腿
      const flash = ss(2.3, 2.75, lt) * (1 - ss(2.75, 3.2, lt));
      if (flash > 0.01) {
        c.save(); c.globalAlpha = clamp(flash * 2);
        const hx = dx - 150, hy = dy - 60;                 // 刀锋起点＝人马之间偏前
        const ex = lerp(hx, 520 + 40, clamp(flash * 3)), ey = lerp(hy, 900 - 60, clamp(flash * 3));
        brush(c, [[hx, hy - 60], [ex, ey - 30], [ex - 60, ey + 40]],
          { w: 12 + flash * 10, col: [255, 252, 240], tone: 0.95, dry: 0.35, seed: 960, tail: 0.9, bristles: 5 });
        c.restore();
      }
      // 斩后：谷底腾起的一团墨（敌军人马溃散）
      const burst = ss(2.7, 3.3, lt) * (1 - ss(3.3, 3.8, lt));
      if (burst > 0.02) {
        c.save(); c.globalAlpha = burst * 0.7;
        for (let i = 0; i < 9; i++) {
          const rr = rng(96);
          const px = 700 + rr() * 260 - 60, py = 800 + rr() * 90;
          c.fillStyle = `rgba(28,26,24,${0.65 * burst})`;
          c.beginPath(); c.ellipse(px, py - burst * 60 * rr(), 12 + rr() * 14, 7 + rr() * 9, rr() * 3, 0, Math.PI * 2); c.fill();
        }
        c.restore();
      }
      // 刀光过后的那一道残痕（缓缓退，幕尾留一口气）
      const trace = ss(2.9, 3.15, lt) * (1 - ss(3.15, 3.85, lt));
      if (trace > 0.02) {
        c.save(); c.globalAlpha = trace * 0.4;
        brush(c, [[760, 780], [600, 830], [520, 856]],
          { w: 4, col: [250, 246, 234], tone: 0.9, dry: 0.7, seed: 991, tail: 0.92, bristles: 2 });
        c.restore();
      }
      Z.seal(c, 1762, 952, '定军', ss(2.0, 2.3, lt), { size: 88, seed: 23 });
    },
  };
})();
