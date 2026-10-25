// ⑦ 骂座：祖大会宾客，衡出言不逊，祖呵之。衡直视曰：「死公！云等道。」——当众把州将骂作死人。
// 主动作：宾主满座（常驻）→ 衡掷杯而起（0.8→1.8s）→ 直指而骂（1.6→2.7s）→ 祖拍案怒起（2.2→3.35s）
// 母题循环：酒旗、烛、尘。
SCENES['n7_mazuo'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq7', '#eae1c7');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'nq7_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(92,62,44,.14)'; g.fillRect(0, 0, 1920, 1080);   // 酒宴暖光
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 400, y1: 700, n: 3, alpha: 0.32, speed: 30, seed: 931 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.76, dry: 0.75, seed: 933, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 26, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 56, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 7, a: 0.3 });

      // 酒旗（常驻摆）
      Z.flag(c, 240, 640, 150, t, { seed: 935, col: 'rgba(164,84,48,.8)', text: '酒' });

      // 长案（居中，酒器）
      c.fillStyle = 'rgba(132,100,62,.85)'; c.fillRect(700, 830, 700, 30);
      c.strokeStyle = 'rgba(52,40,28,.9)'; c.lineWidth = 3; c.strokeRect(700, 830, 700, 30);
      brush(c, [[760, 860], [760, 916]], { w: 14, tone: 0.75, dry: 0.5, seed: 937 });
      brush(c, [[1340, 860], [1340, 916]], { w: 14, tone: 0.75, dry: 0.5, seed: 939 });
      // 尊与觞
      c.fillStyle = 'rgba(160,120,72,.9)';
      c.beginPath(); c.ellipse(900, 812, 30, 14, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(60,42,26,.85)'; c.lineWidth = 2.4; c.stroke();
      c.beginPath(); c.ellipse(1120, 814, 24, 11, 0, 0, Math.PI * 2); c.fill(); c.stroke();

      // 主动作一：掷杯而起（杯自案上弹起落地）
      const rise = ss(0.8, 1.8, lt);
      if (rise > 0) {
        const jy = 806 - Math.sin(clamp(rise * 1.4) * Math.PI) * 110;
        c.save(); c.translate(lerp(1120, 1090, rise), jy + rise * 120); c.rotate(rise * 2.2);
        c.fillStyle = 'rgba(196,150,92,.92)'; c.beginPath(); c.ellipse(0, 0, 22, 10, 0, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(60,42,26,.85)'; c.lineWidth = 2.2; c.stroke();
        c.restore();
      }
      Z.miHeng(c, lerp(940, 980, rise), lerp(950, 962, rise), 2.55, { t, raise: ss(1.6, 2.7, lt) * 0.5, stance: t * 1.6, flip: 0 });

      // 主动作二：直指而骂（指尖直指主位）
      const point = ss(1.6, 2.7, lt);
      if (point > 0) {
        c.save(); c.globalAlpha = clamp(point * 1.5);
        c.strokeStyle = 'rgba(64,56,48,.85)'; c.lineWidth = 14; c.lineCap = 'round';
        c.beginPath(); c.moveTo(1040, 830); c.quadraticCurveTo(1180, 760, 1300, 700 - point * 20); c.stroke();
        c.fillStyle = 'rgba(240,232,214,.92)'; c.beginPath(); c.arc(1304, 698 - point * 20, 7, 0, Math.PI * 2); c.fill();
        c.restore();
      }

      // 主位黄祖（右，拍案怒起）
      const rage = ss(2.2, 3.35, lt);
      c.save(); c.translate(0, -rage * 10); c.rotate(-rage * 0.05);
      Z.leader(c, 1480, 946, 2.5, { t, raise: rage * 0.6, stance: t * 1.2, flip: 1, cape: 1 });
      c.restore();

      // 宾客侧首（避嫌）
      c.save(); c.globalAlpha = 0.75;
      [[380, 950], [540, 940]].forEach(([bx, by], k) => {
        c.save(); c.translate(bx, by); c.rotate(-0.1 - Math.sin(t * 1.7 + k) * 0.02);
        c.fillStyle = 'rgba(88,80,68,.5)';
        c.beginPath(); c.moveTo(-20, 0); c.quadraticCurveTo(-24, -66, -16, -100); c.quadraticCurveTo(0, -112, 16, -100); c.quadraticCurveTo(24, -66, 20, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -122, 10, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();
      Z.dust(c, t, { x: 1200, y: 958, n: 5, seed: 941, scale: 1.3, alpha: 0.26 });

      Z.bigText(c, '死公云等道', { x: 960, y: 282, size: 76, gap: 18, appear: ss(2.15, 2.85, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '骂座', ss(2.4, 2.75, lt), { size: 86, seed: 943 });
    },
  };
})();
