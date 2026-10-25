// ① 陈留己吾：典韦，陈留己吾人，形貌魁梧，膂力过人。尝为刘氏报仇，追者莫敢近。
// 主动作：壮士自左步入市口（0.2→1.4s）→ 提戟一站，众人退避（1.2→2.4s）；母题循环：市井檐旗、扬尘、柳。
SCENES['w1_jiwu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw1', '#efe6d0');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      // 市井：一排屋舍 + 街口
      Z.wash(c, 'dw1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 130, tone: 0.18, seed: 21.4 },
          { y0: 552, amp: 84, tone: 0.26, seed: 25.8 },
        ]);
        g.save(); g.strokeStyle = 'rgba(46,44,40,.5)'; g.lineWidth = 3; g.lineJoin = 'round';
        // 三间铺面
        [[140, 520], [430, 516], [1560, 518]].forEach(([bx, by], k) => {
          g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + 190, by - 4); g.lineTo(bx + 196, by - 60); g.lineTo(bx + 6, by - 56); g.closePath(); g.stroke();
          g.beginPath(); g.moveTo(bx - 16, by - 58); g.lineTo(bx + 100, by - 96); g.lineTo(bx + 214, by - 60); g.stroke();   // 檐
        });
        g.restore();
      }, { blur: 3, halo: 14, haloA: 0.22 });
      // 市井云气（循环：保证全段没有"死帧"）
      Z.mist(c, t, { y0: 240, y1: 560, n: 4, alpha: 0.5, speed: 42, seed: 37 });
      // 檐旗（循环一：铺面前的招子）
      Z.flag(c, 260, 460, 150, t, { seed: 11, col: 'rgba(176,52,40,.8)' });
      Z.flag(c, 1680, 462, 140, t, { seed: 12, col: 'rgba(96,90,72,.8)' });
      // 柳（循环二：垂枝随风）
      Z.pine(c, t, { x: 1180, y: 640, s: 0.9, seed: 9, tone: 0.7 });
      c.save(); c.globalAlpha = 0.8;
      for (let i = 0; i < 6; i++) {
        const x = 1130 + i * 22, sw = Math.sin(t * 1.9 + i) * 14;
        brush(c, [[x, 596], [x + sw * 0.5, 660], [x + sw, 730]], { w: 3, tone: 0.6, dry: 0.7, seed: 300 + i, tail: 0.8, bristles: 3 });
      }
      c.restore();
      // 街面
      brush(c, [[0, 800], [520, 782], [1080, 798], [1560, 776], [1920, 792]], { w: 18, tone: 0.86, dry: 0.72, seed: 31, head: 0.04, tail: 0.3, reveal: ss(0, 0.35, lt) });
      brush(c, [[120, 872], [640, 854], [1180, 870], [1700, 848]], { w: 8, tone: 0.5, dry: 0.85, seed: 32, reveal: ss(0.1, 0.45, lt) });
      // 退避的众人（主动作的陪衬：四个背影，随典韦走近而一路退到收幕）
      const walk = ss(0.2, 1.4, lt);                       // 匀速入镜（ease.out 会提前饱和，尾段变死帧）
      const dx = lerp(160, 880, ease.out(walk)) - ss(2.05, 2.95, lt) * 16;
      const back = ss(1.0, 2.9, lt);
      [0, 1, 2].forEach((k) => {
        const bx = 1240 + k * 130 - back * (150 + k * 46);
        c.save(); c.globalAlpha = 0.75;
        brush(c, [[bx, 878], [bx + 4, 826], [bx + 2, 790]], { w: 14, tone: 0.62, dry: 0.5, seed: 340 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(60,54,46,.8)'; c.beginPath(); c.arc(bx + 2, 778, 12, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      // 一个跑掉的（尾段还有动作在走）
      const run = ss(2.1, 2.95, lt);
      if (run > 0) {
        const rx = lerp(1250, 1900, ease.in(run));
        c.save(); c.globalAlpha = 0.7 * (1 - ss(2.8, 2.98, lt));
        brush(c, [[rx, 880], [rx - 8, 828], [rx - 4, 792]], { w: 13, tone: 0.6, dry: 0.5, seed: 348, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(60,54,46,.8)'; c.beginPath(); c.arc(rx - 4, 780, 11, 0, Math.PI * 2); c.fill();
        c.restore();
      }
      // 主动作：壮士步入 → 站定提双戟 → 换肩（尾段第二拍，避免定格）
      const swap = ss(2.05, 2.95, lt);
      Z.dianWei(c, dx, 900, 2.3, {
        t, jiAng: lerp(-0.7, -0.42, walk) + swap * 0.22,
        raise: ss(1.3, 2.1, lt) * (1 - swap * 0.45),
        stance: t * 1.5, flip: 0, cape: 0,
      });
      Z.dust(c, t, { x: dx - 100, y: 900, n: 5, seed: 41, scale: 1.1, alpha: 0.32 * (1 - walk) + 0.12 });
      Z.seal(c, 1762, 946, '己吾', ss(1.6, 1.85, lt), { size: 88, seed: 51 });
    },
  };
})();
