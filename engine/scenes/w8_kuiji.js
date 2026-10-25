// ⑧ 哭祭归葬：太祖退住舞阴，闻韦死，为流涕，募间取其丧，亲自临哭之，遣归葬襄邑。
// 主动作：新坟起（0.15→1.0s）→ 曹公入、行至冢前（0.9→1.9s）→ 躬身哭祭、香起（1.7→2.7s）；
// 母题循环：青烟、雁阵、远山云气。
SCENES['w8_kuiji'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw8', '#eee7d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'dw8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 424, amp: 150, tone: 0.16, seed: 96.1 },
          { y0: 512, amp: 96, tone: 0.24, seed: 99.4 },
        ]);
      }, { blur: 3.5, halo: 16, haloA: 0.24 });
      // 雁阵（循环一）
      Z.geese(c, t, { y: 250, x0: 1880, speed: 168, n: 5, seed: 4, scale: 1.05 });
      // 春草坡地
      brush(c, [[0, 900], [620, 886], [1280, 902], [1920, 884]], { w: 16, tone: 0.84, dry: 0.72, seed: 161, head: 0.04, tail: 0.3, reveal: ss(0, 0.35, lt) });
      brush(c, [[120, 946], [700, 934], [1400, 948], [1880, 930]], { w: 7, tone: 0.42, dry: 0.85, seed: 162, reveal: ss(0.15, 0.5, lt) });
      // 松（墓侧）
      Z.pine(c, t, { x: 300, y: 660, s: 1.05, seed: 12, tone: 0.72 });
      Z.pine(c, t, { x: 1660, y: 672, s: 0.9, seed: 13, tone: 0.6 });

      // 主动作一：新坟（土丘 + 碑）
      const tx = 720, ty = 924;
      const rise = ss(0.15, 1.0, lt);
      c.save(); c.translate(0, (1 - ease.out(rise)) * 90); c.globalAlpha = 0.2 + 0.8 * rise;
      Z.tomb(c, tx, ty, 1.55, t, { incense: ss(1.5, 2.2, lt) });
      c.restore();
      // 碑文：汉故校尉典君之墓
      c.save(); c.globalAlpha = ss(0.9, 1.3, lt);
      c.font = '30px "LXGWWenKai-500"'; c.fillStyle = 'rgba(40,34,28,.8)'; c.textAlign = 'center';
      c.fillText('典君之墓', tx, ty - 118 * 1.55);
      c.restore();
      // 祭案（一壶两爵）
      c.save(); c.globalAlpha = ss(1.1, 1.5, lt);
      brush(c, [[tx + 150, ty - 8], [tx + 290, ty - 12]], { w: 8, tone: 0.7, dry: 0.5, seed: 171 });
      brush(c, [[tx + 180, ty - 10], [tx + 178, ty - 40]], { w: 6, tone: 0.7, dry: 0.5, seed: 172 });
      brush(c, [[tx + 260, ty - 12], [tx + 258, ty - 44]], { w: 6, tone: 0.7, dry: 0.5, seed: 173 });
      c.fillStyle = 'rgba(248,244,232,.9)';
      c.beginPath(); c.ellipse(tx + 178, ty - 48, 13, 7, 0, 0, Math.PI * 2); c.fill();
      c.beginPath(); c.ellipse(tx + 258, ty - 52, 13, 7, 0, 0, Math.PI * 2); c.fill();
      c.restore();

      // 主动作二：曹公入，行至冢前
      const walk = ease.out(ss(0.85, 1.95, lt));
      const lx = lerp(1780, 1080, walk), ly = 918;
      const bow = ss(1.8, 2.7, lt);
      Z.leader(c, lx, ly, 1.75, t, { flip: 1, bow, cape: 1 });
      // 随从（二人在后，止步）
      [0, 1].forEach((k) => {
        const ax = lerp(1900 + k * 90, 1420 + k * 96, walk);
        c.save(); c.globalAlpha = 0.6;
        brush(c, [[ax, 916], [ax + 3, 856], [ax + 1, 818]], { w: 15, tone: 0.6, dry: 0.55, seed: 181 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(56,50,44,.78)'; c.beginPath(); c.arc(ax + 1, 806, 12, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      // 云气（循环二）
      Z.mist(c, t, { y0: 300, y1: 620, n: 4, alpha: 0.55, speed: 44, seed: 91 });

      // 大字：亲自临哭
      Z.bigText(c, '亲自临哭', { x: 1060, y: 296, size: 88, gap: 20, appear: ss(2.5, 3.2, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(2.9, 3.25, lt);
      c.font = '32px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.82)'; c.textAlign = 'center';
      c.fillText('——遣归葬襄邑', 1060, 376);
      c.restore();
      Z.seal(c, 240, 946, '归葬', ss(3.3, 3.6, lt), { size: 88, seed: 58 });
    },
  };
})();
