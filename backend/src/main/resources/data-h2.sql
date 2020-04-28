INSERT INTO account (login, first_name, last_name, password, email, is_active) VALUES ('Bekart', 'Jon', 'Snow', 'Duch123','duch@o2.pl',true);
INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('/home/przemyslaw/IdeaProjects/NTI/NTI/backend/src/main/resources/images/jonsnowseedog.jpg'),'Fajny piesel',{ts '2012-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('/home/przemyslaw/IdeaProjects/NTI/NTI/backend/src/main/resources/images/jonsnowoathwithsam.jpg'),'Przysięga z Samem do nocnej straży',{ts '2013-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('/home/przemyslaw/IdeaProjects/NTI/NTI/backend/src/main/resources/images/firsttimewithygritte.jpg'),'Złapałem jakąś dzikuske',{ts '2014-09-17 18:47:52.69'},1);

