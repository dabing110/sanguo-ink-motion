// ⑥ 祀为屯田都尉，犯法当死，文姬诣曹操请之。
//    时公卿名士及远方使驿坐者满堂，操谓宾客曰：「蔡伯喈女在外，今为诸君见之。」
//    及文姬进，蓬首徒行，叩头请罪，音辞清辩，旨甚酸哀，众皆为改容。
//    画面：满堂公卿。她没有梳头，也没有鞋——她是走进来求情，不是走进来献艺。
SCENES['cj6_qingzui'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj6', '#e5e1ce');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj6_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 480, amp: 128, tone: 0.15, seed: 161 }, { y0: 630, amp: 88, tone: 0.24, seed: 163 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1612 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 1616 });
      Z.inkCloud(c, t, { y: 890, h: 32, n: 5, speed: 96, span: 1500, seed: 19, a: .24 });
      Z.inkCloud(c, t, { y: 472, h: 26, n: 3, speed: 124, span: 1300, seed: 29, a: .18 });
      brush(c, [[0, 916], [640, 908], [1280, 918], [1920, 908]], { w: 14, tone: 0.78, dry: 0.74, seed: 1618, head: .03, tail: .3 });

      // 堂柱（两根，微晃）
      [[196, 0], [1724, 1]].forEach(([px2, k]) => {
        c.save(); c.translate(px2, 968);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -430], [-10, -860]],
          { w: 36, tone: .6, dry: .55, seed: 1621 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -876, 48, 17, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 满堂公卿（两列；⚠ 逐人异频相位，避免同一帧集体翻状态被判跳变）
      Z.guests(c, 200, 950, 1.0, t, { n: 4, a: ss(0.2, 1.5, lt), gap: 200, seed: 71 });
      Z.guests(c, 1640, 952, 0.95, t, { n: 2, a: ss(0.3, 1.6, lt), gap: 200, seed: 75 });

      // 曹操（中偏右高处；案几在前）
      Z.leader(c, 1360 + Math.sin(t * 1.05) * 2, 942, 2.3, t, { flip: 1, cape: 1, bow: 0.05 });
      Z.desk(c, 1360, 950, 0.62, { a: ss(0.25, 1.4, lt), seed: 81 });

      // 炬火（堂上两架，主运动）
      Z.torch(c, 470, 924, 1.42, t, 161);
      Z.torch(c, 1120, 930, 1.32, t, 165);
      Z.dust(c, t, { x: 900, y: 930, n: 6, seed: 169, scale: 1.5, alpha: 0.44 });

      // 主动作：文姬蓬首徒行，趋前叩头
      const step = ease.out(ss(0.35, 2.3, lt));
      const wx = lerp(560, 880, step);
      const bow = ss(1.2, 2.8, lt);
      Z.wenji(c, wx + Math.sin(t * 1.1) * 3, 962, 2.15,
        { t, fade: ss(0.2, 1.4, lt), hairDown: 1, bow, flip: 0 });
      // 徒行：赤足（写意：脚下一线，不画鞋）
      c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt)) * .7;
      brush(c, [[wx - 34, 986], [wx, 990], [wx + 34, 986]], { w: 5, tone: .5, dry: .7, seed: 1631, tail: .6, col: [110, 92, 74] });
      c.restore();
      // 请罪之言（三道声纹，自她身前荡开）
      for (let k = 0; k < 3; k++) {
        const q = (t * .46 + k / 3) % 1;
        c.save(); c.globalAlpha = clamp(bow) * Math.sin(Math.PI * q) * .26;
        c.translate(wx - 30, 690);
        c.strokeStyle = 'rgba(64,54,48,.9)'; c.lineWidth = 3.2; c.lineCap = 'round';
        c.beginPath(); c.arc(-24 - q * 80, 0, 130 + q * 120, -0.6, 0.6); c.stroke();
        c.restore();
      }

      Z.inkSmoke(c, wx, 668, t, { seed: 177, a: 0.28 });
      Z.inkSmoke(c, 560, 710, t, { seed: 178, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 111, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 112, a: .34 });

      Z.bigText(c, '蓬首徒行', { x: 330, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '叩头请罪 · 音辞清辩', { x: 320, y: 546, size: 44, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(146,110,40,.92)', shadow: { color: 'rgba(150,120,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
