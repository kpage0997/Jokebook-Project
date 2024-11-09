//
// Name: Kennedy Page
// Date: 11.10.2024
// CSC 372-01

// This JavaScript file handles the fetching of jokes and categories from the server, updates the UI, and manages user interactions.
//

//Get random joke
function fetchRandomJoke() {
  fetch("/jokebook/categories")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then((categories) => {
      if (categories.length === 0) {
        console.error("No categories found");
        return;
      }
      // Select a random category
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      // Fetch jokes from the selected random category
      return fetch(`/jokebook/joke/${randomCategory}`);
    })
    .then((response) => {
      if (!response.ok) throw new Error("Category not found or has no jokes");
      return response.json();
    })
    .then((jokes) => {
      // Select a random joke from the fetched jokes
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      document.getElementById(
        "randomJoke"
      ).innerHTML = `<strong>${randomJoke.setup}</strong><br>${randomJoke.delivery}`;
    })
    .catch((error) => {
      console.error("Error fetching random joke:", error);
      document.getElementById("randomJoke").innerHTML =
        "Error fetching random joke.";
    });
}

function fetchCategories() {
  fetch("/jokebook/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((categories) => {
      // Populate the category dropdown for adding jokes
      const addJokeCategorySelect = document.getElementById("newCategory");
      addJokeCategorySelect.innerHTML = "";
      addJokeCategorySelect.innerHTML =
        '<option value="" disabled selected>Select a category</option>';

      // Populate the category dropdown for viewing jokes
      const viewJokeCategorySelect = document.getElementById("categorySelect");
      viewJokeCategorySelect.innerHTML = ""; // Clear existing options
      viewJokeCategorySelect.innerHTML =
        '<option value="" disabled selected>Select a category</option>';

      // Check if categories array is empty
      if (categories.length === 0) {
        return;
      }

      categories.forEach((category) => {
        // Create option for adding jokes
        const addOption = document.createElement("option");
        addOption.value = category;
        addOption.textContent = category;
        addJokeCategorySelect.appendChild(addOption); // Add to add joke dropdown

        // Create option for viewing jokes
        const viewOption = document.createElement("option");
        viewOption.value = category;
        viewOption.textContent = category;
        viewJokeCategorySelect.appendChild(viewOption); // Add to view jokes dropdown
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
      const addJokeCategorySelect = document.getElementById("newCategory");
      addJokeCategorySelect.innerHTML =
        '<option value="" disabled selected>Error fetching categories</option>';

      const viewJokeCategorySelect = document.getElementById("categorySelect");
      viewJokeCategorySelect.innerHTML =
        '<option value="" disabled selected>Error fetching categories</option>';
    });
}

//Get jokes by category
function fetchJokesByCategory(category) {
  if (!category) return;

  fetch(`/jokebook/joke/${category}`)
    .then((response) => {
      if (!response.ok) throw new Error("Category not found");
      return response.json();
    })
    .then((jokes) => {
      const jokesContainer = document.getElementById("jokesContainer");
      jokesContainer.innerHTML = "";
      jokes.forEach((joke) => {
        const jokeDiv = document.createElement("div");
        jokeDiv.className = "joke";
        jokeDiv.innerHTML = `<strong>${joke.setup}</strong><br>${joke.delivery}`;
        jokesContainer.appendChild(jokeDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching jokes:", error);
      alert(error.message);
    });
}

function addNewJoke(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const category = document.getElementById("newCategory").value;
  const setup = document.getElementById("newSetup").value;
  const delivery = document.getElementById("newDelivery").value;

  // Check if all fields are filled
  if (!category || !setup || !delivery) {
    alert("Please fill in all fields!");
    return;
  }

  fetch("/jokebook/joke/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, setup, delivery }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to add joke: " + response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      alert("Joke added successfully!"); // Alert success message
      fetchJokesByCategory(category); // Refresh jokes for the category

      // Clear the form fields
      document.getElementById("addJokeForm").reset(); // Reset the form fields
    })
    .catch((error) => {
      console.error("Error adding joke:", error);
      alert("Error adding joke: " + error.message); // alert error message
    });
}
// Fetch a random joke and categories when the page loads
window.onload = function () {
  fetchCategories();
  fetchRandomJoke();
};
