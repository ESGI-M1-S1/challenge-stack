<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240305135220 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user ADD id_formateur_id INT DEFAULT NULL, ADD id_etudiant_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649369CFA23 FOREIGN KEY (id_formateur_id) REFERENCES formateur (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649C5F87C54 FOREIGN KEY (id_etudiant_id) REFERENCES etudiant (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649369CFA23 ON user (id_formateur_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649C5F87C54 ON user (id_etudiant_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649369CFA23');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649C5F87C54');
        $this->addSql('DROP INDEX UNIQ_8D93D649369CFA23 ON user');
        $this->addSql('DROP INDEX UNIQ_8D93D649C5F87C54 ON user');
        $this->addSql('ALTER TABLE user DROP id_formateur_id, DROP id_etudiant_id');
    }
}
