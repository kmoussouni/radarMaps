<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * Class Experience
 * @package App\Entity
 *
 * @ApiResource()
 *
 * @ORM\Entity()
 * @ORM\Table(name="client")
 */
class Client
{
    use TimestampableEntity;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="clients")
     * @MaxDepth(1)
     */
    protected $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Experience", mappedBy="client")
     * @MaxDepth(1)
     */
    protected $experiences;

    /**
     * The name of the client.
     *
     * @ORM\Column(name="name", type="string", nullable=false)
     */
    protected $name;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\MediaObject")
     * @ORM\JoinColumn(nullable=true)
     */
    public $image;

    /**
     * @ORM\Column(name="location", type="string", nullable=false)
     */
    protected $location;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     * @return Client
     */
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     * @return Client
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return MediaObject|null
     */
    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    /**
     * @param MediaObject|null $image
     * @return Client
     */
    public function setImage(?MediaObject $image): Client
    {
        $this->image = $image;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * @param mixed $location
     * @return Client
     */
    public function setLocation($location)
    {
        $this->location = $location;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getExperiences()
    {
        return $this->experiences;
    }

    /**
     * @param mixed $experience
     * @return Client
     */
    public function setExperiences($experiences)
    {
        $this->experiences = $experiences;
        return $this;
    }

    /**
     * @param mixed $experience
     * @return Client
     */
    public function addExperience($experience)
    {
        $this->experiences->add($experience);
        return $this;
    }

    /**
     * @param mixed $experience
     * @return Client
     */
    public function hasExperience($experience)
    {
        return $this->experiences->contains($experience);
    }

    /**
     * @param mixed $experience
     * @return Client
     */
    public function removeExperience($experience)
    {
        $this->experiences->remove($experience);
        return $this;
    }


}