// ③ 渭南突击：曹公渡渭，马超将步骑万余突击，曹军溃。
// 主动作：马超自左冲入（0.2→1.3s）→ 枪挑二骑（1.3→2.2s / 2.2→3.0s）；母题循环：渭水东流、阵前扬尘、残旗。
SCENES['m3_weinan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc3', '#ece3ca');

  // 敌骑：被挑中后连人带马翻倒
  function foe(c, x, y, s, ph, hit, t) {
    c.save(); c.translate(x, y); c.scale(-s, s);
    c.rotate(ease.in(clamp(hit)) * 0.9);                 // 侧翻
    c.globalAlpha = 1 - clamp(hit) * 0.45;
    Z.horse(c, 0, 0, 1, ph, { gallop: 1, tone: 0.72 });
    Z.rider(c, 0, 0, 1, ph, { cape: 0, backFlag: 0, spearAng: 0.5 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      Z.wash(c, 'mc3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2000, [
          { y0: 470, amp: 150, tone: 0.22, seed: 61.3 },
          { y0: 566, amp: 96, tone: 0.32, seed: 66.8 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.22 });
      // 渭水（循环一：横贯画面下半，东流）
      Z.water(c, t, { y0: 690, y1: 900, tone: 0.3, seed: 9, rows: 6 });
      // 对岸曹营旗（循环二）
      Z.flag(c, 1720, 660, 210, t, { seed: 21, col: 'rgba(60,74,96,.85)' });
      Z.flag(c, 1840, 664, 180, t, { seed: 22, col: 'rgba(60,74,96,.78)' });
      // 岸线
      brush(c, [[0, 660], [520, 648], [1120, 662], [1920, 644]], { w: 9, tone: 0.5, dry: 0.8, seed: 71, reveal: ss(0, 0.3, lt) });
      brush(c, [[0, 930], [620, 912], [1300, 928], [1920, 908]], { w: 16, tone: 0.84, dry: 0.72, seed: 72, head: 0.04, tail: 0.3, reveal: ss(0, 0.35, lt) });
      // 敌骑二：先后被挑
      const hit1 = ss(1.35, 2.15, lt), hit2 = ss(2.20, 3.00, lt);
      foe(c, 1180, 856, 1.35, t * 7 + 1.1, hit1, t);
      foe(c, 1560, 838, 1.22, t * 7 + 2.4, hit2, t);
      if (hit1 > 0) Z.dust(c, t, { x: 1180, y: 880, n: 6, seed: 31, scale: 1.4, alpha: 0.5 * (1 - hit1) });
      if (hit2 > 0) Z.dust(c, t, { x: 1560, y: 862, n: 6, seed: 32, scale: 1.3, alpha: 0.5 * (1 - hit2) });
      // 主动作：马超自左冲入
      const rush = ease.out(ss(0.2, 1.3, lt));
      const mx = lerp(180, 900, rush), my = 880;
      const ms = 2.0;
      const ph = t * 11;
      Z.horse(c, mx, my, ms, ph, { gallop: 1, flip: 0, tone: 0.94 });
      Z.mChao(c, mx, my, ms, ph, { flip: 0, spearAng: lerp(-0.55, -0.04, ease.out(ss(1.1, 1.5, lt))), cape: 1 });
      // 冲阵扬尘（循环三）
      Z.dust(c, t, { x: mx - 120, y: my - 6, n: 7, seed: 33, scale: 1.5, alpha: 0.46 });
      // 枪挑的残影：一记白痕
      const slash = ss(1.32, 1.62, lt) * (1 - ss(1.62, 1.9, lt));
      if (slash > 0) {
        c.save(); c.globalAlpha = slash * 0.8; c.strokeStyle = 'rgba(255,252,246,.9)'; c.lineWidth = 7 * ms;
        c.beginPath(); c.moveTo(mx + 150, my - 210); c.quadraticCurveTo(1060, 700, 1150, 800); c.stroke(); c.restore();
      }
      const slash2 = ss(2.18, 2.46, lt) * (1 - ss(2.46, 2.72, lt));
      if (slash2 > 0) {
        c.save(); c.globalAlpha = slash2 * 0.8; c.strokeStyle = 'rgba(255,252,246,.9)'; c.lineWidth = 6 * ms;
        c.beginPath(); c.moveTo(mx + 150, my - 205); c.quadraticCurveTo(1320, 700, 1530, 790); c.stroke(); c.restore();
      }
      Z.seal(c, 240, 946, '突击', ss(1.5, 1.75, lt), { size: 88, seed: 23 });
    },
  };
})();
