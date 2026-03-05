import { useState } from "react";
import "./index.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";


/* =========================
   PRODUCTOS INFO COMPLETA
========================= */

export const productosInfo = {

  caja_pesos: {
    titulo: "Tu cuenta digital para manejar tu dinero todos los días",
    resumen:
      "Con tu cuenta Naranja X podés administrar tu dinero desde el celular de forma simple, rápida y sin costos de mantenimiento.",
    uso: [
      "Transferí y recibí dinero al instante las 24 horas usando CBU, CVU o alias.",
      "Pagá con QR en miles de comercios sin importar la billetera.",
      "Pagá servicios y facturas sin hacer filas.",
      "Recargá celular o transporte en segundos.",
      "Generá rendimientos diarios sobre tu saldo disponible."
    ],
    frase:
      "Una cuenta pensada para que tu dinero esté siempre disponible y creciendo."
  },

  caja_dolares: {
    titulo: "Tu cuenta en dólares gratis y 100% digital",
    resumen:
      "Gestioná tus dólares desde la app Naranja X sin costos de mantenimiento y con total control desde tu celular.",
    uso: [
      "Recibí y enviá transferencias en dólares desde y hacia cuentas argentinas.",
      "Comprá y vendé Dólar MEP desde la app.",
      "Pagá consumos internacionales con tu tarjeta.",
      "Cancelá compras en dólares y evitá impuestos."
    ],
    frase:
      "Tus dólares siempre disponibles cuando los necesites."
  },

  dolar_oficial: {
    titulo: "Comprá y vendé dólares al tipo de cambio oficial",
    resumen:
      "Desde la app Naranja X podés operar dólar oficial de forma simple, directa y sin comisiones.",
    uso: [
      "Comprá o vendé dólares en pocos pasos.",
      "Transferí dólares a otras cuentas.",
      "Pagá consumos en dólares.",
      "Usalos en el exterior con tu tarjeta."
    ],
    frase:
      "Una forma simple y transparente de operar con dólares."
  },

  dolar_mep: {
    titulo: "Comprá Dólar MEP y recibilo en el día",
    resumen:
      "Accedé al dólar MEP desde la app Naranja X de forma rápida, segura y sin límites de compra.",
    uso: [
      "Operá directamente desde tu cuenta Naranja X.",
      "Comprá dólares sin restricciones.",
      "Recibí los dólares en tu cuenta en el día.",
      "Vendelos cuando quieras."
    ],
    frase:
      "Una alternativa ágil para acceder al dólar."
  },

  frascos: {
    titulo: "Ahorrá para tus metas con Frascos",
    resumen:
      "Frascos te permite separar tu dinero para diferentes objetivos mientras genera rendimientos.",
    uso: [
      "Creá un frasco para cada meta.",
      "Elegí plazos desde 7 hasta 180 días.",
      "Generá rendimientos automáticos.",
      "Organizá tus ahorros fácilmente."
    ],
    frase:
      "Convertí tus metas en objetivos claros y hacé crecer tu dinero."
  },

  pago_servicios: {
    titulo: "Pagá todos tus servicios desde la app",
    resumen:
      "Con Naranja X podés pagar miles de servicios e impuestos sin salir de tu casa.",
    uso: [
      "Pagá facturas escaneando el código de barras.",
      "Recibí recordatorios antes del vencimiento.",
      "Pagá con dinero en cuenta o en cuotas.",
      "Accedé a tus comprobantes cuando quieras."
    ],
    frase:
      "Todos tus pagos organizados en un solo lugar."
  },

  prestamos: {
    titulo: "Pedí tu préstamo personal desde la app",
    resumen:
      "Obtené un préstamo de forma rápida y 100% digital directamente desde Naranja X.",
    uso: [
      "Pedí hasta $9.000.000 desde la app.",
      "Elegí hasta 48 cuotas fijas.",
      "Recibí el dinero al instante en tu cuenta.",
      "Cancelá anticipadamente si lo necesitás."
    ],
    frase:
      "Una solución rápida para impulsar tus proyectos."
  },

  cuotas_sin_tarjeta: {
    titulo: "Comprá en cuotas sin usar tarjeta de crédito",
    resumen:
      "Pagá con QR y financiá tus compras en cuotas desde la app Naranja X.",
    uso: [
      "Escaneá cualquier código QR.",
      "Elegí entre 1, 3 o hasta 6 cuotas.",
      "Pagá tu primera cuota 30 días después.",
      "Seguimiento desde la sección Préstamos."
    ],
    frase:
      "Comprá hoy y pagalo en cuotas."
  },

  tarjeta_credito: {
    titulo: "Tu tarjeta de crédito Naranja X en minutos",
    resumen:
      "Solicitá tu tarjeta de crédito desde la app y empezá a usarla al instante.",
    uso: [
      "Comprá en Argentina y el exterior.",
      "Pagá en cuotas con promociones.",
      "Financiá el resumen si lo necesitás.",
      "Beneficios exclusivos en transporte y viajes."
    ],
    frase:
      "Más libertad para comprar."
  },

  tarjeta_credito_virtual: {
    titulo: "Tu tarjeta virtual lista para usar al instante",
    resumen:
      "Con la tarjeta de crédito virtual podés empezar a comprar online sin esperar el plástico.",
    uso: [
      "Disponible inmediatamente desde la app.",
      "CVV dinámico para mayor seguridad.",
      "Compras online en pesos o dólares.",
      "Sin costos adicionales."
    ],
    frase:
      "Comprá online en segundos."
  },

  tarjeta_debito: {
    titulo: "Pagá con tu dinero al instante",
    resumen:
      "La tarjeta de débito Naranja X te permite usar el dinero de tu cuenta de forma simple y segura.",
    uso: [
      "Pagá en comercios físicos y online.",
      "Retirá efectivo en comercios adheridos.",
      "Usala en transporte público.",
      "Comprá en el exterior."
    ],
    frase:
      "La forma más simple de usar tu dinero."
  }

};

