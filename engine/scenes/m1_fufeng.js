// ① 扶风孟起：马腾之子，将门出身，羌胡畏服的"锦马超"。
// 主动作：少年马超由远及近纵马而来 → 勒马立定亮相（0.9→2.1s）；母题循环：西凉风沙、鹰掠长空、帐前坡草。
SCENES['m1_fufeng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc1', '#eee5cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      // 西凉黄土高原（三层，比江南的湿墨干得多）
      Z.wash(c, 'mc1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 452, amp: 168, tone: 0.20, seed: 12.4 },
          { y0: 528, amp: 116, tone: 0.30, seed: 17.9 },
          { y0: 596, amp: 74, tone: 0.40, seed: 23.3 },
        ]);
        // 穹庐两座（羌胡）
        Z.yurt(g, 300, 566, 0.72, { tone: 0.44, seed: 1 });
        Z.yurt(g, 452, 578, 0.58, { tone: 0.36, seed: 2 });
      }, { blur: 3, halo: 16, haloA: 0.24 });
      // 风沙（循环一）
      Z.sand(c, t, { y0: 300, y1: 700, n: 5, alpha: 0.3, speed: 165, seed: 5 });
      // 前景塬地：三笔干墨
      brush(c, [[0, 786], [460, 754], [980, 780], [1480, 748], [1920, 772]], { w: 18, tone: 0.86, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.35, lt) });
      brush(c, [[140, 852], [620, 828], [1120, 846], [1640, 822], [1900, 840]], { w: 8, tone: 0.5, dry: 0.85, seed: 12, reveal: ss(0.1, 0.45, lt) });
      // 芨芨草（循环二：风里齐摆）
      const r = rng(77);
      for (let i = 0; i < 30; i++) {
        const x = r() * W, y = 770 + r() * 230, sw = Math.sin(t * 2.6 + i) * 11;
        brush(c, [[x, y], [x + sw * 0.4, y - 24 - r() * 18], [x + sw, y - 42 - r() * 24]], { w: 2.6, tone: 0.62, dry: 0.7, seed: 100 + i, tail: 0.75, bristles: 3 });
      }
      // 鹰（循环三：比雁更孤更高）
      Z.geese(c, t, { y: 214, x0: 2100, speed: 132, n: 3, seed: 9, scale: 1.05 });
      // 主动作：由远及近 → 勒马亮相
      const ride = ease.out(ss(0.15, 1.5, lt));
      const halt = ss(0.9, 2.1, lt);                       // 勒马：奔 → 立
      const x = lerp(1560, 880, ride), y = lerp(692, 872, ride);
      const s = lerp(0.78, 2.05, ride);
      const ph = t * 9 + halt * 1.2;
      Z.horse(c, x, y, s, ph, { gallop: clamp(1 - halt * 1.4), flip: 1, tone: 0.9 });
      Z.mChao(c, x, y, s, ph, { flip: 1, spearAng: -0.5 - halt * 0.15, cape: 1, backFlag: 1 });
      // 勒马扬尘（马蹄刹住那一下）
      if (halt > 0 && halt < 1) {
        Z.dust(c, t, { x: x + 120, y: y - 10, n: 6, seed: 6, scale: 1.3, alpha: 0.42 * (1 - halt) });
      }
      Z.seal(c, 1762, 952, '孟起', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
