// ⑦ 及会将行，请其子羊琇为参军。宪英忧曰：「他日吾为国忧，今日难至吾家矣。」
//    宪英谓琇曰：「行矣，戒之！…军旅之间可以济者，其惟仁恕乎！」
//    画面：灯下母诫子——她给的不是兵法是「仁恕」，这是三国最不像三国的一句叮嘱。
SCENES['xn7_renshu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn7', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.1, lt);
      Z.wash(c, 'xn7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 132, tone: 0.15, seed: 71 }, { y0: 620, amp: 90, tone: 0.24, seed: 73 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 712 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 716 });
      Z.inkCloud(c, t, { y: 884, h: 32, n: 5, speed: 96, span: 1500, seed: 2, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 12, a: .18 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 900]], { w: 14, tone: 0.78, dry: 0.74, seed: 718, head: .03, tail: .3 });
      Z.geese(c, t, { y: 200, x0: 2380, speed: 132, n: 5, seed: 77, scale: 0.8 });

      // 堂柱
      [[210, 1.0], [1710, 1.0]].forEach(([px2], k) => {
        c.save(); c.translate(px2, 960);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -830]],
          { w: 34, tone: .6, dry: .55, seed: 721 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -848, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 灯烛（中偏左，火苗跳动：主运动）
      Z.candle(c, 900, 906, 1.35, t, { a: ss(0.25, 1.6, lt), seed: 55 });

      // 羊琇（右，将行，躬身受诫）
      Z.weiOfficial(c, 1420, 950, 2.0, t, { flip: 1, seed: 93, bow: 0.1 * ss(1.0, 2.8, lt), fade: ss(0.3, 1.6, lt) });

      // 主动作：宪英（左）抬手相诫
      const pt = ss(0.9, 2.9, lt);
      Z.xinshi(c, 620 + Math.sin(t * .8) * 3, 950, 2.45,
        { t, fade: ss(0.2, 1.4, lt), point: pt, scroll: 0, bow: 0.06 });

      Z.inkSmoke(c, 620, 680, t, { seed: 29, a: 0.26 });
      Z.curtain(c, 100, 132, t, { seed: 83, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 84, a: .34 });

      Z.bigText(c, '其惟仁恕', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(46,86,86,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '军旅之间 · 可以济者', { x: 350, y: 546, size: 42, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(24,20,16,.92)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
