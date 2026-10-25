// ③ 居中持重：太祖每征伐在外，彧常居中持重——许都的每一份军报，都从他的案头过。
// 主动作：批简（0.4→2.2s，逐卷展开）→ 搁笔抬首（1.9→2.6s）→ 举袖批复（2.3→2.95s）
// 母题循环：香炉烟、灯焰、案上简册渐移、檐尘。
SCENES['x3_chizhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq3', '#eae3cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'xq3_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(88,78,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        // 许都堂内：梁柱
        g.save(); g.strokeStyle = 'rgba(72,58,42,.5)'; g.lineWidth = 16;
        [[240, 0, 240, 760], [1680, 0, 1680, 760]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 10; g.beginPath(); g.moveTo(120, 120); g.lineTo(1800, 120); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 720, n: 3, alpha: 0.4, speed: 34, seed: 281 });
      brush(c, [[0, 916], [640, 906], [1280, 918], [1920, 904]], { w: 13, tone: 0.78, dry: 0.75, seed: 283, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带 + 往复批笔
      Z.curtain(c, 180, 130, t, { seed: 31, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 32, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 5, a: 0.3 });

      // 书案
      c.fillStyle = 'rgba(142,110,68,.85)';
      c.fillRect(700, 820, 640, 34);
      c.strokeStyle = 'rgba(56,44,30,.9)'; c.lineWidth = 3.2; c.strokeRect(700, 820, 640, 34);
      brush(c, [[760, 854], [760, 916]], { w: 15, tone: 0.78, dry: 0.5, seed: 285 });
      brush(c, [[1280, 854], [1280, 916]], { w: 15, tone: 0.78, dry: 0.5, seed: 286 });

      // 简册堆（随批阅渐移：三摞）
      const read = ss(0.4, 2.2, lt);
      for (let k = 0; k < 3; k++) {
        const bx = 790 + k * 170;
        const dy = -lerp(0, 10, read * (k === 1 ? 1 : 0.4));
        c.save(); c.translate(bx, 812 + dy);
        c.fillStyle = 'rgba(226,210,172,.92)';
        for (let j = 0; j < 4; j++) c.fillRect(-60, -10 - j * 9, 120 + j * 4, 7);
        c.strokeStyle = 'rgba(80,64,44,.7)'; c.lineWidth = 1.6;
        for (let j = 0; j < 4; j++) c.strokeRect(-60, -10 - j * 9, 120 + j * 4, 7);
        c.restore();
      }

      // 灯焰（左，常驻运动）
      c.save();
      brush(c, [[430, 916], [430, 800]], { w: 9, tone: 0.85, dry: 0.4, seed: 287 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.2) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(430, 780, 3, 430, 780, 60 + f * 14);
      g2.addColorStop(0, 'rgba(255,196,96,.6)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(430, 780, 60 + f * 14, 0, Math.PI * 2); c.fill();
      c.restore();

      // 荀彧案后（居中偏右）
      const raise = ss(1.9, 2.6, lt), ack = ss(2.3, 2.95, lt);
      Z.xunYu(c, 1030, 880, 2.5, { t, raise: raise * 0.4 + ack * 0.3, stance: t * 1.1, flip: 0, dark: 0, bow: 0 });

      // 书吏自右入，呈简（小位移）
      const co = ss(0.9, 2.1, lt);
      const sx = lerp(1780, 1620, co);
      c.save(); c.globalAlpha = 0.85;
      brush(c, [[sx, 946], [sx - 4, 886], [sx - 2, 852]], { w: 17, tone: 0.74, dry: 0.5, seed: 289, head: 0.08, tail: 0.24 });
      c.fillStyle = 'rgba(44,40,34,.86)'; c.beginPath(); c.arc(sx - 2, 842, 11, 0, Math.PI * 2); c.fill();
      c.restore();

      // 香炉（案头小炉——荀令留香）
      Z.xiangLu(c, 1490, 806, 0.9, t, { smoke: 1, seed: 6 });
      Z.bigText(c, '居中持重', { x: 960, y: 286, size: 78, gap: 16, appear: ss(2.0, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '尚书令', ss(2.3, 2.65, lt), { size: 80, seed: 291 });
    },
  };
})();
