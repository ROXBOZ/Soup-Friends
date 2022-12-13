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

const url =
  "https://api.edamam.com/api/recipes/v2?app_key=94735bf22f8e7a29177fa32152f9145c&app_id=27f9d0fc&q=soup&type=public";

const soups = () => {
  fetch(url)
    .then((response) => {
      console.log("response: ", response);
      return response.json();
    })
    .then((result) => {
      console.log("result: ", result.hits);
      const soups = result.hits;
      const labeledSoups = addLabelToSoup(soups);

      // get one more page of Soups
      // fetch(result._links.next.href)
      //   .then((response2) => {
      //     console.log("response2: ", response2);
      //     return response2.json();
      //   })
      //   .then((result2) => {
      //     console.log("result: ", result._links.next.href);
      //   })
      //   .catch((error) => {
      //     console.log("error: ", error);
      //   });

      buildGrid(labeledSoups);
      recipeButton(labeledSoups);
      createEventListener(labeledSoups);
      createEventListenerGluten(labeledSoups);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

function addLabelToSoup(soups) {
  for (let i = 0; i < soups.length; i++) {
    if (soups[i].recipe.healthLabels.includes("Vegetarian")) {
      soups[i].recipe.myDietLabel = "vegetarian";
    } else if (soups[i].recipe.healthLabels.includes("Vegan")) {
      soups[i].recipe.myDietLabel = "vegan";
    } else {
      soups[i].recipe.myDietLabel = "meaty";
    }
  }
  return soups;
}

function buildGrid(soups) {
  const container = document.getElementById("recipe-page-container");
  container.setAttribute("class", "container-xxl");

  const row = document.getElementById("soups-container");
  row.style.maxWidth = "100vw";
  row.innerHTML = "";

  for (i = 0; i < soups.length; i++) {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute(
      "class",
      "pb-4 grid-container col-xs-12 col-md-6 col-lg-4"
    );
    cardContainer.setAttribute("id", "cardContainer");
    row.append(cardContainer);

    const card = document.createElement("div");
    card.setAttribute("class", "card border-primary"); // add h-100 to have them all same height
    card.style.overflow = "hidden"; // because of rounded border
    cardContainer.append(card);

    const cardImg = document.createElement("img");
    const recipeImg = soups[i].recipe.image;
    cardImg.src = recipeImg;
    cardImg.alt = soups[i].title;
    card.append(cardImg);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    card.append(cardBody);

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = soups[i].recipe.label;
    cardBody.append(cardTitle);

    const cardButton = document.createElement("button");
    cardButton.setAttribute("class", "recipe-btn btn btn-primary");
    cardButton.setAttribute("value", i); // each button have the soup index as value
    cardButton.innerText = "Check Recipe";
    cardBody.append(cardButton);
  }
}

function recipeButton(soups) {
  const recipeButtons = document.querySelectorAll(".recipe-btn");
  recipeButtons.forEach((recipeButton) => {
    recipeButton.addEventListener("click", (event) => {
      const clickedSoupId = event.target.value; //How does it know what is recipeButton ?
      createModal(soups, clickedSoupId);
    });
  });
}

function createModal(soups, i) {
  const cardModal = document.createElement("div");
  const cardContainer = document.getElementById("cardContainer");
  cardModal.setAttribute("class", "modal p-xs-0 p-md-5 mx-auto");
  cardModal.style.display = "block";
  const modalContent = document.createElement("div");
  modalContent.setAttribute(
    "class",
    "modal-content bg-white h-xs-100 h-md-auto w-xs-100 w-md-75 p-2 border-primary mx-auto"
  );
  cardModal.append(modalContent);
  cardContainer.append(cardModal);

  const modalCloseIcon = document.createElement("i");
  modalCloseIcon.setAttribute(
    "class",
    "close text-primary fa-solid fa-xmark m-3"
  );
  modalContent.append(modalCloseIcon);
  modalCloseIcon.addEventListener("click", () => {
    cardModal.style.display = "none";
  });

  const modalText = document.createElement("div");
  modalText.setAttribute("class", "container recipe px-5 pb-5");
  modalContent.append(modalText);

  const modalTitle = document.createElement("h2");
  modalTitle.setAttribute("class", "mb-5");
  modalTitle.innerText = soups[i].recipe.label;
  modalText.append(modalTitle);

  const modalRow = document.createElement("div");
  modalRow.setAttribute("class", "row");
  modalText.append(modalRow);

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.setAttribute("class", "ingredients");
  const ingUl = document.createElement("ul");
  ingUl.setAttribute("id", "ingList");
  ingUl.style.maxWidth = "45ch";
  modalRow.append(ingredientsContainer);

  const iconsContainer = document.createElement("div");
  iconsContainer.setAttribute("class", "icons-container alert alert-primary");

  const recipeTime = soups[i].recipe.totalTime;
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

  const dietContainer = document.createElement("span");
  dietContainer.setAttribute("class", "icon-container");
  const whatIsDiet = soups[i].recipe.myDietLabel;

  if (whatIsDiet === "vegetarian") {
    const vegetarianIcon = document.createElement("i");
    vegetarianIcon.setAttribute("class", "fa-solid fa-carrot m-1");
    const vegetarianText = "vegetarian";
    dietContainer.append(vegetarianIcon);
    dietContainer.append(vegetarianText);

    if (whatIsDiet === "vegan") {
      const veganIcon = document.createElement("i");
      veganIcon.setAttribute("class", "fa-solid fa-leaf m-1");
      const veganText = "vegan";
      dietContainer.append(veganIcon);
      dietContainer.append(veganText);
    }
  } else {
    const meatyIcon = document.createElement("i");
    meatyIcon.setAttribute("class", "fa-solid fa-drumstick-bite m-1");
    const meatyText = "meaty";
    dietContainer.append(meatyIcon);
    dietContainer.append(meatyText);
  }
  iconsContainer.append(dietContainer);

  const glutenContainer = document.createElement("span");
  glutenContainer.setAttribute("class", "icon-container");
  const soupHealthLabel = soups[i].recipe.healthLabels;
  if (soupHealthLabel.includes("Gluten-Free")) {
    const glutenIcon = document.createElement("i");
    glutenIcon.setAttribute("class", "fa-solid fa-bowl-rice m-1");
    const glutenText = "gluten free";
    glutenContainer.append(glutenIcon);
    glutenContainer.append(glutenText);
  } else {
    const glutenIcon = document.createElement("i");
    glutenIcon.setAttribute("class", "fa-solid fa-wheat-awn m-1");
    const glutenText = "contains gluten";
    glutenContainer.append(glutenIcon);
    glutenContainer.append(glutenText);
  }
  iconsContainer.append(glutenContainer);

  ingredientsContainer.append(iconsContainer);
  ingredientsContainer.append(ingUl);

  const ingList = document.getElementById("ingList");
  const ingredientLines = soups[i].recipe.ingredientLines;
  for (let j = 0; j < ingredientLines.length; j++) {
    const ingListItem = document.createElement("li");
    ingListItem.innerText = ingredientLines[j];
    ingUl.append(ingListItem);
  }

  const body = document.querySelector("body");
  body.addEventListener("click", (event) => {
    if (event.target == cardModal) {
      cardModal.style.display = "none";
    }
  });
}

/* Filter Diets */

function createEventListener(soups) {
  const radio = document.getElementsByName("diet");
  radio.forEach((radioButton) => {
    radioButton.addEventListener("click", (event) => {
      filterDiet(soups, event);
    });
  });
}

function filterDiet(soups, event) {
  const selectedDiet = event.target.value;
  const filteredSoups = soups.filter(
    (soup) =>
      (selectedDiet === "all" && soup) ||
      soup.recipe.myDietLabel === selectedDiet
  );
  console.log("filteredSoups :", filteredSoups);
  buildGrid(filteredSoups);
}

/* Filter Gluten */

// function createEventListenerGluten(soups) {
//   // should be able to make only one function
//   const checkbox = document.getElementById("gluten-check");
//   checkbox.forEach((checkbox) => {
//     checkbox.addEventListener("click", (event) => {
//       glutenFreeDiet(soups, event);
//     });
//   });
// }

// function glutenFreeDiet(soups, event) {
//   console.log("gluten free diet");
// }

soups();
