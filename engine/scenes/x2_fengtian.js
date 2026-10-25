// ② 奉天子：建安元年，彧劝太祖迎天子都许——「深根固本以制天下」，从此挟天子以令不臣。
// 主动作：车驾自左入（0.3→2.2s）→ 入许都城门（1.8→2.75s）→ 彧于门下拱手相迎（1.4→2.4s）
// 母题循环：车轮、旌旗、尘、香。
SCENES['x2_fengtian'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq2', '#e9e2cc');

  // 天子车驾（轮转 + 旗摆）
  const che = (c, x, y, s, t) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    // 车厢
    c.fillStyle = 'rgba(206,186,146,.8)';
    c.beginPath(); c.moveTo(-120, -90); c.lineTo(120, -90); c.lineTo(108, -10); c.lineTo(-108, -10); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(52,42,30,.9)'; c.lineWidth = 3.2; c.stroke();
    // 车盖
    c.fillStyle = 'rgba(226,208,168,.85)';
    c.beginPath(); c.moveTo(-150, -96); c.quadraticCurveTo(0, -170, 150, -96); c.lineTo(130, -88); c.quadraticCurveTo(0, -148, -130, -88); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(52,42,30,.88)'; c.lineWidth = 2.6; c.stroke();
    // 轮（辐条旋转）
    [[-70, 0], [70, 0]].forEach(([wx, wy], k) => {
      c.save(); c.translate(wx, wy); c.rotate(t * 2.4 + k);
      c.strokeStyle = 'rgba(46,38,28,.92)'; c.lineWidth = 5;
      c.beginPath(); c.arc(0, 0, 44, 0, Math.PI * 2); c.stroke();
      c.lineWidth = 2.4;
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.cos(a) * 42, Math.sin(a) * 42); c.stroke(); }
      c.restore();
    });
    // 车前御者
    brush(c, [[124, -12], [150, -60], [158, -96]], { w: 14, tone: 0.78, dry: 0.45, seed: 271, head: 0.08, tail: 0.24 });
    c.fillStyle = 'rgba(240,232,214,.92)'; c.beginPath(); c.arc(160, -108, 12, 0, Math.PI * 2); c.fill();
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'xq2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 456, amp: 120, tone: 0.2, seed: 261.4 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 300, y1: 600, n: 4, alpha: 0.5, speed: 48, seed: 263 });
      brush(c, [[0, 910], [640, 898], [1280, 912], [1920, 896]], { w: 14, tone: 0.8, dry: 0.75, seed: 267, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 14, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 44, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 5, a: 0.3 });

      // 许都城门（右侧）
      c.save();
      c.fillStyle = 'rgba(150,132,102,.62)'; c.fillRect(1380, 380, 120, 530);
      c.fillStyle = 'rgba(170,152,120,.6)'; c.fillRect(1560, 430, 110, 480);
      c.strokeStyle = 'rgba(48,40,30,.85)'; c.lineWidth = 3;
      c.strokeRect(1380, 380, 120, 530); c.strokeRect(1560, 430, 110, 480);
      // 门楼
      c.fillStyle = 'rgba(164,124,76,.8)';
      c.beginPath(); c.moveTo(1320, 384); c.quadraticCurveTo(1530, 280, 1740, 384); c.lineTo(1690, 396); c.lineTo(1370, 396); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(46,38,28,.88)'; c.lineWidth = 3; c.stroke();
      c.restore();
      Z.flag(c, 1460, 560, 170, t, { seed: 269, col: 'rgba(178,44,36,.82)', text: '汉' });

      // 主动作一：车驾自左入（500px / 1.9s ≈ 263px/s）
      const go = ss(0.3, 2.2, lt);
      const cx = lerp(380, 880, go);
      che(c, cx, 880, 1.35, t);
      Z.dust(c, t, { x: cx - 160, y: 900, n: 6, seed: 273, scale: 1.4, alpha: 0.34 });

      // 主动作二：荀彧于门下拱手相迎
      const hold = ss(1.4, 2.4, lt);
      Z.xunYu(c, 1240, 966, 2.4, { t, raise: hold * 0.5, stance: t * 1.2, flip: 1, dark: 0, bow: hold * 0.2 });
      // 门下士卒二列（原地持戟）
      c.save(); c.globalAlpha = 0.8;
      [1180, 1320].forEach((gx, k) => {
        brush(c, [[gx, 966], [gx + 1, 800]], { w: 8, tone: 0.85, dry: 0.4, seed: 275 + k });
        brush(c, [[gx, 812], [gx + 26, 790]], { w: 5, tone: 0.85, dry: 0.5, seed: 277 + k });
        c.fillStyle = 'rgba(44,40,34,.86)'; c.beginPath(); c.arc(gx, 786, 10, 0, Math.PI * 2); c.fill();
      });
      c.restore();
      Z.xiangLu(c, 320, 930, 1.3, t, { smoke: 1, seed: 9 });

      Z.bigText(c, '深根固本', { x: 960, y: 286, size: 78, gap: 16, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 252, 950, '都许', ss(2.25, 2.6, lt), { size: 86, seed: 279 });
    },
  };
})();
