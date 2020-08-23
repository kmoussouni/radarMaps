<?php

namespace App\Document;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * Class Radar
 * @package App\Document
 *
 * @MongoDB\Document
 */
class Radar
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $name;

    /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $speed;

    /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $longitude;

    /**
     * @var string
     *
     * @MongoDB\Field(type="string")
     */
    private $latitude;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Radar
     */
    public function setId($id)
    {
        $this->id = $id;
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
     * @return Radar
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return string
     */
    public function getSpeed(): string
    {
        return $this->speed;
    }

    /**
     * @param string $speed
     * @return Radar
     */
    public function setSpeed(string $speed): Radar
    {
        $this->speed = $speed;
        return $this;
    }

    /**
     * @return string
     */
    public function getLongitude(): string
    {
        return $this->longitude;
    }

    /**
     * @param string $longitude
     * @return Radar
     */
    public function setLongitude(string $longitude): Radar
    {
        $this->longitude = $longitude;
        return $this;
    }

    /**
     * @return string
     */
    public function getLatitude(): string
    {
        return $this->latitude;
    }

    /**
     * @param string $latitude
     * @return Radar
     */
    public function setLatitude(string $latitude): Radar
    {
        $this->latitude = $latitude;
        return $this;
    }
}
