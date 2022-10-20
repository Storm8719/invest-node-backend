import api from "../models/tinkoff-api";

class websocketController{
    constructor(wss) {
        this.websocketServerHandler(wss);
        this.connectionsList = [];
        this.activeSubscribesOnCandles = {};
        setInterval(() => {
            console.log(this.connectionsList);
            console.log(this.activeSubscribesOnCandles );
        }, 2000);
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
                this.removeDiedConnectionFromSubscribers(ws);
            })
        });
    }

    //when connection dies - remove it from all subscribes
    removeDiedConnectionFromSubscribers(ws){
        this.connectionsList.splice(this.connectionsList.indexOf(ws), 1);
        for (let figi in this.activeSubscribesOnCandles) {
            this.activeSubscribesOnCandles[figi].subscribers.splice(this.activeSubscribesOnCandles[figi].subscribers.indexOf(ws), 1);
            //If figi have no active subscribers - close api subscribe
            if(!this.activeSubscribesOnCandles[figi].subscribers.length){
                this.activeSubscribesOnCandles[figi].unsubscribe();
                delete this.activeSubscribesOnCandles[figi];
            }
        }
    }

    //function for sending candle data to subscribers
    routeCandleData(candle){

        if(typeof this.activeSubscribesOnCandles[candle.figi] !== "undefined"){

            // If there are no subscribers, we unsubscribe from receiving candles
            if(!this.activeSubscribesOnCandles[candle.figi].subscribers.length){
                this.activeSubscribesOnCandles[candle.figi].unsubscribe();
                delete this.activeSubscribesOnCandles[candle.figi];
                return;
            }

            //Send candle to every ws who subscribed on it
            this.activeSubscribesOnCandles[candle.figi].subscribers.forEach((ws) => {
                try {
                    ws.send(JSON.stringify(candle));
                }catch (e){
                    console.log(e);
                }
            })
        }
    }

    actions = {
        subscribeOnCandles: async ({ws, figi = 'BBG004S681W1'}) => {
            //Check if somebody have subscription on received figi
            // if(this.activeSubscribesOnCandles.some(subscription => subscription.figi === figi)){
            if(typeof this.activeSubscribesOnCandles[figi] !== "undefined"){
                //If we have active subscription - add connection to subscribers on this figi
                this.activeSubscribesOnCandles[figi].subscribers.push(ws);
            }else{
                //If nobody have subscription - then subscribe via api on figi
                const unsubscribe = await api.subscribeOnCandles((candle) => {
                    this.routeCandleData(candle);
                }, figi)
                //Create subscription object for ws
                this.activeSubscribesOnCandles[figi] = {subscribers:[ws], unsubscribe}
            }

            ws.send(JSON.stringify('Try to subscribe on candles'))
        }
    }
}






export default websocketController;