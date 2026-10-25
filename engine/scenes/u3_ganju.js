// ③ 孙权贡曹四十担柑橘，左慈替脚夫各挑五里；曹操亲剖，壳内空无一物。
// 主动作：左慈担橘现身（0.4→1.8s）→ 曹操立而剖橘（1.4→2.4s，剖开空壳）
// 母题：橘堆、墨尘、垂帷、墨云。
SCENES['u3_ganju'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz3', '#ece6d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'uz3_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 560, amp: 110, tone: 0.18, seed: 23 },
          { y0: 680, amp: 70, tone: 0.28, seed: 27 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.2 });
      Z.mist(c, t, { y0: 280, y1: 620, n: 4, alpha: 0.5, speed: 44, seed: 233 });
      Z.inkCloud(c, t, { y: 884, h: 24, n: 3, speed: 46, span: 1500, seed: 3, a: .12 });
      brush(c, [[0, 908], [640, 900], [1280, 910], [1920, 902]], { w: 14, tone: 0.78, dry: 0.76, seed: 312, head: .03, tail: .3 });

      // 曹操（右，立，观剖）
      const cb = ss(0.4, 1.6, lt) * 0.05;
      Z.leader(c, 1500, 962, 2.5, t, { flip: 0, cape: 1, bow: cb });

      // 左慈（左，担橘上前）
      // ⚠ 滑入别太快：400px/1.4s 的整屏平移会被 qa 记成连续「跳变」（u3 曾报 28 次）。
      //   改成 200px/1.4s 并叠一层淡入，位移感仍在，帧差降到阈值以下。
      const come = ss(0.4, 1.8, lt);
      Z.zuoci(c, lerp(610, 760, come), 944, 2.35,
        { t, fade: ss(0.25, 1.0, lt), raise: ss(1.8, 2.7, lt) * 0.3, staff: 1, whisk: 1 });

      // 橘堆（地面）：其中一只被曹操剖开（空壳）
      const op = ss(1.4, 2.4, lt);
      Z.orange(c, 1180, 900, 1.5, { open: op, empty: op });
      [[1040, 930], [1110, 942], [1260, 938], [1330, 930], [1090, 902]].forEach(([x, y]) => Z.orange(c, x, y, 1.2, { open: 0 }));

      // 母题：墨尘（围绕剖橘处）
      Z.inkMotes(c, 1180, 880, 120, t, { n: 14, seed: 8, a: .4, speed: .8 });
      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      // 榜题提前落定（原 0.3–1.1s 与左慈滑入叠在一起，最后一字落定时多出一次帧差尖峰）
      Z.bigText(c, '四十担柑橘', { x: 700, y: 250 + Math.sin(t * 1.2) * 6, size: 62, gap: 14, appear: ss(0.2, 0.8, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '空壳', ss(1.8, 2.4, lt), { size: 80, seed: 314 });
    },
  };
})();
