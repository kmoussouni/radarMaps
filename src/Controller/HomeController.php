<?php

namespace App\Controller;

use Knp\Bundle\SnappyBundle\Snappy\Response\PdfResponse;
use Knp\Snappy\Pdf;
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

    /**
     * @Route(name="resume", path="/resume")
     * @return Response
     */
    public function resume()
    {
        $experiences = $this->getDoctrine()->getManager()->getRepository('App\Entity\Experience')->findAll();
        $projects = $this->getDoctrine()->getManager()->getRepository('App\Entity\Project')->findAll();

        return $this->render('Resume/resume.html.twig',
            [
                'experiences' => $experiences,
                'projects' => $projects
            ]
        );
    }

    /**
     * @Route(name="resume_pdf", path="/resume/pdf")
     * @return Response
     */
    public function resumePdf(Pdf $pdf)
    {
        $experiences = $this->getDoctrine()->getManager()->getRepository('App\Entity\Experience')->findAll();
        $projects = $this->getDoctrine()->getManager()->getRepository('App\Entity\Project')->findAll();

        $html = $this->renderView('Resume/resume.html.twig',
            [
                'experiences' => $experiences,
                'projects' => $projects
            ]
        );

        return new PdfResponse(
            $pdf->getOutputFromHtml($html), 'file.pdf');
    }
}