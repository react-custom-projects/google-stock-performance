import React, { useEffect } from 'react';
//services
import GoogleStockService from '../../services/GoogleStockService';

const Chart = () => {
	useEffect(() => {
		const fetchData = async () => {
			const res = await GoogleStockService.fetchDailyChart();
			console.log(res.data);
		};
		fetchData();
	}, []);
	return <div>chart</div>;
};

export default Chart;
