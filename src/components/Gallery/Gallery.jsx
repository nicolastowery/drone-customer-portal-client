import InfoBlock from "../InfoBlock/InfoBlock";
import styles from "./Gallery.module.css";

function Gallery({ files }) {
  console.log(files);
  return (
    <InfoBlock title="Gallery">
      <div className={styles.gallery}>
        {files.map((file, index) => (
          <div key={index} className={styles.galleryFlex}>
            {/* Display image */}
            {file.mime_type.includes("image") && (
              <img
                className={`${styles.gallery__item} ${styles.image}`}
                src={`${file.filename}`}
                alt={`File ${index + 1}`}
              />
            )}
            {/* Display video */}
            {file.mime_type.includes("video") && (
              <video
                controls
                src={`${file.filename}`}
                className={styles.gallery__item}
              />
            )}
          </div>
        ))}
      </div>
    </InfoBlock>
  );
}

export default Gallery;
