// ③ 白马将军：后德随张鲁归太祖，常乘白马——樊城之下，羽军望见白马，便知庞德来了。
// 主动作：白马长驰（0.3→2.2s 全景横驰，体感但不超速）→ 停缰立定（1.9→2.75s）→ 羽军望而改色（2.0→2.95s 后仰）
// 母题循环：白马、旌旗、尘。
SCENES['p3_baima'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq3', '#e9e2cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'pq3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 462, amp: 118, tone: 0.22, seed: 1031.5 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 330, y1: 640, n: 4, alpha: 0.46, speed: 44, seed: 1033 });
      brush(c, [[0, 914], [640, 902], [1280, 916], [1920, 900]], { w: 14, tone: 0.78, dry: 0.75, seed: 1035, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 28, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 58, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 9, a: 0.3 });

      // 樊城（远景轮廓）
      c.save(); c.globalAlpha = 0.7;
      c.fillStyle = 'rgba(160,144,114,.5)';
      c.fillRect(200, 560, 340, 160); c.fillRect(600, 600, 240, 120);
      c.strokeStyle = 'rgba(58,48,38,.75)'; c.lineWidth = 3;
      c.strokeRect(200, 560, 340, 160); c.strokeRect(600, 600, 240, 120);
      c.restore();

      // 主动作一：白马长驰（620px / 1.9s ≈ 326px/s）
      const ride = ss(0.3, 2.2, lt);
      const px = lerp(520, 1140, ride);
      const stop = ss(1.9, 2.75, lt);
      c.save();
      Z.baiMa(c, px, 944, 1.55, t * 9 * (1 - stop * 0.85), { gallop: 1, blanket: 1 });
      c.restore();
      c.save(); c.translate(px - 10, 944 - 182); c.rotate(Math.sin(t * 9) * 0.03 * (1 - stop));
      Z.pangDe(c, 0, 62, 1.35, { t, raise: stop * 0.3, stance: t * (1.5 - stop), flip: 0, bow: 0 });
      c.restore();
      Z.dust(c, t, { x: px - 140, y: 948, n: 7, seed: 1037, scale: 1.5, alpha: 0.34 * (1 - stop * 0.6) });

      // 主动作二：羽军望而改色（右侧三卒后仰 + 交语）
      c.save(); c.globalAlpha = 0.85;
      [1420, 1560, 1700].forEach((bx, k) => {
        c.save(); c.translate(bx, 950); c.rotate(-0.12 + Math.sin(t * 2 + k) * 0.025);
        c.fillStyle = 'rgba(70,66,58,.6)';
        c.beginPath(); c.moveTo(-22, 0); c.quadraticCurveTo(-28, -74, -20, -112); c.quadraticCurveTo(0, -124, 20, -112); c.quadraticCurveTo(28, -74, 22, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -136, 11, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();
      // 羽军大旗（青）
      Z.flag(c, 1320, 640, 150, t, { seed: 1039, col: 'rgba(56,92,80,.82)', text: '关' });

      Z.bigText(c, '白马将军', { x: 960, y: 286, size: 82, gap: 18, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '威震', ss(2.25, 2.6, lt), { size: 86, seed: 1041 });
    },
  };
})();
