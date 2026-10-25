// ① 赵昂为羌道令，留异在西。会同郡梁双反，攻破西城，害异两男。
//    异女英，年六岁，独与异在城中。
//    画面：残破的西城，两团倒下的小影（写意，不画血），王异怀抱六岁的女儿——她没有倒下。
SCENES['wy1_liangshuang'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy1', '#dedac9');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy1_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2000, [{ y0: 500, amp: 120, tone: 0.16, seed: 11 }, { y0: 650, amp: 82, tone: 0.26, seed: 13 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      // ⚠ 运动量是硬指标：qa 按相邻帧差 >12 灰阶判定，淡墨小动会被判成静止
      Z.mist(c, t, { y0: 380, y1: 720, n: 6, alpha: 0.62, speed: 96, seed: 112 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 116 });
      Z.inkCloud(c, t, { y: 878, h: 32, n: 5, speed: 96, span: 1500, seed: 5, a: .24 });
      Z.inkCloud(c, t, { y: 480, h: 26, n: 3, speed: 124, span: 1300, seed: 15, a: .18 });
      brush(c, [[0, 904], [640, 896], [1280, 906], [1920, 896]], { w: 15, tone: 0.8, dry: 0.72, seed: 118, head: .03, tail: .3 });

      // 残破的西城（背景）
      Z.cityWall(c, 960, 930, 1.05, { breach: ss(0.2, 1.8, lt) * 0.55, a: ss(0.15, 1.5, lt), seed: 11 });

      // 乱兵火把（主运动）
      Z.torch(c, 270, 872, 1.4, t, 3);
      Z.torch(c, 1660, 878, 1.25, t, 7);
      Z.campFire(c, 620, 900, 0.9, t, { alpha: .7, seed: 5 });
      Z.dust(c, t, { x: 1400, y: 880, n: 6, seed: 9, scale: 1.6, alpha: 0.5 });

      // 两男已死：两团倒下的小影（淡墨写意，绝不画血）
      const dead = ss(0.6, 2.2, lt);
      [[700, 962], [830, 968]].forEach(([px, py], k) => {
        c.save(); c.globalAlpha = clamp(dead) * .5; c.translate(px, py); c.rotate(k ? .22 : -.16);
        c.fillStyle = 'rgba(96,88,80,.7)';
        c.beginPath(); c.ellipse(0, -8, 34, 15, 0, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(42,38,34,.7)'; c.lineWidth = 2; c.stroke();
        c.fillStyle = 'rgba(226,216,198,.85)';
        c.beginPath(); c.arc(-30, -6, 10, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 主动作：王异怀抱幼女，立于乱中（她是唯一站着的）
      Z.wangyi(c, 1120 + Math.sin(t * .8) * 3, 952, 2.45,
        { t, fade: ss(0.25, 1.6, lt), gou: 0, knife: 0, bow: 0.06 });
      Z.child(c, 1120 + 92, 950, 1.6, t, { fade: ss(0.5, 1.9, lt), seed: 41 });

      Z.inkSmoke(c, 1120, 680, t, { seed: 7, a: 0.28 });
      Z.curtain(c, 100, 132, t, { seed: 71, a: .34, col: '74,58,44' });
      Z.curtain(c, 1820, 132, t, { seed: 72, a: .34, col: '74,58,44' });

      Z.bigText(c, '攻破西城', { x: 320, y: 452, size: 62, gap: 14, appear: ss(0.6, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '害异两男 · 独遗一女', { x: 330, y: 546, size: 42, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
