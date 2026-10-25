// ② 峨嵋山学道三十年：天雷震碎石壁，得《遁甲天书》三卷——天遁、地遁、人遁。
// 主动作：左慈静坐参道（0.3→1.6s）→ 天雷劈开石壁（≈2.05s 一闪）→ 三卷天书飞出（2.0→3.0s）
// 母题循环：云海、墨尘、幻术墨圈、垂帷。
SCENES['u2_emei'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('uz2', '#e7e4d2');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);

      // 远山（峨眉高峻，淡墨洇开）
      const grow = ss(0, 2.6, lt);
      Z.wash(c, 'uz2_shan', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 360, amp: 180, tone: 0.16, seed: 13 },
          { y0: 520, amp: 120, tone: 0.26, seed: 17 },
          { y0: 660, amp: 80, tone: 0.34, seed: 19 },
        ]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      // 地面一笔
      brush(c, [[0, 920], [640, 912], [1280, 922], [1920, 910]], { w: 14, tone: 0.78, dry: 0.76, seed: 302, head: .03, tail: .3 });
      // 石壁（左慈身后，被雷劈开）
      c.save(); c.globalAlpha = 0.5 + 0.5 * grow;
      c.fillStyle = 'rgba(120,116,104,.5)';
      c.beginPath(); c.moveTo(1180, 940); c.lineTo(1220, 520); c.lineTo(1560, 540); c.lineTo(1600, 940); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(50,46,40,.7)'; c.lineWidth = 3; c.stroke();
      c.restore();

      // 云海（母题）
      Z.mist(c, t, { y0: 560, y1: 760, n: 4, alpha: 0.42, speed: 54, seed: 303 });
      Z.mist(c, t, { y0: 300, y1: 640, n: 4, alpha: 0.5, speed: 40, seed: 304 });
      // 墨云（贴地兜底帧差）
      Z.inkCloud(c, t, { y: 884, h: 26, n: 3, speed: 46, span: 1500, seed: 2, a: .12 });

      // 左慈静坐（执拂尘，不抬手）
      const fade = ss(0.3, 1.6, lt);
      Z.zuoci(c, 860, 944, 2.35, { t, fade, raise: 0, staff: 1, whisk: 1, bow: 0.12 });

      // 幻术墨圈 + 墨尘（绕身）
      Z.magicRing(c, 860, 690, 150, t, { a: .16 * fade, spin: .3 });
      Z.inkMotes(c, 860, 700, 200, t, { n: 20, seed: 6, a: .4 * fade, speed: .6 });

      // 天雷劈石壁（≈2.05s 一闪）
      const flash = clamp(1 - Math.abs(lt - 2.05) / 0.28);
      if (flash > 0.01) Z.lightning(c, 1390, 360, t, flash, { seed: 41, len: 300 });
      // 三卷天书飞出
      const fly = ss(2.0, 3.0, lt);
      if (fly > 0.01) Z.tianShu(c, 1390, 520, 1.2, t, { fly });

      Z.curtain(c, 110, 130, t, { seed: 51, a: .2 });
      Z.curtain(c, 1810, 130, t, { seed: 52, a: .2 });

      Z.bigText(c, '峨眉学道三十年', { x: 980, y: 250 + Math.sin(t * 1.2) * 6, size: 62, gap: 14, appear: ss(0.4, 1.2, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,70,30,.26)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 220, 230, '天书', ss(2.1, 2.7, lt), { size: 80, seed: 305 });
    },
  };
})();
