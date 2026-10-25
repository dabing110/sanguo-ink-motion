// ⑥ 建昌都尉：刘表从子磐，骁勇，数为寇于艾、西安诸县。策以慈能制磐，遂委以南方之事。
//   权统事，以慈能制磐，遂委南方之事。年四十一，建安十一年卒。
// 主动作：慈立于军前（0.2→1.3s）→ 授旗（1.2→2.2s）→ 旗升、军列成（2.1→2.95s）；
// 母题循环：连营、云海、旗风。
SCENES['t6_jianchang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc6', '#ece5cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'tc6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 124, tone: 0.2, seed: 77.3 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 250, y1: 570, n: 4, alpha: 0.52, speed: 46, seed: 36 });
      // 连营（循环一：营帐旗随风吹）
      Z.yingLei(c, 1560, 900, 1.1, t, { n: 3, alpha: 0.85, seed: 60 });
      Z.yunHai(c, t, { y: 830, h: 110, n: 5, speed: 88, alpha: 0.55 });
      brush(c, [[0, 898], [640, 886], [1280, 900], [1920, 882]], { w: 14, tone: 0.82, dry: 0.76, seed: 46, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：慈立于军前（小幅就位，慢）
      const set = ss(0.2, 1.3, lt);
      const tx = lerp(840, 760, set);
      // 主动作二：授旗（旗自低而高，匀速）
      const lift = ss(1.2, 2.5, lt);
      c.save(); c.translate(0, (1 - lift) * 210); c.globalAlpha = 0.3 + 0.7 * lift;
      Z.flag(c, 1180, 906, 300, t, { seed: 17, col: 'rgba(178,44,36,.86)', text: '太' });
      c.restore();
      // 主动作三：军列成（三名士卒次第列于旗下，尾段第二拍）
      [0, 1, 2].forEach((k) => {
        const on = ss(1.7 + k * 0.16, 2.35 + k * 0.16, lt);
        if (on <= 0) return;
        const px = 1320 + k * 92;
        c.save(); c.globalAlpha = on * 0.85;
        brush(c, [[px, 906], [px - 4, 856], [px - 2, 822]], { w: 14, tone: 0.68, dry: 0.55, seed: 350 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(50,44,38,.84)'; c.beginPath(); c.arc(px - 2, 812, 11, 0, Math.PI * 2); c.fill();
        brush(c, [[px + 3, 844], [px + 30, 820], [px + 48, 800]], { w: 4, tone: 0.82, dry: 0.4, seed: 360 + k, tail: 0.4 });
        c.restore();
      });
      Z.taiShiCi(c, tx, 926, 2.25, {
        t, jiAng: lerp(-0.55, -1.05, set), raise: lift * 0.5, stance: t * 1.5, flip: 0, bow: 0, helm: 1,
      });
      Z.dust(c, t, { x: 960, y: 918, n: 7, seed: 56, scale: 1.5, alpha: 0.34 });
      Z.seal(c, 240, 946, '建昌', ss(2.3, 2.6, lt), { size: 88, seed: 66 });
    },
  };
})();
