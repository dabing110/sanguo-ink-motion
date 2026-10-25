// ① 许令执法：满宠为许令，曹洪宾客犯法，宠收治不挠，太祖善之。
// 主动作：满宠立持律简（0.4→2.4s）→ 案上律卷显（1.4→2.8s）；母题：县衙、旗、案。
SCENES['man1_xuling'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn1', '#e9e2cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'mn1_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(84,76,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2050, [{ y0: 470, amp: 120, tone: 0.18, seed: 12.4 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 700, n: 3, alpha: 0.34, speed: 30, seed: 601 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 603, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      Z.flag(c, 1480, 760, 300, t, { col: 'rgba(186,52,42,.85)', seed: 7 });
      // 满宠 立持律简
      const ap = ease.out(ss(0, 1.0, lt));
      const x = lerp(360, 760, ap), y = 946, s = lerp(1.4, 2.3, ap);
      const raise = ss(0.4, 2.4, lt);
      c.save(); c.globalAlpha = clamp(ap * 1.2);
      Z.mancong(c, x, y, s, { t, raise, scroll: 1 });
      c.restore();
      // 案 + 律卷
      c.save(); c.globalAlpha = clamp(ss(1.4, 2.8, lt) * 1.4);
      c.translate(x + 250, 946 - 150);
      c.fillStyle = 'rgba(120,86,50,.9)'; c.fillRect(-60, -12, 120, 12); c.fillRect(-50, 0, 10, 40); c.fillRect(40, 0, 10, 40);
      c.fillStyle = 'rgba(216,196,150,.92)'; c.fillRect(-30, -34, 60, 24);
      c.strokeStyle = 'rgba(90,66,40,.8)'; c.lineWidth = 2; c.strokeRect(-30, -34, 60, 24);
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
