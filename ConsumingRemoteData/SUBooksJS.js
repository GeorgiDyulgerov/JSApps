/**
 * Created by Go6koy on 3/15/2016.
 */
var serviceUrl = "https://baas.kinvey.com/appdata/kid_-kV55H6OkW";

var action=function(){
    var listAllBooks = function(){
        $.ajax({
            type:"GET",
            url: serviceUrl + "/books",
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization","Basic cGVzaG86MTIzNA==")
            },
            success:function(data){
                $("main").empty();
                var table = "<table><tr><th>Title</th><th>Author</th><th>ISBN</th><th>Edit</th><th>Delete</th></tr>";
                for(var index in data){

                    table += ("<tr><td>"
                              +data[index].title+"</td><td>"
                              + data[index].author+"</td><td>"
                              + data[index].isbn+"</td><td><button id='edit' onclick='editMe(this)' value='"
                              +data[index]._id
                              +"'>Edit</button></td><td><button id='delete' onclick='deleteMe(this)' value='"
                              +data[index].title
                              +"'>Delete</button></td></tr>");

                }
                table +=("</table>");
                $("main").append(table);
            },
            error:function (err){}
        })};

    var addBook = function(title,author,isbn){
        $.ajax({
            type:"POST",
            url: serviceUrl + "/books",
            data:{"title":title,"author":author,"isbn":isbn},
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization","Basic cGVzaG86MTIzNA==")
            },
            success:function(data){
                action.listAllBooks()
            },
            error:function(err){}
        })};

    var deleteBook = function(title){
        $.ajax({
            type:"DELETE",
            url: serviceUrl + "/books"+'?query={"title":"' + title + '"}',
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization","Basic cGVzaG86MTIzNA==")
            },
            success:function(data){
                action.listAllBooks()
            },
            error:function(err){}
        })};

    var getBook = function(bookId){
        $.ajax({
            type:"GET",
            url: serviceUrl + "/books"+'/'+bookId,
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization","Basic cGVzaG86MTIzNA==")
            },
            success:function(data){
                var title = data.title;
                var author = data.author;
                var isbn = data.isbn;
                $("#edit-book-title").val(title);
                $("#edit-book-author").val(author);
                $("#edit-book-isbn").val(isbn +"");
                action.listAllBooks()
            },
            error:function(err){}
        })};

    var editBook = function(id, title, author, isbn ){
        $.ajax({
            type:"PUT",
            url: serviceUrl + "/books"+'/'+id,
            data:{"title":title,"author":author,"isbn":isbn},
            beforeSend:function(xhr){
                xhr.setRequestHeader("Authorization","Basic cGVzaG86MTIzNA==")
            },
            success:function(data){
                action.listAllBooks()
            },
            error:function(err){}
        })
    }

    return {
        listAllBooks:listAllBooks,
        addBook:addBook,
        deleteBook:deleteBook,
        getBook:getBook,
        editBook:editBook
    }
}();

window.onload=function(){
    action.listAllBooks();
};

$("#submit").on('click',function(){
    //console.log("ho");
    var title = $("#book-title").val();
    var author = $("#book-author").val();
    var isbn = $("#book-isbn").val();
    action.addBook(title,author,isbn);
    $("#book-title").val("");
    $("#book-author").val("");
    $("#book-isbn").val("");
});
var bookIdForEdit;
function editMe(button){
    bookIdForEdit = button.value;
    //console.log(bookIdForEdit);
    $("#add-book").hide();
    $("main").after('<div id="edit-book"> <header><h2>Edit Form</h2></header> <form>Book title: <input type="text" name="book-title" id="edit-book-title"><br>Book author: <input type="text" name="book-author" id="edit-book-author"><br>Book isbn: <input type="text" name="book-isbn" id="edit-book-isbn"><br> </form> <button id="editBook" onclick="editRequest()">Edit</button> </div>');
    action.getBook(bookIdForEdit);
};

function editRequest(){
    //console.log("req" + bookIdForEdit);
    var title = $("#edit-book-title").val();
    var author = $("#edit-book-author").val();
    var isbn = $("#edit-book-isbn").val();
    action.editBook(bookIdForEdit,title,author,isbn);
    $("#edit-book").hide();
    $("#add-book").show();
};

function deleteMe(button){
    var title = button.value;
    console.log(title);
    action.deleteBook(title);
};

