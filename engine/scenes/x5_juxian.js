// ⑤ 取士不以一揆：彧前后所举，命世大才——郭嘉、荀攸、钟繇、陈群、司马懿，皆一时之选。
// 他最大的功业不是打赢哪一仗，而是给这个时代挑对了人。
// 主动作：袍影依次显影（0.4→2.2s）→ 彧逐一举袖相引（0.9→2.6s）→ 众贤拱手（2.1→2.95s）
// 母题循环：香烟、帐幕、尘。
SCENES['x5_juxian'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq5', '#eae3cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'xq5_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(84,76,60,.1)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(72,58,42,.45)'; g.lineWidth = 15;
        [[200, 0, 200, 780], [1720, 0, 1720, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(100, 110); g.lineTo(1820, 110); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 420, y1: 700, n: 3, alpha: 0.38, speed: 32, seed: 321 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 323, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带
      Z.curtain(c, 180, 130, t, { seed: 51, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 52, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 9, a: 0.3 });

      // 主动作一：群贤袍影依次显影（居于后列）
      const prog = ss(0.4, 2.2, lt);
      Z.xianYing(c, 1010, 900, 1.5, prog, t, { n: 5, seed: 8 });

      // 主动作二：荀彧居前，逐一举袖相引
      const raise = ss(0.9, 2.6, lt), bow = ss(2.1, 2.95, lt);
      Z.xunYu(c, 560, 966, 2.55, { t, raise: raise * 0.45, stance: t * 1.2, flip: 0, dark: 0, bow: bow * 0.22 });

      // 主动作三：最前一贤出列拱手（小位移：200px / 1.2s）
      const step = ss(2.0, 2.95, lt);
      const fx = lerp(1360, 1180, step);
      if (step > 0) {
        c.save(); c.globalAlpha = 0.9;
        c.fillStyle = 'rgba(64,68,76,.7)';
        c.beginPath();
        c.moveTo(fx - 40, 960);
        c.quadraticCurveTo(fx - 44, 844, fx - 34, 802);
        c.quadraticCurveTo(fx, 767, fx + 34, 802);
        c.quadraticCurveTo(fx + 44, 844, fx + 40, 960);
        c.quadraticCurveTo(fx, 966, fx - 40, 960);
        c.closePath(); c.fill();
        c.beginPath(); c.arc(fx + 2, 762, 13, 0, Math.PI * 2); c.fill();
        // 拱手的双袖
        c.strokeStyle = 'rgba(64,68,76,.7)'; c.lineWidth = 16; c.lineCap = 'round';
        c.beginPath(); c.moveTo(fx + 30, 816); c.quadraticCurveTo(fx + 44, 834, fx + 18, 840); c.stroke();
        c.restore();
      }

      Z.xiangLu(c, 250, 930, 1.3, t, { smoke: 1, seed: 14 });
      Z.bigText(c, '取士不以一揆', { x: 1080, y: 280 + Math.sin(t * 1.25) * 7, size: 66, gap: 14, appear: ss(2.15, 2.85, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 948, '王佐', ss(2.3, 2.65, lt), { size: 88, seed: 327 });
    },
  };
})();
