// ⑧ 威侯：章武二年（二二二年）卒，年四十七。临没上疏：「臣门宗二百余口，为孟德所诛略尽，
//    惟有从弟岱，当为微宗血食之继，深托陛下，余无复言。」——先主谥曰威侯。
// 主动作：孤灯下一纸遗疏（0.3→1.2s）→ 两行大字逐字落墨（1.0→2.6s）→ 马超孤骑走向画深处（0.6→3.4s）。
// 母题循环：远山长卷缓卷、孤雁南去、灯焰摇。
SCENES['m8_weihou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc8', '#ece3cb');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.6, lt);
      // 远山长卷（缓卷：整体极慢左移）
      const drift = lt * 12;
      c.save(); c.translate(-drift % 240, 0);
      Z.wash(c, 'mc8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -80, 2300, [
          { y0: 448, amp: 196, tone: 0.18, seed: 111.2 },
          { y0: 556, amp: 140, tone: 0.28, seed: 117.6 },
          { y0: 632, amp: 84, tone: 0.38, seed: 121.4 },
        ]);
      }, { blur: 3, halo: 14, haloA: 0.24 });
      c.restore();
      Z.geese(c, t, { y: 214, x0: 2000, speed: 142, n: 4, seed: 112, scale: 0.85 });
      // 地平
      brush(c, [[0, 848], [640, 834], [1300, 846], [1920, 832]], { w: 10, tone: 0.5, dry: 0.85, seed: 171, reveal: ss(0, 0.3, lt) });
      // 孤骑走向画深处（主动作三：由近及远，渐小渐淡）
      const go = ss(0.6, 3.4, lt);
      const gx = lerp(1420, 830, ease.inOut(go));
      const gy = lerp(896, 800, go);
      const gs = lerp(1.0, 0.3, go);
      c.save(); c.globalAlpha = 1 - go * 0.6;
      Z.horse(c, gx, gy, gs, t * 6, { gallop: 1, flip: 1, tone: 0.82 });
      Z.mChao(c, gx, gy, gs, t * 6, { flip: 1, spearAng: -0.42, cape: 1, backFlag: 0 });
      c.restore();
      // 孤灯（主动作一的载体）：案在左下
      Z.lamp(c, 300, 900, 1.15, t);
      c.save();
      c.fillStyle = 'rgba(96,72,48,.5)'; c.fillRect(180, 900, 260, 20);
      c.strokeStyle = 'rgba(50,38,28,.75)'; c.lineWidth = 3; c.strokeRect(180, 900, 260, 20);
      c.restore();
      // 遗疏（一纸，逐行显现）
      const show = ss(0.3, 1.2, lt);
      c.save(); c.globalAlpha = show;
      c.fillStyle = 'rgba(252,248,238,.92)';
      c.beginPath(); c.moveTo(196, 898); c.lineTo(196, 828); c.lineTo(424, 820); c.lineTo(424, 898); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(60,48,36,.6)'; c.lineWidth = 2; c.stroke();
      c.restore();
      // 两行大字（主动作二：全片的重量都在这句上）
      Z.bigText(c, '臣门宗二百余口', { x: 900, y: 288, size: 92, gap: 18, appear: ss(1.0, 2.2, lt), col: 'rgba(24,20,16,.95)', shadow: { color: 'rgba(120,90,40,.32)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '为孟德所诛略尽', { x: 900, y: 412, size: 92, gap: 18, appear: ss(1.45, 2.7, lt), col: 'rgba(24,20,16,.95)', shadow: { color: 'rgba(120,90,40,.32)', blur: 12, x: 4, y: 5 } });
      // 生卒与谥
      c.save(); c.globalAlpha = ss(2.5, 2.85, lt);
      c.font = '36px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.85)'; c.textAlign = 'center';
      c.fillText('二二二年卒 · 年四十七 · 追谥威侯', 900, 524);
      c.restore();
      Z.seal(c, 1762, 940, '威侯', ss(2.9, 3.2, lt), { size: 92, seed: 123 });
      // 落款（左下，把右下让给钤印）
      c.save(); c.globalAlpha = ss(3.0, 3.4, lt);
      c.font = '28px "LXGWWenKai-500"'; c.fillStyle = 'rgba(60,50,40,.72)'; c.textAlign = 'left';
      c.fillText('惟有从弟岱，当为微宗血食之继，深托陛下，余无复言。', 90, 1012);
      c.restore();
    },
  };
})();
