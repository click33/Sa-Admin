<p align="center">
    <img alt="logo" src="https://oss.dev33.cn/sa-admin/admin-logo.png" width="150" height="150" style="margin-bottom: 10px;">
</p>
<h2 align="center" style="margin: 30px 0 30px;font-weight: bold;font-size:40px;">Sa-Admin v1.40.0</h2>
<h4 align="center">一个多窗口后台模板，流畅、易上手、提高生产力</h4>
<p align="center">
	<a href="https://gitee.com/click33/sa-admin/stargazers"><img src="https://gitee.com/click33/sa-admin/badge/star.svg"></a>
	<a href="https://gitee.com/click33/sa-admin/members"><img src="https://gitee.com/click33/sa-admin/badge/fork.svg"></a>
	<a href="https://github.com/click33/sa-admin/stargazers"><img src="https://img.shields.io/github/stars/click33/sa-admin?style=flat-square&logo=GitHub"></a>
	<a href="https://github.com/click33/sa-admin/network/members"><img src="https://img.shields.io/github/forks/click33/sa-admin?style=flat-square&logo=GitHub"></a>
	<a href="https://github.com/click33/sa-admin/watchers"><img src="https://img.shields.io/github/watchers/click33/sa-admin?style=flat-square&logo=GitHub"></a>
	<a href="https://github.com/click33/sa-admin/issues"><img src="https://img.shields.io/github/issues/click33/sa-admin.svg?style=flat-square&logo=GitHub"></a>
	<a href="https://github.com/click33/sa-admin/blob/master/LICENSE"><img src="https://img.shields.io/github/license/click33/sa-admin.svg?style=flat-square"></a>			
</p>


## ⚡ 介绍
Sa-Admin 是一个多窗口后台模板，纯 html 无后端代码，无需脚手架即可直接运行，流畅、易上手、提高生产力。核心技术栈：Vue + Element-UI + jquery + layer。

