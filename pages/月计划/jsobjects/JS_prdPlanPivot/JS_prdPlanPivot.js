export default {
	myVar1: [],
	myVar2: {},
	getTable1Map () {
		// 这个方法的输入：「prdPlan_monthly」
		// 这个方法的输出：「T_main」
		// prdPlanQuery.run();
		const records = prdPlan_monthly.data;
		
		const uniqueCodes = [...new Set(records.map(item => item['物料编码']))];
		// console.log(uniqueCodes);
		let result = [];
		uniqueCodes.forEach(code => {
			const rds4EC = records.filter(item => item['物料编码']===code);
			// console.log(a1)
			let rd4R = {
				'物料编码':code,
				'名称':rds4EC[0]['名称']
			};
			rds4EC.forEach(item => {
				rd4R[item['日期']] = item['数量']
			});
			result.push(rd4R);
		});
		return result;

	},
}