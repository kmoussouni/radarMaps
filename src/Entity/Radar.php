<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use DateTime;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Radar
 * @ApiResource(
 *     normalizationContext={"groups"={"api_front"}},
 *     denormalizationContext={"groups"={"api_front"}}
 * )
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="App\Repository\RadarRepository")
 */
class Radar
{
    use TimestampableEntity;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    private $name;

    /**
     * @var string
     *
     * @ORM\Column(name="speed", type="string", length=255)
     */
    private $speed;

    /**
     * @var string
     *
     * @ORM\Column(name="longitude", type="string", length=255)
     */
    private $longitude;

    /**
     * @var string
     *
     * @ORM\Column(name="latitude", type="string", length=255)
     */
    private $latitude;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->updatedAt = new DateTime();
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param string $name
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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $speed
     * @return Radar
     */
    public function setSpeed($speed)
    {
        $this->speed = $speed;

        return $this;
    }

    /**
     * @return string
     */
    public function getSpeed()
    {
        return $this->speed;
    }

    /**
     * @param string $longitude
     * @return Radar
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return string
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * @param string $latitude
     * @return Radar
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @return string
     */
    public function getLatitude()
    {
        return $this->latitude;
    }
    
    /**
     * Get the formatted name to display (NAME name or speed)
     *
     * @param $separator: the separator between name and firstname (default: ' ')
     * @return String
     */
    public function getUsedRadar($separator = ' '){
        if($this->getName()!=null && $this->getSpeed()!=null){
            return ucfirst(strtolower($this->getSpeed())).$separator.strtoupper($this->getName());
        }
        else{
            return $this->getName();
        }
    }

    public function __toString()
    {
        return $this->getName();
    }
}
