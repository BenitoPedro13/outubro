import type { PoliticaDictionary } from "./pt";

// [CONTENT: traducción — revisión nativa pendiente] Traducción de ./pt.ts, que a su vez es
// un borrador pendiente de revisión jurídica. Rige la versión en portugués.
const politica: PoliticaDictionary = {
  seo: {
    title: "Política de privacidad",
    description:
      "Cómo Outubro Idiomas trata los datos personales en este sitio: qué se recopila, para qué, con quién se comparte y cómo ejercer tus derechos según la LGPD de Brasil.",
  },
  hero: {
    eyebrow: "Privacidad",
    title: "Política de privacidad",
    lead: "Sin letra pequeña: qué pasa con tus datos cuando visitas este sitio.",
  },
  draftNotice: "Borrador en revisión jurídica. Este texto todavía puede cambiar. Rige la versión en portugués.",
  updated: "Última actualización: {date}",
  sections: [
    {
      title: "Quién es responsable de tus datos",
      body: [
        "Outubro Idiomas es la responsable de los datos personales tratados en este sitio, según la Ley General de Protección de Datos de Brasil (LGPD, Ley 13.709/2018). Razón social y CNPJ: [por confirmar].",
      ],
    },
    {
      title: "Qué recopila este sitio",
      body: [
        "Este sitio no tiene formularios, no usa cookies y no usa herramientas de analítica ni de publicidad.",
        "Como cualquier sitio, el servidor que lo aloja (Vercel) registra datos técnicos de cada visita: dirección IP, navegador, página visitada y hora. Estos registros sirven para mantener el sitio en línea y seguro.",
      ],
    },
    {
      title: "WhatsApp e Instagram",
      body: [
        "Los botones del sitio abren WhatsApp o Instagram. A partir de ahí, la conversación ocurre en esas aplicaciones, que tienen sus propias políticas de privacidad.",
        "Lo que nos cuentas por WhatsApp (nombre, teléfono, idioma de interés, disponibilidad) lo usamos solo para responderte, armar tu plan e inscribirte.",
      ],
    },
    {
      title: "Base legal",
      body: [
        "Registros de acceso: interés legítimo en mantener el sitio funcionando y seguro (LGPD, art. 7, IX). Conversaciones de inscripción: pasos previos a un contrato que solicitaste (LGPD, art. 7, V).",
      ],
    },
    {
      title: "Con quién los compartimos",
      body: [
        "No vendemos ni alquilamos datos personales. Los registros de acceso quedan con el proveedor de alojamiento (Vercel), que puede procesarlos fuera de Brasil, con las garantías que exige la LGPD.",
      ],
    },
    {
      title: "Por cuánto tiempo",
      body: [
        "Los registros de acceso se conservan durante el plazo del proveedor de alojamiento y, como mínimo, lo que exige el Marco Civil de Internet de Brasil (Ley 12.965/2014). Los datos de inscripción se conservan mientras estudies con nosotros y durante los plazos legales posteriores.",
      ],
    },
    {
      title: "Tus derechos",
      body: [
        "Puedes pedir en cualquier momento: confirmación de que tratamos tus datos, acceso, corrección, anonimización o eliminación, portabilidad, información sobre con quién se comparten y revocación del consentimiento (LGPD, art. 18).",
        "Para ejercer cualquiera de ellos, escríbenos por WhatsApp. También puedes presentar un reclamo ante la Autoridad Nacional de Protección de Datos de Brasil (ANPD).",
      ],
    },
    {
      title: "Cambios en esta política",
      body: ["Si el sitio empieza a recopilar otros datos (por ejemplo, un formulario), esta página se actualiza antes, con la nueva fecha arriba."],
    },
  ],
};

export default politica;
