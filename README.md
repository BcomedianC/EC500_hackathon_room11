# EC500_hackathon_room11
Repo for BU EC500, Secure P2P Chat Hackathon

Group member:
Damani Philip djphilip@bu.edu  
Buyuan Lin buruce@bu.edu  
Jiaming Yu jiamingy@bu.edu

Figures:  
<div align=center><img src="https://github.com/BcomedianC/EC500_hackathon_room11/blob/main/figures/login.PNG"/></div> 
<div align=center><img src="https://github.com/BcomedianC/EC500_hackathon_room11/blob/main/figures/chat.PNG"/></div> 

### Requirements  
frontend chat interface  
chat data stored on client  
user discovery via central server  
connect using email as username?  
store user emails in database  
users can block/mute each other  
chats can be sent asynchronously  
encrypt messages?  

### Architecture  
Frontend: React  
Backend: Python  Flask-SocketIO  ngrok  
Database: MongoDB  

### Frontend Tasks  
user can log in w/ Google SSO  
user can view their received messages  
user can start/continue chats with other users  
user can block/mute other users   
user can see if other users are online  

### Database Schema  
**User Info (Remote)**   
User object   
email (string) (key)    
server URL/IP address?    
status (whether user is online or offline)    

**Chat Info (Local)**   
stored based on recipient    
Message Object    
recipient email (string) (key)    
sender semail (string)  
status: whether message was received or not (int: 1 or 0)  
message content (string)  
time message was sent (string: datetime)  

### Backend Tasks  
take signed-up user and add their info to central DB  
establish authentication w/ cookies when user logs in  
when user is signed-in, change their status in the central DB to ‘online’  
get list of all users from central DB  
send message to specific user  
receive message from specific user  
store chat info in local DB  

**Flow**
backend (BE) receives Google SSO credentials from frontend (FE)  
BE returns authorization token to FE  
BE gets list of users from remote database (DB) and sends to FE  
sending user (SU) selects recipient user (RU) on FE and attempts to send message  
BE receives RU email and message then checks DB to see if RU is online  
if RU is online:  
BE connects to RU’s socket and sends message  
BE stores message in local DB of SU and RU  
if RU is offline  


### Resources
https://medium.com/analytics-vidhya/simple-chat-app-with-react-flask-b2ae72404fcb  
https://codeburst.io/building-your-first-chat-application-using-flask-in-7-minutes-f98de4adfa5d  
https://material-ui.com/zh/  

