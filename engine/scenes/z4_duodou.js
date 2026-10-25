// ④ 截江夺斗：横江截船，夺回阿斗。
// 主动作：赵云乘小舟自右追至，跃上大船船头（0.5→1.3s 抛物线一跃），落定横枪指江；母题循环：江涛横流、船帆鼓动、江鸥掠水。
SCENES['z4_duodou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('zl_paper');

  // 大船（楼船剪影）：船身一笔、舱楼两笔、帆两面（鼓动）
  function ship(c, x, y, s, t, lt) {
    c.save(); c.translate(x, y); c.scale(s, s);
    brush(c, [[-260, 0], [-60, -26], [180, -20], [300, 4]], { w: 22, tone: 0.85, dry: 0.4, seed: 91, head: 0.1, tail: 0.2 });
    brush(c, [[-240, 10], [-100, 22], [160, 20], [280, 10]], { w: 8, tone: 0.6, dry: 0.6, seed: 92, tail: 0.4 });
    brush(c, [[-140, -26], [-150, -110], [-60, -116], [-40, -30]], { w: 10, tone: 0.75, dry: 0.5, seed: 93, tail: 0.3 });   // 舱楼
    // 帆：两片，随鼓动
    const bl = Math.sin(t * 2.2) * 10;
    c.fillStyle = 'rgba(250,246,236,.92)';
    c.beginPath(); c.moveTo(30, -120); c.quadraticCurveTo(96 + bl, -170, 130, -260 + bl * 0.4); c.quadraticCurveTo(66, -230, 14, -150); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(28,26,24,.7)'; c.lineWidth = 2.6; c.stroke();
    c.beginPath(); c.moveTo(150, -120); c.quadraticCurveTo(214 - bl, -180, 240, -270 - bl * 0.4); c.quadraticCurveTo(180, -236, 132, -152); c.closePath(); c.fill(); c.stroke();
    brush(c, [[130, -260], [140, -20]], { w: 6, tone: 0.85, dry: 0.4, seed: 94 });
    c.restore();
  }
  // 小舟
  function skiff(c, x, y, s, t) {
    c.save(); c.translate(x, y); c.scale(s, s);
    brush(c, [[-110, 0], [0, -14], [120, 2]], { w: 12, tone: 0.85, dry: 0.5, seed: 95, head: 0.1, tail: 0.3 });
    brush(c, [[-60, 4], [10, 10], [80, 6]], { w: 4, tone: 0.6, dry: 0.6, seed: 96 });
    brush(c, [[0, -12], [-40, -60 + Math.sin(t * 3) * 4]], { w: 5, tone: 0.8, dry: 0.5, seed: 97 });   // 橹
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      Z.wash(c, 'z4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 1100, [{ y0: 560, amp: 150, tone: 0.16, seed: 9.2 }]);
      }, { blur: 4, halo: 16, haloA: 0.26 });
      Z.mist(c, t, { y0: 380, y1: 560, n: 3, alpha: 0.55, speed: 46, seed: 6 });
      // 江鸥（循环三）
      Z.geese(c, t, { y: 240, x0: 2100, speed: 230, n: 3, seed: 5, scale: 0.7 });
      // 大船：从右缓入
      const shipX = lerp(1500, 1120, ease.out(ss(0, 1.4, lt)));
      ship(c, shipX, 700, 1.1, t, lt);
      // 小舟追至（主动作 0→0.9s）
      const q1 = ease.out(ss(0, 0.9, lt));
      const kx = lerp(1960, 1440, q1), ky = lerp(760, 742, q1) + Math.sin(t * 2.4) * 4;
      skiff(c, kx, ky, 1.0, t);
      // 一跃上船（0.9→1.5s 抛物线）
      const q2 = ss(0.9, 1.5, lt);
      let hx, hy, hs;
      if (q2 <= 0 || q2 >= 1) {
        const onShip = q2 >= 1;
        hx = onShip ? shipX + 60 : kx - 10; hy = onShip ? 668 : ky - 6; hs = onShip ? 1.12 : 0.98;
        if (!onShip) { Z.hero(c, hx, hy, hs, t, { spearAng: -0.3, spearLen: 340, raise: 0 }); }
      } else {
        const e = ease.inOut(q2);
        hx = lerp(kx - 10, shipX + 60, e);
        hy = lerp(ky - 6, 668, e) - Math.sin(q2 * Math.PI) * 240; hs = lerp(0.98, 1.12, e);
        c.save(); c.translate(hx, hy); c.scale(hs, hs); c.rotate(q2 * 0.7 - 0.35);
        Z.hero(c, 0, 0, 1, t, { spearAng: -0.6, spearLen: 300, cape: 0 });
        c.restore();
      }
      if (q2 >= 1) {
        // 落定：横枪指江，袍袂当风
        const landed = ss(1.5, 1.9, lt);
        Z.hero(c, shipX + 60, 668, 1.12, t, { spearAng: lerp(-0.3, -0.02, landed), spearLen: 380, raise: 0 });
        if (lt > 1.5 && lt < 1.9) Z.dust(c, t, { x: shipX + 60, y: 690, n: 3, seed: 9, alpha: 0.3, scale: 0.6 });
      }
      // 江水（循环一）：三层
      Z.water(c, t, { y0: 720, y1: 1050, tone: 0.3, seed: 11, rows: 8 });
      // 水花：跃舟处
      if (q2 > 0 && q2 < 1) {
        const r = rng(21);
        for (let i = 0; i < 8; i++) {
          const px = kx + (r() - .5) * 200, py = 750 - r() * 60;
          c.fillStyle = 'rgba(40,40,44,.4)'; c.beginPath(); c.arc(px, py, 2 + r() * 4, 0, Math.PI * 2); c.fill();
        }
      }
      Z.seal(c, 1762, 952, '截江', ss(1.8, 2.05, lt), { size: 88, seed: 14 });
    },
  };
})();
