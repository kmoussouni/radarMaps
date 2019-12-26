<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * Class User
 * @package App\Entity
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"api_front"}},
 *     denormalizationContext={"groups"={"api_front"}}
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
     * User constructor.
     */
    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }
}
