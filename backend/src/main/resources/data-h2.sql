--   Jon Snow    hasło - Duch123
INSERT INTO account (username, first_name, last_name, password, email, is_active) VALUES ('JonBekart12', 'Jon', 'Snow', '$2y$12$3fd99QFLRdLLDJyKB3OtGe2T6paUS66hePAzMEUWAX4yyyJxOAT/S','duch@o2.pl',true);

INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('classpath:images/jonsnowseedog.jpg'),'Fajny pieseł, chyba nazwę go Duch',{ts '2012-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('classpath:images/firsttimewithygritte.jpg'),'Złapałem jakąś dzikuske, mówi że nazywa się Ygritte',{ts '2014-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('classpath:images/jonsnowoathwithsam.jpg'),'Przysięga z Samem do nocnej straży',{ts '2013-09-17 18:47:52.69'},1);
INSERT INTO post (lob, description, add_date,account_id) VALUES (FILE_READ('classpath:images/jonsnofirsttimeonwall.jpg'),'Pierwszy raz na murze, ale wysoko',{ts '2013-12-17 18:47:52.69'},1);

INSERT INTO comment (content, add_date, account_id, post_id) VALUES ('Ehh kiedyś to było, teraz to strzela do mnie z łuku...', {ts '2015-02-17 18:47:52.69'},1,2);
INSERT INTO comment (content, add_date, account_id, post_id) VALUES ('Komentarz 2 ', {ts '2015-04-17 18:47:52.69'},1,2);
INSERT INTO comment (content, add_date, account_id, post_id) VALUES ('Komentarz 3 ', {ts '2015-03-17 18:47:52.69'},1,2);

INSERT INTO topic (title, account_id) VALUES ('Halko co jest 5', 1);
INSERT INTO topic (title, account_id) VALUES ('Co to jest za forum jak tu nikogo nie ma kurcze blade', 1);
INSERT INTO topic (title, account_id) VALUES (' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mauris orci, pharetra vel ante eget, sodales ornare diam. Vivamus dictum felis ut diam porttitor, eget pharetra lectus mattis. Nullam fringilla libero scelerisque ullamcorper lacinia. Mauris efficitur urna odio, nec eleifend lorem mollis in. Vivamus et metus vulputate neque auctor sodales. Donec ante enim, hendrerit eget quam eget, luctus iaculis dui. Nullam vitae mattis ipsum.', 1);