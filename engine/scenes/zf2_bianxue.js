// ④ 年九岁喜书，视字辄识，数用诸兄笔砚；兄曰「汝当习女工，用书为学，当作女博士邪」，
//    后答「闻古者贤女，未有不学前世成败，以为己诫。不知书，何由见之」。
//    画面：幼年甄后执简册，一笔一笔翻着；兄长的笔砚就在她手边。她不是被逼着学，是她自己要学。
SCENES['zf2_bianxue'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf2', '#e7e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf2_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 476, amp: 130, tone: 0.15, seed: 211 }, { y0: 626, amp: 90, tone: 0.24, seed: 213 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 2112 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 2116 });
      Z.inkCloud(c, t, { y: 880, h: 30, n: 5, speed: 96, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 460, h: 24, n: 3, speed: 124, span: 1300, seed: 24, a: .18 });
      brush(c, [[0, 914], [640, 906], [1280, 916], [1920, 906]], { w: 14, tone: 0.78, dry: 0.74, seed: 2118, head: .03, tail: .3 });

      // 案（简册置于其上）
      c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt));
      brush(c, [[620, 880], [1180, 876]], { w: 16, tone: .6, dry: .5, seed: 2151, col: [96, 70, 46] });
      c.restore();
      // 兄长的笔砚（她手边：简册）
      Z.slate(c, 600, 856, 0.92, t, { a: ss(0.25, 1.5, lt), open: 0, seed: 31 });
      // 幼年甄后执简册（翻页：持续位移＝主运动）
      Z.slate(c, 1020, 856, 1.05, t, { a: ss(0.3, 1.6, lt), open: 1, seed: 33 });
      Z.zhenhou(c, 1180 + Math.sin(t * .8) * 3, 916, 1.5, { t, fade: ss(0.35, 1.7, lt), young: 1, flip: 1, bow: 0.04 });

      Z.torch(c, 360, 916, 1.34, t, 211);
      Z.torch(c, 1560, 920, 1.30, t, 215);
      Z.dust(c, t, { x: 760, y: 700, n: 6, seed: 219, scale: 1.4, alpha: 0.42 });

      Z.inkSmoke(c, 1180, 700, t, { seed: 217, a: 0.26 });
      Z.inkSmoke(c, 540, 720, t, { seed: 218, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 201, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 202, a: .34 });

      Z.bigText(c, '当作女博士邪', { x: 320, y: 452, size: 56, gap: 10, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '不知书何由见之', { x: 320, y: 548, size: 40, gap: 8, appear: ss(1.1, 2.0, lt), col: 'rgba(140,52,42,.92)', shadow: { color: 'rgba(150,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
