/* eslint-disable curly */
import { Todo } from "../models";

const getDueDateStatus = (item: Todo) => {
  const now = new Date();
  const dueDate = new Date(item.dueDate ?? new Date());
  const timeDifference = dueDate.getTime() - now.getTime();

  // Calculate days, hours, minutes, and seconds difference
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display only the most significant non-zero part
  let result = "";

  if (daysDifference) result = `${Math.abs(daysDifference)} days`;
  else if (hoursDifference) result = `${Math.abs(hoursDifference)} hours`;
  else if (minutesDifference) result = `${Math.abs(minutesDifference)} minutes`;
  else if (secondsDifference) result = `${Math.abs(secondsDifference)} seconds`;

  if (timeDifference > 0) {
    return `In ${result}`;
  } else {
    return `Overdue by ${result}`;
  }
};

export default getDueDateStatus;
