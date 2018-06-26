#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}*/

var async = require('async')
var Book = require('./models/book')
var Author = require('./models/author')
var Genre = require('./models/genre')
//var User=require('./models/user');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect('mongodb://localhost:27017/book_sell');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var genres = []
var books = []

//var user=[]

function authorCreate(first_name, family_name,pic, d_birth, d_death, cb) {
  authordetail = {first_name:first_name , family_name: family_name,picture:pic }
  
  if (d_birth != false) authordetail.date_of_birth = d_birth
  if (d_death != false) authordetail.date_of_death = d_death
  
  var author = new Author(authordetail);
       
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}
/*function userCreate(name,password,type, cb) {
  var user = new User({ name: name ,password:password,type:type});
       
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User: ' + user);
    genres.push(user)
    cb(null, user);
  }   );
}*/

function bookCreate(title, summary, isbn, author,pic, genre,amount,price, cb) {
  bookdetail = { 
    title: title,
    summary: summary,
    author: author,
    isbn: isbn,
    picture:pic,
    amount:amount,
    price:price
  }
  if (genre != false) bookdetail.genre = genre
    
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book)
    cb(null, book)
  }  );
}



/*function createUsers(cb){
  async.parallel([
    function(callback){
      userCreate('admin','admin',1,callback);
    },
    function(callback){
      userCreate('vinhho','vinhho',0,callback);
    },
    function(callback){
      userCreate('phuvinh','phuvinh',0,callback);
    },
  ],cb)
}*/
function createGenreAuthors(cb) {
    async.parallel([
        function(callback) {
          authorCreate('Patrick', 'Rothfuss','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Patrick-rothfuss-2014-kyle-cassidy.jpg/250px-Patrick-rothfuss-2014-kyle-cassidy.jpg', '1973-06-06', false, callback);
        },
        function(callback) {
          authorCreate('Ben', 'Bova','https://images.gr-assets.com/authors/1230227407p5/12407.jpg', '1932-11-8', false, callback);
        },
        function(callback) {
          authorCreate('Isaac', 'Asimov','https://upload.wikimedia.org/wikipedia/commons/3/34/Isaac.Asimov01.jpg', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
          authorCreate('Bob', 'Billings','https://cache.legacy.net/legacy/images/cobrands/fortmorgantimes/photos/pmm_448577_04302017_20170430.jpgx?w=130&h=180&v=0x000000004d3a7995&option=1', false, false, callback);
        },
        function(callback) {
          authorCreate('Jim', 'Jones','https://www.biography.com/.image/t_share/MTIwNjA4NjM0MDc0MjY5MTk2/jim-jones-10367607-1-402.jpg', '1971-12-16', false, callback);
        },
		function(callback) {
          authorCreate('Mario', 'Puzo','https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Mario_Puzo.jpg/220px-Mario_Puzo.jpg', '1920-10-15', '1999-7-2', callback);
        },
		function(callback) {
			authorCreate('Stephen', 'Hawking', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Stephen_Hawking.StarChild.jpg/200px-Stephen_Hawking.StarChild.jpg', '1942-1-8', '2018-3-14', callback);
		}

        function(callback) {
          genreCreate("Fantasy", callback);
        },
        function(callback) {
          genreCreate("Science Fiction", callback);
        },
        function(callback) {
          genreCreate("History", callback);
        },
        function(callback){
          genreCreate("Travel",callback);
        },
        function(callback) {
          genreCreate("Math", callback);
        },
        function(callback) {
          genreCreate("Arts", callback);
        },
        function(callback) {
          genreCreate("Romance", callback);
        },
        function(callback) {
          genreCreate("Dictionary", callback);
        },
		function(callback) {
          genreCreate("Criminal hypothesis", callback);
        },
		function(callback){
			genreCreate("Cosmography", callback);
        },
        ],
        // optional callback
        cb);
}


function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0],'./pics/Harry1.jpg', [genres[0],],5,135, callback);
        },
        function(callback) {
          bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0],'./pics/Harry1.jpg', [genres[0],],7,85, callback);
        },
        function(callback) {
          bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0],'./pics/Harry1.jpg', [genres[0],],10,75, callback);
        },
        function(callback) {
          bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1],'./pics/Harry1.jpg', [genres[1],],40,150, callback);
        },
        function(callback) {
          bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1],'./pics/Harry1.jpg', [genres[1],],30,60, callback);
        },
        function(callback) {
          bookCreate('The Godfather', "It's the day of Don Vito Corelones daughter's wedding. And like any good mob boss, he's spending his time receiving guests who are requesting favors from him. Outside, the wedding is in full swing, and we meet a bunch of different characters, including the Don's sons, Michael and Sonny. ", '9780765378972', authors[5],'./pics/Harry1.jpg', [genres[8]],15,81, callback);
        },
        function(callback) {
          bookCreate('A Brief History Of Time', "We live our daily lives with almost no understanding of the world around us. We also rarely contemplate the mechanism that produces sunlight - an important factor contributing to life, to gravity - the glue that binds us to Earth, if different from them. We will rotate and drift into outer space, the atoms that make up all of us and we are completely dependent on their sustainability. With the exception of children (because they know too little to hesitate to ask important questions), few of us take the time to wonder why nature is like this, Where does the universe come from, or is it forever like this, is there going to be a time when the time will come back, the consequences are before the cause or not; Is there a final limit to human understanding?", '9780765378933', authors[6],'./pics/Harry1.jpg', [genres[9],],150,210, callback);
        }
        ],
        // optional callback
        cb);
}






async.series([
  createGenreAuthors,
  createBooks
],
// Optional callback
function(err, results) {
  if (err) {
      console.log('FINAL ERR: '+err);
  }
  else {
      console.log('BOOK');
      
  }
  // All done, disconnect from database
  mongoose.connection.close();
});




