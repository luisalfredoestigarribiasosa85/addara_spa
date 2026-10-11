/* ============================================================
   ADDARA SPA — Datos centralizados (DEMO)
   ------------------------------------------------------------
   Todo lo que el propietario deba confirmar o cambiar vive
   en este archivo: teléfono, WhatsApp, servicios, precios,
   combos y horarios. Ningún otro archivo duplica precios.
   ============================================================ */

const SITE_CONFIG = {
  nombre: "Addara Spa",
  descriptor: "Spa de día · Asunción",
  direccion: "Guarambaré y Tenientes Solís 4155, Asunción, Paraguay",
  mapsUrl:
    "https://www.google.com/maps/place/Addara+spa/@-25.319429,-57.6328284,14z/data=!4m10!1m2!2m1!1sspa!3m6!1s0x945da92f2a473621:0xbd293371e9d5f1c7!8m2!3d-25.3194281!4d-57.6016788!15sCgNzcGGSAQdkYXlfc3Bh4AEA!16s%2Fg%2F11g0cdsnwf",
  mapsEmbed: "https://www.google.com/maps?q=-25.3194281,-57.6016788&z=16&output=embed",
  telefonoMostrado: "+595 984 917 183",
  telefonoHref: "tel:+595984917183",

  /* WhatsApp confirmado por el establecimiento: los botones
     de consulta generan enlaces wa.me con mensaje predefinido.
     Si algún día cambia el número, actualizar `numero` aquí. */
  whatsapp: {
    numero: "595984917183",
    confirmado: true,
    mensajeBase: (detalle) =>
      `Hola, Addara Spa. Quisiera consultar la disponibilidad para ${detalle}. ¿Podrían brindarme más información?`
  },

  /* Horarios publicados en el WhatsApp Business del local.
     El jueves figura como 10:53, posible error de tipeo a
     confirmar con el establecimiento. Domingo sin horario
     publicado: no se incluye para no inventar datos. */
  horarios: [
    { dias: "Lunes", horas: "11:00 – 21:00" },
    { dias: "Martes", horas: "11:00 – 21:00" },
    { dias: "Miércoles", horas: "11:00 – 21:00" },
    { dias: "Jueves", horas: "11:00 – 21:00" },
    { dias: "Viernes", horas: "11:00 – 22:00" },
    { dias: "Sábado", horas: "11:00 – 21:00" }
  ],

  notaDemo:
    "Propuesta visual de demostración. Las imágenes son ilustrativas y los valores están pendientes de confirmación."
};

/* Precios en guaraníes. `precioGs: null` = consultar.
   `precioConfirmado: false` = valor publicado anteriormente,
   se muestra como referencial, nunca como tarifa oficial. */
const SERVICES = [
  {
    id: "sauna",
    nombre: "Sauna",
    descripcion:
      "Calor seco y vapor en un ambiente de madera, para aflojar el cuerpo y bajar el ritmo.",
    imagen: "assets/img/sauna-madera.webp",
    alt: "Interior de sauna de madera con bancos, imagen conceptual",
    precioGs: 45000,
    precioConfirmado: false,
    notaPrecio: "Modalidad incluida a confirmar",
    destacado: true
  },
  {
    id: "masaje-relajante",
    nombre: "Masaje relajante",
    descripcion:
      "Manos expertas y ritmo pausado para soltar tensiones y salir liviana.",
    imagen: "assets/img/masaje-relajante.webp",
    alt: "Persona recibiendo un masaje relajante, imagen conceptual",
    precioGs: 100000,
    precioConfirmado: false,
    notaPrecio: null,
    destacado: true
  },
  {
    id: "exfoliacion-corporal",
    nombre: "Exfoliación corporal",
    descripcion:
      "Pulido suave de la piel del cuerpo, para una sensación fresca y renovada.",
    imagen: "assets/img/exfoliacion-corporal.webp",
    alt: "Tratamiento de exfoliación corporal, imagen conceptual",
    precioGs: 100000,
    precioConfirmado: false,
    notaPrecio: null,
    destacado: true
  },
  {
    id: "limpieza-de-cutis",
    nombre: "Limpieza de cutis",
    descripcion: "Higiene y frescura para el rostro, a tu medida.",
    imagen: "assets/img/tratamiento-facial.webp",
    alt: "Tratamiento facial con mascarilla, imagen conceptual",
    precioGs: null,
    precioConfirmado: false,
    notaPrecio: null,
    destacado: false
  },
  {
    id: "manicura",
    nombre: "Manicura",
    descripcion: "Cuidado prolijo y delicado para tus manos.",
    imagen: "assets/img/manicura.webp",
    alt: "Manos con manicura prolija, imagen conceptual",
    precioGs: null,
    precioConfirmado: false,
    notaPrecio: null,
    destacado: false
  },
  {
    id: "pedicura",
    nombre: "Pedicura",
    descripcion: "Descanso y cuidado para tus pies.",
    imagen: "assets/img/pedicura.webp",
    alt: "Profesional realizando pedicura en un salón, imagen conceptual",
    precioGs: null,
    precioConfirmado: false,
    notaPrecio: null,
    destacado: false
  },
  {
    id: "masaje-capilar",
    nombre: "Masaje capilar",
    descripcion: "Relax concentrado en cuello, cabeza y cuero cabelludo.",
    imagen: "assets/img/masaje-capilar.webp",
    alt: "Lavado con masaje capilar en bachas, imagen conceptual",
    precioGs: null,
    precioConfirmado: false,
    notaPrecio: null,
    destacado: false
  },
  {
    id: "otros-masajes",
    nombre: "Otros masajes",
    descripcion: "Otras variedades de masaje a confirmar con el establecimiento.",
    imagen: "assets/img/otros-masajes.webp",
    alt: "Masaje de cabeza y rostro en camilla, imagen conceptual",
    precioGs: null,
    precioConfirmado: false,
    notaPrecio: "Variedad a confirmar",
    destacado: false
  }
];

