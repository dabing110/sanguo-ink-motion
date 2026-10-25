// ⑩ 帝大怒，二年六月，遣使赐死，葬于邺。
//   敦煌版：她以发覆面（hairDown）——史书不写惨状，只写「遣使赐死」。步摇已卸；使者持诏立于一旁。无飞天、无天花（肃杀）。
SCENES['dh7_cisi'] = (() => {
  const { clamp, ss } = U;
  return {
    draw(c, lt, t) {
      c.drawImage(Z.dhGround(), 0, 0);
      Z.dhCloud(c, 380 + Math.sin(t * .22) * 38, 240, .9, t, t * 2);
      Z.dhCloud(c, 1450 + Math.sin(t * .24 + 1) * 34, 320, .85, t, t * 2 + 1.5);
      Z.dhCloud(c, 900 + Math.sin(t * .2 + 3) * 30, 200, .7, t, t * 2 + 3);
      c.drawImage(Z.dhFloor(), 0, 0);
      c.drawImage(Z.dhAging(), 0, 0);
      Z.dhZhenhou(c, 820 + Math.sin(t * .7) * 3, 928, 1.6, { t, fade: ss(0.3, 1.7, lt), hairDown: 1, bow: 0.5 + 0.04 * Math.sin(t * 1.1) });
      Z.dhOfficial(c, 1380, 924, 1.42, { t, flip: 1, scroll: 1, bow: 0.04 });
      Z.dhScroll(c, 1280, 852, 1.0, t, { a: ss(0.4, 1.6, lt) });
      Z.dhLamp(c, 360, 916, 1.25, t);
      Z.dhLamp(c, 1640, 920, 1.2, t);
      Z.dhVeil(c);
      Z.bigText(c, '二年六月', { x: 320, y: 452, size: 64, gap: 14, appear: ss(0.5, 1.5, lt), col: 'rgba(224,190,110,.96)', shadow: { color: 'rgba(40,18,10,.5)', blur: 12, x: 4, y: 5 } });
      Z.bigText(c, '遣使赐死', { x: 320, y: 548, size: 50, gap: 12, appear: ss(1.1, 2.0, lt), col: 'rgba(236,223,196,.95)', shadow: { color: 'rgba(40,18,10,.45)', blur: 10, x: 3, y: 4 } });
    },
  };
})();
