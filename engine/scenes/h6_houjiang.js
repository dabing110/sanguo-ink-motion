// ⑥ 后将军：先主为汉中王，拜忠为后将军、封关内侯——五虎上将之末座。
// 主动作：朱印自上方落下、被老将双手接过（1.0→2.2s），身后五虎之印依次显起（母题铺底）；
// 母题循环：殿宇云气、两杆旌旗、阶下尘。
SCENES['h6_houjiang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz6');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 殿宇：远处一层重檐（几笔）
      Z.wash(c, 'hz6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -80, 2000, [{ y0: 400, amp: 130, tone: 0.18, seed: 63.1 }]);
        g.save(); g.strokeStyle = 'rgba(48,44,40,.4)'; g.lineWidth = 4; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(1180, 470); g.lineTo(1560, 470); g.lineTo(1560, 400); g.lineTo(1180, 400); g.closePath(); g.stroke();
        g.beginPath(); g.moveTo(1160, 400); g.quadraticCurveTo(1370, 350, 1580, 400); g.stroke();
        g.beginPath(); g.moveTo(1200, 470); g.lineTo(1200, 560); g.lineTo(1540, 560); g.lineTo(1540, 470); g.stroke();
        g.restore();
      }, { blur: 4, halo: 18, haloA: 0.28 });
      // 云气（循环一）：殿前一层平铺的云
      Z.mist(c, t, { y0: 560, y1: 820, n: 4, alpha: 0.62, speed: 34, seed: 11 });
      // 两杆旌旗（循环二）
      [[330, 800], [1560, 800]].forEach(([fx, fy], i) => Z.flag(c, fx, fy, 280 + i * 30, t, { seed: 51 + i, col: 'rgba(178,40,34,.78)' }));   // 1560 落在「马」印与「黄」印的空档，不再穿框
      // 殿前一缕青烟（母题循环）：整幕都在这袅袅地动，接印／落印之外仍有活气
      for (let i = 0; i < 5; i++) {
        const ph = (t * 0.17 + i * 0.2) % 1;
        const sx = 1370 + Math.sin(t * 1.1 + i) * 30 * ph, sy = 560 - ph * 200;
        c.save(); c.globalAlpha = (1 - ph) * 0.26;
        brush(c, [[sx, sy], [sx + Math.sin(t + i) * 12, sy - 32], [sx + Math.sin(t * 0.8 + i) * 18, sy - 60]],
          { w: 5, tone: 0.3, dry: 0.85, seed: 820 + i, tail: 0.9, bristles: 3 });
        c.restore();
      }
      // 阶（结结实实的一横）
      brush(c, [[0, 916], [640, 898], [1300, 910], [1920, 894]], { w: 18, tone: 0.78, dry: 0.6, seed: 66, reveal: ss(0, 0.35, lt) });
      // 五虎之印：一字排开，依次显起（右起：关张赵马黄，黄忠在末座＝中间偏右）
      const five = ['关', '张', '赵', '马', '黄'];
      five.forEach((ch, i) => {
        const q = ss(0.55 + i * 0.2, 1.0 + i * 0.2, lt);                  // 收在幕内，幕尾不留半显的印
        if (q <= 0) return;
        const fx = 820 + i * 210, fy = 742;
        c.save(); c.globalAlpha = clamp(q) * 0.9; c.translate(fx, fy); c.rotate((1 - clamp(q)) * 0.2);
        c.fillStyle = 'rgba(196,52,40,.5)'; c.fillRect(-34, -34, 68, 68);
        c.strokeStyle = 'rgba(150,32,24,.85)'; c.lineWidth = 3; c.strokeRect(-34, -34, 68, 68);
        c.fillStyle = 'rgba(150,32,24,.9)'; c.font = '54px "LXGWWenKai-500"';
        c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch, 0, 2);
        c.restore();
      });
      // 老将：双手接过那颗朱印 → 举过头顶（1.5→2.6s），幕尾不能是一张静图
      const zx = 560, zy = 892, s = 1.22;
      const drop = ss(0.85, 1.5, lt);
      const lift = ss(1.5, 2.6, lt);
      const hb = Math.sin(t * 2.2) * 2.5;                                // 呼吸／捧印的手不稳
      const hy = lerp(360, lerp(zy - 138, zy - 206, lift), ease.out(drop)) + hb * lift;
      // 印（从上方落下来的那颗，比五虎印更大更实）
      c.save(); c.globalAlpha = clamp(drop * 1.6);
      c.fillStyle = 'rgba(196,52,40,.78)'; c.fillRect(zx - 46, hy - 46, 92, 92);
      c.strokeStyle = 'rgba(140,28,20,.95)'; c.lineWidth = 4; c.strokeRect(zx - 46, hy - 46, 92, 92);
      c.fillStyle = 'rgba(140,28,20,.95)'; c.font = '64px "LXGWWenKai-500"';
      c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('后', zx - 16, hy - 14); c.fillText('将', zx + 16, hy + 16);
      c.restore();
      // 落印时的一圈尘（拍点）
      const thud = ss(1.45, 1.8, lt) * (1 - ss(1.8, 3.0, lt));            // 尘缓缓落，一直落到幕尾
      if (thud > 0.02) {
        c.save(); c.globalAlpha = thud * 0.55;
        for (let i = 0; i < 7; i++) {
          const rr = rng(88);
          const px = zx - 100 + rr() * 200, py = zy - 10 - (1 - thud) * 30 * rr();
          brush(c, [[px, py], [px + 14, py - 22 - rr() * 16], [px + 30, py - 30 - rr() * 20]], { w: 4, tone: 0.5, dry: 0.7, seed: 300 + i, tail: 0.85, bristles: 3 });
        }
        c.restore();
      }
      const zy2 = zy - lift * 12 + hb;                                    // 举印时老将自案上起身
      Z.horse(c, zx, zy2, s, t * 3, { gallop: 0, flip: 0 });
      Z.oldRider(c, zx, zy2, s, t * 3, { draw: 0, beard: 1, cape: 1, backFlag: 0 });
      Z.seal(c, 1762, 952, '汉升', ss(1.9, 2.2, lt), { size: 88, seed: 29 });
    },
  };
})();
