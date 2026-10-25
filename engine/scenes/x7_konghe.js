// ⑦ 空食盒：太祖军濡须，彧疾留寿春。太祖馈彧食，发之乃空器也。——他一生信的东西，都在这只空盒子里。
// 全片最安静的一幕：动作只有「开盒」。
// 主动作：盒置案上（0.3→1.0s）→ 缓缓开盖（0.9→2.4s）→ 俯身视盒、久久不动（2.2→2.95s）
// 母题循环：只剩一缕将断的香烟、灯焰、窗外雨意。
SCENES['x7_konghe'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq7', '#e8e1ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'xq7_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(60,62,70,.18)'; g.fillRect(0, 0, 1920, 1080);   // 暮色进屋
        g.save(); g.strokeStyle = 'rgba(60,48,36,.5)'; g.lineWidth = 15;
        [[250, 0, 250, 780], [1670, 0, 1670, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(110, 110); g.lineTo(1810, 110); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      Z.mist(c, t, { y0: 430, y1: 720, n: 3, alpha: 0.32, speed: 26, seed: 341 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.72, dry: 0.75, seed: 343, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 20, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 50, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 11, a: 0.3 });

      // 灯焰（更暗更小）
      c.save();
      brush(c, [[400, 916], [400, 810]], { w: 9, tone: 0.82, dry: 0.4, seed: 345 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 4.6) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(400, 790, 3, 400, 790, 46 + f * 10);
      g2.addColorStop(0, 'rgba(255,190,90,.5)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(400, 790, 46 + f * 10, 0, Math.PI * 2); c.fill();
      c.restore();

      // 案
      c.fillStyle = 'rgba(132,102,62,.85)';
      c.fillRect(760, 806, 560, 32);
      c.strokeStyle = 'rgba(52,42,28,.9)'; c.lineWidth = 3.2; c.strokeRect(760, 806, 560, 32);
      brush(c, [[820, 838], [820, 916]], { w: 15, tone: 0.75, dry: 0.5, seed: 347 });
      brush(c, [[1260, 838], [1260, 916]], { w: 15, tone: 0.75, dry: 0.5, seed: 348 });

      // 主动作一：盒置案上（自上缓缓落定）→ 主动作二：开盖（全程 1.5s，极缓）
      const put = ss(0.3, 1.0, lt), open = ss(0.9, 2.4, lt);
      const by = lerp(700, 806, put);
      Z.kongHe(c, 1040, by, 1.15, open, t, { seed: 4 });

      // 主动作三：俯身视盒（bow 缓增）
      const bow = ss(2.0, 2.95, lt);
      Z.xunYu(c, 1040, 900, 2.6, { t, raise: 0, stance: t * 0.9, flip: 0, dark: 1, bow: bow * 0.3, box: 0 });

      // 香烟只剩一缕，且将断（smoke 随开盒减弱）
      Z.xiangLu(c, 1560, 918, 1.2, t, { smoke: 0.9 - open * 0.8, seed: 18 });

      Z.bigText(c, '发之乃空器也', { x: 960, y: 268, size: 72, gap: 16, appear: ss(2.35, 3.05, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '寿春', ss(2.3, 2.65, lt), { size: 86, seed: 351 });
    },
  };
})();
