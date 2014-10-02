
CREATE TABLE airport (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  code varchar(5) NOT NULL DEFAULT '',
  name varchar(255) NOT NULL DEFAULT '',
  country varchar(255) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY code (code)
)