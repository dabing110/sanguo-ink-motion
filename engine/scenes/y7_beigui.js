// ⑦ 北归故国：文帝践阼，权称藩，遣禁还。须发皓白，形容憔悴——拜安远将军，岁余卒。
// 他回来的时候，还是那个站得最直的人，只是白了头。
// 主动作：北行（0.25→2.2s，缓步）→ 顿足回望（1.9→2.6s）→ 按剑挺立（2.3→2.95s）
// 母题循环：松风、尘、道旁雁、衣袂。
SCENES['y7_beigui'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj7', '#eae3ce');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'yj7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 442, amp: 138, tone: 0.2, seed: 181.5 },
          { y0: 548, amp: 90, tone: 0.3, seed: 185.9 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 310, y1: 630, n: 4, alpha: 0.5, speed: 48, seed: 183 });
      Z.yunHai(c, t, { y: 690, h: 92, n: 4, speed: 58, alpha: 0.46 });
      brush(c, [[0, 910], [640, 898], [1280, 912], [1920, 896]], { w: 14, tone: 0.8, dry: 0.75, seed: 187, head: 0.03, tail: 0.3, reveal: ss(0, 0.35, lt) });

      // 道旁松（两株，随风）
      Z.pine(c, t, { x: 210, y: 922, s: 1.3, seed: 191, tone: 0.85 });
      Z.pine(c, t, { x: 1740, y: 908, s: 1.0, seed: 193, tone: 0.8 });

      // 主动作：北行 → 回望 → 挺立
      const walk = ss(0.25, 2.2, lt);          // 缓步：150px / 2s ≈ 75px/s
      const stop = ss(1.9, 2.6, lt);
      const tx = lerp(1240, 1090, walk);
      Z.yuJin(c, tx, 962, 2.45, {
        t, jiAng: lerp(-0.5, -0.86, stop), raise: stop * 0.22,
        stance: t * (1.4 - stop * 0.9), flip: 0, old: 1, sword: 1,
      });
      // 随行二骑（原地勒马，鞭轻轻晃）
      c.save(); c.globalAlpha = 0.85;
      Z.oldRider(c, 1500, 936, 1.5, t * 3.2, { draw: 0, beard: 1, blade: 0, cape: 1, backFlag: 1, t, flip: 0, old: 1 });
      Z.oldRider(c, 1690, 950, 1.35, t * 3.2 + 1.4, { draw: 0, beard: 1, blade: 0, cape: 1, backFlag: 0, t, flip: 0, old: 1 });
      c.restore();
      // 归雁一行（向南）
      Z.geese(c, t, { y: 230, x0: 1980, speed: 130, n: 6, seed: 37, scale: 1.1 });
      Z.dust(c, t, { x: tx - 140, y: 960, n: 5, seed: 197, scale: 1.2, alpha: 0.26 });
      Z.seal(c, 256, 950, '北归', ss(2.25, 2.6, lt), { size: 86, seed: 199 });
    },
  };
})();
