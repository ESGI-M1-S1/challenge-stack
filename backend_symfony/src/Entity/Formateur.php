<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FormateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FormateurRepository::class)]
#[ApiResource]
class Formateur
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToMany(targetEntity: Ecole::class, inversedBy: 'formateurs')]
    private Collection $idFormateur;

    #[ORM\ManyToMany(targetEntity: Classe::class, inversedBy: 'formateurs')]
    private Collection $formateur;

    #[ORM\OneToMany(targetEntity: Message::class, mappedBy: 'idFormateur')]
    private Collection $messages;

    #[ORM\OneToMany(targetEntity: Cours::class, mappedBy: 'idFormateur')]
    private Collection $cours;

    public function __construct()
    {
        $this->idFormateur = new ArrayCollection();
        $this->formateur = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->cours = new ArrayCollection();
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

    /**
     * @return Collection<int, Ecole>
     */
    public function getIdFormateur(): Collection
    {
        return $this->idFormateur;
    }

    public function addIdFormateur(Ecole $idFormateur): static
    {
        if (!$this->idFormateur->contains($idFormateur)) {
            $this->idFormateur->add($idFormateur);
        }

        return $this;
    }

    public function removeIdFormateur(Ecole $idFormateur): static
    {
        $this->idFormateur->removeElement($idFormateur);

        return $this;
    }

    /**
     * @return Collection<int, Classe>
     */
    public function getFormateur(): Collection
    {
        return $this->formateur;
    }

    public function addFormateur(Classe $formateur): static
    {
        if (!$this->formateur->contains($formateur)) {
            $this->formateur->add($formateur);
        }

        return $this;
    }

    public function removeFormateur(Classe $formateur): static
    {
        $this->formateur->removeElement($formateur);

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setIdFormateur($this);
        }

        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            // set the owning side to null (unless already changed)
            if ($message->getIdFormateur() === $this) {
                $message->setIdFormateur(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Cours>
     */
    public function getCours(): Collection
    {
        return $this->cours;
    }

    public function addCour(Cours $cour): static
    {
        if (!$this->cours->contains($cour)) {
            $this->cours->add($cour);
            $cour->setIdFormateur($this);
        }

        return $this;
    }

    public function removeCour(Cours $cour): static
    {
        if ($this->cours->removeElement($cour)) {
            // set the owning side to null (unless already changed)
            if ($cour->getIdFormateur() === $this) {
                $cour->setIdFormateur(null);
            }
        }

        return $this;
    }
}
