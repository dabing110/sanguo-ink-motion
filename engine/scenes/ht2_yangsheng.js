// ② 「晓养性之术，年且百岁而犹有壮容，时人以为仙。」
//    画面：孤松之下，华佗导引吐纳——抬手、舒袖、白须随风。鹤过，是「寿」的意象。
SCENES['ht2_yangsheng'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht2', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'ht2_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2020, [{ y0: 470, amp: 140, tone: 0.15, seed: 21 }, { y0: 610, amp: 96, tone: 0.25, seed: 23 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 680, n: 4, alpha: 0.46, speed: 56, seed: 212 });
      Z.inkCloud(c, t, { y: 882, h: 24, n: 3, speed: 58, span: 1500, seed: 9, a: .13 });
      brush(c, [[0, 910], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.78, dry: 0.74, seed: 218, head: .03, tail: .3 });

      // 孤松（左上，主运动之一：松针摇曳）
      Z.pine(c, t, { x: 300, y: 950, s: 1.25, seed: 5, tone: .82 });

      // 飞鹤（横向掠过）
      Z.geese(c, t, { y: 200, x0: 2400, speed: 118, n: 4, seed: 27, scale: 0.72 });

      // 主动作：导引——双臂缓抬、吐纳（raise 与呼吸同频）
      const breathe = 0.5 + 0.5 * Math.sin(t * 1.1);
      Z.huatuo(c, 1080, 948, 2.5,
        { t, fade: ss(0.2, 1.6, lt), raise: ss(0.8, 2.6, lt) * (0.35 + 0.65 * breathe), needle: 0, bag: 1 });

      Z.inkSmoke(c, 1080, 640, t, { seed: 11, a: 0.2 });
      Z.curtain(c, 96, 128, t, { seed: 73, a: .2 });
      Z.curtain(c, 1824, 128, t, { seed: 74, a: .2 });

      Z.bigText(c, '年且百岁', { x: 320, y: 470, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(46,86,86,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '而犹有壮容', { x: 350, y: 560, size: 44, gap: 10, appear: ss(1.0, 1.9, lt), col: 'rgba(24,20,16,.9)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
