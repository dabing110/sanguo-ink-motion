// ② 聚众御寇：汉末乱起，聚宗族数千家，坚壁御寇。
// 主动作：许褚虎皮披风立寨前（0.4→2.0s 由下升上）；母题循环：连营、篝火、云气。
SCENES['xuch2_juzhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xc_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xc2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 460, amp: 160, tone: 0.22, seed: 31.2 },
          { y0: 540, amp: 110, tone: 0.32, seed: 27.5 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 220, y1: 520, n: 3, alpha: 0.4, speed: 70, seed: 4 });
      // 连营（宗族筑垒）
      Z.yingLei(c, 300, 880, 0.95, t, { n: 4, alpha: 0.7, seed: 40 });
      Z.yingLei(c, 1450, 880, 0.95, t, { n: 3, alpha: 0.6, seed: 48 });
      // 篝火（循环）
      for (let k = 0; k < 4; k++) {
        const fx = 260 + k * 360, fy = 858;
        c.fillStyle = `rgba(255,176,80,${0.18 + 0.12 * Math.sin(t * 5 + k)})`;
        c.beginPath(); c.arc(fx, fy, 30 + Math.sin(t * 4 + k) * 5, 0, Math.PI * 2); c.fill();
      }
      // 主动作：许褚立寨前
      const rise = ease.out(ss(0.3, 1.4, lt));
      const x = 960, y = lerp(900, 872, rise), s = 1.8;
      Z.xuchu(c, x, y, s, t, { raise: 0.1 + rise * 0.2 });
      Z.seal(c, 1762, 952, '仲康', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
