// ① 东莱奏曹：太史慈字子义，东莱黄人也。为郡奏曹史，州章为郡守所讼，慈以计坏其章，郡守得免。
// 主动作：慈自左入（0.2→1.5s）→ 袖中取州章（1.2→2.3s）→ 坏章（2.2→2.95s）；
// 母题循环：府衙檐旗、云海、浮尘。
SCENES['t1_donglai'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc1', '#efe7d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'tc1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 460, amp: 132, tone: 0.18, seed: 51.2 }]);
        g.save(); g.strokeStyle = 'rgba(46,44,40,.5)'; g.lineWidth = 3; g.lineJoin = 'round';
        [[1180, 520], [1560, 516]].forEach(([bx, by]) => {                       // 府衙两进
          g.beginPath(); g.moveTo(bx, by); g.lineTo(bx + 200, by - 4); g.lineTo(bx + 206, by - 62); g.lineTo(bx + 6, by - 58); g.closePath(); g.stroke();
          g.beginPath(); g.moveTo(bx - 18, by - 60); g.lineTo(bx + 100, by - 104); g.lineTo(bx + 224, by - 62); g.stroke();
        });
        g.restore();
      }, { blur: 3, halo: 14, haloA: 0.22 });
      Z.mist(c, t, { y0: 250, y1: 580, n: 4, alpha: 0.5, speed: 44, seed: 31 });
      Z.yunHai(c, t, { y: 830, h: 110, n: 5, speed: 84, alpha: 0.5 });
      Z.flag(c, 1300, 452, 150, t, { seed: 11, col: 'rgba(176,52,40,.8)' });
      Z.flag(c, 1740, 456, 130, t, { seed: 12, col: 'rgba(96,90,72,.8)' });
      brush(c, [[0, 894], [620, 880], [1260, 896], [1920, 878]], { w: 15, tone: 0.84, dry: 0.74, seed: 41, head: 0.04, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：慈自左入
      const walk = ss(0.2, 1.5, lt);                       // 440px / 1.3s ≈ 338px/s（≤400px/s）
      const tx = lerp(400, 840, walk);
      const get = ss(1.2, 2.3, lt);                        // 袖中取州章
      const tear = ss(2.2, 2.95, lt);                      // 坏章
      Z.taiShiCi(c, tx, 926, 2.25, {
        t, jiAng: lerp(-0.66, -0.42, walk) + get * 0.2 + tear * 0.12, raise: get * 0.45 + tear * 0.12,
        stance: t * 1.5, flip: 0, bow: 0, helm: 1,
      });
      // 州章：一卷，取出 → 裂为两半（裂开过程两半缓缓分离，填平 2.4–2.75s 的运动谷）
      if (get > 0) {
        const bx = tx + 130, by = 926 - 380;
        const sep = tear * 14;
        c.save(); c.globalAlpha = clamp(get * 2.2) * (1 - tear * 0.5);
        c.save(); c.beginPath(); c.rect(bx - 20, by - 10, 48 + sep, 64); c.clip();          // 左半
        c.fillStyle = 'rgba(246,238,214,.95)'; c.fillRect(bx - sep, by, 96, 44);
        c.strokeStyle = 'rgba(52,44,34,.88)'; c.lineWidth = 2.4; c.strokeRect(bx - sep, by, 96, 44);
        brush(c, [[bx + 2, by + 14], [bx + 44, by + 12]], { w: 3, tone: 0.5, dry: 0.5, seed: 61 });
        brush(c, [[bx + 2, by + 28], [bx + 38, by + 26]], { w: 3, tone: 0.5, dry: 0.5, seed: 62 });
        c.restore();
        c.save(); c.beginPath(); c.rect(bx + 68 - sep, by - 10, 52, 64); c.clip();          // 右半
        c.fillStyle = 'rgba(246,238,214,.95)'; c.fillRect(bx + sep, by, 96, 44);
        c.strokeStyle = 'rgba(52,44,34,.88)'; c.lineWidth = 2.4; c.strokeRect(bx + sep, by, 96, 44);
        brush(c, [[bx + 62, by + 14], [bx + 86, by + 12]], { w: 3, tone: 0.5, dry: 0.5, seed: 63 });
        brush(c, [[bx + 62, by + 28], [bx + 80, by + 26]], { w: 3, tone: 0.5, dry: 0.5, seed: 64 });
        c.restore();
        c.restore();
        // 裂口：一道墨痕把章劈开（渐进画出）
        if (tear > 0) {
          c.save(); c.strokeStyle = 'rgba(40,32,26,.9)'; c.lineWidth = 4;
          brush(c, [[bx + 48, by - 8], [bx + 50, by + 22], [bx + 52, by + 52]], { w: 4, tone: 0.1, dry: 0.45, seed: 65, reveal: tear, tail: 0.4 });
          c.restore();
        }
      }
      Z.dust(c, t, { x: tx - 120, y: 920, n: 6, seed: 51, scale: 1.3, alpha: 0.32 * (1 - walk) + 0.1 });
      Z.seal(c, 240, 946, '东莱', ss(2.2, 2.5, lt), { size: 88, seed: 61 });
    },
  };
})();
