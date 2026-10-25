// ② 避难交州：董卓乱，周旋州郡，乃南走交州，间关险远。
// 主动作：孤舟由右入（0→1.8s）→ 许靖立舟中执麈尾望乡；母题：烟瘴、水波、远帆、雾。
SCENES['xuj2_binan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj2', '#e6dcc4');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'xj2_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 2200, [
          { y0: 430, amp: 120, tone: 0.18, seed: 31 },
          { y0: 520, amp: 80, tone: 0.28, seed: 37 },
        ]);
      }, { blur: 4, halo: 18, haloA: 0.3 });
      // 烟瘴雾
      Z.mist(c, t, { y0: 300, y1: 640, n: 5, alpha: 0.55, speed: 42, seed: 21 });
      // 水
      Z.water(c, t, { y0: 760, y1: 1040, tone: 0.4, seed: 9, rows: 8 });
      // 远帆
      const f1 = ss(0, 2.2, lt);
      c.save(); c.globalAlpha = clamp(f1); c.translate(lerp(2200, 1500, f1), 520);
      brush(c, [[0, 0], [0, -60]], { w: 4, tone: 0.7, dry: 0.5, seed: 91 });
      brush(c, [[0, -60], [46, -30], [0, -4]], { w: 3, col: [240, 236, 228], tone: 0.8, dry: 0.4, seed: 92 });
      c.restore();
      // 孤舟：许靖立舟中
      const inb = ease.out(ss(0, 1.8, lt));
      const bx = lerp(1900, 1080, inb), by = 838;
      c.save(); c.globalAlpha = clamp(inb * 1.3);
      c.fillStyle = 'rgba(70,54,38,.7)';
      c.beginPath(); c.moveTo(bx - 130, by); c.quadraticCurveTo(bx, by + 34, bx + 130, by); c.lineTo(bx + 110, by + 18); c.quadraticCurveTo(bx, by + 44, bx - 110, by + 18); c.closePath(); c.fill();
      Z.xujing(c, bx, by - 6, 2.0, { t, raise: ss(0.6, 2.0, lt), whisk: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(0.8, 1.1, lt), { size: 88, seed: 3 });
    },
  };
})();
