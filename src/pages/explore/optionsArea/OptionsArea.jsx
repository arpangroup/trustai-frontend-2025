export default function OptionsArea({ showOptions, setShowOptions }) {
  return (
    <div className="options-area">
      <span
        className={showOptions ? "selected" : ""}
        onClick={() => setShowOptions(true)}
      >
        Options Area
      </span>
      <span
        className={!showOptions ? "selected" : ""}
        onClick={() => setShowOptions(false)}
      >
        Free Zone
      </span>
    </div>
  );
}
