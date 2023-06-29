import { toggleHelper, helpersNames, isScrollHelperOff } from "./helpers";

const zSpacing = -1000;
let lastPos = zSpacing / 5;
const $frames = document.getElementsByClassName('frame');
const frames = Array.from($frames);
const zVals = []
let isScrollingStarted = false


export const setAnim = () => {
  let top = document.documentElement.scrollTop,
    //make positive or negative value for depth via scrolling
    delta = lastPos - top;

    lastPos = top

    frames.forEach((n, i) => {
      zVals.push(i * zSpacing + zSpacing)
      //for speed. Bigger num = smaller speed
      //multiply cuz delta will be too small all the time
      //multiply by negative cuz while scrolling down delta will be negative, but it is needed to make positive transform
      zVals[i] += delta * -5

      let frame = frames[i],
          transform = `translateZ(${zVals[i]}px)`

      frame.style.transform = transform
      frame.style.pointerEvents = zVals[i] > (zSpacing / 2) * -1 && i !== frames.length - 1 ? 'none' : 'auto'
      frame.style.opacity = zVals[i] > (zSpacing / 2) * -1 ? "0" : "1"
    })
}

window.onscroll = () => {
  if (!isScrollHelperOff && !isScrollingStarted ) {
    isScrollingStarted = true
    toggleHelper(helpersNames.scroll, true)
  }
  setAnim()
}


