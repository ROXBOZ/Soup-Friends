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

/* Build Grid */

function buildGrid() {
  const container = document.getElementById("soup-container");
  /* Create Rows */
  const row = document.createElement("div");
  row.setAttribute("class", "row");

  for (i = 0; i < soups.length; i++) {
    // /* Create Columns */
    const col = document.createElement("div");
    col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 pb-4");

    /* Create Recipe Container */
    const recipeContainer = document.createElement("div");
    recipeContainer.setAttribute("class", "recipe-container h-100");

    /* Create Cards */
    const card = document.createElement("div");
    card.setAttribute("class", "card border-primary h-100");

    /* Create Card image */
    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    // img.src = soups[i]["image"];
    img.src = "assets/images/soup.png";
    img.setAttribute("style", "padding: 1rem");
    img.alt = soups[i]["title"];

    /* Create Card Body */
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    /* Create Card Title */
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = soups[i]["title"];

    /* Create Card Link */
    const cardButton = document.createElement("button");
    cardButton.setAttribute("id", "recipeOpen");
    cardButton.setAttribute("class", "btn btn-primary");
    cardButton.innerText = "Recipe";
    cardButton.addEventListener("click", () => {
      cardModal.style.display = "block";
    });

    /* Create Modal */
    const cardModal = document.createElement("div");
    cardModal.setAttribute("id", "cardModal"); // modal screen with black background
    cardModal.setAttribute("class", "modal p-5 mx-auto");
    /* Modal Styling */
    cardModal.style.display = "none";
    cardModal.style.position = "fixed";
    cardModal.style.zIndex = "1";
    cardModal.style.overflow = "auto";
    cardModal.style.width = "100%";
    cardModal.style.height = "100%";
    cardModal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

    const modalContent = document.createElement("div"); // modal white box
    modalContent.setAttribute(
      "class",
      "modal-content bg-white w-75 p-2 border-primary mx-auto"
    );
    modalContent.style.display = "grid";

    // Modal Close Button
    const modalClose = document.createElement("i");
    modalClose.setAttribute(
      "class",
      "close text-primary fa-solid fa-xmark m-3"
    );
    modalClose.style.fontSize = "200%";
    modalClose.style.justifySelf = "flex-end";
    modalClose.style.fontWeight = "bold";
    modalClose.addEventListener("click", () => {
      cardModal.style.display = "none";
    });

    /* Recipe inside modal */
    const modalText = document.createElement("div");
    modalText.setAttribute("class", "recipe px-5");
    const modalTitle = document.createElement("h2");
    modalTitle.setAttribute("class", "mb-5");
    modalTitle.innerText = soups[i]["title"]; // Repetition
    const recipeIng = document.createElement("div");
    recipeIng.setAttribute("class", "ingredients");
    const ingList = document.createElement("ul");
    const extIng = cucumber["extendedIngredients"]; // Replace cucumber

    /* Listing Ingredients */
    for (i = 0; i < extIng.length; i++) {
      const ingName = extIng[i]["name"];
      const ingListItem = document.createElement("li");
      ingListItem.innerText = ingName;
      ingList.append(ingListItem);
    }

    /* Icons */

    //time
    const iconsContainer = document.createElement("p");
    iconsContainer.setAttribute("class", "icons-container");
    const timeContainer = document.createElement("span");
    timeContainer.setAttribute("class", "time-container mr-5");
    const alarmIcon = document.createElement("i");
    alarmIcon.setAttribute("class", "fa-solid fa-bell m-1");
    const recipeTime = `${cucumber["readyInMinutes"]} min.`;

    //vegan
    const isItVegan = cucumber["vegan"];
    const veganContainer = document.createElement("span");
    veganContainer.setAttribute("class", "vegan-container");
    if (isItVegan === true) {
      const itIsVeganText = "vegan";
      const itIsVegan = document.createElement("i");
      itIsVegan.setAttribute("class", "fa-solid fa-leaf m-1");
      veganContainer.append(itIsVegan);
      veganContainer.append(itIsVeganText);
    } else {
      const itIsNotVeganText = "not vegan";
      const itIsNotVegan = document.createElement("i");
      itIsNotVegan.setAttribute("class", "fa-solid fa-skull m-1");
      veganContainer.append(itIsNotVegan);
      veganContainer.append(itIsNotVeganText);
    }

    //gluten
    const isItglutenFree = cucumber["glutenFree"];
    const glutenContainer = document.createElement("span");
    if (isItglutenFree === true) {
      const itIsglutenFreeText = "gluten free";
      const itIsglutenFree = document.createElement("i");
      itIsglutenFree.setAttribute("class", "fa-solid fa-bowl-rice m-1");
      glutenContainer.append(itIsglutenFree);
      glutenContainer.append(itIsglutenFreeText);
    } else {
      const itIsNotglutenFreeText = "not vegan";
      const itIsNotglutenFree = document.createElement("i");
      itIsNotglutenFree.setAttribute("class", "fa-solid fa-wheat m-1");
      glutenContainer.append(itIsNotglutenFree);
      glutenContainer.append(itIsNotglutenFreeText);
    }

    /* How to */
    const instructionText = document.createElement("p");
    instructionText.setAttribute("class", "instruction-text");
    const recipeInstruction = cucumber["instructions"];
    if (recipeInstruction === true) {
      instructionText.append(recipeInstruction);
    } else {
      instructionText.innerText =
        "There is no instructions for this recipe. What could go wrong anyways?";
    }

    /* Generator */
    container.append(row);
    row.append(col);
    col.append(recipeContainer);
    recipeContainer.append(card);
    card.append(img);
    card.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardButton);
    recipeContainer.append(cardModal);
    cardModal.append(modalContent);
    modalContent.append(modalClose);
    modalContent.append(modalText);
    modalText.append(modalTitle);
    modalText.append(recipeIng);
    recipeIng.append(ingList);
    modalText.append(iconsContainer);
    iconsContainer.append(timeContainer);
    timeContainer.append(alarmIcon);
    timeContainer.append(recipeTime);
    iconsContainer.append(veganContainer);
    iconsContainer.append(glutenContainer);
    modalText.append(instructionText);

    const body = document.querySelector("body");
    body.addEventListener("click", (event) => {
      if (event.target == cardModal) {
        cardModal.style.display = "none";
      }
    });
  }
}

buildGrid();
