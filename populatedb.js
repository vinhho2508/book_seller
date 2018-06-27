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
	},
	function(callback) {
		authorCreate('Viktor', 'Frankl', 'http://www.beacon.org/Assets/ContributorImages/1657.jpg', '1905-3-26', '1997-9-2', callback);
	},
	function(callback) {
		authorCreate('SuSan', 'Cain', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/SusanCainPortrait_250px_20120305.jpg/220px-SusanCainPortrait_250px_20120305.jpg', '1968-5-1', false, callback);
	},
	function(callback) {
		authorCreate('Nassim', 'Nicholas Taleb', 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Taleb_mug.JPG', '1960', false, callback);
	},
	function(callback) {
		authorCreate('Baird', 'Thomas Spalding', 'http://static.komo.vn/files/thumbnail/210/250/210x250-spalding-b.jpg', '1872-10-3', '1953-3-18', callback);
	},
	function(callback) {
		authorCreate('Dan', 'Ariely', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dan_Ariely_-_PopTech_2010_-_Camden%2C_Maine.jpg/220px-Dan_Ariely_-_PopTech_2010_-_Camden%2C_Maine.jpg', '1967-4-29', false, callback);
	},
	function(callback) {
		authorCreate('Paulo ', 'Coelho', 'http://www.gstatic.com/tv/thumb/persons/686748/686748_v9_ba.jpg', '1947-8-24', false, callback);
	},
	function(callback) {
		authorCreate('George', 'Samuel Clason', 'https://images.gr-assets.com/authors/1453455124p5/688.jpg', '1874-11-7', '1957-4-7', callback);
	},
	function(callback) {
		authorCreate('Khaled ', 'Hosseini', 'https://images.gr-assets.com/authors/1359753468p5/569.jpg', '1965-3-4', false, callback);
	},
	function(callback) {
		authorCreate('Che', 'Guevara', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/CheHigh.jpg/800px-CheHigh.jpg', '1928-6-14', '1967-10-9', callback);
	},

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
		function(callback){
			genreCreate("Psychology", callback);
        },
		function(callback){
			genreCreate("Nonfiction", callback);
        },
		function(callback){
			genreCreate("Western Novel", callback);
        },
		function(callback){
			genreCreate("Behavioral Finance", callback);
        },
		function(callback){
			genreCreate("Novel", callback);
        },
		function(callback){
			genreCreate("Self help", callback);
        },
		function(callback){
			genreCreate("Historical fiction", callback);
        },
		function(callback){
			genreCreate("Memoir", callback);
        },
        ],
        // optional callback
        cb);
}


function createBooks(cb) {
    async.parallel([
        function(callback) {
          bookCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0],'https://images-na.ssl-images-amazon.com/images/I/51JThzjy3gL._SX306_BO1,204,203,200_.jpg', [genres[0],],5,135, callback);
        },
        function(callback) {
          bookCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0],'https://images-na.ssl-images-amazon.com/images/I/81NX-69L22L.jpg', [genres[0],],7,85, callback);
        },
        function(callback) {
          bookCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0],'https://images.gr-assets.com/books/1398466695l/21535271.jpg', [genres[0],],10,75, callback);
        },
        function(callback) {
          bookCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1],'https://images-na.ssl-images-amazon.com/images/I/51aZWuK229L._SX331_BO1,204,203,200_.jpg', [genres[1],],40,150, callback);
        },
        function(callback) {
          bookCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1],'https://images.macmillan.com/folio-assets/macmillan_us_frontbookcovers_109W/9780765379511.JPG', [genres[1],],30,60, callback);
        },
        function(callback) {
          bookCreate('The Godfather', "It's the day of Don Vito Corelones daughter's wedding. And like any good mob boss, he's spending his time receiving guests who are requesting favors from him. Outside, the wedding is in full swing, and we meet a bunch of different characters, including the Don's sons, Michael and Sonny. ", '9780765378972', authors[5],'https://vnwriter.net/wp-content/uploads/2016/11/sach-bo-gia.gif', [genres[8]],15,81, callback);
        },
        function(callback) {
          bookCreate('A Brief History Of Time', "We live our daily lives with almost no understanding of the world around us. We also rarely contemplate the mechanism that produces sunlight - an important factor contributing to life, to gravity - the glue that binds us to Earth, if different from them. We will rotate and drift into outer space, the atoms that make up all of us and we are completely dependent on their sustainability. With the exception of children (because they know too little to hesitate to ask important questions), few of us take the time to wonder why nature is like this, Where does the universe come from, or is it forever like this, is there going to be a time when the time will come back, the consequences are before the cause or not; Is there a final limit to human understanding?", '9780765378933', authors[6],'https://vnwriter.net/wp-content/uploads/2017/10/sach-luoc-su-thoi-gian.gif', [genres[9],],15,210, callback);
        },
		function(callback) {
          bookCreate("Man's Search For Meaning", "This is a book about survival. Like many of the Jews living in Germany and Eastern Europe, who thought they were safe in the 1930s, Frankl spent a lot of time in the concentration camps and German camps of extermination. the Nazis. The miracle that he survived, the phrase 'steel that I was' can accurately portray this case. But in Finding a way to live, the author makes little mention of the hardships, traumas, and losses he has experienced, and instead he writes about the sources of power that helped him survive. He bitterly talked about prisoners who surrendered their lives, lost hope in the future, and must have been the first to die. Few people die from lack of food and medicine, but most of them die of lack of hope, lack of life.", '9780765331892', authors[7],'https://vnwriter.net/wp-content/uploads/2017/10/sach-di-tim-le-song.jpg', [genres[10],],40,51, callback);
        },
		function(callback) {
          bookCreate("Quiet", "Almost all painters, writers, sculptors, engineers, composers and inventors are introverted. Introverts often enjoy spending time alone or together with a small number of friends rather than large groups. The truth is, when you have a big problem or an important one that needs maximum confidence, an intro is the right choice for those things. They usually focus on a single activity at a time and prefer to observe the situation before engaging, they have imagination rich and often have a lot of analysis before speaking. Introverts can easily be overwhelmed by stimulation from social gatherings or social gatherings that involve too many people.", '97807651897203', authors[8],'https://vnwriter.net/wp-content/uploads/2017/01/sach-quiet.jpg', [genres[10],],40,45, callback);
        },
		function(callback) {
          bookCreate("The Black Swan", "Why do not we notice the 'black swan' phenomenon until after they happen? According to Taleb, in part because we humans tie ourselves to the details, we should focus on the general. We focus on what we know from time to time to ignore things we do not know. Therefore, we can not evaluate opportunities, can not resist the tendency to simplify, narrate and classify, and are not sufficiently generous to reward those who can imagine 'things can not'. Delicate, overwhelming and amazing, the Black Swan will change your outlook on the world. Taleb is actually the author of the book, with witty, extravagant and unusual stories. He is a master of knowledge in many fields, from cognitive science, business to probability theory. Black Swan is a landmark book - it is a 'black swan' itself.", '97807651888803', authors[9],'https://vnwriter.net/wp-content/uploads/2016/12/sach-thien-nga-den.jpg', [genres[11],],11,150, callback);
        },
		function(callback) {
          bookCreate("Life And Teaching Of The Masters Of The Far East", "The Journey to the East tells the experiences of a group of leading experts from the Royal Society of British Science who are sent to India to study the mystics and supernatural abilities of man. For two years, traveling through Indian temples and temples, they saw many laws, superstitions, even scams ... of many magi, Taoists ... they were exposed to their positions, they were Experience, deep understanding of the ancient and esoteric sciences of Indian culture such as yoga, meditation, contemplation, karmic retribution, the law of cause and effect, life and death.", '97807651987555', authors[10],'https://vnwriter.net/wp-content/uploads/2017/10/sach-hanh-trinh-ve-phuong-dong-689x1024.jpg', [genres[12],],30,94, callback);
        },
		function(callback) {
          bookCreate("Predictably Irrational", "You are ready to withdraw 2 thousand for a poor beggar on the road. But you yourself also embankment 2 thousand silver with her crush when selling old newspapers in the house.You are willing to spend $ 10 million to take beautiful wedding photos that only look a few times and then put in the closet. But you will certainly consider and consider carefully when deciding to buy a camera for $ 10 million while you can use it for many years.", '97807651330367', authors[11],'https://vnwriter.net/wp-content/uploads/2016/11/sach-phi-ly-tri.png', [genres[13],],50,114, callback);
        },
		function(callback) {
          bookCreate("The Alchemist", "Paulo Coelho's alchemist novel is a simple, compassionate and poetic fairy tale infused with the mystical wisdom of the East. In its first publication in Brazil in 1988, the book sold only 900 copies. But, with the special fate of the book for all humanity, beyond the national borders, the Alchemyst has shaken millions of souls, becoming one of the best-selling books of all time, and can change the reader's life.", '97807651654412', authors[12],'https://vnwriter.net/wp-content/uploads/2016/09/sach-nha-gia-kim-639x1024.jpg', [genres[14],],50,52, callback);
        },
		function(callback) {
          bookCreate("The Richest Man In Babylon", "When it comes to money, we often refer to the law of gravity and it is always universal and invariable in every case. Over time and developed, this rule has been experimented and extracted into the secret not only to ensure you a bag full, but also help you have a balanced life to be able to grow. Better than your potential in other areas of your life. In fact, no one can deny that material abundance can make a person's life better. Particularly in the field of business, financial strength is the primary means of measuring entrepreneurial achievement.", '97807651995511', authors[13],'https://vcdn.tikicdn.com/cache/550x550/media/catalog/product/i/m/img081_9_1.jpg', [genres[15],],50,46, callback);
        },
		function(callback) {
          bookCreate("The Kite Runner", "The story is the autobiography of the american-american american writer about the happy childhood years as well as the mistakes, the days of drifting on the land and the journey back to the ruined homeland to redeem for myself and my dead father. According to Amir's recollections, the reader returned more than twenty years ago, when Amir was a twelve-year-old boy in Baba's rich and well-guarded arms. Embracing Amir throughout his childhood was Hassan, the son of the housekeeper Ali, a nimble, strong boy who broke up several times to protect Amir. But Hassan's friendship and devotion were unremarkable. On a winter's day in 1975, Hassan, in an attempt to protect Amir's green kite, was assaulted and humiliated by the children.", '9780765115512', authors[14],'https://upload.wikimedia.org/wikipedia/en/6/62/Kite_runner.jpg', [genres[16],],10,46, callback);
        },
		function(callback) {
          bookCreate("The Motorcycle Diaries", "A memoir that traces the early travels of Marxist revolutionary Ernesto 'Che' Guevara, then a 23-year-old medical student, and his friend Alberto Granado, a 29-year-old biochemist. Leaving Buenos Aires, Argentina, in January 1952 on the back of a sputtering single cylinder 1939 Norton 500cc dubbed La Poderosa ("The Mighty One"), they desired to explore the South America they only knew from books.[1] During the formative odyssey Guevara is transformed by witnessing the social injustices of exploited mine workers, persecuted communists, ostracized lepers, and the tattered descendants of a once-great Inca civilization. By journey's end, they had travelled for a symbolic nine months by motorcycle, steamship, raft, horse, bus, and hitchhiking, covering more than 8,000 kilometres (5,000 mi) across places such as the Andes, Atacama Desert, and the Amazon River Basin. The diary ends with a declaration by Guevara, born into an upper-middle-class family, displaying his willingness to fight and die for the cause of the poor, and his dream of seeing a united Latin America.", '9780765369874', authors[15],'https://upload.wikimedia.org/wikipedia/en/e/e0/Motobook7.jpg', [genres[17],],5,70, callback);
        },
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




