// ④ 画策下邳：操围布于下邳，宫曰：「曹操远来，势不能久。将军若以步骑出屯于外，宫将余众闭守于内……」
// 布妻曰：「宫所将未可知也。」布遂不听。——最好的计策，输给了一句枕边话。
// 主动作：宫于沙盘前挥袖画策（0.4→2.2s）→ 背对转出（2.0→2.75s）→ 布掷简于地（2.2→3.35s）
// 母题循环：灯焰、香尘、帐幕、城外雁。
SCENES['c4_xiance'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('cq4', '#e9e1ca');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.0, lt);
      Z.wash(c, 'cq4_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(74,66,54,.14)'; g.fillRect(0, 0, 1920, 1080);
        g.save(); g.strokeStyle = 'rgba(66,52,40,.5)'; g.lineWidth = 15;
        [[240, 0, 240, 740], [1680, 0, 1680, 740]].forEach(([x1, y1, x2, y2]) => { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); });
        g.lineWidth = 10; g.beginPath(); g.moveTo(120, 110); g.lineTo(1800, 110); g.stroke();
        g.restore();
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 420, y1: 720, n: 3, alpha: 0.34, speed: 30, seed: 461 });
      brush(c, [[0, 920], [640, 910], [1280, 922], [1920, 908]], { w: 13, tone: 0.76, dry: 0.75, seed: 463, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 25, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 55, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 16, a: 0.3 });

      // 下邳城防沙盘（案上）
      c.fillStyle = 'rgba(136,106,66,.85)'; c.fillRect(880, 800, 560, 30);
      c.strokeStyle = 'rgba(52,40,28,.9)'; c.lineWidth = 3; c.strokeRect(880, 800, 560, 30);
      brush(c, [[940, 830], [940, 916]], { w: 14, tone: 0.75, dry: 0.5, seed: 465 });
      brush(c, [[1380, 830], [1380, 916]], { w: 14, tone: 0.75, dry: 0.5, seed: 466 });
      // 沙盘山川
      c.save(); c.translate(1160, 796);
      c.strokeStyle = 'rgba(80,64,44,.8)'; c.lineWidth = 3;
      c.beginPath(); c.moveTo(-220, -6); c.quadraticCurveTo(-120, -34, -40, -10); c.quadraticCurveTo(60, 12, 180, -18); c.stroke();  // 泗水
      c.fillStyle = 'rgba(96,84,64,.8)';
      c.beginPath(); c.arc(30, -26, 15, 0, Math.PI * 2); c.fill();  // 下邳城
      c.strokeStyle = 'rgba(52,42,30,.9)'; c.lineWidth = 2.6; c.stroke();
      // 内外城圈（画策时渐显）
      const draw = ss(0.7, 2.0, lt);
      c.strokeStyle = `rgba(140,60,40,${0.8 * draw})`; c.lineWidth = 2.4;
      c.beginPath(); c.arc(30, -26, 44, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.arc(30, -26, 78, 0, Math.PI * 2); c.stroke();
      c.restore();

      // 主动作一：宫于案前挥袖画策
      const raise = ss(0.4, 2.2, lt), out = ss(2.0, 2.75, lt);
      Z.chenGong(c, 620, 962, 2.55, { t, raise: raise * 0.55, stance: t * 1.3, flip: 0, sword: 0 });

      // 灯焰（左）
      c.save();
      brush(c, [[380, 916], [380, 806]], { w: 9, tone: 0.84, dry: 0.4, seed: 467 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.1) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(380, 786, 3, 380, 786, 56 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.55)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(380, 786, 56 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();

      // 吕布（背影持戟，居右——听罢转身甩袖）
      const toss = ss(2.2, 3.35, lt);
      c.save(); c.globalAlpha = 0.92;
      c.save(); c.translate(1640, 968);
      c.rotate(toss * 0.06);
      // 披甲背影 + 雉尾（布的双雉尾是标识）
      c.fillStyle = 'rgba(104,96,88,.66)';
      c.beginPath(); c.moveTo(-34, -160); c.quadraticCurveTo(-58, -80, -58 + toss * 8, -6);
      c.quadraticCurveTo(0, 2, 58 + toss * 6, -6); c.quadraticCurveTo(56, -82, 34, -160); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(28,24,20,.9)'; c.lineWidth = 3.2; c.stroke();
      c.fillStyle = 'rgba(34,32,30,.95)'; c.beginPath(); c.ellipse(0, -184, 15, 12, 0, 0, Math.PI * 2); c.fill();
      // 双雉尾（长翎，常驻轻摆）
      c.save(); c.strokeStyle = 'rgba(120,64,44,.85)'; c.lineWidth = 4; c.lineCap = 'round';
      [-1, 1].forEach((s2) => {
        c.beginPath(); c.moveTo(s2 * 6, -192);
        c.quadraticCurveTo(s2 * (34 + Math.sin(t * 1.8 + s2) * 6), -250, s2 * (58 + Math.sin(t * 1.5 + s2) * 8), -206);
        c.stroke();
      });
      c.restore();
      // 手中方天戟（掷前立擎，掷时前倾）
      c.save(); c.translate(60, -120 + toss * 40); c.rotate(-0.5 + toss * 0.9);
      brush(c, [[0, 0], [0, -230]], { w: 8, tone: 0.88, dry: 0.35, seed: 469 });
      brush(c, [[0, -230], [-26, -258], [0, -240], [26, -258]], { w: 5, tone: 0.9, dry: 0.4, seed: 470 });
      c.restore();
      c.restore(); c.restore();

      // 掷简（简从案上抛起又落地）
      if (toss > 0) {
        const jy = 796 - Math.sin(clamp(toss * 1.6) * Math.PI) * 90;
        c.save(); c.translate(1520, jy + toss * 80); c.rotate(toss * 1.8);
        c.fillStyle = 'rgba(226,210,172,.94)'; c.fillRect(-44, -8, 88, 14);
        c.strokeStyle = 'rgba(70,56,38,.85)'; c.lineWidth = 2; c.strokeRect(-44, -8, 88, 14);
        c.restore();
      }

      Z.bigText(c, '势不能久', { x: 960, y: 286, size: 76, gap: 16, appear: ss(1.9, 2.6, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '下邳', ss(2.7, 3.05, lt), { size: 86, seed: 471 });
    },
  };
})();
