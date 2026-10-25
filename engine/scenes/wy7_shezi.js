// ⑦ 超遂背约害康，又劫昂，质其子月于南郑。昂欲与杨阜等结谋讨超，问异曰：「吾谋如是，事必万全，当奈月何？」
//    异厉声应曰：「忠义立于身，雪君父之大耻，丧元不足为重，况一子哉！」昂遂闭门逐超。
//    画面：她的儿子被押去南郑做人质——画一纸质押的文书和一骑远去，绝不画亲子受害。
//    她厉声回答，赵昂垂头：这一句是全传最硬的一句，也是她被记住的理由。
SCENES['wy7_shezi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy7', '#e1ddcb');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy7_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 492, amp: 122, tone: 0.17, seed: 81 }, { y0: 642, amp: 84, tone: 0.27, seed: 83 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 712 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 716 });
      Z.inkCloud(c, t, { y: 892, h: 32, n: 5, speed: 96, span: 1500, seed: 12, a: .24 });
      Z.inkCloud(c, t, { y: 476, h: 26, n: 3, speed: 124, span: 1300, seed: 22, a: .18 });
      Z.geese(c, t, { y: 196, x0: 2360, speed: 128, n: 5, seed: 87, scale: .76 });
      brush(c, [[0, 918], [640, 910], [1280, 920], [1920, 910]], { w: 15, tone: 0.76, dry: 0.74, seed: 718, head: .03, tail: .3 });

      // 远方：南郑方向（骑影带走子月 —— 只画远去，不画人）
      const go = ss(0.4, 3.0, lt);
      c.save(); c.globalAlpha = clamp(go) * .5;
      c.translate(lerp(1500, 1900, ease.out(go)), 880);   // ≈110px/s，远低于跳变红线
      const ph7 = t * 5.5;                                // 奔袭相位：马腿快循环才是运动主力
      Z.horse(c, 0, 0, 0.72, ph7, { gallop: 1, flip: 0, tone: .62 });
      Z.rider(c, 0, 0, 0.72, ph7, { flip: 0, cape: 1, backFlag: 0, t, spearAng: -0.5, spearLen: 240 });
      c.restore();
      // 质押文书（一纸，落在地上，随风微翻）
      const dp = ss(0.9, 2.2, lt);
      c.save(); c.globalAlpha = clamp(dp) * .85;
      c.translate(1560, 934); c.rotate(-0.12 + Math.sin(t * 1.3) * .05);
      c.fillStyle = 'rgba(238,230,212,.95)';
      c.beginPath(); c.moveTo(-56, 0); c.lineTo(56, -6); c.lineTo(50, -68); c.lineTo(-54, -62); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(58,48,38,.82)'; c.lineWidth = 2.2; c.stroke();
      c.strokeStyle = 'rgba(42,36,30,.6)'; c.lineWidth = 1.6;
      for (let k = 0; k < 5; k++) {
        c.beginPath(); c.moveTo(-40, -14 - k * 10); c.lineTo(-40 + 44 + Math.sin(t + k * 1.3) * 8, -14 - k * 10); c.stroke();
      }
      c.restore();

      // 炬火（主运动）
      Z.torch(c, 400, 908, 1.35, t, 61);
      Z.torch(c, 1660, 914, 1.25, t, 65);
      Z.dust(c, t, { x: 1500, y: 916, n: 6, seed: 89, scale: 1.6, alpha: 0.5 });

      // 赵昂（左，垂头问「当奈月何」：downcast 1）
      Z.zhaoAng(c, 560 + Math.sin(t * 1.1) * 2, 950, 2.15, t,
        { fade: ss(0.25, 1.5, lt), argue: 0, downcast: ss(0.4, 1.6, lt), seed: 73 });

      // 主动作：王异厉声（一步踏前，抬手直指，身躯前倾）
      const st = ss(0.6, 2.2, lt);
      const wx = lerp(1080, 1010, ease.out(st));
      Z.wangyi(c, wx + Math.sin(t * 1.4) * 4, 950, 2.4,
        { t, fade: ss(0.2, 1.4, lt), gou: 1, knife: 0, raise: st, bow: -0.06 * st });

      // 厉声：三道声纹（自她身前荡开的淡墨弧）
      for (let k = 0; k < 3; k++) {
        const q = (t * .5 + k / 3) % 1;
        c.save(); c.globalAlpha = clamp(st) * Math.sin(Math.PI * q) * .3;
        c.translate(wx - 40, 640);
        c.strokeStyle = 'rgba(60,52,44,.9)'; c.lineWidth = 3.4; c.lineCap = 'round';
        c.beginPath(); c.arc(-30 - q * 90, 0, 150 + q * 130, -0.6, 0.6); c.stroke();
        c.restore();
      }

      Z.inkSmoke(c, wx, 664, t, { seed: 97, a: 0.28 });
      Z.inkSmoke(c, 640, 706, t, { seed: 98, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 85, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 86, a: .34 });

      Z.bigText(c, '丧元不足为重', { x: 300, y: 448, size: 62, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '况一子哉', { x: 420, y: 546, size: 48, gap: 10, appear: ss(1.2, 2.1, lt), col: 'rgba(150,50,40,.92)', shadow: { color: 'rgba(160,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
