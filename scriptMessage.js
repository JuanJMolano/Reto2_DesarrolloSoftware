function visualizar(){
    $.ajax({
        dataType: 'json',
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type: 'GET',
    
        success:function(response){

            var misItems=response.items;

            for(i=0 ; i<misItems.length; i++){

                console.log(misItems[i]);
                $("#resultado").append("<tr>");
                $("#resultado").append("<td>"+misItems[i].messagetext+"</td>");
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
        messagetext:$("#messagetext").val(),
    }
    
    var dataToSend = JSON.stringify(elemento);
    //JSON = JavaScript Object Notation

    $.ajax({
        dataType: 'json',
        data: elemento,
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
          url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
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
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message/"+idItem,
        type: 'GET',
    
        success:function(response){
            console.log(response);
            var item = response.items[0];

            $("#miId").val(item.id);
            $("#messagetext").val(item.messagetext);
        },
    
        error: function(jqXHR, textStatus, errorThrown) {       
        }
    });

}

function editarInformacion(){
    let elemento={
        id:$("#miId").val(),
        messagetext:$("#messagetext").val(),
    };

    console.log(elemento);
    let dataToSend=JSON.stringify(elemento);
    //JSON = JavaScript Object Notation

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        contentType:'application/json',
        url:"https://g7165ea144b15ac-databasereto.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/message/message",
        type: 'PUT',

        success:function(response){
            //console.log(response);
            $("#resultado").empty();
            $("#id").val("");
            $("#messagetext").val("");
            traerinformacion();
            alert("se ha Actualizado")
        },
        
        error: function(jqXHR, textStatus, errorThrown) {  

        }
    });
}