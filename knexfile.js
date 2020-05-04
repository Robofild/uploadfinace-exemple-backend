// Update with your config settings.

if (process.env.NODE_ENV=="production"){

module.exports = {
  
  Host: 'ec2-34-195-169-25.compute-1.amazonaws.com',
    connection: {
      database: 'd7e1t77aff6kui',
      user:     'dswfsvaskvceoz@gmail.com',
      password: 'd59cc863db475c46706e09057a0a33fe5d38981f10660b8ef0d69aed197e227b',
      port:5432
    },
    pool: {
      min: 2,
      max: 10
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