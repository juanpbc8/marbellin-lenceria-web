import { verificarSesion } from "./verificarSesion.js";
import { mostrarUsuarioActivo } from "./mostrarUsuarioActivo.js";

verificarSesion();          // Si no hay sesión, redirige
mostrarUsuarioActivo();     // Si hay sesión, muestra nombre