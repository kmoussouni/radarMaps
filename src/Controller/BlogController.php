<?php

namespace App\Controller;

use ApiPlatform\Core\Bridge\Symfony\Routing\RouteNameGenerator;
use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogController
 * @package App\Controller
 */
class BlogController extends Controller
{
    /**
     * @Route(name="blog", path="/blog")
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @param Pagerfanta $pagerfanta
     * @param RouteNameGenerator $routeNameGenerator
     * @return Response
     */
    public function blog(Request $request, EntityManagerInterface $entityManager)
    {
        $queryBuilder = $entityManager->createQueryBuilder()
            ->select('a')
            ->from('App:Article', 'a');

        $adapter = new DoctrineORMAdapter($queryBuilder);
        $pagerfanta = new Pagerfanta($adapter);

        $pagerfanta->setMaxPerPage(5);

        if($request->get('page')) $pagerfanta->setCurrentPage($request->get('page'));

        return $this->render('Blog/index.html.twig', [
            'pager' => $pagerfanta
        ]);
    }

    /**
     * @Route(name="blog_show", path="/blog/{slug}")
     *
     * @param Article $article
     * @return Response
     */
    public function show(Article $article)
    {
        if(!$article) {
            throw $this->createNotFoundException('The article does not exist');
        }

        return $this->render('Blog/show.html.twig',
            [
                 'article' => $article
            ]
        );
    }
}