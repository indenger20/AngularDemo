CREATE TABLE if not exists orders (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_at date,
  product_id int(16),
  `user_id` int(16)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE if not exists users (
  id int(16) AUTO_INCREMENT PRIMARY KEY,
  username varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  email varchar(64) NOT NULL,
  `group` varchar(64) NOT NULL,
  cash varchar(64),
  createdAt date
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE if not exists products (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	created_at date,
  title varchar(100) NOT NULL,
  img varchar(100) NOT NULL,
  price varchar(16) NOT NULL,
  make_id int(16),
  `description` text(32768)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE if not exists makes (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(64) NOT NULL 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
