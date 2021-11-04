function createCardElement() {
  const card = document.createElement("div");
  card.classList.add("main__news-card");
  return card;
}

function setTextContent(elem, text) {
  elem.textContent = text;
}

function setImgSrc(img, src) {
  img.setAttribute("src", src);
}

function appendCardChildren(card, children) {
  children.forEach((child) => card.appendChild(child));
}

function setCardEvent(card, url) {
  card.addEventListener("click", (e) => window.open(url, "_blank"));
}

function makeRequest(url) {
  const main = document.querySelector("#main");
  $.get(url)
    .done((response) => {
      console.log(response);
      response.articles.forEach((article) => {
        if (article.description) {
          const card = createCardElement();
          const dividerElem = document.createElement("hr");
          const imgElem = document.createElement("img");
          const titleElem = document.createElement("h3");
          const descriptionElem = document.createElement("p");
          titleElem.classList.add("lh-base");
          titleElem.classList.add("mb-2");
          descriptionElem.classList.add("lh-base");

          setCardEvent(card, article.url);
          setImgSrc(imgElem, article.urlToImage);
          setTextContent(titleElem, article.title);
          setTextContent(descriptionElem, article.description);

          const cardChildren = [imgElem, titleElem, descriptionElem];
          appendCardChildren(card, cardChildren);
          main.appendChild(card);
          main.appendChild(dividerElem);
        }
      });
    })
    .fail((status, error) => {
      console.log(status);
      console.log(error);
    });
}

window.onload = (e) => {
  const category = window.location.pathname.slice(1);
  let url = category
    ? `https://newsapi.org/v2/top-headlines?country=br&category=${category}&apiKey=${process.env.API_SECRET_KEY}`
    : `https://newsapi.org/v2/top-headlines?country=br&apiKey=${process.env.API_SECRET_KEY}`;

  makeRequest(url);
};
