// ① 狟道骁勇：庞德，字令明，南安狟道人。初为郡吏州从事，后随马腾击羌叛——每战，常陷陈却敌，勇冠腾军。
// 主动作：西陲烽烟（常驻）→ 德自右驰入（0.4→2.2s 骑白马）→ 勒马举兵（2.0→2.95s）
// 母题循环：白马（主母题第一次登场）、烽烟、尘。
SCENES['p1_naan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq1', '#e9e2cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'pq1_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 440, amp: 168, tone: 0.22, seed: 981.5 },
          { y0: 548, amp: 104, tone: 0.32, seed: 985.9 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.48, speed: 46, seed: 983 });
      brush(c, [[0, 910], [640, 898], [1280, 912], [1920, 896]], { w: 14, tone: 0.8, dry: 0.75, seed: 987, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 36, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 66, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 17, a: 0.3 });

      // 烽烟（远处两股，常驻上升）
      c.save(); c.filter = 'blur(10px)';
      for (let k = 0; k < 4; k++) {
        const ph = ((t * 0.3 + k * 0.25) % 1);
        const bx = k < 2 ? 420 : 1560;
        c.fillStyle = `rgba(110,100,88,${0.3 * (1 - ph)})`;
        c.beginPath(); c.ellipse(bx + Math.sin(t * 0.9 + k) * 24 + ph * 36, 560 - ph * 300, 44 + ph * 110, 32 + ph * 80, 0, 0, Math.PI * 2); c.fill();
      }
      c.filter = 'none'; c.restore();

      // 主动作：德骑白马自右驰入（560px / 1.8s ≈ 311px/s），勒马举兵
      const ride = ss(0.4, 2.2, lt);
      const px = lerp(1520, 960, ride);
      const raise = ss(2.0, 2.95, lt);
      c.save();
      Z.baiMa(c, px, 936, 1.5, t * 9, { gallop: 1, blanket: 1 });
      c.restore();
      // 马上庞德（rider 姿态由 hero 系近似：持长兵）
      c.save(); c.translate(px - 10, 936 - 176); c.rotate(Math.sin(t * 9) * 0.03);
      Z.pangDe(c, 0, 60, 1.35, { t, raise: raise * 0.5, stance: t * 1.4, flip: 0, bow: 0 });
      c.restore();
      Z.dust(c, t, { x: px + 150, y: 942, n: 7, seed: 989, scale: 1.5, alpha: 0.34 });

      // 远处羌骑剪影（两骑原地小步）
      c.save(); c.globalAlpha = 0.6;
      Z.horse(c, 260, 890, 0.9, t * 5, { tone: 0.85, gallop: 1, flip: 0 });
      Z.horse(c, 420, 880, 0.8, t * 5 + 1.3, { tone: 0.8, gallop: 1, flip: 0 });
      c.restore();

      Z.bigText(c, '陷陈却敌', { x: 1000, y: 286, size: 78, gap: 16, appear: ss(1.95, 2.65, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '狟道', ss(2.25, 2.6, lt), { size: 86, seed: 991 });
    },
  };
})();
