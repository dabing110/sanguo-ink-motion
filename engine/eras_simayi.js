// 《司马懿》段落表：八幕，纯代码水墨。
// 依《晋书·宣帝纪》：河内温人，字仲达，有鹰视狼顾之相 → 装病避祸 → 西拒诸葛、受巾帼之辱 →
// 五丈原不战 → 远征辽东 → 高平陵之变夺权 → 父子专权 → 晋室之基。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/simayi.js'];
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
  { id: 'sm1_zhuangbing', dur: 3.0,
    counter: col('河内装病', '约二〇一年') },

  { id: 'sm2_xiju', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('西拒诸葛', '二三一年') },

  { id: 'sm3_jinguo', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('巾帼之辱', '二三四年') },

  { id: 'sm4_wuzhang', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('五丈原', '二三四年') },

  { id: 'sm5_liaodong', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('远征辽东', '二三八年') },

  { id: 'sm6_gaopingling', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('高平陵之变', '二四九年') },

  { id: 'sm7_zhuanquan', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('父子专权', '二五一年') },

  { id: 'sm8_jinshi', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('晋室之基', '身后') },
];
