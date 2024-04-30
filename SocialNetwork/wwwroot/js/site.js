$(document).ready(function () {
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
                window.location.href = "/User/Index";
                getUserInfo()
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
                window.location.href = "/User/Index";
                getUserInfo()
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

    function getUserInfo() {

    }
});