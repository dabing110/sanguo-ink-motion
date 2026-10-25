// ⑥ 引兵归刘：二一四年，马超自汉中来奔，先主遣人迎超，超将兵径至城下，城中震怖，璋即稽首。
// 主动作：马超引数骑至成都城下（0.2→1.5s）→ 城楼旗缓缓降下（1.2→2.4s）→ 城门洞透出光（2.0→2.9s）。
// 母题循环：城头旗飘、马队扬尘、云气。
SCENES['m6_chengdu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc6', '#efe7d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'mc6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2000, [{ y0: 430, amp: 132, tone: 0.18, seed: 101.7 }]);
      }, { blur: 3, halo: 14, haloA: 0.2 });
      Z.mist(c, t, { y0: 260, y1: 560, n: 4, alpha: 0.66, speed: 44, seed: 71 });
      // 城楼：右侧一座，旗可降
      const drop = ss(1.2, 2.4, lt);
      Z.gateTower(c, 1480, 900, 1.0, { flagDrop: drop, t, seed: 5 });
      // 城墙向左延伸出画
      c.save();
      c.fillStyle = 'rgba(212,198,170,.5)';
      c.beginPath(); c.moveTo(0, 620); c.lineTo(1220, 600); c.lineTo(1220, 900); c.lineTo(0, 900); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(54,46,36,.8)'; c.lineWidth = 3; c.stroke();
      c.strokeStyle = 'rgba(70,58,44,.34)'; c.lineWidth = 1.6;
      for (let i = 1; i < 6; i++) { const yy = 620 + i * 47; c.beginPath(); c.moveTo(0, yy); c.lineTo(1220, yy - 4); c.stroke(); }
      c.restore();
      // 地面
      brush(c, [[0, 900], [560, 888], [1180, 902], [1920, 886]], { w: 14, tone: 0.8, dry: 0.75, seed: 131, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 主动作一：马超引数骑至城下（自左向右停在城前）
      const ride = ease.out(ss(0.2, 1.5, lt));
      const cx = lerp(-260, 1080, ride);
      c.save();
      Z.cavalry(c, t, { x: cx, y: 906, n: 3, s: 1.12, gap: 168, speed: 0.7, seed: 8, flip: 0, lead: 1, charge: 0 });
      c.restore();
      if (ride < 1) Z.dust(c, t, { x: cx + 240, y: 900, n: 6, seed: 81, scale: 1.3, alpha: 0.4 * (1 - ride) });
      // 主动作二：城门洞透出光（璋即稽首——城开了）
      const open = ss(2.0, 2.9, lt);
      if (open > 0) {
        c.save(); c.globalAlpha = open * 0.85;
        const g = c.createRadialGradient(1480, 830, 6, 1480, 830, 150);
        g.addColorStop(0, 'rgba(255,248,228,.95)'); g.addColorStop(0.5, 'rgba(255,240,206,.5)'); g.addColorStop(1, 'rgba(255,238,200,0)');
        c.fillStyle = g; c.beginPath(); c.ellipse(1480, 830, 120, 96, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      }
      c.save(); c.globalAlpha = ss(2.3, 2.7, lt);
      c.font = '40px "LXGWWenKai-500"'; c.fillStyle = 'rgba(90,56,28,.85)'; c.textAlign = 'center';
      c.fillText('城中震怖 · 璋即稽首', 700, 320);
      c.restore();
      Z.seal(c, 240, 946, '来归', ss(1.6, 1.85, lt), { size: 88, seed: 83 });
    },
  };
})();
