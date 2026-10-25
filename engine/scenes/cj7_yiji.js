// ⑦ 操曰：「诚实相矜，然文状已去，奈何？」
//    文姬曰：「明公厩马万匹，虎士成林，何惜疾足一骑，而不济垂死之命乎！」操感其言，乃追原祀罪。
//    画面：判死的文状已经发出去了。她一句话，曹操派人骑马追了回来。
SCENES['cj7_yiji'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj7', '#e2ddc9');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 478, amp: 134, tone: 0.16, seed: 171 }, { y0: 628, amp: 92, tone: 0.26, seed: 173 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1712 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 1716 });
      Z.inkCloud(c, t, { y: 456, h: 34, n: 5, speed: 96, span: 1500, seed: 20, a: .24 });
      Z.inkCloud(c, t, { y: 300, h: 26, n: 4, speed: 124, span: 1300, seed: 30, a: .18 });
      Z.geese(c, t, { y: 186, x0: 2420, speed: 134, n: 5, seed: 177, scale: .78 });
      brush(c, [[0, 924], [640, 916], [1280, 926], [1920, 916]], { w: 16, tone: 0.74, dry: 0.74, seed: 1718, head: .03, tail: .3 });

      // 厩马万匹（远景：一排马影，躁动）
      for (let k = 0; k < 5; k++) {
        const px = 1560 + (k % 3) * 110;
        const py = 900 + Math.floor(k / 3) * 34;
        c.save(); c.globalAlpha = clamp(ss(0.2, 1.5, lt)) * .42;
        c.translate(px + Math.sin(t * 1.6 + k) * 8, py);
        Z.horse(c, 0, 0, 0.62, t * 2.2 + k * 1.3, { gallop: 0, flip: 1, tone: .56 });
        c.restore();
      }
      // 虎士成林（一列持戟甲士剪影，随呼吸错相微动）
      for (let k = 0; k < 6; k++) {
        const px = 220 + k * 118;
        c.save(); c.globalAlpha = clamp(ss(0.25, 1.6, lt)) * .5;
        c.translate(px, 918 + Math.sin(t * (1.05 + k * 0.11) + k * 1.4) * 3);
        c.fillStyle = 'rgba(100,92,88,.8)';
        c.beginPath(); c.moveTo(-16, 0); c.quadraticCurveTo(-14, -42, 0, -56); c.quadraticCurveTo(15, -42, 17, 0); c.closePath(); c.fill();
        c.fillStyle = 'rgba(224,214,196,.9)';
        c.beginPath(); c.arc(0, -66, 7.5, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(78,66,52,.88)'; c.lineWidth = 2.8;
        c.beginPath(); c.moveTo(14, -50); c.lineTo(30, -150 + Math.sin(t * 1.3 + k) * 5); c.stroke();
        c.restore();
      }

      // 扬尘（追骑所起，大面积）
      Z.dust(c, t, { x: 900, y: 922, n: 9, seed: 179, scale: 2.4, alpha: 0.62 });
      Z.dust(c, t, { x: 1500, y: 930, n: 6, seed: 189, scale: 1.8, alpha: 0.46 });

      // 追骑（自左冲出：奔袭相位快循环＋位移，本幕主运动）
      const rush = ss(0.25, 2.8, lt);
      const rx = lerp(380, 1120, ease.out(rush));
      const ph = t * 9.5;
      c.save(); c.globalAlpha = clamp(ss(0.2, 1.4, lt));
      c.translate(rx, 924);
      Z.horse(c, 0, 0, 1.55, ph, { gallop: 1, flip: 0, tone: .94 });
      Z.rider(c, 0, 0, 1.55, ph, { flip: 0, cape: 1, backFlag: 1, t, spearAng: -0.9, spearLen: 240 });
      c.restore();
      // 残影（疾出的一记白痕）
      const sl = ss(0.55, 0.95, lt) * (1 - ss(0.95, 1.35, lt));
      if (sl > 0) {
        c.save(); c.globalAlpha = sl * .7;
        c.strokeStyle = 'rgba(255,252,246,.92)'; c.lineWidth = 9;
        c.beginPath(); c.moveTo(380, 700); c.quadraticCurveTo(760, 660, rx - 40, 780); c.stroke();
        c.restore();
      }

      // 被追回的文状（一纸，自右飞回左：翻飞）
      const back = ss(1.6, 3.2, lt);
      c.save(); c.globalAlpha = clamp(back) * .92;
      const dx = lerp(1620, 640, ease.out(back));
      const dy = 700 + Math.sin(t * 3.4) * 46;
      c.translate(dx, dy); c.rotate(Math.sin(t * 4.2) * .5);
      c.fillStyle = 'rgba(240,232,214,.96)';
      c.beginPath(); c.moveTo(-56, 0); c.lineTo(56, -6); c.lineTo(50, -64); c.lineTo(-54, -58); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(58,48,38,.85)'; c.lineWidth = 2.2; c.stroke();
      c.strokeStyle = 'rgba(44,38,32,.62)'; c.lineWidth = 1.6;
      for (let k = 0; k < 5; k++) {
        c.beginPath(); c.moveTo(-40, -13 - k * 10); c.lineTo(-40 + 46 + Math.sin(t + k) * 8, -13 - k * 10); c.stroke();
      }
      c.restore();

      // 炬火（主运动）
      Z.torch(c, 520, 908, 1.40, t, 171);
      Z.torch(c, 1700, 902, 1.30, t, 175);

      // 文姬（前景，望向追骑去的方向）
      Z.wenji(c, 860 + Math.sin(t * .95) * 3, 952, 1.95,
        { t, fade: ss(0.2, 1.4, lt), bow: 0.06, hairDown: 0 });

      Z.inkSmoke(c, 860, 664, t, { seed: 187, a: 0.28 });
      Z.inkSmoke(c, 520, 710, t, { seed: 188, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 113, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 114, a: .34 });

      Z.bigText(c, '厩马万匹', { x: 350, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '何惜疾足一骑', { x: 340, y: 546, size: 46, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
