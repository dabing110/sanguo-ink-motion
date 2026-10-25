// ③ 长坂坡：怀抱幼主，七进七出（全片高潮）。
// 主动作：怀抱阿斗三度横冲（左→右→左），枪随冲势横扫；母题循环：曹军旗海翻卷、尘烟滚动、墨点迸溅。
SCENES['z3_changban'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('zl_paper');

  // 曹军旗海：远处一片黑旗（循环翻卷）
  function bannerSea(c, t) {
    const r = rng(55);
    for (let i = 0; i < 12; i++) {
      const x = 60 + r() * 1750, y = 600 + r() * 60, h = 120 + r() * 90;
      Z.flag(c, x, y, h, t, { seed: 20 + i, col: 'rgba(52,50,54,.5)' });
    }
  }
  // 曹军兵卒：被冲阵撞倒（倒伏角 fall 由冲阵进度驱动）
  function caoSoldier(c, x, y, s, t, fall) {
    c.save(); c.translate(x, y); c.rotate(fall); c.scale(s, s);
    brush(c, [[0, 0], [2, -38], [0, -76]], { w: 10, tone: 0.6, dry: 0.5, seed: 930 });
    c.fillStyle = 'rgba(32,30,28,.78)'; c.beginPath(); c.arc(1, -84, 9, 0, Math.PI * 2); c.fill();
    brush(c, [[2, -66], [16, -52], [22, -30]], { w: 6, tone: 0.55, dry: 0.5, seed: 931 });
    brush(c, [[2, -68], [34, -94]], { w: 3.5, tone: 0.55, dry: 0.6, seed: 932 });
    c.restore();
  }
  // 枯树：两笔杈
  function deadTree(c, lt) {
    brush(c, [[1680, 830], [1662, 700], [1686, 560]], { w: 16, tone: 0.8, dry: 0.7, seed: 81, reveal: ss(0, 0.4, lt), tail: 0.4 });
    brush(c, [[1672, 660], [1620, 600], [1580, 586]], { w: 7, tone: 0.75, dry: 0.7, seed: 82, reveal: ss(0.15, 0.5, lt), tail: 0.5 });
    brush(c, [[1678, 610], [1726, 566], [1758, 556]], { w: 6, tone: 0.7, dry: 0.7, seed: 83, reveal: ss(0.2, 0.55, lt), tail: 0.5 });
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'z3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 1920, [{ y0: 560, amp: 70, tone: 0.15, seed: 7.7 }]);
        const gr = g.createLinearGradient(0, 520, 0, 820);
        gr.addColorStop(0, 'rgba(96,82,60,0)'); gr.addColorStop(1, 'rgba(96,82,60,.2)');
        g.fillStyle = gr; g.fillRect(0, 520, W, 300);
      }, { blur: 5, halo: 18, haloA: 0.3 });
      bannerSea(c, t);
      // 曹军兵卒：入阵后一节节倒伏（这一幕的「对」。）
      {
        const r2 = rng(65); const bxs = [];
        for (let i = 0; i < 6; i++) bxs.push(150 + i * 300 + r2() * 70);
        for (let i = 0; i < 6; i++) {
          const fall = clamp((lt - (0.8 + i * 0.26)) / 0.42);
          caoSoldier(c, bxs[i], 878 + (i % 3) * 14, 1.15 + (i % 2) * 0.14, t + i, fall * 1.22 * (i % 2 ? 1 : -1));
        }
      }
      deadTree(c, lt);
      brush(c, [[0, 858], [640, 842], [1300, 856], [1920, 846]], { w: 10, tone: 0.6, dry: 0.8, seed: 14, reveal: ss(0, 0.3, lt) });
      // 当阳桥：远处一勾
      brush(c, [[120, 700], [420, 692], [560, 700]], { w: 7, tone: 0.5, dry: 0.7, seed: 84, reveal: ss(0.1, 0.5, lt) });
      brush(c, [[180, 700], [186, 668], [200, 668], [206, 700]], { w: 4, tone: 0.5, dry: 0.7, seed: 85, reveal: ss(0.2, 0.6, lt) });
      // 大尘烟（循环一）
      Z.dust(c, t, { x: 700, y: 850, n: 7, seed: 3, alpha: 0.3, scale: 1.8 });
      Z.dust(c, t, { x: 1350, y: 860, n: 6, seed: 8, alpha: 0.26, scale: 1.5 });
      // 赵云：七进七出——三度横冲
      const ph = lt / 3.8;
      const swing = Math.sin(ph * Math.PI * 3 - Math.PI / 2);       // -1→1→-1→1→-1 三次过中
      const x = 960 + swing * 520;
      const vx = Math.cos(ph * Math.PI * 3);
      const flip = vx < 0 ? 1 : 0;
      const y = 890 + Math.sin(lt * 2.1) * 8, s = 1.06;
      const phase = t * 10;
      Z.dust(c, t, { x: x + (flip ? -160 : 160), y: y + 4, n: 5, seed: 6, alpha: 0.3, scale: 1.1 });
      Z.horse(c, x, y, s, phase, { gallop: 1, flip });
      // 枪：随冲势横扫（两次发力）
      const slash = Math.max(1 - Math.abs(lt - 1.3) * 2.6, 1 - Math.abs(lt - 2.7) * 2.6, 0);
      const ang = lerp(-0.42, 0.1, clamp(slash)) * (flip ? -1 : 1);
      Z.rider(c, x, y, s, phase, { spearAng: ang, spearLen: 360, t, flip, pouch: 1, backFlag: 1 });
      // 迸溅的墨点（循环三）：冲杀瞬间甩出
      if (slash > 0.1) {
        const r = rng(66);
        for (let i = 0; i < 14; i++) {
          const q = 1 - clamp(slash);
          const px = x + (flip ? -1 : 1) * (260 + r() * 420) + (r() - .5) * 80;
          const py = y - 320 + r() * 300 + q * 120;
          c.fillStyle = `rgba(30,28,26,${0.5 * clamp(slash)})`;
          c.beginPath(); c.ellipse(px, py, 3 + r() * 8, 2 + r() * 4, r() * 3, 0, Math.PI * 2); c.fill();
        }
      }
      Z.seal(c, 1760, 950, '长坂', ss(1.6, 1.85, lt), { size: 88, seed: 12 });
    },
  };
})();
