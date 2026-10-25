// ⑧ 文休：章武二年，靖卒，谥曰文休，名士身后，麈尾长垂。
// 主动作：暮年许靖独立（0.4→2.0s）→ 麈尾遗落石上（2.0→3.4s）；母题：暮山、归雁、松、麈尾。
SCENES['xuj8_xiu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj8', '#e3d8bc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'xj8_bg', 0.55 + 0.45 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 160, tone: 0.24, seed: 101 },
          { y0: 560, amp: 110, tone: 0.34, seed: 107 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.2 });
      // 暮色暖光
      c.save(); c.globalCompositeOperation = 'lighter';
      const sg = c.createRadialGradient(1500, 260, 8, 1500, 260, 420);
      sg.addColorStop(0, 'rgba(255,196,120,.34)'); sg.addColorStop(1, 'rgba(255,180,110,0)');
      c.fillStyle = sg; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.46, speed: 40, seed: 33 });
      Z.pine(c, t, { x: 300, y: 840, s: 1.1, seed: 4 });
      brush(c, [[0, 880], [480, 862], [980, 882], [1480, 864], [1920, 878]], { w: 16, tone: 0.82, dry: 0.74, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      Z.geese(c, t, { y: 240, x0: 2100, speed: 100, n: 4, seed: 9, scale: 1.1 });
      // 许靖 暮年独立
      const ap = ease.out(ss(0.4, 2.0, lt));
      const x = 820, y = 952, s = lerp(1.7, 2.4, ap);
      c.save(); c.globalAlpha = clamp(ap);
      Z.xujing(c, x, y, s, { t, raise: 0.1, whisk: 1 });
      c.restore();
      // 麈尾遗落石上（2.0→3.4s）
      const fall = ss(2.0, 3.4, lt);
      c.save(); c.globalAlpha = clamp(fall) * 0.9; c.translate(1220, 912); c.rotate(lerp(-1.2, 0.2, fall));
      brush(c, [[0, 0], [40, 20]], { w: 6, tone: 0.8, dry: 0.4, seed: 951 });
      brush(c, [[40, 20], [70, 10], [90, 24]], { w: 4, col: [236, 230, 220], tone: 0.85, dry: 0.5, seed: 952, tail: 0.8, bristles: 3 });
      c.restore();
      // 石
      c.save(); c.globalAlpha = 0.8;
      brush(c, [[1150, 936], [1190, 920], [1250, 938], [1210, 956]], { w: 10, tone: 0.6, dry: 0.6, seed: 953 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(0.9, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
