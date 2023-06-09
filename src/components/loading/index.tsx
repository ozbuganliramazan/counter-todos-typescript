import styles from "./index.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <i className={"fa-solid fa-dollar-sign fa-spin " + styles.loading}></i>
    </div>
  );
}