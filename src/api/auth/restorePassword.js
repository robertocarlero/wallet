import axios from 'axios';
import { URL_BASE } from '../../constants/url-base';

export async function restorePassword(email) {
	const url = new URL(`${URL_BASE}/restore-password/request/${email}`);

	const { data } = await axios.post(url.toString(), { email });

	return data;
}
