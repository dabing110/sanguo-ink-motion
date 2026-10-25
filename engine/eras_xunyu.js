// 《荀彧》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·荀彧传》：颍川人，弃绍从曹，太祖曰「吾之子房」→ 建安元年劝迎天子都许「深根固本以制天下」→
// 每征伐在外，常居中持重 → 官渡一书谏止退兵「此用奇之时，不可失也」→ 前后所举皆命世大才（郭嘉/荀攸/钟繇/陈群/司马懿）→
// 十七年谏九锡「不宜如此」，太祖心不能平 → 会征孙权，疾留寿春，馈食发之乃空器 → 以忧薨，时年五十，谥敬侯；
// 世传「荀令君至人家，坐处三日香」。
// 视觉主线（与六部武人片全部区分）：全片唯一文臣——进贤冠 + 宽袍广袖 + 简册 + 香炉（荀令留香）+ 空食盒。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js', 'scenes/x_common.js'];   // w_common 只用 Z.leader（曹操）
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
  { id: 'x1_zifang', dur: 3.0,
    counter: col('吾之子房', '一九一年') },

  { id: 'x2_fengtian', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('奉天子都许', '一九六年') },

  { id: 'x3_chizhong', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('居中持重', '建安年间') },

  { id: 'x4_yidu', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('一书定官渡', '二〇〇年') },

  { id: 'x5_juxian', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('取士不以一揆', '建安年间') },

  { id: 'x6_buyi', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('不宜如此', '二一二年') },

  { id: 'x7_konghe', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('空食盒', '二一二年') },

  { id: 'x8_sanrixiang', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('坐处三日香', '谥曰敬侯') },
];
