
CREATE TABLE if not exists users (
  id int(16) AUTO_INCREMENT PRIMARY KEY,
  username varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  firstname varchar(64) NOT NULL,
  lastname varchar(64) NOT NULL,
  createdAt date
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE if not exists posts (
  id int(16) AUTO_INCREMENT PRIMARY KEY,
  title varchar(100) NOT NULL,
  imageName varchar(100) NOT NULL,
  imagePath text(32768) NOT NULL,
  `description` text(32768) NOT NULL,
  `descriptionFull` text(32768) NOT NULL,
  `user_id` int(16) NOT NULL,
  createdAt date
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE if not exists popularity (
  id int(16) AUTO_INCREMENT PRIMARY KEY,
  `type` int(16)  NOT NULL,
  `user_id` int(16) NOT NULL,
  `post_id` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;