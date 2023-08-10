import { useState, useReducer, useEffect } from "react";
import stateNames from "./states";
import styles from "./RequestForm.module.css";

const VALID_PHONE = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const VALID_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SYMBOLS = /[<>&|=`{}]/; //removed $
const MAX_VID_SIZE = 200 * 1024 * 1024;
const MAX_IMG_SIZE = 50 * 1024 * 1024;

// const initialState = {
//   images: [],
//   videos: [],
//   message: "",
//   formBody: {
//     firstName: "",
//     lastName: "",
//     companyName: "",
//     state: "Alabama",
//     email: "",
//     phoneNumber: "",
//     contactMethod: "email",
//     requestType: "question",
//     text: "",
//   },
// };

// const fileUpload = (type, state, files, array, max) => {
//   let uploadSize = 0;
//   console.log(files);
//   array.forEach((f) => {
//     //   if (SYMBOLS.test(f.name)) return;
//     console.log(f.size);
//   });
//   console.log("loop ended");
//   if (uploadSize > max)
//     return {
//       ...state,
//       message: `Files are too large! ${
//         max / 1024 / 1024
//       }MB cap. You have uploaded ${(uploadSize / 1024 / 1024).toFixed(2)}MB`,
//     };
//   return {
//     ...state,
//     [type]: files,
//   };
// };

// const reducer = (state, action) => {
//   if (SYMBOLS.test(action.payload)) return;
//   switch (action.type) {
//     case "formBody":
//       return {
//         ...state,
//         formBody: {
//           ...state.formBody,
//           [action.payload.name]: action.payload.value,
//         },
//       };
//     case "images":
//       let uploadImageSize = 0;
//       const imageFiles = Array.from(action.payload);
//       imageFiles.forEach((f) => {
//         if (SYMBOLS.test(f.name)) return;
//         uploadImageSize += f.size;
//       });

//       if (uploadImageSize > MAX_IMG_SIZE)
//         return {
//           ...state,
//           message: `Files are too large! ${
//             MAX_IMG_SIZE / 1024 / 1024
//           }MB cap. You have uploaded ${(uploadImageSize / 1024 / 1024).toFixed(
//             2
//           )}MB`,
//         };

//       return {
//         ...state,
//         images: imageFiles,
//       };
//     case "videos":
//       let uploadVideoSize = 0;
//       const videoFiles = Array.from(action.payload);
//       videoFiles.forEach((f) => {
//         if (SYMBOLS.test(f.name)) return;
//         uploadVideoSize += f.size;
//       });

//       if (uploadVideoSize > MAX_VID_SIZE)
//         return {
//           ...state,
//           message: `Files are too large! ${
//             MAX_VID_SIZE / 1024 / 1024
//           }MB cap. You have uploaded ${(uploadVideoSize / 1024 / 1024).toFixed(
//             2
//           )}MB`,
//         };
//       return {
//         ...state,
//         videos: videoFiles,
//       };
//     case "submit": {
//       if (
//         !state.formBody.firstName ||
//         !state.formBody.lastName ||
//         !state.formBody.email ||
//         !state.formBody.text
//       ) {
//         return {
//           ...state,
//           message: "Please input data into the required fields!",
//         };
//       } else if (
//         state.formBody.phoneNumber &&
//         !VALID_PHONE.test(state.formBody.phoneNumber)
//       ) {
//         return {
//           ...state,
//           message: "Please enter a valid phone number!",
//         };
//       } else if (
//         state.formBody.email &&
//         !VALID_EMAIL.test(state.formBody.email)
//       ) {
//         return {
//           ...state,
//           message: "Please enter a valid email address!",
//         };
//       } else {
//         return {
//           ...state,
//           message: "Processing request",
//         };
//       }
//     }
//     default:
//       return state;
//   }
//};
function RequestForm({ requestType, onChangeRequestType }) {
  // const [message, setMessage] = useState(null);
  // const [{ images, videos, formBody, message }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );
  const [formBody, setFormBody] = useState({
    firstName: "",
  });
  const [message, setMessage] = useState(null);
  const handleChange = (name, value) => {
    if (SYMBOLS.test(value)) return;
    if (name === "requestType") onChangeRequestType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (message !== "Processing request") return;
  //   const sendData = async () => {
  //     console.log("fetch triggered");
  //     const res = await fetch(`http://localhost:3001/send`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ images, videos, formBody }),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   sendData();
  // }, [message]);
  return (
    <>
      <form className={styles.form}>
        {/* <div className={styles.form__item}>
          <label>Request Type:&nbsp;</label>
          <select
            value={requestType}
            onChange={(e) => handleChange("requestType", e.target.value)}
          >
            <option value="question">General Question</option>
            <option value="repair">Repair</option>
            <option value="training">Training Request</option>
          </select>
        </div> */}
        <div className={styles.form__item}>
          <label>First Name*</label>
          <input
            type="text"
            value={formBody.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        {/* <div className={styles.form__item}>
          <label>Last Name*</label>
          <input
            type="text"
            value={formBody.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
        <div className={styles.form__item}>
          <label>Company Name</label>
          <input
            type="text"
            value={formBody.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
          />
        </div>
        <div className={styles.form__item}>
          <label>State</label>
          <select
            value={formBody.state}
            onChange={(e) => handleChange("state", e.target.value)}
          >
            {stateNames.map((s) => {
              return (
                <option value={s} key={s}>
                  {s}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.form__item}>
          <label>Email*</label>
          <input
            type="text"
            value={formBody.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className={styles.form__item}>
          <label>Phone Number</label>
          <input
            type="text"
            value={formBody.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
        <div className={styles.form__item}>
          <label>Preferred method of contact</label>
          <select
            value={formBody.contactMethod}
            onChange={(e) => handleChange("contactMethod", e.target.value)}
            disabled={!formBody.phoneNumber}
          >
            <option value="email">Email</option>
            <option value="text">Text Phone</option>
            <option value="call">Call Phone</option>
          </select>
        </div> */}
        <div className={styles.form__item}>
          <label>Image(s) (50MB cap)</label>
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/gif"
            value={formBody.images}
            onChange={(e) => handleChange("images", e.target.files)}
          />
        </div>
        {/*
        <div className={styles.form__item}>
          <label>Video(s) (200MB cap)</label>
          <input
            type="file"
            multiple
            accept="video/mp4, video/webm, video/quicktime"
            value={formBody.videos}
            onChange={(e) => handleChange('videos', e.target.files)}
            
          />
        </div>
        <div className={`${styles.form__item} ${styles.text}`}>
          <label>
            {requestType === "question" && "What is your question?*"}
            {requestType === "repair" && "Describe what needs to be repaired.*"}
            {requestType === "training" &&
              "What are you looking to be trained on?"}
          </label>
          <textarea
            placeholder={
              requestType === "repair"
                ? "NOTE: We STRONGLY recommend uploading relevant images / videos."
                : "Enter text here..."
            }
            value={formBody.text}
            onChange={(e) => handleChange("text", e.target.value)}
          ></textarea>
        </div>*/}
        <button onClick={handleSubmit}>Submit Ticket</button>
      </form>
      <p>{message}</p>
    </>
  );
}

export default RequestForm;
