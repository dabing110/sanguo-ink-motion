// ⑥ 南囚江陵：羽囚禁于江陵，权破羽后获禁，系之于吴——乘马无鞍，虞翻当面折辱之。
// 主动作：江舟东下（全程缓移）→ 禁坐船头、抬首望天（0.6→2.4s）→ 抚膝垂首（2.2→2.95s）
// 母题循环：江水、雁阵、舟旗、水鸟。
SCENES['y6_jiangling'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj6', '#e8e2cd');

  // 江舟（body 随波轻摇）
  const boat = (c, x, y, s, t, o = {}) => {
    const { seed = 5 } = o;
    c.save(); c.translate(x, y); c.scale(s, s);
    c.rotate(Math.sin(t * 1.1 + seed) * 0.02);
    c.fillStyle = 'rgba(140,112,72,.6)';
    c.beginPath(); c.moveTo(-230, -40); c.quadraticCurveTo(0, 26, 230, -40); c.lineTo(196, -68); c.quadraticCurveTo(0, -10, -196, -68); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(52,40,28,.85)'; c.lineWidth = 3.2; c.stroke();
    brush(c, [[-90, -66], [-70, -150], [-58, -176]], { w: 9, tone: 0.85, dry: 0.4, seed: 610 });
    // 帆（斜挂）
    c.fillStyle = 'rgba(232,220,192,.78)';
    c.beginPath(); c.moveTo(-58, -168); c.quadraticCurveTo(58, -140, 66, -60); c.lineTo(-52, -66); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(56,46,34,.8)'; c.lineWidth = 2.6; c.stroke();
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'yj6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 122, tone: 0.2, seed: 161.4 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.5, speed: 50, seed: 163 });
      Z.geese(c, t, { y: 250, x0: 1980, speed: 150, n: 5, seed: 33, scale: 1 });

      // 主动作一：江舟东下（全程匀速缓移，220px / 3s ≈ 73px/s）
      const bx = lerp(1180, 960, lt / 3.0);
      const by = 810 + Math.sin(t * 1.1) * 5;
      Z.water(c, t, { y0: 700, y1: 1040, tone: 0.34, seed: 167, rows: 9 });

      // 舟
      boat(c, bx, by, 1.05, t);

      // 主动作二：禁坐船头，抬首望天 → 垂首
      const up = ss(0.6, 2.4, lt), down = ss(2.2, 2.95, lt);
      c.save(); c.translate(bx + 120, by - 40); c.rotate(Math.sin(t * 1.1) * 0.02);
      c.translate(0, lerp(6, -4, up) + down * 8);
      c.save(); c.translate(0, lerp(0, -12, up)); c.rotate(lerp(0.34, 0.06, up) + down * 0.3);  // 躬坐
      // 躯干（坐姿）
      c.fillStyle = 'rgba(150,140,116,.6)';
      c.beginPath(); c.moveTo(-30, 0); c.lineTo(-26, -96); c.quadraticCurveTo(0, -110, 24, -98); c.lineTo(30, 0); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 3; c.stroke();
      brush(c, [[-30, -4], [0, 2], [30, -4]], { w: 14, col: [100, 76, 44], tone: 0.9, dry: 0.35, seed: 620 });
      // 头（望天 → 垂首）
      const hy = lerp(-120, -108, up) - lerp(0, 12, up) * 0 + down * 16;
      const ha = lerp(-0.5, 0.1, up) + down * 0.5;
      c.save(); c.translate(6, hy); c.rotate(ha);
      c.fillStyle = 'rgba(244,236,218,.95)'; c.beginPath(); c.ellipse(0, 0, 16, 18, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(22,20,18,.86)'; c.lineWidth = 2.2; c.stroke();
      c.fillStyle = 'rgba(88,82,72,.92)'; c.beginPath(); c.ellipse(0, -9, 17, 8, 0, Math.PI, 0); c.fill();
      // 须（短须）
      c.strokeStyle = 'rgba(36,32,28,.85)'; c.lineWidth = 2.6; c.lineCap = 'round';
      [[-7, 8, -10, 22], [0, 10, 0, 26], [7, 8, 10, 22]].forEach(([x1, y1, x2, y2]) => {
        c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + 3, x2, y2); c.stroke();
      });
      c.restore();
      // 抚膝的手
      brush(c, [[26, -84], [44, -48], [38, -6]], { w: 12, tone: 0.72, dry: 0.5, seed: 621 });
      c.restore(); c.restore();

      // 吴旗（岸上远远一面）
      c.save(); c.globalAlpha = 0.55;
      Z.flag(c, 300, 640, 150, t, { seed: 169, col: 'rgba(90,60,90,.75)', text: '吴' });
      c.restore();
      Z.dust(c, t, { x: 1600, y: 1010, n: 4, seed: 171, scale: 0.9, alpha: 0.18 });
      Z.seal(c, 250, 948, '南囚', ss(2.25, 2.6, lt), { size: 86, seed: 173 });
    },
  };
})();
