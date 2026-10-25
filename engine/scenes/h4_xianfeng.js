// ④ 常为先锋：随先主南定诸郡、自葭萌还攻刘璋——「忠每随先主出入，自为先锋」。
// 主动作：一队先锋骑兵自谷口冲出（老将为首，3.4→2.6s 加速出阵）；母题循环：栈道山雾、滚滚战尘。
SCENES['h4_xianfeng'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('hz4');

  // 先锋（老将在前，随从中无白须，显示这是一支队伍而不只一个人）
  function vanguard(c, x, y, s, phase, lead) {
    Z.horse(c, x, y, s, phase, { gallop: 1, flip: 1 });
    Z.oldRider(c, x, y, s, phase, { draw: 0, beard: lead ? 1 : 0, cape: 1, backFlag: lead ? 1 : 0, flip: 1, blade: lead ? 0 : 0 });
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.2, lt);
      Z.wash(c, 'hz4_bg', 0.5 + 0.5 * grow, (g) => {
        // 两条贯穿的远山（不留裁切边），中间一条栈道
        Z.mountains(c, g, -80, 2000, [{ y0: 380, amp: 190, tone: 0.22, seed: 31.7 }]);
        Z.mountains(c, g, -80, 2000, [{ y0: 520, amp: 120, tone: 0.36, seed: 37.3 }]);
      }, { blur: 4, halo: 22, haloA: 0.3 });
      // 谷口雾（循环一）
      Z.mist(c, t, { y0: 460, y1: 700, n: 5, alpha: 0.64, speed: 60, seed: 8 });
      // 栈道：一道斜贯的木板路
      brush(c, [[-40, 880], [520, 838], [1120, 866], [1700, 830], [1960, 856]], { w: 14, tone: 0.6, dry: 0.75, seed: 16, reveal: ss(0, 0.35, lt) });
      for (let i = 0; i < 7; i++) {
        const px = 60 + i * 270, py = 866 - Math.sin((px / 1920) * Math.PI) * 26;
        brush(c, [[px, py + 4], [px + 6, py + 60]], { w: 5, tone: 0.5, dry: 0.7, seed: 90 + i, reveal: ss(0.1 + i * 0.03, 0.45 + i * 0.03, lt) });
      }
      // 先导旗（循环二）：一杆红旗下冲
      const fx = lerp(-100, 400, ss(0.2, 1.6, lt));      // 停在 400，别和冲到 700 的马头糊在一起
      Z.flag(c, fx, 852, 210, t, { seed: 41, col: 'rgba(178,40,34,.82)' });
      // 战尘（母题三的铺底）
      Z.dust(c, t, { x: 900, y: 880, n: 6, seed: 4, alpha: 0.3, scale: 1.7 });
      // 先锋队：老将为首，两骑随后，一并自谷口冲出
      const run = ss(0.25, 2.5, lt);
      const lead = ease.out(run);
      const bx = lerp(1900, 700, lead), by = 846 + Math.sin(lt * 3) * 8;
      Z.dust(c, t, { x: bx + 190, y: by + 6, n: 5, seed: 6, alpha: 0.3 * (1 - run * 0.4), scale: 1.15 });
      vanguard(c, bx + 268, by + 4, 0.86, t * 9 + 1.4, 0);
      vanguard(c, bx + 536, by + 8, 0.78, t * 9 + 2.8, 0);
      vanguard(c, bx, by, 1.12, t * 9, 1);
      // 冲过头时的笔锋飞白（速度线）
      const sp = Math.max(0, 1 - Math.abs(lt - 1.8) * 1.2);
      if (sp > 0.02) {
        c.save(); c.globalAlpha = sp * 0.5;
        for (let i = 0; i < 8; i++) {
          const yy = 700 + i * 26 + Math.sin(t * 3 + i) * 6;
          brush(c, [[bx - 430 - i * 40, yy], [bx - 180 - i * 40, yy + 3], [bx - 40 - i * 40, yy]], { w: 4, tone: 0.7, dry: 0.7, seed: 200 + i, tail: 0.9, bristles: 3 });
        }
        c.restore();
      }
      Z.seal(c, 1762, 952, '先锋', ss(1.6, 1.85, lt), { size: 88, seed: 19 });
    },
  };
})();
