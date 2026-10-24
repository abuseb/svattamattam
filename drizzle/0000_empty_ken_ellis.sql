CREATE TABLE `site_content` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`editor_id` text NOT NULL
);
