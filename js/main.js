/*
    Project Name = AI Universe
    Author Name = Mahamudul Hasan
    Date Created = 2023-03-03
    ---------------------------
    Description = In this project, various types of AI data have been loaded
                     through API and clicking on details will show the details 
                     of the clicked AI Item.

 */

// snipper, if data loaded snipper will be hide
const snipperHandler = (isLoading) => {
  const snipper = document.getElementById("snipper");
  if (isLoading) {
    snipper.classList.add("hidden");
  } else {
    snipper.classList.remove("hidden");
  }
};
// byDefault spinner showing
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
async function loadAllAIUniverses(isSorting, dataLimit) {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/ai/tools"
  );
  const data = await response.json();
  function sortingByDate(isSorting) {
    if (isSorting === true) {
      const sortingData = data.data.tools.sort((a, b) => {
        const dateA = new Date(a.published_in.split("/").reverse().join("-"));
        const dateB = new Date(b.published_in.split("/").reverse().join("-"));
        return dateA - dateB;
      });
      displayAllAIUniverses(sortingData, dataLimit);
    } else {
      displayAllAIUniverses(data.data.tools, dataLimit);
    }
  }
  sortingByDate(isSorting);
}
// display all ai universe data from the database with data limit
const displayAllAIUniverses = (AIUniverses, dataLimit) => {
  //   when fetch data the spinner will be hidden
  snipperHandler(true);

  AIUniverses.slice(0, dataLimit).forEach((AI) => {
    document.getElementById("AIContainer").innerHTML += `
    <div class="border p-5 mb-5 rounded-xl hover:bg-rose-50 transition-all hover:shadow-md">
          <div class="border-b-2">
            <img src="${
              AI.image
            }" alt="" class=" h-[200px] rounded-xl mx-auto" />
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
  console.log(AI);
  document.querySelector(".modal").innerHTML = `
  <div class="modal-box w-11/12 max-w-4xl">
          <label
            for="my-modal-5"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >
          <div class="md:grid md:grid-cols-12 gap-4 justify-between items-center">
            <div class="border border-rose-500 bg-rose-50 rounded-xl p-5 h-full col-span-7">
              <h4 class=" font-semibold text-xl text-justify">${
                AI.description
              }</h4>
              <div class="grid md:grid-cols-3 grid-cols-2 gap-3 justify-between text-center  font-semibold my-4">
                <p class="text-green-500  bg-white  py-3 rounded-lg flex justify-center items-center">
                  ${
                    AI.pricing
                      ? AI.pricing[0].price === "0" || "No cost"
                        ? "Free of Cost/"
                        : AI.pricing[0].price
                      : "Free of Cost/"
                  } <br />
                  ${AI.pricing ? AI.pricing[0].plan : "Basic"}
                </p>
                <p class="text-orange-500  bg-white py-3  rounded-lg flex items-center justify-center">
                ${
                  AI.pricing
                    ? AI.pricing[1].price === "0" || "No cost"
                      ? "Free of Cost/"
                      : AI.pricing[1].price
                    : "Free of Cost/"
                } <br />
                ${AI.pricing ? AI.pricing[1].plan : "Pro"}
                </p>
                <p class="text-rose-500  bg-white py-3 rounded-lg flex items-center justify-center">
                ${
                  AI.pricing
                    ? AI.pricing[2].price === "0"
                      ? "Free of Cost/"
                      : AI.pricing[2].price === "Contact us for pricing" ||
                        "Contact us"
                      ? "Contact us/"
                      : AI.pricing[2].price
                    : "Free of Cost/"
                } <br />
                ${
                  AI.pricing
                    ? AI.pricing[2].plan === "Microsoft Advertising"
                      ? "Enterprise"
                      : AI.pricing[2].plan
                    : "Enterprise"
                }
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
                     w-auto text-center rounded-md md:top-14 md:right-14 bottom-18 right-12">
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
                AI.input_output_examples
                  ? AI.input_output_examples[0]
                    ? AI.input_output_examples[0].input
                    : "Can you give any example?"
                  : "Can you give any example?"
              }</h3>
              <p>${
                AI.input_output_examples
                  ? AI.input_output_examples[0]
                    ? AI.input_output_examples[0].output
                    : "No! Not Yet! Take a break!!!"
                  : "No! Not Yet! Take a break!!!"
              }</p>
              </div>
            </div>
          </div>
        </div>
  `;
};
let isSorting = true;
let sixDataLimit = true;
function refreshing() {
  document.getElementById("AIContainer").innerHTML = "";
  snipperHandler(false);
}
// show all button integrations
document.getElementById("btn_showAll").addEventListener("click", (e) => {
  if (sixDataLimit) {
    if (!isSorting) {
      refreshing();
      loadAllAIUniverses(true);
      e.target.style.display = "none";
    } else {
      refreshing();
      loadAllAIUniverses(false);
      e.target.style.display = "none";
    }
  } else {
    refreshing();
    loadAllAIUniverses(true, null);
    e.target.style.display = "none";
  }
  sixDataLimit = false;
});

// sorting toggle operation

document.getElementById("btn_sorting").addEventListener("click", (e) => {
  if (isSorting) {
    if (!sixDataLimit) {
      refreshing();
      loadAllAIUniverses(true);
    } else {
      refreshing();
      loadAllAIUniverses(true, 6);
    }
  } else {
    if (!sixDataLimit) {
      refreshing();
      loadAllAIUniverses(true);
    } else {
      refreshing();
      loadAllAIUniverses(true, null);
    }
  }
  isSorting = false;
  // e.target.disabled = true;
  e.target.style.display = "none";
  document.getElementById("sorted").classList.remove("hidden");
});

// load all ai universes with default dataLimit
loadAllAIUniverses(false, 6);
