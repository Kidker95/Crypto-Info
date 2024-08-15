import { loadCoinList } from './loadCoinList.js';
import { displayCoins } from './displayCoins.js';
import { setupSearch } from './searchCoins.js';
import { setupInactivityTimer } from './reload.js';
import { showLoadingScreen, hideLoadingScreen } from './loadingScreen.js'; 

let allCoins = [];

$(document).ready(async () => {
    try {
        showLoadingScreen(); // //loading screen when starting

        // 30 coins on the first loading
        const initialCoins = await loadCoinList(30);
        displayCoins(initialCoins);

        // 100 coins for searching
        allCoins = await loadCoinList(100);

        // setup the search functionality
        setupSearch(displayCoins, allCoins);

    } catch (error) {
        console.error('Error loading data:', error);
    } finally {
        hideLoadingScreen(); // after fetching is complete hide loading screen
    }

    $('.coins-container').on('click', '.btn-add-favorite', function () {
        const coinId = $(this).closest('.coin-card').data('coin-id');
        addCoinToFavorites(coinId);
    });

    
    setupInactivityTimer();  
});


function addCoinToFavorites(coinId) {
    
    console.log(`Coin with ID ${coinId} added to favorites.`);
}
