// ② 吴会之人多事之：百姓焚香伏道而拜，于吉立于中央施符。
SCENES['yj2_fenxiang'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy2', '#ece8d6');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'uy2_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 760, amp: 110, tone: 0.16, seed: 5 }, { y0: 850, amp: 80, tone: 0.24, seed: 9 }]);
      }, { blur: 3, halo: 16, haloA: 0.2 });
      brush(c, [[0, 906], [640, 900], [1280, 910], [1920, 902]], { w: 12, tone: 0.72, dry: 0.78, seed: 305, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 300, y1: 760, n: 4, alpha: 0.5, speed: 36, seed: 322 });
      Z.inkCloud(c, t, { y: 884, h: 26, n: 3, speed: 50, span: 1500, seed: 6, a: .14 });
      Z.inkSmoke(c, 960, 520, t, { seed: 8, a: 0.24 });
      Z.geese(c, t, { y: 150, x0: 2200, speed: 130, n: 5, seed: 31, scale: 0.8 });

      // 于吉居中
      const fade = ss(0.2, 1.6, lt);
      const raise = ss(1.0, 2.6, lt);
      Z.yuji(c, 960, 940, 2.5, { t, fade, raise, staff: 1, talisman: 1 });

      // 伏拜人群（沿道两侧）
      Z.crowdBow(c, 470, 980, 1.5, t, { n: 4, fade, seed: 17 });
      Z.crowdBow(c, 1460, 980, 1.5, t, { n: 4, fade, seed: 29 });

      Z.magicRing(c, 960, 660, 150, t, { a: .16 * fade, spin: .35 });
      Z.inkMotes(c, 960, 660, 180, t, { n: 16, seed: 13, a: .36 * fade, speed: .7 });

      Z.curtain(c, 96, 150, t, { seed: 53, a: .2, col: '70,62,50' });
      Z.curtain(c, 1824, 150, t, { seed: 54, a: .2, col: '70,62,50' });

      Z.bigText(c, '伏道而拜', { x: 980, y: 200, size: 64, gap: 14, appear: ss(0.6, 1.4, lt), col: 'rgba(60,52,40,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
