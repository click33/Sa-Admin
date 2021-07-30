var mockJoptions = [		// 级联选项  
	{
		value: 'v1', 
		label: '选项1',
		children: [
			{
				value: 'v1-1', 
				label: '选项1-1',
				children: [
					{value: 'v1-1-1', label: '选项1-1-1'},
					{value: 'v1-1-2', label: '选项1-1-2'},
					{value: 'v1-1-3', label: '选项1-1-3'},
				]
			},
			{value: 'v1-2', label: '选项1-2'},
			{value: 'v1-3', label: '选项1-3'},
		]
	},
	{
		value: 'v2', 
		label: '选项2',
		children: [
			{value: 'v2-1', label: '选项2-1'},
			{value: 'v2-2', label: '选项2-2'}
		]
	},
	{
		value: 'v3', 
		label: '选项3',
		children: [
			{value: 'v3-1', label: '选项3-1'},
			{value: 'v3-2', label: '选项3-2'}
		]
	}
];