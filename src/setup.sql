-- Organization table

CREATE TABLE Organization (
Organization_id serial PRIMARY KEY,
name VARCHAR (150) NOT NULL,
Description TEXT NOT NULL,
Contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR (255) NOT NULL
);





INSERT INTO Organization (organization_id, name, Description, Contact_email, logo_filename)
VALUES
(   22,
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(   23,
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(   24,
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);





CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
);

--POROJECT 9/11 fri work

INSERT INTO project
    (organization_id, title, description, location, project_date)
VALUES
(22, 'Community Hall Renovation',
 'Help renovate a community hall and improve its facilities.',
 'Nairobi', '2026-09-16'),

(22, 'Clean Water Facility',
 'Assist with improving access to clean water at a community facility.',
 'Kajiado', '2026-09-23'),

(22, 'Eco Housing Workshop',
 'Learn and demonstrate environmentally friendly construction methods.',
 'Kiambu', '2026-10-01'),

(22, 'Community Road Project',
 'Help improve a local road to make transportation safer for residents.',
 'Nakuru', '2026-10-08'),

(22, 'Public Building Maintenance',
 'Assist with maintenance and improvements to a public community building.',
 'Machakos', '2026-10-15'),

(23, 'Community Vegetable Garden',
 'Help create a vegetable garden that will provide fresh food for residents.',
 'Nairobi', '2026-09-19'),

(23, 'Seed Sharing Program',
 'Distribute seeds to families and teach basic gardening techniques.',
 'Kajiado', '2026-09-26'),

(23, 'Organic Farming Workshop',
 'Teach volunteers environmentally friendly farming methods.',
 'Kiambu', '2026-10-03'),

(23, 'School Farm Project',
 'Help students learn about farming by creating a school garden.',
 'Machakos', '2026-10-11'),

(23, 'Community Tree Nursery',
 'Create and maintain a nursery for trees in the community.',
 'Nakuru', '2026-10-18'),

(24, 'Community Cleanup Day',
 'Work with volunteers to clean streets and shared public spaces.',
 'Nairobi', '2026-09-21'),

(24, 'Family Assistance Drive',
 'Collect essential supplies and distribute them to families in need.',
 'Kajiado', '2026-09-29'),

(24, 'Children Tutoring Program',
 'Help children with reading, writing, and basic school subjects.',
 'Kiambu', '2026-10-05'),

(24, 'Senior Support Day',
 'Assist elderly members of the community with daily activities.',
 'Nakuru', '2026-10-13'),

(24, 'Youth Community Service',
 'Organize young volunteers to participate in community service.',
 'Machakos', '2026-10-20');



--new table for categories 

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
	);
	
 CREATE TABLE project_category (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

	PRIMARY KEY (project_id, category_id),
	
	CONSTRAINT project_category_project_fk
        FOREIGN KEY (project_id)
        REFERENCES project (project_id),

    CONSTRAINT project_category_category_fk
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
	
	);

	
    
INSERT INTO category(name)
VALUES
('Environment'),
('Education'),
('Community Support');



INSERT INTO project_category (project_id, category_id)
VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 3),
(5, 3),
(6, 1),
(7, 2),
(8, 2),
(9, 2),
(10, 1),
(11, 3),
(12, 3),
(13, 2),
(14, 3),
(15, 3);

