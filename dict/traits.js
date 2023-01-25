const https = require("https");
const axios = require("axios");
const { Http2ServerResponse } = require("http2");
const { header } = require("express/lib/request");
const { url } = require("inspector");

module.exports = async () => {
  return {
    "trato_dialogo": {
      "queja": {
        "any": "Sentimos que haya tenido un problema con el producto.",
        "despido": "Gracias por contactarnos, estaremos mejorando nuestra atención",
      },
      "dialogar": {
        "any": "Gracias por escribirnos, soy Bot y le ayudare!",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "consulta_muebles": {
        "any": "Usted seria muy amable de comunicarse con el gerente o apersonarse a las instalaciones de la empresa.",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "descuentos": {
        "any": "Usted seria muy amable de comunicarse con el gerente o apersonarse a las instalaciones de la empresa.",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      }
    },
    "trato_buscar": {
      "producto_en_general": {
        "steps": ["saludo", 
                  "top_productos", 
                  "despido"],
        "saludo": "Sugiero ver las ofertas de escritorio.",
        "despido": "Gracias por escribirnos, avisenos si desea algo mas.",
        "any": async function(ints, ents) {
          // Aqui consultar a mysql
          // Consultar a una API

          let {data} = await axios.get("https://apimueblesoscanoa.azurewebsites.net/api/webpagina/Categorias")
          let categoria = (data["result"].slice(0, data["result"].length).map((e) => {
              return `${e.nombre}, `;
          })).join(" ");
          return `Nuestra empresa es expendedora de una gran variedad de muebles en los que encontramos : ${categoria} sugerimos que 
          darle una visita completa a la pagina web y encontrar la mejor opcion para usted.`;
        }
      },
      "producto_especifico": {
        "any": "Sugiero que le de una visita a los productos de acuerdo a la categoria que desee",
        "despido": "Gracias por escribirnos, avisenos si desea algo mas."
      },
      "precio": {
        "any": "Todos los precios son visibles en la pagina web",
        "despido": "Gracias por escribirnos, avisenos si desea algo mas."
      }
    }
  };
};
