// 《张飞》段落表：八幕，纯代码水墨。
// 依《三国志·张飞传》：涿郡人，字翼德，少与关羽俱事先主 → 桃园结义 → 长坂据水断桥、瞋目横矛 →
// 义释严颜 → 宕渠大破张郃 → 镇守巴西 → 阆中为部将所害。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/zhangfei.js'];
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
  { id: 'zf1_tuhu', dur: 3.0,
    counter: col('涿郡屠户', '约一八四年') },

  { id: 'zf2_taoyuan', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('桃园结义', '一八四年') },

  { id: 'zf3_changban', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('长坂断喝', '二〇八年') },

  { id: 'zf4_yishi', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('义释严颜', '二一四年') },

  { id: 'zf5_dangqu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('宕渠破郃', '二一五年') },

  { id: 'zf6_brazil', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('镇守巴西', '二一五年') },

  { id: 'zf7_zhong', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('阆中暴卒', '二二一年') },

  { id: 'zf8_wangren', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('万人之敌', '身后') },
];
