// ② 逐虎过涧：尝逐虎过涧，夏侯惇见而异之，荐于太祖。
// 主动作：猛虎自右跃过涧（0.2→1.6s）→ 典韦持戟追至涧边、一跃而过（1.3→2.7s）；母题循环：涧水、林风、惊雀。
SCENES['w2_zhuhu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw2', '#ece6d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'dw2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 400, amp: 226, tone: 0.26, seed: 41.2 },
          { y0: 540, amp: 160, tone: 0.38, seed: 46.7 },
          { y0: 620, amp: 96, tone: 0.48, seed: 51.3 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.26 });
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.62, speed: 52, seed: 22 });
      // 涧（画面中间一道，两岸夹着）
      brush(c, [[0, 806], [560, 792], [1080, 812], [1920, 796]], { w: 14, tone: 0.8, dry: 0.7, seed: 61, head: 0.03, tail: 0.3, reveal: ss(0, 0.32, lt) });
      Z.water(c, t, { y0: 860, y1: 1030, tone: 0.34, seed: 29, rows: 5 });
      // 两岸崖石
      brush(c, [[-20, 856], [180, 826], [340, 856]], { w: 16, tone: 0.86, dry: 0.6, seed: 62, head: 0.08, tail: 0.2 });
      brush(c, [[1600, 852], [1800, 820], [1940, 854]], { w: 16, tone: 0.86, dry: 0.6, seed: 63, head: 0.08, tail: 0.2 });
      // 惊雀（循环：虎过而鸟起）
      Z.geese(c, t, { y: 232, x0: 2100, speed: 205, n: 4, seed: 33, scale: 0.85 });
      // 林（循环二：两株松，风里摇）
      Z.pine(c, t, { x: 300, y: 812, s: 1.15, seed: 13, tone: 0.86 });
      Z.pine(c, t, { x: 1520, y: 806, s: 0.95, seed: 14, tone: 0.8 });
      // 主动作一：猛虎跃涧（右 → 左）
      const leap = ease.inOut(ss(0.2, 1.6, lt));
      const tx = lerp(1760, 700, leap);
      const ty = 900 - Math.sin(leap * Math.PI) * 130;                  // 抛物线
      c.save(); c.globalAlpha = 1 - ss(2.6, 2.95, lt) * 0.85;
      Z.tiger(c, tx, ty, 1.28, t * 7, { flip: 1, tone: 0.88 });
      c.restore();
      // 落地扬尘
      if (leap > 0.85) Z.dust(c, t, { x: tx + 60, y: 912, n: 6, seed: 71, scale: 1.3, alpha: 0.45 * (1 - leap) });
      // 主动作二：典韦追至，跃过
      const chase = ease.inOut(ss(0.9, 2.5, lt));
      const wx = lerp(240, 1080, chase);
      const wy = 900 - Math.sin(ss(1.3, 2.5, lt) * Math.PI) * 96;
      Z.dianWei(c, wx, wy, 2.05, { t, jiAng: lerp(-0.5, -0.16, chase), raise: ss(1.6, 2.2, lt), stance: 0, flip: 0, cape: 0 });
      if (chase > 0.3) Z.dust(c, t, { x: wx - 90, y: 912, n: 6, seed: 72, scale: 1.2, alpha: 0.4 * (1 - chase) });
      Z.seal(c, 1762, 946, '逐虎', ss(2.2, 2.5, lt), { size: 88, seed: 52 });
    },
  };
})();
