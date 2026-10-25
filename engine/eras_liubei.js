// 《刘备》段落表：八幕，纯代码水墨。
// 依《三国志·先主传》：涿郡人，字玄德，少孤，与母贩履织席为业 → 桃园结义 → 三顾茅庐 →
// 携民渡江 → 入蜀取益州 → 夷陵伐吴大败 → 白帝托孤。
// v2：桃园幕要用关羽/张飞真身，托孤幕要用诸葛亮真身，故额外挂这三个场景库。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js',
                     'scenes/guanyu.js', 'scenes/zhangfei.js', 'scenes/zhugeliang.js',
                     'scenes/liubei.js'];
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
  { id: 'lb1_zhixi', dur: 3.0,
    counter: col('织席贩履', '约一八四年') },

  { id: 'lb2_taoyuan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('桃园结义', '一八四年') },

  { id: 'lb3_sangu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('三顾茅庐', '二〇七年') },

  { id: 'lb4_xiemin', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('携民渡江', '二〇八年') },

  { id: 'lb5_yizhou', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('入蜀', '二一四年') },

  { id: 'lb6_yiling', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('夷陵之火', '二二二年') },

  { id: 'lb7_baidi', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('白帝托孤', '二二三年') },

  { id: 'lb8_rende', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('仁德之君', '身后') },
];
