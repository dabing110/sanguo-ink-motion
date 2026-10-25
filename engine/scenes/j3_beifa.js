// ③ 继志北伐：亮卒，维还成都，为右监军辅汉将军，统诸军，进封平襄侯。后屡出陇右，号为「九伐中原」。
// 主动作：栈道上铁骑过（0.2→1.7s）→ 姜维立马道口、挥枪指陇右（1.5→2.6s）→ 连营次第举火（2.4→3.3s）；
// 母题循环：栈道、连营旗、山云。
SCENES['j3_beifa'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw3', '#eee6d0');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'jw3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 320, tone: 0.24, seed: 28 });
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      // 云气（循环一）
      Z.mist(c, t, { y0: 260, y1: 600, n: 4, alpha: 0.58, speed: 46, seed: 33 });
      // 主栈道（横贯中景，随入幕铺开）
      Z.zhanDao(c, 60, 742, 1.05, { len: 900, reveal: ss(0.05, 2.8, lt), tone: 0.72, seed: 71 });
      // 连营（循环二：营帐旗随风吹）
      Z.yingLei(c, 1560, 900, 1.15, t, { n: 3, alpha: 0.85, seed: 60 });
      // 地面
      brush(c, [[0, 898], [640, 886], [1280, 900], [1920, 882]], { w: 14, tone: 0.82, dry: 0.75, seed: 43, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：铁骑过栈道（三骑，匀速穿过，不用 ease.out）
      [0, 1, 2].forEach((k) => {
        const p = ss(0.2 + k * 0.28, 1.9 + k * 0.28, lt);
        const rx = lerp(-220, 1420, p);
        if (p <= 0 || p >= 1) return;
        c.save(); c.globalAlpha = 0.9;
        Z.rider(c, rx, 748 + (k % 2) * 6, 1.0 - k * 0.04, t * 6 + k * 2, { spearAng: -0.5, hold: 0.4, t });
        c.restore();
      });
      // 主动作二：姜维立马道口，挥枪指陇右
      const point = ss(1.5, 2.6, lt);
      Z.jiangWei(c, 700, 930, 2.3, {
        t, jiAng: lerp(-0.62, -1.02, point), raise: point * 0.62,
        stance: t * 1.7, flip: 0, robe: 0, scroll: 0,
      });
      // 挥枪的气痕（第二拍的余韵）
      if (point > 0) {
        c.save(); c.globalAlpha = point * 0.4; c.strokeStyle = 'rgba(255,252,246,.9)'; c.lineWidth = 6; c.lineCap = 'round';
        const r = 240 + point * 100;
        c.beginPath(); c.arc(700 + 180, 930 - 360, r, -0.95, 0.55); c.stroke();
        c.restore();
      }
      // 连营举火（尾段第二拍：三点火光次第亮）
      [[1520, 826, 0], [1600, 832, 0.18], [1680, 828, 0.36]].forEach(([fx, fy, d], k) => {
        const on = ss(2.4 + d, 2.85 + d, lt);
        if (on <= 0) return;
        c.save(); c.globalAlpha = on;
        const g = c.createRadialGradient(fx, fy, 4, fx, fy, 110);
        g.addColorStop(0, 'rgba(255,206,120,.6)'); g.addColorStop(0.4, 'rgba(255,170,80,.24)'); g.addColorStop(1, 'rgba(255,160,70,0)');
        c.fillStyle = g; c.beginPath(); c.arc(fx, fy, 110, 0, Math.PI * 2); c.fill();
        const fl = Math.sin(t * 8 + k) * 3;
        c.fillStyle = 'rgba(255,150,60,.95)';
        c.beginPath(); c.moveTo(fx - 9, fy); c.quadraticCurveTo(fx + fl, fy - 28, fx + 9, fy); c.closePath(); c.fill();
        c.restore();
      });
      // 浮尘（循环三）
      Z.dust(c, t, { x: 760, y: 920, n: 8, seed: 53, scale: 1.6, alpha: 0.4 });
      // 大字：九伐中原
      Z.bigText(c, '九伐中原', { x: 1010, y: 300, size: 84, gap: 18, appear: ss(2.2, 3.05, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '北伐', ss(2.6, 2.9, lt), { size: 88, seed: 63 });
    },
  };
})();
