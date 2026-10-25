// ⑤ 又悉脱所佩环、黼黻，以赏战士。由是士卒感激，人人效死。
//    画面：城头夜色，她把身上值钱的东西一件件解下来，堆在垛口下——守城靠的不是她的刀，是她的首饰。
SCENES['wy5_shangshi'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('wy5', '#dcd7c4');
  const WALL_TOP = 640;
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'wy5_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 480, amp: 116, tone: 0.20, seed: 61 }, { y0: 630, amp: 80, tone: 0.30, seed: 63 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      // 夜色（薄）—— ⚠ Z.night(c, alpha) 两个参数，c 不可省
      Z.night(c, 0.30 * ss(0.2, 1.6, lt));

      Z.mist(c, t, { y0: 380, y1: 680, n: 6, alpha: 0.62, speed: 96, seed: 512 });
      Z.mist(c, t, { y0: 240, y1: 520, n: 4, alpha: 0.44, speed: 128, seed: 516 });
      Z.inkCloud(c, t, { y: 452, h: 32, n: 5, speed: 96, span: 1500, seed: 10, a: .24 });
      Z.inkCloud(c, t, { y: 316, h: 26, n: 4, speed: 124, span: 1300, seed: 20, a: .18 });

      // 冀城（暗色夜墙）
      Z.cityWall(c, 1030, 1074, 1.45, { a: ss(0.1, 1.4, lt), seed: 61 });
      Z.flag(c, 1560, WALL_TOP - 10, 300, t, { seed: 519, col: 'rgba(56,68,104,.78)', text: '涼' });

      // 炬火（主运动）
      Z.torch(c, 560, WALL_TOP + 4, 1.45, t, 41);
      Z.torch(c, 1480, WALL_TOP + 4, 1.35, t, 45);
      Z.campFire(c, 1180, WALL_TOP + 40, 0.95, t, { alpha: .78, seed: 17 });
      Z.dust(c, t, { x: 900, y: 946, n: 6, seed: 59, scale: 1.6, alpha: 0.48 });

      // 卸下的环佩黼黻（堆在垛口下，微光闪动）
      const put = ss(0.7, 2.2, lt);
      Z.jewels(c, 1010, WALL_TOP + 96, 1.65, { a: put, t, seed: 31 });
      Z.jewels(c, 1230, WALL_TOP + 104, 1.25, { a: put * ss(1.1, 2.4, lt), t, seed: 32 });

      // 战士（依次上前领取：持续位移 + 俯身）
      for (let k = 0; k < 5; k++) {
        const q = clamp((lt - 0.6 - k * 0.22) / 1.6);
        const px = lerp(300 + k * 240, 1000 + k * 30, ease.out(q));
        const py = WALL_TOP + 10 + Math.sin(t * 3.4 + k) * 3;
        c.save(); c.globalAlpha = clamp(ss(0.5 + k * 0.1, 1.6 + k * 0.1, lt)) * .62;
        c.translate(px, py); c.scale(.78, .78); c.rotate(ease.out(q) * .12);
        c.fillStyle = 'rgba(116,106,96,.84)';
        c.beginPath(); c.moveTo(-14, 0); c.quadraticCurveTo(-12, -32, 0, -42); c.quadraticCurveTo(13, -32, 15, 0); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(40,34,30,.8)'; c.lineWidth = 2; c.stroke();
        c.fillStyle = 'rgba(230,220,202,.94)';
        c.beginPath(); c.arc(0, -50, 7, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(84,72,58,.88)'; c.lineWidth = 2.6;
        c.beginPath(); c.moveTo(14, -36); c.lineTo(36, -78 - 14 * ease.out(q)); c.stroke();
        c.restore();
      }

      // 主动作：王异解佩（抬手到胸前 → 放下）
      const give = ss(0.6, 2.3, lt);
      const rs = 0.85 - 0.5 * give;
      Z.wangyi(c, 1090 + Math.sin(t * .85) * 3, WALL_TOP + 8, 2.0,
        { t, fade: ss(0.2, 1.4, lt), gou: 1, knife: 0, raise: rs, bow: 0.1 + 0.08 * give });

      Z.inkSmoke(c, 1090, 470, t, { seed: 67, a: 0.28 });
      Z.inkSmoke(c, 520, 580, t, { seed: 68, a: 0.22 });
      Z.curtain(c, 100, 132, t, { seed: 81, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 82, a: .34 });

      Z.bigText(c, '悉脱环佩', { x: 320, y: 444, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '以赏战士', { x: 380, y: 542, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(146,110,40,.92)', shadow: { color: 'rgba(150,120,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
