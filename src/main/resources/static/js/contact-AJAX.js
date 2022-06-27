$(document).ready(function () {
    showPersons();
})

let contacts;

function showPersons() {
    $.get('/persons', {text: "Text"}, function (data) {
        console.log(data);
        contacts = getPersons();
        // contacts = data;
        $('#names').empty();
        for (let i = 0; i < data.length; i++) {
            let person = "<button type=\"button\" class=\"list-group-item list-group-item-action\"" +
                " onclick='showContactById(" + data[i].id + ")'>" + data[i].name + "</button>"
            $('#names').append(person)
        }

    })
}

function getPersons() {
    $.get('/persons', {text: "Text"}, function (data) {
        console.log(data);
        contacts = data;
        return data;

    })
}

function getContactById(obj, id) {
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].id === id) return obj[i];
    }

    return null;
}

function showContactById(id) {
    showContact(getContactById(contacts, id));
}

function showContact(cont) {
    $('#contact').empty();
    // console.log(getContactById(contacts, id));
    let contact = cont;
    let card = " <div class=\"card\">\n" +
        "<div id=\"name_person\" class=\"card-header fs-2 d-flex justify-content-between\">\n" +
        "<div>" + contact.name + "\n" +
        "</div>" +

        "<div>" +
        "<button type=\"button\" class=\"fs-4 mb-3 btn btn-outline-Light\" onclick='deleteContact(" + contact.id + ")'>\n" +
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" " +
        "class=\"bi bi-person-x\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4" +
        " 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 " +
        "1.332-.678.678-.83 1.418-.832 1.664h10z\"></path>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1" +
        " .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 " +
        "7l-1.147-1.146a.5.5 0 0 1 0-.708z\"></path>\n" +
        "</svg>\n" +
        "</button>" +
        "</div>" +
        "</div>\n" +

        "<div class=\"card-body\">\n" +
        "<div class='fs-2 d-flex justify-content-between'>" +
        "<div><h5 class=\"card-title\">Phone numbers</h5></div>\n" +

        "<button class=\"btn btn-outline-Light\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseExample\" " +
        "aria-expanded=\"false\" aria-controls=\"collapseExample\" class=\"fs-2 \">\n" +
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" " +
        "class=\"bi bi-plus-square\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2" +
        " 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"/>\n" +
        "  <path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"/>\n" +
        "</svg></button>" +
        "</div>" +
        "</div>" +

        //collapse form
        "<div class=\"collapse\" id=\"collapseExample\">" +
        "<div class=\"card card-body\">\n" +
        "<form class='input-group mb-3' name='addPhoneNumberForm'>" +
        "<input id='phoneNumberInput' type=\"text\" class=\"form-control\" placeholder=\"Input phone number\" " +
        "aria-label=\"Recipient's username\" aria-describedby=\"button-addon2\">\n" +
        "<button class=\"btn btn-outline-Light\" type=\"button\" id=\"button-addon2\" " +
        "onclick=\"addPhoneNumber(" + contact.id + ")\" aria-expanded=\"false\" aria-controls=\"collapseExample\" " +
        "data-bs-toggle=\"collapse\" data-bs-target=\"#collapseExample\">Save</button>" +
        "</form>\n" +
        "</div></div>"
    let phones = contact.phoneNumbers;
    if (phones !== null) {
        card = card + "<ul id=\"phones_person\" class=\"list-group list-group-flush\">\n";
        $.each(phones, function (index, phone) {
            card = card + "<li id='phoneNumber_" + phone.id + "' class=\"list-group-item\">" +
                "<div class='d-flex justify-content-between'>" +
                "<div class='phone-text'>" + phone.phoneNumber + "</div>" +
                "<div class=\"d-flex justify-content-end\">" +
                "<button onclick='deletePhoneNumber(" + phone.id + ")' class=\"fs-7 btn btn-outline-Light\">\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" " +
                "class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n" +
                "<path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5" +
                " 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2" +
                " 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1" +
                " 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0" +
                " 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a" +
                ".5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"></path>\n" +
                "</svg>\n" +
                "</button>" +

                "<button  class=\"btn btn-outline-Light\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#edit_phone\" " +
                "aria-expanded=\"false\" aria-controls=\"edit_phone\" class=\"fs-2 \">\n" +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"" +
                " class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\">\n" +
                "  <path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293" +
                " 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-" +
                ".805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/>\n" +
                "  <path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 " +
                "0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 " +
                "0 0 1 2.5v11z\"/>\n" +
                "</svg>\n" +
                "</button>" +
                "</div>" +
                "</div></li>"+

            //collapse form
            "<div class=\"collapse\" id=\"edit_phone\">" +
            "<div class=\"card card-body\">\n" +
            "<form class='input-group mb-3' name='addPhoneNumberForm'>" +
            "<input id='phoneNumberInput_" + phone.id + "' type=\"text\" class=\"form-control\" value='"+ phone.phoneNumber +"' " +
            "aria-label=\"Recipient's username\" aria-describedby=\"button-addon2\">\n" +
            "<button class=\"btn btn-outline-dark\" type=\"button\" id=\"button-addon2\" " +
            "onclick=\"editPhoneNumber(" + phone.id + ")\" aria-expanded=\"false\" aria-controls=\"edit_phone\" " +
            "data-bs-toggle=\"collapse\" data-bs-target=\"#edit_phone\">Save</button>" +
            "</form>\n" +
            "</div></div>"
        })
        card = card + "                        </ul>\n"
    }
    card = card + "                      <hr>  <h5 class=\"card-title\">E-mails</h5>\n"
    let emails = contact.emails;
    if (emails !== null) {
        card = card + "                        <ul id=\"emails_person\" class=\"list-group list-group-flush\">\n";
        $.each(emails, function (index, email) {
            card = card + "  <li class=\"list-group-item\">" + email.email + "</li>"
        })
        card = card + "\n" +
            "                        </ul>\n" +
            "                    </div>\n"
    }
    if (contact.note !== null) {
        card = card + "                    <div id=\"note_person\" class=\"card-footer text-muted\">\n" +
            contact.note +
            "                    </div>\n"
    }
    card = card + "                </div>"

    $('#contact').append(card)
}

