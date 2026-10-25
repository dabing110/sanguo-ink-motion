// ④ 于吉立坛焚香，祈雨救旱：柴堆火起，云合雨倾。
SCENES['yj4_qiyu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy4', '#e4e0cd');
  const rr = rng(21);
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'uy4_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 660, amp: 140, tone: 0.2, seed: 15 }, { y0: 800, amp: 100, tone: 0.3, seed: 17 }]);
      }, { blur: 5, halo: 20, haloA: 0.26 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.74, dry: 0.76, seed: 309, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 320, y1: 720, n: 5, alpha: 0.5, speed: 40, seed: 362 });
      // 乌云压顶（多层）
      Z.inkCloud(c, t, { y: 300, h: 70, n: 5, speed: 30, span: 1200, seed: 3, a: .4 });
      Z.inkCloud(c, t, { y: 420, h: 56, n: 4, speed: 38, span: 1300, seed: 7, a: .34 });
      Z.inkSmoke(c, 960, 520, t, { seed: 14, a: 0.26 });
      Z.geese(c, t, { y: 140, x0: 2250, speed: 120, n: 5, seed: 51, scale: 0.75 });

      // 于吉立于高坛（抬高）
      const fade = ss(0.2, 1.6, lt);
      const raise = ss(1.0, 3.0, lt);
      Z.yuji(c, 960, 720, 2.4, { t, fade, raise, staff: 1, talisman: 1 });

      // 柴堆火（坛下）
      Z.torch(c, 760, 940, 1.4, t, 1);
      Z.torch(c, 1160, 940, 1.4, t, 2);

      // 青气上升（祈雨）
      Z.qingQi(c, 960, 520, 220, t, 0.5 * fade, { w: 22, seed: 5 });

      // 雨丝将落（细斜线，渐起）
      c.save(); c.globalAlpha = .4 * ss(1.5, 3.0, lt);
      c.strokeStyle = 'rgba(80,110,130,.7)'; c.lineWidth = 2;
      for (let k = 0; k < 26; k++) {
        const px = (rr() * 1920);
        const py = ((t * 600 + k * 70 + rr() * 200) % 700);
        c.beginPath(); c.moveTo(px, py); c.lineTo(px - 10, py + 26); c.stroke();
      }
      c.restore();

      Z.magicRing(c, 960, 560, 150, t, { a: .14 * fade, spin: .4 });

      Z.curtain(c, 96, 150, t, { seed: 57, a: .2, col: '60,52,42' });
      Z.curtain(c, 1824, 150, t, { seed: 58, a: .2, col: '60,52,42' });

      Z.bigText(c, '云合雨倾', { x: 980, y: 200, size: 64, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(40,70,96,.94)', shadow: { color: 'rgba(40,70,110,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
