// ④ 法不可枉：昌豨复叛，遣禁征之；豨降。诸将皆以为当送诣太祖，禁曰：「豨虽旧友，禁可失节乎！」遂斩之。
// 太祖闻而叹曰：「豨降不诣吾而归禁，岂非命耶！」——旧交的分量，敌不过军法两个字。
// 主动作：军门洞开（0→0.6s）→ 豨伏地、豨旗倒（0.8→2.0s）→ 禁举手下令（1.4→2.2s）→ 刀垂（2.2→2.95s）
// 母题循环：军旗（倒）、松风、尘、帷幕。
SCENES['y4_buwang'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj4', '#e8e1ca');

  // 中军大帐（帷 + 柱 + 幕绳）
  const zhang = (c, x, y, s, t) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    brush(c, [[-300, 0], [-302, -250]], { w: 14, tone: 0.8, dry: 0.4, seed: 310 });
    brush(c, [[300, 0], [302, -250]], { w: 14, tone: 0.8, dry: 0.4, seed: 311 });
    c.fillStyle = 'rgba(196,176,140,.66)';
    c.beginPath(); c.moveTo(-330, -250); c.quadraticCurveTo(0, -400, 330, -250); c.lineTo(300, -240); c.lineTo(-300, -240); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(52,44,34,.86)'; c.lineWidth = 3; c.stroke();
    // 帐帘（随分 t 轻摆）
    const sw = Math.sin(t * 1.6) * 8;
    c.fillStyle = 'rgba(172,150,112,.6)';
    c.beginPath(); c.moveTo(-160, -248); c.lineTo(-160, -60 + sw); c.quadraticCurveTo(-110, -50 + sw, -60, -60 + sw); c.lineTo(-60, -248); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(60, -248); c.lineTo(60, -60 - sw); c.quadraticCurveTo(110, -50 - sw, 160, -60 - sw); c.lineTo(160, -248); c.closePath(); c.fill();
    c.restore();
  };
  // 伏地者（bow: 0 跪坐 → 1 伏地）
  const kneel = (c, x, y, s, t, o = {}) => {
    const { bow = 0 } = o;
    c.save(); c.translate(x, y); c.scale(s, s); c.rotate(bow * 0.5);
    c.translate(0, bow * 26);
    // 腿（跪）
    brush(c, [[-46, -6], [-10, -30], [34, -12]], { w: 20, tone: 0.8, dry: 0.5, seed: 321, head: 0.1, tail: 0.3 });
    brush(c, [[-46, -6], [44, -8]], { w: 15, tone: 0.8, dry: 0.6, seed: 322, tail: 0.4 });
    // 身（前倾）
    c.fillStyle = 'rgba(150,140,116,.6)';
    c.beginPath(); c.moveTo(-30, -26); c.lineTo(-24, -108); c.quadraticCurveTo(0, -120, 26, -104); c.lineTo(34, -26); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(30,26,22,.86)'; c.lineWidth = 3; c.stroke();
    brush(c, [[-30, -30], [0, -24], [32, -30]], { w: 14, col: [102, 76, 44], tone: 0.9, dry: 0.35, seed: 323 });
    // 头（低垂）
    const hx = lerp(4, 26, bow), hy = lerp(-142, -104, bow);
    c.fillStyle = 'rgba(244,236,218,.95)'; c.beginPath(); c.ellipse(hx, hy, 16, 18, bow * 0.5, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.86)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(92,86,74,.92)'; c.beginPath(); c.ellipse(hx, hy - 8, 18, 9, bow * 0.5, Math.PI, 0); c.fill();
    // 反绑的双臂（示意，不写血）
    brush(c, [[26, -96], [46, -60], [40, -30]], { w: 13, tone: 0.75, dry: 0.5, seed: 324 });
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.7, lt);
      Z.wash(c, 'yj4_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 452, amp: 132, tone: 0.2, seed: 90.6 },
          { y0: 566, amp: 88, tone: 0.3, seed: 95.1 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.5, speed: 48, seed: 91 });
      Z.yunHai(c, t, { y: 700, h: 92, n: 4, speed: 62, alpha: 0.46 });
      brush(c, [[0, 912], [640, 900], [1280, 914], [1920, 898]], { w: 14, tone: 0.8, dry: 0.75, seed: 93, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });

      // 大帐
      zhang(c, 560, 900, 1.0, t);
      // 帐前立戟二枝
      [-360, 360].forEach((dx, k) => {
        c.save(); c.globalAlpha = 0.9;
        brush(c, [[560 + dx, 900], [560 + dx + 1, 620]], { w: 9, tone: 0.85, dry: 0.4, seed: 330 + k });
        brush(c, [[560 + dx, 640], [560 + dx + 30, 610]], { w: 6, tone: 0.85, dry: 0.5, seed: 332 + k });
        c.restore();
      });

      // 主动作一：豨跪于帐前 → 伏地
      const bow = ss(0.85, 2.0, lt);
      kneel(c, 1010, 956, 2.0, t, { bow });
      // 豨旗（随人倒下）
      const fdown = ss(1.0, 2.35, lt);
      c.save(); c.globalAlpha = 1 - fdown * 0.75;
      Z.flag(c, 1290, 700, 210, t, { seed: 96, col: 'rgba(150,96,44,.82)', text: '豨', droop: fdown });
      c.restore();

      // 主动作二：禁举手下令 → 刀垂（这一幕不动手，只下令与转身）
      const order = ss(1.4, 2.2, lt), downEl = ss(2.2, 2.95, lt);
      Z.yuJin(c, 1560, 972, 2.4, { t, jiAng: lerp(-0.4, -0.95, downEl), raise: order * (1 - downEl * 0.7), stance: t * 1.2, flip: 0, old: 0, sword: 0 });
      // 行刑（旁）
      c.save(); c.globalAlpha = 0.85;
      Z.hero(c, 1750, 976, 1.5, t, { spearAng: lerp(-0.2, 0.35, order) , spearLen: 300, cape: 0, raise: order });
      c.restore();

      Z.pine(c, t, { x: 200, y: 916, s: 1.15, seed: 97, tone: 0.85 });
      Z.dust(c, t, { x: 1080, y: 960, n: 6, seed: 98, scale: 1.3, alpha: 0.3 });
      Z.bigText(c, '法不可枉', { x: 1000, y: 288, size: 76, gap: 16, appear: ss(2.1, 2.85, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 254, 952, '不枉', ss(2.3, 2.7, lt), { size: 86, seed: 99 });
    },
  };
})();
