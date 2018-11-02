##v1.2.0
- 修改ab-manager-store初始化方法，注入全局store 
  由StoreManager.init()更改为StoreManager.init(store)
- 修改了ab-manager-router，全局注册了$activityManager属性，取消mixin方法
- 更改build-pages.js为同步执行，适配IDE的壳
##v1.2.1
- 更改agreeSDK和aui-m的目录结构
- 修改打包指令，每次打包前重新构建静态依赖
- 首页增加国际化示例
- 修复storeManager的clear方法
##v1.2.2
- 修改meta信息修复工程在移动端的展示比例问题
- 新增aui-m-config，处理aui组件库的引入配置
- 修改utils的引入方式，单个引入
- 抽离配置文件
##v1.2.3
- 增加.studio文件夹适配agree-studio编辑器
- [add] 增加单独的组件js
- [change] 修改组件引入方式，在src/aui-config/aui-m-config中根据组件名称动态引入所需组件和插件
- [fix] package.json新增auiDependencies目录，描述依赖信息
- [add] 新增ab-manager-validator和src/common/validate-component配套组件
- [perf] 去除重复css样式
##v1.2.4
- [add] 新增src/theme.less文件，使用样式变量修改默认的主题样式
- [stand] 建议交易内置 index.less 用于覆盖交易内的组件库组件样式（需手动引入）
- [change] 1.移除pages文件夹，交易内的动态组件配置置于交易内部page.js
           2.交易数据index.js更名为store.js
           3.删除src/aui-config/ab-manager-config 中 StoreManager 配置，当检测到交易内的store.js时自动注入配置
           4.删除src/aui-config/ab-manager-config 中 PageManager 配置，当检测到交易内的page.js自动注入配置
- [attention] template中的模板建议使用div包裹，否则在agree-studio中开发可能会出现兼容性问题。
- [fix] 修复aui-m-loader 若干bug。
- [add] aui-m-loader 添加错误提示。
##v1.2.5
- [perfect] 合并配置语言和访问地址的配置文件