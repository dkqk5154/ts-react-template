import axios from 'axios';
import { useCookies } from 'react-cookie';
import { getSession, signOut, signIn } from 'api/cognito';
import {
	createLocalDB,
	openLocalDB,
	insertAll,
	deleteLocalDB,
	getAll,
} from 'api/IDB';
import { nameDownSort } from 'utils/sort';

function useAPI(): any {
	const [cookies, setCookie, removeCookie] = useCookies();
	const idToken = cookies?.id_token;

	const API: any = axios.create({
		baseURL: process.env.REACT_APP_API_URL || '',
		headers: {
			Authorization: idToken,
		},
	});

	const APIs: any = {
		getAll: () => API.get('/get'),
	};

	const plant = {
		getAll: () => API.get('/get/plantlist'),
		getPlantInfo: (params: any) => API.get('/get/plantdetail', params),
		insertSmpAndRec: (params: {
			plantKey: string;
			smp: string | number;
			rec: string | number;
		}) => API.post('/users/owner/smprec-price', params),
		inverterControl: (params: {
			plantKey: string;
			deviceType: string;
			deviceKey: string;
			seqNo: string | number;
			fromState: string;
			toState: string;
			userId: string;
		}) => API.post('/control', params),
	};

	const user = {
		create: (params: {
			user_phone: string;
			nickname: string;
			password: string;
		}) => API.post('/users/insert', params),
		forgotPassword: (params: { new_password: string }) =>
			API.post('/users/change-pwd', params),
		signUpCheck: (params: { userPhone: string }) =>
			API.get('/users/check', { params }),
		secondaryPasswordCheck: (params: { password: string }) =>
			API.post('/users/second-pwd/check', params),
		get: () => API.get('/users/info'),
		checkPassword: (params: { password: string | number }) =>
			API.post('/users/check-pwd', params),
		setSecondPassword: (params: { password: string | number }) =>
			API.post('/users/second-pwd', params),
	};

	const token = {
		insert: (params: { contents: string }) =>
			API.post('/users/get-token', params),
		payment: (params: { contents: string; date: string }) =>
			API.post('/users/use-token', params),
	};

	const session = {
		insert: (params: { userId: string; password: string }) =>
			signIn(params),
		get: () => getSession(),
		delete: async () => {
			try {
				await signOut();

				removeCookie('is_register_service', { path: '/' });
				removeCookie('id_token', { path: '/' });
				removeCookie('user_attributes', { path: '/' });

				localStorage.clear();
				sessionStorage.clear();

				await deleteLocalDB('localIndexDb');
			} catch (err) {
				throw err;
			}
		},
	};

	const cookie = {
		get: () => cookies,
		setIdToken: (value: string) =>
			setCookie('id_token', value, { path: '/' }),
		removeIdToken: () => removeCookie('id_token', { path: '/' }),
	};

	const IDB = {
		insertPlantList: async function (idToken: string) {
			try {
				let plantList = [];

				const customAPI = axios.create({
					baseURL: process.env.REACT_APP_API_URL,
					headers: {
						Authorization: idToken,
					},
				});

				const isIdToken = idToken !== undefined;

				const resultPlantList = isIdToken
					? await customAPI.get('/get/plantlist')
					: await plant.getAll();

				plantList = resultPlantList.data as Array<object>;

				plantList = await (
					await Promise.all(
						plantList.map(async (res: any) => {
							try {
								const params = { params: { plantId: res.SK } };

								const plantInfo = isIdToken
									? await customAPI.get(
											'/get/plantdetail',
											params,
									  )
									: await plant.getPlantInfo(params);

								const { SK, plantName } = res;
								const {
									possessionDistribution,
									startDate,
									equipArrayInfo,
									equipEnvSensor,
								} = plantInfo.data;

								return {
									value: SK,
									label: plantName,
									startDate: startDate,
									isIncomingPanel:
										possessionDistribution === 1,
									isJunctionBox: equipArrayInfo === 1,
									isSensor: equipEnvSensor === 1,
								};
							} catch (err) {
								console.log('get plant err');
							}
						}),
					)
				).sort((a: any, b: any) => {
					return nameDownSort(a.label, b.label) as number;
				});

				await deleteLocalDB('localIndexDb');

				let formatPlantList = [{ length: plantList.length }];

				formatPlantList = formatPlantList.concat(plantList);

				const d1 = await createLocalDB('localIndexDb', 1, 'plant');
				await insertAll(d1, 'plant', formatPlantList);
				d1.close();

				return plantList;
			} catch (err) {
				console.log(err);
				return undefined;
			}
		},
		getPlantList: async function () {
			try {
				const d1 = (await openLocalDB('localIndexDb', 1)) as any;
				const plantList = await getAll(d1, 'plant');
				d1.close();

				return plantList;
			} catch (err) {
				console.log('get plant list err : ', err);
				throw err;
			}
		},
	};

	return [
		{
			API,
			APIs,
			token,
			plant,
			user,
			cookie,
			session,
			IDB,
		},
	];
}

export default useAPI;
