export default {
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


	initialValue() {
		storeValue('freshedTime',new Date().toLocaleString());
	},

// 
	// async initialScript_1 () {
		// factory.run();
		// 
		// 
		// await prd.run();
		// prdDetail_d.run();
		// 
		// return 'success'
	// },


	_autoFresh(){
		if (Switch1.isSwitchedOn) {
			setInterval(async () => { 
				// now.run();
				factory.run();
				prdPlan_7d.run();
				dispatchToday_Code.run();
				dispatchToday_Total.run();


				await inventory.run();
				prdDetail_d.run();

				storeValue('freshedTime',new Date().toLocaleString());
			}, 30000, "5min");
		} else {
			clearInterval("5min");
		}
	}


}