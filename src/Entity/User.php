<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\MaxDepth;

/**
 * Class User
 * @package App\Entity
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"user", "user:read"}},
 *     denormalizationContext={"groups"={"user", "user:write"}}
 * )
 *
 * @ORM\Entity()
 * @ORM\Table(name="user")
 */
class User extends BaseUser
{
    use TimestampableEntity;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\OneToMany(targetEntity="Article", mappedBy="user")
     * @MaxDepth(1)
     */
    protected $articles;

    /**
     * @ORM\OneToMany(targetEntity="Project", mappedBy="user")
     * @MaxDepth(1)
     */
    protected $projects;

    /**
     * @ORM\OneToMany(targetEntity="Experience", mappedBy="user")
     * @MaxDepth(1)
     */
    protected $experiences;

    /**
     * @ORM\OneToMany(targetEntity="Client", mappedBy="user")
     * @MaxDepth(1)
     */
    protected $clients;

    /**
     * User constructor.
     */
    public function __construct()
    {
//        $this->createdAt = new Date();
//        $this->updatedAt = new Date();
    }

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
    public function getProjects()
    {
        return $this->projects;
    }

    /**
     * @param mixed $projects
     * @return User
     */
    public function setProjects($projects)
    {
        $this->projects = $projects;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getArticles()
    {
        return $this->articles;
    }

    /**
     * @param mixed $articles
     * @return User
     */
    public function setArticles($articles)
    {
        $this->articles = $articles;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getClients()
    {
        return $this->clients;
    }

    /**
     * @param mixed $clients
     * @return User
     */
    public function setClients($clients)
    {
        $this->clients = $clients;
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
     * @param mixed $experiences
     * @return User
     */
    public function setExperiences($experiences)
    {
        $this->experiences = $experiences;
        return $this;
    }
}
