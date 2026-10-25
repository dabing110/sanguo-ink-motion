// ⑤ 祁山鏖兵：北伐勇冠三军，率骑鏖战。
// 主动作：魏延率骑由左冲向右（奔袭）；母题循环：云气、扬尘、同袍骑队、敌旗倾。
SCENES['weiy5_qishan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 150, tone: 0.22, seed: 61.5 },
          { y0: 545, amp: 105, tone: 0.32, seed: 57.2 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 220, y1: 500, n: 3, alpha: 0.4, speed: 86, seed: 6 });
      brush(c, [[0, 808], [520, 792], [1040, 812], [1560, 790], [1920, 806]], { w: 16, tone: 0.82, dry: 0.74, seed: 31, head: 0.04, tail: 0.36, reveal: ss(0, 0.4, lt) });
      // 敌旗倾倒
      Z.fallenFlag(c, 1680, 804, ss(0.2, 0.9, lt), t, { seed: 4, col: 'rgba(150,90,70,.78)' });
      // 同袍骑队（在魏延身后，错相位）
      const cohort = ss(0.1, 1.3, lt);
      for (let i = 1; i <= 3; i++) {
        const cx = lerp(-260, 760, cohort) - i * 230;
        const cy = 884 - i * 8, cs = 1.4 - i * 0.12;
        Z.rider(c, cx, cy, cs, t * 9 + i, { flip: 0, cape: 1, backFlag: 1, spearAng: -0.35, spearLen: 300 });
      }
      // 主动作：魏延率骑冲阵（前导）
      const ride = ease.out(ss(0.2, 1.5, lt));
      const x = lerp(120, 1380, ride), y = 880, s = 1.7;
      Z.weiyanRider(c, x, y, s, t * 9, { flip: 0, cape: 1, backFlag: 1, gallop: 1, tone: 0.92 });
      if (ride < 0.95) Z.dust(c, t, { x: x - 150, y: y - 8, n: 9, seed: 8, scale: 1.6, alpha: 0.42 });
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
