$(document).ready(function () {
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
            { data: 'header' },
            { data: 'dateOf' },
            { data: 'fromUserLogin' },
            {
                data: null,
                sortable: false,
                render: function (data, type) {
                    return '<button id="showMessage" class="btn btn-success btn-sm center-block">Посмотреть</button>'
                }
            }
        ],
        createdRow: function (nRow, data) {
            for (var i = 0; i < messagesDataTable.columns().header().length - 1; i++) {
                $('td', nRow).eq(i).css('cursor', 'pointer');

                /*$('td', nRow).eq(i).on('click', null);*/
            }
        }
    });
});