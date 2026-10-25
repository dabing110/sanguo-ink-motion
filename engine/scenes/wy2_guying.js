// ② 异见两男已死，又恐为双所侵，引刀欲自刎——顾女英而叹曰：
//    「身死尔弃，当谁恃哉！吾闻西施蒙不洁之服，则人掩鼻，况我貌非西施乎？」遂以溷粪涅麻而被之。
//    画面：断壁下，刀已举到颈侧；六岁的英牵住她的衣角——这一回头的犹豫，是她后十年守城的起点。
SCENES['wy2_guying'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy2', '#e2ddc9');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy2_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 486, amp: 128, tone: 0.17, seed: 21 }, { y0: 636, amp: 88, tone: 0.27, seed: 23 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 212 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 216 });
      Z.inkCloud(c, t, { y: 890, h: 32, n: 5, speed: 96, span: 1500, seed: 7, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 17, a: .18 });
      brush(c, [[0, 916], [640, 908], [1280, 918], [1920, 908]], { w: 15, tone: 0.78, dry: 0.72, seed: 218, head: .03, tail: .3 });

      // 断壁残垣（背景，随时间渐显）
      const ru = ss(0.15, 1.6, lt);
      [[300, 1.05, 0], [1620, 0.95, 1]].forEach(([px2, sc, k]) => {
        c.save(); c.globalAlpha = clamp(ru) * .9; c.translate(px2, 940); c.scale(sc, sc);
        brush(c, [[-90, 0], [-84 + Math.sin(t * .6 + k) * 3, -230], [-96, -400]],
          { w: 40, tone: .58, dry: .62, seed: 221 + k, col: [140, 122, 96] });
        brush(c, [[70, 0], [78, -180], [62, -300]], { w: 34, tone: .54, dry: .66, seed: 223 + k, col: [134, 118, 94] });
        c.strokeStyle = 'rgba(58,46,32,.6)'; c.lineWidth = 2.2;
        c.beginPath(); c.moveTo(-88, -240); c.lineTo(66, -226); c.stroke();
        c.restore();
      });
      // 枯树（左，风动）
      Z.pine(c, t, { x: 190, y: 930, s: 1.15, seed: 227, tone: .9 });

      // 火把（主运动）
      Z.torch(c, 470, 900, 1.35, t, 11);
      Z.torch(c, 1510, 906, 1.22, t, 15);
      Z.campFire(c, 1180, 928, 0.85, t, { alpha: .6, seed: 9 });
      Z.dust(c, t, { x: 700, y: 900, n: 6, seed: 19, scale: 1.5, alpha: 0.5 });

      // 主动作：刀举到颈侧（raise 0→1），刀锋抖动；英牵衣角
      const rz = ss(0.5, 2.0, lt);
      const wx = 1090 + Math.sin(t * 1.1) * 4;
      Z.wangyi(c, wx, 952, 2.5,
        { t, fade: ss(0.2, 1.5, lt), gou: 0, knife: 1, raise: rz, bow: 0.1 });
      // 刀锋寒光（随举刀落下，白弧扫过）
      const gl = ss(1.2, 2.4, lt) * (0.5 + 0.5 * Math.sin(t * 3.1));
      if (gl > 0.02) {
        c.save(); c.globalAlpha = clamp(gl) * .55; c.translate(wx + 116, 560);
        c.strokeStyle = 'rgba(250,252,255,.95)'; c.lineWidth = 5; c.lineCap = 'round';
        c.beginPath(); c.arc(-40, 40, 150, -0.9, -0.25); c.stroke();
        c.restore();
      }
      Z.child(c, wx - 118, 950, 1.55, t, { fade: ss(0.35, 1.8, lt), seed: 41 });
      // 牵衣的手（英伸手 → 一线相牵，写意：一条淡墨丝）
      const hold = ss(1.4, 2.6, lt);
      c.save(); c.globalAlpha = clamp(hold) * .7;
      brush(c, [[wx - 118, 890], [wx - 70, 906], [wx - 20, 918]],
        { w: 3, tone: .35, dry: .8, seed: 229, tail: .6, col: [110, 96, 78] });
      c.restore();

      Z.inkSmoke(c, 1090, 660, t, { seed: 27, a: 0.28 });
      Z.inkSmoke(c, 520, 700, t, { seed: 28, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 73, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 74, a: .34 });

      Z.bigText(c, '引刀欲刎', { x: 320, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '身死尔弃 · 当谁恃哉', { x: 330, y: 546, size: 44, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
