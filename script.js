document.addEventListener('DOMContentLoaded', () => {
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const addExpenseButton = document.getElementById('add-expense');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const updateTotal = () => {
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        totalAmount.textContent = total.toFixed(2);
    };

    const renderExpenses = () => {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.description} - $${parseFloat(expense.amount).toFixed(2)}
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
        updateTotal();
    };

    const addExpense = () => {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());
        if (description && !isNaN(amount) && amount > 0) {
            expenses.push({ description, amount });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
            descriptionInput.value = '';
            amountInput.value = '';
        }
    };

    window.deleteExpense = (index) => {
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    };

    addExpenseButton.addEventListener('click', addExpense);

    renderExpenses();
});