const generarHTMLMail = (productos, cliente) => {

const bloques = productos.map(p => `
<tr>
<td style="padding:30px;border-bottom:1px solid #eee;">

<h2 style="color:#ff6a00;font-size:20px;margin-bottom:10px;">
${p.titulo}
</h2>

<p style="color:#444;font-size:15px;line-height:1.6;">
${p.resumen}
</p>

<ul style="padding-left:18px;margin-top:12px;color:#555;font-size:14px;">
${p.uso.map(item => `<li style="margin-bottom:6px;">${item}</li>`).join("")}
</ul>

<p style="margin-top:15px;font-weight:bold;color:#4b0082;">
${p.frase}
</p>

</td>
</tr>
`).join("");

return `

<div style="background:#f4f4f4;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">

<table width="600" align="center" style="background:#ffffff;border-radius:10px;overflow:hidden;">

<!-- HEADER -->
<tr>
<td style="background:#4b0082;padding:35px;text-align:center;">

<p style="
color:white;
font-size:28px;
font-weight:bold;
margin:0;
letter-spacing:1px;
">
Naranja X
</p>

<p style="
color:white;
font-size:13px;
margin-top:8px;
opacity:0.85;
">
Resumen de nuestra conversacion en sucursal.
</p>

</td>
</tr>

<!-- MAIN -->
<tr>
<td style="padding:35px;">

<h1 style="color:#4b0082;margin-bottom:15px;font-size:24px;">
Hola ${cliente.nombre} 👋
</h1>

<p style="font-size:15px;color:#444;line-height:1.6;">
Queremos ayudarte a aprovechar al máximo todas las funcionalidades que tenés disponibles en <strong>Naranja X</strong>.
</p>

<p style="font-size:15px;color:#444;line-height:1.6;">
Te compartimos información útil sobre algunos productos que pueden ayudarte a organizar mejor tu dinero, simplificar tus pagos y aprovechar todos los beneficios de la app.
</p>

</td>
</tr>

<!-- PRODUCTOS -->
${bloques}

<!-- CTA -->
<tr>
<td style="padding:30px;text-align:center;background:#fafafa;">

<h2 style="color:#4b0082;margin-bottom:15px;">
Descubrí todo lo que podés hacer con Naranja X
</h2>

<p style="color:#555;font-size:15px;margin-bottom:25px;">
Ingresá a la app y explorá todas las herramientas disponibles para simplificar tu día a día.
</p>

<a 
href="https://www.naranjax.com"
style="
background:#ff6a00;
color:white;
padding:14px 28px;
border-radius:30px;
text-decoration:none;
font-weight:bold;
display:inline-block;
">
Conocer más
</a>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#4b0082;padding:25px;text-align:center;color:white;font-size:13px;">

<p style="margin-top:8px;opacity:0.8;">
Este correo fue generado para brindarte información sobre funcionalidades disponibles en tu cuenta.
</p>

<p style="margin-top:10px;font-size:12px;opacity:0.7;">
© Naranja X — Todos los derechos reservados
</p>

</td>
</tr>

</table>

</div>

`;
};

