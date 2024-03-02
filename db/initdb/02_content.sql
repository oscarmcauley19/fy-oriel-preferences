INSERT INTO oriel_user (
    username, created_date
)
VALUES (
    'test', now()
); 

INSERT INTO deanery (deanery_name, places, applicants, ratio) VALUES
('East Anglia', 335, 134, 0.40),
('Essex, Bedfordshire & Hertfordshire (EBH)', 369, 210, 0.57),
('Kent, Surrey and Sussex (KSS)', 581, 290, 0.50),
('Leicestershire, Northamptonshire & Rutland (LNR)', 238, 155, 0.65),
('London', 989, 2387, 2.41),
('North West of England', 901, 1112, 1.23),
('Northern', 443, 422, 0.95),
('Northern Ireland', 284, 266, 0.94),
('Peninsula', 253, 162, 0.64),
('Scotland', 879, 831, 0.95),
('Severn', 352, 478, 1.36),
('Thames Valley Oxford', 286, 357, 1.25),
('Trent', 397, 211, 0.53),
('Wales', 459, 277, 0.60),
('Wessex', 367, 249, 0.68),
('West Midlands Central', 224, 307, 1.37),
('West Midlands North', 366, 130, 0.36),
('West Midlands South', 232, 119, 0.51),
('Yorkshire and Humber', 700, 558, 0.80);
