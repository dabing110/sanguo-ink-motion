// ⑦ 遁入羊群，许褚尽杀之，他尽活之；曹斩三四百分身，青气冲天，聚成一左慈。
SCENES['u7_yang'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz7', '#ece6d0');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'uz7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 560, amp: 110, tone: 0.18, seed: 63 },
          { y0: 680, amp: 70, tone: 0.28, seed: 67 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.2 });
      Z.mist(c, t, { y0: 260, y1: 560, n: 3, alpha: 0.45, speed: 42, seed: 273 });
      Z.inkCloud(c, t, { y: 884, h: 24, n: 3, speed: 46, span: 1500, seed: 7, a: .12 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 14, tone: 0.78, dry: 0.76, seed: 352, head: .03, tail: .3 });

      // 曹操（右，令斩）
      Z.leader(c, 1560, 962, 2.4, t, { flip: 0, cape: 1, bow: 0.03 });

      // 分身青气：随斩而聚（画在羊群与左慈之后作底）
      const cl = ss(1.8, 3.2, lt);
      Z.clones(c, 900, 880, 1.0, 12, t, 0.5 * cl, { seed: 31, spread: 720 });

      // 羊群：先活（0.4→1.4），后被杀倒（1.6→2.4），再尽活（2.4→3.2）
      const aliveT = ss(0.4, 1.4, lt);
      const deadT = ss(1.6, 2.4, lt);
      const revive = ss(2.4, 3.2, lt);
      const nSheep = 6;
      for (let k = 0; k < nSheep; k++) {
        const x = 470 + k * 168;
        // ⚠ 别用同一个 0.5 硬阈值：整群羊会在同一帧集体翻状态，qa 记成「跳变」（u7 曾报 3 次）。
        //   逐只错开阈值 → 一只一只倒、一只一只起，观感也更像「尽杀之…他尽活之」。
        const th = 0.42 + k * 0.09;
        const alive = revive > th ? 1 : (deadT > th ? 0 : (aliveT > th ? 1 : 0));
        Z.sheep(c, x, 946, 1.4 + (k % 3) * 0.28, t, { alive, flip: k % 2, seed: 20 + k });
      }

      // 左慈（中，淡定立，画在羊群之上）
      Z.zuoci(c, 900, 944, 2.3, { t, fade: 1, raise: ss(0.4, 1.2, lt) * 0.3, staff: 0, whisk: 1 });

      // 青气冲天（收束为一）
      Z.qingQi(c, 900, 900, 240, t, 0.6 * cl, { w: 30, seed: 5 });

      Z.inkMotes(c, 900, 800, 200, t, { n: 14, seed: 12, a: .36, speed: .7 });
      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '幻入羊群', { x: 700, y: 210 + Math.sin(t * 1.2) * 6, size: 60, gap: 14, appear: ss(0.3, 1.0, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '分身', ss(1.8, 2.5, lt), { size: 74, seed: 354 });
    },
  };
})();
