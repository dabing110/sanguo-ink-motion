// ① 中山无极人，汉太保甄邯后；三岁失父。《魏书》每寝寐，家中彷彿见如有人持玉衣覆其上，相者刘良曰「此女贵乃不可言」。
//   敦煌版：卧榻上幼小的她，头顶浮着玉衣；飞天携祥瑞横过窟顶——史书第一笔，是先看见「贵不可言」。
SCENES['dh1_shifu'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 360 + Math.sin(t * .2) * 30, 250, .9, t, t * 2);
      Z.dhCloud(c, 1480 + Math.sin(t * .17 + 2) * 26, 330, .8, t, t * 2 + 2);
      Z.dhApsara(c, t, lt, { y: 300, speed: 300, x0: 2000, scale: .95, phase: 0 });
      c.drawImage(Z.dhFloor(), 0, 0);
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhCouch(c, 820, 956, 1.18, t, { a: ss(0.2, 1.5, lt), curtain: 1, seed: 21 });
      Z.dhZhenhou(c, 820, 912, 1.32, { t, fade: ss(0.3, 1.7, lt), young: 1, flip: 1 });
      Z.dhYuYi(c, 820, 560, 0.82, t, { a: ss(0.6, 2.0, lt), seed: 11 });
      Z.dhLamp(c, 360, 916, 1.2, t);
      Z.dhLamp(c, 1560, 920, 1.15, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '中山甄氏', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '三岁失父', { x: 320, y: 548, size: 48, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
