// ⑧ 片尾：常山赵子龙——建兴七年卒，追谥顺平侯。
// 主动作：五个大字逐字落墨，钤「顺平侯」印；远处赵云的剪影纵马走向画深处、越来越小。母题循环：远山云气、雁阵南去。
SCENES['z8_end'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('zl_paper');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.6, lt);
      // 远山长卷（缓卷：山整体极慢左移，云气横流）
      const drift = lt * 14;
      c.save(); c.translate(-drift % 240, 0);
      Z.wash(c, 'z8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 2300, [
          { y0: 430, amp: 220, tone: 0.2, seed: 31.7 },
          { y0: 540, amp: 150, tone: 0.32, seed: 37.3 },
          { y0: 620, amp: 90, tone: 0.44, seed: 41.1 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.26 });
      c.restore();
      Z.mist(c, t, { y0: 360, y1: 640, n: 5, alpha: 0.7, speed: 40, seed: 12 });
      Z.geese(c, t, { y: 230, x0: 2000, speed: 160, n: 6, seed: 4, scale: 0.85 });
      // 地平
      brush(c, [[0, 830], [640, 818], [1300, 828], [1920, 820]], { w: 10, tone: 0.5, dry: 0.8, seed: 18, reveal: ss(0, 0.3, lt) });
      // 赵云远去：纵马走向画深处（0.2→3.4s 由近及远，渐小渐淡）
      const go = ss(0.2, 3.4, lt);
      const gx = lerp(1290, 700, ease.inOut(go));
      const gy = lerp(880, 800, go);
      const gs = lerp(1.0, 0.3, go);
      c.save(); c.globalAlpha = 1 - go * 0.55;
      Z.horse(c, gx, gy, gs, t * 6, { gallop: 1, flip: 1, tone: 0.8 });
      Z.rider(c, gx, gy, gs, t * 6, { spearAng: -1.5, spearLen: 300, t, flip: 1, backFlag: 1, cape: 1 });
      c.restore();
      // 大字（主动作）
      Z.bigText(c, '常山赵子龙', { x: 900, y: 330, size: 175, gap: 30, appear: ss(0.25, 1.9, lt), col: 'rgba(24,20,16,.95)', shadow: { color: 'rgba(120,90,40,.35)', blur: 14, x: 4, y: 6 } });
      // 生卒小字
      c.save(); c.globalAlpha = ss(1.7, 2.2, lt);
      c.font = '38px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.85)'; c.textAlign = 'center';
      c.fillText('建兴七年卒 · 追谥顺平侯', 900, 470);
      c.restore();
      Z.seal(c, 1762, 930, '顺平侯', ss(2.1, 2.4, lt), { size: 92, seed: 29 });
      // 落款（挪到左下，把右下留给钤印，版式与全片统一）
      c.save(); c.globalAlpha = ss(2.4, 2.8, lt);
      c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(60,50,40,.7)'; c.textAlign = 'left';
      c.fillText('初，先主之败，有人言云已北去者……云身抱弱子，皆得免难。', 90, 1010);
      c.restore();
    },
  };
})();
