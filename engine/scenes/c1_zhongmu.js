// ① 捉放曹：太祖过中牟，为亭长所疑，执诣县。时宫为县吏，见而义之，夜释之，并弃官相从。
// 主动作：操跪于狱中（常在）→ 宫举灯近前（0.3→1.5s）→ 俯身解缚（1.3→2.4s）→ 二人对视（2.2→2.95s）
// 母题循环：灯焰、夜尘、更漏水滴（省略——灯+焰+尘足够）。
SCENES['c1_zhongmu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq1', '#e7e0ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'cq1_bg', 0.5 + 0.5 * grow, (g) => {
        // 县狱内景：梁柱与栅栏
        g.save(); g.strokeStyle = 'rgba(66,54,42,.55)'; g.lineWidth = 14;
        [[260, 0, 260, 720], [1660, 0, 1660, 720]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(140, 108); g.lineTo(1780, 108); g.stroke();
        g.lineWidth = 7;
        for (let x = 1200; x <= 1800; x += 60) { g.beginPath(); g.moveTo(x, 560); g.lineTo(x, 920); g.stroke(); }
        g.beginPath(); g.moveTo(1180, 566); g.lineTo(1820, 566); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      // 夜色
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(96,96,120,.45)'; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 420, y1: 720, n: 3, alpha: 0.34, speed: 28, seed: 401 });
      brush(c, [[0, 920], [640, 910], [1280, 922], [1920, 908]], { w: 13, tone: 0.74, dry: 0.75, seed: 403, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 11, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 41, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 12, a: 0.3 });

      // 被缚的曹操（跪于狱中）
      Z.fuZhe(c, 1380, 946, 2.35, t, { tone: 'rgba(110,100,86,.7)', seed: 91 });

      // 主动作一：宫举灯近前
      const come = ss(0.3, 1.5, lt);
      const px = lerp(340, 820, come);                        // 480px / 1.2s = 400px/s 顶格
      // 灯（随人移动，焰常动）
      const lx = px - 96, ly = 946 - 250 - ease.out(come) * 10;
      c.save();
      brush(c, [[px - 60, 820], [lx, ly + 60]], { w: 6, tone: 0.8, dry: 0.5, seed: 405 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.6) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(lx, ly, 3, lx, ly, 66 + f * 16);
      g2.addColorStop(0, 'rgba(255,198,98,.65)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(lx, ly, 66 + f * 16, 0, Math.PI * 2); c.fill();
      c.restore();

      // 主动作二：俯身解缚（bow 渐增）
      const bow = ss(1.3, 2.4, lt);
      Z.chenGong(c, px, 952, 2.45, { t, raise: bow * 0.3, stance: t * 1.3, flip: 0, sword: 0, bound: 0, bow: bow * 0.22 });

      // 主动作三：缚绳落地（解开的绳落下）
      const drop = ss(2.2, 2.95, lt);
      if (drop > 0) {
        c.save(); c.globalAlpha = drop; c.strokeStyle = 'rgba(140,108,64,.9)'; c.lineWidth = 4;
        brush(c, [[1368, 936 - (1 - drop) * 40], [1380, 948], [1396, 950]], { w: 4, col: [140, 108, 64], tone: 0.9, dry: 0.5, seed: 407, reveal: drop });
        c.restore();
      }

      // 灯架（左，补常驻运动）
      Z.dust(c, t, { x: 700, y: 952, n: 5, seed: 409, scale: 1.1, alpha: 0.26 });
      Z.bigText(c, '见而义之', { x: 900, y: 292, size: 76, gap: 16, appear: ss(2.05, 2.75, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 252, 950, '中牟', ss(2.25, 2.6, lt), { size: 86, seed: 411 });
    },
  };
})();
