import { toast } from "react-toastify";

export default function errorHandler(err) {
  console.error(err);

  if (err.statusCode === 400) {
    switch (err.errorCode) {
      case "FIELD_EXISTS":
        toast.error(`The ${err.field} already exists. Please choose another.`);
        break;
      case "FIELD_NULL":
        toast.error(`The ${err.field} is required and cannot be empty.`);
        break;
      case "FIELD_INVALID":
        toast.error(`Invalid ${err.field}. Please check your input.`);
        break;
      default:
        toast.error("Invalid request. Please check your input and try again.");
    }
  } else if (err.statusCode === 404) {
    toast.error("The requested record was not found.");
  } else if (err.statusCode === 403) {
    toast.warning("You don't have permission to perform this action.");
  } else if (err.statusCode === 401) {
    toast.warning("Incorrect username or password.");
  } else if (err.statusCode === 429) {
    toast.warning("Too many requests. Please try again later.");
  } else if (err.statusCode === 500) {
    switch (err.errorCode) {
      case "DATABASE_ERROR":
        toast.error(
          "Could not connect to the database. Please try again later"
        );
        break;
      default:
        toast.error(
          "An unexpected server error occurred. Please try again later."
        );
    }
  } else {
    toast.error("An unknown error occurred. Please try again.");
  }
}
