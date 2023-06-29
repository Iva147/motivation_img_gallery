import { setAnim } from "./3Dscroll";

const backBtn = document.getElementById('back')
backBtn.addEventListener('click', () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  })

  setAnim()
})