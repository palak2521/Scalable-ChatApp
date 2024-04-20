
import {Server} from 'socket.io';
import Redis from 'ioredis'



const pub= new Redis(
    {
        host:'',
        port: 0,
        username:'',
        password:''
    }
);
const sub= new Redis(
    {
        host:'',
        port: 0,
        username:'',
        password:''
    }
);
class SocketService{
    private _io:Server;
    constructor()
    {
        console.log("Init Socket Service..")
        this._io=new Server(
            {
                cors:{
                    allowedHeaders:['*'],
                    origin:"*",
                },
            }
        );
        sub.subscribe('MESSAGES')
    }

    public initListners()
    {
        const io=this.io;
        console.log('Initialize socket listners');
        // 'connect' is the standard event emitted when a client successfully connects to the server
        //event emmited is by the event by the user to the server
        io.on('connect',(socket)=>{
            console.log(`New Socket Connected`, socket.id);

            socket.on('event:message', async ({message}:{message:string})=>{
                console.log('New message recieved...',message);
                //publish this message to redis (ioredis)
                await pub.publish('MESSAGES', JSON.stringify({message}));
            });

            
        });
        sub.on('message',(channel,message)=>{
            if(channel==='MESSAGES')
            {
                    console.log('new message from redis',message);
                    io.emit("message",message);
            }
                
        })
        
    }
    get io()
    {
        return this._io;
    }
}

export default SocketService;