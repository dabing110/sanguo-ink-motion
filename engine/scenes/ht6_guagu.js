// ⑥ （《三国演义》第七十五回，文学虚构）关公中毒箭，臂青肿。华佗曰：当于静处立一标柱，
//    钉环，以绳系之，然后以被蒙其首，用尖刀割开皮肉，直至于骨，刮去骨上箭毒。
//    公饮酒食肉，谈笑弈棋，须臾血流盈盆。正史无华佗为关羽疗伤事，此从演义。
SCENES['ht6_guagu'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('ht6', '#e2dece');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.2, lt);
      Z.wash(c, 'ht6_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -40, 2000, [{ y0: 520, amp: 110, tone: 0.13, seed: 61 }, { y0: 660, amp: 78, tone: 0.2, seed: 63 }]);
      }, { blur: 5, halo: 20, haloA: 0.22 });

      // ⚠ 运动量是硬指标：qa 按相邻帧差 >12 灰阶判定（g6 扬尘踩过一次）
      Z.mist(c, t, { y0: 400, y1: 720, n: 6, alpha: 0.6, speed: 94, seed: 612 });
      Z.mist(c, t, { y0: 250, y1: 540, n: 4, alpha: 0.4, speed: 126, seed: 616 });
      Z.inkCloud(c, t, { y: 878, h: 30, n: 5, speed: 94, span: 1500, seed: 3, a: .24 });
      Z.inkCloud(c, t, { y: 480, h: 26, n: 3, speed: 122, span: 1300, seed: 13, a: .18 });

      // 帐幕（军帐内；风掀帐是主运动之一）
      Z.curtain(c, 120, 150, t, { seed: 81, a: .38, col: '74,58,44' });
      Z.curtain(c, 1800, 150, t, { seed: 82, a: .38, col: '74,58,44' });

      // 案（伸臂所置）
      const tbl = ss(0.3, 1.6, lt);
      c.save(); c.globalAlpha = clamp(tbl);
      c.fillStyle = 'rgba(118,94,62,.9)';
      c.beginPath(); c.moveTo(430, 856); c.lineTo(990, 850); c.lineTo(982, 890); c.lineTo(438, 894); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(40,30,20,.9)'; c.lineWidth = 2.8; c.stroke();
      c.fillRect(462, 894, 22, 66); c.fillRect(940, 890, 22, 66);
      c.restore();

      // 关羽（左，伸臂置于案上，从容弈棋）
      Z.guanYu(c, 380, 946, 1.95, t, { flip: 1, bow: .04, arm: ss(0.6, 2.2, lt) });

      // 铜盘（案侧，承接所下之血；以淡墨示意，不写实血）
      Z.bloodBowl(c, 900, 900, 1.0, { a: ss(1.0, 2.6, lt), t, level: 0.75 });

      // 主动作：华佗俯身，右手持刀，刮骨有声（刀光随刮动起伏）
      const cu = ss(0.9, 2.8, lt);
      const scrape = Math.sin(t * 3.6) * 20;
      Z.huatuo(c, 1300 + Math.sin(t * 2.3) * 4, 936, 2.05, { t, fade: ss(0.3, 1.7, lt), raise: .3 + .35 * cu, needle: 0, bag: 0 });
      c.save(); c.globalAlpha = clamp(cu); c.translate(1300 + 56 * 2.05, 936 + (-154 - 48 * .5) * 2.05);
      c.rotate(-.55 + Math.sin(t * 3.6) * .13);
      brush(c, [[0, 0], [11, -32]], { w: 6, tone: .62, dry: .4, seed: 1295, col: [92, 78, 58] });
      c.strokeStyle = 'rgba(250,252,254,.97)'; c.lineWidth = 4.4; c.lineCap = 'round';
      c.beginPath(); c.moveTo(11, -32); c.lineTo(30 + scrape * .35, -80); c.stroke();
      c.strokeStyle = 'rgba(70,78,92,.5)'; c.lineWidth = 1.2;
      c.beginPath(); c.moveTo(11, -32); c.lineTo(30 + scrape * .35, -80); c.stroke();
      c.restore();

      // 灯火（帐中跳动；主运动）
      Z.torch(c, 1680, 856, 1.5, t, 5);
      Z.torch(c, 250, 866, 1.25, t, 11);
      // 案上药巾（随风轻掀）＋ 臂上药气
      brush(c, [[470, 848], [520 + Math.sin(t * 3.1) * 16, 838], [560 + Math.sin(t * 3.1 + 1) * 22, 852]],
        { w: 8, tone: .5, dry: .7, seed: 1331, tail: .7, col: [236, 230, 218] });
      Z.steam(c, 760, 826, t, { n: 3, a: ss(1.0, 2.6, lt) * .7, seed: 59, h: 200 });
      Z.inkSmoke(c, 1180, 660, t, { seed: 17, a: 0.38 });
      Z.inkSmoke(c, 1560, 700, t, { seed: 23, a: 0.32 });

      Z.bigText(c, '刮骨疗毒', { x: 300, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.4, lt), col: 'rgba(150,50,40,.94)', shadow: { color: 'rgba(160,60,50,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '血流盈盘 · 谈笑弈棋', { x: 330, y: 542, size: 42, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(24,20,16,.9)', shadow: { color: 'rgba(90,74,40,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
