// ⑤ 宴上画龙取肝，泼水成牡丹，垂钓得松江四腮鲈，覆盆得紫芽姜。
SCENES['u5_huan'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz5', '#e8e3cf');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'uz5_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 600, amp: 90, tone: 0.16, seed: 43 }]);
      }, { blur: 3, halo: 14, haloA: 0.2 });
      Z.mist(c, t, { y0: 260, y1: 540, n: 3, alpha: 0.45, speed: 40, seed: 253 });
      Z.inkCloud(c, t, { y: 876, h: 24, n: 3, speed: 48, span: 1500, seed: 5, a: .12 });
      // 宴席长案（暖色）
      c.save(); c.fillStyle = 'rgba(150,110,70,.4)'; c.fillRect(240, 870, 1440, 26); c.restore();
      brush(c, [[0, 910], [640, 902], [1280, 912], [1920, 902]], { w: 12, tone: 0.7, dry: 0.8, seed: 332, head: .03, tail: .3 });

      // 曹操（右，观）
      Z.leader(c, 1560, 962, 2.4, t, { flip: 0, cape: 1 });
      // 左慈（中，施术）
      const raise = ss(0.3, 1.2, lt);
      Z.zuoci(c, 820, 944, 2.3, { t, fade: 1, raise, staff: 0, whisk: 1 });

      // 四样幻术依次现身
      const aD = ss(0.4, 1.3, lt);   // 龙
      const aP = ss(1.2, 2.0, lt);   // 牡丹
      const aF = ss(1.9, 2.7, lt);   // 鲈鱼
      const aG = ss(2.6, 3.3, lt);   // 紫芽姜
      if (aD > 0.01) Z.dragon(c, 760, 540, 0.62, t, { prog: aD, glow: aD });
      if (aP > 0.01) Z.peony(c, 560, 760, 1.4, t, { bloom: aP });
      if (aF > 0.01) Z.fish(c, 1020, 820, 1.2, t, {});
      if (aG > 0.01) Z.ginger(c, 1240, 850, 1.6, { grow: aG });

      // 母题
      Z.magicRing(c, 820, 650, 180, t, { a: .14, spin: .4 });
      Z.inkMotes(c, 820, 700, 220, t, { n: 18, seed: 10, a: .4, speed: .7 });
      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '宴上施幻', { x: 700, y: 210 + Math.sin(t * 1.2) * 6, size: 60, gap: 14, appear: ss(0.3, 1.0, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '幻术', ss(0.6, 1.2, lt), { size: 74, seed: 334 });
    },
  };
})();
