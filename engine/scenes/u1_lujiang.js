// ① 庐江左慈，字元放，道号乌角先生：眇一目，跛一足，白藤冠，青懒衣。
// 主动作：他从一片留白里淡出来——先见冠带与拂尘，再显人形，最后跛足上前一步。
// 母题循环：云气横移、竹影摇、幻术墨尘、垂帘。
SCENES['u1_lujiang'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uq1', '#eeead9');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);

      // 远山（淡墨，随入幕缓缓洇开）
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'uq1_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 720, amp: 120, tone: 0.16, seed: 3 }, { y0: 830, amp: 90, tone: 0.24, seed: 7 }]);
      }, { blur: 3, halo: 16, haloA: 0.2 });

      // 地面一笔
      brush(c, [[0, 906], [640, 899], [1280, 911], [1920, 902]], { w: 12, tone: 0.72, dry: 0.78, seed: 301, head: .03, tail: .3 });

      // 母题一：云气横移
      Z.mist(c, t, { y0: 260, y1: 700, n: 4, alpha: 0.5, speed: 32, seed: 302 });
      // 母题二：墨云（贴地，帧差主力）
      Z.inkCloud(c, t, { y: 872, h: 34, n: 4, speed: 60, span: 1500, seed: 1, a: .32 });
      // 母题三：浓墨烟带（静态文戏补运动）
      Z.inkSmoke(c, 960, 500, t, { seed: 3, a: 0.26 });

      // 母题四：天际飞鸿（持续高对比运动，压住静止帧对，山水留白常见母题）
      Z.geese(c, t, { y: 170, x0: 2050, speed: 150, n: 6, seed: 11, scale: 1.0 });
      Z.geese(c, t, { y: 300, x0: 2400, speed: 118, n: 5, seed: 23, scale: 0.8 });

      // 竹（三竿，随风）
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

      // ---------- 主动作：从留白中显形 ----------
      const fade = ss(0.25, 1.7, lt);
      const step = ss(1.7, 2.9, lt);
      Z.zuoci(c, 960 - step * 26, 942, 2.35, {
        t, fade, raise: ss(1.9, 2.7, lt) * .5, staff: 1, whisk: 1,
      });

      // 幻术墨尘（围着他转）
      Z.inkMotes(c, 960, 700, 210, t, { n: 22, seed: 5, a: .42 * fade, speed: .7 });
      Z.magicRing(c, 960, 700, 150, t, { a: .18 * fade, spin: .35 });

      // 竹影外的浮尘
      c.save();
      for (let k = 0; k < 8; k++) {
        const ph = ((t * .1 + k / 8) % 1);
        c.fillStyle = `rgba(238,228,196,${.34 * (1 - ph)})`;
        c.beginPath(); c.arc(300 + (k * 173) % 1340, 940 - ph * 820, 2.4 + (k % 3), 0, Math.PI * 2); c.fill();
      }
      c.restore();

      Z.curtain(c, 96, 140, t, { seed: 51, a: .18, col: '70,62,50' });
      Z.curtain(c, 1824, 140, t, { seed: 52, a: .18, col: '70,62,50' });
    },
  };
})();
