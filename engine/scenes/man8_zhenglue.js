// ⑧ 魏之良将：总评——满宠执法峻刻，临敌有谋，合肥、新城皆其功，魏之宿将也。
// 主动作：满宠立持律简（0.4→2.4s）→ 威容远望（2.0→3.6s）；母题：远山、松、旗、雁。
SCENES['man8_zhenglue'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn8', '#efe6cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'mn8_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(150,116,50,.12)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2100, [
          { y0: 460, amp: 170, tone: 0.22, seed: 131 },
          { y0: 560, amp: 120, tone: 0.32, seed: 137 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.42, speed: 44, seed: 71 });
      Z.pine(c, t, { x: 320, y: 840, s: 1.1, seed: 4 });
      Z.flag(c, 1480, 740, 320, t, { col: 'rgba(186,52,42,.88)', seed: 7 });
      brush(c, [[0, 880], [480, 862], [980, 882], [1480, 864], [1920, 878]], { w: 16, tone: 0.82, dry: 0.74, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      Z.geese(c, t, { y: 240, x0: 2100, speed: 110, n: 4, seed: 9, scale: 1.1 });
      // 满宠 立持律简
      const ap = ease.out(ss(0.4, 2.4, lt));
      const x = 820, y = 952, s = lerp(1.7, 2.5, ap);
      const raise = ss(2.0, 3.6, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.mancong(c, x, y, s, { t, raise, scroll: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(0.9, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
