<?php

namespace App\DataFixtures\ORM;

use App\Document\Radar;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\MongoDBBundle\Fixture\ODMFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class RadarFixtures extends Fixture implements ODMFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        /** @var string $ascDirectories */
        $ascDirectories = __DIR__.'/../../../assets/asc';

        $files = [
            'FRZoneFR30.asc',
            'FRZoneFR50.asc',
//            'FRZoneFR60.asc',
//            'FRZoneFR70.asc',
//            'FRZoneFR80.asc',
//            'FRZoneFR90.asc',
//            'FRZoneFR110.asc',
//            'FRZoneFR130.asc',
        ];

        foreach ($files as $file) {
            /** @var FILE $fp */
            $fp = fopen($ascDirectories.DIRECTORY_SEPARATOR.$file, 'r');

            $filename = explode('.', $file)[0];
            $speed = substr($filename, strlen($filename)-2, 2);

            if ($fp) {
                while (($buffer = fgets($fp, 4096)) !== false) {
                    $line = explode(',', strval($buffer));

                    $radar = new Radar();

                    $radar->setName(trim(str_replace('"', '', $line[2])));
                    $radar->setSpeed($speed."km/h");
                    $radar->setLatitude(floatval(trim($line[1])));
                    $radar->setLongitude(floatval(trim($line[0])));

                    $manager->persist($radar);
                }
                if (!feof($fp)) {
                    echo "Erreur: fgets() a échoué\n";
                }
                fclose($fp);
            }

            $manager->persist($radar);
            $manager->flush();
        }
    }
}
