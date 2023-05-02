function loadTable() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/company");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML += "<td>" + object["company_name"] + "</td>";
        trHTML += "<td>" + object["type"] + "</td>";
        trHTML += "<td>" + object["address"] + "</td>";
        trHTML += "<td>" + object["contact"] + "</td>";
        trHTML += "<td>" + object["email"] + "</td>";
        trHTML +=
          '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
          object["id"] +
          ')"><i class="fa-regular fa-pen-to-square fa-sm" style="color: #285192;"></i>&nbsp;&nbsp;Edit</button>';
        trHTML +=
          '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
          object["id"] +
          ')"><i class="fa-solid fa-trash-can fa-sm" style="color: #dc4c64;"></i>&nbsp;&nbsp;Del&nbsp;&nbsp;</button></td>';
        trHTML += "</tr>";
      }
      document.getElementById("mytable").innerHTML = trHTML;
    }
  };
}

loadTable();


// user search function

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
          trHTML += "<td>" + object["company_name"] + "</td>";
          trHTML += "<td>" + object["type"] + "</td>";
          trHTML += "<td>" + object["address"] + "</td>";
          trHTML += "<td>" + object["contact"] + "</td>";
          trHTML += "<td>" + object["email"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')"><i class="fa-regular fa-pen-to-square fa-sm" style="color: #285192;"></i>&nbsp;&nbsp;Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')"><i class="fa-solid fa-trash-can fa-sm" style="color: #dc4c64;"></i>&nbsp;&nbsp;Del&nbsp;&nbsp;</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      } else {
        console.error("Error fetching data:", this.status, this.statusText);
      }
    }
  };
  xhttp.open(
    "GET",
    `http://localhost:3000/company?company_name=${company_name}`
  );
  xhttp.send();
}

// Create user box

function showUserCreateBox() {
  Swal.fire({
    title: "Add New Company",
    html:
      '<div class="swal2-row">' +
      '<label for="company_name">Name</label>' +
      '<input id="company_name" class="swal2-input">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="type">Type</label>' +
      '<select id="type" class="swal2-input">' +
      '<option value="IT-Sector" selected>IT-Sector</option>' +
      '<option value="Finance">Finance</option>' +
      '<option value="Manufacturing">Manufacturing</option>' +
      "</select>" +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="address">Address</label>' +
      '<input id="address" class="swal2-input">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="contact">Contact</label>' +
      '<input id="contact" class="swal2-input">' +
      "</div>" +
      '<div class="swal2-row">' +
      '<label for="email">Email</label>' +
      '<input id="email" class="swal2-input">' +
      "</div>" ,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      userCreate();
    },
  });
}

// Create user function

function userCreate() {
  const company_name = document.getElementById("company_name").value;
  const type = document.getElementById("type").value;
  const address = document.getElementById("address").value;
  const contact = document.getElementById("contact").value;
  const email = document.getElementById("email").value;
 

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/company");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      company_name: company_name,
      type: type,
      address: address,
      contact: contact,
      email: email,
      
    })
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      Swal.fire({
        title: "Success!",
        text: "User created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          loadTable();
        }
      });
    }
  };
}

