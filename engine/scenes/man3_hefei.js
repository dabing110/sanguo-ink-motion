// ③ 合肥拒吴：与张辽、李典共守合肥，拒孙权，城孤力战。
// 主动作：满宠立城头持律简（0.4→2.4s）→ 江上敌舟（1.6→3.4s）；母题：合肥城、江、敌舟、旗。
SCENES['man3_hefei'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn3', '#e6dcc2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'mn3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [{ y0: 430, amp: 130, tone: 0.2, seed: 61 }]);
      }, { blur: 3, halo: 16, haloA: 0.22 });
      Z.mist(c, t, { y0: 280, y1: 560, n: 4, alpha: 0.5, speed: 50, seed: 23 });
      // 江（水）
      Z.water(c, t, { y0: 740, y1: 1000, tone: 0.4, seed: 9, rows: 7 });
      // 敌舟（吴师）
      const ef = ss(1.6, 3.4, lt);
      for (let k = 0; k < 3; k++) {
        const ex = lerp(2000, 1300, ef) - k * 130;
        c.save(); c.globalAlpha = clamp(ef) * 0.9; c.translate(ex, 800);
        c.fillStyle = 'rgba(60,52,42,.7)';
        c.beginPath(); c.moveTo(-70, 0); c.quadraticCurveTo(0, 22, 70, 0); c.lineTo(56, 14); c.quadraticCurveTo(0, 30, -56, 14); c.closePath(); c.fill();
        brush(c, [[0, 0], [0, -50]], { w: 4, tone: 0.7, dry: 0.5, seed: 80 + k });
        brush(c, [[0, -50], [40, -26], [0, -6]], { w: 3, col: [150, 50, 44], tone: 0.8, dry: 0.4, seed: 81 + k });
        c.restore();
      }
      brush(c, [[0, 720], [480, 706], [980, 722], [1480, 708], [1920, 720]], { w: 16, tone: 0.82, dry: 0.74, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 合肥城垣
      Z.wall(c, 760, 860, 1.15, t, { flag: 1, flagCol: 'rgba(186,52,42,.85)' });
      // 满宠 立城头
      const ap = ease.out(ss(0, 1.2, lt));
      const x = 760, y = 700, s = lerp(1.4, 2.0, ap);
      const raise = ss(0.4, 2.4, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.mancong(c, x, y, s, { t, raise, scroll: 1, flip: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
