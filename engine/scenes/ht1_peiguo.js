// ① 华佗，字元化，沛国谯人也。本作士人，游学徐土，兼通数经。
//    画面：布衣医者负囊独行，竹径、远山、飞鸿——「游学」之象。
SCENES['ht1_peiguo'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht1', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'ht1_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 430, amp: 160, tone: 0.16, seed: 11 }, { y0: 580, amp: 110, tone: 0.26, seed: 13 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 360, y1: 660, n: 4, alpha: 0.44, speed: 48, seed: 112 });
      Z.inkCloud(c, t, { y: 884, h: 26, n: 3, speed: 52, span: 1500, seed: 5, a: .14 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 900]], { w: 14, tone: 0.78, dry: 0.74, seed: 118, head: .03, tail: .3 });
      Z.geese(c, t, { y: 210, x0: 2300, speed: 126, n: 5, seed: 21, scale: 0.8 });

      // 竹径（两侧，随风摇）——母题运动之一
      [[170, 1.05], [620, 0.85], [1330, 0.9], [1770, 1.0]].forEach(([bx, bs], k) => {
        const sw = Math.sin(t * 1.4 + k) * 11;
        c.save(); c.translate(bx, 950); c.scale(bs, bs);
        brush(c, [[0, 0], [sw * .3, -280], [sw * .6, -560], [sw, -780]],
          { w: 10, tone: .58, dry: .5, seed: 121 + k, tail: .3, col: [88, 106, 84] });
        for (let i = 0; i < 6; i++) {
          const yy = -180 - i * 118, sg = i % 2 ? 1 : -1;
          leaf(c, sw * (yy / -780) * .6, yy, sg > 0 ? -.45 : Math.PI + .45, 64, 15, .58, [76, 98, 74]);
        }
        c.restore();
      });

      // 主动作：负囊缓缓左行，抬手探路
      const px = 1120 - lt * 36;
      Z.huatuo(c, px + Math.sin(t * 1.5) * 5, 944, 2.35,
        { t, fade: ss(0.25, 1.8, lt), raise: ss(1.2, 3.0, lt) * .5, needle: 0, bag: 1 });

      Z.curtain(c, 100, 132, t, { seed: 71, a: .2 });
      Z.curtain(c, 1820, 132, t, { seed: 72, a: .2 });

      Z.bigText(c, '沛国华佗', { x: 300, y: 466, size: 62, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '字元化 · 游学徐土', { x: 330, y: 556, size: 42, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(46,86,86,.92)', shadow: { color: 'rgba(40,110,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
