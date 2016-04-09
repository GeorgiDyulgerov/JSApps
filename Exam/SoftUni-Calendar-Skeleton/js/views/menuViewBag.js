var app = app || {};

app.menuViewBag = (function(){
    function showGuestMenu(selector){
        $.get('templates/menu-login.html', function(templ){
            $(selector).html(templ);
        })
    }

    function showUserMenu(selector, data){
        $.get('templates/menu-home.html', function(templ){
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        })
    }

    return{
        load: function(){
            return{
                showGuestMenu: showGuestMenu,
                showUserMenu: showUserMenu
            }
        }
    }

}());
