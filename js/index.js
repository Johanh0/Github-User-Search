const API = "https://api.github.com/users";

const fetchData = async (url) => {
  const resolve = await fetch(url);
  const data = await resolve.json();
  return data;
};

async function getData(user) {
  try {
    const userInfo = await fetchData(`${API}/${user}`);
    insertHTML(userInfo);
  } catch {
    alert("This user doesn't exist");
  }
}

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
      <!-- <div>

      </div> -->
  </section>
  `;
  document.querySelector("main").insertAdjacentHTML("beforeend", template);

  console.log(userData);
}

// Validate if the input is empty
const inputSearcher = document.getElementById("user--input");
const searchBtn = document.getElementById("search--btn");

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
