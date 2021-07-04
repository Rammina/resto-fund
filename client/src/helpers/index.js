import warningImg from "../assets/icons/warning.png";

import _ from "lodash";
import React from "react";
import { format } from "date-fns";
import compareAsc from "date-fns/compareAsc";
import { toast } from "react-toastify";

// Helper functions

// element position
export const findPosX = (obj) => {
  var curleft = 0;
  if (obj.offsetParent)
    while (1) {
      curleft += obj.offsetLeft;
      if (!obj.offsetParent) break;
      obj = obj.offsetParent;
    }
  else if (obj.x) curleft += obj.x;
  return curleft;
};

export const findPosY = (obj) => {
  var curtop = 0;
  if (obj.offsetParent)
    while (1) {
      curtop += obj.offsetTop;
      if (!obj.offsetParent) break;
      obj = obj.offsetParent;
    }
  else if (obj.y) curtop += obj.y;
  return curtop;
};

// error display functions
export const renderError = (meta, sectionName) => {
  const { error, touched } = meta;
  // Creates an error message if there is an error in the input field is touched
  if (error && touched) {
    return (
      <div className={`${sectionName} error-container`}>
        <img className="error-image" src={warningImg} alt="warning sign"></img>
        {error}
      </div>
    );
  }
  return null;
};

export const getErrorClass = ({ error, touched }) => {
  return error && touched ? "error" : null;
};

// This is used for helping sort object based on property names' values
// key refers to the name of the property, order can either be asc or desc

export const compareValues = (key, order = "asc") => {
  console.log("comparing values");
  // if date values are being compared
  if (key === "date") {
    return function innerDateSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        console.log(`${key} doesn't exist`);
        return 0;
      }
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      const orderValue = order === "desc" ? -1 : 1;
      return compareAsc(dateTimeA, dateTimeB) * orderValue;
    };
  }
  // typical lexical comparison, or numerical comparison
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      console.log(`${key} doesn't exist`);
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

// // usage: array is sorted by band, in ascending order by default:
// // //singers.sort(compareValues('band'));

// Use this to compare objects based on key count of their property
//  a & b - objects to be compared
//  propName - string name of property to be used as basis for comparison
export const compareKeysInProp = (a, b, propName) => {
  // If both items don't have the property name, they are equal
  if (!a[propName] && !b[propName]) {
    return 0;
  } // if a has the property and b does not, a is greater
  else if (a[propName] && !b[propName]) {
    return 1;
  } // if a does not have the property and b does, b is greater
  else if (!a[propName] && b[propName]) {
    return -1;
  } // if both of them have the property, compare their keys' lengths
  else if (a[propName] && b[propName]) {
    return Object.keys(a[propName]).length > Object.keys(b[propName]).length
      ? 1
      : -1;
  }
};

//String functions
export const ellipsifyString = (string, length = 10) => {
  if (!string) {
    return null;
  }
  if (string.length > length) {
    return `${string.substring(0, length)}...
    `;
  }
  return string;
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// array functions
export const sortAlphabeticallyByProp = (property) =>
  function (a, b) {
    var textA = a[property].toUpperCase();
    var textB = b[property].toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

export const sortAlphabeticallyByNestedProp = (prop1, prop2) =>
  function (a, b) {
    var textA = a[prop1][prop2].toUpperCase();
    var textB = b[prop1][prop2].toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

export const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};

export const objectToArray = (
  object,
  keyAsProp /*string(optional)
            ---name of a property in which the original object key will be stored */
) => {
  let array = [];
  for (let objectKey in object) {
    if (object.hasOwnProperty(objectKey)) {
      if (keyAsProp) {
        object[objectKey][keyAsProp] = objectKey;
      }
      array.push(object[objectKey]);
    }
  }
  return array;
};

export const arrayHasObjectWithPropAndValue = (array, propName, value) => {
  console.log(array);
  if (Array.isArray(array)) {
    return false;
  }
  for (let item of array) {
    if (item[propName] === value) return true;
  }
  return false;
};

// clipboard functionality
export const copyToClipboard = (text) => {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

// regular expression testing

// email validator
export const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// date-time functions
export const getCurrentDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const getCurrentTime = () => {
  return format(new Date(), "hh:mma");
};

export const convertDateToHtmlInputValue = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

export const convertToMDY = (date) => {
  return date ? format(new Date(date), "MM/dd/yyyy") : null;
};

export const toMilitaryTime = (datetime) => {
  return format(datetime, "HH:mm");
};

export const toStandardTime = (time) => {
  return format(new Date(`${getCurrentDate()}T${time}`), "hh:mma");
};

export const timestampToStandardTime = (timestamp) => {
  return format(new Date(timestamp), "hh:mma");
};

export const toStandardDateAndTime = (datetime) => {
  if (!datetime) return null;
  return format(new Date(datetime), "Pp");
};

export const standardToMilitary = function standardToMilitary(time) {
  var PM = time.match("PM") ? true : false;
  var hour;
  var minute;

  time = time.split(":");

  if (PM) {
    hour = 12 + parseInt(time[0], 10);
    minute = time[1].replace("PM", "");
  } else {
    hour = time[0];
    minute = time[1].replace("AM", "");
  }

  return `${hour}:${minute}`;
};

// string FUNCTIONS
// retrieve the file name by splitting
export const getFilenameFromDir = (string, separator) => {
  if (!separator) {
    string.split("\\").pop();
  }
  return string.split(separator).pop();
};

// React toastify
export const renderNotification = ({
  message,
  type,
  position,
  onOpenCb,
  onCloseCb,
}) => {
  toast[type](message, {
    position: position || "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onOpen: () => {
      if (onOpenCb) onOpenCb();
    },
    onClose: () => {
      if (onCloseCb) onCloseCb();
    },
  });
};
