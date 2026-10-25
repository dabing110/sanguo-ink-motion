// ① 冀州谋主：丰天姿瑰杰，权略多奇。袁绍得之，以为别驾，参谋帷幄，甚见器任。
// 主动作：绍延丰上座（0.3→1.4s）→ 丰展图进策（1.2→2.4s）→ 众僚环听（2.0→2.95s 点首）
// 母题循环：沙盘烛、帐幕、尘。
SCENES['f1_jizhou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq1', '#e9e2cc');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'fq1_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(84,76,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(72,58,42,.5)'; g.lineWidth = 15;
        [[230, 0, 230, 780], [1690, 0, 1690, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(110, 108); g.lineTo(1810, 108); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 700, n: 3, alpha: 0.34, speed: 30, seed: 601 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 603, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 31, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 61, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 12, a: 0.3 });

      // 主位袁绍（延丰上座：抬手相请）
      const ask = ss(0.3, 1.4, lt);
      Z.leader(c, 1380, 952, 2.45, { t, raise: ask * 0.5, stance: t * 1.2, flip: 1, cape: 1 });

      // 主动作二：丰自左入，展图进策
      const come = ss(0.45, 2.1, lt);                        // 620px / 1.65s ≈ 376px/s
      const px = lerp(240, 860, come);
      const show = ss(1.2, 2.4, lt);
      Z.tianFeng(c, px, 958, 2.5, { t, raise: show * 0.5, stance: t * 1.3, flip: 0, stick: 1, strike: 0 });
      // 兵图（展开后亮出于案几上方）
      if (show > 0) {
        c.save(); c.globalAlpha = clamp(show * 2.2);
        c.translate(px + 130, 958 - 240);
        c.rotate(-0.05);
        c.fillStyle = 'rgba(244,236,212,.95)';
        c.fillRect(-96, -56, 192, 112);
        c.strokeStyle = 'rgba(56,46,32,.9)'; c.lineWidth = 2.8; c.strokeRect(-96, -56, 192, 112);
        c.strokeStyle = 'rgba(90,72,48,.75)'; c.lineWidth = 2.4;
        c.beginPath(); c.moveTo(-70, 20); c.quadraticCurveTo(0, -30, 70, 10); c.stroke();      // 河
        c.fillStyle = 'rgba(140,60,40,.85)';
        c.beginPath(); c.arc(30, -18, 12, 0, Math.PI * 2); c.fill();                            // 冀州
        c.strokeStyle = 'rgba(52,42,30,.8)'; c.lineWidth = 2; c.stroke();
        c.restore();
      }

      // 众僚环听（点首）
      c.save(); c.globalAlpha = 0.85;
      [1120, 1240, 1560, 1680].forEach((bx, k) => {
        c.save(); c.translate(bx, 950); c.rotate(Math.sin(t * 1.6 + k) * 0.02);
        c.fillStyle = 'rgba(96,90,78,.55)';
        c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-30, -80, -22, -120); c.quadraticCurveTo(0, -132, 22, -120); c.quadraticCurveTo(30, -80, 26, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -146, 12, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();

      // 烛（常驻）
      c.save();
      brush(c, [[420, 916], [420, 812]], { w: 9, tone: 0.84, dry: 0.4, seed: 605 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.2) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(420, 792, 3, 420, 792, 54 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.55)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(420, 792, 54 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();
      Z.dust(c, t, { x: 1000, y: 952, n: 5, seed: 607, scale: 1.2, alpha: 0.24 });

      Z.bigText(c, '参谋帷幄', { x: 960, y: 286, size: 78, gap: 16, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '别驾', ss(2.25, 2.6, lt), { size: 86, seed: 609 });
    },
  };
})();
