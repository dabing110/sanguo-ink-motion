// 《于吉》段落表：八幕奇人，纯代码水墨，时长约 30 秒。
// 视觉主线：奇人异士线第二人（续左慈）——以「符水·祈雨·镜中索命」为骨，写意不写实
//   （斩首只画青气投东北，金疮只画朱光迸裂，绝不血腥）。
// 史实边界：于吉符水治病、被孙策所斩，见《江表传》（裴注《三国志·孙策传》）；
//   焚香伏拜、立坛祈雨、镜中索命出自《三国演义》第二十九回。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/u_common.js'];
window.COUNTER_IN_TRANSITION = 'cut';
window.PUNCH = 0.02;

const col = (title, sub) => ({
  draw(c, lt) {
    const a = U.clamp(lt / 0.28);
    c.save(); c.globalAlpha = a;
    Z.colophon(c, { title, sub, x: 1812, y: 104, size: 46, gap: 52, subSize: 22 });
    c.restore();
  },
});

window.ERAS = [
  { id: 'yj1_fushui', dur: 4.0,
    counter: col('琅琊于吉', '符水治病') },

  { id: 'yj2_fenxiang', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('吴会争拜', '焚香伏道') },

  { id: 'yj3_jice', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('小霸王忌', '以为惑众') },

  { id: 'yj4_qiyu', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('立坛祈雨', '云合雨倾') },

  { id: 'yj5_yuzhu', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('雨霁策怒', '竟斩于市') },

  { id: 'yj6_jingzhong', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('照镜见吉', '惊怖失措') },

  { id: 'yj7_yicun', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('一存一亡', '左慈骑鹤') },

  { id: 'yj8_jiangdong', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('碧眼儿', '坐领江东') },
];
