const moment = require("moment");
module.exports=app=>{

    const save=(req,res)=>{
        ////console('Salvou back')
      if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id
         //console(req.body)
        app.db('payment')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const getPayments=(req,res)=>{
        ////console('acesooget taskS')

        const date=req.query.date?req.query.date
        :moment().endOf('day').format('YYYY-MM-DD 23:59:59')
        let d = moment().startOf('day').format('YYYY-MM-DD 00:00:00')
        
        //console('buscarndo despesas');
        //console(d);
        //console(date)

     app.db('payment')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [d, date])
    .orderBy('estimateAt')
    .then(payments => res.json(payments))
    .catch(err=>res.status(400).json(err))
    
    }
    
  
    const updatePayment =(req, res,descr)=>{
        ////console('Update back')
        app.db('payment')
        .where({ id: req.params.id, userId: req.user.id })
        .update(req.body)
        .then(_=>res.status(204).send())
        .catch(err=>res.status(400).json(err))

    }

    const ToggleEditPayments=(req,res)=>{
        ////console ('aqui++')
        app.db('payment')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(received => {
            if (!received) {
                const msg = `Paymente com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg+req.params.id)
            }

            const descr = received 
            
            ////console (descr)
           updatePayment(req, res, descr)
        })
        .catch(err => res.status(402).json(err))//,//console)
    }
    
    const remove=(req,res)=>{
        app.db('payment')
        .where({id: req.params.id, userId:req.user.id})
        .del()
        .then(rowsDeleted=>{
            if(rowsDeleted>0){
                res.status(204).send()
            }else{
                const msg=`Não foi encontrada received com id ${req.params.id}.`
                res.status(400).send(msg)
            }
        })
        .catch(err=> res.status(400).json(err))
    }



    //--------
    

    const getweekMonth=(req,res)=>{
        let d =''
        let ofdayweek=''
        const params=req.query.params
        //console('---------------')
        //console(params)
        if (params==7){
         d =moment().day(0);
         ofdayweek= moment().day(6);

        }else{
       
         d =moment().startOf('month')
         ofdayweek=moment().endOf('month')
        }
        //console(d);
        //console(ofdayweek)
     app.db('payment')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [d, ofdayweek])
    .orderBy('estimateAt')
    .then(Payments => res.json(Payments))
    .catch(err=>res.status(400).json(err))
    //console('mes')
    }

    const filterMovimentDesc=(req,res,next)=>{
        ////console('acesoo')
        if (!req.body.desc.trim()) {
            return res.status(400).send()
               
        }

        
    const nome=req.body.desc
    
     app.db('payment')
   
    .where({userId:req.user.id})
    
    .where('desc', 'like', '%'+`${nome}`+'%')
    .orderBy('estimateAt')
    .then(Payments => res.json(Payments))
    .catch(err=>res.status(400).json(err))
    ////console(d)

      }
    
      const text=(req,res)=>{
          //console('acesso lider')
          
      }
  //filter por data
    const filterMovimentDate=(req,res)=>{
        //console('buscando data')
        const date=req.query.date?req.query.date
        :moment().endOf('day').toDate()

        let din = moment(date).startOf('day').format('YYYY-MM-DD HH:MM:ss')
        let dout = moment(date).endOf('day').format('YYYY-MM-DD HH:MM:ss')
        //console('--data query-----');
       //console('-------------');
        //console('date '+date);
        //console('din '+din);
        //console('dout '+dout);
        //console('-------------');
     app.db('payment')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [din, dout])
    .orderBy('estimateAt')
    .then(received => res.json(received))
    .catch(err=>res.status(400).json(err))
    ////console(d)
    }
   
    
   

  


 

    const updatePaymentsDoneAt =(req, res,doneAt)=>{
        app.db('payment')
        .where({ id: req.params.id, userId: req.user.id })
        .update({ doneAt })
        .then(_=>res.status(204).send())
        .catch(err=>res.status(400).json(err))

    }

    const TogglePayments=(req,res)=>{
          ////console ('aqui++')
          app.db('payment')
          .where({ id: req.params.id, userId: req.user.id })
          .first()
          .then(paymentvar => {
              if (!paymentvar) {
                  const msg = `Pa com id ${req.params.id} não encontrada.`
                  return res.status(400).send(msg+req.params.id)
              }
  
              const doneAt = paymentvar.doneAt ? null : new Date()
              //console (doneAt)
              updatePaymentsDoneAt(req, res, doneAt)
          })
          .catch(err => res.status(402).json(err))//,//console( req.user.id ))
        
    }
    

    const PaymentsSum=(req, res,doneAt)=>{

        let d =''
        let ofdayweek=''
        const params=req.query.params

       
         d =moment().startOf('month')
         ofdayweek=moment().endOf('month')
       
        //console(d);
        //console(ofdayweek)
     app.db('payment')
   
    .where({userId:req.user.id})
    .whereBetween('estimateAt', [d, ofdayweek])
    .whereNull('doneAt')
    .sum({as: 'value'})
    .then(Payments => res.json(Payments))
    .catch(err=>res.status(400).json(err))
    //console('vetor')

    }
   

    
    return{PaymentsSum,getPayments,save,remove,TogglePayments,ToggleEditPayments,filterMovimentDate,filterMovimentDesc,getweekMonth}
}