import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, ThemeProvider } from 'react-native-elements';

//import de la bibliothèque pdf
import { degrees, PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import download from 'downloadjs';

export default function App() {

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [model, setModel] = useState('');

  const changeLastname= (val) => {
    setLastname(val)
  }
  const changeFirstame= (val) => {
    setFirstname(val)
  }
  const changeModel= (val) => {
    setModel(val)
  }



  
//Création d'une page Pdf
async function createPdf(props) {
  //création d'un pdf vide
  const pdfDoc = await PDFDocument.create()
  //police d'écriture
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  //création d'une page
  const page = pdfDoc.addPage()
  //proportions
  const { width, height } = page.getSize()
  const fontSize = 20
  page.drawText(firstname, {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })
  page.drawText(lastname, {
    x: 50,
    y: height - 10 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })
  page.drawText(model, {
    x: 50,
    y: height - 15 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  })

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, "contrat-de-location.pdf", "application/pdf");
}

  return (
    <ThemeProvider>
    <View style={styles.container}>
      <Text style={styles.h1}>Contrat de Location</Text>
      <Input
        placeholder='Nom du demandeur'
        onChangeText={changeLastname}
      />
      <Input
        placeholder='Prénom du demandeur'
        onChangeText={changeFirstame}
      />
      <Input
        placeholder='Modèle de la voiture à louer'
        onChangeText={changeModel}
      />
      <Button
      title="sauvegarder pdf"
      onPress={createPdf}
      />

    </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#009CBF'
  }
});
