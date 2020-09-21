CREATE DATABASE  IF NOT EXISTS `shopping_cart_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `shopping_cart_db`;


DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `idcarts` bigint(20) NOT NULL,
  `idcustomer` bigint(20) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idcarts`),
  KEY `carts_customers_fk_idx` (`idcustomer`),
  CONSTRAINT `carts_customers_fk` FOREIGN KEY (`idcustomer`) REFERENCES `customers` (`idcustomer`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `idcategory` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(20) NOT NULL,
  PRIMARY KEY (`idcategory`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 PACK_KEYS=0;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `idcustomer` bigint(20) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`idcustomer`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lines_item`
--

DROP TABLE IF EXISTS `lines_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lines_item` (
  `idlines_item` bigint(20) NOT NULL AUTO_INCREMENT,
  `idorder` bigint(20) DEFAULT NULL,
  `idproduct` bigint(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `idcart` bigint(20) NOT NULL,
  PRIMARY KEY (`idlines_item`),
  KEY `lines_item_orders_fk_idx` (`idorder`),
  KEY `lines_item_products_fk_idx` (`idproduct`),
  KEY `lines_item_carts_fk_idx` (`idcart`),
  CONSTRAINT `lines_item_orders_fk` FOREIGN KEY (`idorder`) REFERENCES `orders` (`idcustomer`) ON UPDATE CASCADE,
  CONSTRAINT `lines_item_carts_fk` FOREIGN KEY (`idcart`) REFERENCES `carts` (`idcarts`) ON UPDATE CASCADE,
  CONSTRAINT `lines_item_products_fk` FOREIGN KEY (`idproduct`) REFERENCES `products` (`idproduct`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `idorder` bigint(20) NOT NULL AUTO_INCREMENT,
  `ordered` datetime NOT NULL,
  `status` varchar(20) NOT NULL,
  `idcustomer` bigint(20) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idorder`),
  KEY `orders_customers_fk_idx` (`idcustomer`),
  CONSTRAINT `orders_customers_fk` FOREIGN KEY (`idcustomer`) REFERENCES `customers` (`idcustomer`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `idproduct` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `idcategory` int(11) DEFAULT NULL,
  PRIMARY KEY (`idproduct`),
  KEY `products_categories_fk` (`idcategory`),
  CONSTRAINT `products_categories_fk` FOREIGN KEY (`idcategory`) REFERENCES `categories` (`idcategory`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;