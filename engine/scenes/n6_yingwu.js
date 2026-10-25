// ⑥ 鹦鹉赋：衡转属黄祖，黄射大会宾客，有献鹦鹉者——衡揽笔而作，文无加点，辞采甚丽。
// 主动作：鹦鹉入席（0.3→1.4s 飞落架上）→ 衡展纸提笔（1.1→2.2s）→ 一挥而就、笔不停辍（2.0→3.35s 字迹渐显）
// 母题循环：鹦鹉、烛、尘。
SCENES['n6_yingwu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('nq6', '#eae3cc');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.8, lt);
      Z.wash(c, 'nq6_bg', 0.5 + 0.5 * grow, (g) => {
        g.fillStyle = 'rgba(80,74,58,.1)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 400, y1: 700, n: 3, alpha: 0.3, speed: 28, seed: 901 });
      brush(c, [[0, 918], [640, 908], [1280, 920], [1920, 906]], { w: 13, tone: 0.78, dry: 0.75, seed: 903, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 32, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 62, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 3, a: 0.3 });

      // 主动作一：鹦鹉自右上飞入，落架上
      const fly = ss(0.3, 1.4, lt);
      if (fly < 1) {
        const fx = lerp(1980, 1520, fly), fy = lerp(140, 470, fly) + Math.sin(fly * 9) * 30 * (1 - fly);
        Z.yingWu(c, fx, fy, 1.7, t, { fly: 1, seed: 2 });
      } else {
        Z.yingWu(c, 1520, 470, 1.7, t, { fly: 0, seed: 2 });
      }
      // 架（栖木）
      brush(c, [[1560, 640], [1560, 916]], { w: 8, tone: 0.85, dry: 0.4, seed: 905 });
      brush(c, [[1480, 640], [1640, 640]], { w: 7, tone: 0.85, dry: 0.5, seed: 907 });

      // 案几
      c.fillStyle = 'rgba(136,106,66,.85)'; c.fillRect(680, 806, 560, 30);
      c.strokeStyle = 'rgba(52,40,28,.9)'; c.lineWidth = 3; c.strokeRect(680, 806, 560, 30);
      brush(c, [[740, 836], [740, 916]], { w: 14, tone: 0.75, dry: 0.5, seed: 909 });
      brush(c, [[1180, 836], [1180, 916]], { w: 14, tone: 0.75, dry: 0.5, seed: 911 });

      // 主动作二：衡于案前提笔
      const raise = ss(1.1, 2.2, lt);
      Z.miHeng(c, 560, 966, 2.55, { t, raise: raise * 0.4, stance: t * 1.4, flip: 0, drum: 0, pen: raise > 0.5 });

      // 主动作三：一挥而就（纸上字迹行行渐显——墨行生长）
      const write = ss(2.0, 3.35, lt);
      if (write > 0) {
        c.save(); c.translate(960, 700);
        c.fillStyle = 'rgba(244,236,212,.96)'; c.fillRect(-150, -90, 300, 180);
        c.strokeStyle = 'rgba(56,46,32,.9)'; c.lineWidth = 2.8; c.strokeRect(-150, -90, 300, 180);
        c.strokeStyle = 'rgba(48,40,32,.85)'; c.lineWidth = 3.4; c.lineCap = 'round';
        const rows = 6;
        for (let rI = 0; rI < rows; rI++) {
          const prog = clamp(write * rows - rI);
          if (prog <= 0) continue;
          const yy = -62 + rI * 28;
          const len = 240 * prog;
          c.beginPath(); c.moveTo(-126, yy);
          for (let seg = 0; seg < 6; seg++) {
            const sx0 = -126 + (seg / 6) * len;
            const ex = -126 + ((seg + 1) / 6) * len;
            if (ex > -126 + len) break;
            c.lineTo(sx0 + (ex - sx0) * 0.6, yy - 2);
            c.lineTo(ex, yy);
          }
          c.stroke();
        }
        c.restore();
      }

      // 烛（常驻）
      c.save();
      brush(c, [[340, 916], [340, 816]], { w: 9, tone: 0.84, dry: 0.4, seed: 913 });
      c.globalCompositeOperation = 'lighter';
      const f = Math.sin(t * 5.3) * 0.5 + 0.5;
      const g2 = c.createRadialGradient(340, 796, 3, 340, 796, 52 + f * 12);
      g2.addColorStop(0, 'rgba(255,196,96,.52)'); g2.addColorStop(1, 'rgba(255,160,60,0)');
      c.fillStyle = g2; c.beginPath(); c.arc(340, 796, 52 + f * 12, 0, Math.PI * 2); c.fill();
      c.restore();
      Z.dust(c, t, { x: 900, y: 960, n: 5, seed: 915, scale: 1.2, alpha: 0.24 });

      Z.bigText(c, '文无加点', { x: 960, y: 270, size: 80, gap: 18, appear: ss(2.2, 2.9, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '鹦鹉', ss(2.5, 2.85, lt), { size: 86, seed: 917 });
    },
  };
})();
