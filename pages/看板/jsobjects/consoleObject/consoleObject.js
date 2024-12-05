export default {

	init () {
		// storeValue(key: string, value: any, persist? = true);  //增
		storeValue('freshedTime',new Date().toLocaleString());
	},


	_autoFresh(){
		if (Switch1.isSwitchedOn) {
			setInterval(async () => { 
				// now.run();
				T_BD_Inventory_1.run();
				todayFH_total.run();
				todayFH_groupCode.run();
				todayRFID_total.run();
				
				await prdList.run();
				prdDetail.run();
				prdPlan_7d.run();
				todayPrdIn_total.run();
				todayPrdIn_groupCode.run();
				
				storeValue('freshedTime',new Date().toLocaleString());
			}, 30000, "5min");
		} else {
			clearInterval("5min");
		}
	}


}