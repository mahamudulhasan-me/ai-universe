const snipperHandler = (isLoading) => {
  const snipper = document.getElementById("snipper");
  if (isLoading) {
    snipper.classList.add("hidden");
  } else {
    snipper.classList.remove("hidden");
  }
};
snipperHandler(false);

function loadAllAIUniverses() {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      displayAllAIUniverses(data.data.tools);
    });
}

const displayAllAIUniverses = (AIUniverses) => {
  console.log(AIUniverses);
  snipperHandler(true);

  AIUniverses.slice(0, 6).forEach((AI) => {
    document.getElementById("AIContainer").innerHTML += `
    <div class="border p-5 mb-5 rounded-md">
          <div class="border-b-2">
            <img src="${AI.image}" alt="" class=" h-[200px] rounded-md" />
            <div>
              <h3 class="font-bold text-2xl text-black my-4">Feature</h3>
              <div class="text-slate-600 text-md mb-4" id="feature_container">
              ${displayFeature()}
              
              </div>
            </div>
          </div>
          <div class="flex justify-between items-center my-4">
            <div>
              <h3 class="font-bold text-2xl text-black">${AI.name}</h3>
              <p class="flex text-slate-600 font-semibold mt-2 gap-2">
                <img src="./img/calendar.png" alt="" />${AI.published_in}
              </p>
            </div>
            <button><img src="./img/right-arrow.png" alt="" /></button>
          </div>
        </div>
    `;

    function displayFeature() {
      for (let feature of AI.features) {
        console.log(feature);
      }
    }
    displayFeature();
  });
};

loadAllAIUniverses();
