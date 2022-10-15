
//----------------------Save Customer-----------------------
$("#btnSaveCustomer").click(function (){
    let customerId=$("#txtCusID").val();
    let customerName=$("#txtCusName").val();
    let customerAddress=$("#txtCusAddress").val();
    let customerSalary=$("#txtCusSalary").val();

    let CustomerObject=new CustomerDTO(customerId,customerName,customerAddress,customerSalary);

    customersDB.push(CustomerObject);
    loadAllCustomer();
    cleartextFields();

 });

 function loadAllCustomer(){
    $("#tblCustomer").empty();
    for (let customer of customersDB) {
        let row = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.address}</td><td>${customer.salary}</td></tr>`;
        $("#tblCustomer").append(row);

    }
    bindRowClickEvent();
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
    cleartextFields();
});

//--------------------Row Clicked----------------
function bindRowClickEvent(){
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



function cleartextFields(){
    $("#txtCusID").focus();
    $("#txtCusID,#txtCusName,#txtCusAddress,#txtCusSalary").val("");
}