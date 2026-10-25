// ⑥ 沓中屯田：景耀五年，维以黄皓弄权，不敢还成都，率众屯田沓中，种麦储粮。
// 主动作：田垄铺开（0.15→1.1s）→ 屯田卒次第起（0.9→1.9s）→ 姜维按枪巡视、望蜀（1.7→2.95s）；
// 母题循环：麦垄、卒之锄、远山云。
SCENES['j6_tazhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw6', '#ece6d4');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'jw6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 240, tone: 0.2, seed: 39 });
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      // 云气（循环一）
      Z.mist(c, t, { y0: 250, y1: 580, n: 4, alpha: 0.55, speed: 42, seed: 36 });
      // 麦垄：三层，随入幕铺开（循环二：垄线随风轻动）
      Z.tunTian(c, 940, 760, 1.5, t, { rows: 5, reveal: ss(0.15, 2.8, lt), seed: 90 });
      Z.tunTian(c, 560, 900, 1.9, t, { rows: 4, reveal: ss(0.2, 3.0, lt), seed: 92 });
      Z.tunTian(c, 1520, 910, 1.7, t, { rows: 3, reveal: ss(0.25, 3.2, lt), seed: 94 });
      // 地面
      brush(c, [[0, 900], [640, 890], [1280, 902], [1920, 886]], { w: 13, tone: 0.78, dry: 0.78, seed: 46, head: 0.03, tail: 0.32, reveal: ss(0, 0.3, lt) });

      // 主动作一：屯田卒次第起（三人在近垄，锄头起落）
      [0, 1, 2].forEach((k) => {
        const on = ss(0.9 + k * 0.22, 1.5 + k * 0.22, lt);
        if (on <= 0) return;
        c.save(); c.globalAlpha = on * 0.9;
        const px = 420 + k * 420, ph = t * 2.2 + k * 2.1;
        const sw = Math.sin(ph) * 20;
        brush(c, [[px, 946], [px - 5, 900], [px - 2, 862]], { w: 14, tone: 0.72, dry: 0.5, seed: 550 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(50,44,38,.86)'; c.beginPath(); c.arc(px - 2, 852, 11, 0, Math.PI * 2); c.fill();
        brush(c, [[px - 2, 890], [px + sw * 0.5, 918], [px + sw, 940]], { w: 5, tone: 0.8, dry: 0.4, seed: 560 + k });
        c.restore();
      });

      // 主动作二：姜维按枪巡视 → 望蜀（尾段第二拍：抬头远望）
      const walk = ss(0.5, 2.0, lt);
      const jx = lerp(1500, 900, walk);
      const look = ss(2.1, 2.95, lt);
      Z.jiangWei(c, jx, 934, 2.25, {
        t, jiAng: lerp(-0.75, -0.55, walk) + look * 0.18, raise: look * 0.35,
        stance: t * 1.6, flip: 1, robe: 0, scroll: 0,
      });
      // 远望的目光（一道淡痕指向蜀地方向）
      if (look > 0) {
        c.save(); c.globalAlpha = look * 0.3; c.strokeStyle = 'rgba(120,140,170,.9)'; c.lineWidth = 3;
        c.beginPath(); c.moveTo(jx - 90, 934 - 480); c.lineTo(jx - 460 - look * 260, 934 - 560); c.stroke();
        c.restore();
      }
      // 浮尘（循环三）
      Z.dust(c, t, { x: 1000, y: 928, n: 7, seed: 56, scale: 1.5, alpha: 0.34 });
      Z.seal(c, 240, 946, '沓中', ss(2.3, 2.6, lt), { size: 88, seed: 66 });
    },
  };
})();
