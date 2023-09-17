// search button
const handleSearch = () => {
  const searchField = document.getElementById("searchbox");
  const searchText = searchField.value;
  loadPhone(searchText);
};

// the load function will fetch the api
const loadPhone = async (searchText) => {
  // loading animation will occur until the api is loaded
  loadingSpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`,
  );
  const data = await res.json();
  const phones = data.data; //  this is where the array of phones is stored. Each of the element in this array is an object
  displayPhones(phones);
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

// phone container (parent div that will contain the div for each phone created dinamically)
const phoneContainer = document.getElementById("phones-container");

// displayPhones will take each element from the array and execute the operations to showcase each phones
const displayPhones = (phonesArray) => {
  // by default we want the parent div (phones-container) to be empty
  phoneContainer.textContent = "";

  phonesArray.forEach((phone) => {
    console.log(phone);

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
        class="btn btn-primary text-white bg-blue-600 border-none text-center font-semibold px-6 py-3"
        >
        show more
        </button>
        </div>
      </div>
    `;

    // setp:4 append the product in a parent container
    phoneContainer.appendChild(phoneCard);
  });
  loadingSpinner(false); // spinner will be gone after the data are shown
};
