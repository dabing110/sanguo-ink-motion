// ⑤ 法正之言：克成都前，法正谓先主曰「靖名重天下，宜加敬」。先主从之。
// 主动作：法正向刘备进言（0.3→1.6s）→ 刘备颔首；许靖（名重）远景立（1.0→2.6s）；母题：帐、尘。
SCENES['xuj5_fazheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj5', '#e8e0c6');
  // 主公（刘备）：袍、冠
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
  // 谋士（法正）：浅袍、前揖进言
  const adviser = (c, x, y, s, t, gest) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(110,116,112,.42)';
    c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-30, -82, -22, -120); c.quadraticCurveTo(0, -132, 22, -120); c.quadraticCurveTo(30, -82, 26, 0); c.closePath(); c.fill();
    c.beginPath(); c.arc(0, -146, 14, 0, Math.PI * 2); c.fill();
    brush(c, [[-22, -130], [-40 - 20 * gest, -118 - 10 * gest], [-52 - 30 * gest, -128]], { w: 9, tone: 0.5, dry: 0.5, seed: 701, head: 0.1, tail: 0.2 });
    c.restore();
  };
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'xj5_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(84,76,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2050, [{ y0: 470, amp: 120, tone: 0.18, seed: 91 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 700, n: 3, alpha: 0.34, speed: 30, seed: 601 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 603, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 刘备 + 法正（右）
      const nod = ss(1.4, 2.4, lt);
      lord(c, 1500, 950, 2.4, t, nod);
      const gest = ss(0.3, 1.6, lt);
      adviser(c, 1230, 956, 2.4, t, gest);
      // 许靖 远景（名重天下）左
      const ap = ease.out(ss(1.0, 2.6, lt));
      const x = lerp(300, 560, ap), y = 946, s = lerp(1.3, 2.1, ap);
      c.save(); c.globalAlpha = clamp(ap);
      Z.xujing(c, x, y, s, { t, raise: ss(1.4, 2.4, lt), whisk: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
