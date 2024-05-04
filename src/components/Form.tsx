import { FormEvent, FormEventHandler, useRef, useState } from "react";
import { ExpenseObject } from "../App";
interface Props {
  onSubmit: (arg0: ExpenseObject) => void;
}
const Form = (props: Props) => {
  const anItem: ExpenseObject = {
    Title: "",
    Amount: 0,
    Category: "Others",
  };
  //title hooks
  const titleRef = useRef<HTMLInputElement>(null);
  const [titleError, setTitleError] = useState([false, ""]);
  //amount hooks
  const amountRef = useRef<HTMLInputElement>(null);
  const [amountError, setAmountError] = useState([false, ""]);
  //category hooks
  const catRef = useRef<HTMLSelectElement>(null);
  const [catError, setCatError] = useState([false, ""]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let error = false;
    // title errors
    if (titleRef.current == null) {
      setTitleError([true, "Title field is required!"]);
      error = true;
    } else if (titleRef.current.value.trim() === "") {
      setTitleError([true, "Title field is required!"]);
      error = true;
    } else if (titleRef.current.value.length < 3) {
      setTitleError([true, "Title should be at least 3 characters"]);
      error = true;
    } else {
      setTitleError([false, ""]);
      anItem.Title = titleRef.current.value;
    }
    // amount errors
    if (amountRef.current == null) {
      setAmountError([true, "Amount field is required!"]);
      error = true;
    } else if (amountRef.current.value.trim() === "") {
      setAmountError([true, "Amount field is required!"]);
      error = true;
    } else if (parseInt(amountRef.current.value) < 1) {
      setAmountError([true, "Amount should be at least 1 dollars"]);
      error = true;
    } else {
      setAmountError([false, ""]);
      anItem.Amount = parseInt(amountRef.current.value);
    }
    // selection errors
    if (catRef.current == null) {
      setCatError([true, "Category field is required!"]);
      error = true;
    } else if (catRef.current.value.trim() === "") {
      setCatError([true, "Category field is required!"]);
      error = true;
    } else {
      setCatError([false, ""]);
      anItem.Category = catRef.current.value;
    }
    //time to return
    if (!error) {
      console.log("ok!!!");
      props.onSubmit(anItem);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <br />
          <input
            id="title"
            type="text"
            ref={titleRef}
            className="form-control"
          />
          {titleError[0] == true && (
            <p className="text-danger">{titleError[1]}</p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <br />
          <input
            id="title"
            type="number"
            className="form-control"
            ref={amountRef}
          />
          {amountError[0] == true && (
            <p className="text-danger">{amountError[1]}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select id="category" className="form-select" ref={catRef}>
            <option id="Utilities">Utilities</option>
            <option id="Entertainment">Entertainment</option>
            <option id="Transportation">Transportation</option>
            <option id="Gifts">Gifts</option>
            <option id="Others">Others</option>
          </select>
          {catError[0] == true && <p className="text-danger">{catError[1]}</p>}
        </div>

        {/* Submit */}
        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
