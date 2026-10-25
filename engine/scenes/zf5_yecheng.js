// ⑧ 《魏略》：邺城破，绍妻及后共坐皇堂上；文帝入绍舍，后怖，以头伏姑膝上；文帝谓「令新妇举头！」
//    姑乃捧后令仰，文帝就视，见其颜色非凡，称叹之；太祖闻其意，遂为迎取。
//    画面：皇堂上，姑坐于座；她以头伏姑膝（kneel），文帝入，命「举头」——她缓缓抬起脸。一抬，定了后半生。
SCENES['zf5_yecheng'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf5', '#e7e1cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf5_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 130, tone: 0.15, seed: 511 }, { y0: 624, amp: 90, tone: 0.24, seed: 513 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 98, seed: 5112 });
      Z.mist(c, t, { y0: 230, y1: 510, n: 4, alpha: 0.44, speed: 126, seed: 5116 });
      Z.inkCloud(c, t, { y: 300, h: 28, n: 5, speed: 100, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 22, n: 3, speed: 124, span: 1300, seed: 24, a: .18 });

      // 皇堂（阶＋柱＋座）
      Z.huangTang(c, 960, 1004, 1.18, t, { a: ss(0.1, 1.5, lt), seed: 81 });

      // 姑（刘夫人，坐于座侧）
      Z.zhenhou(c, 700, 950, 1.16, { t, fade: ss(0.25, 1.6, lt), bow: 0.06 });
      // 她：先伏姑膝（kneel），后「举头」（raise 渐起）
      const head = ss(0.4, 2.4, lt);
      Z.zhenhou(c, 1010 + Math.sin(t * .8) * 3, 956, 1.46, { t, fade: ss(0.3, 1.7, lt), kneel: 1, raise: head, flip: 1 });
      // 文帝（入绍舍，就视：立者）
      Z.leader(c, 1430, 928, 1.42, t, { flip: 1, bow: 0.05 });

      Z.torch(c, 360, 916, 1.34, t, 511);
      Z.torch(c, 1640, 920, 1.30, t, 515);
      Z.dust(c, t, { x: 960, y: 720, n: 6, seed: 519, scale: 1.5, alpha: 0.44 });

      Z.inkSmoke(c, 1010, 700, t, { seed: 517, a: 0.26 });
      Z.inkSmoke(c, 560, 730, t, { seed: 518, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 501, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 502, a: .34 });

      Z.bigText(c, '令新妇举头', { x: 320, y: 452, size: 58, gap: 12, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '颜色非凡', { x: 320, y: 548, size: 50, gap: 12, appear: ss(1.2, 2.1, lt), col: 'rgba(140,52,42,.92)', shadow: { color: 'rgba(150,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
