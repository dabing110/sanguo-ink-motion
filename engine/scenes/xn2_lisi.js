// ② 魏文帝得立为太子，抱辛毗项谓之曰：「辛君知我喜不？」毗以告宪英。
//    宪英叹曰：「太子，代君主宗庙社稷者也…宜戚而喜，何以能久！魏其不昌乎？」
//    画面：左侧曹丕搭着辛毗的肩（「抱项」写意），右侧宪英闻而摇头——一喜一叹，隔空对峙。
SCENES['xn2_lisi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('xn2', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'xn2_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 140, tone: 0.15, seed: 21 }, { y0: 620, amp: 94, tone: 0.24, seed: 23 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 5, alpha: 0.58, speed: 88, seed: 212 });
      Z.mist(c, t, { y0: 250, y1: 520, n: 4, alpha: 0.38, speed: 120, seed: 216 });
      Z.inkCloud(c, t, { y: 886, h: 28, n: 4, speed: 88, span: 1500, seed: 9, a: .2 });
      Z.inkCloud(c, t, { y: 480, h: 24, n: 3, speed: 116, span: 1300, seed: 19, a: .15 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 900]], { w: 14, tone: 0.78, dry: 0.74, seed: 218, head: .03, tail: .3 });
      Z.geese(c, t, { y: 200, x0: 2340, speed: 124, n: 5, seed: 27, scale: 0.78 });

      // 左：曹丕（得立之喜，手搭辛毗肩——「抱毗项」写意）
      const joy = ss(0.4, 1.8, lt);
      Z.weiOfficial(c, 470, 948, 2.05, t, { seed: 81, bow: 0.06 * joy, fade: ss(0.2, 1.4, lt) });
      Z.weiOfficial(c, 760, 952, 1.95, t, { flip: 1, seed: 83, fade: ss(0.3, 1.5, lt) });
      // 搭肩之臂（随喜意轻晃）
      c.save(); c.globalAlpha = clamp(joy);
      brush(c, [[470 + 52 * 2.05, 948 + (-78) * 2.05],
                [640, 948 - 150 * 2.0 - Math.sin(t * 3.2) * 6],
                [760 - 52 * 1.95, 952 + (-176) * 1.95]],
        { w: 15, tone: .45, dry: .5, seed: 1281, head: .1, tail: .2 });
      c.restore();
      // 喜意朱环（写意「喜」）
      c.save(); c.translate(470, 948 - 176 * 2.05); c.rotate(t * .6); c.globalAlpha = clamp(joy) * .55;
      for (let k = 0; k < 2; k++) {
        c.strokeStyle = `rgba(150,60,50,${.7 - k * .3})`; c.lineWidth = 2.4;
        c.beginPath();
        for (let a = 0; a < 6.3; a += .3) {
          const rr2 = 52 + k * 16 + Math.sin(a * 3 + t * 2 + k) * 7;
          const px = Math.cos(a) * rr2, py = Math.sin(a) * rr2 * .9;
          a ? c.lineTo(px, py) : c.moveTo(px, py);
        }
        c.closePath(); c.stroke();
      }
      c.restore();

      // 右：宪英闻而摇头（微侧身，不赞同）
      const sigh = ss(0.9, 2.8, lt);
      Z.xinshi(c, 1420 + Math.sin(t * .9) * 3, 950, 2.4,
        { t, fade: ss(0.35, 1.7, lt), scroll: 1, bow: -0.06 * sigh });

      Z.inkSmoke(c, 1420, 680, t, { seed: 11, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 73, a: .3 });
      Z.curtain(c, 1820, 132, t, { seed: 74, a: .3 });

      Z.bigText(c, '宜戚而喜', { x: 320, y: 458, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(150,50,40,.94)', shadow: { color: 'rgba(160,60,50,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '魏其不昌乎', { x: 350, y: 548, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(24,20,16,.92)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
