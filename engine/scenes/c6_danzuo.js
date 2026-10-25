// ⑥ 但坐此人：城破，布与宫皆就缚。操曰：「公台，卿平常自谓智计有余，今竟何如？」
// 宫指布曰：「但坐此人（不早从宫言），以至于此。」——白门楼上最锋利的一句话。
// 主动作：操登楼（0.3→1.4s）→ 宫举臂直指（1.2→2.4s）→ 布俯首（2.0→2.6s）→ 操拂袖（2.3→2.95s）
// 母题循环：楼旗、残阳初升（远景）、尘。
SCENES['c6_danzuo'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq6', '#e8dfc7');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'cq6_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(88,66,50,.16)'; g.fillRect(0, 0, 1920, 1080);   // 黄昏始染
        // 远城轮廓
        g.save(); g.strokeStyle = 'rgba(90,70,52,.4)'; g.lineWidth = 4;
        g.beginPath(); g.moveTo(0, 300); g.quadraticCurveTo(400, 250, 900, 290); g.quadraticCurveTo(1400, 330, 1920, 270); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 300, y1: 560, n: 4, alpha: 0.44, speed: 42, seed: 511 });
      Z.canYang(c, 1650, 330, 95, t, { alpha: 0.4 });
      // 城头旗阵（五面小旗摆动）+ 魏字大旗
      [420, 600, 800, 1000, 1220].forEach((fx, k) => Z.flag(c, fx, 600, 70, t, { seed: 540 + k, col: 'rgba(150,40,34,.7)', text: ['魏', '军', '曹', '令', '锐'][k] }));
      Z.flag(c, 360, 590, 116, t, { seed: 533, col: 'rgba(40,56,96,.78)', text: '魏' });

      // 白门楼平台（居中偏左：楼顶平台作舞台）
      c.save();
      c.fillStyle = 'rgba(206,192,162,.85)';
      c.fillRect(120, 860, 1180, 42);
      c.strokeStyle = 'rgba(56,46,34,.9)'; c.lineWidth = 3.4; c.strokeRect(120, 860, 1180, 42);
      // 平台栏杆
      for (let x = 150; x < 1290; x += 60) brush(c, [[x, 860], [x, 806]], { w: 5, tone: 0.78, dry: 0.5, seed: 513 + x });
      brush(c, [[140, 806], [1280, 806]], { w: 6, tone: 0.75, dry: 0.6, seed: 517 });
      c.restore();
      // 楼身（平台之下隐入画外）
      c.fillStyle = 'rgba(180,164,132,.6)'; c.fillRect(300, 902, 800, 178);

      // 主动作一：曹操登楼立定（自右缓步至楼心）
      const co = ss(0.3, 1.4, lt);
      const kx = lerp(1420, 1180, co);
      Z.leader(c, kx, 936, 2.4, { t, raise: 0, stance: t * 1.2, flip: 1, cape: 1 });

      // 阶下二缚者：吕布俯首 + 陈宫
      const luDip = ss(2.0, 2.6, lt);
      c.save(); c.translate(0, luDip * 14);
      Z.fuZhe(c, 700, 952, 2.15, t, { tone: 'rgba(104,96,86,.66)', seed: 95 });   // 吕布（俯首渐深）
      c.restore();
      Z.fuZhe(c, 460, 956, 2.05, t, { tone: 'rgba(88,92,100,.62)', seed: 96 });   // 陈宫（侧后）

      // 主动作二：宫举臂直指（缚中仍直指吕布）
      const point = ss(1.2, 2.4, lt);
      c.save();
      c.strokeStyle = 'rgba(64,68,78,.85)'; c.lineWidth = 15; c.lineCap = 'round';
      const ax = 460, ay = 956 - 150;
      c.beginPath(); c.moveTo(ax + 26, ay + 62);
      c.quadraticCurveTo(ax + 90, ay + 40 - point * 26, ax + 150, ay - 10 - point * 40);
      c.stroke();
      // 指尖小手
      c.fillStyle = 'rgba(240,232,214,.9)'; c.beginPath(); c.arc(ax + 152, ay - 12 - point * 40, 7, 0, Math.PI * 2); c.fill();
      c.restore();

      // 主动作四：操拂袖（袖风横扫）
      const sleeve = ss(2.3, 2.95, lt);
      if (sleeve > 0) {
        c.save(); c.globalAlpha = sleeve * 0.7;
        brush(c, [[kx - 60, 800 - sleeve * 20], [kx - 160, 780 - sleeve * 30], [kx - 260, 800]], { w: 16, col: [220, 210, 190], tone: 0.75, dry: 0.6, seed: 521, reveal: sleeve, tail: 0.6 });
        c.restore();
      }
      // 楼上旌旗
      Z.flag(c, 250, 640, 140, t, { seed: 523, col: 'rgba(178,44,36,.82)', text: '曹' });
      Z.dust(c, t, { x: 900, y: 952, n: 5, seed: 525, scale: 1.2, alpha: 0.24 });
      Z.dust(c, t, { x: 500, y: 968, n: 4, seed: 535, scale: 1.1, alpha: 0.2 });
      // 楼前围观兵卒剪影（深色立影，随节拍轻晃 + 透明度脉动——帧差补充）
      [180, 360, 560, 900, 1080, 1300].forEach((bx, k) => {
        const sw = Math.sin(t * 1.6 + k) * 5;
        c.save(); c.globalAlpha = 0.5 + 0.12 * Math.sin(t * 1.6 + k);
        c.translate(bx + sw, 982); c.scale(0.82, 0.82);
        c.fillStyle = 'rgba(52,50,58,.72)';
        c.beginPath(); c.moveTo(-16, 0); c.quadraticCurveTo(-20, -66, -12, -100); c.quadraticCurveTo(0, -118, 12, -100); c.quadraticCurveTo(20, -66, 16, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -120, 11, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      Z.bigText(c, '但坐此人', { x: 960, y: 292 + Math.sin(t * 1.3) * 6, size: 80, gap: 18, appear: ss(1.9, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 252, 948, '白门', ss(2.25, 2.6, lt), { size: 86, seed: 527 });
    },
  };
})();
