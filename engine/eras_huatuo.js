// 《华佗》段落表：八幕神医，纯代码水墨，时长约 30 秒。
// 视觉主线：奇人异士线第四人（左慈→于吉→管辂→华佗）——以「药·针·刀·戏」为骨，写意不写实。
// 与前三奇人区分：左慈画「幻」、于吉画「符」、管辂画「数」，华佗画「医」——
//   药囊/银针/药罐/麻沸散/五禽戏/青囊书，全片不出现墨圈幻术、不出现妖异光效。
// 形象：淡青麻布袍 + 方巾（幅巾）+ 背药囊 + 持银针 + 长白须，温润医者，与管辂的粗丑形成反差。
// 史实边界：游学徐土、晓养性之术、精方药、麻沸散刳腹、五禽戏、忤曹被杀，皆见《三国志·魏书·方技传》；
//   「刮骨疗毒」为《三国演义》第七十五回虚构（正史无华佗为关羽疗伤事），
//   「治风疾神医身死 / 青囊书被焚」为《三国演义》第七十八回演绎。
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ w_common → ht_common（二者均为追加）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/ht_common.js'];
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
  { id: 'ht1_peiguo', dur: 4.0,
    counter: col('沛国华佗', '字元化') },

  { id: 'ht2_yangsheng', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('晓养性之术', '年且百岁') },

  { id: 'ht3_fangyao', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('精于方药', '处剂不过数种') },

  { id: 'ht4_mafei', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('麻沸散', '刳腹湔洗') },

  { id: 'ht5_wuqinxi', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('五禽之戏', '以当导引') },

  { id: 'ht6_guagu', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('刮骨疗毒', '血流盈盘') },

  { id: 'ht7_toufeng', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('头风召佗', '恃能厌事') },

  { id: 'ht8_yuzhong', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('青囊一卷', '举火烧之') },
];
