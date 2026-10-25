// ⑧ 刚侯：黄忠卒（二二〇年），先主追谥曰刚。
// 主动作：五个大字逐字落墨「老将黄忠」，老将纵马走向画深处、越来越小；母题循环：远山长卷缓卷、雁阵南去。
// 落款用陈寿评：「忠为人勇毅，冠三军，每战常为士卒先，所向无前。」
SCENES['h8_ganghou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz8');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.6, lt);
      // 远山长卷（缓卷：山整体极慢左移）
      const drift = lt * 13;
      c.save(); c.translate(-drift % 240, 0);
      Z.wash(c, 'hz8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -80, 2300, [
          { y0: 430, amp: 210, tone: 0.2, seed: 91.7 },
          { y0: 540, amp: 150, tone: 0.32, seed: 97.3 },
          { y0: 620, amp: 90, tone: 0.44, seed: 101.1 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.26 });
      c.restore();
      Z.mist(c, t, { y0: 360, y1: 640, n: 5, alpha: 0.7, speed: 38, seed: 14 });
      Z.geese(c, t, { y: 240, x0: 2000, speed: 155, n: 6, seed: 4, scale: 0.85 });
      // 地平
      brush(c, [[0, 830], [640, 818], [1300, 828], [1920, 820]], { w: 10, tone: 0.5, dry: 0.8, seed: 78, reveal: ss(0, 0.3, lt) });
      // 老将远去：纵马走向画深处（0.2→3.2s 由近及远，渐小渐淡）
      const go = ss(0.2, 3.2, lt);
      const gx = lerp(1290, 720, ease.inOut(go));
      const gy = lerp(880, 800, go);
      const gs = lerp(1.0, 0.3, go);
      c.save(); c.globalAlpha = 1 - go * 0.55;
      Z.horse(c, gx, gy, gs, t * 6, { gallop: 1, flip: 1, tone: 0.8 });
      Z.oldRider(c, gx, gy, gs, t * 6, { draw: 0, beard: 1, cape: 1, backFlag: 1, flip: 1 });
      c.restore();
      // 大字（主动作）
      Z.bigText(c, '老将黄忠', { x: 900, y: 320, size: 176, gap: 32, appear: ss(0.25, 1.9, lt), col: 'rgba(24,20,16,.95)', shadow: { color: 'rgba(120,90,40,.35)', blur: 14, x: 4, y: 6 } });
      // 小字：生卒与谥
      c.save(); c.globalAlpha = ss(1.7, 2.2, lt);
      c.font = '38px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.85)'; c.textAlign = 'center';
      c.fillText('二二〇年卒 · 追谥刚侯', 900, 456);
      c.restore();
      Z.seal(c, 1762, 930, '刚侯', ss(2.1, 2.4, lt), { size: 92, seed: 41 });
      // 落款（左下，把右下让给钤印）
      c.save(); c.globalAlpha = ss(2.4, 2.8, lt);
      c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(60,50,40,.7)'; c.textAlign = 'left';
      c.fillText('忠为人勇毅，冠三军，每战常为士卒先，所向无前。', 90, 1010);
      c.restore();
    },
  };
})();
