var db = require('./database');


       var userLogin=function(name,callback){
           
        
            var sql =db.format("select * from ?? where ?? = ?",['user','user_name',name]);
            
           
            db.query(sql,function(err,row,fields){
                if(err){
                   return callback(err);
                }else{
                    if(row.length == 0){
                        var sql1 = db.format('insert into ?? (??) values (?)',['user','user_name',name]);
                       
                      var query = db.query(sql1);
                         query
                           .on('err',function(err){
                              return  callback(err);
                           })
                           .on('result',function(result){
                               
                               var user_id = result.insertId;
                               
                               var sql_items = db.format('select * from ??',['item']);
                             
                               db.query(sql_items,function(err,rows, fields){
                                   
                                    if(err){
                                       return callback(err);
                                   }else if(rows){
                                       var data = rows;
                                       
                                       createUserItems(user_id,data,onCreateItems);
                                   }
                               })
                              // var sql3 = db.format('insert into ?? (??,??,??) values (?,?,?)',['user_id','item_id','item_quantity',user_id,item_id,item_quantity]);
                           })
                              
                                        
                    }else{ 
                       return callback(null,row);
                    }
                }
            })
            
            function onCreateItems(err,result){
                if(err){
                    return callback(err);
                }else if(result){
                    return callback(null,result);
                }
            }
            
            
            
            return userLogin;
        }
     
       var createUserItems=function(user_id,data,callback){
            
            //console.log(data);
            var userItems =[];
            
           var NoOfInserts = 0;
            for (var i = 0; i < data.length; i++) {
 
                var item_id = data[i]['item_id'];
                
                var item_quantity = null;
                if(data[i]['item_name']=='Carrot'){
                    item_quantity = 18;
                }else if(data[i]['item_name']=='Bread'){
                    item_quantity = 30;
                }else if(data[i]['item_name']=='Diamond'){
                    item_quantity = 1;
                }else{
                    console.log('Invalid item'+ data[i]['item_name']);
                }
                
                var insertData = db.format('insert into ?? (??,??,??) values (?,?,?)',
                                        ['user_item','user_id','item_id','item_quantity',
                                                    user_id,item_id,item_quantity]);
                   
                db.query(insertData,function(err,rows,fields){
                    if(err){
                      callback(err);
                    }else if(rows){
                        userItems.push({user_item_id:rows.insertId});
                        
                    }
                    
                    if(++NoOfInserts == data.length){
                        callback(null,{user_id:user_id,userItems})
                    }
                })
                
            }
   
        
        return createUserItems;
        }
        
   var userExist= function(user_id,callback){
       var sql = db.format('select * from ?? where ?? = ?',['user','user_id',user_id]);
       db.query(sql,function(err,rows,fields){
           if(err){
               return callback(false);
           }else if(rows){
               return callback(null,true);
           }
       })
       return userExist;
   }
   module.exports={
        userLogin:userLogin,
        createUserItems:createUserItems,
        userExist:userExist
        }




