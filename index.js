// Function to validate form
const validateForm = () => {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (age == "") {
    alert("Age is required");
    return false;
  } else if (age < 0) {
    alert("Age must a positive !");
    return false;
  }
  if (address == "") {
    alert("Address is required");
    return false;
  }
  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid Email Address");
    return false;
  }
  return true;
};

// Function to show data
const showData = () => {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  let html = "";
  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.address + "</td>";
    html +=
      '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' + index +  ')" class="btn btn-warning m-2">Edit</button></td>';

    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
};

// Loads all data when document or page loaded
document.onload = showData();

//function to add data
const addData = () => {
  if (validateForm() == true) {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
};

//Function to delete data from localStorage
const deleteData = (index) => {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
};


//function to upadate data
const updateData = (index) =>{
    // submit button will hide and update button will show for updating of data in local storage
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#update").onclick = function(){
        if(validateForm() == true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));
            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

                // submit button will show and update button will hide for updating of data in local storage
            document.getElementById("submit").style.display = "block";
            document.getElementById("update").style.display = "none";
        }
    }
}