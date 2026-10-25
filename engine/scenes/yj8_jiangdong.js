// ⑧ 金疮迸裂，碧眼儿坐领江东：孙策创裂惊亡，江东归孙。
SCENES['yj8_jiangdong'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uy8', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'uy8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 440, amp: 150, tone: 0.16, seed: 83 }, { y0: 580, amp: 100, tone: 0.26, seed: 87 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });
      Z.mist(c, t, { y0: 380, y1: 660, n: 4, alpha: 0.42, speed: 44, seed: 442 });
      Z.inkCloud(c, t, { y: 884, h: 24, n: 3, speed: 46, span: 1500, seed: 1, a: .12 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 14, tone: 0.78, dry: 0.74, seed: 317, head: .03, tail: .3 });

      // 孙策（中，创裂惊亡：躬身急颤）
      const shock = ss(0.6, 2.4, lt);
      const shake = Math.sin(t * 11) * 6 * shock;
      const sx = 960, sy = 950 + shake;
      Z.leader(c, sx, sy, 2.8, t, { flip: 0, cape: 1, bow: 0.12 + 0.08 * Math.sin(t * 10) });

      // 金疮迸裂（朱红 burst，写意不血腥）
      const burst = (0.6 + 0.4 * Math.sin(t * 6)) * shock;
      c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .6 * burst;
      const g = c.createRadialGradient(sx - 20, sy - 150, 4, sx - 20, sy - 150, 150);
      g.addColorStop(0, 'rgba(220,72,60,.85)'); g.addColorStop(1, 'rgba(200,60,50,0)');
      c.fillStyle = g; c.beginPath(); c.arc(sx - 20, sy - 150, 150, 0, Math.PI * 2); c.fill();
      c.restore();
      c.save(); c.globalAlpha = .8 * burst;
      c.fillStyle = 'rgba(180,42,38,.9)';
      for (let k = 0; k < 10; k++) {
        const a = k / 10 * Math.PI * 2 + t;
        const r = 30 + 40 * ((t * 2 + k) % 1);
        c.beginPath(); c.arc(sx - 20 + Math.cos(a) * r, sy - 150 + Math.sin(a) * r, 5 * (1 - ((t * 2 + k) % 1)), 0, Math.PI * 2); c.fill();
      }
      c.restore();
      Z.magicRing(c, sx, sy - 150, 110, t, { a: .2 * burst, spin: -.5, col: '170,60,50' });

      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '碧眼儿', { x: 760, y: 220, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '坐领江东', { x: 1000, y: 300, size: 64, gap: 14, appear: ss(1.1, 2.0, lt), col: 'rgba(40,96,96,.94)', shadow: { color: 'rgba(40,110,110,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '二十九回', ss(2.2, 3.0, lt), { size: 56, seed: 364 });
    },
  };
})();
