<?php

namespace App\Entity;

use App\Controller\Api\Action\CreateMediaObjectAction;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Class Post
 * @package App\Entity
 *
 * @ApiResource(
 *     normalizationContext={"groups"={"api_front"}},
 *     denormalizationContext={"groups"={"api_front"}},
 *     collectionOperations={
 *         "post"={
 *             "controller"=CreateMediaObjectAction::class,
 *             "deserialize"=false,
 *             "access_control"="is_granted('ROLE_USER')",
 *             "validation_groups"={"Default", "media_object_create"},
 *             "openapi_context"={
 *                 "requestBody"={
 *                     "content"={
 *                         "multipart/form-data"={
 *                             "schema"={
 *                                 "type"="object",
 *                                 "properties"={
 *                                     "file"={
 *                                         "type"="string",
 *                                         "format"="binary"
 *                                     }
 *                                 }
 *                             }
 *                         }
 *                     }
 *                 }
 *             }
 *         },
 *         "get"
 *     },
 *     itemOperations={
 *         "get",
 *         "put"
 * })
 *
 * @Vich\Uploadable
 *
 * @ORM\Entity()
 * @ORM\Table(name="media_object")
 */
class MediaObject
{
    use TimestampableEntity;

    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="articles")
     * @ApiProperty()
     * @Groups({"api_front"})
     */
    protected $user;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string")
     * @ApiProperty()
     * @Groups({"api_front"})
     */
    public $contentUrl;

    /**
     * @var File|null
     *
     * @Assert\NotNull(groups={"media_object_create"})
     * @Groups({"api_front"})
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="filePath", size="fileSize")
     */
    public $file;

    /**
     * @var string|null
     *
     * @Groups({"api_front"})
     * @ORM\Column(nullable=false)
     */
    public $filePath;

    /**
     * @var string|null
     *
     * @Groups({"api_front"})
     * @ORM\Column(nullable=true)
     */
    public $fileSize;

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
     * @return MediaObject
     */
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getContentUrl(): ?string
    {
        return $this->contentUrl;
    }

    /**
     * @param string|null $contentUrl
     * @return MediaObject
     */
    public function setContentUrl(?string $contentUrl): MediaObject
    {
        $this->contentUrl = $contentUrl;
        return $this;
    }

    /**
     * @return File|null
     */
    public function getFile(): ?File
    {
        return $this->file;
    }

    /**
     * @param File|null $file
     * @return MediaObject
     */
    public function setFile(?File $file): MediaObject
    {
        $this->file = $file;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @param string|null $filePath
     * @return MediaObject
     */
    public function setFilePath(?string $filePath): MediaObject
    {
        $this->filePath = $filePath;
        return $this;
    }

    /**
     * @return string|null
     */
    public function getFileSize(): ?string
    {
        return $this->fileSize;
    }

    /**
     * @param string|null $fileSize
     * @return MediaObject
     */
    public function setFileSize(?string $fileSize): MediaObject
    {
        $this->fileSize = $fileSize;
        return $this;
    }
}
