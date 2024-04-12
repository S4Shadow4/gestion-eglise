-- Active: 1711636334933@@127.0.0.1@3306@gestion-eglise

CREATE TABLE fidele (
    id_fidele INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username_fidele VARCHAR (100) NOT NULL,
    nom_fidele VARCHAR(50) NOT NULL,
    prenom_fidele VARCHAR(50) NOT NULL,
    age_fidele INT NOT NULL,
    sexe_fidele VARCHAR(1) NOT NULL,
    password_fidele VARCHAR(255) NOT NULL,
    contact_fidele VARCHAR(20) NOT NULL,
    CONSTRAINT unique_name UNIQUE (nom_fidele, prenom_fidele)
)
ENGINE = INNODB;

CREATE TABLE identifiants_fideles (
    id_fi INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    /* id_fidele INT UNSIGNED, */
    identifiant VARCHAR(50) UNIQUE,
    nom_fidele VARCHAR(50) NOT NULL,
    prenom_fidele VARCHAR(50) NOT NULL,
    utilise BOOLEAN DEFAULT 0,
    /* FOREIGN KEY (id_fidele) REFERENCES fidele(id_fidele) */
)
ENGINE = INNODB;

DROP table identifiants_fideles;
ALTER TABLE identifiants_fideles ADD COLUMN date_ajout DATETIME DEFAULT now();


CREATE TABLE benevole (
    id_benevole INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username_benevole VARCHAR (100) UNIQUE NOT NULL,
    nom_benevole VARCHAR(50) NOT NULL,
    prenom_benevole VARCHAR(50) NOT NULL,
    age_benevole INT NOT NULL,
    sexe_benevole VARCHAR(1) NOT NULL,
    password_benevole VARCHAR(255) NOT NULL,
    contact_benevole VARCHAR(20) NOT NULL,
    CONSTRAINT unique_name UNIQUE (nom_benevole, prenom_benevole)
)
ENGINE = INNODB;

CREATE TABLE gerants (
    id_gerant INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username_gerants VARCHAR (100) UNIQUE NOT NULL,
    nom_gerant VARCHAR(50) NOT NULL,
    prenom_gerant VARCHAR(50) NOT NULL,
    age_gerant INT NOT NULL,
    sexe_gerant VARCHAR(1) NOT NULL,
    password_gerant VARCHAR(255) NOT NULL,
    contact_gerant VARCHAR(20) NOT NULL,
    CONSTRAINT unique_gerant_name UNIQUE (nom_gerant, prenom_gerant)
)
ENGINE = INNODB;

CREATE TABLE benevolat(
    id_benevolat INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_benevolat VARCHAR(255) UNIQUE,
    description_benevolat VARCHAR(255)
    
)
ENGINE = INNODB;
DROP TABLE benevolat;

ALTER Table benevolat ADD COLUMN date_benevolat DATETIME DEFAULT now();

CREATE TABLE evenements (
    id_evenement INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom_evenement VARCHAR(100) UNIQUE,
    date_evenement DATETIME DEFAULT now(),
    description_evenement TEXT
)
ENGINE = INNODB;
DROP Table evenements;

CREATE TABLE contributions_fidele (
    id_contribution INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_fidele INT UNSIGNED,
    montant DECIMAL(10, 2),
    date_contribution DATETIME DEFAULT now(),
    FOREIGN KEY (id_fidele) REFERENCES fidele(id_fidele)
)
ENGINE = INNODB;

CREATE TABLE contributions_benevole (
    id_contribution INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_benevole INT UNSIGNED,
    montant DECIMAL(10, 2),
    date_contribution DATETIME DEFAULT now(),
    FOREIGN KEY (id_benevole) REFERENCES benevole(id_benevole)
)
ENGINE = INNODB;

CREATE TABLE reservations_fidele (
    id_reservation_fidele_evenement INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_fidele INT UNSIGNED,
    id_evenement INT UNSIGNED,
    nom_evenement VARCHAR(100) UNIQUE,
    date_reservation DATETIME DEFAULT now(),
    FOREIGN KEY (id_fidele) REFERENCES fidele(id_fidele),
    FOREIGN KEY (id_evenement) REFERENCES evenements(id_evenement)
)
ENGINE = INNODB;

DROP Table reservations_fidele;


CREATE TABLE reservation_benevolat_fidele (
    id_benevolat_fidele INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_fidele INT UNSIGNED,
    id_benevolat INT UNSIGNED,
    date_reservation DATETIME DEFAULT now(),
    FOREIGN KEY (id_fidele) REFERENCES fidele(id_fidele),
    FOREIGN KEY (id_benevolat) REFERENCES benevolat(id_benevolat)
)
ENGINE = INNODB;

CREATE TABLE reservation_benevolat_benevole (
    id_benevolat_benevole INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_benevole INT UNSIGNED,
    id_benevolat INT UNSIGNED,
    date_reservation DATETIME DEFAULT now(),
    FOREIGN KEY (id_benevole) REFERENCES benevole(id_benevole),
    FOREIGN KEY (id_benevolat) REFERENCES benevolat(id_benevolat)
)
ENGINE = INNODB; 



drop TABLE benevolat;
drop Table fidele;

drop TABLE benevole;

drop TABLE commentaires_benevole; 
drop Table commentaires_fidele; 
drop TABLE contributions_benevole;
drop Table contributions_fidele; 
drop Table evenements; 
drop Table gerants;

drop TABLE identifiants_fideles; 
drop TABLE reservations_fidele; 


CREATE TABLE identifiant_sequence (
    next_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
);

INSERT INTO identifiant_sequence (next_id) VALUES (1);

DELIMITER //


DELIMITER //

DROP Procedure generate_identifiant;

CREATE PROCEDURE generate_identifiant(
    IN p_nom_fidele VARCHAR(50),
    IN p_prenom_fidele VARCHAR(50)
)
BEGIN
    DECLARE next_id INT UNSIGNED;
    DECLARE next_identifiant VARCHAR(50);
    
    START TRANSACTION;
    
    SELECT COALESCE(MAX(id_fi), 0) + 1 INTO next_id FROM identifiants_fideles;
    
    SET next_identifiant = CONCAT('#', LPAD(next_id, 5, '0'));
    
    INSERT INTO identifiants_fideles (identifiant, nom_fidele, prenom_fidele, utilise) VALUES (next_identifiant, p_nom_fidele, p_prenom_fidele, 0);
    
    COMMIT;
END//

DELIMITER ;




DELIMITER //

CREATE TRIGGER before_insert_identifiant
BEFORE INSERT ON identifiants_fideles
FOR EACH ROW
BEGIN
    DECLARE next_id INT UNSIGNED;
    SET next_id = COALESCE((SELECT MAX(id_fi) FROM identifiants_fideles), 0) + 1;
    SET NEW.identifiant = CONCAT('#', LPAD(next_id, 5, '0'));
END //

DELIMITER ;

CALL generate_identifiant('nom', 'prenom');



drop Table identifiants_fideles;

INSERT INTO identifiants_fideles (id_fidele, identifiant, nom_fidele,prenom_fidele)
VALUES (2, '#0002', 'kodjovi','kwuamissiou');
