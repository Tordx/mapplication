import PouchDB from 'pouchdb-core'; 

PouchDB.plugin(require('pouchdb-adapter-asyncstorage').default)
export const dblocalAccounts = new PouchDB('account', {adapter: 'asyncstorage'});
export const dbremoteAccounts = new PouchDB('http://admin:admin@192.168.0.192:5984/m_account');


export const SyncAccounts = () => {
  dblocalAccounts.sync(dbremoteAccounts, {
    live: true, 
    retry: true
  }).on('change', () => {
    dblocalAccounts.allDocs({include_docs:true}).then((doc) => {
      console.log(doc)
      console.log('done syc')
    });
  }).on('error', (err) => {
    console.error(err);
  });
}