import { apiCall } from "./apiCall.js";

const selectedCoins = JSON.parse(localStorage.getItem("selectedCoinSymbols"));

async function fetchSelectedCoinsPrices() {
    const coinPrices = {};

    for (let i = 0; i < selectedCoins.length; i++) {
        try {
            const coinData = await apiCall(`https://min-api.cryptocompare.com/data/price?fsym=${selectedCoins[i]}&tsyms=USD`);
            coinPrices[selectedCoins[i]] = coinData.USD;
        } catch (err) {
            console.error(`Failed to fetch price for ${selectedCoins[i]}:`, err.message);
        }
    }

    return coinPrices;
}

function renderChart(dataPoints) {
    const chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "Dynamic Cryptocurrency Prices",
            fontFamily: "Tahoma", 
            fontSize: 24, 
            fontWeight: "bold", 
            
        },
        axisY: {
            title: "Price in USD",
            prefix: "$",
            fontFamily: "Tahoma",
        },
        data: Object.keys(dataPoints).map((coin) => ({
            type: "spline",
            name: coin,
            showInLegend: true,
            markerSize: 0,
            dataPoints: dataPoints[coin]
        }))
    });

    chart.render();
    return chart;
}

async function startFetchingPrices() {
    const dataPoints = {};

    selectedCoins.forEach(coin => {
        dataPoints[coin] = [];
    });

    const chart = renderChart(dataPoints);

    let xVal = 0;
    const updateInterval = 1000; // Update every second
    const dataLength = 45; // Number of data points visible at any point

    setInterval(async () => {
        const coinPrices = await fetchSelectedCoinsPrices();
        const currentTime = new Date();

        selectedCoins.forEach(coin => {
            dataPoints[coin].push({
                x: xVal,
                y: coinPrices[coin]
            });
            xVal++;

            if (dataPoints[coin].length > dataLength) {
                dataPoints[coin].shift();
            }
        });

        chart.render(); // Update the chart with new data
    }, updateInterval);
}

$(document).ready(function() {
    startFetchingPrices();
});
