// 《甄后》段落表：八幕，纯代码水墨，时长约 30 秒。
// 系列定位：**女性线第四人**（辛宪英→王异→蔡文姬→甄后）。四人的武器各不相同——
//   辛宪英＝判断（堂上），王异＝行动（城上），蔡文姬＝才与痛（路上），甄后＝识（乱世里先看懂危险）。
// ⚠ 定名说明：她本传无名，只称「文昭甄皇后」。「甄宓」之名出自后世以《洛神赋》宓妃附会，
//   本片一律用「甄后」，并在结尾字幕点明这一点。**不取洛神之说，不取《感甄赋》故事**。
// 史实：全出《三国志·魏书·卷五·后妃传》及裴松之注引《魏书》《魏略》，无一处虚构——
//   ① 中山无极人，明帝母，汉太保甄邯后；父逸，上蔡令；后三岁失父
//   ②（魏书）每寝寐，家中仿佛见如有人持玉衣覆其上者；相者刘良相后曰「此女贵乃不可言」
//   ③ 年八岁，外有立骑马戏者，诸姊皆上阁观之，后独不行：「此岂女人之所观邪？」
//   ④ 年九岁喜书，视字辄识，数用诸兄笔砚；兄曰「汝当习女工，用书为学，当作女博士邪？」
//      后答：「闻古者贤女，未有不学前世成败，以为己诫。不知书，何由见之？」
//   ⑤ 天下兵乱饥馑，百姓皆卖金银珠玉，后家大有储谷，颇以买之。后年十余岁白母：
//      「今世乱而多买宝物，匹夫无罪，怀璧为罪。又左右皆饥乏，不如以谷振给亲族邻里，广为恩惠也。」举家称善
//   ⑥（魏略）年十四，丧中兄俨，悲哀过制；事寡嫂谦敬，拊养俨子，慈爱甚笃；数谏母，母感后言流涕
//   ⑦ 建安中，袁绍为中子熙纳之；熙出为幽州，后留养姑
//   ⑧（魏略）邺城破，绍妻及后共坐皇堂上；文帝入绍舍，后怖，以头伏姑膝上；文帝谓「令新妇举头！」
//      姑乃捧后令仰，文帝就视，见其颜色非凡，称叹之；太祖闻其意，遂为迎取
//   ⑨ 及冀州平，文帝纳后于邺，有宠，生明帝及东乡公主
//   ⑩ 践阼之后，山阳公奉二女以嫔于魏，郭后、李、阴贵人并爱幸，后愈失意，有怨言。
//      帝大怒，二年六月，遣使赐死，葬于邺
//   ⑪ 明帝即位，有司奏请追谥；太和元年四月，初营宗庙，掘地得玉玺，方一寸九分，
//      其文曰「天子羡思慈亲」，明帝为之改容，以太牢告庙；景初元年，立寝庙特祀
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ w_common → zf_common（二者均为追加）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/zf_common.js'];
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
  { id: 'zf1_shifu', dur: 4.0,
    counter: col('中山甄氏', '三岁失父') },

  { id: 'zf2_bianxue', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('当作女博士邪', '不知书何由见之') },

  { id: 'zf3_zhengu', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('匹夫无罪', '怀璧为罪') },

  { id: 'zf4_yuanxi', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('袁熙之妻', '留养邺城') },

  { id: 'zf5_yecheng', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('令新妇举头', '颜色非凡') },

  { id: 'zf6_shiyi', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('郭后并爱幸', '后愈失意') },

  { id: 'zf7_cisi', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('二年六月', '遣使赐死') },

  { id: 'zf8_xiqin', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('天子羡思慈亲', '掘地得玉玺') },
];
