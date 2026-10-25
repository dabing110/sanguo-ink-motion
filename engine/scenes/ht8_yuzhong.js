// ⑧ 「佗临死，出一卷书与狱吏，曰：『此可以活人。』吏畏法不受，佗亦不强，索火烧之。」
//    青囊书遂不传。（《三国演义》第七十八回：治风疾神医身死，传遗命奸雄数终）
SCENES['ht8_yuzhong'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht8', '#dedac9');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.0, lt);
      Z.wash(c, 'ht8_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 1980, [{ y0: 520, amp: 110, tone: 0.13, seed: 81 }, { y0: 670, amp: 76, tone: 0.2, seed: 83 }]);
      }, { blur: 5, halo: 22, haloA: 0.24 });

      Z.mist(c, t, { y0: 420, y1: 720, n: 5, alpha: 0.5, speed: 66, seed: 812 });
      Z.inkCloud(c, t, { y: 872, h: 32, n: 4, speed: 68, span: 1500, seed: 5, a: .18 });
      brush(c, [[0, 900], [640, 892], [1280, 902], [1920, 892]], { w: 15, tone: 0.82, dry: 0.7, seed: 818, head: .03, tail: .3 });

      // 狱栅（竖栅 + 横档；囚人之象）
      const bar = ss(0.2, 1.6, lt);
      c.save(); c.globalAlpha = clamp(bar);
      c.strokeStyle = 'rgba(48,40,32,.9)'; c.lineWidth = 9; c.lineCap = 'round';
      for (let k = 0; k < 11; k++) {
        const bx = 90 + k * 176;
        c.beginPath(); c.moveTo(bx, 1010); c.lineTo(bx + 6, 180); c.stroke();
      }
      c.lineWidth = 12;
      c.beginPath(); c.moveTo(70, 330); c.lineTo(1850, 322); c.stroke();
      c.beginPath(); c.moveTo(74, 830); c.lineTo(1846, 824); c.stroke();
      c.restore();

      // 主动作：华佗（左）双手捧书，递向右侧狱吏；书卷已燃（青囊书）
      const offer = ss(0.8, 2.8, lt);
      Z.huatuo(c, 700, 950, 2.3, { t, fade: ss(0.25, 1.6, lt), raise: .55 * offer, needle: 0, bag: 1 });
      // 书卷（递出，右端燃火）
      Z.scroll(c, 700 + 130, 950 + (-206), 1.15, { a: ss(0.6, 2.2, lt), burn: ss(1.4, 3.2, lt), t, open: 1 });
      // 火焰（跳动：主运动）
      const fire = ss(1.2, 3.4, lt);
      if (fire > 0) {
        c.save(); c.globalAlpha = clamp(fire);
        for (let k = 0; k < 9; k++) {
          const fx = 800 + k * 11, fl = 44 + Math.sin(t * 8.5 + k * 2.2) * 22;
          c.fillStyle = `rgba(${214 + Math.sin(t * 11 + k) * 34 | 0},${108 + Math.sin(t * 8 + k) * 46 | 0},48,.8)`;
          c.beginPath(); c.moveTo(fx, 742); c.lineTo(fx + 7, 742 - fl); c.lineTo(fx + 15, 742); c.closePath(); c.fill();
        }
        c.restore();
      }
      // 烟气
      Z.inkSmoke(c, 860, 700, t, { seed: 19, a: 0.3 * ss(1.3, 3.2, lt) });

      // 狱吏（右，畏法不受，退避摆手）
      const off = ss(0.5, 2.0, lt);
      c.save(); c.globalAlpha = clamp(off); c.translate(1420, 950); c.scale(1.9, 1.9);
      c.fillStyle = 'rgba(88,82,96,.86)';
      c.beginPath(); c.moveTo(-26, 0); c.quadraticCurveTo(-22, -44, 0, -56); c.quadraticCurveTo(24, -44, 28, 0); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(28,26,32,.88)'; c.lineWidth = 2.4; c.stroke();
      // 头（后仰，拒）
      c.save(); c.translate(-4, -70); c.rotate(-.18);
      c.fillStyle = 'rgba(240,230,210,.97)';
      c.beginPath(); c.arc(0, 0, 13, 0, Math.PI * 2); c.fill();
      c.strokeStyle = 'rgba(24,22,20,.84)'; c.lineWidth = 2; c.stroke();
      c.fillStyle = 'rgba(26,22,20,.9)';
      c.beginPath(); c.arc(4, -1, 2.2, 0, Math.PI * 2); c.fill();
      c.restore();
      // 摆手（拒）
      const sway = Math.sin(t * 4.2) * 8;
      brush(c, [[24, -44], [44, -56 - sway * .3], [52, -74 - sway * .5]], { w: 9, tone: .5, dry: .5, seed: 1321, head: .1, tail: .2 });
      c.restore();

      Z.curtain(c, 100, 132, t, { seed: 85, a: .22, col: '70,62,50' });
      Z.curtain(c, 1820, 132, t, { seed: 86, a: .22, col: '70,62,50' });

      Z.bigText(c, '此可以活人', { x: 300, y: 452, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '吏畏法不受 · 索火烧之', { x: 330, y: 546, size: 42, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
      // 钤印必须 4 字：Z.seal 在 ch.length>2 时固定画 ch[0..3]，3 字会让 ch[3]=undefined 被 fillText 画成字符串
      Z.seal(c, 220, 236, '七十八回', ss(2.2, 3.0, lt), { size: 56, seed: 384 });
    },
  };
})();
