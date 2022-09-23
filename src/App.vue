<script setup>
import { reactive } from "vue";

// Store list of open restaurants
const openRestaurants = reactive({ restaurants: [] });

/**
 * Queries the API for all open restaurants for the entered date and time.
 * @param {string} dateTime The date/time to query
 */
async function getOpenRestaurants(dateTime) {
  // Convert the parameter to a date object
  const newDate = new Date(dateTime);

  // Parse out the date as YYYY-MM-DD
  const parsedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;

  // Parse out the time as HH:MM
  const parsedTime = `${newDate.getHours().toString().padStart(2, "0")}:${(
    newDate.getMinutes() + 1
  )
    .toString()
    .padStart(2, "0")}`;

  console.log(`${parsedDate} ${parsedTime}`);

  // Fetch the list of open restaurants from the API
  const apiResult = await fetch(
    `https://restaurant-finder.azurewebsites.net/api/RestaurantFinder?date=${parsedDate}&time=${parsedTime}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );

  // Extract the JSON from the response
  const results = await apiResult.json();

  // Load the results into the reactive object so they can be rendered on the page
  openRestaurants.restaurants = [...results.restaurants];
}

/**
 * Displays the datepicker input.
 */
function showDatePicker() {
  document.getElementById("later").focus();
}
</script>

<template>
  <header>
    What's open <a @click.stop.prevent="() => getOpenRestaurants(Date.now())">now</a>? Or
    <a @click.stop.prevent="showDatePicker">later</a>?
  </header>
  <input
    type="datetime-local"
    id="later"
    @input="(event) => getOpenRestaurants(event.target.value)"
  />

  <ul>
    <li v-for="(restaurant, index) in openRestaurants.restaurants" :key="index">
      {{ restaurant }}
    </li>
  </ul>
</template>

<style scoped>
header {
  font-size: x-large;
}

input#later {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 5px;
  font-size: large;
}

a {
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-color: var(--color-text);
  transition: all 0.5s ease;
}

a:hover {
  /* color: var(--color-text); */
  filter: brightness(50%);
  cursor: pointer;
  text-decoration-color: transparent;
}
</style>
