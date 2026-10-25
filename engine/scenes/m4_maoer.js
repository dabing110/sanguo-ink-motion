// ④ 曹公之叹：曹操渡渭，几为马超所及，叹曰「马儿不死，吾无葬地也」。
// 主动作：曹公小舟离岸向右远去（0.2→2.0s）→ 马超立马岸上举枪远指（0.9→1.8s）→ 八字逐字落墨（1.4→2.6s）。
// 母题循环：渭水、岸尘、孤雁。
SCENES['m4_maoer'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc4', '#ece2c8');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      Z.wash(c, 'mc4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2000, [
          { y0: 500, amp: 120, tone: 0.18, seed: 81.4 },
          { y0: 580, amp: 78, tone: 0.26, seed: 85.2 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.2 });
      // 渭水（占大半画面，天水一色）
      Z.water(c, t, { y0: 620, y1: 1040, tone: 0.26, seed: 19, rows: 8 });
      // 孤雁（循环二）
      Z.geese(c, t, { y: 190, x0: 1900, speed: 120, n: 4, seed: 12, scale: 0.9 });
      // 岸（左侧一抹）
      brush(c, [[0, 760], [240, 742], [520, 758], [720, 744]], { w: 16, tone: 0.86, dry: 0.7, seed: 91, head: 0.04, tail: 0.34, reveal: ss(0, 0.3, lt) });
      brush(c, [[0, 880], [300, 862], [640, 880], [860, 866]], { w: 9, tone: 0.5, dry: 0.85, seed: 92, reveal: ss(0.1, 0.4, lt) });
      // 主动作一：曹公小舟离岸远去（一个墨点似的舟＋一支橹）
      const go = ease.inOut(ss(0.2, 2.0, lt));
      const bx = lerp(760, 1720, go), by = lerp(700, 612, go) + Math.sin(t * 2.4) * 5;
      const bs = lerp(1.0, 0.42, go);
      c.save(); c.translate(bx, by); c.scale(bs, bs); c.globalAlpha = 1 - go * 0.3;
      brush(c, [[-52, 0], [0, 8], [54, 0]], { w: 11, tone: 0.92, dry: 0.4, seed: 101, head: 0.14, tail: 0.3 });
      brush(c, [[-8, 4], [-6, -30], [-22, -44]], { w: 7, tone: 0.8, dry: 0.5, seed: 102 });       // 立者
      c.fillStyle = 'rgba(24,22,20,.9)'; c.beginPath(); c.arc(-22, -52, 7, 0, Math.PI * 2); c.fill();
      const oar = Math.sin(t * 5.5) * 0.34;
      brush(c, [[30, 2], [52 + oar * 30, 22], [66 + oar * 52, 44]], { w: 4, tone: 0.7, dry: 0.6, seed: 103, tail: 0.6 });
      c.restore();
      // 舟尾水痕（循环三）
      c.save(); c.globalAlpha = 0.4;
      brush(c, [[bx - 90 * bs, by + 16], [bx - 180 * bs, by + 22], [bx - 280 * bs, by + 18]], { w: 3, tone: 0.3, dry: 0.8, seed: 104, tail: 0.8 });
      c.restore();
      // 主动作二：马超立马岸上，举枪远指
      const mx = 300, my = 872, ms = 1.9;
      Z.horse(c, mx, my, ms, t * 3.4, { gallop: 0, flip: 0, tone: 0.92 });
      Z.mChao(c, mx, my, ms, t * 3.4, { flip: 0, spearAng: lerp(-0.5, -0.12, ease.out(ss(0.9, 1.8, lt))), cape: 1 });
      Z.dust(c, t, { x: mx + 140, y: my, n: 4, seed: 41, scale: 1.1, alpha: 0.3 });
      // 主动作三：八字引语（曹操原话，全片的记忆点）
      Z.bigText(c, '马儿不死', { x: 1180, y: 268, size: 128, gap: 26, appear: ss(1.35, 2.3, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '吾无葬地', { x: 1180, y: 424, size: 128, gap: 26, appear: ss(1.75, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(2.5, 2.8, lt);
      c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.8)'; c.textAlign = 'center';
      c.fillText('——曹公语', 1180, 500);
      c.restore();
      Z.seal(c, 1762, 950, '渭南', ss(2.6, 2.85, lt), { size: 84, seed: 43 });
    },
  };
})();
