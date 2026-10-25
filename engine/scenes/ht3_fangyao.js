// ③ 「精于方药，处剂不过数种，心识分铢，不假称量。针灸不过数处。」
//    画面：药罐吐气、药臼捣药、药囊在侧，华佗持针审视——「方药之精」。
SCENES['ht3_fangyao'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht3', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'ht3_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2040, [{ y0: 460, amp: 130, tone: 0.15, seed: 31 }, { y0: 600, amp: 92, tone: 0.24, seed: 33 }]);
      }, { blur: 4, halo: 16, haloA: 0.2 });

      Z.mist(c, t, { y0: 370, y1: 660, n: 4, alpha: 0.42, speed: 50, seed: 312 });
      Z.inkCloud(c, t, { y: 886, h: 22, n: 3, speed: 50, span: 1500, seed: 4, a: .12 });
      brush(c, [[0, 906], [640, 898], [1280, 908], [1920, 898]], { w: 13, tone: 0.78, dry: 0.74, seed: 318, head: .03, tail: .3 });
      Z.geese(c, t, { y: 190, x0: 2350, speed: 120, n: 4, seed: 37, scale: 0.7 });

      // 药罐（左，炭火 + 药气；主运动）
      Z.medPot(c, 420, 900, 1.35, t, { a: ss(0.4, 1.8, lt), fire: 1, seed: 41 });

      // 药臼 + 杵（右，上下捣动；主运动）
      Z.mortar(c, 1520, 912, 1.5, t, { a: ss(0.5, 1.9, lt), pound: 1 });

      // 药囊（中前景，静置）
      Z.herbBag(c, 960, 1000, 1.15, { a: ss(0.6, 2.0, lt), t, seed: 33 });

      // 主动作：华佗居中，持针审视（针尖随呼吸微动）
      Z.huatuo(c, 980, 950, 2.4,
        { t, fade: ss(0.25, 1.7, lt), raise: ss(1.0, 2.8, lt) * .65, needle: 1, bag: 0 });

      Z.inkSmoke(c, 980, 660, t, { seed: 7, a: 0.2 });
      Z.curtain(c, 100, 130, t, { seed: 75, a: .2 });
      Z.curtain(c, 1820, 130, t, { seed: 76, a: .2 });

      Z.bigText(c, '处剂不过数种', { x: 300, y: 468, size: 56, gap: 12, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '针灸不过数处', { x: 330, y: 556, size: 44, gap: 10, appear: ss(1.0, 1.9, lt), col: 'rgba(46,86,86,.92)', shadow: { color: 'rgba(40,110,110,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
