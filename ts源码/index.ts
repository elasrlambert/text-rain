/**
 * @author adam
 */

/**
 * @description 可选配置
 */
interface Options {
  /** @param rain 组成文字雨的内容，默认是01 */
  rain?: string,
  /** @param dropSpeed 文字雨滑落的速度，默认是0.1 ，不建议超过0.2*/
  dropSpeed?: number,
  /** @param dropFadeTime 文字雨消失的时间，默认是1 */
  dropFadeTime?: number,
  /** @param rainSpacing 雨滴的间隔，默认是10 */
  rainSpacing?: number,
  /** @param rainColor 雨滴的颜色，默认是"#0f0"*/
  rainColor?: string,
  /** @param bgColor 画布背景颜色， 默认是rgba(0, 0, 0, 0.008) */
  bgColor?: string
}
const textRain = (canvas: HTMLCanvasElement, options?: Options) => {
  const defaultVal = {
    rain: "01",
    dropSpeed: 0.1,
    dropFadeTime: 1,
    rainSpacing: 10,
    rainColor: "#0f0",
    bgColor: "rgba(0, 0, 0, 0.1)"
  };

  const {
    rain,
    dropSpeed,
    dropFadeTime,
    rainSpacing,
    rainColor,
    bgColor
  } = { ...defaultVal, ...options };
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  let strArr: Array<string> = rain.split("");

  let arr = Array(Math.ceil(canvas.width / rainSpacing)).fill(0);

  // console.log(arr)

  const drawRain = () => {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = rainColor;
    arr.forEach((item, index) => {
      ctx.fillText(strArr[Math.floor(Math.random() * strArr.length)], index * rainSpacing, item + rainSpacing)
      arr[index] = item > canvas.height || item > (10000 * dropFadeTime) * Math.random() ? 0 : item + 10;
    })
  }

  setInterval(drawRain, 1 / dropSpeed)
}


const canvas: HTMLCanvasElement = document.querySelector("#rain-canvas") as HTMLCanvasElement;
canvas.width = screen.availWidth;
canvas.height = screen.availHeight;
textRain(canvas, {
  bgColor: "rgba(0,0,0,0.08)"
})