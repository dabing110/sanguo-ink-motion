// ⑤ 汉水空营：偃旗息鼓，大开寨门。
// 主动作：0.4→1.1s 大旗缓缓倒偃；1.6s 起曹军疑伏自右退潮、箭雨腾空而起；赵云横枪立寨门。母题循环：暮色流转、营火摇曳。
SCENES['z5_hanshui'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('zl_paper5', '#ecdfc8');        // 暮色纸

  // 营寨栅栏：一排竖笔＋寨门
  function palisade(c, lt) {
    const r = rng(44);
    for (let i = 0; i < 15; i++) {
      const x = 60 + i * 62 + (r() - .5) * 16, h = 150 + r() * 60;
      brush(c, [[x, 780], [x + 3, 780 - h]], { w: 10, tone: 0.82, dry: 0.55, seed: 300 + i, reveal: ss(0.05 + i * 0.012, 0.2 + i * 0.012, lt) });
    }
    brush(c, [[40, 786], [960, 774], [1900, 788]], { w: 8, tone: 0.6, dry: 0.7, seed: 320, reveal: ss(0.1, 0.4, lt) });
    // 寨门：开着的双扇
    brush(c, [[880, 780], [884, 640], [896, 636], [900, 778]], { w: 9, tone: 0.85, dry: 0.5, seed: 321, reveal: ss(0.15, 0.4, lt) });
    brush(c, [[1100, 778], [1096, 638], [1084, 634], [1082, 776]], { w: 9, tone: 0.85, dry: 0.5, seed: 322, reveal: ss(0.18, 0.42, lt) });
    brush(c, [[902, 700], [1080, 694]], { w: 4, tone: 0.5, dry: 0.7, seed: 323, reveal: ss(0.2, 0.45, lt) });
  }
  // 营火（循环一）：两堆，火苗用叶笔跳动
  function fire(c, x, y, t, s = 1) {
    c.save(); c.translate(x, y); c.scale(s, s);
    brush(c, [[-26, 0], [0, -8], [26, 0]], { w: 8, tone: 0.7, dry: 0.5, seed: 330 });
    for (let i = 0; i < 3; i++) {
      const fl = Math.sin(t * 9 + i * 2.1) * 0.3;
      leaf(c, i * 8 - 8, -6, -1.35 + fl, 42 + Math.sin(t * 7 + i) * 8, 12, 0.8, [196, 88, 40]);
      leaf(c, i * 8 - 8, -10, -1.6 + fl * 0.7, 30 + Math.sin(t * 8 + i) * 6, 9, 0.9, [172, 44, 34]);
    }
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 暮色：全幅淡赭晕（随时间缓缓转深）
      c.save(); c.globalAlpha = 0.32 + 0.1 * ss(0, 3, lt);
      const gr = c.createLinearGradient(0, 0, 0, H);
      gr.addColorStop(0, '#d9a066'); gr.addColorStop(0.55, 'rgba(217,160,102,0)'); gr.addColorStop(1, '#8a5a3a');
      c.fillStyle = gr; c.fillRect(0, 0, W, H); c.restore();
      // 落日（循环二的一部分：缓缓西沉）
      c.save(); c.globalCompositeOperation = 'multiply'; c.filter = 'blur(4px)';
      c.fillStyle = '#c8552f'; c.beginPath(); c.arc(420 - lt * 6, 300 + lt * 8, 46, 0, Math.PI * 2); c.fill();
      c.filter = 'none'; c.restore();
      Z.wash(c, 'z5_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, 0, 1920, [{ y0: 500, amp: 120, tone: 0.2, seed: 11.4 }]);
      }, { blur: 4, halo: 16, haloA: 0.3 });
      // 大旗倒偃（主动作）：0.4→1.1s 从直立到倒伏
      const fall = ease.inOut(ss(0.4, 1.1, lt));
      c.save(); c.translate(520, 792); c.rotate(fall * 1.25);
      brush(c, [[0, 0], [4, -360]], { w: 9, tone: 0.88, dry: 0.4, seed: 340 });
      c.fillStyle = `rgba(178,40,34,${0.9 - fall * 0.25})`;
      const flap = Math.sin(t * 2.6) * 8 * (1 - fall);
      c.beginPath(); c.moveTo(4, -356); c.quadraticCurveTo(90 + flap, -368, 172 - fall * 40, -352 + fall * 30);
      c.lineTo(170 - fall * 40, -290 + fall * 30); c.quadraticCurveTo(88, -300, 6, -292); c.closePath(); c.fill();
      c.restore();
      palisade(c, lt);
      // 地面
      brush(c, [[0, 800], [640, 786], [1300, 798], [1920, 790]], { w: 10, tone: 0.55, dry: 0.8, seed: 15, reveal: ss(0, 0.3, lt) });
      // 营火两堆（循环一）
      fire(c, 260, 852, t, 1.1); fire(c, 1660, 866, t, 0.9);
      // 赵云：寨门前横枪立马（триггер：门中偏左）
      const zx = 990, zy = 900;
      const p = t * 7;
      Z.horse(c, zx, zy, 1.08, p, { gallop: 0, flip: 1 });
      Z.rider(c, zx, zy, 1.08, p, { spearAng: -0.18, spearLen: 360, t, flip: 1, backFlag: 0 });
      // 曹军退潮（1.6s 起）：右侧一串小骑远去（渐隐）
      const retreat = ss(1.6, 3.0, lt);
      if (retreat > 0) {
        const r = rng(38);
        for (let i = 0; i < 5; i++) {
          const bx = 1450 + r() * 420 + retreat * 300 * (0.6 + r() * 0.8);
          const by = 640 + r() * 60, bs = 0.3 + r() * 0.2;
          c.save(); c.globalAlpha = clamp(1 - retreat * 1.1);
          Z.horse(c, bx, by, bs, t * 8 + i, { tone: 0.5, gallop: 1, flip: 0 });
          c.restore();
        }
        // 箭雨腾空（2.0s 起）
        const arw = ss(2.0, 2.6, lt);
        if (arw > 0) {
          for (let i = 0; i < 9; i++) {
            const q = ((t * 0.9 + i * 0.13) % 1);
            const px = 1500 - q * 620, py = 560 - q * 300 + i * 8;
            c.save(); c.translate(px, py); c.rotate(-0.5);
            c.strokeStyle = `rgba(30,28,26,${0.7 * arw * (1 - q)})`; c.lineWidth = 2.6;
            c.beginPath(); c.moveTo(-16, 0); c.lineTo(14, 0); c.stroke();
            c.fillStyle = `rgba(30,28,26,${0.7 * arw * (1 - q)})`;
            c.beginPath(); c.moveTo(20, 0); c.lineTo(10, -4); c.lineTo(10, 4); c.closePath(); c.fill();
            c.restore();
          }
        }
      }
      // 暮鸦两三点的远处（循环）
      Z.geese(c, t, { y: 210, x0: 2000, speed: 120, n: 3, seed: 9, scale: 0.6 });
      Z.seal(c, 1760, 950, '汉水', ss(1.9, 2.15, lt), { size: 88, seed: 17 });
    },
  };
})();
