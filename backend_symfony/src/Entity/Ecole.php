<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EcoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EcoleRepository::class)]
#[ApiResource]
class Ecole
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $logo = null;

    #[ORM\ManyToMany(targetEntity: Formateur::class, mappedBy: 'idFormateur')]
    private Collection $formateurs;

    #[ORM\OneToMany(targetEntity: Classe::class, mappedBy: 'idEcole')]
    private Collection $classes;

    public function __construct()
    {
        $this->formateurs = new ArrayCollection();
        $this->classes = new ArrayCollection();
    }

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

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(string $logo): static
    {
        $this->logo = $logo;

        return $this;
    }

    /**
     * @return Collection<int, Formateur>
     */
    public function getFormateurs(): Collection
    {
        return $this->formateurs;
    }

    public function addFormateur(Formateur $formateur): static
    {
        if (!$this->formateurs->contains($formateur)) {
            $this->formateurs->add($formateur);
            $formateur->addIdFormateur($this);
        }

        return $this;
    }

    public function removeFormateur(Formateur $formateur): static
    {
        if ($this->formateurs->removeElement($formateur)) {
            $formateur->removeIdFormateur($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, Classe>
     */
    public function getClasses(): Collection
    {
        return $this->classes;
    }

    public function addClass(Classe $class): static
    {
        if (!$this->classes->contains($class)) {
            $this->classes->add($class);
            $class->setIdEcole($this);
        }

        return $this;
    }

    public function removeClass(Classe $class): static
    {
        if ($this->classes->removeElement($class)) {
            // set the owning side to null (unless already changed)
            if ($class->getIdEcole() === $this) {
                $class->setIdEcole(null);
            }
        }

        return $this;
    }
}
