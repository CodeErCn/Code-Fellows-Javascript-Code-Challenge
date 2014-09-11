/* Make a simple html page that uses jQuery to manage Todos *  
It should have an input field. When the user enters text in the input field, show that input in the page. When an existing item is clicked, it should disappear from the page. In addition to pushing the answer to your Github account, please also setup a http://jsfiddle.net/ with the solution and enter the saved URL here so we can take a look.*/


$('.submit').on('click', function(event)  {
    event.preventDefault();
    var toDo = $(this).closest('fieldset').find('.text').val();
    var newToDo = '<p class ="todo"> ' + toDo + ' </p>';
    console.log(newToDo);
    $('.appendHere').append(newToDo);
})

$('.appendHere').on('click', '.todo', function() {
    $(this).remove();
})