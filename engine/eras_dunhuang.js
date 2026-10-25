// 《甄后·敦煌》段落表：八幕，纯代码敦煌壁画风（莫高窟·盛唐），时长约 30 秒。
// 女性线第四人「甄后」的敦煌重渲版；史实同水墨版——全出《三国志·魏书·卷五·后妃传》及裴注引《魏书》《魏略》。
// ⚠ 定名：本传无名，只称「文昭甄皇后」；「甄宓」为后世以《洛神赋》宓妃附会，一律用「甄后」，不取洛神之说。
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ dh_common（追加；依赖 z_common 的 Z.bigText/Z.colophon/Z.seal）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/dh_common.js'];
window.COUNTER_IN_TRANSITION = 'cut';
window.PUNCH = 0.02;

const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 46, gap: 52, subSize: 22, col: 'rgba(224,190,110,.92)', subCol: 'rgba(236,223,196,.82)' });
    c.restore();
  },
});

window.ERAS = [
  { id: 'dh1_shifu', dur: 4.0,
    counter: col('中山甄氏', '三岁失父') },

  { id: 'dh2_bianxue', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('当作女博士邪', '不知书何由见之') },

  { id: 'dh3_zhengu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('匹夫无罪', '怀璧为罪') },

  { id: 'dh4_yuanxi', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('袁熙之妻', '留养邺城') },

  { id: 'dh5_yecheng', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('令新妇举头', '颜色非凡') },

  { id: 'dh6_shiyi', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('郭后并爱幸', '后愈失意') },

  { id: 'dh7_cisi', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('二年六月', '遣使赐死') },

  { id: 'dh8_xiqin', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('天子羡思慈亲', '掘地得玉玺') },
];
