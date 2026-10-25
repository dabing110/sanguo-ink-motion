// ① 郿县法正：右扶风郿人，字孝直，建安初入蜀依刘璋，为新都令、军议校尉。
// 主动作：法正执羽扇立论（0.4→2.4s）；母题：远山、松、案几、雁。
SCENES['faz1_meiyang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fz1', '#e8e0c6');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'fz1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 140, tone: 0.20, seed: 12.4 },
          { y0: 548, amp: 96, tone: 0.30, seed: 17.9 },
          { y0: 606, amp: 62, tone: 0.40, seed: 23.3 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 260, y1: 560, n: 4, alpha: 0.5, speed: 60, seed: 3 });
      Z.pine(c, t, { x: 1480, y: 760, s: 1.15, seed: 5 });
      Z.pine(c, t, { x: 320, y: 800, s: 0.9, seed: 8 });
      brush(c, [[0, 820], [480, 800], [980, 820], [1480, 802], [1920, 816]], { w: 16, tone: 0.84, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.35, lt) });
      Z.geese(c, t, { y: 230, x0: 2100, speed: 120, n: 3, seed: 9, scale: 1.0 });
      // 法正 立
      const in_ = ease.out(ss(0, 1.0, lt));
      const x = lerp(360, 760, in_), y = 946, s = lerp(1.4, 2.3, in_);
      const raise = ss(0.4, 2.4, lt);
      c.save(); c.globalAlpha = clamp(in_ * 1.2);
      Z.fazheng(c, x, y, s, { t, raise, fan: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '孝直', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
