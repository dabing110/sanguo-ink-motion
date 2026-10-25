// ④ 濮阳先登：太祖讨吕布于濮阳，韦将应募者数十人，皆重衣两铠，弃楯，但持长矛撩戟。
//   韦手持十余戟，大呼起，所抵无不应手倒者。
// 主动作：典韦冲入敌阵（0.2→1.2s）→ 连掷短戟，敌骑应手而倒（1.2→2.2s / 2.2→2.9s）；母题循环：阵前旌旗、扬尘、乱云。
SCENES['w4_puyang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw4', '#ece5ca');

  // 敌兵：被短戟掷中后仰倒
  function foe(c, x, y, s, hit, t, seed) {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.rotate(ease.in(clamp(hit)) * 1.05);
    c.globalAlpha = 1 - clamp(hit) * 0.4;
    brush(c, [[0, 0], [-6, -60], [-4, -104]], { w: 20, tone: 0.72, dry: 0.5, seed: seed, head: 0.08, tail: 0.22 });
    brush(c, [[-4, -104], [-24, -128], [-44, -124]], { w: 13, tone: 0.68, dry: 0.5, seed: seed + 1 });
    c.fillStyle = 'rgba(40,36,30,.85)'; c.beginPath(); c.arc(-52, -132, 13, 0, Math.PI * 2); c.fill();
    brush(c, [[-6, -96], [10, -70], [26, -56]], { w: 11, tone: 0.6, dry: 0.5, seed: seed + 2, tail: 0.3 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      Z.wash(c, 'dw4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2000, [
          { y0: 470, amp: 148, tone: 0.22, seed: 71.3 },
          { y0: 566, amp: 92, tone: 0.32, seed: 76.8 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.22 });
      // 敌阵旗（循环一）
      Z.flag(c, 1560, 850, 250, t, { seed: 31, col: 'rgba(96,74,96,.85)' });
      Z.flag(c, 1760, 846, 210, t, { seed: 32, col: 'rgba(96,74,96,.78)' });
      Z.flag(c, 300, 852, 220, t, { seed: 33, col: 'rgba(178,44,36,.82)', text: '曹' });
      // 地面
      brush(c, [[0, 856], [640, 840], [1300, 858], [1920, 838]], { w: 16, tone: 0.84, dry: 0.74, seed: 101, head: 0.04, tail: 0.3, reveal: ss(0, 0.32, lt) });
      // 敌兵三：先后被掷倒
      const h1 = ss(1.25, 2.05, lt), h2 = ss(2.15, 2.9, lt);
      foe(c, 1380, 872, 1.5, h1, t, 410);
      foe(c, 1660, 858, 1.35, h2, t, 420);
      if (h1 > 0) Z.dust(c, t, { x: 1380, y: 886, n: 5, seed: 111, scale: 1.2, alpha: 0.44 * (1 - h1) });
      if (h2 > 0) Z.dust(c, t, { x: 1660, y: 872, n: 5, seed: 112, scale: 1.1, alpha: 0.44 * (1 - h2) });
      // 主动作：典韦冲入（步战，不用马）
      const rush = ease.out(ss(0.2, 1.2, lt));
      const wx = lerp(160, 880, rush), wy = 884;
      Z.dianWei(c, wx, wy, 2.35, {
        t, jiAng: lerp(-0.55, -0.1, ease.out(ss(1.0, 1.4, lt))),
        raise: ss(1.05, 1.5, lt), stance: t * 8, flip: 0, cape: 0,
      });
      // 短戟连掷（主动作二：两支飞出的短戟）
      const f1 = ss(1.2, 1.7, lt), f2 = ss(2.1, 2.6, lt);
      if (f1 > 0) {
        const px = lerp(wx + 190, 1360, ease.out(f1)), py = lerp(wy - 300, 800, ease.inOut(f1));
        Z.jiShort(c, px, py, 0.4 + f1 * 1.1, 120, clamp(f1 * 2.6) * (1 - ss(1.9, 2.1, lt)));
      }
      if (f2 > 0) {
        const px = lerp(wx + 190, 1640, ease.out(f2)), py = lerp(wy - 300, 786, ease.inOut(f2));
        Z.jiShort(c, px, py, 0.3 + f2 * 1.2, 120, clamp(f2 * 2.6) * (1 - ss(2.8, 3.0, lt)));
      }
      // 阵前扬尘（循环二）
      Z.dust(c, t, { x: 900, y: 890, n: 7, seed: 113, scale: 1.5, alpha: 0.42 });
      // 大呼：一声吼的气浪（白痕）
      const shout = ss(0.95, 1.35, lt) * (1 - ss(1.35, 1.75, lt));
      if (shout > 0) {
        c.save(); c.globalAlpha = shout * 0.5; c.strokeStyle = 'rgba(255,252,246,.9)'; c.lineWidth = 6;
        for (let i = 0; i < 3; i++) {
          const r = 180 + i * 90 + shout * 120;
          c.beginPath(); c.arc(wx + 60, wy - 380, r, -0.9, 0.9); c.stroke();
        }
        c.restore();
      }
      Z.seal(c, 240, 946, '先登', ss(1.6, 1.9, lt), { size: 88, seed: 54 });
    },
  };
})();
