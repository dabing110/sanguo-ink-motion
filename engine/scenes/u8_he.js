// ⑧ 骑白鹤「土鼠随金虎，奸雄一旦休」——是年曹操惊倒成疾；建安二十五年庚子，操果薨。
SCENES['u8_he'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz8', '#e6e2cf');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'uz8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 420, amp: 160, tone: 0.16, seed: 73 },
          { y0: 560, amp: 100, tone: 0.26, seed: 77 },
        ]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 620, n: 4, alpha: 0.4, speed: 50, seed: 283 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 3, alpha: 0.42, speed: 40, seed: 284 });
      Z.inkCloud(c, t, { y: 884, h: 24, n: 3, speed: 46, span: 1500, seed: 8, a: .12 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 14, tone: 0.78, dry: 0.76, seed: 362, head: .03, tail: .3 });

      // 曹操（右，惊倒成疾：躬身+微颤）
      const ill = ss(1.6, 3.0, lt);
      Z.leader(c, 1540, 962 + ill * 30, 2.4, t, { flip: 0, cape: 1, bow: 0.1 + ill * 0.5 });

      // 白鹤载左慈（中上，飞起）
      const up = ss(0.4, 3.0, lt);
      const cx = 760, cy = lerp(720, 460, up) + Math.sin(t * 1.4) * 8;
      Z.crane(c, cx, cy, 2.0, t, { flap: 1 });
      Z.zuoci(c, cx, cy - 46, 1.4, { t, fade: 1, raise: 0.5, staff: 0, whisk: 1, bow: 0.1 });

      // 母题
      Z.magicRing(c, cx, cy, 150, t, { a: .12, spin: .4 });
      Z.inkMotes(c, cx, cy, 180, t, { n: 16, seed: 13, a: .38, speed: .7 });
      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '土鼠随金虎', { x: 1380, y: 216 + Math.sin(t * 1.2) * 6, size: 64, gap: 14, appear: ss(0.6, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '奸雄一旦休', { x: 1400, y: 300 + Math.sin(t * 1.2) * 6, size: 64, gap: 14, appear: ss(1.2, 2.0, lt), col: 'rgba(120,40,36,.94)', shadow: { color: 'rgba(90,30,20,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '六十八回', ss(2.2, 3.0, lt), { size: 56, seed: 364 });
    },
  };
})();
