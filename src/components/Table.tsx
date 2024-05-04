import { useState } from "react";
import { ExpenseObject } from "../App";
interface Props {
  expenses?: Array<ExpenseObject>;
  onDelete: (arg0: ExpenseObject) => void;
}
const Table = (props: Props) => {
  let cats = ["All"];
  const [visibleCategory, setVisibleCategory] = useState("All");
  return (
    <>
      <select
        className="form-select"
        onChange={(event) => setVisibleCategory(event.target.value)}
      >
        {props.expenses?.map((exp) => (cats = [...cats, exp.Category]))}
        {(cats = [...new Set(cats)])}
        {cats.map((cat) => (
          <option id={cat}>{cat}</option>
        ))}
      </select>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {visibleCategory === "All"
            ? props.expenses?.map((exp) => (
                <tr>
                  <th scope="row">{exp.Title}</th>
                  <td>{exp.Amount} $</td>
                  <td>{exp.Category}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.onDelete(exp)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : props.expenses
                ?.filter((expense) => expense.Category === visibleCategory)
                .map((exp) => (
                  <tr>
                    <th scope="row">{exp.Title}</th>
                    <td>{exp.Amount} $</td>
                    <td>{exp.Category}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => props.onDelete(exp)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              {visibleCategory === "All"
                ? props.expenses?.reduce((acc, expense) => {
                    return (acc += expense.Amount);
                  }, 0)
                : props.expenses
                    ?.filter((expense) => expense.Category === visibleCategory)
                    .reduce((acc, expense) => {
                      return (acc += expense.Amount);
                    }, 0)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default Table;
