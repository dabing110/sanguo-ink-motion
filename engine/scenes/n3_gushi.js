// ③ 鼓史之辱：操录衡为鼓史，欲以贱役辱之。十月朝会，大宴宾客，鼓史十五人皆就位。
// 主动作：鼓史列队就位（0.3→1.6s）→ 衡最后入列、立于队首（1.2→2.4s）→ 众目聚光（2.0→2.95s）
// 母题循环：烛、旌旗、尘。
SCENES['n3_gushi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq3', '#e9e2cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'nq3_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(80,72,58,.12)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 380, y1: 680, n: 3, alpha: 0.32, speed: 30, seed: 841 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.76, dry: 0.75, seed: 843, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 19, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 49, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 10, a: 0.3 });

      // 朝会大殿（柱与帷幕）
      c.fillStyle = 'rgba(150,120,80,.4)';
      c.fillRect(120, 200, 70, 718); c.fillRect(1730, 200, 70, 718);
      c.strokeStyle = 'rgba(56,44,32,.85)'; c.lineWidth = 3;
      c.strokeRect(120, 200, 70, 718); c.strokeRect(1730, 200, 70, 718);

      // 三面建鼓（列位）
      c.save(); c.globalAlpha = 0.95;
      Z.jianGu(c, 560, 916, 1.05, t, { seed: 2 });
      Z.jianGu(c, 1180, 916, 1.05, t, { seed: 5 });
      Z.jianGu(c, 1660, 916, 0.95, t, { seed: 8 });
      c.restore();

      // 鼓史列队（矮影，就位）
      const line = ss(0.3, 1.6, lt);
      c.save(); c.globalAlpha = 0.85;
      [480, 640, 1100, 1260].forEach((bx, k) => {
        const px = lerp(lerp(200, bx, line), bx, 1);
        c.save(); c.translate(px, 948); c.rotate(Math.sin(t * 1.5 + k) * 0.015);
        c.fillStyle = 'rgba(88,80,68,.55)';
        c.beginPath(); c.moveTo(-18, 0); c.quadraticCurveTo(-22, -66, -16, -100); c.quadraticCurveTo(0, -110, 16, -100); c.quadraticCurveTo(22, -66, 18, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -122, 10, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();

      // 主动作二：衡最后入列（自左入，至队首立定，仰首）
      const come = ss(1.2, 2.4, lt);                         // 460px / 1.2s ≈ 383px/s
      const px = lerp(60, 880, come);
      Z.miHeng(c, px, 966, 2.5, { t, raise: ss(2.2, 2.95, lt) * 0.25, stance: t * 1.6, flip: 0, drum: 0 });

      // 曹操观礼（高台剪影）
      c.save(); c.globalAlpha = 0.9;
      Z.leader(c, 300, 700, 1.7, { t, raise: 0, stance: t * 0.8, flip: 1, cape: 1 });
      c.restore();

      Z.dust(c, t, { x: 1000, y: 958, n: 5, seed: 845, scale: 1.2, alpha: 0.24 });
      Z.bigText(c, '录为鼓史', { x: 1000, y: 286, size: 78, gap: 16, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '贱役', ss(2.25, 2.6, lt), { size: 86, seed: 847 });
    },
  };
})();
