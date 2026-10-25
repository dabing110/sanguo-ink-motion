// ④ 没于南匈奴左贤王，在胡中十二年，生二子。
//    《悲愤诗》：「边荒与华异，人俗少义理。处所多霜雪，胡风春夏起。翩翩吹我衣，肃肃入我耳。」
//    画面：穹庐、霜雪、两个孩子。这是她人生里最长的一段——十二年，画面上只有三秒半。
//    ⚠ 4.4s 是全片最长的一幕：霜雪＋胡风＋帐烟＋双炬，运动必须堆满。
SCENES['cj4_huzhong'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj4', '#dcd7c2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj4_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 140, tone: 0.22, seed: 141 }, { y0: 616, amp: 96, tone: 0.32, seed: 143 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.60, speed: 96, seed: 1412 });
      Z.mist(c, t, { y0: 230, y1: 510, n: 4, alpha: 0.42, speed: 128, seed: 1416 });
      Z.inkCloud(c, t, { y: 440, h: 34, n: 5, speed: 96, span: 1500, seed: 17, a: .24 });
      Z.inkCloud(c, t, { y: 286, h: 26, n: 4, speed: 124, span: 1300, seed: 27, a: .18 });
      brush(c, [[0, 940], [640, 930], [1280, 944], [1920, 930]], { w: 20, tone: 0.5, dry: 0.8, seed: 1418, head: .03, tail: .3 });

      // 远处的马（胡地：两匹，缓步）
      [[360, .82], [1660, .74]].forEach(([px2, sc], k) => {
        c.save(); c.globalAlpha = clamp(ss(0.3, 1.6, lt)) * .55;
        c.translate(px2 + Math.sin(t * .5 + k) * 20, 918);
        Z.horse(c, 0, 0, sc, t * 1.1 + k, { gallop: 0, flip: k ? 1 : 0, tone: .58 });
        c.restore();
      });

      // 穹庐（主场景）
      Z.huTent(c, 1220, 966, 1.12, t, { a: ss(0.1, 1.4, lt), smoke: 1, seed: 21 });

      // 帐门火光（透出）
      Z.campFire(c, 1220, 950, 1.0, t, { alpha: .66 * clamp(ss(0.4, 1.6, lt)), seed: 37 });
      // 炬火（户外两支，主运动）
      Z.torch(c, 470, 936, 1.45, t, 141);
      Z.torch(c, 1720, 930, 1.35, t, 145);

      // 胡风（横向掠过，补足帧差）
      Z.huWind(c, t, { n: 5, y0: 300, y1: 880, speed: 210, seed: 41, a: .3 });
      Z.huWind(c, t, { n: 4, y0: 420, y1: 940, speed: 150, seed: 42, a: .22 });

      // 霜雪（主运动：整屏持续位移）
      Z.snow(c, t, { n: 40, speed: 150, seed: 31, alpha: .62, yTop: -40, yBot: 1010, drift: 1 });
      Z.snow(c, t, { n: 22, speed: 92, seed: 32, alpha: .44, yTop: -40, yBot: 1010, drift: 1.6 });

      // 主动作：文姬（胡装，风里站着）
      Z.wenji(c, 830 + Math.sin(t * .9) * 4, 950, 2.05,
        { t, fade: ss(0.2, 1.5, lt), hu: 1, bow: 0.05, carry: 0.2 });

      // 二子（在胡中所生；绕她跑动 —— 持续位移）
      [[640, 0], [1010, 1]].forEach(([bx, k]) => {
        const q = (t * .34 + k * .5) % 1;
        const px = bx + Math.sin(t * 1.15 + k * 2.1) * 90;
        const py = 952 + Math.abs(Math.sin(t * 3.4 + k * 1.7)) * -12;
        c.save(); c.globalAlpha = clamp(ss(0.6 + k * 0.2, 1.8 + k * 0.2, lt));
        Z.huChild(c, px, py, 1.35, t, { seed: 51 + k * 7, flip: (Math.sin(t * .8 + k) > 0 ? 1 : 0), cling: 0 });
        c.restore();
      });

      Z.inkSmoke(c, 830, 640, t, { seed: 157, a: 0.26 });
      Z.inkSmoke(c, 1450, 600, t, { seed: 158, a: 0.22 });
      Z.dust(c, t, { x: 900, y: 946, n: 6, seed: 159, scale: 1.6, alpha: 0.42 });
      Z.curtain(c, 100, 132, t, { seed: 107, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 108, a: .34 });

      Z.bigText(c, '在胡十二年', { x: 300, y: 444, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '生二子', { x: 450, y: 542, size: 48, gap: 12, appear: ss(1.2, 2.0, lt), col: 'rgba(58,84,96,.92)', shadow: { color: 'rgba(60,96,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
