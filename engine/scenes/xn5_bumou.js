// ⑤ 敞遂出。宣帝果诛爽。事定后，敞叹曰：「吾不谋于姊，几不获于义！」
//    画面：辛敞转身赴城门（缓行，别滑太快——整屏平移会被 qa 记成连续跳变），宪英目送；城门徐开一线。
SCENES['xn5_bumou'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn5', '#e2dece');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.9, lt);
      Z.wash(c, 'xn5_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 500, amp: 118, tone: 0.14, seed: 51 }, { y0: 650, amp: 80, tone: 0.22, seed: 53 }]);
      }, { blur: 5, halo: 20, haloA: 0.24 });

      Z.mist(c, t, { y0: 400, y1: 720, n: 6, alpha: 0.62, speed: 96, seed: 512 });
      Z.mist(c, t, { y0: 250, y1: 540, n: 4, alpha: 0.42, speed: 128, seed: 516 });
      Z.inkCloud(c, t, { y: 878, h: 30, n: 5, speed: 96, span: 1500, seed: 7, a: .24 });
      Z.inkCloud(c, t, { y: 490, h: 26, n: 3, speed: 124, span: 1300, seed: 17, a: .18 });
      Z.geese(c, t, { y: 195, x0: 2350, speed: 128, n: 5, seed: 57, scale: 0.76 });

      // 城门（徐开一线：open 0→0.45）
      Z.gateBig(c, 1180, 936, 1.0, { open: ss(0.8, 2.8, lt) * 0.45, a: ss(0.15, 1.4, lt) });

      // 尘埃（主运动）
      Z.dust(c, t, { x: 1500, y: 890, n: 6, seed: 51, scale: 1.5, alpha: 0.46 });

      // 辛敞（自左向右缓行赴门；速度压到 ~150px/s 以内，避免整屏平移被判跳变）
      const go = ss(0.5, 2.9, lt);
      Z.weiOfficial(c, lerp(760, 1050, go), 950, 1.95, t, { seed: 89, fade: ss(0.2, 1.3, lt) });

      // 宪英（左，目送，不追）
      Z.xinshi(c, 470 + Math.sin(t * .8) * 3, 950, 2.3,
        { t, fade: ss(0.25, 1.4, lt), scroll: 1, bow: 0.06 });

      Z.inkSmoke(c, 470, 680, t, { seed: 19, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 79, a: .32, col: '74,58,44' });
      Z.curtain(c, 1820, 132, t, { seed: 80, a: .32, col: '74,58,44' });

      Z.bigText(c, '敞遂出', { x: 320, y: 452, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '吾不谋于姊 · 几不获于义', { x: 330, y: 546, size: 40, gap: 10, appear: ss(1.0, 1.9, lt), col: 'rgba(46,86,86,.92)', shadow: { color: 'rgba(40,110,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
