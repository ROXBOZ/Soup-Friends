/* EDAMAM Grid */

// 1. fetch the API with AJAX
const url =
  "https://api.edamam.com/api/recipes/v2?app_key=e51bcbcbffcb38a9c409dcf3eefbda24&app_id=c2bb6cfc&q=soup&type=public";

const soups = () => {
  fetch(url)
    .then((response) => {
      console.log("response: ", response);
      return response.json();
    })
    .then((result) => {
      console.log("result: ", result.hits);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
soups();

// 2. DOM manipulation
function buildGrid() {
  const container = document.getElementById("recipe-page-container");
  //rows
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  container.append(row);

  for (i = 0; i < soups.length; i++) {
    // col-grid
    const greatContainer = document.createElement("div");
    greatContainer.setAttribute(
      "class",
      "col-sm-12 col-md-2 col-lg-4 pb-4 grid-container h-100"
    );
    row.append(greatContainer);

    // cards
    const card = document.createElement("div");
    card.setAttribute("class", "card border-primary h-100");
    greatContainer.append(card);

    // card images
    const cardImg = document.createElement("img");
    cardImg.src = "assets/images/soup.png";
    cardImg.setAttribute("style", "padding: 1rem");
    cardImg.alt = soups[i]["title"];
    card.append(cardImg);

    // card body
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);

    // card title
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = soups[i]["recipe"]["label"]; //replacement
    cardBody.append(cardTitle);

    // card Button
    const cardButton = document.createElement("button");
    cardButton.setAttribute("id", "recipeOpen");
    cardButton.setAttribute("class", "btn btn-primary");
    cardButton.innerText = "Recipe";
    cardBody.append(cardButton);
    cardButton.addEventListener("click", () => {
      cardModal.style.display = "block";
    });

    // modal inc. background
    const cardModal = document.createElement("div");
    cardModal.setAttribute("id", "cardModal");
    cardModal.setAttribute("class", "modal p-5 mx-auto");
    cardModal.style.display = "none";
    cardModal.style.position = "fixed";
    cardModal.style.zIndex = "1";
    cardModal.style.overflow = "auto";
    cardModal.style.width = "100%";
    cardModal.style.height = "100%";
    cardModal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    greatContainer.append(cardModal);

    // modal box
    const modalContent = document.createElement("div");
    modalContent.setAttribute(
      "class",
      "modal-content bg-white w-75 p-2 border-primary mx-auto"
    );
    cardModal.append(modalContent);

    //  modal close button
    const modalClose = document.createElement("i");
    modalClose.setAttribute(
      "class",
      "close text-primary fa-solid fa-xmark m-3"
    );
    modalClose.style.textAlign = "right"; /* text-right bs-class doesn't work */
    modalClose.style.fontSize = "200%";
    modalClose.style.justifySelf = "flex-end";
    modalClose.style.fontWeight = "bold";
    modalContent.append(modalClose);
    modalClose.addEventListener("click", () => {
      cardModal.style.display = "none";
    });

    //modal content container
    const modalText = document.createElement("div");
    modalText.setAttribute("class", "container recipe px-5 pb-5");
    modalContent.append(modalText);

    //title
    const modalTitle = document.createElement("h2");
    modalTitle.setAttribute("class", "mb-5");
    modalTitle.innerText = soups[i]["recipe"]["label"]; //replacement
    modalText.append(modalTitle);

    //row
    const modalRow = document.createElement("div");
    modalRow.setAttribute("class", "row");
    modalText.append(modalRow);

    // col 1 = ingredients
    const recipeIng = document.createElement("div");
    recipeIng.setAttribute("class", "ingredients col-md-4");
    const ingList = document.createElement("ul");
    const extIng = soups[i]["recipe"]["ingredientLines"]; // replacement + rename extIng
    modalRow.append(recipeIng);
    // for (i = 0; i < extIng.length; i++) {
    //   const ingName = extIng[i]["name"]; //replacement
    //   const ingListItem = document.createElement("li");
    //   ingListItem.innerText = ingName;
    //   ingList.append(ingListItem);
    // }
    // recipeIng.append(ingList);

    //col 2
    const secondCol = document.createElement("div");
    secondCol.setAttribute("class", "col-md-8");
    modalRow.append(secondCol);

    // icons container
    const iconsContainer = document.createElement("p");
    iconsContainer.setAttribute("class", "icons-container");
    secondCol.append(iconsContainer);

    // time
    const timeContainer = document.createElement("span");
    timeContainer.setAttribute("class", "time-container mr-5");
    const alarmIcon = document.createElement("i");
    alarmIcon.setAttribute("class", "fa-solid fa-bell m-1");
    const recipeTime = `${soups[i]["recipe"]["totalTime"]} min.`; //replacement
    iconsContainer.append(timeContainer);
    timeContainer.append(alarmIcon);
    timeContainer.append(recipeTime);

    // vegan
    // const isItVegan = soup["vegan"]; //replacement
    // const veganContainer = document.createElement("span");
    // veganContainer.setAttribute("class", "vegan-container");
    // if (isItVegan === true) {
    //   const itIsVeganText = "vegan";
    //   const itIsVegan = document.createElement("i");
    //   itIsVegan.setAttribute("class", "fa-solid fa-leaf m-1");
    //   veganContainer.append(itIsVegan);
    //   veganContainer.append(itIsVeganText);
    // } else {
    //   const itIsNotVeganText = "not vegan";
    //   const itIsNotVegan = document.createElement("i");
    //   itIsNotVegan.setAttribute("class", "fa-solid fa-skull m-1");
    //   veganContainer.append(itIsNotVegan);
    //   veganContainer.append(itIsNotVeganText);
    // }
    // iconsContainer.append(veganContainer);

    //gluten
    // const isItglutenFree = soup["glutenFree"]; //replacement
    // const glutenContainer = document.createElement("span");
    // if (isItglutenFree === true) {
    //   const itIsglutenFreeText = "gluten free";
    //   const itIsglutenFree = document.createElement("i");
    //   itIsglutenFree.setAttribute("class", "fa-solid fa-bowl-rice m-1");
    //   glutenContainer.append(itIsglutenFree);
    //   glutenContainer.append(itIsglutenFreeText);
    // } else {
    //   const itIsNotglutenFreeText = "not vegan";
    //   const itIsNotglutenFree = document.createElement("i");
    //   itIsNotglutenFree.setAttribute("class", "fa-solid fa-wheat m-1");
    //   glutenContainer.append(itIsNotglutenFree);
    //   glutenContainer.append(itIsNotglutenFreeText);
    // }
    // iconsContainer.append(glutenContainer);

    // instructions
    // const instructionText = document.createElement("p");
    // instructionText.setAttribute("class", "instruction-text");
    // const recipeInstruction = soup["instructions"]; //replacement
    // if (recipeInstruction === true) {
    //   instructionText.append(recipeInstruction);
    // } else {
    //   instructionText.innerText =
    //     "There is no instructions for this recipe. But what could go wrong anyways?";
    // }
    // secondCol.append(instructionText);

    /* quit the modal when clicking outside */
    const body = document.querySelector("body");
    body.addEventListener("click", (event) => {
      if (event.target == cardModal) {
        cardModal.style.display = "none";
      }
    });
  }
}

buildGrid();

/* show more button */
function showMore() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("showMoreButton");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
