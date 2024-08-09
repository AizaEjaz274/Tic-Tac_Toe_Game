let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".refresh");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let gameOver = false;

const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText) return;

        box.innerText = turnO ? "O" : "X";
        turnO = !turnO;
        box.disabled = true;

        checkWinner();
    });
});

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    gameOver = true;
}

const checkWinner = () => {
    for (let combination of winningCombinations) {
        let [a, b, c] = combination;

        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            showWinner(boxes[a].innerText);
            return;
        }
    }

    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        gameOver = true;
    }
};

btn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true;
    gameOver = false;
    msgContainer.classList.add("hide");
}
