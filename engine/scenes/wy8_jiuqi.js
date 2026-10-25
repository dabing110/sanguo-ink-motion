// ⑧ 超遂闭冀城门，异与昂保祁山，为超所围三十日，救兵到乃解。超卒杀异子月。
//    自冀城之难，至于祁山，昂出九奇，异辄参焉。
//    画面：祁山下，援军到了。她和赵昂并立在城头——史书给她的最后七个字是「异辄参焉」：她参与了。
SCENES['wy8_jiuqi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy8', '#e4e0cd');
  const WALL_TOP = 700;
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 480, amp: 126, tone: 0.15, seed: 91 }, { y0: 630, amp: 88, tone: 0.25, seed: 93 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 812 });
      Z.mist(c, t, { y0: 230, y1: 510, n: 4, alpha: 0.44, speed: 128, seed: 816 });
      Z.inkCloud(c, t, { y: 470, h: 32, n: 5, speed: 96, span: 1500, seed: 13, a: .24 });
      Z.inkCloud(c, t, { y: 320, h: 26, n: 4, speed: 124, span: 1300, seed: 23, a: .18 });
      Z.geese(c, t, { y: 184, x0: 2440, speed: 134, n: 5, seed: 97, scale: .8 });

      // 祁山（远山，她最后守的地方）
      Z.qishan(c, 1320, 806, 1.15, { a: ss(0.15, 1.5, lt), seed: 51 });
      Z.qishan(c, 380, 796, 0.85, { a: ss(0.3, 1.7, lt) * .7, seed: 52 });

      // 城（近景，她守的门）
      Z.cityWall(c, 700, 1076, 1.25, { a: ss(0.1, 1.4, lt), seed: 91 });
      Z.flag(c, 520, WALL_TOP - 4, 280, t, { seed: 819, col: 'rgba(58,70,106,.8)', text: '涼' });

      // 援军（自右驰来：主运动，≈120px/s）
      for (let k = 0; k < 3; k++) {
        const q = clamp((t * .34 + k * .3) % 1.35);
        const px = lerp(2060, 1180, ease.out(q));
        c.save();
        c.globalAlpha = clamp(ss(0.4 + k * 0.12, 1.8 + k * 0.12, lt)) * (.45 + .45 * Math.sin(Math.PI * clamp(q)));
        c.translate(px, 936 - k * 8);
        const ph8 = t * 6.5 + k * 1.3;                    // 奔袭相位：马腿快循环，位移只作辅助
        const sc8 = 0.9 - k * 0.06;
        Z.horse(c, 0, 0, sc8, ph8, { gallop: 1, flip: 1, tone: .78 - k * .06 });
        Z.rider(c, 0, 0, sc8, ph8, { flip: 1, cape: 1, backFlag: 1, t, spearAng: -0.6, spearLen: 260 });
        c.restore();
      }
      Z.dust(c, t, { x: 1500, y: 942, n: 7, seed: 99, scale: 1.9, alpha: 0.55 });

      // 炬火（主运动）
      Z.torch(c, 900, WALL_TOP + 2, 1.40, t, 71);
      Z.torch(c, 1650, 928, 1.30, t, 75);
      Z.campFire(c, 1520, 950, 0.9, t, { alpha: .68, seed: 23 });

      // 主动作：二人并立城头（赵昂略前，王异并肩——「异辄参焉」）
      const st = ss(0.4, 2.0, lt);
      Z.zhaoAng(c, 800 + Math.sin(t * 1.05) * 3, WALL_TOP + 6, 1.85, t,
        { fade: ss(0.25, 1.6, lt), argue: 0.25, seed: 75 });
      Z.wangyi(c, 1030 + Math.sin(t * .95) * 3, WALL_TOP + 6, 2.0,
        { t, fade: ss(0.3, 1.7, lt), gou: 1, knife: 0, raise: 0.35 + 0.2 * Math.sin(t * 1.2), bow: 0.03 });

      Z.inkSmoke(c, 1030, 520, t, { seed: 107, a: 0.28 });
      Z.inkSmoke(c, 500, 600, t, { seed: 108, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 87, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 88, a: .34 });

      Z.bigText(c, '祁山三十日', { x: 320, y: 448, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '昂出九奇 · 异辄参焉', { x: 320, y: 546, size: 44, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(46,78,72,.92)', shadow: { color: 'rgba(48,96,86,.24)', blur: 10, x: 3, y: 4 } });
      // 钤印必须 4 字：Z.seal 在 ch.length>2 时固定画 ch[0..3]，3 字会让 ch[3]=undefined 被 fillText 画成字符串
      Z.seal(c, 220, 236, '列女传注', ss(2.2, 3.0, lt), { size: 56, seed: 394 });
    },
  };
})();
