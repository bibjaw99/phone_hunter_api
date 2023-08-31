// what async function will do is, it will look for other tasks while fetching the api link. Instead of wasting time it will do those task while the api linked is fetched
const loadPhone = async (searchText) => {
  // response hishebe API paisi. Then API er data gulo res var e rakhsi
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`,
  );
  // response theke pawa data gulo "data" var e rakhsi, jegulo k .json() function diye JS object e rupantor korsi
  const data = await res.json();
  // phone info gulo array er vetor value akare object er vitor data namer key te store kora chilo ja amra browser er console tab e dekhechi
  const phones = data.data; // it's an array of 15 objects
  displayPhones(phones);
};

const displayPhones = (phones) => {
  console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";
  // forEach phones er protiti element k phone parameter e pathabe as an arguement.
  phones.forEach((phone) => {
    // Dynamic part
    // Now protiti phone er jonno ekta kore div create korbo
    const phoneCard = document.createElement("div");
    // eibar div er moddhe class include korbo
    phoneCard.classList = "card bg-gray-100 shadow-xl p-6 text-center gap-5";
    phoneCard.innerHTML = `
    
            <!-- product img -->
            <figure class="mb-4">
              <img src="${phone.image}" alt="Shoes" />
            </figure>

            <!-- product description part -->
            <div class="card-body">
              <h2 class="text-center mb-4 text-2xl font-bold">
                ${phone.phone_name}
              </h2>

              <!-- des -->
              <p class="mb-4">
                There are many variations of passages of available, but the
                majority have suffered
              </p>

              <!-- price -->
              <h3 class="mb-4 text-2xl font-bold">$999</h3>
              <!-- details button -->
              <div class="card-actions justify-center">
                <button class="btn btn-primary">show details</button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
};

// handle search button
const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText);
  searchField.value = "";
};

// handle search button2
const handleSearch2 = () => {
  const searchField2 = document.getElementById("search-field2");
  const searchText2 = searchField2.value;
  loadPhone(searchText2);
  searchField2.value = "";
};
