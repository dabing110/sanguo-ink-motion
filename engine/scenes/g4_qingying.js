// ④ 正始九年十二月二十八日，吏部尚书何晏请辂，邓飏在坐。晏问位当至三公不，
//    又言「连梦见青蝇数十头，来在鼻上，驱之不肯去」。辂曰：位峻者颠，轻豪者亡。
SCENES['g4_qingying'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug4', '#e5e1ce');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'ug4_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 720, amp: 120, tone: 0.18, seed: 15 }, { y0: 830, amp: 90, tone: 0.26, seed: 17 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.76, dry: 0.76, seed: 309, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 330, y1: 720, n: 4, alpha: 0.46, speed: 40, seed: 362 });
      Z.inkCloud(c, t, { y: 884, h: 26, n: 3, speed: 50, span: 1500, seed: 3, a: .14 });
      Z.inkSmoke(c, 960, 540, t, { seed: 14, a: 0.24 });
      Z.geese(c, t, { y: 160, x0: 2250, speed: 122, n: 5, seed: 51, scale: 0.75 });

      // 何晏（左，执麈尾名士）
      const fa = ss(0.2, 1.5, lt);
      Z.scholar(c, 620, 950, 2.5, t, { flip: 0, fade: fa, seed: 7, bow: 0.05 + 0.03 * Math.abs(Math.sin(t * 1.2)) });
      // 青蝇数十头，集于鼻上（何晏头部：局部 (2,-170) × s=2.5）
      Z.bluefly(c, 620 + 2 * 2.5, 950 - 170 * 2.5, t, ss(1.0, 2.6, lt), { n: 26, r: 95, seed: 11 });
      // 邓飏（左侧稍后）
      Z.scholar(c, 350, 962, 2.05, t, { flip: 0, fade: fa * .9, seed: 13, bow: 0.08 });

      // 管辂（右，抬手指陈）
      const fg = ss(0.4, 1.8, lt);
      Z.guanlu(c, 1420, 950, 2.3, { t, fade: fg, raise: ss(0.7, 2.4, lt), yarrow: 1, gourd: 1 });

      Z.curtain(c, 96, 150, t, { seed: 57, a: .2, col: '60,52,42' });
      Z.curtain(c, 1824, 150, t, { seed: 58, a: .2, col: '60,52,42' });

      Z.bigText(c, '位峻者颠', { x: 980, y: 210, size: 64, gap: 14, appear: ss(0.7, 1.6, lt), col: 'rgba(120,40,36,.94)', shadow: { color: 'rgba(90,30,20,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
