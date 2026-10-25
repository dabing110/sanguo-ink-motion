// ② 入蜀建功：随先主入蜀，数有战功，战场冲阵。
// 主动作：魏延骑战由左冲向右（奔袭）；母题循环：云气、扬尘、敌旗倾倒。
SCENES['weiy2_rushu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 150, tone: 0.22, seed: 31.2 },
          { y0: 540, amp: 110, tone: 0.32, seed: 27.5 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 220, y1: 520, n: 3, alpha: 0.42, speed: 80, seed: 4 });
      // 战场平地
      brush(c, [[0, 800], [520, 786], [1040, 806], [1560, 784], [1920, 800]], { w: 16, tone: 0.82, dry: 0.74, seed: 21, head: 0.04, tail: 0.36, reveal: ss(0, 0.4, lt) });
      // 敌旗倾倒（被破）
      Z.fallenFlag(c, 360, 800, ss(0.3, 1.0, lt), t, { seed: 5, col: 'rgba(150,90,70,.78)' });
      // 主动作：骑战冲阵（由左向右奔袭）
      const ride = ease.out(ss(0.2, 1.4, lt));
      const x = lerp(-120, 1300, ride), y = 880, s = 1.7;
      const ph = t * 9;
      Z.weiyanRider(c, x, y, s, ph, { flip: 0, cape: 1, backFlag: 1, gallop: 1, tone: 0.9 });
      // 冲阵扬尘
      if (ride < 0.95) Z.dust(c, t, { x: x - 140, y: y - 8, n: 8, seed: 8, scale: 1.5, alpha: 0.4 });
      // 身后残旗烟
      Z.flag(c, 1680, 720, 150, t, { col: 'rgba(150,90,70,.6)', seed: 9 });
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
