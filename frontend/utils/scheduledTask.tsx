const cron = require("node-cron");
const axios = require("axios");

// Define the function to make the API request
const makeApiRequest = async () => {
  try {
    const response = await fetch(
      "http://localhost:8000/daily_bookingsR_clear/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      // Handle success response if needed
      console.log("Bookings cleared successfully!");
    } else {
      // Handle error response
      console.error("Failed to clear bookings!");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

// Schedule the task to run at 00:00 am every day
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled task...");
  await makeApiRequest();
});
