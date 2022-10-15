//---------------------Save Item-------------------
$("#btnSaveItem").click(function (){
    let itemCode= $("#txtItemCode").val();
    let itemName= $("#txtItemName").val();
    let itemQty= $("#txtItemQty").val();
    let itemPrice= $("#txtItemPrice").val();

    let ItemObject=new ItemDTO(itemCode,itemName,itemQty,itemPrice);

    itemDB.push(ItemObject);
    loadAllItems();
    cleartextFields();

});

function loadAllItems(){
    $("#tblItem").empty();
    for (let item of itemDB ) {
        var row = `<tr><td>${item.code}</td><td>${item.name}</td><td>${item.qty}</td><td>${item.price}</td></tr>`;
        $("#tblItem").append(row);
    }
    bindRowClickEvent();
}
//-------------Search Item---------------
$("#btnSearchItem").click(function (){
   let typedCode= $("#txtItemSearch").val();
   let item=searchItem(typedCode);

   if (item!=null){
       $("#txtItemCode").val(item.code);
       $("#txtItemName").val(item.name);
       $("#txtItemQty").val(item.qty);
       $("#txtItemPrice").val(item.price);

       $("#txtItemSearch").val("");
   }

})

function searchItem(itemCode){
    for (let item of itemDB) {
        if (item.code==itemCode){
            return item;
        }

    }
    return null
}

//--------------------Row Clicked----------------
function bindRowClickEvent(){
    $("#tblItem>tr").click(function (){
        let itemCode=$(this).children(":eq(0)").text();
        let itemName=$(this).children(":eq(1)").text();
        let itemQty=$(this).children(":eq(2)").text();
        let itemPrice=$(this).children(":eq(3)").text();

        $("#txtItemCode").val(itemCode);
        $("#txtItemName").val(itemName);
        $("#txtItemQty").val(itemQty);
        $("#txtItemPrice").val(itemPrice);

    });
}


//-------------------Clear Text Fields---------------
$("#btnClearItemTextField").click(function (){
   cleartextFields();
});

function cleartextFields(){
    $("#txtItemCode").focus();
    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").val("");
}



