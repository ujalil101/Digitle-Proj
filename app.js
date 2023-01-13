document.addEventListener("DOMContentLoaded", () => {
    createSq();
    let guessNum = [[]];
    let space = 1;
    let win = false;
    let counter = 0;
    function numGen() {
        let num = "";
        let counter = 0;
        while (counter < 5){
            let rand_num = Math.floor(Math.random() * 9);
            let str_num = rand_num.toString(10);
            if (!(num.includes(str_num))){
                num += str_num;
                counter += 1;
            }
        }
        return num;
    }
    const x = numGen()
    console.log(x)
   
    let guessNumCount = 0;
    const keys = document.querySelectorAll(".keyboard-row button");

    function getCurrentNum() {
        const num = guessNum.length;
        return guessNum[num - 1];
    }
    
    function updateGuess(number) {
        const currentNum = getCurrentNum();
        if (currentNum && currentNum.length < 5){
            currentNum.push(number);
            const spaceEl = document.getElementById(String(space))
            space = space + 1;
            spaceEl.textContent = number;
        }
    }
    function getTileCol(num, index) {
        if (String(x)[index] === num)
            return "rgb(0,100,0)"; //green
        else if ((x.includes(num)) && (String(x)[index] != num))
            return "rgb(242, 140, 40)"; //orange
        else
            return "rgb(58,58, 60)"; //grey
    }
    
    function handleSubmit() {
        const currentNumArr = getCurrentNum();
        var number = currentNumArr.join("");
        if (currentNumArr.length !== 5) {
            window.alert("Number must be 5 digits");
            return;
        }
        const currentNum = currentNumArr.join("");
        const firstDigId = guessNumCount * 5 + 1;
        const time = 200;
        currentNumArr.forEach((num,index) => {
            setTimeout(() => {
                const tileCol = getTileCol(num, index);
                const digId = firstDigId + index;
                const digEl = document.getElementById(digId);
                digEl.classList.add("animate__flipInX");
                digEl.style = `background-color:${tileCol};border-color:${tileCol}`;
            }, time * index)
        });
        guessNumCount += 1;
        if (x === number){
            window.alert("Congrats");
        }
        if (guessNum.length === 6) {
            window.alert(`Sorry, you have nore more guesses! The number is ${numGen()}!`);
        }
        guessNum.push([]);
    }
    function handleDeleteNum() {
        const currentNumArr = getCurrentNum();
        const removedig = currentNumArr.pop();
        guessNum[guessNum.length-1] = currentNumArr;
        const lastDig = document.getElementById(String(space-1));
        lastDig.textContent = '';
        space = space - 1;
    }
    function createSq() {
        const gameBoard = document.getElementById("board");
        for(let index =  0; index<30; index++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index+1);
            gameBoard.appendChild(square);
        }
    }
    for(let i =0; i<keys.length; i++){
        keys[i].onclick = ({target}) => {
            const number = target.getAttribute("data-key");
            if (number ==='enter') {
                handleSubmit();
                return;
            }
            if (number ==='delete') {
                handleDeleteNum();
                return;
            }
            updateGuess(number);
        };
    }
});   