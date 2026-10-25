// ⑦ 骠骑将军：二一九年，先主为汉中王，拜马超为骠骑将军，领凉州牧，封斄乡侯。
// 主动作：殿前受印——印自案上被捧起（0.5→2.3s 匀速推进，不早饱和）→ 举过头顶；末段印绶飘。
// 持续运动底（防静止，黄忠 h6 的教训）：殿内光斑缓移、香炉青烟、18 粒上浮尘埃、帘幕大幅轻摆、举印呼吸。
SCENES['m7_piaoji'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('mc7', '#f0e8d4');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      // 殿：两根朱柱＋横梁
      Z.wash(c, 'mc7_bg', 0.5 + 0.5 * grow, (g) => {
        g.save();
        g.fillStyle = 'rgba(158,52,42,.20)';
        g.fillRect(120, 90, 74, 860); g.fillRect(1726, 90, 74, 860);
        g.strokeStyle = 'rgba(70,36,30,.7)'; g.lineWidth = 4;
        g.strokeRect(120, 90, 74, 860); g.strokeRect(1726, 90, 74, 860);
        g.fillStyle = 'rgba(58,44,34,.5)'; g.fillRect(60, 110, 200, 34); g.fillRect(1666, 110, 200, 34);
        g.restore();
        brush(g, [[0, 150], [960, 128], [1920, 150]], { w: 14, tone: 0.62, dry: 0.5, seed: 141, head: 0.05, tail: 0.2 });
      }, { blur: 2.5, halo: 12, haloA: 0.2 });
      // 地面光斑（持续运动一：殿顶漏下的一块天光，缓慢游走＋亮度脉动）
      const lx = 1050 + Math.sin(t * 0.5) * 90, ly = 880 + Math.cos(t * 0.34) * 26;
      c.save(); c.globalAlpha = 0.12 + 0.06 * (0.5 + 0.5 * Math.sin(t * 1.1));
      const lg = c.createRadialGradient(lx, ly, 20, lx, ly, 320);
      lg.addColorStop(0, 'rgba(255,240,196,.9)'); lg.addColorStop(1, 'rgba(255,238,190,0)');
      c.fillStyle = lg; c.beginPath(); c.ellipse(lx, ly, 330, 110, 0, 0, Math.PI * 2); c.fill();
      c.restore();
      // 帘幕（循环：两侧垂幔大幅轻摆）
      [-1, 1].forEach((sg, k) => {
        const sw = Math.sin(t * 1.3 + k * 2) * 26;
        c.save(); c.translate(sg > 0 ? 1730 : 190, 150);
        c.fillStyle = 'rgba(196,182,152,.5)';
        c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(sg * 30 + sw, 400, sg * 12 + sw * 1.6, 760); c.lineTo(sg * 74, 760); c.lineTo(sg * 74, 0); c.closePath(); c.fill();
        c.strokeStyle = 'rgba(70,58,44,.4)'; c.lineWidth = 2; c.stroke(); c.restore();
      });
      // 香烟（循环：三缕自香炉升起）
      U.steam(c, t, { x: 1500, y: 720, h: 260, n: 3, w: 4, color: 'rgba(150,138,116,.5)', spread: 26, speed: 0.7, seed: 3, wobble: 12 });
      // 上浮尘埃（持续运动二：光斑里的浮尘，18 粒循环）
      {
        const r = rng(88);
        c.save();
        for (let i = 0; i < 18; i++) {
          const ph = (t * (0.05 + r() * 0.05) + r()) % 1;
          const px = 420 + r() * 1160 + Math.sin(t * 0.8 + i) * 30;
          const py = 950 - ph * 760;
          c.globalAlpha = Math.sin(ph * Math.PI) * 0.30;
          c.fillStyle = '#fff8e8';
          c.beginPath(); c.arc(px, py, 2 + r() * 3.4, 0, Math.PI * 2); c.fill();
        }
        c.restore();
      }
      // 地：一横
      brush(c, [[0, 946], [640, 936], [1300, 948], [1920, 934]], { w: 10, tone: 0.66, dry: 0.8, seed: 151, reveal: ss(0, 0.3, lt) });
      // 案（右侧，印原来放这儿）
      c.save();
      c.fillStyle = 'rgba(96,72,48,.55)'; c.fillRect(1400, 806, 300, 22);
      c.strokeStyle = 'rgba(50,38,28,.75)'; c.lineWidth = 3; c.strokeRect(1400, 806, 300, 22);
      c.fillStyle = 'rgba(96,72,48,.4)'; c.fillRect(1430, 828, 18, 118); c.fillRect(1652, 828, 18, 118);
      c.restore();
      // 马超立姿：受印（匀速推进 + 呼吸微颤，末段不完全饱和）
      const mx = 820, my = 946, ms = 2.25;
      const lift = clamp(ss(0.45, 2.3, lt) + Math.sin(t * 2.2) * 0.015);   // 呼吸：举定后仍微颤
      const H0 = Z.mChaoStand(c, mx, my, ms, t, { lift, cape: 1, spear: 0 });
      // 印：从案上（1550, 800）移到手中，再随双臂举高
      const take = ss(0.45, 2.3, lt);
      const px = lerp(1550, H0.hx, ease.inOut(take));
      const py = lerp(796, H0.hy, ease.inOut(take));
      c.save();
      c.translate(px, py);
      c.fillStyle = 'rgba(196,58,46,.92)';
      c.beginPath(); c.rect(-26, -20, 52, 40); c.fill();
      c.strokeStyle = 'rgba(40,24,20,.85)'; c.lineWidth = 2.4; c.stroke();
      c.fillStyle = 'rgba(250,244,232,.9)'; c.font = '22px "LXGWWenKai-500"'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('驃', 0, 0);
      brush(c, [[0, -22], [6, -40], [-4, -54]], { w: 5, col: [178, 40, 34], tone: 0.9, dry: 0.6, seed: 161, tail: 0.7 });
      // 印绶（持续运动三：红绶从印底垂下，风里摆）
      const rb = Math.sin(t * 2.8) * 10;
      brush(c, [[-18, 20], [-24 + rb * 0.5, 46], [-30 + rb, 74]], { w: 5, col: [178, 40, 34], tone: 0.8, dry: 0.6, seed: 165, tail: 0.8 });
      c.restore();
      // 印光脉冲（举定那一刻，印上迸出一圈光——既填末段又给"受印"一个重音）
      const glint = ss(2.3, 2.55, lt) * (1 - ss(2.55, 2.8, lt));
      if (glint > 0) {
        const gr = lerp(50, 250, ease.out(glint));
        c.save(); c.globalAlpha = glint * 0.55;
        const gg = c.createRadialGradient(px, py, 4, px, py, gr);
        gg.addColorStop(0, 'rgba(255,246,220,.95)'); gg.addColorStop(1, 'rgba(255,238,200,0)');
        c.fillStyle = gg; c.beginPath(); c.arc(px, py, gr, 0, Math.PI * 2); c.fill();
        c.restore();
      }
      // 尘落
      const thud = ss(1.45, 1.9, lt) * (1 - ss(1.9, 2.7, lt));
      if (thud > 0) Z.dust(c, t, { x: mx + 40, y: 930, n: 5, seed: 91, scale: 1.0, alpha: 0.3 * thud });
      c.save(); c.globalAlpha = ss(2.0, 2.4, lt);
      c.font = '40px "LXGWWenKai-500"'; c.fillStyle = 'rgba(90,56,28,.85)'; c.textAlign = 'center';
      c.fillText('拜骠骑将军 · 领凉州牧', 820, 300);
      c.restore();
      Z.seal(c, 240, 946, '斄乡侯', ss(2.1, 2.4, lt), { size: 84, seed: 93 });
    },
  };
})();
