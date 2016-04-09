var app = app ||{};

app.lecturesViewBag = (function(){
    function showLecutres(selector,data,myLectures){

        $.get('templates/calendar.html',function (templ){
            var rendered = Mustache.render(templ, myLectures);
            $(selector).html(rendered);
            $('#calendar').fullCalendar({

                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            $.get('templates/add-lecture.html',function (templ){
                                $(selector).html(templ);
                                $('#addLecture').on('click',function(){
                                    var title = $('#title').val(),
                                        start = $('#start').val(),
                                        end = $('#end').val(),
                                        lecturer = sessionStorage['username'];

                                    Sammy(function(){
                                        this.trigger('addLecture',{title:title,start:start,end:end,lecturer:lecturer})
                                    })
                                })
                            });
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function (calEvent) {
                            var lecture = calEvent;

                            Sammy(function () {
                                this.trigger('showEditLecture',lecture );
                            });


                        });

                        $('#deleteLecture').on('click', function(calEvent) {
                            var lecture = calEvent;

                            Sammy(function () {
                                this.trigger('showDeleteLecture',lecture );
                            });
                        })
                    });
                    $('#events-modal').modal();
                }
            })
        })
    }

    function showAddLecture(selector){
        $.get('templates/add-lecture.html',function (templ){
            $(selector).html(templ);
            $('#addLecture').on('click',function(){
                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'];

                Sammy(function(){
                    this.trigger('addLecture',{title:title,start:start,end:end,lecturer:lecturer})
                })
            })
        });
    };

    function showEditLecture(selector, data){
        $.get('templates/edit-lecture.html',function(templ){
            var rendered = Mustache.render(templ,data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function(){

                var title = $('#title').val(),
                    start = $('#start').val(),
                    end = $('#end').val(),
                    lecturer = sessionStorage['username'],
                    id = $(this).parent().attr('data-id');


                Sammy(function(){
                    this.trigger('editLecture',{title:title,start:start,end:end,lecturer:lecturer})
                })
            })
        });
    };

    function showDeleteLecture(selector, data){
        $.get('templates/delete-lecture.html', function(templ){
            var rendered = Mustache.render(templ,data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function(){
                var id = $(this).parent().attr('data-id');
                Sammy(function(){
                    this.trigger('deleteLecture',{_id:id})
                })
            })
        })

    }

    return{
        load: function(){
            return{
                showLectures:showLecutres,
                showAddLecture:showAddLecture,
                showEditLecture:showEditLecture,
                showDeleteLecture:showDeleteLecture
            }
        }
    }
}());
