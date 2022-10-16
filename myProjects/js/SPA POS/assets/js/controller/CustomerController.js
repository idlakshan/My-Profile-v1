
//----------------------Save Customer-----------------------
$("#btnSaveCustomer").click(function (){
    let customerId=$("#txtCusID").val();
    let customerName=$("#txtCusName").val();
    let customerAddress=$("#txtCusAddress").val();
    let customerSalary=$("#txtCusSalary").val();

    let CustomerObject=new CustomerDTO(customerId,customerName,customerAddress,customerSalary);

    customersDB.push(CustomerObject);
    loadAllCustomer();
    clearCustomerTextFields();

 });

 function loadAllCustomer(){
    $("#tblCustomer").empty();
    for (let customer of customersDB) {
        let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
        $("#tblCustomer").append(row);

    }
    bindRowCustomerClickEvent();
}

//-----------------Search Customer----------------
$("#btnSearchCustomer").click(function (){
  let TypedId=$("#txtCusSearch").val();
  let customer=searchCustomer(TypedId);
  if (customer!=null){
      $("#txtCusID").val(customer.id);
      $("#txtCusName").val(customer.name);
      $("#txtCusAddress").val(customer.address);
      $("#txtCusSalary").val(customer.salary);

      $("#txtCusSearch").val("");
  }else{
      alert("There is no customer available for this "+TypedId);
  }

});
function searchCustomer(cusId){
    for (let customer of customersDB) {
        if(customer.id==cusId){
            return customer;
        }
    }
     return null;
}
//-------------------Clear Text Fields---------------
$("#btnClearTextField").click(function (){
    clearCustomerTextFields();
});

//--------------------Row Clicked----------------
function bindRowCustomerClickEvent(){
    $("#tblCustomer>tr").click(function (){
        let cusId=$(this).children(":eq(0)").text();
        let cusName=$(this).children(":eq(1)").text();
        let cusAddress=$(this).children(":eq(2)").text();
        let cusSalary=$(this).children(":eq(3)").text();

        $("#txtCusID").val(cusId);
        $("#txtCusName").val(cusName);
        $("#txtCusAddress").val(cusAddress);
        $("#txtCusSalary").val(cusSalary);

    });
}
//--------------------Delete Customer-----------------
$("#btnRemoveCustomer").click(function (){
    let deleteId=$("#txtCusID").val();
    if(deleteCustomer(deleteId)){
        alert("Customer Successfully Deleted..");
        clearCustomerTextFields();
    }else {
        alert("No such customer to delete, please check id");
    }

});


function deleteCustomer(cusId){
    let customer=searchCustomer(cusId);
    if (customer != null){
        let indexNo= customersDB.indexOf(customer);
        customersDB.splice(indexNo,1);
        loadAllCustomer();
        return true;

    }
    return false;
}
//----------Update Customer-----------------

$("#btnUpdateCustomer").click(function (){
    let updateId=$("#txtCusID").val();
    let response=updateCustomer(updateId);
    if (response){
        alert("Customer Updated Successfully..")
    }else{
        alert("Updated failed")
    }
});


function updateCustomer(cusId){
    let customer=searchCustomer(cusId);
    if(customer!=null){
        customer.id=$("#txtCusID").val();
        customer.name=$("#txtCusName").val();
        customer.address=$("#txtCusAddress").val();
        customer.salary=$("#txtCusSalary").val();

        loadAllCustomer();
        return true;

    }
    return false;
}

function clearCustomerTextFields(){
    $("#txtCusID").focus();
    $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary").val("");
}