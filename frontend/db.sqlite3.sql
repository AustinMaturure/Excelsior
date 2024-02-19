CREATE TABLE IF NOT EXISTS django_migrations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    applied DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_group_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (group_id) REFERENCES auth_group(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES auth_permission(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS auth_user_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES auth_group(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS auth_user_user_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES auth_permission(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS django_admin_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    object_id TEXT,
    object_repr VARCHAR(200) NOT NULL,
    action_flag SMALLINT UNSIGNED NOT NULL CHECK(action_flag >= 0),
    change_message TEXT NOT NULL,
    content_type_id INT,
    user_id INT NOT NULL,
    action_time DATETIME NOT NULL,
    FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS django_content_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    app_label VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_permission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_type_id INT NOT NULL,
    codename VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS auth_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS auth_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    password VARCHAR(128) NOT NULL,
    last_login DATETIME,
    is_superuser TINYINT(1) NOT NULL,
    username VARCHAR(150) NOT NULL UNIQUE,
    last_name VARCHAR(150) NOT NULL,
    email VARCHAR(254) NOT NULL,
    is_staff TINYINT(1) NOT NULL,
    is_active TINYINT(1) NOT NULL,
    date_joined DATETIME NOT NULL,
    first_name VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS django_session (
    session_key VARCHAR(40) PRIMARY KEY,
    session_data TEXT NOT NULL,
    expire_date DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS excelsior_staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    position VARCHAR(255),
    profile_image VARCHAR(100) NOT NULL,
    email VARCHAR(254),
    phone_number VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS excelsior_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(100) NOT NULL,
    image VARCHAR(100) NOT NULL,
    article_id BIGINT NOT NULL,
    FOREIGN KEY (article_id) REFERENCES excelsior_articles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS excelsior_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT,
    name VARCHAR(30) NOT NULL,
    parent_id BIGINT,
    image VARCHAR(100),
    FOREIGN KEY (parent_id) REFERENCES excelsior_category(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS excelsior_articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(225) NOT NULL,
    body TEXT NOT NULL,
    date DATE NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    thumbnail VARCHAR(100) NOT NULL,
    author_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    views INT UNSIGNED NOT NULL CHECK(views >= 0),
    FOREIGN KEY (author_id) REFERENCES excelsior_staff(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES excelsior_category(id) ON DELETE CASCADE
);

INSERT INTO `django_migrations` SET `id`=1, `app`='contenttypes', `name`='0001_initial', `applied`= '2023-08-23 19:18:08.903752';
INSERT INTO `django_migrations` SET `id`=2, `app`='auth', `name`='0001_initial', `applied`= '2023-08-23 19:18:09.003755';
INSERT INTO `django_migrations` SET `id`=3, `app`='admin', `name`='0001_initial', `applied`= '2023-08-23 19:18:09.145300';
INSERT INTO `django_migrations` SET `id`=4, `app`='admin', `name`='0002_logentry_remove_auto_add', `applied`= '2023-08-23 19:18:09.209769';
INSERT INTO `django_migrations` SET `id`=5, `app`='admin', `name`='0003_logentry_add_action_flag_choices', `applied`= '2023-08-23 19:18:09.264646';
INSERT INTO `django_migrations` SET `id`=6, `app`='contenttypes', `name`='0002_remove_content_type_name', `applied`= '2023-08-23 19:18:09.337001';
INSERT INTO `django_migrations` SET `id`=7, `app`='auth', `name`='0002_alter_permission_name_max_length', `applied`= '2023-08-23 19:18:09.386798';
INSERT INTO `django_migrations` SET `id`=8, `app`='auth', `name`='0003_alter_user_email_max_length', `applied`= '2023-08-23 19:18:09.485924';
INSERT INTO `django_migrations` SET `id`=9, `app`='auth', `name`='0004_alter_user_username_opts', `applied`= '2023-08-23 19:18:09.525931';
INSERT INTO `django_migrations` SET `id`=10, `app`='auth', `name`='0005_alter_user_last_login_null', `applied`= '2023-08-23 19:18:09.577703';
INSERT INTO `django_migrations` SET `id`=11, `app`='auth', `name`='0006_require_contenttypes_0002', `applied`= '2023-08-23 19:18:09.617744';
INSERT INTO `django_migrations` SET `id`=12, `app`='auth', `name`='0007_alter_validators_add_error_messages', `applied`= '2023-08-23 19:18:09.653567';
INSERT INTO `django_migrations` SET `id`=13, `app`='auth', `name`='0008_alter_user_username_max_length', `applied`= '2023-08-23 19:18:09.715488';
INSERT INTO `django_migrations` SET `id`=14, `app`='auth', `name`='0009_alter_user_last_name_max_length', `applied`= '2023-08-23 19:18:09.782324';
INSERT INTO `django_migrations` SET `id`=15, `app`='auth', `name`='0010_alter_group_name_max_length', `applied`= '2023-08-23 19:18:09.837087';
INSERT INTO `django_migrations` SET `id`=16, `app`='auth', `name`='0011_update_proxy_permissions', `applied`= '2023-08-23 19:18:09.889024';
INSERT INTO `django_migrations` SET `id`=17, `app`='auth', `name`='0012_alter_user_first_name_max_length', `applied`= '2023-08-23 19:18:09.941820';
INSERT INTO `django_migrations` SET `id`=18, `app`='sessions', `name`='0001_initial', `applied`= '2023-08-23 19:18:10.038472';
INSERT INTO `django_migrations` SET `id`=19, `app`='excelsior', `name`='0001_initial', `applied`= '2023-09-09 16:13:50.036339';
INSERT INTO `django_migrations` SET `id`=20, `app`='auth', `name`='0013_groupmanager', `applied`= '2023-09-11 19:24:18.119986';
INSERT INTO `django_migrations` SET `id`=21, `app`='auth', `name`='0014_auto_20230911_1414', `applied`= '2023-09-11 19:25:43.191920';
INSERT INTO `django_migrations` SET `id`=22, `app`='auth', `name`='0015_auto_20230911_1422', `applied`= '2023-09-11 19:26:12.246537';
INSERT INTO `django_migrations` SET `id`=23, `app`='auth', `name`='0016_auto_20230911_1425', `applied`= '2023-09-11 19:26:35.317227';
INSERT INTO `django_migrations` SET `id`=24, `app`='auth', `name`='0017_auto_20230911_1432', `applied`= '2023-09-11 19:27:14.410810';
INSERT INTO `django_migrations` SET `id`=25, `app`='excelsior', `name`='0002_auto_20230911_1425', `applied`= '2023-09-11 19:27:47.478130';
INSERT INTO `django_migrations` SET `id`=26, `app`='excelsior', `name`='0003_auto_20230911_1432', `applied`= '2023-09-11 19:28:15.537401';
INSERT INTO `django_migrations` SET `id`=27, `app`='auth', `name`='0018_auto_20230911_1439', `applied`= '2023-09-11 19:28:45.606849';
INSERT INTO `django_migrations` SET `id`=28, `app`='auth', `name`='0019_auto_20230911_1445', `applied`= '2023-09-11 19:29:13.653940';
INSERT INTO `django_migrations` SET `id`=29, `app`='excelsior', `name`='0004_auto_20230911_1445', `applied`= '2023-09-11 19:29:46.697301';
INSERT INTO `django_migrations` SET `id`=30, `app`='excelsior', `name`='0005_auto_20230911_1454', `applied`= '2023-09-11 19:30:17.759477';
INSERT INTO `django_migrations` SET `id`=31, `app`='excelsior', `name`='0006_auto_20230911_1508', `applied`= '2023-09-11 19:30:49.827710';
INSERT INTO `django_migrations` SET `id`=32, `app`='excelsior', `name`='0007_auto_20230911_1544', `applied`= '2023-09-11 19:31:23.884399';
INSERT INTO `django_migrations` SET `id`=33, `app`='excelsior', `name`='0008_auto_20230911_1609', `applied`= '2023-09-11 19:31:53.941402';
INSERT INTO `django_migrations` SET `id`=34, `app`='excelsior', `name`='0009_auto_20230911_1615', `applied`= '2023-09-11 19:32:25.987857';
INSERT INTO `django_migrations` SET `id`=35, `app`='excelsior', `name`='0010_auto_20230911_1622', `applied`= '2023-09-11 19:32:55.043671';
INSERT INTO `django_migrations` SET `id`=36, `app`='excelsior', `name`='0011_auto_20230911_1626', `applied`= '2023-09-11 19:33:25.093645';
INSERT INTO `django_migrations` SET `id`=37, `app`='excelsior', `name`='0012_auto_20230911_1630', `applied`= '2023-09-11 19:33:54.163507';
INSERT INTO `django_migrations` SET `id`=38, `app`='excelsior', `name`='0013_auto_20230911_1644', `applied`= '2023-09-11 19:34:27.236368';
INSERT INTO `django_migrations` SET `id`=39, `app`='excelsior', `name`='0014_auto_20230911_1727', `applied`= '2023-09-11 19:34:59.308173';
INSERT INTO `django_migrations` SET `id`=40, `app`='excelsior', `name`='0015_auto_20230911_1730', `applied`= '2023-09-11 19:35:29.374719';
INSERT INTO `django_migrations` SET `id`=41, `app`='excelsior', `name`='0016_auto_20230911_1734', `applied`= '2023-09-11 19:36:00.435664';
INSERT INTO `django_migrations` SET `id`=42, `app`='excelsior', `name`='0017_auto_20230911_1806', `applied`= '2023-09-11 19:36:30.503508';
INSERT INTO `django_migrations` SET `id`=43, `app`='excelsior', `name`='0018_auto_20230911_1816', `applied`= '2023-09-11 19:37:01.572282';
INSERT INTO `django_migrations` SET `id`=44, `app`='excelsior', `name`='0019_auto_20230911_1817', `applied`= '2023-09-11 19:37:31.642059';
INSERT INTO `django_migrations` SET `id`=45, `app`='excelsior', `name`='0020_auto_20230911_1818', `applied`= '2023-09-11 19:38:01.705303';
INSERT INTO `django_migrations` SET `id`=46, `app`='excelsior', `name`='0021_auto_20230911_1820', `applied`= '2023-09-11 19:38:31.770491';
INSERT INTO `django_migrations` SET `id`=47, `app`='excelsior', `name`='0022_auto_20230911_1821', `applied`= '2023-09-11 19:39:01.840248';
INSERT INTO `django_migrations` SET `id`=48, `app`='excelsior', `name`='0023_auto_20230911_1822', `applied`= '2023-09-11 19:39:31.910872';
INSERT INTO `django_migrations` SET `id`=49, `app`='excelsior', `name`='0024_auto_20230911_1824', `applied`= '2023-09-11 19:40:01.974286';
INSERT INTO `django_migrations` SET `id`=50, `app`='excelsior', `name`='0025_auto_20230911_1825', `applied`= '2023-09-11 19:40:32.043178';
-- JKA South African Championships
INSERT INTO articles (title, summary)
VALUES ('JKA South African Championships', 'The event held in Johannesburg saw participation from karateka of various skill levels, with elite divisions competing on Saturday and novice divisions on Friday. Notable achievements include hosting esteemed instructors from Japan, who conducted training seminars and gradings leading up to the tournament.');

-- Piet Retief VLU Meeting
INSERT INTO articles (title, summary)
VALUES ('Piet Retief VLU Meeting', 'The meeting covered various topics including community service, food trivia, and demonstrations of dot painting. Notable achievements include recognition for members'' contributions at a regional congress.');

-- Noordvaal Rugby Championship
INSERT INTO articles (title, summary)
VALUES ('Noordvaal Rugby Championship', 'Hoërskool Piet Retief''s U/14A rugby team emerged as champions in the Noordvaal-Beker competition, achieving victory across multiple tournaments in the 2023 season.');

-- Mpumalanga August Horse Race
INSERT INTO articles (title, summary)
VALUES ('Mpumalanga August Horse Race', 'The horse race event in Piet Retief attracted attention as jockeys and horses paraded through the town, with various races held throughout the day. The event aimed to promote horse racing and community engagement.');

-- Huis Immergroen's Loslitdag Celebration
INSERT INTO articles (title, summary)
VALUES ('Huis Immergroen''s Loslitdag Celebration', 'Huis Immergroen residents celebrated Loslitdag with food, camaraderie, and discussions on community service. The event emphasized the importance of women''s friendships and small acts of kindness.');

-- Mkhondo Bridge Academy Golf Day
INSERT INTO articles (title, summary)
VALUES ('Mkhondo Bridge Academy Golf Day', 'The golf day aimed to raise funds for the academy supporting children with disabilities. The event saw community support and participation, with notable sponsors contributing to its success.');

-- Casual Day Appreciation
INSERT INTO articles (title, summary)
VALUES ('Casual Day Appreciation', 'The Mpumalanga Mental Health Society expressed gratitude for the support received during Casual Day celebrations, highlighting the importance of inclusivity and support for people with disabilities.');

-- Farmers Information Day
INSERT INTO articles (title, summary)
VALUES ('Farmers Information Day', 'Hosted by the Department of Agriculture, the event aimed to empower farmers with information on improving agricultural practices. It emphasized community development and collaboration among stakeholders.');

-- Salem Primary Women's Day Celebration
INSERT INTO articles (title, summary)
VALUES ('Salem Primary Women''s Day Celebration', 'The school celebrated Women''s Day with traditional attire, performances, and traditional meals, emphasizing the importance of honoring women in the community.');

-- Alpha & Omega School Appreciation
INSERT INTO articles (title, summary)
VALUES ('Alpha & Omega School Appreciation', 'The school expressed gratitude to TWK Corporate Services for their donation, emphasizing the values of peace, excellence, accountability, respect, and love.');

-- Glen Aggy Trail Run
INSERT INTO articles (title, summary)
VALUES ('Glen Aggy Trail Run', 'The trail run event attracted participants for various routes, promoting outdoor activity and community engagement. It recognized winners across different race categories.');

-- Yende Community Development Projects
INSERT INTO articles (title, summary)
VALUES ('Yende Community Development Projects', 'Kangra Mines initiated social upliftment projects in the Yende community, including a community hall upgrade, water supply, and housing for families, demonstrating commitment to community development.');

-- Highlights of 2023
INSERT INTO articles (title, summary)
VALUES ('Highlights of 2023', 'The article reflects on positive moments and accomplishments of 2023, encouraging readers to make resolutions for community improvement in the coming year.');

-- Bhekulwazi Pre-Primary School Graduation
INSERT INTO articles (title, summary)
VALUES ('Bhekulwazi Pre-Primary School Graduation', 'The graduation ceremony celebrated learners'' achievements and emphasized the school''s commitment to holistic education and academic excellence.');

-- Truck Trailer Recovery
INSERT INTO articles (title, summary)
VALUES ('Truck Trailer Recovery', 'Piet Retief SAPS recovered a stolen truck trailer, leading to the arrest of a suspect, highlighting law enforcement efforts in the community.');

-- Road Accident Summary
INSERT INTO articles (title, summary)
VALUES ('Road Accident Summary', 'The article summarizes multiple road accidents, emphasizing the importance of vehicle maintenance and caution while driving to prevent injuries and fatalities.');

CREATE UNIQUE INDEX auth_group_permissions_group_id_permission_id_0cd325b0_uniq ON auth_group_permissions (
    group_id,
    permission_id
);
CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON auth_group_permissions (
    group_id
);
CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON auth_group_permissions (
    permission_id
);
CREATE UNIQUE INDEX auth_user_groups_user_id_group_id_94350c0c_uniq ON auth_user_groups (
    user_id,
    group_id
);
CREATE INDEX auth_user_groups_user_id_6a12ed8b ON auth_user_groups (
    user_id
);
CREATE INDEX auth_user_groups_group_id_97559544 ON auth_user_groups (
    group_id
);
CREATE UNIQUE INDEX auth_user_user_permissions_user_id_permission_id_14a6b632_uniq ON auth_user_user_permissions (
    user_id,
    permission_id
);
CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON auth_user_user_permissions (
    user_id
);
CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON auth_user_user_permissions (
    permission_id
);
CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON django_admin_log (
    content_type_id
);
CREATE INDEX django_admin_log_user_id_c564eba6 ON django_admin_log (
    user_id
);
CREATE UNIQUE INDEX django_content_type_app_label_model_76bd3d3b_uniq ON django_content_type (
    app_label,
    model
);
CREATE UNIQUE INDEX auth_permission_content_type_id_codename_01ab375a_uniq ON auth_permission (
    content_type_id,
    codename
);
CREATE INDEX auth_permission_content_type_id_2f476e4b ON auth_permission (
    content_type_id
);
CREATE INDEX django_session_expire_date_a5c62663 ON django_session (
    expire_date
);
CREATE INDEX excelsior_images_article_id_95491d9c ON excelsior_images (
    article_id
);
CREATE INDEX excelsior_category_parent_id_572f561c ON excelsior_category (
    parent_id
);
CREATE INDEX excelsior_articles_author_id_832f63dc ON excelsior_articles (
    author_id
);
CREATE INDEX excelsior_articles_category_id_62aea163 ON excelsior_articles (
    category_id
);
COMMIT;
