$(document).ready(function () {
    let userId = 0;

    // Проверяем, что текущая страница - это страница пользователя
    if (window.location.pathname === "/User/Index") {
        // Получаем userId из localStorage (или откуда у вас он сохраняется)
        userId = localStorage.getItem('userId');

        // Вызываем функцию для получения информации о пользователе
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

                console.log(userInfo);

                $('#userSurname').val(userInfo.surname);
                $('#userName').val(userInfo.name);
                $('#userMiddlename').val(userInfo.middlename);
            },
            error: function (response) {
                // Обработка ошибки
            }
        });
    }
});