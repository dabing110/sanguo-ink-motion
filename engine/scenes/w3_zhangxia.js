// ③ 帐下壮士：太祖募陷陈，韦先占，迁为校尉。性忠至谨重，常昼立侍终日，夜宿帐左右。
//   「帐下壮士有典君，提一双戟八十斤。」
// 主动作：立于中军帐外，双铁戟交叉竖立定格（0.3→1.4s）→ 换肩提戟（1.5→2.6s）；母题循环：帐前旗、尘、云气。
SCENES['w3_zhangxia'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw3', '#efe7d4');

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 中军大帐（右侧一座大帐）
      Z.wash(c, 'dw3_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 452, amp: 128, tone: 0.18, seed: 61.5 }]);
        // 帐身
        g.save(); g.translate(1540, 880); g.scale(1.5, 1.5);
        g.fillStyle = 'rgba(226,214,186,.72)';
        g.beginPath(); g.moveTo(-110, 0); g.quadraticCurveTo(0, -150, 110, 0); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(60,48,36,.85)'; g.lineWidth = 3; g.stroke();
        g.fillStyle = 'rgba(52,42,32,.7)'; g.beginPath();                       // 帐门
        g.moveTo(-26, 0); g.lineTo(-26, -56); g.quadraticCurveTo(0, -76, 26, -56); g.lineTo(26, 0); g.closePath(); g.fill();
        g.restore();
      }, { blur: 2.5, halo: 12, haloA: 0.2 });
      Z.mist(c, t, { y0: 300, y1: 620, n: 4, alpha: 0.6, speed: 40, seed: 31 });
      // 帐前旗（循环一）
      Z.flag(c, 1330, 880, 300, t, { seed: 21, col: 'rgba(178,44,36,.86)', text: '曹' });
      Z.flag(c, 1780, 876, 250, t, { seed: 22, col: 'rgba(178,44,36,.8)' });
      // 地面
      brush(c, [[0, 878], [620, 866], [1240, 880], [1920, 862]], { w: 14, tone: 0.82, dry: 0.75, seed: 91, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 主动作：侍立 —— 双戟交叉竖立定格
      const wx = 700, wy = 902;
      const hold = ss(0.3, 1.4, lt);              // 双戟竖起
      const swap = ss(1.5, 2.6, lt);              // 换肩（一手下垂提戟）
      Z.dianWei(c, wx, wy, 2.5, {
        t, jiAng: lerp(-0.3, -1.15, ease.out(hold)) + swap * 0.55,
        raise: hold * (1 - swap * 0.7), stance: 0, flip: 0, cape: 0,
      });
      // 尘（循环二：帐前被风卷起）
      Z.dust(c, t, { x: 900, y: 886, n: 6, seed: 81, scale: 1.3, alpha: 0.34 });
      // 榜题式大字：一双戟八十斤
      Z.bigText(c, '一双戟八十斤', { x: 1080, y: 300, size: 84, gap: 16, appear: ss(0.9, 2.0, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.3)', blur: 12, x: 4, y: 5 } });
      c.save(); c.globalAlpha = ss(2.0, 2.35, lt);
      c.font = '32px "LXGWWenKai-500"'; c.fillStyle = 'rgba(96,60,30,.82)'; c.textAlign = 'center';
      c.fillText('——帐下壮士有典君', 1080, 380);
      c.restore();
      Z.seal(c, 240, 946, '双戟', ss(1.8, 2.1, lt), { size: 88, seed: 53 });
    },
  };
})();
