// ⑧ 《魏略》：邺城破，绍妻及后共坐皇堂上；后怖，以头伏姑膝上；文帝谓「令新妇举头！」姑乃捧后令仰，文帝就视，见其颜色非凡。
//   敦煌版：皇堂（阶＋柱＋座）上，她先伏姑膝（kneel），后「举头」（raise 渐起）；文帝入，就视。窟顶飞天横过。
SCENES['dh5_yecheng'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 360 + Math.sin(t * .2) * 30, 235, .85, t, t * 2);
      Z.dhCloud(c, 1480 + Math.sin(t * .18 + 2) * 26, 300, .8, t, t * 2 + 2);
      Z.dhApsara(c, t, lt, { y: 225, speed: 240, x0: 2000, scale: .85, phase: 0 });
      c.drawImage(Z.dhFloor(), 0, 0);
      Z.dhHuangTang(c, 960, 1004, 1.18, { a: ss(0.1, 1.5, lt), seed: 81 });
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhZhenhou(c, 700, 950, 1.16, { t, fade: ss(0.25, 1.6, lt), bow: 0.06 });
      const head = ss(0.4, 2.4, lt);
      Z.dhZhenhou(c, 1010 + Math.sin(t * .8) * 3, 956, 1.46, { t, fade: ss(0.3, 1.7, lt), kneel: 1, raise: head, flip: 1 });
      Z.dhOfficial(c, 1430, 928, 1.42, { t, flip: 1, bow: 0.05 });
      Z.dhLamp(c, 360, 916, 1.25, t);
      Z.dhLamp(c, 1640, 920, 1.2, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '令新妇举头', { x: 320, y: 452, size: 58, gap: 12, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '颜色非凡', { x: 320, y: 548, size: 50, gap: 12, appear: ss(1.2, 2.1, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
