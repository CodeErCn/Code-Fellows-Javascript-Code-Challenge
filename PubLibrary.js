// prototype of Library, and Book

//Display all books on all shelfs
Library.prototype.reportAllBooks = function() {
  var tempString ='';
  for(var i = 0; i < this.shelves.length; i++){
    tempString += "The " + this.shelves[i].name + " shelf has: \n";
    for(var j = 0; j < this.shelves[i].books.length; j++){
      tempString += this.shelves[i].books[j].title + "\n";
    }
    tempString += "\n";
  }
  return tempString;
}

Book.prototype = {
  //function to add a book to shelf 
  enshelf: function(libObjcIn, titleOfBookIn, numOfShelfIn) {
    libObjcIn.shelves[numOfShelfIn].books.push(new Book(titleOfBookIn));
  },
  
  //function to remove book from shelf
  unshelf: function(libObjcIn, titleOfBookIn) {
    for(var i = 0; i < libObjcIn.shelves.length; i++){
      for(var j = 0; j < libObjcIn.shelves[i].books.length; j++){
        if(libObjcIn.shelves[i].books[j].title === titleOfBookIn){
          console.log("Unshelf Book -" + libObjcIn.shelves[i].books[j].title + "- found on shelf -" + libObjcIn.shelves[i].name + "-\n");
          libObjcIn.shelves[i].books.splice(j,1);
        }
      }
    }
  }  
}

// Construct function of Library, Shelf, and Book
function Library() {
  this.shelves = []
}

function Shelf(nameOfShelf) {
  this.books = [],
  this.name = nameOfShelf
}

function Book(nameOfTitle) {
  this.title = nameOfTitle
}

//New Library starts here
var newLib = new Library;

//Add Three Shelves and Three Books to each Shelf
newLib.shelves.push(new Shelf('Super Hero'));
newLib.shelves.push(new Shelf('fiction'));
newLib.shelves.push(new Shelf('Novel'));

newLib.shelves[0].books.push(new Book('Iron Man'));
newLib.shelves[0].books.push(new Book('Captain of America'));
newLib.shelves[0].books.push(new Book('Guardian of Galaxy'));

newLib.shelves[1].books.push(new Book('Star War'));
newLib.shelves[1].books.push(new Book('Lord of Ring'));
newLib.shelves[1].books.push(new Book('The Hunger Game'));

newLib.shelves[2].books.push(new Book('Gone With The Wind'));
newLib.shelves[2].books.push(new Book('The Three Musketeers'));
newLib.shelves[2].books.push(new Book('Old Man and the Sea'));

//console initial library
console.log(newLib.reportAllBooks());

//Demonstrate the Book enshelf method
newLib.shelves[0].books[0].enshelf(newLib,'Thor', 0);

//console library with book enshelfed
console.log(newLib.reportAllBooks());

//Demonstrate the Book unshelf method
newLib.shelves[0].books[0].unshelf(newLib, 'Thor');

//console library with book unshelfed
console.log(newLib.reportAllBooks());