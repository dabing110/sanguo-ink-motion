// ③ 焚屯三十：官渡之役，禁与乐进等将步骑五千，击绍别营于延津西南，焚堡三十余屯，斩首获生各数千。
// 主动作：河营起火、自左向右蔓延（0.3→2.3s）→ 铁骑出阵（1.4→2.4s）→ 于禁横刀督阵（1.9→3.3s）
// 母题循环：河水、烟焰、骑兵（马上循环不必平移）、尘。
SCENES['y3_raotun'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj3', '#e9e2cb');

  // 一座屯堡（campsite: 帐+栅+旗）
  const tun = (c, x, y, s, t, o = {}) => {
    const { burn = 0, seed = 10, flag = 1 } = o;
    c.save(); c.translate(x, y); c.scale(s, s);
    // 栅
    for (let k = -2; k <= 2; k++) brush(c, [[k * 34, 0], [k * 34 + 2, -62]], { w: 7, tone: 0.82, dry: 0.5, seed: seed + k });
    brush(c, [[-78, -44], [78, -46]], { w: 6, tone: 0.78, dry: 0.6, seed: seed + 6 });
    // 帐
    c.fillStyle = 'rgba(214,202,172,.72)';
    c.beginPath(); c.moveTo(-58, -46); c.quadraticCurveTo(0, -138, 58, -46); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(46,40,30,.85)'; c.lineWidth = 2.6; c.stroke();
    if (flag) brush(c, [[0, -120], [2, -196]], { w: 5, tone: 0.85, dry: 0.4, seed: seed + 7 });
    if (burn > 0) {                       // 火焰（多股，随时间窜）
      c.save(); c.globalCompositeOperation = 'lighter';
      const g = c.createRadialGradient(0, -80, 4, 0, -80, 170);
      g.addColorStop(0, `rgba(255,176,84,${0.5 * burn})`); g.addColorStop(1, 'rgba(255,140,60,0)');
      c.fillStyle = g; c.beginPath(); c.arc(0, -80, 170, 0, Math.PI * 2); c.fill();
      c.restore();
      for (let k = 0; k < 4; k++) {
        const f = Math.sin(t * 6.1 + k * 2.1 + seed) * 0.5 + 0.5;
        const h = (54 + f * 76) * burn;
        brush(c, [[k * 14 - 22, -44], [k * 14 - 18 + Math.sin(t * 3.4 + k) * 9, -44 - h * 0.55], [k * 14 - 12 + Math.sin(t * 4.6 + k) * 15, -44 - h]],
          { w: (13 - k * 1.6) * (0.6 + burn * 0.4), col: [236, 120 + f * 92, 42], tone: 0.95, dry: 0.6, seed: seed * 3 + k, tail: 0.9, bristles: 3 });
      }
    }
    c.restore();
  };
  const smokeUp = (c, x, y, t, seed = 1, alpha = 0.28) => {
    c.save(); c.filter = 'blur(12px)';
    for (let k = 0; k < 4; k++) {
      const ph = (t * 0.36 + k * 0.25 + seed * 0.13) % 1;
      c.fillStyle = `rgba(112,108,100,${alpha * (1 - ph)})`;
      c.beginPath(); c.ellipse(x + Math.sin(t * 0.8 + k) * 30 + ph * 50, y - ph * 340, 52 + ph * 130, 38 + ph * 90, 0, 0, Math.PI * 2); c.fill();
    }
    c.filter = 'none'; c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.0, lt);
      Z.wash(c, 'yj3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 424, amp: 150, tone: 0.2, seed: 66.4 },
          { y0: 520, amp: 96, tone: 0.3, seed: 69.8 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 300, y1: 620, n: 4, alpha: 0.5, speed: 50, seed: 63 });
      // 黄河（延津渡一带）
      Z.water(c, t, { y0: 596, y1: 760, tone: 0.3, seed: 66, rows: 8 });
      // 岸
      c.fillStyle = 'rgba(226,214,184,.62)';
      c.beginPath(); c.moveTo(0, 782);
      for (let x = 0; x <= 1920; x += 60) c.lineTo(x, 776 + Math.sin(x * 0.01) * 6);
      c.lineTo(1920, 1080); c.lineTo(0, 1080); c.closePath(); c.fill();
      brush(c, [[0, 786], [640, 778], [1280, 788], [1920, 776]], { w: 12, tone: 0.8, dry: 0.7, seed: 68, head: 0.03, tail: 0.3, reveal: ss(0, 0.35, lt) });

      // 三十余屯：一排七座，火自左向右蔓延
      const burn = ss(0.3, 2.3, lt);
      for (let k = 0; k < 7; k++) {
        const bx = 300 + k * 220;
        const on = clamp(burn * 7 - k * 0.85);
        c.save(); c.globalAlpha = 0.95;
        tun(c, bx, 858 + (k % 2) * 8, 0.95, t, { burn: on, seed: 200 + k * 5, flag: k % 2 === 0 });
        c.restore();
        if (on > 0.05) smokeUp(c, bx, 800, t, 2 + k, 0.26 * on);
      }

      // 铁骑出阵（两骑原地奔驰，避免大平移）
      c.save(); c.globalAlpha = 0.92;
      Z.rider(c, 250, 936, 1.5, t * 8, { spearAng: -0.5, spearLen: 300, hold: 0, cape: 1, backFlag: 0, t, flip: 0 });
      Z.rider(c, 470, 924, 1.35, t * 8 + 2.1, { spearAng: -0.4, spearLen: 280, hold: 0, cape: 1, backFlag: 0, t, flip: 0 });
      c.restore();

      // 于禁督阵于右前
      const set = ss(1.9, 3.3, lt);
      Z.yuJin(c, 1490, 1000, 2.5, { t, jiAng: lerp(-0.3, -1.0, set), raise: set * 0.3, stance: t * 1.2, flip: 0, old: 0, sword: 0 });
      Z.flag(c, 1490, 720, 240, t, { seed: 75, col: 'rgba(178,44,36,.84)', text: '于' });
      Z.dust(c, t, { x: 1560, y: 1000, n: 8, seed: 82, scale: 1.5, alpha: 0.3 });
      Z.seal(c, 250, 952, '焚屯', ss(2.9, 3.25, lt), { size: 86, seed: 87 });
    },
  };
})();
