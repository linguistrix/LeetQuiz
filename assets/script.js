class Questions {
    static getQuestions = () => {
        // The format right now is: 
        // Question name\tDifficulty
        // Note that it's tab-delimited.
        // A better way would be to have it in JSON form or something similar.
        let questions = `Word Break	Easy
        Time Series	Medium
        Convert Object to JSON String	Easy
        Most Profit Assigning Work	Easy
        Random Pick with Weight	Medium
        Number of Lines To Write String	Hard
        Naming a Company	Hard
        Substring with Concatenation of All Words	Medium
        Self Crossing	Easy
        Best Team With No Conflicts	Hard
        Search a 2D Matrix	Medium
        Contains Duplicate	Hard
        Confusing Number	Easy
        Evaluate Boolean Expression	Easy
        Image Overlap	Easy
        Container With Most Water	Medium
        Intersection of Two Arrays	Hard
        Two Best Non-Overlapping Events	Hard
        Longest Common Prefix	Medium
        Rearranging Fruits	Medium
        Check If It Is a Straight Line	Medium
        Three Equal Parts	Hard
        Patients With a Condition	Hard
        Expressive Words	Easy
        Contiguous Array	Hard
        Replace Elements in an Array	Hard
        X of a Kind in a Deck of Cards	Medium
        Number of Matching Subsequences	Easy
        Scramble String	Easy
        Fill Missing Data	Medium
        Two Sum	Easy
        Linked List Components	Easy
        Rearrange Characters to Make Target String	Easy
        Join Two Arrays by ID	Medium
        Largest Merge Of Two Strings	Easy
        Count Hills and Valley in an Array	Hard
        Minimum Moves to Convert String	Hard
        Min Cost to Connect All Points	Medium
        Valid Anagram	Hard
        Immediate Food Delivery I	Easy
        Merge BSTs to Create Single BST	Easy
        Single-Threaded CPU	Medium
        Three Equal Parts I	Hard
        Three Equal Parts II	Hard
        Three Equal Parts III	Medium
        Find Pattern in Infinite Stream I	Hard
        Count Items Matching a Rule	Hard
        Circular Array	Easy
        Count and Say	Hard
        Special Positions in a Binary Matrix	Hard
        Time to Cross a Bridge	Medium
        Erect the Fence	Medium
        Making File Names Unique	Medium
        X of a Kind in a Deck of Cards	Hard
        Maximum Swap	Easy
        Copy List with Random Pointer	Medium
        Consecutive Numbers	Hard`.split("\n");
        return questions;
    }

    static updateModal = (index) => {
        var arrIndex = parseInt(index / 2);
        $('.question-name').text("Question " + (arrIndex + 1) + ": " + Questions.getQuestions()[arrIndex].split("\t").slice(0, 1));
        $('#question-img').attr("src", `slides/BAQC-Quiz-${index.toString().padStart(3, '0')}.jpg`);
        $('#answer-img').attr("src", `slides/BAQC-Quiz-${(index + 1).toString().padStart(3, '0')}.jpg`);
        $('#extra-info').html('');
        if (arrIndex == 8) {
            $('#extra-info').html(`All-Play Round. Each team will be given 6 terms / names. One of the persons from the team has 30 seconds to convey those 6 terms to their team. It's like charades but they are allowed to speak, as long as they don't say anything that overlaps with the actual term. Click <a href="./rapidfire.pdf" target="_blank">here</a> to access the round.`);
        }
        if (arrIndex == 37) {
            $('#extra-info').html(`All-Play Round. Teams will be shown 8 images, 2 at a time. There's a connecting link between the images. The sooner the teams guess it the more points they get. Click <a href="./lvc.pdf" target="_blank">here</a> to access the round.`);
        }
        if (arrIndex == 40) {
            $('#extra-info').html(`All-Play Round. Teams will be shown 10 images, each is a mashup of two celebrities. Identify both celebrities in each case. Click <a href="./mashup.pdf" target="_blank">here</a> to access the round.`);
        }
        var timeLeft = 45;
        $("#countdown-timer").text("45s");
        var countdown = setInterval(function () {
            // Decrease the time left by 1 second
            timeLeft--;

            // Update the timer element with the new time left
            $("#countdown-timer").text(timeLeft + "s");

            // Check if the timer has reached 0
            if (timeLeft <= 0) {
                // If so, clear the interval to stop the countdown
                $("#countdown-timer").text("Time Up!");
                clearInterval(countdown);                
            }
        }, 1000); // Repeat every 1000ms (1 second)
        localStorage.setItem(`Q${arrIndex}`, true);
    }
}



