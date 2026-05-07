const quoteImages = [
  {
    src: "images/store/42099766_684639188587553_1917095606468214784_n.jpg",
    alt: "Fraldinha com Laço"
  },
  {
    src: "images/store/47071639_722921541425984_8131519873365835776_n.jpg",
    alt: "Necessaire Lilás"
  },
  {
    src: "images/store/59380568_816375278747276_822008460727025664_n.jpg",
    alt: "Panos Bordados Dia das Mães"
  },
  {
    src: "images/store/74385456_950409258677210_5132999678412980224_n.jpg",
    alt: "Toalhas Bordadas"
  },
  {
    src: "images/store/67507947_865764030475067_8944808197567283200_n.jpg",
    alt: "Mochila Infantil Vermelha"
  }
];

const heroProducts = [
  {
    title: "Kit Rosa com Abajur",
    titleEn: "Pink Kit with Lamp",
    text: "Clique para abrir a peça na loja e ver mais detalhes.",
    textEn: "Click to open the item in the shop and see more details.",
    image: "images/store/41964613_684639008587571_810792931022602240_n.jpg",
    href: "shop.html#kit-rosa-abajur",
    alt: "Kit Rosa com Abajur"
  },
  {
    title: "Bolsa Delicada com Renda",
    titleEn: "Delicate Lace Bag",
    text: "Uma das peças em destaque com acabamento delicado e tecido estampado.",
    textEn: "One of the featured pieces with delicate finishing and printed fabric.",
    image: "images/store/42106126_685618801822925_7322875044466524160_n.jpg",
    href: "shop.html#bolsa-delicada-renda",
    alt: "Bolsa Delicada com Renda"
  },
  {
    title: "Kit Professora Jeans",
    titleEn: "Teacher Denim Kit",
    text: "Modelo personalizado que pode ser acessado direto na página da loja.",
    textEn: "Personalized model that can be opened directly from the shop page.",
    image: "images/store/82890333_1016862462031889_1142811151592062976_n.jpg",
    href: "shop.html#kit-professora-jeans",
    alt: "Kit Professora Jeans"
  },
  {
    title: "Bolsa Azul Poá",
    titleEn: "Blue Polka Dot Bag",
    text: "Clique para ir até a peça e conferir esse modelo na loja.",
    textEn: "Click to open the item and see this model in the shop.",
    image: "images/store/83696832_1022833418101460_8214396112065265664_n.jpg",
    href: "product.html?id=bolsa-azul-poa",
    alt: "Bolsa Azul Poá"
  }
];

const applyEnglishCopy = (element, text) => {
  if (!element || !text) return;
  element.dataset.en = text;
};

const quoteBox = document.querySelector(".quote-box");
let quoteImgIndex = 0;

if (quoteBox) {
  // Build image element inside quote box
  quoteBox.innerHTML = '';
  const img = document.createElement("img");
  img.src = quoteImages[0].src;
  img.alt = quoteImages[0].alt;
  img.style.cssText = "width:100%;height:100%;object-fit:cover;border-radius:22px;opacity:1;transition:opacity 0.8s ease;display:block;";
  quoteBox.style.padding = "0";
  quoteBox.style.overflow = "hidden";
  quoteBox.style.borderRadius = "22px";
  quoteBox.appendChild(img);

  setInterval(() => {
    quoteImgIndex = (quoteImgIndex + 1) % quoteImages.length;
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = quoteImages[quoteImgIndex].src;
      img.alt = quoteImages[quoteImgIndex].alt;
      img.style.opacity = "1";
    }, 800);
  }, 3200);
}

const heroSliderImage = document.getElementById("hero-slider-image");
const heroSliderLink = document.getElementById("hero-slider-link");
const heroSliderTitle = document.getElementById("hero-slider-title");
const heroSliderText = document.getElementById("hero-slider-text");
const heroSliderDots = document.querySelectorAll(".hero-slider-dot");
let heroProductIndex = 0;

