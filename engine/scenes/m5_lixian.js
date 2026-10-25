// ⑤ 离间西走：贾诩设离间，超、遂相疑，联军溃；马超走保诸戎，后奔张鲁。
// 主动作：一面大旗被挑落（0.3→1.1s）→ 马超勒马回望（0.9→1.7s）→ 转身孤骑西去、渐远渐小（1.6→2.8s）。
// 母题循环：风沙转急、残旗在风里抖、雁南去。
SCENES['m5_lixian'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc5', '#ebe0c5');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      Z.wash(c, 'mc5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2000, [
          { y0: 486, amp: 134, tone: 0.20, seed: 91.6 },
          { y0: 574, amp: 88, tone: 0.28, seed: 95.4 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.22 });
      // 风沙转急（循环一：比前三幕都大）
      Z.sand(c, t, { y0: 300, y1: 800, n: 6, alpha: 0.42, speed: 265, seed: 55 });
      // 阵后残旗（循环二：抖得厉害）
      Z.fallenFlag(c, 420, 848, ss(0.3, 1.1, lt), t, { seed: 3, col: 'rgba(170,44,36,.82)' });
      Z.fallenFlag(c, 1560, 838, ss(0.5, 1.3, lt), t, { seed: 4, col: 'rgba(170,44,36,.72)' });
      brush(c, [[0, 848], [520, 826], [1080, 844], [1560, 820], [1920, 838]], { w: 16, tone: 0.84, dry: 0.78, seed: 111, head: 0.04, tail: 0.32, reveal: ss(0, 0.3, lt) });
      // 遗弃的枪（插在土里，两杆）
      brush(c, [[760, 858], [756, 706]], { w: 5, tone: 0.7, dry: 0.6, seed: 121, tail: 0.2 });
      brush(c, [[1180, 852], [1188, 690]], { w: 4.5, tone: 0.62, dry: 0.65, seed: 122, tail: 0.25 });
      // 主动作：勒马回望 → 转身西去
      const look = ss(0.85, 1.7, lt);                   // 回望（马首朝右）
      const go = ss(1.6, 2.8, lt);                      // 西去（朝左渐远）
      const mx = lerp(920, 470, ease.inOut(go));
      const my = lerp(872, 812, go);
      const ms = lerp(1.95, 0.62, ease.inOut(go));
      const ph = t * (go > 0 ? 7.5 : 3.0);
      c.save(); c.globalAlpha = 1 - go * 0.42;
      Z.horse(c, mx, my, ms, ph, { gallop: go > 0.02 ? 1 : 0, flip: 0, tone: 0.9 });
      Z.mChao(c, mx, my, ms, ph, { flip: 0, spearAng: lerp(-0.5, -0.18, look) - go * 0.3, cape: 1, backFlag: 0 });
      c.restore();
      if (go > 0) Z.dust(c, t, { x: mx + 90, y: my - 4, n: 6, seed: 61, scale: 1.2 * (1 - go * 0.5), alpha: 0.44 * (1 - go) });
      // 雁南去（循环三）
      Z.geese(c, t, { y: 236, x0: 1900, speed: 158, n: 5, seed: 62, scale: 0.95 });
      c.save(); c.globalAlpha = ss(1.9, 2.3, lt);
      c.font = '40px "LXGWWenKai-500"'; c.fillStyle = 'rgba(90,56,28,.82)'; c.textAlign = 'center';
      c.fillText('十部离散 · 孤骑西去', 1180, 300);
      c.restore();
      Z.seal(c, 1762, 944, '西走', ss(2.2, 2.45, lt), { size: 84, seed: 63 });
    },
  };
})();
