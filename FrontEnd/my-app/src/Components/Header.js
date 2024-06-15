/**
 * Este archivo es parte de un proyecto que utiliza código bajo la Licencia MIT.
 * Autor original: Tim Baker (2017).
 * Para más detalles, vea el archivo LICENSE en la raíz del proyecto o visite https://opensource.org/licenses/MIT
 */

import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import { Link } from 'react-scroll';


class Header extends Component {
  static defaultProps = {
    title: "Resiliencia Urbana",
    description: "Explorando la capacidad de las ciudades para sobrevivir y adaptarse."
  };

  render() {
    // Props with default values
    const { title, description } = this.props;

    return (
<header id="home">
        <ParticlesBg type="circle" bg={true} />

        <nav id="nav-wrap">
          {/* Omitimos los enlaces que muestran/ocultan la navegación móvil por brevedad */}

          <ul id="nav" className="nav">
            <li className="current">
              <Link activeClass="active" to="home" spy={true} smooth={true} duration={500}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="resiliencia" spy={true} smooth={true} duration={500}>
                Resiliencia Urbana
              </Link>
            </li>
            <li>
              <Link to="proyecto" spy={true} smooth={true} duration={500}>
                Proyecto
              </Link>
            </li>
            <li>
              <Link to="metodologia" spy={true} smooth={true} duration={500}>
                Metodología 
              </Link>
            </li>
            <li>
              <Link to="dashboard" spy={true} smooth={true} duration={500}>
                DashBoard
              </Link>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{title}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}.</h3>
            </Fade>
            <hr />
          </div>
        </div>

        <p className="scrolldown">
          <Link to="resiliencia" className="smoothscroll" spy={true} smooth={true} duration={500}>
            <i className="icon-down-circle"></i>
          </Link>
        </p>
      </header>
    );
  }
}

export default Header;





