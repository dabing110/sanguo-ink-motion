// 《田丰》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·袁绍传》及裴注：钜鹿（一云渤海）人，天姿瑰杰，权略多奇，绍以为别驾，参谋帷幄 →
// 建安五年操东征备，丰劝袭许「可一往而定」，绍辞以子病，丰举杖击地曰「惜哉」→ 绍南征，丰谏宜以久持，
// 恳谏，绍怒械系之 → 官渡军溃，或谓丰必见释 → 逢纪谮「丰抚掌大笑，喜其言之中也」→ 绍于是害之；
// 绍败还，惭曰「吾不用田丰言，果为所笑」。
// 视觉主线（与荀彧/陈宫区分）：白须高冠的刚直谋主 + 手杖（击地）+ 械/狱窗 + 雪与断杖收束。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js', 'scenes/f_common.js'];   // w_common 只用 Z.leader（袁绍）
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
  { id: 'f1_jizhou', dur: 3.0,
    counter: col('冀州谋主', '约一九一年') },

  { id: 'f2_jibuke', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('机不可失', '二〇〇年') },

  { id: 'f3_kenjian', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('恳谏被囚', '二〇〇年') },

  { id: 'f4_yuzhong', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('狱中', '二〇〇年') },

  { id: 'f5_guandu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('乌巢火起', '二〇〇年十月') },

  { id: 'f6_fuzhang', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('抚掌之谮', '军败报至') },

  { id: 'f7_sizhi', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('吾其死矣', '二〇〇年') },

  { id: 'f8_qianqiu', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('一叹千秋', '果为所笑') },
];
