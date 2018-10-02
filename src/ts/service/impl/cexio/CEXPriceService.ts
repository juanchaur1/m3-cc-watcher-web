import PriceService from '../../PriceService';
import CEXResponse from './CEXResponse';

export class CEXPriceService implements PriceService {

	async getCurrentPrice(fromCurrency: string, toCurrency: string): Promise<number> {
		const url = `https://cex.io/api/last_price/${fromCurrency}/${toCurrency}`;

		const response: Response = await fetch(url);
		const cexData: CEXResponse = await response.json();

		if (response.status !== 200) {
			return 0;
		} else {
			return cexData.lprice
		}
	}
}
