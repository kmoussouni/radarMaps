<?php

namespace App\Controller;

use App\Document\Radar;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class MapController extends AbstractController
{
    /**
     * @Route("/map", name="map")
     *
     * @param DocumentManager $dm
     * @param string $apiKey
     *
     * @return Response
     */
    public function index(DocumentManager $dm, string $apiKey)
    {
        $radars = $dm->createQueryBuilder()
            ->find(Radar::class);

        return $this->render('Map/map.html.twig', [
            'props' => [
                'apiKey' => $apiKey,
                'radars' => $radars
            ]
        ]);
    }
}
