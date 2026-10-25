// ③ 定蜀：内外相助，先主取益州，赐爵关内侯，后为蜀郡太守。
// 主动作：法正立受（0.4→2.4s）→ 城下立威（2.0→3.4s）；母题：蜀城、旗、松。
SCENES['faz3_chengdu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fz3', '#e9e2cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'fz3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2050, [{ y0: 430, amp: 150, tone: 0.22, seed: 51 }]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 280, y1: 560, n: 4, alpha: 0.5, speed: 50, seed: 13 });
      Z.pine(c, t, { x: 320, y: 820, s: 1.0, seed: 4 });
      // 蜀城垣
      Z.wall(c, 1480, 880, 1.1, t, { flag: 1 });
      brush(c, [[0, 860], [480, 840], [980, 860], [1480, 842], [1920, 856]], { w: 16, tone: 0.84, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 法正 立受
      const ap = ease.out(ss(0, 2.4, lt));
      const x = lerp(200, 820, ap), y = 946, s = lerp(1.0, 2.2, ap);
      const raise = ss(0.8, 2.4, lt);
      c.save(); c.globalAlpha = clamp(0.3 + 0.7 * ap);
      Z.fazheng(c, x, y, s, { t, raise, fan: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '孝直', ss(1.0, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
