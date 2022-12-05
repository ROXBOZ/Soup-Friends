function buildGrid() {
  const container = document.getElementById("container");
  /* Create Rows */
  const row = document.createElement("div");
  row.setAttribute("class", "row");

  for (i = 0; i < 200; i++) {
    // /* Create Columns */
    const col = document.createElement("div");
    col.setAttribute("class", "col-sm-12 col-md-6 col-lg-4 pb-4");

    // /* Create Cards */
    const card = document.createElement("div");
    card.setAttribute("class", "card border-primary");

    // /* Create Card image */
    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.src =
      "https://hips.hearstapps.com/hmg-prod/images/homemade-pumpkin-soup-royalty-free-image-1571855802.jpg?crop=1.00xw:0.756xh;0,0.112xh&resize=1200:*";
    img.alt = "Card image cap";

    // /* Create Card Body */
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    // /* Create Card Title */
    const cardTitle = document.createElement("h2");
    cardTitle.innerText = "Card title";

    // /* Create Card Text */
    const cardText = document.createElement("p");
    cardText.innerText = "Lorem";

    // /* Create Card Link */
    const cardLink = document.createElement("a");
    cardLink.href = "#";
    cardLink.setAttribute("class", "btn btn-primary");
    cardLink.innerText = "Go somewhere";

    /* Building Grid */
    container.append(row);
    row.append(col);
    col.append(card);
    card.append(img);
    card.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(cardLink);
  }
}

buildGrid();
