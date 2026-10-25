// ③ 率众归曹：许褚率众归曹操，太祖曰"此吾樊哙也"。
// 主动作：许褚引众前行、举刀（0.4→2.0s）；母题循环：云气、曹字大纛、扬尘。
SCENES['xuch3_guicao'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xc_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xc3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 150, tone: 0.20, seed: 41.1 },
          { y0: 545, amp: 105, tone: 0.30, seed: 37.4 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 230, y1: 540, n: 3, alpha: 0.42, speed: 72, seed: 5 });
      brush(c, [[0, 806], [520, 792], [1040, 812], [1560, 790], [1920, 806]], { w: 16, tone: 0.82, dry: 0.74, seed: 21, head: 0.04, tail: 0.36, reveal: ss(0, 0.4, lt) });
      // 曹字大纛
      const r = ease.out(ss(0.2, 1.2, lt));
      Z.flag(c, 1500, 300 + (1 - r) * 40, 360, t, { col: 'rgba(60,54,46,.9)', text: '曹', seed: 3 });
      // 随众（归曹之众，错落）
      for (let i = 1; i <= 3; i++) {
        const cx = 1220 - i * 150, cy = 884 - i * 6, cs = 1.2 - i * 0.1;
        Z.rider(c, cx, cy, cs, t * 6 + i, { flip: 0, cape: 1, backFlag: 1, spearAng: -0.4, spearLen: 260 });
      }
      // 主动作：许褚引众前行
      const in_ = ease.out(ss(0.2, 1.4, lt));
      const x = lerp(200, 760, in_), y = 880, s = 1.8;
      Z.xuchu(c, x, y, s, t, { raise: 0.3 + in_ * 0.4 });
      if (in_ < 0.95) Z.dust(c, t, { x: x - 130, y: y - 8, n: 8, seed: 8, scale: 1.5, alpha: 0.4 });
      Z.seal(c, 1762, 952, '仲康', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
