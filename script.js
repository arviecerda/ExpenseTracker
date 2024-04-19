let expenses = [];
let totalAmount = 0;


const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expenses-table-body');
const totalAmountCell = document.getElementById('total-amount');
const deleteBtn = document.getElementsByClassName('delete-btn');

addBtn.addEventListener('click', function(){
    const category = categorySelect.value;
    let amount = Number(amountInput.value);
    const date = dateInput.value;

    if(category === ''){
        alert("Please select a Category");
        return;
    }
    if(isNaN(amount) || amount <= 0){
        alert('Please Enter a Valid Amount');
        return;
    }
    if(date === ''){
        alert('please select a date');
        return;
    }

    expenses.push({category, amount, date});

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;
    saveData();

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function(){
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);

        saveData();

    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
    console.log(expensesTableBody.innerHTML);
    saveData();

    categorySelect.value = '';
    amountInput.value = '';
    dateInput.value = '';
});


for(const expense of expenses){
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add('delete-btn');
    saveData();
    deleteBtn.addEventListener('click', function(){
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
        saveData();
        
    });
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
    saveData();
}


expensesTableBody.addEventListener("click", function(e){
    if(e.target.tagName === "BUTTON"){
        e.target.parentElement.parentElement.remove();
        location.reload();
        saveData();
    }
})




function saveData(){
    localStorage.setItem("data", expensesTableBody.innerHTML);
    localStorage.setItem("data2", totalAmountCell.textContent);
}
function getData(){
    expensesTableBody.innerHTML = localStorage.getItem("data");
    totalAmountCell.textContent = localStorage.getItem("data2");

    totalAmount = 0;

    // Iterate over each row in the expenses table and sum up the amounts
    const rows = expensesTableBody.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        const amount = parseInt(rows[i].getElementsByTagName('td')[1].textContent);
        totalAmount += amount;
    }

    // Update the total amount cell with the recalculated total amount
    totalAmountCell.textContent = totalAmount;

}
getData();



