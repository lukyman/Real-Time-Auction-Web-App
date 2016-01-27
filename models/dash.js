var db = require('./database');
var main = require('./main');



var getDash=function(user_id,callback){
main.userExist(user_id,function(err,exist){
    if(err){
        callback(err);
    }else if(exist){
        
     var dash_sql= 'select user.`user_name`,user.`user_id`,user.`coin`,user_item.`user_item_id`, user_item.`item_id`,user_item.`item_quantity`,item.`item_id`,item.`item_name`,image.`image_id`,image.`image_path`'
        +'from user '
        +'inner join user_item on user.`user_id` = user_item.`user_id` '
        +'inner join item on item.`item_id` = user_item.`item_id` '
        +'inner join image on image.`image_id` = item.`image_id` '
        +'where user.`user_id` ='+db.escape(user_id);
        
        db.query(dash_sql,function(err,rows,fields){
            if(err){
                callback(err);
            }else if(rows){
                //console.log(rows[0]['user_id']);
                var dash ={
                    user_id:rows[0]['user_id'],
                    user_name:rows[0]['user_name'],
                    user_coins:rows[0]['coin'],
                    items:[]
            };
                
                for (var i = 0; i < rows.length; i++) {
                    var user_item_id = rows[i]['user_item_id'];
                    var item_id = rows[i]['item_id'];
                    var item_name = rows[i]['item_name'];
                    var item_quantity = rows[i]['item_quantity'];
                    var image_path = rows[i]['image_path'];
                    var image_id = rows[i]['image_id']; 
                    
                    dash['items'].push({
                        user_item_id:user_item_id,
                        item_id:item_id,
                        item_name:item_name,
                        item_quantity:item_quantity,
                        image_id:image_id,
                        image_path:image_path
                    })
                }
                
                callback(null,dash);
            }
        })
       
        
    }
})
return getDash;
}

module.exports={
    getDash:getDash
}