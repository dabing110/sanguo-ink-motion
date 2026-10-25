// ⑤ 曹操素与邕善，痛其无嗣，乃遣使者以金璧赎之，而重嫁于祀。
//    《悲愤诗》：「邂逅徼时愿，骨肉来迎己。己得自解免，当复弃儿子。天属缀人心，念别无会期。
//    存亡永乖隔，不忍与之辞。儿前抱我颈，问母欲何之。人言母当去，岂复有还时。
//    阿母常仁恻，今何更不慈？我尚未成人，奈何不顾思！」
//    画面：赎她的人捧着金璧站在右边，两个孩子抱着她的脖子站在左边。她得救了，她得走了。
SCENES['cj5_biezi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj5', '#e0dbc6');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj5_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 484, amp: 132, tone: 0.18, seed: 151 }, { y0: 634, amp: 90, tone: 0.28, seed: 153 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1512 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 1516 });
      Z.inkCloud(c, t, { y: 468, h: 32, n: 5, speed: 96, span: 1500, seed: 18, a: .24 });
      Z.inkCloud(c, t, { y: 320, h: 26, n: 4, speed: 124, span: 1300, seed: 28, a: .18 });
      Z.geese(c, t, { y: 188, x0: 2380, speed: 130, n: 5, seed: 157, scale: .78 });
      brush(c, [[0, 936], [640, 928], [1280, 940], [1920, 928]], { w: 17, tone: 0.68, dry: 0.76, seed: 1518, head: .03, tail: .3 });

      // 穹庐（渐远：她在离开它）
      Z.huTent(c, 420, 968, 1.0, t, { a: ss(0.1, 1.4, lt) * (1 - 0.35 * ss(1.8, 3.8, lt)), smoke: 1, seed: 22 });

      // 汉使一行（右：一骑＋持节使者）
      const env = ss(0.4, 1.8, lt);
      c.save(); c.globalAlpha = clamp(env) * .8;
      c.translate(1700, 928);
      Z.horse(c, 0, 0, 0.9, t * 1.4, { gallop: 0, flip: 1, tone: .72 });
      Z.rider(c, 0, 0, 0.9, t * 1.4, { flip: 1, cape: 1, backFlag: 0, t, spearAng: -1.3, spearLen: 180 });
      c.restore();
      // 旄节（使者所持：竿＋旄牛尾，随风）
      c.save(); c.globalAlpha = clamp(env); c.translate(1480, 946);
      brush(c, [[0, 0], [-4 + Math.sin(t * 1.1) * 5, -300]], { w: 7, tone: .62, dry: .5, seed: 1521, col: [104, 82, 54] });
      for (let k = 0; k < 4; k++) {
        brush(c, [[-4, -300], [-16 - k * 8 + Math.sin(t * 2.2 + k) * 12, -318 + k * 10]],
          { w: 5, tone: .55, dry: .8, seed: 1522 + k, tail: .8, col: [148, 60, 48] });
      }
      c.restore();

      // 金璧（赎她的代价）
      Z.goldBi(c, 1560, 916, 1.0, t, { a: ss(0.8, 2.0, lt), seed: 61 });

      // 炬火（主运动）
      Z.torch(c, 700, 930, 1.38, t, 151);
      Z.torch(c, 1120, 936, 1.28, t, 155);
      Z.dust(c, t, { x: 1700, y: 940, n: 7, seed: 159, scale: 1.8, alpha: 0.5 });

      // 胡风（还在吹，但弱了）
      Z.huWind(c, t, { n: 4, y0: 320, y1: 880, speed: 190, seed: 43, a: .26 });
      // 残雪（少了）
      Z.snow(c, t, { n: 18, speed: 120, seed: 33, alpha: .42, yTop: -40, yBot: 1000, drift: 1 });

      // 主动作：文姬（仍着胡装——归而未归）
      const wx = lerp(900, 1010, ease.out(ss(0.8, 3.6, lt)));
      Z.wenji(c, wx + Math.sin(t * .95) * 4, 950, 2.1,
        { t, fade: ss(0.2, 1.4, lt), hu: 1, bow: 0.14 });

      // 二子抱颈（「儿前抱我颈，问母欲何之」）
      const cling = ss(0.9, 2.6, lt);
      Z.huChild(c, wx - 138 + Math.sin(t * 1.6) * 8, 946, 1.45, t, { seed: 51, cling });
      Z.huChild(c, wx + 132 + Math.sin(t * 1.9 + 1) * 8, 948, 1.35, t, { seed: 58, flip: 1, cling });

      Z.inkSmoke(c, wx, 656, t, { seed: 167, a: 0.28 });
      Z.inkSmoke(c, 500, 700, t, { seed: 168, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 109, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 110, a: .34 });

      Z.bigText(c, '金璧赎归', { x: 330, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '当复弃儿子', { x: 380, y: 546, size: 46, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(48,72,104,.92)', shadow: { color: 'rgba(56,88,124,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
