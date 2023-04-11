import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 


export const dbremoteAccounts = new PouchDB('http://admin:admin@192.168.0.192:5984/m_account');
export const dbremoteEstablishment = new PouchDB('http://admin:admin@192.168.0.192:5984/m_establishments');
export const dbremoteComments = new PouchDB('http://admin:admin@192.168.0.192:5984/m_comments');
