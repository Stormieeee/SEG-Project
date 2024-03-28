export async function getDataFromServer(
  date: any,
  startTime: any,
  endTime: any,
  capacity: any
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
          capacity: capacity,
          sec: "3R",
          date: date,
          start_time: startTime,
          end_time: endTime,
        }),
      }
    );

    if (response.ok) {
      const dataFromApi = await response.json();
      return {
        dataFromApi,
        currentDate: date,
        startTime,
        endTime,
      };
    } else {
      console.log("Check Availability Failed");
      return {
        dataFromApi: null,
        currentDate: date,
        startTime,
        endTime,
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      dataFromApi: null,
      currentDate: date,
      startTime,
      endTime,
    };
  }
}
