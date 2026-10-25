// ⑧ 南郑侯：为马岱所斩，夷三族，文长惜哉。
// 主动作：魏延负刀远去、身影渐隐（0.4→2.4s 向右隐去）；母题循环：落英、雁阵、云海。
SCENES['weiy8_nanzheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e6dcc2');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 450, amp: 175, tone: 0.16, seed: 91.3 },
          { y0: 530, amp: 120, tone: 0.24, seed: 87.6 },
          { y0: 600, amp: 78, tone: 0.34, seed: 83.1 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.yunHai(c, t, { y: 730, h: 120, n: 6, speed: 70, alpha: 0.46, span: 2720 });
      Z.geese(c, t, { y: 200, x0: 2050, speed: 110, n: 4, seed: 10, scale: 1.0 });
      // 落英（飘零）
      const r = rng(99);
      for (let i = 0; i < 26; i++) {
        const ph = ((t * 0.18 + i / 26 + r()) % 1);
        const x = (r() * W + t * 40) % (W + 200) - 100;
        const y = ph * 900 + 120;
        c.save(); c.globalAlpha = 0.5 * (1 - ph);
        c.fillStyle = 'rgba(176,72,52,.7)';
        c.beginPath(); c.ellipse(x, y, 6, 3, t + i, 0, Math.PI * 2); c.fill();
        c.restore();
      }
      // 主动作：魏延负刀远去、身影渐隐
      const go = ease.out(ss(0.4, 2.6, lt));
      const x = lerp(760, 1500, go), y = 876, s = 1.6;
      c.save(); c.globalAlpha = clamp(1 - go * 0.85);
      Z.weiyan(c, x, y, s, t, { raise: 0, flip: 1, cape: 1 });
      c.restore();
      // 地上孤刀（纪念）
      Z.saber(c, 560, 900, 1.45, 360, t, { });
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
