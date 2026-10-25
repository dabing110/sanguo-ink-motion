// ⑤ 天下兵乱饥馑，百姓皆卖金银珠玉，后家大有储谷，颇以买之。后年十余岁白母：「今世乱而多买宝物，匹夫无罪，怀璧为罪……不如以谷振给亲族邻里」。
//   敦煌版：储谷麻袋（敞口落谷粒）与她家所买珠玉并置；她抬手向母亲进言。
SCENES['dh3_zhengu'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 380 + Math.sin(t * .2) * 30, 250, .9, t, t * 2);
      Z.dhCloud(c, 1460 + Math.sin(t * .16 + 2) * 28, 320, .8, t, t * 2 + 2);
      Z.dhApsara(c, t, lt, { y: 270, speed: 290, x0: 2050, scale: .9, phase: 1 });
      c.drawImage(Z.dhFloor(), 0, 0);
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhGrainSacks(c, 720, 968, 1.25, t, { a: ss(0.2, 1.5, lt), n: 6, open: 1, seed: 41 });
      Z.dhJadePile(c, 1360, 870, 1.0, t, { a: ss(0.3, 1.6, lt), seed: 51 });
      Z.dhZhenhou(c, 1040 + Math.sin(t * .9) * 3, 922, 1.5, { t, fade: ss(0.35, 1.7, lt), young: 1, raise: 0.5 + 0.18 * Math.sin(t * 1.4), flip: 1 });
      Z.dhLamp(c, 360, 916, 1.2, t);
      Z.dhLamp(c, 1640, 920, 1.15, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '匹夫无罪', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '怀璧为罪', { x: 320, y: 548, size: 48, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
