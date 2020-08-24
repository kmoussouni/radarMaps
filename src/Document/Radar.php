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
     * @var float
     *
     * @MongoDB\Field(type="float")
     */
    private $longitude;

    /**
     * @var float
     *
     * @MongoDB\Field(type="float")
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
     * @return float
     */
    public function getLongitude(): float
    {
        return $this->longitude;
    }

    /**
     * @param float $longitude
     * @return Radar
     */
    public function setLongitude(string $longitude): Radar
    {
        $this->longitude = $longitude;
        return $this;
    }

    /**
     * @return float
     */
    public function getLatitude(): float
    {
        return $this->latitude;
    }

    /**
     * @param float $latitude
     * @return Radar
     */
    public function setLatitude(float $latitude): Radar
    {
        $this->latitude = $latitude;
        return $this;
    }
}
