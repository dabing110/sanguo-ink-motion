// ① 泰山钜平：「禁，泰山钜平人也。」黄巾起，鲍信招合徒众，禁附从之。
// 他一生以「严整」二字立身——<｜hy_place▁holder▁no▁813｜>这一幕把种子埋下：乱世里的第一次列队。
// 主动作：应募者自右下入场（0.25→2.1s）→ 行伍对齐（1.6→2.4s）→ 于禁出列、横刀一立（2.2→2.95s）
// 母题循环：泰山云海、山雾、募旗、脚下尘。
SCENES['y1_juping'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj1', '#e9e1cb');

  // 应募新兵（align: 0 散乱 → 1 对齐）
  const recruit = (c, x, y, s, t, o = {}) => {
    const { align = 1, seed = 100, bundle = 0 } = o;
    const sw = Math.sin(t * 1.9 + seed) * 0.025 * (1 - align * 0.7);
    c.save(); c.translate(x, y); c.scale(s, s); c.rotate(sw);
    const sp = lerp(22, 9, align);
    brush(c, [[-10, -74], [-10 - sp, -34], [-12 - sp, 2]], { w: 20, tone: 0.8, dry: 0.5, seed: seed + 1, head: 0.06, tail: 0.2 });
    brush(c, [[10, -74], [10 + sp, -34], [12 + sp, 2]], { w: 20, tone: 0.8, dry: 0.5, seed: seed + 2, head: 0.06, tail: 0.2 });
    c.fillStyle = 'rgba(152,142,118,.55)';
    c.beginPath(); c.moveTo(-34, -150); c.lineTo(34, -154); c.lineTo(40, -80); c.lineTo(-38, -74); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(28,26,22,.85)'; c.lineWidth = 3; c.stroke();
    brush(c, [[-36, -80], [0, -74], [36, -80]], { w: 15, col: [104, 78, 44], tone: 0.9, dry: 0.35, seed: seed + 3 });
    c.fillStyle = 'rgba(246,238,220,.95)'; c.beginPath(); c.ellipse(2, -176, 16, 18, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.85)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = 'rgba(96,90,78,.9)'; c.beginPath(); c.ellipse(2, -184, 18, 9, 0, Math.PI, 0); c.fill();
    if (bundle) {
      brush(c, [[26, -140], [50, -130], [58, -114]], { w: 13, col: [120, 100, 70], tone: 0.85, dry: 0.5, seed: seed + 4 });
    } else {
      brush(c, [[26, -146], [46, -182], [44, -248]], { w: 8, tone: 0.85, dry: 0.4, seed: seed + 5, tail: 0.35 });
    }
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'yj1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 402, amp: 232, tone: 0.22, seed: 12.2 },
          { y0: 520, amp: 150, tone: 0.32, seed: 17.6 },
          { y0: 606, amp: 92, tone: 0.42, seed: 21.1 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 300, y1: 660, n: 4, alpha: 0.5, speed: 52, seed: 31 });
      Z.yunHai(c, t, { y: 716, h: 100, n: 5, speed: 78, alpha: 0.55 });

      brush(c, [[0, 906], [640, 894], [1280, 908], [1920, 892]], { w: 14, tone: 0.82, dry: 0.75, seed: 14, head: 0.03, tail: 0.3, reveal: ss(0, 0.35, lt) });
      Z.flag(c, 1568, 690, 214, t, { seed: 5, col: 'rgba(178,44,36,.85)', text: '募' });

      // 应募者入场并成列（起点在画内）
      const come = ss(0.25, 2.1, lt);
      const align = ss(1.55, 2.4, lt);
      const rank = [[1520, 902], [1478, 916], [1436, 930], [1394, 944]];
      for (let k = 0; k < 4; k++) {
        const px = lerp(1796 + k * 22, rank[k][0], come);
        const py = lerp(872 - k * 12, rank[k][1], come);
        c.save(); c.globalAlpha = 0.9;
        recruit(c, px, py, 1.5, t, { align, seed: 110 + k * 7, bundle: k % 2 });
        c.restore();
      }

      // 于禁（青年，在左，面向行列）
      const setp = ss(2.15, 2.95, lt);
      Z.yuJin(c, 620, 946, 2.25, { t, jiAng: lerp(-0.42, -1.06, setp), raise: setp * 0.34, stance: t * 1.3, flip: 0, old: 0, sword: 0 });
      Z.dust(c, t, { x: 700, y: 944, n: 6, seed: 41, scale: 1.3, alpha: 0.34 });
      Z.seal(c, 262, 950, '钜平', ss(2.3, 2.65, lt), { size: 86, seed: 67 });
    },
  };
})();
