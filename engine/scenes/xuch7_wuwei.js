// ⑦ 武卫将军：曹丕即位，迁武卫将军，赐爵关内侯。
// 主动作：许褚举刃立于旗下、受任（0.5→2.0s 举刀定型）；母题循环：云海、大纛、雁阵。
SCENES['xuch7_wuwei'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xc_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xc7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 450, amp: 175, tone: 0.19, seed: 91.3 },
          { y0: 530, amp: 120, tone: 0.29, seed: 87.6 },
          { y0: 600, amp: 78, tone: 0.39, seed: 83.1 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.yunHai(c, t, { y: 720, h: 120, n: 6, speed: 82, alpha: 0.48, span: 2720 });
      Z.geese(c, t, { y: 210, x0: 2050, speed: 126, n: 3, seed: 8, scale: 1.0 });
      const r = ease.out(ss(0.2, 1.2, lt));
      Z.flag(c, 1240, 300 + (1 - r) * 40, 380, t, { col: 'rgba(176,48,38,.9)', text: '武卫将军', seed: 3 });
      const x = 820, y = 880, s = 1.8;
      const raise = ss(0.5, 2.0, lt);
      Z.xuchu(c, x, y, s, t, { raise });
      Z.seal(c, 1762, 952, '仲康', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
