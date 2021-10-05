function visualizar(){
    $.ajax({
        dataType: 'json',
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis",
        type: 'GET',
    
        success:function(response){

            var misItems=response.items;

            for(i=0 ; i<misItems.length; i++){

                console.log(misItems[i]);
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>"+misItems[i].brand+"</td>");
                $("#resultado").append("<td>"+misItems[i].model+"</td>");
                $("#resultado").append("<td>"+misItems[i].category_id+"</td>");
                $("#resultado").append("<td>"+misItems[i].name+"</td>");
                $("#resultado").append('<td><button onclick="borrar('+misItems[i].id+')">Borrar</button></td>');
                $("#resultado").append('<td><button onclick="obtenerItemEspecifico('+misItems[i].id+')">Cargar</button></td>');
                $("#resultado").append("<tr>");
            }
        },
    
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });

}

function guardarInformacion(){
    var elemento={
        id:$("#miId").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    }
    
    var dataToSend = JSON.stringify(elemento);
    //JSON = JavaScript Object Notation

    $.ajax({
        dataType: 'json',
        data: elemento,
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis",
        type: 'POST',

        success:function(response){
            console.log(response);
        },
        
        error: function(jqXHR, textStatus, errorThrown) {

        }
    });
}

function borrar(idElemento){
    var elemento={
      id:idElemento
    };
    
    var dataToSend=JSON.stringify(elemento);
    //JSON= JavaScript Object Notation
    $.ajax({
          dataType:'json',
          data:dataToSend,
          url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis",
          type:'DELETE',
          contentType:'application/json',

          success:function(response) {
            $("#resultado").empty();
            console.log("Borrado exitoso");
            alert("Borrado exitoso")
          },
          
          error: function(jqXHR, textStatus, errorThrown) {
                
          }
      });
    }
    
function obtenerItemEspecifico(idItem){
    $.ajax({
        dataType: 'json',
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis/"+idItem,
        type: 'GET',
    
        success:function(response){
            console.log(response);
            var item = response.items[0];

            $("#miId").val(item.id);
            $("#brand").val(item.brand);
            $("#model").val(item.model);
            $("#category_id").val(item.category_id);
            $("#name").val(item.name);
        },
    
        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });

}

function editarInformacion(){
    let elemento={
        id:$("#miId").val(),
        brand:$("#brand").val(),
        model:$("#model").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    };

    console.log(elemento);
    let dataToSend=JSON.stringify(elemento);
    //JSON = JavaScript Object Notation

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType:'application/json',
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/orthesis/orthesis",
        type: 'PUT',

        success:function(response){
            //console.log(response);
            $("#resultado").empty();
            $("#id").val("");
            $("#brand").val("");
            $("#model").val("");
            $("#category_id").val("");
            $("#name").val("");
            visualizar();
            alert("se ha actualizado")
        },
        
        error: function(jqXHR, textStatus, errorThrown) {  

        }
    });
}