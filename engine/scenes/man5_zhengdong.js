// ⑤ 征东将军：文帝即位，宠为征东将军，进封南乡侯，专任东面。
// 主动作：满宠立于旗下（0.4→2.4s）→ 威容远望（1.6→2.6s）；母题：旗、金辉、远山。
SCENES['man5_zhengdong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mn5', '#efe6cc');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'mn5_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(150,116,50,.14)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2050, [{ y0: 460, amp: 130, tone: 0.18, seed: 91 }]);
      }, { blur: 3, halo: 16, haloA: 0.26 });
      Z.mist(c, t, { y0: 340, y1: 600, n: 3, alpha: 0.4, speed: 34, seed: 71 });
      // 金辉
      c.save(); c.globalCompositeOperation = 'lighter';
      const gg = c.createRadialGradient(960, 520, 10, 960, 520, 360);
      gg.addColorStop(0, 'rgba(255,214,120,.26)'); gg.addColorStop(1, 'rgba(255,210,120,0)');
      c.fillStyle = gg; c.fillRect(0, 0, 1920, 1080); c.restore();
      brush(c, [[0, 912], [640, 902], [1280, 914], [1920, 900]], { w: 13, tone: 0.78, dry: 0.75, seed: 603, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      Z.flag(c, 1480, 740, 320, t, { col: 'rgba(186,52,42,.88)', seed: 7 });
      // 满宠 立
      const ap = ease.out(ss(0, 1.0, lt));
      const x = lerp(360, 760, ap), y = 946, s = lerp(1.5, 2.4, ap);
      const raise = ss(1.6, 2.6, lt);
      c.save(); c.globalAlpha = clamp(ap * 1.2);
      Z.mancong(c, x, y, s, { t, raise, scroll: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '伯宁', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
