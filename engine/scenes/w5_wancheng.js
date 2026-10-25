// ⑤ 宛城夜变：建安二年，张绣降而复反，夜袭太祖营。韦时醉酒，卧帐中；双戟先为贼盗去。
// 主动作：火起、乱兵涌入（0.1→1.5s）→ 典韦惊起、探手取戟而空（1.3→2.7s）；母题循环：营火、火把、夜云。
SCENES['w5_wancheng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw5', '#cdc6b1');

  // 乱兵：持矛涌入的剪影（循环：脚步起伏）
  function raider(c, x, y, s, k, t, alpha = 0.9) {
    const ph = t * 5.2 + k * 1.7;
    const bob = Math.sin(ph) * 7;
    c.save(); c.translate(x, y + bob); c.scale(s, s); c.globalAlpha = alpha;
    brush(c, [[0, 0], [-5, -56], [-3, -100]], { w: 20, tone: 0.82, dry: 0.5, seed: 510 + k, head: 0.08, tail: 0.22 });
    brush(c, [[-3, -100], [-21, -126], [-41, -120]], { w: 13, tone: 0.78, dry: 0.5, seed: 520 + k });
    c.fillStyle = 'rgba(34,30,26,.9)'; c.beginPath(); c.arc(-49, -128, 13, 0, Math.PI * 2); c.fill();
    brush(c, [[9, -92], [46, -120], [72, -142]], { w: 5, tone: 0.9, dry: 0.35, seed: 530 + k, tail: 0.4 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.0, lt);
      // 营寨：三座帐篷剪影
      Z.wash(c, 'dw5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 446, amp: 118, tone: 0.2, seed: 91.2 }]);
        g.save(); g.strokeStyle = 'rgba(40,36,30,.5)'; g.lineWidth = 3; g.lineJoin = 'round';
        [[230, 884, 1.0], [760, 890, 1.22], [1640, 880, 1.08]].forEach(([bx, by, bs], k) => {
          g.save(); g.translate(bx, by); g.scale(bs, bs);
          g.beginPath(); g.moveTo(-110, 0); g.quadraticCurveTo(0, -150, 110, 0); g.closePath(); g.stroke();
          g.beginPath(); g.moveTo(-2, 0); g.lineTo(-2, -122); g.stroke();
          g.restore();
        });
        g.restore();
      }, { blur: 3, halo: 12, haloA: 0.2 });
      // 地面
      brush(c, [[0, 886], [600, 874], [1240, 888], [1920, 870]], { w: 14, tone: 0.8, dry: 0.75, seed: 95, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 戟架（空的 —— 双戟已被盗）
      const rx = 470, ry = 902;
      c.save(); c.globalAlpha = 0.8;
      brush(c, [[rx - 72, ry], [rx - 70, ry - 152]], { w: 8, tone: 0.78, dry: 0.42, seed: 450 });
      brush(c, [[rx + 72, ry], [rx + 70, ry - 152]], { w: 8, tone: 0.78, dry: 0.42, seed: 451 });
      brush(c, [[rx - 88, ry - 134], [rx + 88, ry - 132]], { w: 7, tone: 0.78, dry: 0.42, seed: 452 });
      c.restore();

      // 主动作一：乱兵涌入（自右向左推进；后 22% 匀速续进，避免中段定格）
      const rush = ease.out(ss(0.1, 1.5, lt)) * 0.78 + ss(0.1, 2.85, lt) * 0.22;
      [0, 1, 2, 3].forEach((k) => {
        const bx = lerp(2140 + k * 130, 1440 + k * 120, rush);
        raider(c, bx, 892 - (3 - k) * 4, 1.45 - k * 0.06, k, t, 0.85);
      });

      // 主动作二：典韦惊起（醉中被杀声惊醒，赤膊，无甲，双戟已失 → 徒手）
      const rise = ease.out(ss(1.25, 2.05, lt));
      const wy = lerp(986, 900, rise);
      const pick = ss(2.25, 2.85, lt);                 // 第二拍：就地抄起一支短戟
      c.save(); c.globalAlpha = 0.25 + 0.75 * rise;
      Z.dianWei(c, 860, wy, 2.3, {
        t, jiAng: -0.35 + pick * 0.16, raise: pick * 0.3, stance: 0, flip: 0, bare: 1, ji: 0,
      });
      c.restore();
      // 拾兵：地上的短戟被抄起（双戟既失，此后只剩这一支）
      if (pick > 0) {
        c.save(); c.globalAlpha = clamp(pick * 2.6);
        Z.jiShort(c, lerp(1078, 1054, pick), lerp(896, 556, ease.out(pick)), lerp(0.14, -0.42, pick), 150);
        c.restore();
      }
      // 徒手：双戟已失 —— 戟架上一道虚影（想起才知被盗）
      const ghost = ss(2.05, 2.35, lt) * (1 - ss(2.35, 2.7, lt));
      if (ghost > 0) {
        c.save(); c.globalAlpha = ghost * 0.5;
        Z.ji(c, rx - 20, ry - 142, -1.42, 300, t);
        Z.ji(c, rx + 20, ry - 142, -1.32, 290, t + 1.3);
        c.restore();
      }
      // 夜色罩（压在人物之上，火光之下）
      Z.night(c, 0.40);
      // 营火（循环一：呼吸式明暗，夜景靠火光撑运动量）
      Z.campFire(c, 430, 838, 0.85 + Math.sin(t * 3.1) * 0.05, t, { alpha: 0.9 + Math.sin(t * 2.3) * 0.1, seed: 2 });
      Z.campFire(c, 1490, 846, 0.7 + Math.cos(t * 2.7) * 0.05, t, { alpha: 0.8 + Math.sin(t * 3.4 + 1) * 0.12, seed: 3 });
      // 火把（循环二：乱兵手中的火，随涌入推进）
      [0, 1, 2].forEach((k) => {
        const tx = lerp(2100 + k * 150, 1560 + k * 130, rush);
        Z.torch(c, tx, 700 - k * 10, 0.9, t, k + 1);
      });
      // 火星（夜间飞舞）
      c.save();
      for (let i = 0; i < 14; i++) {
        const s = (i * 137.5) % 360, ph = t * (0.5 + (i % 5) * 0.12) + i;
        const sx = 300 + ((i * 271) % 1400), sy = 900 - ((ph * 90) % 620);
        const a = 0.35 + 0.35 * Math.sin(ph * 2 + i);
        c.globalAlpha = a * 0.7; c.fillStyle = 'rgba(255,196,110,.9)';
        c.beginPath(); c.arc(sx + Math.sin(ph) * 14, sy, 2.2 + (i % 3) * 0.7, 0, Math.PI * 2); c.fill();
      }
      c.restore();
      // 夜云（循环三）
      Z.mist(c, t, { y0: 220, y1: 520, n: 3, alpha: 0.42, speed: 30, seed: 61 });
      Z.seal(c, 240, 946, '夜变', ss(1.9, 2.2, lt), { size: 88, seed: 55 });
    },
  };
})();
