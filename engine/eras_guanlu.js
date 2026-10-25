// 《管辂》段落表：八幕术数，纯代码水墨，时长约 30 秒。
// 视觉主线：奇人异士线第三人（左慈→于吉→管辂）——以「星象·卦爻·占验」为骨，写意不写实。
// 与左慈（幻术变幻）、于吉（符水济世）区分：管辂占的是「数与理」，画面走星野、爻符、青蝇、扬尘，
//   不画幻术墨圈，也不画血腥（何晏邓飏之诛只画大风扬尘 + 二人倒地）。
// 史实边界：管辂事迹见《三国志·魏书·方技传》（与华佗同传）——仰观星辰、明《周易》、自卦三貍、
//   何晏问卦「青蝇集鼻」答以「位峻者颠」、「与死人语，何所畏邪」、岁朝大风而晏飏皆诛、自知寿四十八，
//   皆为正史；「桑下献脯、南斗添寿」出自《三国演义》第六十九回，属文学虚构。
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ w_common → g_common（二者均为追加）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/g_common.js'];
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
  { id: 'g1_xingtong', dur: 4.0,
    counter: col('平原管辂', '少仰星辰') },

  { id: 'g2_mingyi', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('明周易', '占相皆精') },

  { id: 'g3_bushi', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('武城西', '当见三貍') },

  { id: 'g4_qingying', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('青蝇集鼻', '位峻者颠') },

  { id: 'g5_yusiren', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('与死人语', '何所畏邪') },

  { id: 'g6_dafeng', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('岁朝大风', '晏飏皆诛') },

  { id: 'g7_sangxia', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('桑下献脯', '南斗添寿') },

  { id: 'g8_shouzhi', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('寿止四八', '天有常数') },
];
