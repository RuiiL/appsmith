export default {
	// 初始化
	init () {
		// storeValue(key: string, value: any, persist? = true);  //增

		storeValue('freshedTime',new Date().toLocaleString());
	},

	// 自动刷新
	_autoFresh(){
		if (Switch1.isSwitchedOn) {
			setInterval(async () => { 
				// now.run();
				T_BD_Inventory_1.run();
				todayFH_total.run();
				mm_allocation_bill_toDaySum.run();
				todayRFID_total.run();

				await prdList.run();
				T_BD_MATERIAL.run();
				prdPlan_7d.run();
				todayPrdIn_total.run();
				todayPrdIn_groupCode.run();

				storeValue('freshedTime',new Date().toLocaleString());
			}, 600000, "10min");
		} else {
			clearInterval("10min");
		}
	},

	// 计算字段
	async _cal(){
		// await setTimeout(console.log('cal!'),5000);
		await new Promise(resolve => setTimeout(() => {
			console.log('cal!');
			resolve(); // 延迟结束后继续执行
		}, 1000));

		return job();

		function job(){
			const result = mm_sales_invoice_thisMonth.data.map(i => {
				const dispatched = (mm_allocation_bill_thisMonth.data.filter(j => j.物料编码 == i.物料编码)[0] || {}).数量 || 0; // filter结果可能为空[]
				return {物料编码:i.物料编码, 订单完成率: (dispatched / i.本月订单数量 * 100).toFixed(2) + '%'};
			})
			return result;
		}
	}


}