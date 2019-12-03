<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Timestampable\Traits\Timestampable;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Class Article
 * @package App\Entity
 *
 * @ApiResource()
 *
 * @ORM\Entity()
 * @ORM\Table(name="article")
 */
class Article
{
    use TimestampableEntity;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="articles")
     */
    protected $user;

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     */
    public $image;

    /**
     * The actual title of the article.
     *
     * @ORM\Column(type="string", nullable=false)
     */
    protected $title;

    /**
     * The actual slug of the article.
     *
     * @ORM\Column(type="string", unique=true, nullable=false)
     * @Gedmo\Slug(fields={"title"})
     */
    protected $slug;

    /**
     * The actual body of the article.
     *
     * @ORM\Column(name="body", type="text", nullable=true)
     */
    protected $body;

    /**
     * Articles may belong to one or more 'sections' in a magazine or newspaper, such as Sports, Lifestyle, etc.
     *
     * @ORM\Column(name="section", type="string", nullable=true)
     */
    protected $section;

    /**
     * For an Article, typically a NewsArticle, the backstory property provides a textual summary giving a brief
     * explanation of why and how an article was created. In a journalistic setting this could include information
     * about reporting process, methods, interviews, data sources, etc.
     *
     * @ORM\Column(name="back_story", type="text")
     */
    protected $backStory;

    /**
     * Indicates sections of a Web page that are particularly 'speakable' in the sense of being highlighted as being
     * especially appropriate for text-to-speech conversion. Other sections of a page may also be usefully spoken in
     * particular circumstances; the 'speakable' property serves to indicate the parts most likely to be generally
     * useful for speech.
     *
     * @var string
     * @ORM\Column(name="speakable", type="string")
     */
    protected $speakable = '';
    /**
     * @var int
     * @ORM\Column(name="word_count", type="integer")
     */
    protected $wordCount = 0;

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
     * @return Article
     */
    public function setUser($user)
    {
        $this->user = $user;
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
     * @return Article
     */
    public function setImage(?MediaObject $image): Article
    {
        $this->image = $image;
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
     * @return Article
     */
    public function setBody($body)
    {
        $this->body = $body;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSection()
    {
        return $this->section;
    }

    /**
     * @param mixed $section
     * @return Article
     */
    public function setSection($section)
    {
        $this->section = $section;
        return $this;
    }

    /**
     * @return string
     */
    public function getBackStory(): string
    {
        return $this->backStory;
    }

    /**
     * @param string $backStory
     * @return Article
     */
    public function setBackStory(string $backStory): Article
    {
        $this->backStory = $backStory;
        return $this;
    }

    /**
     * @return string
     */
    public function getSpeakable(): string
    {
        return $this->speakable;
    }

    /**
     * @param string $speakable
     * @return Article
     */
    public function setSpeakable(string $speakable): Article
    {
        $this->speakable = $speakable;
        return $this;
    }

    /**
     * @return int
     */
    public function getWordCount(): int
    {
        return $this->wordCount;
    }

    /**
     * @param int $wordCount
     * @return Article
     */
    public function setWordCount(int $wordCount): Article
    {
        $this->wordCount = $wordCount;
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
     * @return Article
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param mixed $slug
     * @return Article
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }
}
