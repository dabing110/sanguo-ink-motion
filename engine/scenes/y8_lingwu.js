// ⑧ 陵屋见画：帝使豫于陵屋画关羽战克、庞德愤怒、禁降服之状。禁见，惭恚发病薨。
// 一辈子「法不可枉」的人，最后被一幅画钉在墙上——这是全片最安静、也最重的一幕。
// 主动作：壁画依次显影（0.3→2.1s）→ 禁入陵屋、驻足（0.6→1.8s）→ 见画跪倒（2.2→3.1s）→ 画前身影淡去（3.0→3.75s）
// 母题循环：香烛烟、檐尘、松风。
SCENES['y8_lingwu'] = (() => {
  const W = 1920, H = 1080, { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush;
  const paper = () => Z.paper('yj8', '#e9e2cb');

  // 香烛烟（常驻大缕：加粗加高，保证整幕有足够帧差）
  const incense = (c, x, y, t, seed = 1) => {
    c.save(); c.filter = 'blur(7px)';
    for (let k = 0; k < 5; k++) {
      const ph = ((t * 0.26 + k * 0.2 + seed * 0.17) % 1);
      c.strokeStyle = `rgba(140,132,118,${0.5 * (1 - ph)})`;
      c.lineWidth = 13 - ph * 8; c.lineCap = 'round';
      c.beginPath();
      c.moveTo(x, y - 46);
      c.quadraticCurveTo(x + Math.sin(t * 1.1 + k * 2.1 + seed) * 20, y - 46 - ph * 120,
                         x + Math.sin(t * 1.1 + k * 2.1 + 1.4) * 42 * (0.4 + ph), y - 46 - ph * 300);
      c.stroke();
    }
    c.filter = 'none'; c.restore();
  };
  // 素幡（殿前长幡：面积大、色深，摆动时整块位移 —— 本幕帧差主力）
  const fan = (c, x, y, s, t, seed = 1) => {
    c.save(); c.translate(x, y); c.scale(s, s);
    const sw = Math.sin(t * 1.9 + seed) * 0.16;
    c.save(); c.rotate(sw);
    brush(c, [[0, 0], [0, 300]], { w: 8, tone: 0.4, dry: 0.4, seed: seed * 3 });   // 幡杆
    c.fillStyle = 'rgba(58,44,34,.82)';
    c.beginPath();
    c.moveTo(-2, 8);
    c.lineTo(58, 14);
    c.quadraticCurveTo(66, 160, 58, 300);
    c.lineTo(-2, 306);
    c.closePath(); c.fill();
    c.strokeStyle = 'rgba(34,26,20,.85)'; c.lineWidth = 2.6; c.stroke();
    // 幡上白字（更深的对比）
    c.fillStyle = 'rgba(238,230,208,.9)';
    c.font = '46px "LXGWWenKai-500"'; c.textAlign = 'center';
    c.fillText('祭', 28, 120);
    c.fillText('奠', 28, 186);
    c.restore();
    // 幡脚飘带（二次摆，幅度更大）
    const sw2 = Math.sin(t * 2.6 + seed + 1) * 22;
    c.strokeStyle = 'rgba(58,44,34,.8)'; c.lineWidth = 6; c.lineCap = 'round';
    c.beginPath(); c.moveTo(28 + Math.sin(sw) * 300, 306);
    c.quadraticCurveTo(40 + sw2 * 0.5, 340, 24 + sw2, 366);
    c.stroke();
    c.restore();
  };
  // 纸灰（烛火纸灰缓升，暗色对比）
  const ash = (c, t, seed = 1) => {
    c.save();
    for (let k = 0; k < 7; k++) {
      const ph = ((t * 0.11 + k / 7 + seed * 0.1) % 1);
      const px = 760 + (k * 211) % 420 + Math.sin(t * 0.9 + k) * 26;
      const py = 900 - ph * 640;
      c.fillStyle = `rgba(84,76,66,${0.5 * (1 - ph)})`;
      c.save(); c.translate(px, py); c.rotate(t * 1.3 + k);
      c.fillRect(-4, -2, 8, 4);
      c.restore();
    }
    c.restore();
  };

  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 3.2, lt);
      Z.wash(c, 'yj8_bg', 0.5 + 0.5 * grow, (g) => {
        Z.mountains(c, g, -60, 2100, [{ y0: 470, amp: 112, tone: 0.2, seed: 211.6 }]);
        g.fillStyle = 'rgba(64,68,72,.14)'; g.fillRect(0, 0, 1920, 1080);
      }, { blur: 3.5, halo: 15, haloA: 0.24 });
      Z.mist(c, t, { y0: 330, y1: 650, n: 4, alpha: 0.5, speed: 42, seed: 213 });
      brush(c, [[0, 916], [640, 904], [1280, 918], [1920, 902]], { w: 14, tone: 0.78, dry: 0.75, seed: 217, head: 0.03, tail: 0.3, reveal: ss(0, 0.35, lt) });

      // 陵屋（高陵祭殿）
      Z.lingWu(c, 1030, 920, 1.5, t, { tone: 0.74 });
      // 松柏二株（深色风摆——陵前树）
      Z.pine(c, t, { x: 350, y: 936, s: 1.35, seed: 231, tone: 0.85 });
      Z.pine(c, t, { x: 1700, y: 928, s: 1.15, seed: 237, tone: 0.82 });
      // 素幡二条（大幅摆动——帧差主力）
      fan(c, 560, 620, 1.0, t, 3);
      fan(c, 1500, 620, 1.0, t, 7);

      // 主动作一：三幅壁画依次显影
      const prog = ss(0.3, 2.1, lt);
      c.save(); c.translate(1030, 760); c.scale(0.92, 0.92);
      Z.beiHua(c, 0, 0, 1, prog, t, { seed: 9 });
      c.restore();

      // 主动作三：禁入殿 → 见画跪倒 → 身影淡去
      const enter = ss(0.6, 1.8, lt);          // 缓步：120px / 1.2s = 100px/s
      const fall = ss(2.2, 3.1, lt);
      const fade = ss(3.0, 3.75, lt);
      const px = lerp(660, 780, enter);
      // 跪倒之后仍保持缓慢塌陷（连续运动，不留静止平台）
      const slump = fall * 34 + fade * 18;
      c.save(); c.globalAlpha = 1 - fade * 0.55;
      if (fall <= 0) {
        Z.yuJin(c, px, 966, 2.4, { t, jiAng: -0.4, raise: 0, stance: t * (1.3 - enter * 0.9), flip: 0, old: 1, sword: 1 });
      } else {
        // 跪倒：双膝着地，头低向地面（用位移+压低近似，不另画骨架）；剑仍拄在手边
        c.save(); c.translate(0, slump); c.rotate(fall * 0.1 + fade * 0.06);
        Z.yuJin(c, px, 966, 2.4 * (1 - fall * 0.12), { t: t * 0.4, jiAng: 0.3 + fade * 0.1, raise: 0, stance: 0, flip: 0, old: 1, sword: 1 });
        c.restore();
      }
      c.restore();

      // 殿前香烛（大缕常驻）+ 纸灰
      incense(c, 830, 900, t, 3);
      ash(c, t, 5);
      c.save(); c.globalAlpha = 0.9;
      brush(c, [[826, 900], [826, 856]], { w: 5, col: [180, 60, 40], tone: 0.9, dry: 0.5, seed: 721 });
      c.fillStyle = 'rgba(255,190,90,.85)'; c.beginPath(); c.arc(826, 850 + Math.sin(t * 7) * 2, 5, 0, Math.PI * 2); c.fill();
      c.restore();
      // 檐角风尘
      Z.dust(c, t, { x: 1330, y: 930, n: 5, seed: 223, scale: 1.1, alpha: 0.24 });

      Z.bigText(c, '惭恚而薨', { x: 960, y: 262, size: 78, gap: 18, appear: ss(2.6, 3.3, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(120,90,40,.28)', blur: 12, x: 4, y: 5 } });
      Z.seal(c, 252, 948, '高陵', ss(2.9, 3.25, lt), { size: 86, seed: 227 });
    },
  };
})();
