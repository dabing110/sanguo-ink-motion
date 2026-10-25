// ⑦ 建安中，袁绍为中子熙纳之；熙出为幽州，后留养姑。
//   敦煌版：邺城（夯土城墙＋城楼）作背景，她与姑（刘夫人）同在；飞天横过城头天幕。
SCENES['dh4_yuanxi'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 340 + Math.sin(t * .18) * 34, 230, .9, t, t * 2);
      Z.dhCloud(c, 1500 + Math.sin(t * .2 + 2) * 28, 300, .85, t, t * 2 + 2);
      Z.dhApsara(c, t, lt, { y: 240, speed: 260, x0: 2100, scale: .9, phase: 2 });
      c.drawImage(Z.dhFloor(), 0, 0);
      Z.dhYeWall(c, 960, 1010, 1.18, { a: ss(0.1, 1.5, lt), tower: 1, seed: 71 });
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhCouch(c, 1320, 968, 0.96, t, { a: ss(0.2, 1.5, lt), curtain: 0, seed: 21 });
      Z.dhZhenhou(c, 1320, 924, 1.18, { t, fade: ss(0.3, 1.6, lt), bow: 0.12 });
      Z.dhZhenhou(c, 720 + Math.sin(t * .9) * 3, 930, 1.42, { t, fade: ss(0.3, 1.7, lt), young: 1, flip: 1 });
      Z.dhLamp(c, 360, 916, 1.25, t);
      Z.dhLamp(c, 1520, 950, 1.0, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '袁熙之妻', { x: 320, y: 452, size: 60, gap: 12, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '邺城留养姑', { x: 320, y: 546, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
