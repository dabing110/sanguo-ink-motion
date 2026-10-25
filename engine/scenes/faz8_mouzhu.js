// ⑧ 谋主孝直：总评——法正，先主谋主，奇谋善断，睚眦必报而善奇画。
// 主动作：法正立持羽扇（0.4→2.4s）→ 威容远望（2.0→3.6s）；母题：远山、金辉、松、雁。
SCENES['faz8_mouzhu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fz8', '#efe6cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.4, lt);
      Z.wash(c, 'fz8_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(150,116,50,.12)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2100, [
          { y0: 460, amp: 170, tone: 0.22, seed: 111 },
          { y0: 560, amp: 120, tone: 0.32, seed: 117 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      c.save(); c.globalCompositeOperation = 'lighter';
      const gg = c.createRadialGradient(960, 520, 10, 960, 520, 380);
      gg.addColorStop(0, 'rgba(255,214,120,.26)'); gg.addColorStop(1, 'rgba(255,210,120,0)');
      c.fillStyle = gg; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.42, speed: 44, seed: 71 });
      Z.pine(c, t, { x: 320, y: 840, s: 1.1, seed: 4 });
      brush(c, [[0, 880], [480, 862], [980, 882], [1480, 864], [1920, 878]], { w: 16, tone: 0.82, dry: 0.74, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.4, lt) });
      Z.geese(c, t, { y: 240, x0: 2100, speed: 110, n: 4, seed: 9, scale: 1.1 });
      // 法正 立持羽扇
      const ap = ease.out(ss(0.4, 2.4, lt));
      const x = 820, y = 952, s = lerp(1.7, 2.5, ap);
      const raise = ss(2.0, 3.6, lt);
      c.save(); c.globalAlpha = clamp(ap);
      Z.fazheng(c, x, y, s, { t, raise, fan: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '孝直', ss(0.9, 1.3, lt), { size: 88, seed: 3 });
    },
  };
})();
