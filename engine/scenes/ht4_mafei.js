// ④ 「若病结积在内，针药所不能及，当须刳割者，便饮其麻沸散，须臾便如醉死无所知，因破取。」
//    世界外科麻醉之始（正史）。画面只写意：卧榻、覆被、刀光一线、曼陀罗、药气——不画脏腑血肉。
SCENES['ht4_mafei'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht4', '#e2dece');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'ht4_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 1980, [{ y0: 500, amp: 120, tone: 0.14, seed: 43 }, { y0: 640, amp: 84, tone: 0.22, seed: 45 }]);
      }, { blur: 5, halo: 20, haloA: 0.24 });

      // ⚠ 运动量是硬指标：qa 按相邻帧差 >12 灰阶判定，淡墨少了就量不出运动（g6 踩过一次）
      Z.mist(c, t, { y0: 380, y1: 720, n: 6, alpha: 0.62, speed: 96, seed: 412 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 416 });
      Z.inkCloud(c, t, { y: 880, h: 32, n: 5, speed: 96, span: 1500, seed: 6, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 16, a: .18 });
      Z.geese(c, t, { y: 196, x0: 2380, speed: 132, n: 5, seed: 67, scale: 0.8 });

      // 卧榻（横向，写意木榻）
      const bed = ss(0.3, 1.8, lt);
      c.save(); c.globalAlpha = clamp(bed);
      c.fillStyle = 'rgba(122,98,66,.9)';
      c.beginPath(); c.moveTo(320, 880); c.lineTo(1660, 872); c.lineTo(1640, 820); c.lineTo(340, 828); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(40,30,20,.9)'; c.lineWidth = 3; c.stroke();
      c.fillStyle = 'rgba(84,66,44,.92)';
      c.fillRect(360, 880, 34, 74); c.fillRect(1590, 872, 34, 74);
      c.restore();

      // 病人：覆被横卧，露头与左臂（呼吸起伏）
      const pat = ss(0.5, 2.0, lt);
      const brth = Math.sin(t * 1.2) * 4;
      c.save(); c.globalAlpha = clamp(pat); c.translate(0, brth * .3);
      c.fillStyle = 'rgba(238,234,224,.92)';
      c.beginPath();
      c.moveTo(430, 830); c.quadraticCurveTo(700, 790 + brth, 1080, 812 + brth);
      c.quadraticCurveTo(1400, 832, 1580, 826);
      c.quadraticCurveTo(1600, 862, 1580, 874); c.lineTo(430, 872); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(60,52,44,.8)'; c.lineWidth = 2.6; c.stroke();
      // 头（枕上，闭目）
      c.save(); c.translate(400, 806);
      c.fillStyle = 'rgba(240,228,206,.97)';
      c.beginPath(); c.ellipse(0, 0, 24, 25, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 2.4; c.stroke();
      c.strokeStyle = 'rgba(40,34,28,.85)'; c.lineWidth = 2.2; c.lineCap = 'round';
      c.beginPath(); c.moveTo(-10, 0); c.lineTo(-2, 0); c.stroke();
      c.beginPath(); c.moveTo(4, 0); c.lineTo(12, 0); c.stroke();
      // 散发
      brush(c, [[-20, -8], [-30, 16], [-24, 34]], { w: 7, tone: .6, dry: .7, seed: 421, tail: .7, bristles: 4 });
      c.restore();
      // 伸出的一臂
      brush(c, [[1080, 800], [1240, 786], [1380, 796]], { w: 15, tone: .45, dry: .5, seed: 422, head: .1, tail: .2 });
      c.restore();

      // 药碗（麻沸散：酒一盏）——置于榻头小几
      const bowl = ss(0.7, 2.2, lt);
      c.save(); c.globalAlpha = clamp(bowl); c.translate(290, 850);
      c.fillStyle = 'rgba(150,138,116,.95)';
      c.beginPath(); c.moveTo(-52, 0); c.quadraticCurveTo(-40, 40, 0, 46); c.quadraticCurveTo(40, 40, 52, 0); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(52,44,34,.9)'; c.lineWidth = 2.6; c.stroke();
      c.fillStyle = 'rgba(120,96,60,.75)';
      c.beginPath(); c.ellipse(0, 2, 50, 11, 0, 0, Math.PI * 2); c.fill();
      c.restore();
      Z.steam(c, 290, 826, t, { n: 4, a: bowl * .85, seed: 47, h: 190 });
      // 麻沸散药气（自病人口鼻升起，主运动）
      Z.steam(c, 470, 800, t, { n: 4, a: ss(0.8, 2.4, lt) * .8, seed: 57, h: 250 });

      // 主动作：华佗俯身，右手持刀（刀光一线，随刮动起伏）
      const cu = ss(1.0, 2.8, lt);
      const scrape = Math.sin(t * 3.4) * 18;
      Z.huatuo(c, 1330 + Math.sin(t * 2.1) * 4, 930, 2.0, { t, fade: ss(0.35, 1.7, lt), raise: .35 + .3 * cu, needle: 0, bag: 0 });
      // 刀（细刃，寒光；刮动幅度够大才量得出运动）
      c.save(); c.globalAlpha = clamp(cu); c.translate(1330 + 56 * 2.0, 930 + (-154 - 48 * .5) * 2.0);
      c.rotate(-.5 + Math.sin(t * 3.4) * .12);
      brush(c, [[0, 0], [10, -30]], { w: 6, tone: .6, dry: .4, seed: 1291, col: [92, 78, 58] });
      c.strokeStyle = 'rgba(248,250,252,.96)'; c.lineWidth = 4; c.lineCap = 'round';
      c.beginPath(); c.moveTo(10, -30); c.lineTo(26 + scrape * .3, -74); c.stroke();
      c.strokeStyle = 'rgba(70,78,92,.5)'; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(10, -30); c.lineTo(26 + scrape * .3, -74); c.stroke();
      c.restore();

      // 曼陀罗（前景左下，麻沸散之药）
      Z.herb(c, 210, 985, 1.35, ss(0.6, 2.0, lt));
      Z.herb(c, 296, 1006, 1.05, ss(0.9, 2.3, lt));

      // 烛火（榻前，跳动）
      Z.torch(c, 1720, 862, 1.55, t, 3);
      Z.torch(c, 250, 872, 1.3, t, 9);
      Z.inkSmoke(c, 1620, 700, t, { seed: 9, a: 0.34 });
      Z.inkSmoke(c, 360, 720, t, { seed: 21, a: 0.3 });

      Z.curtain(c, 100, 132, t, { seed: 77, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 78, a: .34 });

      Z.bigText(c, '麻沸散', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(46,86,86,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '如醉死无所知', { x: 350, y: 546, size: 42, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(24,20,16,.9)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
