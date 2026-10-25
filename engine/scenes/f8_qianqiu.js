// ⑧ 一叹千秋：绍败还，惭曰：「吾不用田丰言，果为所笑。」——笑他的人，是他自己杀掉的。
// 收束全片：空狱、雪意、断杖——「惜哉」二字落印。
// 主动作：雪落（全程常驻）→ 狱门洞开、空无一人（0.6→1.8s 渐显）→ 断杖横陈（0.9→2.4s 渐显）→ 题跋落印（2.7→3.6s）
// 母题循环：雪、风、窗尘光。
SCENES['f8_qianqiu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fq8', '#e9e1cc');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'fq8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 470, amp: 106, tone: 0.2, seed: 761.5 }]);
        g.fillStyle = 'rgba(84,84,96,.16)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 330, y1: 640, n: 4, alpha: 0.44, speed: 40, seed: 763 });
      brush(c, [[0, 920], [640, 910], [1280, 922], [1920, 908]], { w: 13, tone: 0.74, dry: 0.75, seed: 765, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 15, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 45, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 16, a: 0.3 });

      // 狱（空屋外观：门洞开）
      const doorOpen = ss(0.6, 1.8, lt);
      c.save(); c.globalAlpha = 0.9;
      c.fillStyle = 'rgba(148,128,100,.55)'; c.fillRect(760, 500, 400, 420);
      c.strokeStyle = 'rgba(52,44,36,.88)'; c.lineWidth = 3.4; c.strokeRect(760, 500, 400, 420);
      // 门洞（开得越大越黑——人不在了）
      c.fillStyle = `rgba(30,28,26,${0.55 + doorOpen * 0.35})`;
      c.beginPath(); c.moveTo(830, 920); c.lineTo(830, 640); c.quadraticCurveTo(960, 600 - doorOpen * 30, 1090, 640); c.lineTo(1090, 920); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(46,38,30,.9)'; c.lineWidth = 3; c.stroke();
      // 楣
      c.fillStyle = 'rgba(160,128,84,.8)'; c.fillRect(744, 486, 432, 22);
      c.restore();

      // 断杖（横陈于门前雪地——上段斜倚下段）
      const brk = ss(0.9, 2.4, lt);
      if (brk > 0) {
        c.save(); c.globalAlpha = clamp(brk * 1.6);
        c.save(); c.translate(1180, 928); c.rotate(-1.32);
        brush(c, [[0, 0], [0, 150]], { w: 11, col: [96, 70, 44], tone: 0.9, dry: 0.4, seed: 767, head: 0.06, tail: 0.2 });
        c.restore();
        c.save(); c.translate(1236, 934); c.rotate(1.72);
        brush(c, [[0, 0], [0, 96]], { w: 11, col: [96, 70, 44], tone: 0.9, dry: 0.4, seed: 769, head: 0.06, tail: 0.2 });
        c.restore();
        c.restore();
      }

      // 雪（全程常驻：缓落大片）
      c.save();
      for (let k = 0; k < 26; k++) {
        const ph = ((t * 0.055 + k / 26) % 1);
        const px = ((k * 149) % 1920) + Math.sin(t * 0.7 + k) * 26;
        const py = ph * 1140 - 40;
        c.fillStyle = `rgba(244,240,230,${0.5 + (k % 3) * 0.12})`;
        c.beginPath(); c.arc(px, py, 2.5 + (k % 4) * 1.3, 0, Math.PI * 2); c.fill();
      }
      c.restore();
      // 地面积雪线
      c.fillStyle = 'rgba(242,238,228,.5)';
      c.beginPath(); c.moveTo(0, 926);
      for (let x = 0; x <= 1920; x += 60) c.lineTo(x, 918 + Math.sin(x * 0.012 + 1) * 6);
      c.lineTo(1920, 1080); c.lineTo(0, 1080); c.closePath(); c.fill();

      // 雁阵（南去）
      Z.geese(c, t, { y: 250, x0: 1980, speed: 120, n: 5, seed: 71, scale: 1.05 });
      Z.dust(c, t, { x: 500, y: 940, n: 4, seed: 771, scale: 1.0, alpha: 0.2 });

      Z.bigText(c, '惜哉', { x: 960, y: 272, size: 118, gap: 26, appear: ss(2.55, 3.3, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,60,36,.32)', blur: 14, x: 5, y: 6 } });
      Z.seal(c, 250, 948, '千秋', ss(2.85, 3.2, lt), { size: 86, seed: 773 });
    },
  };
})();
