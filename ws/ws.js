import api from "../models/tinkoff-api";

class websocketController{
    constructor(wss) {
        this.websocketServerHandler(wss);
        this.connectionsList = [];
        this.subscribesOnCandles = {};
    }

    websocketServerHandler = (wss) => {
        wss.on('connection', (ws) => {
            //add ws connection to connectionsList array
            this.connectionsList.push(ws);
            ws.on('message', (message) => {
                try{
                    message = JSON.parse(message);
                    this.actions[message.action]({ws, ...message})
                }catch (e){
                    console.log(e);
                    ws.send(JSON.stringify({error: "Invalid action", details: e}));
                }
            })
            ws.on('close', () => {
                //when close remove ws connection from connectionsList array
                this.connectionsList.splice(this.connectionsList.indexOf(ws));
            })
        });
    }

    actions = {
        subscribeOnCandles: async ({ws, figi}) => {
            ws.send(JSON.stringify('Try to subscribe on candles'))
            const unsubscribe = await api.subscribeOnCandles((candle) => {
                ws.send(JSON.stringify(candle));
            })


            this.subscribesOnCandles['figi'] = {
                active: true,
                subscribedConnections: [ws],
                unsubscribe
            }
        }
    }
}






export default websocketController;