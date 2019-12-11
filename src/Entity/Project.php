<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Class Project
 * @package App\Entity
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"api_front"}},
 *     denormalizationContext={"groups"={"api_front"}}
 * )
 *
 * @ORM\Entity()
 * @ORM\Table(name="project")
 */
class Project
{
    use TimestampableEntity;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="projects")
     */
    protected $user;

    /**
     * @ORM\Column(type="string", length=255)
     * @var string
     */
    protected $title;

    /**
     * @ORM\Column(type="text", length=255)
     * @var string
     */
    protected $body;

    /**
     * @ORM\Column(type="string", length=255)
     * @var string
     */
    protected $demoUrl;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     */
    public $image;

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
     * @return Project
     */
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     * @return Project
     */
    public function setTitle(string $title): Project
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return string
     */
    public function getBody(): string
    {
        return $this->body;
    }

    /**
     * @param string $body
     * @return Project
     */
    public function setBody(string $body): Project
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return string
     */
    public function getDemoUrl(): string
    {
        return $this->demoUrl;
    }

    /**
     * @param string $demoUrl
     * @return Project
     */
    public function setDemoUrl(string $demoUrl): Project
    {
        $this->demoUrl = $demoUrl;
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
     * @return Project
     */
    public function setImage(?MediaObject $image): Project
    {
        $this->image = $image;
        return $this;
    }
}