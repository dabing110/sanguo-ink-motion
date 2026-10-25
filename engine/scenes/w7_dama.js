// ⑦ 瞋目大骂而死：韦复前突贼，杀数人，创重发，瞋目大骂而死。贼乃敢前，取其头传观之。
// 主动作：贼环立不敢前（0.2→0.9s）→ 双挟两贼击杀之（0.9→1.8s）→ 瞋目大骂（1.8→2.5s）→ 力尽而倒（2.45→2.95s）；
// 母题循环：环立之贼、扬尘、血痕、乱云。
SCENES['w7_dama'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw7', '#d5cdb6');

  // 环立之贼：不敢近，只在外圈攒动
  function foeRing(c, x, y, s, k, t, fear) {
    const ph = t * 4.4 + k * 1.3;
    const shiver = Math.sin(ph) * (5 - fear * 2.2);
    c.save(); c.translate(x + shiver * 0.5, y); c.scale(s, s); c.globalAlpha = 0.82;
    brush(c, [[0, 0], [-4, -56], [-2, -100]], { w: 19, tone: 0.7, dry: 0.55, seed: 710 + k, head: 0.08, tail: 0.24 });
    brush(c, [[-2, -100], [-20, -124], [-40, -118]], { w: 12, tone: 0.66, dry: 0.55, seed: 720 + k });
    c.fillStyle = 'rgba(40,36,30,.86)'; c.beginPath(); c.arc(-48, -126, 12, 0, Math.PI * 2); c.fill();
    brush(c, [[8, -90], [42, -116], [66, -136]], { w: 5, tone: 0.85, dry: 0.4, seed: 730 + k, tail: 0.4 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      Z.wash(c, 'dw7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 112, tone: 0.2, seed: 93.4 }]);
      }, { blur: 3, halo: 14, haloA: 0.22 });
      // 地面
      brush(c, [[0, 894], [640, 882], [1260, 896], [1920, 878]], { w: 15, tone: 0.82, dry: 0.74, seed: 151, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 乱云（循环一：夜战扬尘的对照，兼作全段底噪运动量）
      Z.mist(c, t, { y0: 260, y1: 600, n: 4, alpha: 0.55, speed: 48, seed: 81 });

      // 主动作一：环立之贼，不敢前
      const close = ease.out(ss(0.2, 0.95, lt));
      const fear = ss(0.9, 1.5, lt);
      [0, 1, 2, 3, 4].forEach((k) => {
        const ang = -0.6 + k * 0.42;
        const bx = lerp(1500 + k * 90, 1180 + k * 76, close);
        foeRing(c, bx, 900 - (k % 2) * 6, 1.32 - (k % 3) * 0.06, k, t, fear);
      });

      // 主动作二：双挟两贼击杀之
      const wx = 780, wy = 916;
      const grab = ss(0.95, 1.4, lt);
      const slam = ss(1.4, 1.8, lt);
      // 倒地：ease.* 的峰值角速度是中段的 2 倍，整幅人物绕脚转会把单帧差冲过阈值。
      // 改匀速 + 缩小转角 + 下沉，读作「力尽跪倒」而不是整个人翻过去。
      const fall = ss(2.24, 2.99, lt);
      // 被挟的两贼（左右各一，抓起 → 掷出）
      [-1, 1].forEach((sg, k) => {
        const g0 = grab * (1 - slam * 0.2);
        const px = wx + sg * lerp(120, 240, g0) + sg * slam * 320;
        const py = wy - lerp(60, 300, g0) + slam * slam * 260;
        if (grab <= 0) return;
        c.save(); c.globalAlpha = (1 - slam * 0.85) * 0.9 * clamp(grab * 3);   // 淡入，不突然冒出来
        c.translate(px, py); c.rotate(sg * (0.4 + slam * 2.2));
        brush(c, [[-24, 0], [0, -6], [26, 2]], { w: 15, tone: 0.72, dry: 0.5, seed: 750 + k, tail: 0.3 });
        brush(c, [[-8, -4], [-18, -22], [-30, -30]], { w: 8, tone: 0.68, dry: 0.5, seed: 752 + k });
        c.fillStyle = 'rgba(38,34,28,.88)'; c.beginPath(); c.arc(-34, -34, 11, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 典韦：创重发，犹自瞋目（倒下前最后一次站定）
      c.save();
      c.translate(wx, wy + fall * 30); c.rotate(-fall * 0.5); c.translate(-wx, -wy);
      const breathe = 1 + Math.sin(t * 2.6) * 0.012;
      Z.dianWei(c, wx, wy, 2.15 * breathe, {
        t, jiAng: -0.5 + grab * 0.35 - fall * 0.55, raise: grab * 0.4, stance: 0, flip: 0, bare: 1, ji: 1,
      });
      c.restore();
      // 血痕（创重：几笔朱墨）
      const wound = ss(1.6, 2.4, lt);
      if (wound > 0) {
        c.save(); c.globalAlpha = wound * 0.75;
        [[-14, -300], [22, -250], [-4, -200]].forEach(([ox, oy], k) => {
          brush(c, [[wx + ox, wy + oy], [wx + ox + 16, wy + oy + 60], [wx + ox - 6, wy + oy + 116]],
            { w: 7, col: [166, 34, 28], tone: 0.9, dry: 0.6, seed: 760 + k, tail: 0.7 });
        });
        c.restore();
      }
      // 倒下后落在地上的铁戟
      if (fall > 0.3) {
        c.save(); c.globalAlpha = clamp((fall - 0.3) * 2.2);
        Z.ji(c, wx + 240, 906, 0.22 + fall * 0.1, 300, t);
        c.restore();
      }
      // 扬尘（循环二）
      Z.dust(c, t, { x: 900, y: 910, n: 8, seed: 152, scale: 1.6, alpha: 0.5 });
      if (fall > 0.4) Z.dust(c, t, { x: wx - 40, y: 920, n: 7, seed: 153, scale: 1.8, alpha: 0.4 * fall });

      // 大字：瞋目大骂
      Z.bigText(c, '瞋目大骂', { x: 1060, y: 306, size: 92, gap: 18, appear: ss(1.8, 2.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(150,40,30,.28)', blur: 14, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(2.35, 2.7, lt) * (1 - fall * 0.3);
      c.font = '32px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.82)'; c.textAlign = 'center';
      c.fillText('——贼乃敢前', 1060, 388);
      c.restore();
      Z.seal(c, 240, 946, '死战', ss(2.5, 2.8, lt), { size: 88, seed: 57 });
    },
  };
})();