$(document).ready(function () {
    $('a[data-modal]').click(function (event) {
        $('#question-pane').modal();
        return false;
    });

    $('#answer-pane').on($.modal.AFTER_CLOSE, function (event, modal) {
        window.location.reload();
    });

    $(document).on("click", ".increase-5", function () {
        var team = $(this).parents(".col").find(".score").data("team");
        var score = parseInt(localStorage.getItem(`Team${team}`)) || 0;
        score = score + 5;
        $(this).parents(".col").find(".score").html(score);
        localStorage.setItem(`Team${team}`, score);
    });

    $(document).on("click", ".increase-10", function () {
        var team = $(this).parents(".col").find(".score").data("team");
        var score = parseInt(localStorage.getItem(`Team${team}`)) || 0;
        score = score + 10;
        $(this).parents(".col").find(".score").html(score);
        localStorage.setItem(`Team${team}`, score);
    });

    $(document).on("click", ".decrease-5", function () {
        var team = $(this).parents(".col").find(".score").data("team");
        var score = parseInt(localStorage.getItem(`Team${team}`)) || 0;
        score = score - 5;
        $(this).parents(".col").find(".score").html(score);
        localStorage.setItem(`Team${team}`, score);
    });

    $(".score").each(function (index) {
        var team = $(this).data("team");
        var score = parseInt(localStorage.getItem(`Team${team}`)) || 0;
        $(this).html(score);
    });

    $("div[role='rowgroup']").html("");
    Questions.getQuestions().forEach((obj, index) => {
        let alreadyAttempted = localStorage.getItem(`Q${index}`, true);
        let question = obj.split("\t")[0];
        let difficulty = obj.split("\t")[1];
        let styleClass = "text-green-60 dark:text-dark-green-40";
        if (difficulty == "Medium") {
            styleClass = "text-yellow dark:text-dark-yellow";
        } else if (difficulty == "Hard") {
            styleClass = "text-red-40 dark:text-dark-red";
        }
        $("div[role='rowgroup']").append(
            `<div role="row"
                class="odd:bg-layer-1 even:bg-overlay-1 dark:odd:bg-dark-layer-bg dark:even:bg-dark-fill-4"
                style="display: flex; flex: 1 0 auto; min-width: 0px; font-size: larger;">
                <div role="cell" class="mx-2 flex items-center py-[11px]"
                    style="box-sizing: border-box; flex: 52 0 auto; min-width: 0px; width: 52px;">
                    ${alreadyAttempted ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" class="h-4.5 w-4.5 text-lc-green-60 dark:text-dark-lc-green-60 inline-block shrink-0 fill-none stroke-current">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.6 12a9.6 9.6 0 01-9.6 9.6 9.6 9.6 0 110-19.2c1.507 0 2.932.347 4.2.965M19.8 6l-8.4 8.4L9 12">
                                                            </path>
                                                        </svg>`: ``}
                </div>
                <div role="cell" class="mx-2 flex items-center py-[11px]"
                    style="box-sizing: border-box; flex: 260 0 auto; min-width: 0px; width: 260px;">
                    <div class="max-w-[302px] flex items-center overflow-hidden">
                        <div class="overflow-hidden">
                            <div class="flex items-center">
                                <div><a
                                    class="h-5 hover:text-blue-s dark:hover:text-dark-blue-s" onclick="Questions.updateModal(${index * 2 + 1})" href="#question-pane" rel="modal:open">
                                    ${index + 1}. ${question}</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="cell" class="mx-2 flex items-center py-[11px]"
                    style="box-sizing: border-box; flex: 84 0 auto; min-width: 0px; width: 84px;">
                    <span class="${styleClass}">${difficulty}</span>
                </div>
            </div>`
        );
    });
});
