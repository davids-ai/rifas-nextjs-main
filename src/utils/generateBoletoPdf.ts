import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface BoletoPdfData {
  nombre: string;
  numeroBoletos: string[]; // Ejemplo: ['105', '106', '107']
  fechaRifa: string; // Ejemplo: '2025-08-20'
  logoImg: string | Uint8Array | ArrayBuffer; // base64, Uint8Array, ArrayBuffer
  telefono?: string;
  metodoPago?: string;
  valorBoleto?: number;
  nombreRifa?: string;
  fechaSorteo?: string;
}

export async function generateBoletoPdf(data: BoletoPdfData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const pageWidth = 400;
  const pageHeight = 600;
  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Colores
  const rojo = rgb(0.72, 0.11, 0.11); // #b71c1c
  const negro = rgb(0.13, 0.13, 0.13); // #212121
  const azul = rgb(0.08, 0.39, 0.75); // #1565c0
  const grisBorde = rgb(0.85, 0.85, 0.85);

  // Fondo blanco y borde gris claro
  page.drawRectangle({
    x: 10,
    y: 10,
    width: pageWidth - 20,
    height: pageHeight - 20,
    borderColor: grisBorde,
    borderWidth: 2,
    color: rgb(1, 1, 1),
  });

  // Logo centrado y más abajo
  let logoPng;
  if (typeof data.logoImg === 'string') {
    const base64 = data.logoImg.split(',')[1] || data.logoImg;
    const logoBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    logoPng = await pdfDoc.embedPng(logoBytes);
  } else {
    logoPng = await pdfDoc.embedPng(data.logoImg);
  }
  const logoWidth = 120;
  const logoHeight = (logoPng.height / logoPng.width) * logoWidth;
  page.drawImage(logoPng, {
    x: (pageWidth - logoWidth) / 2,
    y: pageHeight - 100,
    width: logoWidth,
    height: logoHeight,
  });

  // Nombre de la rifa destacado y centrado
  if (data.nombreRifa) {
    const nombreRifaFontSize = 22;
    const nombreRifaText = `${data.nombreRifa}`;
    const nombreRifaTextWidth = fontBold.widthOfTextAtSize(nombreRifaText, nombreRifaFontSize);
    page.drawText(nombreRifaText, {
      x: (pageWidth - nombreRifaTextWidth) / 2,
      y: pageHeight - 135,
      size: nombreRifaFontSize,
      font: fontBold,
      color: azul,
    });
  }

  // Fecha del sorteo centrada
  if (data.fechaSorteo) {
    const fechaSorteoFontSize = 16;
    const fechaSorteoText = `Sorteo: ${data.fechaSorteo}`;
    const fechaSorteoTextWidth = font.widthOfTextAtSize(fechaSorteoText, fechaSorteoFontSize);
    page.drawText(fechaSorteoText, {
      x: (pageWidth - fechaSorteoTextWidth) / 2,
      y: pageHeight - 160,
      size: fechaSorteoFontSize,
      font,
      color: azul,
    });
  }

  // Boletos comprados, centrados y destacados
  const boletosText = `Boletos: ${data.numeroBoletos.join(', ')}`;
  const boletosFontSize = 24;
  const boletosTextWidth = fontBold.widthOfTextAtSize(boletosText, boletosFontSize);
  page.drawText(boletosText, {
    x: (pageWidth - boletosTextWidth) / 2,
    y: pageHeight - 200,
    size: boletosFontSize,
    font: fontBold,
    color: rojo,
  });

  // Nombre del comprador centrado
  const nombreFontSize = 18;
  const nombreText = `Nombre: ${data.nombre}`;
  const nombreTextWidth = font.widthOfTextAtSize(nombreText, nombreFontSize);
  page.drawText(nombreText, {
    x: (pageWidth - nombreTextWidth) / 2,
    y: pageHeight - 240,
    size: nombreFontSize,
    font,
    color: negro,
  });

  // Teléfono
  if (data.telefono) {
    const telFontSize = 16;
    const telText = `Teléfono: ${data.telefono}`;
    const telTextWidth = font.widthOfTextAtSize(telText, telFontSize);
    page.drawText(telText, {
      x: (pageWidth - telTextWidth) / 2,
      y: pageHeight - 265,
      size: telFontSize,
      font,
      color: negro,
    });
  }

  // Fecha de la rifa
  const fechaFontSize = 16;
  const fechaText = `Fecha de compra: ${data.fechaRifa}`;
  const fechaTextWidth = font.widthOfTextAtSize(fechaText, fechaFontSize);
  page.drawText(fechaText, {
    x: (pageWidth - fechaTextWidth) / 2,
    y: pageHeight - 290,
    size: fechaFontSize,
    font,
    color: azul,
  });

  // Método de pago
  if (data.metodoPago) {
    const pagoFontSize = 16;
    const pagoText = `Método de pago: ${data.metodoPago}`;
    const pagoTextWidth = font.widthOfTextAtSize(pagoText, pagoFontSize);
    page.drawText(pagoText, {
      x: (pageWidth - pagoTextWidth) / 2,
      y: pageHeight - 315,
      size: pagoFontSize,
      font,
      color: negro,
    });
  }

  // Valor del boleto
  if (data.valorBoleto) {
    const valorFontSize = 16;
    const valorText = `Valor boleto: $${data.valorBoleto}`;
    const valorTextWidth = font.widthOfTextAtSize(valorText, valorFontSize);
    page.drawText(valorText, {
      x: (pageWidth - valorTextWidth) / 2,
      y: pageHeight - 340,
      size: valorFontSize,
      font,
      color: negro,
    });
  }

  // Redes y contacto centrados
  const instagramFontSize = 14;
  const instagramText = 'Instagram: @rifas_del_ruiz';
  page.drawText(instagramText, {
    x: 40,
    y: 40,
    size: instagramFontSize,
    font,
    color: negro,
  });
  const webFontSize = 14;
  const webText = 'ruizeventos.com';
  page.drawText(webText, {
    x: 40,
    y: 20,
    size: webFontSize,
    font,
    color: negro,
  });

  return await pdfDoc.save();
}
