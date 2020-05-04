module.exports = app => {

     app.post('/signup', app.api.user.save)
     app.post('/signin', app.api.auth.signin)
     
     app.route('/')
     .get(app.api.testecomunicacao.Teste)

  
     

     app.route('/totaldisponivel')
          .all(app.config.passport.authenticate())
          .get(app.api.gerente.MovimentoSumR)
          .post(app.api.gerente.MovimentoSumP)
          

     app.route('/somaRec')
          .all(app.config.passport.authenticate())
          .get(app.api.task.CountTask)


     app.route('/moviment')
          .all(app.config.passport.authenticate())
          .get(app.api.task.filterMovimentDate)
          .post(app.api.task.filterMovimentDesc)
     app.route('/weekMonth')
          .all(app.config.passport.authenticate())
          .get(app.api.task.getweekMonth)
     //.post(app.api.task.save)
     app.route('/tasks')
          .all(app.config.passport.authenticate())
          .get(app.api.task.getTasks)
          .post(app.api.task.save)
     app.route('/tasks/:id')
          .all(app.config.passport.authenticate())
          .delete(app.api.task.remove)
          .put(app.api.task.ToggleEditTask)
     app.route('/tasks/:id/toggle')
          .all(app.config.passport.authenticate())
          .put(app.api.task.ToggleTask)

     //-----------------------receber
     app.route('/gestaoRec')
          .all(app.config.passport.authenticate())
          .get(app.api.received.receivedSUm)
          .post(app.api.received.filterMovimentDesc)
     app.route('/movimentrec')
          .all(app.config.passport.authenticate())
          .get(app.api.received.filterMovimentDate)
          .post(app.api.received.filterMovimentDesc)
     app.route('/weekMonthrec')
          .all(app.config.passport.authenticate())
          .get(app.api.received.getweekMonth)
     //.post(app.api.received.save)
     app.route('/receivedsrec')
          .all(app.config.passport.authenticate())
          .get(app.api.received.getreceiveds)
          .post(app.api.received.save)
     app.route('/receivedsrec/:id')
          .all(app.config.passport.authenticate())
          .delete(app.api.received.remove)
          .put(app.api.received.ToggleEditreceived)
     app.route('/receivedsrec/:id/toggle')
          .all(app.config.passport.authenticate())
          .put(app.api.received.Togglereceived)

     //-----------------------pagar
    

     app.route('/gestaopay')
          .all(app.config.passport.authenticate())
          .get(app.api.payments.PaymentsSum)
          .post(app.api.payments.filterMovimentDesc)
     app.route('/movimentpay')
          .all(app.config.passport.authenticate())
          .get(app.api.payments.filterMovimentDate)
          .post(app.api.payments.filterMovimentDesc)
     app.route('/weekMonthpay')
          .all(app.config.passport.authenticate())
          .get(app.api.payments.getweekMonth)
     //.post(app.api.payments.save)
     app.route('/payments')
          .all(app.config.passport.authenticate())
          .get(app.api.payments.getPayments)
          .post(app.api.payments.save)
     app.route('/paymentspay/:id')
          .all(app.config.passport.authenticate())
          .delete(app.api.payments.remove)
          .put(app.api.payments.ToggleEditPayments)
     app.route('/paymentsspay/:id/toggle')
          .all(app.config.passport.authenticate())
          .put(app.api.payments.TogglePayments)

}