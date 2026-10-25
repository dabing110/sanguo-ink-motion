// ⑪ 明帝即位，追谥；太和元年四月，初营宗庙，掘地得玉玺，方一寸九分，其文曰「天子羡思慈亲」，明帝为之改容。景初元年，立寝庙特祀。
//   敦煌版：寝庙（香烟上升）中，一方玉玺发着微光；飞天祥瑞横过——她死后，儿子给她的回音。
SCENES['dh8_xiqin'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 360 + Math.sin(t * .2) * 30, 250, .9, t, t * 2);
      Z.dhCloud(c, 1480 + Math.sin(t * .17 + 2) * 26, 330, .8, t, t * 2 + 2);
      Z.dhApsara(c, t, lt, { y: 260, speed: 280, x0: 2000, scale: .95, phase: 1 });
      c.drawImage(Z.dhFloor(), 0, 0);
      Z.dhShrine(c, 960, 1002, 1.08, t, { a: ss(0.1, 1.5, lt), incense: 1, seed: 101 });
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhJadeSeal(c, 960, 720, 0.92, t, { a: ss(0.5, 1.8, lt), glow: 1, seed: 91 });
      Z.dhLamp(c, 360, 916, 1.25, t);
      Z.dhLamp(c, 1560, 920, 1.2, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '天子羡思慈亲', { x: 320, y: 452, size: 52, gap: 8, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '掘地得玉玺', { x: 320, y: 546, size: 46, gap: 10, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
      Z.seal(c, 220, 236, '魏书后妃', ss(2.2, 3.0, lt), { size: 56, seed: 394 });
    },
  };
})();
