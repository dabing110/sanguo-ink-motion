// ⑦ 一身是胆：汉水战后，刘备赞曰「子龙一身都是胆」。
// 主动作：「一身是胆」四个大字逐字落墨（0.3→1.8s），末了顿章；赵云立马军前。母题循环：两枝火把熊熊、旌旗夜卷。
SCENES['z7_dan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zl_paper7', '#e8dcc4');        // 夜宴纸色

  function torch(c, x, y, t, s = 1) {
    c.save(); c.translate(x, y); c.scale(s, s);
    brush(c, [[0, 0], [3, -110]], { w: 8, tone: 0.85, dry: 0.5, seed: 350 });
    brush(c, [[-14, -110], [16, -112]], { w: 6, tone: 0.7, dry: 0.5, seed: 351 });
    for (let i = 0; i < 4; i++) {
      const fl = Math.sin(t * 10 + i * 1.9) * 0.34;
      leaf(c, i * 7 - 10, -116, -1.5 + fl, 52 + Math.sin(t * 8 + i * 2) * 12, 14, 0.82, [198, 92, 38]);
      leaf(c, i * 7 - 10, -122, -1.7 + fl * 0.7, 36 + Math.sin(t * 9 + i) * 9, 10, 0.9, [170, 42, 32]);
    }
    c.filter = 'blur(9px)'; c.globalAlpha = 0.5;              // 火晕
    c.fillStyle = 'rgba(226,130,50,.5)'; c.beginPath(); c.arc(2, -138, 34 + Math.sin(t * 7) * 5, 0, Math.PI * 2); c.fill();
    c.filter = 'none'; c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 夜色：上下淡墨晕
      c.save(); c.globalAlpha = 0.22;
      const gr = c.createLinearGradient(0, 0, 0, H);
      gr.addColorStop(0, '#3a3f52'); gr.addColorStop(0.5, 'rgba(58,63,82,0)'); gr.addColorStop(1, '#2c3040');
      c.fillStyle = gr; c.fillRect(0, 0, W, H); c.restore();
      Z.wash(c, 'z7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 1920, [{ y0: 520, amp: 100, tone: 0.22, seed: 29.1 }]);
      }, { blur: 4, halo: 16, haloA: 0.3 });
      brush(c, [[0, 852], [640, 838], [1300, 850], [1920, 842]], { w: 10, tone: 0.6, dry: 0.8, seed: 17, reveal: ss(0, 0.3, lt) });
      // 旌旗夜卷（循环一）
      [[240, 760], [1680, 752]].forEach(([fx, fy], i) => Z.flag(c, fx, fy, 260, t, { seed: 40 + i, col: 'rgba(140,44,38,.8)' }));
      // 火把（循环二）
      torch(c, 560, 852, t, 1.25); torch(c, 1330, 858, t, 1.1);
      // 赵云立马军前（中景偏右）
      const zx = 960, zy = 880;
      const p = t * 5;
      Z.horse(c, zx, zy, 1.3, p, { gallop: 0 });
      Z.rider(c, zx, zy, 1.3, p, { spearAng: -0.9, spearLen: 380, t, backFlag: 0, cape: 1 });
      // 大字（主动作）：逐字落墨
      Z.bigText(c, '一身是胆', { x: 960, y: 330, size: 190, gap: 36, appear: ss(0.3, 1.9, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.35)', blur: 14, x: 4, y: 6 } });
      // 刘备赞语小字
      c.save(); c.globalAlpha = ss(1.6, 2.1, lt);
      c.font = '40px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.85)'; c.textAlign = 'center';
      c.fillText('子龙一身都是胆也', 960, 480);
      c.restore();
      Z.seal(c, 1762, 952, '虎威', ss(2.1, 2.35, lt), { size: 88, seed: 23 });
    },
  };
})();
