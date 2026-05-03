import { useEffect, useState } from "react";

const PDF_OPEN_EVENT = "physics-pdf-modal:open";
const PDF_CLOSE_EVENT = "physics-pdf-modal:close";
const base = import.meta.env.BASE_URL;

type PdfModalOpenDetail = {
  url: string;
  title: string;
};

type PdfModalState = PdfModalOpenDetail | null;

function isPdfModalOpenDetail(value: unknown): value is PdfModalOpenDetail {
  if (!value || typeof value !== "object") return false;

  const detail = value as Partial<PdfModalOpenDetail>;
  return typeof detail.url === "string" && typeof detail.title === "string";
}

function resolveAssetUrl(url: string) {
  if (/^https?:\/\//.test(url)) return url;
  return `${base.endsWith("/") ? base : `${base}/`}${url.replace(/^\/+/, "")}`;
}

export default function PdfModalViewer() {
  const [modalState, setModalState] = useState<PdfModalState>(null);

  useEffect(() => {
    const openModal = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      if (!isPdfModalOpenDetail(detail)) return;
      setModalState({
        ...detail,
        url: resolveAssetUrl(detail.url),
      });
    };

    const closeModal = () => setModalState(null);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModalState(null);
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const trigger = target.closest("[data-pdf-trigger]");
      if (!(trigger instanceof HTMLElement)) return;

      const url = trigger.dataset.pdfUrl;
      if (!url) return;

      event.preventDefault();
      setModalState({
        url: resolveAssetUrl(url),
        title: trigger.dataset.pdfTitle || "Documento",
      });
    };

    window.addEventListener(PDF_OPEN_EVENT, openModal as EventListener);
    window.addEventListener(PDF_CLOSE_EVENT, closeModal);
    window.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener(PDF_OPEN_EVENT, openModal as EventListener);
      window.removeEventListener(PDF_CLOSE_EVENT, closeModal);
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", Boolean(modalState));

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modalState]);

  if (!modalState) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
      onClick={() => setModalState(null)}
      role="presentation"
    >
      <div className="flex h-full w-full items-stretch justify-center p-0 sm:p-4">
        <section
          className="flex h-full w-full flex-col overflow-hidden border border-white/10 bg-[#0d0f14] text-starlight-text shadow-2xl sm:rounded-sm"
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={modalState.title}
        >
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="display-title text-[11px] uppercase tracking-[0.24em] text-panel-accent/72">
                Documento PDF
              </p>
              <h2 className="truncate text-sm font-semibold text-starlight-text sm:text-base">
                {modalState.title}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={modalState.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/12 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-starlight-text/72 transition-colors hover:border-panel-accent/40 hover:text-panel-accent"
              >
                Abrir en pestaña nueva
              </a>
              <button
                type="button"
                onClick={() => setModalState(null)}
                className="inline-flex items-center justify-center border border-white/12 px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-starlight-text/72 transition-colors hover:border-panel-accent/40 hover:text-panel-accent"
              >
                Cerrar
              </button>
            </div>
          </header>

          <div className="min-h-0 flex-1 bg-[#161922]">
            <iframe
              key={modalState.url}
              src={modalState.url}
              title={modalState.title}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
