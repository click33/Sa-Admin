# sa-admin 集成鉴权功能 


#### 1、首先在登录时，写入当前会话所具有的权限码集合
```
	var arr = ['1', '2', '3', 'a', 'b', 'c'];		// 一般由后端提供接口返回当前会话所具有的权限码集合 
	sa.setAuth(arr);			// 写入本地缓存中 
```
测试：
<button onclick="sa.setAuth(['1', '2', '3', 'abc']); alert('写入成功')">当前会话写入权限码集合：['1', '2', '3', 'abc']</button>


#### 2、然后：如果一个页面需要某个权限码才能打开 
```
	// 在这个页面的 <script> 代码块第一句写上：
	sa.checkAuth('a');		// 必须具有权限码 `a` 才能打开这个页面，否则会被强制跳转到 403-无权限 页面 
```
测试：
<button onclick="sa.checkAuth('abc'); alert('有')">点击检测当前会话是否具有权限码：abc</button>
<button onclick="sa.checkAuth('qwe'); alert('有')">点击检测当前会话是否具有权限码：qwe</button>


#### 3、某端代码需要某个权限码才能继续往下执行
```
	// 在需要鉴权的地方加上这段代码 
	sa.checkAuthTs('a');	// 含义同上，只不过如果鉴权失败，不是强制跳转，而是弹窗显示 403-无权限 页面 
```
测试：
<button onclick="sa.checkAuthTs('abc'); alert('有')">点击检测当前会话是否具有权限码：abc</button>
<button onclick="sa.checkAuthTs('qwe'); alert('有')">点击检测当前会话是否具有权限码：qwe</button>


#### 4、如果需要精细的根据权限来控制页面上某个按钮是否显示 
```
	<!-- 可以利用vue的v-if指令来渲染 -->
	<button v-if="sa.isAuth('a')">删除这条记录(只有具有权限码a，才能看到这个按钮)</button>
```
- 除了button，其它任何元素乃至一段html代码都可以利用此方法控制是否显示


#### 5、注销登录时，可以清除掉所有权限
```
	sa.clearAuth();		// 清除当前会话所有权限码 
```
测试：
<button onclick="sa.clearAuth(); alert('清除成功')">清除当前会话所有权限码</button>


#### 6、需要注意的地方
```
	`sa.checkAuth` 与 `sa.checkAuthTs` 方法为了调用方便，默认在无权限时打开的页面地址为：`../../sa-view/error-page/403.html`
	此url只有在当前页面为二级子目录时才能打开成功，其它级别目录则会无法打开显示404，这时候你需要指定403无权限页面地址 
	例如在首页index.html调用时，原调用方式：`sa.checkAuth('a')` ，改为：`sa.checkAuth('a', 'sa-view/error-page/403.html')`
```

最后请知晓一点：**最终的鉴权操作一定要在后端完成，前端只能是起到一个辅助作用**


