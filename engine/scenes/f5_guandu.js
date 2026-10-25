// ⑤ 官渡溃：绍军官渡，操夜袭乌巢，火烧粮营，全军溃散——田丰在狱中，等来了他预言过的那一天。
// 主动作：连营渐显（0.3→1.4s）→ 乌巢火起（0.8→2.4s 自左向右）→ 溃卒四散（1.8→3.35s）
// 母题循环：火焰、烟、奔卒、尘。
SCENES['f5_guandu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq5', '#e8dfc8');

  const fire = (c, x, y, s, t, seed = 1, k = 1) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.save(); c.globalCompositeOperation = 'lighter';
    const g = c.createRadialGradient(0, -30, 4, 0, -30, 160);
    g.addColorStop(0, `rgba(255,180,86,${0.5 * k})`); g.addColorStop(1, 'rgba(255,140,60,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, -30, 160, 0, Math.PI * 2); c.fill();
    c.restore();
    for (let j = 0; j < 5; j++) {
      const f = (Math.sin(t * 5.6 + j * 1.9 + seed) * 0.5 + 0.5) * k;
      const h = 52 + f * 78;
      brush(c, [[j * 12 - 24, 0], [j * 12 - 20 + Math.sin(t * 3 + j) * 8, -h * 0.55], [j * 12 - 14 + Math.sin(t * 4.2 + j) * 14, -h]],
        { w: (14 - j * 1.6) * (0.4 + k * 0.6), col: [236, 122 + f * 92, 42], tone: 0.95, dry: 0.6, seed: seed * 9 + j, tail: 0.9, bristles: 3 });
    }
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'fq5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 456, amp: 116, tone: 0.2, seed: 681.4 }]);
        g.fillStyle = 'rgba(56,54,60,.16)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 310, y1: 620, n: 4, alpha: 0.42, speed: 42, seed: 683 });
      brush(c, [[0, 910], [640, 898], [1280, 912], [1920, 896]], { w: 14, tone: 0.76, dry: 0.75, seed: 685, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 33, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 63, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 14, a: 0.3 });

      // 主动作一：乌巢连营（渐显）
      const camp = ss(0.3, 1.4, lt);
      c.save(); c.globalAlpha = camp * 0.9;
      for (let k = 0; k < 6; k++) {
        const bx = 200 + k * 290;
        brush(c, [[bx - 60, 856], [bx - 56, 800]], { w: 6, tone: 0.8, dry: 0.4, seed: 687 + k });
        brush(c, [[bx + 60, 856], [bx + 56, 800]], { w: 6, tone: 0.8, dry: 0.4, seed: 693 + k });
        c.fillStyle = 'rgba(212,198,168,.6)';
        c.beginPath(); c.moveTo(bx - 54, 852); c.quadraticCurveTo(bx, 770, bx + 54, 852); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(52,44,34,.82)'; c.lineWidth = 2.6; c.stroke();
        brush(c, [[bx, 790], [bx + 2, 730]], { w: 5, tone: 0.82, dry: 0.4, seed: 699 + k });
      }
      Z.flag(c, 200, 730, 110, t, { seed: 705, col: 'rgba(120,96,60,.8)', text: '袁' });
      Z.flag(c, 1650, 736, 110, t, { seed: 707, col: 'rgba(120,96,60,.8)' });
      c.restore();

      // 主动作二：乌巢火起（自左向右蔓延）
      const burn = ss(0.8, 2.4, lt);
      for (let k = 0; k < 6; k++) {
        const on = clamp(burn * 6 - k);
        if (on <= 0) continue;
        fire(c, 200 + k * 290, 850, 1.0, t, 3 + k, on);
      }
      // 烟
      c.save(); c.filter = 'blur(12px)';
      for (let k = 0; k < 6; k++) {
        const on = clamp(burn * 6 - k);
        if (on <= 0.05) continue;
        for (let j = 0; j < 2; j++) {
          const ph = ((t * 0.3 + j * 0.5 + k * 0.17) % 1);
          c.fillStyle = `rgba(88,86,82,${0.3 * (1 - ph) * on})`;
          c.beginPath(); c.ellipse(200 + k * 290 + Math.sin(t * 0.8 + j + k) * 28 + ph * 40, 800 - ph * 320, 44 + ph * 110, 32 + ph * 80, 0, 0, Math.PI * 2); c.fill();
        }
      }
      c.filter = 'none'; c.restore();

      // 主动作三：溃卒四散（三卒在画内小范围奔逃）
      const flee = ss(1.8, 3.35, lt);
      for (let k = 0; k < 3; k++) {
        const px = lerp(lerp(900 + k * 140, 700 + k * 160, flee), 980 + k * 150, 0.5) + Math.sin(t * 6 + k * 2) * 6 * flee;
        const py = 948 + k * 14 + Math.abs(Math.sin(t * 9 + k)) * -8 * flee;
        c.save(); c.globalAlpha = 0.9;
        brush(c, [[px, py], [px + Math.sin(t * 8 + k) * 8, py - 60], [px - Math.sin(t * 8 + k) * 6, py - 108]], { w: 16, tone: 0.7, dry: 0.5, seed: 709 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(44,40,34,.86)'; c.beginPath(); c.arc(px, py - 120, 10, 0, Math.PI * 2); c.fill();
        c.restore();
      }
      Z.dust(c, t, { x: 1100, y: 952, n: 7, seed: 713, scale: 1.5, alpha: 0.32 });

      Z.bigText(c, '乌巢火起', { x: 1060, y: 268, size: 78, gap: 18, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '官渡', ss(2.55, 2.9, lt), { size: 86, seed: 715 });
    },
  };
})();
