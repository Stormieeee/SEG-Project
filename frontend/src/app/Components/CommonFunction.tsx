//Return Email from Session Storage
export default function getEmailFromSessionStorage(): string {
  try {
    // Check if session storage is supported
    if (typeof sessionStorage !== "undefined") {
      // Retrieve the email from session storage
      const userEmail = sessionStorage.getItem("userEmail");
      console.log("Email retrieved from session storage:", userEmail);
      return userEmail || "";
    } else {
      console.error("Session storage is not supported in this browser.");
      return "";
    }
  } catch (error) {
    console.error("Error retrieving email from session storage:", error);
    return "";
  }
}
