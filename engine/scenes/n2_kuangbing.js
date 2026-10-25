// ② 狂病不往：操欲见之，衡自称狂病，不肯往——门一关，把司空的征召关在了门外。
// 主动作：使者持节叩门（0.3→1.5s）→ 门扉缓缓掩合（1.3→2.5s）→ 衡于门内抱袖而立（常驻）
// 母题循环：门、尘、烛。
SCENES['n2_kuangbing'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq2', '#e9e2ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'nq2_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(76,70,58,.14)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 400, y1: 700, n: 3, alpha: 0.34, speed: 32, seed: 821 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.76, dry: 0.75, seed: 823, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 25, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 55, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 6, a: 0.3 });

      // 柴门（右侧，双扇）
      const close = ss(1.3, 2.5, lt);                       // 门开→掩
      c.save();
      c.fillStyle = 'rgba(120,92,56,.55)';
      c.fillRect(1300, 480, 520, 438);
      c.strokeStyle = 'rgba(52,42,30,.88)'; c.lineWidth = 3.4; c.strokeRect(1300, 480, 520, 438);
      // 左右门扇（合拢过程）
      [[0, -1], [1, 1]].forEach(([k, dir]) => {
        c.save();
        c.translate(1560, 699);
        c.rotate(dir * close * 1.25);
        c.fillStyle = 'rgba(158,124,76,.85)';
        c.fillRect(dir > 0 ? 0 : -260, -219, 260, 438);
        c.strokeStyle = 'rgba(56,42,28,.9)'; c.lineWidth = 3.2;
        c.strokeRect(dir > 0 ? 0 : -260, -219, 260, 438);
        // 门板横纹
        c.strokeStyle = 'rgba(96,70,42,.7)'; c.lineWidth = 2.4;
        for (let j = 0; j < 4; j++) { c.beginPath(); c.moveTo(dir > 0 ? 14 : -246, -160 + j * 100); c.lineTo(dir > 0 ? 246 : -14, -160 + j * 100); c.stroke(); }
        c.restore();
      });
      c.restore();

      // 主动作一：使者持节叩门（门外）
      const come = ss(0.3, 1.5, lt);
      const ex = lerp(1080, 1190, come);
      c.save(); c.globalAlpha = 0.92;
      brush(c, [[ex, 950], [ex - 3, 850], [ex - 1, 780]], { w: 18, tone: 0.66, dry: 0.5, seed: 825, head: 0.08, tail: 0.22 });
      c.fillStyle = 'rgba(44,40,34,.88)'; c.beginPath(); c.arc(ex - 1, 768, 12, 0, Math.PI * 2); c.fill();
      // 节（旌节，常驻轻摆）
      const jsw = Math.sin(t * 2.2) * 5;
      brush(c, [[ex + 16, 900], [ex + 30 + jsw, 800], [ex + 34 + jsw, 736]], { w: 5, col: [150, 108, 60], tone: 0.9, dry: 0.4, seed: 827, tail: 0.5 });
      c.fillStyle = 'rgba(220,206,178,.9)';
      for (let k = 0; k < 4; k++) { c.beginPath(); c.ellipse(ex + 32 + jsw, 760 + k * 14, 9, 4, 0.4, 0, Math.PI * 2); c.fill(); }
      c.restore();
      Z.dust(c, t, { x: ex - 80, y: 952, n: 4, seed: 829, scale: 1.0, alpha: 0.24 });

      // 主动作二：衡于门内抱袖而立（透过门缝的剪影，闭门后仍站定——不肯往）
      c.save(); c.globalAlpha = 1 - close * 0.35;
      c.save(); c.translate(1560, 920); c.scale(1, 1);
      c.save(); c.rotate(Math.sin(t * 1.4) * 0.012);
      c.fillStyle = 'rgba(70,62,52,.85)';
      c.beginPath();
      c.moveTo(-26, 0); c.quadraticCurveTo(-36, -80, -26, -128); c.quadraticCurveTo(0, -144, 26, -128); c.quadraticCurveTo(36, -80, 26, 0); c.closePath(); c.fill();
      c.beginPath(); c.arc(0, -158, 14, 0, Math.PI * 2); c.fill();
      c.restore(); c.restore(); c.restore();

      // 烛（常驻）
      c.save();
      brush(c, [[380, 916], [380, 818]], { w: 9, tone: 0.82, dry: 0.4, seed: 831 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.2) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(380, 798, 3, 380, 798, 50 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.5)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(380, 798, 50 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();

      Z.bigText(c, '自称狂病', { x: 900, y: 290, size: 78, gap: 16, appear: ss(2.05, 2.75, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '不往', ss(2.3, 2.65, lt), { size: 86, seed: 833 });
    },
  };
})();
