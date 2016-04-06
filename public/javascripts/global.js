var contactListData = [];

$(function() {

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
