const https = require("https");
const axios = require("axios");
const { Http2ServerResponse } = require("http2");
const { header } = require("express/lib/request");
const { url } = require("inspector");


module.exports = async () => {
  return {
    "trato_dialogo": {
      "comunicar gerente": {
        "any": async function(ints, ents) {
          return `Claro, puedes realizarlo por medio de WhatsApp o realizar una llamada a cualquiera de los siguientes numeros: <br>
            - 973 080 346 <br>
            - 922 309 422 <br>
            - 964 677 870`;
        },
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "dialogar": {
        "any": "Gracias por escribirnos, soy Bot y le ayudare!",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "despedida": {
        "any": "Gracias por escribirnos, nos vemos pronto.",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "negocios": {
        "any": async function(ints, ents) {
          return `Gracias por escribirnos, para realizar negocios con usted, porfavor apersonese al local o comuniquese por uno de estos numeros: <br>
            - 973 080 346 <br>
            - 922 309 422 <br>
            - 964 677 870`;
        },
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "garantia": {
        "any": async function(ints, ents) {
          return `La garantia de los muebles de la empresa tiene una valides de un mes, le sugiero que se comunique con nosotros por uno de estos numeros para mas detalles: <br>
            - 973 080 346 <br>
            - 922 309 422 <br>
            - 964 677 870`;
        },
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "descuentos": {
        "any": "Los descuentos se realizan en ocaciones especiales como: en el aniversario de la empresa, navidad y en tu cumpleaños si usted es un cliente recurrente.",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "pagos": {
        "any": "Los pagos son realizados de manera presencial en el local de la empresa, por el momento todos los pagos son con efectivo al momento de adquirir el producto.",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "info_ventas": {
        "any": "Por el momento todas las ventas se realizan en el local, estaremos gustosos si usted nos visita en nuestro local.",
        "despido": "Gracias por escribirnos, nos vemos pronto."
      },
      "info_empresa": {
        "any": async function(ints, ents) {
          // Aqui consultar a mysql
          // Consultar a una API

          let {data} = await axios.get("https://apimueblesoscanoa.azurewebsites.net/api/webpagina/Categorias")
          let categoria = (data["result"].slice(0, data["result"].length).map((e) => {
              return `${e.nombre}, `;
          })).join(" ");
          return `Nuestra empresa es expendedora de una gran variedad de muebles en los que encontramos : ${categoria} sugerimos que 
          darle una visita completa a la pagina web y encontrar la mejor opcion para usted.`;
        },
        "despido": "Gracias por escribirnos, avisenos si desea algo mas."
      }
    },
    "trato_buscar": {
      "producto en general": {
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
            return `
            <a class="nav-link link-primary " href="/products#categories" onclick="cargarporcategoria(${e})">
            ${e.nombre}
                                        </a>`;
              //return `${e.nombre}, `;
          })).join(" ");
          return `Claro, puedo sugerirte los siguientes categorias de productos: ${categoria}`;
          /*return `Nuestra empresa es expendedora de una gran variedad de muebles en los que encontramos : ${categoria} sugerimos que 
          darle una visita completa a la pagina web y encontrar la mejor opcion para usted.`;*/
        }
      },
      "producto especifico": {
        "any": async function(ints, ents) {
          let {data} = await axios.get("https://apimueblesoscanoa.azurewebsites.net/api/webpagina/Categorias")
          let categoria = (data["result"].slice(0, data["result"].length).map((e) => {
            return `${e.nombre}, `;
          })).join(" ");
          return `Sugiero que le de una visita a los <a href="/products#categories" class="pe-auto">productos</a> de acuerdo a 
          las <a href="/products#categories" class="pe-auto">categorias</a> de ${categoria} en donde hay una variedad de modelos distintos`;
        },
        "despido": "Gracias por escribirnos, avisenos si desea algo mas."
      },
      "precio": {
        "any": async function(ints, ents) {
          return `Por favor visite los <a href="/products#categories" class="pe-auto">productos por categorias</a>. Ademas nuestra pagina web muestra a cada producto con su respectivo precio.`;
        },
        "despido": "Gracias por escribirnos, avisenos si desea algo mas."
      }
    },
    "trato_queja": {
      "queja": {
        "any": async function(ints, ents) {
          return `Gracias por contactarnos, estaremos mejorando nuestra atención, para mejor comunicacion por favor 
          contactese con nosotros por medio del WhatsApp o llamada por los siguientes numeros: <br>
            - 973 080 346 <br>
            - 922 309 422 <br>
            - 964 677 870`;
        },
        "despido": "Gracias por escribirnos, avisenos si desea algo mas.",
      },
      "devolucion": {
        "any": "Para devolver un producto la compra devio de realizarme a lo mucho un mes antes, el producto debe se ser llevado al local donde los tecnicos lo revisaran; no realizamos la devolucion del aporte por lo que se cambiara el producto si los tecnicos aprueban la devolucion.",
        "despido": "Gracias por escribirnos, avisenos si desea algo mas.",
      },
      "no gusta producto": {
        "any": "Gracias por contactarnos, sentimos que no le haya gustado, lo esperamos en el local para brindarnos mas detalles sobre el tema.",
        "despido": "Gracias por escribirnos, avisenos si desea algo mas.",
      },
    },
    "trato_informacion": {
      "lacalizacion empresa": {
        "any": async function(ints, ents) {
          let result = `<a class="nav-link link-primary" target="_blank" href='https://goo.gl/maps/LJ2htEEYwmvrd3iWA'><img width="210" src='../../../assets/img/chatbot/localizacionempresa.PNG'>Localizacion</a>`;
          return `El local de la empresa esta en el: JR. ICA NRO. 967 (969 Y 971 ENTRE JUNIN Y HVCA) JUNIN - HUANCAYO - HUANCAYO. ${result}`;
        },
        "despido": "Gracias por escribirnos, avisenos si desea algo mas.",
      }
    }
  };
};
