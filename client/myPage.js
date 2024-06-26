// Module code: CS5003
// Module: Masters Programming Projects
// My Page: Creating a Holiday Planner
//Refernce: (https://www.youtube.com/watch?v=94kyx6pTuqg)

// Send request to backend to get all locations based on search parameters
fetch("http://localhost:5000/user-locations")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    let table = document.getElementById("myPageTable");

    for (let i in data) {
      let row = table.insertRow();
      row.id = data[i].id;
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.innerHTML = data[i].activityName;
      cell2.innerHTML = data[i].category;
      cell3.innerHTML = data[i].description;
      cell4.innerHTML = data[i].price;
      cell5.innerHTML = `<button class = "deleteBtn" id = ${data[i].id} onclick="deleteActivity('${data[i].id}')">Delete</button>`;
    }
  });

function deleteActivity(a) {
  let id = a;
  let row = document.getElementById(id);
  console.log("delete", id);

  fetch("http://localhost:5000/user-locations-delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ postIdToDelete: id }),
  });
  row.remove();
}
