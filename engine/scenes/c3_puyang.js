// ③ 濮阳火：宫与张邈叛操迎布，据濮阳。布骑冲阵，城中火起，操坠马焚掌，几不能免。
// 主动作：城头火起（0.3→2.2s 自左向右）→ 宫立于城上挥袖指麾（1.2→2.4s）→ 布骑冲突（原地奔驰）
// 母题循环：火焰、烟、尘、夜色。
SCENES['c3_puyang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq3', '#e7dfc9');

  const fire = (c, x, y, s, t, seed = 1, k = 1) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.save(); c.globalCompositeOperation = 'lighter';
    const g = c.createRadialGradient(0, -30, 4, 0, -30, 150);
    g.addColorStop(0, `rgba(255,180,86,${0.5 * k})`); g.addColorStop(1, 'rgba(255,140,60,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, -30, 150, 0, Math.PI * 2); c.fill();
    c.restore();
    for (let j = 0; j < 5; j++) {
      const f = (Math.sin(t * 5.6 + j * 1.9 + seed) * 0.5 + 0.5) * k;
      const h = (50 + f * 76);
      brush(c, [[j * 12 - 24, 0], [j * 12 - 20 + Math.sin(t * 3 + j) * 8, -h * 0.55], [j * 12 - 14 + Math.sin(t * 4.2 + j) * 14, -h]],
        { w: (14 - j * 1.6) * (0.4 + k * 0.6), col: [236, 122 + f * 92, 42], tone: 0.95, dry: 0.6, seed: seed * 9 + j, tail: 0.9, bristles: 3 });
    }
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'cq3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 460, amp: 122, tone: 0.2, seed: 441.4 }]);
        g.fillStyle = 'rgba(52,56,72,.2)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(88,90,118,.42)'; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.44, speed: 44, seed: 443 });
      brush(c, [[0, 910], [640, 898], [1280, 912], [1920, 896]], { w: 14, tone: 0.76, dry: 0.75, seed: 445, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 15, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 45, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 6, a: 0.3 });

      // 濮阳城墙（居后横贯）
      c.save();
      c.fillStyle = 'rgba(168,150,118,.55)'; c.fillRect(0, 640, 1920, 210);
      c.strokeStyle = 'rgba(58,48,38,.8)'; c.lineWidth = 3.4;
      c.strokeRect(0, 640, 1920, 210);
      for (let x = 40; x < 1920; x += 90) c.strokeRect(x, 604, 46, 36);   // 垛口
      c.restore();

      // 主动作一：城头火起（自左向右蔓延）
      const burn = ss(0.3, 2.2, lt);
      for (let k = 0; k < 5; k++) {
        const on = clamp(burn * 5 - k);
        if (on <= 0) continue;
        fire(c, 200 + k * 320, 700, 1.15, t, 3 + k, on);
      }
      // 烟（火升处）
      c.save(); c.filter = 'blur(12px)';
      for (let k = 0; k < 5; k++) {
        const on = clamp(burn * 5 - k);
        if (on <= 0.05) continue;
        for (let j = 0; j < 3; j++) {
          const ph = ((t * 0.32 + j * 0.33 + k * 0.2) % 1);
          c.fillStyle = `rgba(90,88,84,${0.3 * (1 - ph) * on})`;
          c.beginPath(); c.ellipse(200 + k * 320 + Math.sin(t * 0.9 + j + k) * 30 + ph * 40, 660 - ph * 300, 46 + ph * 110, 34 + ph * 80, 0, 0, Math.PI * 2); c.fill();
        }
      }
      c.filter = 'none'; c.restore();

      // 主动作二：宫立于城头，挥袖指麾
      const raise = ss(1.2, 2.4, lt);
      Z.chenGong(c, 1150, 700, 1.9, { t, raise: raise * 0.55, stance: t * 1.3, flip: 0, sword: 0 });
      // 城头旌旗二面（「吕」）
      Z.flag(c, 950, 560, 130, t, { seed: 447, col: 'rgba(120,60,40,.8)', text: '吕' });
      Z.flag(c, 1420, 566, 110, t, { seed: 449, col: 'rgba(120,60,40,.75)' });

      // 主动作三：布骑冲突（两骑原地奔驰，火光映照）
      c.save(); c.globalAlpha = 0.92;
      Z.rider(c, 300, 936, 1.7, t * 8, { spearAng: -0.45, spearLen: 330, hold: 0, cape: 1, backFlag: 0, t, flip: 0 });
      Z.rider(c, 620, 924, 1.5, t * 8 + 2.2, { spearAng: -0.4, spearLen: 300, hold: 0, cape: 1, backFlag: 0, t, flip: 0 });
      c.restore();
      Z.dust(c, t, { x: 900, y: 940, n: 7, seed: 451, scale: 1.5, alpha: 0.3 });

      Z.bigText(c, '濮阳火起', { x: 1060, y: 268, size: 78, gap: 18, appear: ss(2.0, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '濮阳', ss(2.5, 2.85, lt), { size: 86, seed: 453 });
    },
  };
})();
