// ② 机不可失：建安五年，操东征备，许下空虚。丰劝绍袭其后：「可一往而定。」绍辞以子病。
// 丰举杖击地：「夫遭难遇之几，而以婴儿病失其会，惜哉！」——全片最响的一记。
// 主动作：丰进言举杖（0.4→1.6s）→ **举杖击地**（1.6→2.1s 一记重击+震尘）→ 绍负手背身（1.9→2.7s）→ 丰拂袖长叹（2.4→3.35s）
// 母题循环：帐幕、烛、震尘、云。
SCENES['f2_jibuke'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq2', '#e9e1ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.0, lt);
      Z.wash(c, 'fq2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 462, amp: 118, tone: 0.2, seed: 621.5 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.46, speed: 44, seed: 623 });
      brush(c, [[0, 914], [640, 902], [1280, 916], [1920, 900]], { w: 14, tone: 0.78, dry: 0.75, seed: 625, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 35, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 65, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 16, a: 0.3 });

      // 大帐（居后）
      c.fillStyle = 'rgba(198,178,142,.6)';
      c.beginPath(); c.moveTo(200, 900); c.quadraticCurveTo(960, 620, 1720, 900); c.lineTo(1600, 916); c.quadraticCurveTo(960, 700, 320, 916); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(52,44,34,.85)'; c.lineWidth = 3; c.stroke();
      // 帐旗
      Z.flag(c, 340, 640, 150, t, { seed: 627, col: 'rgba(120,96,60,.8)', text: '袁' });

      // 主动作一 + 二：丰进言 → 举杖击地（一记重击）
      const raise = ss(0.4, 1.6, lt);
      const strike = ss(1.6, 2.1, lt);
      Z.tianFeng(c, 700, 968, 2.6, { t, raise: raise * 0.5, stance: t * 1.3, flip: 0, stick: 1, strike });
      // 击地的震动圈（随 strike 落地扩散）
      if (strike > 0.85) {
        const rr = (strike - 0.85) / 0.15;
        c.save(); c.globalAlpha = (1 - rr) * 0.7;
        c.strokeStyle = 'rgba(96,78,52,.8)'; c.lineWidth = 3.5;
        c.beginPath(); c.ellipse(700, 976, 60 + rr * 190, 10 + rr * 26, 0, 0, Math.PI * 2); c.stroke();
        c.strokeStyle = 'rgba(96,78,52,.5)'; c.lineWidth = 2.5;
        c.beginPath(); c.ellipse(700, 976, 30 + rr * 120, 6 + rr * 16, 0, 0, Math.PI * 2); c.stroke();
        c.restore();
      }

      // 主动作三：绍负手背身（辞以子病——不接话）
      const turn = ss(1.9, 2.7, lt);
      c.save(); c.globalAlpha = 0.95;
      Z.leader(c, lerp(1420, 1470, turn), 962, 2.5, { t, raise: 0, stance: t * 0.9, flip: 1, cape: 1 });
      c.restore();
      // 绍身后的幼子襁褓暗示（案上小被卷）
      c.save(); c.globalAlpha = 0.8;
      c.fillStyle = 'rgba(196,170,130,.8)';
      c.beginPath(); c.ellipse(1250, 906, 52, 20, -0.08, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(72,56,38,.8)'; c.lineWidth = 2.4; c.stroke();
      c.restore();

      // 主动作四：丰拂袖长叹（袖风一记）
      const sigh = ss(2.4, 3.35, lt);
      if (sigh > 0) {
        c.save(); c.globalAlpha = sigh * 0.7;
        brush(c, [[760, 830 - sigh * 30], [860, 800 - sigh * 40], [960, 820]], { w: 16, col: [216, 206, 186], tone: 0.75, dry: 0.6, seed: 629, reveal: sigh, tail: 0.6 });
        c.restore();
      }
      // 烛（常驻）
      c.save();
      brush(c, [[380, 914], [380, 816]], { w: 9, tone: 0.84, dry: 0.4, seed: 631 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.4) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(380, 796, 3, 380, 796, 50 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.5)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(380, 796, 50 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();
      Z.dust(c, t, { x: 980, y: 960, n: 6, seed: 633, scale: 1.3, alpha: 0.28 });

      Z.bigText(c, '惜哉', { x: 1000, y: 300, size: 110, gap: 24, appear: ss(2.15, 2.85, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.32)', blur: 14, x: 5, y: 6 } });
      Z.seal(c, 250, 950, '袭许', ss(2.5, 2.85, lt), { size: 86, seed: 635 });
    },
  };
})();
