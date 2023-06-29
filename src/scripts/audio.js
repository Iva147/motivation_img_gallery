import { helpersNames, isAudioHelperOff, toggleHelper } from "./helpers";

const audio = document.querySelector('.audio')
const soundBtn = document.querySelector('.sound-btn')

let isOncePlayed = false
const paused = 'paused'

window.onfocus = () => {
  if(!isOncePlayed) return
  soundBtn.classList.contains(paused) || audio.play()
}
window.onblur = () => {
  audio.pause()
}

const toggleAudio = () => {
  if(audio.paused ) {
    audio.play()
    soundBtn.classList.remove(paused)
  } else {
    audio.pause()
    soundBtn.classList.add(paused)
  }
}
soundBtn.onclick = () => {
  if (!isAudioHelperOff && !isOncePlayed ) {
    isOncePlayed = true
    toggleHelper(helpersNames.audio, true)
  }
  toggleAudio()
}


