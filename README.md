# WEBSITE2OVERSEA

英国 B2C 独立站的 Shopify 主题代码。项目背景、范围和约束见 [CLAUDE.md](CLAUDE.md)。

主题基于 Shopify 官方免费主题 [Horizon](https://github.com/Shopify/horizon)（当前 4.3.0），
许可证见 [LICENSE.md](LICENSE.md)，Horizon 各版本改动见 [release-notes.md](release-notes.md)。

## 目录结构

Shopify 只认下面这几个文件夹，名字和位置都不能改：

| 文件夹 | 放什么 |
|---|---|
| `layout/` | 整个页面的外框（`<head>`、页头页脚的位置），每个页面都套用它 |
| `templates/` | 每种页面（首页、商品页、购物车……）由哪些区块组成 |
| `sections/` | 页面上的大区块，比如页头、商品详情、页脚 |
| `blocks/` | 区块里面可以拖动摆放的小部件，比如价格、按钮、文字 |
| `snippets/` | 被多处复用的代码片段，类似 C 里的函数 |
| `assets/` | CSS、JavaScript、图标 |
| `config/` | 主题设置项的定义（`settings_schema.json`）和当前取值（`settings_data.json`） |
| `locales/` | 界面文字的各语言翻译 |

仓库根目录的其他文件（本 README、CLAUDE.md 等）Shopify 不读取。

## 和 Shopify 店铺的连接方式

用 Shopify 的 GitHub 集成，双向同步：

- 往连接的分支推送代码，Shopify 会自动更新店里对应的主题。
- 在 Shopify 后台主题编辑器里改了设置，Shopify 会自动把改动提交回这个分支。

所以在本地改代码之前，先 `git pull`，拿到后台提交回来的改动。

## 检查代码

```sh
npm install -g @shopify/cli   # 只需安装一次
shopify theme check           # 检查 Liquid 代码的错误和不规范写法
```

导入时 Horizon 原版有 6 个 warning、0 个 error，都来自上游代码。改动后不应新增 error。

## 跟进 Horizon 官方更新

```sh
git remote add upstream https://github.com/Shopify/horizon.git   # 只需执行一次
git fetch upstream
git merge upstream/main
```
