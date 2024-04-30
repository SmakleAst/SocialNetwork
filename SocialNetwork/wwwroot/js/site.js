﻿$(document).ready(function () {
    let userId = 0;

    if (window.location.pathname === "/User/Index") {
        userId = localStorage.getItem('userId');
        getUserAccount(userId);
    }

    $('#registrationForm').submit(function (e) {
        e.preventDefault();
        var url = '/Auth/Registration';

        var login = $('#registrationLogin').val() || "";
        var password = $('#registrationPassword').val() || "";
        var surname = $('#registrationSurname').val() || "";
        var name = $('#registrationName').val() || "";
        var middlename = $('#registrationMiddlename').val() || "";

        var formData = {
            Login: login,
            Password: password,
            Surname: surname,
            Name: name,
            Middlename: middlename
        };

        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                localStorage.setItem('userId', response.data.id);
                window.location.href = "/User/Index";
            },
            error: function (response) {
                Swal.fire({
                    title: response.responseJSON.description,
                    icon: 'error',
                    confimButtonText: 'Ok'
                })
            }
        });
    });

    $('#authForm').submit(function (e) {
        e.preventDefault();
        var url = '/Auth/Authentification';

        var login = $('#authLogin').val() || "";
        var password = $('#authPassword').val() || "";

        var formData = {
            Login: login,
            Password: password
        };

        $.ajax({
            url: url,
            method: 'GET',
            data: formData,
            success: function (response) {
                localStorage.setItem('userId', response.data.id);
                window.location.href = "/User/Index";
            },
            error: function (response) {
                Swal.fire({
                    title: response.responseJSON.description,
                    icon: 'error',
                    confimButtonText: 'Ok'
                })
            }
        });
    });

    function getUserAccount(userId) {
        userId = localStorage.getItem('userId');
        $.ajax({
            url: `/User/GetUserAccount/?userId=${userId}`,
            method: 'GET',
            success: function (response) {
                var userInfo = response.data;

                $('#userSurname').val(userInfo.surname);
                $('#userName').val(userInfo.name);
                $('#userMiddlename').val(userInfo.middlename);
                $('#sendMessageFromUserId').val(userInfo.id);
            },
            error: function (response) {
            }
        });
    }

    function model() {
        return {
            userId: localStorage.getItem('userId')
        }
    }

    let messagesDataTable = $('#messagesTable').DataTable({
        info: true,
        searching: true,
        paging: true,
        fixedHeader: true,
        keys: true,
        language: {
            "search": "Поиск:",
            "lengthMenu": "Показать _MENU_ записей",
            "info": "Показано с _START_ по _END_ из _TOTAL_ записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "paginate": {
                "first": "Первая",
                "previous": "Предыдущая",
                "next": "Следующая",
                "last": "Последняя"
            }
        },
        ajax: {
            url: '/User/GetAllMessages',
            method: 'GET',
            data: model,
        },
        columns: [
            { data: 'id', visible: false },
            {
                data: 'header',
                render: function (data, type, row) {
                    return '<a href="#" class="open-modal">' + data + '</a>';
                }
            },
            { data: 'dateOf' },
            { data: 'fromUserLogin' },
            { data: 'isReading', visible: false }
        ],
        createdRow: function (nRow, data) {
            for (var i = 0; i < messagesDataTable.columns().header().length - 1; i++) {
                $('td', nRow).eq(i).css('cursor', 'pointer');

                /*$('td', nRow).eq(i).on('click', null);*/
            }

            if (data.isReading === false) {
                $(nRow).addClass('table-info'); // Добавляем класс для светло-синего цвета строки
            }
        }
    });

    // Добавим обработчик событий для гиперссылок
    $('#messagesTable').on('click', '.open-modal', function (e) {
        e.preventDefault();

        var dataTable = $('#messagesTable').DataTable();
        var rowData = dataTable.row($(this).closest('tr')).data();
        var messageId = rowData.id;

        console.log(messageId);

        //Изменить статус сообщения
        $.ajax({
            url: `/User/IsReadMessage/?messageId=${messageId}`,
            method: 'PATCH',
            success: function (response) {
                $('#messagesTable').DataTable().ajax.reload();
            },
            error: function (response) {
            }
        });

        //Заполнить содержимое формы
        $.ajax({
            url: `/User/GetMessage/?messageId=${messageId}`,
            method: 'GET',
            success: function (response) {
                var messageInfo = response.data;

                $('#messageHeader').val(messageInfo.header);
                $('#messageBody').val(messageInfo.body);
                $('#messageDate').val(messageInfo.dateOf);
            },
            error: function (response) {
            }
        });

        // Откроем модальное окно
        $('#messageModal').modal('show');
    });

    $('#messageModal .close').click(function () {
        $('#messageModal').modal('hide');
    });

    $('#sendMessageForm').submit(function (e) {
        e.preventDefault();
        var url = '/User/SendMessageToUser';
        
        var fromUserId = parseInt($('#sendMessageFromUserId').val(), 10) || 0;
        var login = $('#sendMessageLogin').val() || "";
        var header = $('#sendMessageHeader').val() || "";
        var body = $('#sendMessageBody').val() || "";

        var formData = {
            FromUserId: fromUserId,
            Login: login,
            Header: header,
            Body: body
        };

        $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                Swal.fire({
                    title: response.description,
                    icon: 'success',
                    confimButtonText: 'Ok'
                })
            },
            error: function (response) {
                Swal.fire({
                    title: response.responseJSON.description,
                    icon: 'error',
                    confimButtonText: 'Ok'
                })
            }
        });
    });
});