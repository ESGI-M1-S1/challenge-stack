<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ExamenRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ExamenRepository::class)]
#[ApiResource]
class Examen
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $note = null;

    #[ORM\OneToMany(targetEntity: Convocation::class, mappedBy: 'examen')]
    private Collection $idConvocation;

    #[ORM\ManyToOne(targetEntity: Cours::class, inversedBy: 'examens')]
    private ?Cours $idCours = null;

    #[ORM\OneToMany(targetEntity: Questionnaire::class, mappedBy: 'idExamen')]
    private Collection $questionnaires;

    public function __construct()
    {
        $this->idConvocation = new ArrayCollection();
        $this->questionnaires = new ArrayCollection();
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

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    /**
     * @return Collection<int, Convocation>
     */
    public function getIdConvocation(): Collection
    {
        return $this->idConvocation;
    }

    public function addIdConvocation(Convocation $idConvocation): static
    {
        if (!$this->idConvocation->contains($idConvocation)) {
            $this->idConvocation->add($idConvocation);
            $idConvocation->setExamen($this);
        }

        return $this;
    }

    public function removeIdConvocation(Convocation $idConvocation): static
    {
        if ($this->idConvocation->removeElement($idConvocation)) {
            // set the owning side to null (unless already changed)
            if ($idConvocation->getExamen() === $this) {
                $idConvocation->setExamen(null);
            }
        }

        return $this;
    }

    public function getIdCours(): ?Cours
    {
        return $this->idCours;
    }

    public function setIdCours(?Cours $idCours): static
    {
        $this->idCours = $idCours;

        return $this;
    }

    /**
     * @return Collection<int, Questionnaire>
     */
    public function getQuestionnaires(): Collection
    {
        return $this->questionnaires;
    }

    public function addQuestionnaire(Questionnaire $questionnaire): static
    {
        if (!$this->questionnaires->contains($questionnaire)) {
            $this->questionnaires->add($questionnaire);
            $questionnaire->setIdExamen($this);
        }

        return $this;
    }

    public function removeQuestionnaire(Questionnaire $questionnaire): static
    {
        if ($this->questionnaires->removeElement($questionnaire)) {
            // set the owning side to null (unless already changed)
            if ($questionnaire->getIdExamen() === $this) {
                $questionnaire->setIdExamen(null);
            }
        }

        return $this;
    }
}