function App() {
  const productosNX = Object.keys(productosInfo).map((id) => ({
    id,
    label: id.replace(/_/g, " ").toUpperCase()
  }));

  const [cliente, setCliente] = useState({
  nombre: "",
  email: "",
  telefono: "",
  productosSeleccionados: []
  });

  const handleCheckboxChange = (productoId) => {
    setCliente((prev) => {
      const yaExiste = prev.productosSeleccionados.includes(productoId);
      const nuevos = yaExiste
        ? prev.productosSeleccionados.filter((id) => id !== productoId)
        : [...prev.productosSeleccionados, productoId];

      return { ...prev, productosSeleccionados: nuevos };
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!cliente.nombre || !cliente.email) {
    Swal.fire({
      icon: "warning",
      title: "Faltan datos",
      text: "Ingresá el nombre y el mail del cliente"
    });
    return;
  }

  if (cliente.productosSeleccionados.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Seleccioná al menos un producto"
    });
    return;
  }

  try {

    // productos con info completa
    const productosSeleccionadosInfo = cliente.productosSeleccionados.map(
      (id) => ({
        id,
        ...productosInfo[id]
      })
    );

    // generar html del mail
    const htmlContent = generarHTMLMail(productosSeleccionadosInfo, cliente);

    // enviar mail
    await emailjs.send(
      "service_h32922z",
      "template_nz3jiyg",
      {
        to_email: cliente.email,
        to_name: cliente.nombre,
        message: htmlContent
      },
      "JIUVSc3n_dqzZhMU2"
    );

    Swal.fire({
      icon: "success",
      title: "Correo enviado 🚀",
      text: "El mail fue enviado correctamente al cliente",
      confirmButtonColor: "#ff6a00"
    });

  } catch (error) {

    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Error al enviar el correo",
      text: "Revisar la configuración en EmailJS"
    });

  }
};

  const enviarWhatsApp = () => {

  if(cliente.productosSeleccionados.length === 0){
    Swal.fire({
      icon: "warning",
      title: "Seleccioná al menos un producto"
    });
    return;
  }

  if(!cliente.telefono){
    Swal.fire({
      icon: "warning",
      title: "Ingresá un número de WhatsApp"
    });
    return;
  }

  const productosSeleccionadosInfo = cliente.productosSeleccionados.map(
    (id) => ({
      id,
      ...productosInfo[id]
    })
  );

  const mensaje = `
    Hola ${cliente.nombre} 👋

    Te compartimos información para que aproveches mejor tu cuenta Naranja X 💜

    ${productosSeleccionadosInfo.map(p => `
    🔸 ${p.titulo}
    ${p.resumen}
    `).join("\n")}

    Si tenés dudas podés escribirnos cuando quieras.

    Equipo Naranja X 🚀
    `;

      const url = `https://wa.me/${cliente.telefono}?text=${encodeURIComponent(mensaje)}`;

      window.open(url, "_blank");
    };

  return (
    <div className="nx-wrapper">
      <div className="nx-card">
        <h1 className="nx-title text-center">Habitualidad X 🚀</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            className="form-control mb-3"
            onChange={(e) =>
              setCliente({ ...cliente, nombre: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-4"
            onChange={(e) =>
              setCliente({ ...cliente, email: e.target.value })
            }
          />

          
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Whatsapp"
              onChange={(e)=>setCliente({...cliente, telefono:e.target.value})}
            />
          

          <div className="row">
            {productosNX.map((producto) => (
              <div key={producto.id} className="col-md-6 mb-3">
                <div
                  className={`producto-item ${
                    cliente.productosSeleccionados.includes(producto.id)
                      ? "activo"
                      : ""
                  }`}
                  onClick={() => handleCheckboxChange(producto.id)}
                >
                  {producto.label}
                </div>
              </div>
            ))}
          </div>

          

          <div className="text-center mt-4 d-flex justify-content-center gap-3">

            <button className="nx-btn text-white d-flex gap-3">
              <i class="bi bi-envelope"></i>  Enviar Mail 
            </button>

            <button
              type="button"
              className=" text-white btn-whatsapp d-flex gap-3 "
              onClick={enviarWhatsApp}
            >
             <i class="bi bi-whatsapp"></i>  Enviar WhatsApp 
            </button>

          </div>

          
        </form>
      </div>
    </div>
  );
}

export default App;