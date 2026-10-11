# Addara Spa — Demo web (propuesta privada)

Sitio estático, sin dependencias ni build. Abrir `index.html` o servir la carpeta:

```sh
python3 -m http.server 8080
# → http://localhost:8080
```

## Dónde editar

Todo el contenido comercial vive en **`assets/js/data.js`**:

| Qué cambiar | Dónde |
|---|---|
| Teléfono, dirección, Google Maps | `SITE_CONFIG` |
| Activar WhatsApp | `SITE_CONFIG.whatsapp.confirmado: true` (solo con número confirmado por el local) |
| Servicios y descripciones | `SERVICES` |
| Precios | `precioGs` en `SERVICES` / `COMBOS`. `precioConfirmado: false` lo muestra como “referencial”; `null` muestra “Consultar precio” |
| Combos (activar, renombrar, incluir, vigencia) | `COMBOS` (`activo`, `nombre`, `incluye`, `precioGs`, `vigencia: {desde, hasta}`) |
| Horarios | `SITE_CONFIG.horarios` (`null` muestra “Consultá nuestros horarios de atención”) |
| Fotos | carpeta `assets/img/` (WebP). Estructura lista para reemplazar por fotos autorizadas |

## Comportamiento de consulta

WhatsApp está **activo** (`whatsapp.confirmado: true`): todos los botones dicen “Consultar por WhatsApp”, apuntan a `wa.me/595984917183?text=…` con el mensaje “Hola, Addara Spa. Quisiera consultar la disponibilidad para [servicio]…”, y hay un botón flotante que abre el chat directo. Si algún día se pierde el número, poner `confirmado: false` revierte todo a botones telefónicos (`tel:`).

## Pendiente de confirmación con el establecimiento

Precios vigentes, modalidad de sauna incluida, variedad de masajes, vigencia y días de cada combo, horarios, número apto para WhatsApp, fotos reales y redes sociales oficiales.

## Imágenes

Fotografías conceptuales de Unsplash (ilustrativas, no son del local), descargadas y optimizadas a WebP local. No hay testimonios ni datos estructurados con precios: nada inventado.
# addara_spa
