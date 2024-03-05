<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    private ?string $mdp = null;

    #[ORM\Column(length: 255)]
    private ?string $pdp = null;

    #[ORM\Column]
    private array $roles = ["USER"];

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Formateur $idFormateur = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Etudiant $idEtudiant = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getMdp(): ?string
    {
        return $this->mdp;
    }

    public function setMdp(string $mdp): static
    {
        $this->mdp = $mdp;

        return $this;
    }

    public function getPdp(): ?string
    {
        return $this->pdp;
    }

    public function setPdp(string $pdp): static
    {
        $this->pdp = $pdp;

        return $this;
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }


    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'USER';

        return array_unique($roles);
    }

    public function getIdFormateur(): ?Formateur
    {
        return $this->idFormateur;
    }

    public function setIdFormateur(?Formateur $idFormateur): static
    {
        $this->idFormateur = $idFormateur;

        return $this;
    }

    public function getIdEtudiant(): ?Etudiant
    {
        return $this->idEtudiant;
    }

    public function setIdEtudiant(?Etudiant $idEtudiant): static
    {
        $this->idEtudiant = $idEtudiant;

        return $this;
    }
}
