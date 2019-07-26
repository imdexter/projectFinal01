
var config = {
  apiKey: "AIzaSyDkitWyt4i-cGxlDzC1Uh6MrT9UVIfB5VQ",
  authDomain: "siit-imc.firebaseapp.com",
  databaseURL: "https://siit-imc.firebaseio.com",
  projectId: "siit-imc",
  storageBucket: "siit-imc.appspot.com",
  messagingSenderId: "459048435439",
};

firebase.initializeApp(config);


var tblUsers = document.getElementById('tbl_users_list');
var databaseRef = firebase.database().ref('products/');
var rowIndex = 1;

databaseRef.once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();

    var row = tblUsers.insertRow(rowIndex);
    var cellId = row.insertCell(0);
    var cellPicture = row.insertCell(1);
    var cellName = row.insertCell(2);
    var cellPrice = row.insertCell(3);
    var cellStock = row.insertCell(4);
    var cellInfo = row.insertCell(5);
    var cellDelete = row.insertCell(6);



    cellId.appendChild(document.createTextNode(childKey));
    cellPicture.appendChild(document.createTextNode(childData.picture));
    cellName.appendChild(document.createTextNode(childData.user_name));
    cellPrice.appendChild(document.createTextNode(childData.price));
    cellStock.appendChild(document.createTextNode(childData.quantity));
    cellInfo.appendChild(document.createTextNode(childData.info));
    cellDelete.appendChild(document.createElement("button"));
    cellDelete.textContent = 'x use key';

    cellDelete.onclick = function () {
      // this.parentElement.removeChild(this);

      alert("use key");
    };

    rowIndex = rowIndex + 1;

  });
});

var contactForm = document.getElementById('contactForm');
function save_product() {

  var uid = firebase.database().ref().child('products/').push().key;

  var pictureOn = document.getElementById('examplePicture').value;
  var productOn = document.getElementById('exampleFullName').value;
  var infoOn = document.getElementById('exampledescription').value;
  var priceOn = document.getElementById('examplePrice').value;
  var quantityOn = document.getElementById('exampleQuantity').value;


  var data = {
    user_id: uid,
    picture: pictureOn,
    user_name: productOn,
    info: infoOn,
    price: priceOn,
    quantity: quantityOn
  };

  var updates = {};
  updates['products/' + uid] = data;

  firebase.database().ref().update(updates);

  console.log



  $('.success-message').show();

  // setTimeout(function () {

  //  $('.success-message').hide();

  //  }, 1000);
  setTimeout(function () {

    reload_page();

  }, 2000);
  alert('The user is created successfully!');

}



function update_product() {

  var user_id = document.getElementById('user_id').value;
  var pictureOn = document.getElementById('examplePicture').value;
  var productOn = document.getElementById('exampleFullName').value;
  var infoOn = document.getElementById('exampledescription').value;
  var priceOn = document.getElementById('examplePrice').value;
  var quantityOn = document.getElementById('exampleQuantity').value;


  var data = {
    user_id: user_id,
    picture: pictureOn,
    user_name: productOn,
    info: infoOn,
    price: priceOn,
    quantity: quantityOn
  };
  var updates = {};
  updates['products/' + user_id] = data;
  firebase.database().ref().update(updates);

  alert('The user is updated successfully!');

  reload_page();
}

function ConfirmDelete() {
  var x = confirm("Are you sure you want to delete?");
  if (x)
    return true;
  else (y)
  return false;
}
function delete_product() {

  var user_id = document.getElementById('user_id').value;
  ConfirmDelete();
  firebase.database().ref().child('/products/' + user_id).remove();

  alert('The user is deleted successfully!');

  reload_page();
}

function reload_page() {
  window.location.reload();
}




/*var databaseRef = firebase.database().ref('products');
function save_user() {
  $('#contactForm').submit(function (e) {

    e.preventDefault();
    var uid = firebase.database().ref().child('products').push().key;

    var newDatabaseRef = databaseRef.push();
    newDatabaseRef.set({

      //picture: $('#examplePicture').val(),
      name: $('#exampleFullName').val(),
      price: $('#examplePrice').val(),
      quantity: $('#exampleQuantity').val(),
      info: $('#exampledescription').val(),
      keyid: uid

    });
    // hide alert

    $('.success-message').show();
    setTimeout(function () {
      $('.success-message').hide();
    }, 2000);

    $('#contactForm')[0].reset();

  });

}

// hide alert
setTimeout(function () {
  document.querySelector('.success-message').style.display - 'none';
}, 2000);


//
var selectedRow = null

function onFormSubmit() {
  $('#contactForm').submit(function (e) {

    e.preventDefault();
    var uid = firebase.database().ref().child('products').push().key;

    var newDatabaseRef = databaseRef.push();
    newDatabaseRef.set({

      //picture: $('#examplePicture').val(),
      name: $('#exampleFullName').val(),
      price: $('#examplePrice').val(),
      quantity: $('#exampleQuantity').val(),
      info: $('#exampledescription').val(),
      keyid: uid

    });
  });
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;*/





