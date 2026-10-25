// ⑧ 会至蜀果反，琇竟以全归。羊祜尝送锦被，宪英嫌其华，反而覆之。其明鉴俭约如此。泰始五年卒，年七十九。
//    画面：琇全归（左，躬身），宪英中坐（右），一床锦被反覆——她的判断最后落到「俭」字上。
SCENES['xn8_mingjian'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn8', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.0, lt);
      Z.wash(c, 'xn8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 470, amp: 130, tone: 0.15, seed: 81 }, { y0: 620, amp: 88, tone: 0.24, seed: 83 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 94, seed: 812 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 126, seed: 816 });
      Z.inkCloud(c, t, { y: 884, h: 32, n: 5, speed: 94, span: 1500, seed: 5, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 122, span: 1300, seed: 15, a: .18 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 900]], { w: 14, tone: 0.78, dry: 0.74, seed: 818, head: .03, tail: .3 });
      Z.geese(c, t, { y: 200, x0: 2380, speed: 134, n: 5, seed: 87, scale: 0.8 });

      // 堂柱
      [[210, 1.0], [1710, 1.0]].forEach(([px2], k) => {
        c.save(); c.translate(px2, 960);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -830]],
          { w: 34, tone: .6, dry: .55, seed: 821 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -848, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 灯烛（左，火苗跳动：主运动）
      Z.candle(c, 330, 906, 1.3, t, { a: ss(0.25, 1.6, lt), seed: 57 });

      // 锦被（右，反覆：fold 0→1 示意「反而覆之」）
      Z.brocade(c, 1560, 900, 1.25, { a: ss(0.8, 2.6, lt), fold: ss(1.2, 2.9, lt), t });

      // 羊琇（左，全归，躬身）
      Z.weiOfficial(c, 620, 950, 2.0, t, { seed: 95, bow: 0.12, fade: ss(0.3, 1.6, lt) });

      // 宪英（中，安然端立，持简）
      Z.xinshi(c, 1040 + Math.sin(t * .8) * 3, 948, 2.5,
        { t, fade: ss(0.2, 1.4, lt), scroll: 1, bow: 0.05 });

      Z.inkSmoke(c, 1040, 660, t, { seed: 31, a: 0.24 });
      Z.curtain(c, 100, 132, t, { seed: 85, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 86, a: .34 });

      Z.bigText(c, '琇竟以全归', { x: 320, y: 452, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(46,86,86,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '明鉴俭约如此', { x: 350, y: 546, size: 44, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(24,20,16,.92)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
      // 钤印必须 4 字：Z.seal 在 ch.length>2 时固定画 ch[0..3]，3 字会让 ch[3]=undefined 被 fillText 画成字符串
      Z.seal(c, 220, 236, '晋书列女', ss(2.2, 3.0, lt), { size: 56, seed: 394 });
    },
  };
})();
