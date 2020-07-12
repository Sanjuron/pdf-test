import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import de la bibliothèque pdf
// import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import { degrees, PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import download from 'downloadjs';

export default function App() {
  
//   async function createPdf() {
//   const page1 = PDFPage
//   .create()
//   .setMediaBox(200, 200)
//   .drawText("Il est possible d'ajouter du texte dans un pdf", {
//     x: 5,
//     y: 235,
//     color: '#007386',
//   });

  

// const docsDir = await PDFLib.getDocumentsDirectory();
// const pdfPath = `${docsDir}/sample.pdf`;
// PDFDocument
//   .create(pdfPath)
//   .addPages(page1)
//   .write()
//   .then(path => {
//     console.log('le pdf a été créé a ' + path )
//   });
//   }

async function createPdf() {
  //création d'un pdf vide
  const pdfDoc = await PDFDocument.create()
  //police d'écriture
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  //création d'une page
  const page = pdfDoc.addPage()
  //proportions
  const { width, height } = page.getSize()
  const fontSize = 20
  page.drawText('Contrat de location Garage Solidaire', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })
  page.drawText('Sanjuron', {
    x: 50,
    y: height - 10 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, "contrat-de-location.pdf", "application/pdf");
}



// async function modifyPdf() {
//   const path = './pdfs.doc1.pdf'
//   const existingPdfBytes = await fetch(path).then(res => res.arrayBuffer())

//   const pdfDoc = await PDFDocument.load(existingPdfBytes)
//   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

//   const pages = pdfDoc.getPages()
//   const firstPage = pages[0]
//   const { width, height } = firstPage.getSize()
//   firstPage.drawText('This text was added with JavaScript!', {
//     x: 5,
//     y: height / 2 + 300,
//     size: 50,
//     font: helveticaFont,
//     color: rgb(0.95, 0.1, 0.1),
//     rotate: degrees(-45),
//   })

//   const pdfBytes = await pdfDoc.save()
// }


  return (

    <View style={styles.container}>
      <Text>Créer un Pdf</Text>
      <Button
      title="sauvegarder pdf"
      onPress={createPdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
