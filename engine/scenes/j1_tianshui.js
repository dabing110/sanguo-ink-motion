// ① 天水麒麟儿：姜维字伯约，天水冀人也。好郑氏学，仕郡为上计掾，参本郡军事。
//   （时人目为「天水麒麟儿」）
// 主动作：冀城与云气起（0.15→1.0s）→ 麒麟自右入、立定（0.4→1.7s）→ 姜维执卷册而立、展卷（1.0→2.9s）；
// 母题循环：城头旗、云气、浮尘。
SCENES['j1_tianshui'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw1', '#efe7d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      // 冀城：城楼 + 远山
      Z.wash(c, 'jw1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 260, tone: 0.24, seed: 21 });
        g.save(); g.translate(1560, 900); g.scale(1.35, 1.35);
        g.fillStyle = 'rgba(196,180,150,.62)'; g.fillRect(-130, -180, 260, 180);
        g.strokeStyle = 'rgba(52,42,32,.85)'; g.lineWidth = 3; g.strokeRect(-130, -180, 260, 180);
        g.fillStyle = 'rgba(46,36,28,.7)'; g.fillRect(-30, -80, 60, 80);                     // 城门
        g.fillStyle = 'rgba(158,124,78,.8)';
        g.beginPath(); g.moveTo(-160, -180); g.lineTo(0, -224); g.lineTo(160, -180); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(46,38,28,.85)'; g.lineWidth = 2.6; g.stroke();
        g.restore();
      }, { blur: 3, halo: 14, haloA: 0.22 });
      // 云气（循环一）
      Z.mist(c, t, { y0: 250, y1: 580, n: 4, alpha: 0.55, speed: 44, seed: 31 });
      // 城头旗（循环二）
      Z.flag(c, 1430, 640, 190, t, { seed: 11, col: 'rgba(178,44,36,.82)' });
      Z.flag(c, 1700, 636, 160, t, { seed: 12, col: 'rgba(96,90,72,.8)' });
      // 地面
      brush(c, [[0, 892], [620, 878], [1280, 894], [1920, 874]], { w: 15, tone: 0.84, dry: 0.74, seed: 41, head: 0.04, tail: 0.3, reveal: ss(0, 0.32, lt) });

      // 主动作一：麒麟自右入，立定（匀速，不用 ease.out —— 尾段会死）
      const qk = ss(0.4, 1.7, lt);
      Z.qilin(c, lerp(2200, 1330, qk), 916, 1.15, { t, tone: 0.9, flip: 1, alpha: 0.35 + 0.65 * qk });
      // 主动作二：姜维执卷册而立 → 展卷（尾段第二拍）
      const walk = ss(0.9, 2.0, lt);
      const jx = lerp(360, 700, walk);
      const open = ss(2.0, 2.95, lt);
      Z.jiangWei(c, jx, 926, 2.3, {
        t, jiAng: lerp(-0.72, -0.5, walk) + open * 0.12, raise: 0, stance: t * 1.5,
        flip: 0, robe: 1, scroll: 0.4 + open * 0.6,
      });
      // 浮尘（循环三）
      Z.dust(c, t, { x: 760, y: 918, n: 7, seed: 51, scale: 1.4, alpha: 0.34 });
      Z.seal(c, 240, 946, '天水', ss(2.2, 2.5, lt), { size: 88, seed: 61 });
    },
  };
})();
