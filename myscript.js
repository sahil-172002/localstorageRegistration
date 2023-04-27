$(document).ready(function () {
  // getData();

  $("#btnAddStudent").click(function () {
    //collect student data from student form
    function getStudentData() {
      let date = new Date($("#dob").val());
      day = date.getDate();
      month = date.getMonth() + 1; //jan - 0, feb-1, ...dec-11
      year = date.getFullYear();
      let dob = [day, month, year].join("/"); //28/01/2022

      let selectedDate = new Date($("#registrationDate").val());
      day = selectedDate.getDate();
      month = selectedDate.getMonth() + 1;
      year = selectedDate.getFullYear();
      let registrationDate = [day, month, year].join("/");
      console.log(registrationDate);

      let student = {
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        gender: $("input[name='gender']:checked").val(),
        email: $("#email").val(),
        contactNo: $("#contactNo").val(),
        branch: $("#sub").val(),
        registrationDate: registrationDate,
      };
      return student;
    }

    //store student data to localStorage
    function storeDataToLocalStorage() {
      if (!localStorage.getItem("student")) {
        localStorage.setItem("student", JSON.stringify(getStudentData()));
      } else {
        localStorage.removeItem("student");
        localStorage.setItem("student", JSON.stringify(getStudentData()));
      }
    }

    //send data to server with AJAX request
    function sendData() {
      let xhr = new XMLHttpRequest();
      let data = JSON.stringify(getStudentData());
      xhr.open("POST", "http://localhost:4000/storedata",true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
    }

    //call storeDataToLocalStorage and sendData functions
    storeDataToLocalStorage();
    // sendData();
    window.open("display-data.html", "_blank");

  });
});

// function getData() {
//   let localStorageData = localStorage.getItem("student");
//   let studentObj = JSON.parse(localStorageData);
//   console.log(studentObj);
//   $("#rollno").text(studentObj.rollno);
//   $("#firstName").text(studentObj.firstName);
//   $("#lastName").text(studentObj.lastName);
//   $("#dob").text(studentObj.dob);
//   $("#gender").text(studentObj.gender);
//   $("#email").text(studentObj.email);
//   $("#contactNo").text(studentObj.contactNo);
//   $("#branch").text(studentObj.branch);
//   $("#registrationDate").text(studentObj.registrationDate);
//   $("#parentName").text(studentObj.parentName);
//   $("#parentContactNo").text(studentObj.parentMobileNo);
// }