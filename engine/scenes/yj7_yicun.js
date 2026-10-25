// ⑦ 一存一亡：左慈骑鹤而去，于吉授首市曹（对照）。
SCENES['yj7_yicun'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy7', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.0, lt);
      Z.wash(c, 'uy7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 440, amp: 150, tone: 0.16, seed: 73 }, { y0: 580, amp: 100, tone: 0.26, seed: 77 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      Z.mist(c, t, { y0: 360, y1: 640, n: 4, alpha: 0.4, speed: 46, seed: 422 });
      Z.inkCloud(c, t, { y: 884, h: 22, n: 3, speed: 44, span: 1500, seed: 8, a: .12 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 13, tone: 0.76, dry: 0.74, seed: 315, head: .03, tail: .3 });

      // 中分线
      c.save(); c.globalAlpha = .22; c.strokeStyle = 'rgba(60,50,40,.8)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(960, 80); c.lineTo(960, 1000); c.stroke(); c.restore();

      // 左：左慈骑鹤（升去）
      const up = ss(0.3, 3.0, lt);
      const cx = 480, cy = lerp(720, 460, up) + Math.sin(t * 1.4) * 8;
      Z.crane(c, cx, cy, 1.8, t, { flap: 1 });
      Z.zuoci(c, cx, cy - 44, 1.3, { t, fade: 1, raise: 0.5, staff: 0, whisk: 1, bow: 0.1 });
      Z.magicRing(c, cx, cy, 130, t, { a: .12, spin: .4 });
      Z.inkMotes(c, cx, cy, 160, t, { n: 14, seed: 13, a: .36, speed: .7 });

      // 右：于吉授首（青气投东北）
      const fy = ss(0.3, 2.4, lt);
      Z.yuji(c, 1440, 940, 2.2, { t, fade: fy, raise: 0, staff: 1, talisman: 0 });
      c.save();
      const baseX = 1440, baseY = 600;
      for (let k = 0; k < 14; k++) {
        const ph = ((t * .5 + k / 14) % 1);
        const d = ph * 320;
        const px = baseX + d * 0.9 + Math.sin(ph * 6 + k) * 7;
        const py = baseY - d * 0.7;
        c.globalAlpha = .45 * (1 - ph) * fy;
        c.fillStyle = 'rgba(96,168,168,.9)';
        c.beginPath(); c.ellipse(px, py, 16 * (0.4 + ph), 11 * (0.3 + ph), 0, 0, Math.PI * 2); c.fill();
      }
      c.restore();

      Z.bigText(c, '左慈骑鹤', { x: 480, y: 200, size: 52, gap: 10, appear: ss(0.4, 1.2, lt), col: 'rgba(24,20,16,.92)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '于吉授首', { x: 1440, y: 200, size: 52, gap: 10, appear: ss(0.4, 1.2, lt), col: 'rgba(120,40,36,.92)', shadow: { color: 'rgba(90,30,20,.26)', blur: 12, x: 4, y: 5 } });

      Z.curtain(c, 96, 130, t, { seed: 63, a: .2 });
      Z.curtain(c, 1824, 130, t, { seed: 64, a: .2 });
      Z.seal(c, 220, 230, '二十九回', ss(2.0, 2.8, lt), { size: 56, seed: 364 });
    },
  };
})();
