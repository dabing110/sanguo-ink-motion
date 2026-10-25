// ② 磐河：白马银枪，冲阵救公孙瓒。
// 主动作：2.6s 内由远及近一路冲到画面左中（scale 0.62→1.2），枪尖前刺两次；母题循环：旌旗翻卷、马蹄扬尘、尘烟滚动。
SCENES['z2_panhe'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zl_paper');

  // 远处乱兵剪影：淡墨小骑，冲过时被撞散（k 号骑兵在 lt 到某时刻后倒伏）
  function mob(c, t, lt, pass) {
    const r = rng(31);
    for (let i = 0; i < 6; i++) {
      const bx = 260 + r() * 1250, by = 740 + r() * 60, s = 0.62 + r() * 0.3;
      const hit = pass > (bx - 260) / 1500;                   // 冲到跟前
      c.save(); if (hit) { c.translate(bx, by); c.rotate(-0.9 * clamp((pass - (bx - 260) / 1500) * 6)); c.translate(-bx, -by); c.globalAlpha = 1 - clamp((pass - (bx - 260) / 1500) * 3); }
      Z.horse(c, bx, by, s, t * 7 + i, { tone: 0.52, gallop: hit ? 0 : 0.5, flip: r() < 0.5 ? 1 : 0 });
      c.restore();
    }
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      // 地平线烟尘带（战场，淡而柔）
      Z.wash(c, 'z2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 1920, [{ y0: 640, amp: 90, tone: 0.16, seed: 5.1 }]);
        const gr = g.createLinearGradient(0, 600, 0, 780);
        gr.addColorStop(0, 'rgba(120,104,80,0)'); gr.addColorStop(1, 'rgba(120,104,80,.15)');
        g.fillStyle = gr; g.fillRect(0, 600, W, 180);
      }, { blur: 5, halo: 18, haloA: 0.26 });
      Z.mist(c, t, { y0: 560, y1: 700, n: 3, alpha: 0.5, speed: 40, seed: 5 });
      // 两军旌旗（循环一）
      [[210, 690], [400, 676], [1560, 684], [1770, 672]].forEach(([fx, fy], i) =>
        Z.flag(c, fx, fy, 250 + i * 24, t, { seed: i + 1, col: i < 2 ? 'rgba(178,40,34,.8)' : 'rgba(60,66,92,.78)' }));
      // 地面：一笔横扫
      brush(c, [[0, 812], [640, 796], [1280, 810], [1920, 798]], { w: 9, tone: 0.55, dry: 0.8, seed: 13, reveal: ss(0, 0.3, lt) });
      // 乱兵
      const pass = ss(0.2, 2.5, lt);
      mob(c, t, lt, pass);
      // 赵云：由远及近冲刺（马头朝左＝前进方向）
      const p = ease.out(clamp(lt / 2.5));
      const x = lerp(2020, 760, p), s = lerp(0.66, 1.22, p), y = lerp(680, 822, p);
      const phase = t * 9;
      // 冲刺扬尘（循环二）
      Z.dust(c, t, { x: x + 150, y: y + 6, n: 6, seed: 6, alpha: 0.3, scale: 1.15 });
      Z.horse(c, x, y, s, phase, { gallop: 1, flip: 1 });
      // 枪刺：两次前刺（1.2s、2.15s）
      const thrust = Math.max(
        1 - Math.abs(lt - 1.2) * 3.4,
        1 - Math.abs(lt - 2.15) * 3.4,
      );
      const ang = lerp(-0.5, 0.04, clamp(thrust));
      Z.rider(c, x, y, s, phase, { spearAng: ang, spearLen: 340, t, backFlag: 1, cape: 1, flip: 1 });
      // 枪尖寒光：刺出时一抹白
      if (thrust > 0.05) {
        c.save(); c.globalAlpha = thrust * 0.8; c.filter = 'blur(3px)';
        c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 5;
        const tx = x - 74 * s - Math.cos(ang) * 340 * s * 0.58, ty = y + (-98 * s) + Math.sin(-ang) * 340 * s * 0.58;
        c.beginPath(); c.moveTo(tx + 40, ty - 26); c.lineTo(tx - 30, ty + 22); c.stroke();
        c.filter = 'none'; c.restore();
      }
      // 蹄下飞溅的土块（循环三）
      const r = rng(19);
      for (let i = 0; i < 10; i++) {
        const q = ((t * 1.6 + i * 0.1) % 1);
        const px = x + 150 + q * 260 * s, py = y - 10 - Math.sin(q * Math.PI) * 60 + r() * 10;
        c.fillStyle = `rgba(96,80,58,${0.4 * (1 - q)})`;
        c.beginPath(); c.arc(px, py, 2 + r() * 3.4, 0, Math.PI * 2); c.fill();
      }
      Z.seal(c, 1760, 950, '磐河', ss(1.3, 1.55, lt), { size: 88, seed: 9 });
    },
  };
})();
