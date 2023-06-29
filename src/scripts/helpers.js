import { getStorage, setStorage, removeStorage } from "./utils";

const getScrollHelper = document.querySelector('.helper--scroll')
const getAudioHelper = document.querySelector('.helper--audio')

const keys = {
  scroll: 'isScrollHelperOff',
  audio: 'isAudioHelperOff'
}
export let isScrollHelperOff = !!getStorage(keys.scroll)
export let isAudioHelperOff = !!getStorage(keys.audio)

export const helpersNames = {
  scroll: 'scroll',
  audio: 'audio'
}

export const setHelperVal = (helper, newVal) => {
  if (helper  === helpersNames.scroll) {
    isScrollHelperOff = newVal
  }

  if (helper  === helpersNames.audio) {
    isAudioHelperOff = newVal
  }
}

const helpers = {
  scroll: {
    elem: getScrollHelper,
    key: keys.scroll,
  },
  audio: {
    elem: getAudioHelper,
    key: keys.audio,
  }
}

export const toggleHelper = (helper, off) => {
  const elem = helpers[helper].elem
  const key = helpers[helper].key

  if (off) {
    elem.classList.add('disabled')
    setStorage(key, off)
  } else {
    elem.classList.remove('disabled')
    removeStorage(key)
  }

  setHelperVal(helper, off)
}
export const checkHelpers = () => {
  toggleHelper(helpersNames.scroll, isScrollHelperOff)
  toggleHelper(helpersNames.audio, isAudioHelperOff)
}


