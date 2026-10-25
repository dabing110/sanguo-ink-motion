// ⑤ 「吾有一术，名五禽之戏：一曰虎，二曰鹿，三曰熊，四曰猿，五曰鸟。
//    亦以除疾，并利蹄足，以当导引。」——中国最早的医疗体操。
SCENES['ht5_wuqinxi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht5', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.0, lt);
      Z.wash(c, 'ht5_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2040, [{ y0: 450, amp: 140, tone: 0.15, seed: 51 }, { y0: 600, amp: 94, tone: 0.24, seed: 53 }]);
      }, { blur: 4, halo: 16, haloA: 0.2 });

      Z.mist(c, t, { y0: 360, y1: 660, n: 4, alpha: 0.42, speed: 54, seed: 512 });
      Z.inkCloud(c, t, { y: 886, h: 22, n: 3, speed: 54, span: 1500, seed: 7, a: .12 });
      brush(c, [[0, 906], [640, 898], [1280, 908], [1920, 898]], { w: 13, tone: 0.78, dry: 0.74, seed: 518, head: .03, tail: .3 });
      Z.geese(c, t, { y: 180, x0: 2350, speed: 122, n: 4, seed: 57, scale: 0.7 });

      // 五禽环绕：虎（左下）鹿（左上）熊（右下）猿（右上）鸟（中上）
      const bs = [
        { i: 0, x: 470, y: 905, s: 1.05, q: ss(0.3, 1.4, lt), seed: 61 },
        { i: 1, x: 660, y: 690, s: 0.9,  q: ss(0.5, 1.6, lt), seed: 62 },
        { i: 2, x: 1470, y: 920, s: 1.0, q: ss(0.4, 1.5, lt), seed: 63 },
        { i: 3, x: 1290, y: 700, s: 0.88, q: ss(0.6, 1.7, lt), seed: 64 },
        { i: 4, x: 980, y: 330, s: 0.95, q: ss(0.7, 1.8, lt), seed: 65 },
      ];
      bs.forEach((b, k) => {
        const bob = Math.sin(t * 2.0 + k * 1.1) * 6;
        Z.fiveBeasts(c, b.x + Math.sin(t * .9 + k) * 10, b.y + bob, b.s, t, { i: b.i, a: b.q, seed: b.seed });
      });

      // 主动作：华佗作「鸟戏」——展臂舒身
      Z.huatuo(c, 990, 952, 2.45,
        { t, fade: ss(0.2, 1.6, lt), raise: ss(0.7, 2.6, lt), needle: 0, bag: 1 });

      Z.inkSmoke(c, 990, 650, t, { seed: 13, a: 0.18 });
      Z.curtain(c, 96, 128, t, { seed: 79, a: .2 });
      Z.curtain(c, 1824, 128, t, { seed: 80, a: .2 });

      Z.bigText(c, '五禽之戏', { x: 320, y: 466, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '虎 · 鹿 · 熊 · 猿 · 鸟', { x: 330, y: 558, size: 40, gap: 8, appear: ss(1.0, 1.9, lt), col: 'rgba(46,86,86,.92)', shadow: { color: 'rgba(40,110,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
