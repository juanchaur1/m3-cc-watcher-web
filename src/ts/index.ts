import PriceService from './service/PriceService';
import { CEXPriceService } from './service/impl/cexio/CEXPriceService';
import { CryptoCompareService } from './service/impl/cryptocompare/CryptoCompareService';

import './styles.scss';

class App {
	private priceService: PriceService;

	constructor() {
		this.priceService = new CryptoCompareService();
	}

	watch() {
		this.query();

		setInterval( async () => {
			await this.query();
		}, 5000);
	}

	async query() {
		const toCurrency = 'USD';
		const values = await this.priceService.getCurrentPrice('BTC,ETH,LTC,XMR', toCurrency);


		for (const [index, value] of Object.entries(values)) {
			this.updateValues(index, value);
		}
	}

	private updateValues(index: string, value: object): void {
		const currencyElement: HTMLElement = document.getElementById(value['currency']),
			coinMarketElement: HTMLElement = currencyElement.querySelector('.coin-market'),
			coinPriceElement: HTMLElement = currencyElement.querySelector('.coin-price'),
			coinPosElement: HTMLElement = currencyElement.querySelector('.coin-pos');

		const initialValue = coinPriceElement.textContent;
		const currentPrice = value['price'];

		coinMarketElement.textContent = `${value['currency']}`;
		coinPriceElement.textContent = `${currentPrice}`;
		coinMarketElement.textContent = `${value['market']}`;

		const fluctuation = value['fluctuation'];
		coinPosElement.textContent = `${fluctuation}%`;

		if (fluctuation < 0) {
			coinPosElement.classList.add('decreased');
		} else {
			coinPosElement.classList.remove('decreased');
		}

		if (initialValue !== currentPrice) {
			console.log(`%cUpdating price of ${value['currency']}: ${currentPrice}`, 'color: red; background: black;');

			currencyElement.classList.toggle('updating');
			setTimeout(() => {
				currencyElement.classList.toggle('updating');
			}, 500);
		}
	}
}

const app = new App();
app.watch();
