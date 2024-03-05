<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240305134041 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cours_etudiant (cours_id INT NOT NULL, etudiant_id INT NOT NULL, INDEX IDX_B6EA8C3E7ECF78B0 (cours_id), INDEX IDX_B6EA8C3EDDEAB1A3 (etudiant_id), PRIMARY KEY(cours_id, etudiant_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE cours_classe (cours_id INT NOT NULL, classe_id INT NOT NULL, INDEX IDX_E007AEFE7ECF78B0 (cours_id), INDEX IDX_E007AEFE8F5EA509 (classe_id), PRIMARY KEY(cours_id, classe_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cours_etudiant ADD CONSTRAINT FK_B6EA8C3E7ECF78B0 FOREIGN KEY (cours_id) REFERENCES cours (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_etudiant ADD CONSTRAINT FK_B6EA8C3EDDEAB1A3 FOREIGN KEY (etudiant_id) REFERENCES etudiant (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_classe ADD CONSTRAINT FK_E007AEFE7ECF78B0 FOREIGN KEY (cours_id) REFERENCES cours (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cours_classe ADD CONSTRAINT FK_E007AEFE8F5EA509 FOREIGN KEY (classe_id) REFERENCES classe (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE classe ADD id_ecole_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE classe ADD CONSTRAINT FK_8F87BF962734F78B FOREIGN KEY (id_ecole_id) REFERENCES ecole (id)');
        $this->addSql('CREATE INDEX IDX_8F87BF962734F78B ON classe (id_ecole_id)');
        $this->addSql('ALTER TABLE convocation ADD id_etudiant_id INT DEFAULT NULL, ADD examen_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE convocation ADD CONSTRAINT FK_C03B3F5FC5F87C54 FOREIGN KEY (id_etudiant_id) REFERENCES etudiant (id)');
        $this->addSql('ALTER TABLE convocation ADD CONSTRAINT FK_C03B3F5F5C8659A FOREIGN KEY (examen_id) REFERENCES examen (id)');
        $this->addSql('CREATE INDEX IDX_C03B3F5FC5F87C54 ON convocation (id_etudiant_id)');
        $this->addSql('CREATE INDEX IDX_C03B3F5F5C8659A ON convocation (examen_id)');
        $this->addSql('ALTER TABLE cours ADD id_formateur_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE cours ADD CONSTRAINT FK_FDCA8C9C369CFA23 FOREIGN KEY (id_formateur_id) REFERENCES formateur (id)');
        $this->addSql('CREATE INDEX IDX_FDCA8C9C369CFA23 ON cours (id_formateur_id)');
        $this->addSql('ALTER TABLE etudiant ADD id_classe_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE etudiant ADD CONSTRAINT FK_717E22E3F6B192E FOREIGN KEY (id_classe_id) REFERENCES classe (id)');
        $this->addSql('CREATE INDEX IDX_717E22E3F6B192E ON etudiant (id_classe_id)');
        $this->addSql('ALTER TABLE examen ADD id_cours_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE examen ADD CONSTRAINT FK_514C8FEC2E149425 FOREIGN KEY (id_cours_id) REFERENCES cours (id)');
        $this->addSql('CREATE INDEX IDX_514C8FEC2E149425 ON examen (id_cours_id)');
        $this->addSql('ALTER TABLE message ADD id_formateur_id INT DEFAULT NULL, ADD id_etudiant_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F369CFA23 FOREIGN KEY (id_formateur_id) REFERENCES formateur (id)');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FC5F87C54 FOREIGN KEY (id_etudiant_id) REFERENCES etudiant (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307F369CFA23 ON message (id_formateur_id)');
        $this->addSql('CREATE INDEX IDX_B6BD307FC5F87C54 ON message (id_etudiant_id)');
        $this->addSql('ALTER TABLE question ADD id_questionnaire_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E2D8DBD2E FOREIGN KEY (id_questionnaire_id) REFERENCES questionnaire (id)');
        $this->addSql('CREATE INDEX IDX_B6F7494E2D8DBD2E ON question (id_questionnaire_id)');
        $this->addSql('ALTER TABLE questionnaire ADD id_examen_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE questionnaire ADD CONSTRAINT FK_7A64DAF85FDD9BD FOREIGN KEY (id_examen_id) REFERENCES examen (id)');
        $this->addSql('CREATE INDEX IDX_7A64DAF85FDD9BD ON questionnaire (id_examen_id)');
        $this->addSql('ALTER TABLE reponse ADD id_question_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE reponse ADD CONSTRAINT FK_5FB6DEC76353B48 FOREIGN KEY (id_question_id) REFERENCES question (id)');
        $this->addSql('CREATE INDEX IDX_5FB6DEC76353B48 ON reponse (id_question_id)');
        $this->addSql('ALTER TABLE ressource ADD id_cours_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE ressource ADD CONSTRAINT FK_939F45442E149425 FOREIGN KEY (id_cours_id) REFERENCES cours (id)');
        $this->addSql('CREATE INDEX IDX_939F45442E149425 ON ressource (id_cours_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cours_etudiant DROP FOREIGN KEY FK_B6EA8C3E7ECF78B0');
        $this->addSql('ALTER TABLE cours_etudiant DROP FOREIGN KEY FK_B6EA8C3EDDEAB1A3');
        $this->addSql('ALTER TABLE cours_classe DROP FOREIGN KEY FK_E007AEFE7ECF78B0');
        $this->addSql('ALTER TABLE cours_classe DROP FOREIGN KEY FK_E007AEFE8F5EA509');
        $this->addSql('DROP TABLE cours_etudiant');
        $this->addSql('DROP TABLE cours_classe');
        $this->addSql('ALTER TABLE classe DROP FOREIGN KEY FK_8F87BF962734F78B');
        $this->addSql('DROP INDEX IDX_8F87BF962734F78B ON classe');
        $this->addSql('ALTER TABLE classe DROP id_ecole_id');
        $this->addSql('ALTER TABLE convocation DROP FOREIGN KEY FK_C03B3F5FC5F87C54');
        $this->addSql('ALTER TABLE convocation DROP FOREIGN KEY FK_C03B3F5F5C8659A');
        $this->addSql('DROP INDEX IDX_C03B3F5FC5F87C54 ON convocation');
        $this->addSql('DROP INDEX IDX_C03B3F5F5C8659A ON convocation');
        $this->addSql('ALTER TABLE convocation DROP id_etudiant_id, DROP examen_id');
        $this->addSql('ALTER TABLE cours DROP FOREIGN KEY FK_FDCA8C9C369CFA23');
        $this->addSql('DROP INDEX IDX_FDCA8C9C369CFA23 ON cours');
        $this->addSql('ALTER TABLE cours DROP id_formateur_id');
        $this->addSql('ALTER TABLE etudiant DROP FOREIGN KEY FK_717E22E3F6B192E');
        $this->addSql('DROP INDEX IDX_717E22E3F6B192E ON etudiant');
        $this->addSql('ALTER TABLE etudiant DROP id_classe_id');
        $this->addSql('ALTER TABLE examen DROP FOREIGN KEY FK_514C8FEC2E149425');
        $this->addSql('DROP INDEX IDX_514C8FEC2E149425 ON examen');
        $this->addSql('ALTER TABLE examen DROP id_cours_id');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F369CFA23');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FC5F87C54');
        $this->addSql('DROP INDEX IDX_B6BD307F369CFA23 ON message');
        $this->addSql('DROP INDEX IDX_B6BD307FC5F87C54 ON message');
        $this->addSql('ALTER TABLE message DROP id_formateur_id, DROP id_etudiant_id');
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494E2D8DBD2E');
        $this->addSql('DROP INDEX IDX_B6F7494E2D8DBD2E ON question');
        $this->addSql('ALTER TABLE question DROP id_questionnaire_id');
        $this->addSql('ALTER TABLE questionnaire DROP FOREIGN KEY FK_7A64DAF85FDD9BD');
        $this->addSql('DROP INDEX IDX_7A64DAF85FDD9BD ON questionnaire');
        $this->addSql('ALTER TABLE questionnaire DROP id_examen_id');
        $this->addSql('ALTER TABLE reponse DROP FOREIGN KEY FK_5FB6DEC76353B48');
        $this->addSql('DROP INDEX IDX_5FB6DEC76353B48 ON reponse');
        $this->addSql('ALTER TABLE reponse DROP id_question_id');
        $this->addSql('ALTER TABLE ressource DROP FOREIGN KEY FK_939F45442E149425');
        $this->addSql('DROP INDEX IDX_939F45442E149425 ON ressource');
        $this->addSql('ALTER TABLE ressource DROP id_cours_id');
    }
}
