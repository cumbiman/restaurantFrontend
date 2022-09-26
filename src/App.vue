<template>
  <header>
    <div>
      What's open
      <!-- Find restaurants that are open now -->
      <a @click.stop.prevent="getOpenRestaurantsNow">now</a>? Or
      <!-- Find restaurants that are open later -->
      <template v-if="!showDatePicker">
        <a @click.stop.prevent="showDatePicker = !showDatePicker">later</a>?</template
      >
      <!-- Date/time picker -->
      <template v-else>
        <input
          type="datetime-local"
          class="later"
          @input="(event) => getOpenRestaurants(event.target.value)"
        />
        ?</template
      >
    </div>
  </header>

  <results>
    <!-- List of results -->
    <RestaurantItem
      v-for="(restaurant, index) in openRestaurants"
      :key="index"
      :restaurant="restaurant"
    >
    </RestaurantItem>
  </results>
</template>

<script setup>
import { ref } from "vue";
import RestaurantItem from "./components/RestaurantItem.vue";

// Store list of open restaurants
const openRestaurants = ref([]);

// Whether to show the date picker or not
const showDatePicker = ref(false);

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

  console.log(`Parsed date/time: ${parsedDate} ${parsedTime}`);

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
  openRestaurants.value = [...results.restaurants];
}

/**
 * Fires when "now" is clicked. Hides datepicker (if it's visible) before fetching list of
 * open restaurants.
 */
function getOpenRestaurantsNow() {
  showDatePicker.value = false;
  getOpenRestaurants(Date.now());
}
</script>

<style scoped>
header {
  font-size: x-large;
  display: flex;
  align-items: center;
  justify-content: center;
}

results {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  height: calc(100vh - 50%);
  align-content: flex-start;
}

@media (max-width: 1024px) {
  results {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 800px) {
  results {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media only screen and (max-width: 600px) {
  results {
    grid-template-columns: 1fr;
  }
}

.later {
  background-color: var(--color-background-soft);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  padding: 5px;
  font-size: large;
}

@media (prefers-color-scheme: dark) {
  .later {
    color-scheme: dark;
  }

  ::-webkit-calendar-picker-indicator {
    filter: brightness(75%);
  }
}

a {
  color: var(--color-text);
  text-decoration: underline;
  text-decoration-color: var(--color-text);
  transition: all 0.2s ease;
}

a:hover {
  filter: brightness(50%);
  cursor: pointer;
  text-decoration-color: transparent;
}
</style>
