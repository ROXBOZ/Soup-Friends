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

// const promise0 = fetch(
//   `https://api.edamam.com/api/recipes/v2?app_key=${API_KEY}&app_id=${API_ID}&q=soup&type=public`
// );
// const promise1 = fetch(
//   `https://api.edamam.com/api/recipes/v2?q=soup&app_key=${API_KEY}&_cont=CHcVQBtNNQphDmgVQntAEX4BYlFtAAoARWRAA2IbYVZ6AwcAUXlSATdHYgB2BQYDFjMTB2YTNQYgDQRTQDdABWUXZlElAwQVLnlSVSBMPkd5AAMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=${API_ID}`
// );
// const promises = [promise0, promise1];

// Promise.allSettled(promises)
//   .then(() => {
//     responses.forEach(reponse){
//       (response) => {
//        return response.json();
//     } }

//   })
//   .then((results) => {
//     results.forEach((result) => {
//       console.log("result: ", result.hits);
//       soups = result.hits;
//     });
//   });

const url1 = `https://api.edamam.com/api/recipes/v2?app_key=${API_KEY}&app_id=${API_ID}&q=soup&type=public`;
const url2 = `https://api.edamam.com/api/recipes/v2?q=soup&app_key=${API_KEY}&_cont=CHcVQBtNNQphDmgVQntAEX4BYlFtAAoARWRAA2IbYVZ6AwcAUXlSATdHYgB2BQYDFjMTB2YTNQYgDQRTQDdABWUXZlElAwQVLnlSVSBMPkd5AAMbUSYRVTdgMgksRlpSAAcRXTVGcV84SU4%3D&type=public&app_id=${API_ID}`;

const soups = () => {
  let soups;

  fetch(url1)
    .then((response) => {
      console.log("response: ", response);
      return response.json();
    })
    .then((result) => {
      console.log("result: ", result.hits);
      soups = result.hits;
      console.log("soup: ", soups);
      return fetch(url2);
    })
    .then((response2) => {
      console.log("response2: ", response2);
      return response2.json();
    })
    .then((result2) => {
      console.log("result2: ", result2.hits);
      let soup2 = result2.hits;
      soups = [...soups, ...soup2];
      console.log("soup2: ", soups);

      const labeledSoups = addLabelToSoup(soups);
      createEventListener(labeledSoups);
      buildGrid(labeledSoups);
      console.log("soup :", soups);
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
    if (soups[i].recipe.healthLabels.includes("Gluten-Free")) {
      soups[i].recipe.isGlutenFree = true;
    } else {
      soups[i].recipe.isGlutenFree = false;
    }
  }
  return soups;
}

function buildGrid(soups) {
  const container = document.getElementById("recipe-page-container");
  container.setAttribute("class", "container-xxl");

  const row = document.getElementById("soups-container");

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
    card.style.overflow = "hidden";
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
    cardButton.setAttribute("value", i);
    cardButton.innerText = "Check Recipe";
    cardBody.append(cardButton);
    cardBody.addEventListener("click", (event) => {
      const clickedSoupId = event.target.value;
      createModal(soups, clickedSoupId);
    });
  }
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

/* Add Event Listeners */
function createEventListener(soups) {
  const radio = document.getElementsByName("diet");
  const checkbox = document.getElementById("gluten");
  radio.forEach((radioButton) => {
    radioButton.addEventListener("click", () => {
      combinedFilters(soups);
    });
  });

  checkbox.addEventListener("click", () => {
    // if (checkbox.checked === true) {
    combinedFilters(soups);
    // }
  });
}

function combinedFilters(soups) {
  // const selectedDiet = e.target.value;
  const selectedDiet = document.querySelector("input[name=diet]:checked").value;
  console.log("selectedDiet :", selectedDiet);
  const checkbox = document.getElementById("gluten");
  const checkboxIsChecked = checkbox.checked === true;
  console.log("checkboxIsChecked :", checkboxIsChecked);
  const filteredSoups = soups.filter((soup, index) => {
    return (
      // scenario where no specific diet is selected and no glutenfree is checked
      (selectedDiet === "all" && !checkboxIsChecked && soup) ||
      // scenario where no specific diet is selected but gluten free is checked
      (selectedDiet === "all" &&
        checkboxIsChecked &&
        soup.recipe.isGlutenFree === true) ||
      // scenario where a diet is selected but glutenfree option is not checked
      (selectedDiet !== "all" &&
        !checkboxIsChecked &&
        soup.recipe.myDietLabel === selectedDiet) ||
      // scenario where a diet is selected and also glutenfree option is checked
      (selectedDiet !== "all" &&
        checkboxIsChecked &&
        soup.recipe.myDietLabel === selectedDiet &&
        soup.recipe.isGlutenFree === true)
    );
  });
  // const filteredSoups = soups.filter((soup) => {
  //   if (selectedDiet) {
  //     return (
  //       (selectedDiet === "all" && soup) ||
  //       soup.recipe.myDietLabel === selectedDiet
  //     );
  //   } else if (checkboxIsChecked) {
  //     return soup.recipe.myGlutenLabel === "glutenfree";
  //   } else if (selectedDiet && checkboxIsChecked) {
  //     return (
  //       (selectedDiet === "all" && soup) ||
  //       (soup.recipe.myDietLabel === selectedDiet &&
  //         soup.recipe.myGlutenLabel === "glutenfree")
  //     );
  //   }
  // });

  buildGrid(filteredSoups);
}

/* Filter Diets */
// function filterDiet(soups, event) {
//   const selectedDiet = event.target.value;

//   const filteredSoups = soups.filter(
//     (soup) =>
//       (selectedDiet === "all" && soup) ||
//       soup.recipe.myDietLabel === selectedDiet
//   );
//   buildGrid(filteredSoups);
// }

/* Filter Gluten free */
// function filterGluten(soups) {
//   const filteredSoups = soups.filter((soup) => {
//     return soup.recipe.myGlutenLabel === "glutenfree";
//   });

//   buildGrid(filteredSoups);
// }

soups();
