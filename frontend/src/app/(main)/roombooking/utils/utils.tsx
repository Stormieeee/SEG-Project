export async function getDataFromServer(
  date: any,
  startTime: any,
  endTime: any
) {
  try {
    const response = await fetch(
      "http://localhost:8000/check_room_availability/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: sessionStorage.getItem("userEmail"),
          capacity: 40,
          sec: "3R",
          date: date,
          start_time: startTime,
          end_time: endTime,
        }),
      }
    );

    if (response.ok) {
      const fetchedData = await response.json();
      return {
        fetchedData,
        currentDate: date,
        startTime,
        endTime,
      };
    } else {
      console.log("Check Availability Failed");
      return {
        fetchedData: null,
        currentDate: date,
        startTime,
        endTime,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      fetchedData: null,
      currentDate: date,
      startTime,
      endTime,
    };
  }
}
