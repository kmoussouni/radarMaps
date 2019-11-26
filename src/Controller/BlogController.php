<?php

namespace App\Controller;

use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class BlogController
 * @package App\Controller
 */
class BlogController
{
    /**
     * @Route(name="blog", path="/blog")
     *
     * @param Request $request
     * @param EntityManager $entityManager
     * @return Response
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     * @throws \Doctrine\ORM\TransactionRequiredException
     */
    public function blog(Request $request, EntityManager $entityManager)
    {
//        $articles = $this->get('entity')->find('App\Entity\Article');
        $articles = $entityManager->createQueryBuilder()->from('App\Entity\Article', 'a');

        return $this->render('Blog/index.html.twig',
            [
// 'articles' => $articles
 ]
        );
    }
}