const API = "https://api.github.com/users";

const body = document.querySelector("body");

const inputSearcher = document.getElementById("user--input");
const searchBtn = document.getElementById("search--btn");

const toggle = document.getElementById("icon--toggle");
const textToggle = document.querySelector(".nav--dark-mode_text");

// Async Function to call the API
const fetchData = async (url) => {
  const resolve = await fetch(url);
  const data = await resolve.json();
  return data;
};

// Async Function to get user data
async function getData(user) {
  try {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("loader").style.display = "block";
    const userData = await fetchData(`${API}/${user}`);
    insertHTML(userData);
  } catch {
    document.getElementById("error-message").style.display = "flex";
    document.getElementById("loader").style.display = "none";
  }
}

// Function to create HTML with the user data
function insertHTML(userData) {
  const datePatternDelete = /T\d{2}:\d{2}:\d{2}Z/;
  const userDateCreated = userData.created_at.replace(datePatternDelete, "");

  const template = `
  <!-- Card Body -->
  <section id="card">

      <!-- Basic Information of User -->
      <div class="card--basic-info">
          <div class="card--basic-info__user-img">
              <img src="${userData.avatar_url}" alt="User Picture">
          </div>
          <div class="card--basic-info__user-info">
              <h3>${userData.name}</h3>
              <h6>@${userData.login}</h6>
              <p>${userDateCreated}</p>
          </div>
      </div>

      ${
        userData.bio
          ? `
          <!-- Description -->
          <div class="card--description">
              <p>
                  ${userData.bio}
              </p>
          </div>
          `
          : ""
      }

      <!-- Repositories & Followers -->
      <div class="card--repo-follow">
          <div>
              <h6>Repos</h6>
              <p>${userData.public_repos}</p>
          </div>

          <div>
              <h6>Followers</h6>
              <p>${userData.followers}</p>
          </div>

          <div>
              <h6>Following</h6>
              <p>${userData.following}</p>
          </div>
      </div>

      <!-- Links of User -->
      <div class="card--links">
        <div>
          <i class="fa-solid fa-location-dot"></i>
          <p>${userData.location}</p>
        </div>

        <div>
          <i class="fa-solid fa-link"></i>
          <a href="${userData.html_url}" target="_blank">${
    userData.html_url
  }</a>
        </div>

        ${
          userData.company
            ? `
            <div>
              <i class="fa-solid fa-building"></i>
              <p>${userData.company}</p>
            </div>
            `
            : ""
        }
      </div>
  </section>
  `;
  document.querySelector("main").insertAdjacentHTML("beforeend", template);
  document.getElementById("loader").style.display = "none";
}

// Validate if yhe input is empty
inputSearcher.addEventListener("input", () => {
  if (inputSearcher.value.trim() === "") {
    searchBtn.classList.remove("searcher--btn__enable");
    searchBtn.classList.add("searcher--btn__disabled");
  } else {
    searchBtn.classList.remove("searcher--btn__disabled");
    searchBtn.classList.add("searcher--btn__enable");
  }
});

// Hanlde input enter & call the API
searchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const cardElement = document.getElementById("card");

  if (cardElement) cardElement.remove();

  getData(inputSearcher.value);
});

// Handle Dark Mode
toggle.addEventListener("click", () => {
  if (toggle.dataset.status === "light") {
    body.classList.remove("light--mode");
    body.classList.add("dark--mode");
    toggle.classList.remove("fa-moon");
    toggle.classList.add("fa-sun");
    textToggle.innerText = "light";
    toggle.dataset.status = "dark";
    localStorage.setItem("status", toggle.dataset.status);
  } else {
    body.classList.remove("dark--mode");
    body.classList.add("light--mode");
    toggle.classList.remove("fa-sun");
    toggle.classList.add("fa-moon");
    textToggle.innerText = "dark";
    toggle.dataset.status = "light";
    localStorage.setItem("status", toggle.dataset.status);
  }
});

// Check localStorage for dark mode
(function () {
  const statusMode = localStorage.getItem("status");
  if (statusMode !== null) toggle.dataset.status = statusMode;

  if (toggle.dataset.status === "light") {
    body.classList.remove("light--mode");
    body.classList.add("light--mode");
    toggle.classList.add("fa-moon");
    textToggle.innerText = "dark";
    toggle.dataset.status = "light";
  } else if (toggle.dataset.status === "dark") {
    body.classList.remove("light--mode");
    body.classList.add("dark--mode");
    toggle.classList.remove("fa-moon");
    toggle.classList.add("fa-sun");
    textToggle.innerText = "light";
    toggle.dataset.status = "dark";
  }
})();
