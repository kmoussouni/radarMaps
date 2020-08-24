<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class MapController extends AbstractController
{
    /**
     * @Route("/map", name="map")
     *
     * @param string $apiKey
     *
     * @return Response
     */
    public function index(string $apiKey)
    {
        return $this->render('Map/map.html.twig', [
            'props' => [
                'apiKey' => $apiKey
            ]
        ]);
    }
}
