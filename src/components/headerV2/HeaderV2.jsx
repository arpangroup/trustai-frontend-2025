import styles from './HeaderV2.module.css';

const HeaderV2 = () => {
  return (
    <div className={styles.headerWhite}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}></div>
        <div className={styles.logoText}>
          Trust<span style={{ color: "#46dbff" }}>AI</span>
        </div>
      </div>
      <div className={styles.headerTitle}>Reserve</div>
      <div className={styles.headerIcons}>
        {/* SVGs */}
      </div>
    </div>
  );
};

export default HeaderV2;