// ⑤ 堤上拒战：建安二十四年秋，天霖雨十余日，汉水暴溢，樊下平地五六丈。
// 德与诸将避水上堤。羽乘大船，四面射堤。德被甲持弓，箭不虚发。
// 将军董衡、部曲将董超等欲降，德皆收斩之。自平旦力战至日过中，矢尽，短兵接战。
// 主动作：水漫堤坡（0→2.75s 缓升）＋ 楼船逼堤（0.35→1.55s）＋ 拉弓放箭循环（0.75→2.8s，每 0.62s 一箭）
// 母题循环：暴雨、汉水、欲降之旄（倒）。全片唯一无马的一幕——马已陷水，正是死地。
SCENES['p5_dizhan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq5', '#e2dccc');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const rise = ss(0.0, 2.75, lt);                 // 水位 0→1
      const wy = lerp(1042, 900, rise);               // 水面 y（涨到堤腰，堤脊仍露）
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'pq5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 424, amp: 128, tone: 0.18, seed: 1071.5 },
          { y0: 538, amp: 84, tone: 0.28, seed: 1075.9 },
        ]);
      }, { blur: 4.5, halo: 16, haloA: 0.18 });
      // 铅云压顶（雨云走得快）
      Z.yunHai(c, t * 1.6, { y: 296, h: 132, n: 5, speed: 104, alpha: 0.5 });

      // 堤（横贯，脊线左 806 右 788）
      c.fillStyle = 'rgba(128,112,86,.6)';
      c.beginPath(); c.moveTo(0, 814);
      c.quadraticCurveTo(640, 792, 1280, 800);
      c.quadraticCurveTo(1600, 804, 1920, 788);
      c.lineTo(1920, 1080); c.lineTo(0, 1080); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(56,48,38,.75)'; c.lineWidth = 4.5;
      c.beginPath(); c.moveTo(0, 814);
      c.quadraticCurveTo(640, 792, 1280, 800);
      c.quadraticCurveTo(1600, 804, 1920, 788);
      c.stroke();
      brush(c, [[0, 856], [520, 838], [1120, 846], [1920, 832]], { w: 9, tone: 0.7, dry: 0.8, seed: 1072, head: 0.03, tail: 0.4 });

      // 汉水（漫堤）
      Z.diShang(c, t, rise, { y: wy });

      // 关羽楼船逼堤（自右驶入）
      const sail = ss(0.35, 1.55, lt);
      const shipX = lerp(1840, 1400, sail), shipY = wy + 10;
      c.save(); c.globalAlpha = 0.92;
      Z.guanChuan(c, shipX, shipY, 1.0, t);
      c.restore();

      // 羽军四面射堤（箭雨自船向左下）
      c.save();
      for (let k = 0; k < 7; k++) {
        const ph = (t * 0.95 + k * 0.143) % 1;
        const ax = lerp(shipX + 40, 620 + k * 42, ph);
        const ay = lerp(shipY - 140, 792, ph);
        c.globalAlpha = 0.82 * (1 - ph * 0.45);
        c.strokeStyle = 'rgba(54,42,30,.92)'; c.lineWidth = 3; c.lineCap = 'round';
        c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + 34, ay - 20); c.stroke();
      }
      c.restore();

      // 庞德：被甲持弓，箭不虚发
      const px = 880;
      const ph = lt > 0.75 ? ((lt - 0.75) % 0.62) / 0.62 : 0;
      const draw = ph < 0.7 ? ease.out(ph / 0.7) : (ph < 0.85 ? 1 - (ph - 0.7) / 0.15 : 0);
      Z.pangDe(c, px, 812, 1.4, { t, raise: 0.28 + draw * 0.3, stance: t * 1.1, flip: 0, bow: 1, draw, captive: 0 });
      // 离弦之箭（射向楼船）
      if (ph >= 0.72 && ph < 0.98) {
        const fp = (ph - 0.72) / 0.26;
        const ax = lerp(px + 40, shipX - 120, fp);
        const ay = lerp(812 - 226, shipY - 168, fp) + Math.sin(fp * Math.PI) * 34;
        c.save();
        c.strokeStyle = 'rgba(56,44,32,.95)'; c.lineWidth = 3.4; c.lineCap = 'round';
        c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax - 40, ay + 22); c.stroke();
        c.fillStyle = 'rgba(176,44,36,.9)';
        c.beginPath(); c.moveTo(ax - 48, ay + 27); c.lineTo(ax - 32, ay + 19); c.lineTo(ax - 34, ay + 33); c.closePath(); c.fill();
        c.restore();
      }

      // 欲降者：二旄先立后倒（收斩之意，不写血）
      const fdown = ss(1.65, 2.45, lt);
      [[1640, '董'], [1730, '董']].forEach(([fx, ch], k) => {
        c.save(); c.globalAlpha = 1 - fdown * 0.72;
        Z.flag(c, fx, 690 - k * 14, 150, t, { seed: 1085 + k, col: 'rgba(150,104,48,.8)', text: ch, droop: fdown });
        c.restore();
      });
      if (fdown > 0.12) {                             // 一记墨扫：令出即行
        c.save(); c.globalAlpha = clamp(fdown * 1.3);
        brush(c, [[1570, 740], [1700, 726], [1800, 736]], { w: 16, tone: 0.32, dry: 0.75, seed: 1088, tail: 0.8, bristles: 4 });
        c.restore();
      }

      // 暴雨（压在最上层，贯穿全幕）
      Z.pRain(c, t, { n: 118, alpha: 0.34 + rise * 0.06, seed: 1077, y1: 1000 });

      Z.bigText(c, '堤上拒战', { x: 940, y: 292, size: 78, gap: 18, appear: ss(1.85, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 246, 700, '箭不虚发', ss(2.05, 2.4, lt), { size: 86, seed: 1079 });
    },
  };
})();
