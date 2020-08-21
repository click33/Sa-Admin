var getMockData = function(name) {
	name = name || "";
	var dataList = [
		{
			"id": 101,
			"name": "虚拟物品",
			"icon": "http://oss.dev33.cn/sa-admin/pic_yhk1.png",
			"sort": 3,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 102,
			"name": "休闲零食",
			"icon": "http://oss.dev33.cn/sa-admin/pic_gtgsh1.png",
			"sort": 2,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 103,
			"name": "服饰箱包",
			"icon": "http://oss.dev33.cn/sa-admin/pic_car1.png",
			"sort": 4,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 104,
			"name": "宠物生活",
			"icon": "http://oss.dev33.cn/sa-admin/pic_cxtj1.png",
			"sort": 1,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 105,
			"name": "图书文娱",
			"icon": "http://oss.dev33.cn/sa-admin/pic_yhk1.png",
			"sort": 8,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 106,
			"name": "电脑办公",
			"icon": "http://oss.dev33.cn/sa-admin/pic_gtgsh1.png",
			"sort": 6,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 107,
			"name": "汽车生活",
			"icon": "http://oss.dev33.cn/sa-admin/pic_car1.png",
			"sort": 5,
			"create_time": "2020-08-04 00:19:35"
		}, 
		{
			"id": 108,
			"name": "玩具乐器",
			"icon": "http://oss.dev33.cn/sa-admin/pic_cxtj1.png",
			"sort": 7,
			"create_time": "2020-08-04 00:19:35"
		}
	];
	var mockData = {
		"code": 200,
		"msg": "ok",
		"data": [],
		"dataCount": 100
	}
	// 根据名称筛选 
	for (var i = 0; i < dataList.length; i++) {
		if(dataList[i].name.indexOf(name) > -1) {
			mockData.data.push(dataList[i]);
		}
	}
	// 返回 
	return mockData;
}
