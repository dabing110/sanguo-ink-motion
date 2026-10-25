// ⑧ 子义：慈年四十一，建安十一年卒。权甚悼惜之。
// 主动作：素幡起（0.15→1.1s）→ 孙权行至灵前（0.9→1.9s）→ 躬身（1.7→2.7s）→ 香起、雁过（2.4→3.6s）；
// 母题循环：幡风、青烟、雁阵、云海。
SCENES['t8_ziyi'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('tc8', '#eae3cd');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'tc8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 428, amp: 148, tone: 0.16, seed: 89.1 },
          { y0: 514, amp: 94, tone: 0.24, seed: 92.4 },
        ]);
      }, { blur: 4, halo: 16, haloA: 0.26 });
      Z.geese(c, t, { y: 250, x0: 1880, speed: 168, n: 5, seed: 5, scale: 1.05 });
      Z.mist(c, t, { y0: 300, y1: 620, n: 4, alpha: 0.56, speed: 44, seed: 38 });
      Z.yunHai(c, t, { y: 850, h: 110, n: 5, speed: 84, alpha: 0.55 });
      brush(c, [[0, 902], [620, 890], [1280, 904], [1920, 886]], { w: 15, tone: 0.84, dry: 0.74, seed: 48, head: 0.04, tail: 0.3, reveal: ss(0, 0.35, lt) });
      Z.pine(c, t, { x: 320, y: 660, s: 1.0, seed: 14, tone: 0.7 });

      // 主动作一：素幡（两杆白幡，随入幕升起）
      const rise = ss(0.15, 1.1, lt);
      [[760, 1.0], [1160, 0.88]].forEach(([fx, fs], k) => {
        const sw = Math.sin(t * 1.5 + k * 2) * 16;
        c.save(); c.globalAlpha = 0.3 + 0.7 * rise;
        brush(c, [[fx, 900], [fx + 2, 900 - 420 * rise]], { w: 6, tone: 0.82, dry: 0.4, seed: 90 + k });
        c.globalAlpha = rise * 0.9;
        c.fillStyle = 'rgba(252,250,244,.92)';
        c.beginPath(); c.moveTo(fx, 900 - 410 * rise);
        c.quadraticCurveTo(fx + sw, 900 - 300 * rise, fx + sw * 1.4, 900 - 190 * rise);
        c.lineTo(fx, 900 - 170 * rise); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(70,66,60,.6)'; c.lineWidth = 2; c.stroke();
        c.restore();
      });
      // 灵位（一碑）
      c.save(); c.globalAlpha = ss(0.8, 1.4, lt);
      c.fillStyle = 'rgba(208,200,184,.92)';
      c.beginPath(); c.moveTo(930, 900); c.lineTo(930, 700); c.quadraticCurveTo(960, 682, 990, 700); c.lineTo(990, 900); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(48,40,32,.88)'; c.lineWidth = 3; c.stroke();
      c.font = '34px "LXGWWenKai-500"'; c.fillStyle = 'rgba(40,34,28,.86)'; c.textAlign = 'center';
      c.fillText('子义', 960, 772);
      c.restore();

      // 主动作二：孙权行至灵前（躬身）
      const walk = ss(0.9, 1.9, lt);
      const lx = lerp(1620, 1180, walk);
      const bow = ss(1.7, 2.7, lt);
      Z.leader(c, lx, 918, 1.7, t, { flip: 1, bow, cape: 1 });
      // 一炷香（尾段第二拍的第三拍：青烟）
      const inc = ss(2.4, 3.0, lt);
      if (inc > 0) {
        c.save(); c.globalAlpha = inc;
        U.steam(c, t, { x: 1040, y: 872, h: 190, n: 3, w: 3, color: 'rgba(150,140,120,.55)', spread: 16, speed: 0.8, seed: 7, wobble: 10 });
        c.restore();
      }
      // 浮尘（循环）
      Z.dust(c, t, { x: 1000, y: 916, n: 6, seed: 58, scale: 1.4, alpha: 0.3 });
      Z.bigText(c, '权甚悼惜', { x: 1000, y: 296, size: 84, gap: 18, appear: ss(2.7, 3.45, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(3.15, 3.5, lt);
      c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.82)'; c.textAlign = 'center';
      c.fillText('——太史慈，字子义', 1000, 378);
      c.restore();
      Z.seal(c, 240, 946, '子义', ss(3.3, 3.6, lt), { size: 88, seed: 68 });
    },
  };
})();
