// ⑩ 践阼之后，山阳公奉二女以嫔于魏，郭后、李、阴贵人并爱幸，后愈失意，有怨言。
//    画面：已是后妃的她（步摇冠＋组绶），微微低首——身侧珠玉如旧，而恩宠已移。郭后（得宠者）在另一侧微扬。
SCENES['zf6_shiyi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf6', '#e9e3cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf6_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 478, amp: 128, tone: 0.15, seed: 611 }, { y0: 628, amp: 88, tone: 0.24, seed: 613 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 6112 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 6116 });
      Z.inkCloud(c, t, { y: 470, h: 30, n: 5, speed: 96, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 300, h: 24, n: 4, speed: 124, span: 1300, seed: 24, a: .18 });
      brush(c, [[0, 926], [640, 918], [1280, 928], [1920, 918]], { w: 14, tone: 0.78, dry: 0.74, seed: 6118, head: .03, tail: .3 });

      // 珠玉（如旧：她昔日的辉光）
      Z.jadePile(c, 1420, 872, 1.0, t, { a: ss(0.2, 1.5, lt), seed: 51 });
      // 郭后（得宠者：另一侧，微扬）
      Z.zhenhou(c, 660 + Math.sin(t * .9) * 3, 922, 1.34, { t, fade: ss(0.25, 1.6, lt), bow: -0.05, flip: 1 });
      // 她（已是后妃：步摇冠＋组绶，微微低首＝失意）
      Z.zhenhou(c, 1040, 920, 1.55, { t, fade: ss(0.3, 1.7, lt), queen: 1, bow: 0.16 + 0.04 * Math.sin(t * 1.2) });

      Z.torch(c, 360, 916, 1.34, t, 611);
      Z.torch(c, 1640, 920, 1.30, t, 615);
      Z.dust(c, t, { x: 1040, y: 720, n: 6, seed: 619, scale: 1.4, alpha: 0.42 });

      Z.inkSmoke(c, 1040, 700, t, { seed: 617, a: 0.26 });
      Z.inkSmoke(c, 560, 730, t, { seed: 618, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 601, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 602, a: .34 });

      Z.bigText(c, '郭后并爱幸', { x: 320, y: 452, size: 56, gap: 10, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '后愈失意', { x: 320, y: 548, size: 50, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(140,52,42,.92)', shadow: { color: 'rgba(150,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
