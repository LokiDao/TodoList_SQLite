import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { showDialog } from "../slices/dialog.slice";
import { DialogType } from "../types/dialog.types";

const apiMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const errorMessage =
        (action.payload as { message?: string })?.message ||
        "Something went wrong";
      dispatch(
        showDialog({
          title: "Error",
          content: errorMessage,
          type: DialogType.ERROR,
        }),
      );
    }
    return next(action);
  };

export default apiMiddleware;
