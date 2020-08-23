<?php

namespace App\Controller;

use App\Document\Radar;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MapController extends AbstractController
{
    /**
     * @Route("/map", name="map")
     */
    public function index(DocumentManager $dm)
    {
        $radars = $dm->createQueryBuilder()
            ->find(Radar::class);

        return $this->render('Map/map.html.twig', [
            'props' => [
                'radars' => $radars,
            ]
        ]);
    }
}
