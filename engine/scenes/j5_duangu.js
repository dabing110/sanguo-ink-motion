// ⑤ 段谷之败：延熙十九年，维与邓艾战于段谷，维死伤者众，星散流离，众庶由是怨讟。
// 主动作：阵乱、旗倒（0.2→1.3s）→ 残兵星散（1.2→2.2s）→ 姜维独还、收拢残旗（2.0→2.75s）；
// 母题循环：乱云、倒旗、流尘。
SCENES['j5_duangu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw5', '#d9d2bd');   // 全片最灰的一张纸：败仗

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'jw5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 210, tone: 0.22, seed: 37 });
      }, { blur: 3.5, halo: 14, haloA: 0.2 });
      // 乱云（循环一：夜战扬尘的对照；速度收一收，别跟人物平移叠峰）
      Z.mist(c, t, { y0: 220, y1: 600, n: 4, alpha: 0.5, speed: 44, seed: 35 });
      // 地面
      brush(c, [[0, 896], [640, 884], [1280, 898], [1920, 882]], { w: 14, tone: 0.8, dry: 0.78, seed: 45, head: 0.03, tail: 0.35, reveal: ss(0, 0.3, lt) });

      // 主动作一：汉旗倒下（匀速倒，落到地上还被风掀）
      const fall = ss(0.2, 1.3, lt);
      c.save(); c.translate(1180, 900); c.rotate(fall * 1.28);
      c.globalAlpha = 1 - fall * 0.25;
      Z.flag(c, 0, 0, 250, t, { seed: 24, col: 'rgba(178,44,36,.8)', text: '汉', droop: fall * 0.8 });
      c.restore();

      // 主动作二：残兵星散（四个人影四散跑开，距离收短 + 淡入放缓，避免与姜维平移叠加冲峰）
      [0, 1, 2, 3].forEach((k) => {
        const p = ss(1.0 + k * 0.12, 2.2 + k * 0.12, lt);
        if (p <= 0) return;
        const ang = -0.5 + k * 0.55;
        const sx = lerp(1000, 1000 + Math.cos(ang) * 520, p);
        const sy = lerp(900, 900 + Math.sin(ang) * 50, p);
        c.save(); c.globalAlpha = clamp(p * 2.4) * 0.7 * (1 - ss(2.2, 2.55, lt) * 0.4);
        brush(c, [[sx, sy], [sx - 5, sy - 44], [sx - 2, sy - 78]], { w: 13, tone: 0.62, dry: 0.6, seed: 540 + k, head: 0.08, tail: 0.26 });
        c.fillStyle = 'rgba(52,46,40,.8)'; c.beginPath(); c.arc(sx - 2, sy - 86, 10, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 主动作三：姜维独还，俯身收拢残旗（尾段第二拍；走慢点）
      const back = ss(1.6, 2.7, lt);
      const jx = lerp(1420, 1000, back);
      const stoop = ss(2.35, 2.8, lt);
      c.save();
      c.translate(jx, 926); c.rotate(stoop * 0.2); c.translate(-jx, -926);
      Z.jiangWei(c, jx, 926, 2.15, {
        t, jiAng: -0.3 - stoop * 0.55, raise: -stoop * 0.35, stance: t * 1.6, flip: 1, robe: 0, scroll: 0,
      });
      c.restore();
      // 流尘（循环二）
      Z.dust(c, t, { x: 1120, y: 908, n: 9, seed: 55, scale: 1.9, alpha: 0.46 });
      Z.seal(c, 240, 946, '段谷', ss(2.2, 2.5, lt), { size: 88, seed: 65 });
    },
  };
})();
