import { apiAlphaVantageService } from './HttpService';

class GoogleStockService {
	static fetchDailyChart() {
		return apiAlphaVantageService({
			method: 'GET',
			url: '',
			params: {
				function: 'TIME_SERIES_DAILY',
				symbol: 'GOOGL',
				apikey: process.env.ALPHA_VANTAGE_API_KEY,
			},
		});
	}
}

export default GoogleStockService;
