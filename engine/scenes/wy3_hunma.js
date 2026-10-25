// ③ 遂以溷粪涅麻而被之，尠食瘠形，自春至冬。双与州郡和，异竟以是免难。
//    画面：她披着污臭的麻片，缩在墙根，把自己活成了一堆没人要的东西——从春到冬，乱兵从她身边走过。
//    时间跨度用「左枝抽绿 → 落叶 → 枯枝积雪」三态写意，不用字幕解释。
SCENES['wy3_hunma'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy3', '#ddd9c6');
  // 落叶：每片固定相位，随 t 循环下落 —— 大颗粒高对比，是这一幕的运动主力
  const LEAVES = [[210, .00, 1.0], [430, .17, .8], [700, .34, 1.15], [980, .51, .9],
                  [1260, .68, 1.05], [1520, .85, .85], [1780, .25, 1.0]];
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy3_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 496, amp: 118, tone: 0.18, seed: 31 }, { y0: 646, amp: 84, tone: 0.28, seed: 33 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 312 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 316 });
      Z.inkCloud(c, t, { y: 894, h: 32, n: 5, speed: 96, span: 1500, seed: 8, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 18, a: .18 });
      brush(c, [[0, 920], [640, 912], [1280, 922], [1920, 912]], { w: 15, tone: 0.76, dry: 0.74, seed: 318, head: .03, tail: .3 });

      // 墙根（她缩身的地方）
      c.save(); c.globalAlpha = clamp(ss(0.1, 1.4, lt));
      c.translate(1180, 950);
      brush(c, [[-260, 0], [-250 + Math.sin(t * .6) * 3, -190], [-268, -360]],
        { w: 46, tone: .56, dry: .64, seed: 321, col: [138, 122, 98] });
      c.strokeStyle = 'rgba(58,46,32,.55)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(-256, -200); c.lineTo(-40, -188); c.stroke();
      c.restore();

      // 左：新绿（春）；右：枯枝（冬）—— 同一棵树的两头，写意「自春至冬」
      Z.pine(c, t, { x: 200, y: 940, s: 1.2, seed: 327, tone: .62 });
      Z.pine(c, t, { x: 1740, y: 936, s: 1.1, seed: 329, tone: .95 });

      // 落叶（主运动）—— P.leaf(c, x, y, ang, L, wmax, tone, col)
      LEAVES.forEach(([bx, ph, sc], k) => {
        const q = (t * .22 + ph) % 1;
        const lx = bx + Math.sin(t * 1.1 + k * 1.7) * 46;
        const ly = 120 + q * 800;
        c.save(); c.globalAlpha = .5 + .35 * Math.sin(Math.PI * q);
        leaf(c, lx, ly, Math.sin(t * 1.6 + k) * .8 + k, 26 * sc, 11 * sc, .58, [126, 104, 62]);
        c.restore();
      });

      // 乱兵横过（远处，走过而未见她）
      for (let k = 0; k < 4; k++) {
        const q = (t * .12 + k / 4) % 1;
        const px = -140 + q * 2200;
        c.save(); c.globalAlpha = clamp(ss(0.4, 1.8, lt)) * .42;
        c.translate(px, 892 + Math.sin(t * 3 + k) * 3); c.scale(.85, .85);
        c.fillStyle = 'rgba(104,94,86,.8)';
        c.beginPath(); c.moveTo(-14, 0); c.quadraticCurveTo(-12, -32, 0, -42); c.quadraticCurveTo(13, -32, 15, 0); c.closePath(); c.fill();
        c.fillStyle = 'rgba(228,218,200,.9)';
        c.beginPath(); c.arc(0, -50, 7, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(84,72,58,.85)'; c.lineWidth = 2.4;
        c.beginPath(); c.moveTo(14, -36); c.lineTo(30, -84); c.stroke();
        c.restore();
      }

      Z.torch(c, 330, 906, 1.3, t, 21);
      Z.torch(c, 1660, 900, 1.2, t, 25);
      Z.dust(c, t, { x: 900, y: 906, n: 7, seed: 29, scale: 1.7, alpha: 0.52 });

      // 主动作：她披粪麻、缩坐墙根（thin 0→1 逐渐消瘦）
      const th = ss(0.6, 2.4, lt);
      Z.wangyi(c, 1130 + Math.sin(t * .9) * 2, 944, 2.35,
        { t, fade: ss(0.2, 1.5, lt), gou: 0, knife: 0, bow: 0.3 * th, thin: th, raise: 0 });
      Z.hempRobe(c, 1130, 944, 2.35, { a: ss(0.4, 1.9, lt), t });

      Z.inkSmoke(c, 1130, 664, t, { seed: 37, a: 0.28 });
      Z.inkSmoke(c, 420, 706, t, { seed: 38, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 75, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 76, a: .34 });

      Z.bigText(c, '粪麻被之', { x: 320, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '尠食瘠形 · 自春至冬', { x: 330, y: 546, size: 44, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(112,84,40,.92)', shadow: { color: 'rgba(120,96,52,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
