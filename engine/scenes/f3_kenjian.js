// ③ 恳谏被囚：绍南征，丰谏：「曹善用兵，变化无方……不如以久持之。」绍弗从，丰恳谏。
// 绍怒，以为沮众，械系之——智者的下场，常常只是说得太对。
// 主动作：丰跪陈久持之策（0.4→1.8s）→ 绍掷令（1.6→2.4s）→ 甲士上前、加械（2.1→3.35s）
// 母题循环：令旗、甲士、尘、烛。
SCENES['f3_kenjian'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq3', '#e8e1ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'fq3_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(76,68,56,.14)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 400, y1: 700, n: 3, alpha: 0.4, speed: 34, seed: 641 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.76, dry: 0.75, seed: 643, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带 + 墨色云影（尾段静默补运动）
      Z.curtain(c, 180, 130, t, { seed: 31, a: 0.32 });
      Z.curtain(c, 1740, 130, t, { seed: 32, a: 0.32 });
      Z.inkSmoke(c, 960, 470, t, { seed: 1, a: 0.34 });
      Z.inkCloud(c, t, { y: 520, h: 40, n: 3, speed: 52, span: 1200, seed: 6 });

      // 主动作一：丰跪陈（跪姿：袍身压低）
      const kneel = ss(0.4, 1.0, lt);
      c.save(); c.translate(0, kneel * 30); c.rotate(kneel * 0.12);
      Z.tianFeng(c, 620, 968, 2.6, { t: t * 0.6, raise: 0.35, stance: 0, flip: 0, stick: 0, cuffed: 0 });
      c.restore();

      // 主位绍（盛怒前倾）
      const anger = ss(1.4, 2.4, lt);
      c.save(); c.translate(0, anger * 6); c.rotate(anger * 0.03);
      Z.leader(c, 1360, 948, 2.5, { t, raise: anger * 0.4, stance: t * 1.1, flip: 1, cape: 1 });
      c.restore();

      // 主动作二：掷令于地（令牌抛落）
      const toss = ss(1.6, 2.4, lt);
      if (toss > 0) {
        const jy = 880 - Math.sin(clamp(toss * 1.5) * Math.PI) * 80;
        c.save(); c.translate(lerp(1300, 1060, toss), jy + toss * 60); c.rotate(toss * 2.4);
        c.fillStyle = 'rgba(196,150,92,.92)'; c.fillRect(-30, -16, 60, 32);
        c.strokeStyle = 'rgba(60,44,28,.9)'; c.lineWidth = 2.6; c.strokeRect(-30, -16, 60, 32);
        c.restore();
      }

      // 主动作三：甲士上前 + 加械（cuffed 渐显）
      const go = ss(2.1, 2.8, lt), cuff = ss(2.5, 3.35, lt);
      c.save(); c.globalAlpha = 0.9;
      const gx = lerp(880, 720, go);
      brush(c, [[gx, 952], [gx - 3, 856], [gx - 1, 786]], { w: 19, tone: 0.62, dry: 0.5, seed: 645, head: 0.08, tail: 0.22 });
      c.fillStyle = 'rgba(44,40,34,.88)'; c.beginPath(); c.arc(gx - 1, 774, 12, 0, Math.PI * 2); c.fill();
      brush(c, [[gx + 4, 820], [gx + 40, 796], [gx + 62, 776]], { w: 5, tone: 0.85, dry: 0.35, seed: 647, tail: 0.4 });
      c.restore();
      if (cuff > 0) {
        c.save(); c.globalAlpha = cuff;
        c.save(); c.translate(0, 30); c.rotate(0.12);
        Z.tianFeng(c, 620, 968, 2.6, { t: t * 0.4, raise: 0, stance: 0, flip: 0, stick: 0, cuffed: 1 });
        c.restore(); c.restore();
      }

      // 烛（常驻）+ 尘
      c.save();
      brush(c, [[320, 916], [320, 814]], { w: 9, tone: 0.84, dry: 0.4, seed: 649 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.6) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(320, 794, 3, 320, 794, 48 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.5)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(320, 794, 48 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();
      Z.dust(c, t, { x: 1000, y: 958, n: 6, seed: 651, scale: 1.3, alpha: 0.28 });

      Z.bigText(c, '械系之', { x: 960, y: 296 + Math.sin(t * 1.25) * 7, size: 92, gap: 22, appear: ss(2.55, 3.25, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '沮众', ss(2.6, 2.95, lt), { size: 86, seed: 653 });
    },
  };
})();
