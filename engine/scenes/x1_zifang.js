// ① 吾之子房：彧弃绍从曹。太祖大悦曰：「吾之子房也。」——乱世里最贵的一次跳槽。
// 主动作：操迎于帐前（0.3→1.5s）→ 执手相看（1.2→2.2s）→ 同入大帐（2.0→2.95s）
// 母题循环：香炉烟、帐幕、尘。
SCENES['x1_zifang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq1', '#e9e1cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'xq1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 452, amp: 128, tone: 0.2, seed: 241.5 },
          { y0: 556, amp: 84, tone: 0.3, seed: 245.9 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.5, speed: 46, seed: 243 });
      Z.yunHai(c, t, { y: 700, h: 90, n: 4, speed: 60, alpha: 0.46 });
      brush(c, [[0, 908], [640, 896], [1280, 910], [1920, 894]], { w: 14, tone: 0.8, dry: 0.75, seed: 247, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静态文戏补运动）
      Z.curtain(c, 180, 130, t, { seed: 21, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 22, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 3, a: 0.3 });

      // 大帐（居后）
      brush(c, [[300, 900], [300, 660]], { w: 13, tone: 0.8, dry: 0.4, seed: 251 });
      brush(c, [[880, 900], [880, 660]], { w: 13, tone: 0.8, dry: 0.4, seed: 252 });
      c.fillStyle = 'rgba(198,178,142,.66)';
      c.beginPath(); c.moveTo(240, 662); c.quadraticCurveTo(590, 520, 940, 662); c.lineTo(880, 676); c.lineTo(300, 676); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(52,44,34,.86)'; c.lineWidth = 3; c.stroke();

      // 主动作一：曹操自帐中出迎 → 主动作二：执手
      const out = ss(0.3, 1.5, lt), hold = ss(1.2, 2.2, lt);
      Z.leader(c, lerp(700, 800, out), 960, 2.5, {
        t, raise: out * 0.55, stance: t * (1.3 - hold * 0.8), flip: 1, cape: 1,
      });
      // 主动作三：荀彧自左入（740px / 1.9s ≈ 389px/s，≤400px/s）
      const come = ss(0.4, 2.3, lt);
      const px = lerp(340, 1080, come);
      Z.xunYu(c, px, 962, 2.45, { t, raise: hold * 0.4, stance: t * (1.4 - hold * 0.9), flip: 0, dark: 0, bow: hold * 0.25 });

      // 香炉（帐前，荀令留香母题第一次出现）
      Z.xiangLu(c, 1420, 924, 1.5, t, { smoke: 1, seed: 3 });
      Z.dust(c, t, { x: 700, y: 950, n: 6, seed: 257, scale: 1.3, alpha: 0.3 });

      Z.bigText(c, '吾之子房', { x: 1000, y: 288 + Math.sin(t * 1.25) * 7, size: 78, gap: 16, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 254, 950, '颍川', ss(2.25, 2.6, lt), { size: 86, seed: 259 });
    },
  };
})();
