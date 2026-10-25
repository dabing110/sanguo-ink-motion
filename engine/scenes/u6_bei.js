// ⑥ 拔簪分酒，自饮一半，一半奉曹。曹不饮，他掷杯空中，化为白鸠绕殿而飞。
SCENES['u6_bei'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz6', '#e9e4d0');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'uz6_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 600, amp: 90, tone: 0.16, seed: 53 }]);
      }, { blur: 3, halo: 14, haloA: 0.2 });
      Z.mist(c, t, { y0: 260, y1: 540, n: 3, alpha: 0.45, speed: 40, seed: 263 });
      Z.inkCloud(c, t, { y: 876, h: 24, n: 3, speed: 48, span: 1500, seed: 6, a: .12 });
      // 宴案
      c.save(); c.fillStyle = 'rgba(150,110,70,.4)'; c.fillRect(560, 880, 800, 22); c.restore();
      brush(c, [[0, 910], [640, 902], [1280, 912], [1920, 902]], { w: 12, tone: 0.7, dry: 0.8, seed: 342, head: .03, tail: .3 });

      // 曹操（右）
      Z.leader(c, 1480, 962, 2.4, t, { flip: 0, cape: 1 });
      // 左慈（左，拔簪举杯）
      const raise = ss(0.4, 1.4, lt);
      Z.zuoci(c, 760, 944, 2.3, { t, fade: 1, raise, staff: 0, whisk: 1 });

      // 分杯：玉簪一划，杯裂为二
      const sp = ss(1.0, 1.8, lt);
      Z.wineCup(c, 900, 884, 1.3, t, { split: sp });
      // 掷杯化白鸠：白鸠绕殿而飞
      const fly = ss(1.8, 3.0, lt);
      if (fly > 0.01) {
        const ang = t * 1.5 + 1.2;
        const dx = 980 + Math.cos(ang) * 260, dy = 560 + Math.sin(ang * 1.3) * 150;
        Z.dove(c, dx, dy, 1.3, t, { flap: 1 });
      }

      // 母题
      Z.magicRing(c, 960, 600, 160, t, { a: .12, spin: .5 });
      Z.inkMotes(c, 960, 700, 200, t, { n: 16, seed: 11, a: .4, speed: .7 });
      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '掷杯化白鸠', { x: 700, y: 210 + Math.sin(t * 1.2) * 6, size: 60, gap: 14, appear: ss(1.6, 2.3, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '分杯', ss(1.0, 1.7, lt), { size: 74, seed: 344 });
    },
  };
})();
