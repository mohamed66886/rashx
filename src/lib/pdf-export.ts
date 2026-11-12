import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface GeneratePdfOptions {
  element: HTMLElement;
  invoiceNumber: string;
}

export interface GeneratePdfResult {
  pdfBase64: string;
  download: () => void;
}

/**
 * Renders an HTML DOM element (such as the printable invoice layout) into
 * a high-definition A4 PDF using html2canvas and jsPDF.
 * Preserves Arabic typography, borders, logos, and QR codes accurately.
 */
export async function generateInvoicePdf({
  element,
  invoiceNumber,
}: GeneratePdfOptions): Promise<GeneratePdfResult> {
  // Capture DOM node to canvas at 2x scale for sharp print quality
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const calculatedHeight = (imgProps.height * pdfWidth) / imgProps.width;

  // Add the captured invoice image to the PDF
  if (calculatedHeight <= pdfHeight) {
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, calculatedHeight);
  } else {
    // If invoice exceeds 1 page, fit to page width
    let heightLeft = calculatedHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, calculatedHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - calculatedHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, calculatedHeight);
      heightLeft -= pdfHeight;
    }
  }

  const pdfBase64 = pdf.output('datauristring');
  const filename = `فاتورة-${invoiceNumber}.pdf`;

  return {
    pdfBase64,
    download: () => {
      pdf.save(filename);
    },
  };
}

