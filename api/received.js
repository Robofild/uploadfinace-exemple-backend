const moment = require("moment");
module.exports=app=>{

    const save=(req,res)=>{
        ////console('Salvou back')
      if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id
         //console(req.body)
        app.db('received')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const getreceiveds=(req,res)=>{
        ////console('acesooget taskS')

        const date=req.query.date?req.query.date
        :moment().endOf('day').format('YYYY-MM-DD 23:59:59')
        let d = moment().startOf('day').format('YYYY-MM-DD 00:00:00')
        
        //console('buscarndo receitas');
        //console(d);
        //console(date)

     app.db('received')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [d, date])
    .orderBy('estimateAt')
    .then(receiveds => res.json(receiveds))
    .catch(err=>res.status(400).json(err))
    
    }
    
  
    const updateReceived =(req, res,descr)=>{
        ////console('Update back')
        app.db('received')
        .where({ id: req.params.id, userId: req.user.id })
        .update(req.body)
        .then(_=>res.status(204).send())
        .catch(err=>res.status(400).json(err))

    }

    const ToggleEditreceived=(req,res)=>{
        ////console ('aqui++')
        app.db('received')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(received => {
            if (!received) {
                const msg = `received com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg+req.params.id)
            }
            

            const descr = received 
            
            ////console (descr)
           updateReceived(req, res, descr)
        })
        .catch(err => res.status(402).json(err))//console( req.user.id ))
    }
    
    const remove=(req,res)=>{
        app.db('received')
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
     app.db('received')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [d, ofdayweek])
    .orderBy('estimateAt')
    .then(receiveds => res.json(receiveds))
    .catch(err=>res.status(400).json(err))
    //console(d)
    }

    const filterMovimentDesc=(req,res,next)=>{
        ////console('acesoo')
        if (!req.body.desc.trim()) {
            return res.status(400).send()
               
        }

        
    const nome=req.body.desc
    
     app.db('received')
   
    .where({userId:req.user.id})
    
    .where('desc', 'like', '%'+`${nome}`+'%')
    .orderBy('estimateAt')
    .then(receiveds => res.json(receiveds))
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
     app.db('received')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [din, dout])
    .orderBy('estimateAt')
    .then(received => res.json(received))
    .catch(err=>res.status(400).json(err))
    ////console(d)
    }
   
    
   

  


 

    const updatereceivedDoneAt =(req, res,doneAt)=>{
        app.db('received')
        .where({ id: req.params.id, userId: req.user.id })
        .update({ doneAt })
        .then(_=>res.status(204).send())
        .catch(err=>res.status(400).json(err))

    }

    const Togglereceived=(req,res)=>{
        ////console ('aqui++')
        app.db('received')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(received => {
            if (!received) {
                const msg = `received com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg+req.params.id)
            }

            const doneAt = received.doneAt ? null : new Date()
            //console (doneAt)
            updatereceivedDoneAt(req, res, doneAt)
        })
        .catch(err => res.status(402).json(err))//,//console( req.user.id ))
    }
    

    const receivedSUm=(req, res,doneAt)=>{

        let d =''
        let ofdayweek=''
        const params=req.query.params

       
         d =moment().startOf('month')
         ofdayweek=moment().endOf('month')
       
        //console(d);
        //console(ofdayweek)
     app.db('received')
   
    .where({userId:req.user.id})
    .whereBetween('estimateAt', [d, ofdayweek])
    .whereNull('doneAt')
    .sum('value')
    .then(receiveds => res.json(receiveds))
    .catch(err=>res.status(400).json(err))
    //console('vetor')

    }
   

    
    return{receivedSUm,getreceiveds,save,remove,Togglereceived,ToggleEditreceived,filterMovimentDate,filterMovimentDesc,getweekMonth}
}