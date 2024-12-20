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

}