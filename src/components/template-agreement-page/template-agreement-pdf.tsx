import React, { useEffect } from 'react';
import { Page, Text, Document, StyleSheet  } from '@react-pdf/renderer';
import { TemplateAgreement } from '../../api/models/models';
import { toUpper } from 'lodash'; 

// rename helper for react17 overload
const MyDocument: any = Document
const MyPage: any = Page
const MyText: any = Text;


const TemplateAgreementPdf = ({
  agreement
}: {
  agreement: TemplateAgreement
}) => {

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      // fontFamily: 'Oswald'
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      // fontFamily: 'Oswald'
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      // fontFamily: 'Times-Roman'
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
  });



  //TODO: call in App.tsx
  // const registerFont = () => {
  //   Font.register({
  //   family: "Montserrat",
  //   src:
  //   "http://fonts.gstatic.com/s/montserrat/v10/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf",
  //   });


  //   Font.register({
  //     family: 'Oswald',
  //     src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
  //   });

  //   };

  const renderSection = (index: number, name: string, include: boolean, content: string) => {
    if (include) {
      return (<><MyText style={styles.subtitle}>
        {`${converToRomanNumeral(index)}. ${toUpper(name)}`}
      </MyText>
        <MyText style={styles.text}>
          {content}

        </MyText></>)
    }
  }

  const converToRomanNumeral = (index: number) => {
    switch (index) {
      case 1: return "I"
      case 2: return "II"
      case 3: return "III"
      case 4: return "IV"
      case 5: return "V"
      case 6: return "VI"
      case 7: return "VII"
      case 8: return "VIII"
      case 9: return "IX"
      case 10: return "X"
      case 11: return "XI"
      case 12: return "XII"
      case 13: return "XIII"
      case 14: return "XIV"
      case 15: return "XV"
      case 16: return "XVI"
      case 17: return "XVII"
      case 18: return "XVIII"
      case 19: return "XIX"
      case 20: return "XX"

      default: return "";
    }
  }

  const renderSections = () => {
    if (agreement) {


      var result: Array<React.ReactNode> = []
      var index: number = 0;

      index = index + 1;

      result.push(renderSection(index, 'Purpose', true, agreement.purpose))



      index = index + 1;

      result.push(renderSection(index, 'Data assets', true, agreement.dataAssets))


      index = index + 1;

      result.push(renderSection(index, 'Rights and responsibilities', true, agreement.rightsAndResponsibilities))


      index = index + 1;

      result.push(renderSection(index, 'Permissions', true, agreement.permissions))


      index = index + 1;

      result.push(renderSection(index, 'Duration Type', true, agreement.durationType))

      if (agreement.durationType === 'relative') {
        result.push(renderSection(index, 'Duration Period', true, agreement.durationPeriod))
      } else {
        result.push(renderSection(index, 'Duration From', true, agreement.durationFrom.toString()))
        result.push(renderSection(index, 'Duration Until', true, agreement.durationUntil.toString()))
      }






      index = index + 1;

      result.push(renderSection(index, 'Frequency of updates', true, agreement.frequencyOfUpdates))

      index = index + 1;

      result.push(renderSection(index, 'Data retention period', true, agreement.dataRetentionPeriod))

      index = index + 1;

      result.push(renderSection(index, 'Termination notice period', true, agreement.terminationNoticePeriod))

      index = index + 1;

      result.push(renderSection(index, 'Jurisdiction', true, agreement.jurisdiction))


      return <>{result}</>
    } else {
      return <></>
    }
  }

  useEffect(() => {
 
    // registerFont()
  }, [agreement])


  return (
    <>{(agreement) ?
      <MyDocument>

        <MyPage style={styles.body}>
          <MyText style={styles.header} fixed>
            {`~ ${agreement.title} ~`}
          </MyText>
          <MyText style={styles.title}>{agreement.title}</MyText>
          <MyText style={styles.author}>Dataspace name</MyText>


          <MyText style={styles.text}>
            This Data Sharing Agreement (this ???Agreement???) is made on [AGREEMENT_DATE] (the
            ???Effective Date???) between [PROVIDER_FULL_NAME], with its principal place of business at [PROVIDER_ADDRESS],
            hereinafter referred to as ???PROVIDER??? and [RECIPIENT_FULL_NAME], with its
            principal place of business at [RECIPIENT_ADDRESS], hereinafter referred to as ???RECIPIENT???
            (referred to collectively hereinafter as the ???Parties??? and individually as ???Party???).
          </MyText>

          {renderSections()}


          <MyText style={styles.subtitle} break>
            Agreed &amp; Accepted:
          </MyText>
          <MyText style={styles.text}>

          </MyText>
          <MyText style={styles.pageNumber} render={({ pageNumber, totalPages }:{pageNumber:any; totalPages:any}) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </MyPage>
      </MyDocument> : <></>}</>
  )
}

export default TemplateAgreementPdf;