if (heroSliderImage && heroSliderLink && heroSliderTitle && heroSliderText && heroSliderDots.length) {
  heroSliderImage.style.transition = "opacity 0.7s ease";

  setInterval(() => {
    heroProductIndex = (heroProductIndex + 1) % heroProducts.length;
    const currentProduct = heroProducts[heroProductIndex];

    heroSliderImage.style.opacity = "0";
    setTimeout(() => {
      heroSliderImage.src = currentProduct.image;
      heroSliderImage.alt = currentProduct.alt;
      heroSliderLink.href = currentProduct.href;
      heroSliderTitle.textContent = currentProduct.title;
      applyEnglishCopy(heroSliderTitle, currentProduct.titleEn);
      heroSliderText.textContent = currentProduct.text;
      applyEnglishCopy(heroSliderText, currentProduct.textEn);
      heroSliderImage.style.opacity = "1";
    }, 700);

    heroSliderDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === heroProductIndex);
    });
  }, 2800);
}

const applyShopProductTranslations = () => {
  if (typeof productCatalog === "undefined") return;

  document.querySelectorAll(".product-card").forEach((card) => {
    const productLink = card.querySelector(".product-button-link[href*='id=']");
    if (!productLink) return;

    let productId = "";
    try {
      productId = new URL(productLink.getAttribute("href"), window.location.href).searchParams.get("id");
    } catch (error) {
      productId = "";
    }

    const product = productCatalog[productId];
    if (!product) return;

    applyEnglishCopy(card.querySelector(".product-type"), product.categoryEn);
    applyEnglishCopy(card.querySelector("h3"), product.titleEn);
    applyEnglishCopy(card.querySelector(".product-copy"), product.descriptionEn);
    applyEnglishCopy(card.querySelector(".price"), product.priceEn);
    applyEnglishCopy(productLink, "View item");
  });
};

applyShopProductTranslations();

const productDetail = document.getElementById("product-detail");

if (productDetail && typeof productCatalog !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = productCatalog[productId];
  const titleEl = document.getElementById("product-detail-title");
  const categoryEl = document.getElementById("product-detail-category");
  const descriptionEl = document.getElementById("product-detail-description");
  const priceEl = document.getElementById("product-detail-price");
  const imageEl = document.getElementById("product-detail-image");
  const zoomFrame = document.getElementById("zoom-frame");
  const zoomToggle = document.getElementById("zoom-toggle");

  if (!product) {
    document.title = "Produto não encontrado | Mimos Oliveira";
    if (titleEl) titleEl.textContent = "Produto não encontrado";
    applyEnglishCopy(titleEl, "Product not found");
    if (descriptionEl) {
      descriptionEl.textContent = "Volte para a loja e escolha uma peça para ver mais detalhes.";
      applyEnglishCopy(descriptionEl, "Go back to the shop and choose an item to see more details.");
    }
    if (priceEl) {
      priceEl.textContent = "R$";
      applyEnglishCopy(priceEl, "Price");
    }
    if (categoryEl) {
      categoryEl.textContent = "Produto";
      applyEnglishCopy(categoryEl, "Product");
    }
  } else {
    document.title = `${product.title} | Mimos Oliveira`;
    if (titleEl) {
      titleEl.textContent = product.title;
      applyEnglishCopy(titleEl, product.titleEn);
    }
    if (categoryEl) {
      categoryEl.textContent = product.category;
      applyEnglishCopy(categoryEl, product.categoryEn);
    }
    if (descriptionEl) {
      descriptionEl.textContent = product.description;
      applyEnglishCopy(descriptionEl, product.descriptionEn);
    }
    if (priceEl) {
      priceEl.textContent = product.price;
      applyEnglishCopy(priceEl, product.priceEn);
    }
    if (imageEl) {
      imageEl.src = product.image;
      imageEl.alt = product.title;
    }
  }

  if (zoomFrame && zoomToggle) {
    zoomToggle.addEventListener("click", () => {
      zoomFrame.classList.toggle("is-zoomed");
      zoomToggle.textContent = zoomFrame.classList.contains("is-zoomed")
        ? "Reduzir imagem"
        : "Ampliar imagem";
      applyEnglishCopy(
        zoomToggle,
        zoomFrame.classList.contains("is-zoomed") ? "Reduce image" : "Enlarge image"
      );
    });
  }
}
