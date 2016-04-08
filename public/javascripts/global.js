var contactListData = [];

$(function() {

  $('#new-contact-submit').on('click', addContact);
  $('#contactList table tbody').on('click', 'td a.link-delete-contact', deleteContact);
  $('#contactList table tbody').on('click', 'button.contacted', updateContactDate);

  populateContactsTable();

});

function populateContactsTable() {

  var tableContent = '';

  $.getJSON( '/contacts/list', function( data ) {

    var contactArray = data.sort(function(a, b) {
      return a.last_contact - b.last_contact;
    });

    $.each(contactArray, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="link-show-contact" rel="' + this.first_name + this.last_name + '">';
      tableContent += this.first_name + ' ' + this.last_name;
      tableContent += '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
      tableContent += '<td>' + this.last_contact + '</td>';
      tableContent += '<td><button class="success button contacted" id="' + this._id + '"> Yes! </button></td>';
      tableContent += '<td><a href="#" class="link-delete-contact" rel="' + this._id + '">Delete</a></td>';
      tableContent += '</tr>';
    });

    $('#contactList table tbody').html(tableContent);


  });
}

function addContact(event) {
  event.preventDefault();

  var errorCount = 0;
  $('#new-contact-form input').each(function(index, val) {
    if ($(this).val() === '') { errorCount++; }
  });

  if (errorCount === 0) {

    var newContact = {
      'first_name': $('#new-contact-form input#inputFirstName').val(),
      'last_name': $('#new-contact-form input#inputLastName').val(),
      'email': $('#new-contact-form input#inputContactEmail').val(),
      'last_contact': moment().format("MMM Do YYYY")
    };

    $.ajax({
      type: 'POST',
      data: newContact,
      url: '/contacts/new',
      dataType: 'JSON'
    }).done(function(response) {

      if (response.msg === '') {

        $('#new-contact-form input').val('');

        populateContactsTable();

      } else {

        alert('Error: ' + response.msg);

      }
    });
  // If errorCount is more than 0
  } else {
    alert('Please fill in all fields!');
    return false;
  }
}

function deleteContact(event) {
  event.preventDefault();

  var confirmation = confirm('Are you sure you want to delete this contact?');

  if (confirmation === true) {

    $.ajax({
      type: 'DELETE',
      url: '/contacts/delete/' + $(this).attr('rel')
    }).done(function( response ) {

      if (response.msg === '') {
        populateContactsTable();
      } else {
        alert('Error: ' + response.msg);
      } 
    });
  } else {
    return false;
  }
}

function updateContactDate(event) {
  event.preventDefault();

  $.ajax({
    type: 'PUT',
    url: '/contacts/contacted/' + $(this).attr('id'),
    data: { 'date': moment().format("MMM Do YYYY") },
    dataType: 'JSON'
  }).done(function( response ) {

    if (response.msg === '') {
      populateContactsTable();
    } else {
      alert('Error: ' + response.msg);
    } 
  });

}