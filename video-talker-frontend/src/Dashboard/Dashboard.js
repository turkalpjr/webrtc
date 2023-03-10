import React,{useEffect} from 'react'
import logo from '../resources/logo.png';
import ActiveUsersList from './components/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../utils/webRTC/webRTCHandler';
import DirectCall from './components/DirectCall/DirectCall';
import './Dashboard.css';


    const Dashboard = () => {

   useEffect(()=>{
    webRTCHandler.getLocalStream();
   },[]);


    return (
        <div className='dashboard_container background_main_color'>
            <div className='dashboard_left_section'>
                <div className='dashboard_content_container'>
                    <DirectCall/>
                </div>
                <div className='dashboard_rooms_container background_secondary_color'>
                    ROOMS
                </div>
            </div>
            <div className='dashboard_right_section background_secondary_color'>
                <div className='dashboard_active_users_list'>
                    <ActiveUsersList/>
                </div>
                <div className='dashboard_logo_container'>
                    <img className='dashboard_logo_image' src={logo}></img>
                </div>
            </div>
        </div>
    )
}


export default Dashboard