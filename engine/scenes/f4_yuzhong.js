// ④ 狱中：丰械系于狱。窗外云走，栏间尘浮——他被自己的正确关了起来。
// 静幕（全片最静）：只有云、尘光、呼吸与枷的轻响。
// 主动作：丰坐于狱中、时时望窗（0.5→2.4s 缓转头）→ 枷上双手轻抚（1.8→2.8s）→ 烛焰摇（常驻）
// 母题循环：狱窗尘光、云海（窗外）、烛。
SCENES['f4_yuzhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq4', '#e8e1c9');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'fq4_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(64,60,58,.2)'; g.fillRect(0, 0, 1920, 1080);   // 狱中昏暗
        g.save(); g.strokeStyle = 'rgba(52,44,38,.55)'; g.lineWidth = 14;
        [[200, 0, 200, 800], [1720, 0, 1720, 800]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      // 夜色
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(110,108,126,.4)'; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 430, y1: 720, n: 3, alpha: 0.3, speed: 24, seed: 661 });
      brush(c, [[0, 922], [640, 912], [1280, 924], [1920, 910]], { w: 13, tone: 0.7, dry: 0.75, seed: 663, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 墨色云影（狱中静幕补运动；暗场必须高对比）
      Z.curtain(c, 180, 130, t, { seed: 41, a: 0.32 });
      Z.curtain(c, 1740, 130, t, { seed: 42, a: 0.32 });
      Z.inkCloud(c, t, { y: 500, h: 48, n: 4, speed: 62, span: 1300, seed: 4 });

      // 狱窗（右侧高窗，光透进来）
      Z.yuChuang(c, 1450, 520, 1.35, t, { seed: 3 });
      // 窗光柱（lighter 梯形明带，自高窗投下，随 sway 缓移——高对比帧差主力）
      {
        const sway = Math.sin(t * 1.5) * 110;
        const beamA = 30 / 100 + Math.sin(t * 1.3) * 12 / 100;
        c.save(); c.globalCompositeOperation = 'lighter';
        c.globalAlpha = beamA;
        c.fillStyle = 'rgba(255,244,200,1)';
        c.beginPath();
        c.moveTo(1410, 520); c.lineTo(1490, 520);
        c.lineTo(1240 + sway, 1080); c.lineTo(1000 + sway, 1080);
        c.closePath(); c.fill();
        c.restore();
      }

      // 丰（左，坐姿：袍身压低，cuffed）
      c.save(); c.translate(0, 34);
      Z.tianFeng(c, 560, 950, 2.6, { t: t * 0.5, raise: 0, stance: 0, flip: 0, stick: 0, cuffed: 1 });
      c.restore();
      // 望窗的转头（用一小片光影在他脸上缓移示意）+ 抚枷的手（微动）
      const look = ss(0.5, 2.4, lt), rub = ss(1.8, 2.8, lt);
      c.save(); c.globalAlpha = 0.5;
      brush(c, [[620 + look * 60, 950 - 190], [700 + look * 60, 950 - 210], [780 + look * 60, 950 - 190]], { w: 14, col: [240, 228, 196], tone: 0.5, dry: 0.7, seed: 665, tail: 0.9 });
      c.restore();
      c.save(); c.globalAlpha = 0.85;
      brush(c, [[560 - 40, 950 - 30], [560 - 40 + rub * 8, 950 - 24], [560 - 40 + rub * 10, 950 - 18]], { w: 10, col: [128, 98, 60], tone: 0.9, dry: 0.5, seed: 667, tail: 0.6 });
      c.restore();

      // 烛（更暗，常驻）
      c.save();
      brush(c, [[280, 918], [280, 830]], { w: 9, tone: 0.8, dry: 0.4, seed: 669 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 4.8) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(280, 812, 3, 280, 812, 42 + f * 10);
      g2.addColorStop(0, 'rgba(255,192,92,.45)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(280, 812, 42 + f * 10, 0, Math.PI * 2); c.fill();
      c.restore();

      // 窗外云海（深色墙面上的近白云影——帧差主力）
      Z.yunHai(c, t, { y: 500, h: 80, n: 4, speed: 62, alpha: 0.5, span: 1300 });
      Z.bigText(c, '以身试言', { x: 960, y: 286 + Math.sin(t * 1.25) * 7, size: 76, gap: 16, appear: ss(2.0, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '系狱', ss(2.25, 2.6, lt), { size: 86, seed: 671 });
    },
  };
})();
