<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\Timestampable;

/**
 * Class Quotation
 * @package App\Entity
 *
 * @ApiResource()
 *
 * @ORM\Entity()
 * @ORM\Table(name="quotation")
 */
class Quotation
{
    use Timestampable;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $type;

    /**
     * @ORM\Column(type="string")
     */
    protected $contract;

    /**
     * @ORM\Column(type="string")
     */
    protected $technos;

    /**
     * @ORM\Column(type="string")
     */
    protected $popin;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\Column(type="string")
     */
    protected $mail;

    /**
     * @ORM\Column(type="string")
     */
    protected $text;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return Quotation
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     * @return Quotation
     */
    public function setType($type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getContract()
    {
        return $this->contract;
    }

    /**
     * @param mixed $contract
     * @return Quotation
     */
    public function setContract($contract)
    {
        $this->contract = $contract;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getTechnos()
    {
        return $this->technos;
    }

    /**
     * @param mixed $technos
     * @return Quotation
     */
    public function setTechnos($technos)
    {
        $this->technos = $technos;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPopin()
    {
        return $this->popin;
    }

    /**
     * @param mixed $popin
     * @return Quotation
     */
    public function setPopin($popin)
    {
        $this->popin = $popin;
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
     * @return Quotation
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * @param mixed $mail
     * @return Quotation
     */
    public function setMail($mail)
    {
        $this->mail = $mail;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param mixed $text
     * @return Quotation
     */
    public function setText($text)
    {
        $this->text = $text;
        return $this;
    }
}