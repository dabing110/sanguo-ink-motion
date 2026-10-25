// ⑥ 岁朝，西北大风，尘埃蔽天，十馀日，闻晏、飏皆诛，然后舅氏乃服。
//    写意不血腥：只画大风扬尘 + 二人倒地，不画刑杀。
SCENES['g6_dafeng'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug6', '#ddd9c6');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'ug6_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 700, amp: 130, tone: 0.2, seed: 25 }, { y0: 820, amp: 95, tone: 0.28, seed: 27 }]);
      }, { blur: 5, halo: 20, haloA: 0.24 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.78, dry: 0.74, seed: 313, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 340, y1: 720, n: 4, alpha: 0.44, speed: 46, seed: 402 });
      Z.inkCloud(c, t, { y: 886, h: 24, n: 3, speed: 48, span: 1500, seed: 9, a: .12 });
      Z.inkSmoke(c, 960, 520, t, { seed: 18, a: 0.26 });

      // 西北大风：尘带横扫 + 飞砂（主运动，帧差主力；三层不同高度与速度）
      Z.windDust(c, t, { y: 430, n: 6, speed: 340, a: .55, seed: 13 });
      Z.windDust(c, t, { y: 620, n: 5, speed: 260, a: .46, seed: 23 });
      Z.windDust(c, t, { y: 770, n: 4, speed: 200, a: .38, seed: 31 });

      // 何晏、邓飏倒地（写意倒伏，不画血）
      const fd = ss(1.0, 2.4, lt);
      c.save(); c.globalAlpha = clamp(fd);
      Z.scholar(c, 700, 952, 2.2, t, { flip: 0, alive: 0, fade: 1, seed: 7 });
      Z.scholar(c, 1060, 964, 2.0, t, { flip: 1, alive: 0, fade: 1, seed: 13 });
      c.restore();

      // 管辂（右远处静立旁观）
      Z.guanlu(c, 1560, 950, 1.9, { t, fade: ss(0.3, 1.6, lt), raise: 0, yarrow: 1, gourd: 1 });

      Z.curtain(c, 96, 150, t, { seed: 61, a: .2, col: '60,52,42' });
      Z.curtain(c, 1824, 150, t, { seed: 62, a: .2, col: '60,52,42' });

      Z.bigText(c, '晏飏皆诛', { x: 980, y: 205, size: 64, gap: 14, appear: ss(0.8, 1.7, lt), col: 'rgba(120,40,36,.94)', shadow: { color: 'rgba(90,30,20,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
