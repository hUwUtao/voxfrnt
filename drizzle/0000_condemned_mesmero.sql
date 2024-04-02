-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
CREATE TABLE `authme` (
	`id` mediumint(8) unsigned AUTO_INCREMENT NOT NULL,
	`username` char(16) NOT NULL,
	`realname` char(16) NOT NULL,
	`password` char(255) NOT NULL,
	`ip` char(40) DEFAULT 'NULL',
	`lastlogin` bigint(20) DEFAULT 'NULL',
	`x` double NOT NULL DEFAULT 0,
	`y` double NOT NULL DEFAULT 0,
	`z` double NOT NULL DEFAULT 0,
	`world_void` char(255) NOT NULL DEFAULT ''world'',
	`regdate` bigint(20) unsigned NOT NULL DEFAULT 0,
	`regip` char(39) DEFAULT 'NULL',
	`yaw` float DEFAULT 'NULL',
	`pitch` float DEFAULT 'NULL',
	`email` char(255) DEFAULT 'NULL',
	`isLogged` smallint(6) NOT NULL DEFAULT 0,
	`hasSession` smallint(6) NOT NULL DEFAULT 0,
	`totp` char(32) DEFAULT 'NULL',
	CONSTRAINT `username` UNIQUE(`username`)
);
