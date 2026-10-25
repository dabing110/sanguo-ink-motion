// ③ 正始十年（249）高平陵之变：宣帝将诛曹爽，因其从魏帝出而闭城门。
//    爽司马鲁芝率府兵斩关赴爽，呼敞同去。敞惧，问宪英：「天子在外，太傅闭城门…于事可得尔乎？」
//    画面：城门紧闭，辛敞惶惧（身形微颤），宪英在侧沉静——一动一静。
SCENES['xn3_bimen'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn3', '#e2dece');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.0, lt);
      Z.wash(c, 'xn3_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 500, amp: 120, tone: 0.14, seed: 31 }, { y0: 650, amp: 82, tone: 0.22, seed: 33 }]);
      }, { blur: 5, halo: 20, haloA: 0.24 });

      Z.mist(c, t, { y0: 400, y1: 720, n: 5, alpha: 0.6, speed: 94, seed: 312 });
      Z.mist(c, t, { y0: 250, y1: 540, n: 4, alpha: 0.4, speed: 126, seed: 316 });
      Z.inkCloud(c, t, { y: 878, h: 30, n: 5, speed: 94, span: 1500, seed: 4, a: .24 });
      Z.inkCloud(c, t, { y: 490, h: 26, n: 3, speed: 122, span: 1300, seed: 14, a: .18 });
      Z.geese(c, t, { y: 195, x0: 2350, speed: 126, n: 5, seed: 37, scale: 0.76 });

      // 都城大门（背景，紧闭）
      Z.gateBig(c, 960, 936, 1.0, { open: 0, a: ss(0.2, 1.6, lt) });

      // 城外尘埃（主运动：兵马已动）
      Z.dust(c, t, { x: 1500, y: 880, n: 6, seed: 41, scale: 1.6, alpha: 0.5 });
      Z.dust(c, t, { x: 420, y: 900, n: 5, seed: 43, scale: 1.3, alpha: 0.42 });

      // 辛敞（左，惶惧：fear 让身形微颤）
      Z.weiOfficial(c, 430, 950, 1.95, t, { seed: 85, fear: ss(0.6, 2.6, lt), fade: ss(0.25, 1.5, lt) });

      // 宪英（右，沉静端立，手持竹简）
      Z.xinshi(c, 1470 + Math.sin(t * .8) * 3, 950, 2.35,
        { t, fade: ss(0.3, 1.6, lt), scroll: 1, bow: 0.04 });

      Z.inkSmoke(c, 1470, 690, t, { seed: 13, a: 0.24 });
      Z.curtain(c, 100, 132, t, { seed: 75, a: .32, col: '74,58,44' });
      Z.curtain(c, 1820, 132, t, { seed: 76, a: .32, col: '74,58,44' });

      Z.bigText(c, '太傅闭城门', { x: 300, y: 452, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '人云将不利国家', { x: 330, y: 546, size: 42, gap: 10, appear: ss(1.0, 1.9, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
