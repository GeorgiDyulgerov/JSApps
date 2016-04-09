/**
 * Created by Go6koy on 3/15/2016.
 */
var auth="Basic cGVzaG86MTIzNA==";
var serviceURL="https://baas.kinvey.com/appdata/kid_bk3jWOHS1W"

var action = function(){
    var listCountries = function (){
        $.ajax({
                type:"GET",
                url: serviceURL + "/Countries",
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic cGVzaG86MTIzNA==");
                },
                success:function (data){
                    $("main").empty();
                    for(var index in data){
                        $("main").append("<p>" + data[index].name + "</p>")
                    }
                },
            error:function(err){}
            })};
    var deleteCountry =function(name){
        $.ajax({
            type:"DELETE",
            url:serviceURL + '/Countries'+'?query={"name":"' + name + '"}',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic a2lkX2JrM2pXT0hTMVc6NTZjZTkzN2MyMDUzNGFjODhjNTA3MDg3YzFiYzg3NWQ=");
            },
            success:function (data){
                console.log("success");
            },
            erreor:function (err){
                console.log("err");
            }
        })}
    return {
        listCountries:listCountries,
        deleteCountry:deleteCountry
    }

}();

$("#list-countries").on("click",function(){
    action.listCountries();
});
$("#delete-country").on("click",function(){
    var country = $("#delete-this-country").val();
    action.deleteCountry(country);
    action.listCountries();
});
