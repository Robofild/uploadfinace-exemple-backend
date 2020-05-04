// Update with your config settings.

if (process.env.NODE_ENV=="production"){

module.exports = {
  
    client: 'postgresql',
    connection: {
      database: 'd1c23af0s7kd3h',
      user:     'suporterobofild@gmail.com',
      password: 'joaomiguel_21H',
      port:5432
    },
    pool: {
      min: 2,
      max: 100
    },
    migrations: {
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