// ⑦ 景侯：宠薨，谥曰景侯，宿将之风，后世称之。
// 主动作：满宠虚影立（0.4→2.2s）→ 律简遗、远山暮（2.0→2.8s）；母题：暮山、归雁、松。
SCENES['man7_jinghou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn7', '#e3d8bc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'mn7_bg', 0.55 + 0.45 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 160, tone: 0.24, seed: 101 },
          { y0: 560, amp: 110, tone: 0.34, seed: 107 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.2 });
      c.save(); c.globalCompositeOperation = 'lighter';
      const sg = c.createRadialGradient(1500, 260, 8, 1500, 260, 420);
      sg.addColorStop(0, 'rgba(255,196,120,.32)'); sg.addColorStop(1, 'rgba(255,180,110,0)');
      c.fillStyle = sg; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.46, speed: 40, seed: 33 });
      Z.pine(c, t, { x: 300, y: 840, s: 1.1, seed: 4 });
      brush(c, [[0, 880], [480, 862], [980, 882], [1480, 864], [1920, 878]], { w: 16, tone: 0.82, dry: 0.74, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      Z.geese(c, t, { y: 240, x0: 2100, speed: 100, n: 4, seed: 9, scale: 1.1 });
      // 满宠 虚影
      const ap = ease.out(ss(0.4, 2.2, lt));
      const x = 820, y = 952, s = lerp(1.7, 2.4, ap);
      c.save(); c.globalAlpha = clamp(ap) * 0.7;
      Z.mancong(c, x, y, s, { t, raise: 0.1, scroll: 1 });
      c.restore();
      // 律简遗于石上
      c.save(); c.globalAlpha = 0.8; c.translate(1240, 920); c.rotate(0.2);
      c.fillStyle = 'rgba(216,196,150,.85)'; c.fillRect(-22, -44, 44, 44);
      c.strokeStyle = 'rgba(90,66,40,.8)'; c.lineWidth = 2; c.strokeRect(-22, -44, 44, 44);
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(0.9, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
