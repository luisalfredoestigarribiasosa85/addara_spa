/* Addara Spa — lógica del sitio (demo sin backend) */
(function () {
  "use strict";

  const cfg = SITE_CONFIG;
  const wa = cfg.whatsapp || {};
  const whatsappActivo =
    Boolean(wa.confirmado) && Boolean(wa.numero) && String(wa.numero).trim() !== "";

  const formatoGs = (n) => "₲ " + Number(n).toLocaleString("es-PY");

  function enlaceConsulta(detalle) {
    if (whatsappActivo) {
      const texto = encodeURIComponent(wa.mensajeBase(detalle));
      return {
        href: `https://wa.me/${wa.numero}?text=${texto}`,
        externo: true,
        etiqueta: "Consultar por WhatsApp"
      };
    }
    return {
      href: cfg.telefonoHref,
      externo: false,
      etiqueta: "Consultar por teléfono"
    };
  }

  function etiquetaPrecio(item) {
    if (item.precioConfirmado && item.precioGs != null) {
      return `<p class="precio"><span class="monto">${formatoGs(item.precioGs)}</span></p>`;
    }
    if (item.precioGs != null) {
      return `<p class="precio"><span class="monto">${formatoGs(
        item.precioGs
      )}</span> <span class="ref">referencial</span></p>`;
    }
    return `<p class="precio"><span class="consultar">Consultar precio</span></p>`;
  }

  /* ---------- Servicios ---------- */
  function pintarServicios() {
    const destacados = document.getElementById("servicios-destacados");
    const lista = document.getElementById("servicios-lista");
    if (!destacados || !lista) return;

    SERVICES.filter((s) => s.destacado).forEach((s, i) => {
      const c = enlaceConsulta(s.nombre);
      const nota = s.notaPrecio
        ? `<p class="nota-precio">${s.notaPrecio}.</p>`
        : "";
      const art = document.createElement("article");
      art.className = "servicio-ficha" + (i % 2 ? " invertida" : "");
      art.innerHTML = `
        <div class="ficha-foto">
          <img src="${s.imagen}" alt="${s.alt}" loading="lazy" decoding="async"
               onerror="this.closest('.ficha-foto').classList.add('sin-foto');this.remove()">
        </div>
        <div class="ficha-texto">
          <h3>${s.nombre}</h3>
          <p>${s.descripcion}</p>
          ${etiquetaPrecio(s)}${nota}
          <a class="boton boton-salvia" ${c.externo ? 'target="_blank" rel="noopener"' : ""} href="${c.href}">${c.etiqueta}</a>
        </div>`;
      destacados.appendChild(art);
    });

    SERVICES.filter((s) => !s.destacado).forEach((s) => {
      const c = enlaceConsulta(s.nombre);
      const monto = s.precioGs != null
        ? `<span class="monto">${formatoGs(s.precioGs)}</span> <span class="ref">referencial</span>`
        : `<span class="consultar">Consultar precio</span>`;
      const nota = s.notaPrecio ? ` · ${s.notaPrecio}` : "";
      const li = document.createElement("li");
      li.className = "servicio-fila";
      li.innerHTML = `
        <img class="fila-mini" src="${s.imagen}" alt="" loading="lazy" decoding="async" onerror="this.remove()">
        <div class="fila-cuerpo">
          <h3>${s.nombre}</h3>
          <p>${s.descripcion}${nota ? `<span class="nota-linea">${nota}.</span>` : ""}</p>
        </div>
        <div class="fila-precio">${monto}
          <a class="enlace-consulta" ${c.externo ? 'target="_blank" rel="noopener"' : ""} href="${c.href}">${c.etiqueta}</a>
        </div>`;
      lista.appendChild(li);
    });
  }

  /* ---------- Combos ---------- */
  function pintarCombos() {
    const zona = document.getElementById("combos-zona");
    if (!zona) return;
    const activos = COMBOS.filter((c) => c.activo !== false);
    if (!activos.length) {
      zona.innerHTML = `<p class="aviso">Pronto publicaremos nuevas experiencias. Consultanos por teléfono.</p>`;
      return;
    }
    const primero = activos.find((c) => c.destacado) || activos[0];
    const resto = activos.filter((c) => c !== primero);

    const tarjeta = (c, grande) => {
      const link = enlaceConsulta("el combo " + c.nombre);
      const items = c.incluye.map((i) => `<li>${i}</li>`).join("");
      const vigencia = c.vigencia
        ? `<p class="vigencia">${c.vigencia.desde} – ${c.vigencia.hasta}</p>`
        : "";
      return `
        <article class="combo ${grande ? "combo-grande" : ""}">
          <div class="combo-foto">
            <img src="${c.imagen}" alt="${c.alt}" loading="lazy" decoding="async"
                 onerror="this.closest('.combo-foto').classList.add('sin-foto');this.remove()">
          </div>
          <div class="combo-cuerpo">
            <h3>${c.nombre}</h3>
            <ul class="combo-incluye">${items}</ul>
            ${etiquetaPrecio(c)}
            ${vigencia}
            <p class="aviso-combo">Precio publicado anteriormente; consultar vigencia.</p>
            <a class="boton ${grande ? "boton-marfil" : "boton-linea"}" ${
              link.externo ? 'target="_blank" rel="noopener"' : ""
            } href="${link.href}">${link.etiqueta}</a>
          </div>
        </article>`;
    };

    zona.innerHTML =
      tarjeta(primero, true) +
      (resto.length ? `<div class="combos-resto">${resto.map((c) => tarjeta(c, false)).join("")}</div>` : "");
  }

  /* ---------- Galería ---------- */
  function pintarGaleria() {
    const g = document.getElementById("galeria-rejilla");
    if (!g) return;
    GALLERY.forEach((f) => {
      const fig = document.createElement("figure");
      fig.className = "foto " + (f.clase || "");
      fig.innerHTML = `
        <img src="${f.src}" alt="${f.alt}" loading="lazy" decoding="async" onerror="this.closest('.foto').remove()">
        <figcaption>${f.titulo} <span>· imagen conceptual</span></figcaption>`;
      g.appendChild(fig);
    });
  }

  /* ---------- Contacto / CTA ---------- */
  function pintarContacto() {
    document.querySelectorAll("[data-telefono]").forEach((a) => {
      a.setAttribute("href", cfg.telefonoHref);
      const t = a.querySelector("span");
      if (t) t.textContent = cfg.telefonoMostrado;
    });
    document.querySelectorAll('[data-maps]').forEach((a) => {
      a.setAttribute("href", cfg.mapsUrl);
    });
    const marco = document.getElementById("mapa-marco");
    if (marco) marco.setAttribute("src", cfg.mapsEmbed);

    const horas = document.getElementById("horarios");
    if (horas) {
      if (Array.isArray(cfg.horarios) && cfg.horarios.length) {
        horas.innerHTML =
          "<dl>" +
          cfg.horarios.map((h) => `<div><dt>${h.dias}</dt><dd>${h.horas}</dd></div>`).join("") +
          "</dl>";
      } else {
        horas.innerHTML = `<p class="aviso">Consultá nuestros horarios de atención.</p>`;
      }
    }

    /* Botones principales: WhatsApp solo si está confirmado. */
    document.querySelectorAll("[data-consulta]").forEach((a) => {
      const detalle = a.getAttribute("data-consulta") || "una visita al spa";
      const c = enlaceConsulta(detalle);
      a.setAttribute("href", c.href);
      if (c.externo) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
      const t = a.querySelector("[data-etiqueta]");
      if (t) t.textContent = c.etiqueta;
    });
  }

  /* ---------- Navegación móvil ---------- */
  function menuMovil() {
    const btn = document.getElementById("menu-boton");
    const nav = document.getElementById("nav-movil");
    if (!btn || !nav) return;
    const cerrar = () => {
      btn.setAttribute("aria-expanded", "false");
      nav.hidden = true;
      document.body.classList.remove("menu-abierto");
    };
    btn.addEventListener("click", () => {
      const abierto = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!abierto));
      nav.hidden = abierto;
      document.body.classList.toggle("menu-abierto", !abierto);
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") cerrar();
    });
  }

  /* ---------- Detalles varios ---------- */
  function varios() {
    const y = document.getElementById("anio");
    if (y) y.textContent = new Date().getFullYear();

    const cab = document.getElementById("cabecera");
    if (cab) {
      const alDesplazar = () =>
        cab.classList.toggle("con-sombra", window.scrollY > 8);
      window.addEventListener("scroll", alDesplazar, { passive: true });
      alDesplazar();
    }

    const revelar = document.querySelectorAll(".revelar");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entradas) =>
          entradas.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.12 }
      );
      revelar.forEach((el) => io.observe(el));
    } else {
      revelar.forEach((el) => el.classList.add("visible"));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    pintarServicios();
    pintarCombos();
    pintarGaleria();
    pintarContacto();
    menuMovil();
    varios();
  });
})();
