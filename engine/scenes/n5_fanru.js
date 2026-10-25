// ⑤ 反辱孤：击鼓次当脱襕，衡徐脱衣裸身而立，徐著岑牟单绞之服，颜色不怍。
// 操笑曰：「本欲辱衡，衡反辱孤。」——羞辱反转的那一记。
// 主动作：脱襕（0.5→1.9s 衣衫挂上鼓架）→ 裸立不怍（常驻，昂首）→ 缓著单绞（1.9→3.0s）→ 操拂袖冷笑（2.3→3.3s）
// 母题循环：烛、旗、尘。注：不画裸体，以脱下的襕衫与「单绞之服」更替示意。
SCENES['n5_fanru'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq5', '#eae2c8');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'nq5_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(76,66,52,.15)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.26 });
      Z.mist(c, t, { y0: 380, y1: 680, n: 3, alpha: 0.3, speed: 30, seed: 881 });
      brush(c, [[0, 920], [640, 910], [1280, 922], [1920, 908]], { w: 13, tone: 0.76, dry: 0.75, seed: 883, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静态文戏补运动）
      Z.curtain(c, 180, 130, t, { seed: 11, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 12, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 7, a: 0.3 });

      // 大鼓（左）
      Z.jianGu(c, 700, 942, 1.4, t, { seed: 6 });

      // 主动作：衡立于鼓侧（bared 渐变：襕衫脱下挂上鼓架 → 换单绞）
      const strip = ss(0.5, 1.9, lt);                        // 脱衣
      const wear = ss(1.9, 3.0, lt);                         // 著单绞
      const bared = strip * (1 - wear * 0.55);
      Z.miHeng(c, 1020, 974, 2.6, { t, raise: 0, stance: t * 1.3, flip: 0, drum: 0, bared: bared });

      // 脱下的襕衫（挂上鼓架，随风常摆）
      if (strip > 0) {
        c.save(); c.globalAlpha = clamp(strip * 2);
        const sw = Math.sin(t * 2.2) * 8;
        c.translate(700, 700);
        c.fillStyle = 'rgba(206,196,174,.8)';
        c.beginPath();
        c.moveTo(-34, 0); c.quadraticCurveTo(-44 + sw, 70, -38 + sw, 150);
        c.quadraticCurveTo(0, 160, 38 + sw, 150); c.quadraticCurveTo(44 + sw, 70, 34, 0); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(40,34,26,.8)'; c.lineWidth = 2.6; c.stroke();
        c.restore();
      }

      // 曹操（右，先端坐后拂袖冷笑）
      const cold = ss(2.3, 3.3, lt);
      c.save(); c.globalAlpha = 0.94;
      Z.leader(c, 1560, 962, 2.5, { t, raise: cold * 0.35, stance: t * 0.9, flip: 1, cape: 1 });
      c.restore();
      if (cold > 0.4) {
        c.save(); c.globalAlpha = (cold - 0.4) * 0.8;
        brush(c, [[1490, 800], [1390, 780], [1300, 806]], { w: 15, col: [216, 206, 186], tone: 0.75, dry: 0.6, seed: 885, reveal: (cold - 0.4) / 0.6, tail: 0.6 });
        c.restore();
      }

      // 群臣侧目（左中，交头影）
      c.save(); c.globalAlpha = 0.8;
      [[420, 952], [560, 944]].forEach(([bx, by], k) => {
        c.save(); c.translate(bx, by); c.rotate(0.08 + Math.sin(t * 1.8 + k) * 0.02);
        c.fillStyle = 'rgba(88,80,68,.5)';
        c.beginPath(); c.moveTo(-20, 0); c.quadraticCurveTo(-24, -66, -16, -100); c.quadraticCurveTo(0, -112, 16, -100); c.quadraticCurveTo(24, -66, 20, 0); c.closePath(); c.fill();
        c.beginPath(); c.arc(0, -122, 10, 0, Math.PI * 2); c.fill();
        c.restore();
      });
      c.restore();
      Z.dust(c, t, { x: 1160, y: 966, n: 5, seed: 887, scale: 1.2, alpha: 0.24 });

      Z.bigText(c, '衡反辱孤', { x: 1020, y: 286 + Math.sin(t * 1.25) * 7, size: 82, gap: 20, appear: ss(2.15, 2.85, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '不怍', ss(2.4, 2.75, lt), { size: 86, seed: 889 });
    },
  };
})();
