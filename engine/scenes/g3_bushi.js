// ③ 初应州召，与弟季儒共载，至武城西，自卦吉凶，曰「当在故城中见三貍」；
//    前到河西故城角，正见三貍共踞城侧，兄弟并喜。
SCENES['g3_bushi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug3', '#e7e3d0');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'ug3_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 700, amp: 120, tone: 0.18, seed: 11 }, { y0: 820, amp: 90, tone: 0.26, seed: 13 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.76, dry: 0.76, seed: 307, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 320, y1: 700, n: 4, alpha: 0.44, speed: 42, seed: 342 });
      Z.inkCloud(c, t, { y: 880, h: 28, n: 3, speed: 54, span: 1500, seed: 2, a: .14 });
      Z.inkSmoke(c, 960, 500, t, { seed: 12, a: 0.26 });
      Z.geese(c, t, { y: 170, x0: 2150, speed: 138, n: 5, seed: 41, scale: 0.8 });

      // 故城墙（左侧一段，带垛口）
      c.save();
      c.fillStyle = 'rgba(150,138,116,.72)';
      c.fillRect(60, 520, 520, 400);
      c.strokeStyle = 'rgba(52,44,34,.85)'; c.lineWidth = 3; c.strokeRect(60, 520, 520, 400);
      for (let i = 0; i < 6; i++) {
        c.fillStyle = 'rgba(150,138,116,.8)';
        c.fillRect(70 + i * 86, 480, 60, 44);
        c.strokeRect(70 + i * 86, 480, 60, 44);
      }
      brush(c, [[80, 900], [300, 890], [560, 902]], { w: 8, tone: .3, dry: .7, seed: 351, tail: .5 });
      c.restore();

      // 三貍（蹲踞城侧，随入幕淡出）
      const ff = ss(1.0, 2.6, lt);
      c.save(); c.globalAlpha = clamp(ff);
      Z.fox(c, 300, 862, 1.5, t, { seed: 17, flip: 0 });
      Z.fox(c, 470, 878, 1.35, t, { seed: 23, flip: 1 });
      Z.fox(c, 620, 866, 1.45, t, { seed: 29, flip: 0 });
      c.restore();

      // 管辂（右，抬手占）
      const fade = ss(0.2, 1.5, lt);
      Z.guanlu(c, 1360, 944, 2.2, { t, fade, raise: ss(0.8, 2.4, lt), yarrow: 1, gourd: 1 });

      Z.curtain(c, 96, 140, t, { seed: 55, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 56, a: .18, col: '70,62,50' });

      Z.bigText(c, '当见三貍', { x: 980, y: 210, size: 64, gap: 14, appear: ss(0.6, 1.4, lt), col: 'rgba(120,80,40,.94)', shadow: { color: 'rgba(90,60,20,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
