$(document).ready(function () {
    showPersons();
})

let contacts;

function showPersons() {
    $.get('/persons', {text: "Text"}, function (data) {
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
    let contact = cont;
    let html = "";

    //CARD'S HEAD
    html = " <div class=\"card\">\n" +
        "<div  class=\"card-header fs-2 d-flex justify-content-between\">\n" +
        "<div id=\"name_person\">" + contact.name + "\n" +
        "</div>" +

        "<div class=\"d-flex justify-content-end\">" +
        "<button type=\"button\" class=\"fs-4 btn btn-outline-Light\" onclick='deleteContact(" + contact.id + ")'>\n" +
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

        "<button  class=\"fs-4 btn btn-outline-Light\" type=\"button\" data-bs-toggle=\"collapse\" " +
        "data-bs-target=\"#edit_person" + contact.id + "\" " +
        "aria-expanded=\"false\" aria-controls=\"edit_person\" class=\"fs-2 \">\n" +
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
        "</div></li>" +

        //collapse form
        "<div class=\"collapse\" id=\"edit_person" + contact.id + "\">" +
        "<div class=\"card card-body\">\n" +
        "<form class='input-group mb-3' name='editPersonForm'>" +
        "<input type='text' class='form-control' id='editName'\n" +
        "name='name' value='" + contact.name + "'>\n" +
        "<input id='editNote' type=\"text\" class=\"form-control\" value='" + contact.note + "' " +
        "aria-label=\"Recipient's username\" aria-describedby=\"button-addon2\">\n" +
        "<button class=\"btn btn-outline-dark\" type=\"button\" id=\"button-addon2\" " +
        "onclick=\"editPerson(" + contact.id + ")\" aria-expanded=\"false\" aria-controls=\"edit_person" + contact.id + "\" " +
        "data-bs-toggle=\"collapse\" data-bs-target=\"#edit_person" + contact.id + "\">Save</button>" +
        "</form>\n" +

        "</div>" +
        "</div>\n"

    html += "<div id=\"note_person\" class=\"card-footer text-muted\">\n"
    if (contact.note !== null) {
        html += contact.note
    }
    html += "</div>"
    html += "<div class=\"overflow-auto\" style='height: calc(100vh - 262px); overflow-y: scroll'>"

    html += "<div class=\"card-body m-0 py-0 bg-secondary text-white\">\n" +
        "<div class='fs-2 d-flex justify-content-between'>" +
        "<div class='d-flex align-items-center'><h5 class=\"card-title align-middle\">Phone numbers</h5></div>\n" +

        "<button class=\"btn btn-outline-Light fs-4 d-flex align-items-center\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseExample\" " +
        "aria-expanded=\"false\" aria-controls=\"collapseExample\" class=\" \">\n" +
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



    //PHONE NUMBERS

    let phones = contact.phoneNumbers;
    if (phones !== null) {
        html += "<ul id=\"phones_person\" class=\"list-group list-group-flush\">\n";
        $.each(phones, function (index, phone) {
            html += phoneNumberHtml(phone);
        })
        html += "</ul>\n"
    }

    //E-MAILS
    html += "<div class=\"card-body m-0 py-0 bg-secondary text-white\">\n" +
        "<div class='fs-2 d-flex justify-content-between'>" +
        "<div class='d-flex align-items-center'><h5 class=\"card-title\">E-mails</h5></div>\n" +

        "<button class=\"btn btn-outline-Light d-flex align-items-center\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#addEmailCollapse\" " +
        "aria-expanded=\"false\" aria-controls=\"addEmailCollapse\" class=\"fs-2 \">\n" +
        "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" " +
        "class=\"bi bi-plus-square\" viewBox=\"0 0 16 16\">\n" +
        "  <path d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2" +
        " 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"/>\n" +
        "  <path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z\"/>\n" +
        "</svg></button>" +
        "</div>" +
        "</div>" +

        //collapse form
        "<div class=\"collapse\" id=\"addEmailCollapse\">" +
        "<div class=\"card card-body\">\n" +
        "<form class='input-group mb-3' name='addEmailForm'>" +
        "<input id='emailInput' type='email' class='form-control' placeholder=\"Input email\" >" +
        "<button class=\"btn btn-outline-Light\" type=\"button\"" +
        "onclick=\"addEmail(" + contact.id + ")\" aria-expanded=\"false\" aria-controls=\"addEmailCollapse\" " +
        "data-bs-toggle=\"collapse\" data-bs-target=\"#addEmailCollapse\">Save</button>" +
        "</form>\n" +
        "</div></div>"
    let emails = contact.emails;
    if (emails !== null) {
        html += "<ul id=\"emails_person\" class=\"list-group list-group-flush\">\n";
        $.each(emails, function (index, email) {
            html += emailHtml(email);
        })
    }
    html += "</uL></div>\n"


    html += "</div>"

    $('#contact').append(html)
}

function phoneNumberHtml(phone) {

    let html = "<li id='phoneNumber_" + phone.id + "' class=\"list-group-item\">" +
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

        "<button  class=\"btn btn-outline-Light\" type=\"button\" data-bs-toggle=\"collapse\" " +
        "data-bs-target=\"#edit_phone" + phone.id + "\" " +
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
        "</div></li>" +

        //collapse form
        "<div class=\"collapse\" id=\"edit_phone" + phone.id + "\">" +
        "<div class=\"card card-body\">\n" +
        "<form class='input-group mb-3' name='addPhoneNumberForm'>" +
        "<input id='phoneNumberInput_" + phone.id + "' type=\"text\" class=\"form-control\" value='" + phone.phoneNumber + "' " +
        "aria-label=\"Recipient's username\" aria-describedby=\"button-addon2\">\n" +
        "<button class=\"btn btn-outline-dark\" type=\"button\" id=\"button-addon2\" " +
        "onclick=\"editPhoneNumber(" + phone.id + ")\" aria-expanded=\"false\" aria-controls=\"edit_phone" + phone.id + "\" " +
        "data-bs-toggle=\"collapse\" data-bs-target=\"#edit_phone" + phone.id + "\">Save</button>" +
        "</form>\n" +
        "</div></div>"


    return html;
}

function emailHtml(email) {

    let html = "<li id='email_" + email.id + "' class=\"list-group-item\">" +
        "<div class='d-flex justify-content-between'>" +
        "<div class='email-text'>" + email.email + "</div>" +
        "<div class=\"d-flex justify-content-end\">" +
        "<button onclick='deleteEmail(" + email.id + ")' class=\"fs-7 btn btn-outline-Light\">\n" +
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

        "<button  class=\"btn btn-outline-Light\" type=\"button\" data-bs-toggle=\"collapse\" " +
        "data-bs-target=\"#edit_email" + email.id + "\" " +
        "aria-expanded=\"false\" aria-controls=\"edit_email\" class=\"fs-2 \">\n" +
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
        "</div></li>" +

        //collapse form
        "<div class=\"collapse\" id=\"edit_email" + email.id + "\">" +
        "<div class=\"card card-body\">\n" +
        "<form class='input-group mb-3' name='editEmailForm'>" +
        "<input id='emailInput_" + email.id + "' type=\"text\" class=\"form-control\" value='" + email.email + "' >" +
        "<button class=\"btn btn-outline-dark\" type=\"button\" id=\"editEmailBtn\" " +
        "onclick=\"editEmail(" + email.id + ")\" aria-expanded=\"false\" aria-controls=\"edit_email" + email.id + "\" " +
        "data-bs-toggle=\"collapse\" data-bs-target=\"#edit_email" + email.id + "\">Save</button>" +
        "</form>\n" +
        "</div></div>"

    return html;
}

function addPerson() {
    let form = document.forms["addContactForm"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    data = JSON.stringify(data, null, 2);
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

function editPerson(id) {

    $.ajax({
        url: '/persons/' + id,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            name: $("#editName").val(),
            note: $("#editNote").val(),
        }),
        success(contact) {
            $('#name_person').html(contact.name);
            $('#note_person').html(contact.note);
        },
        statusCode: {
            200: function () {
                showPersons();
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
            $('#phones_person').prepend(phoneNumberHtml(contact))
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
        url: '/phones/' + phoneId,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            phoneNumber: $("#phoneNumberInput_" + phoneId).val(),
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

function addEmail(contId) {

    $.ajax({
        url: '/emails?' +
            $.param({personId: contId}),
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            email: $("#emailInput").val(),
        }),
        success(contact) {
            $('#emails_person').prepend("<li class=\"list-group-item\">" + contact.email + "</li>")
        },
        statusCode: {
            200: function () {
                showPersons();
            }
        }
    })
}

function deleteEmail(id) {
    $.ajax({
        url: '/emails/' + id,
        dataType: 'json',
        type: 'DELETE',
        contentType: 'application/json',
        cache: false,
        success(id) {
            alert(id)
            $('#email_' + id).remove();
        },
        statusCode: {
            200: function () {
                showPersons();
                $('#email_' + id).remove();
            }
        }
    })
}

function editEmail(emailId) {

    $.ajax({
        url: '/emails/' + emailId,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        cache: false,
        data: JSON.stringify({
            email: $("#emailInput_" + emailId).val(),
        }),
        success(contact) {
            $('#email_' + emailId).find('.email-text').html(contact.email)
        },
        statusCode: {
            200: function () {
                showPersons();
            }
        }
    })
}