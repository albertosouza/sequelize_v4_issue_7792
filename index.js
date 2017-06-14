const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.then(()=>{
  const Book = sequelize.define('book', {
    title: Sequelize.STRING
  });

  Book.addHook('afterCreate', 'doSomething', (book, options, cb) => {
    console.log('callback should exists>', cb);
    // ...
  });

  // force: true will drop the table if it already exists
  Book.sync({force: true}).then(() => {
    // Table created
    return Book.create({
      title: 'JS book'
    })
    .then((book)=>{
      console.log('new book with id>', book.id);
    });
  });

})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});