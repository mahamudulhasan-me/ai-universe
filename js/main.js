const snipperHandler = (isLoading) => {
  const snipper = document.getElementById("snipper");
  if (isLoading) {
    snipper.classList.add("hidden");
  } else {
    snipper.classList.remove("hidden");
  }
};
snipperHandler(false);

// get card front single feature form feature array
function getFeatures(featuresArray) {
  let featureContainer = "";
  let featureNum = 1;
  for (let feature of featuresArray) {
    featureContainer += `<p>${featureNum++}. ${feature}</p>`;
  }
  return featureContainer;
}

// this function load all ai universe data from the database with data limit
function loadAllAIUniverses(dataLimit) {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      displayAllAIUniverses(data.data.tools, dataLimit);
    });
}
const displayAllAIUniverses = (AIUniverses, dataLimit) => {
  console.log(AIUniverses);

  //   when fetch data the spinner will be hidden
  snipperHandler(true);

  AIUniverses.slice(0, dataLimit).forEach((AI) => {
    document.getElementById("AIContainer").innerHTML += `
    <div class="border p-5 mb-5 rounded-xl hover:bg-rose-50 transition-all hover:shadow-md">
          <div class="border-b-2">
            <img src="${AI.image}" alt="" class=" h-[200px] rounded-xl" />
            <div>
              <h3 class="font-bold text-2xl text-black my-4">Feature</h3>
              <div class="text-slate-600 text-md mb-4" id="feature_container">
              ${getFeatures(AI.features)}
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center my-3">
            <div>
              <h3 class="font-bold text-2xl text-black">${AI.name}</h3>
              <p class="flex text-slate-600 font-semibold mt-2 gap-2">
                <img src="./img/calendar.png" alt="" />${AI.published_in}
              </p>
            </div>
            <label for="my-modal-5" 
            class="cursor-pointer bg-rose-200 w-12 h-12 rounded-full flex items-center justify-center" onclick="loadSingleAIDetails('${
              AI.id
            }')">
            <img src="./img/right-arrow.png" alt="" class="w-8" /></label>
          </div>
        </div>
    `;
  });
};

// this function get single ai id by on click and load data
async function loadSingleAIDetails(id) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await response.json();
  displayAIDetails(data.data);
}
// get single integration form integration array
function getIntegration(integrationArray) {
  if (integrationArray) {
    let integrationContainer = "";
    for (let integration of integrationArray) {
      integrationContainer += `<li>${integration}</li>`;
    }
    return integrationContainer;
  } else {
    return "No data Found";
  }
}
// get single feature form  features object
function getInnerFeatures(featuresObj) {
  let featureContainer = "";
  for (let feature in featuresObj) {
    featureContainer += `<li>${featuresObj[feature].feature_name}</li>`;
  }
  return featureContainer;
}
// display single ai details
const displayAIDetails = (AI) => {
  document.querySelector(".modal").innerHTML = `
  <div class="modal-box w-11/12 max-w-4xl">
          <label
            for="my-modal-5"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >
          <div class="grid grid-cols-12 gap-4 justify-between items-center">
            <div class="border border-rose-500 bg-rose-50 rounded-xl p-5 h-full col-span-7">
              <h4 class=" font-semibold text-xl text-justify">${
                AI.description
              }</h4>
              <div class="grid grid-cols-3 gap-3 justify-between text-center  font-semibold my-4">
                <p class="text-green-500  bg-white  py-3 rounded-lg flex justify-center items-center">
                  ${
                    AI.pricing[0].price === "0"
                      ? "Free of Cost/"
                      : AI.pricing[0].price
                  } <br />
                  ${AI.pricing[0].plan}
                </p>
                <p class="text-orange-500  bg-white py-3  rounded-lg flex items-center justify-center">
                ${
                  AI.pricing[1].price === "0"
                    ? "Free of Cost/"
                    : AI.pricing[1].price
                } <br />
                ${AI.pricing[1].plan}
                </p>
                <p class="text-rose-500  bg-white py-3 rounded-lg flex items-center justify-center">
                ${
                  AI.pricing[2].price === "0"
                    ? "Free of Cost/"
                    : AI.pricing[2].price === "Contact us for pricing"
                    ? "Contact us/"
                    : AI.pricing[2].price
                } <br />
                ${AI.pricing[2].plan}
                </p>
              </div>
              <div class="flex justify-between text-md text-slate-700">
                <div>
                  <h3 class="font-bold text-2xl mb-3 text-black">Features</h3>
                  <ul class="list-disc pl-7">
                    ${getInnerFeatures(AI.features)}
                  </ul>
                </div>
                <div>
                  <h3 class="font-bold text-2xl mb-3 text-black">Integrations</h3>
                  <ul class="list-disc pl-7">
                  ${getIntegration(AI.integrations)}
                  </ul>
                </div>
              </div>
            </div>
            <div class=" p-5 border h-full items-center rounded-xl col-span-5">
            
              <div class="positive">
                ${
                  AI.accuracy.score
                    ? `<div class="absolute bg-rose-600 text-sm text-white font-semibold px-2
                     w-auto text-center rounded-md top-14 right-14">
                      ${AI.accuracy.score * 100}% Accuracy
                    </div>`
                    : ""
                }
              <img src="${
                AI.image_link ? AI.image_link[0] : AI.image_link[1]
              }" class="rounded-xl" alt="" />
              
              </div>
              <div class="text-center">
              <h3 class="font-bold text-2xl my-3 text-black">${
                AI.input_output_examples[0]
                  ? AI.input_output_examples[0].input
                  : "Can you give any example?"
              }</h3>
              <p>${
                AI.input_output_examples[0]
                  ? AI.input_output_examples[0].output
                  : "No! Not Yet! Take a break!!!"
              }</p>
              </div>
            </div>
          </div>
        </div>
  `;
};

// show all button integrations
document.getElementById("btn_showAll").addEventListener("click", (e) => {
  document.getElementById("AIContainer").innerHTML = "";
  snipperHandler(false);
  loadAllAIUniverses();
  e.target.style.display = "none";
});

// load all ai universes with default dataLimit
loadAllAIUniverses(6);
