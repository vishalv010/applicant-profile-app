import { TABLE_CONTENT_TYPE } from "../utility";
import classes from "./SkillsTable.module.css";
import Button from "@mui/material/Button";

export const SkillsTable = (props) => {
  const {
    filteredData,
    onSkillChange,
    onRatingChange,
    actionHandler,
    deleteRow,
    addSkill,
  } = props;
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.table}>
        <tr>
          <th>Skill</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
        {filteredData.length > 0 ? (
          filteredData.map((row) => {
            return (
              <tr key={row.id}>
                <td>
                  {row.type === TABLE_CONTENT_TYPE.INPUT ? (
                    <input
                      type="text"
                      className={classes.inputRow}
                      value={row.skill}
                      onChange={(event) => onSkillChange(event, row.id)}
                    />
                  ) : (
                    <p>{row.skill}</p>
                  )}
                </td>
                <td>
                  {" "}
                  {row.type === TABLE_CONTENT_TYPE.INPUT ? (
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={row.rating}
                      className={classes.inputRow}
                      onChange={(event) => onRatingChange(event, row.id)}
                    />
                  ) : (
                    <p>{row.rating}</p>
                  )}
                </td>
                <td>
                  <Button
                    variant="outlined"
                    sx={classes.actionButton}
                    onClick={() => actionHandler(row.id, row.buttonText)}
                  >
                    {row.buttonText}
                  </Button>
                  <Button variant="outlined" onClick={() => deleteRow(row.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="3" className={classes.noRecords}>
              No Records Found
            </td>
          </tr>
        )}
      </table>
      <Button
        variant="contained"
        sx={{display: 'block', margin: 'auto'}}
        onClick={addSkill}
      >
        Add Skill
      </Button>
    </div>
  );
};
