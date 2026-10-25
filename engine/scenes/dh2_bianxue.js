// ④ 年九岁喜书，视字辄识，数用诸兄笔砚；兄曰「汝当习女工，用书为学，当作女博士邪」，后答「不知书，何由见之」。
//   敦煌版：低案上竹简摊开，她执简翻页；不是被逼着学，是她自己要学。
SCENES['dh2_bianxue'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 420 + Math.sin(t * .19) * 34, 240, .85, t, t * 2);
      Z.dhCloud(c, 1420 + Math.sin(t * .21 + 1) * 30, 330, .9, t, t * 2 + 1.5);
      c.drawImage(Z.dhFloor(), 0, 0);
      c.drawImage(Z.dhAging(), 0, 0);
      c.save(); c.globalAlpha = ss(0.2, 1.4, lt);
      c.fillStyle = '#3f8f6e'; c.beginPath(); c.moveTo(600, 880); c.lineTo(1200, 876); c.lineTo(1196, 908); c.lineTo(604, 912); c.closePath(); c.fill(); c.strokeStyle = '#5a2414'; c.lineWidth = 3; c.stroke();
      c.fillStyle = '#7a2e1e'; c.fillRect(650, 908, 26, 58); c.fillRect(1124, 904, 26, 58);
      c.restore();
      Z.dhSlate(c, 660, 856, 0.92, t, { a: ss(0.25, 1.5, lt), open: 0, seed: 31 });
      Z.dhSlate(c, 1020, 856, 1.05, t, { a: ss(0.3, 1.6, lt), open: 1, seed: 33 });
      Z.dhZhenhou(c, 1180 + Math.sin(t * .8) * 3, 916, 1.5, { t, fade: ss(0.35, 1.7, lt), young: 1, flip: 1, bow: 0.04 });
      Z.dhLamp(c, 380, 918, 1.15, t);
      Z.dhLamp(c, 1560, 922, 1.1, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '当作女博士邪', { x: 320, y: 452, size: 56, gap: 10, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '不知书何由见之', { x: 320, y: 548, size: 40, gap: 8, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
