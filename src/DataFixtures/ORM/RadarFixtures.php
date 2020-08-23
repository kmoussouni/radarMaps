<?php

namespace App\DataFixtures\ORM;

use App\Document\Radar;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\ORMFixtureInterface;
use Doctrine\Bundle\MongoDBBundle\Fixture\ODMFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class RadarFixtures extends Fixture implements ODMFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $radar = new Radar();

        $radar->setName("Radar #1");
        $radar->setSpeed("70km/h");
        $radar->setLatitude("70km/h");
        $radar->setLongitude("70km/h");

        $manager->persist($radar);
        $manager->flush();
    }
}
