export default interface PriceService {
	getCurrentPrice(fromCurrency: string, toCurrency: string): Promise<{}>;
}
