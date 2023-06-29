export const hideLoader = () => {
  const loader = document.querySelector(".loader")
  loader.style.display = 'none'
  document.body.style.overflow= "auto"
}