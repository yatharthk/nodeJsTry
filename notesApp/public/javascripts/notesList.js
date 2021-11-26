
$(document).ready(function(){

    $('form').on('submit',function(){
        var id=$('#notesId').val();
        var authName=$('#authName').val();
        var contents=$('#data').val();
        
        var notes={notesId:id,name:authName,data:contents};
        alert(`id: ${notes.notesId}  name: ${notes.name}  data: ${notes.data}`);
        
        $.ajax({
            type:'POST',
            url:'/notes',
            data:notes,
            success:(data)=>{
                alert(`from success ${notes.notesId}`)
                location.reload();
            }
        });
    
        return false;
    });

    $('li').on('click',function(){
        var notesIdExtracted=Number($(this).text().split('|')[0]);
        alert(`deleting ${notesIdExtracted} id notes`);

        $.ajax({
            url:'/notes/'+notesIdExtracted,
            type:'DELETE',
            success:function(data){
                location.reload();
            }
        })


    });

    $('#update-notes').on('click',function(){
        alert('inside');
        var id=$('#notesId').val();
        var authName=$('#authName').val();
        var contents=$('#data').val();
        
        var notes={notesId:id,name:authName,data:contents};
        alert(`id: ${notes.notesId}  name: ${notes.name}  data: ${notes.data}`);

        $.ajax({
            type:'PUT',
            url:'/notes',
            data:notes,
            success:(data)=>{
                alert(`from success ${notes.notesId}  Updated`)
                location.reload();
            }
        });
    
        return false;
    });

});