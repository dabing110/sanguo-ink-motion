// ④ 建安中，昂为参军事，徙居冀。会马超攻冀，异躬著布韝，佐昂守备。
//    画面：冀城城头，她束袖著臂鞲，在垛口之间来回——不是站在丈夫身后的女人，是守城的人之一。
//    ⚠ 4.4s 是全片最长的一幕，运动必须堆满：云梯、攀卒、箭雨、双炬、双墨云。
SCENES['wy4_shouji'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy4', '#e0dbc8');
  const WALL_TOP = 636;                                     // 城头顶面 y（cityWall 1.45 → 1070 - 300*1.45）
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy4_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 470, amp: 124, tone: 0.16, seed: 51 }, { y0: 620, amp: 86, tone: 0.25, seed: 53 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 360, y1: 660, n: 6, alpha: 0.62, speed: 96, seed: 412 });
      Z.mist(c, t, { y0: 220, y1: 500, n: 4, alpha: 0.42, speed: 128, seed: 416 });
      Z.inkCloud(c, t, { y: 452, h: 34, n: 5, speed: 96, span: 1500, seed: 9, a: .24 });
      Z.inkCloud(c, t, { y: 300, h: 26, n: 4, speed: 124, span: 1300, seed: 19, a: .18 });
      Z.geese(c, t, { y: 176, x0: 2420, speed: 132, n: 5, seed: 57, scale: .78 });

      // 冀城（居中偏右）
      Z.cityWall(c, 1030, 1070, 1.45, { a: ss(0.1, 1.5, lt), breach: 0.10 * ss(1.2, 3.0, lt), seed: 51 });

      // 守方旗「涼」（城头，飘动）
      Z.flag(c, 1560, WALL_TOP - 6, 300, t, { seed: 419, col: 'rgba(60,72,110,.8)', text: '涼' });

      // 马超军攻城（云梯＋攀卒＋馬字旗：主运动）
      Z.siege(c, 320, 700, 0.95, t, { a: ss(0.3, 1.8, lt) * 0.88, n: 6, climb: ss(0.5, 3.6, lt), seed: 21 });

      // 箭雨（自下而上，斜掠：小颗粒高频，补足帧差）
      for (let k = 0; k < 9; k++) {
        const q = (t * .55 + k / 9) % 1;
        const ax = 300 + k * 170 + Math.sin(t * .9 + k) * 12;
        const ay = 940 - q * 620;
        c.save(); c.globalAlpha = clamp(ss(0.4, 2.0, lt)) * (.35 + .5 * Math.sin(Math.PI * q));
        c.translate(ax, ay); c.rotate(-0.95 + Math.sin(t * 1.4 + k) * .06);
        brush(c, [[0, 0], [46, 0]], { w: 3, tone: .55, dry: .6, seed: 433 + k, col: [72, 60, 44] });
        c.restore();
      }

      // 城头守卒（来回奔走：持续位移）
      for (let k = 0; k < 4; k++) {
        const ph = (t * .2 + k * .27) % 1;
        const px = 470 + ((k % 2) ? (1 - ph) : ph) * 1080;
        const py = WALL_TOP + 4 + Math.sin(t * 3.2 + k) * 3;
        c.save(); c.globalAlpha = clamp(ss(0.5, 2.0, lt)) * .5;
        c.translate(px, py); c.scale(.62, .62);
        c.fillStyle = 'rgba(112,102,94,.82)';
        c.beginPath(); c.moveTo(-14, 0); c.quadraticCurveTo(-12, -32, 0, -42); c.quadraticCurveTo(13, -32, 15, 0); c.closePath(); c.fill();
        c.fillStyle = 'rgba(228,218,200,.92)';
        c.beginPath(); c.arc(0, -50, 7, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(84,72,58,.88)'; c.lineWidth = 2.6;
        c.beginPath(); c.moveTo(14, -36); c.lineTo(34, -92); c.stroke();
        c.restore();
      }

      // 炬火（主运动：城头两支，scale 拉大）
      Z.torch(c, 620, WALL_TOP + 2, 1.42, t, 31);
      Z.torch(c, 1450, WALL_TOP + 2, 1.55, t, 35);
      Z.campFire(c, 300, 946, 1.0, t, { alpha: .72, seed: 13 });
      Z.dust(c, t, { x: 620, y: 950, n: 7, seed: 39, scale: 1.8, alpha: 0.55 });
      Z.dust(c, t, { x: 1420, y: 950, n: 5, seed: 49, scale: 1.5, alpha: 0.45 });

      // 主动作：王异躬著布韝，在垛口之间来回（≈95px/s，远低于 150px/s 跳变红线）
      const wx = lerp(760, 1180, ease.inOut(clamp((lt - 0.4) / 3.2)));
      const gou = ss(0.3, 1.3, lt);
      const rs = 0.45 + 0.55 * Math.abs(Math.sin(t * 1.25));        // 抬手指挥，持续变化
      Z.wangyi(c, wx + Math.sin(t * .9) * 3, WALL_TOP + 6, 1.95,
        { t, fade: ss(0.2, 1.5, lt), gou, knife: 0, raise: rs * gou, bow: 0.04 });

      // 赵昂（城头右侧，按剑督战）
      Z.zhaoAng(c, 1520 + Math.sin(t * 1.1) * 3, WALL_TOP + 6, 1.8, t,
        { fade: ss(0.4, 1.8, lt), argue: 0.35, seed: 71 });

      Z.inkSmoke(c, wx, 470, t, { seed: 47, a: 0.28 });
      Z.inkSmoke(c, 400, 560, t, { seed: 48, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 79, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 80, a: .34 });

      Z.bigText(c, '马超攻冀', { x: 320, y: 444, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '躬著布韝 · 佐昂守备', { x: 330, y: 542, size: 44, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(58,84,110,.92)', shadow: { color: 'rgba(60,96,126,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
