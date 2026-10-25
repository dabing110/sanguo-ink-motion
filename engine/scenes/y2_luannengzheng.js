// ② 在乱能整：建安二年，张绣反，太祖军乱，青州兵乘势劫掠；禁勒兵数之，斩首，先立营垒而后见太祖。
// 太祖悦，谓禁曰：「将军在乱能整，讨暴坚垒，有不可动之节，虽古名将，何以加之！」
// 主动作：奔卒四散（0.1→1.3s）→ 整队成列（1.1→2.2s）→ 按刀立定、火光（2.0→2.75s）
// 母题循环：夜色、乱火、烟、尘。
SCENES['y2_luannengzheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj2', '#e6dfc9');

  // 一处火（火苗随时间上窜）
  const fire = (c, x, y, s, t, seed = 1) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.save(); c.globalCompositeOperation = 'lighter';
    const g = c.createRadialGradient(0, -30, 4, 0, -30, 150);
    g.addColorStop(0, 'rgba(255,180,86,.55)'); g.addColorStop(1, 'rgba(255,140,60,0)');
    c.fillStyle = g; c.beginPath(); c.arc(0, -30, 150, 0, Math.PI * 2); c.fill();
    c.restore();
    for (let k = 0; k < 5; k++) {
      const f = (Math.sin(t * 5.4 + k * 1.9 + seed) * 0.5 + 0.5);
      const h = 60 + f * 70;
      brush(c, [[k * 12 - 24, 0], [k * 12 - 20 + Math.sin(t * 3 + k) * 8, -h * 0.55], [k * 12 - 14 + Math.sin(t * 4.2 + k) * 14, -h]],
        { w: 15 - k * 1.6, col: [232, 126 + f * 90, 44], tone: 0.95, dry: 0.6, seed: seed * 10 + k, tail: 0.9, bristles: 3 });
    }
    c.restore();
  };
  // 烟（匀速上升，常驻运动）
  const smoke = (c, x, y, t, seed = 1, alpha = 0.3) => {
    c.save(); c.filter = 'blur(10px)';
    for (let k = 0; k < 4; k++) {
      const ph = ((t * 0.42 + k * 0.25 + seed * 0.1) % 1);
      c.fillStyle = `rgba(120,116,108,${alpha * (1 - ph) * 0.9})`;
      c.beginPath(); c.ellipse(x + Math.sin(t * 0.9 + k) * 26 + ph * 40, y - ph * 300, 46 + ph * 120, 34 + ph * 80, 0, 0, Math.PI * 2); c.fill();
    }
    c.filter = 'none'; c.restore();
  };
  // 奔卒 / 队列中的卒（run: 0→1 奔散程度）
  const zu = (c, x, y, s, t, o = {}) => {
    const { run = 0, seed = 100, lean = 0, spear = 1 } = o;
    const sw = Math.sin(t * 6.5 + seed) * (0.05 + run * 0.12);
    c.save(); c.translate(x, y); c.scale(s, s); c.rotate(sw + lean * 0.35 * run);
    const legs = run ? Math.sin(t * 11 + seed) * 22 : 10;
    brush(c, [[0, -76], [-legs, -36], [-legs - 6, 2]], { w: 18, tone: 0.82, dry: 0.5, seed: seed + 1, head: 0.06, tail: 0.2 });
    brush(c, [[0, -76], [legs, -36], [legs + 6, 2]], { w: 18, tone: 0.82, dry: 0.5, seed: seed + 2, head: 0.06, tail: 0.2 });
    c.fillStyle = 'rgba(110,106,96,.62)';
    c.beginPath(); c.moveTo(-30, -148); c.lineTo(30, -152); c.lineTo(36, -80); c.lineTo(-34, -74); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(26,24,20,.88)'; c.lineWidth = 2.8; c.stroke();
    brush(c, [[-32, -80], [0, -74], [32, -80]], { w: 13, col: [98, 74, 42], tone: 0.9, dry: 0.35, seed: seed + 3 });
    c.fillStyle = 'rgba(240,232,214,.95)'; c.beginPath(); c.ellipse(2, -174, 15, 17, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.85)'; c.lineWidth = 2; c.stroke();
    c.fillStyle = 'rgba(88,82,72,.92)'; c.beginPath(); c.ellipse(2, -182, 17, 8, 0, Math.PI, 0); c.fill();
    if (spear) brush(c, [[20, -146], [lerp(38, 62, run), -178], [lerp(40, 96, run), -lerp(226, 190, run)]], { w: 7, tone: 0.86, dry: 0.4, seed: seed + 4, tail: 0.4 });
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'yj2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 470, amp: 128, tone: 0.2, seed: 44.2 }]);
        g.fillStyle = 'rgba(40,44,60,.24)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      // 夜色
      c.save(); c.globalCompositeOperation = 'multiply';
      c.fillStyle = 'rgba(78,84,112,.5)'; c.fillRect(0, 0, 1920, 1080); c.restore();
      Z.mist(c, t, { y0: 340, y1: 700, n: 4, alpha: 0.5, speed: 58, seed: 47 });

      brush(c, [[0, 904], [640, 892], [1280, 906], [1920, 890]], { w: 14, tone: 0.78, dry: 0.75, seed: 48, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：青州兵四散劫掠（1.3s 后整队）—— 起点全在画内
      const scatter = ss(0.1, 1.3, lt), regroup = ss(1.1, 2.2, lt);
      const vis = [[1180, 900, 1720, 868], [1330, 918, 1560, 884], [1470, 936, 1390, 902], [1620, 954, 1290, 920], [1760, 972, 1190, 938]];
      for (let k = 0; k < vis.length; k++) {
        const [x0, y0, x1, y1] = vis[k];
        // 先从原位奔散，再回到整齐行列
        const run = scatter * (1 - regroup);
        const px = lerp(lerp(x0, x1, scatter), 1180 + k * 96, regroup);
        const py = lerp(lerp(y0, y1, scatter), 900 + k * 22, regroup);
        c.save(); c.globalAlpha = 0.92;
        zu(c, px, py, 1.55, t, { run, seed: 120 + k * 9, lean: (k % 2 ? 1 : -1), spear: k % 2 });
        c.restore();
      }

      // 主动作二：于禁按刀立于中（标杆）
      const set = ss(0.5, 1.6, lt);
      Z.yuJin(c, 900, 966, 2.35, { t, jiAng: lerp(-0.32, -1.02, set), raise: set * 0.28, stance: t * 1.3, flip: 0, old: 0, sword: 0 });
      Z.flag(c, 900, 700, 226, t, { seed: 55, col: 'rgba(178,44,36,.8)', text: '于' });

      // 火（左右两处）与烟（常驻运动）
      fire(c, 420, 900, 1.5, t, 2);
      fire(c, 1620, 892, 1.3, t, 5);
      smoke(c, 424, 878, t, 2, 0.34);
      smoke(c, 1624, 870, t, 5, 0.3);
      Z.dust(c, t, { x: 1240, y: 950, n: 7, seed: 61, scale: 1.4, alpha: 0.3 });

      // 第三拍：收刀
      Z.bigText(c, '在乱能整', { x: 1000, y: 288, size: 78, gap: 16, appear: ss(1.9, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 258, 950, '讨暴', ss(2.25, 2.6, lt), { size: 86, seed: 77 });
    },
  };
})();
