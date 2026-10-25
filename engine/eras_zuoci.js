// 《左慈》段落表：八幕幻术，纯代码水墨，时长约 35 秒。
// 视觉主线：全系列第一个不画战场的人物——以「变幻」为骨，写意不写实
//   （龙肝只画一团朱色，斩首只画青气，绝不血腥）。
// 史实边界：左慈确有其人（《后汉书·方术列传》），幻术情节出自《三国演义》第六十八回。
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
  { id: 'u1_lujiang', dur: 3.8,
    counter: col('乌角先生', '庐江左慈') },

  { id: 'u2_emei', dur: 3.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('峨眉学道', '天书三卷') },

  { id: 'u3_ganju', dur: 3.8, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('四十担柑橘', '空壳无物') },

  { id: 'u4_ganju2', dur: 3.8, transition: { type: 'ripple', dur: 0.42 },
    counter: col('再剖有肉', '笑而不辩') },

  { id: 'u5_huan', dur: 5.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('四座皆惊', '龙肝牡丹') },

  { id: 'u6_bei', dur: 3.8, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('分杯奉曹', '掷杯白鸠') },

  { id: 'u7_yang', dur: 4.6, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('幻入羊群', '分身千百') },

  { id: 'u8_he', dur: 6.0, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('骑鹤长笑', '奸雄一旦休') },
];
