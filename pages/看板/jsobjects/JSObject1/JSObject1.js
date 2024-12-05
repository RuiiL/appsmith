export default {
	myVar1: [],
	myVar2: {},
	list(){
		return prdList.data.map(obj => `'${obj.物料编码}'`).join(',');
	},
	dateOf7D () {
		return defaultObject();
		
		function defaultObject(){
			const dateArray = [];
			const today = new Date();

			for (let i = 0; i < 8; i++) {
				const tempDate = new Date(today); // 创建日期的副本，避免修改 today
				tempDate.setDate(today.getDate() + i); // 设置日期为今天加 i 天
				// 格式化日期为 "YYYY/MM/DD"
				const formattedDate = `${tempDate.getFullYear()}/${String(tempDate.getMonth() + 1).padStart(2, '0')}/${String(tempDate.getDate()).padStart(2, '0')}`;
				// 将键值对添加到对象中
				dateArray.push(formattedDate);
			}
			return dateArray;
		}
	},
	
	
	prdPlan7d () {
		const records = prdPlan_7d.data;
		const dfo =defaultObject();
		// return dfo;
		let result = {};
		records.forEach(item => {
			if(!result[item['物料编码']]){
				// result[item['物料编码']]=dfo;
				result[item['物料编码']] = { ...dfo }; // 避免对象共享
			}
			result[item['物料编码']][item['日期']]=item['数量']
			// result[item['物料编码']] ? result[item['物料编码']][item['日期']]=item['数量'] : result[item['物料编码']]=dfo;
		})
		return result;


		function defaultObject(){
			const dateObject = {};
			const today = new Date();

			for (let i = 0; i < 8; i++) {
				const tempDate = new Date(today); // 创建日期的副本，避免修改 today
				tempDate.setDate(today.getDate() + i); // 设置日期为今天加 i 天
				// 格式化日期为 "YYYY/MM/DD"
				const formattedDate = `${tempDate.getFullYear()}/${String(tempDate.getMonth() + 1).padStart(2, '0')}/${String(tempDate.getDate()).padStart(2, '0')}`;
				// 将键值对添加到对象中
				dateObject[formattedDate] = 0;
			}
			return dateObject;
		}
	},
	async myFun2 () {
		//	use async-await or promises
		//	await storeValue('varName', 'hello world')
	}
}