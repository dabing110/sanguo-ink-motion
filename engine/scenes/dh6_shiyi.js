// ⑩ 践阼之后，郭后、李、阴贵人并爱幸，后愈失意，有怨言。
//   敦煌版：已是后妃的她（步摇冠＋组绶），微微低首；身侧珠玉如旧，而恩宠已移。郭后（得宠者）在另一侧微扬。
SCENES['dh6_shiyi'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 400 + Math.sin(t * .19) * 32, 245, .88, t, t * 2);
      Z.dhCloud(c, 1440 + Math.sin(t * .21 + 1) * 28, 320, .82, t, t * 2 + 1.5);
      c.drawImage(Z.dhFloor(), 0, 0);
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhJadePile(c, 1420, 872, 1.0, t, { a: ss(0.2, 1.5, lt), seed: 51 });
      Z.dhZhenhou(c, 660 + Math.sin(t * .9) * 3, 922, 1.34, { t, fade: ss(0.25, 1.6, lt), bow: -0.05, flip: 1 });
      Z.dhZhenhou(c, 1040, 920, 1.55, { t, fade: ss(0.3, 1.7, lt), queen: 1, bow: 0.16 + 0.04 * Math.sin(t * 1.2) });
      Z.dhLamp(c, 360, 916, 1.25, t);
      Z.dhLamp(c, 1640, 920, 1.2, t);
      Z.dhFlower(c, t);
      Z.dhVeil(c);
      Z.bigText(c, '郭后并爱幸', { x: 320, y: 452, size: 56, gap: 10, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '后愈失意', { x: 320, y: 548, size: 50, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
