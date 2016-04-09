var app = app || {};

app.menuController = (function(){
    function MenuController(viewBag, model){
        this.model =model;
        this.viewBag= viewBag;
    }

    MenuController.prototype.loadGuestMenu= function(selector){
        this.viewBag.showGuestMenu(selector);
    };

    MenuController.prototype.loadUserMenu= function(selector){
        this.viewBag.showUserMenu(selector);
    };

    return{
        load: function(viewBag, model){
            return new MenuController(viewBag,model);
        }
    }

}());
