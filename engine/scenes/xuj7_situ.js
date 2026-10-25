// ⑦ 司徒：先主称帝，拜靖为司徒，位望甚崇。
// 主动作：许靖立于宫阙前（0.4→1.8s）→ 朝仪威容（1.4→2.5s）；母题：宫阙、旗、金辉。
SCENES['xuj7_situ'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj7', '#efe6cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'xj7_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(150,116,50,.14)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2050, [{ y0: 460, amp: 110, tone: 0.16, seed: 95 }]);
      }, { blur: 3, halo: 16, haloA: 0.26 });
      Z.mist(c, t, { y0: 340, y1: 600, n: 3, alpha: 0.36, speed: 34, seed: 71 });
      // 宫阙
      Z.wall(c, 1380, 940, 1.3, t, { flag: 1, flagCol: 'rgba(186,52,42,.85)' });
      // 金辉
      c.save(); c.globalCompositeOperation = 'lighter';
      const gg = c.createRadialGradient(960, 520, 10, 960, 520, 360);
      gg.addColorStop(0, 'rgba(255,214,120,.28)'); gg.addColorStop(1, 'rgba(255,210,120,0)');
      c.fillStyle = gg; c.fillRect(0, 0, 1920, 1080); c.restore();
      // 许靖 立（朝仪）
      const ap = ease.out(ss(0.4, 1.8, lt));
      const x = 760, y = 946, s = lerp(1.6, 2.4, ap);
      const raise = ss(1.4, 2.5, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.xujing(c, x, y, s, { t, raise, whisk: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
