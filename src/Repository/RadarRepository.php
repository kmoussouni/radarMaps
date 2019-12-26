<?php

/**
 * PHP VER 7.3
 *
 * @category  PHP 7.3
 * @package   PHP_Radars
 * @author    LeBondev <lebondev@gmail.com>
 * @copyright 2015 Lebondev
 * @license   https://github.com/squizlabs/PHP_CodeSniffer/blob/master/licence.txt BSD Licence
 * @version   Release: @package_version@
 * @link      http://pear.php.net/package/PHP_CodeSniffer
 */

namespace App\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * RadarRepository
 *
 * PHP VER 5.6
 *
 * @link    tag in file comment
 * @author  lebondev <lebondev@gmail.com>
 * @license LGPL
 */
class RadarRepository extends EntityRepository
{
    /**
     * @param $name
     * @return array
     */
    public function findbyName($name)
    {
        return $this->findBy(array("name" => $name));

        return $this->getEntityManager()
            ->createQuery("SELECT * FROM App\Entity\Radar r WHERE r.name = '%$name%'")
            ->getResult();
    }

    /**
     * @param $name
     * @return array
     */
    public function findLimit($limit=0)
    {
        $sql = "SELECT * FROM RadarCoreBundle:Radar";

        if($limit>0) $sql.=" LIMIT $limit";

        return $this->getEntityManager()
            ->createQuery($sql)
            ->getResult();
    }
}
