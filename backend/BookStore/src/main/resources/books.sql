ALTER TABLE PUBLIC.BOOK ALTER COLUMN id RESTART WITH 12;

insert into PUBLIC.BOOK (ID, AUTHOR, DESCRIPTION, PAGES, PRICE, PUBLISHED_DATE, PUBLISHER, TITLE)
values  (1, 'F. Scott Fitzgerald',  'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 240, 300, null, 'Scott Publishers', 'The Great Gatsby'),
        (2, 'William Shakespeare',  'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 450, 400, null, 'William Publishers', 'The Merchant of Venice'),
        (3, 'William Shakespeare',  'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 300, 2000, null, 'William Publishers', 'Romeo and Juliet'),
        (4, 'R.L. Stevenson', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 650, 600, null, 'Some Publishers', 'Treasure Island'),
        (5, 'Lewis Carroll', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 650, 520, null, 'Some Publishers', 'Alice''s Adventures in Wonderland'),
        (6, 'Satyajit Ray', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 180, 381, null, 'Some Publishers', 'Don Quixote'),
        (7, 'Ruskin Bond', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 200, 163, null, 'Some Publishers', 'The Complete Adventures of Feluda Vol.1'),
        (8, 'Ruskin Bond', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 120, 123, null, 'Some Publishers', 'THE BLUE UMBRELLA'),
        (9, 'DR. RD', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 120, 454, null, 'Some Publishers', 'Maths & Science'),
        (10, 'DR. DDDD', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 120, 454, null, 'Some Publishers', 'Life of Science'),
        (11, 'DR. Someone', 'A book description is a summary of a book''s content that''s intended to entice readers to buy it.', 120, 45, null, 'PA Publishers', 'The Full of Drama');

insert into BOOK_AVAILABILITY (AVAILABLE_COPIES, BOOK_ID, ORDERED_COPIES)
values ( 10, 1, 0 ),
       ( 5, 2, 0),
       (10, 4, 0),
       (10, 5, 0),
       (20, 8, 0),
       (5, 6, 0)