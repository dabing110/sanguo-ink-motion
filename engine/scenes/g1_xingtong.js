// ① 平原管辂，年八九岁便喜仰视星辰，夜不肯寐：北斗横天，稚子指星。
// 母题循环：星野明灭（主运动）、云气横移、墨云、浓墨烟带、飞鸿、竹、垂帷。
SCENES['g1_xingtong'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug1', '#dedac8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'ug1_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 720, amp: 120, tone: 0.18, seed: 3 }, { y0: 830, amp: 90, tone: 0.28, seed: 7 }]);
      }, { blur: 3, halo: 16, haloA: 0.2 });
      brush(c, [[0, 906], [640, 899], [1280, 911], [1920, 902]], { w: 12, tone: 0.74, dry: 0.78, seed: 301, head: .03, tail: .3 });

      // 星野 + 北斗（主运动：60 星点明灭 + 七曜呼吸）
      Z.stars(c, 960, 300, 1.15, t, { a: ss(0.2, 2.2, lt), seed: 3 });

      Z.mist(c, t, { y0: 420, y1: 760, n: 4, alpha: 0.42, speed: 30, seed: 302 });
      Z.inkCloud(c, t, { y: 872, h: 34, n: 4, speed: 60, span: 1500, seed: 1, a: .3 });
      Z.inkSmoke(c, 960, 620, t, { seed: 3, a: 0.24 });
      Z.geese(c, t, { y: 250, x0: 2050, speed: 130, n: 5, seed: 11, scale: 0.85 });

      [[200, 0.9], [1720, 1.0]].forEach(([bx, bs], k) => {
        const sw = Math.sin(t * 1.3 + k) * 8;
        c.save(); c.translate(bx, 940); c.scale(bs, bs);
        brush(c, [[0, 0], [sw * .3, -260], [sw * .6, -520], [sw, -720]], { w: 9, tone: .6, dry: .5, seed: 310 + k, tail: .3, col: [86, 104, 82] });
        for (let i = 0; i < 5; i++) {
          const yy = -180 - i * 130, sg = i % 2 ? 1 : -1;
          leaf(c, sw * (yy / -720) * .6, yy, sg > 0 ? -.5 : Math.PI + .5, 62, 16, .6, [74, 96, 72]);
        }
        c.restore();
      });

      // 主动作：稚子淡出，抬手指星
      const fade = ss(0.25, 1.9, lt);
      const raise = ss(1.3, 3.0, lt);
      Z.guanlu(c, 960 + Math.sin(t * .8) * 4, 942, 1.55, { t, fade, raise, bow: -0.25, yarrow: 0, gourd: 0 });

      Z.curtain(c, 96, 140, t, { seed: 51, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 52, a: .18, col: '70,62,50' });

      Z.bigText(c, '少仰星辰', { x: 980, y: 560, size: 64, gap: 14, appear: ss(0.7, 1.6, lt), col: 'rgba(40,44,72,.94)', shadow: { color: 'rgba(70,80,120,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
