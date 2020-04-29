const moment = require("moment");
module.exports = app => {


    const getMovimentos = (req, res) => {
        ////console('acesooget taskS')

        const date = req.query.date ? req.query.date
            : moment().endOf('day').format('YYYY-MM-DD 23:59:59')
        let d = moment().startOf('day').format('YYYY-MM-DD 00:00:00')

        //console('buscarndo despesas');
        //console(d);
        //console(date)

        app.db('payment')

            .where({ userId: req.user.id })

            .whereBetween('estimateAt', [d, date])
            .orderBy('estimateAt')
            .then(payments => res.json(payments))
            .catch(err => res.status(400).json(err))

    }






    //--------


    const getweekMonthmovimento = (req, res) => {
        let d = ''
        let ofdayweek = ''
        const params = req.query.params
        //console('---------------')
        //console(params)
        if (params == 7) {
            d = moment().day(0);
            ofdayweek = moment().day(6);

        } else {

            d = moment().startOf('month')
            ofdayweek = moment().endOf('month')
        }
        //console(d);
        //console(ofdayweek)
        app.db('payment')

            .where({ userId: req.user.id })
            .whereBetween('estimateAt', [d, ofdayweek])
            .orderBy('estimateAt')
            .then(Payments => res.json(Payments))
            .catch(err => res.status(400).json(err))

    }



    const MovimentoSumP = (req, res, doneAt) => {

        let d = ''
        let ofdayweek = ''
        const params = req.query.params


        d = moment().startOf('month')
        ofdayweek = moment().endOf('month')

        //console(d);
        //console(ofdayweek)
        app.db('payment')
        
  

            .where({ userId: req.user.id })
            .whereBetween('estimateAt', [d, ofdayweek])
            
            .sum({ pagar: 'value' }
            )
            
            .then(Payments => res.json(Payments))
          
            .catch(err => res.status(400).json(err))
        //console('vetor')

    }

    const MovimentoSumR = (req, res, doneAt) => {

        let d = ''
        let ofdayweek = ''
        const params = req.query.params


        d = moment().startOf('month')
        ofdayweek = moment().endOf('month')

        //console(d);
        //console(ofdayweek)
        app.db('received')
        
  

            .where({ userId: req.user.id })
            .whereBetween('estimateAt', [d, ofdayweek])
            
            .sum({ receber: 'value' }
            )
            
            .then(Receiver => res.json(Receiver))
          
            .catch(err => res.status(400).json(err))
        //console('vetor')

    }



    return { getMovimentos,MovimentoSumR,MovimentoSumP, getweekMonthmovimento}
}