// ③ 小霸王孙策独忌之：孙策立而怒视，于吉在侧。
SCENES['yj3_jice'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy3', '#e9e5d2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'uy3_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 700, amp: 120, tone: 0.18, seed: 11 }, { y0: 820, amp: 90, tone: 0.26, seed: 13 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.74, dry: 0.76, seed: 307, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 300, y1: 700, n: 4, alpha: 0.46, speed: 44, seed: 342 });
      Z.inkCloud(c, t, { y: 880, h: 28, n: 3, speed: 54, span: 1500, seed: 2, a: .14 });
      Z.inkSmoke(c, 960, 480, t, { seed: 12, a: 0.26 });
      Z.geese(c, t, { y: 160, x0: 2150, speed: 140, n: 5, seed: 41, scale: 0.85 });

      // 于吉（左，小，平静）
      const fy = ss(0.2, 1.5, lt);
      Z.yuji(c, 560, 944, 1.9, { t, fade: fy, raise: 0.2, staff: 1, talisman: 0 });

      // 孙策（右，怒立）
      const anger = Math.sin(t * 1.6) * 2;
      Z.leader(c, 1460, 950 + anger, 2.6, t, { flip: 0, cape: 1, bow: 0.05 + 0.04 * Math.abs(Math.sin(t * 1.4)) });

      // 怒意朱纹（孙策侧）
      c.save(); c.globalAlpha = .3;
      Z.magicRing(c, 1460, 700, 120, t, { a: .3, spin: -.5, col: '150,50,40' });
      c.restore();

      Z.curtain(c, 96, 140, t, { seed: 55, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 56, a: .18, col: '70,62,50' });

      Z.bigText(c, '以为惑众', { x: 980, y: 210, size: 64, gap: 14, appear: ss(0.5, 1.3, lt), col: 'rgba(120,40,36,.94)', shadow: { color: 'rgba(90,30,20,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
