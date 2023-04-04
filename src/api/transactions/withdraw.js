import axios from 'axios';
import { URL_BASE } from '../../constants/url-base';

const WITHDRAW_URL = `${URL_BASE}/cashout`;

export async function getPendingWithdrawTransactions() {
	const url = new URL(`${WITHDRAW_URL}/verify`);

	const response = await axios.get(url.toString());
	const { data } = response || {};
	return data;
}

export async function generateWithdrawTransaction(amount) {
	const url = new URL(`${WITHDRAW_URL}/${amount}`);

	const { data } = await axios.post(url.toString(), { amount });
	return data;
}

export async function cancelWithdrawTransaction() {
	const url = new URL(`${WITHDRAW_URL}/cancel`);

	const { data } = await axios.put(url.toString());
	return data;
}
