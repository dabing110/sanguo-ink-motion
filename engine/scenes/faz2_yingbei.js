// ② 迎奉先主：张松谋迎刘备，正为谋主，衔命迎先主于涪。
// 主动作：法正执羽扇迎（0.3→2.0s）→ 刘备至（1.2→2.6s）；母题：蜀道、松、旗。
SCENES['faz2_yingbei'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fz2', '#e9e1c8');
  // 主公（刘备）
  const lord = (c, x, y, s, t, nod) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(60,52,40,.42)';
    c.beginPath(); c.moveTo(-30, 0); c.quadraticCurveTo(-34, -86, -24, -126); c.quadraticCurveTo(0, -140, 24, -126); c.quadraticCurveTo(34, -86, 30, 0); c.closePath(); c.fill();
    c.save(); c.translate(0, -152); c.rotate(nod * 0.05);
    c.fillStyle = 'rgba(246,238,220,.95)'; c.beginPath(); c.arc(0, 0, 16, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(40,42,44,.95)';
    c.beginPath(); c.moveTo(-18, -6); c.quadraticCurveTo(-12, -30, 2, -32); c.quadraticCurveTo(18, -28, 18, -8); c.lineTo(12, -4); c.quadraticCurveTo(0, -10, -12, -4); c.closePath(); c.fill();
    c.restore(); c.restore();
  };
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'fz2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2050, [
          { y0: 440, amp: 160, tone: 0.22, seed: 41 },
          { y0: 530, amp: 110, tone: 0.32, seed: 47 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 300, y1: 580, n: 4, alpha: 0.5, speed: 50, seed: 13 });
      Z.pine(c, t, { x: 300, y: 820, s: 1.0, seed: 4 });
      Z.flag(c, 1500, 760, 300, t, { col: 'rgba(186,52,42,.85)', seed: 7 });
      brush(c, [[0, 860], [480, 840], [980, 860], [1480, 842], [1920, 856]], { w: 16, tone: 0.84, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      // 法正 迎（左）
      const ap = ease.out(ss(0.3, 2.0, lt));
      const x = lerp(300, 640, ap), y = 946, s = lerp(1.5, 2.2, ap);
      const raise = ss(0.5, 2.0, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.fazheng(c, x, y, s, { t, raise, fan: 1 });
      c.restore();
      // 刘备 至（右）
      const lp = ease.out(ss(1.2, 2.6, lt));
      const lx = lerp(2000, 1380, lp);
      c.save(); c.globalAlpha = clamp(lp);
      lord(c, lx, 950, 2.4, t, ss(1.6, 2.6, lt));
      c.restore();
      Z.seal(c, 1762, 952, '孝直', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
