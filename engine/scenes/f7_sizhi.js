// ⑦ 君子之死：或谓丰「必见重」。丰曰：「若军有利，吾必全；今军败，吾其死矣。」
// 使者至，丰整衣冠，从容就刃——他知道结局，早在大帐里举杖击地的那一刻。
// 主动作：整衣冠（0.4→1.6s 抬袖正冠）→ 面北端坐不动（常驻呼吸）→ 剑影落（2.3→2.9s）→ 烛灭（2.9→3.35s）
// 母题循环：烛、尘光、云。
SCENES['f7_sizhi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq7', '#e8e0c8');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'fq7_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(56,52,50,.24)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(100,98,116,.45)'; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 430, y1: 720, n: 3, alpha: 0.28, speed: 24, seed: 741 });
      brush(c, [[0, 922], [640, 912], [1280, 924], [1920, 910]], { w: 13, tone: 0.7, dry: 0.75, seed: 743, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带
      Z.curtain(c, 180, 130, t, { seed: 71, a: 0.26 });
      Z.curtain(c, 1740, 130, t, { seed: 72, a: 0.26 });
      Z.inkSmoke(c, 960, 470, t, { seed: 15, a: 0.32 });
      // 墨色云影（持续平移帧差主力，覆盖整衣冠结束后 1.6–2.3s 的静止谷底）
      Z.inkCloud(c, t, { y: 520, h: 52, n: 4, speed: 64, span: 1400, seed: 39 });

      // 狱窗（光更弱）
      Z.yuChuang(c, 1560, 500, 1.25, t, { seed: 8 });

      // 主动作一：整衣冠（抬袖到冠侧，缓缓落下）
      const dress = ss(0.4, 1.6, lt);
      c.save(); c.translate(0, 34);
      Z.tianFeng(c, 900, 946, 2.6, { t: t * 0.35, raise: dress * (1 - dress * 0.55) * 0.7, stance: 0, flip: 0, stick: 0, cuffed: 1 });
      c.restore();
      // 整冠的手（袖沿冠缘平移）
      c.save(); c.globalAlpha = 0.9;
      const hx = 900 - 60 + dress * 120;
      brush(c, [[hx, 946 - 250], [hx + 14, 946 - 262], [hx + 30, 946 - 256]], { w: 9, col: [216, 206, 186], tone: 0.7, dry: 0.5, seed: 745, tail: 0.6 });
      c.restore();

      // 烛焰（将灭的挣扎，常驻 + 尾段熄灭）
      const out = ss(2.9, 3.35, lt);
      c.save();
      brush(c, [[620, 918], [620, 826]], { w: 9, tone: 0.8, dry: 0.4, seed: 747 });
      if (out < 0.95) {
        c.globalCompositeOperation = 'lighter';
        const f = (Math.sin(t * 7.2) * 0.5 + 0.5) * (1 - out);
        const g2 = c.createRadialGradient(620, 806, 2, 620, 806, (38 + f * 12) * (1 - out));
        g2.addColorStop(0, `rgba(255,192,92,${0.45 * (1 - out)})`); g2.addColorStop(1, 'rgba(255,160,60,0)');
        c.fillStyle = g2; c.beginPath(); c.arc(620, 806, (38 + f * 12) * (1 - out), 0, Math.PI * 2); c.fill();
        // 烟一缕（灭后升起）
        if (out > 0.2) {
          c.globalCompositeOperation = 'source-over'; c.filter = 'blur(5px)';
          for (let k = 0; k < 3; k++) {
            const ph = ((t * 0.2 + k * 0.33) % 1);
            c.strokeStyle = `rgba(150,144,132,${0.4 * (1 - ph) * out})`;
            c.lineWidth = 8 - ph * 5; c.lineCap = 'round';
            c.beginPath();
            c.moveTo(620, 806);
            c.quadraticCurveTo(620 + Math.sin(t * 1.2 + k * 2) * 16, 806 - ph * 100, 620 + Math.sin(t * 1.2 + k * 2 + 1.2) * 34 * (0.4 + ph), 806 - ph * 240);
            c.stroke();
          }
          c.filter = 'none';
        }
      }
      c.restore();

      // 主动作二：剑影落（白光一线自上而下）
      const blade = ss(2.3, 2.9, lt);
      if (blade > 0) {
        c.save(); c.globalAlpha = (1 - Math.abs(blade - 0.5) * 1.4) * 0.8;
        c.strokeStyle = 'rgba(224,220,210,.95)'; c.lineWidth = 4;
        const by = lerp(560, 700, blade);
        c.beginPath(); c.moveTo(960, by); c.lineTo(1010, by - 130); c.stroke();
        c.restore();
      }
      // 尾段：烛灭后的黑暗合拢（微降不透明度，画面收暗）
      if (out > 0) {
        c.save(); c.globalCompositeOperation = 'multiply';
        c.fillStyle = `rgba(90,92,108,${out * 0.25})`; c.fillRect(0, 0, 1920, 1080); c.restore();
      }

      Z.bigText(c, '吾其死矣', { x: 960, y: 284 + Math.sin(t * 1.25) * 7, size: 80, gap: 20, appear: ss(1.75, 2.45, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '元皓', ss(2.3, 2.65, lt), { size: 86, seed: 749 });
    },
  };
})();
