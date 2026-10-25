// ③ 兴平中，天下丧乱，文姬为胡骑所获。
//    《悲愤诗》：「卓众来东下，金甲耀日光…猎野围城邑，所向悉破亡…马边县男头，马后载妇女。」
//    画面：胡骑突至。不画首级、不画血——只画尘烟里被裹挟远去的一群淡墨身影，她是其中一个。
SCENES['cj3_beilue'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj3', '#ded9c4');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj3_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 500, amp: 112, tone: 0.20, seed: 131 }, { y0: 650, amp: 78, tone: 0.30, seed: 133 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1312 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 1316 });
      Z.inkCloud(c, t, { y: 470, h: 34, n: 5, speed: 96, span: 1500, seed: 16, a: .24 });
      Z.inkCloud(c, t, { y: 316, h: 26, n: 4, speed: 124, span: 1300, seed: 26, a: .18 });
      brush(c, [[0, 926], [640, 918], [1280, 928], [1920, 918]], { w: 16, tone: 0.74, dry: 0.76, seed: 1318, head: .03, tail: .3 });

      // 被焚的村舍（远方，只画烟与火光）
      const burn = ss(0.2, 1.6, lt);
      [[280, 1], [1660, 0]].forEach(([px2, k]) => {
        c.save(); c.globalAlpha = clamp(burn) * .8;
        c.translate(px2, 900);
        brush(c, [[-70, 0], [-64 + Math.sin(t * .9 + k) * 4, -120], [-72, -210]],
          { w: 26, tone: .5, dry: .7, seed: 1321 + k, col: [96, 78, 58] });
        c.restore();
        Z.campFire(c, px2 + 40, 906, 1.05, t, { alpha: .8 * clamp(burn), seed: 27 + k });
      });

      // 胡骑（三骑突至：奔袭相位快循环；整体位移只作辅助，≈70px/s）
      const rd = ss(0.15, 1.4, lt);
      [[430, 1.15, 0], [860, 1.0, 1], [1330, 1.1, 2]].forEach(([bx, sc, k]) => {
        const px = bx + ease.out(ss(0.15, 3.4, lt)) * 250 + Math.sin(t * 1.4 + k) * 12;
        const ph = t * 7.5 + k * 1.7;
        c.save(); c.globalAlpha = clamp(rd);
        c.translate(px, 906 - k * 10);
        Z.horse(c, 0, 0, sc, ph, { gallop: 1, flip: 0, tone: .82 - k * .05 });
        Z.rider(c, 0, 0, sc, ph, { flip: 0, cape: 1, backFlag: 1, t, spearAng: -0.5 - k * .1, spearLen: 260 });
        c.restore();
      });
      // 胡旌（旄旗，两杆）
      Z.flag(c, 620, 900, 330, t, { seed: 1331, col: 'rgba(132,60,44,.82)', text: '胡' });
      Z.flag(c, 1520, 908, 300, t, { seed: 1332, col: 'rgba(124,56,42,.78)', text: '胡' });

      // 扬尘（大面积，主运动之一）
      Z.dust(c, t, { x: 700, y: 912, n: 9, seed: 139, scale: 2.2, alpha: 0.6 });
      Z.dust(c, t, { x: 1400, y: 918, n: 7, seed: 149, scale: 1.9, alpha: 0.5 });

      // 「马后载妇女」：被裹挟的一群淡墨身影（不画血、不画首级）
      const take = ss(0.8, 2.6, lt);
      for (let k = 0; k < 5; k++) {
        const q = clamp((lt - 0.8 - k * 0.1) / 2.0);
        const px = lerp(1000 + k * 60, 1520 + k * 40, ease.out(q)) + Math.sin(t * 2.2 + k * 1.4) * 6;
        const py = 928 + Math.sin(t * 3.1 + k) * 3;
        c.save(); c.globalAlpha = clamp(take) * .5;
        c.translate(px, py); c.scale(.72, .72); c.rotate(Math.sin(t * 1.5 + k) * .08);
        c.fillStyle = 'rgba(104,96,92,.78)';
        c.beginPath(); c.moveTo(-16, 0); c.quadraticCurveTo(-14, -36, 0, -48); c.quadraticCurveTo(15, -36, 17, 0); c.closePath(); c.fill();
        c.fillStyle = 'rgba(226,216,198,.88)';
        c.beginPath(); c.arc(0, -58, 7.5, 0, Math.PI * 2); c.fill();
        c.restore();
      }

      // 炬火（乱兵举火，主运动）
      Z.torch(c, 350, 908, 1.42, t, 131);
      Z.torch(c, 1760, 902, 1.32, t, 135);

      // 主动作：文姬（被掠：她在这一群里，向右被带走一点，仍站着）
      const wx = lerp(1120, 1240, ease.out(ss(0.8, 3.4, lt)));
      Z.wenji(c, wx + Math.sin(t * 1.1) * 4, 936, 1.95,
        { t, fade: ss(0.3, 1.5, lt), bow: 0.08, flip: 0 });

      Z.inkSmoke(c, wx, 660, t, { seed: 147, a: 0.28 });
      Z.inkSmoke(c, 700, 700, t, { seed: 148, a: 0.24 });
      Z.curtain(c, 100, 132, t, { seed: 105, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 106, a: .34 });

      Z.bigText(c, '天下丧乱', { x: 330, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '为胡骑所获', { x: 390, y: 546, size: 46, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
