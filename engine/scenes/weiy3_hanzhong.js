// ③ 独镇汉中：先主取汉中，拔延为太守，北拒曹公。
// 主动作：魏延立马城头、按刀远眺（0.6→2.2s 由下升上城垣）；母题循环：云海、旌旗、雁阵。
SCENES['weiy3_hanzhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 430, amp: 190, tone: 0.18, seed: 41.1 },
          { y0: 520, amp: 130, tone: 0.28, seed: 37.4 },
          { y0: 600, amp: 80, tone: 0.40, seed: 33.9 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.yunHai(c, t, { y: 720, h: 120, n: 6, speed: 80, alpha: 0.5, span: 2720 });
      Z.geese(c, t, { y: 200, x0: 2050, speed: 120, n: 3, seed: 6, scale: 1.0 });
      // 汉中城垣（魏延镇守之地）
      const rise = ease.out(ss(0.3, 1.4, lt));
      Z.hanWall(c, 960, lerp(760, 700, rise), 1.18, t, { flag: 1, seed: 2 });
      // 主动作：魏延立马城头、按刀远眺
      const x = 960, y = lerp(470, 430, rise), s = 1.15;
      const ph = t * 2.2;
      Z.weiyanRider(c, x, y, s, ph, { flip: 0, cape: 1, backFlag: 1, gallop: 0, tone: 0.92 });
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
