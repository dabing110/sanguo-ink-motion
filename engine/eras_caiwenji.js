// 《蔡文姬》段落表：八幕归汉，纯代码水墨，时长约 30 秒。
// 系列定位：**女性线第三人**（辛宪英→王异→蔡文姬→甄宓）。
//   辛宪英＝判断（堂上），王异＝行动（城上），蔡文姬＝才与痛（路上）——
//   她是这条线里唯一一个「被时代碾过去，又把自己写回来」的人。
// 史实：全出《后汉书·卷八十四·列女传·董祀妻蔡琰》，无一处虚构——
//   ① 陈留董祀妻者，同郡蔡邕之女也，名琰，字文姬；博学有才辩，又妙于音律
//   ② 刘昭《幼童传》：邕夜鼓琴，弦绝。琰曰「第二弦」；邕故断一弦问之，琰曰「第四弦」，并不差谬
//   ③ 适河东卫仲道，夫亡无子，归宁于家
//   ④ 兴平中天下丧乱，文姬为胡骑所获，没于南匈奴左贤王，在胡中十二年，生二子
//   ⑤ 曹操素与邕善，痛其无嗣，乃遣使者以金璧赎之，而重嫁于祀
//   ⑥ 祀为屯田都尉，犯法当死，文姬诣曹操请之；蓬首徒行，叩头请罪，音辞清辩，旨甚酸哀，众皆为改容
//   ⑦ 操曰「诚实相矜，然文状已去，奈何？」文姬曰「明公厩马万匹，虎士成林，何惜疾足一骑，而不济垂死之命乎！」操感其言，乃追原祀罪
//   ⑧ 操问坟籍，文姬曰「昔亡父赐书四千许卷…今所诵忆，裁四百余篇耳」；
//      操欲使十吏就写之，文姬曰「男女之别，礼不亲授。乞给纸笔，真草唯命」→ 缮书送之，文无遗误
//   ⑨ 后感伤乱离，追怀悲愤，作诗二章（《悲愤诗》：「儿前抱我颈，问母欲何之…」）
// ⚠ 不取《胡笳十八拍》（唐人拟作，非蔡琰所作），不取「文姬归汉」戏曲线。
// ⚠ SCENE_LIBS 顺序不可改：z_common（重置 window.Z）→ w_common → cj_common（二者均为追加）。
window.SCENE_LIBS = ['scenes/z_common.js', 'scenes/w_common.js', 'scenes/cj_common.js'];
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
  { id: 'cj1_bianxian', dur: 4.0,
    counter: col('隔墙辨弦', '第二弦') },

  { id: 'cj2_guining', dur: 3.6, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('夫亡归宁', '适卫仲道') },

  { id: 'cj3_beilue', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('胡骑所获', '天下丧乱') },

  { id: 'cj4_huzhong', dur: 4.4, transition: { type: 'lampGlow', dur: 0.40 },
    counter: col('在胡十二年', '生二子') },

  { id: 'cj5_biezi', dur: 4.2, transition: { type: 'blueBrush', dur: 0.40 },
    counter: col('金璧赎归', '当复弃儿子') },

  { id: 'cj6_qingzui', dur: 3.4, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('蓬首徒行', '叩头请罪') },

  { id: 'cj7_yiji', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('何惜疾足一骑', '乃追原祀罪') },

  { id: 'cj8_xianshu', dur: 3.6, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('四百余篇', '真草唯命') },
];
