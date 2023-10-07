import { toast } from "react-toastify";

export const toastError = (errorMessage: string): void => {
  toast.error(errorMessage);
};
