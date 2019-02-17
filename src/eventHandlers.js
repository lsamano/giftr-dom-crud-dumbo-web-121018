// You can add your event handlers here!

// - A user should be able to see all of the gift data on initial page load
const populateGiftList = gifts => {
  document.getElementById('no-gifts').remove();
  gifts.forEach(createGiftListItem);
}

const createGiftListItem = gift => {
  const giftUnorderedList = document.getElementById('list-of-gifts')
  const li = document.createElement("li")
  li.innerHTML =
    `<hr><h2>Name: <span class="name">${gift["name"]}</span></h2><br>
    <img src=${gift["image"]} class="image"><br>`

  // Delete Button
  const button = document.createElement('button')
  button.addEventListener("click", deleteGift);
  button.innerText = "Delete This Gift"
  button.className = "ui button"
  li.append(button)

  // Edit Button
  const editButton = document.createElement('button')
  editButton.addEventListener("click", editGift);
  editButton.innerText = "Edit This Gift"
  editButton.className = "ui button"
  li.append(editButton)

  giftUnorderedList.appendChild(li)
}

// - A user should be able to search for and filter particular gifts with names that _include_ a particular search query.
const addEventToSearchBar = () => {
  const searchBar = document.getElementById("filter-input")
  searchBar.addEventListener("input", filterGiftsEvent)
}

const filterGiftsEvent = event => {
  const searchBar = document.getElementById("filter-input")
  const giftUnorderedList = document.getElementById('list-of-gifts')
  giftUnorderedList.childNodes.forEach(function(oneGift) {
    const name = oneGift.querySelector(".name").innerText
    name.includes(searchBar.value) ? oneGift.style.display = "block" : oneGift.style.display = "none";
  })
}

// - A user should be able to create a particular gift.
const activateCreationButton = () => {
  const giftForm = document.getElementById('gift-form')
  giftForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newGiftName = document.getElementById('gift-name-input').value
    const newImageSrc = document.getElementById('gift-image-input').value
    const newGift = {"name": newGiftName, "image": newImageSrc}
    createGiftListItem(newGift);

    giftForm.reset();
  });
}

// - A user should be able to delete a particular gift.
const deleteGift = event => {
  event.target.parentElement.remove();
}

// - A user (any user, don't worry about authorization) should be able to edit a gift's details.
const editGift = event => {
  const parent = event.target.parentNode;
  const name = parent.querySelector(".name").innerText;
  const image = parent.querySelector(".image").src;
  addEditFormUnderGift(parent, name, image);
}

const addEditFormUnderGift = (parent, name, image) => {
  const editForm = document.createElement('form')
  editForm.className = "ui form"
  editForm.innerHTML = `
  <hr>
  <h3> Edit Form </h3>
  <label for="name">Gift Name: </label>
  <input type="text" name="name" value="${name}">
  <label for="image">Gift Image: </label>
  <input type="text" name="image" value="${image}">
  <br>
  <button type="submit" name="button" class="ui button">Update Gift</button>
    `
  editForm.addEventListener("submit", updateGiftEvent)
  parent.append(editForm)
}

const updateGiftEvent = event => {
  event.preventDefault();
  const newName = event.target.name.value
  const newImage = event.target.image.value
  const nameLocation = event.target.parentNode.querySelector(".name")
  const imageLocation = event.target.parentNode.querySelector(".image")
  nameLocation.innerText = newName
  imageLocation.src = newImage
  event.target.remove();
}
