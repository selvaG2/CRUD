//Load table function

function loadTable() {
  const xhttp = new XMLHttpRequest();  //Its an objext used to interact with server & load content without reloading webpage 
  xhttp.open("GET", "http://localhost:3000/company");  //intializing a req to the server
  xhttp.send();  // sending the send req to the server
  xhttp.onreadystatechange = function () { //event handler property used in js to asign fun that will be 
                                           //called whenever ready state change
    if (this.readyState == 4 && this.status == 200) {  
      console.log(this.responseText);  //response from the server
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          '<td><img width="50px" src="' +
          object["logo"] +
          '" class="logo"></td>';
        trHTML += "<td>" + object["company_name"] + "</td>";
        trHTML += "<td>" + object["type"] + "</td>";
        trHTML += "<td>" + object["address"] + "</td>";
        trHTML += "<td>" + object["contact"] + "</td>";
        trHTML += "<td>" + object["email"] + "</td>";
        trHTML +=
          '<td class= "actiontd"><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')"><i class="fa-regular fa-pen-to-square fa-sm" style="color: #285192;"></i></button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger deletebtn" onclick="userDelete(' +
          object["id"] +
          ')"><i class="fa-solid fa-trash-can fa-sm" style="color: #dc4c64;"></i></button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable(); //automatically invoke once the page is loaded/reloaded
//-----------------------------------------------------------------------------------------------------------------

//User search function with company name

function userSearch(company_name) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["logo"] +
            '" class="logo"></td>';
          trHTML += "<td>" + object["company_name"] + "</td>";
          trHTML += "<td>" + object["type"] + "</td>";
          trHTML += "<td>" + object["address"] + "</td>";
          trHTML += "<td>" + object["contact"] + "</td>";
          trHTML += "<td>" + object["email"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')"><i class="fa-regular fa-pen-to-square fa-sm" style="color: #285192;"></i></button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash-can fa-sm" style="color: #dc4c64;"></i></button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      } else {
        console.error("Error fetching data:", this.status, this.statusText); //Error will throw if it face any problem
      }
    }
  };
  xhttp.open(
    "GET",
    `http://localhost:3000/company?company_name=${company_name}`
  );
  xhttp.send();
}

//-----------------------------------------------------------------------------------------------------------------

//User create box

function showUserCreateBox() {
  Swal.fire({
    title: "Add New Company",
    html:
      '<div class="swal2-row">' +
      '<label for="company_name">Name </label>' +
      '<input id="company_name" class="swal2-input" placeholder="Enter your company name">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="type">Type</label>' +
      '<select id="type" class="swal2-input">' +
      '<option value="" disabled selected>Select an industry</option>' +
      '<option value="IT-Sector">IT-Sector</option>' +
      '<option value="Finance">Finance</option>' +
      '<option value="Manufacturing">Manufacturing</option>' +
      "</select>" +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="address">Address</label>' +
      '<input id="address" class="swal2-input" placeholder="Enter your address">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="contact">Contact</label>' +
      '<input id="contact" class="swal2-input" placeholder="Enter your contact">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="email">Email</label>' +
      '<input id="email" class="swal2-input" placeholder="Enter your E-mail">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="logo">Logo</label>' +
      '<input type="file" id="logo" class="swal2-input w-25">' +
      "</div>",
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      userCreate();  //After entring the details userCreate() function is triggerd to get the data,  send it to server
    },
  });
}

//-----------------------------------------------------------------------------------------------------------------

//User create function

