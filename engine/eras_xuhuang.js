// 《徐晃》段落表：八幕生平，纯代码水墨。
// 依《三国志·徐晃传》：河东杨人，为郡吏从杨奉，说奉与天子还洛阳 → 归太祖，击破原武贼 →
// 从破颜良，拔白马，延津破文丑 → 官渡烧袁绍运车于故市 → 潼关假道蒲阪，渡津破马超 →
// 樊城「长驱径入」破关羽十重围堑 → 太祖曰「有周亚夫之风」→ 破上庸，进封阳平侯 →
// 镇襄阳，与周亚夫同例，太和元年薨，谥壮侯。
// 视觉主线：魏之名将 —— 玄甲＋白袍＋环首长刀（不是剑）、束发戴帻、令行禁止的整齐军列。
window.SCENE_LIBS = ['scenes/h_common.js', 'scenes/_motif.js', 'scenes/xuhuang.js'];
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
  { id: 'xh1_yangfeng', dur: 3.0,
    counter: col('说奉还洛', '一九二年') },

  { id: 'xh2_guicaocao', dur: 2.8, transition: { type: 'inkBloom', dur: 0.46 },
    counter: col('击破原武', '建安初年') },

  { id: 'xh3_baima', dur: 3.6, transition: { type: 'redWedge', dur: 0.34 },
    counter: col('拔白马', '二〇〇年') },

  { id: 'xh4_guandu', dur: 3.0, transition: { type: 'ripple', dur: 0.42 },
    counter: col('故市焚车', '二〇〇年') },

  { id: 'xh5_tongguan', dur: 2.8, transition: { type: 'lampGlow', dur: 0.4 },
    counter: col('夜渡蒲阪', '二一〇年') },

  { id: 'xh6_fancheng', dur: 3.0, transition: { type: 'goldLeaf', dur: 0.42 },
    counter: col('长驱径入', '二一九年') },

  { id: 'xh7_mopai', dur: 2.8, transition: { type: 'blueBrush', dur: 0.4 },
    counter: col('周亚夫之风', '二一九年') },

  { id: 'xh8_bingshi', dur: 3.8, transition: { type: 'iris', dur: 0.36, cx: 960, cy: 540 },
    counter: col('谥曰壮侯', '二二七年') },
];
