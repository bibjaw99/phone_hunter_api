// search bar
const searchHandler = (isShowAll) => {
  loadingAnimation(true);
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;
  loadPhone(searchFieldText, isShowAll);
  // searchField.value = "";
};

const handleShowAll = () => {
  searchHandler(true);
};

const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`,
  );
  const phoneObj = await res.json();
  const phones = phoneObj.data;
  displayPhones(phones, isShowAll);
};

const handleShowDetails = async (slug) => {
  console.log("kaaj hoitese", slug);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`,
  );
  const details = await res.json();
  console.log(details);
};

// the function will control the loading Animation
const loadingAnimation = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// This function display the phones which are loaded
const displayPhones = (phoneArray, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phoneArray.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden", true);
  }
  // console.log("is show all: ", isShowAll);

  if (!isShowAll) {
    phoneArray = phoneArray.slice(0, 12);
  } else {
    phoneArray = phoneArray.slice(0, -1);
  }

  phoneArray.forEach((phone) => {
    console.log(phone);
    const eachProduct = document.createElement("div");
    eachProduct.classList = "card bg-white shadow-xl p-5";
    eachProduct.innerHTML = `

      <!-- img -->
      <figure class="mt-5";>
        <img src=${phone.image} alt="Shoes" />
      </figure>

      <!-- text part -->
      <div class="card-body flex flex-col gap-5">
      <!-- title -->
        <h2 class="text-center text-2xl font-bold">${phone.phone_name}</h2>

      <!-- descriptions -->
        <p class="text-center">
        There are many variations of passages of available, but the majority have suffered
        </p>

        <h3 class="text-center text-2xl font-bold">$99</h3>
        <!-- button action -->
        <div class="card-actions justify-center">
          <button
            onclick="handleShowDetails('${phone.slug}')"
            class="btn btn-primary text-white bg-blue-600 border-none text-center font-semibold px-6 py-3"
          >
            show more
          </button>
        </div>
      </div>
    `;
    phoneContainer.appendChild(eachProduct);
  });
  loadingAnimation(false); // disable the animation after displaying the  phones
};
