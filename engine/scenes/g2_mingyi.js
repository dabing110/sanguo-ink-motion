// ② 及成人，果明《周易》，仰观、风角、占、相之道，无不精微：八卦环身，蓍草在手。
SCENES['g2_mingyi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug2', '#e8e4d2');
  // 八卦爻象：乾兑离震巽坎艮坤
  const GUA = [[1, 1, 1], [0, 1, 1], [1, 0, 1], [0, 0, 1], [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0]];
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'ug2_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 740, amp: 110, tone: 0.16, seed: 5 }, { y0: 850, amp: 80, tone: 0.24, seed: 9 }]);
      }, { blur: 3, halo: 16, haloA: 0.2 });
      brush(c, [[0, 906], [640, 900], [1280, 910], [1920, 902]], { w: 12, tone: 0.74, dry: 0.78, seed: 305, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 340, y1: 760, n: 4, alpha: 0.48, speed: 34, seed: 322 });
      Z.inkCloud(c, t, { y: 884, h: 26, n: 3, speed: 50, span: 1500, seed: 6, a: .14 });
      Z.inkSmoke(c, 960, 560, t, { seed: 8, a: 0.24 });
      Z.geese(c, t, { y: 170, x0: 2200, speed: 128, n: 5, seed: 31, scale: 0.8 });

      // 主动作：管辂居中，抬手持蓍草
      const fade = ss(0.2, 1.6, lt);
      const raise = ss(0.9, 2.6, lt);
      Z.guanlu(c, 960, 940, 2.35, { t, fade, raise, yarrow: 1, gourd: 1 });

      // 八卦环身（八符绕圈缓转 + 逐一浮现）
      const app = ss(0.9, 2.8, lt);
      for (let k = 0; k < 8; k++) {
        const a0 = -Math.PI / 2 + k * (Math.PI * 2 / 8) + t * 0.18;
        const rad = 330 + Math.sin(t * 1.2 + k) * 12;
        const px = 960 + Math.cos(a0) * rad;
        const py = 620 + Math.sin(a0) * rad * 0.62;
        Z.trigram(c, px, py, 0.72 + 0.06 * Math.sin(t + k),
          { yang: GUA[k], a: app * (0.55 + 0.45 * Math.abs(Math.sin(t * 0.9 + k))) });
      }

      Z.curtain(c, 96, 150, t, { seed: 53, a: .2, col: '70,62,50' });
      Z.curtain(c, 1824, 150, t, { seed: 54, a: .2, col: '70,62,50' });

      Z.bigText(c, '明易通神', { x: 980, y: 200, size: 64, gap: 14, appear: ss(0.6, 1.4, lt), col: 'rgba(60,52,40,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
