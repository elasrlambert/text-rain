"use strict";
/**
 * @author adam
 */
const textRain = (canvas, options) => {
    const defaultVal = {
        rain: "01",
        dropSpeed: 0.1,
        dropFadeTime: 1,
        rainSpacing: 10,
        rainColor: "#0f0",
        bgColor: "rgba(0, 0, 0, 0.1)"
    };
    const { rain, dropSpeed, dropFadeTime, rainSpacing, rainColor, bgColor } = Object.assign(Object.assign({}, defaultVal), options);
    const ctx = canvas.getContext("2d");
    let strArr = rain.split("");
    let arr = Array(Math.ceil(canvas.width / rainSpacing)).fill(0);
    // console.log(arr)
    const drawRain = () => {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = rainColor;
        arr.forEach((item, index) => {
            ctx.fillText(strArr[Math.floor(Math.random() * strArr.length)], index * rainSpacing, item + rainSpacing);
            arr[index] = item > canvas.height || item > (10000 * dropFadeTime) * Math.random() ? 0 : item + 10;
        });
    };
    setInterval(drawRain, 1 / dropSpeed);
};
const canvas = document.querySelector("#rain-canvas");
canvas.width = screen.availWidth;
canvas.height = screen.availHeight;

; (async function () {

    let userInput = await prompt("请输入要生成的内容：")

    if (!userInput) userInput = "01";

    textRain(canvas, {
        rain: userInput
    });
})()

