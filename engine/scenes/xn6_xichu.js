// ⑥ 其后钟会为镇西将军（263，将伐蜀）。宪英谓耽从子羊祜曰：「钟士季何故西出？」
//    祜曰：「将为灭蜀也。」宪英曰：「会在事纵恣，非持久处下之道，吾畏其有他志也。」
//    画面：远景军旅西去（主运动），近景叔母与羊祜对答——她不看战报，只看人。
SCENES['xn6_xichu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn6', '#e2dece');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.3, lt);
      Z.wash(c, 'xn6_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 490, amp: 130, tone: 0.15, seed: 61 }, { y0: 640, amp: 88, tone: 0.23, seed: 63 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 98, seed: 612 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 130, seed: 616 });
      Z.inkCloud(c, t, { y: 882, h: 32, n: 5, speed: 98, span: 1500, seed: 3, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 126, span: 1300, seed: 13, a: .18 });

      // 军旅西去（主运动：一列骑影自东向西穿行）
      Z.armyWest(c, 980, 720, 1.0, t, { a: ss(0.2, 2.0, lt), n: 6, seed: 61 });
      Z.dust(c, t, { x: 1500, y: 800, n: 6, seed: 63, scale: 1.5, alpha: 0.5 });
      brush(c, [[0, 906], [640, 898], [1280, 908], [1920, 898]], { w: 15, tone: 0.8, dry: 0.72, seed: 618, head: .03, tail: .3 });

      // 羊祜（左，从子，答「将为灭蜀也」）
      Z.weiOfficial(c, 560, 950, 2.05, t, { seed: 91, bow: 0.05, fade: ss(0.25, 1.5, lt) });

      // 宪英（右，抬手示警——「吾畏其有他志」）
      const pt = ss(1.0, 3.0, lt);
      Z.xinshi(c, 1400 + Math.sin(t * .8) * 3, 950, 2.4,
        { t, fade: ss(0.3, 1.6, lt), point: pt * 0.8, scroll: 1, bow: 0.04 });

      Z.inkSmoke(c, 1400, 680, t, { seed: 23, a: 0.26 });
      Z.curtain(c, 100, 132, t, { seed: 81, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 82, a: .34 });

      Z.bigText(c, '钟会西出', { x: 320, y: 448, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '吾畏其有他志', { x: 350, y: 542, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
