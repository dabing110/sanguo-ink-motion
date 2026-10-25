// ① 陈留董祀妻者，同郡蔡邕之女也，名琰，字文姬。博学有才辩，又妙于音律。
//    刘昭《幼童传》曰：邕夜鼓琴，弦绝。琰曰「第二弦」。邕曰「偶得之耳」，故断一弦问之，琰曰「第四弦」，并不差谬。
//    画面：屏风那一边，父亲在夜里鼓琴；屏这一边，一个小女孩侧着耳朵。断的是第几弦，她听得出来。
SCENES['cj1_bianxian'] = (() => {
  const { clamp, lerp, ss, rng, ease } = U, P = PAINT, brush = P.brush, leaf = P.leaf;
  const paper = () => Z.paper('cj1', '#e6e2cf');
  return {
    draw(c, lt, t) {
      c.drawImage(paper(), 0, 0);
      const grow = ss(0, 2.4, lt);
      Z.wash(c, 'cj1_bg', 0.4 + 0.6 * grow, (g) => {
        Z.mountains(c, g, -50, 2020, [{ y0: 476, amp: 130, tone: 0.15, seed: 111 }, { y0: 626, amp: 90, tone: 0.24, seed: 113 }]);
      }, { blur: 4, halo: 18, haloA: 0.22 });

      Z.mist(c, t, { y0: 380, y1: 700, n: 6, alpha: 0.62, speed: 96, seed: 1112 });
      Z.mist(c, t, { y0: 236, y1: 520, n: 4, alpha: 0.42, speed: 128, seed: 1116 });
      Z.inkCloud(c, t, { y: 890, h: 32, n: 5, speed: 96, span: 1500, seed: 14, a: .24 });
      Z.inkCloud(c, t, { y: 470, h: 26, n: 3, speed: 124, span: 1300, seed: 24, a: .18 });
      brush(c, [[0, 914], [640, 906], [1280, 916], [1920, 906]], { w: 14, tone: 0.78, dry: 0.74, seed: 1118, head: .03, tail: .3 });

      // 堂柱（两根）
      [[208, 0], [1712, 1]].forEach(([px2, k]) => {
        c.save(); c.translate(px2, 964);
        brush(c, [[0, 0], [-6 + Math.sin(t * .7 + k) * 3, -420], [-10, -844]],
          { w: 34, tone: .6, dry: .55, seed: 1121 + k, col: [104, 76, 52] });
        c.fillStyle = 'rgba(86,62,42,.9)';
        c.beginPath(); c.ellipse(0, -860, 46, 16, 0, 0, Math.PI * 2); c.fill();
        c.restore();
      });

      // 屏风（隔在她与父亲之间：她只闻其声）
      const sc = ss(0.15, 1.5, lt);
      c.save(); c.globalAlpha = clamp(sc); c.translate(980, 962);
      c.fillStyle = 'rgba(226,214,188,.92)';
      c.beginPath(); c.moveTo(-190, 0); c.lineTo(-190, -560); c.lineTo(190, -560); c.lineTo(190, 0); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(74,56,36,.92)'; c.lineWidth = 6; c.stroke();
      // 屏上山水（写意三笔）
      brush(c, [[-160, -180], [-60, -320], [40, -240], [160, -380]], { w: 9, tone: .34, dry: .8, seed: 1131, tail: .6 });
      brush(c, [[-150, -60], [-40, -110], [70, -70], [170, -130]], { w: 7, tone: .22, dry: .85, seed: 1132, tail: .7 });
      c.strokeStyle = 'rgba(60,44,28,.5)'; c.lineWidth = 2;
      c.beginPath(); c.moveTo(-190, -440); c.lineTo(190, -440); c.stroke();
      c.restore();

      // 屏后：蔡邕（只画袍影与抚琴的手，不画脸——她是听出来的，不是看出来的）
      const dad = ss(0.3, 1.6, lt);
      c.save(); c.globalAlpha = clamp(dad) * .55; c.translate(760, 946);
      c.fillStyle = 'rgba(76,68,64,.9)';
      c.beginPath();
      c.moveTo(-40, 0); c.quadraticCurveTo(-58, -120, -34, -168);
      c.lineTo(34, -168); c.quadraticCurveTo(58, -120, 40, 0); c.closePath(); c.fill();
      c.fillStyle = 'rgba(214,202,184,.9)';
      c.beginPath(); c.ellipse(0, -192, 15, 17, 0, 0, Math.PI * 2); c.fill();
      // 抚琴的手（随弦起伏）
      brush(c, [[34, -150], [80, -132 + Math.sin(t * 3.2) * 6], [128, -140]],
        { w: 15, tone: .42, dry: .5, seed: 1141, head: .1, tail: .2 });
      brush(c, [[-34, -150], [-70, -128 - Math.sin(t * 3.6) * 6], [-116, -136]],
        { w: 15, tone: .42, dry: .5, seed: 1142, head: .1, tail: .2 });
      c.restore();

      // 琴（断第二弦 → 又断第四弦）
      const brk = lt < 1.3 ? 0 : (lt < 2.6 ? 2 : 4);
      Z.guqin(c, 800, 828, 1.05, t, { a: ss(0.25, 1.4, lt), brk, vib: 1, seed: 11 });
      // 琴案
      c.save(); c.globalAlpha = clamp(ss(0.25, 1.4, lt));
      brush(c, [[640, 852], [960, 848]], { w: 14, tone: .6, dry: .5, seed: 1147, col: [96, 70, 46] });
      c.restore();

      // 蜡烛（两架；主运动）
      Z.torch(c, 430, 916, 1.38, t, 111);
      Z.torch(c, 1560, 920, 1.30, t, 115);
      Z.dust(c, t, { x: 700, y: 700, n: 6, seed: 119, scale: 1.4, alpha: 0.42 });

      // 主动作：幼年文姬侧耳（屏这一边）
      Z.wenji(c, 1300 + Math.sin(t * .8) * 3, 950, 1.72,
        { t, fade: ss(0.35, 1.7, lt), young: 1, bow: 0.05, flip: 1 });
      // 侧耳：一道向屏的听线（写意，随断弦抖动）
      const ear = ss(0.8, 2.2, lt);
      c.save(); c.globalAlpha = clamp(ear) * .3;
      c.strokeStyle = 'rgba(70,62,56,.9)'; c.lineWidth = 2.6; c.lineCap = 'round';
      const wob = brk ? Math.sin(t * 20) * 6 : Math.sin(t * 4) * 2;
      c.beginPath(); c.moveTo(1300, 830); c.quadraticCurveTo(1150, 790 + wob, 1020, 826); c.stroke();
      c.restore();

      Z.inkSmoke(c, 1300, 664, t, { seed: 117, a: 0.26 });
      Z.inkSmoke(c, 520, 706, t, { seed: 118, a: 0.2 });
      Z.curtain(c, 100, 132, t, { seed: 101, a: .34 });
      Z.curtain(c, 1820, 132, t, { seed: 102, a: .34 });

      Z.bigText(c, '隔墙辨弦', { x: 320, y: 448, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(24,20,16,.94)', shadow: { color: 'rgba(90,74,40,.26)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, brk === 4 ? '第四弦' : (brk === 2 ? '第二弦' : '夜鼓琴'), { x: 430, y: 548, size: 50, gap: 12, appear: ss(1.2, 2.1, lt), col: 'rgba(140,52,42,.92)', shadow: { color: 'rgba(150,60,50,.24)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
