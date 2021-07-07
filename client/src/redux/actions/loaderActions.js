import { ACTION_SHOW_LOADER } from "./types";
import { capitalizeFirstLetter } from "../../helpers";

export const actionShowLoader = (
  formName /*name of the form (needs to be consistent)*/,
  show /*show is a Boolean that decides whether to show or hide a loader*/
) => {
  return {
    type: ACTION_SHOW_LOADER,
    payload: { ["show" + capitalizeFirstLetter(formName) + "Loader"]: show },
  };
};
