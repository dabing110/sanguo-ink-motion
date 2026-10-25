// ③ 猿臂善射：慈长七尺七寸，美须髯，猿臂善射，弦不虚发。
// 主动作：立定张弓（0.2→1.2s）→ 连射三矢（1.0→2.3s）→ 敌应弦而倒（2.2→3.3s）；
// 母题循环：云海、尘土、靶旗。
SCENES['t3_yuanbi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc3', '#ece5cc');

  // 靶（敌骑）：中箭后仰倒
  function target(c, x, y, s, hit, t, seed) {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.rotate(ease.in(clamp(hit)) * 1.05);
    c.globalAlpha = 1 - clamp(hit) * 0.4;
    brush(c, [[0, 0], [-6, -56], [-4, -98]], { w: 18, tone: 0.72, dry: 0.52, seed: seed, head: 0.08, tail: 0.22 });
    brush(c, [[-4, -98], [-22, -122], [-42, -118]], { w: 12, tone: 0.68, dry: 0.52, seed: seed + 1 });
    c.fillStyle = 'rgba(42,38,32,.86)'; c.beginPath(); c.arc(-50, -126, 12, 0, Math.PI * 2); c.fill();
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.0, lt);
      Z.wash(c, 'tc3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 118, tone: 0.2, seed: 63.1 }]);
      }, { blur: 3, halo: 14, haloA: 0.22 });
      Z.mist(c, t, { y0: 260, y1: 590, n: 4, alpha: 0.5, speed: 44, seed: 33 });
      Z.yunHai(c, t, { y: 820, h: 110, n: 5, speed: 88, alpha: 0.55 });
      Z.flag(c, 1560, 838, 230, t, { seed: 14, col: 'rgba(96,74,96,.82)' });
      brush(c, [[0, 896], [640, 884], [1280, 898], [1920, 880]], { w: 14, tone: 0.82, dry: 0.76, seed: 43, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：立定张弓（draw 0→1）
      const pull = ss(0.3, 1.25, lt);
      // 主动作二：连射三矢（prog 0→1，箭矢匀速飞出）
      const shoot = ss(1.0, 2.3, lt);
      const release = ss(1.0, 1.45, lt);                 // 撒放：弓弦回弹
      Z.taiShiCi(c, 700, 926, 2.3, {
        t, jiAng: -0.5, raise: 0, stance: t * 1.5, flip: 0, bow: 1, draw: pull * (1 - release * 0.85), helm: 1,
      });
      Z.jianYu(c, 700 - 190, 926 - 330, shoot, { n: 3, ang: -0.28, len: 175, spread: 54 });
      // 三敌：应弦而倒
      const h1 = ss(1.35, 2.15, lt), h2 = ss(1.75, 2.5, lt), h3 = ss(2.1, 2.9, lt);
      target(c, 1480, 892, 1.5, h1, t, 410);
      target(c, 1660, 884, 1.35, h2, t, 420);
      target(c, 1800, 878, 1.22, h3, t, 430);
      if (h1 > 0) Z.dust(c, t, { x: 1460, y: 902, n: 5, seed: 111, scale: 1.2, alpha: 0.36 * (1 - h1) });
      // 尾段第二拍：收弓（弓归背，人整衣）
      const rest = ss(2.7, 3.3, lt);
      if (rest > 0) {
        c.save(); c.globalAlpha = rest * 0.4; c.strokeStyle = 'rgba(255,252,246,.9)'; c.lineWidth = 4;
        const r = 150 + rest * 70;
        c.beginPath(); c.arc(700 + 120, 926 - 340, r, -0.6, 0.6); c.stroke();
        c.restore();
      }
      Z.dust(c, t, { x: 900, y: 918, n: 7, seed: 53, scale: 1.5, alpha: 0.34 });
      Z.bigText(c, '弦不虚发', { x: 1010, y: 300, size: 84, gap: 18, appear: ss(2.3, 3.1, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '猿臂', ss(2.6, 2.9, lt), { size: 88, seed: 63 });
    },
  };
})();
