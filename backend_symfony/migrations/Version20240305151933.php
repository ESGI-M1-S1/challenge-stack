<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240305151933 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE classe (id INT AUTO_INCREMENT NOT NULL, id_ecole_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, logo VARCHAR(255) NOT NULL, INDEX IDX_8F87BF962734F78B (id_ecole_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE convocation (id INT AUTO_INCREMENT NOT NULL, id_etudiant_id INT DEFAULT NULL, examen_id INT DEFAULT NULL, date DATE NOT NULL, salle VARCHAR(255) NOT NULL, INDEX IDX_C03B3F5FC5F87C54 (id_etudiant_id), INDEX IDX_C03B3F5F5C8659A (examen_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cours (id INT AUTO_INCREMENT NOT NULL, id_formateur_id INT DEFAULT NULL, date_debut DATE NOT NULL, date_fin DATE NOT NULL, matiere VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, INDEX IDX_FDCA8C9C369CFA23 (id_formateur_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cours_etudiant (cours_id INT NOT NULL, etudiant_id INT NOT NULL, INDEX IDX_B6EA8C3E7ECF78B0 (cours_id), INDEX IDX_B6EA8C3EDDEAB1A3 (etudiant_id), PRIMARY KEY(cours_id, etudiant_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cours_classe (cours_id INT NOT NULL, classe_id INT NOT NULL, INDEX IDX_E007AEFE7ECF78B0 (cours_id), INDEX IDX_E007AEFE8F5EA509 (classe_id), PRIMARY KEY(cours_id, classe_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ecole (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, logo VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE etudiant (id INT AUTO_INCREMENT NOT NULL, id_classe_id INT DEFAULT NULL, INDEX IDX_717E22E3F6B192E (id_classe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE examen (id INT AUTO_INCREMENT NOT NULL, id_cours_id INT DEFAULT NULL, note INT NOT NULL, INDEX IDX_514C8FEC2E149425 (id_cours_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE formateur (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE formateur_ecole (formateur_id INT NOT NULL, ecole_id INT NOT NULL, INDEX IDX_D4C2DC94155D8F51 (formateur_id), INDEX IDX_D4C2DC9477EF1B1E (ecole_id), PRIMARY KEY(formateur_id, ecole_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE formateur_classe (formateur_id INT NOT NULL, classe_id INT NOT NULL, INDEX IDX_A758BDBE155D8F51 (formateur_id), INDEX IDX_A758BDBE8F5EA509 (classe_id), PRIMARY KEY(formateur_id, classe_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE message (id INT AUTO_INCREMENT NOT NULL, id_formateur_id INT DEFAULT NULL, id_etudiant_id INT DEFAULT NULL, contenu VARCHAR(255) NOT NULL, date_envoi DATE NOT NULL, INDEX IDX_B6BD307F369CFA23 (id_formateur_id), INDEX IDX_B6BD307FC5F87C54 (id_etudiant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE post (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, slug VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE question (id INT AUTO_INCREMENT NOT NULL, id_questionnaire_id INT DEFAULT NULL, question VARCHAR(255) NOT NULL, INDEX IDX_B6F7494E2D8DBD2E (id_questionnaire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE questionnaire (id INT AUTO_INCREMENT NOT NULL, id_examen_id INT DEFAULT NULL, titre VARCHAR(255) NOT NULL, date DATE NOT NULL, INDEX IDX_7A64DAF85FDD9BD (id_examen_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reponse (id INT AUTO_INCREMENT NOT NULL, id_question_id INT DEFAULT NULL, reponse VARCHAR(255) NOT NULL, INDEX IDX_5FB6DEC76353B48 (id_question_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ressource (id INT AUTO_INCREMENT NOT NULL, id_cours_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_939F45442E149425 (id_cours_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, id_formateur_id INT DEFAULT NULL, id_etudiant_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, mdp VARCHAR(255) NOT NULL, pdp VARCHAR(255) NOT NULL, roles JSON NOT NULL, UNIQUE INDEX UNIQ_8D93D649369CFA23 (id_formateur_id), UNIQUE INDEX UNIQ_8D93D649C5F87C54 (id_etudiant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE classe ADD CONSTRAINT FK_8F87BF962734F78B FOREIGN KEY (id_ecole_id) REFERENCES ecole (id)');
        $this->addSql('ALTER TABLE convocation ADD CONSTRAINT FK_C03B3F5FC5F87C54 FOREIGN KEY (id_etudiant_id) REFERENCES etudiant (id)');
        $this->addSql('ALTER TABLE convocation ADD CONSTRAINT FK_C03B3F5F5C8659A FOREIGN KEY (examen_id) REFERENCES examen (id)');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9C369CFA23 FOREIGN KEY (id_formateur_id) REFERENCES formateur (id)');
        $this->addSql('ALTER TABLE cours_etudiant ADD CONSTRAINT FK_B6EA8C3E7ECF78B0 FOREIGN KEY (cours_id) REFERENCES cours (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_etudiant ADD CONSTRAINT FK_B6EA8C3EDDEAB1A3 FOREIGN KEY (etudiant_id) REFERENCES etudiant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_classe ADD CONSTRAINT FK_E007AEFE7ECF78B0 FOREIGN KEY (cours_id) REFERENCES cours (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_classe ADD CONSTRAINT FK_E007AEFE8F5EA509 FOREIGN KEY (classe_id) REFERENCES classe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE etudiant ADD CONSTRAINT FK_717E22E3F6B192E FOREIGN KEY (id_classe_id) REFERENCES classe (id)');
        $this->addSql('ALTER TABLE examen ADD CONSTRAINT FK_514C8FEC2E149425 FOREIGN KEY (id_cours_id) REFERENCES cours (id)');
        $this->addSql('ALTER TABLE formateur_ecole ADD CONSTRAINT FK_D4C2DC94155D8F51 FOREIGN KEY (formateur_id) REFERENCES formateur (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE formateur_ecole ADD CONSTRAINT FK_D4C2DC9477EF1B1E FOREIGN KEY (ecole_id) REFERENCES ecole (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE formateur_classe ADD CONSTRAINT FK_A758BDBE155D8F51 FOREIGN KEY (formateur_id) REFERENCES formateur (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE formateur_classe ADD CONSTRAINT FK_A758BDBE8F5EA509 FOREIGN KEY (classe_id) REFERENCES classe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F369CFA23 FOREIGN KEY (id_formateur_id) REFERENCES formateur (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FC5F87C54 FOREIGN KEY (id_etudiant_id) REFERENCES etudiant (id)');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E2D8DBD2E FOREIGN KEY (id_questionnaire_id) REFERENCES questionnaire (id)');
        $this->addSql('ALTER TABLE questionnaire ADD CONSTRAINT FK_7A64DAF85FDD9BD FOREIGN KEY (id_examen_id) REFERENCES examen (id)');
        $this->addSql('ALTER TABLE reponse ADD CONSTRAINT FK_5FB6DEC76353B48 FOREIGN KEY (id_question_id) REFERENCES question (id)');
        $this->addSql('ALTER TABLE ressource ADD CONSTRAINT FK_939F45442E149425 FOREIGN KEY (id_cours_id) REFERENCES cours (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649369CFA23 FOREIGN KEY (id_formateur_id) REFERENCES formateur (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649C5F87C54 FOREIGN KEY (id_etudiant_id) REFERENCES etudiant (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE classe DROP FOREIGN KEY FK_8F87BF962734F78B');
        $this->addSql('ALTER TABLE convocation DROP FOREIGN KEY FK_C03B3F5FC5F87C54');
        $this->addSql('ALTER TABLE convocation DROP FOREIGN KEY FK_C03B3F5F5C8659A');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9C369CFA23');
        $this->addSql('ALTER TABLE cours_etudiant DROP FOREIGN KEY FK_B6EA8C3E7ECF78B0');
        $this->addSql('ALTER TABLE cours_etudiant DROP FOREIGN KEY FK_B6EA8C3EDDEAB1A3');
        $this->addSql('ALTER TABLE cours_classe DROP FOREIGN KEY FK_E007AEFE7ECF78B0');
        $this->addSql('ALTER TABLE cours_classe DROP FOREIGN KEY FK_E007AEFE8F5EA509');
        $this->addSql('ALTER TABLE etudiant DROP FOREIGN KEY FK_717E22E3F6B192E');
        $this->addSql('ALTER TABLE examen DROP FOREIGN KEY FK_514C8FEC2E149425');
        $this->addSql('ALTER TABLE formateur_ecole DROP FOREIGN KEY FK_D4C2DC94155D8F51');
        $this->addSql('ALTER TABLE formateur_ecole DROP FOREIGN KEY FK_D4C2DC9477EF1B1E');
        $this->addSql('ALTER TABLE formateur_classe DROP FOREIGN KEY FK_A758BDBE155D8F51');
        $this->addSql('ALTER TABLE formateur_classe DROP FOREIGN KEY FK_A758BDBE8F5EA509');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F369CFA23');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FC5F87C54');
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494E2D8DBD2E');
        $this->addSql('ALTER TABLE questionnaire DROP FOREIGN KEY FK_7A64DAF85FDD9BD');
        $this->addSql('ALTER TABLE reponse DROP FOREIGN KEY FK_5FB6DEC76353B48');
        $this->addSql('ALTER TABLE ressource DROP FOREIGN KEY FK_939F45442E149425');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649369CFA23');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649C5F87C54');
        $this->addSql('DROP TABLE classe');
        $this->addSql('DROP TABLE convocation');
        $this->addSql('DROP TABLE cours');
        $this->addSql('DROP TABLE cours_etudiant');
        $this->addSql('DROP TABLE cours_classe');
        $this->addSql('DROP TABLE ecole');
        $this->addSql('DROP TABLE etudiant');
        $this->addSql('DROP TABLE examen');
        $this->addSql('DROP TABLE formateur');
        $this->addSql('DROP TABLE formateur_ecole');
        $this->addSql('DROP TABLE formateur_classe');
        $this->addSql('DROP TABLE message');
        $this->addSql('DROP TABLE post');
        $this->addSql('DROP TABLE question');
        $this->addSql('DROP TABLE questionnaire');
        $this->addSql('DROP TABLE reponse');
        $this->addSql('DROP TABLE ressource');
        $this->addSql('DROP TABLE user');
    }
}
