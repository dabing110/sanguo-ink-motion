// ⑦ 亮卒惊变：武侯既没，延与杨仪争权，衅起。
// 主动作：魏延按刀怒立、旌旗对立（0.4→2.0s 刀势下压）；母题循环：扬尘、对立双旗、暗云。
SCENES['weiy7_bingbian'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e6dcc2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 150, tone: 0.26, seed: 81.2 },
          { y0: 545, amp: 100, tone: 0.36, seed: 77.9 },
        ]);
      }, { blur: 4, halo: 14, haloA: 0.22 });
      Z.mist(c, t, { y0: 220, y1: 520, n: 3, alpha: 0.5, speed: 50, seed: 7 });
      // 对立双旗（魏延红 vs 杨仪暗）
      Z.flag(c, 360, 320, 340, t, { col: 'rgba(176,48,38,.9)', seed: 11 });
      Z.flag(c, 1560, 320, 340, t, { col: 'rgba(72,66,58,.85)', seed: 13 });
      // 扬尘（乱起）
      Z.dust(c, t, { x: 960, y: 820, n: 10, seed: 9, scale: 1.7, alpha: 0.36 });
      // 主动作：魏延按刀怒立（刀势下压，不举）
      const x = 960, y = 876, s = 1.75;
      const press = ss(0.4, 2.0, lt);
      Z.weiyan(c, x, y, s, t, { raise: 0.35 + press * 0.15 });
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
