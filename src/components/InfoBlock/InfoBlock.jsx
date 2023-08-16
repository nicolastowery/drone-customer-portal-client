import React from "react";
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
            {listItems.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {Object.keys(item).map((key) => {
                    return (
                      item[key] && (
                        <li key={key} className={styles.li}>
                          <span>{key}</span>
                        </li>
                      )
                    );
                  })}
                </React.Fragment>
              );
            })}
          </ul>
          {
            <ul className={styles.values}>
              {listItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {Object.keys(item).map((key) => {
                      return (
                        item[key] && (
                          <li key={item[key]} className={styles.li}>
                            <span>{item[key]}</span>
                          </li>
                        )
                      );
                    })}
                  </React.Fragment>
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
