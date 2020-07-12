import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
//import de la bibliothèque pdf
// import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import { PDFDocument, StandardFonts, rgb} from 'pdf-lib';

export default function App() {
  
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

async function createPdf() {
  //création d'un pdf vide
  const pdfDoc = await PDFDocument.create()
  //police d'écriture
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  //création d'une page
  const page = pdfDoc.addPage()
  //proportions
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Creating PDFs in JavaScript is awesome!', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
}



  return (

    <View style={styles.container}>
      <Text>Créer un Pdf</Text>
      <Button
      title="sauvegarder pdf"
      onPress={createPdf()}
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
