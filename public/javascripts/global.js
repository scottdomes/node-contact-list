var contactListData = [];

$(function() {

  $('#new-contact-submit').on('click', addContact);
  $('#contactList table tbody').on('click', 'td a.link-delete-contact', deleteContact);

  populateContactsTable();

});

function populateContactsTable() {

  var tableContent = '';

  $.getJSON( '/contacts/list', function( data ) {

    $.each(data, function() {
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="link-show-contact" rel="' + this.first_name + this.last_name + '">';
      tableContent += this.first_name + ' ' + this.last_name;
      tableContent += '</a></td>';
      tableContent += '<td>' + this.email + '</td>';
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
      'email': $('#new-contact-form input#inputContactEmail').val()
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