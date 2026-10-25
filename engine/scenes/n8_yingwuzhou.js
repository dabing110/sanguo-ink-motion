// ⑧ 鹦鹉洲：祖遂杀之，时年二十六。葬于江渚——后人名之曰鹦鹉洲。
// 收束全片：芦苇江洲，鹦鹉哀鸣，才名与葬处同在一洲。
// 主动作：江水东流（常驻）→ 芦苇风摇（常驻）→ 鹦鹉自洲上飞起（1.2→2.6s）→ 题跋落印（2.7→3.6s）
// 母题循环：江水、芦苇、雁、鹦鹉。
SCENES['n8_yingwuzhou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq8', '#eae4ce');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'nq8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 112, tone: 0.2, seed: 961.5 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 620, n: 4, alpha: 0.46, speed: 44, seed: 963 });
      Z.geese(c, t, { y: 240, x0: 1980, speed: 130, n: 5, seed: 81, scale: 1.05 });
      // 大江
      Z.water(c, t, { y0: 700, y1: 1040, tone: 0.32, seed: 967, rows: 9 });
      // 江渚
      c.fillStyle = 'rgba(206,192,158,.66)';
      c.beginPath(); c.ellipse(960, 900, 520, 60, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(64,52,38,.7)'; c.lineWidth = 2.8; c.stroke();

      // 芦苇（两丛，常驻风摇）
      c.save(); c.globalAlpha = 0.9;
      for (let k = 0; k < 7; k++) {
        const bx = 560 + k * 30, h2 = 150 + (k % 3) * 36;
        const sw = Math.sin(t * 1.9 + k * 0.9) * 14;
        brush(c, [[bx, 900], [bx + sw * 0.5, 900 - h2 * 0.6], [bx + sw, 900 - h2]], { w: 4.5, tone: 0.72, dry: 0.6, seed: 969 + k, tail: 0.6 });
        c.fillStyle = 'rgba(150,120,84,.8)';
        c.beginPath(); c.ellipse(bx + sw, 900 - h2, 4, 13, sw * 0.03, 0, Math.PI * 2); c.fill();
      }
      for (let k = 0; k < 6; k++) {
        const bx = 1260 + k * 34, h2 = 130 + (k % 3) * 32;
        const sw = Math.sin(t * 1.9 + k * 0.9 + 2) * 14;
        brush(c, [[bx, 906], [bx + sw * 0.5, 906 - h2 * 0.6], [bx + sw, 906 - h2]], { w: 4.5, tone: 0.72, dry: 0.6, seed: 977 + k, tail: 0.6 });
        c.fillStyle = 'rgba(150,120,84,.8)';
        c.beginPath(); c.ellipse(bx + sw, 906 - h2, 4, 12, sw * 0.03, 0, Math.PI * 2); c.fill();
      }
      c.restore();

      // 断碑（洲上，渐显）
      const st = ss(0.6, 1.8, lt);
      if (st > 0) {
        c.save(); c.globalAlpha = st * 0.9;
        c.fillStyle = 'rgba(180,166,138,.9)';
        c.beginPath(); c.moveTo(-44, 0); c.lineTo(-40, -120); c.lineTo(-6, -132); c.lineTo(36, -118); c.lineTo(44, 0); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(58,48,36,.88)'; c.lineWidth = 2.8; c.stroke();
        c.fillStyle = 'rgba(70,56,40,.9)'; c.font = '34px "LXGWWenKai-500"'; c.textAlign = 'center';
        c.fillText('鹦鹉', 0, -66);
        c.fillText('洲', 0, -28);
        c.restore();
      }

      // 主动作：鹦鹉自洲上飞起（掠江而去）
      const fly = ss(1.2, 2.6, lt);
      const fx = lerp(980, 1900, fly);
      const fy = lerp(690, 420, fly) - Math.sin(fly * Math.PI) * 60;
      if (fly > 0) Z.yingWu(c, fx, fy, 1.5, t, { fly: 1, seed: 4 });
      else Z.yingWu(c, 980, 700, 1.5, t, { fly: 0, seed: 4 });

      Z.bigText(c, '才高廿六', { x: 960, y: 268, size: 82, gap: 20, appear: ss(2.4, 3.15, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 948, '正平', ss(2.7, 3.05, lt), { size: 86, seed: 985 });
    },
  };
})();
