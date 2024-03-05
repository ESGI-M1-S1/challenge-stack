<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CoursRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CoursRepository::class)]
#[ApiResource]
class Cours
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $DateDebut = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $DateFin = null;

    #[ORM\Column(length: 255)]
    private ?string $matiere = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToMany(targetEntity: Etudiant::class, inversedBy: 'cours')]
    private Collection $idCours;

    #[ORM\ManyToOne(inversedBy: 'cours')]
    private ?Formateur $idFormateur = null;

    #[ORM\ManyToMany(targetEntity: Classe::class, inversedBy: 'cours')]
    private Collection $idClasse;

    #[ORM\OneToMany(targetEntity: Examen::class, mappedBy: 'idCours')]
    private Collection $examens;

    #[ORM\OneToMany(targetEntity: Ressource::class, mappedBy: 'idCours')]
    private Collection $ressources;

    public function __construct()
    {
        $this->idCours = new ArrayCollection();
        $this->idClasse = new ArrayCollection();
        $this->examens = new ArrayCollection();
        $this->ressources = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->DateDebut;
    }

    public function setDateDebut(\DateTimeInterface $DateDebut): static
    {
        $this->DateDebut = $DateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->DateFin;
    }

    public function setDateFin(\DateTimeInterface $DateFin): static
    {
        $this->DateFin = $DateFin;

        return $this;
    }

    public function getMatiere(): ?string
    {
        return $this->matiere;
    }

    public function setMatiere(string $matiere): static
    {
        $this->matiere = $matiere;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Etudiant>
     */
    public function getIdCours(): Collection
    {
        return $this->idCours;
    }

    public function addIdCour(Etudiant $idCour): static
    {
        if (!$this->idCours->contains($idCour)) {
            $this->idCours->add($idCour);
        }

        return $this;
    }

    public function removeIdCour(Etudiant $idCour): static
    {
        $this->idCours->removeElement($idCour);

        return $this;
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

    /**
     * @return Collection<int, Classe>
     */
    public function getIdClasse(): Collection
    {
        return $this->idClasse;
    }

    public function addIdClasse(Classe $idClasse): static
    {
        if (!$this->idClasse->contains($idClasse)) {
            $this->idClasse->add($idClasse);
        }

        return $this;
    }

    public function removeIdClasse(Classe $idClasse): static
    {
        $this->idClasse->removeElement($idClasse);

        return $this;
    }

    /**
     * @return Collection<int, Examen>
     */
    public function getExamens(): Collection
    {
        return $this->examens;
    }

    public function addExamen(Examen $examen): static
    {
        if (!$this->examens->contains($examen)) {
            $this->examens->add($examen);
            $examen->setIdCours($this);
        }

        return $this;
    }

    public function removeExamen(Examen $examen): static
    {
        if ($this->examens->removeElement($examen)) {
            // set the owning side to null (unless already changed)
            if ($examen->getIdCours() === $this) {
                $examen->setIdCours(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Ressource>
     */
    public function getRessources(): Collection
    {
        return $this->ressources;
    }

    public function addRessource(Ressource $ressource): static
    {
        if (!$this->ressources->contains($ressource)) {
            $this->ressources->add($ressource);
            $ressource->setIdCours($this);
        }

        return $this;
    }

    public function removeRessource(Ressource $ressource): static
    {
        if ($this->ressources->removeElement($ressource)) {
            // set the owning side to null (unless already changed)
            if ($ressource->getIdCours() === $this) {
                $ressource->setIdCours(null);
            }
        }

        return $this;
    }
}
