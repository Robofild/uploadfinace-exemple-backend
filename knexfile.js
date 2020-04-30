// Update with your config settings.

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
