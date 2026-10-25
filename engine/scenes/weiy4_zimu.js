// ④ 子午奇谋：北伐每请兵万人，与亮异道会潼关。
// 主动作：魏延俯身指图、献策（0.6→2.2s 落指）；母题循环：云气、帐前火、江关远影。
SCENES['weiy4_zimu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('wy_paper', '#e9e0c8');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.3, lt);
      Z.wash(c, 'wy4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -40, 2100, [
          { y0: 460, amp: 160, tone: 0.20, seed: 51.3 },
          { y0: 540, amp: 110, tone: 0.30, seed: 47.8 },
        ]);
      }, { blur: 3, halo: 16, haloA: 0.24 });
      Z.mist(c, t, { y0: 240, y1: 540, n: 3, alpha: 0.45, speed: 64, seed: 5 });
      // 营帐（连营母题）
      Z.yingLei(c, 300, 880, 0.9, t, { n: 3, alpha: 0.7, seed: 40 });
      // 军帐火光（循环）
      const fr = rng(60);
      for (let k = 0; k < 3; k++) {
        const fx = 240 + k * 150, fy = 866;
        c.fillStyle = `rgba(255,176,80,${0.18 + 0.1 * Math.sin(t * 5 + k)})`;
        c.beginPath(); c.arc(fx, fy, 26 + Math.sin(t * 4 + k) * 4, 0, Math.PI * 2); c.fill();
      }
      // 地图（献策的道具：摊开的绢图，绘子午道）
      c.save(); c.translate(1180, 760); c.rotate(-0.04);
      c.fillStyle = 'rgba(232,214,176,.82)';
      c.beginPath(); c.rect(-220, -120, 440, 240); c.fill();
      c.strokeStyle = 'rgba(70,56,40,.8)'; c.lineWidth = 3; c.strokeRect(-220, -120, 440, 240);
      // 山川示意
      brush(c, [[-180, 40], [-80, -10], [40, 30], [180, -20]], { w: 5, tone: 0.4, dry: 0.6, seed: 70 });
      // 子午道（魏延请兵异道）
      brush(c, [[-180, 60], [-60, 10], [60, -30], [180, -70]], { w: 7, col: [172, 38, 32], tone: 0.85, dry: 0.5, seed: 71, head: 0.05, tail: 0.3 });
      // 潼关点（红圈）
      c.strokeStyle = 'rgba(172,38,32,.9)'; c.lineWidth = 4;
      c.beginPath(); c.arc(180, -70, 16, 0, Math.PI * 2); c.stroke();
      c.restore();
      // 主动作：魏延俯身指图（举刀的手落下指向地图）
      const x = 980, y = 868, s = 1.5;
      const point = ss(0.6, 2.2, lt);
      Z.weiyan(c, x, y, s, t, { raise: 1 - point * 0.6 });
      // 指向地图的手势（淡一笔连到图）
      c.save(); c.globalAlpha = point * 0.7;
      brush(c, [[x + 40 * s, y - 120 * s], [x + 160 * s, y - 120 * s]], { w: 8, tone: 0.5, dry: 0.5, seed: 80 });
      c.restore();
      Z.seal(c, 1762, 952, '文长', ss(1.0, 1.28, lt), { size: 88, seed: 3 });
    },
  };
})();
