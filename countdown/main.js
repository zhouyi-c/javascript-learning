const timeInput = document.getElementById('timeInput');
const startBtn = document.getElementById('startBtn');
const display = document.getElementById('display');

let currentTime = 0;
let timer = null;

function startCountdown() {
    currentTime = parseInt(timeInput.value);//文字转数字

    timer = setInterval(function () {
        display.textContent = currentTime;
        currentTime--;
        if (currentTime < 0) {
            clearInterval(timer);
            display.textContent = 'timeover';
        }
    }, 1000);
    /* 
    setInterval就像一个不停的闹钟：

    // setInterval 语法：
setInterval(function() {
    // 这里的代码会重复执行
    console.log("每秒执行一次");
}, 1000);
    */
}

startBtn.addEventListener('click', startCountdown);

