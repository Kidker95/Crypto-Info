import { apiCall } from "./apiCall.js";

let selectedCoinSymbols = JSON.parse(localStorage.getItem('selectedCoinSymbols')) || [];

export async function displayCoins(coins) {
    try {
        const exchangeRate = await apiCall("https://api.exchangerate-api.com/v4/latest/USD");

        $(".coins-container").empty();

        coins.forEach((coin, index) => {
            const coinPriceDollar = coin.current_price;
            const shekel = coinPriceDollar * exchangeRate.rates.ILS;
            const euro = coinPriceDollar * exchangeRate.rates.EUR;

            const coinDiv = $(`
                <div class='coin-card'>
                    <img src='${coin.image}' class='coin-image'>
                    <h2>${coin.name}</h2>
                    <small>${coin.symbol}</small>
                   
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault${index}" title="Add To Favorites">
                    </div>
                    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">More Info</button>
                    <div class="collapse" id="collapse${index}">
                        <div class="card card-body transparent-card-body">
                            <p>Current Value:</p>
                            <small>
                                USD: $${coinPriceDollar}<br>
                                EUR: €${euro.toFixed(2)}<br>
                                NIS: ₪${shekel.toFixed(2)}
                            </small>
                        </div>
                    </div>
                </div>
            `);

            // Initialize checkbox state based on selectedCoinSymbols
            if (selectedCoinSymbols.includes(coin.symbol)) {
                coinDiv.find('.form-check-input').prop('checked', true);
            }

            // Handle checkbox changes
            coinDiv.find('.form-check-input').change(function() {
                if (this.checked) {
                    if (selectedCoinSymbols.length >= 5) {
                        alert("You can't add more than 5 favorite coins. The last coin will be removed.");

                        // Uncheck the checkbox for the last added coin
                        $(this).prop('checked', false);

                        // Remove the last coin added (this coin) from selectedCoinSymbols
                        return;
                    }
                    selectedCoinSymbols.push(coin.symbol);
                } else {
                    selectedCoinSymbols = selectedCoinSymbols.filter(symbol => symbol !== coin.symbol);
                }

                // Update localStorage
                localStorage.setItem('selectedCoinSymbols', JSON.stringify(selectedCoinSymbols));
            });

            $(".coins-container").append(coinDiv);
        });

    } catch (err) {
        console.log("Error displaying coins:", err);
    }
}
