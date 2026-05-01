export interface ResourceItem {
  name: string;
  url: string;
  platform?: string;
  description?: string;
  type: "software" | "tutorial" | "manual" | "document";
}

export const softwareTools: ResourceItem[] = [
  { name: "GnuPlot 4.6.0", url: "/descargas/gnuplot-4.6.0-win32-setup.exe", platform: "Windows", type: "software" },
  { name: "Tutorial GnuPlot", url: "/tutoriales/gnuplot-4.2-tutorial.zip", description: "Material de apoyo comprimido", type: "tutorial" },
  { name: "Manual GnuPlot", url: "/documentos/manual-gnuplot.pdf", type: "manual" },
  { name: "Python", url: "https://www.python.org/downloads/windows/", description: "Descarga oficial para Windows", type: "software" },
  { name: "QtiPlot", url: "/descargas/qtiplot.zip", platform: "Windows", type: "software" },
  { name: "Qucs", url: "/descargas/qucs-0.0.16-setup.exe", platform: "Windows", type: "software" },
  { name: "ffmpeg", url: "/descargas/ffmpeg.zip", platform: "Windows", type: "software" },
  { name: "gedit", url: "/descargas/gedit.exe", platform: "Windows", type: "software" },
  { name: "gnumeric", url: "/descargas/gnumeric.exe", platform: "Windows", type: "software" },
  { name: "Excel2LaTeX", url: "/descargas/excel2latex.xla", platform: "Windows", type: "software" },
];

export const academicDocuments: ResourceItem[] = [
  { name: "Tutorial LaTeX", url: "/documentos/tutorial-latex.pdf", type: "document" },
  { name: "Plantilla en PDF", url: "/documentos/plantilla.pdf", type: "document" },
  { name: "Plantilla en LaTeX", url: "/documentos/plantilla.tex", description: "Archivo fuente .tex", type: "document" },
  { name: "Cálculo de errores", url: "/documentos/calculo-errores.pdf", type: "document" },
  { name: "Guía: Informe científico", url: "/documentos/informe-cientifico.pdf", type: "document" },
  { name: "Código de honor", url: "/documentos/codigo-de-honor.pdf", type: "document" },
];

export const manualsAndPrograms: ResourceItem[] = [
  { name: "Manual de Física Básica", url: "/manuales/fisica-basica.pdf", type: "manual" },
  { name: "Manual de Física 1", url: "/manuales/fisica-1.pdf", type: "manual" },
  { name: "Manual de Física 2", url: "/manuales/fisica-2.pdf", type: "manual" },
  { name: "Manual de Física 3", url: "/manuales/fisica-3.pdf", type: "manual" },
  { name: "Manual de Física 4", url: "/manuales/fisica-4.pdf", type: "manual" },
  { name: "Programa de Laboratorio de Física Básica", url: "/programas/fisica-basica-2025.pdf", description: "Periodo 2025", type: "document" },
  { name: "Programa de Laboratorio de Física Uno", url: "/programas/fisica-1-2025.pdf", description: "Periodo 2025", type: "document" },
  { name: "Programa de Laboratorio de Física Dos", url: "/programas/fisica-2-2025.pdf", description: "Periodo 2025", type: "document" },
  { name: "Programa de Laboratorio de Física Tres", url: "/programas/fisica-3-2025.pdf", description: "Periodo 2025", type: "document" },
  { name: "Programa de Laboratorio de Física Cuatro", url: "/programas/fisica-4-2025.pdf", description: "Periodo 2025", type: "document" },
];

export const institutionalLinks = [
  { name: "Departamento de Física", url: "https://fisica.usac.edu.gt/fisica/" },
  { name: "Facultad de Ingeniería", url: "https://portal.ingenieria.usac.edu.gt/" },
  { name: "USAC", url: "https://usac.edu.gt/" },
  { name: "Licenciatura en Física", url: "https://ecfm.usac.edu.gt/" },
  { name: "Clases Virtuales de Apoyo", url: "https://www.youtube.com/user/IzquierdoCesar" },
];
