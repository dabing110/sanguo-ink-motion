// ⑧ 坐处三日香：彧以忧薨，时年五十。谥曰敬侯。——「荀令君至人家，坐处三日香。」
// 人走了，香还在。收束全片的不是死亡，是他留下来的味道。
// 主动作：彧坐于席上渐渐隐去（0.5→2.8s 淡出）→ 香烟大盛、满室缭绕（全程常驻）→ 题跋落印（2.6→3.6s）
// 母题循环：三炉并燃、灯焰、席上尘。
SCENES['x8_sanrixiang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq8', '#eae4cf');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'xq8_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(86,80,66,.1)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(72,58,42,.42)'; g.lineWidth = 15;
        [[230, 0, 230, 780], [1690, 0, 1690, 780]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 9; g.beginPath(); g.moveTo(110, 108); g.lineTo(1810, 108); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 400, y1: 700, n: 4, alpha: 0.42, speed: 34, seed: 361 });
      brush(c, [[0, 920], [640, 910], [1280, 922], [1920, 908]], { w: 13, tone: 0.76, dry: 0.75, seed: 363, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷（两侧）+ 浓墨烟带（满室缭绕之外再补持续运动）
      Z.curtain(c, 150, 120, t, { seed: 81, a: 0.3 });
      Z.curtain(c, 1770, 120, t, { seed: 82, a: 0.3 });
      Z.inkSmoke(c, 960, 520, t, { seed: 17, a: 0.3 });
      // 墨色云影（持续平移帧差主力，覆盖人影淡出后 lt>2.8s 的静止谷底）
      Z.inkCloud(c, t, { y: 600, h: 56, n: 4, speed: 66, span: 1400, seed: 9 });

      // 席（跪坐的软席）
      c.fillStyle = 'rgba(178,152,108,.6)';
      c.beginPath(); c.ellipse(960, 928, 300, 44, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(70,56,38,.6)'; c.lineWidth = 2.4; c.stroke();

      // 主动作一：彧跪坐席上，身影缓缓化入香烟
      const fade = ss(0.5, 2.8, lt);
      c.save(); c.globalAlpha = 1 - fade * 0.92;
      c.save(); c.translate(0, 26); c.rotate(0.1);                    // 跪坐姿态：袍身压低前倾
      Z.xunYu(c, 960, 936, 2.5, { t: t * 0.5, raise: 0, stance: 0, flip: 0, dark: 0, bow: 0.24, box: 0 });
      c.restore(); c.restore();

      // 主动作二：三炉并燃，香烟大盛（满室缭绕——「三日香」）
      Z.xiangLu(c, 560, 922, 1.5, t, { smoke: 1, seed: 21 });
      Z.xiangLu(c, 960, 948, 1.35, t, { smoke: 1, seed: 22 });
      Z.xiangLu(c, 1360, 922, 1.5, t, { smoke: 1, seed: 23 });
      // 满室浮香（缓慢上升的光点）
      c.save();
      for (let k = 0; k < 9; k++) {
        const ph = ((t * 0.09 + k / 9) % 1);
        const px = 260 + (k * 173) % 1420 + Math.sin(t * 0.8 + k) * 24;
        const py = 940 - ph * 760;
        c.fillStyle = `rgba(238,226,196,${0.5 * (1 - ph)})`;
        c.beginPath(); c.arc(px, py, 3.5 + (k % 3), 0, Math.PI * 2); c.fill();
      }
      c.restore();

      // 灯焰
      c.save();
      brush(c, [[300, 918], [300, 812]], { w: 9, tone: 0.84, dry: 0.4, seed: 365 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(300, 792, 3, 300, 792, 52 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.55)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(300, 792, 52 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();

      Z.bigText(c, '坐处三日香', { x: 1010, y: 262 + Math.sin(t * 1.25) * 7, size: 76, gap: 18, appear: ss(2.6, 3.35, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 948, '敬侯', ss(2.95, 3.3, lt), { size: 88, seed: 367 });
    },
  };
})();
