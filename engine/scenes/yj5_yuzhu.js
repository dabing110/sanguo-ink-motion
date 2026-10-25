// ⑤ 雨霁策怒，竟斩于市：孙策命斩，于吉青气投东北。
SCENES['yj5_yuzhu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy5', '#e7e3d0');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'uy5_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 700, amp: 120, tone: 0.18, seed: 19 }, { y0: 820, amp: 90, tone: 0.26, seed: 23 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.74, dry: 0.76, seed: 311, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 320, y1: 700, n: 4, alpha: 0.44, speed: 42, seed: 382 });
      Z.inkCloud(c, t, { y: 876, h: 26, n: 3, speed: 50, span: 1500, seed: 4, a: .12 });
      Z.inkSmoke(c, 960, 500, t, { seed: 16, a: 0.24 });
      Z.geese(c, t, { y: 160, x0: 2150, speed: 140, n: 5, seed: 61, scale: 0.85 });

      // 于吉（中，垂手，无施术）
      const fy = ss(0.2, 1.4, lt);
      Z.yuji(c, 820, 944, 2.3, { t, fade: fy, raise: 0, staff: 1, talisman: 0 });

      // 孙策（右，怒立）
      const anger = Math.sin(t * 1.6)  * 2;
      Z.leader(c, 1480, 950 + anger, 2.6, t, { flip: 0, cape: 1, bow: 0.04 + 0.04 * Math.abs(Math.sin(t * 1.4)) });

      // 青气投东北（斜上右）
      c.save();
      const baseX = 860, baseY = 600;
      for (let k = 0; k < 16; k++) {
        const ph = ((t * .5 + k / 16) % 1);
        const d = ph * 360;
        const px = baseX + d * 0.9 + Math.sin(ph * 6 + k) * 8;
        const py = baseY - d * 0.7;
        c.globalAlpha = .5 * (1 - ph) * ss(1.0, 3.0, lt);
        c.fillStyle = 'rgba(96,168,168,.9)';
        c.beginPath(); c.ellipse(px, py, 18 * (0.4 + ph), 12 * (0.3 + ph), 0, 0, Math.PI * 2); c.fill();
      }
      c.restore();

      Z.curtain(c, 96, 140, t, { seed: 59, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 60, a: .18, col: '70,62,50' });

      Z.bigText(c, '竟斩于市', { x: 980, y: 210, size: 64, gap: 14, appear: ss(0.5, 1.3, lt), col: 'rgba(120,40,36,.94)', shadow: { color: 'rgba(90,30,20,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
