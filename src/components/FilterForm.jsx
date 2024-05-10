import classes from "./FilterForm.module.css";

export const FilterForm = (props) => {
  const {
    isSearchInputDisabled,
    isDropdownDisabled,
    onSearchTextChange,
    onDropdownValueChange,
  } = props;
  return (
    <div className={classes.control}>
      <label htmlFor="searchText" className={classes.label}>
        Search Text
      </label>
      <input
        id="searchText"
        type="text"
        name="email"
        className={classes.formControl}
        disabled={isSearchInputDisabled}
        onChange={onSearchTextChange}
      />
      <label htmlFor="skill-rating" className={classes.label}>
        Skill/Rating
      </label>
      <select
        id="skill-rating"
        name="criteria"
        className={classes.formControl}
        disabled={isDropdownDisabled}
        onChange={onDropdownValueChange}
      >
        <option value="">Select</option>
        <option value="skill">Skill</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  );
};
