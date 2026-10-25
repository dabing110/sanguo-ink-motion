// ④ 渔阳掺挝：衡击鼓为《渔阳掺挝》，声节殊妙，渊渊有金石声——满座改容，操亦动容。
// 全片最燃的一幕：鼓槌起落，声波成纹。
// 主动作：衡就位（0.3→1.1s）→ **击鼓**（0.9s 起，双槌交替连击）→ 声波涟漪圈圈扩散（常驻）→ 收槌一记定音（2.7→3.35s）
// 母题循环：声波、烛、旗。
SCENES['n4_yuyang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq4', '#eae2c9');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'nq4_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(78,68,54,.14)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      Z.mist(c, t, { y0: 360, y1: 660, n: 3, alpha: 0.3, speed: 30, seed: 861 });
      brush(c, [[0, 920], [640, 910], [1280, 922], [1920, 908]], { w: 13, tone: 0.76, dry: 0.75, seed: 863, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 18, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 48, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 9, a: 0.3 });

      // 大鼓（居中偏右）
      Z.jianGu(c, 1120, 940, 1.5, t, { seed: 4 });

      // 主动作一：衡自左入，就位于鼓（460px / 1.2s ≈ 383px/s）
      const come = ss(0.3, 1.5, lt);
      const px = lerp(620, 1080, come);
      const drumOn = ss(0.9, 3.3, lt);
      Z.miHeng(c, px, 972, 2.55, { t, raise: 0, stance: t * 1.6, flip: 0, drum: drumOn >= 1 });

      // 主动作二：声波涟漪（击鼓时圈圈扩散——帧差主力）
      if (drumOn > 0.05) {
        const beat = Math.abs(Math.sin(t * 7.5));
        c.save(); c.globalAlpha = drumOn;
        Z.shengBo(c, 1120, 760, t, { n: 5, speed: 300, alpha: 0.5 + beat * 0.2 });
        Z.shengBo(c, 1120, 760, t + 0.5, { n: 3, speed: 380, alpha: 0.35 });
        c.restore();
        // 鼓面击点光环（随节拍闪烁）
        c.save(); c.globalAlpha = (0.3 + beat * 0.5) * drumOn;
        c.strokeStyle = 'rgba(150,84,44,.9)'; c.lineWidth = 5;
        c.beginPath(); c.ellipse(1120, 646, 40 + beat * 26, 18 + beat * 12, 0, 0, Math.PI * 2); c.stroke();
        c.restore();
      }

      // 主动作三：收槌定音（尾段一记重击+全屏波）
      const fin = ss(2.7, 3.35, lt);
      if (fin > 0.75) {
        const rr = (fin - 0.75) / 0.25;
        c.save(); c.globalAlpha = (1 - rr) * 0.6;
        c.strokeStyle = 'rgba(96,84,66,.8)'; c.lineWidth = 4;
        c.beginPath(); c.ellipse(1120, 760, 100 + rr * 900, 42 + rr * 300, 0, Math.PI * 0.96, Math.PI * 2.04); c.stroke();
        c.restore();
      }

      // 观者改容（两侧宾客影，后仰）
      c.save(); c.globalAlpha = 0.8;
      [[300, 946], [480, 932], [1500, 944], [1700, 934]].forEach(([bx, by], k) => {
        c.save(); c.translate(bx, by); c.rotate(0.06 + Math.sin(t * 1.6 + k) * 0.02);
        c.fillStyle = 'rgba(88,80,68,.5)';
        c.beginPath(); c.moveTo(-22, 0); c.quadraticCurveTo(-26, -70, -18, -106); c.quadraticCurveTo(0, -118, 18, -106); c.quadraticCurveTo(26, -70, 22, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -128, 10.5, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();

      Z.dust(c, t, { x: 900, y: 962, n: 5, seed: 865, scale: 1.2, alpha: 0.24 });
      Z.bigText(c, '渔阳掺挝', { x: 960, y: 286, size: 82, gap: 20, appear: ss(1.9, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '渊渊', ss(2.55, 2.9, lt), { size: 86, seed: 867 });
    },
  };
})();
