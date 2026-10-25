// ⑧ 辂自知寿不过四十七八：「吾本命在寅……吾前后相当死者过百人，略无错也。」
//    正元三年二月卒，年四十八 —— 天有常数，不可得讳。
SCENES['g8_shouzhi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug8', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'ug8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 450, amp: 150, tone: 0.16, seed: 83 }, { y0: 590, amp: 100, tone: 0.26, seed: 87 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      Z.mist(c, t, { y0: 390, y1: 680, n: 4, alpha: 0.42, speed: 44, seed: 442 });
      Z.inkCloud(c, t, { y: 888, h: 24, n: 3, speed: 46, span: 1500, seed: 1, a: .12 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 14, tone: 0.78, dry: 0.74, seed: 317, head: .03, tail: .3 });

      // 星野归位（明灭渐弱，呼应①仰观星辰）
      Z.stars(c, 960, 300, 1.0, t, { a: ss(0.2, 2.0, lt) * (0.55 + 0.3 * Math.sin(t * 0.8)), seed: 5 });
      Z.geese(c, t, { y: 190, x0: 2350, speed: 112, n: 4, seed: 81, scale: 0.7 });

      // 管辂（中，安然自立，微躬）
      Z.guanlu(c, 960, 950, 2.5, { t, fade: ss(0.2, 1.6, lt), raise: 0, bow: 0.06, yarrow: 1, gourd: 1 });

      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '寿止四八', { x: 760, y: 560, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '天有常数', { x: 1010, y: 648, size: 64, gap: 14, appear: ss(1.1, 2.0, lt), col: 'rgba(40,96,96,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      // 钤印必须 4 字：Z.seal 在 ch.length>2 时固定画 ch[0..3]，3 字会让 ch[3]=undefined 被 fillText 画成字符串
      Z.seal(c, 220, 230, '方技列传', ss(2.2, 3.0, lt), { size: 56, seed: 364 });
    },
  };
})();
