// 《吕蒙》段落表：八幕生平，纯代码水墨。
// 依《三国志·吴书·吕蒙传》：汝南富陂人，少南渡依姊夫邓当 → 年十五六窃随当击贼，母怒将罚，
// 蒙曰「不探虎穴，安得虎子」→ 军吏轻之曰「此欲以肉喂虎耳」，蒙引刀杀吏出走 → 校尉袁雄为言于策，
// 策召见奇之 → 邓当死，张昭荐蒙代当，拜别部司马 → 权统事，蒙阴赊赀为兵作绛衣行縢，权见之大悦 →
// 从征黄祖，蒙勒前锋亲枭就首 → 权劝读书，蒙悟而折节 → 鲁肃拊蒙背曰「非复吴下阿蒙」，
// 蒙曰「士别三日，即更刮目相待」→ 建安二十四年称病笃，说权取荆州；伏精兵舳舻中，
// 使白衣摇橹作商贾人服，昼夜兼行，至羽所置江边屯候，尽收缚之，羽不闻知 → 士仁、糜芳皆降 →
// 麾下士取民家一笠覆官铠，蒙以为犯军令，垂涕斩之，于是军中震栗，道不拾遗 → 权嘉其功；
// 是岁病发，权迎置内殿，四十二岁卒。
// 视觉主线：双形态主角 —— 少年武夫（粗布短打、散发）→ 白衣儒将（素白长袍、束发无冠）。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/lvmeng.js'];
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
  { id: 'lm1_shaojun', dur: 3.0,
    counter: col('年十五六从军', '一九三年') },

  { id: 'lm2_tihu', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('不探虎穴', '一九三年') },

  { id: 'lm3_shaci', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('引刀杀吏', '一九三年') },

  { id: 'lm4_jiangyi', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('绛衣行縢', '二〇〇年') },

  { id: 'lm5_chenjiu', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('亲枭就首', '二〇八年') },

  { id: 'lm6_sanri', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('士别三日', '二一五年') },

  { id: 'lm7_baiyi', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('白衣渡江', '二一九年') },

  { id: 'lm8_zhenli', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('道不拾遗', '二一九年') },
];
