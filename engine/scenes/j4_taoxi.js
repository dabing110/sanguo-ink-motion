// ④ 洮西大捷：延熙十八年，维与魏雍州刺史王经战于洮西，大破之，经众死者数万人。
// 主动作：两军相接（0.15→0.9s）→ 姜维挥枪、敌阵应手而倒（0.8→1.9s / 1.9→2.5s）→ 敌溃（2.4→2.9s）；
// 母题循环：洮水、敌阵旗、扬尘。
SCENES['j4_taoxi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw4', '#ece5ca');

  // 魏兵：被枪扫中后仰倒
  function foe(c, x, y, s, hit, t, seed) {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.rotate(ease.in(clamp(hit)) * 1.1);
    c.globalAlpha = 1 - clamp(hit) * 0.42;
    brush(c, [[0, 0], [-6, -58], [-4, -102]], { w: 20, tone: 0.74, dry: 0.5, seed: seed, head: 0.08, tail: 0.22 });
    brush(c, [[-4, -102], [-24, -126], [-44, -122]], { w: 13, tone: 0.7, dry: 0.5, seed: seed + 1 });
    c.fillStyle = 'rgba(40,36,30,.86)'; c.beginPath(); c.arc(-52, -130, 13, 0, Math.PI * 2); c.fill();
    brush(c, [[-6, -94], [12, -68], [30, -54]], { w: 11, tone: 0.6, dry: 0.5, seed: seed + 2, tail: 0.3 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'jw4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 230, tone: 0.2, seed: 34 });
      }, { blur: 3, halo: 13, haloA: 0.2 });
      // 洮水（循环一：横贯的水纹）
      Z.water(c, t, { y0: 800, y1: 1000, tone: 0.3, seed: 7, rows: 5 });
      // 云气（循环二）
      Z.mist(c, t, { y0: 250, y1: 560, n: 3, alpha: 0.48, speed: 40, seed: 34 });
      // 敌阵旗（循环三）
      Z.flag(c, 1500, 856, 240, t, { seed: 21, col: 'rgba(96,74,96,.84)' });
      Z.flag(c, 1760, 852, 200, t, { seed: 22, col: 'rgba(96,74,96,.78)' });
      Z.flag(c, 300, 858, 210, t, { seed: 23, col: 'rgba(178,44,36,.82)', text: '汉' });
      brush(c, [[0, 872], [640, 860], [1300, 874], [1920, 856]], { w: 15, tone: 0.84, dry: 0.74, seed: 44, head: 0.04, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：两军相接（敌自右逼近）
      const come = ss(0.15, 0.95, lt);
      const h1 = ss(0.9, 1.75, lt), h2 = ss(1.8, 2.55, lt);
      foe(c, lerp(1760, 1370, come), 884, 1.5, h1, t, 510);
      foe(c, lerp(1900, 1650, come), 876, 1.35, h2, t, 520);
      if (h1 > 0) Z.dust(c, t, { x: 1330, y: 894, n: 5, seed: 111, scale: 1.2, alpha: 0.38 * (1 - h1) });
      if (h2 > 0) Z.dust(c, t, { x: 1610, y: 886, n: 5, seed: 112, scale: 1.1, alpha: 0.38 * (1 - h2) });

      // 主动作二：姜维挥枪（两次横扫）
      const sw1 = ss(0.7, 1.5, lt) * (1 - ss(1.5, 1.95, lt));
      const sw2 = ss(1.7, 2.45, lt);
      const swing = -0.5 + sw1 * 1.0 - sw2 * 1.3;
      Z.jiangWei(c, 820, 906, 2.35, {
        t, jiAng: swing, raise: 0.18 + sw2 * 0.3, stance: t * 1.9, flip: 0, robe: 0, scroll: 0,
      });
      // 枪风（白痕）
      [[sw1, 1], [sw2, 1]].forEach(([q], k) => {
        if (q <= 0) return;
        c.save(); c.globalAlpha = q * 0.42; c.strokeStyle = 'rgba(255,252,246,.92)'; c.lineWidth = 6; c.lineCap = 'round';
        const r = 280 + q * 100;
        c.beginPath(); c.arc(820 + 150 + k * 60, 906 - 350, r, -0.85, 0.7); c.stroke();
        c.restore();
      });
      // 扬尘（循环四）
      Z.dust(c, t, { x: 960, y: 904, n: 8, seed: 113, scale: 1.7, alpha: 0.42 });
      // 敌溃（尾段第二拍：残兵向右退去）
      const rout = ss(2.4, 2.95, lt);
      if (rout > 0) {
        c.save(); c.globalAlpha = 0.55 * rout;
        [0, 1].forEach((k) => {
          const rx = lerp(1620 + k * 90, 1900 + k * 90, rout);
          brush(c, [[rx, 878], [rx - 8, 826], [rx - 4, 792]], { w: 13, tone: 0.6, dry: 0.55, seed: 530 + k, head: 0.08, tail: 0.24 });
          c.fillStyle = 'rgba(50,44,38,.8)'; c.beginPath(); c.arc(rx - 4, 782, 11, 0, Math.PI * 2); c.fill();
        });
        c.restore();
      }
      // 大字：斩首万计
      Z.bigText(c, '斩首万计', { x: 1010, y: 300, size: 84, gap: 18, appear: ss(1.9, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(150,40,30,.26)', blur: 13, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '洮西', ss(2.3, 2.6, lt), { size: 88, seed: 64 });
    },
  };
})();
