// ⑥ 左将军长史：克成都，先主以为左将军长史。
// 主动作：许靖立受（0.4→2.2s）→ 案上印信显（1.4→2.6s）；母题：案、印、旗。
SCENES['xuj6_zuojun'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj6', '#e9e2cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'xj6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2050, [{ y0: 470, amp: 120, tone: 0.18, seed: 81 }]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 380, y1: 660, n: 3, alpha: 0.4, speed: 34, seed: 51 });
      brush(c, [[0, 912], [640, 902], [1280, 914], [1920, 900]], { w: 13, tone: 0.78, dry: 0.75, seed: 603, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 旗
      Z.flag(c, 1500, 760, 300, t, { col: 'rgba(186,52,42,.85)', seed: 7 });
      // 许靖 立受
      const ap = ease.out(ss(0.4, 2.2, lt));
      const x = 760, y = 946, s = lerp(1.6, 2.3, ap);
      const raise = ss(0.6, 2.2, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.xujing(c, x, y, s, { t, raise, whisk: 1 });
      c.restore();
      // 案 + 印
      c.save(); c.globalAlpha = clamp(ss(1.4, 2.6, lt) * 1.4);
      c.translate(x + 250, 946 - 150);
      c.fillStyle = 'rgba(120,86,50,.9)'; c.fillRect(-60, -12, 120, 12); c.fillRect(-50, 0, 10, 40); c.fillRect(40, 0, 10, 40);
      c.fillStyle = 'rgba(180,140,60,.95)'; c.beginPath(); c.rect(-22, -30, 44, 20); c.fill();
      c.strokeStyle = 'rgba(60,46,30,.9)'; c.lineWidth = 2; c.strokeRect(-22, -30, 44, 20);
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
