// ⑦ 宁为国家鬼：羽谓曰「卿兄在汉中，我欲以卿为将，不早降何为？」
// 德骂曰：「竖子，何谓降也！魏王带甲百万，威振天下。汝刘备庸才耳，岂能敌邪！
//         我宁为国家鬼，不为贼将也。」——遂为羽所杀。太祖闻而悲之，为之流涕。
// 主动作：羽招降（0.5→1.5s）→ 德昂首叱骂，三道叱浪迭出（1.1→2.9s）→ 字定（2.2→3.0s）
// 母题循环：汉水、叱浪（声之气）、羽旄（招）、松（不屈）。全片情绪至高点。
SCENES['p7_guogui'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq7', '#e5dfd0');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const wy = 806;
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'pq7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 440, amp: 104, tone: 0.18, seed: 1121.5 },
          { y0: 548, amp: 68, tone: 0.26, seed: 1123.9 },
        ]);
      }, { blur: 4.5, halo: 16, haloA: 0.18 });
      Z.yunHai(c, t * 1.1, { y: 306, h: 112, n: 4, speed: 72, alpha: 0.4 });

      // 岸（左侧高台：德立其上，羽在右下舟头）
      c.fillStyle = 'rgba(132,116,90,.62)';
      c.beginPath(); c.moveTo(0, 856); c.quadraticCurveTo(360, 826, 760, 848);
      c.lineTo(760, 1080); c.lineTo(0, 1080); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(58,48,38,.75)'; c.lineWidth = 4.5;
      c.beginPath(); c.moveTo(0, 856); c.quadraticCurveTo(360, 826, 760, 848); c.stroke();
      Z.pine(c, t, { x: 176, y: 846, s: 1.2, seed: 1125, tone: 0.86 });

      Z.diShang(c, t, 1, { y: wy });

      // 关羽（右下舟头，招降）
      const come = ss(0.15, 1.1, lt);
      const gx = lerp(1710, 1500, come);
      c.save(); c.globalAlpha = 0.94;
      Z.xiaoChuan(c, gx + 20, wy + 152, 1.2, t, { capsize: 0 });
      Z.guanYu(c, gx, wy + 76, 1.75, t, { flip: 1, bow: 0 });
      c.restore();
      Z.flag(c, gx + 250, wy - 60, 150, t, { seed: 1127, col: 'rgba(140,44,36,.8)', text: '关' });

      // 庞德：被缚而立，昂首
      const px = 600;
      const shout = ss(1.1, 2.9, lt);
      const pulse = Math.sin(t * 7.2) * 0.5 + 0.5;
      c.save(); c.translate(px, 852); c.rotate(-0.045 - pulse * 0.012 * shout);
      Z.pangDe(c, 0, 0, 1.55, { t: t * 1.15, raise: 0.1 + shout * 0.16, stance: t * 0.8, flip: 0, bow: 0, draw: 0, captive: 1 });
      c.restore();

      // 叱浪（三道墨气自德口向右送：骂的是「竖子」，送的是六个字）
      c.save();
      for (let k = 0; k < 3; k++) {
        const ph = (t * 0.85 + k * 0.333) % 1;
        const a = (1 - ph) * shout * 0.55;
        if (a <= 0.02) continue;
        const r = 90 + ph * 460;
        c.globalAlpha = a;
        c.strokeStyle = 'rgba(38,34,30,.9)'; c.lineWidth = 7 - ph * 4.6; c.lineCap = 'round';
        c.beginPath();
        c.arc(px + 20, 852 - 300, r, -0.62, 0.62);
        c.stroke();
      }
      c.restore();

      // 招降之手（羽伸手，德不应）
      const offer = ss(0.5, 1.5, lt) * (1 - ss(1.7, 2.5, lt));
      if (offer > 0.02) {
        c.save(); c.globalAlpha = offer * 0.9;
        brush(c, [[gx - 60, wy - 96], [gx - 170, wy - 128], [gx - 268, wy - 150]], { w: 15, tone: 0.5, dry: 0.5, seed: 1129, tail: 0.3 });
        c.restore();
      }

      Z.pRain(c, t, { n: 40, alpha: 0.16, seed: 1131, y1: 960 });
      Z.dust(c, t, { x: 640, y: 900, n: 4, seed: 1133, scale: 1.1, alpha: 0.2 });

      Z.bigText(c, '宁为国家鬼', { x: 940, y: 288, size: 76, gap: 16, appear: ss(1.55, 2.6, lt), col: 'rgba(24,20,16,.95)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 246, 700, '不为贼将', ss(2.35, 2.7, lt), { size: 86, seed: 1135 });
    },
  };
})();
