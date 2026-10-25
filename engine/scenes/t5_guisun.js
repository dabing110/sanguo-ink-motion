// ⑤ 归孙：刘繇亡走，慈为策所执。策即解缚，捉其手曰：「今日之事，当与卿共之。」即署门下督。
// 主动作：慈趋前（0.2→1.4s）→ 策解缚（1.2→2.0s）→ 执手（1.9→2.75s）；
// 母题循环：江东旗、云海、浮尘。
SCENES['t5_guisun'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc5', '#eee7d4');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'tc5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 448, amp: 116, tone: 0.18, seed: 71.8 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.water(c, t, { y0: 700, y1: 900, tone: 0.22, seed: 5, rows: 4 });       // 江东：远处江水（循环）
      Z.mist(c, t, { y0: 240, y1: 570, n: 4, alpha: 0.54, speed: 48, seed: 35 });
      Z.yunHai(c, t, { y: 800, h: 110, n: 5, speed: 86, alpha: 0.55 });
      // 江东大旗（循环）
      Z.flag(c, 1560, 858, 260, t, { seed: 15, col: 'rgba(178,44,36,.86)', text: '孙' });
      Z.flag(c, 300, 862, 220, t, { seed: 16, col: 'rgba(178,44,36,.8)' });
      brush(c, [[0, 898], [640, 886], [1280, 900], [1920, 882]], { w: 14, tone: 0.82, dry: 0.76, seed: 45, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：慈趋前（440px / 1.2s ≈ 367px/s）
      const walk = ss(0.2, 1.4, lt);
      const tx = lerp(520, 960, walk);
      // 孙策（披风立像）
      Z.hero(c, 1300, 926, 2.2, t, { spearAng: -0.5, raise: 0, cape: 1 });
      // 主动作二：解缚（绳自腕上滑落）
      const untie = ss(1.2, 2.0, lt);
      if (untie > 0 && untie < 1) {
        c.save(); c.globalAlpha = (1 - untie) * 0.85;
        brush(c, [[tx + 150, 926 - 300], [tx + 176, 926 - 286], [tx + 152, 926 - 268]], { w: 5, col: [120, 96, 60], tone: 0.85, dry: 0.5, seed: 81 });
        c.restore();
      }
      // 主动作三：执手（策伸手，慈相就）
      const join = ss(1.9, 2.75, lt);
      Z.taiShiCi(c, tx, 926, 2.2, {
        t, jiAng: lerp(-0.7, -0.4, walk) + join * 0.3, raise: join * 0.45,
        stance: t * 1.6, flip: 0, bow: 0, helm: 1,
      });
      // 执手的一道光
      if (join > 0) {
        c.save(); c.globalAlpha = join * 0.4; c.strokeStyle = 'rgba(255,250,238,.95)'; c.lineWidth = 4;
        const r = 130 + join * 100;
        c.beginPath(); c.arc(1160, 660, r, -0.5, 0.5); c.stroke();
        c.beginPath(); c.arc(1160, 660, r + 32, -0.3, 0.3); c.stroke();
        c.restore();
      }
      Z.dust(c, t, { x: 1050, y: 918, n: 7, seed: 55, scale: 1.4, alpha: 0.32 });
      Z.bigText(c, '与卿共之', { x: 1010, y: 300, size: 80, gap: 18, appear: ss(1.8, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '归吴', ss(2.1, 2.4, lt), { size: 88, seed: 65 });
    },
  };
})();
