﻿var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    //per Ajax si veda qui: https://datatables.net/manual/ajax
    //plugins: https://datatables.net/plug-ins/index
    //plugin per l'internazionalizzazione: https://datatables.net/plug-ins/i18n/
    //installazione del plugin per il supporto alla lingua italiana: https://datatables.net/plug-ins/i18n/Italian.html
    dataTable = $('#tblData').DataTable({
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.2/i18n/it-IT.json"
        },
        ajax: {
            url: "/Admin/Company/GetAll"
        },
        columns: [
            { data: "name", width: "15%" },
            { data: "streetAddress", width: "15%" },
            { data: "city", width: "15%" },
            { data: "state", width: "15%" },
            { data: "phoneNumber", width: "15%" },
            {
                data: "id",
                render: function (data) {
                    //una multiline string deve essere racchiusa tra backtick
                    //il backtick si può ottenere sulla tastiera italiana con ALT+96
                    //https://superuser.com/questions/667622/italian-keyboard-entering-tilde-and-backtick-characters-without-changin
                    //tra i backtick mettiamo il codice HTML che deve essere renderizzato all'interno della colonna di DataTable
                    return `
                    <div class="w-75 btn-group" role="group">
                            <a href="/Admin/Company/Upsert?id=${data}" class="btn btn-primary mx-2">
                                <i class="bi bi-pencil-square"></i>Edit</a>
                            <a onClick=Delete("/Admin/Company/Delete/${data}") class="btn btn-danger mx-2">
                                <i class="bi bi-trash-fill"></i>Delete</a>
                        </div>
                    `
                },
                width: "15%"
            },

        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    if (data.success) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    } else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    })
}
