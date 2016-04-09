var app = app ||{};

app.userViewBag = (function(){
    function showLoginPage(selector){
        $.get('templates/login.html', function(templ){
            $(selector).html(templ);
            $('#login-button').on('click',function(){
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function(){
                    this.trigger('login',{username:username,password:password})
                })
            })
        })
    }

    function showRegisterPage(selector){
        $.get('templates/register.html', function(templ){
            $(selector).html(templ);
            $('#register-button').on('click',function(){
                var username = $('#username').val(),
                    password = $('#password').val(),
                    confirmPasword = $('#confirm-password').val();

                if(password  === confirmPasword){
                    Sammy(function(){
                        this.trigger('register',{username:username,password:password})
                    })
                }
                else{
                    throw Error("Passwords do not match.")
                }
            })
        })
    }

    return{
        load: function(){
            return{
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());
