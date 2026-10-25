// 《许褚》段落表：八幕生平，纯代码水墨。
// 年表依《三国志·许褚传》：谯国谯人，长八尺余腰大十围，勇力绝人 → 聚宗族数千家坚壁御寇 →
// 率众归曹，太祖曰「此吾樊哙也」→ 从征张绣、袁绍、马超 → 潼关之战，马超疑其有变，褚瞋目盼之，超不敢动 →
// 常侍太祖，出入同行不离左右 → 曹丕即位，迁武卫将军 → 太和六年卒，谥壮侯（虎痴）。
// 视觉主线（与魏延区分）：巨汉深铁甲＋虎皮披风＋大砍刀（魏延是匀称深青将军＋大刀）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/weiyan_common.js', 'scenes/xuchu_common.js'];
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
  { id: 'xuch1_qiao', dur: 3.0,
    counter: col('谯国许褚', '约一七五年') },

  { id: 'xuch2_juzhong', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('聚众御寇', '约一九七年') },

  { id: 'xuch3_guicao', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('率众归曹', '一九九年') },

  { id: 'xuch4_congzheng', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('从征', '二〇〇年') },

  { id: 'xuch5_tongguan', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('潼关瞋目', '二一一年') },

  { id: 'xuch6_hushi', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('虎痴护主', '二一六年') },

  { id: 'xuch7_wuwei', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('武卫将军', '二二〇年') },

  { id: 'xuch8_zhuanghou', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('壮侯', '二三二年') },
];
