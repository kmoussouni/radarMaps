<?php

namespace App\Controller\Api;

use Amp\Serialization\Serializer;
use App\Document\Radar;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api/radar")
 */
class ApiRadarController extends AbstractController
{
    /**
     * @Route("/list", name="list_radar", methods={"GET"})
     * @param DocumentManager $dm
     * @param Serializer $serializer
     *
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Amp\Serialization\SerializationException
     */
    public function index(DocumentManager $dm, Serializer $serializer)
    {
        $radars = $dm->createQueryBuilder()
            ->find(Radar::class);

        return $this->json(
            $serializer->unserialize($radars)
        );
    }
}
