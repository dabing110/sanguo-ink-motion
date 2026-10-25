// ④ 定军奇谋：建安二十四年，正献计于定军山，渊军大败，斩夏侯渊。
// 主动作：法正执羽扇指点（0.4→2.4s）→ 敌旗倒（1.6→2.8s）；母题：定军山、倒旗、烽烟。
SCENES['faz4_hanzhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fz4', '#e6dcc2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'fz4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 420, amp: 200, tone: 0.26, seed: 61 },
          { y0: 540, amp: 140, tone: 0.36, seed: 67 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.22 });
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.5, speed: 56, seed: 23 });
      brush(c, [[0, 820], [480, 800], [980, 822], [1480, 802], [1920, 818]], { w: 18, tone: 0.86, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 敌旗倒（夏侯渊败）
      const fall = ss(1.6, 2.8, lt);
      Z.fallenFlag(c, 1500, 760, fall, t, { seed: 4, col: 'rgba(150,50,44,.82)' });
      // 烽烟
      c.save(); c.globalAlpha = 0.5 + 0.2 * Math.sin(t * 2);
      brush(c, [[1450, 740], [1470, 600]], { w: 26, tone: 0.25, dry: 0.85, seed: 71, tail: 0.9, bristles: 5 });
      c.restore();
      // 法正 执羽扇指点（立于高坡）
      const ap = ease.out(ss(0, 1.2, lt));
      const x = 720, y = 900, s = lerp(1.4, 2.2, ap);
      const raise = ss(0.4, 2.4, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.fazheng(c, x, y, s, { t, raise, fan: 1, flip: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '孝直', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
