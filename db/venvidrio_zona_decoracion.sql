-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-06-2026 a las 17:47:25
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `venvidrio_zona_decoracion`
--
CREATE DATABASE IF NOT EXISTS `venvidrio_zona_decoracion` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `venvidrio_zona_decoracion`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envases_decorados`
--
CREATE TABLE `envases_decorados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_decorada` date NOT NULL,
  `cantidad_decorada` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envases_defectuoso`
--
CREATE TABLE `envases_defectuoso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_produccion` date NOT NULL,
  `cantidad_defectuosa` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_pantalla_cambio_cabecera`
--
CREATE TABLE `formato_pantalla_cambio_cabecera` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `turno` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `maquina_decoradora` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `molde` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `elaborado_por` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `revisado_por` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `observaciones` text COLLATE utf8mb4_general_ci,
  `defectos_reportado_selector` text COLLATE utf8mb4_general_ci,
  `pantallas_cambiadas_1er_c` int(11) DEFAULT '0',
  `pantallas_cambiadas_2do_c` int(11) DEFAULT '0',
  `pantallas_cambiadas_3er_c` int(11) DEFAULT '0',
  `pantallas_cambiadas_1er_h` int(11) DEFAULT '0',
  `pantallas_cambiadas_2do_h` int(11) DEFAULT '0',
  `pantallas_cambiadas_3er_h` int(11) DEFAULT '0',
  `total_pantallas` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_pantalla_cambio_preguntas`
--
CREATE TABLE `formato_pantalla_cambio_preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_defecto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formato_pantalla_cambio_preguntas`
--
INSERT INTO `formato_pantalla_cambio_preguntas` (`id`, `nombre_defecto`, `estado`) VALUES
(1, 'Dec Sobre Costura', 1),
(2, 'Decorado Borroso', 1),
(3, 'Decorado Fallo', 1),
(4, 'Decorado Manchado', 1),
(5, 'Decorado Corrido', 1),
(6, 'Decorado Veteado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_pantalla_cambio_respuestas`
--
CREATE TABLE `formato_pantalla_cambio_respuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cabecera` int(11) NOT NULL,
  `id_defecto` int(11) NOT NULL,
  `hora` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `resultado` varchar(5) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Guarda C o N/C',
  `accion_tomada` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_cabecera`) REFERENCES `formato_pantalla_cambio_cabecera` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_defecto`) REFERENCES `formato_pantalla_cambio_preguntas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_paletizador_cabecera`
--
CREATE TABLE `formato_paletizador_cabecera` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `turno` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `grupo` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `equipo_evaluado` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `comentarios` text COLLATE utf8mb4_general_ci,
  `elaborado_por` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `revisado_por` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_paletizador_preguntas`
--
CREATE TABLE `formato_paletizador_preguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `formato_paletizador_preguntas`
--
INSERT INTO `formato_paletizador_preguntas` (`id`, `descripcion`, `categoria`, `estado`) VALUES
(1, 'Carro.', 'Condiciones del Equipo', 1),
(2, 'Mallas.', 'Condiciones del Equipo', 1),
(3, 'Prensa.', 'Condiciones del Equipo', 1),
(4, 'Manejo de Envases.', 'Condiciones del Equipo', 1),
(5, 'Centrado de la Camada.', 'Condiciones del Equipo', 1),
(6, 'Correcto ajuste de los Compactador de Camada.', 'Condiciones del Equipo', 1),
(7, 'Altura de los Compactadores.', 'Condiciones del Equipo', 1),
(8, 'Recorrido de la Paleta vacía (desde el dispensador hasta subirlo por el ascensor).', 'Condiciones del Equipo', 1),
(9, 'Recorrido de la Paleta llena (desde que sale del paletizador hasta el forrador).', 'Condiciones del Equipo', 1),
(10, 'Estados de las uñas.', 'Condiciones del Equipo', 1),
(11, 'Estado de las mangueras de aire (que no presenten fuga).', 'Condiciones del Equipo', 1),
(12, 'Tope de Cartón en buen estado.', 'Condiciones del Equipo', 1),
(13, 'Centrado del Cartón.', 'Condiciones del Equipo', 1),
(14, 'Vidrio suelto en la Malla.', 'Condiciones de Inocuidad en el Equipo', 1),
(15, 'Vidrio suelto en Compactador.', 'Condiciones de Inocuidad en el Equipo', 1),
(16, 'Vidrio suelto en el Área (piso, estructura, escalera, alrededor de transportadores...)', 'Condiciones de Inocuidad en el Equipo', 1),
(17, 'Acumulación de polvo en el Carro.', 'Condiciones de Inocuidad en el Equipo', 1),
(18, 'Exceso de grasa en la Cadena del Carro.', 'Condiciones de Inocuidad en el Equipo', 1),
(19, 'Exceso de polvo y tela de araña en la Estructura del Ascensor.', 'Condiciones de Inocuidad en el Equipo', 1),
(20, 'Estado de Pinturas de los Paletizadores.', 'Condiciones de Inocuidad en el Equipo', 1),
(21, 'Condiciones del Material de Empaque (paletas, marcos, cartón separador).', 'Condiciones de Inocuidad en el Equipo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_paletizador_respuestas`
--
CREATE TABLE `formato_paletizador_respuestas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cabecera` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `resultado` varchar(2) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_cabecera`) REFERENCES `formato_paletizador_cabecera` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_pregunta`) REFERENCES `formato_paletizador_preguntas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pintura_inventario`
--
CREATE TABLE `pintura_inventario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `color` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_actual` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cantidad_minima_alerta` decimal(10,2) NOT NULL DEFAULT '5.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pintura_inventario`
--
INSERT INTO `pintura_inventario` 
  (`color`, `cantidad_actual`, `cantidad_minima_alerta`)
VALUES 
  ('Blanco', 50.00, 10.00),
  ('Azul', 50.00, 10.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formato_pintura_consumo`
--
CREATE TABLE `formato_pintura_consumo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pintura_inventario` int(11) NOT NULL,
  `proveedor` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_inicio_consumo` date NOT NULL,
  `numero_lote` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `unidad_medida` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_consumida` decimal(10,2) NOT NULL,
  `fecha_finalizacion_consumo` date NOT NULL,
  `revisado_por` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `observaciones` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_pintura_inventario`) REFERENCES `pintura_inventario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pintura_registro`
--
CREATE TABLE `pintura_registro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pintura_inventario` int(11) NOT NULL,
  `proveedor` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_registro` date NOT NULL,
  `unidad_medida` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cantidad_registrada` decimal(10,2) NOT NULL,
  `registrado_por` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `observaciones` text COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_pintura_inventario`) REFERENCES `pintura_inventario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `produccion_lisa`
--
CREATE TABLE `produccion_lisa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_produccion_lisa` date NOT NULL,
  `cantidad_produccion` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carnet_usuario` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices adicionales (solo se mantiene el UNIQUE para carnet_usuario)
--
ALTER TABLE `usuarios`
  ADD UNIQUE KEY `carnet_usuario` (`carnet_usuario`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;