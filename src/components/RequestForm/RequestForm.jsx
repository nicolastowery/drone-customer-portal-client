import { useState } from "react";
import toast from "react-hot-toast";
import stateNames from "./states";
import InputField from "./InputField";
import SelectField from "../SelectField/SelectField";
import FileInput from "./FileInput";
import styles from "./RequestForm.module.css";
import TextArea from "./TextArea";
import { SERVER_NAME } from "../../utils/constants";
import Message from "../Message/Message";

const VALID_PHONE = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const VALID_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const SYMBOLS = /[<>&|=`{}]/;
const MAX_VID_SIZE = 200 * 1024 * 1024;
const MAX_IMG_SIZE = 50 * 1024 * 1024;

function RequestForm({ requestType, onChangeRequestType, onSubmit }) {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [qr, setQr] = useState(null);
  const formData = new FormData();
  const [formBody, setFormBody] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    requestType: "General Question",
    state: "Alabama",
    email: "",
    phoneNumber: "",
    contactMethod: "email",
    text: "",
  });
  const handleFieldChange = (name, value) => {
    if (SYMBOLS.test(value)) return;
    if (name === "requestType") onChangeRequestType(value);
    setFormBody((prev) => ({ ...prev, [name]: value }));
  };

  //relevant state should set back to empty if files were rejected
  const handleFileChange = (fileType, files) => {
    if (fileType === "qr") {
      files[0].size < MAX_IMG_SIZE && setQr(files[0]);
      return;
    }
    const maxSize = fileType === "images" ? MAX_IMG_SIZE : MAX_VID_SIZE;
    let uploadSize = 0;
    const filesArr = Array.from(files);
    const isValid = filesArr.every((f) => {
      //check if any file name contains an invalid char
      if (SYMBOLS.test(f.name)) {
        toast.error("File name must not contain symbols.");
        return false;
      }
      uploadSize += f.size;

      //check if the size of the uploaded files exceeds the maximum allowed
      if (uploadSize > maxSize) {
        toast.error(
          `Files are too large! ${
            maxSize / 1024 / 1024
          }MB cap. You have uploaded ${(uploadSize / 1024 / 1024).toFixed(2)}MB`
        );
        return false;
      }

      return true;
    });
    if (isValid) {
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
      (formBody.requestType === "Warranty Repair" && !qr)
    ) {
      toast.error("Please input data into the required fields!");
      return;
    }

    if (!VALID_EMAIL.test(formBody.email)) {
      toast.error("Please input a valid email address!");
      return;
    }

    if (formBody.phoneNumber && !VALID_PHONE.test(formBody.phoneNumber)) {
      toast.error("Please input a valid phone number!");
      return;
    }
    try {
      toast.success("Processing request...");
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
      qr && formData.append("files", qr);
      images &&
        Array.from(images).forEach((image) => formData.append("files", image));
      videos &&
        Array.from(videos).forEach((video) => formData.append("files", video));

      const res = await fetch(`${SERVER_NAME}/send`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        onSubmit(true);
      } else {
        toast.error(
          data.error || "An error occuerred. Please try again later."
        );
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err.message);
    }
  };
  return (
    <>
      <form className={styles.form}>
        <SelectField
          label={"Request Type"}
          value={requestType}
          onChange={(e) => handleFieldChange("requestType", e.target.value)}
          className={styles.form__item}
          options={[
            "General Question",
            "Warranty Repair",
            "Non-Warranty Repair",
            "Training Request",
          ]}
        />
        <InputField
          label="First Name"
          value={formBody.firstName}
          onChange={(e) => handleFieldChange("firstName", e.target.value)}
          isRequired={true}
          className={styles.form__item}
        />
        <InputField
          label="Last Name"
          value={formBody.lastName}
          onChange={(e) => handleFieldChange("lastName", e.target.value)}
          isRequired={true}
          className={styles.form__item}
        />
        <InputField
          label="Company"
          value={formBody.companyName}
          onChange={(e) => handleFieldChange("companyName", e.target.value)}
          className={styles.form__item}
        />
        <SelectField
          label={"State"}
          value={formBody.state}
          onChange={(e) => handleFieldChange("state", e.target.value)}
          className={styles.form__item}
          options={stateNames}
        />
        <InputField
          label="Email"
          value={formBody.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          className={styles.form__item}
          isRequired={true}
        />
        <InputField
          label="Phone Number"
          value={formBody.phoneNumber}
          onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
          className={styles.form__item}
        />
        <SelectField
          label={"Preferred Contact Method"}
          value={formBody.contactMethod}
          onChange={(e) => handleFieldChange("contactMethod", e.target.value)}
          className={styles.form__item}
          options={["Email", "Text Phone", "Call Phone"]}
          disabled={!formBody.phoneNumber}
        />
        {requestType === "Warranty Repair" && (
          <FileInput
            label={"QR Code"}
            isRequired={true}
            className={styles.form__item}
            accept={"image/jpeg, image/png"}
            value={formBody.qr}
            onChange={(e) => handleFileChange("qr", e.target.files)}
            multiple={false}
          />
        )}
        <FileInput
          label={"Image(s) (50MB cap)"}
          className={styles.form__item}
          accept={"image/jpeg, image/png, image/gif"}
          value={formBody.images}
          onChange={(e) => handleFileChange("images", e.target.files)}
        />
        <FileInput
          label={"Video(s) (200MB cap)"}
          className={styles.form__item}
          accept={"video/mp4, video/webm, video/quicktime"}
          value={formBody.videos}
          onChange={(e) => handleFileChange("videos", e.target.files)}
        />
        <TextArea
          label={(() => {
            if (requestType === "General Question") {
              return "What is your question?";
            } else if (
              requestType === "Non-Warranty Repair" ||
              requestType === "Warranty Repair"
            ) {
              return "Describe what needs to be repaired.";
            } else if (requestType === "Training Request") {
              return "What are you looking to be trained on?";
            } else {
              return "";
            }
          })()}
          placeholder={(() => {
            if (
              requestType === "Non-Warranty Repair" ||
              requestType === "Warranty Repair"
            ) {
              return "It is STRONGLY recommend to upload relevant images / videos.";
            } else {
              return "Enter text here...";
            }
          })()}
          value={formBody.text}
          onChange={(e) => handleFieldChange("text", e.target.value)}
          maxLength={8000}
          isRequired={true}
          className={`${styles.form__item} ${styles.text}`}
          textareaClassName={styles.textarea}
        />

        <button onClick={handleSubmit} className={styles.button}>
          SUBMIT
        </button>
      </form>
    </>
  );
}

export default RequestForm;
