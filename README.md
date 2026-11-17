# Herramientas de Ingeniería Vial

Sitio web independiente con seis calculadoras interactivas de diseño geométrico de carreteras
y planificación del transporte.

**Autor:** Dr. Elvis A. Castillo-Camarena, Ph.D.

---

## Contenido

| Herramienta | Archivo | Categoría |
|---|---|---|
| Diseño Geométrico de Carreteras | `apps/diseno-geometrico.html` | Diseño geométrico |
| Curvas Horizontales: distribución de e y f | `apps/curvas-horizontales-e-f.html` | Diseño geométrico |
| Rotación de Pavimento — Transición del Peralte | `apps/rotacion-peralte.html` | Diseño geométrico |
| Curva Vertical Parabólica | `apps/curva-vertical.html` | Diseño geométrico |
| Distancia de Visibilidad de Frenado | `apps/distancia-frenado.html` | Diseño geométrico |
| Asignación de Tránsito — BPR | `apps/asignacion-transito.html` | Planificación |

---

## Estructura

```
herramientas/
├── index.html              Página principal con el índice de herramientas
├── apps/
│   ├── app-shell.css       Estilo unificado de la franja superior
│   └── *.html              Las seis herramientas (autónomas)
└── assets/
    ├── css/tools.css       Estilos de la página principal
    ├── js/tools.js         Búsqueda y filtro por categoría
    ├── img/favicon.svg
    └── vendor/             Librerías locales (no se usa CDN)
        ├── plotly-2.35.2.min.js
        ├── geotiff-2.1.3.js
        └── katex/          katex.min.css, katex.min.js y fonts/
```

Dependencias por herramienta:

| Herramienta | Librerías |
|---|---|
| Diseño geométrico | Plotly, GeoTIFF |
| Curvas horizontales | Plotly, KaTeX |
| Transición del peralte | Plotly, KaTeX |
| Curva vertical, Distancia de frenado, Asignación de tránsito | ninguna |

---

## Despliegue en el servidor de la universidad

El sitio es **HTML estático**: no necesita PHP, base de datos, Node ni proceso de compilación.
Basta con copiar la carpeta al servidor.

### Por SFTP / SCP

```bash
scp -r herramientas usuario@servidor.edu:/ruta/del/public_html/
```

### Por rsync (recomendado para actualizaciones)

```bash
rsync -av --delete herramientas/ usuario@servidor.edu:/ruta/del/public_html/herramientas/
```

Quedará publicado en una dirección del tipo
`https://servidor.edu/~usuario/herramientas/`.

### Notas importantes

- **Todas las rutas son relativas.** El sitio funciona igual en la raíz del dominio
  (`https://servidor.edu/`) que dentro de un subdirectorio
  (`https://servidor.edu/~usuario/herramientas/`). No hay que ajustar nada.
- **Respete mayúsculas y minúsculas.** Los servidores Linux distinguen entre `Index.html`
  e `index.html`; macOS no. Suba los nombres tal como están.
- **No se requiere HTTPS** para que funcionen, pero es recomendable.
- **Sin dependencias externas.** Las librerías que usan algunas herramientas (Plotly, KaTeX y
  GeoTIFF) están incluidas en `assets/vendor/`, no se cargan desde un CDN. El sitio funciona
  en una red interna sin salida a internet, y no filtra visitas a terceros.
- **Suba también `assets/vendor/`.** Pesa unos 5 MB y sin esa carpeta tres herramientas
  quedarían sin gráficas ni fórmulas.

---

## Mantenimiento

- Para **agregar una herramienta**: copie el archivo HTML en `apps/`, verifique que su franja
  superior tenga la clase `ec-topbar` y el enlace de regreso `href="../index.html"`, y añada una
  tarjeta `<a class="tool-card">` en `index.html` con su atributo `data-cat`
  (`geom` o `plan`) y sus `data-keys` de búsqueda.
- Para **cambiar los contadores** de las pastillas de filtro, actualice los números dentro de
  `<span class="n">` en `index.html`.
- El año del pie de página se actualiza solo mediante JavaScript.

---

## Prueba local

```bash
python3 -m http.server 8080 --directory herramientas
```

Luego abra `http://localhost:8080`.

---

## Licencia

© 2026 Elvis A. Castillo-Camarena, Universidad Tecnológica de Panamá (UTP).

Este trabajo se distribuye bajo la licencia
[Creative Commons Atribución 4.0 Internacional (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.es).
Usted es libre de copiar, redistribuir (incluido su depósito en repositorios como Zenodo),
adaptar y utilizar el material, incluso con fines comerciales, **siempre que otorgue el crédito
correspondiente** al autor, incluya un enlace a la licencia e indique si realizó cambios.

**Cómo citar:** Castillo-Camarena, E. A. (2026). *Herramientas de Ingeniería Vial* [Software
educativo]. Universidad Tecnológica de Panamá. Licencia CC BY 4.0.

Las librerías de terceros incluidas en `assets/vendor/` (Plotly, KaTeX y GeoTIFF) conservan sus
propias licencias de código abierto.

### Condiciones de uso

Las herramientas son material de apoyo docente y de cálculo preliminar; los resultados deben ser
verificados por un ingeniero idóneo antes de emplearse en un diseño definitivo.
# T1-Teaching_Tools
