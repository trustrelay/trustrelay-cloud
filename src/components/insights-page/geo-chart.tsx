import { ResponsiveChoropleth } from "@nivo/geo" 

import { worldCountries } from "../../api/models/world_countries"
import { GeoScore } from "../../api/models/models"


const MyResponsiveChoropleth : any = ResponsiveChoropleth

const GeoChart = ({
    maxValue,
    scores
}:{
    maxValue:number;
    scores:Array<GeoScore>;
}) => {

    return   <MyResponsiveChoropleth
    data={scores}
    features={worldCountries.features}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    colors="nivo"
    domain={[ 0, maxValue ]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".0s"
    projectionTranslation={[ 0.6, 1.2 ]}
    projectionRotation={[ 0, 0, 0 ]}
    projectionScale={350}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    tooltip={(node:any)=> { 
       if(node && node.feature.data.value){
        return (<strong>{`${node.feature.properties.name}(${node.feature.data.value})`}</strong>)
       }
       return <></>
    }}
    legends={[
        {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 10,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#666666',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemTextColor: '#000000',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
/>
    
}

export default GeoChart;