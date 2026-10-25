// 《貂蝉》段落表：八幕，纯代码水墨。
// 依《三国演义》连环计：王允府中歌伎 → 夜告汉室之危 → 许婚吕布 → 献入郿坞 →
// 凤仪亭泣诉 → 父子反目 → 郿坞火起、董卓伏诛 → 事成之后不知所终。
// SCENE_LIBS 引入 lvbu.js，以复用温侯造型（Z.lvbu / Z.halberd）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/lvbu.js', 'scenes/diaochan.js'];
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
  { id: 'dc1_geji', dur: 3.0,
    counter: col('王府歌伎', '约一九〇年') },

  { id: 'dc2_miji', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('义父密计', '一九二年') },

  { id: 'dc3_xuhun', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('许婚温侯', '一九二年') },

  { id: 'dc4_xianzhuo', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('献入郿坞', '一九二年') },

  { id: 'dc5_fengyi', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('凤仪亭', '一九二年') },

  { id: 'dc6_fanmu', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('父子反目', '一九二年') },

  { id: 'dc7_zhuxhuo', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('郿坞火起', '一九二年') },

  { id: 'dc8_shenshi', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('芳踪杳然', '身后') },
];