/* Combos de demostración pendientes de confirmación.
   - activo: false lo oculta del sitio sin borrarlo.
   - confirmado: false muestra el aviso de vigencia.
   - vigencia: { desde, hasta } opcional, cuando el
     propietario la indique (ej. "Válido en julio"). */
const COMBOS = [
  {
    id: "combo-sauna-masaje-pulido",
    nombre: "Sauna + masaje + pulido corporal",
    incluye: ["Sauna", "Masaje relajante", "Pulido corporal"],
    precioGs: 150000,
    precioConfirmado: false,
    activo: true,
    destacado: true,
    vigencia: null,
    imagen: "assets/img/ritual-toallas-aceites.webp",
    alt: "Masaje con piedras calientes sobre la espalda, imagen conceptual"
  },
  {
    id: "combo-sauna-capilar",
    nombre: "Sauna + masaje capilar",
    incluye: ["Sauna", "Masaje capilar"],
    precioGs: 50000,
    precioConfirmado: false,
    activo: true,
    destacado: false,
    vigencia: null,
    imagen: "assets/img/masaje-capilar.webp",
    alt: "Masaje capilar con agua tibia, imagen conceptual"
  },
  {
    id: "combo-completo",
    nombre: "Sauna + exfoliación + masaje + limpieza de cutis express",
    incluye: [
      "Sauna",
      "Exfoliación corporal",
      "Masaje relajante",
      "Limpieza de cutis express"
    ],
    precioGs: 195000,
    precioConfirmado: false,
    activo: true,
    destacado: false,
    vigencia: null,
    imagen: "assets/img/masaje-espalda.webp",
    alt: "Manos masajeando la espalda, imagen conceptual"
  },
  {
    id: "combo-sauna-exfoliacion",
    nombre: "Sauna + exfoliación",
    incluye: ["Sauna", "Exfoliación corporal"],
    precioGs: 100000,
    precioConfirmado: false,
    activo: true,
    destacado: false,
    vigencia: null,
    imagen: "assets/img/exfoliacion-corporal.webp",
    alt: "Detalle de tratamiento corporal, imagen conceptual"
  }
];

const GALLERY = [
  {
    src: "assets/img/pileta-exterior.webp",
    alt: "Piscina tranquila rodeada de vegetación, imagen conceptual",
    titulo: "Agua quieta",
    clase: "ancha"
  },
  {
    src: "assets/img/sauna-madera.webp",
    alt: "Bancos de madera dentro de un sauna cálido, imagen conceptual",
    titulo: "Calor de madera",
    clase: "alta"
  },
  {
    src: "assets/img/agua-jardin.webp",
    alt: "Espejo de agua entre palmeras y tinajas de barro, imagen conceptual",
    titulo: "Verde alrededor",
    clase: ""
  },
  {
    src: "assets/img/tratamiento-facial.webp",
    alt: "Sala de tratamientos durante un facial, imagen conceptual",
    titulo: "Sala de calma",
    clase: ""
  },
  {
    src: "assets/img/detalles-spa.webp",
    alt: "Toalla, crema, vela encendida y flores sobre una mesa, imagen conceptual",
    titulo: "Detalles que abrigan",
    clase: "ancha"
  }
];
