// ④ 从征：从征张绣、袁绍，身先士卒，率骑前行。
// 主动作：许褚步立前导、巨刃前指（0.3→2.0s 由左略进）；母题循环：云气、扬尘、身后骑队。
SCENES['xuch4_congzheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xc_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xc4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 150, tone: 0.22, seed: 51.3 },
          { y0: 545, amp: 105, tone: 0.32, seed: 47.2 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 220, y1: 500, n: 3, alpha: 0.4, speed: 86, seed: 6 });
      brush(c, [[0, 808], [520, 792], [1040, 812], [1560, 790], [1920, 806]], { w: 16, tone: 0.82, dry: 0.74, seed: 31, head: 0.04, tail: 0.36, reveal: ss(0, 0.4, lt) });
      // 身后骑队（许褚所率，奔袭向右）
      const cohort = ss(0.1, 1.4, lt);
      for (let i = 1; i <= 3; i++) {
        const cx = lerp(900, 1760, cohort) - (i - 1) * 10;
        const cy = 884 - i * 8, cs = 1.45 - i * 0.1;
        Z.rider(c, cx, cy, cs, t * 9 + i, { flip: 0, cape: 1, backFlag: 1, spearAng: -0.35, spearLen: 300 });
      }
      // 主动作：许褚步立前导、巨刃前指
      const in_ = ease.out(ss(0.2, 1.4, lt));
      const x = lerp(160, 680, in_), y = 882, s = 1.8;
      Z.xuchu(c, x, y, s, t, { raise: 0.3 + in_ * 0.3 });
      if (in_ < 0.95) Z.dust(c, t, { x: x - 140, y: y - 8, n: 9, seed: 8, scale: 1.6, alpha: 0.42 });
      Z.seal(c, 1762, 952, '仲康', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
