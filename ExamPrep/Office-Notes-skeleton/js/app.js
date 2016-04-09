var app = app || {};

(function(){
    var router = Sammy(function(){
        var selector = '#container';
        var requester = app.requester.load('kid_Zk3CHd16k-','eafe605c93e34a71804ad81ce25bbdad', 'https://baas.kinvey.com/')

        var userViewBag = app.userViewBag.load();

        var userModel = app.userModel.load(requester);

        var userController = app.userController.load(userViewBag, userModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                $('#menu').hide();
            } else {
                $('#welcomeMenu').text('Welcome, ' + sessionStorage['fullName']);
                $('#menu').show();
            }
        });

        this.get('#/login/', function() {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(selector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

    });

    router.run('#/');
}());
