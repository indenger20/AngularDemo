
CREATE TABLE if not exists users (
  id int(16) AUTO_INCREMENT PRIMARY KEY,
  username varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  email varchar(64) NOT NULL,
  `group` varchar(64) NOT NULL,
  createdAt date
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
