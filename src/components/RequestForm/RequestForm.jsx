import { useState } from "react";
import stateNames from "./states";
import styles from "./RequestForm.module.css";

const VALID_PHONE = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const VALID_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SYMBOLS = /[<>&|=`{}]/; //removed $
const MAX_VID_SIZE = 200 * 1024 * 1024;
const MAX_IMG_SIZE = 50 * 1024 * 1024;

function RequestForm({ requestType, onChangeRequestType }) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [qr, setQr] = useState(null);
  const [message, setMessage] = useState("");
  const formData = new FormData();
  const [formBody, setFormBody] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    requestType: "question",
    state: "Alabama",
    email: "",
    phoneNumber: "",
    contactMethod: "email",
    text: "",
  });
  const handleChange = (name, value) => {
    if (SYMBOLS.test(value)) return;
    if (name === "requestType") onChangeRequestType(value);
    setFormBody((prev) => ({ ...prev, [name]: value }));
  };

  //this function needs to be cleaned up
  //relevant state should set back to empty if files were rejected
  const handleFileChange = (fileType, files) => {
    if (fileType === "qr") {
      console.log("file type:", typeof files);
      setQr(files);
    }
    const maxSize = fileType === "images" ? MAX_IMG_SIZE : MAX_VID_SIZE;
    let uploadSize = 0;
    const filesArr = Array.from(files);
    const isValid = filesArr.every((f) => {
      //check if any file name contains an invalid char
      if (SYMBOLS.test(f.name)) {
        setMessage("File name must not contain symbols.");
        return false;
      }
      uploadSize += f.size;

      //check if the size of the uploaded files exceeds the maximum allowed
      if (uploadSize > maxSize) {
        setMessage(
          `Files are too large! ${
            maxSize / 1024 / 1024
          }MB cap. You have uploaded ${(uploadSize / 1024 / 1024).toFixed(2)}MB`
        );
        return false;
      }

      return true;
    });
    console.log(isValid);
    if (isValid) {
      //set message back to default state and add the images to the appropriate state
      setMessage("");
      fileType === "images" ? setImages(files) : setVideos(files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formBody.firstName ||
      !formBody.lastName ||
      !formBody.email ||
      !formBody.text ||
      (formBody.requestType === "warranty" && !qr)
    ) {
      setMessage("Please input data into the required fields!");
      return;
    }

    if (!VALID_EMAIL.test(formBody.email)) {
      setMessage("Please input a valid email address!");
      return;
    }

    if (formBody.phoneNumber && !VALID_PHONE.test(formBody.phoneNumber)) {
      setMessage("Please input a valid phone number!");
      return;
    }
    try {
      console.log("processing request!");
      setMessage("Processing request...");
      //see about appending formBody in one line...
      //this is ugly as sin but it works....
      formData.delete("firstName");
      formData.delete("lastName");
      formData.delete("companyName");
      formData.delete("requestType");
      formData.delete("state");
      formData.delete("email");
      formData.delete("phoneNumber");
      formData.delete("contactMethod");
      formData.delete("text");
      formData.delete("files");

      formData.append("firstName", formBody.firstName);
      formData.append("lastName", formBody.lastName);
      formData.append("companyName", formBody.companyName);
      formData.append("requestType", formBody.requestType);
      formData.append("state", formBody.state);
      formData.append("email", formBody.email);
      formData.append("phoneNumber", formBody.phoneNumber);
      formData.append("contactMethod", formBody.contactMethod);
      formData.append("text", formBody.text);
      qr && console.log("there is a qr");
      qr && formData.append("files", qr);
      images &&
        Array.from(images).forEach((image) => formData.append("files", image));
      videos &&
        Array.from(videos).forEach((video) => formData.append("files", video));

      console.log("sending data!");
      const res = await fetch(`http://localhost:3001/send`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setMessage(data);
      } else {
        setMessage(data.error || "An error occuerred. Please try again later.");
      }
    } catch (err) {
      console.log("Error:", err);
      setMessage("An error occured. Please try again later");
    }
  };
  return (
    <>
      <form className={styles.form}>
        <div className={styles.form__item}>
          <label>Request Type</label>
          <select
            value={requestType}
            onChange={(e) => handleChange("requestType", e.target.value)}
          >
            <option value="question">General Question</option>
            <option value="warranty">Warranty Repair</option>
            <option value="repair">Non-Warranty Repair</option>
            <option value="training">Training Request</option>
          </select>
        </div>
        <div className={styles.form__item}>
          <label htmlFor="firstName">First Name*</label>
          <input
            type="text"
            id="firstName"
            value={formBody.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        <div className={styles.form__item}>
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
        </div>
        {requestType === "warranty" && (
          <div className={styles.form__item}>
            <label htmlFor="qr">QR Code*</label>
            <input
              id="qr"
              type="file"
              accept="image/jpeg, image/png, image/gif"
              value={formBody.qr}
              onChange={(e) => handleFileChange("qr", e.target.files)}
            />
          </div>
        )}
        <div className={styles.form__item}>
          <label htmlFor="images">Image(s) (50MB cap)</label>
          <input
            id="images"
            type="file"
            multiple
            accept="image/jpeg, image/png, image/gif"
            value={formBody.images}
            onChange={(e) => handleFileChange("images", e.target.files)}
          />
        </div>
        <div className={styles.form__item}>
          <label>Video(s) (200MB cap)</label>
          <input
            type="file"
            multiple
            accept="video/mp4, video/webm, video/quicktime"
            onChange={(e) => handleFileChange("videos", e.target.files)}
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
              requestType === "repair" || requestType === "warranty"
                ? "It is STRONGLY recommend to upload relevant images / videos."
                : "Enter text here..."
            }
            value={formBody.text}
            onChange={(e) => handleChange("text", e.target.value)}
            maxLength={8000}
          ></textarea>
        </div>

        <button onClick={handleSubmit}>Submit Ticket</button>
      </form>
      <p>{message}</p>
    </>
  );
}

export default RequestForm;
