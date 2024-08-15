
import { apiCall } from './apiCall.js';


export async function loadCoinList(coinCount = 30) {
    try {
        const coinList = await apiCall(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinCount}&page=1&sparkline=false`);
        return coinList;
    } catch (err) {
        console.error("Error loading coin list:", err);
    }
}
