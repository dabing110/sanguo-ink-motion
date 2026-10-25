// ⑥ 船覆被执：水浸盛，吏士皆降。德与麾下将一人、五伯二人，弯弓傅矢，乘小船欲还仁营。
// 水盛船覆，失弓矢，独抱船覆水中，为羽所得——立而不跪。
// 主动作：小船欲还仁营（0→1.1s）→ 水盛船覆（1.0→1.8s）→ 羽舟逼拢（1.6→3.0s）→ 抱舟而立不跪（1.8→3.0s）
// 母题循环：汉水、漂流甲仗、雨（渐收）、远处堤上伏降者（与德「立」相对照）。
SCENES['p6_beifu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq6', '#e3ddcd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const wy = 792;                                  // 水面（浩渺，已漫过一切）
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'pq6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 452, amp: 96, tone: 0.16, seed: 1091.5 },
          { y0: 560, amp: 62, tone: 0.24, seed: 1093.9 },
        ]);
      }, { blur: 5, halo: 18, haloA: 0.16 });
      Z.yunHai(c, t * 1.3, { y: 316, h: 118, n: 4, speed: 84, alpha: 0.42 });

      // 远处堤线 + 伏降者（吏士皆降：一排伏着的影，与德的「立」对照）
      c.save(); c.globalAlpha = 0.42;
      brush(c, [[-40, wy - 66], [640, wy - 78], [1300, wy - 70], [1980, wy - 82]], { w: 11, tone: 0.62, dry: 0.8, seed: 1092, head: 0.03, tail: 0.4 });
      for (let k = 0; k < 7; k++) {
        const kx = 120 + k * 240, sw = Math.sin(t * 1.1 + k) * 2;
        c.fillStyle = 'rgba(96,92,84,.5)';
        c.beginPath(); c.ellipse(kx + sw, wy - 88, 26, 13, 0, 0, Math.PI * 2); c.fill();
      }
      c.restore();

      // 汉水
      Z.diShang(c, t, 1, { y: wy });

      // 主动作一：小船欲还仁营（载德与麾下三人）
      const go = ss(0.0, 1.1, lt);
      const bx = lerp(520, 940, go);
      const cap = ss(1.0, 1.8, lt);
      c.save(); c.globalAlpha = 1 - cap * 0.55;
      Z.xiaoChuan(c, bx, wy + 96, 1.05, t, { capsize: cap });
      if (cap < 0.5) {                                 // 船上三人影（麾下将、五伯二人）
        c.save(); c.globalAlpha = (1 - cap * 2) * 0.8;
        for (let k = 0; k < 3; k++) {
          const kx = bx - 60 + k * 58 + Math.sin(t * 2.3 + k) * 5;
          brush(c, [[kx, wy + 34], [kx + 3, wy - 24], [kx - 6, wy - 62]], { w: 15, tone: 0.7, dry: 0.55, seed: 1101 + k, tail: 0.4 });
        }
        c.restore();
      }
      c.restore();

      // 主动作二：羽舟逼拢（自右）
      const near = ss(1.6, 3.0, lt);
      const fx = lerp(1840, 1240, near);
      c.save(); c.globalAlpha = 0.9;
      Z.xiaoChuan(c, fx, wy + 130, 1.15, t, { capsize: 0 });
      Z.flag(c, fx + 10, wy + 40, 130, t, { seed: 1111, col: 'rgba(140,44,36,.78)', text: '关' });
      c.restore();

      // 漂流甲仗（矢尽弓失：漂走的盾与箭囊，反衬德手已空）
      [[320, 0.62], [1500, 0.78], [760, 0.5]].forEach(([ox, sp], k) => {
        const dx = ((ox + t * 46 * sp) % 2200) - 180;
        const dy = wy + 120 + k * 46 + Math.sin(t * 1.4 + k) * 9;
        c.save(); c.globalAlpha = 0.5;
        c.fillStyle = 'rgba(108,94,72,.7)';
        c.beginPath(); c.ellipse(dx, dy, 40, 15, Math.sin(t + k) * 0.4, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(48,42,34,.7)'; c.lineWidth = 2.4; c.stroke();
        c.restore();
      });

      // 主动作三：德独抱覆舟，立于水中不跪
      const stand = ss(1.8, 2.7, lt);
      const px = 900, bob = Math.sin(t * 1.7) * 11;
      c.save(); c.globalAlpha = 1;
      Z.xiaoChuan(c, px + 40, wy + 168 + bob, 1.0, t, { capsize: 0.92 });   // 覆舟（他抱着的）
      c.restore();
      // 半身没入水中：先画人，再用水波横笔盖住腰下
      Z.pangDe(c, px, wy + 150 + bob, 1.5, { t, raise: 0.12 + stand * 0.22, stance: t * 0.9, flip: 0, bow: 0, draw: 0, captive: 1 });
      c.save();
      c.strokeStyle = 'rgba(52,76,84,.55)'; c.lineWidth = 8; c.lineCap = 'round';
      for (let k = 0; k < 3; k++) {
        const yy = wy + 132 + k * 26 + Math.sin(t * 2.1 + k * 1.3) * 6;
        c.beginPath(); c.moveTo(px - 150, yy); c.quadraticCurveTo(px, yy - 12, px + 150, yy); c.stroke();
      }
      c.restore();

      // 雨（渐收）
      Z.pRain(c, t, { n: Math.round(lerp(96, 46, ss(1.2, 2.9, lt))), alpha: 0.3 - ss(1.2, 2.9, lt) * 0.1, seed: 1097, y1: 980 });

      Z.bigText(c, '立而不跪', { x: 950, y: 296, size: 78, gap: 18, appear: ss(2.15, 2.85, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 246, 704, '被执', ss(2.3, 2.65, lt), { size: 86, seed: 1099 });
    },
  };
})();
