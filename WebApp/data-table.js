document.addEventListener('DOMContentLoaded', () => {
    const apiaddr = localStorage.getItem("ServerAddr");  
    fetch(apiaddr + '/getdata') 
          .then(response => response.json())
          .then(data => {
              const tablesContainer = document.getElementById('tables-container');
  
              // Iterate over each date in the data
              for (const date in data) {
                  const dateData = data[date];
  
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
  
                  // Iterate over each person (name) for the current date
                  for (const name in dateData) {
                      const userData = dateData[name];
  
                      // Iterate over each log entry for the current user
                      userData.forEach(entry => {
                          // For each 'In' entry
                          for (const inOutKey in entry) {
                              const row = document.createElement('tr');
                              const tdName = document.createElement('td');
                              tdName.textContent = name || "Unknown"; // Handle empty names
  
                              const tdInOut = document.createElement('td');
                              tdInOut.textContent = inOutKey; // Either 'In'
  
                              const tdTime = document.createElement('td');
                              tdTime.textContent = convertTo12HourFormat( entry[inOutKey].Time);
                              console.log(tdTi) 
                              const tdReason = document.createElement('td');
                              tdReason.textContent = entry[inOutKey].reason || "N/A"; // Handle null reasons
  
                              // Append data to the row
                              row.appendChild(tdName);
                              row.appendChild(tdInOut);
                              row.appendChild(tdTime);
                              row.appendChild(tdReason);
  
                              // Add the row to the table body
                              tbody.appendChild(row);
                          }
                      });
                  }
  
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



function convertTo12HourFormat(hour24) {
    let hour = parseInt(hour24.split(':')[0], 10); // Extract hour part
    let minute = hour24.split(':')[1]; // Extract minute part
    let period = 'AM';
    
    if (hour >= 12) {
        period = 'PM';
    }
    
    if (hour > 12) {
        hour = hour - 12;
    } else if (hour === 0) {
        hour = 12;
    }
    
    return `${hour}:${minute} ${period}`;
}
  
