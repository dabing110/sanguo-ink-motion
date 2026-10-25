// ① 平原狂士：衡少有才辩，而尚气刚傲，好矫时慢物——许都名士满座，他谁都没看在眼里。
// 主动作：名士环坐论议（常驻点首）→ 衡自左傲立入场（0.4→2.2s）→ 拂袖过座（2.0→2.95s）
// 母题循环：帐幕、尘、烛。
SCENES['n1_fuping'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq1', '#eae3cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'nq1_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(84,76,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(72,58,42,.45)'; g.lineWidth = 15;
        [[220, 0, 220, 780], [1700, 0, 1700, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(110, 108); g.lineTo(1810, 108); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 700, n: 3, alpha: 0.32, speed: 30, seed: 801 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 803, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 16, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 46, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 17, a: 0.3 });

      // 名士环坐（六席，点首议谈）
      c.save(); c.globalAlpha = 0.85;
      [[340, 940], [520, 928], [720, 952], [1240, 948], [1440, 930], [1620, 944]].forEach(([bx, by], k) => {
        c.save(); c.translate(bx, by); c.rotate(Math.sin(t * 1.5 + k * 1.3) * 0.022);
        c.fillStyle = 'rgba(96,90,78,.5)';
        c.beginPath(); c.moveTo(-24, 0); c.quadraticCurveTo(-28, -74, -20, -112); c.quadraticCurveTo(0, -124, 20, -112); c.quadraticCurveTo(28, -74, 24, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -136, 11, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();

      // 主动作：衡自左傲立入场（660px/1.8s ≈ 367px/s），过座不停
      const come = ss(0.4, 2.2, lt);
      const px = lerp(180, 840, come);
      const sweep = ss(2.0, 2.95, lt);
      Z.miHeng(c, px, 962, 2.5, { t, raise: sweep * 0.3, stance: t * 1.6, flip: 0, drum: 0, bared: 0, pen: 0 });
      // 拂袖的风（袖过处一线尘）
      if (sweep > 0) {
        c.save(); c.globalAlpha = sweep * 0.5;
        brush(c, [[px - 90, 880], [px - 180, 860], [px - 270, 880]], { w: 13, col: [216, 206, 186], tone: 0.72, dry: 0.6, seed: 805, reveal: sweep, tail: 0.6 });
        c.restore();
      }
      Z.dust(c, t, { x: px - 130, y: 960, n: 5, seed: 807, scale: 1.2, alpha: 0.28 });

      Z.bigText(c, '尚气刚傲', { x: 1000, y: 286, size: 78, gap: 16, appear: ss(2.0, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '平原', ss(2.25, 2.6, lt), { size: 86, seed: 809 });
    },
  };
})();
