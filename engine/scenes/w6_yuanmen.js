// ⑥ 独守辕门：绣反，袭太祖营。韦战于门中，贼不得入。兵遂散从他门并入。
//   时韦校尚有十余人，皆殊死战，无不一当十。
// 主动作：贼至门前（0.15→0.8s）→ 典韦横戟左右击（0.7→1.5 / 1.5→2.3s）→ 贼退不敢入（2.3→2.9s）；
// 母题循环：门钉、扬尘、门后乱云。
SCENES['w6_yuanmen'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('dw6', '#d8d1bb');

  // 门前贼兵：被横戟扫中后仰倒
  function foe(c, x, y, s, hit, t, seed) {
    c.save(); c.translate(x, y); c.scale(s, s);
    c.rotate(ease.in(clamp(hit)) * 1.15);
    c.globalAlpha = 1 - clamp(hit) * 0.45;
    brush(c, [[0, 0], [-6, -58], [-4, -102]], { w: 20, tone: 0.76, dry: 0.5, seed: seed, head: 0.08, tail: 0.22 });
    brush(c, [[-4, -102], [-24, -126], [-44, -122]], { w: 13, tone: 0.72, dry: 0.5, seed: seed + 1 });
    c.fillStyle = 'rgba(38,34,28,.88)'; c.beginPath(); c.arc(-52, -130, 13, 0, Math.PI * 2); c.fill();
    brush(c, [[-6, -94], [12, -68], [30, -54]], { w: 11, tone: 0.62, dry: 0.5, seed: seed + 2, tail: 0.3 });
    c.restore();
  }

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 1.1, lt);
      // 寨墙（左右两侧延伸，把画面收束到辕门）
      Z.wash(c, 'dw6_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 430, amp: 104, tone: 0.18, seed: 87.6 }]);
        g.save(); g.strokeStyle = 'rgba(44,40,34,.55)'; g.lineWidth = 4; g.lineJoin = 'round';
        g.beginPath(); g.moveTo(0, 640); g.lineTo(660, 632); g.lineTo(660, 900); g.stroke();
        g.beginPath(); g.moveTo(1920, 636); g.lineTo(1260, 630); g.lineTo(1260, 900); g.stroke();
        g.restore();
      }, { blur: 3, halo: 12, haloA: 0.2 });
      // 辕门（两扇半开）
      Z.gate(c, 960, 900, 1.62, { open: 0.34, t });
      // 地面
      brush(c, [[0, 902], [640, 890], [1280, 904], [1920, 888]], { w: 14, tone: 0.8, dry: 0.76, seed: 131, head: 0.03, tail: 0.3, reveal: ss(0, 0.3, lt) });
      // 门后乱云（循环一）
      Z.mist(c, t, { y0: 300, y1: 600, n: 3, alpha: 0.4, speed: 34, seed: 71 });

      // 主动作一：贼兵扑到门前
      const come = ease.out(ss(0.15, 0.85, lt));
      const fx1 = lerp(1780, 1330, come), fx2 = lerp(180, 620, come);
      const h1 = ss(0.95, 1.7, lt), h2 = ss(1.6, 2.35, lt);
      foe(c, fx1, 906, 1.5, h1, t, 610);
      foe(c, fx2, 900, 1.42, h2, t, 620);
      if (h1 > 0) Z.dust(c, t, { x: fx1 - 30, y: 918, n: 5, seed: 141, scale: 1.2, alpha: 0.4 * (1 - h1) });
      if (h2 > 0) Z.dust(c, t, { x: fx2 + 30, y: 912, n: 5, seed: 142, scale: 1.1, alpha: 0.4 * (1 - h2) });

      // 主动作二：典韦立于门中，横戟左右击（一双戟八十斤的最后一战）
      const wx = 960, wy = 928;
      const sw1 = ss(0.62, 1.45, lt) * (1 - ss(1.45, 1.9, lt));   // 左击
      const sw2 = ss(1.45, 2.3, lt);                                // 右击
      const swing = -0.35 + sw1 * 1.05 - sw2 * 1.35;
      Z.dianWei(c, wx, wy, 2.1, {
        t, jiAng: swing, raise: 0.12, stance: t * 2.4, flip: 0, bare: 1, cape: 0, ji: 1,
      });
      // 横扫的气痕（一笔白痕随戟走）
      [[sw1, 1], [sw2, -1]].forEach(([q, sg], k) => {
        if (q <= 0) return;
        c.save(); c.globalAlpha = q * 0.45; c.strokeStyle = 'rgba(255,252,246,.92)';
        c.lineWidth = 7; c.lineCap = 'round';
        const r = 300 + q * 90;
        c.beginPath(); c.arc(wx + sg * 120, wy - 330, r, sg > 0 ? -0.75 : Math.PI - 0.75, sg > 0 ? 0.75 : Math.PI + 0.75, sg < 0); c.stroke();
        c.restore();
      });
      // 门前扬尘（循环二）
      Z.dust(c, t, { x: 960, y: 926, n: 7, seed: 143, scale: 1.6, alpha: 0.38 });
      // 贼退（主动作三：退到门两侧，不敢再进）
      const back = ss(2.3, 2.9, lt);
      c.save(); c.globalAlpha = 0.5 * back; c.font = '34px "LXGWWenKai-500"';
      c.fillStyle = 'rgba(96,60,30,.8)'; c.textAlign = 'center';
      c.fillText('贼不得入', 960, 300);
      c.restore();
      Z.seal(c, 240, 946, '守门', ss(2.2, 2.5, lt), { size: 88, seed: 56 });
    },
  };
})();
