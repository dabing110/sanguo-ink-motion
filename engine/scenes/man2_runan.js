// ② 汝南太守：从太祖，迁汝南太守，募兵破敌，威行郡国。
// 主动作：满宠立马前导（0.4→2.4s）→ 骑队随行（1.2→2.6s）；母题：汝南山、骑队、尘。
SCENES['man2_runan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn2', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'mn2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 450, amp: 170, tone: 0.22, seed: 51 },
          { y0: 540, amp: 120, tone: 0.32, seed: 57 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 300, y1: 580, n: 4, alpha: 0.5, speed: 50, seed: 13 });
      brush(c, [[0, 860], [480, 840], [980, 860], [1480, 842], [1920, 856]], { w: 16, tone: 0.84, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 骑队（随行）
      for (let k = 0; k < 4; k++) {
        const ph = t * 7 + k * 2.4;
        const rx = lerp(1700, 1300, ss(1.2, 2.6, lt)) - k * 90;
        c.save(); c.globalAlpha = clamp(ss(1.2, 2.6, lt));
        Z.rider(c, rx, 920 - (k % 2) * 12, 1.4, ph, { flip: 0, cape: 1, backFlag: 0, t, spearAng: -0.5, spearLen: 240 });
        c.restore();
      }
      // 满宠 立马前导
      const ap = ease.out(ss(0, 1.2, lt));
      const x = lerp(300, 720, ap), y = 930, s = lerp(1.4, 2.1, ap);
      const raise = ss(0.6, 2.4, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.mancong(c, x, y, s, { t, raise, scroll: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(1.0, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
