import InfoBlock from "../InfoBlock/InfoBlock";
import styles from "./Gallery.module.css";
function Gallery({ files }) {
  return (
    <InfoBlock title="Gallery">
      <div className={styles.gallery}>
        {files.map((file, index) => (
          <div key={index} className={styles.galleryFlex}>
            {/* Display image */}
            {file.type.includes("image") && (
              <img
                className={`${styles.gallery__item} ${styles.image}`}
                src={`http://localhost:3001/${file.url}`}
                alt={`File ${index + 1}`}
              />
            )}
            {/* Display video */}
            {file.type.includes("video") && (
              <video
                controls
                src={`http://localhost:3001/${file.url}`}
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
