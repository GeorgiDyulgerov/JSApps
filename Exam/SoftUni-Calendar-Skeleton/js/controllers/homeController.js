var app = app || {};

app.homeController = (function(){
    function HomeController(viewBag, model){
        this.model = model;
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomeGuest = function(selector){
        this.viewBag.showWelcomeGuest(selector);
    };

    HomeController.prototype.loadWelcomeUser = function(selector){
        var data = {
            username: sessionStorage['username']
        }

        this.viewBag.showWelcomeUser(selector, data);
    };


    return {
        load: function(viewBag, model){
            return new HomeController(viewBag, model);
        }
    }
}());
