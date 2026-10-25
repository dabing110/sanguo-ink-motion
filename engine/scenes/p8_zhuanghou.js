// ⑧ 谥曰壮侯：太祖闻而悲之，为之流涕，封其二子为列侯。
// 文帝即王位，乃遣使就德墓赐谥，谥曰壮侯；又赐子会等四人爵关内侯，邑各百户。
// 会勇烈有父风，官至中尉将军，封列侯。
// 主动作：墓现（0.2→1.1s）→ 使者捧册自左入（0.8→2.2s）→ 白马自右归（2.2→3.8s）→ 谥字定（2.5→3.5s）
// 母题循环：香烟、松风、云、尘。全片唯一「水退出画面」的一幕——人死了，水也退了，只剩碑与马。
SCENES['p8_zhuanghou'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('pq8', '#eae4d0');

  // 使者（捧册文吏：walk 步态，hold 捧册高度）
  const envoy = (c, x, y, s, t, o = {}) => {
    const { walk = 1, hold = 0 } = o;
    c.save(); c.translate(x, y); c.scale(s, s);
    const st = Math.sin(t * 4.6 * walk) * 8;
    c.translate(0, Math.abs(Math.sin(t * 4.6 * walk)) * -4);
    // 袍（深青，文吏）
    c.fillStyle = 'rgba(84,92,110,.86)';
    c.beginPath(); c.moveTo(-42, -168); c.lineTo(42, -172); c.lineTo(58, 4); c.lineTo(-56, 8); c.closePath(); c.fill();
    c.strokeStyle = 'rgba(28,30,40,.88)'; c.lineWidth = 3.2; c.stroke();
    brush(c, [[-52, -84], [0, -78], [54, -86]], { w: 14, col: [128, 104, 56], tone: 0.9, dry: 0.35, seed: 1161 });
    // 腿（走）
    brush(c, [[-18, -84], [-18 - st, -40], [-20 - st, 0]], { w: 18, tone: 0.82, dry: 0.5, seed: 1162, head: 0.06, tail: 0.2 });
    brush(c, [[18, -84], [18 + st, -40], [20 + st, 0]], { w: 18, tone: 0.82, dry: 0.5, seed: 1163, head: 0.06, tail: 0.2 });
    // 头 + 进贤冠
    c.fillStyle = 'rgba(246,238,222,.96)';
    c.beginPath(); c.ellipse(4, -196, 16, 18, 0, 0, Math.PI * 2); c.fill();
    c.strokeStyle = 'rgba(22,20,18,.86)'; c.lineWidth = 2.2; c.stroke();
    c.fillStyle = 'rgba(52,56,70,.92)';
    c.beginPath(); c.moveTo(-14, -210); c.lineTo(22, -210); c.lineTo(20, -232); c.lineTo(-12, -232); c.closePath(); c.fill();
    // 捧册（举高即赐谥）
    c.save(); c.translate(0, -hold * 34);
    c.fillStyle = 'rgba(238,232,214,.95)';
    c.beginPath(); c.rect(-34, -136, 68, 46); c.fill();
    c.strokeStyle = 'rgba(48,40,32,.9)'; c.lineWidth = 2.6; c.stroke();
    brush(c, [[-24, -124], [22, -126]], { w: 4, tone: 0.7, dry: 0.4, seed: 1164 });
    brush(c, [[-24, -110], [14, -112]], { w: 4, tone: 0.7, dry: 0.4, seed: 1165 });
    c.restore();
    brush(c, [[-26, -156], [-46, -140], [-36, -124]], { w: 13, tone: 0.55, dry: 0.45, seed: 1166 });
    brush(c, [[26, -156], [46, -140], [36, -124]], { w: 13, tone: 0.55, dry: 0.45, seed: 1167 });
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.4, lt);
      Z.wash(c, 'pq8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [
          { y0: 428, amp: 150, tone: 0.2, seed: 1151.5 },
          { y0: 534, amp: 92, tone: 0.3, seed: 1153.9 },
          { y0: 620, amp: 58, tone: 0.4, seed: 1155.1 },
        ]);
      }, { blur: 3.5, halo: 15, haloA: 0.22 });
      Z.mist(c, t, { y0: 320, y1: 640, n: 4, alpha: 0.46, speed: 40, seed: 1152 });
      Z.yunHai(c, t * 0.9, { y: 700, h: 92, n: 4, speed: 54, alpha: 0.4 });

      brush(c, [[0, 912], [640, 900], [1280, 914], [1920, 898]], { w: 14, tone: 0.8, dry: 0.75, seed: 1157, head: 0.03, tail: 0.3, reveal: ss(0, 0.35, lt) });
      // 帧差主力：垂帷 + 浓墨烟带（静止文戏修复）
      Z.curtain(c, 180, 130, t, { seed: 38, a: 0.24 });
      Z.curtain(c, 1740, 130, t, { seed: 68, a: 0.24 });
      Z.inkSmoke(c, 960, 470, t, { seed: 19, a: 0.3 });
      Z.pine(c, t, { x: 300, y: 918, s: 1.25, seed: 1158, tone: 0.86 });
      Z.pine(c, t, { x: 1660, y: 924, s: 1.0, seed: 1159, tone: 0.84 });

      // 主动作一：德墓（碑 + 香）
      const tombIn = ss(0.2, 1.1, lt);
      c.save(); c.globalAlpha = clamp(tombIn * 1.4);
      Z.tomb(c, 1120, 946, 1.5, t, { incense: ss(0.7, 1.4, lt) });
      c.restore();

      // 主动作二：使者捧册自左入
      const go = ss(0.8, 2.2, lt);
      const ex = lerp(480, 1000, go);
      c.save(); c.globalAlpha = 0.94;
      envoy(c, ex, 976, 1.5, t, { walk: 1 - go * 0.85, hold: ss(2.3, 3.0, lt) });
      c.restore();
      Z.dust(c, t, { x: ex - 40, y: 966, n: 4, seed: 1169, scale: 1.0, alpha: 0.22 });

      // 主动作三：白马自右归（将军已殁，马独归）
      const back = ss(2.2, 3.8, lt);
      const hx = lerp(1840, 1300, back);
      c.save(); c.globalAlpha = 0.95;
      Z.baiMa(c, hx, 986, 1.35, t * 5.2 * (1 - back * 0.75), { gallop: 1, blanket: 1 });
      c.restore();

      Z.geese(c, t, { y: 300, x0: 1500, speed: 62, n: 5, seed: 1171, scale: 0.9 });

      Z.bigText(c, '谥曰壮侯', { x: 950, y: 282, size: 80, gap: 18, appear: ss(2.5, 3.5, lt), col: 'rgba(24,20,16,.95)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 250, 950, '子会列侯', ss(3.1, 3.5, lt), { size: 86, seed: 1173 });
    },
  };
})();
