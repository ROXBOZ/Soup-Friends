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
      const soups = result.hits;
      buildGrid(soups);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// 2. Build Grid

function buildGrid(soups) {
  const container = document.getElementById("recipe-page-container");
  container.setAttribute("class", "container-xxl");

  //rows
  const row = document.createElement("div");
  row.setAttribute("class", "row");
  row.style.maxWidth = "100vw";
  container.append(row);

  // cols
  for (i = 0; i < soups.length; i++) {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute(
      "class",
      "pb-4 grid-container col-xs-12 col-md-6 col-lg-4"
    );
    cardContainer.setAttribute("id", "cardContainer");
    row.append(cardContainer);

    // cards
    const card = document.createElement("div");
    card.setAttribute("class", "card border-primary h-100");
    card.style.overflow = "hidden";
    cardContainer.append(card);

    // card images
    const cardImg = document.createElement("img");
    const recipeImg = soups[i]["recipe"]["image"];
    cardImg.src = recipeImg;
    cardImg.alt = soups[i]["title"];
    card.append(cardImg);

    // card body
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);

    // card title
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = soups[i]["recipe"]["label"];
    cardBody.append(cardTitle);

    // card Button
    const cardButton = document.createElement("button");
    cardButton.setAttribute("id", "recipeOpen");
    cardButton.setAttribute("value", i);
    cardButton.setAttribute("class", "btn btn-primary");
    cardButton.innerText = "Recipe";
    cardBody.append(cardButton);
  }
  recipeButton(soups);
}
soups();

// Recipe Button

function recipeButton(soups) {
  const recipieButtons = document.querySelectorAll("#recipeOpen");
  recipieButtons.forEach((recipieButton) => {
    recipieButton.addEventListener("click", (e) => {
      console.log("button clicked 1");
      const clickedSoupId = e.target.value;
      createModal(soups, clickedSoupId);
      console.log("button clicked 2");
      console.log("button clicked 3");
    });
  });
}

// Create Modal

