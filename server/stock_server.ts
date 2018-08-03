import * as express from 'express';
import { request } from 'https';
import {Server} from 'ws'
//import * as path from 'path'

const app = express();

// code to load static files.
//app.use('/', express.static(path.join(__dirname, '..', 'client'))); 

app.get('/',(request, response) =>{
  response.send('this is home page')
});

app.get('/api/stock', (request, response)=>{
  let result = stocks;
  let params = request.query;
  if(params.name){
    result = result.filter(stock => stock.name.indexOf(params.name) != -1);
  }
  response.json(result);
});

app.get('/api/stock/:id', (request, response)=>{
  response.json(stocks.find((stock) => stock.id = request.params.id));
});

const server = app.listen(8081,'localhost', ()=>{
  console.log('server is up, url is http://localhost:8081');
});

const subscribtions = new Set<any>(); // variable to store all the connected clients

const wsServer = new Server({port:8082});
wsServer.on('connection',websocket =>{ // when there is a connection, we will receieve a websocket
                                       // and we will defeine what to do with this websocket
  subscribtions.add(websocket);
  // websocket.send('welcome connect to the server');
  // websocket.on('message',message =>{
  //   console.log("receieve message from client, content is: "+message);
  // });
});

let messageCount = 0;

setInterval(()=>{
  subscribtions.forEach( ws => {
    if(ws.readyState === 1){
      ws.send(JSON.stringify({messageCount: messageCount++}));
    }else{
      subscribtions.delete(ws);
    }
  })
},2000)

export class Stock {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {
  }
}

const stocks: Stock[] = [
  new Stock(1, "first stoock", 1.99, 3.5, "this is the first stock", ["IT","Web"]),
  new Stock(2, "second stoock", 2.99, 4.0, "this is the second stock", ["IT","Finance"]),
  new Stock(3, "third stoock", 4.99, 2.5, "this is the third stock", ["web"]),
  new Stock(4, "forth stoock", 6.99, 5.0, "this is the forth stock", ["Finance","web"]),
  new Stock(5, "fifth stoock", 9.99, 4.0, "this is the fifth stock", ["IT"]),
  new Stock(6, "sixth stoock", 8.99, 4.5, "this is the sixth stock", ["Finance"]),
];