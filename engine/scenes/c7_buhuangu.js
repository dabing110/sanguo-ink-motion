// ⑦ 不还顾：宫曰：「请出就戮，以明军法。」操泣而送之，宫不还顾。
// 全片唯一一次背对镜头——他把背影留给了曹操，也留给了那个曾经一起放过他的黄昏。
// 主动作：宫大步下楼向左（0.35→2.9s，820px/2.55s≈322px/s）→ 操背对泣送（1.6→2.4s 抬袖）→ 宫影行至画左（至 2.9s 定格）
// 母题循环：残阳（低垂）、旌旗、尘埃、氅摆。
SCENES['c7_buhuangu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq7', '#e9dcc4');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'cq7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 470, amp: 104, tone: 0.2, seed: 531.5 }]);
        g.fillStyle = 'rgba(140,74,46,.18)'; g.fillRect(0, 0, 1920, 1080);   // 残阳染空
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      // 残阳（低垂大日——本幕主母题）
      Z.canYang(c, 1560, 420, 130, t, { alpha: 0.55 });
      Z.mist(c, t, { y0: 330, y1: 620, n: 4, alpha: 0.42, speed: 40, seed: 533 });
      brush(c, [[0, 926], [640, 914], [1280, 928], [1920, 912]], { w: 14, tone: 0.76, dry: 0.75, seed: 535, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 14, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 44, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 15, a: 0.3 });

      // 白门楼（右侧背影处，残阳映楼）
      c.save(); c.globalAlpha = 0.88;
      Z.baiMenLou(c, 1650, 920, 0.95, t, { tone: 0.72 });
      c.restore();
      Z.flag(c, 1450, 620, 150, t, { seed: 537, col: 'rgba(178,44,36,.82)', text: '曹' });

      // 主动作一：宫大步向左，始终不回头（步态自带 stance 律动）
      const walk = ss(0.35, 2.9, lt);                       // 820px / 2.55s ≈ 322px/s
      const px = lerp(1180, 360, walk);
      Z.chenGong(c, px, 972, 2.6, { t, raise: 0, stance: t * 2.2, flip: 1, sword: 1, back: walk > 0.02, bound: 0 });
      Z.dust(c, t, { x: px + 150, y: 970, n: 6, seed: 539, scale: 1.5, alpha: 0.3 });

      // 主动作二：操背对泣送（抬袖掩面）
      const weep = ss(1.6, 2.4, lt);
      c.save(); c.globalAlpha = 0.94;
      Z.leader(c, 1450, 966, 2.45, { t, raise: weep * 0.75, stance: t * 0.8, flip: 0, cape: 1 });
      c.restore();

      // 阶下吕布（远景小影，静跪）
      c.save(); c.globalAlpha = 0.7;
      Z.fuZhe(c, 1780, 986, 1.4, t, { tone: 'rgba(96,88,78,.6)', seed: 97 });
      c.restore();
      Z.geese(c, t, { y: 250, x0: 1980, speed: 120, n: 5, seed: 57, scale: 1.1 });

      Z.bigText(c, '不还顾', { x: 760, y: 300, size: 96, gap: 22, appear: ss(2.15, 2.9, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 252, 948, '公台', ss(2.35, 2.7, lt), { size: 88, seed: 541 });
    },
  };
})();
