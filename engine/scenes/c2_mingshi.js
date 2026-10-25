// ② 命世之才：兴平元年? —— 兖州刺史刘岱死于黄巾，宫为操说别驾、治中：「曹东郡，命世才也，若迎以牧州，必宁生民。」
// 主动作：宫立于州堂，扬声进言（0.4→2.2s 举袖）→ 「曹」旗缓缓升起（1.2→2.6s）→ 群僚颔首（2.0→2.95s）
// 母题循环：旗升、帐幕、香尘。
SCENES['c2_mingshi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq2', '#e9e2cc');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'cq2_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(84,76,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(72,58,42,.5)'; g.lineWidth = 15;
        [[220, 0, 220, 780], [1700, 0, 1700, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(110, 108); g.lineTo(1810, 108); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 410, y1: 700, n: 3, alpha: 0.36, speed: 30, seed: 421 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 423, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 21, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 51, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 12, a: 0.3 });

      // 主动作一：宫立于堂前，举袖进言
      const raise = ss(0.4, 2.2, lt);
      Z.chenGong(c, 700, 966, 2.55, { t, raise: raise * 0.5, stance: t * 1.3, flip: 1, sword: 0 });

      // 主动作二：「曹」旗自旗下缓缓升起（旗杆不动，旗面 y 平移）
      const up = ss(1.2, 2.6, lt);
      const fy = lerp(760, 560, up);
      brush(c, [[1250, 912], [1250, 470]], { w: 9, tone: 0.85, dry: 0.4, seed: 425 });
      c.save();
      Z.flag(c, 1250, fy, 190, t, { seed: 427, col: 'rgba(178,44,36,.85)', text: '曹' });
      c.restore();

      // 群僚（四位，原地颔首——用点头的 rotate 呼吸）
      c.save(); c.globalAlpha = 0.85;
      [1460, 1560, 1660, 1760].forEach((bx, k) => {
        const nod = Math.sin(t * 1.6 + k) * 0.03;
        c.save(); c.translate(bx, 956); c.rotate(nod * 0.4);
        c.fillStyle = 'rgba(96,90,78,.55)';
        c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-30, -80, -22, -120); c.quadraticCurveTo(0, -132, 22, -120); c.quadraticCurveTo(30, -80, 26, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -146, 12, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();

      // 主动作三：正印官（别驾）抚须颔首——居中一位稍大
      c.save(); c.globalAlpha = 0.9;
      c.save(); c.translate(1120, 948); c.rotate(Math.sin(t * 1.4) * 0.025);
      c.fillStyle = 'rgba(120,108,88,.6)';
      c.beginPath(); c.moveTo(-30, 0); c.quadraticCurveTo(-36, -90, -26, -134); c.quadraticCurveTo(0, -148, 26, -134); c.quadraticCurveTo(36, -90, 30, 0); c.closePath(); c.fill();
      c.beginPath(); c.arc(0, -162, 14, 0, Math.PI * 2); c.fill();
      c.restore(); c.restore();

      Z.dust(c, t, { x: 500, y: 960, n: 5, seed: 429, scale: 1.2, alpha: 0.26 });
      Z.bigText(c, '命世之才', { x: 960, y: 286, size: 78, gap: 16, appear: ss(2.0, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '兖州', ss(2.25, 2.6, lt), { size: 86, seed: 431 });
    },
  };
})();
