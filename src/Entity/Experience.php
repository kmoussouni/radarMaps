<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Experience
 * @package App\Entity
 *
 * @ORM\Entity()
 * @ORM\Table(name="experience")
 */
class Experience
{
    use TimestampableEntity;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="experiences")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Client", inversedBy="experiences", fetch="EAGER")
     */
    protected $client;

    /**
     * @ORM\Column(type="string", nullable=false)
     */
    protected $title;

    /**
     * var DateTime
     * @ORM\Column(type="datetime", nullable=false)
     */
    protected $startDate;

    /**
     * var DateTime
     * @ORM\Column(type="datetime", nullable=false)
     */
    protected $endDate;

    /**
     * @ORM\Column(type="text", nullable=false)
     */
    protected $body;

    /**
     * Experience constructor.
     */
    public function __construct()
    {
//        $this->startDate = new Date();
//        $this->endDate = new Date();
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
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     * @return Experience
     */
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     * @return Experience
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * @param mixed $startDate
     * @return Experience
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * @param mixed $endDate
     * @return Experience
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
        $this->endDate = $endDate;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getBody()
    {
        return $this->body;
    }

    /**
     * @param mixed $body
     * @return Experience
     */
    public function setBody($body)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getClient()
    {
        return $this->client;
    }

    /**
     * @param mixed $client
     * @return Experience
     */
    public function setClient($client)
    {
        $this->client = $client;
        return $this;
    }
}