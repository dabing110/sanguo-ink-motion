// ⑦ 剑阁拒敌：景耀六年，钟会攻劒阁，维列营守险，会攻之不能克，粮运县远，将议还归。
// 主动作：敌至关下（0.15→0.95s）→ 姜维立于关门、横枪不动（0.8→1.9s）→ 敌退、关上旗定（2.0→2.95s）；
// 母题循环：关楼旗、山云、关前尘。
SCENES['j7_jiange'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('jw7', '#e8e0c8');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'jw7_bg', 0.5 + 0.5 * grow, (g) => {
        Z.qiShan(c, g, { peak: 260, tone: 0.22, seed: 43 });
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      // 剑阁（两峰夹一关）
      Z.jianGe(c, 960, 900, 1.55, { t, tone: 0.8 });
      // 山云（循环一）+ 关下云海（剑阁在山巅，云海常年翻涌 —— 「守」这一幕的常驻运动母题）
      Z.mist(c, t, { y0: 260, y1: 600, n: 4, alpha: 0.55, speed: 44, seed: 37 });
      Z.yunHai(c, t, { y: 800, h: 120, n: 6, speed: 92, alpha: 0.66 });
      Z.yunHai(c, t, { y: 700, h: 90, n: 4, speed: 60, alpha: 0.5 });
      // 地面上（关卡前）
      brush(c, [[0, 902], [640, 890], [1280, 904], [1920, 886]], { w: 14, tone: 0.82, dry: 0.75, seed: 47, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 主动作一：魏军至关下（单段匀速推进；起点放在画内，避免头几秒画面里没东西在动）
      const come = ss(0.05, 2.0, lt);
      [0, 1, 2].forEach((k) => {
        const rx = lerp(1860 + k * 130, 1500 + k * 118, come);
        const sway = Math.sin(t * 3.1 + k * 1.7) * 4;
        c.save(); c.globalAlpha = 0.8;
        brush(c, [[rx, 890], [rx - 5, 830 + sway], [rx - 2, 792]], { w: 18, tone: 0.72, dry: 0.55, seed: 570 + k, head: 0.08, tail: 0.24 });
        c.fillStyle = 'rgba(44,40,34,.86)'; c.beginPath(); c.arc(rx - 2, 782 + sway, 12, 0, Math.PI * 2); c.fill();
        brush(c, [[rx + 4, 812], [rx + 40, 786], [rx + 62, 764]], { w: 5, tone: 0.85, dry: 0.35, seed: 580 + k, tail: 0.4 });
        c.restore();
      });

      // 主动作二：姜维立于关门，横枪不动（守，不是攻）；尾段收枪（第二拍，填尾部死区）
      const set = ss(0.75, 1.9, lt);
      const sheathe = ss(2.45, 2.95, lt);
      Z.jiangWei(c, 960, 928, 2.2, {
        t, jiAng: lerp(-0.35, -1.12, set) + sheathe * 0.45, raise: set * 0.2 * (1 - sheathe),
        stance: t * 1.4, flip: 0, robe: 0, scroll: 0,
      });
      // 关上旗（循环二：定住，只随风）
      Z.flag(c, 820, 636, 200, t, { seed: 25, col: 'rgba(178,44,36,.84)', text: '汉' });
      Z.flag(c, 1120, 632, 180, t, { seed: 26, col: 'rgba(178,44,36,.8)' });
      // 关前尘（循环三）
      Z.dust(c, t, { x: 1180, y: 904, n: 7, seed: 57, scale: 1.5, alpha: 0.36 });

      // 主动作三：敌退（尾段第二拍，会不能克 → 议还归）
      const back = ss(2.0, 2.95, lt);
      if (back > 0) {
        c.save(); c.globalAlpha = 0.75;
        [0, 1, 2].forEach((k) => {
          const rx = lerp(1500 + k * 118, 2150 + k * 118, back);
          brush(c, [[rx, 890], [rx + 5, 830], [rx + 2, 792]], { w: 17, tone: 0.66, dry: 0.6, seed: 590 + k, head: 0.08, tail: 0.26 });
          c.fillStyle = 'rgba(44,40,34,.8)'; c.beginPath(); c.arc(rx + 2, 782, 11, 0, Math.PI * 2); c.fill();
        });
        c.restore();
      }
      // 关楼檐角的风铃（持续小摆，补中段运动量）
      c.save(); c.globalAlpha = 0.8;
      for (let k = 0; k < 3; k++) {
        const bx = 760 + k * 200, sw = Math.sin(t * 2.6 + k) * 7;
        brush(c, [[bx, 668], [bx + sw * 0.4, 690], [bx + sw, 706]], { w: 3.5, tone: 0.7, dry: 0.5, seed: 620 + k, tail: 0.7 });
        c.fillStyle = 'rgba(120,96,60,.85)'; c.beginPath(); c.arc(bx + sw, 712, 5, 0, Math.PI * 2); c.fill();
      }
      c.restore();
      // 大字：会不能克
      Z.bigText(c, '会不能克', { x: 1010, y: 288, size: 82, gap: 18, appear: ss(1.9, 2.7, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 240, 946, '剑阁', ss(2.3, 2.6, lt), { size: 88, seed: 67 });
    },
  };
})();
