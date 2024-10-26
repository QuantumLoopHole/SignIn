document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:5000/getdata') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            const tablesContainer = document.getElementById('tables-container');

            // Iterate over each date in the data
            for (const date in data) {
                const dateData = data[date];

                // Convert dateData to an array and sort by time
                const entriesArray = Object.entries(dateData).map(([name, entry]) => ({
                    name,
                    ...entry
                }));

                entriesArray.sort((a, b) => {
                    // Convert time to minutes for comparison
                    const [aHours, aMinutes] = a.Time.split(':').map(Number);
                    const [bHours, bMinutes] = b.Time.split(':').map(Number);
                    return aHours * 60 + aMinutes - (bHours * 60 + bMinutes);
                });

                // Create a table for each date
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');

                // Create the header row
                const headerRow = document.createElement('tr');
                const headers = ['Name', 'In/Out', 'Time', 'Reason'];
                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                thead.appendChild(headerRow);

                // Populate the table with sorted data
                entriesArray.forEach(entry => {
                    const row = document.createElement('tr');
                    
                    const tdName = document.createElement('td');
                    tdName.textContent = entry.name || "Unknown"; // Handle empty names
                    const tdInOut = document.createElement('td');
                    tdInOut.textContent = entry.InOrOut;
                    const tdTime = document.createElement('td');
                    tdTime.textContent = entry.Time;
                    const tdReason = document.createElement('td');
                    tdReason.textContent = entry.reason || "N/A"; // Handle null reasons

                    row.appendChild(tdName);
                    row.appendChild(tdInOut);
                    row.appendChild(tdTime);
                    row.appendChild(tdReason);
                    tbody.appendChild(row);
                });

                table.appendChild(thead);
                table.appendChild(tbody);

                // Add date header before each table
                const dateHeader = document.createElement('h3');
                dateHeader.textContent = date;
                tablesContainer.appendChild(dateHeader);
                tablesContainer.appendChild(table);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
