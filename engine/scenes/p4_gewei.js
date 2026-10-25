// ④ 各为其主：超败奔汉中，德随至张鲁；后超入蜀，德留汉中——建安二十年，鲁降，德归于操。
// 兄庞柔在蜀，军中疑之。德曰：「我受国恩，义在效死。」
// 主动作：岔路口，马超南去（0.3→1.6s 渐远）→ 德驻马北望（1.2→2.4s）→ 下马向阙而拜（2.2→3.35s）
// 母题循环：岔路、云、尘。
SCENES['p4_gewei'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq4', '#e9e1ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'pq4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 446, amp: 142, tone: 0.22, seed: 1051.5 },
          { y0: 552, amp: 92, tone: 0.32, seed: 1055.9 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.46, speed: 44, seed: 1053 });
      Z.yunHai(c, t, { y: 690, h: 90, n: 4, speed: 56, alpha: 0.42 });
      brush(c, [[0, 914], [640, 902], [1280, 916], [1920, 900]], { w: 14, tone: 0.78, dry: 0.75, seed: 1057, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 14, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 44, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 15, a: 0.3 });

      // 岔路（两条路：向左南 / 向右北）
      c.save(); c.globalAlpha = 0.7;
      c.strokeStyle = 'rgba(120,100,72,.55)'; c.lineWidth = 22; c.lineCap = 'round';
      c.beginPath(); c.moveTo(960, 940); c.quadraticCurveTo(700, 980, 420, 1010); c.stroke();   // 南去
      c.beginPath(); c.moveTo(960, 940); c.quadraticCurveTo(1220, 970, 1500, 1000); c.stroke(); // 北去
      c.restore();

      // 主动作一：马超南去（渐远渐淡——用青旗与马影示意）
      const away = ss(0.3, 1.6, lt);
      c.save(); c.globalAlpha = 0.8 - away * 0.65;
      Z.horse(c, lerp(880, 560, away), 906, 0.9 - away * 0.25, t * 6, { tone: 0.8, gallop: 1, flip: 0 });
      Z.flag(c, 880 - away * 200, 700 - away * 40, 90 - away * 25, t, { seed: 1059, col: 'rgba(120,96,60,.7)', text: '马' });
      c.restore();

      // 主动作二：德驻马北望（白马居中偏右，面北）
      const stop = ss(1.2, 2.4, lt);
      const px = 1180;
      c.save();
      Z.baiMa(c, px, 930, 1.4, t * 6 * (1 - stop * 0.8), { gallop: 1, blanket: 1 });
      c.restore();
      c.save(); c.translate(px - 8, 930 - 166); c.rotate(Math.sin(t * 6) * 0.02 * (1 - stop));
      Z.pangDe(c, 0, 56, 1.25, { t, raise: stop * 0.3, stance: t * (1.4 - stop), flip: 0, bow: 0 });
      c.restore();

      // 主动作三：下马向阙而拜（德于马前躬身——拜的只是「受国恩」三个字）
      const bow = ss(2.2, 3.35, lt);
      if (bow > 0) {
        c.save(); c.globalAlpha = clamp(bow * 1.4);
        c.save(); c.translate(1020, 966); c.rotate(bow * 0.4);
        Z.pangDe(c, 0, 0, 1.15, { t: t * 0.4, raise: 0, stance: 0, flip: 1, bow: 0, captive: 0 });
        c.restore();
        // 拱手
        c.strokeStyle = 'rgba(56,58,68,.85)'; c.lineWidth = 12; c.lineCap = 'round';
        c.beginPath(); c.moveTo(1020 + 26, 966 - 96); c.quadraticCurveTo(1020 + 8, 966 - 78, 1020 - 6, 966 - 86); c.stroke();
        c.restore();
      }

      Z.dust(c, t, { x: 760, y: 952, n: 5, seed: 1061, scale: 1.2, alpha: 0.26 });
      Z.bigText(c, '各为其主', { x: 960, y: 280, size: 80, gap: 18, appear: ss(2.05, 2.75, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '归魏', ss(2.3, 2.65, lt), { size: 86, seed: 1063 });
    },
  };
})();
