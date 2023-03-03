const snipperHandler = (isLoading) => {
  const snipper = document.getElementById("snipper");
  if (isLoading) {
    snipper.classList.add("hidden");
  } else {
    snipper.classList.remove("hidden");
  }
};
snipperHandler(false);

function loadAllAIUniverses(dataLimit) {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      displayAllAIUniverses(data.data.tools, dataLimit);
    });
}

const displayAllAIUniverses = (AIUniverses, dataLimit) => {
  console.log(AIUniverses);
  snipperHandler(true);

  AIUniverses.slice(0, dataLimit).forEach((AI) => {
    document.getElementById("AIContainer").innerHTML += `
    <div class="border p-5 mb-5 rounded-xl hover:bg-rose-50 transition-all hover:shadow-md">
          <div class="border-b-2">
            <img src="${AI.image}" alt="" class=" h-[200px] rounded-xl" />
            <div>
              <h3 class="font-bold text-2xl text-black my-4">Feature</h3>
              <div class="text-slate-600 text-md mb-4" id="feature_container">
              
              
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
            class="cursor-pointer bg-rose-200 w-12 h-12 rounded-full flex items-center justify-center" onclick="loadSingleAIDetails('${AI.id}')">
            <img src="./img/right-arrow.png" alt="" class="w-8" /></label>
          </div>
        </div>
    `;
  });
};

function loadSingleAIDetails(id) {
  fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then((response) => response.json())
    .then((data) => DisplayAIDetails(data.data));
}
const DisplayAIDetails = (AI) => {
  console.log(AI);
  document.querySelector(".modal").innerHTML = `
  <div class="modal-box w-11/12 max-w-4xl">
          <label
            for="my-modal-5"
            class="btn btn-sm btn-circle absolute right-2 top-2"
            >✕</label
          >
          <div class="grid grid-cols-2 gap-4 justify-between items-center">
            <div class="border border-rose-500 bg-rose-50 rounded-xl p-5">
              <h4 class=" font-semibold text-xl text-justify">${
                AI.description
              }</h4>
              <div class="flex justify-between">
                <p>
                  $10/month <br />
                  Basic
                </p>
                <p>
                  $10/month <br />
                  Basic
                </p>
                <p>
                  $10/month <br />
                  Basic
                </p>
              </div>
              <div class="flex justify-between">
                <div>
                  <h3 class="font-bold text-2xl text-black">Features</h3>
                  <ul class="list-disc pl-4">
                    <li>Customizable responses</li>
                    <li>Multilingual support</li>
                    <li>Seamless integration</li>
                  </ul>
                </div>
                <div>
                  <h3 class="font-bold text-2xl text-black">Integrations</h3>
                  <ul class="list-disc pl-4">
                    <li>Customizable responses</li>
                    <li>Multilingual support</li>
                    <li>Seamless integration</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="p-5 border h-full rounded-xl">
              <img src="${
                AI.image_link ? AI.image_link[0] : AI.image_link[1]
              }" alt="" />
              <h3>input_output_examples</h3>
            </div>
          </div>
        </div>
  `;
};
// async function loadSingleAIDetails(id) {
//   console.log(id);
//   const response = await fetch(
//     `https://openapi.programming-hero.com/api/ai/tool/${id}`
//   );

//   const data = response.json();
//   console.log(data.data);
// }
document.getElementById("btn_showAll").addEventListener("click", (e) => {
  document.getElementById("AIContainer").innerHTML = "";
  snipperHandler(false);
  loadAllAIUniverses();
  e.target.style.display = "none";
});
loadAllAIUniverses(6);
