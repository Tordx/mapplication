import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 


export const dbremoteAccounts = new PouchDB('https://root:root@database.vidarsson.online/m_account');
export const dbremoteEstablishment = new PouchDB('https://root:root@database.vidarsson.online/m_establishments');
export const dbremoteComments = new PouchDB('https://root:root@database.vidarsson.online/m_comments');
