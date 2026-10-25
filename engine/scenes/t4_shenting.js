// ④ 神亭酣战：慈与孙策遇于神亭，策刺慈马，而揽得慈项上手戟；慈亦得策兜鍪。会两家兵骑来赴，乃各罢去。
// 主动作：两人交手（0.2→1.25s）→ 互易（戟与兜鍪脱手飞起交换，1.2→2.1s）→ 各执所得、相视（2.0→2.95s）；
// 母题循环：神亭、云海、乱尘。
SCENES['t4_shenting'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc4', '#e9e2c9');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'tc4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 456, amp: 126, tone: 0.2, seed: 67.4 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 250, y1: 570, n: 4, alpha: 0.52, speed: 46, seed: 34 });
      // 神亭（居中，两人绕亭而斗）
      Z.shenTing(c, 960, 900, 1.25, t, { tone: 0.72 });
      brush(c, [[0, 900], [640, 888], [1280, 902], [1920, 884]], { w: 15, tone: 0.82, dry: 0.76, seed: 44, head: 0.04, tail: 0.3, reveal: ss(0, 0.3, lt) });
      Z.yunHai(c, t, { y: 830, h: 110, n: 5, speed: 90, alpha: 0.55 });

      // 主动作一：交手（慈在左持戟，策在右持枪，两人错身）
      const clash = ss(0.2, 1.25, lt);
      const tx = lerp(760, 660, clash);                 // 慈向左让位（100px，慢）
      const cx = lerp(1280, 1180, clash);
      // 主动作二：互易 —— 戟与兜鍪脱手飞起，交叉换手
      const swap = ss(1.2, 2.1, lt);
      const arc = Math.sin(swap * Math.PI);             // 抛物线高度
      if (swap > 0 && swap < 1) {
        c.save(); c.globalAlpha = clamp(swap * 4) * clamp((1 - swap) * 4);
        // 慈的戟 → 策
        Z.jiTan(c, lerp(780, 1140, swap), lerp(560, 520, swap) - arc * 150, -0.5 + swap * 2.6, 300, t);
        // 策的兜鍪 → 慈
        Z.douMou(c, lerp(1140, 780, swap), lerp(520, 560, swap) - arc * 150, 1.1, t, { alpha: 0.95 });
        c.restore();
      }
      // 交手的气痕（循环：兵器相接的白痕）
      if (clash > 0) {
        c.save(); c.globalAlpha = clash * 0.42; c.strokeStyle = 'rgba(255,252,246,.92)'; c.lineWidth = 6; c.lineCap = 'round';
        const r = 230 + clash * 90;
        c.beginPath(); c.arc(920, 620, r, -0.8, 0.8); c.stroke();
        c.restore();
      }
      // 两人（互易后：慈执兜鍪，策执戟）
      const hold = ss(2.0, 2.95, lt);
      Z.taiShiCi(c, tx, 926, 2.2, {
        t, jiAng: lerp(-0.5, -0.95, clash) + swap * 0.6, raise: clash * 0.4 * (1 - swap),
        stance: t * 1.7, flip: 0, bow: 0, helm: swap > 0.45 ? 0 : 1,          // 兜鍪被策夺走
      });
      Z.hero(c, cx, 926, 2.2, t, { spearAng: lerp(-0.7, -1.0, clash), raise: clash * 0.35 * (1 - swap), cape: 1 });
      // 慈手中多了一顶兜鍪（互易所得）
      if (hold > 0) {
        Z.douMou(c, tx - 200, 926 - 210, 1.15, t, { alpha: hold * 0.95 });
      }
      Z.dust(c, t, { x: 960, y: 918, n: 8, seed: 54, scale: 1.7, alpha: 0.4 });
      Z.bigText(c, '神亭酣战', { x: 1010, y: 296, size: 84, gap: 18, appear: ss(1.9, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(150,40,30,.26)', blur: 13, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '神亭', ss(2.3, 2.6, lt), { size: 88, seed: 64 });
    },
  };
})();
