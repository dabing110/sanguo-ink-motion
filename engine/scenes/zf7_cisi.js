// ⑩ 帝大怒，二年六月，遣使赐死，葬于邺。
//    画面：她以发覆面（hairDown）——史书不写惨状，只写「遣使赐死」。步摇已卸，组绶垂落；使者立于一旁，持诏。
SCENES['zf7_cisi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zf7', '#e3ddc8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'zf7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 484, amp: 124, tone: 0.16, seed: 711 }, { y0: 632, amp: 86, tone: 0.25, seed: 713 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 5, alpha: 0.6, speed: 92, seed: 7112 });
      Z.mist(c, t, { y0: 240, y1: 510, n: 4, alpha: 0.42, speed: 122, seed: 7116 });
      Z.inkCloud(c, t, { y: 460, h: 30, n: 5, speed: 92, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 290, h: 24, n: 4, speed: 120, span: 1300, seed: 24, a: .18 });
      brush(c, [[0, 926], [640, 918], [1280, 928], [1920, 918]], { w: 14, tone: 0.76, dry: 0.74, seed: 7118, head: .03, tail: .3 });

      // 她（以发覆面：hairDown；步摇已卸，组绶垂落＝失势）
      Z.zhenhou(c, 820 + Math.sin(t * .7) * 3, 928, 1.6, { t, fade: ss(0.3, 1.7, lt), hairDown: 1, bow: 0.5 + 0.04 * Math.sin(t * 1.1) });
      // 使者（立于一旁，持诏）
      Z.leader(c, 1380, 924, 1.42, t, { flip: 1, bow: 0.04 });
      // 诏（使者手中所持：一卷素帛，随呼吸微动）
      c.save(); c.globalAlpha = clamp(ss(0.4, 1.6, lt)) * .92; c.translate(1280, 856);
      c.rotate(-0.5 + Math.sin(t * 1.8) * .06);
      c.fillStyle = 'rgba(236,228,206,.95)';
      c.beginPath(); c.moveTo(0, 0); c.lineTo(54, -8); c.lineTo(50, -150); c.lineTo(-4, -142); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(58,44,24,.85)'; c.lineWidth = 2.4; c.stroke();
      c.strokeStyle = 'rgba(150,40,34,.8)'; c.lineWidth = 6;
      c.beginPath(); c.moveTo(6, -20); c.lineTo(48, -26); c.stroke();
      c.restore();

      Z.torch(c, 360, 916, 1.30, t, 711);
      Z.torch(c, 1640, 920, 1.26, t, 715);
      Z.dust(c, t, { x: 820, y: 720, n: 6, seed: 719, scale: 1.4, alpha: 0.4 });

      Z.inkSmoke(c, 820, 700, t, { seed: 717, a: 0.26 });
      Z.inkSmoke(c, 560, 730, t, { seed: 718, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 701, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 702, a: .34 });

      Z.bigText(c, '二年六月', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '遣使赐死', { x: 320, y: 548, size: 50, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(140,52,42,.92)', shadow: { color: 'rgba(150,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
