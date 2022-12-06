function buildGrid() {
  const container = document.getElementById("container");
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

    // /* Create Card Text */
    // const cardText = document.createElement("p");
    // cardText.innerText = "Lorem";

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
    cardModal.setAttribute("id", "recipeModal");
    cardModal.setAttribute("class", "modal p-5 mx-auto");
    cardModal.style.display = "none";
    cardModal.style.position = "fixed";
    cardModal.style.zIndex = "1";
    cardModal.style.overflow = "auto";
    cardModal.style.width = "100%";
    cardModal.style.height = "100%";
    cardModal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

    const modalContent = document.createElement("div");
    modalContent.setAttribute(
      "class",
      "modal-content bg-white p-2 w-25 border-primary mx-auto"
    );
    modalContent.style.display = "grid";

    const modalClose = document.createElement("span");
    modalClose.setAttribute("class", "close text-primary");
    modalClose.style.fontSize = "200%";
    modalClose.style.justifySelf = "flex-end";
    modalClose.style.fontWeight = "bold";
    modalClose.innerHTML = "&times;";
    modalClose.addEventListener("click", () => {
      cardModal.style.display = "none";
    });

    const modalText = document.createElement("p");
    modalText.innerText = "some text for now";

    /* Building Grid */
    container.append(row);
    row.append(col);
    col.append(recipeContainer);
    recipeContainer.append(card);
    card.append(img);
    card.append(cardBody);
    cardBody.append(cardTitle);
    // cardBody.append(cardText);
    cardBody.append(cardButton);
    recipeContainer.append(cardModal);
    cardModal.append(modalContent);
    modalContent.append(modalClose);
    modalContent.append(modalText);

    const body = document.querySelector("body");
    body.addEventListener("click", (event) => {
      if (event.target == cardModal) {
        cardModal.style.display = "none";
      }
    });
  }
}
buildGrid();
