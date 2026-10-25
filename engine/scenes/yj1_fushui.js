// ① 琅琊于吉，鹤氅藜杖，符水济世：于吉自留白淡出，持符施水，青气微起。
// 母题循环：云气横移、墨云、浓墨烟带、飞鸿、竹、垂帷。
SCENES['yj1_fushui'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy1', '#eeead9');
  const rr = rng(11);
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);

      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'uy1_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 720, amp: 120, tone: 0.16, seed: 3 }, { y0: 830, amp: 90, tone: 0.24, seed: 7 }]);
      }, { blur: 3, halo: 16, haloA: 0.2 });

      brush(c, [[0, 906], [640, 899], [1280, 911], [1920, 902]], { w: 12, tone: 0.72, dry: 0.78, seed: 301, head: .03, tail: .3 });

      Z.mist(c, t, { y0: 260, y1: 700, n: 4, alpha: 0.5, speed: 32, seed: 302 });
      Z.inkCloud(c, t, { y: 872, h: 34, n: 4, speed: 60, span: 1500, seed: 1, a: .32 });
      Z.inkSmoke(c, 960, 500, t, { seed: 3, a: 0.26 });

      Z.geese(c, t, { y: 170, x0: 2050, speed: 150, n: 6, seed: 11, scale: 1.0 });
      Z.geese(c, t, { y: 300, x0: 2400, speed: 118, n: 5, seed: 23, scale: 0.8 });

      [[190, 0.9], [260, 1.15], [1700, 1.0]].forEach(([bx, bs], k) => {
        const sw = Math.sin(t * 1.3 + k) * 8;
        c.save(); c.translate(bx, 940); c.scale(bs, bs);
        brush(c, [[0, 0], [sw * .3, -260], [sw * .6, -520], [sw, -720]], { w: 9, tone: .62, dry: .5, seed: 310 + k, tail: .3, col: [86, 104, 82] });
        for (let i = 0; i < 5; i++) {
          const yy = -180 - i * 130, sg = i % 2 ? 1 : -1;
          leaf(c, sw * (yy / -720) * .6, yy, sg > 0 ? -.5 : Math.PI + .5, 62, 16, .6, [74, 96, 72]);
        }
        c.restore();
      });

      // 主动作：于吉淡出，抬手施符
      const fade = ss(0.25, 1.9, lt);
      const raise = ss(1.4, 3.0, lt);
      Z.yuji(c, 960, 942, 2.35, { t, fade, raise, staff: 1, talisman: 1 });

      // 符水：青气微起 + 符水滴落
      Z.qingQi(c, 960, 700, 120, t, 0.34 * fade, { w: 16, seed: 5 });
      c.save(); c.globalAlpha = .5 * fade;
      for (let k = 0; k < 10; k++) {
        const ph = ((t * .9 + k / 10) % 1);
        const px = 1020 + (rr() - .5) * 60;
        const py = 760 - ph * 150;
        c.fillStyle = 'rgba(96,168,168,.9)';
        c.beginPath(); c.ellipse(px, py, 3, 6, 0, 0, Math.PI * 2); c.fill();
      }
      c.restore();

      Z.inkMotes(c, 960, 700, 210, t, { n: 20, seed: 5, a: .4 * fade, speed: .7 });

      Z.curtain(c, 96, 140, t, { seed: 51, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 52, a: .18, col: '70,62,50' });

      Z.bigText(c, '符水济世', { x: 980, y: 220, size: 64, gap: 14, appear: ss(0.7, 1.6, lt), col: 'rgba(40,96,96,.94)', shadow: { color: 'rgba(60,120,120,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
