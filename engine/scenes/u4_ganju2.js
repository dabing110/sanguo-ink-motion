// ④ 左慈接过刀再剖，果肉饱满，其味甚甜。曹操疑其妖，他只笑而不辩。
SCENES['u4_ganju2'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz4', '#ece6d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'uz4_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 560, amp: 110, tone: 0.18, seed: 33 },
          { y0: 680, amp: 70, tone: 0.28, seed: 37 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.2 });
      Z.mist(c, t, { y0: 280, y1: 620, n: 4, alpha: 0.5, speed: 44, seed: 243 });
      Z.inkCloud(c, t, { y: 884, h: 24, n: 3, speed: 46, span: 1500, seed: 4, a: .12 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 902]], { w: 14, tone: 0.78, dry: 0.76, seed: 322, head: .03, tail: .3 });

      // 曹操（右，疑）
      Z.leader(c, 1500, 962, 2.5, t, { flip: 0, cape: 1, bow: 0.02 + 0.04 * Math.sin(t * 1.3) });
      // 左慈（左，抬手笑）
      const raise = ss(0.5, 1.6, lt);
      Z.zuoci(c, 760, 944, 2.35, { t, fade: 1, raise, staff: 1, whisk: 1 });

      // 剖开有肉的橘
      const op = ss(0.8, 1.8, lt);
      Z.orange(c, 1080, 900, 1.6, { open: op, empty: 0 });
      [[1180, 940], [980, 938]].forEach(([x, y]) => Z.orange(c, x, y, 1.2, { open: 0 }));

      Z.inkMotes(c, 1080, 880, 120, t, { n: 12, seed: 9, a: .4, speed: .8 });
      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '果肉饱满甚甜', { x: 700, y: 250 + Math.sin(t * 1.2) * 6, size: 62, gap: 14, appear: ss(0.4, 1.2, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '笑而不辩', ss(1.8, 2.5, lt), { size: 74, seed: 324 });
    },
  };
})();
