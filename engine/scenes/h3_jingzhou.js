// ③ 荆州归曹：操克荆州，黄忠「仍复故任」——不换与主，换的是一身箭术。
// 主动作：老将立船上张弓，一箭贯穿中军白帆（0.7→2.0s，帆破而船不乱）；母题循环：江水推移、三舟帆影、南岸云起。
SCENES['h3_jingzhou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz3');

  // 一艘帆船（船身＋帆），cx 为船心
  function junk(c, cx, cy, s, t, { sail = 'rgba(250,246,236,.92)', col = 'rgba(30,28,26,.7)' } = {}) {
    c.save(); c.translate(cx, cy); c.scale(s, s);
    c.fillStyle = 'rgba(74,60,42,.5)';
    c.beginPath(); c.moveTo(-150, 0); c.quadraticCurveTo(-90, 40, 40, 40); c.quadraticCurveTo(130, 36, 160, -4); c.closePath(); c.fill();
    brush(c, [[-140, 6], [-70, 44], [40, 46]], { w: 8, tone: 0.7, dry: 0.6, seed: 810, tail: 0.8 });
    brush(c, [[150, 2], [96, -34], [30, -46]], { w: 6, tone: 0.68, dry: 0.6, seed: 811, tail: 0.8 });
    // 双帆：随风鼓满
    c.fillStyle = sail;
    [-40, 30].forEach((ox, i) => {
      const b = Math.sin(t * 1.6 + i) * 8;
      c.beginPath(); c.moveTo(ox, -20);
      c.quadraticCurveTo(ox + 26 + b, -110, ox + 4, -190);
      c.quadraticCurveTo(ox + 74 + b, -120, ox + 60, -18); c.closePath(); c.fill();
      c.strokeStyle = col; c.lineWidth = 2.2; c.stroke();
      brush(c, [[ox, -14], [ox + 3, -186]], { w: 4, tone: 0.6, dry: 0.5, seed: 820 + i });
    });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'hz3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 1980, [{ y0: 430, amp: 180, tone: 0.22, seed: 21.3 }]);
        // 南岸城郭（远处一抹）
        g.save(); g.strokeStyle = 'rgba(46,44,40,.4)'; g.lineWidth = 3;
        g.beginPath(); g.moveTo(1180, 560); g.lineTo(1560, 552); g.lineTo(1592, 520); g.lineTo(1596, 494); g.stroke(); g.restore();
      }, { blur: 3, halo: 16, haloA: 0.28 });
      // 江水（循环一）
      Z.water(c, t, { y0: 640, y1: 1020, tone: 0.3, seed: 9, rows: 8 });
      // 三舟帆影（循环二）：整片缓缓西移，船随浪起伏
      const drift = ((t * 26) % 2600) - 400;
      junk(c, 240 + drift * 0.4, 760, 0.92, t);
      junk(c, 1060 - drift * 0.25, 830, 1.06, t + 1);
      junk(c, 1720 - drift * 0.5, 726, 0.8, t + 2);
      // 中军白帆（主动作的目标）：正中最大的一艘
      const mx = 880, my = 700;
      junk(c, mx, my, 1.35, t, { sail: 'rgba(252,249,242,.95)' });
      // 老将：立船头张弓（白发白须）
      const zx = 690, zy = 690, s = 1.05;
      const draw = ss(0.55, 1.45, lt);
      Z.archer(c, zx, zy, s, t, { draw, beard: 1, cape: 1, flip: 1 });
      // 一箭穿帆
      const pierce = ss(1.25, 1.9, lt);
      if (pierce > 0) {
        const sx = zx - 58 * s, sy = zy - 150 * s, tx = mx + 30, ty = my - 150;
        const p = ease.out(pierce);
        const ax = lerp(sx, tx, p), ay = lerp(sy, ty, p);
        // 飞到即隐（原来停在帆上不动，看着像一条挂着的灰线）
        Z.arrow(c, ax, ay, Math.atan2(ty - sy, tx - sx), 200, clamp(pierce * 3) * (1 - ss(1.9, 2.15, lt)));
        // 帆上那个箭洞：破口＋外扩的墨圈
        const q = ss(1.9, 2.5, lt);
        if (q > 0) {
          c.save(); c.globalAlpha = clamp(q) * 0.85;
          c.strokeStyle = 'rgba(30,28,26,.7)'; c.lineWidth = 2.4;
          c.beginPath(); c.ellipse(tx, ty, 7 + q * 8, 6 + q * 7, 0.4, 0, Math.PI * 2); c.stroke();
          brush(c, [[tx - 10, ty - 6], [tx - 30 - q * 16, ty - 20 - q * 10], [tx - 34 - q * 20, ty + 6]], { w: 4, tone: 0.7, dry: 0.6, seed: 85, tail: 0.8, bristles: 3 });
          c.restore();
        }
      }
      Z.seal(c, 1762, 952, '荆州', ss(1.7, 1.95, lt), { size: 88, seed: 14 });
    },
  };
})();
