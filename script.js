// get customer data from API
fetch('/api/customers')
   .then(response => response.json())
   .then(data => {
        const customersTable = document.getElementById('customers-table');
        const customersTbody = customersTable.querySelector('tbody');

        data.forEach(customer => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
            `;
            customersTbody.appendChild(row);
        });
    });

// add event listeners for buttons
document.getElementById
