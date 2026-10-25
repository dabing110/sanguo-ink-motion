// ② 长沙守信：荆州牧刘表使其与刘磐共守长沙。
// 主动作：白发老将立马城头，一箭钉住来犯之旗（0.8→2.2s，旗晃而不得进）；母题循环：城旗夜卷、江雾横流。
SCENES['h2_changsha'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz2');

  // 城墙：近景垛口（横贯画下沿）
  function rampart(c, lt) {
    brush(c, [[0, 900], [640, 878], [1300, 892], [1920, 874]], { w: 20, tone: 0.82, dry: 0.55, seed: 61, head: 0.03, tail: 0.25, reveal: ss(0, 0.4, lt) });
    brush(c, [[60, 880], [70, 806], [74, 806], [84, 880]], { w: 7, tone: 0.7, dry: 0.6, seed: 62, reveal: ss(0.1, 0.5, lt) });
    for (let i = 0; i < 6; i++) {
      const x = 150 + i * 300;
      brush(c, [[x, 878], [x + 6, 800], [x + 46, 796], [x + 54, 878]], { w: 8, tone: 0.66, dry: 0.6, seed: 70 + i, reveal: ss(0.12 + i * 0.04, 0.5 + i * 0.04, lt) });
    }
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'hz2_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 1920, [
          { y0: 430, amp: 170, tone: 0.2, seed: 11.3 },
          { y0: 596, amp: 110, tone: 0.34, seed: 15.7 },
        ]);
        // 城楼一角（远景）
        g.save(); g.strokeStyle = 'rgba(46,44,40,.42)'; g.lineWidth = 3; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(300, 640); g.lineTo(640, 630); g.lineTo(676, 596); g.lineTo(680, 566); g.stroke();
        g.beginPath(); g.moveTo(420, 630); g.lineTo(420, 578); g.lineTo(482, 566); g.lineTo(482, 630); g.stroke();
        g.beginPath(); g.moveTo(420, 578); g.lineTo(452, 546); g.lineTo(482, 578); g.stroke();
        g.restore();
      }, { blur: 3, halo: 14, haloA: 0.26 });
      // 江雾（循环一）
      Z.mist(c, t, { y0: 470, y1: 700, n: 4, alpha: 0.66, speed: 44, seed: 8 });
      rampart(c, lt);
      // 两面守旗（循环二）：一红一青，风里卷
      [[300, 780, 'rgba(178,40,34,.8)', 3], [1620, 772, 'rgba(56,72,78,.75)', 9]].forEach(([fx, fy, colo, sd], i) => Z.flag(c, fx, fy, 250 + i * 20, t, { seed: sd, col: colo }));
      // 来犯之旗（敌）：自左压来，被一箭钉住后晃动不得进
      const push = ss(0.1, 1.5, lt);
      const ex = lerp(-80, 700, push), ep = 700 + Math.sin(t * 2) * 10 * (1 - ss(1.4, 2.4, lt));
      const shake = ss(1.6, 2.1, lt) * (1 - ss(2.4, 2.7, lt) * 0.35);   // 被钉住后一直颤到幕尾
      c.save(); c.translate(ex, ep); c.rotate(Math.sin(t * 16) * 0.05 * shake);
      Z.flag(c, 0, 0, 210, t, { seed: 31, col: 'rgba(38,36,42,.72)' });
      c.restore();
      // 老将：立马城头（白发白须，一弓在手）
      const zx = 1240, zy = 812, s = 1.28;
      // 老将面朝左（敌自左压来）：flip 必须传 1，弓才会落在身前左侧＝下面 bx/by 的取点，箭才接得上弓
      const draw = ss(0.55, 1.35, lt) * (1 - 0.55 * ss(2.0, 2.6, lt));    // 放箭后弓弦回弹
      Z.horse(c, zx, zy, s, t * 3.2, { gallop: 0, flip: 1 });
      Z.oldRider(c, zx, zy, s, t * 3.2, { draw, beard: 1, cape: 1, backFlag: 0, old: 1, flip: 1 });
      // 那一箭：起点＝flip:1 时弓的所在（x-58s, y-104s），飞过去钉在敌旗上，钉住后不消失
      const shot = ss(1.3, 1.95, lt);
      if (shot > 0) {
        const bx = zx - 58 * s, by = zy - 104 * s;
        const tx = ex + 58, ty = ep - 176;                               // 旗面右上
        const p = ease.out(shot);
        const stick = 1 - ss(1.95, 2.15, lt);                            // 1 → 0：钉住、留在旗上
        Z.arrow(c, lerp(bx, tx, p), lerp(by, ty, p), Math.atan2(ty - by, tx - bx), 195,
          clamp(shot * 3) * (0.5 + 0.5 * stick));
        // 钉住那一刻崩开的小墨屑
        const sp = ss(1.95, 2.2, lt) * (1 - ss(2.4, 2.9, lt));
        if (sp > 0.02) {
          c.save(); c.globalAlpha = sp * 0.6;
          const rr = rng(42);
          for (let i = 0; i < 6; i++) {
            const px = tx + (rr() - 0.5) * 150, py = ty + (rr() - 0.5) * 120;
            brush(c, [[px, py], [px + 9 * sp, py - 11 * sp]], { w: 4, tone: 0.6, dry: 0.8, seed: 500 + i, tail: 0.9, bristles: 2 });
          }
          c.restore();
        }
      }
      Z.seal(c, 1762, 952, '长沙', ss(1.5, 1.75, lt), { size: 88, seed: 9 });
    },
  };
})();
