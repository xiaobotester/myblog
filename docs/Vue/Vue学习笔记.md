## 安装nodejs
<https://nodejs.org/en> 
<https://www.nodejs.com.cn/>
,推荐下载安装LTS版本，另外，不建议安装最新的版本

环境变量配置(待确认是否有效)
```
setx NODE_HOME1 "D:\Software\nodejs"
setx PATH "%PATH%;%NODE_HOME%;%NODE_HOME%\node_global"
```
配置nodsjs全局安装目录和npm 的缓存目录
```
npm config set prefix "D:\Software\nodejs\node_global"
npm config set cache "D:\Software\nodejs\node_cache"
```

## npm常用命令

```
npm init -y   #初始化一个项目
npm install <module name>[@version]
npm install jquery  等价写法：npm install jquery@latest 
npm install bootstrap@5.3.3 安装指定版本
npm install package-name@^1.0.0 安装1.0.0以上版本
npm root -g #查看全局安装的包的路径
npm list -g 或者 npm ls -g  #查看全局安装的包
npm install <module name> [--save|-S] #安装模块，-S表示将模块添加到package.json的dependencies中
npm install <module name> [--save-dev|-D] #安装模块，-D表示将模块添加到package.json的devDependencies中 (常用语开发环境的依赖包安装)
npm install -g cnpm --registry=https://registry.npmjs.com 
npm list    #查看当前目录的依赖
npm view <package> #查看包的详细信息 
npm view <package> --json   #查看包的详细信息，以json格式输出
npm view <package> version #查看包的最新版本
npm view <package> versions #查看包的所有版本
npm uninstall <module name> #卸载模块
```


## 开发工具
**Visual Studio Code**   
工具下载地址:<https://code.visualstudio.com/>  
常用插件推荐：
Vue 3 Snippets  
TONGYI Lingma :<https://www.aliyun.com/page-source/developer/special/lingma/activities/202403?taskCode=14508&recordId=e18e8e44730b1f210455bca7736067ab#/?utm_content=m_fission_1 >
Open in browser  
Vetur  
Eslint  
Path Intellisense  和vue-beautify  


https://v2.cn.vuejs.org/v2/guide/


Vue常用指令
v-text、v-html、{{}}: 绑定文本内容
v-model: 表单控件或者组件上创建双向绑定的数据
v-model.lazy: 懒加载，只有失去焦点时才更新数据
v-model.number: 将输入值转为数字类型
v-model.trim: 去掉输入框首尾的空格
v-model.lazy.trim: 懒加载+去空格
v-model.number.lazy: 懒加载+数字类型
v-model.number.lazy.trim: 懒加载+数字类型+去空格

v-cloak: 配合css样式，应用加载之前隐藏模板中的内容，防止页面闪动
v-bind: 绑定属性
v-on: 绑定事件,比如click
v-if: 条件渲染，如果条件为真，则渲染元素，否则不渲染元素,与v-show不同，v-if是销毁元素
v-show: 条件渲染，如果条件为真，则显示元素，否则隐藏元素,与v-if不同，v-show只是隐藏元素，不销毁元素
v-for: 循环渲染，遍历数组或对象，渲染元素,使用时可以指定key


devtools插件：  
https://devtools.vuejs.org/guide/installation.html