export function setupSearch(displayCoins, allCoins) {
    const searchInput = $("#coinSearch");

    searchInput.on("input", () => {
        const query = searchInput.val().toLowerCase().trim();

        if (query.length === 0) {
            // Display initial 30 coins if the search box is empty
            displayCoins(allCoins.slice(0, 30));
            return;
        }

        // Filter coins based on name or symbol
        const filteredCoins = allCoins.filter(coin =>
            coin.name.toLowerCase().includes(query) ||
            coin.symbol.toLowerCase().includes(query)
        );

        // Display only the filtered coins
        displayCoins(filteredCoins);
    });
}
