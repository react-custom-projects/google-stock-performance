import { apiAlphaVantageService } from './HttpService';

class GoogleStockService {
	static fetchDailyChart() {
		return apiAlphaVantageService({
			method: 'GET',
			url: '',
		});
	}
}

export default GoogleStockService;
