// search button
const handleSearch = (isShowingAll) => {
  const searchField = document.getElementById("searchbox");
  const searchText = searchField.value;
  loadPhone(searchText, isShowingAll);
};

// the load function will fetch the api
const loadPhone = async (searchText, isShowingAll) => {
  // loading animation will occur until the api is loaded
  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`,
  );
  const data = await res.json();
  const phones = data.data; //  this is where the array of phones is stored. Each of the element in this array is an object
  displayPhones(phones, isShowingAll);
};

// loading animation
const loadingSpinner = (isLoading) => {
  const loadAnimation = document.getElementById("loading");
  if (isLoading) {
    loadAnimation.classList.remove("hidden");
  } else {
    loadAnimation.classList.add("hidden");
  }
};

// show all button handler
const showAllHandler = () => {
  handleSearch(true);
};

// show details button for earch phone
const showDetails = async (phoneSlug) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${phoneSlug}`,
  );
  const data = await res.json();
  const dataFromSlug = data.data;
  showDetailsModal(dataFromSlug);
};

const showDetailsModal = (dataFromSlug) => {
  const showDetailsContainer = document.getElementById(
    "show-details-container",
  );
  const dataModal = document.createElement("div");
  dataModal.classList = ` w-fit bg-white shadow-xl p-5`;
  dataModal.innerHTML = `
    <div class= "grid gap-4">

      <figure class= "items-center justify-center text-center mx-auto">
        <img src=${dataFromSlug.image} alt="Shoes" />
      </figure>
      <h2 class="text-3xl font-bold">${dataFromSlug.name}</h2>
      <div class = "text-left grid gap-3">
        <h3 class="text-xl"><span class="font-bold">Brand:</span>${dataFromSlug.brand}</h3>
        <h3 class="text-xl"><span class="font-bold">Storage:</span>${dataFromSlug.mainFeatures.storage}</h3>
        <h3 class="text-xl"><span class="font-bold">Display:</span>${dataFromSlug.mainFeatures.displaySize}</h3>
        <h3 class="text-xl"><span class="font-bold">Chipset:</span>${dataFromSlug.mainFeatures.chipset}</h3>
        <h3 class="text-xl"><span class="font-bold">Memory:</span>${dataFromSlug.mainFeatures.memory}</h3>
        <h3 class="text-xl"><span class="font-bold">Slug:</span>${dataFromSlug.slug}</h3>
        <h3 class="text-xl"><span class="font-bold">Release Date:</span>${dataFromSlug.releaseDate}</h3>
        <h3 class="text-xl"><span class="font-bold">GPS:</span>${dataFromSlug.others.GPS}</h3>
      </div>
    </div>
    `;
  showDetailsContainer.innerText = "";
  showDetailsContainer.appendChild(dataModal);
};

// phone container (parent div that will contain the div for each phone created dinamically)
const phoneContainer = document.getElementById("phones-container");

// displayPhones will take each element from the array and execute the operations to showcase each phones
const displayPhones = (phonesArray, isShowingAll) => {
  // by default we want the parent div (phones-container) to be empty
  phoneContainer.textContent = "";

  // manipulating show all button
  const showAllButton = document.getElementById("show-all");
  if (phonesArray.length > 12 && !isShowingAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }
  if (!isShowingAll) {
    phonesArray = phonesArray.slice(0, 12);
  }
  phonesArray.forEach((phone) => {
    // step:1 create a div
    const phoneCard = document.createElement("div"); // protiti phone er jonno ekta kore div  nilam

    // setp:2 add list of classes
    phoneCard.classList = `card bg-white shadow-xl p-5`;

    // protiti phone er html property
    // setp:3 set inner htmls
    phoneCard.innerHTML = `
      <!-- img -->
      <figure>
      <img src=${phone.image} alt="Shoes" />
      </figure>

      <!-- text part -->
      <div class="card-body flex flex-col gap-6">
        <!-- title -->
        <h2 class="text-center text-2xl font-bold">${phone.phone_name}</h2>

        <!-- descriptions -->
        <p class="text-center">If a dog chews shoes whose shoes does he choose?</p>

        <h3 class="text-center text-2xl font-bold">$99</h3>
        <!-- button action -->
        <div class="card-actions justify-center">
          <button
            onclick= "showDetails('${phone.slug}') ; show_details_modal.showModal() "
            class="btn btn-primary text-white bg-blue-600 border-none text-center font-semibold px-6 py-3">
            show details 
          </button>
        </div>
      </div>
    `;

    // setp:4 append the product in a parent container
    phoneContainer.appendChild(phoneCard);
  });
  loadingSpinner(false); // spinner will be gone after the data are shown
};
