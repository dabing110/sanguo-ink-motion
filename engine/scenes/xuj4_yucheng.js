// ④ 逾城：刘备围成都，靖窃欲逾城出降。围城之夜，城头欲下。
// 主动作：许靖自城头现身（0.4→1.6s）→ 俯瞰/欲缒城（1.4→2.6s）；母题：夜城、星、月、绳。
SCENES['xuj4_yucheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xj4', '#d9d2bd');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'xj4_bg', 0.35 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(40,46,60,.22)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2050, [{ y0: 470, amp: 130, tone: 0.16, seed: 71 }]);
      }, { blur: 4, halo: 18, haloA: 0.2 });
      // 月
      c.save(); c.globalCompositeOperation = 'lighter';
      const mg = c.createRadialGradient(1560, 210, 4, 1560, 210, 70);
      mg.addColorStop(0, 'rgba(255,246,210,.7)'); mg.addColorStop(1, 'rgba(255,240,200,0)');
      c.fillStyle = mg; c.beginPath(); c.arc(1560, 210, 70, 0, Math.PI * 2); c.fill(); c.restore();
      // 星
      const r = rng(42);
      for (let i = 0; i < 26; i++) {
        const x = r() * W, y = r() * 500;
        c.fillStyle = `rgba(255,250,230,${0.2 + 0.4 * r()})`;
        c.beginPath(); c.arc(x, y, 1.5 + r() * 1.2, 0, Math.PI * 2); c.fill();
      }
      // 成都城垣（夜）
      Z.wall(c, 760, 940, 1.25, t, { flag: 0 });
      // 缒城之绳
      brush(c, [[860, 690], [864, 940]], { w: 3, tone: 0.7, dry: 0.5, seed: 81 });
      // 许靖 立于城头，现身 → 俯瞰欲下
      const appear = ease.out(ss(0.4, 1.6, lt));
      const x = lerp(520, 700, appear), y = 700, s = lerp(1.4, 2.0, appear);
      const raise = ss(1.4, 2.6, lt);
      c.save(); c.globalAlpha = clamp(appear);
      Z.xujing(c, x, y, s, { t, raise, whisk: 1, flip: 1 });
      c.restore();
      Z.seal(c, 1762, 952, '文休', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
