// ⑥ 超攻冀急，刺史韦康素仁，欲与超和。昂谏不听，归以语异。
//    异曰：「君有争臣，大夫有专利之义；专命，非古义也。当共勉卒高勋，全节致死，不可从也。」
//    画面：堂上。韦康（玄袍立姿）主和，赵昂争之而不听；王异在侧厉声——她不是劝丈夫，是给丈夫定调。
SCENES['wy6_buke'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy6', '#e5e1ce');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy6_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 478, amp: 130, tone: 0.15, seed: 71 }, { y0: 628, amp: 90, tone: 0.24, seed: 73 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 612 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 616 });
      Z.inkCloud(c, t, { y: 886, h: 32, n: 5, speed: 96, span: 1500, seed: 11, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 21, a: .18 });
      brush(c, [[0, 912], [640, 904], [1280, 914], [1920, 904]], { w: 14, tone: 0.78, dry: 0.74, seed: 618, head: .03, tail: .3 });

      // 堂柱（两根，微晃）
      [[215, 0], [1705, 1]].forEach(([px2, k]) => {
        c.save(); c.translate(px2, 962);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -840]],
          { w: 34, tone: .6, dry: .55, seed: 621 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -856, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 炬火（堂上两架，主运动）
      Z.torch(c, 430, 916, 1.40, t, 51);
      Z.torch(c, 1580, 920, 1.28, t, 55);
      Z.dust(c, t, { x: 1000, y: 930, n: 6, seed: 69, scale: 1.5, alpha: 0.46 });

      // 几案（韦康案前：和议文书）
      const desk = ss(0.3, 1.5, lt);
      c.save(); c.globalAlpha = clamp(desk);
      c.translate(760, 946);
      brush(c, [[-150, 0], [150, -6]], { w: 18, tone: .62, dry: .5, seed: 631, col: [96, 70, 46] });
      brush(c, [[-132, 4], [-126, 62]], { w: 12, tone: .6, dry: .55, seed: 632, col: [92, 68, 44] });
      brush(c, [[132, 2], [126, 60]], { w: 12, tone: .6, dry: .55, seed: 633, col: [92, 68, 44] });
      c.restore();
      // 文书（帛书，随争辩被推来推去：微幅位移）
      const doc = ss(0.8, 2.0, lt);
      c.save(); c.globalAlpha = clamp(doc) * .9;
      c.translate(760 + Math.sin(t * 1.5) * 10, 930);
      c.fillStyle = 'rgba(240,232,212,.95)';
      c.beginPath(); c.moveTo(-72, 0); c.lineTo(72, -4); c.lineTo(68, -46); c.lineTo(-70, -42); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(56,46,36,.8)'; c.lineWidth = 2; c.stroke();
      c.strokeStyle = 'rgba(44,38,32,.6)'; c.lineWidth = 1.6;
      for (let k = 0; k < 4; k++) {
        c.beginPath(); c.moveTo(-56, -12 - k * 8); c.lineTo(-56 + 40 + Math.sin(t + k) * 6, -12 - k * 8); c.stroke();
      }
      c.restore();

      // 韦康（左，玄袍立姿，主和：手按案）
      Z.leader(c, 560 + Math.sin(t * 1.0) * 2, 948, 2.1, t, { flip: 0, cape: 1, bow: 0.06 });

      // 赵昂（中，争辩：抬手 0→1 并持续起落）
      const ag = ss(0.5, 2.0, lt) * (0.72 + 0.28 * Math.abs(Math.sin(t * 1.35)));
      Z.zhaoAng(c, 1010 + Math.sin(t * 1.2) * 3, 950, 2.2, t,
        { fade: ss(0.25, 1.5, lt), argue: ag, seed: 71 });

      // 主动作：王异在侧厉声（一步上前，抬手直指）
      const st = ss(0.7, 2.3, lt);
      const wx = lerp(1440, 1370, ease.out(st));
      Z.wangyi(c, wx + Math.sin(t * 1.1) * 4, 950, 2.3,
        { t, fade: ss(0.35, 1.7, lt), gou: 1, knife: 0, raise: st, bow: 0.02 });

      Z.inkSmoke(c, 1010, 664, t, { seed: 77, a: 0.28 });
      Z.inkSmoke(c, 560, 706, t, { seed: 78, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 83, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 84, a: .34 });

      Z.bigText(c, '韦康欲和', { x: 320, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '全节致死 · 不可从也', { x: 330, y: 546, size: 44, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(48,72,104,.92)', shadow: { color: 'rgba(56,88,124,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
