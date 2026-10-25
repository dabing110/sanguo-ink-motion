// ⑥ 箕谷敛众：兵败而阵不乱，亲自断后，军资无损。
// 主动作：队伍自左向右缓缓行军（一个个走过），赵云立马崖口断后、凝望来路；母题循环：山雾横流、军旗半卷。
SCENES['z6_jigu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('zl_paper');

  // 步兵剪影（挑担/推车/扛矛三种，循环走动）
  function soldier(c, x, y, s, t, kind) {
    c.save(); c.translate(x, y); c.scale(s, s);
    const step = Math.sin(t * 6);
    brush(c, [[0, 0], [-4 + step * 3, -34], [2, -66], [-2, -96]], { w: 9, tone: 0.62, dry: 0.5, seed: 400, head: 0.08, tail: 0.3 });   // 身
    c.save(); c.translate(-2, -106); c.fillStyle = 'rgba(34,32,30,.75)'; c.beginPath(); c.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(0, 4, 6, 0, Math.PI * 2); c.fill(); c.restore();  // 斗笠＋头
    brush(c, [[-2, -88], [10 + step * 2, -74], [8 + step * 4, -58]], { w: 5, tone: 0.55, dry: 0.6, seed: 401 });   // 挑担杆
    brush(c, [[0, -58], [6 + step * 2, -30], [2 + step * 5, 0]], { w: 5, tone: 0.5, dry: 0.6, seed: 402 });
    brush(c, [[2, -58], [-4 + step * 2, -30], [-1 + step * 4, 0]], { w: 5, tone: 0.5, dry: 0.6, seed: 403 });
    if (kind) brush(c, [[10, -70], [12, -130]], { w: 3.5, tone: 0.6, dry: 0.6, seed: 404 });                        // 扛矛
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'z6_bg', 0.5 + 0.5 * grow, (g) => {
        // 远山：一整条贯穿，不留任何裁切边
        Z.mountains(c, g, -80, 2000, [{ y0: 400, amp: 210, tone: 0.24, seed: 13.1 }]);
        // 近处两坡：笔锋自带收尾，往谷心收笔化开（绝不出现矩形硬边）
        brush(g, [[-80, 620], [260, 470], [600, 378], [900, 452]], { w: 48, tone: 0.34, dry: 0.5, seed: 17.7, tail: 0.86 });
        brush(g, [[2000, 610], [1660, 460], [1320, 370], [1020, 446]], { w: 48, tone: 0.36, dry: 0.5, seed: 23.9, tail: 0.86 });
        brush(g, [[-80, 706], [300, 584], [700, 502], [950, 544]], { w: 26, tone: 0.42, dry: 0.55, seed: 41.2, tail: 0.9 });
        brush(g, [[2000, 696], [1560, 574], [1180, 498], [970, 540]], { w: 26, tone: 0.44, dry: 0.55, seed: 43.5, tail: 0.9 });
      }, { blur: 4, halo: 22, haloA: 0.3 });
      // 山雾（循环一）
      Z.mist(c, t, { y0: 420, y1: 640, n: 4, alpha: 0.66, speed: 42, seed: 8 });
      // 谷底路
      brush(c, [[0, 880], [480, 856], [1000, 872], [1520, 850], [1920, 868]], { w: 12, tone: 0.55, dry: 0.75, seed: 16, reveal: ss(0, 0.35, lt) });
      // 行军纵队（主动作：一列兵卒自左向右缓行）
      const r = rng(52);
      for (let i = 0; i < 11; i++) {
        const spacing = 168 + r() * 52;
        const x = ((lt * 130 + i * spacing + r() * 70) % 2300) - 200;
        const y = 886 + (i % 3) * 22, s = 0.72 + (i % 3) * 0.14;
        soldier(c, x, y, s, t + i * 1.7, i % 2);
      }
      // 军旗半卷（循环二）
      Z.flag(c, 700, 760, 240, t, { seed: 31, col: 'rgba(178,40,34,.7)' });
      // 赵云：崖口断后（右侧高处，立马不动，枪拄地回望）
      const zx = 1580, zy = 852;
      brush(c, [[1440, 872], [1560, 858], [1700, 866]], { w: 14, tone: 0.66, dry: 0.6, seed: 41, reveal: ss(0.1, 0.4, lt) });   // 崖石
      const p = t * 4;
      Z.horse(c, zx, zy, 1.06, p, { gallop: 0, flip: 0 });
      Z.rider(c, zx, zy, 1.06, p, { spearAng: -1.35, spearLen: 330, t, flip: 0, backFlag: 0 });   // 枪几乎拄地
      // 断后回望的一瞥：头微侧（在 rider 里画死，不另做）
      Z.seal(c, 1760, 950, '箕谷', ss(1.8, 2.05, lt), { size: 88, seed: 19 });
    },
  };
})();
