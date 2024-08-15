
export function setupInactivityTimer() {
    let time;

    function startTimer() {
        time = setTimeout(function() {
            alert("The site was unused for 2 minutes or more.");
            location.reload();  
        }, 120000); // 2 minutes
    }

    function resetTimer() {
        clearTimeout(time);
        startTimer();  
    }

    // when user uses the website the timer restarts
    $(document).on('mousemove keypress scroll click', resetTimer);

    // when page loads start timer
    startTimer();
}
