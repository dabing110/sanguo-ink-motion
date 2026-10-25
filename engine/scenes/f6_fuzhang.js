// ⑥ 抚掌之谮：军败报至，或谓丰必见释。逢纪谮曰：「丰闻军之败，抚掌大笑，喜其言之中也。」
// 绍于是害之——最后一道谗言，比乌巢的火烧得更快。
// 主动作：谮影耳语（0.4→2.2s，lean 渐深）→ 抚掌虚影（1.4→2.6s 双掌相击两记）→ 狱门暗影推近（2.2→3.35s）
// 母题循环：暗影、烛、狱窗尘光。
SCENES['f6_fuzhang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq6', '#e8e0c9');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'fq6_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(58,54,52,.22)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(104,102,120,.42)'; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 420, y1: 720, n: 3, alpha: 0.28, speed: 26, seed: 721 });
      brush(c, [[0, 922], [640, 912], [1280, 924], [1920, 910]], { w: 13, tone: 0.7, dry: 0.75, seed: 723, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带
      Z.curtain(c, 180, 130, t, { seed: 61, a: 0.26 });
      Z.curtain(c, 1740, 130, t, { seed: 62, a: 0.26 });
      Z.inkSmoke(c, 960,470, t, { seed: 11, a: 0.32 });
      // 墨色云影（持续平移帧差主力，覆盖谮影/抚掌结束后的静止谷底）
      Z.inkCloud(c, t, { y: 520, h: 52, n: 4, speed: 64, span: 1400, seed: 29 });

      // 狱窗（右，光更冷）
      Z.yuChuang(c, 1520, 500, 1.3, t, { seed: 6 });

      // 主动作一：谮影耳语（左前，lean 渐深）
      const lean = ss(0.4, 2.2, lt);
      Z.chanYing(c, 760, 900, 2.2, t, { lean });

      // 主动作二：抚掌虚影（狱中央，两掌相击两记——只有影）
      const clap = ss(1.4, 2.6, lt);
      if (clap > 0) {
        const beat = Math.abs(Math.sin(clap * Math.PI * 2));       // 两记
        c.save(); c.globalAlpha = 0.55 * clamp(clap * 2);
        c.translate(1160, 700);
        c.fillStyle = 'rgba(48,42,38,.55)';
        c.beginPath(); c.arc(0, -80, 26, 0, Math.PI * 2); c.fill();
        c.fillRect(-34, -60, 68, 110);
        c.strokeStyle = 'rgba(48,42,38,.6)'; c.lineWidth = 13; c.lineCap = 'round';
        const spread = lerp(70, 12, beat);
        c.beginPath(); c.moveTo(-24, -20); c.lineTo(-spread, -8 + beat * 6); c.stroke();
        c.beginPath(); c.moveTo(24, -20); c.lineTo(spread, -8 + beat * 6); c.stroke();
        c.restore();
      }

      // 丰（右，cuffed 坐姿，闻言不动——稳）
      c.save(); c.translate(0, 34);
      Z.tianFeng(c, 1380, 946, 2.4, { t: t * 0.4, raise: 0, stance: 0, flip: 1, stick: 0, cuffed: 1 });
      c.restore();

      // 主动作三：狱门暗影推近（门缝开、持剑影入）
      const door = ss(2.2, 3.35, lt);
      if (door > 0) {
        c.save(); c.globalAlpha = clamp(door * 1.4) * 0.85;
        const dx = lerp(180, 320, door);
        brush(c, [[dx, 952], [dx + 4, 760], [dx + 8, 660]], { w: 22, tone: 0.36, dry: 0.5, seed: 725, head: 0.1, tail: 0.2 });
        c.fillStyle = 'rgba(28,26,26,.95)'; c.beginPath(); c.arc(dx + 6, 640, 13, 0, Math.PI * 2); c.fill();
        // 剑光一线
        c.strokeStyle = 'rgba(210,206,196,.8)'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(dx + 20, 700); c.lineTo(dx + 58, 610); c.stroke();
        c.restore();
      }

      // 烛（摇曳，常驻）
      c.save();
      brush(c, [[260, 918], [260, 828]], { w: 9, tone: 0.8, dry: 0.4, seed: 727 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.8) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(260, 810, 3, 260, 810, 40 + f * 10);
      g2.addColorStop(0, 'rgba(255,192,92,.42)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(260, 810, 40 + f * 10, 0, Math.PI * 2); c.fill();
      c.restore();

      Z.bigText(c, '抚掌大笑', { x: 960, y: 280 + Math.sin(t * 1.25) * 7, size: 78, gap: 18, appear: ss(2.05, 2.75, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '谮起', ss(2.3, 2.65, lt), { size: 86, seed: 729 });
    },
  };
})();
