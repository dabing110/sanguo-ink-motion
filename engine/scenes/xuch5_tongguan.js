// ⑤ 潼关瞋目：马超疑其有变，欲夜袭，褚瞋目盼之，超不敢动。
// 主动作：许褚按刃怒立、与远处马超对峙（0.4→2.0s 立定）；母题循环：扬尘、对立双旗、暗云。
SCENES['xuch5_tongguan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xc_paper', '#e6dcc2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xc5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 150, tone: 0.26, seed: 81.2 },
          { y0: 545, amp: 100, tone: 0.36, seed: 77.9 },
        ]);
      }, { blur: 4, halo: 14, haloA: 0.22 });
      Z.mist(c, t, { y0: 220, y1: 520, n: 3, alpha: 0.5, speed: 48, seed: 7 });
      // 对立双旗（曹红 vs 马超暗）
      Z.flag(c, 360, 320, 340, t, { col: 'rgba(176,48,38,.9)', seed: 11 });
      Z.flag(c, 1560, 320, 340, t, { col: 'rgba(72,66,58,.85)', seed: 13 });
      // 远处马超（不敢动）
      Z.rider(c, 1500, 884, 1.5, t * 0.5, { flip: 1, cape: 1, backFlag: 1, spearAng: -0.4, spearLen: 300 });
      // 扬尘（隔于两军之间）
      Z.dust(c, t, { x: 960, y: 818, n: 11, seed: 9, scale: 1.8, alpha: 0.36 });
      // 主动作：许褚按刃怒立（不举，气势压人）
      const x = 820, y = 884, s = 1.85;
      const set = ss(0.4, 2.0, lt);
      Z.xuchu(c, x, y, s, t, { raise: 0.08 + set * 0.12 });
      Z.seal(c, 1762, 952, '仲康', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
