// ⑤ 天下兵乱饥馑，百姓皆卖金银珠玉，后家大有储谷，颇以买之。后年十余岁白母：
//    「今世乱而多买宝物，匹夫无罪，怀璧为罪。又左右皆饥乏，不如以谷振给亲族邻里，广为恩惠也。」举家称善。
//    画面：储谷的麻袋（开着口，谷粒在落）与她家所买的珠玉并置；十余岁的她，抬起一只手，向母亲进言。
SCENES['zf3_zhengu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf3', '#e8e2cd');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf3_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 486, amp: 126, tone: 0.15, seed: 311 }, { y0: 630, amp: 88, tone: 0.24, seed: 313 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 3112 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 3116 });
      Z.inkCloud(c, t, { y: 470, h: 30, n: 5, speed: 96, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 300, h: 24, n: 4, speed: 124, span: 1300, seed: 24, a: .18 });
      brush(c, [[0, 926], [640, 918], [1280, 928], [1920, 918]], { w: 14, tone: 0.78, dry: 0.74, seed: 3118, head: .03, tail: .3 });

      // 储谷（开着口，谷粒在落：主运动之一）
      Z.grainSacks(c, 720, 968, 1.25, t, { a: ss(0.2, 1.5, lt), n: 6, open: 1, seed: 41 });
      // 珠玉（与谷堆形成对照：家中所买宝物）
      Z.jadePile(c, 1360, 870, 1.0, t, { a: ss(0.3, 1.6, lt), seed: 51 });
      // 十余岁的她（抬起一只手，向母亲进言）
      Z.zhenhou(c, 1040 + Math.sin(t * .9) * 3, 922, 1.5, { t, fade: ss(0.35, 1.7, lt), young: 1, raise: 0.5 + 0.18 * Math.sin(t * 1.4), flip: 1 });

      Z.torch(c, 360, 916, 1.34, t, 311);
      Z.torch(c, 1640, 920, 1.30, t, 315);
      Z.dust(c, t, { x: 720, y: 720, n: 6, seed: 319, scale: 1.4, alpha: 0.42 });

      Z.inkSmoke(c, 1040, 700, t, { seed: 317, a: 0.26 });
      Z.inkSmoke(c, 560, 730, t, { seed: 318, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 301, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 302, a: .34 });

      Z.bigText(c, '匹夫无罪', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '怀璧为罪', { x: 320, y: 548, size: 48, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(140,52,42,.92)', shadow: { color: 'rgba(150,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
