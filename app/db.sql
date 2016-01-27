
// significant of community based organizations in communty development process
                         
create table user(
    user_id int not null auto_increment,
    user_name varchar(100) not null,
    coin int not null default 1000,
    primary key(user_id),
    created_at datetime not null,
    updated_at timestamp not null   
)

create table image(
    image_id int not null auto_increment,
    image_path varchar(255) not null,
     primary key(image_id),
    created_at datetime not null, 
    updated_at timestamp not null  
)

create table item (
    item_id int not null auto_increment,
    item_name varchar(100) not null,
    image_id int not null,
    primary key(item_id),
    foreign key fk_image_id (image_id) references image (image_id),
    created_at datetime not null,
    updated_at timestamp not null
)

create table user_item (
    user_item_id int not null auto_increment,
    user_id int not null,
    item_id int not null,
    item_quantity int not null,
    primary key(user_item_id),
    foreign key fk_user_id (user_id) references user (user_id),
    foreign key fk_item_id (item_id) references item (item_id),
    created_at datetime not null,
    updated_at timestamp not null
)

create table auction(
    auction_id int not null auto_increment,
    seller_id int not null,
    item_id int not null,
    min_value int not null,
    primary key (auction_id),
    foreign key fk_seller_id (seller_id) references user (user_id),
    foreign key fk_item_id (item_id) references item (item_id),
    created_at datetime not null,
    updated_at timestamp not null    
)

create table bid(
    bid_id int not null auto_increment,
    bidder_id int not null,
    auction_id int null,
    bid_value int not null,
    isWinning boolean default 0,
    primary key (bid_id),
    foreign key fk_bidder_id (bidder_id) references user (user_id),
    foreign key fk_auction_id (auction_id) references auction (auction_id),
    created_at datetime not null,
    updated_at timestamp not null
)

insert into item (item_name,image_id) 
values ('Carrots',2),
values ('Breads',1),
values ('Diamond',3)

insert into image (image_path,created_at)
values ('images/bread.png',now()),
values ('images/carrot.png',now()),
values ('images/diamond.png',now())


