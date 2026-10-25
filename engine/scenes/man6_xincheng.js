// ⑥ 新城屯守：明帝时，宠表筑合肥新城，徙屯据险，屡拒吴师。
// 主动作：满宠立指新城（0.4→2.6s）→ 险山新城现（1.2→2.8s）；母题：险山、新城、旗。
SCENES['man6_xincheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn6', '#e7ddc4');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'mn6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 420, amp: 210, tone: 0.26, seed: 121 },
          { y0: 540, amp: 150, tone: 0.36, seed: 127 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.22 });
      Z.mist(c, t, { y0: 280, y1: 560, n: 4, alpha: 0.5, speed: 44, seed: 23 });
      brush(c, [[0, 840], [480, 822], [980, 842], [1480, 826], [1920, 840]], { w: 18, tone: 0.86, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 险山上的新城
      const cw = ease.out(ss(1.2, 2.8, lt));
      c.save(); c.globalAlpha = clamp(cw);
      Z.wall(c, 1380, 720, 0.9, t, { flag: 1, flagCol: 'rgba(186,52,42,.85)' });
      c.restore();
      // 满宠 立指
      const ap = ease.out(ss(0, 1.2, lt));
      const x = lerp(300, 700, ap), y = 930, s = lerp(1.5, 2.2, ap);
      const raise = ss(0.4, 2.6, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.mancong(c, x, y, s, { t, raise, scroll: 1, flip: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
