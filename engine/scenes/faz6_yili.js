// ⑥ 夷陵之叹：章武二年，先主伐吴败绩。诸葛亮叹曰：「法孝直若在，则能制主上，令不东行。」
// 主动作：诸葛亮执羽扇垂叹（0.4→2.6s）→ 遗羽扇空案（1.6→2.8s）；母题：夷陵烽烟、空椅、远山。
SCENES['faz6_yili'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('fz6', '#e4dac2');
  // 诸葛亮（羽扇垂叹，深皂袍，与法正异色）
  const kongming = (c, x, y, s, t, sigh) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.fillStyle = 'rgba(38,40,46,.62)';
    c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-30, -84, -22, -122); c.quadraticCurveTo(0, -134, 22, -122); c.quadraticCurveTo(30, -84, 26, 0); c.closePath(); c.fill();
    brush(c, [[-22, -128], [-40, -120 - 8 * sigh], [-52, -126]], { w: 11, tone: 0.6, dry: 0.45, seed: 1203, head: 0.1, tail: 0.2 });
    c.save(); c.translate(2, -150); c.rotate(sigh * 0.04);
    c.fillStyle = 'rgba(244,234,214,.96)'; c.beginPath(); c.ellipse(0, 0, 15, 18, 0, 0, Math.PI * 2); c.fill();
    c.fillStyle = 'rgba(38,40,42,.95)';
    c.beginPath(); c.moveTo(-18, -8); c.quadraticCurveTo(-10, -30, 4, -32); c.quadraticCurveTo(18, -28, 18, -10); c.lineTo(12, -6); c.quadraticCurveTo(0, -12, -12, -6); c.closePath(); c.fill();
    c.restore(); c.restore();
  };
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'fz6_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(120,60,40,.12)'; g.fillRect(0, 0, 1920, 1080);
        Z.mountains(c, g, -40, 2050, [{ y0: 470, amp: 130, tone: 0.2, seed: 91 }]);
      }, { blur: 3, halo: 16, haloA: 0.2 });
      // 夷陵烽烟（红）
      for (let i = 0; i < 3; i++) {
        c.save(); c.globalAlpha = 0.35 + 0.15 * Math.sin(t * 2 + i);
        brush(c, [[1300 + i * 120, 720], [1320 + i * 120, 560 - i * 30]], { w: 30, tone: 0.22, dry: 0.85, seed: 190 + i, tail: 0.9, bristles: 5, col: [150, 60, 44] });
        c.restore();
      }
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 603, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 空椅（孝直若在）
      c.save(); c.globalAlpha = 0.75;
      brush(c, [[360, 940], [360, 800], [420, 800], [420, 940]], { w: 8, tone: 0.4, dry: 0.6, seed: 191 });
      c.fillStyle = 'rgba(90,66,42,.7)'; c.fillRect(350, 800, 80, 16);
      c.restore();
      // 遗羽扇（置于空椅前地）
      c.save(); c.globalAlpha = 0.85; c.translate(370, 930); c.rotate(0.3);
      c.fillStyle = 'rgba(242,238,226,.85)'; c.beginPath(); c.ellipse(0, -20, 38, 26, 0, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(40,36,30,.7)'; c.lineWidth = 2; c.stroke();
      c.restore();
      // 诸葛亮 垂叹（右）
      const sigh = ss(0.4, 2.6, lt);
      c.save(); c.globalAlpha = clamp(sigh);
      kongming(c, 1380, 950, 2.4, t, sigh);
      c.restore();
      Z.seal(c, 1762, 952, '孝直', ss(0.9, 1.2, lt), { size: 88, seed: 3 });
    },
  };
})();
