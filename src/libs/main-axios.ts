import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class MainAxios {
	private static instance: AxiosInstance;

	/**
	 * The Singleton's constructor should always be private to prevent direct
	 * construction calls with the `new` operator.
	 */

	// eslint-disable-next-line
	private constructor() {}

	/**
	 * The static method that controls the access to the singleton instance.
	 *
	 * This implementation let you subclass the Singleton class while keeping
	 * just one instance of each subclass around.
	 */

	public static getInstance(config: AxiosRequestConfig<any> | undefined): AxiosInstance {
		if (!MainAxios.instance) {
			MainAxios.instance = axios.create(config);
		}

		return MainAxios.instance;
	}

	/**
	 * Finally, any singleton should define some business logic, which can be
	 * executed on its instance.
	 */
	public someBusinessLogic() {
		// ...
	}
}

const mainAxios = MainAxios.getInstance({
	baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default mainAxios;
