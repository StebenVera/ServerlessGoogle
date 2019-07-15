import * as admin from 'firebase-admin'




export class Routes {

    public app: any;
    public db :any;

    constructor(app){
        this.app = app;
        this.db = admin.firestore()
    }

    appRoutes(){
        // Warmup endpoint
        this.app.get('/warmup',  (request, response) => {

            response.send('Calentando para la pelea');

        });

        //Create figth endpoint
        this.app.post('/fights', async(request,response)=>{
            try{
                const {winner,loser,title} = request.body;

                const data = {
                    winner,
                    loser,
                    title
                }

                const figthRef = await this.db.collection('fights').add(data)
                const fight = await figthRef.get()

                response.json({
                    id: figthRef.id,
                    data: fight.data()
                }) 
            }catch(error){
                response.status(500).send(error)
            }
        })
           //get figth Id
        this.app.get('/fights/:id',async(request,response)=>{
            try{
                const figthId = request.params.id
                if(!figthId)throw new Error('El id es requerido')
                const fight = await this.db.collection('fights').doc(figthId).get()
                if(!fight.exists){
                    throw new Error('El id que envio no existe')
                }

                response.json({
                    id:figthId,
                    data: fight.data()
                })
            }catch(error){
                response.status(500).send(error)
            }
        })

        //get all figths

        this.app.get('/fights',async(request,response)=>{
            try{
                const fightQuery:any =  ​await​ ​this​.​db​.​collection​(​'fights'​).​get​(); 
                const fights:any[]=[]

                fightQuery.forEach(
                    (doc)=>{
                        fights.push({
                            id:doc.id,
                            data:doc.data()
                          })
                    }
                )


                response.json(fights)

            }catch(error){
                response.status(500).send(error.toString())
            }
        })
    }

 
}
