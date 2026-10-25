// 《陆逊》段落表：八幕生平，纯代码水墨。
// 依《三国志·吴书·陆逊传》：吴郡吴人，世江东大族，少孤随祖庐江太守康在官 →
// 出为海昌屯田都尉，县连年亢旱，开仓谷以振贫民，劝督农桑 → 讨山越，所向皆服，部曲二千余人 →
// 权以兄策女配逊，尝问世务，献「腹心未平，曷能图远」之策 → 讨费栈，益施牙幢，夜潜山谷，
// 整编东三郡，得精卒数万人 → 淳于式劾之，逊反荐之，权善之 → 建安二十四年权问谁可代卿，
// 蒙荐逊「意思深长，才堪负重，终可大任」→ 逊代蒙驻陆口，书与羽谦下，羽意大安，无复所嫌 →
// 备伐吴，权命逊为大都督假节督五万人 → 逊固疑之，先攻一营不利，诸将曰「空杀兵耳」，
// 逊曰「吾已晓破之之术」，敕各持一把茅，以火攻拔之 → 一尔势成，破其四十馀营 →
// 备升马鞍山，逊督促诸军四面蹙之，死者数万 → 备夜遁仅得入白帝城，舟船器械一时略尽，尸骸漂流塞江而下；
// 备大惭恚曰「吾乃为逊所折辱」→ 权加拜辅国将军、领荆州牧，改封江陵侯。
// 视觉主线：书生名将 —— 素白儒袍＋纶巾（无甲，区别于周瑜的月白轻甲）、佩剑；母题茅与火。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/lusun.js'];
window.COUNTER_IN_TRANSITION = 'cut';
window.PUNCH = 0.02;

const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 50, gap: 58, subSize: 24 });
    c.restore();
  },
});

window.ERAS = [
  { id: 'ls1_haichang', dur: 3.0,
    counter: col('开仓赈民', '一九八年') },

  { id: 'ls2_shanyue', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('牙幢夜出', '二〇五年') },

  { id: 'ls3_lu Kou', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('一书骄羽', '二一九年') },

  { id: 'ls4_yiling', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('相持七八月', '二二二年') },

  { id: 'ls5_mao', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('各持一把茅', '二二二年') },

  { id: 'ls6_sipashi', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('破四十馀营', '二二二年') },

  { id: 'ls7_maanshan', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('四面蹙之', '二二二年') },

  { id: 'ls8_baidi', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('折辱白帝', '二二二年') },
];