废话不多说，具体效果可参见在线预览：[http://sa-admin.dev33.cn/](http://sa-admin.dev33.cn/)

## ⭐ 特点 
Sa-Admin 最大的特点是无需搭建 vue-cli 脚手架，随便一个 html 预览工具（比如 [HBuilderX](https://www.dcloud.io/hbuilderx.html)）即可直接运行（采用 http-vue-loader 技术实现）。

目前最新版包括以下功能：

- 视图：支持 iframe 和 .vue 两种视图方式，支持一、二、三、四级菜单。
- 操作：工具栏提供常见操作按钮：折叠、搜索、刷新、账号、便签、主题切换、全屏切换。
- 主题：内置十种主题，也可方便的扩展主题。
- 切换：支持拖拽排序、切换视图自动记录hash，刷新页面自动打开上次的视图。
- 右键：tabbar栏支持右键菜单：悬浮打开、新窗口打开、视图复制、快捷关闭等操作。
- 接口：开放一系列api，可方便的用js新建、打开、切换视图等动作。
- 示例：提供大量常见示例，以及各种表单组件的封装，助你快速CRUD。

## 🖥 截图  

<table>
    <tr>
        <td><img src="https://oss.dev33.cn/sa-admin/pre/sa-admin-pre-1.png"/></td>
        <td><img src="https://oss.dev33.cn/sa-admin/pre/sa-admin-pre-2.png"/></td>
    </tr>
    <tr>
        <td><img src="https://oss.dev33.cn/sa-admin/pre/sa-admin-pre-3.png"/></td>
        <td><img src="https://oss.dev33.cn/sa-admin/pre/sa-admin-pre-4.png"/></td>
    </tr>
</table>


## 🔍 开始使用

### 1、下载项目
直接在 Gitee 或 GitHub 下载代码

### 2、初始化模板
在使用时不建议你直接魔改模板的代码，以免在运行时出现意外bug。在文件夹 `\sa-frame` 下有个 `sa-code.js` 文件，
这是为了方便你对接后端专门预留的文件，你可以在此文件中调用 Sa-Admin 提供的 API 来操作模板。

``` js
// 设置基本信息 
sa_admin.title="xxx";         // 设置模板标题 
sa_admin.logo='xxx.png';      // 设置 logo 图标地址  
sa_admin.icon = 'xxx.ico';    // 设置 icon 图标地址  

// 初始化菜单
var myMenuList = window.menuList;    // window.menuList 在 menu-list.js 中定义（内有格式详细说明）
sa_admin.setMenuList(myMenuList);    // 方式一：写入菜单，这些菜单会全部显示 
sa_admin.setMenuList(myMenuList, ['1', '1-1', '1-2']);    // 方式二：写入菜单，并在第二个参数决定哪些菜单会显示出来
sa_admin.initMenu(['1', '1-1', '1-2']);    // 方式三：相当于方式二省略了第一个参数（框架会自动寻找 window.menuList）
/*
 * MenuList 菜单的格式在 menu-list.js 文件中有详细的示例和格式说明 
 * 一般情况下我们的菜单最终都是一个 Tree 形格式，但我们从数据库查询出来时都是平面一维数组，
 * 这时候你不需要手动做格式转换，调用 sa_admin.setMenuList 模板会自动为你进行格式转换，
 * （前提是你的数组里每个 menu 对象指定了 parentId 属性）
 */

// 设置右上角的 user 信息
sa_admin.user = { 
    username: 'root', 	// 昵称    
    avatar: 'sa-frame/admin-logo.png' // 头像地址 
}

// 设置头像点击处可操作的选项    
sa_admin.dropList = [    
    {    
        name: '我的资料',    
        click: function() { /* balabala... */ }    
    },    
    {    
        name: '退出登录',    
        click: function() { /* balabala... */ }    
    }    
]    

// 初始化模板（必须调用）
sa_admin.init();
```

### 3、js操作模板
你可以使用以下 API 来操作模板 
``` js
sa_admin.showHome();            // 显示主页选项卡 
sa_admin.showTabById('1-1');    // 显示一个选项卡, 根据id
sa_admin.closeTabById('1-1');    // 关闭一个选项卡，根据 id （ 第二个参数可填关闭后的回调函数 ）
sa_admin.showMenuById('1-1');    // 打开一个 菜单，根据 id

// 新增一个选项卡
sa_admin.addTab({name: '新页面', url: 'http://sa-token.dev33.cn/'});    // id不要和已有的菜单id冲突，其它属性均可参照菜单项 

// 新增一个选项卡、并立即显示  
sa_admin.showTab({name: '新页面', url: 'http://sa-plus.dev33.cn/'});    // 参数同上 
```

### 4、多视图通信
怎么在一个选项卡页面调用另一个页面的代码
``` js
// 根据id获取其页面的window对象   （如果此页面未打开，则返回空）（跨域模式下无法获取其window对象）
var win = sa_admin.getTabWindow('2-1');      
if(win) {
	win.app.f5();     // 然后调用这个对象上的方法 
}

// 根据iframe的子父通信原则，在子页面中调用父页面的方法，需要加上parent前缀，例如：
parent.sa_admin.msg('啦啦啦');        // 调用父页面的弹窗方法 
```

### 5、鉴权相关
``` js
// 首先在登录时，写入当前会话所具有的权限码集合
var arr = ['1', '2', '3', 'a', 'b', 'c'];        // 一般由后端提供接口返回当前会话所具有的权限码集合 
sa.setAuth(arr);            // 写入本地缓存中 

// 然后：我们就可以愉快的使用鉴权了
// 如果一个页面需要某个权限码才能打开，在这个页面的 <script> 代码块第一句写上：
sa.checkAuth('a');      // 必须具有权限码 `a` 才能打开这个页面，否则会被强制跳转到 403-无权限 页面 

// 某段代码需要某个权限码才能继续往下执行，在需要鉴权的地方加上这段代码 
sa.checkAuthTs('a');    // 含义同上，只不过如果鉴权失败，不是强制跳转，而是弹窗显示 403-无权限 页面 

// 如果需要精细的根据权限来控制页面上某个按钮是否显示
<!-- 可以利用vue的v-if指令来渲染 -->
<button v-if="sa.isAuth('a')">删除这条记录(只有具有权限码a，才能看到这个按钮)</button>

// 注销登录时，可以清除掉所有权限
sa.clearAuth();        // 清除当前会话所有权限码 

/*
 * `sa.checkAuth` 与 `sa.checkAuthTs` 方法为了调用方便，默认在无权限时打开的页面地址为：`../../sa-view/error-page/403.html`
 * 此url只有在当前页面为二级子目录时才能打开成功，其它级别目录则会无法打开显示404，这时候你需要指定403无权限页面地址 
 * 例如在首页index.html调用时，原调用方式：`sa.checkAuth('a')` ，改为：`sa.checkAuth('a', 'sa-view/error-page/403.html')`
 */
```

注：最后请知晓一点：**最终的鉴权操作一定要在后端完成，前端只能是起到一个辅助作用**

## 📐️️️️ 使用封装组件 
你可以使用 Element-UI 原生写法构建表单，也可以使用 Sa-Admin 封装的组件，例如：
``` html
<!-- 原生写法： -->
<div class="c-item">
	<label class="c-label">商品名称：</label>
	<el-input size="mini" v-model="m.name"></el-input>
</div>

<!-- Sa-Admin 封装写法 （type="text"时可省略不写） -->
<sa-item type="text" name="商品名称" v-model="m.name"></sa-item>
```
两者完全等价 


#### 1、首先引入这些组件 
``` js
var app = new Vue({
	components: {
		"sa-item": httpVueLoader('../../sa-frame/com/sa-item.vue'),		
		"sa-info": httpVueLoader('../../sa-frame/com/sa-info.vue'),		
		"sa-td": httpVueLoader('../../sa-frame/com/sa-td.vue'),			
	},
	// ... 其它代码 
});
```

#### 2、使用 sa-item 组件 
sa-item 封装了各种输入框 
``` html
<!-- 普通输入框 -->
<sa-item type="text" name="商品名称" v-model="m.name"></sa-item>
<!-- 数字输入框 -->
<sa-item type="num" name="商品数量" v-model="m.count"></sa-item>
<!-- 其它 -->
<sa-item type="textarea" name="多行输入" v-model="m.name"></sa-item>
<sa-item type="date" name="日期选择" v-model="m.create_time" br></sa-item>
<sa-item type="datetime" name="日期时间选择" v-model="m.create_time" br></sa-item>
<sa-item type="slider" name="滑块参数" v-model="m.hValue" br></sa-item>
<sa-item type="money" name="钱(单位 元)" v-model="m.value" br></sa-item>
<sa-item type="money-f" name="钱(单位 分)" v-model="m.value" br></sa-item>
<sa-item type="img" name="图片上传" v-model="m.value" br></sa-item>
<sa-item type="audio" name="音频上传" v-model="m.value" br></sa-item>
<sa-item type="video" name="视频上传" v-model="m.value" br></sa-item>
<sa-item type="file" name="文件上传" v-model="m.value" br></sa-item>
<sa-item type="img-list" name="多图上传" v-model="m.value" br></sa-item>
<sa-item type="audio-list" name="多音频上传" v-model="m.value" br></sa-item>
<sa-item type="video-list" name="多视频上传" v-model="m.value" br></sa-item>
<sa-item type="file-list" name="多文件上传" v-model="m.value" br></sa-item>
<sa-item type="img-video-list" name="图片视屏结合" v-model="m.value" br></sa-item>
<sa-item type="richtext" name="富文本编辑器" v-model="m.value" br></sa-item>
<!-- 枚举类型，jtype为枚举表单类型（1=单选框，2=单选文字，3=单选按钮，4=单选下拉框）  -->
<sa-item type="enum" name="枚举参数" v-model="m.value" :jv="{1: '正常', 2: '禁用'}" jtype="1" br></sa-item>
<sa-item type="color" name="颜色选择" v-model="m.value" br></sa-item>
<sa-item type="rate" name="评分组件" v-model="m.value" br></sa-item>

<!-- ------- 复杂组件 ----- -->
<!-- 表格上面的快捷‘增、删、改、查’按钮（可自定义slot） -->
<sa-item type="fast-btn" show="add,get,delete,export,reset"></sa-item>
<!-- 表格下面的分页组件 -->
<sa-item type="page" :curr.sync="p.pageNo" :size.sync="p.pageSize" :total="dataCount" @change="f5()"></sa-item>

<!-- 完全自定义 slot 内容 -->
<sa-item name="自定义slot" br>xxx</sa-item>
```


#### 3、使用 sa-info 组件 
sa-info 封装了各种展示框
``` html
<!-- 普通展示 -->
<sa-info name="商品名称">{{m.name}}</sa-info>
<!-- 数字展示 -->
<sa-info name="商品名称" :value="m.count" type="num"></sa-info>
<!-- 其它 -->
<sa-info name="多行文本" :value="m.value" type="textarea" br></sa-info>
<sa-info name="图片展示" :value="m.url" type="img" br></sa-info>
<sa-info name="音频展示" :value="m.url" type="audio" br></sa-info>
<sa-info name="视频展示" :value="m.url" type="video" br></sa-info>
<sa-info name="文件展示" :value="m.url" type="file" br></sa-info>
<!-- img-list -  value形如：url1,url2,url3 -->
<sa-info name="多图展示" :value="m.url" type="img-list" br></sa-info>
<sa-info name="多音频展示" :value="m.url" type="audio-list" br></sa-info>
<sa-info name="多视频展示" :value="m.url" type="video-list" br></sa-info>
<sa-info name="多文件展示" :value="m.url" type="file-list" br></sa-info>
<sa-info name="图片视频结合" :value="m.url" type="img-video-list" br></sa-info>
<sa-info name="钱(单位元)" :value="m.value" type="money" br></sa-info>
<sa-info name="钱(单位分)" :value="m.value" type="money-f" br></sa-info>
<!-- 枚举 jv={key值: 'value展示文字[颜色]'} -->
<sa-info name="显示枚举" :value="m.value" type="enum" :jv="{1: '正常[green]', 2: '禁用[red]'}" br></sa-info>
<sa-info name="展示链接" :value="m.value" type="link" br></sa-info>
<sa-info name="展示日期" :value="m.value" type="date" br></sa-info>
<sa-info name="展示日期时间" :value="m.value" type="datetime" br></sa-info>
<sa-info name="展示日期时间2">{{sa.forDate(m.create_time, 2)}}</sa-info>
<sa-info name="展示评分组件" :value="m.value" type="rate" br></sa-info>
```

#### 4、使用 sa-td 组件 
sa-td 封装了各种表格单元格 
``` html
<!-- ------------- 数据列表 ------------- -->
<el-table :data="dataList" size="small">
	<!-- 复选框 -->
	<sa-td type="selection"></sa-td>
	<!-- 普通文字单元格 -->
	<sa-td name="商品名称" prop="name"></sa-td>
	<!-- 其它单元格 -->
	<sa-td name="展示数字" prop="value" type="num"></sa-td>
	<sa-td name="展示多行文本域" prop="value" type="textarea"></sa-td>
	<sa-td name="展示富文本" prop="value" type="richtext"></sa-td>
	<sa-td name="展示钱(单位元)" prop="value" type="money"></sa-td>
	<sa-td name="展示钱(单位分)" prop="value" type="money-f"></sa-td>
	<!-- 枚举类型，jtype为枚举表单类型（1=单选框，2=单选文字，3=单选按钮，4=单选下拉框）  -->
	<sa-td name="展示枚举" prop="value" type="enum" :jv="{1: '正常[green]', 2: '禁用[red]'}" jtype="1"></sa-td>
	<sa-td name="展示开关" prop="value" type="switch" :jv="{1: '正常', 2: '禁用'}"></sa-td>
	<sa-td name="展示icon" prop="value" type="icon"></sa-td>
	<sa-td name="展示图片" prop="value" type="img"></sa-td>
	<sa-td name="展示音频" prop="value" type="audio"></sa-td>
	<sa-td name="展示视频" prop="value" type="video"></sa-td>
	<sa-td name="展示文件" prop="value" type="file"></sa-td>
	<!-- img-list -  value形如：url1,url2,url3 -->
	<sa-td name="展示多图" prop="value" type="img-list"></sa-td>
	<sa-td name="展示多音频" prop="value" type="audio-list"></sa-td>
	<sa-td name="展示多视频" prop="value" type="video-list"></sa-td>
	<sa-td name="展示多文件" prop="value" type="file-list"></sa-td>
	<sa-td name="展示图片视频结合" prop="value" type="img-video-list"></sa-td>
	<sa-td name="展示链接" prop="value" type="link"></sa-td>
	<sa-td name="展示链接按钮" prop="value" type="link-btn" @click="s => sa.msg('点击事件')"></sa-td>
	<sa-td name="展示日期" prop="value" type="date"></sa-td>
	<sa-td name="展示日期时间" prop="value" type="datetime"></sa-td>
	<sa-td name="展示评分" prop="value" type="rate"></sa-td>
	<el-table-column label="操作" width="240px">
		<template slot-scope="s"> 自定义slot </template>
	</el-table-column>
</el-table>
```




## 🔨 贡献代码
1. 在gitee上fork一份到自己的仓库
2. clone自己的仓库到本地电脑
3. 在本地电脑修改、commit、push
4. 提交pr
5. 等待合并


## 🌱 建议贡献的地方
- 更多登录模板
- 修复源码现有bug，或增加新的实用功能
- 更多demo示例：比如针对element-ui一些复杂组件的示例，或者其它一些常见js库的集成使用


## 🪒 访问旧版本
Sa-Admin v1.40.0 之前的版本通过纯 html + iframe 方式构建，如果您需要访问旧版本：
- 源码：[https://gitee.com/click33/sa-admin/tree/html/](https://gitee.com/click33/sa-admin/tree/html/)
- 演示站：[http://sa-admin-html.dev33.cn/](http://sa-admin-html.dev33.cn/)


## 😎️ QQ群
QQ交流群：[782974737 点击加入](https://jq.qq.com/?_wv=1027&k=5DHN5Ib)