function userCreate() {
  const company_name = document.getElementById("company_name").value;
  const type = document.getElementById("type").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const logo = document.getElementById("logo").files[0];

  //if fields are empty throw an error
  if (
    company_name.trim() === "" ||
    type.trim() === "" ||
    address.trim() === "" ||
    contact.trim() === "" ||
    email.trim() === "" ||
    logo === undefined
  ) {
    Swal.fire({
      title: "Fields cannot be empty",
      icon: "error",
      showConfirmButton: true,
      // timer: 9000,
    }).then((res) => {
      console.log(res);
      if (res.value) {
        // Call the function recursively after showing the error message
        showUserCreateBox();
      }
    });
    return;
  }

  //RegEx for company name, contact, email, address
  const company_name_regex = /^[a-zA-Z0-9\s\.,-]+$/g;
  const contact_regex = /^[\d]{10}$/g;
  const address_regex = /^[a-zA-Z0-9\s\.,#-]+$/g;
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

  // Company name validation
  if (!company_name_regex.test(company_name)) {
    Swal.fire({
      title: "Invalid Username",
      icon: "error",
      showConfirmButton: true,
      timer: 3500,
    });
    return;
  }
  // Contact validation
  if (!contact_regex.test(contact)) {
    Swal.fire({
      title: "Invalid Contact",
      icon: "error",
      showConfirmButton: false,
      timer: 3500,
    });
    return;
  }
  // Address validation
  if (!address_regex.test(address)) {
    Swal.fire({
      title: "Invalid Address",
      icon: "error",
      showConfirmButton: false,
      timer: 3500,
    });
    return;
  }
  // Email validation
  if (!email_regex.test(email)) {
    Swal.fire({
      title: "Invalid E-mail id",
      icon: "error",
      showConfirmButton: false,
      timer: 3500,
    });
    return;
  }
  // If all condition satisfied it prompts sucess 
  if (
    company_name.match(company_name_regex) &&
    contact.match(contact_regex) &&
    address.match(address_regex) &&
    email.match(email_regex)
  ) {
    Swal.fire({
      icon: "success",
      title: "Company created..!",
      showConfirmButton: true,
    });
  }

  const filename = "./assets/images/" + logo.name;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/company");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");  //set the value of an http req header 
                                                                        // must be called after open and before send
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects["message"]);
    }
  };

  // Send the data with the updated filename
  xhttp.send(
    JSON.stringify({
      company_name: company_name,
      type: type,
      address: address,
      contact: contact,
      email: email,
      logo: filename, // Use the updated filename here
    })
  );

  loadTable(); //After create load table is called to refresh the page without loading
}

//-----------------------------------------------------------------------------------------------------------------

//User edit box

function showUserEditBox(id) {  //Editing the user details with the ref of id
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/company/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects["objects"];
      console.log(objects);
      Swal.fire({
        title: "Update the company details",
        html:
          "<form style='display: grid; grid-template-columns: 1fr 2fr; gap: 10px;'>" +
          '<label for="company_name" class="edit_lable">Name:</label><input id="company_name" class="swal2-input" value="' +
          objects["company_name"] +
          '" placeholder="Enter your company name">' +
          '<label for="type" class="edit_lable">Type:</label><select id="type" class="swal2-input" value="' +
          objects["type"] +
          '">' +
          '<option value="IT-Sector" ' +
          (objects["type"] === "IT-Sector" ? "selected" : "") +
          ">IT-Sector</option>" +
          '<option value="Finance" ' +
          (objects["type"] === "Finance" ? "selected" : "") +
          ">Finance</option>" +
          '<option value="Manufacturing" ' +
          (objects["type"] === "Manufacturing" ? "selected" : "") +
          ">Manufacturing</option>" +
          "</select>" +
          '<label for="address" class="edit_lable">Address:</label><input id="address" class="swal2-input" value="' +
          objects["address"] +
          '" placeholder="Enter your address">' +
          '<label for="contact" class="edit_lable">Contact:</label><input id="contact" class="swal2-input" value="' +
          objects["contact"] +
          '" placeholder="Enter your contact">' +
          '<label for="email" class="edit_lable">Email:</label><input id="email" class="swal2-input" value="' +
          objects["email"] +
          '" placeholder="Enter your E-mail">' +
          '<label for="logo" class="edit_lable">Logo:</label><input type="file" id="logo" class="swal2-input w-75">' +
          "</form>",
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          userEdit(id);       // after editing the changes it calls the edituser() function to apply changes
        },
      });
    }
  };
}

//-----------------------------------------------------------------------------------------------------------------

//user edit function

