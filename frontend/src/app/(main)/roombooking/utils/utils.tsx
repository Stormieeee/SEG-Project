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

export async function handleRoomBooking(
  roomID: string,
  capacity: number,
  description: string,
  date: string,
  startTime: string,
  endTime: string
) {
  if (!roomID || !capacity || !description || !date || !startTime || !endTime) {
    console.log("One or more parameters is empty");
    return; // Exit the function if any parameter is empty
  } else {
    try {
      const userEmail = sessionStorage.getItem("userEmail");
      if (!userEmail) {
        throw new Error("User email is not available in session storage");
      }

      const response = await fetch("http://localhost:8000/booking_request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userEmail,
          room_id: roomID,
          capacity: capacity,
          description: description,
          date: date,
          start_time: startTime,
          end_time: endTime,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to book the room");
      }
    } catch (error) {
      console.error("Error:", error);
      return {
        error: error,
        currentDate: date,
        startTime,
        endTime,
      };
    }
  }
}

export async function getCapacity(roomid: string) {
  try {
    const response = await fetch("http://localhost:8000/Room_Quantity/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: roomid,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      console.log("Capacity Fetch Failed");
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: error,
    };
  }
}

export async function getRoomDetails(roomid: string) {
  try {
    const response = await fetch("http://localhost:8000/Room_Details/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomID: roomid,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
      
    } else {
      console.log("Capacity Fetch Failed");
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      error: error,
    };
  }
}
