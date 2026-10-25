// ⑥ 不宜如此：十七年，董昭等谓太祖宜进爵国公、备九锡。彧曰：「本兴义兵以匡朝宁国……不宜如此。」
// 太祖心不能平——他递上去了他一生里最重的一句话，也递上了自己的名字。
// 主动作：九锡之议卷轴展开（0.4→1.6s）→ 彧举袖拒之（1.3→2.4s）→ 转身背对（2.2→2.95s）
// 母题循环：卷轴渐开、香炉烟（渐弱）、帐幕。
SCENES['x6_buyi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq6', '#e9e1c8');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'xq6_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(80,72,60,.12)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(70,56,42,.5)'; g.lineWidth = 15;
        [[210, 0, 210, 780], [1710, 0, 1710, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(100, 110); g.lineTo(1820, 110); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 400, y1: 700, n: 3, alpha: 0.36, speed: 30, seed: 331 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.76, dry: 0.75, seed: 333, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带
      Z.curtain(c, 180, 130, t, { seed: 61, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 62, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 13, a: 0.3 });

      // 主动作一：九锡之议（案上卷轴自右向左展开）
      const un = ss(0.4, 1.6, lt);
      const scrollW = lerp(40, 560, un);
      c.save(); c.translate(1340, 800);
      c.fillStyle = 'rgba(240,230,204,.95)';
      c.fillRect(-scrollW, -70, scrollW, 120);
      c.strokeStyle = 'rgba(56,46,32,.9)'; c.lineWidth = 2.8;
      c.strokeRect(-scrollW, -70, scrollW, 120);
      // 卷轴两端的轴杆
      c.fillStyle = 'rgba(110,84,50,.92)';
      c.fillRect(-scrollW - 10, -78, 14, 136); c.fillRect(4, -78, 14, 136);
      if (un > 0.5) {
        c.fillStyle = 'rgba(60,48,36,.85)';
        c.font = '44px "LXGWWenKai-500"'; c.textAlign = 'center';
        c.fillText('进爵国公 · 备九锡', -scrollW / 2 + 4, -2);
      }
      c.restore();

      // 呈议之使（立于案旁）
      c.save(); c.globalAlpha = 0.85;
      const ex = lerp(1800, 1660, ss(0.2, 1.2, lt));
      brush(c, [[ex, 948], [ex - 4, 888], [ex - 2, 854]], { w: 17, tone: 0.72, dry: 0.5, seed: 335, head: 0.08, tail: 0.24 });
      c.fillStyle = 'rgba(44,40,34,.86)'; c.beginPath(); c.arc(ex - 2, 844, 11, 0, Math.PI * 2); c.fill();
      c.restore();

      // 主动作二：彧举袖拒之 → 主动作三：转身背对
      const rej = ss(1.3, 2.4, lt), turn = ss(2.2, 2.95, lt);
      const px = lerp(700, 760, rej);
      Z.xunYu(c, px, 962, 2.55, { t, raise: rej * 0.55, stance: t * 1.2, flip: turn > 0.5 ? 1 : 0, dark: 0, bow: 0 });
      // 拒字（袖起时亮出）
      Z.bigText(c, '不宜如此', { x: 980, y: 292 + Math.sin(t * 1.25) * 7, size: 80, gap: 18, appear: ss(1.8, 2.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });

      // 香炉（烟渐弱—— 心不能平的注脚）
      Z.xiangLu(c, 420, 930, 1.3, t, { smoke: 1 - rej * 0.75, seed: 16 });
      Z.seal(c, 250, 950, '匡朝', ss(2.25, 2.6, lt), { size: 86, seed: 339 });
    },
  };
})();
