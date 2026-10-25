// ① 中山无极人，汉太保甄邯后；父逸，上蔡令；后三岁失父。
//    《魏书》：每寝寐，家中仿佛见如有人持玉衣覆其上者——一袭悬浮的淡青玉影，落在三岁女童的枕上。
//    画面：卧榻上幼小的她，头顶浮着那袭玉衣。史书给她的第一笔，是先看见「贵不可言」。
SCENES['zf1_shifu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf1', '#e8e3d0');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf1_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 484, amp: 128, tone: 0.15, seed: 111 }, { y0: 632, amp: 86, tone: 0.24, seed: 113 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1112 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 1116 });
      Z.inkCloud(c, t, { y: 470, h: 30, n: 5, speed: 96, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 300, h: 24, n: 4, speed: 124, span: 1300, seed: 24, a: .18 });
      brush(c, [[0, 926], [640, 918], [1280, 928], [1920, 918]], { w: 14, tone: 0.78, dry: 0.74, seed: 1118, head: .03, tail: .3 });

      // 卧榻（她眠其上）
      Z.couch(c, 820, 956, 1.18, t, { a: ss(0.2, 1.5, lt), curtain: 1, seed: 21 });
      // 幼年甄后（枕上）
      Z.zhenhou(c, 820, 912, 1.32, { t, fade: ss(0.3, 1.7, lt), young: 1, flip: 1 });
      // 玉衣（悬浮于枕上：本片唯一一次「祥瑞」，也是全片第一笔）
      Z.yuYi(c, 820, 560, 0.82, t, { a: ss(0.6, 2.0, lt), seed: 11 });

      Z.torch(c, 360, 916, 1.34, t, 111);
      Z.torch(c, 1560, 920, 1.30, t, 115);
      Z.dust(c, t, { x: 700, y: 700, n: 6, seed: 119, scale: 1.4, alpha: 0.42 });

      Z.inkSmoke(c, 820, 700, t, { seed: 117, a: 0.26 });
      Z.inkSmoke(c, 520, 740, t, { seed: 118, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 101, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 102, a: .34 });

      Z.bigText(c, '中山甄氏', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '三岁失父', { x: 320, y: 548, size: 48, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(46,78,72,.92)', shadow: { color: 'rgba(48,96,86,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
