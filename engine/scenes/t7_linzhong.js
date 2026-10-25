// ⑦ 临终之叹：慈临亡，叹息曰：「丈夫生世，当带三尺之剑，以升天子之阶。今所志未从，奈何而死乎！」
// 主动作：慈按剑而立（0.2→1.2s）→ 抽剑、一记剑光（1.0→2.1s）→ 剑归鞘、叹息（2.0→2.95s）；
// 母题循环：云海、西风、归雁。
SCENES['t7_linzhong'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc7', '#ded7c2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'tc7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 462, amp: 118, tone: 0.2, seed: 83.6 }]);
      }, { blur: 4, halo: 16, haloA: 0.24 });
      Z.geese(c, t, { y: 250, x0: 1880, speed: 168, n: 5, seed: 4, scale: 1.0 });
      Z.mist(c, t, { y0: 260, y1: 580, n: 4, alpha: 0.55, speed: 50, seed: 37 });
      Z.yunHai(c, t, { y: 840, h: 120, n: 6, speed: 94, alpha: 0.62 });
      brush(c, [[0, 900], [640, 888], [1280, 902], [1920, 884]], { w: 14, tone: 0.8, dry: 0.78, seed: 47, head: 0.03, tail: 0.32, reveal: ss(0, 0.3, lt) });

      // 主动作一：按剑而立（小幅就位）
      const set = ss(0.2, 1.2, lt);
      const tx = lerp(880, 820, set);
      // 主动作二：抽剑，一记剑光（三尺之剑）
      const draw = ss(1.0, 1.85, lt);
      const sweep = ss(1.25, 2.15, lt);
      if (draw > 0) {
        c.save(); c.globalAlpha = draw;
        // 剑身（一笔直刃，长三尺 → 画得比戟短而直）
        const ang = lerp(-0.9, -0.25, sweep);
        c.save(); c.translate(tx - 210, 926 - 320); c.rotate(ang);
        brush(c, [[0, 0], [230, 0]], { w: 9, tone: 0.95, dry: 0.3, seed: 85, tail: 0.2 });
        c.fillStyle = 'rgba(24,24,26,.95)'; c.beginPath(); c.moveTo(268, 0); c.lineTo(228, -9); c.lineTo(228, 9); c.closePath(); c.fill();
        brush(c, [[-40, 0], [-14, 0]], { w: 13, tone: 0.7, dry: 0.4, seed: 86 });        // 剑柄
        c.restore();
        c.restore();
        // 剑光（一道白弧）
        c.save(); c.globalAlpha = sweep * 0.5; c.strokeStyle = 'rgba(255,253,248,.95)'; c.lineWidth = 7; c.lineCap = 'round';
        c.beginPath(); c.arc(tx - 150, 926 - 330, 300, -0.85, 0.35); c.stroke();
        c.restore();
      }
      // 主动作三：剑归鞘、叹息（尾段第二拍：人微微低首）
      const rest = ss(2.1, 2.95, lt);
      c.save();
      c.translate(tx, 926); c.rotate(rest * 0.1); c.translate(-tx, -926);
      Z.taiShiCi(c, tx, 926, 2.2, {
        t, jiAng: lerp(-0.5, -0.85, set) - draw * 0.5 + rest * 0.3, raise: 0,
        stance: t * 1.4, flip: 0, bow: 0, helm: 1,
      });
      c.restore();
      Z.dust(c, t, { x: 980, y: 918, n: 8, seed: 57, scale: 1.7, alpha: 0.38 });
      Z.bigText(c, '三尺之剑', { x: 1010, y: 296, size: 84, gap: 18, appear: ss(1.9, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(150,40,30,.26)', blur: 13, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(2.35, 2.7, lt);
      c.font = '32px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.82)'; c.textAlign = 'center';
      c.fillText('——今所志未从', 1010, 380);
      c.restore();
      Z.seal(c, 240, 946, '临终', ss(2.4, 2.7, lt), { size: 88, seed: 67 });
    },
  };
})();
