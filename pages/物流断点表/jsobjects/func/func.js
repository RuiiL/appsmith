export default {
	async customerStock () {
		// return job();
		// let result;
		// const check =  setInterval(() => {
		// // 如果 data.isLoading 为 false，执行 fun.run() 并停止定时器
		// if (!prd.isLoading) {
		// clearInterval(check);  // 停止定时器
		// result = job();
		// }
		// }, 100); // 每 100ms 检查一次
		// return result;

		const result = await new Promise((resolve, reject)=>{
			const check = setInterval(()=>{
				if(!inventory.isLoading){
					clearInterval(check);
					const jobResult = job();
					resolve(jobResult);}
			},100);
		});
		return result;

		function job(){
			let result = inventory.data.map(item=>{
				const _dsp = dispatch30D.data.filter(j=>j.工厂名称==item.工厂名称 && j.物料编码==item.物料编码 && moment(j.日期).isSameOrAfter(item.盘存日期));
				const _dsptotal = _dsp.reduce((sum, r) => sum + r.数量, 0);
				const _csm = consume30D.data.filter(j=>j.工厂名称==item.工厂名称 && j.物料编码==item.物料编码 && moment(j.日期).isSameOrAfter(item.盘存日期));
				const _csmtotal = _csm.reduce((sum, r) => sum + r.数量, 0);
				return {
					工厂名称: item.工厂名称,
					物料编码: item.物料编码,
					期间发货数量: _dsptotal,
					期间消耗数量: _csmtotal,
					当前结存:item.盘存数量 + _dsptotal - _csmtotal
				};
			});

			return result;
		}
	},


	consumeTotal () {
		let result = inventory.data.map(item=>{
			const _dsp = consume30D.data.filter(c=>c.工厂名称==item.工厂名称 && c.物料编码==item.物料编码 && moment(c.日期).isSameOrAfter(item.日期));
			const _total = _dsp.reduce((sum, item) => sum + item.数量, 0);
			return {工厂名称:item.工厂名称,物料编码:item.物料编码,数量:_total};
		})
		return result;
	},

	myFun2 () {
		// const data = dispatch30D.data.filter(j=>j.工厂名称=='赛力斯三工厂'&&j.物料编码=='01.03.09.1001331-RA53'&&moment(j.日期).isSameOrAfter('2024/11/01'));
		// const total = data.reduce((sum, item) => sum + item.数量, 0);
		// const total = data.reduce((sum, item) => {return {数量: sum.数量 + item.数量}}, {工厂: item.工厂,物料编码:item.,数量: 0});
		const data = consume30D.data.filter(j=>j.工厂名称=='赛力斯三工厂'&&j.物料编码=='01.03.09.1001331-RA53'&&moment(j.日期).isSameOrAfter('2024/11/01'));
		const total = data.reduce((sum, item) => sum + item.数量, 0);

		return total;
		// return moment('2024/11/01').isSameOrAfter('2024-11-01'); // true
	}
}