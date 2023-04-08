import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PouchDB from 'pouchdb-react-native' ; 'pouchdb-core';
export default function UserViewPage() {

    const {userview} = useSelector((action) => action.user)
    const [data, setData] = useState([]);

    

    useEffect(() => {


    const getdata = async () => {
        const dbremoteAccounts = new PouchDB('http://admin:admin@192.168.0.192:5984/m_account');
        
        try {

          let result = await dbremoteAccounts.allDocs({
            include_docs: true,
            attachments: true,
            
          });
          if(result.rows){
            let modifiedArr = result.rows.map(item => 
                item.doc
            )
            let filteredData = modifiedArr.filter(item => {
              return item
            })
            if (!filteredData) {
                let newFilteredData = filteredData.filter((item) => {
                  return item.userID === userview.userID;
                })

                const object = newFilteredData[0]
                console.log('loaded');
                setData(object);
                console.log('loaded');
                console.log(object);
                
                
            }
          } 
        } catch (error) {
          console.error(error);
        }
    }
    getdata
    console.log('loaded');
    },[])
  return (
    <View style ={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text>{data.FullName}</Text>
     
    </View>
  )
}