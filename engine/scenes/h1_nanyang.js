// ① 南阳汉升：荆州牧刘表以为中郎将——一张硬弓的起点。
// 主动作：青年黄忠自右走入 → 站定弯弓（0.9→1.7s）→ 一箭穿雁（1.5→2.1s）；母题循环：云气横移、雁阵掠空、坡草随风。
SCENES['h1_nanyang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz1');

  // 南阳村落：两三笔屋舍＋一头耕牛的淡影
  function village(g) {
    g.save(); g.strokeStyle = 'rgba(46,44,40,.45)'; g.lineWidth = 3; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(180, 512); g.lineTo(520, 505); g.lineTo(556, 476); g.lineTo(560, 450); g.stroke();
    g.beginPath(); g.moveTo(286, 505); g.lineTo(286, 458); g.lineTo(342, 448); g.lineTo(342, 505); g.stroke();
    g.beginPath(); g.moveTo(286, 458); g.lineTo(314, 438); g.lineTo(342, 458); g.stroke();
    for (let i = 0; i < 5; i++) { const x = 190 + i * 76; g.beginPath(); g.moveTo(x, 512); g.lineTo(x, 497); g.lineTo(x + 28, 497); g.lineTo(x + 28, 512); g.stroke(); }
    g.restore();
    brush(g, [[700, 528], [760, 522], [820, 528]], { w: 4, tone: 0.5, dry: 0.5, seed: 26 });
    brush(g, [[744, 520], [752, 496], [796, 490], [804, 520]], { w: 3.5, tone: 0.46, dry: 0.5, seed: 27 });
    brush(g, [[980, 540], [1040, 546], [1076, 540]], { w: 5, tone: 0.42, dry: 0.7, seed: 28 });   // 牛背一弧
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'hz1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 40, 1500, [
          { y0: 462, amp: 200, tone: 0.24, seed: 1.9 },
          { y0: 522, amp: 132, tone: 0.38, seed: 3.1 },
        ]);
        village(g);
      }, { blur: 3, halo: 14, haloA: 0.26 });
      // 云气（循环一）
      Z.mist(c, t, { y0: 280, y1: 540, n: 4, alpha: 0.7, speed: 50, seed: 2 });
      // 前景坡地：两笔浓墨
      brush(c, [[0, 752], [420, 720], [900, 742], [1400, 710], [1920, 736]], { w: 16, tone: 0.85, dry: 0.6, seed: 11, head: 0.04, tail: 0.3, reveal: ss(0, 0.35, lt) });
      brush(c, [[120, 806], [560, 784], [1040, 800], [1560, 776], [1900, 794]], { w: 7, tone: 0.5, dry: 0.8, seed: 12, reveal: ss(0.1, 0.45, lt) });
      // 坡草（循环二的小摆）
      const r = rng(77);
      for (let i = 0; i < 26; i++) {
        const x = r() * W, y = 734 + r() * 220, sw = Math.sin(t * 2.2 + i) * 8;
        brush(c, [[x, y], [x + sw * 0.4, y - 26 - r() * 20], [x + sw, y - 46 - r() * 26]], { w: 3, tone: 0.7, dry: 0.6, seed: 100 + i, tail: 0.7, bristles: 3 });
      }
      // 雁阵（循环三）
      Z.geese(c, t, { y: 250, x0: 2000, speed: 150, n: 5, seed: 2, scale: 0.9 });
      // 青年黄忠：自右走入 → 站定弯弓
      const walkIn = ease.out(ss(0, 1.05, lt));
      const x = lerp(1470, 780, walkIn), s = 2.15;
      const draw = ss(0.95, 1.7, lt);                                    // 0→1 拉满弦
      Z.archer(c, x, 880, s, t, { draw, beard: 0, cape: 1, flip: 0, old: 0 });
      // 那一箭：起点必须就是弓口（x+52s, y-96s），不然箭凭空长在半空
      const fly = ss(1.5, 2.05, lt);
      if (fly > 0) {
        const sx = x + 52 * s, sy = 880 - 96 * s;
        const ax = lerp(sx, 1462, ease.out(fly)), ay = lerp(sy, 318, ease.inOut(fly));
        Z.arrow(c, ax, ay, Math.atan2(318 - sy, 1462 - sx), 210, clamp(fly * 3) * (1 - ss(2.3, 2.6, lt)));
      }
      // 被射落的那一雁：坠（母题三的收口）
      const hit = ss(2.05, 2.6, lt);
      if (hit > 0) {
        const gy = 318 + hit * hit * 150, gx = 1462 + hit * 66;
        const w = Math.sin(t * 9) * 0.5;
        brush(c, [[gx - 12, gy], [gx + 10, gy - 7], [gx + 30, gy + 2]], { w: 5, tone: 0.86, dry: 0.6, seed: 88, tail: 0.8, bristles: 3 });
        brush(c, [[gx, gy - 3], [gx + Math.cos(w) * 12, gy - 14 - hit * 8], [gx + Math.cos(w) * 24, gy - 2]], { w: 4, tone: 0.8, dry: 0.6, seed: 89, tail: 0.8, bristles: 3 });
      }
      Z.seal(c, 1762, 952, '南阳', ss(0.9, 1.15, lt), { size: 88, seed: 3 });
    },
  };
})();
