// ⑧ 操因问曰：「闻夫人家先多坟籍，犹能忆识之不？」
//    文姬曰：「昔亡父赐书四千许卷，流离涂炭，罔有存者。今所诵忆，裁四百余篇耳。」
//    操曰：「今当使十吏就夫人写之。」文姬曰：「妾闻男女之别，礼不亲授。乞给纸笔，真草唯命。」
//    于是缮书送之，文无遗误。后感伤乱离，追怀悲愤，作诗二章。
//    画面：她把四千卷里烧掉的那些，凭记忆写了回来——四百余篇，一字不差。
SCENES['cj8_xianshu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj8', '#e7e3d0');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 472, amp: 128, tone: 0.15, seed: 181 }, { y0: 622, amp: 88, tone: 0.24, seed: 183 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1812 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 1816 });
      Z.inkCloud(c, t, { y: 890, h: 32, n: 5, speed: 96, span: 1500, seed: 21, a: .24 });
      Z.inkCloud(c, t, { y: 474, h: 26, n: 3, speed: 124, span: 1300, seed: 31, a: .18 });
      brush(c, [[0, 918], [640, 910], [1280, 920], [1920, 910]], { w: 14, tone: 0.78, dry: 0.74, seed: 1818, head: .03, tail: .3 });

      // 堂柱
      [[208, 0], [1712, 1]].forEach(([px2, k]) => {
        c.save(); c.translate(px2, 966);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -424], [-10, -848]],
          { w: 34, tone: .6, dry: .55, seed: 1821 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -864, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 案几（她伏案默写）
      Z.desk(c, 1180, 950, 1.5, { a: ss(0.2, 1.4, lt), seed: 81 });

      // 蜡烛（两架，主运动）
      Z.torch(c, 470, 922, 1.42, t, 181);
      Z.torch(c, 1560, 926, 1.32, t, 185);
      Z.dust(c, t, { x: 900, y: 700, n: 6, seed: 189, scale: 1.4, alpha: 0.4 });

      // 已写成的书卷（堆叠，随 lt 增多）
      const nDone = Math.floor(lerp(1, 5, clamp(ss(0.6, 3.2, lt))));
      Z.scrolls(c, 740, 906, 1.25, t, { a: ss(0.8, 2.0, lt), n: nDone, seed: 91 });
      Z.scrolls(c, 470, 908, 1.0, t, { a: ss(1.4, 2.6, lt), n: Math.max(1, nDone - 2), seed: 92 });

      // 主动作：文姬伏案书写（笔尖随笔迹游走）
      const wr = ss(0.5, 2.0, lt);
      Z.wenji(c, 1180 + Math.sin(t * .8) * 3, 946, 2.0,
        { t, fade: ss(0.2, 1.4, lt), write: wr, bow: 0.16 });

      // 笔下正在生长的这一行（笔迹随时间延伸：持续位移，本幕运动主力之一）
      const ink = ss(1.0, 3.4, lt);
      c.save(); c.globalAlpha = clamp(ink) * .85;
      c.translate(1180, 916);
      const cols = 9;
      for (let k = 0; k < cols; k++) {
        const q = clamp((ink - k / cols) * cols);
        if (q <= 0) continue;
        const cx = -150 + k * 34;
        c.save(); c.translate(cx, Math.sin(t * 1.2 + k) * 2);
        c.strokeStyle = 'rgba(32,28,24,.9)'; c.lineWidth = 3; c.lineCap = 'round';
        // 一字：横竖两笔，按 q 生长
        c.beginPath(); c.moveTo(-8, -10); c.lineTo(-8 + 16 * q, -10); c.stroke();
        if (q > .5) {
          c.beginPath(); c.moveTo(0, -18); c.lineTo(0, -2); c.stroke();
          c.beginPath(); c.moveTo(-8, -2); c.lineTo(-8 + 16 * (q - .5) * 2, -2); c.stroke();
        }
        c.restore();
      }
      c.restore();

      // 十吏（操本欲遣者，被她辞了：只画门外一列待命的背影，淡墨）
      for (let k = 0; k < 4; k++) {
        c.save(); c.globalAlpha = clamp(ss(0.4, 1.6, lt)) * .3;
        c.translate(1700 + (k % 2) * 90, 930 + Math.abs(k - 1.5) * 10 + Math.sin(t * (.9 + k * .1) + k) * 3);
        c.fillStyle = 'rgba(96,90,86,.8)';
        c.beginPath(); c.moveTo(-14, 0); c.quadraticCurveTo(-12, -38, 0, -50); c.quadraticCurveTo(13, -38, 15, 0); c.closePath(); c.fill();
        c.fillStyle = 'rgba(224,214,196,.88)';
        c.beginPath(); c.arc(0, -60, 7, 0, Math.PI * 2); c.fill();
        c.restore();
      }

      Z.inkSmoke(c, 1180, 664, t, { seed: 197, a: 0.26 });
      Z.inkSmoke(c, 560, 706, t, { seed: 198, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 115, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 116, a: .34 });

      Z.bigText(c, '四百余篇', { x: 350, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '真草唯命 · 文无遗误', { x: 320, y: 546, size: 44, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(46,78,72,.92)', shadow: { color: 'rgba(48,96,86,.24)', blur: 10, x: 3, y: 4 } });
      // 钤印必须 4 字：Z.seal 在 ch.length>2 时固定画 ch[0..3]，3 字会让 ch[3]=undefined 被 fillText 画成字符串
      Z.seal(c, 220, 236, '后汉列女', ss(2.2, 3.0, lt), { size: 56, seed: 384 });
    },
  };
})();
