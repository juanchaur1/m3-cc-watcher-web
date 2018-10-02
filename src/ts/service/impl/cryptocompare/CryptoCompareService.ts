import PriceService from '../../PriceService';

export class CryptoCompareService implements PriceService {

	async getCurrentPrice(fromCurrency: string = 'BTC,ETH,LTC,XMR', toCurrency: string): Promise<{}> {
		const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fromCurrency}&tsyms=${toCurrency}`;

		const response: Response = await fetch(url);
		const data = await response.json();

		if (response.status !== 200) {
			return [];
		} else {
			return this.normalize(data, toCurrency);
		}
	}

	private normalize(data: object, toCurrency: string) {
		let normalizedData = [];

		for (const [key, value] of Object.entries(data['DISPLAY'])) {
			normalizedData.push({
				'currency': key,
				'price': value[toCurrency]['PRICE'],
				'market': value[toCurrency]['MARKET'],
				'fluctuation': value[toCurrency]['CHANGEPCT24HOUR']
			});
		}

		return normalizedData;
	}
}
