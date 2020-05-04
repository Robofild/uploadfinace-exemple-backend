// Update with your config settings.

if (process.env.NODE_ENV=="production"){

module.exports = {
  
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    
    migrations: {
      directory:__dirname+'/migrations',
      tableName: 'knex_migrations'
    }
  

};
}else{
  module.exports = {
  
    client: 'postgresql',
    connection: {
      database: 'tasks',
      user:     'postgres',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };

}