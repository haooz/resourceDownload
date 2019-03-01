CREATE TABLE file_storage (
  id varchar(32) primary key NOT NULL,
  name varchar(32) NOT NULL,
  path varchar(256) NOT NULL,
  purpose varchar(64) NOT NULL,
  remark varchar(64) NOT NULL,
  create_time timestamp NOT NULL,
  is_open tinyint(2) NOT NULL);