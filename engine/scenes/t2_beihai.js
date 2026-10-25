// ② 北海求援：孔融为黄巾所围，慈自辽东还，径入都昌城下，突重围见融；复请兵于平原相刘备，围乃解。
// 主动作：慈突围入城（0.2→1.6s）→ 城门开一线（1.5→2.2s）→ 复出请兵（2.2→2.75s）；
// 母题循环：围城营火、云海、城上旗。
SCENES['t2_beihai'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc2', '#e6ddc4');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'tc2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 448, amp: 122, tone: 0.2, seed: 57.6 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 250, y1: 580, n: 4, alpha: 0.5, speed: 46, seed: 32 });
      // 孤城（北海都昌）
      Z.guCheng(c, 1180, 900, 1.35, t, { tone: 0.78 });
      // 城上旗（循环：唯一还在打的旗）
      Z.flag(c, 1080, 592, 200, t, { seed: 13, col: 'rgba(178,44,36,.84)', text: '北' });
      brush(c, [[0, 902], [640, 890], [1280, 904], [1920, 886]], { w: 15, tone: 0.82, dry: 0.76, seed: 42, head: 0.04, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 云海（围城下压）
      Z.yunHai(c, t, { y: 840, h: 120, n: 6, speed: 92, alpha: 0.6 });

      // 主动作：慈自右向左突围（540px / 1.4s ≈ 386px/s）
      const walk = ss(0.2, 1.6, lt);
      const tx = lerp(1480, 940, walk);
      // 城门开一线（第二拍的前奏）
      const open = ss(1.5, 2.2, lt);
      if (open > 0) {
        c.save(); c.globalAlpha = 0.9;
        c.fillStyle = 'rgba(28,22,18,.86)';
        c.fillRect(1180 - 46, 900 - 130, 92, 130);
        c.fillStyle = `rgba(255,236,180,${0.5 * open})`;
        c.fillRect(1180 - 40, 900 - 126, 80, 126);
        c.restore();
      }
      // 复出请兵：慈转向右（flip 切换用淡出淡入不合适，改为原地转身 → 用 stance + 微移）
      const turn = ss(2.2, 2.75, lt);
      Z.taiShiCi(c, tx + turn * 60, 926, 2.2, {
        t, jiAng: lerp(-0.62, -0.3, walk) + turn * 0.5, raise: turn * 0.4,
        stance: t * 1.6, flip: 0, bow: 0, helm: 1,
      });
      // 突围时身后的黄巾残影（循环：两个追兵，始终在画内）
      [0, 1].forEach((k) => {
        const px = tx + 260 + k * 130 + Math.sin(t * 2.8 + k * 2) * 14;
        c.save(); c.globalAlpha = 0.55;
        brush(c, [[px, 900], [px - 5, 852], [px - 2, 820]], { w: 14, tone: 0.62, dry: 0.6, seed: 340 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(52,46,40,.8)'; c.beginPath(); c.arc(px - 2, 812, 11, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      Z.dust(c, t, { x: 1100, y: 916, n: 8, seed: 52, scale: 1.6, alpha: 0.38 });
      Z.seal(c, 240, 946, '北海', ss(2.1, 2.4, lt), { size: 88, seed: 62 });
    },
  };
})();
