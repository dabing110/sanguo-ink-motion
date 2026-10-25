// ③ 入蜀：周旋州郡，终入蜀依刘璋，为蜀郡太守。
// 主动作：许靖由远及近入蜀城（0→2.4s）→ 立城下执麈尾；母题：蜀山、城垣、松。
SCENES['xuj3_rushu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj3', '#e9e1c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'xj3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2050, [
          { y0: 430, amp: 170, tone: 0.22, seed: 51 },
          { y0: 520, amp: 120, tone: 0.32, seed: 57 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 280, y1: 560, n: 4, alpha: 0.5, speed: 50, seed: 13 });
      Z.pine(c, t, { x: 300, y: 820, s: 1.0, seed: 4 });
      // 蜀城垣
      Z.wall(c, 1500, 880, 1.1, t, { flag: 1 });
      // 坡地
      brush(c, [[0, 860], [480, 840], [980, 860], [1480, 842], [1920, 856]], { w: 16, tone: 0.84, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 许靖由远及近
      const in_ = ease.out(ss(0, 2.4, lt));
      const x = lerp(200, 860, in_), y = 946, s = lerp(1.0, 2.2, in_);
      c.save(); c.globalAlpha = clamp(0.3 + 0.7 * in_);
      Z.xujing(c, x, y, s, { t, raise: ss(0.8, 2.2, lt), whisk: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(1.0, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
