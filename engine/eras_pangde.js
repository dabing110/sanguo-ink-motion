// 《庞德》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·魏书·庞德传》：南安狟道人，少为郡吏州从事 → 初平中从马腾击羌氐 →
// 建安中随超拒郭援、高干于平阳，为军锋，亲斩援首，拜中郎将，封都亭侯 →
// 后随超奔汉中从张鲁，太祖定汉中，德随众降，拜立义将军，封关门亭侯 →
// 樊下诸将以德兄在汉中疑之，德曰「我受国恩，义在效死」，亲与羽交战，射羽中额；
// 德常乘白马，羽军谓之白马将军，皆惮之 → 汉水暴溢，避水上堤，被甲持弓，箭不虚发，
// 斩欲降者，自平旦力战至日过中 → 水盛船覆，为羽所得，立而不跪；
// 「我宁为国家鬼，不为贼将也」遂为羽所杀 → 太祖为之流涕，文帝即王位，遣使就德墓赐谥曰壮侯。
// 视觉主线（与于禁互为镜像、与马超同源异构）：① 全片唯一以「马」为主母题的主角——白马将军
// ② 重甲黑将（被甲持弓，箭不虚发）③ 汉水堤战：同样的水，两种死法 ④ 「宁为国家鬼，不为贼将」
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/w_common.js', 'scenes/p_common.js'];   // w_common 用 Z.leader（关羽）/ Z.tomb（墓）
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
  { id: 'p1_naan', dur: 3.0,
    counter: col('南安狟道', '少为郡吏') },

  { id: 'p2_zhanyuan', dur: 2.8, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('阵斩郭援', '拜中郎将') },

  { id: 'p3_baima', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('白马将军', '射羽中额') },

  { id: 'p4_gewei', dur: 3.0, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('各为其主', '归魏') },

  { id: 'p5_dizhan', dur: 2.8, transition: { type: 'ripple', dur: 0.42 },
    counter: col('堤上拒战', '箭不虚发') },

  { id: 'p6_beifu', dur: 3.0, transition: { type: 'ripple', dur: 0.38 },
    counter: col('船覆被执', '立而不跪') },

  { id: 'p7_guogui', dur: 3.0, transition: { type: 'redWedge', dur: 0.36 },
    counter: col('叱羽', '宁为国家鬼') },

  { id: 'p8_zhuanghou', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('谥曰壮侯', '文帝即王位') },
];
