// ② 潼关举兵：二一一年，马超与韩遂等十部据潼关反曹。
// 主动作：马超立马高阜举枪（0.5→1.1s）→ 身后西凉铁骑自左横贯冲出（1.0→2.6s）；母题循环：风沙、枪林齐摆、旌旗。
SCENES['m2_tongguan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc2', '#eee4cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 潼关：崖壁夹一道，山势比第一幕陡
      Z.wash(c, 'mc2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 1000, [
          { y0: 400, amp: 268, tone: 0.30, seed: 31.2 },
          { y0: 560, amp: 176, tone: 0.42, seed: 36.7 },
        ]);
        Z.mountains(c, g, 1150, 2100, [
          { y0: 388, amp: 250, tone: 0.28, seed: 41.5 },
          { y0: 548, amp: 160, tone: 0.38, seed: 44.1 },
        ]);
        // 关隘：两笔夹出的关口
        brush(g, [[900, 560], [960, 470], [1010, 560]], { w: 26, tone: 0.66, dry: 0.5, seed: 51, head: 0.1, tail: 0.3 });
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.sand(c, t, { y0: 330, y1: 760, n: 5, alpha: 0.32, speed: 200, seed: 15 });
      // 前景关道
      brush(c, [[0, 812], [520, 786], [1080, 806], [1560, 782], [1920, 800]], { w: 20, tone: 0.88, dry: 0.7, seed: 13, head: 0.04, tail: 0.3, reveal: ss(0, 0.32, lt) });
      // 枪林（循环一：风里齐摆，铁骑未动先见枪）
      Z.spearWall(c, 120, 806, 9, 92, 0.86, t, { tone: 0.78, seed: 8, sway: 0.045 });
      // 旌旗（循环二）
      Z.flag(c, 300, 800, 250, t, { seed: 5, col: 'rgba(178,44,36,.86)', text: '馬' });
      Z.flag(c, 1650, 792, 230, t, { seed: 6, col: 'rgba(178,44,36,.8)', text: '涼' });
      // 主动作一：马超立马高阜举枪
      const mx = 1330, my = 836, ms = 1.95;
      Z.horse(c, mx, my, ms, t * 4.2, { gallop: 0, flip: 1, tone: 0.92 });
      Z.mChao(c, mx, my, ms, t * 4.2, { flip: 1, spearAng: lerp(-0.5, -1.02, ease.out(ss(0.45, 1.15, lt))), cape: 1 });
      // 主动作二：西凉铁骑自左横贯冲出
      const charge = ss(0.95, 2.6, lt);
      if (charge > 0) {
        const cx = lerp(-360, 1420, ease.out(charge));
        c.save(); c.globalAlpha = clamp(charge * 2.2);
        Z.cavalry(c, t, { x: cx, y: 900, n: 5, s: 1.02, gap: 172, speed: 1.5, seed: 2, flip: 0, lead: 0, charge: 1 });
        c.restore();
        // 铁骑扬尘
        Z.dust(c, t, { x: cx + 200, y: 900, n: 8, seed: 7, scale: 1.6, alpha: 0.5 });
      }
      Z.seal(c, 1762, 946, '潼关', ss(1.15, 1.4, lt), { size: 88, seed: 13 });
    },
  };
})();
