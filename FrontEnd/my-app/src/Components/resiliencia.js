import React, { Component } from "react";
import '../App.css';
class Resiliencia extends Component {
render(){
    return (
        
        <div id = "resiliencia" className="resiliencia">
        <h1 className="resiliencia__titulo">Resiliencia Urbana</h1>
        <p className="resiliencia__descripcion">
          La resiliencia urbana se refiere a la capacidad de las ciudades para resistir, adaptarse y recuperarse de las adversidades - sean estas sociales, económicas o naturales.
        </p>
        <div className="resiliencia__categorias">
          <div className="resiliencia__categoria">
            <h2 className="resiliencia__titulo--economia">ECONOMÍA</h2>
            <p>La economía de una ciudad resiliente es diversa y dinámica, capaz de generar crecimiento sostenible y ofrecer empleo a sus ciudadanos.</p>
          </div>
          <div className="resiliencia__categoria">
            <h2 className="resiliencia__titulo--medioambiente">MEDIOAMBIENTE</h2>
            <p>El entorno natural de una ciudad resiliente debe ser saludable y robusto. La densidad de la población, la disponibilidad de áreas verdes accesibles, el uso sostenible de las tierras y la proximidad a espacios abiertos son todos aspectos que contribuyen a la calidad del entorno urbano.</p>
          </div>
          <div className="resiliencia__categoria">
            <h2 className="resiliencia__titulo--sociedad">SOCIEDAD</h2>
            <p>Una sociedad resiliente es inclusiva, cohesiva y capaz de soportar y recuperarse de los eventos adversos. Las redes comunitarias fuertes, la seguridad y el bienestar de los ciudadanos también son cruciales, ya que una población saludable y bien conectada es más capaz de responder y adaptarse a las crisis.</p>
          </div>
          <div className="resiliencia__categoria">
            <h2 className="resiliencia__titulo--gobernanza">GOBERNANZA</h2>
            <p>La resiliencia en la gobernanza implica un liderazgo claro y eficaz, una gestión estratégica e integrada, y la presencia de instituciones públicas competentes y transparentes. Los ingresos del gobierno, la participación de la comunidad y la descentralización del poder hacia los gobiernos subnacionales son indicadores de una gobernanza fuerte, que es fundamental para una respuesta y recuperación efectivas ante situaciones de crisis.</p>
          </div>
        </div>
      </div>
          );
    
}
};



export default Resiliencia;