function createModal(soups, i) {
  const cardModal = document.createElement("div");
  const cardContainer = document.getElementById("cardContainer");
  cardModal.setAttribute("id", "cardModal");
  cardModal.setAttribute("class", "modal p-xs-0 p-md-5 mx-auto");
  cardContainer.append(cardModal);
  cardModal.style.display = "block";
  const modalContent = document.createElement("div");
  modalContent.setAttribute(
    "class",
    "modal-content bg-white h-xs-100 h-md-auto w-xs-100 w-md-75 p-2 border-primary mx-auto"
  );
  cardModal.append(modalContent);

  //  modal close button
  const modalClose = document.createElement("i");
  modalClose.setAttribute("class", "close text-primary fa-solid fa-xmark m-3");
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
  modalTitle.innerText = soups[i]["recipe"]["label"];
  modalText.append(modalTitle);

  //row
  const modalRow = document.createElement("div");
  modalRow.setAttribute("class", "row");
  modalText.append(modalRow);

  // col 1 = ingredients
  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.setAttribute("class", "ingredients col-md-6");
  const ingUl = document.createElement("ul");
  ingUl.setAttribute("id", "ingList");
  ingUl.style.maxWidth = "45ch";
  modalRow.append(ingredientsContainer);
  ingredientsContainer.append(ingUl);

  //col 2
  const secondCol = document.createElement("div");
  secondCol.setAttribute("class", "col-md-6");
  modalRow.append(secondCol);

  // icons container
  const iconsContainer = document.createElement("p");
  iconsContainer.setAttribute("class", "icons-container");
  secondCol.append(iconsContainer);

  // time
  const recipeTime = soups[i]["recipe"]["totalTime"];
  if (recipeTime !== 0) {
    const timeContainer = document.createElement("span");
    timeContainer.setAttribute("class", "icon-container mr-5");
    const alarmIcon = document.createElement("i");
    alarmIcon.setAttribute("class", "fa-solid fa-bell m-1");
    const timeContainerText = `${recipeTime} min.`;
    timeContainer.append(alarmIcon);
    timeContainer.append(timeContainerText);
    iconsContainer.append(timeContainer);
  }

  // vegetarian
  const vegetarianContainer = document.createElement("span");
  const isItVegetarian = soups[i]["recipe"]["healthLabels"];
  vegetarianContainer.setAttribute("class", "icon-container");
  if (isItVegetarian.includes("Vegetarian")) {
    const itIsVegetarian = document.createElement("i");
    itIsVegetarian.setAttribute("class", "fa-solid fa-carrot m-1");
    const itIsVegetarianText = "vegetarian";
    vegetarianContainer.append(itIsVegetarian);
    vegetarianContainer.append(itIsVegetarianText);
    //vegan
    const veganContainer = document.createElement("span");
    const isItVegan = soups[i]["recipe"]["healthLabels"];
    veganContainer.setAttribute("class", "icon-container");
    if (isItVegan.includes("Vegan")) {
      const itIsVegan = document.createElement("i");
      itIsVegan.setAttribute("class", "fa-solid fa-leaf m-1");
      const itIsVeganText = "vegan";
      veganContainer.append(itIsVegan);
      veganContainer.append(itIsVeganText);
    }
    iconsContainer.append(veganContainer);
  } else {
    const itIsNotVegetarian = document.createElement("i");
    itIsNotVegetarian.setAttribute("class", "fa-solid fa-drumstick-bite m-1");
    const itIsNotVegetarianText = "meaty";
    vegetarianContainer.append(itIsNotVegetarian);
    vegetarianContainer.append(itIsNotVegetarianText);
  }
  iconsContainer.append(vegetarianContainer);

  //gluten
  const glutenContainer = document.createElement("span");
  const isItglutenFree = soups[i]["recipe"]["healthLabels"];
  if (isItglutenFree.includes("Gluten-Free")) {
    const itIsglutenFree = document.createElement("i");
    itIsglutenFree.setAttribute("class", "fa-solid fa-bowl-rice m-1");
    const itIsglutenFreeText = "gluten free";
    glutenContainer.append(itIsglutenFree);
    glutenContainer.append(itIsglutenFreeText);
  } else {
    const itIsNotglutenFree = document.createElement("i");
    itIsNotglutenFree.setAttribute("class", "fa-solid fa-wheat-awn m-1");
    const itIsNotglutenFreeText = "contains gluten";
    glutenContainer.append(itIsNotglutenFree);
    glutenContainer.append(itIsNotglutenFreeText);
  }
  iconsContainer.append(glutenContainer);

  //redirection blog
  const instructionText = document.createElement("p");
  const instructionLink = document.createElement("a");
  instructionLink.style.fontWeight = "bold";
  const redirectionIcon = document.createElement("i");
  redirectionIcon.setAttribute("class", "fa-solid fa-diamond-turn-right");
  const instructionUrl = soups[i]["recipe"]["url"];
  const blogName = soups[i]["recipe"]["source"];
  instructionLink.href = instructionUrl;
  instructionLink.innerText = ` Instruction on ${blogName}`;
  instructionText.append(redirectionIcon);
  instructionText.append(instructionLink);
  secondCol.append(instructionText);

  const ingList = document.getElementById("ingList");
  ingList.innerText = "";

  const ingredientLinesArray = soups[i].recipe.ingredientLines;
  for (let j = 0; j < ingredientLinesArray.length; j++) {
    const ingListItem = document.createElement("li");
    ingListItem.innerText = ingredientLinesArray[j];
    ingUl.append(ingListItem);
  }

  /* quit the modal when clicking outside */
  const body = document.querySelector("body");
  body.addEventListener("click", (event) => {
    if (event.target == cardModal) {
      cardModal.style.display = "none";
    }
  });
}

/* show more button on home page */
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
