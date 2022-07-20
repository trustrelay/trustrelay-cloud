import React, { useEffect } from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';
import { TemplateAgreement } from '../../api/models/models';
import { toUpper } from 'lodash';
import { formatDate, formatDateTime, getCountryNameByIsoCode } from '../../api/utils';
import Countries from '../../api/models/iso3-countries'

// rename helper for react17 overload
const MyDocument: any = Document
const MyPage: any = Page
const MyText: any = Text;


const TemplateAgreementPdf = ({
  dataspaceName,
  agreement

}: {
  dataspaceName: string;
  agreement: TemplateAgreement;
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


  const renderSimple = (content: string) => {
    return (
      <MyText style={styles.text}>
        {content}
      </MyText>
    )
  }

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

      // index = index + 1;

      // result.push(renderSection(index, 'Data assets', true, agreement.dataAssets))

      index = index + 1;

      result.push(renderSection(index, 'Rights and responsibilities', true, agreement.rightsAndResponsibilities))

      index = index + 1;

      var content = `The Data Provider grants to the Data Consumer a non-exclusive, non-transferable, revocable, worldwide licence (“Licence”) for the Permitted Use only, during the Term, subject to the licence restrictions set out in this agreement, to: ${agreement.permissions}`

      result.push(renderSection(index, 'Permissions', true, content))

      index = index + 1;

      // result.push(renderSection(index, 'Duration Type', true, agreement.durationType))

      if (agreement.durationType === 'relative') {
        var content = `Unless otherwise terminated under this clause, this Agreement shall take commence on the date of last signature and shall continue for an initial term of ${agreement.durationPeriod} the (“Initial Term”).`
        result.push(renderSection(index, 'Duration Period', true, content))
      } else {
        var content = `Unless otherwise terminated under this clause, this Agreement shall take commence on ${formatDate(agreement.durationFrom)} and shall continue until ${formatDate(agreement.durationUntil)}.`
        result.push(renderSection(index, 'Duration', true, content))

      }

      index = index + 1;
      var content = `The Data Provider provides access to Data Consumer with data updated with a ${agreement.frequencyOfUpdates} frequency.`
      result.push(renderSection(index, 'Frequency of updates', true, content))

      index = index + 1;
      var content = `Upon termination of this Agreement, all rights to the Data granted to the Data Consumer hereunder shall revert to Data Provider, and the Data Consumer shall immediately refrain from any further processing or exploitation of the Data. With a retention period of ${agreement.dataRetentionPeriod} the Data Consumer shall destroy all physical copies, and irrevocably delete all electronic copies. At the request of the Data Provider, the Data Consumer must confirm fulfilment of these obligations in writing.`
      result.push(renderSection(index, 'Data retention period', true, content))

      index = index + 1;

      var content = `This Agreement may be terminated by either party  upon notice in writing to the other having in count a notice period of ${agreement.terminationNoticePeriod}`
      result.push(renderSection(index, 'Termination notice period', true, content))

      index = index + 1;

     // var selectedCountry = Countries.find(x => x.code == templateAgreement.jurisdiction)
     var selectedCountry = getCountryNameByIsoCode(agreement.jurisdiction)


      var content = `This Agreement shall be deemed to be made in ${selectedCountry}, and shall be governed by and construed in accordance with the laws of ${selectedCountry}. The parties agree to submit to the exclusive jurisdiction of the courts of ${selectedCountry}.`
      result.push(renderSection(index, 'Jurisdiction', true, content))


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
          <MyText style={styles.author}>Dataspace ID: {dataspaceName}</MyText>


          {renderSimple(agreement.intro)}

          {renderSections()}


          <MyText style={styles.subtitle} break>
            Agreed &amp; Accepted: {'{{AGREEMENT-DATE}}'}
          </MyText>
          <MyText style={styles.text}>

          </MyText>
          <MyText style={styles.pageNumber} render={({ pageNumber, totalPages }: { pageNumber: any; totalPages: any }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed />
        </MyPage>
      </MyDocument> : <></>}</>
  )
}

export default TemplateAgreementPdf;