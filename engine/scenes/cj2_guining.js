// ② 适河东卫仲道。夫亡无子，归宁于家。
//    正史只给了她十四个字。画面：一辆车去，一个人回——中间那一段，史书没写，也不必写。
SCENES['cj2_guining'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj2', '#e3dfcb');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj2_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 490, amp: 124, tone: 0.16, seed: 121 }, { y0: 640, amp: 86, tone: 0.26, seed: 123 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1212 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 1216 });
      Z.inkCloud(c, t, { y: 892, h: 32, n: 5, speed: 96, span: 1500, seed: 15, a: .24 });
      Z.inkCloud(c, t, { y: 476, h: 26, n: 3, speed: 124, span: 1300, seed: 25, a: .18 });
      Z.geese(c, t, { y: 190, x0: 2400, speed: 130, n: 5, seed: 127, scale: .78 });
      brush(c, [[0, 918], [640, 910], [1280, 920], [1920, 910]], { w: 15, tone: 0.76, dry: 0.74, seed: 1218, head: .03, tail: .3 });

      // 官道（一条斜线，尘土起处）
      brush(c, [[240, 972], [900, 934], [1660, 916]], { w: 22, tone: .34, dry: .8, seed: 1221, tail: .5 });

      // 轺车（去）：缓缓右移并淡出 —— 一辆车去
      const go = ss(0.1, 1.4, lt);
      const gone = 1 - ss(1.6, 3.2, lt);
      const cx = lerp(430, 760, ease.out(ss(0.1, 3.4, lt)));
      c.save(); c.globalAlpha = clamp(go) * clamp(gone);
      c.translate(cx, 940);
      // 车厢
      c.fillStyle = 'rgba(126,102,68,.9)';
      c.beginPath(); c.moveTo(-92, -6); c.lineTo(-88, -96); c.lineTo(88, -96); c.lineTo(92, -6); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(48,36,22,.92)'; c.lineWidth = 3.2; c.stroke();
      // 车盖（伞盖）
      c.fillStyle = 'rgba(150,120,74,.92)';
      c.beginPath(); c.moveTo(-124, -100); c.quadraticCurveTo(0, -156, 124, -100); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(48,36,22,.9)'; c.lineWidth = 2.6; c.stroke();
      brush(c, [[0, -152], [0, -100]], { w: 6, tone: .6, dry: .5, seed: 1231, col: [96, 72, 44] });
      // 车轮（辐条旋转：持续位移，这一幕的运动主力）
      [[-78, 0], [78, 0]].forEach(([wx], k) => {
        c.save(); c.translate(wx, 0); c.rotate(t * 1.6 + k * .4);
        c.strokeStyle = 'rgba(58,42,26,.92)'; c.lineWidth = 5;
        c.beginPath(); c.arc(0, 0, 40, 0, Math.PI * 2); c.stroke();
        c.lineWidth = 3.2;
        for (let i = 0; i < 8; i++) {
          const a0 = i * Math.PI / 4;
          c.beginPath(); c.moveTo(Math.cos(a0) * 8, Math.sin(a0) * 8); c.lineTo(Math.cos(a0) * 38, Math.sin(a0) * 38); c.stroke();
        }
        c.restore();
      });
      c.restore();

      // 素幡（夫亡：只一幡，不画棺不画人）
      const su = ss(1.2, 2.0, lt) * (1 - ss(2.4, 3.4, lt));
      c.save(); c.globalAlpha = clamp(su) * .9; c.translate(1080, 952);
      brush(c, [[0, 0], [4 + Math.sin(t * 1.2) * 6, -300]], { w: 8, tone: .6, dry: .5, seed: 1241, col: [104, 82, 54] });
      c.fillStyle = 'rgba(238,232,220,.94)';
      c.beginPath();
      c.moveTo(4, -292);
      for (let i = 0; i <= 8; i++) c.lineTo(4 + Math.sin(t * 2 + i * .5) * 10 * (i / 8), -292 + i * 26);
      c.lineTo(-58, -292); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(70,60,52,.8)'; c.lineWidth = 2; c.stroke();
      c.restore();

      // 落叶（五片，随风斜落）
      for (let k = 0; k < 5; k++) {
        const q = (t * .26 + k / 5) % 1;
        const lx = 300 + k * 330 + Math.sin(t * 1.2 + k * 1.6) * 54;
        const ly = 140 + q * 780;
        c.save(); c.globalAlpha = .45 + .35 * Math.sin(Math.PI * q);
        leaf(c, lx, ly, Math.sin(t * 1.7 + k) * .9 + k * .5, 24, 10, .56, [122, 100, 60]);
        c.restore();
      }

      Z.torch(c, 330, 906, 1.32, t, 121);
      Z.torch(c, 1670, 900, 1.24, t, 125);
      Z.dust(c, t, { x: cx, y: 950, n: 7, seed: 129, scale: 1.8, alpha: 0.5 });

      // 主动作：文姬独归（右，向左微行：一个人回）
      const come = ss(1.8, 3.4, lt);
      const wx = lerp(1540, 1450, ease.out(come));
      Z.wenji(c, wx + Math.sin(t * .9) * 3, 950, 2.05,
        { t, fade: come, flip: 1, bow: 0.12, carry: 0.25 });

      Z.inkSmoke(c, wx, 664, t, { seed: 137, a: 0.28 });
      Z.inkSmoke(c, 520, 706, t, { seed: 138, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 103, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 104, a: .34 });

      Z.bigText(c, '适卫仲道', { x: 330, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '夫亡无子 · 归宁于家', { x: 320, y: 546, size: 44, gap: 10, appear: ss(1.3, 2.2, lt), col: 'rgba(96,80,72,.92)', shadow: { color: 'rgba(104,88,80,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
