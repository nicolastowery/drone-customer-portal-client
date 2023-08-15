import styles from "./InfoBlock.module.css";
function InfoBlock({ containerType, title, listItems, children }) {
  return (
    <div className={styles.infoBlock}>
      <h2 className={styles.infoHeading}>
        <i>{title}</i>
      </h2>
      {containerType === "list" ? (
        <div className={styles.infoListContainer}>
          <ul className={styles.fields}>
            {listItems.map((item) => {
              return (
                <>
                  {Object.keys(item).map((key) => {
                    if (!item[key]) return;
                    return (
                      <li key={key}>
                        <span>{key}</span>
                      </li>
                    );
                  })}
                </>
              );
            })}
          </ul>
          {
            <ul className={styles.values}>
              {listItems.map((item) => {
                return (
                  <>
                    {Object.keys(item).map((key) => {
                      if (!item[key]) return;
                      return (
                        <li key={item[key]}>
                          <span>{item[key]}</span>
                        </li>
                      );
                    })}
                  </>
                );
              })}
            </ul>
          }
        </div>
      ) : (
        <span className={styles.infoSpan}>{children}</span>
      )}
    </div>
  );
}

export default InfoBlock;
