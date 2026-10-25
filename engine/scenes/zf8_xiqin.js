// ⑪ 明帝即位，追谥；太和元年四月，初营宗庙，掘地得玉玺，方一寸九分，其文曰「天子羡思慈亲」，明帝为之改容。景初元年，立寝庙特祀。
//    画面：寝庙（香烟上升）中，一方玉玺发着微光——这是她死后，儿子给她的回音。史书给她的最后一笔，是四个字：天子羡思慈亲。
SCENES['zf8_xiqin'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf8', '#e9e3cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 132, tone: 0.15, seed: 811 }, { y0: 624, amp: 90, tone: 0.24, seed: 813 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 8112 });
      Z.mist(c, t, { y0: 230, y1: 510, n: 4, alpha: 0.44, speed: 128, seed: 8116 });
      Z.inkCloud(c, t, { y: 300, h: 28, n: 5, speed: 100, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 22, n: 3, speed: 124, span: 1300, seed: 24, a: .18 });

      // 寝庙（香烟上升：主运动之一）
      Z.shrine(c, 960, 1002, 1.08, t, { a: ss(0.1, 1.5, lt), incense: 1, seed: 101 });
      // 玉玺（发光：她死后的回音）
      Z.jadeSeal(c, 960, 720, 0.92, t, { a: ss(0.5, 1.8, lt), glow: 1, seed: 91 });

      Z.torch(c, 360, 916, 1.34, t, 811);
      Z.torch(c, 1560, 920, 1.30, t, 815);
      Z.dust(c, t, { x: 960, y: 760, n: 6, seed: 819, scale: 1.5, alpha: 0.42 });

      Z.inkSmoke(c, 960, 640, t, { seed: 817, a: 0.24 });
      Z.inkSmoke(c, 540, 720, t, { seed: 818, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 801, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 802, a: .34 });

      Z.bigText(c, '天子羡思慈亲', { x: 320, y: 452, size: 52, gap: 8, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '掘地得玉玺', { x: 320, y: 546, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(46,78,72,.92)', shadow: { color: 'rgba(48,96,86,.24)', blur: 10, x: 3, y: 4 } });
      Z.seal(c, 220, 236, '魏书后妃', ss(2.2, 3.0, lt), { size: 56, seed: 394 });
    },
  };
})();
