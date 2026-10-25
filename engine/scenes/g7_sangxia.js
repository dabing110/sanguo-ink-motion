// ⑦ （《三国演义》第六十九回，文学虚构）管辂教赵颜延寿：往南山桑树下，见二仙对弈，
//    献酒脯，求其添寿 —— 南斗主生，北斗主死。
SCENES['g7_sangxia'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ug7', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.0, lt);
      Z.wash(c, 'ug7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 460, amp: 150, tone: 0.16, seed: 73 }, { y0: 600, amp: 100, tone: 0.26, seed: 77 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      Z.mist(c, t, { y0: 380, y1: 680, n: 4, alpha: 0.42, speed: 44, seed: 422 });
      Z.inkCloud(c, t, { y: 888, h: 22, n: 3, speed: 44, span: 1500, seed: 8, a: .12 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 13, tone: 0.78, dry: 0.74, seed: 315, head: .03, tail: .3 });
      Z.geese(c, t, { y: 180, x0: 2300, speed: 118, n: 4, seed: 71, scale: 0.7 });

      // 桑下对弈（南斗北斗：棋盘 + 二仙 + 桑树）
      Z.goBoard(c, 980, 720, 1.45, t, { a: ss(0.3, 2.0, lt) });

      // 献脯者（左下，跪献：团身人形 + 托盘酒脯）
      const fp = ss(0.8, 2.4, lt);
      c.save(); c.globalAlpha = clamp(fp); c.translate(430, 950); c.scale(1.7, 1.7);
      c.fillStyle = 'rgba(84,90,110,.85)';
      c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-22, -44, 0, -56); c.quadraticCurveTo(24, -44, 28, 0); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(28,30,40,.85)'; c.lineWidth = 2.4; c.stroke();
      c.fillStyle = 'rgba(244,238,224,.97)';
      c.beginPath(); c.arc(-2, -70, 13, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(24,22,20,.84)'; c.lineWidth = 2; c.stroke();
      // 托盘
      c.fillStyle = 'rgba(200,186,158,.95)';
      c.beginPath(); c.ellipse(34, -18, 26, 8, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(60,48,34,.8)'; c.lineWidth = 1.8; c.stroke();
      // 酒壶 + 脯
      c.fillStyle = 'rgba(178,142,74,.95)';
      c.beginPath(); c.ellipse(26, -32, 9, 8, 0, 0, Math.PI * 2); c.fill();
      c.fillStyle = 'rgba(150,110,60,.95)';
      c.beginPath(); c.ellipse(42, -26, 9, 5, .2, 0, Math.PI * 2); c.fill();
      c.restore();

      // 管辂（右下，遥指桑下）
      Z.guanlu(c, 1560, 950, 1.85, { t, fade: ss(0.4, 1.8, lt), raise: 0.5, yarrow: 1, gourd: 1 });

      Z.curtain(c, 96, 130, t, { seed: 63, a: .2 });
      Z.curtain(c, 1824, 130, t, { seed: 64, a: .2 });

      Z.bigText(c, '南斗添寿', { x: 980, y: 200, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(40,96,96,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '六十九回', ss(2.0, 2.8, lt), { size: 56, seed: 364 });
    },
  };
})();
