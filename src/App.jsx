import { useState } from "react";
import "./index.css";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

/* =========================
   PRODUCTOS INFO COMPLETA
========================= */

const productosInfo = {
  caja_pesos: {
    titulo: "Tu cuenta digital para manejar tu dinero sin límites",
    resumen:
      "Administrá tus pesos y dólares desde un solo lugar, generando rendimientos diarios sin costos de mantenimiento.",
    uso: [
      "Transferencias instantáneas las 24 h.",
      "Pagos con QR en cualquier comercio.",
      "Pago de más de 4.000 servicios.",
      "Recargas inmediatas de celular y transporte.",
      "Rendimientos automáticos sobre tu saldo."
    ],
    frase: "Tu dinero siempre disponible, creciendo todos los días."
  },
  caja_dolares: {
    titulo: "Tu cuenta en dólares gratis y 100% digital",
    resumen:
      "Gestioná tus dólares sin costos de mantenimiento y operá desde la app cuando quieras.",
    uso: [
      "Transferencias en dólares.",
      "Compra y venta de Dólar MEP.",
      "Pagos internacionales.",
      "Cancelación anticipada en USD."
    ],
    frase: "Tus dólares, disponibles y bajo control."
  },
  dolar_oficial: {
    titulo: "Comprá y vendé dólares al tipo de cambio oficial",
    resumen: "Operá dólar oficial sin comisiones ni impuestos.",
    uso: [
      "Compra directa desde la app.",
      "Transferencias en USD.",
      "Pagos en dólares.",
      "Uso en el exterior."
    ],
    frase: "Accedé al dólar oficial de forma simple."
  },
  dolar_mep: {
    titulo: "Comprá Dólar MEP y recibilo en el día",
    resumen: "Operá sin parking y sin límites.",
    uso: [
      "Compra en simples pasos.",
      "Acreditación en el día.",
      "Venta cuando quieras.",
      "100% digital y seguro."
    ],
    frase: "Accedé al dólar de forma ágil."
  },
  frascos: {
    titulo: "Organizá tus metas y hacé crecer tu dinero",
    resumen: "Guardá tu dinero entre 7 y 180 días con rendimientos.",
    uso: [
      "Creá frascos para cada objetivo.",
      "Elegí el plazo.",
      "Generá rendimientos.",
      "Organizá tu ahorro."
    ],
    frase: "Ahorrá con propósito."
  },
  pago_servicios: {
    titulo: "Pagá todos tus servicios desde la app",
    resumen: "Más de 3000 empresas disponibles.",
    uso: [
      "Escaneá facturas.",
      "Recibí alertas.",
      "Pagá en cuotas.",
      "Descargá comprobantes."
    ],
    frase: "Organizá tus pagos en un solo lugar."
  },
  prestamos: {
    titulo: "Pedí tu préstamo personal desde la app",
    resumen: "Hasta $9.000.000 con cuotas fijas.",
    uso: [
      "Cancelá deudas.",
      "Impulsá tu negocio.",
      "Planificá un viaje.",
      "Simulá hasta 48 cuotas."
    ],
    frase: "Tu próxima meta puede empezar hoy."
  },
  cuotas_sin_tarjeta: {
    titulo: "Comprá en cuotas sin usar tu tarjeta",
    resumen: "Financiá compras en hasta 6 cuotas.",
    uso: [
      "Escaneá QR.",
      "Elegí cuotas.",
      "Pagá 30 días después.",
      "Seguimiento desde Préstamos."
    ],
    frase: "Comprá hoy y pagalo a tu ritmo."
  },
  tarjeta_credito: {
    titulo: "Solicitá tu tarjeta 100% online",
    resumen: "Tarjeta virtual disponible al instante.",
    uso: [
      "Cuotas cero interés.",
      "Compras internacionales.",
      "Financiación flexible.",
      "Promos exclusivas."
    ],
    frase: "Más libertad para comprar."
  },
  tarjeta_credito_virtual: {
    titulo: "Tu tarjeta virtual lista al instante",
    resumen: "Comprá online sin esperar el plástico.",
    uso: [
      "Disponible en segundos.",
      "CVV dinámico.",
      "Compras en dólares.",
      "100% digital."
    ],
    frase: "Comprá hoy mismo."
  },
  tarjeta_debito: {
    titulo: "Usá tu plata al instante",
    resumen: "Gratis y vinculada a tu cuenta.",
    uso: [
      "Pagá con tu saldo.",
      "Retirá efectivo.",
      "Usala en transporte.",
      "Comprá en el exterior."
    ],
    frase: "Simple y directa."
  }
};

function App() {
  const productosNX = Object.keys(productosInfo).map((id) => ({
    id,
    label: id.replace(/_/g, " ").toUpperCase()
  }));

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
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

    if (cliente.productosSeleccionados.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Seleccioná al menos un producto"
      });
      return;
    }

    const seleccionados = cliente.productosSeleccionados.map(
      (id) => productosInfo[id]
    );

    const bloques = seleccionados
      .map(
        (p) => `
      <div style="margin-bottom:30px;">
        <h2 style="color:#ff6a00;">${p.titulo}</h2>
        <p>${p.resumen}</p>
        <ul>${p.uso.map((item) => `<li>${item}</li>`).join("")}</ul>
        <p><strong>${p.frase}</strong></p>
      </div>
      <hr/>
    `
      )
      .join("");

    const htmlContent = `
      <div style="font-family:Arial;padding:20px;">
        ${bloques}
      </div>
    `;

    try {
      await emailjs.send(
        "service_fmgjno1",
        "template_nz3jiyg",
        {
          to_name: cliente.nombre,
          to_email: cliente.email,
          message: htmlContent
        },
        "JIUVSc3n_dqzZhMU2"
      );

      Swal.fire({
        icon: "success",
        title: "Mail enviado correctamente 🚀"
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al enviar el correo"
      });
    }
  };

  return (
    <div className="nx-wrapper">
      <div className="nx-card">
        <h1 className="nx-title text-center">Correo X 🚀</h1>

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

          <button className="nx-btn text-white mt-4">
            Enviar Mail ✨
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;