// ⑤ 决水灌城：操堑围之三月，决泗、沂之水以灌城——下邳成了一座泡在水里的孤城。
// 主动作：大军合围（连营渐显 0.3→1.6s）→ 大水漫上城脚（0.6→2.4s）→ 白门楼在望、城头旗渐倒（2.0→3.35s）
// 母题循环：水面、浪头、烟、雁。
SCENES['c5_guancheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq5', '#e8e1cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.0, lt);
      Z.wash(c, 'cq5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 116, tone: 0.2, seed: 481.5 }]);
        g.fillStyle = 'rgba(70,78,88,.18)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.5, speed: 46, seed: 483 });
      Z.geese(c, t, { y: 240, x0: 1980, speed: 140, n: 5, seed: 51, scale: 1 });

      // 白门楼（城中，居中）
      Z.baiMenLou(c, 960, 700, 0.92, t, { tone: 0.74 });

      // 主动作一：曹操大军连营合围（两侧渐显）
      const camp = ss(0.3, 1.6, lt);
      c.save(); c.globalAlpha = 0.9;
      [[80, 0.62], [250, 0.72], [420, 0.85]].forEach(([gx, ga], k) => {
        c.save(); c.globalAlpha = ga * camp;
        brush(c, [[gx, 620], [gx + 1, 500]], { w: 7, tone: 0.8, dry: 0.4, seed: 485 + k });
        c.fillStyle = 'rgba(216,204,176,.6)';
        c.beginPath(); c.moveTo(gx - 44, 608); c.quadraticCurveTo(gx, 540, gx + 44, 608); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(52,44,34,.8)'; c.lineWidth = 2.4; c.stroke();
        c.restore();
      });
      [[1840, 0.62], [1670, 0.72], [1500, 0.85]].forEach(([gx, ga], k) => {
        c.save(); c.globalAlpha = ga * camp;
        brush(c, [[gx, 620], [gx - 1, 500]], { w: 7, tone: 0.8, dry: 0.4, seed: 489 + k });
        c.fillStyle = 'rgba(216,204,176,.6)';
        c.beginPath(); c.moveTo(gx - 44, 608); c.quadraticCurveTo(gx, 540, gx + 44, 608); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(52,44,34,.8)'; c.lineWidth = 2.4; c.stroke();
        c.restore();
      });
      Z.flag(c, 80, 480, 120, t, { seed: 493, col: 'rgba(178,44,36,.8)', text: '曹' });
      Z.flag(c, 1840, 486, 120, t, { seed: 495, col: 'rgba(178,44,36,.8)', text: '曹' });
      c.restore();

      // 主动作二：大水漫上城脚（水线缓升）
      const level = ss(0.6, 2.4, lt);
      const top = lerp(1010, 780, level);
      c.fillStyle = 'rgba(96,120,128,.32)';
      c.beginPath(); c.moveTo(0, 1080);
      for (let x = 0; x <= 1920; x += 40) c.lineTo(x, top + Math.sin(x * 0.008 + t * 1.1) * 12);
      c.lineTo(1920, 1080); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(40,70,80,.5)'; c.lineWidth = 3;
      c.beginPath();
      for (let x = 0; x <= 1920; x += 40) { const y = top + Math.sin(x * 0.008 + t * 1.1) * 12; x === 0 ? c.moveTo(x, y) : c.lineTo(x, y); }
      c.stroke();
      // 浪头（三道常移）
      for (let k = 0; k < 3; k++) {
        const wy = top + 80 + k * 100;
        const wx = ((k / 3) * 2200 + t * (56 + k * 16)) % 2200 - 140;
        brush(c, [[wx - 180, wy], [wx - 50, wy - 24], [wx + 90, wy - 6], [wx + 200, wy + 6]], { w: 9, tone: 0.4, dry: 0.6, seed: 497 + k, head: 0.1, tail: 0.4, bristles: 5 });
      }

      // 主动作三：城头旗渐倒（两旗 droop 增大并降下）
      const droop = ss(2.0, 3.35, lt);
      c.save(); c.globalAlpha = 1 - droop * 0.4;
      Z.flag(c, 780, lerp(430, 560, droop), 120, t, { seed: 501, col: 'rgba(120,60,40,.78)', text: '吕', droop });
      Z.flag(c, 1140, lerp(434, 566, droop), 110, t, { seed: 503, col: 'rgba(120,60,40,.75)', droop });
      c.restore();

      brush(c, [[0, 926], [640, 916], [1280, 928], [1920, 914]], { w: 13, tone: 0.74, dry: 0.75, seed: 505, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 10, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 40, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 11, a: 0.3 });
      Z.bigText(c, '决水灌城', { x: 960, y: 268, size: 78, gap: 18, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 952, '下邳', ss(2.6, 2.95, lt), { size: 86, seed: 507 });
    },
  };
})();
