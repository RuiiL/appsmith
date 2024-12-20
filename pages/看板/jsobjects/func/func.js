export default {
	createChart(){
		mm_sales_invoice_chart.run();
		mm_allocation_bill_chart.run();
	},

	_cal() {
		const check = setInterval(()=>{
			if(!mm_sales_invoice_thisMonth.isLoading && !mm_allocation_bill_thisMonth.isLoading){clearInterval(check);job();}
		},100);
		function job(){
			const result = mm_sales_invoice_thisMonth.data.map(i => {
				const dispatched = (mm_allocation_bill_thisMonth.data.filter(j => j.物料编码 == i.物料编码)[0] || {}).数量 || 0; // filter结果可能为空[]
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
				mm_sales_invoice_thisMonth.run();
				T_BD_MATERIAL.run();
				mm_allocation_bill_thisMonth.run();
				func._cal();
				pp_order_flow.run();
				mm_prod_finished_in_bill.run();
				T_BD_Inventory_1.run();
				mm_allocation_bill_toDaySum.run();
				
				// 卡片
				todayFH_total.run();
				todayRFID_total.run();
				todayPrdIn_total.run();
				todayPrdIn_groupCode.run();

				storeValue('freshedTime',new Date().toLocaleString());
	}
	
}