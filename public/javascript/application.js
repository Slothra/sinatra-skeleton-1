$(document).ready(function() {
	var updateContactForm = $('#update');
	var newContactForm = $('#new');
	var allContacts=[];

	$('.display').on('click', function(evt) {
		evt.preventDefault();
		$("form").removeClass('visible');
		$(this).closest("li").find('form').addClass('visible');
	});

	var contactResponse = function(response){
		// debugger;
		$('#foundContact').text(response.firstname + ' ' + response.lastname + ' ' + response.email);
	}

	var updateResponse = function(response){
		$('#update-firstname').val(response.firstname)
		$('#update-lastname').val(response.lastname)
		$('#update-email').val(response.email)
	}

	$('#update-id').on('keyup', function(){
		$.ajax({
			method: 'GET',
			url: '/contacts/' + $('#update-id').val(),
			dataType: 'json',
			success: updateResponse
		});
	});

	$('#submit-update').on('click', function(evt) {
		evt.preventDefault();
		var updateContact = {}
		updateContact.firstname = $('#update-firstname').val();
		updateContact.lastname = $('#update-lastname').val();
		updateContact.email = $('#update-email').val();
		$.ajax({
			method: 'POST',
			url: '/contacts/' + $('#update-id').val(),
			data: JSON.stringify(updateContact),
			dataType: 'json',
			success: contactResponse
		})
	})


	$('#find-by-id').on('keyup', function(){
		$.ajax({
				method: 'GET',
				url: '/contacts/' + $('#find-by-id').val(),
				dataType: 'json',
				success: contactResponse
			});
	});



	newContactForm.on('click', function(evt) {
		evt.preventDefault();
		var newContact = {}
		newContact.firstname = $('#firstname').val();
		newContact.lastname = $('#lastname').val();
		newContact.email = $('#email').val();
		$.ajax({
			method: 'POST',
			url: newContactForm.attr('action'),
			data: JSON.stringify(newContact),
			success: function addNewContact() {
				var contactP = $('<p>');
				contactP.text(newContact.firstname + ' ' + newContact.lastname + ' ' + newContact.email);
				$('.list').append(contactP);
	},
			dataType: 'json',
			contentType: 'application/json;charset=8'
		});
		allContacts.push(newContact)
	});


	function all(contact) {
		var contactP = $('<p>');
		$.each(contact, function(key,value) {
			contactP.text(contact.firstname + ' ' + contact.lastname + ' ' + contact.email);
			$('.list').append(contactP);
		});
	}

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
