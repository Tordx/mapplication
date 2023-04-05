import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core'; 


export const dbremoteAccounts = new PouchDB('https://root:root@database.vidarsson.online/m_account');


// export const SyncAccounts = () => {
//   dblocalAccounts.sync(dbremoteAccounts, {
//     live: true, 
//     retry: true
//   }).on('change', () => {
//     dblocalAccounts.allDocs({include_docs:true}).then((doc) => {
//       console.log(doc)
//       console.log('done syc')
//     });
//   }).on('error', (err) => {
//     console.error(err);
//   });
// }

////////////////////////////////////////////////////////////////////////////////////////////////

// export const dblocalEstablishment = new PouchDB('Establishment', {adapter: 'asyncstorage'});
export const dbremoteEstablishment = new PouchDB('http://admin:admin@192.168.0.192:5984/m_establishments');


// export const SyncEstablishment = () => {
//   dblocalEstablishment.sync(dbremoteEstablishment, {
//     live: true, 
//     retry: true
//   }).on('change', () => {
//     dblocalEstablishment.allDocs({include_docs:true}).then((doc) => {
//       console.log(doc)
//       console.log('done syc')
//     });
//   }).on('error', (err) => {
//     console.error(err);
//   });
// }