// ① 谯国许褚：谯国山水间，巨汉许褚举刀定型。
// 主动作：由远及近 → 立定举刀（0.6→2.2s）；母题循环：云气、坡草、雁阵。
SCENES['xuch1_qiao'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xc_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xc1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 452, amp: 168, tone: 0.20, seed: 12.4 },
          { y0: 528, amp: 116, tone: 0.30, seed: 17.9 },
          { y0: 596, amp: 74, tone: 0.40, seed: 23.3 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 240, y1: 560, n: 4, alpha: 0.5, speed: 60, seed: 3 });
      brush(c, [[0, 786], [460, 754], [980, 780], [1480, 748], [1920, 772]], { w: 18, tone: 0.86, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.35, lt) });
      brush(c, [[140, 852], [620, 828], [1120, 846], [1640, 822], [1900, 840]], { w: 8, tone: 0.5, dry: 0.85, seed: 12, reveal: ss(0.1, 0.45, lt) });
      const r = rng(77);
      for (let i = 0; i < 30; i++) {
        const x = r() * W, y = 770 + r() * 230, sw = Math.sin(t * 2.6 + i) * 11;
        brush(c, [[x, y], [x + sw * 0.4, y - 24 - r() * 18], [x + sw, y - 42 - r() * 24]], { w: 2.6, tone: 0.62, dry: 0.7, seed: 100 + i, tail: 0.75, bristles: 3 });
      }
      Z.geese(c, t, { y: 214, x0: 2100, speed: 132, n: 3, seed: 9, scale: 1.05 });
      const in_ = ease.out(ss(0, 1.3, lt));
      const x = lerp(1560, 900, in_), y = 880, s = lerp(0.8, 1.85, in_);
      const raise = ss(0.6, 2.2, lt);
      Z.xuchu(c, x, y, s, t, { raise });
      if (in_ > 0.05 && in_ < 0.5) Z.dust(c, t, { x: x + 120, y: y - 10, n: 6, seed: 6, scale: 1.4, alpha: 0.4 * (0.5 - in_) * 2 });
      Z.seal(c, 1762, 952, '仲康', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
