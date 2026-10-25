// ④ 宪英曰：「事有不可知，然以吾度之，太傅殆不得不尔…此举不过以诛爽耳。」
//    敞曰：「然则敞无出乎？」宪英曰：「安可以不出！职守，人之大义也…汝从众而已。」
//    画面：堂上，宪英抬手示之——这一幕是她全片的「判断力」高光，手势要画得明确。
SCENES['xn4_zhishou'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn4', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'xn4_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 136, tone: 0.15, seed: 41 }, { y0: 620, amp: 92, tone: 0.24, seed: 43 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 412 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 416 });
      Z.inkCloud(c, t, { y: 884, h: 32, n: 5, speed: 96, span: 1500, seed: 6, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 16, a: .18 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 900]], { w: 14, tone: 0.78, dry: 0.74, seed: 418, head: .03, tail: .3 });
      Z.geese(c, t, { y: 200, x0: 2380, speed: 130, n: 5, seed: 47, scale: 0.8 });

      // 堂柱
      [[210, 1.0], [1710, 1.0]].forEach(([px2], k) => {
        c.save(); c.translate(px2, 960);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -830]],
          { w: 34, tone: .6, dry: .55, seed: 421 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -848, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 灯烛（右，火苗跳动：主运动）
      Z.candle(c, 1560, 906, 1.3, t, { a: ss(0.3, 1.8, lt), seed: 53 });

      // 辛敞（左，侧身倾听）
      Z.weiOfficial(c, 470, 950, 2.0, t, { seed: 87, bow: 0.05, fade: ss(0.25, 1.5, lt) });

      // 主动作：宪英抬手示之（point 0→1，手势明确）
      const pt = ss(0.9, 2.9, lt);
      Z.xinshi(c, 1010 + Math.sin(t * .8) * 3, 948, 2.5,
        { t, fade: ss(0.2, 1.5, lt), point: pt, scroll: 0, bow: 0.04 });

      Z.inkSmoke(c, 1010, 660, t, { seed: 17, a: 0.26 });
      Z.curtain(c, 100, 132, t, { seed: 77, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 78, a: .34 });

      Z.bigText(c, '职守大义', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(46,86,86,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '安可以不出', { x: 350, y: 546, size: 46, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(24,20,16,.92)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
