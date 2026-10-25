// ⑤ 辂还邑舍，具以此言语舅氏，舅氏责辂言太切至。
//    辂曰：「与死人语，何所畏邪！」舅大怒，谓辂狂悖。
SCENES['g5_yusiren'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug5', '#e4e0cd');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'ug5_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 710, amp: 120, tone: 0.18, seed: 19 }, { y0: 825, amp: 90, tone: 0.26, seed: 21 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.76, dry: 0.76, seed: 311, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 330, y1: 700, n: 4, alpha: 0.44, speed: 42, seed: 382 });
      Z.inkCloud(c, t, { y: 882, h: 26, n: 3, speed: 50, span: 1500, seed: 4, a: .14 });
      Z.inkSmoke(c, 960, 520, t, { seed: 16, a: 0.24 });
      Z.geese(c, t, { y: 165, x0: 2150, speed: 136, n: 5, seed: 61, scale: 0.8 });

      // 管辂（左，坦然）
      const fade = ss(0.2, 1.5, lt);
      Z.guanlu(c, 640, 944, 2.3, { t, fade, raise: 0.15, yarrow: 1, gourd: 1 });

      // 舅氏（右，老者，躬身责之）
      Z.scholar(c, 1360, 950, 2.3, t, { flip: 1, fade: ss(0.4, 1.7, lt), seed: 19, bow: 0.10 + 0.05 * Math.abs(Math.sin(t * 1.6)) });

      // 舅氏怒气（朱环微转，随指责起伏）——自绘，不依赖 u_common 的 magicRing
      const nq = ss(1.0, 2.4, lt);
      c.save(); c.translate(1360, 700); c.rotate(t * -.5);
      for (let k = 0; k < 3; k++) {
        c.globalAlpha = .3 * nq * (1 - k * .26);
        c.strokeStyle = 'rgba(150,50,40,.9)'; c.lineWidth = 3 - k * .7;
        c.beginPath();
        for (let i = 0; i <= 48; i++) {
          const q = i / 48, ang = q * Math.PI * 2 + k * 1.1;
          const rr2 = 110 * (1 - k * .16) + Math.sin(q * Math.PI * 6 + t * 3 + k) * 6;
          const px = Math.cos(ang) * rr2, py = Math.sin(ang) * rr2 * .78;
          i ? c.lineTo(px, py) : c.moveTo(px, py);
        }
        c.stroke();
      }
      c.restore();

      Z.curtain(c, 96, 140, t, { seed: 59, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 60, a: .18, col: '70,62,50' });

      Z.bigText(c, '何所畏邪', { x: 980, y: 210, size: 64, gap: 14, appear: ss(0.6, 1.4, lt), col: 'rgba(60,52,40,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
