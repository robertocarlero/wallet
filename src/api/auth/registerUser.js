import axios from 'axios';

import { URL_BASE } from '../../constants/url-base';
import { REQUEST_HEADERS } from '../../constants/headers';

import { loginUser } from './loginUser';

export async function registerUser({ basic, phone, password }) {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${URL_BASE}/register/v4`;
			const expedition = new Date(basic?.expedition).toISOString().slice(0, 10);
			const data = { ...basic, expedition };
			delete data.document_type;

			const body = { ...data, ...password, phone };
			const raw = JSON.stringify(body);

			await axios.post(url, raw, {
				headers: REQUEST_HEADERS.COMMON,
			});

			const response = await loginUser({
				username: phone,
				password: password?.password,
			});

			resolve(response);
		} catch (error) {
			reject(error);
		}
	});
}
