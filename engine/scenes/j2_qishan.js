// ② 祁山归亮：建兴六年，亮军向祁山，天水太守疑维等有异心，维乃诣亮。
//   亮与语，大悦，曰：「姜伯约忠勤时事，思虑精密……甚敏于军事。」
// 主动作：维自城门出、趋前（0.2→1.3s）→ 武侯执扇相迎（0.9→1.9s）→ 执手（1.7→2.75s）；
// 母题循环：祁山云气、栈道、旌旗。
SCENES['j2_qishan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw2', '#ece4cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'jw2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 300, tone: 0.26, seed: 25 });
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      // 栈道（循环一：秦岭木栈，横贯中景）
      Z.zhanDao(c, 120, 700, 1.0, { len: 760, reveal: ss(0.1, 2.6, lt), tone: 0.7, seed: 70 });
      // 云气（循环二）
      Z.mist(c, t, { y0: 300, y1: 620, n: 4, alpha: 0.6, speed: 48, seed: 32 });
      // 汉军旗（循环三）
      Z.flag(c, 250, 690, 220, t, { seed: 13, col: 'rgba(178,44,36,.84)', text: '汉' });
      Z.flag(c, 1690, 686, 190, t, { seed: 14, col: 'rgba(178,44,36,.8)' });
      // 地面
      brush(c, [[0, 896], [640, 884], [1280, 898], [1920, 880]], { w: 15, tone: 0.84, dry: 0.74, seed: 42, head: 0.04, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 武侯执扇相迎（先立定，等维走近）
      Z.woLong(c, 1300, 926, 2.15, t, { flip: 1, fan: 1 });
      // 主动作：维自左趋前，抬手相就
      const walk = ss(0.2, 1.5, lt);
      const jx = lerp(360, 880, walk);
      const join = ss(1.6, 2.75, lt);                     // 执手：右手前伸
      Z.jiangWei(c, jx, 926, 2.25, {
        t, jiAng: lerp(-0.7, -0.34, walk) + join * 0.3, raise: join * 0.5,
        stance: t * 1.6, flip: 0, robe: 1, scroll: 0.35,
      });
      // 执手的一道光（两人之间的相得，尾段第二拍）
      if (join > 0) {
        c.save(); c.globalAlpha = join * 0.42; c.strokeStyle = 'rgba(255,250,238,.95)'; c.lineWidth = 4;
        const r = 120 + join * 110;
        c.beginPath(); c.arc(1080, 700, r, -0.5, 0.5); c.stroke();
        c.beginPath(); c.arc(1080, 700, r + 34, -0.32, 0.32); c.stroke();
        c.restore();
      }
      // 浮尘
      Z.dust(c, t, { x: 980, y: 916, n: 6, seed: 52, scale: 1.35, alpha: 0.34 });
      // 榜题式大字：亮评姜维「思虑精密」
      Z.bigText(c, '思虑精密', { x: 1000, y: 300, size: 82, gap: 18, appear: ss(1.7, 2.55, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '归汉', ss(2.1, 2.4, lt), { size: 88, seed: 62 });
    },
  };
})();
