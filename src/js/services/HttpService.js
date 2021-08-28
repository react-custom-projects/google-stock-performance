import axios from 'axios';
//localforage
import localForage from 'localforage';
//cache adapter
import { setupCache } from 'axios-cache-adapter';
//toast
import { toast } from 'react-toastify';

const cache = setupCache({
	maxAge: 60 * 60 * 1000,
	store: localForage,
	exclude: {
		query: false,
	},
});

const createNewBaseUrl = (url) =>
	axios.create({
		baseURL: url,
		adapter: cache.adapter,
	});

const apiAlphaVantageService = createNewBaseUrl(process.env.API_URL);

const requestInterceptor = (config) => {
	return config;
};

const requestInterceptorError = (error) => {
	console.log('there is a request error', error);
	return Promise.reject(error);
};

const responseInterceptor = (response) => {
	// console.log('response interceptor:', response);
	return response;
};

const responseInterceptorError = (error) => {
	const errorResponse = error.response;
	console.log('response interceptor error:', errorResponse);

	if (errorResponse?.data?.Error?.Message) {
		toast.error(errorResponse.data.Error.Message);
	}
	if (errorResponse?.data?.message) {
		toast.error(errorResponse.data.message);
	}
	if (errorResponse?.data?.Message) {
		toast.error(errorResponse.data.Message);
	}
	if (errorResponse?.data?.title) {
		toast.error(errorResponse.data.title);
	}
	return Promise.reject(error);
};

const addInterceptors = (service) => {
	service.interceptors.request.use(requestInterceptor, requestInterceptorError);
	service.interceptors.response.use(responseInterceptor, responseInterceptorError);
};

addInterceptors(apiAlphaVantageService);

export { apiAlphaVantageService };
