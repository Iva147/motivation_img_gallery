import 'core-js/stable'
import '~/index.html'
import '~/style/index.scss'
import './3Dscroll'
import './audio'
import './backBtn'

import { hideLoader } from "./loader";
import { setAnim } from "./3Dscroll";
import { checkHelpers } from "./helpers";

document.addEventListener("DOMContentLoaded", () => {
  hideLoader()
  setAnim()
  checkHelpers()
})