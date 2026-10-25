// ① 羊耽妻辛氏，字宪英，陇西人，魏侍中辛毗之女也。聪朗有才鉴。
//    画面：堂上灯下一卷竹简——她不是战场人物，也不是方士；她的武器是判断。
SCENES['xn1_caijian'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn1', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'xn1_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 470, amp: 140, tone: 0.15, seed: 11 }, { y0: 620, amp: 94, tone: 0.24, seed: 13 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      // ⚠ 运动量是硬指标（qa 按相邻帧差 >12 灰阶判定）：淡墨小动会被判成静止
      Z.mist(c, t, { y0: 380, y1: 700, n: 5, alpha: 0.6, speed: 92, seed: 112 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.4, speed: 124, seed: 116 });
      Z.inkCloud(c, t, { y: 884, h: 30, n: 4, speed: 92, span: 1500, seed: 5, a: .22 });
      Z.inkCloud(c, t, { y: 470, h: 24, n: 3, speed: 118, span: 1300, seed: 15, a: .16 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 900]], { w: 14, tone: 0.78, dry: 0.74, seed: 118, head: .03, tail: .3 });
      Z.geese(c, t, { y: 205, x0: 2360, speed: 128, n: 5, seed: 21, scale: 0.8 });

      // 堂：柱（两侧，定「堂上」）
      [[210, 1.0], [1710, 1.0]].forEach(([px2], k) => {
        c.save(); c.translate(px2, 960);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -830]],
          { w: 34, tone: .6, dry: .55, seed: 121 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -848, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 灯烛（左，火苗跳动：主运动之一）
      Z.candle(c, 520, 906, 1.25, t, { a: ss(0.3, 1.8, lt), seed: 51 });

      // 主动作：宪英端立堂中，手持竹简
      Z.xinshi(c, 1030 + Math.sin(t * .8) * 3, 948, 2.5,
        { t, fade: ss(0.25, 1.7, lt), scroll: 1, bow: 0.05 });

      Z.inkSmoke(c, 1030, 660, t, { seed: 7, a: 0.24 });
      Z.curtain(c, 100, 132, t, { seed: 71, a: .32 });
      Z.curtain(c, 1820, 132, t, { seed: 72, a: .32 });

      Z.bigText(c, '聪朗有才鉴', { x: 320, y: 462, size: 62, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '魏侍中辛毗之女', { x: 350, y: 552, size: 42, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(46,86,86,.92)', shadow: { color: 'rgba(40,110,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
