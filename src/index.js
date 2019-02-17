document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  console.table(gifts)
  populateGiftList(gifts)
  activateCreationButton()
  addEventToSearchBar()
})
