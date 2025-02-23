# React Demo ResponsiveCardSlider

使用 react 开发的简单示例：响应式卡片轮播。在线 [demo]()

## 产品需求

1. 标题区域 (H1 + 文本描述) 与按钮
2. 至少 3 张复杂卡片轮播
3. 响应式，适配不同大小屏幕

## 技术选型

使用 react + react-router + redux 及 scss 开发，轮播直接使用社区库 [swiperjs](https://github.com/nolimits4web/swiper), 主题排版参考 github 的 [primer](https://primer.style/) 风格，最后使用 webpack 进行打包并利用 github actions 发布上线。
