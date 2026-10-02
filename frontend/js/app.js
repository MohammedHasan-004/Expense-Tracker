// Expense Tracker - frontend logic 
// // PHASE 2 
// // Your backend from Phase 1 is already running, with real expenses in the 
// // database (from schema.sql). Build this page directly against it with 
// // fetch and async/await - there is no in-memory or localStorage stage 
// // this time, and no sample data file.
//  // // A possible structure (change it if you have a better idea): 
// // - async function getExpenses() fetch(API_URL), return the JSON // 
// - async function addExpense(data) fetch(API_URL, { method: "POST", ... }) //
//  - async function updateExpense(id,data) fetch(API_URL + "/" + id, { method: "PUT", ... }) 
// // - async function deleteExpense(id) fetch(API_URL + "/" + id, { method: "DELETE" })
// // - async function refresh() get the list, then call renderTable and renderSummary 
// // - renderTable(list) build the table rows from the array the API returned 
// // - renderSummary(list) update the summary cards 
// // - applyFilter() re-render with the list filtered by category 
// // // Don't forget: 
// // - Show a Bootstrap spinner while a request is in flight. 
// // - Wrap every fetch call in try/catch, and show a Bootstrap alert on failure.
// // - After add, edit, or delete, call refresh() so the page always shows 
// // what the server actually saved - never update the table by hand. 
// // - The API is at http://localhost:3000/api/expenses (see the Roadmap).
const API_URL = "http://localhost:3000/api/expenses";
let expenses = [];
let editingid = null;
const darkmodebutton =document.getElementById("darkModeButton");
const expenseform =document.getElementById("expenseForm");
const expensetablebody=document.getElementById("expenseTableBody");

const totalamount =document.getElementById("totalAmount");
const expensecount=document.getElementById("expenseCount");
const highestexpense=document.getElementById("highestExpense");
const categoryfilter=document.getElementById("categoryFilter");
const spinner =document.getElementById("spinner");
const alertcontainer =document.getElementById("alertContainer");
const submitbutton =
    expenseform.querySelector('button[type="submit"]');
function showspinner() {
    spinner.classList.remove("d-none");
}
function hidespinner() {
    spinner.classList.add("d-none");
}
function showerror(message) {
    alertcontainer.innerHTML = `
        <div class="alert alert-danger">
            ${message}
        </div>
    `;
}
function clearerror() {
    alertcontainer.innerHTML = "";
}
async function getexpenses() {
    const response =
        await fetch(API_URL);
    const result =
        await response.json();
    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to load expenses"
        );
    }
    return result;
}
async function addexpense(data) {
    const response =
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    const result =
        await response.json();
    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to add expense"
        );
    }
    return result;
}
async function updateexpense(id, data) {
    const response =
        await fetch(
            `${API_URL}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
    const result =
        await response.json();
    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to update expense"
        );
    }
    return result;
}
async function deleteexpense(id) {
    const response =
        await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );
    const result =
        await response.json();
    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to delete expense"
        );
    }
    return result;
}
async function refresh() {
    try {
        clearerror();
        showspinner();
        expenses =
            await getexpenses();
        applyfilter();
    } catch (error) {
        showerror(error.message);
    } finally {
        hidespinner();
    }
}
function rendertable(list) {
    expensetablebody.innerHTML = "";
    list.forEach(expense => {
        const row =
            document.createElement("tr");
        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button
                    class="btn btn-sm btn-warning edit-btn"
                >
                    Edit
                </button>
                <button
                    class="btn btn-sm btn-danger delete-btn"
                >
                    Delete
                </button>
            </td>
        `;
        expensetablebody.appendChild(row);
        const deletebutton =
            row.querySelector(".delete-btn");
        deletebutton.addEventListener(
            "click",
            async () => {
                try {
                    clearerror();
                    await deleteexpense(
                        expense.id
                    );
                    await refresh();
                } catch (error) {
                    showerror(
                        error.message
                    );
                }
            }
        );
        const editbutton =
            row.querySelector(".edit-btn");
        editbutton.addEventListener(
            "click",
            () => {
                editingid =
                    expense.id;
                document.getElementById("title").value =
                    expense.title;
                document.getElementById("amount").value =
                    expense.amount;
                document.getElementById("category").value =
                    expense.category;
                document.getElementById("date").value =
                    expense.date;
                submitbutton.textContent =
                    "Update";
            }
        );
    });
}
function rendersummary(list) {
    const total =
        list.reduce(
            (sum, expense) =>
                sum + expense.amount,
            0
        );
    totalamount.textContent =
        total.toFixed(2);
    expensecount.textContent =
        list.length;
    if (list.length === 0) {
        highestexpense.textContent =
            "0.00";
        return;
    }
    const highest =
        Math.max(
            ...list.map(
                expense =>
                    expense.amount
            )
        );
    highestexpense.textContent =
        highest.toFixed(2);
}
function applyfilter() {
    const selectedcategory =
        categoryfilter.value;
    if (selectedcategory === "All") {
        rendertable(expenses);
        rendersummary(expenses);
        return;
    }
    const filteredexpenses =
        expenses.filter(
            expense =>
                expense.category ===
                selectedcategory
        );
    rendertable(filteredexpenses);
    rendersummary(filteredexpenses);
}
expenseform.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();
        try {
            clearerror();
            showspinner();
            const title =
                document.getElementById(
                    "title"
                ).value;
            const amount =
                Number(
                    document.getElementById(
                        "amount"
                    ).value
                );
            const category =
                document.getElementById(
                    "category"
                ).value;
            const date =
                document.getElementById(
                    "date"
                ).value;
            const newexpense = {
                title,
                amount,
                category,
                date
            };
            if (editingid === null) {
                await addexpense(
                    newexpense
                );
            }
            else {
                await updateexpense(
                    editingid,
                    newexpense
                );
                editingid = null;
            }
            expenseform.reset();
            submitbutton.textContent =
                "Add";
            await refresh();
        } catch (error) {
            showerror(
                error.message
            );
        } finally {
            hidespinner();
        }
    }
);
categoryfilter.addEventListener(
    "change",
    applyfilter
);
darkmodebutton.addEventListener("click",() => {
        document.body.classList.toggle("darkmode");
        if (
            document.body.classList.contains("darkmode")
        ) {
            darkmodebutton.textContent ="Light Mode";
        } else {
            darkmodebutton.textContent ="Dark Mode";
        }
    }
);
refresh();