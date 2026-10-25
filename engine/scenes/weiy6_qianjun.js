// ⑥ 前军师：迁前军师征西大将军，假节，封南郑侯。
// 主动作：魏延按刀立于旗下、受任（0.5→2.0s 举刀定型）；母题循环：云海、大纛、雁阵。
SCENES['weiy6_qianjun'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 450, amp: 175, tone: 0.19, seed: 71.4 },
          { y0: 530, amp: 120, tone: 0.29, seed: 67.1 },
          { y0: 600, amp: 78, tone: 0.39, seed: 63.6 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.yunHai(c, t, { y: 720, h: 120, n: 6, speed: 82, alpha: 0.48, span: 2720 });
      Z.geese(c, t, { y: 210, x0: 2050, speed: 126, n: 3, seed: 8, scale: 1.0 });
      // 大纛（受任之旗）：征西大将军
      const r = ease.out(ss(0.2, 1.2, lt));
      Z.flag(c, 1240, 300 + (1 - r) * 40, 380, t, { col: 'rgba(176,48,38,.9)', text: '征西大将军', seed: 3 });
      // 主动作：魏延按刀立于旗下（举刀定型）
      const x = 820, y = 874, s = 1.7;
      const raise = ss(0.5, 2.0, lt);
      Z.weiyan(c, x, y, s, t, { raise });
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
