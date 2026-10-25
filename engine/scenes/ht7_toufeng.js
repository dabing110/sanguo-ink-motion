// ⑦ 「太祖闻而召佗，佗常在左右。太祖苦头风，每发，心乱目眩，佗针鬲，随手而差。」
//    后佗以妻病久不返，太祖累书呼之，犹不上道，遂收送狱。
SCENES['ht7_toufeng'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht7', '#e2dece');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'ht7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 500, amp: 120, tone: 0.14, seed: 71 }, { y0: 650, amp: 84, tone: 0.22, seed: 73 }]);
      }, { blur: 5, halo: 20, haloA: 0.22 });

      Z.mist(c, t, { y0: 400, y1: 700, n: 4, alpha: 0.46, speed: 60, seed: 712 });
      Z.inkCloud(c, t, { y: 876, h: 28, n: 4, speed: 62, span: 1500, seed: 2, a: .15 });
      brush(c, [[0, 904], [640, 896], [1280, 906], [1920, 896]], { w: 14, tone: 0.8, dry: 0.72, seed: 718, head: .03, tail: .3 });
      Z.geese(c, t, { y: 195, x0: 2350, speed: 124, n: 4, seed: 77, scale: 0.72 });

      // 殿柱（两侧，定「召见」之场）
      [[210, 1.0], [1710, 1.0]].forEach(([px2], k) => {
        c.save(); c.translate(px2, 960);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -820]], { w: 34, tone: .6, dry: .55, seed: 1311 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -838, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 主动作 A：权臣（左）手扶额，头风发作，身形微颤
      Z.warlord(c, 620, 950, 2.15, t, { flip: 1, clutch: ss(0.8, 2.6, lt), rage: ss(1.6, 3.2, lt) * .8, fade: ss(0.25, 1.6, lt) });

      // 主动作 B：华佗（右）持针坦然，不为所动
      Z.huatuo(c, 1400, 950, 2.3, { t, fade: ss(0.35, 1.8, lt), raise: ss(0.9, 2.8, lt) * .6, needle: 1, bag: 1 });

      Z.curtain(c, 100, 132, t, { seed: 83, a: .2 });
      Z.curtain(c, 1820, 132, t, { seed: 84, a: .2 });

      Z.bigText(c, '头风召佗', { x: 300, y: 462, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '针鬲 · 随手而差', { x: 330, y: 552, size: 42, gap: 10, appear: ss(1.0, 1.9, lt), col: 'rgba(46,86,86,.92)', shadow: { color: 'rgba(40,110,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
