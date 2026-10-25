// ② 亲斩郭援：建安七年，袁尚遣郭援、高干略河东，德为先锋随马超拒之——德亲斩援首于阵中。
// 主动作：两军相接（常驻）→ 德单骑突阵（0.4→1.8s）→ 阵斩：援旗倒（1.5→2.5s）→ 提首而还（2.3→3.35s 缓行）
// 母题循环：战尘、旗、白马。注：不见血，以旗倒与人俯示意。
SCENES['p2_zhanyuan'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq2', '#e8e1c9');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.9, lt);
      Z.wash(c, 'pq2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 456, amp: 128, tone: 0.22, seed: 1001.5 }]);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 320, y1: 630, n: 4, alpha: 0.46, speed: 44, seed: 1003 });
      brush(c, [[0, 912], [640, 900], [1280, 914], [1920, 898]], { w: 14, tone: 0.78, dry: 0.75, seed: 1005, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 24, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 54, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 15, a: 0.3 });

      // 两军相接：左（援军，青旗）右（马腾军，赤旗）各数影，兵器相击（常驻）
      c.save(); c.globalAlpha = 0.85;
      for (let k = 0; k < 5; k++) {
        const bx = 380 + k * 90 + Math.sin(t * 5 + k * 1.7) * 5;
        const by = 930 + (k % 2) * 12;
        brush(c, [[bx, by], [bx + Math.sin(t * 6 + k) * 8, by - 66], [bx - Math.sin(t * 6 + k) * 6, by - 112]], { w: 15, tone: 0.66, dry: 0.5, seed: 1007 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(44,40,34,.86)'; c.beginPath(); c.arc(bx, by - 124, 10, 0, Math.PI * 2); c.fill();
      }
      Z.flag(c, 300, 700, 130, t, { seed: 1013, col: 'rgba(90,90,120,.8)', text: '援' });
      Z.flag(c, 1560, 706, 130, t, { seed: 1015, col: 'rgba(178,44,36,.82)', text: '马' });
      c.restore();

      // 主动作一：德单骑突阵（自右至中，700px / 1.8s ≈ 389px/s）
      const rush = ss(0.4, 2.2, lt);
      const px = lerp(1660, 960, rush);
      const kill = ss(1.5, 2.5, lt);
      c.save();
      Z.baiMa(c, px, 944, 1.45, t * 10, { gallop: 1, blanket: 1 });
      c.restore();
      c.save(); c.translate(px - 8, 944 - 172); c.rotate(Math.sin(t * 10) * 0.03 + kill * 0.06);
      Z.pangDe(c, 0, 60, 1.3, { t, raise: kill * 0.55, stance: t * 2, flip: 0, bow: 0 });
      c.restore();
      Z.dust(c, t, { x: px + 130, y: 948, n: 8, seed: 1017, scale: 1.6, alpha: 0.36 });

      // 主动作二：阵斩——郭援俯身坠旗倒（无血示意：将旗折断倒下）
      const fdown = ss(1.7, 2.6, lt);
      c.save(); c.globalAlpha = 1 - fdown * 0.7;
      Z.flag(c, 820, 660, 130, t, { seed: 1019, col: 'rgba(90,90,120,.85)', text: '援', droop: fdown });
      c.restore();
      // 援俯身（fuZhe 复用为倒伏者）
      if (fdown > 0) {
        c.save(); c.globalAlpha = clamp(fdown * 1.5);
        c.save(); c.translate(880, 952); c.rotate(fdown * 0.9);
        Z.fuZhe(c, 0, 0, 1.7, t, { tone: 'rgba(96,92,106,.6)', seed: 93 });
        c.restore(); c.restore();
      }

      // 主动作三：提首而还（德缓缓勒马回望——马头转）
      const back = ss(2.3, 3.35, lt);
      c.save(); c.globalAlpha = 0.9;
      Z.horse(c, 300, 900, 0.85, t * 5, { tone: 0.82, gallop: 1, flip: 1 });
      c.restore();

      Z.bigText(c, '亲斩郭援', { x: 1080, y: 280, size: 78, gap: 16, appear: ss(2.1, 2.8, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '平阳', ss(2.35, 2.7, lt), { size: 86, seed: 1021 });
    },
  };
})();
