// ⑤ 七军俱没：建安二十四年秋，关羽攻樊，禁督七军救仁；汉水泛溢，平地水数丈，禁等七军皆没。
// 禁与诸将登高望水，无所回避，遂降——这是他四十年行伍里唯一一次「乱」。
// 主动作：水漫上涨（0.15→2.2s）→ 坞丘上退守（1.8→2.6s）→ 按剑长立、四顾（2.1→2.75s）
// 母题循环：水面、浪、雨意云、残旗（ drowning 的旗）。
SCENES['y5_qijun'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj5', '#e6dfca');

  // 雨幕（汉水泛溢配大雨：斜落短线，全程常驻）
  const rain = (c, t, o = {}) => {
    const { n = 46, speed = 760, alpha = 0.3, seed = 5 } = o;
    const r = rng(seed);
    c.save(); c.strokeStyle = `rgba(66,78,92,${alpha})`; c.lineWidth = 2.2; c.lineCap = 'round';
    for (let k = 0; k < n; k++) {
      const px0 = r() * 2100, py0 = r() * 1200;
      const ph = ((t * speed / 1200 + py0 / 1200) % 1);
      const py = ph * 1200 - 60;
      const px = px0 + py * 0.18;
      if (py < -20 || px < -20 || px > 1940) continue;
      c.beginPath(); c.moveTo(px, py); c.lineTo(px - 7, py + 26); c.stroke();
    }
    c.restore();
  };
  // 半没的营（sink: 0 完整 → 1 沉没）
  const ying = (c, x, y, s, t, o = {}) => {
    const { sink = 0, seed = 400 } = o;
    c.save(); c.translate(x, y); c.scale(s, s);
    c.globalAlpha = 0.9;
    const top = -40 - (1 - sink) * 10;
    // 帐
    c.fillStyle = 'rgba(206,194,166,.6)';
    c.beginPath(); c.moveTo(-52, top); c.quadraticCurveTo(0, top - 84, 52, top); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(48,42,32,.8)'; c.lineWidth = 2.4; c.stroke();
    brush(c, [[-52, top], [0, top - 6], [52, top]], { w: 8, tone: 0.72, dry: 0.6, seed: seed });
    // 旗（越高 y 越小；随 sink 越垂）
    const h = lerp(150, 60, sink);
    brush(c, [[20, top - 70], [20 + sink * 6, top - 70 - h]], { w: 5, tone: 0.8, dry: 0.5, seed: seed + 1 });
    const wv = Math.sin(t * 2.6 + seed) * 10 * (1 - sink * 0.7);
    c.fillStyle = `rgba(168,44,36,${0.8 * (1 - sink * 0.55)})`;
    c.beginPath(); c.moveTo(20 + sink * 6, top - 70 - h);
    c.quadraticCurveTo(70 + wv, top - 76 - h + 10 * sink, 108 + wv * 0.6, top - 60 - h + 26 * sink);
    c.lineTo(104, top - 30 - h + 34 * sink); c.quadraticCurveTo(66, top - 44 - h + 16 * sink, 20 + sink * 6, top - 34 - h);
    c.closePath(); c.fill();
    c.restore();
  };
  // 漂流的什物（兵器、帐柱）
  const drift = (c, t, o = {}) => {
    const { y = 700, n = 5, speed = 46, seed = 3, alpha = 0.4 } = o;
    c.save(); c.globalAlpha = alpha;
    for (let k = 0; k < n; k++) {
      const ph = (t * speed / 2200 + k / n) % 1;
      const px = 1920 - ph * 2200;
      const yy = y + k * 46 + Math.sin(t * 1.3 + k) * 8;
      brush(c, [[px, yy], [px + 60, yy - 6], [px + 96, yy + 4]], { w: 6, tone: 0.7, dry: 0.6, seed: seed + k, tail: 0.5 });
    }
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'yj5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 470, amp: 116, tone: 0.2, seed: 121.5 }]);
        g.fillStyle = 'rgba(72,84,96,.2)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      // 雨云（低,快速）
      Z.mist(c, t, { y0: 260, y1: 560, n: 5, alpha: 0.6, speed: 74, seed: 123 });

      // 主动作一：七军沿河列營，水涨则没
      const level = ss(0.15, 2.25, lt);
      const topY = lerp(940, 636, level);
      for (let k = 0; k < 7; k++) {
        const bx = 250 + k * 250;
        const sinkP = clamp(level * 1.9 - k * 0.14);
        c.save(); c.globalAlpha = 0.95;
        ying(c, bx, 930 + (k % 2) * 10, 0.92, t, { sink: sinkP, seed: 410 + k * 6 });
        c.restore();
      }

      // 大水（主动作二：横贯画面的上涨水体）
      Z.shuiYan(c, t, { y0: 620, y1: 940, level: level * 0.98, seed: 133 });
      // 雨幕（水位漫过之后更大——常驻运动主力）
      rain(c, t, { n: 34, alpha: 0.2 + level * 0.16, seed: 5 });
      drift(c, t, { y: lerp(1000, 700, level), n: 6, speed: 40, seed: 141, alpha: 0.42 });
      drift(c, t, { y: lerp(1030, 740, level), n: 5, speed: 66, seed: 151, alpha: 0.36 });
      Z.yunHai(c, t, { y: lerp(880, 660, level), h: 70, n: 4, speed: 56, alpha: 0.4 });

      // 主动作三：禁登坞丘按剑，四顾无所回避
      const up = ss(1.75, 2.6, lt);
      const py = lerp(966, 902, up);
      // 丘
      c.fillStyle = 'rgba(196,182,152,.72)';
      c.beginPath(); c.moveTo(1180, 1080); c.quadraticCurveTo(1330, 840, 1500, 1080); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(52,44,34,.7)'; c.lineWidth = 2.6; c.stroke();
      Z.yuJin(c, 1340, py + 24, 2.45, { t, jiAng: 0, raise: 0, stance: t * 1.1, flip: 0, old: 0, sword: 1 });
      Z.dust(c, t, { x: 1400, y: py + 30, n: 5, seed: 151, scale: 1.1, alpha: 0.26 });

      Z.bigText(c, '七军俱没', { x: 960, y: 268, size: 80, gap: 18, appear: ss(1.9, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 252, 948, '汉水', ss(2.2, 2.6, lt), { size: 86, seed: 157 });
    },
  };
})();
