(function() {

//Models, collections, and Views
window.App = {

    Models: {},
    Collections: {},
    Views: {}

};

//Creates a template for the window
window.template = function(id) {
    return _.template( $('#' + id).html() );
};


//Creates a CONTACT Backbone model with a defaults properties
App.Models.Contact = Backbone.Model.extend({
    
    defaults: {
        firstName: '',
        lastName: '',
        email: ''
    }

});

//Creates a CONTACTS Backbone Collection of Model of CONTACT
App.Collections.Contacts = Backbone.Collection.extend({
    
    model: App.Models.Contact

});

//Creates a CONTACT Backbone View for a single Model
App.Views.Contact = Backbone.View.extend({
    
    //set html tag for the View
    tagName: 'li',

    //template by script tag on index.html
    template: template('indexTemplate'),   

    //initialize the listeners to Model change/remove 
    initialize: function(){

        this.model.on('change', this.render, this);
        this.model.on('destroy', this.remove, this);
    
    },

    //event listeners for the edit buttons and delete
    events: {
         //listens for click of edit on first name, last name, email, and delete
         'click #editFirstName' : 'editFirstName',
         'click #editLastName' : 'editLastName',
         'click #editEmail' : 'editEmail',
         'click #destroy' : 'DestroyContact'      
    },

    //edit functions trigger by the events listeners
    editFirstName: function(){

        //prompt user for new first name and assign to Model
        var newFirstName = prompt("Please enter the new first name", this.model.get('firstName'));
        
        //input validate
        this.inputValidation('firstName', newFirstName);
    
    },
    
    editLastName: function(){

        //prompt user for new last name and assign to Model
        var newLastName = prompt("Please enter the new last name", this.model.get('lastName'));
        
        //input Validate 
        this.inputValidation('lastName', newLastName);        
              
    },

    editEmail: function(){
        
        //prompt user for new email and assign to Model
        var newEmail = prompt("Please enter the new email", this.model.get('email'));
        
         //input Validate 
        this.inputValidation('email', newEmail); 
    
    },

    DestroyContact: function(){
        
        this.model.destroy();
    
    },

    //Remove element from the DOM by listen to Destroy event on Model
    remove: function(){
        
        this.$el.remove();
    
    },

    //render the view to element
    render: function() {
        
        this.$el.html(this.template(this.model.toJSON()) );
        
        return this;
    
    },

    //for input validation
    inputValidation: function (model, userInput) {

       if(!userInput || userInput === null) {

            alert('Sorry we did not get your input! Please try again!');
        
        }else{

        this.model.set(model, userInput);
        
        }
    }
});

//adds a new contact from the DOM
App.Views.AddContact = Backbone.View.extend({
    
    //element tag from the DOM id: addContact
    el: '#addContact',

    //event listener for click of submit 
    events: {
        
        'submit': 'submit'
    
    },

    //submit function that is called on click
    submit: function(e) {

        e.preventDefault();

        //var email validation by using regular expression
        var testEmail = new RegExp('@');
        //console.log(testEmail);
        //console.log(typeof(testEmail));

        //gets the first name, last name, and email from html input field
        var newContactFirstName = $(e.currentTarget).find('input[class=firstName]').val();
        var newContactLastName = $(e.currentTarget).find('input[class=lastName]').val();
        var newContactEmail = $(e.currentTarget).find('input[class=email]').val();

        console.log(testEmail.test(newContactEmail));

        //input validate for adding new contact
        if(!newContactFirstName || !newContactLastName || ! newContactEmail) {

            alert("Sorry! * sections are required to submit");

        } 
        else if (testEmail.test(newContactEmail)) {

            //assigns the new values to the new contact model
            var contact = new App.Models.Contact({ firstName: newContactFirstName, lastName: newContactLastName, email: newContactEmail });
            
            //adds this new contact to the list of contacts to be displayed
            this.collection.add(contact);
            
        } 
        else {

            alert("Sorry! Invalid email address input");

        }
    }
});


//Creates a CONTACTS Backbone View to display Collection of CONTACT
App.Views.Contacts = Backbone.View.extend({
    
    //html line tag
    tagName: 'p',

    //initializes listener when add new model to collection then call addContact function
    initialize: function() {
        
        this.collection.on('add', this.addContact, this);
    
    },

    //render the each model with addContact function to create new element
    render: function() {
        
        this.collection.each(this.addContact, this);

        return this;
    
    },

    //When the add triggers then this function is called
    addContact: function(contact) {
        
        var contactView = new App.Views.Contact({ model: contact });
        
        this.$el.append(contactView.render().el);
    
    }

});



var contactsCollection = new App.Collections.Contacts([]);
var addContactView = new App.Views.AddContact({ collection: contactsCollection });
var contactsView = new App.Views.Contacts({ collection: contactsCollection });

//appent to html
$(document.body).append(contactsView.render().el);
})();