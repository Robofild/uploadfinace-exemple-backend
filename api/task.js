const moment = require("moment");
module.exports=app=>{

    const getweekMonth=(req,res)=>{
        let d =''
        let ofdayweek=''
        const params=req.query.params
       // console.log('---------------')
        //console.log(params)
        if (params==7){
         d =moment().day(0);
         ofdayweek= moment().day(6);

        }else{
       
         d =moment().startOf('month')
         ofdayweek=moment().endOf('month')
        }
        //console.log(d);
        //console.log(ofdayweek)
     app.db('tasks')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [d, ofdayweek])
    .orderBy('estimateAt')
    .then(tasks => res.json(tasks))
    .catch(err=>res.status(400).json(err))
   // console.log(d)
    }

    const filterMovimentDesc=(req,res,next)=>{
        //console.log('acesoo')
        if (!req.body.desc.trim()) {
            return res.status(400).send()
               
        }

        
    const nome=req.body.desc
    
     app.db('tasks')
   
    .where({userId:req.user.id})
    
    .where('desc', 'like', '%'+`${nome}`+'%')
    .orderBy('estimateAt')
    .then(tasks => res.json(tasks))
    .catch(err=>res.status(400).json(err))
    //console.log(d)

      }
    
      const text=(req,res)=>{
          console.log('acesso lider')
          
      }
  //filter por data
    const filterMovimentDate=(req,res)=>{
        console.log('buscando data')
        const date=req.query.date?req.query.date
        :moment().endOf('day').toDate()

        let din = moment(date).startOf('day').format('YYYY-MM-DD 00:00:00')
        let dout = moment(date).endOf('day').format('YYYY-MM-DD 23:59:59')
        //console.log('--data query-----');
      // console.log('-------------');
      //  console.log('date '+date);
        console.log('din '+din);
       console.log('dout '+dout);
      //  console.log('-------------');
     app.db('tasks')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [din, dout])
    .orderBy('estimateAt')
    .then(tasks => res.json(tasks))
    .catch(err=>res.status(400).json(err))
    //console.log(d)
    }
   
    
    const getTasks=(req,res)=>{
        //console.log('acesooget taskS')

        const date=req.query.date?req.query.date
        :moment().endOf('day').format('YYYY-MM-DD 23:59:59')
        let d = moment().startOf('day').format('YYYY-MM-DD 00:00:00')
        console.log(d);
        console.log(date)
     app.db('tasks')
   
    .where({userId:req.user.id})
    
    .whereBetween('estimateAt', [d, date])
    .orderBy('estimateAt')
    .then(tasks => res.json(tasks))
    .catch(err=>res.status(400).json(err))
    
    }

    const save=(req,res)=>{
        //console.log('Salvou back')
      if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo obrigatório')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    
    const remove=(req,res)=>{
        app.db('tasks')
        .where({id: req.params.id, userId:req.user.id})
        .del()
        .then(rowsDeleted=>{
            if(rowsDeleted>0){
                res.status(204).send()
            }else{
                const msg=`Não foi encontrada task com id ${req.params.id}.`
                res.status(400).send(msg)
            }
        })
        .catch(err=> res.status(400).json(err))
    }

    const updateTaskDoneAt =(req, res,doneAt)=>{
        app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .update({ doneAt })
        .then(_=>res.status(204).send())
        .catch(err=>res.status(400).json(err))

    }

    const ToggleTask=(req,res)=>{
        //console.log ('aqui++')
        app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(task => {
            if (!task) {
                const msg = `Task com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg+req.params.id)
            }

            const doneAt = task.doneAt ? null : new Date()
            console.log (doneAt)
            updateTaskDoneAt(req, res, doneAt)
        })
        .catch(err => res.status(402).json(err),console.log( req.user.id ))
    }
    
    const updateTask =(req, res,descr)=>{
        //console.log('Update back')
        app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .update(req.body)
        .then(_=>res.status(204).send())
        .catch(err=>res.status(400).json(err))

    }

    const ToggleEditTask=(req,res)=>{
        //console.log ('aqui++')
        app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(task => {
            if (!task) {
                const msg = `Task com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg+req.params.id)
            }

            const descr = task 
            
            //console.log (descr)
           updateTask(req, res, descr)
        })
        .catch(err => res.status(402).json(err),console.log( req.user.id ))
    }


    const CountTask=(req, res,doneAt)=>{

        let d =''
        let ofdayweek=''
        const params=req.query.params

       
         d =moment().startOf('month')
         ofdayweek=moment().endOf('month')
       
        console.log(d);
        console.log(ofdayweek)
     app.db('tasks')
   
    .where({userId:req.user.id})
    .whereBetween('estimateAt', [d, ofdayweek])
    .whereNull('doneAt')
    .count('id', {as: 'conta'})
    .then(receiveds => res.json(receiveds))
    .catch(err=>res.status(400).json(err))
   

    }

    return{CountTask,getTasks,save,remove,ToggleTask,ToggleEditTask,filterMovimentDate,filterMovimentDesc,getweekMonth}
}