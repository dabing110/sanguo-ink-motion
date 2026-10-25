// ⑥ 策照镜中，见吉索命：镜中于吉立影，孙策惊怖。
SCENES['yj6_jingzhong'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy6', '#dcd8c6');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'uy6_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1960, [{ y0: 700, amp: 120, tone: 0.18, seed: 27 }, { y0: 820, amp: 90, tone: 0.26, seed: 29 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      brush(c, [[0, 908], [640, 902], [1280, 912], [1920, 902]], { w: 13, tone: 0.74, dry: 0.76, seed: 313, head: .03, tail: .3 });
      Z.mist(c, t, { y0: 300, y1: 700, n: 4, alpha: 0.42, speed: 40, seed: 402 });
      Z.inkCloud(c, t, { y: 880, h: 24, n: 3, speed: 48, span: 1500, seed: 9, a: .12 });
      Z.inkSmoke(c, 960, 500, t, { seed: 18, a: 0.24 });

      // 镜（右，椭圆铜镜，孙策执于前）
      const mx = 1320, my = 640;
      c.save();
      c.strokeStyle = 'rgba(120,100,60,.9)'; c.lineWidth = 10;
      c.beginPath(); c.ellipse(mx, my, 200, 260, 0, 0, Math.PI * 2); c.stroke();
      c.save(); c.globalAlpha = .5;
      const mg = c.createRadialGradient(mx, my, 20, mx, my, 240);
      mg.addColorStop(0, 'rgba(220,224,228,.6)'); mg.addColorStop(1, 'rgba(200,206,210,.2)');
      c.fillStyle = mg; c.beginPath(); c.ellipse(mx, my, 192, 252, 0, 0, Math.PI * 2); c.fill();
      c.restore();
      // 镜中于吉立影（淡）
      const gf = 0.5 + 0.3 * Math.sin(t * 2);
      c.save(); c.globalAlpha = .55 * gf;
      Z.yuji(c, mx, my + 120, 1.7, { t, fade: 1, raise: 0.6, staff: 1, talisman: 1 });
      c.restore();
      c.restore();

      // 孙策（左前，惊怖微颤）
      const shake = Math.sin(t * 9) * 4 * ss(1.2, 3.0, lt);
      Z.leader(c, 560, 950 + shake, 2.6, t, { flip: 1, cape: 1, bow: 0.1 + 0.06 * Math.sin(t * 8) });

      // 镜前青气缭绕
      Z.qingQi(c, mx, my - 40, 200, t, .4, { w: 18, seed: 5 });
      Z.magicRing(c, mx, my, 170, t, { a: .2, spin: .4 });

      Z.curtain(c, 96, 150, t, { seed: 61, a: .2, col: '60,52,42' });
      Z.curtain(c, 1824, 150, t, { seed: 62, a: .2, col: '60,52,42' });

      Z.bigText(c, '见吉索命', { x: 700, y: 210, size: 64, gap: 14, appear: ss(0.5, 1.3, lt), col: 'rgba(40,96,96,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
    },
  };
})();
