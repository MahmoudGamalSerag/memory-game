document.querySelector(".control-buttons span").onclick = function () {
    let yourName = prompt("Enter Your Name...");
    if (yourName == '' || yourName == null) {
        document.querySelector(".name span").innerHTML = "UnKnown";
    }
    else {

        document.querySelector(".name span").innerHTML = yourName;
        console.log(yourName);
    }
    document.querySelector(".control-buttons").remove();
}
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {

        flipBlock(block);

    });

});

function flipBlock(block) {

    block.classList.add('is-flipped');
    let flippedBlocks = blocks.filter(el => el.classList.contains('is-flipped'));
    if (flippedBlocks.length === 2) {
        stopClicking();
        matchBlocks(flippedBlocks[0], flippedBlocks[1]);
    }
};



function matchBlocks(firstBlock, secondBlock) {
    // console.log("aaaaaaa");
    let tries = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    }
    else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
}



function stopClicking() {
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}




function shuffle(array) {

    let current = array.length,
        temp,
        random;

    while (current > 0) {

        random = Math.floor(Math.random() * current);

        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
