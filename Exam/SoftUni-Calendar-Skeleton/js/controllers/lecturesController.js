var app = app ||{};

app.lecturesController = (function(){
    function LecturesController(viewBag,model){
        this.model=model;
        this.viewBag=viewBag;
    }

    LecturesController.prototype.loadLectures = function(selector){
        _this=this;

        this.model.listAllLectures()
            .then(function(data){
                _this.viewBag.showLectures(selector,data,false);
            })
    };

    LecturesController.prototype.loadMyLectures = function(selector){
        _this=this;
        var userId = sessionStorage['userId'];
        this.model.listMyLectures()
            .then(function(data){
                _this.viewBag.showLectures(selector,data,data);
            })
    };

    LecturesController.prototype.loadAddLecture = function(selector){
        this.viewBag.showAddLecture(selector);
    };

    LecturesController.prototype.addLecture = function(data){
        var result={
            title:data.title,
            start: data.start,
            end: data.end,
            lecturer:sessionStorage['username']
        };

        this.model.addLecture(result)
            .then(function(success){
                console.log(success);
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/calendar/my/'});
                });
            });
    };

    LecturesController.prototype.loadEditLecture = function (selector, data){
        this.viewBag.showEditLecture(selector, data);
    };

    LecturesController.prototype.editLecture = function (data){
        data.lecturer = sessionStorage['username'];
        this.model.editLecture(data._id,data)
            .then(function (success){
                console.log(success);
            })
    };

    LecturesController.prototype.loadDeleteLecture = function (selector, data){
        this.viewBag.showDeleteLecture(selector,data);
    };

    LecturesController.prototype.deleteLecture = function(noteId){
        this.model.deleteLecture(noteId)
            .then(function(success){
                console.log(success);
            });
    };

    return{
        load: function(viewBag, model){
            return new LecturesController(viewBag,model);
        }
    }

}());
