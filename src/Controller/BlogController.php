<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogController
 * @package App\Controller
 */
class BlogController extends AbstractController
{
    /**
     * @Route(name="blog", path="/blog")
     *
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function blog(Request $request, EntityManagerInterface $entityManager)
    {
//        $articles = $this->get('entity')->find('App\Entity\Article');
        $articles = $entityManager->getRepository('App\Entity\Article')->findAll();

//        die(var_dump(count($articles)));

//        foreach($articles as $article) {
//            echo $article->getTitle();
//        }

        return $this->render('Blog/index.html.twig',
            [
                 'articles' => $articles
            ]
        );
    }

    /**
     * @Route(name="blog_show", path="/blog/{slug}")
     *
     * @param Article $article
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    public function show(Article $article, EntityManagerInterface $entityManager)
    {
        return $this->render('Blog/show.html.twig',
            [
                 'article' => $article
            ]
        );
    }
}