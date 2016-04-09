var app = app || {};

(function(){
    var router = Sammy(function(){
        var pageSelector = '#container';
        var menuSelector='#menu';
        var requester = app.requester.load('kid_WyqX7h4pkb','7a2da7daa86b4b31ada856b47b6290a7','https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var menuViewBag = app.menuViewBag.load();
        var lectureViewBag = app.lecturesViewBag.load();


        var userModel = app.userModel.load(requester);
        var lectureModel = app.lecturesModel.load(requester);

        var userController = app.userController.load(userViewBag,userModel);
        var homeController = app.homeController.load(homeViewBag);
        var menuController = app.menuController.load(menuViewBag);
        var lectureController = app.lecturesController.load(lectureViewBag,lectureModel);

        this.before({except:{path:'#\/(login\/|register\/)?'}}, function() {
            if(!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function() {
            if(!sessionStorage['sessionId']) {
                menuController.loadGuestMenu(menuSelector);
            } else {
                menuController.loadUserMenu(menuSelector);
            }
        });

        this.get('#/', function() {
            if(!sessionStorage['sessionId']) {
                homeController.loadWelcomeGuest(pageSelector);
            } else {
                homeController.loadWelcomeUser(pageSelector);
            }

        });

        this.get('#/login/', function() {
            userController.loadLoginPage(pageSelector);
        });

        this.get('#/register/', function() {
            userController.loadRegisterPage(pageSelector);
        });

        this.get('#/logout/', function() {
            userController.logout();
        });

        this.get('#/calendar/list/',function(){
            lectureController.loadLectures(pageSelector);
        });
        this.get('#/calendar/my/',function(){
            lectureController.loadMyLectures(pageSelector);
        });
        this.get("#/calendar/add/" ,function(){
            lectureController.loadAddLecture(pageSelector);
        });

        this.bind('redirectUrl', function(ev,data){
            this.redirect(data.url);
        });

        this.bind('login',function(ev, data){
            userController.login(data);
        });

        this.bind('register', function(ev, data){
            userController.register(data);
        });

        this.bind('addLecture', function(ev, data){
            lectureController.addLecture(data);
        });

        this.bind('showEditLecture',function(ev,data){
            lectureController.loadEditLecture(pageSelector,data);
        });

        this.bind('editLecture', function(ev, data){
            lectureController.editLecture(data);
        });

        this.bind('showDeleteLecture', function(ev, data){
            lectureController.loadDeleteLecture(pageSelector,data);
        });

        this.bind('deleteLecture', function(ev, data){
            lectureController.deleteLecture(data._id);
        })

    });

    router.run('#/')
}());