function addPerson() {
    let form = document.forms["addContactForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    data = JSON.stringify(data, null, 2);
    console.log(data);
    $.ajax({
        url: '/persons',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: data,
        success(person) {
            showContact(person);
            showPersons();
        }

    })
}

function deleteContact(id) {
    $.ajax({
        url: '/persons/' + id,
        dataType: 'json',
        type: 'DELETE',
        contentType: 'application/json',
        cache: false,
        success() {
        },
        statusCode: {
            200: function () {
                showPersons();
                $('#contact').empty();
            }
        }
    })
}

function addPhoneNumber(contId) {

    $.ajax({
        url: '/phones?' +
            $.param({personId: contId}),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            phoneNumber: $("#phoneNumberInput").val(),
        }),
        success(contact) {
            console.log(contact)
            $('#phones_person').append("<li class=\"list-group-item\">" + contact.phoneNumber + "</li>")
        },
        statusCode: {
            200: function () {
                showPersons();
            }
        }
    })
}

function deletePhoneNumber(id) {
    $.ajax({
        url: '/phones/' + id,
        dataType: 'json',
        type: 'DELETE',
        contentType: 'application/json',
        cache: false,
        success(id) {
            alert(id)
            $('#phoneNumber_' + id).remove();
        },
        statusCode: {
            200: function () {
                showPersons();
                $('#phoneNumber_' + id).remove();
            }
        }
    })
}

function editPhoneNumber(phoneId) {

    $.ajax({
        url: '/phones/'+ phoneId,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            phoneNumber: $("#phoneNumberInput_"+phoneId).val(),
        }),
        success(contact) {
            console.log(contact)
            $('#phoneNumber_' + phoneId).find('.phone-text').html(contact.phoneNumber)
        },
        statusCode: {
            200: function () {
                showPersons();
            }
        }
    })
}