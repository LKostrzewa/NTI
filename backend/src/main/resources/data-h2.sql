INSERT INTO account (login, first_name, last_name, password, email, is_active) VALUES ('Bekart', 'Jon', 'Snow', 'Duch123','duch@o2.pl',true);
INSERT INTO post (lob, description, add_date,account_id) VALUES (RAWTOHEX('Test'),'na zamku hehe',{ts '2012-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (RAWTOHEX('Test2'),'na murze',{ts '2013-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (RAWTOHEX('Test3'),'w stolicy',{ts '2014-09-17 18:47:52.69'},1);

