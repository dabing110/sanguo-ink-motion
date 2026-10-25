// ⑦ 建安中，袁绍为中子熙纳之；熙出为幽州，后留养姑。
//    画面：邺城（城墙＋城楼）下，她与姑（刘夫人）同在——熙远在幽州，她留下，奉养婆母。最长的这一幕，把城、人、天都画满。
SCENES['zf4_yuanxi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf4', '#e6e1ce');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf4_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 134, tone: 0.16, seed: 411 }, { y0: 624, amp: 92, tone: 0.25, seed: 413 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.64, speed: 100, seed: 4112 });
      Z.mist(c, t, { y0: 220, y1: 500, n: 4, alpha: 0.44, speed: 130, seed: 4116 });
      Z.inkCloud(c, t, { y: 360, h: 34, n: 5, speed: 102, span: 1600, seed: 14, a: .26 });
      Z.inkCloud(c, t, { y: 250, h: 26, n: 4, speed: 130, span: 1400, seed: 24, a: .18 });
      Z.geese(c, t, { y: 176, x0: 2240, speed: 138, n: 5, seed: 97, scale: .8 });

      // 邺城（城墙＋城楼：这一幕的地标）
      Z.yeWall(c, 960, 1010, 1.18, { a: ss(0.1, 1.5, lt), tower: 1, seed: 71 });

      // 姑（刘夫人，立于卧榻之侧）
      Z.couch(c, 1320, 968, 0.96, t, { a: ss(0.2, 1.5, lt), curtain: 0, seed: 21 });
      Z.zhenhou(c, 1320, 924, 1.18, { t, fade: ss(0.3, 1.6, lt), bow: 0.12 });
      // 幼年甄后（留养邺城：立于姑侧）
      Z.zhenhou(c, 720 + Math.sin(t * .9) * 3, 930, 1.42, { t, fade: ss(0.3, 1.7, lt), young: 1, flip: 1 });

      Z.torch(c, 360, 916, 1.36, t, 411);
      Z.campFire(c, 1500, 958, 0.9, t, { alpha: .66, seed: 23 });
      Z.dust(c, t, { x: 960, y: 760, n: 7, seed: 419, scale: 1.8, alpha: 0.5 });

      Z.inkSmoke(c, 720, 700, t, { seed: 417, a: 0.28 });
      Z.inkSmoke(c, 1320, 720, t, { seed: 418, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 401, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 402, a: .34 });

      Z.bigText(c, '袁熙之妻', { x: 320, y: 452, size: 60, gap: 12, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '邺城留养姑', { x: 320, y: 546, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(46,78,72,.92)', shadow: { color: 'rgba(48,96,86,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
