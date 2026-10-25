// ① 常山真定：少年赵云在坡上举枪——「义从军」的起点。
// 主动作：0.2→1.4s 举枪亮相（人从右侧走入、枪由垂到举）；母题循环：云气横移、松枝随风、雁阵掠空。
SCENES['z1_changshan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper();

  // 城郭：常山郡的淡墨轮廓（低矮城墙＋一角楼）
  function town(g) {
    g.save(); g.strokeStyle = 'rgba(46,44,40,.5)'; g.lineWidth = 3; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(180, 520); g.lineTo(560, 512); g.lineTo(600, 480); g.lineTo(604, 452); g.stroke();
    g.beginPath(); g.moveTo(300, 512); g.lineTo(300, 462); g.lineTo(360, 452); g.lineTo(360, 512); g.stroke();   // 城楼
    g.beginPath(); g.moveTo(300, 462); g.lineTo(330, 440); g.lineTo(360, 462); g.stroke();
    for (let i = 0; i < 6; i++) { const x = 190 + i * 62; g.beginPath(); g.moveTo(x, 520); g.lineTo(x, 504); g.lineTo(x + 30, 504); g.lineTo(x + 30, 520); g.stroke(); }
    g.restore();
    // 屋舍两三笔
    brush(g, [[640, 540], [700, 534], [760, 540]], { w: 4, tone: 0.55, dry: 0.5, seed: 21 });
    brush(g, [[660, 538], [668, 512], [712, 506], [720, 538]], { w: 3.5, tone: 0.5, dry: 0.5, seed: 22 });
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);                       // 墨在纸上继续洇
      // 远山＋城郭：湿墨晕染层
      Z.wash(c, 'z1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 60, 1500, [
          { y0: 470, amp: 210, tone: 0.26, seed: 1.3 },
          { y0: 530, amp: 140, tone: 0.4, seed: 3.7 },
        ]);
        town(g);
      }, { blur: 3, halo: 14, haloA: 0.26 });
      // 云气（循环一）
      Z.mist(c, t, { y0: 300, y1: 560, n: 4, alpha: 0.72, speed: 52, seed: 2 });
      // 前景坡地：两笔浓墨
      brush(c, [[0, 760], [420, 726], [900, 748], [1400, 716], [1920, 742]], { w: 16, tone: 0.85, dry: 0.6, seed: 11, head: 0.04, tail: 0.3, reveal: ss(0, 0.35, lt) });
      brush(c, [[120, 812], [560, 790], [1040, 806], [1560, 782], [1900, 800]], { w: 7, tone: 0.5, dry: 0.8, seed: 12, reveal: ss(0.1, 0.45, lt) });
      // 坡草（循环二的小摆）
      const r = rng(77);
      for (let i = 0; i < 26; i++) {
        const x = r() * W, y = 740 + r() * 220, sw = Math.sin(t * 2.2 + i) * 8;
        brush(c, [[x, y], [x + sw * 0.4, y - 26 - r() * 20], [x + sw, y - 46 - r() * 26]], { w: 3, tone: 0.7, dry: 0.6, seed: 100 + i, tail: 0.7, bristles: 3 });
      }
      // 松（循环二）
      Z.pine(c, t, { x: 274, y: 806, s: 1.15, seed: 3 });
      Z.pine(c, t, { x: 1660, y: 786, s: 0.85, seed: 8, tone: 0.7 });
      // 雁阵（循环三）
      Z.geese(c, t, { y: 250, x0: 2000, speed: 150, n: 5, seed: 2, scale: 0.9 });
      // 青年赵云：从右侧走入 → 举枪亮相（近景，压住画面）
      const walkIn = ease.out(ss(0, 1.05, lt));
      const x = lerp(1480, 780, walkIn);
      const raise = ss(0.45, 1.5, lt);
      Z.hero(c, x, 880, 2.15, t, { raise, spearLen: 400, spearAng: -0.95, cape: 1 });
      // 亮相那一瞬：脚下起一阵尘
      if (lt > 1.3) Z.dust(c, t, { x: x - 60, y: 880, n: 3, seed: 5, alpha: 0.22 * ss(1.3, 1.6, lt) * (1 - ss(2.2, 3.0, lt)), scale: 1.2 });
      // 钤印：「常山」
      Z.seal(c, 1762, 952, '常山', ss(0.9, 1.15, lt), { size: 92, seed: 3 });
    },
  };
})();
