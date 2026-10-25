// ⑧ 身后：宫死，操养其母终身，嫁其女。——刀是曹操的，眼泪也是曹操的。
// 收束全片：白门楼空镜，残阳西沉，雁阵南去——刚直壮烈，四字盖棺。
// 主动作：残阳缓沉（全程常驻）→ 楼影渐暗（1.8→2.9s）→ 雁阵远去（全程）→ 题跋落印（2.7→3.6s）
// 母题循环：残阳、云、雁、风。
SCENES['c8_shenhou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq8', '#e9d9c0');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'cq8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 480, amp: 100, tone: 0.2, seed: 551.5 }]);
        g.fillStyle = 'rgba(140,74,46,.2)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      // 残阳缓沉（本幕主运动）
      const sink = ss(0.2, 3.6, lt);
      Z.canYang(c, 1560, lerp(400, 560, sink), lerp(130, 148, sink), t, { alpha: 0.55 - sink * 0.15 });
      Z.mist(c, t, { y0: 330, y1: 620, n: 4, alpha: 0.46, speed: 44, seed: 553 });
      Z.geese(c, t, { y: 240, x0: 1980, speed: 130, n: 6, seed: 61, scale: 1.15 });
      brush(c, [[0, 926], [640, 914], [1280, 928], [1920, 912]], { w: 14, tone: 0.74, dry: 0.75, seed: 555, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 18, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 48, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 19, a: 0.3 });

      // 白门楼（居中，随时间渐暗——人去楼空）
      const dim = ss(1.8, 2.9, lt);
      c.save(); c.globalAlpha = 1 - dim * 0.3;
      Z.baiMenLou(c, 960, 930, 1.15, t, { tone: 0.7 });
      c.restore();
      // 楼上旗（降半旗式：低垂）
      c.save(); c.globalAlpha = 1 - dim * 0.5;
      Z.flag(c, 620, 640, 130, t, { seed: 557, col: 'rgba(178,44,36,.75)', text: '曹', droop: 0.5 });
      c.restore();

      // 楼前：老母受养的剪影（远远一人一杖，静立）
      c.save(); c.globalAlpha = 0.75;
      brush(c, [[400, 926], [398, 860], [402, 836]], { w: 12, tone: 0.76, dry: 0.5, seed: 559, head: 0.1, tail: 0.2 });
      c.fillStyle = 'rgba(236,226,206,.9)'; c.beginPath(); c.arc(400, 820, 11, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(60,48,36,.7)'; c.lineWidth = 2; c.stroke();
      c.restore();

      Z.dust(c, t, { x: 1240, y: 940, n: 5, seed: 561, scale: 1.2, alpha: 0.22 });
      Z.bigText(c, '刚直壮烈', { x: 960, y: 282, size: 86, gap: 20, appear: ss(2.35, 3.1, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 948, '身后', ss(2.7, 3.05, lt), { size: 86, seed: 563 });
    },
  };
})();
