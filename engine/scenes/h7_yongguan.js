// ⑦ 勇冠三军：陈寿评「忠为人勇毅，冠三军……每战常为士卒先」——年近七旬而勇冠三军。
// 主动作：老将立马夕阳下，满弦（0.5→1.8s）→ 放箭（1.8→2.5s，一箭掠出画外）；母题循环：落日沉、披风与草随风、归雁。
SCENES['h7_yongguan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz7', '#ece0c2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 暮色：整幅压一层暖调
      c.save();
      const gsun = c.createLinearGradient(0, 120, 0, H);
      gsun.addColorStop(0, 'rgba(214,158,86,0)'); gsun.addColorStop(0.62, 'rgba(216,146,74,.24)'); gsun.addColorStop(1, 'rgba(150,86,40,.34)');
      c.fillStyle = gsun; c.fillRect(0, 0, W, H); c.restore();
      // 落日：西沉（母题一）
      const sy = lerp(560, 700, ss(0, 3.0, lt));
      c.save(); c.globalAlpha = 0.62; c.fillStyle = 'rgba(226,164,74,.55)';
      c.beginPath(); c.arc(1540, sy, 150, 0, Math.PI * 2); c.fill();
      c.globalAlpha = 0.3; c.beginPath(); c.arc(1540, sy, 230 + Math.sin(t) * 6, 0, Math.PI * 2); c.fill();
      c.restore();
      Z.wash(c, 'hz7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -80, 2000, [{ y0: 470, amp: 150, tone: 0.2, seed: 71.3 }]);
        Z.mountains(c, g, -80, 2000, [{ y0: 600, amp: 96, tone: 0.34, seed: 73.9 }]);
      }, { blur: 4, halo: 20, haloA: 0.3 });
      // 归雁（母题二）：掠过落日。注意——Z.geese 按全局 t 走，到本幕时早飞出画面了，
      // 观众看到的就是「鸟不动」。这里自己按幕内相位排，保证整幕都有 6 只在飞。
      for (let i = 0; i < 6; i++) {
        const ph = (lt * 0.15 + t * 0.05 + i * 0.168) % 1;
        const gx = 1920 + (i - 3) * 90 - ph * 2300;
        const gy = 360 + Math.sin(ph * 6.2 + i) * 36 + (i % 3) * 24;
        const ga = Math.sin(ph * Math.PI) * 0.85, gs = 0.85 + (i % 2) * 0.3;
        if (ga < 0.03) continue;
        c.save(); c.globalAlpha = ga; c.strokeStyle = 'rgba(48,44,40,.78)'; c.lineWidth = 2.3; c.lineCap = 'round';
        c.beginPath(); c.moveTo(gx - 13 * gs, gy - 5 * gs); c.quadraticCurveTo(gx, gy - 10 * gs, gx + 13 * gs, gy - 3 * gs); c.stroke();
        c.beginPath(); c.moveTo(gx - 13 * gs, gy - 5 * gs); c.quadraticCurveTo(gx - 6 * gs, gy + 3 * gs, gx, gy - 8 * gs); c.stroke();
        c.restore();
      }
      // 地平
      brush(c, [[0, 840], [640, 824], [1300, 836], [1920, 822]], { w: 12, tone: 0.6, dry: 0.8, seed: 68, reveal: ss(0, 0.3, lt) });
      // 草与披风都在风里（母题三的摆动）
      const r = rng(91);
      for (let i = 0; i < 30; i++) {
        const x = r() * W, y = 850 + r() * 200, sw = Math.sin(t * 2.4 + i * 0.7) * 11;
        brush(c, [[x, y], [x + sw * 0.5, y - 28 - r() * 22], [x + sw, y - 50 - r() * 28]], { w: 3.2, tone: 0.66, dry: 0.6, seed: 400 + i, tail: 0.7, bristles: 3 });
      }
      // 老将：立马军前，满弦 → 放箭
      const zx = 700, zy = 906, s = 1.42;
      const draw = ss(0.45, 1.45, lt) * (1 - 0.85 * ss(1.45, 2.05, lt));   // 满弦 → 撒弦放手
      Z.horse(c, zx, zy, s, t * 3.4, { gallop: 0, flip: 0 });
      Z.oldRider(c, zx, zy, s, t * 3.4, { draw, beard: 1, cape: 1, backFlag: 0, old: 1 });
      // 那一箭掠出画外：起点同样必须是弓口（跟随 oldRider 里 bow 的取点）
      const fly = ss(1.45, 2.45, lt);                                     // 提前起飞、拉长飞行段，别只在幕尾闪一下。
      if (fly > 0) {
        const bx = zx - 58 * s * 0.95, by = zy - 104 * s * 0.95;
        const ax = lerp(bx, 2500, ease.out(fly)), ay = lerp(by, 300, ease.in(fly) * 0.7 + 0.15);
        Z.arrow(c, ax, ay, -0.26, 220, clamp(fly * 4) * (1 - ss(2.7, 3.0, lt)));
      }
      // 放箭后的余韵：马蹄扬尘 + 弓弦未定，幕尾不让画面死住
      const rec = ss(2.35, 3.2, lt);
      if (rec > 0.02) {
        c.save(); c.globalAlpha = 0.2 + 0.1 * (1 - rec);
        const rr = rng(93);
        for (let i = 0; i < 6; i++) {
          const dx = zx - 150 - rr() * 260, dy = zy + 40 + rr() * 40;
          brush(c, [[dx, dy], [dx - 20 * (1 - rec), dy - 30 * rr()], [dx - 54 * (1 - rec), dy - 44 * rr()]],
            { w: 5, tone: 0.42, dry: 0.85, seed: 610 + i, tail: 0.85, bristles: 3 });
        }
        c.restore();
      }
      // 身后一杆残旗（母题三的静物）
      Z.flag(c, 1420, 852, 240, t, { seed: 61, col: 'rgba(150,44,36,.72)' });
      Z.seal(c, 1762, 952, '老将', ss(2.0, 2.3, lt), { size: 88, seed: 33 });
    },
  };
})();
