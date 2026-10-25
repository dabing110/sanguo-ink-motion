// 《祢衡》段落表：八幕生平，纯代码水墨。
// 年表依《三国志》及裴注《平原祢衡传》：平原般人，少有才辩，尚气刚傲，好矫时慢物 →
// 兴平中避难荆州，建安初来游许下，操欲见而衡称狂病不肯往 → 操录为鼓史，欲以贱役辱之 →
// 十月朝会击《渔阳掺挝》，声节殊妙，渊渊有金石声；次当脱襕，徐脱衣裸身而立，徐著岑牟单绞之服，颜色不怍；
// 操笑曰「本欲辱衡，衡反辱孤」→ 后转属黄祖，黄射大会宾客有献鹦鹉者，衡揽笔而作《鹦鹉赋》，文无加点 →
// 祖大会宾客，衡出言不逊，对曰「死公！云等道」，祖怒遂杀之，时年二十六；葬于江渚，后世名鹦鹉洲。
// 视觉主线（与田丰/陈宫区分）：全片唯一青年（二十六岁）+ 建鼓与声波涟漪（渔阳掺挝）+ 鹦鹉（赋与洲）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js', 'scenes/n_common.js'];   // w_common 只用 Z.leader（曹操/黄祖）
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
  { id: 'n1_fuping', dur: 3.0,
    counter: col('平原狂士', '建安初') },

  { id: 'n2_kuangbing', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('狂病不往', '许都') },

  { id: 'n3_gushi', dur: 3.4, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('录为鼓史', '操欲辱之') },

  { id: 'n4_yuyang', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('渔阳掺挝', '十月朝会') },

  { id: 'n5_fanru', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('衡反辱孤', '颜色不怍') },

  { id: 'n6_yingwu', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('鹦鹉一赋', '文无加点') },

  { id: 'n7_mazuo', dur: 3.0, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('骂座', '死公云等道') },

  { id: 'n8_yingwuzhou', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('鹦鹉洲', '年二十六') },
];
