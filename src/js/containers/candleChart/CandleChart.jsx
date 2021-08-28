import React, { useEffect, useState } from 'react';
//canvas chart
import { CanvasJSChart } from 'canvasjs-react-charts';
//services
import GoogleStockService from '../../services/GoogleStockService';

const CandleChart = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await GoogleStockService.fetchDailyChart();
			setData(formatStockData(res.data['Time Series (Daily)']));
		};
		fetchData();
	}, []);

	const formatStockData = (stockData) => {
		return Object.entries(stockData).map((el) => {
			const [date, priceData] = el;

			return {
				date,
				open: +priceData['1. open'],
				high: +priceData['2. high'],
				low: +priceData['3. low'],
				close: +priceData['4. close'],
			};
		});
	};

	return (
		<CanvasJSChart
			options={{
				axisY: {
					minimum: Math.min(...data.map((el) => el.low)) / 1.1,
					maximum: Math.max(...data.map((el) => el.high)) * 1.1,
					crosshair: {
						enabled: true,
						snapToDataPoint: true,
					},
				},
				axisX: {
					crosshair: {
						enabled: true,
						snapToDataPoint: true,
					},
					scaleBreaks: {
						spacing: 0,
						fillOpacity: 0,
						lineThickness: 0,
						customBreaks: data.reduce((acc, val, i, array) => {
							if (i === 0) return acc;

							const currentPointUnix = +new Date(val.date),
								prevPointUnix = +new Date(array[i - 1].date),
								oneDayInMs = 86400000,
								difference = prevPointUnix - currentPointUnix;

							return difference === oneDayInMs
								? acc
								: [
										...acc,
										{
											startValue: currentPointUnix,
											endValue: prevPointUnix - oneDayInMs,
										},
								  ];
						}, []),
					},
				},
				data: [
					{
						type: 'candlestick',
						dataPoints: data.map((el) => ({
							x: new Date(el.date),
							y: [el.open, el.high, el.low, el.close],
						})),
					},
				],
			}}
		/>
	);
};

export default CandleChart;
