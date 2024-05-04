import { FormEventHandler, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

export interface ExpenseObject {
  Title: string;
  Amount: number;
  Category: string;
}
function App() {
  const [expenses, setExpenses] = useState<Array<ExpenseObject>>([]);
  const onExpenseItemAdd = (item: ExpenseObject) => {
    setExpenses([...expenses, item]);
  };
  const onExpenseItemDelete = (item: ExpenseObject) => {
    setExpenses(expenses.filter((exp) => exp !== item));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="container mt-3 pt-5">
          <h1 className="text-white mt-5 mb-5">Daily Expense Tracker</h1>
          <div className="row align-items-center mt-3">
            <div className="col-md bg-light bg-opacity-75 px-3 py-3 mx-3">
              <Form onSubmit={onExpenseItemAdd} />
            </div>
            <div className="col-md bg-light bg-opacity-75 mt-3 mx-3 px-3 py-3 mb-5">
              <Table expenses={expenses} onDelete={onExpenseItemDelete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
