
//---------------------save customer----------------

$("#btnSaveCustomer").click(function (){
    let customerId =$("#txtCusID").val();
    let customerName=$("#txtCusName").val();
    let customerAddress=$("#txtCusAddress").val();
    let customerSalary=$("#txtCusSalary").val();

    var customerOB=new CustomerDTO(customerId,customerName,customerAddress,customerSalary);

    customerDB.push(customerOB);
    clearFields();
    loadAllCustomer();



});

//-------------------loadAllCustomers--------------------
function loadAllCustomer (){
    $("#tblCustomer").empty();
    for (var i of customerDB){
        let raw = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`
        $("#tblCustomer").append(raw);
    }
    bindCustomer();
}

//-----------------------Search Customer---------------
$("#btnSearchCustomer").click(function (){
    var searchId = $("#txtCusSearch").val();
    var response = searchCustomer(searchId);
    if (response){
        $("#txtCusID").val(response.getCustomerID());
        $("#txtCusName").val(response.getCustomerName());
        $("#txtCusAddress").val(response.getCustomerAddress());
        $("#txtCusSalary").val(response.getCustomerSalary());
    }else {
        alert("Invalid customer Search");
        clearFields();
    }
});
function searchCustomer (id){
    for (let i=0;i<customerDB.length;i++){
        if (customerDB[i].getCustomerID()===id){
            return customerDB[i];
        }
    }
}
//------click table raw---------
function bindCustomer (){
    $("#tblCustomer > tr").click(function (){
        let customerId = $(this).children(":eq(0)").text();
        let customerName = $(this).children(":eq(1)").text();
        let customerAddress = $(this).children(":eq(2)").text();
        let customerSalary = $(this).children(":eq(3)").text();

        $("#txtCusID").val(customerId);
        $("#txtCusName").val(customerName);
        $("#txtCusAddress").val(customerAddress);
        $("#txtCusSalary").val(customerSalary);

    });
}

//---------------------update customer------------------
$("#btnUpdateCustomer").click(function (){
    let customerId = $("#txtCusID").val();
    let customerName = $("#txtCusName").val();
    let customerAddress = $("#txtCusAddress").val();
    let customerSalary = $("#txtCusSalary").val();

    for (var i=0;i<customerDB.length;i++){
        if (customerDB[i].getCustomerID()===customerId){
            customerDB[i].setCustomerName(customerName);
            customerDB[i].setCustomerAddress(customerAddress);
            customerDB[i].setCustomerSalary(customerSalary);
        }
    }
     loadAllCustomer()
     clearFields();


});

//---------------------delete customer------------------
    $("#btnRemoveCustomer").click(function (){
        let cusId=$("#txtCusID").val();
        for (let i=0;i<customerDB.length;i++){
            if (customerDB[i].getCustomerID()===cusId){
                customerDB.splice(i,1);
            }
        }
        clearFields();
        loadAllCustomer();


    });
$("#btnClearTextField").click(function (){
    clearFields();
});

//---------------------ClearTextFields---------------------
function clearFields (){
        $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary").val("");
}

//-------Field Focusing--------
$("#txtCusID").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusName").focus();
    }
});

$("#txtCusName").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusAddress").focus();
    }
});

$("#txtCusAddress").keydown(function (event) {
    if (event.key == "Enter") {
        $("#txtCusSalary").focus();
    }
});





