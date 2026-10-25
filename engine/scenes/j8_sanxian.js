// ⑧ 一计害三贤：维知会有异志，乃说会使反，欲尽杀魏将、复立汉室。会乱，魏军愤，杀会及维，
//   维妻子皆伏诛。世语曰：维死时见剖，胆如斗大。
// 主动作：维独步入、密计（0.2→1.3s）→ 三贤之影（会、艾、维）次第现（1.2→2.3s）→ 乱兵（2.3→3.0s）→ 胆大如斗（2.9→3.7s）；
// 母题循环：烛火、尘、夜云。
SCENES['j8_sanxian'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw8', '#cec7b4');

  // 一贤：立姿剪影（会 / 艾 / 维），有肩有腰有袍摆，不画脸
  function shadow(c, x, y, s, on, t, seed, col) {
    if (on <= 0) return;
    c.save(); c.translate(x, y); c.scale(s, s); c.globalAlpha = on * 0.82;
    const sway = Math.sin(t * 1.5 + seed) * 5;
    c.fillStyle = col;
    c.beginPath();                                       // 袍身：肩宽、收腰、下摆外撇
    c.moveTo(-40, 0); c.quadraticCurveTo(-46, -70, -30, -120);
    c.quadraticCurveTo(-36, -146, -22, -152);            // 左肩
    c.quadraticCurveTo(0, -160, 22, -152);               // 颈窝
    c.quadraticCurveTo(36, -146, 30, -120);              // 右肩
    c.quadraticCurveTo(46, -70, 40, 0);
    c.quadraticCurveTo(0, 10 + sway * 0.3, -40, 0);      // 下摆
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(20,18,16,.8)'; c.lineWidth = 2.6; c.stroke();
    c.beginPath(); c.arc(2 + sway * 0.2, -176, 17, 0, Math.PI * 2); c.fill();   // 头
    brush(c, [[-30, -118], [0, -112 + sway * 0.3], [32, -118]], { w: 10, tone: 0.4, dry: 0.4, seed: seed });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'jw8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 220, tone: 0.18, seed: 47 });
      }, { blur: 4, halo: 16, haloA: 0.22 });
      // 地面
      brush(c, [[0, 900], [640, 888], [1280, 902], [1920, 886]], { w: 14, tone: 0.8, dry: 0.76, seed: 48, head: 0.03, tail: 0.32, reveal: ss(0, 0.32, lt) });
      // 夜云（循环一）
      Z.mist(c, t, { y0: 240, y1: 580, n: 4, alpha: 0.5, speed: 40, seed: 38 });

      // 主动作一：维独步入，袖中密计（走慢一点 —— 人物大幅平移会把单帧差顶过阈值）
      const walk = ss(0.2, 2.1, lt);
      const jx = lerp(1780, 1080, walk);
      const plot = ss(1.15, 2.0, lt);
      Z.jiangWei(c, jx, 934, 2.25, {
        t, jiAng: -0.4 + plot * 0.22, raise: 0, stance: t * 1.5, flip: 1, robe: 1, scroll: 0.5 + plot * 0.5,
      });
      // 密计：袖中一纸（尾段之前的一拍）
      if (plot > 0) {
        c.save(); c.globalAlpha = plot * 0.9;
        c.fillStyle = 'rgba(248,242,224,.95)';
        c.fillRect(jx - 250, 934 - 370, 46, 34);
        c.strokeStyle = 'rgba(48,42,34,.85)'; c.lineWidth = 2; c.strokeRect(jx - 250, 934 - 370, 46, 34);
        c.restore();
      }

      // 主动作二：三贤之影次第现（淡入拉长到 1s，避免大面积突现）
      [[1520, 0.0], [1780, 0.22], [1300, 0.44]].forEach(([fx, d], k) => {
        const on = ss(1.2 + d, 2.2 + d, lt);
        if (on <= 0) return;
        shadow(c, fx, 916, 1.45 - k * 0.05, on, t, 600 + k,
          ['rgba(70,74,92,.8)', 'rgba(84,70,58,.8)', 'rgba(60,56,50,.8)'][k]);
      });

      // 主动作三：乱兵（刀光缓摆 —— 摆频高会连续冲出跳变，压到 2.4rad/s）
      const riot = ss(2.3, 3.0, lt);
      if (riot > 0) {
        c.save(); c.globalAlpha = riot * 0.6; c.strokeStyle = 'rgba(255,252,244,.9)'; c.lineWidth = 5; c.lineCap = 'round';
        for (let i = 0; i < 5; i++) {
          const a = -0.9 + i * 0.45 + Math.sin(t * 2.4 + i * 1.3) * 0.07;
          const r0 = 180 + i * 40;
          c.beginPath();
          c.moveTo(1080 + Math.cos(a) * r0, 700 + Math.sin(a) * r0);
          c.lineTo(1080 + Math.cos(a) * (r0 + 130), 700 + Math.sin(a) * (r0 + 130));
          c.stroke();
        }
        c.restore();
      }

      // 主动作四：胆大如斗（片尾的奇崛 —— 匀速浮起，不冲跳变）
      const dan = ss(2.85, 3.55, lt);
      if (dan > 0) {
        Z.danDou(c, 1080, 640, 1.0, t, { alpha: dan, glow: dan });
      }
      // 浮尘（循环二）
      Z.dust(c, t, { x: 1120, y: 916, n: 8, seed: 58, scale: 1.7, alpha: 0.36 });
      // 大字：胆大如斗
      Z.bigText(c, '胆大如斗', { x: 1010, y: 296, size: 88, gap: 20, appear: ss(3.0, 3.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 13, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(3.35, 3.65, lt);
      c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.82)'; c.textAlign = 'center';
      c.fillText('——一计害三贤', 1010, 380);
      c.restore();
      Z.seal(c, 240, 946, '伯约', ss(3.3, 3.6, lt), { size: 88, seed: 68 });
    },
  };
})();
