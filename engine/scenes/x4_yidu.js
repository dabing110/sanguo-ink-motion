// ④ 一书定官渡：太祖军粮方尽，书议还许。彧书谏曰：「公以十分居六分……此用奇之时，不可失也。」
// 一封信，把曹操从退兵的路上拉了回来——官渡的胜负，一半在案头。
// 主动作：信使驰至（原地勒马）→ 拆书（0.5→1.6s）→ 展书大字（1.5→2.6s）→ 收书入袖（2.4→3.35s）
// 母题循环：马足、旗、尘、香。
SCENES['x4_yidu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('xq4', '#e9e1ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.0, lt);
      Z.wash(c, 'xq4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 446, amp: 142, tone: 0.2, seed: 301.6 },
          { y0: 552, amp: 92, tone: 0.3, seed: 305.2 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 310, y1: 630, n: 4, alpha: 0.5, speed: 48, seed: 303 });
      brush(c, [[0, 908], [640, 896], [1280, 910], [1920, 894]], { w: 14, tone: 0.8, dry: 0.75, seed: 307, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 35, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 65, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 16, a: 0.3 });
      // 军帐二顶（居后）
      [[380, 872], [660, 880]].forEach(([bx, by], k) => {
        c.save(); c.globalAlpha = 0.85;
        c.fillStyle = 'rgba(204,186,150,.6)';
        c.beginPath(); c.moveTo(bx - 110, by); c.quadraticCurveTo(bx, by - 150, bx + 110, by); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(52,44,34,.85)'; c.lineWidth = 2.8; c.stroke();
        brush(c, [[bx, by - 140], [bx + 2, by - 200]], { w: 5, tone: 0.82, dry: 0.4, seed: 309 + k });
        c.restore();
      });
      Z.flag(c, 660, 680, 150, t, { seed: 311, col: 'rgba(178,44,36,.82)', text: '曹' });

      // 主动作一：信使驰至（原地勒马，鞭鞘轻扬）
      c.save(); c.globalAlpha = 0.92;
      Z.rider(c, 1560, 930, 1.6, t * 7.5, { spearAng: -0.2, spearLen: 240, hold: 0, cape: 1, backFlag: 0, t, flip: 1 });
      c.restore();
      Z.dust(c, t, { x: 1500, y: 940, n: 7, seed: 313, scale: 1.5, alpha: 0.34 });

      // 主动作二：荀彧拆书 → 展书 → 收
      const open = ss(0.5, 1.6, lt), show = ss(1.5, 2.6, lt), fold = ss(2.4, 3.35, lt);
      Z.xunYu(c, 700, 962, 2.5, {
        t, raise: open * 0.3 + show * 0.35 - fold * 0.45, stance: t * 1.2, flip: 0, dark: 0, bow: 0,
        box: 0,
      });
      // 书信（展平后升到胸前亮出）
      if (show > 0) {
        const ly = lerp(962 - 210, 962 - 320, show);
        c.save(); c.globalAlpha = clamp(show * 2) * (1 - fold * 0.9);
        c.translate(780, ly); c.rotate(-0.06);
        c.fillStyle = 'rgba(246,238,214,.96)';
        c.fillRect(-110, -52, 220, 104);
        c.strokeStyle = 'rgba(52,44,34,.9)'; c.lineWidth = 2.8; c.strokeRect(-110, -52, 220, 104);
        c.strokeStyle = 'rgba(80,64,44,.7)'; c.lineWidth = 2;
        for (let j = 0; j < 4; j++) { c.beginPath(); c.moveTo(-88, -30 + j * 20); c.lineTo(88, -30 + j * 20); c.stroke(); }
        c.restore();
      }

      Z.xiangLu(c, 420, 928, 1.3, t, { smoke: 1, seed: 12 });
      Z.bigText(c, '用奇之时', { x: 1120, y: 300, size: 76, gap: 16, appear: ss(2.1, 2.8, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '官渡', ss(2.75, 3.1, lt), { size: 86, seed: 317 });
    },
  };
})();
