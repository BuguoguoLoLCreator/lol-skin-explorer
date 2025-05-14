# 关于
本项目遵循GPLv3开源协议，对[Skin Explorer](https://github.com/preyneyv/lol-skin-explorer)进行二次开发，在此特别感谢原作者[@preyneyv](https://github.com/preyneyv)

---

# 更新日志

<header>

## [v2.0.3](https://github.com/BuguoguoLoLCreator/lol-skin-explorer)

###### 2025/05/15

</header>

### 系统
- 新增[臻彩原画](https://splash.buguoguo.cn/prestigechromas)相关数据更新功能

### 新功能
- 支持查看[腾讯英雄联盟专属炫彩原画(臻彩)](https://splash.buguoguo.cn/prestigechromas)
- [臻彩原画](https://splash.buguoguo.cn/prestigechromas)支持按英雄或臻彩数量排序
- [臻彩原画](https://splash.buguoguo.cn/prestigechromas)支持聚焦原画和原画下载功能

### 已知问题
- 部分浏览器在填充模式下拖拽原画可能出现严重卡顿和画面闪烁
- Chromium类浏览器启用Disable Cache会出现画面闪烁等其他问题
- 部分移动端浏览器双击原画无法切换到填充模式
- 部分移动端国产浏览器(夸克)无法下载原画，可能是阉割了blob数据解析，建议更换为[Via](https://viayoo.com/zh-cn/)浏览器

---

<header>

## [v2.0.2](https://github.com/BuguoguoLoLCreator/lol-skin-explorer)

###### 2025/05/12

</header>

### 系统
- 优化皮肤数据更新逻辑，提高更新部署效率

### 体验
- 微调界面样式
- 使用HarmonyOS Sans作为全局字体，优化文本清晰度

### 已知问题
- 部分移动端国产浏览器(夸克)无法下载原画，可能是阉割了blob数据解析，建议更换为[Via](https://viayoo.com/zh-cn/)浏览器

---

<header>

## [v2.0.1](https://github.com/BuguoguoLoLCreator/lol-skin-explorer)

###### 2025/05/06

</header>

### 系统
- 更新Next.js版本到v15.3.1
- 更新React版本到v19.1.0
- 适配Next.js新版语法
- 移除Next-PWA
- 移除SkinChanges读取，更换自有方式维护相关数据

### 体验
- 优化移动端手势操作
- 优化图片加载动画
- 更换卡达模型站地址为[《布锅锅联盟宇宙x卡达模型站》](https://3d.buguoguo.cn)
- 更换皮肤演示视频为哔哩哔哩[白礼白里白](https://space.bilibili.com/9385598)
- 完善使用条款、隐私协议等链接

### 问题修复
- 修复适配腾讯定制皮肤品质导致按皮肤品质排序失效的问题

---

<header>

## [v1.1.4](https://github.com/BuguoguoLoLCreator/lol-skin-explorer/tree/NextJSv12)

###### 2024/11/27

</header>

- 适配腾讯定制皮肤品质，新增圣堂级皮肤。

---

<header>

## [v1.1.3](https://github.com/BuguoguoLoLCreator/lol-skin-explorer/tree/NextJSv12)

###### 2024/11/24

</header>

- 修复部分版本ASU更新原画地址错误(比如提莫)。
- 修正部分界面翻译。
- 增加了终极皮肤动态/静态原画的切换功能，快捷键V。
- 增加了快速前往[《布锅锅联盟宇宙语音站》](https://voice.buguoguo.cn)收听英雄语音的功能

---

<header>

## [v1.1.2](https://github.com/BuguoguoLoLCreator/lol-skin-explorer/tree/NextJSv12)

###### 2024/11/18

</header>

- 修复历史版本皮肤地址。
- 完整中文本地化界面。
- 更换社区龙镜像源加速图片访问。