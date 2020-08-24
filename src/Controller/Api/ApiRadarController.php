<?php

namespace App\Controller\Api;

use App\Document\Radar;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/radar")
 */
class ApiRadarController extends AbstractController
{
    /**
     * @Route("/list", name="list_radar", methods={"GET"})
     * @param DocumentManager $dm
     *
     * @return JsonResponse
     */
    public function index(DocumentManager $dm)
    {
        $radars = $dm->createQueryBuilder()
            ->find(Radar::class);

        return $this->json($radars);
    }
}
