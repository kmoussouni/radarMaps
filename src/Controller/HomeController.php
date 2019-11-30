<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class HomeController
 * @package App\Controller
 */
class HomeController extends AbstractController
{
    /**
     * @Route(name="home", path="/")
     * @return Response
     */
    public function home()
    {
        $experiences = $this->getDoctrine()->getManager()->getRepository('App\Entity\Experience')->findAll();
        $projects = $this->getDoctrine()->getManager()->getRepository('App\Entity\Project')->findAll();

        return $this->render('Home/home.html.twig',
            [
                'experiences' => $experiences,
                'projects' => $projects
            ]
        );
    }

}