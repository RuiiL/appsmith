export default {
	createChart(){
		mm_sales_invoice_chart.run();
		mm_allocation_bill_chart.run();
	},

	_cal() {
		// const getPrdDetail = setInterval(()=>{
		// if(!mm_allocation_bill_thisMonth.isLoading){clearInterval(getPrdDetail);T_BD_MATERIAL.run();}
		// },100);

		const check = setInterval(()=>{
			if(!mm_sales_invoice_main.isLoading && !mm_allocation_bill_f1.isLoading){
				clearInterval(check);
				T_BD_MATERIAL_fCal.run();
				job();
			}
		},100);
		function job(){
			const result = mm_sales_invoice_main.data.map(i => {
				const dispatched = (mm_allocation_bill_f1.data.filter(j => j.物料编码 == i.物料编码)[0] || {}).数量 || 0; // filter结果可能为空[]
				const rate = (dispatched / i.本月订单数量 * 100).toFixed(2);
				const rateT = rate>0 ? rate.toString() + '%' : '';
				const sym = rate >= 100 ? '✅' : (rate>=75 ? '🟩' : rate>=50?'🟨': rate>=25?'🟧':rate>0?'🟥':'❌');
				return {物料编码:i.物料编码, 订单完成率: rateT + sym};
			})
			// return result;
			storeValue('calFields',result);
		}
	},

	_fresh(){
		// 主表格
		mm_sales_invoice_main.run();
		// T_BD_MATERIAL.run();
		mm_allocation_bill_f1.run();
		func._cal();
		pp_order_flow_f2.run();
		mm_prod_finished_in_f3.run();
		T_BD_Inventory_f4.run();
		mm_allocation_bill_f6.run();

		// 卡片
		todayFH_total.run();
		todayRFID_total.run();
		todayPrdIn_total.run();
		mm_prod_finished_in_f5.run();

		storeValue('freshedTime',new Date().toLocaleString());
	}

}