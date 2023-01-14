## 一、webpack基本概念

&emsp;&emsp;webpack是一个打包模块化javascript的工具，它本身是node的一个第三方模块包，用于打包代码，[webpack官网](https://webpack.docschina.org/)，webpack把很多文件打包整合到一起，缩小项目体积，提高加载速度：

* 现代 javascript 应用程序的 **静态模块打包器 (module bundler)**

* 为要学的 `vue-cli` 开发环境做铺垫

![image-20230114124500354](http://jason-pics.oss-cn-hangzhou.aliyuncs.com/img/image-20230114124500354.png)

&emsp;	在webpack里**一切文件皆模块**，通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件，webpack专注**构建模块化**项目。有了webpack让模块化开发前端项目成为了可能，但底层需要nodejs支持，webpack功能如下：

* `less/sass` --> css

* `ES6/7/8` --> ES5

* `html/css/js` --> 压缩合并

<br />

### 1、Webpack的优点

* 专注于处理模块化的项目，能做到开箱即用，一步到位。
* 通过plugin扩展，完整好用又不失灵活。
* 通过loaders扩展，可以让webpack把所有类型的文件都解析打包。
* 区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展

<br />

### 2、webpack与grunt/gulp的不同

#### 2.1、三者之间的区别

​       三者都是前端构建工具，`grunt`和`gulp`在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用`gulp`来处理，比如单独打包CSS文件等。

​       grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。

​       webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后**用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能**。

<br />

#### 2.2、从构建思路来说

​       gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系 webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工

<br />

#### 2.3、对于知识背景来说

​       gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路

<br />

### 3、常见的webpack loader

* `file-loader`：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
* `url-loader`：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
* `source-map-loader`：加载额外的 Source Map 文件，以方便断点调试
* `image-loader`：加载并且压缩图片文件
* `babel-loader`：把 ES6 转换成 ES5
* `css-loader`：加载 CSS，支持模块化、压缩、文件导入等特性
* `style-loader`：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
* `slint-loader`：通过 ESLint 检查 JavaScript 代码

<br />

### 4、Loader和Plugin的区别

#### 4.1、不同的作用

&emsp;&emsp;Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

&emsp;&emsp;Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

<br />

#### 4.2、不同的用法

&emsp;&emsp;Loader在`module.rules`中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）

&emsp;&emsp;Plugin在`plugins`中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

<br />

<br />

## 二、webpack的使用步骤

### 1、webpack基础使用

&emsp;&emsp;把`src`下的2个js文件, 打包到1个js中, 并输出到默认`dist`目录下，注意，路径上文件夹、文件名不能命名为webpack或者其他已知的模块名：

* 默认入口: `./src/index.js`

* 默认出口: `./dist/main.js`

<br />

#### 1.1、初始化包环境

&emsp;&emsp;生成`package.json`：

```bash
$ yarn init
```

<br />

#### 1.2、安装webpack依赖包

```bash
$ yarn add webpack webpack-cli -D
```

<br />

#### 1.3、配置scripts自定义命令

```bash
"scripts": {
  "build": "webpack"
}
```

<br />

#### 1.4、新建目录src

&emsp;&emsp;新建`src/add/add.js`，定义求和函数导出

```js
export const addFn = (a, b) => a + b
```

&emsp;&emsp;新建`src/index.js`导入使用

```js
import {addFn} from './add/add'

console.log(addFn(10, 20));
```

<br />

#### 1.5、运行打包命令

```bash
$ yarn build
# 或者 
$ npm run build
```

&emsp;&emsp;src并列处, 生成默认`dist`目录和打包后默认`main.js`文件

<br />

### 2、webpack更新打包

&emsp;&emsp;以后代码变更, 如何重新打包呢。新建`src/tool/tool.js` - 定义导出数组求和方法

```js
export const getArrSum = arr => arr.reduce((sum, val) => sum += val, 0)
```

&emsp;&emsp;`src/index.js` - 导入使用

```js
import {addFn} from './add/add'
import {getArrSum} from './tool/tool'

console.log(addFn(10, 20));
console.log(getArrSum([1, 2, 3]));
```

&emsp;&emsp;重新打包

```bash
$ yarn build
```

&emsp;&emsp;src下开发环境，dist是打包后，分别独立。打包后**格式压缩，变量压缩**等

<br />

### 3、webpack的配置

#### 3.1、配置webpack入口和出口

&emsp;&emsp;告诉webpack从哪开始打包，打包后输出到哪里

* 默认入口：`./src/index.js`

* 默认出口：`./dist/main.js`

<br />

&emsp;&emsp;webpack默认配置文件：`webpack.config.js`，在src同级目录下新建`webpack.config.js`，该文件的模块化规范遵循nodejs的CommeJS规范，因为**webpack本质上是nodejs的一个第三方包，运行在nodejs环境下**。

&emsp;&emsp;填入配置项，加上`mode`配置，否则build的时候会有warning：[Mode | webpack](https://webpack.js.org/configuration/mode/)

```js
const path = require("path")

module.exports = {
    mode: 'development',
    entry: "./src/main.js", // 入口
    output: { 
        path: path.join(__dirname, "dist"), // 出口路径
        filename: "bundle.js" // 出口文件名
    }
}
```

&emsp;&emsp;修改`package.json`, 自定义打包命令 - 让webpack使用配置文件

```json
"scripts": {
    "build": "webpack"
},
```

&emsp;&emsp;打包观察效果

```bash
$ yarn build
```

<br />

#### 3.2、webpack打包流程图

&emsp;&emsp;所有要被打包的资源都要跟入口`src/index.js`文件产生**直接或间接**的引用关系，否则不会被打包进`dist/main.js`。webpack的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

* 初始化参数：从配置文件读取与合并参数，得出最终的参数
* 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，开始执行编译
* 确定入口：根据配置中的 `entry` 找出所有的入口文件
* 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
* 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
* 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
* 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

![image-20230114124544776](http://jason-pics.oss-cn-hangzhou.aliyuncs.com/img/image-20230114124544776.png)

&emsp;&emsp;在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

<br />

##### 3.2.1、jquery隔行变色体验webpack打包流程

&emsp;&emsp;工程化、模块化开发前端项目，webpack会对ES6模块化处理, 被webpack打包后引入到html中，使用回顾从0准备环境：

* 初始化包环境

* 下载依赖包
* 配置自定义打包命令

* 下载jquery, 新建`public/index.html`

  ```bash
  $ yarn add jquery
  ```

![image-20230114124652426](http://jason-pics.oss-cn-hangzhou.aliyuncs.com/img/image-20230114124652426.png)

* index.html 准备一些`li`，因为import语法浏览器支持性不好，需要被webpack转换后，再使用JS代码：

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
  
  <div id="app">
    <!-- ul>li{我是第$个li}*10 -->
    <ul>
      <li>我是第1个li</li>
      <li>我是第2个li</li>
      <li>我是第3个li</li>
      <li>我是第4个li</li>
      <li>我是第5个li</li>
      <li>我是第6个li</li>
      <li>我是第7个li</li>
      <li>我是第8个li</li>
      <li>我是第9个li</li>
    </ul>
  </div>
  
  </body>
  </html>
  ```

* 在`src/index.js`引入jquery，编写隔行变色代码：

  ```js
  // 引入jquery
  import $ from 'jquery'
  $(function() {
    $('#app li:nth-child(odd)').css('color', 'red')
    $('#app li:nth-child(even)').css('color', 'green')
  })
  ```

* 执行打包命令观察效果：

  ```bash
  $ yarn build
  ```

* 可以在dist下把`public/index.html`复制过来：

![image-20230114124727000](http://jason-pics.oss-cn-hangzhou.aliyuncs.com/img/image-20230114124727000.png)

* 最后在`public/index.html`中手动引入打包后的js文件：

  ```html
  <script src="../dist/bundle.js"></script>
  ```

<br />

#### 3.3、webpack插件

##### 3.3.1、自动生成html文件

&emsp;&emsp;`html-webpack-plugin`插件，让webpack打包后生成html文件并自动引入打包后的js，[html-webpack-plugin插件地址](https://www.webpackjs.com/plugins/html-webpack-plugin/)，下载插件：

```bash
$ yarn add html-webpack-plugin  -D
```

&emsp;&emsp;webpack.config.js配置

```js
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // ...省略其他代码
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html' // 以此为基准生成打包后html文件
        })
    ]
}
```

&emsp;&emsp;重新打包后观察dist下多出了`index.html`文件，并且打包后的`index.html`自动引入打包后的js文件：

```bash
$ yarn build
```

<br />

#### 3.4、webpack加载器

##### 3.4.1、打包css文件

###### 3.4.1.1、处理css文件问题

&emsp;&emsp;自己准备css文件，引入到webpack入口，测试webpack是否能打包css文件，新建`src/css/index.css`，编写去除`li`圆点样式代码：

```css
ul, li {
    list-style: none;
}
```

&emsp;&emsp;(重要) 一定要引入到`src/index.js`入口文件才会被webpack打包：

```js
import './css/index.css'
```

&emsp;&emsp;执行打包命令`yarn build`，报如下错误，**因为webpack默认只能处理js类型文件**：

```js
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```

<br />

###### 3.4.1.2、打包css文件

&emsp;&emsp;loaders加载器, 可让webpack处理其他类型的文件, 打包到js中，原因: webpack默认只认识 js 文件和 json文件，webpack处理样式的2个loader分别如下：

* [style-loader文档](https://webpack.docschina.org/loaders/style-loader/)

* [css-loader文档](https://webpack.docschina.org/loaders/css-loader/)

<br />

&emsp;&emsp;安装loader：

```bash
$ yarn add style-loader css-loader -D
```

&emsp;&emsp;webpack.config.js 配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // ...其他代码
    module: { 
        rules: [ // loader的规则
          {
            test: /\.css$/, // 匹配所有的css文件
            // use数组里从右向左运行
            // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
            // 再用 style-loader 将样式, 把css插入到dom中
            use: [ "style-loader", "css-loader"]
          }
        ]
    }
}
```

&emsp;&emsp;新建`src/css/index.css`，去掉`li`默认样式

```css
ul, li{
    list-style: none;
}
```

&emsp;&emsp;万物皆模块，引入到入口文件`src/index.js`，跟入口文件产生关联关系后才会被webpack找到并打包。css打包进js中, 然后被嵌入在html的style属性，最后插入到DOM上：

```js
import "./css/index.css"
```

&emsp;&emsp;运行打包命令后，`dist/index.html`观察效果和css引入情况

![image-20230114142725574](http://jason-pics.oss-cn-hangzhou.aliyuncs.com/img/image-20230114142725574.png)

<br />

##### 3.4.2、打包less文件

&emsp;&emsp;`less-loader`让webpack处理less文件，less模块翻译less代码，[less-loader文档](https://webpack.docschina.org/loaders/less-loader/)，下载依赖包：

```bash
$ yarn add less less-loader -D
```

&emsp;&emsp;`webpack.config.js` 配置：

```js
module: {
  rules: [ // loader的规则
    // ...省略其他
    {
    	test: /\.less$/,
    	// 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
         use: [ "style-loader", "css-loader", 'less-loader']
     }
  ]
}
```

&emsp;&emsp;`src/less/index.less`，设置`li`字体大小24px：

```less
@size:24px;

ul, li{
    font-size: @size
}
```

&emsp;&emsp;引入到`src/index.js`中：

```js
import "./less/index.less"
```

&emsp;&emsp;打包运行`dist/index.html` 观察效果：

```bash
$ yarn build
```

&emsp;&emsp;**只要找到对应的loader加载器吗，就能让webpack处理不同类型文件**。

<br />

##### 3.4.3、打包图片文件

###### 3.4.3.1、webpack5

&emsp;&emsp;用asset module方式（webpack5版本新增），[asset module文档](https://webpack.docschina.org/guides/asset-modules/)，如果使用的是webpack5版本的，直接配置在`webpack.config.js` 的 rules 里即可：

```js
{
    test: /\.(png|jpg|gif|jpeg)$/i,
    type: 'asset'
}
```

<br />

###### 3.4.3.2、webpack4

&emsp;&emsp;如果用的是webpack4及以前版本, 请使用这里的配置，[url-loader文档](https://webpack.docschina.org/loaders/url-loader/) 和 [file-loader文档](https://webpack.docschina.org/loaders/file-loader/)，下载依赖包

```bash
$ yarn add url-loader file-loader -D
```

&emsp;&emsp;`webpack.config.js` 配置

```js
{
  test: /\.(png|jpg|gif|jpeg)$/i,
  use: [
    {
      // 匹配文件, 尝试转base64字符串打包到js中
      loader: 'url-loader',
      // 配置limit，超过8k，不转，由file-loader把图片直接复制输出到dist目录中，文件名随机
      options: {
        limit: 8 * 1024,
      },
    },
  ],
}
```

&emsp;&emsp;图片转base64字符串，在线图片成base64网址：[imgtobase](http://tool.chinaz.com/tools/imgtobase/)，好处就是浏览器不用发请求了，直接可以读取，坏处就是如果图片太大，再转`base64`就会让图片的体积增大 30% 左右。

&emsp;&emsp;新增图片文件`src/assets/logo_small.png`，在`css/less/index.less`，把小图片用做背景图：

```less
body{
    background: url(../assets/logo_small.png) no-repeat center;
}
```

&emsp;&emsp;在`src/index.js`，把大图`src/assets/1.gif`插入到创建的`img`标签上, 添加到body上显示：

```js
// 引入图片-使用
import imgUrl from './assets/1.gif'
const theImg = document.createElement("img")
theImg.src = imgUrl
document.body.appendChild(theImg)
```

&emsp;&emsp;打包运行`dist/index.html`观察2个图片区别，`url-loader` 把文件转 base64 打包进js中，体积会有30%的增大，`file-loader` 把文件直接复制输出到`dist`目录中，文件名随机。

<br />

##### 3.4.4、打包icon等字体文件

###### 3.4.4.1、webpack5

&emsp;&emsp;用`asset module`技术的`asset/resource`直接输出到dist目录下，webpack5使用如下配置：

```js
{ // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    type: 'asset/resource',
    generator: {
    	filename: 'font/[name].[hash:6][ext]'
    }
}
```

<br />

###### 3.4.4.2、webpack4

&emsp;&emsp;webpack4及以前版本使用下面的配置，`webpack.config.js`：

```js
{ // 处理字体图标的解析
     test: /\.(eot|svg|ttf|woff|woff2)$/,
         use: [
             {
                 loader: 'url-loader',
                 options: {
                     limit: 2 * 1024,
                     // 配置输出的文件名
                     name: '[name].[ext]',
                     // 配置输出的文件目录
                     outputPath: "fonts/"
                 }
             }
         ]
}
```

&emsp;&emsp;`src/assets/fonts`，放入字体库fonts文件夹，在`src/index.js`中引入`iconfont.css`：

```js
// 引入字体图标文件
import './assets/fonts/iconfont.css'
```

&emsp;&emsp;在`public/index.html`使用字体图标样式：

```html
<i class="iconfont icon-weixin"></i>
```

&emsp;&emsp;执行打包命令，观察打包后网页效果，`url-loader`和`file-loader` 可以打包静态资源文件：

```bash
$ yarn build
```

<br />

##### 3.4.5、babel转换高版本js语法

&emsp;&emsp;让webpack对高版本的js代码做降级处理后再打包，高版本的js代码（比如箭头函数等）打包后，直接原封不动打入了js文件中，遇到一些低版本的浏览器就会报错。原因是**webpack默认仅内置了模块化的兼容性处理**（`import  export`）。

&emsp;&emsp;babel 的作用就是用于处理高版本 js语法 的兼容性：[babel官网](https://www.babeljs.cn/)，让webpack配合`babel-loader` 对js语法做处理，[babel-loader文档](https://webpack.docschina.org/loaders/babel-loader/)

&emsp;&emsp;安装babel等相关依赖：

```bash
$ yarn add -D babel-loader @babel/core @babel/preset-env
```

&emsp;&emsp;配置规则，`webpack.config.js`

```js
module: {
  rules: [
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'] // 预设:转码规则(用bable开发环境本来预设的)
            }
        }
    }
  ]
}
```

&emsp;&emsp;在`src/index.js`中使用箭头函数（高版本js），没有babel集成时，原样直接打包进`lib/bundle.js`，有babel集成时，会翻译成普通函数打包进`lib/bundle.js`

```js
// 高级语法
const fn = () => {
  console.log("你好babel");
}

// 这里必须打印不能调用/不使用, 不然webpack会精简成一句打印不要函数了/不会编译未使用的代码
console.log(fn) 
```

&emsp;&emsp;打包后观察`lib/bundle.js`，被转成成普通函数使用了，这就是babel降级翻译的功能。`babel-loader` 可以让webpack 对高版本js语法做降级处理后打包。

<br />

<br />

## 三、webpack开发服务器

### 1、webpack开发服务器

&emsp;&emsp;每次修改代码, 都需要重新 `yarn build` 打包, 才能看到最新的效果，实际工作中, 打包 `yarn build`非常费时 (30s - 60s) 之间，为什么费时? 

* 构建依赖

* 磁盘读取对应的文件到内存, 才能加载  

* 用对应的 loader 进行处理  

* 将处理完的内容, 输出到磁盘指定目录  

<br />

&emsp;&emsp;解决问题: 起一个开发服务器,  在电脑内存中打包，缓存一些已经打包过的内容，只重新打包修改的文件，最终运行加载在内存中给浏览器使用。该开发服务器就叫做：[webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/)

<br />

### 2、webpack-dev-server自动刷新

&emsp;&emsp;启动本地服务，可实时更新修改的代码，打包**变化代码**到内存中，然后直接提供端口和网页访问，下载安装`webpack-dev-server`：

```bash
$ yarn add webpack-dev-server -D
```

&emsp;&emsp;配置自定义命令，`package.json`：

```js
scripts: {
	"build": "webpack",
	"serve": "webpack serve"
}
```

&emsp;&emsp;运行命令，启动webpack开发服务器：

```bash
$ yarn serve
# 或者 
$ npm run serve
```

&emsp;&emsp;以后改了src下的资源代码，就会直接更新到内存打包，然后反馈到浏览器上了。

<br >

### 3、webpack-dev-server配置

&emsp;&emsp;在`webpack.config.js`中添加服务器配置，更多配置参考这里: https://webpack.docschina.org/configuration/dev-server/#devserverafter

```js
module.exports = {
    // ...其他配置
    devServer: {
      port: 3000 // 端口号
    }
}
```

<br />

### 4、Webpack的热更新原理

&emsp;&emsp;webpack 的**热更新**又称**热替换**（`Hot Module Replacement`），缩写为 `HMR`。这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

&emsp;&emsp;HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff （chunk 需要更新的部分），实际上 `WDS`（webpack-dev-server）与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

&emsp;&emsp;后续的部分（拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？）由 `HotModulePlugin` 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像`react-hot-loader` 和 `vue-loader` 都是借助这些 API 实现 HMR。

<br />

<br />

## 四、作业

1、在打包时，如何把css提取成一个独立的文件？

&emsp;&emsp;效果: 打包后的dist文件夹下多一个独立的css文件里有css代码，提示: 需要一个加载器。

<br />

2、如何把vue文件让webpack打包使用 （vue-loader官网）

&emsp;&emsp;想要把`App.vue`的东西显示到`index.html`

* 在`public/index.html` 准备`id`叫`app`的`div`

* `yarn add vue`，必须下载vue、其他加载器和插件，具体参考`vue-loader`官网

* 需要在`index.js`中引入`App.vue`模块对象并加入如下代码

  ```jsx
  import App from './App.vue' // 根vue文件
  import Vue from 'vue' // 引入vue.js对象
  
  new Vue({ 
    render: h => h(App) // 渲染函数, 渲染App组件里的标签
  }).$mount('#app') // 把vue文件的标签结构 -> 挂载到id为app的标签里
  ```

* 打包后运行`dist/index.html`, 观察是否把vue文件里的标签渲染到页面了

