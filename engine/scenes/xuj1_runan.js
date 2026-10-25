// ① 汝南许靖：汝南平舆人，与从弟许劭俱知名，好共核论乡党人物（月旦评之先声）。
// 主动作：许靖执麈尾立论（0.4→2.4s），许劭对坐颔首；母题：远山、松、雁。
SCENES['xuj1_runan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj1', '#e8e0c6');
  // 简笔名士同伴（许劭）：浅袍、颔首
  const companion = (c, x, y, s, t, nod) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(120,124,120,.5)';
    c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-30, -82, -22, -120); c.quadraticCurveTo(0, -132, 22, -120); c.quadraticCurveTo(30, -82, 26, 0); c.closePath(); c.fill();
    c.save(); c.translate(0, -146); c.rotate(nod * 0.06);
    c.fillStyle = 'rgba(246,238,220,.96)'; c.beginPath(); c.arc(0, 0, 15, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.9)'; c.lineWidth = 2; c.stroke();
    c.restore(); c.restore();
  };
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'xj1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 470, amp: 140, tone: 0.20, seed: 12.4 },
          { y0: 548, amp: 96, tone: 0.30, seed: 17.9 },
          { y0: 606, amp: 62, tone: 0.40, seed: 23.3 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 260, y1: 560, n: 4, alpha: 0.5, speed: 60, seed: 3 });
      // 松
      Z.pine(c, t, { x: 1480, y: 760, s: 1.15, seed: 5 });
      Z.pine(c, t, { x: 320, y: 800, s: 0.9, seed: 8 });
      // 坡地
      brush(c, [[0, 820], [480, 800], [980, 820], [1480, 802], [1920, 816]], { w: 16, tone: 0.84, dry: 0.72, seed: 11, head: 0.04, tail: 0.34, reveal: ss(0, 0.35, lt) });
      // 雁
      Z.geese(c, t, { y: 230, x0: 2100, speed: 120, n: 3, seed: 9, scale: 1.0 });
      // 许劭（右，对坐颔首）
      const nod = ss(1.4, 2.6, lt);
      companion(c, 1320, 940, 2.3, t, nod);
      // 许靖（左，执麈尾立论）
      const in_ = ease.out(ss(0, 1.0, lt));
      const x = lerp(360, 720, in_), y = 946, s = lerp(1.4, 2.3, in_);
      const raise = ss(0.4, 2.4, lt);
      c.save(); c.globalAlpha = clamp(in_ * 1.2);
      Z.xujing(c, x, y, s, { t, raise, whisk: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
