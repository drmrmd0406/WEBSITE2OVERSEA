# 项目
英国 B2C 独立站。目标市场英国消费者，产品待定（初期考虑小件家具）。

# 技术栈
Shopify（已选定，不再考虑 WooCommerce on VPS）。
主题开发用 Shopify CLI + Git，主题代码放在本仓库。

# 开发流程
- 主题基于 Shopify 官方 Horizon，文件直接放在仓库根目录。`upstream` 远程指向 https://github.com/Shopify/horizon ，用 `git merge upstream/main` 跟进官方更新。
- Partner 组织名 Lanting Studio，开发店名 Lanting，后台网址 `lanting-rbg8hwv0.myshopify.com`（名字只是占位）。
- 店铺通过 Shopify GitHub 集成连接本仓库分支，双向同步：后台主题编辑器的改动会被 Shopify 提交回分支。动代码前先 `git pull`，避免冲突。
- `config/settings_data.json` 和 `templates/*.json` 存的是后台编辑器里的取值，主要由后台改；代码改动尽量放在 `.liquid`、`assets/`、`locales/`、`config/settings_schema.json`。
- 推送前跑 `shopify theme check`。导入时的基线是 0 error、6 warning（来自 Horizon 原版），不能新增 error。

# 范围
本仓库和对应的对话只负责技术实现。以下事项由其他项目负责，这里不讨论，只预留接口：
- 法律文本（退货政策、隐私政策、服务条款、取消表格）
- 公司主体、VAT 注册、收款账号开通
- 选品、定价、物流

技术侧预留的接口（其他项目给出结果后，填进来即可，不改代码）：
- 法律页面：用 Shopify Policies + 占位页面，页脚固定链接
- 收款：在 Shopify 后台设置，主题代码不依赖具体用哪种收款方式
- VAT：税率由后台税务设置负责；主题只负责在价格旁显示 "incl. VAT"
- 退货：退货天数等做成主题设置项，不写死在代码里
- Cookie 同意：统计和营销脚本必须先经 Shopify Customer Privacy API 确认用户同意才加载

# 约束
- 面向英国消费者，必须符合 UK GDPR、Consumer Contracts Regulations 2013
- 所有价格含 20% VAT 显示
- 必须有 14 天无理由退货流程

# 我的水平
电子电气工程背景，会 C/C++/Python，
前端和电商是新手，解释时不要跳步骤。
