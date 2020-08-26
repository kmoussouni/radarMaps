<?php

namespace App\Controller\Api;

use App\Document\Radar;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
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
     *
     * @param DocumentManager $dm
     * @param SerializerInterface $serializer
     *
     * @return Response
     */
    public function index(DocumentManager $dm, SerializerInterface $serializer)
    {
        $radars = $dm->createQueryBuilder()
            ->find(Radar::class);

//        dd($radars);

//        dd($serializer->serialize($radars[0], 'json'));
        return new Response($serializer->serialize($radars, 'json'));
//        return $this->json($radars);
    }
}