function userEdit(id) {
  const company_name = document.getElementById("company_name").value;
  const type = document.getElementById("type").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
  const logo = document.getElementById("logo").files[0];

  //if fields are empty throw an error
  if (
    company_name.trim() === "" ||
    type.trim() === "" ||
    address.trim() === "" ||
    contact.trim() === "" ||
    email.trim() === "" ||
    logo === undefined
  ) {
    Swal.fire({
      title: "Fields cannot be empty",
      icon: "error",
      showConfirmButton: true,
      timer: 9000,
    }).then((res) => {
      if (res.value) {
        showUserEditBox(id);
      }
    });
    return;
  }

  //RegEx for company name, contact, email, address
  const company_name_regex = /^[a-zA-Z0-9\s\.,-]+$/g;
  const contact_regex = /^[\d]{10}$/g;
  const address_regex = /^[a-zA-Z0-9\s\.,#-]+$/g;
  const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

  // Company name validation
  if (!company_name_regex.test(company_name)) {
    Swal.fire({
      title: "Invalid Username",
      icon: "error",
      showConfirmButton: true,
      timer: 3500,
    });
    return;
  }
  // Contact validation
  if (!contact_regex.test(contact)) {
    Swal.fire({
      title: "Invalid Contact",
      icon: "error",
      showConfirmButton: false,
      timer: 3500,
    });
    return;
  }
  // Address validation
  if (!address_regex.test(address)) {
    Swal.fire({
      title: "Invalid Address",
      icon: "error",
      showConfirmButton: false,
      timer: 3500,
    });
    return;
  }
  // Email validation
  if (!email_regex.test(email)) {
    Swal.fire({
      title: "Invalid E-mail id",
      icon: "error",
      showConfirmButton: false,
      timer: 3500,
    });
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Get the name of the uploaded file and store it with the path of "./assets/images/"
      let filename = "";
      if (logo) {
        filename = "./assets/images/" + logo.name;
      }

      const xhttp = new XMLHttpRequest();
      xhttp.open("PUT", `http://localhost:3000/company/${id}`);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.send(
        JSON.stringify({
          company_name: company_name,
          type: type,
          address: address,
          contact: contact,
          email: email,
          logo: filename, // Updated filename here
        })
      );
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            // If the file was uploaded, send it to the server using FormData object
            if (logo) {
              const formData = new FormData();
              formData.append("file", logo, filename);
              const fileXhttp = new XMLHttpRequest();
              fileXhttp.open("POST", "http://localhost:3000/upload");
              fileXhttp.send(formData);
            }

            Swal.fire({
              icon: "success",
              title: "Company details Updated..!",
              showConfirmButton: true,
            });
            loadTable();  //after edit load table is called to apply the changes
          }
        }
      };
    }
  });
}

//-----------------------------------------------------------------------------------------------------------------

//User delete function

function userDelete(id) {  //Deleting the user with ref of id
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const xhttp = new XMLHttpRequest();
      xhttp.open("DELETE", `http://localhost:3000/company/${id}`);
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire({
            title: "Company deleted sucessfully",
            icon: "success",
          });
          loadTable();   //Once the user id deleted loadTable is called to refresh the page and apply the changes
        }
      };
    }
  });
}
//-----------------------------------------------------------------------------------------------------------------

function userSort() {      // sorting using company name
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        objects.sort(function (a, b) {
          // Remove special characters and spaces and join the name
          var nameA = a.company_name
            .replace(/[^0-9a-zA-Z]+/g, "")
            .toLowerCase();
          var nameB = b.company_name
            .replace(/[^0-9a-zA-Z]+/g, "")
            .toLowerCase();
          // Compare the modified names
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // Names are equal
          return 0;
        });

        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["logo"] +
            '" class="logo"></td>';
          trHTML += "<td>" + object["company_name"] + "</td>";
          trHTML += "<td>" + object["type"] + "</td>";
          trHTML += "<td>" + object["address"] + "</td>";
          trHTML += "<td>" + object["contact"] + "</td>";
          trHTML += "<td>" + object["email"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')"><i class="fa-regular fa-pen-to-square fa-sm" style="color: #285192;"></i></button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash-can fa-sm" style="color: #dc4c64;"></i></button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      } else {
        console.error("Error fetching data:", this.status, this.statusText);
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/company");
  xhttp.send();
}

//-----------------------------------------------------------------------------------------------------------------

function typeSort() {      // sorting using company name
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        objects.sort(function (a, b) {
          // Remove special characters and spaces and join the name
          var nameA = a.type
            .replace(/[^0-9a-zA-Z]+/g, "")
            .toLowerCase();
          var nameB = b.type
            .replace(/[^0-9a-zA-Z]+/g, "")
            .toLowerCase();
          // Compare the modified names
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // Names are equal
          return 0;
        });

        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["logo"] +
            '" class="logo"></td>';
          trHTML += "<td>" + object["company_name"] + "</td>";
          trHTML += "<td>" + object["type"] + "</td>";
          trHTML += "<td>" + object["address"] + "</td>";
          trHTML += "<td>" + object["contact"] + "</td>";
          trHTML += "<td>" + object["email"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')"><i class="fa-regular fa-pen-to-square fa-sm" style="color: #285192;"></i></button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash-can fa-sm" style="color: #dc4c64;"></i></button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      } else {
        console.error("Error fetching data:", this.status, this.statusText);
      }
    }
  };
  xhttp.open("GET", "http://localhost:3000/company");
  xhttp.send();
}

//-----------------------------------------------------------------------------------------------------------------