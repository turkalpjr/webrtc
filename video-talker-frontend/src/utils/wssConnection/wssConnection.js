import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from '../../store/actions/dashboardActions';
import * as webRTCHandler from '../webRTC/webRTCHandler';


const SERVER = 'http://localhost:5000';

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
}

let socket;
export const connectWithWebSocket = () => {
    socket = socketClient(SERVER);
    socket.on('connection', () => {
        console.log('SUCCESSFULLY CONNECTED WİTH WSS SERVER');
        console.log(socket.id);
    });

    socket.on('broadcast', (data) => {
        handleBroadcastEvents(data)
    })

    socket.on('pre-offer',(data)=>{
        
        webRTCHandler.handlePreOffer(data);
    });
    socket.on('pre-offer-answer',(data)=>{
   
        webRTCHandler.handlePreOfferAnswer(data);
    });
};


export const registerNewUser = (username) => {
    socket.emit('register-new-user', {
        username: username,
        socketId: socket.id
    })
};

// emitting events to server related with direct call

export const sendPreOffer=(data)=>{
    debugger;
    socket.emit('pre-offer',data);
}

export const sendPreOfferAnswer=(data)=>{
    socket.emit('pre-offer-answer',data);
};



const handleBroadcastEvents = (data) => {
    switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUser => activeUser.socketId !== socket.id);
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;
        default:
            break;
    }
}